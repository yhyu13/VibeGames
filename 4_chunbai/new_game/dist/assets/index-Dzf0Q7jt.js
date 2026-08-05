var QS=Object.defineProperty;var JS=(r,t,n)=>t in r?QS(r,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[t]=n;var Pt=(r,t,n)=>JS(r,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))a(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&a(f)}).observe(document,{childList:!0,subtree:!0});function n(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(l){if(l.ep)return;l.ep=!0;const c=n(l);fetch(l.href,c)}})();function e_(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Lh={exports:{}},Jo={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fv;function $S(){if(fv)return Jo;fv=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function n(a,l,c){var f=null;if(c!==void 0&&(f=""+c),l.key!==void 0&&(f=""+l.key),"key"in l){c={};for(var d in l)d!=="key"&&(c[d]=l[d])}else c=l;return l=c.ref,{$$typeof:r,type:a,key:f,ref:l!==void 0?l:null,props:c}}return Jo.Fragment=t,Jo.jsx=n,Jo.jsxs=n,Jo}var hv;function ty(){return hv||(hv=1,Lh.exports=$S()),Lh.exports}var lt=ty(),Uh={exports:{}},re={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var dv;function ey(){if(dv)return re;dv=1;var r=Symbol.for("react.transitional.element"),t=Symbol.for("react.portal"),n=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),f=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),v=Symbol.for("react.lazy"),g=Symbol.for("react.activity"),x=Symbol.iterator;function M(P){return P===null||typeof P!="object"?null:(P=x&&P[x]||P["@@iterator"],typeof P=="function"?P:null)}var y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T=Object.assign,S={};function _(P,it,Mt){this.props=P,this.context=it,this.refs=S,this.updater=Mt||y}_.prototype.isReactComponent={},_.prototype.setState=function(P,it){if(typeof P!="object"&&typeof P!="function"&&P!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,P,it,"setState")},_.prototype.forceUpdate=function(P){this.updater.enqueueForceUpdate(this,P,"forceUpdate")};function L(){}L.prototype=_.prototype;function U(P,it,Mt){this.props=P,this.context=it,this.refs=S,this.updater=Mt||y}var R=U.prototype=new L;R.constructor=U,T(R,_.prototype),R.isPureReactComponent=!0;var q=Array.isArray;function I(){}var N={H:null,A:null,T:null,S:null},B=Object.prototype.hasOwnProperty;function C(P,it,Mt){var Z=Mt.ref;return{$$typeof:r,type:P,key:it,ref:Z!==void 0?Z:null,props:Mt}}function b(P,it){return C(P.type,it,P.props)}function H(P){return typeof P=="object"&&P!==null&&P.$$typeof===r}function tt(P){var it={"=":"=0",":":"=2"};return"$"+P.replace(/[=:]/g,function(Mt){return it[Mt]})}var st=/\/+/g;function ht(P,it){return typeof P=="object"&&P!==null&&P.key!=null?tt(""+P.key):it.toString(36)}function mt(P){switch(P.status){case"fulfilled":return P.value;case"rejected":throw P.reason;default:switch(typeof P.status=="string"?P.then(I,I):(P.status="pending",P.then(function(it){P.status==="pending"&&(P.status="fulfilled",P.value=it)},function(it){P.status==="pending"&&(P.status="rejected",P.reason=it)})),P.status){case"fulfilled":return P.value;case"rejected":throw P.reason}}throw P}function z(P,it,Mt,Z,ut){var Et=typeof P;(Et==="undefined"||Et==="boolean")&&(P=null);var _t=!1;if(P===null)_t=!0;else switch(Et){case"bigint":case"string":case"number":_t=!0;break;case"object":switch(P.$$typeof){case r:case t:_t=!0;break;case v:return _t=P._init,z(_t(P._payload),it,Mt,Z,ut)}}if(_t)return ut=ut(P),_t=Z===""?"."+ht(P,0):Z,q(ut)?(Mt="",_t!=null&&(Mt=_t.replace(st,"$&/")+"/"),z(ut,it,Mt,"",function(oe){return oe})):ut!=null&&(H(ut)&&(ut=b(ut,Mt+(ut.key==null||P&&P.key===ut.key?"":(""+ut.key).replace(st,"$&/")+"/")+_t)),it.push(ut)),1;_t=0;var Vt=Z===""?".":Z+":";if(q(P))for(var Gt=0;Gt<P.length;Gt++)Z=P[Gt],Et=Vt+ht(Z,Gt),_t+=z(Z,it,Mt,Et,ut);else if(Gt=M(P),typeof Gt=="function")for(P=Gt.call(P),Gt=0;!(Z=P.next()).done;)Z=Z.value,Et=Vt+ht(Z,Gt++),_t+=z(Z,it,Mt,Et,ut);else if(Et==="object"){if(typeof P.then=="function")return z(mt(P),it,Mt,Z,ut);throw it=String(P),Error("Objects are not valid as a React child (found: "+(it==="[object Object]"?"object with keys {"+Object.keys(P).join(", ")+"}":it)+"). If you meant to render a collection of children, use an array instead.")}return _t}function Q(P,it,Mt){if(P==null)return P;var Z=[],ut=0;return z(P,Z,"","",function(Et){return it.call(Mt,Et,ut++)}),Z}function K(P){if(P._status===-1){var it=P._result;it=it(),it.then(function(Mt){(P._status===0||P._status===-1)&&(P._status=1,P._result=Mt)},function(Mt){(P._status===0||P._status===-1)&&(P._status=2,P._result=Mt)}),P._status===-1&&(P._status=0,P._result=it)}if(P._status===1)return P._result.default;throw P._result}var St=typeof reportError=="function"?reportError:function(P){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var it=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof P=="object"&&P!==null&&typeof P.message=="string"?String(P.message):String(P),error:P});if(!window.dispatchEvent(it))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",P);return}console.error(P)},Tt={map:Q,forEach:function(P,it,Mt){Q(P,function(){it.apply(this,arguments)},Mt)},count:function(P){var it=0;return Q(P,function(){it++}),it},toArray:function(P){return Q(P,function(it){return it})||[]},only:function(P){if(!H(P))throw Error("React.Children.only expected to receive a single React element child.");return P}};return re.Activity=g,re.Children=Tt,re.Component=_,re.Fragment=n,re.Profiler=l,re.PureComponent=U,re.StrictMode=a,re.Suspense=p,re.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=N,re.__COMPILER_RUNTIME={__proto__:null,c:function(P){return N.H.useMemoCache(P)}},re.cache=function(P){return function(){return P.apply(null,arguments)}},re.cacheSignal=function(){return null},re.cloneElement=function(P,it,Mt){if(P==null)throw Error("The argument must be a React element, but you passed "+P+".");var Z=T({},P.props),ut=P.key;if(it!=null)for(Et in it.key!==void 0&&(ut=""+it.key),it)!B.call(it,Et)||Et==="key"||Et==="__self"||Et==="__source"||Et==="ref"&&it.ref===void 0||(Z[Et]=it[Et]);var Et=arguments.length-2;if(Et===1)Z.children=Mt;else if(1<Et){for(var _t=Array(Et),Vt=0;Vt<Et;Vt++)_t[Vt]=arguments[Vt+2];Z.children=_t}return C(P.type,ut,Z)},re.createContext=function(P){return P={$$typeof:f,_currentValue:P,_currentValue2:P,_threadCount:0,Provider:null,Consumer:null},P.Provider=P,P.Consumer={$$typeof:c,_context:P},P},re.createElement=function(P,it,Mt){var Z,ut={},Et=null;if(it!=null)for(Z in it.key!==void 0&&(Et=""+it.key),it)B.call(it,Z)&&Z!=="key"&&Z!=="__self"&&Z!=="__source"&&(ut[Z]=it[Z]);var _t=arguments.length-2;if(_t===1)ut.children=Mt;else if(1<_t){for(var Vt=Array(_t),Gt=0;Gt<_t;Gt++)Vt[Gt]=arguments[Gt+2];ut.children=Vt}if(P&&P.defaultProps)for(Z in _t=P.defaultProps,_t)ut[Z]===void 0&&(ut[Z]=_t[Z]);return C(P,Et,ut)},re.createRef=function(){return{current:null}},re.forwardRef=function(P){return{$$typeof:d,render:P}},re.isValidElement=H,re.lazy=function(P){return{$$typeof:v,_payload:{_status:-1,_result:P},_init:K}},re.memo=function(P,it){return{$$typeof:m,type:P,compare:it===void 0?null:it}},re.startTransition=function(P){var it=N.T,Mt={};N.T=Mt;try{var Z=P(),ut=N.S;ut!==null&&ut(Mt,Z),typeof Z=="object"&&Z!==null&&typeof Z.then=="function"&&Z.then(I,St)}catch(Et){St(Et)}finally{it!==null&&Mt.types!==null&&(it.types=Mt.types),N.T=it}},re.unstable_useCacheRefresh=function(){return N.H.useCacheRefresh()},re.use=function(P){return N.H.use(P)},re.useActionState=function(P,it,Mt){return N.H.useActionState(P,it,Mt)},re.useCallback=function(P,it){return N.H.useCallback(P,it)},re.useContext=function(P){return N.H.useContext(P)},re.useDebugValue=function(){},re.useDeferredValue=function(P,it){return N.H.useDeferredValue(P,it)},re.useEffect=function(P,it){return N.H.useEffect(P,it)},re.useEffectEvent=function(P){return N.H.useEffectEvent(P)},re.useId=function(){return N.H.useId()},re.useImperativeHandle=function(P,it,Mt){return N.H.useImperativeHandle(P,it,Mt)},re.useInsertionEffect=function(P,it){return N.H.useInsertionEffect(P,it)},re.useLayoutEffect=function(P,it){return N.H.useLayoutEffect(P,it)},re.useMemo=function(P,it){return N.H.useMemo(P,it)},re.useOptimistic=function(P,it){return N.H.useOptimistic(P,it)},re.useReducer=function(P,it,Mt){return N.H.useReducer(P,it,Mt)},re.useRef=function(P){return N.H.useRef(P)},re.useState=function(P){return N.H.useState(P)},re.useSyncExternalStore=function(P,it,Mt){return N.H.useSyncExternalStore(P,it,Mt)},re.useTransition=function(){return N.H.useTransition()},re.version="19.2.8",re}var pv;function pp(){return pv||(pv=1,Uh.exports=ey()),Uh.exports}var Gr=pp();const ol=e_(Gr);var Nh={exports:{}},$o={},Oh={exports:{}},Ph={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mv;function ny(){return mv||(mv=1,(function(r){function t(z,Q){var K=z.length;z.push(Q);t:for(;0<K;){var St=K-1>>>1,Tt=z[St];if(0<l(Tt,Q))z[St]=Q,z[K]=Tt,K=St;else break t}}function n(z){return z.length===0?null:z[0]}function a(z){if(z.length===0)return null;var Q=z[0],K=z.pop();if(K!==Q){z[0]=K;t:for(var St=0,Tt=z.length,P=Tt>>>1;St<P;){var it=2*(St+1)-1,Mt=z[it],Z=it+1,ut=z[Z];if(0>l(Mt,K))Z<Tt&&0>l(ut,Mt)?(z[St]=ut,z[Z]=K,St=Z):(z[St]=Mt,z[it]=K,St=it);else if(Z<Tt&&0>l(ut,K))z[St]=ut,z[Z]=K,St=Z;else break t}}return Q}function l(z,Q){var K=z.sortIndex-Q.sortIndex;return K!==0?K:z.id-Q.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var f=Date,d=f.now();r.unstable_now=function(){return f.now()-d}}var p=[],m=[],v=1,g=null,x=3,M=!1,y=!1,T=!1,S=!1,_=typeof setTimeout=="function"?setTimeout:null,L=typeof clearTimeout=="function"?clearTimeout:null,U=typeof setImmediate<"u"?setImmediate:null;function R(z){for(var Q=n(m);Q!==null;){if(Q.callback===null)a(m);else if(Q.startTime<=z)a(m),Q.sortIndex=Q.expirationTime,t(p,Q);else break;Q=n(m)}}function q(z){if(T=!1,R(z),!y)if(n(p)!==null)y=!0,I||(I=!0,tt());else{var Q=n(m);Q!==null&&mt(q,Q.startTime-z)}}var I=!1,N=-1,B=5,C=-1;function b(){return S?!0:!(r.unstable_now()-C<B)}function H(){if(S=!1,I){var z=r.unstable_now();C=z;var Q=!0;try{t:{y=!1,T&&(T=!1,L(N),N=-1),M=!0;var K=x;try{e:{for(R(z),g=n(p);g!==null&&!(g.expirationTime>z&&b());){var St=g.callback;if(typeof St=="function"){g.callback=null,x=g.priorityLevel;var Tt=St(g.expirationTime<=z);if(z=r.unstable_now(),typeof Tt=="function"){g.callback=Tt,R(z),Q=!0;break e}g===n(p)&&a(p),R(z)}else a(p);g=n(p)}if(g!==null)Q=!0;else{var P=n(m);P!==null&&mt(q,P.startTime-z),Q=!1}}break t}finally{g=null,x=K,M=!1}Q=void 0}}finally{Q?tt():I=!1}}}var tt;if(typeof U=="function")tt=function(){U(H)};else if(typeof MessageChannel<"u"){var st=new MessageChannel,ht=st.port2;st.port1.onmessage=H,tt=function(){ht.postMessage(null)}}else tt=function(){_(H,0)};function mt(z,Q){N=_(function(){z(r.unstable_now())},Q)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(z){z.callback=null},r.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):B=0<z?Math.floor(1e3/z):5},r.unstable_getCurrentPriorityLevel=function(){return x},r.unstable_next=function(z){switch(x){case 1:case 2:case 3:var Q=3;break;default:Q=x}var K=x;x=Q;try{return z()}finally{x=K}},r.unstable_requestPaint=function(){S=!0},r.unstable_runWithPriority=function(z,Q){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var K=x;x=z;try{return Q()}finally{x=K}},r.unstable_scheduleCallback=function(z,Q,K){var St=r.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?St+K:St):K=St,z){case 1:var Tt=-1;break;case 2:Tt=250;break;case 5:Tt=1073741823;break;case 4:Tt=1e4;break;default:Tt=5e3}return Tt=K+Tt,z={id:v++,callback:Q,priorityLevel:z,startTime:K,expirationTime:Tt,sortIndex:-1},K>St?(z.sortIndex=K,t(m,z),n(p)===null&&z===n(m)&&(T?(L(N),N=-1):T=!0,mt(q,K-St))):(z.sortIndex=Tt,t(p,z),y||M||(y=!0,I||(I=!0,tt()))),z},r.unstable_shouldYield=b,r.unstable_wrapCallback=function(z){var Q=x;return function(){var K=x;x=Q;try{return z.apply(this,arguments)}finally{x=K}}}})(Ph)),Ph}var gv;function iy(){return gv||(gv=1,Oh.exports=ny()),Oh.exports}var zh={exports:{}},Hn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var vv;function ay(){if(vv)return Hn;vv=1;var r=pp();function t(p){var m="https://react.dev/errors/"+p;if(1<arguments.length){m+="?args[]="+encodeURIComponent(arguments[1]);for(var v=2;v<arguments.length;v++)m+="&args[]="+encodeURIComponent(arguments[v])}return"Minified React error #"+p+"; visit "+m+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n(){}var a={d:{f:n,r:function(){throw Error(t(522))},D:n,C:n,L:n,m:n,X:n,S:n,M:n},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(p,m,v){var g=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:g==null?null:""+g,children:p,containerInfo:m,implementation:v}}var f=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(p,m){if(p==="font")return"";if(typeof m=="string")return m==="use-credentials"?m:""}return Hn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=a,Hn.createPortal=function(p,m){var v=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!m||m.nodeType!==1&&m.nodeType!==9&&m.nodeType!==11)throw Error(t(299));return c(p,m,null,v)},Hn.flushSync=function(p){var m=f.T,v=a.p;try{if(f.T=null,a.p=2,p)return p()}finally{f.T=m,a.p=v,a.d.f()}},Hn.preconnect=function(p,m){typeof p=="string"&&(m?(m=m.crossOrigin,m=typeof m=="string"?m==="use-credentials"?m:"":void 0):m=null,a.d.C(p,m))},Hn.prefetchDNS=function(p){typeof p=="string"&&a.d.D(p)},Hn.preinit=function(p,m){if(typeof p=="string"&&m&&typeof m.as=="string"){var v=m.as,g=d(v,m.crossOrigin),x=typeof m.integrity=="string"?m.integrity:void 0,M=typeof m.fetchPriority=="string"?m.fetchPriority:void 0;v==="style"?a.d.S(p,typeof m.precedence=="string"?m.precedence:void 0,{crossOrigin:g,integrity:x,fetchPriority:M}):v==="script"&&a.d.X(p,{crossOrigin:g,integrity:x,fetchPriority:M,nonce:typeof m.nonce=="string"?m.nonce:void 0})}},Hn.preinitModule=function(p,m){if(typeof p=="string")if(typeof m=="object"&&m!==null){if(m.as==null||m.as==="script"){var v=d(m.as,m.crossOrigin);a.d.M(p,{crossOrigin:v,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0})}}else m==null&&a.d.M(p)},Hn.preload=function(p,m){if(typeof p=="string"&&typeof m=="object"&&m!==null&&typeof m.as=="string"){var v=m.as,g=d(v,m.crossOrigin);a.d.L(p,v,{crossOrigin:g,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,type:typeof m.type=="string"?m.type:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0,referrerPolicy:typeof m.referrerPolicy=="string"?m.referrerPolicy:void 0,imageSrcSet:typeof m.imageSrcSet=="string"?m.imageSrcSet:void 0,imageSizes:typeof m.imageSizes=="string"?m.imageSizes:void 0,media:typeof m.media=="string"?m.media:void 0})}},Hn.preloadModule=function(p,m){if(typeof p=="string")if(m){var v=d(m.as,m.crossOrigin);a.d.m(p,{as:typeof m.as=="string"&&m.as!=="script"?m.as:void 0,crossOrigin:v,integrity:typeof m.integrity=="string"?m.integrity:void 0})}else a.d.m(p)},Hn.requestFormReset=function(p){a.d.r(p)},Hn.unstable_batchedUpdates=function(p,m){return p(m)},Hn.useFormState=function(p,m,v){return f.H.useFormState(p,m,v)},Hn.useFormStatus=function(){return f.H.useHostTransitionStatus()},Hn.version="19.2.8",Hn}var xv;function sy(){if(xv)return zh.exports;xv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),zh.exports=ay(),zh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _v;function ry(){if(_v)return $o;_v=1;var r=iy(),t=pp(),n=sy();function a(e){var i="https://react.dev/errors/"+e;if(1<arguments.length){i+="?args[]="+encodeURIComponent(arguments[1]);for(var s=2;s<arguments.length;s++)i+="&args[]="+encodeURIComponent(arguments[s])}return"Minified React error #"+e+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function c(e){var i=e,s=e;if(e.alternate)for(;i.return;)i=i.return;else{e=i;do i=e,(i.flags&4098)!==0&&(s=i.return),e=i.return;while(e)}return i.tag===3?s:null}function f(e){if(e.tag===13){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function d(e){if(e.tag===31){var i=e.memoizedState;if(i===null&&(e=e.alternate,e!==null&&(i=e.memoizedState)),i!==null)return i.dehydrated}return null}function p(e){if(c(e)!==e)throw Error(a(188))}function m(e){var i=e.alternate;if(!i){if(i=c(e),i===null)throw Error(a(188));return i!==e?null:e}for(var s=e,o=i;;){var u=s.return;if(u===null)break;var h=u.alternate;if(h===null){if(o=u.return,o!==null){s=o;continue}break}if(u.child===h.child){for(h=u.child;h;){if(h===s)return p(u),e;if(h===o)return p(u),i;h=h.sibling}throw Error(a(188))}if(s.return!==o.return)s=u,o=h;else{for(var E=!1,A=u.child;A;){if(A===s){E=!0,s=u,o=h;break}if(A===o){E=!0,o=u,s=h;break}A=A.sibling}if(!E){for(A=h.child;A;){if(A===s){E=!0,s=h,o=u;break}if(A===o){E=!0,o=h,s=u;break}A=A.sibling}if(!E)throw Error(a(189))}}if(s.alternate!==o)throw Error(a(190))}if(s.tag!==3)throw Error(a(188));return s.stateNode.current===s?e:i}function v(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e;for(e=e.child;e!==null;){if(i=v(e),i!==null)return i;e=e.sibling}return null}var g=Object.assign,x=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),y=Symbol.for("react.portal"),T=Symbol.for("react.fragment"),S=Symbol.for("react.strict_mode"),_=Symbol.for("react.profiler"),L=Symbol.for("react.consumer"),U=Symbol.for("react.context"),R=Symbol.for("react.forward_ref"),q=Symbol.for("react.suspense"),I=Symbol.for("react.suspense_list"),N=Symbol.for("react.memo"),B=Symbol.for("react.lazy"),C=Symbol.for("react.activity"),b=Symbol.for("react.memo_cache_sentinel"),H=Symbol.iterator;function tt(e){return e===null||typeof e!="object"?null:(e=H&&e[H]||e["@@iterator"],typeof e=="function"?e:null)}var st=Symbol.for("react.client.reference");function ht(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===st?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case T:return"Fragment";case _:return"Profiler";case S:return"StrictMode";case q:return"Suspense";case I:return"SuspenseList";case C:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case y:return"Portal";case U:return e.displayName||"Context";case L:return(e._context.displayName||"Context")+".Consumer";case R:var i=e.render;return e=e.displayName,e||(e=i.displayName||i.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case N:return i=e.displayName||null,i!==null?i:ht(e.type)||"Memo";case B:i=e._payload,e=e._init;try{return ht(e(i))}catch{}}return null}var mt=Array.isArray,z=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Q=n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K={pending:!1,data:null,method:null,action:null},St=[],Tt=-1;function P(e){return{current:e}}function it(e){0>Tt||(e.current=St[Tt],St[Tt]=null,Tt--)}function Mt(e,i){Tt++,St[Tt]=e.current,e.current=i}var Z=P(null),ut=P(null),Et=P(null),_t=P(null);function Vt(e,i){switch(Mt(Et,i),Mt(ut,e),Mt(Z,null),i.nodeType){case 9:case 11:e=(e=i.documentElement)&&(e=e.namespaceURI)?Og(e):0;break;default:if(e=i.tagName,i=i.namespaceURI)i=Og(i),e=Pg(i,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}it(Z),Mt(Z,e)}function Gt(){it(Z),it(ut),it(Et)}function oe(e){e.memoizedState!==null&&Mt(_t,e);var i=Z.current,s=Pg(i,e.type);i!==s&&(Mt(ut,e),Mt(Z,s))}function Ge(e){ut.current===e&&(it(Z),it(ut)),_t.current===e&&(it(_t),Yo._currentValue=K)}var ge,$e;function j(e){if(ge===void 0)try{throw Error()}catch(s){var i=s.stack.trim().match(/\n( *(at )?)/);ge=i&&i[1]||"",$e=-1<s.stack.indexOf(`
    at`)?" (<anonymous>)":-1<s.stack.indexOf("@")?"@unknown:0:0":""}return`
`+ge+e+$e}var Bn=!1;function me(e,i){if(!e||Bn)return"";Bn=!0;var s=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(i){var vt=function(){throw Error()};if(Object.defineProperty(vt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(vt,[])}catch(ot){var et=ot}Reflect.construct(e,[],vt)}else{try{vt.call()}catch(ot){et=ot}e.call(vt.prototype)}}else{try{throw Error()}catch(ot){et=ot}(vt=e())&&typeof vt.catch=="function"&&vt.catch(function(){})}}catch(ot){if(ot&&et&&typeof ot.stack=="string")return[ot.stack,et.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var h=o.DetermineComponentFrameRoot(),E=h[0],A=h[1];if(E&&A){var F=E.split(`
`),$=A.split(`
`);for(u=o=0;o<F.length&&!F[o].includes("DetermineComponentFrameRoot");)o++;for(;u<$.length&&!$[u].includes("DetermineComponentFrameRoot");)u++;if(o===F.length||u===$.length)for(o=F.length-1,u=$.length-1;1<=o&&0<=u&&F[o]!==$[u];)u--;for(;1<=o&&0<=u;o--,u--)if(F[o]!==$[u]){if(o!==1||u!==1)do if(o--,u--,0>u||F[o]!==$[u]){var ft=`
`+F[o].replace(" at new "," at ");return e.displayName&&ft.includes("<anonymous>")&&(ft=ft.replace("<anonymous>",e.displayName)),ft}while(1<=o&&0<=u);break}}}finally{Bn=!1,Error.prepareStackTrace=s}return(s=e?e.displayName||e.name:"")?j(s):""}function _e(e,i){switch(e.tag){case 26:case 27:case 5:return j(e.type);case 16:return j("Lazy");case 13:return e.child!==i&&i!==null?j("Suspense Fallback"):j("Suspense");case 19:return j("SuspenseList");case 0:case 15:return me(e.type,!1);case 11:return me(e.type.render,!1);case 1:return me(e.type,!0);case 31:return j("Activity");default:return""}}function Qt(e){try{var i="",s=null;do i+=_e(e,s),s=e,e=e.return;while(e);return i}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var ze=Object.prototype.hasOwnProperty,Zt=r.unstable_scheduleCallback,O=r.unstable_cancelCallback,w=r.unstable_shouldYield,nt=r.unstable_requestPaint,dt=r.unstable_now,yt=r.unstable_getCurrentPriorityLevel,gt=r.unstable_ImmediatePriority,qt=r.unstable_UserBlockingPriority,Lt=r.unstable_NormalPriority,zt=r.unstable_LowPriority,Me=r.unstable_IdlePriority,At=r.log,Bt=r.unstable_setDisableYieldValue,Kt=null,jt=null;function Ot(e){if(typeof At=="function"&&Bt(e),jt&&typeof jt.setStrictMode=="function")try{jt.setStrictMode(Kt,e)}catch{}}var ie=Math.clz32?Math.clz32:k,ce=Math.log,Ve=Math.LN2;function k(e){return e>>>=0,e===0?32:31-(ce(e)/Ve|0)|0}var wt=256,ct=262144,xt=4194304;function Rt(e){var i=e&42;if(i!==0)return i;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ut(e,i,s){var o=e.pendingLanes;if(o===0)return 0;var u=0,h=e.suspendedLanes,E=e.pingedLanes;e=e.warmLanes;var A=o&134217727;return A!==0?(o=A&~h,o!==0?u=Rt(o):(E&=A,E!==0?u=Rt(E):s||(s=A&~e,s!==0&&(u=Rt(s))))):(A=o&~h,A!==0?u=Rt(A):E!==0?u=Rt(E):s||(s=o&~e,s!==0&&(u=Rt(s)))),u===0?0:i!==0&&i!==u&&(i&h)===0&&(h=u&-u,s=i&-i,h>=s||h===32&&(s&4194048)!==0)?i:u}function ae(e,i){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&i)===0}function tn(e,i){switch(e){case 1:case 2:case 4:case 8:case 64:return i+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function vn(){var e=xt;return xt<<=1,(xt&62914560)===0&&(xt=4194304),e}function Ce(e){for(var i=[],s=0;31>s;s++)i.push(e);return i}function Cn(e,i){e.pendingLanes|=i,i!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Ni(e,i,s,o,u,h){var E=e.pendingLanes;e.pendingLanes=s,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=s,e.entangledLanes&=s,e.errorRecoveryDisabledLanes&=s,e.shellSuspendCounter=0;var A=e.entanglements,F=e.expirationTimes,$=e.hiddenUpdates;for(s=E&~s;0<s;){var ft=31-ie(s),vt=1<<ft;A[ft]=0,F[ft]=-1;var et=$[ft];if(et!==null)for($[ft]=null,ft=0;ft<et.length;ft++){var ot=et[ft];ot!==null&&(ot.lane&=-536870913)}s&=~vt}o!==0&&ro(e,o,0),h!==0&&u===0&&e.tag!==0&&(e.suspendedLanes|=h&~(E&~i))}function ro(e,i,s){e.pendingLanes|=i,e.suspendedLanes&=~i;var o=31-ie(i);e.entangledLanes|=i,e.entanglements[o]=e.entanglements[o]|1073741824|s&261930}function oo(e,i){var s=e.entangledLanes|=i;for(e=e.entanglements;s;){var o=31-ie(s),u=1<<o;u&i|e[o]&i&&(e[o]|=i),s&=~u}}function Wi(e,i){var s=i&-i;return s=(s&42)!==0?1:ds(s),(s&(e.suspendedLanes|i))!==0?0:s}function ds(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function js(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function lo(){var e=Q.p;return e!==0?e:(e=window.event,e===void 0?32:av(e.type))}function ps(e,i){var s=Q.p;try{return Q.p=e,i()}finally{Q.p=s}}var Oi=Math.random().toString(36).slice(2),rn="__reactFiber$"+Oi,Dn="__reactProps$"+Oi,$i="__reactContainer$"+Oi,co="__reactEvents$"+Oi,Tu="__reactListeners$"+Oi,bu="__reactHandles$"+Oi,D="__reactResources$"+Oi,X="__reactMarker$"+Oi;function rt(e){delete e[rn],delete e[Dn],delete e[co],delete e[Tu],delete e[bu]}function at(e){var i=e[rn];if(i)return i;for(var s=e.parentNode;s;){if(i=s[$i]||s[rn]){if(s=i.alternate,i.child!==null||s!==null&&s.child!==null)for(e=Vg(e);e!==null;){if(s=e[rn])return s;e=Vg(e)}return i}e=s,s=e.parentNode}return null}function W(e){if(e=e[rn]||e[$i]){var i=e.tag;if(i===5||i===6||i===13||i===31||i===26||i===27||i===3)return e}return null}function bt(e){var i=e.tag;if(i===5||i===26||i===27||i===6)return e.stateNode;throw Error(a(33))}function Ct(e){var i=e[D];return i||(i=e[D]={hoistableStyles:new Map,hoistableScripts:new Map}),i}function Dt(e){e[X]=!0}var kt=new Set,se={};function ee(e,i){It(e,i),It(e+"Capture",i)}function It(e,i){for(se[e]=i,e=0;e<i.length;e++)kt.add(i[e])}var we=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Be={},ke={};function In(e){return ze.call(ke,e)?!0:ze.call(Be,e)?!1:we.test(e)?ke[e]=!0:(Be[e]=!0,!1)}function be(e,i,s){if(In(i))if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":e.removeAttribute(i);return;case"boolean":var o=i.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){e.removeAttribute(i);return}}e.setAttribute(i,""+s)}}function Xt(e,i,s){if(s===null)e.removeAttribute(i);else{switch(typeof s){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(i);return}e.setAttribute(i,""+s)}}function xn(e,i,s,o){if(o===null)e.removeAttribute(s);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(s);return}e.setAttributeNS(i,s,""+o)}}function le(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function jn(e){var i=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function La(e,i,s){var o=Object.getOwnPropertyDescriptor(e.constructor.prototype,i);if(!e.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,h=o.set;return Object.defineProperty(e,i,{configurable:!0,get:function(){return u.call(this)},set:function(E){s=""+E,h.call(this,E)}}),Object.defineProperty(e,i,{enumerable:o.enumerable}),{getValue:function(){return s},setValue:function(E){s=""+E},stopTracking:function(){e._valueTracker=null,delete e[i]}}}}function Ln(e){if(!e._valueTracker){var i=jn(e)?"checked":"value";e._valueTracker=La(e,i,""+e[i])}}function Ua(e){if(!e)return!1;var i=e._valueTracker;if(!i)return!0;var s=i.getValue(),o="";return e&&(o=jn(e)?e.checked?"true":"false":e.value),e=o,e!==s?(i.setValue(e),!0):!1}function Pe(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var vi=/[\n"\\]/g;function yn(e){return e.replace(vi,function(i){return"\\"+i.charCodeAt(0).toString(16)+" "})}function Fn(e,i,s,o,u,h,E,A){e.name="",E!=null&&typeof E!="function"&&typeof E!="symbol"&&typeof E!="boolean"?e.type=E:e.removeAttribute("type"),i!=null?E==="number"?(i===0&&e.value===""||e.value!=i)&&(e.value=""+le(i)):e.value!==""+le(i)&&(e.value=""+le(i)):E!=="submit"&&E!=="reset"||e.removeAttribute("value"),i!=null?xi(e,E,le(i)):s!=null?xi(e,E,le(s)):o!=null&&e.removeAttribute("value"),u==null&&h!=null&&(e.defaultChecked=!!h),u!=null&&(e.checked=u&&typeof u!="function"&&typeof u!="symbol"),A!=null&&typeof A!="function"&&typeof A!="symbol"&&typeof A!="boolean"?e.name=""+le(A):e.removeAttribute("name")}function Pi(e,i,s,o,u,h,E,A){if(h!=null&&typeof h!="function"&&typeof h!="symbol"&&typeof h!="boolean"&&(e.type=h),i!=null||s!=null){if(!(h!=="submit"&&h!=="reset"||i!=null)){Ln(e);return}s=s!=null?""+le(s):"",i=i!=null?""+le(i):s,A||i===e.value||(e.value=i),e.defaultValue=i}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,e.checked=A?e.checked:!!o,e.defaultChecked=!!o,E!=null&&typeof E!="function"&&typeof E!="symbol"&&typeof E!="boolean"&&(e.name=E),Ln(e)}function xi(e,i,s){i==="number"&&Pe(e.ownerDocument)===e||e.defaultValue===""+s||(e.defaultValue=""+s)}function ta(e,i,s,o){if(e=e.options,i){i={};for(var u=0;u<s.length;u++)i["$"+s[u]]=!0;for(s=0;s<e.length;s++)u=i.hasOwnProperty("$"+e[s].value),e[s].selected!==u&&(e[s].selected=u),u&&o&&(e[s].defaultSelected=!0)}else{for(s=""+le(s),i=null,u=0;u<e.length;u++){if(e[u].value===s){e[u].selected=!0,o&&(e[u].defaultSelected=!0);return}i!==null||e[u].disabled||(i=e[u])}i!==null&&(i.selected=!0)}}function Cp(e,i,s){if(i!=null&&(i=""+le(i),i!==e.value&&(e.value=i),s==null)){e.defaultValue!==i&&(e.defaultValue=i);return}e.defaultValue=s!=null?""+le(s):""}function Dp(e,i,s,o){if(i==null){if(o!=null){if(s!=null)throw Error(a(92));if(mt(o)){if(1<o.length)throw Error(a(93));o=o[0]}s=o}s==null&&(s=""),i=s}s=le(i),e.defaultValue=s,o=e.textContent,o===s&&o!==""&&o!==null&&(e.value=o),Ln(e)}function Ys(e,i){if(i){var s=e.firstChild;if(s&&s===e.lastChild&&s.nodeType===3){s.nodeValue=i;return}}e.textContent=i}var q_=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Lp(e,i,s){var o=i.indexOf("--")===0;s==null||typeof s=="boolean"||s===""?o?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="":o?e.setProperty(i,s):typeof s!="number"||s===0||q_.has(i)?i==="float"?e.cssFloat=s:e[i]=(""+s).trim():e[i]=s+"px"}function Up(e,i,s){if(i!=null&&typeof i!="object")throw Error(a(62));if(e=e.style,s!=null){for(var o in s)!s.hasOwnProperty(o)||i!=null&&i.hasOwnProperty(o)||(o.indexOf("--")===0?e.setProperty(o,""):o==="float"?e.cssFloat="":e[o]="");for(var u in i)o=i[u],i.hasOwnProperty(u)&&s[u]!==o&&Lp(e,u,o)}else for(var h in i)i.hasOwnProperty(h)&&Lp(e,h,i[h])}function Au(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var j_=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Y_=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function gl(e){return Y_.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function ea(){}var wu=null;function Ru(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Zs=null,Ks=null;function Np(e){var i=W(e);if(i&&(e=i.stateNode)){var s=e[Dn]||null;t:switch(e=i.stateNode,i.type){case"input":if(Fn(e,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name),i=s.name,s.type==="radio"&&i!=null){for(s=e;s.parentNode;)s=s.parentNode;for(s=s.querySelectorAll('input[name="'+yn(""+i)+'"][type="radio"]'),i=0;i<s.length;i++){var o=s[i];if(o!==e&&o.form===e.form){var u=o[Dn]||null;if(!u)throw Error(a(90));Fn(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(i=0;i<s.length;i++)o=s[i],o.form===e.form&&Ua(o)}break t;case"textarea":Cp(e,s.value,s.defaultValue);break t;case"select":i=s.value,i!=null&&ta(e,!!s.multiple,i,!1)}}}var Cu=!1;function Op(e,i,s){if(Cu)return e(i,s);Cu=!0;try{var o=e(i);return o}finally{if(Cu=!1,(Zs!==null||Ks!==null)&&(ic(),Zs&&(i=Zs,e=Ks,Ks=Zs=null,Np(i),e)))for(i=0;i<e.length;i++)Np(e[i])}}function uo(e,i){var s=e.stateNode;if(s===null)return null;var o=s[Dn]||null;if(o===null)return null;s=o[i];t:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(e=e.type,o=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!o;break t;default:e=!1}if(e)return null;if(s&&typeof s!="function")throw Error(a(231,i,typeof s));return s}var na=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Du=!1;if(na)try{var fo={};Object.defineProperty(fo,"passive",{get:function(){Du=!0}}),window.addEventListener("test",fo,fo),window.removeEventListener("test",fo,fo)}catch{Du=!1}var Na=null,Lu=null,vl=null;function Pp(){if(vl)return vl;var e,i=Lu,s=i.length,o,u="value"in Na?Na.value:Na.textContent,h=u.length;for(e=0;e<s&&i[e]===u[e];e++);var E=s-e;for(o=1;o<=E&&i[s-o]===u[h-o];o++);return vl=u.slice(e,1<o?1-o:void 0)}function xl(e){var i=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&i===13&&(e=13)):e=i,e===10&&(e=13),32<=e||e===13?e:0}function _l(){return!0}function zp(){return!1}function Yn(e){function i(s,o,u,h,E){this._reactName=s,this._targetInst=u,this.type=o,this.nativeEvent=h,this.target=E,this.currentTarget=null;for(var A in e)e.hasOwnProperty(A)&&(s=e[A],this[A]=s?s(h):h[A]);return this.isDefaultPrevented=(h.defaultPrevented!=null?h.defaultPrevented:h.returnValue===!1)?_l:zp,this.isPropagationStopped=zp,this}return g(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var s=this.nativeEvent;s&&(s.preventDefault?s.preventDefault():typeof s.returnValue!="unknown"&&(s.returnValue=!1),this.isDefaultPrevented=_l)},stopPropagation:function(){var s=this.nativeEvent;s&&(s.stopPropagation?s.stopPropagation():typeof s.cancelBubble!="unknown"&&(s.cancelBubble=!0),this.isPropagationStopped=_l)},persist:function(){},isPersistent:_l}),i}var ms={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ml=Yn(ms),ho=g({},ms,{view:0,detail:0}),Z_=Yn(ho),Uu,Nu,po,Sl=g({},ho,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Pu,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==po&&(po&&e.type==="mousemove"?(Uu=e.screenX-po.screenX,Nu=e.screenY-po.screenY):Nu=Uu=0,po=e),Uu)},movementY:function(e){return"movementY"in e?e.movementY:Nu}}),Bp=Yn(Sl),K_=g({},Sl,{dataTransfer:0}),Q_=Yn(K_),J_=g({},ho,{relatedTarget:0}),Ou=Yn(J_),$_=g({},ms,{animationName:0,elapsedTime:0,pseudoElement:0}),tM=Yn($_),eM=g({},ms,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),nM=Yn(eM),iM=g({},ms,{data:0}),Ip=Yn(iM),aM={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},sM={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},rM={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function oM(e){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(e):(e=rM[e])?!!i[e]:!1}function Pu(){return oM}var lM=g({},ho,{key:function(e){if(e.key){var i=aM[e.key]||e.key;if(i!=="Unidentified")return i}return e.type==="keypress"?(e=xl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?sM[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Pu,charCode:function(e){return e.type==="keypress"?xl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?xl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),cM=Yn(lM),uM=g({},Sl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Fp=Yn(uM),fM=g({},ho,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Pu}),hM=Yn(fM),dM=g({},ms,{propertyName:0,elapsedTime:0,pseudoElement:0}),pM=Yn(dM),mM=g({},Sl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),gM=Yn(mM),vM=g({},ms,{newState:0,oldState:0}),xM=Yn(vM),_M=[9,13,27,32],zu=na&&"CompositionEvent"in window,mo=null;na&&"documentMode"in document&&(mo=document.documentMode);var MM=na&&"TextEvent"in window&&!mo,Hp=na&&(!zu||mo&&8<mo&&11>=mo),Gp=" ",Vp=!1;function kp(e,i){switch(e){case"keyup":return _M.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Xp(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Qs=!1;function SM(e,i){switch(e){case"compositionend":return Xp(i);case"keypress":return i.which!==32?null:(Vp=!0,Gp);case"textInput":return e=i.data,e===Gp&&Vp?null:e;default:return null}}function yM(e,i){if(Qs)return e==="compositionend"||!zu&&kp(e,i)?(e=Pp(),vl=Lu=Na=null,Qs=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Hp&&i.locale!=="ko"?null:i.data;default:return null}}var EM={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Wp(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i==="input"?!!EM[e.type]:i==="textarea"}function qp(e,i,s,o){Zs?Ks?Ks.push(o):Ks=[o]:Zs=o,i=uc(i,"onChange"),0<i.length&&(s=new Ml("onChange","change",null,s,o),e.push({event:s,listeners:i}))}var go=null,vo=null;function TM(e){Rg(e,0)}function yl(e){var i=bt(e);if(Ua(i))return e}function jp(e,i){if(e==="change")return i}var Yp=!1;if(na){var Bu;if(na){var Iu="oninput"in document;if(!Iu){var Zp=document.createElement("div");Zp.setAttribute("oninput","return;"),Iu=typeof Zp.oninput=="function"}Bu=Iu}else Bu=!1;Yp=Bu&&(!document.documentMode||9<document.documentMode)}function Kp(){go&&(go.detachEvent("onpropertychange",Qp),vo=go=null)}function Qp(e){if(e.propertyName==="value"&&yl(vo)){var i=[];qp(i,vo,e,Ru(e)),Op(TM,i)}}function bM(e,i,s){e==="focusin"?(Kp(),go=i,vo=s,go.attachEvent("onpropertychange",Qp)):e==="focusout"&&Kp()}function AM(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return yl(vo)}function wM(e,i){if(e==="click")return yl(i)}function RM(e,i){if(e==="input"||e==="change")return yl(i)}function CM(e,i){return e===i&&(e!==0||1/e===1/i)||e!==e&&i!==i}var ai=typeof Object.is=="function"?Object.is:CM;function xo(e,i){if(ai(e,i))return!0;if(typeof e!="object"||e===null||typeof i!="object"||i===null)return!1;var s=Object.keys(e),o=Object.keys(i);if(s.length!==o.length)return!1;for(o=0;o<s.length;o++){var u=s[o];if(!ze.call(i,u)||!ai(e[u],i[u]))return!1}return!0}function Jp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function $p(e,i){var s=Jp(e);e=0;for(var o;s;){if(s.nodeType===3){if(o=e+s.textContent.length,e<=i&&o>=i)return{node:s,offset:i-e};e=o}t:{for(;s;){if(s.nextSibling){s=s.nextSibling;break t}s=s.parentNode}s=void 0}s=Jp(s)}}function tm(e,i){return e&&i?e===i?!0:e&&e.nodeType===3?!1:i&&i.nodeType===3?tm(e,i.parentNode):"contains"in e?e.contains(i):e.compareDocumentPosition?!!(e.compareDocumentPosition(i)&16):!1:!1}function em(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var i=Pe(e.document);i instanceof e.HTMLIFrameElement;){try{var s=typeof i.contentWindow.location.href=="string"}catch{s=!1}if(s)e=i.contentWindow;else break;i=Pe(e.document)}return i}function Fu(e){var i=e&&e.nodeName&&e.nodeName.toLowerCase();return i&&(i==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||i==="textarea"||e.contentEditable==="true")}var DM=na&&"documentMode"in document&&11>=document.documentMode,Js=null,Hu=null,_o=null,Gu=!1;function nm(e,i,s){var o=s.window===s?s.document:s.nodeType===9?s:s.ownerDocument;Gu||Js==null||Js!==Pe(o)||(o=Js,"selectionStart"in o&&Fu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),_o&&xo(_o,o)||(_o=o,o=uc(Hu,"onSelect"),0<o.length&&(i=new Ml("onSelect","select",null,i,s),e.push({event:i,listeners:o}),i.target=Js)))}function gs(e,i){var s={};return s[e.toLowerCase()]=i.toLowerCase(),s["Webkit"+e]="webkit"+i,s["Moz"+e]="moz"+i,s}var $s={animationend:gs("Animation","AnimationEnd"),animationiteration:gs("Animation","AnimationIteration"),animationstart:gs("Animation","AnimationStart"),transitionrun:gs("Transition","TransitionRun"),transitionstart:gs("Transition","TransitionStart"),transitioncancel:gs("Transition","TransitionCancel"),transitionend:gs("Transition","TransitionEnd")},Vu={},im={};na&&(im=document.createElement("div").style,"AnimationEvent"in window||(delete $s.animationend.animation,delete $s.animationiteration.animation,delete $s.animationstart.animation),"TransitionEvent"in window||delete $s.transitionend.transition);function vs(e){if(Vu[e])return Vu[e];if(!$s[e])return e;var i=$s[e],s;for(s in i)if(i.hasOwnProperty(s)&&s in im)return Vu[e]=i[s];return e}var am=vs("animationend"),sm=vs("animationiteration"),rm=vs("animationstart"),LM=vs("transitionrun"),UM=vs("transitionstart"),NM=vs("transitioncancel"),om=vs("transitionend"),lm=new Map,ku="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");ku.push("scrollEnd");function zi(e,i){lm.set(e,i),ee(i,[e])}var El=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var i=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(i))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},_i=[],tr=0,Xu=0;function Tl(){for(var e=tr,i=Xu=tr=0;i<e;){var s=_i[i];_i[i++]=null;var o=_i[i];_i[i++]=null;var u=_i[i];_i[i++]=null;var h=_i[i];if(_i[i++]=null,o!==null&&u!==null){var E=o.pending;E===null?u.next=u:(u.next=E.next,E.next=u),o.pending=u}h!==0&&cm(s,u,h)}}function bl(e,i,s,o){_i[tr++]=e,_i[tr++]=i,_i[tr++]=s,_i[tr++]=o,Xu|=o,e.lanes|=o,e=e.alternate,e!==null&&(e.lanes|=o)}function Wu(e,i,s,o){return bl(e,i,s,o),Al(e)}function xs(e,i){return bl(e,null,null,i),Al(e)}function cm(e,i,s){e.lanes|=s;var o=e.alternate;o!==null&&(o.lanes|=s);for(var u=!1,h=e.return;h!==null;)h.childLanes|=s,o=h.alternate,o!==null&&(o.childLanes|=s),h.tag===22&&(e=h.stateNode,e===null||e._visibility&1||(u=!0)),e=h,h=h.return;return e.tag===3?(h=e.stateNode,u&&i!==null&&(u=31-ie(s),e=h.hiddenUpdates,o=e[u],o===null?e[u]=[i]:o.push(i),i.lane=s|536870912),h):null}function Al(e){if(50<Go)throw Go=0,eh=null,Error(a(185));for(var i=e.return;i!==null;)e=i,i=e.return;return e.tag===3?e.stateNode:null}var er={};function OM(e,i,s,o){this.tag=e,this.key=s,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function si(e,i,s,o){return new OM(e,i,s,o)}function qu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ia(e,i){var s=e.alternate;return s===null?(s=si(e.tag,i,e.key,e.mode),s.elementType=e.elementType,s.type=e.type,s.stateNode=e.stateNode,s.alternate=e,e.alternate=s):(s.pendingProps=i,s.type=e.type,s.flags=0,s.subtreeFlags=0,s.deletions=null),s.flags=e.flags&65011712,s.childLanes=e.childLanes,s.lanes=e.lanes,s.child=e.child,s.memoizedProps=e.memoizedProps,s.memoizedState=e.memoizedState,s.updateQueue=e.updateQueue,i=e.dependencies,s.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},s.sibling=e.sibling,s.index=e.index,s.ref=e.ref,s.refCleanup=e.refCleanup,s}function um(e,i){e.flags&=65011714;var s=e.alternate;return s===null?(e.childLanes=0,e.lanes=i,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=s.childLanes,e.lanes=s.lanes,e.child=s.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=s.memoizedProps,e.memoizedState=s.memoizedState,e.updateQueue=s.updateQueue,e.type=s.type,i=s.dependencies,e.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext}),e}function wl(e,i,s,o,u,h){var E=0;if(o=e,typeof e=="function")qu(e)&&(E=1);else if(typeof e=="string")E=FS(e,s,Z.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case C:return e=si(31,s,i,u),e.elementType=C,e.lanes=h,e;case T:return _s(s.children,u,h,i);case S:E=8,u|=24;break;case _:return e=si(12,s,i,u|2),e.elementType=_,e.lanes=h,e;case q:return e=si(13,s,i,u),e.elementType=q,e.lanes=h,e;case I:return e=si(19,s,i,u),e.elementType=I,e.lanes=h,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case U:E=10;break t;case L:E=9;break t;case R:E=11;break t;case N:E=14;break t;case B:E=16,o=null;break t}E=29,s=Error(a(130,e===null?"null":typeof e,"")),o=null}return i=si(E,s,i,u),i.elementType=e,i.type=o,i.lanes=h,i}function _s(e,i,s,o){return e=si(7,e,o,i),e.lanes=s,e}function ju(e,i,s){return e=si(6,e,null,i),e.lanes=s,e}function fm(e){var i=si(18,null,null,0);return i.stateNode=e,i}function Yu(e,i,s){return i=si(4,e.children!==null?e.children:[],e.key,i),i.lanes=s,i.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},i}var hm=new WeakMap;function Mi(e,i){if(typeof e=="object"&&e!==null){var s=hm.get(e);return s!==void 0?s:(i={value:e,source:i,stack:Qt(i)},hm.set(e,i),i)}return{value:e,source:i,stack:Qt(i)}}var nr=[],ir=0,Rl=null,Mo=0,Si=[],yi=0,Oa=null,qi=1,ji="";function aa(e,i){nr[ir++]=Mo,nr[ir++]=Rl,Rl=e,Mo=i}function dm(e,i,s){Si[yi++]=qi,Si[yi++]=ji,Si[yi++]=Oa,Oa=e;var o=qi;e=ji;var u=32-ie(o)-1;o&=~(1<<u),s+=1;var h=32-ie(i)+u;if(30<h){var E=u-u%5;h=(o&(1<<E)-1).toString(32),o>>=E,u-=E,qi=1<<32-ie(i)+u|s<<u|o,ji=h+e}else qi=1<<h|s<<u|o,ji=e}function Zu(e){e.return!==null&&(aa(e,1),dm(e,1,0))}function Ku(e){for(;e===Rl;)Rl=nr[--ir],nr[ir]=null,Mo=nr[--ir],nr[ir]=null;for(;e===Oa;)Oa=Si[--yi],Si[yi]=null,ji=Si[--yi],Si[yi]=null,qi=Si[--yi],Si[yi]=null}function pm(e,i){Si[yi++]=qi,Si[yi++]=ji,Si[yi++]=Oa,qi=i.id,ji=i.overflow,Oa=e}var Un=null,Ke=null,Ae=!1,Pa=null,Ei=!1,Qu=Error(a(519));function za(e){var i=Error(a(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw So(Mi(i,e)),Qu}function mm(e){var i=e.stateNode,s=e.type,o=e.memoizedProps;switch(i[rn]=e,i[Dn]=o,s){case"dialog":xe("cancel",i),xe("close",i);break;case"iframe":case"object":case"embed":xe("load",i);break;case"video":case"audio":for(s=0;s<ko.length;s++)xe(ko[s],i);break;case"source":xe("error",i);break;case"img":case"image":case"link":xe("error",i),xe("load",i);break;case"details":xe("toggle",i);break;case"input":xe("invalid",i),Pi(i,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":xe("invalid",i);break;case"textarea":xe("invalid",i),Dp(i,o.value,o.defaultValue,o.children)}s=o.children,typeof s!="string"&&typeof s!="number"&&typeof s!="bigint"||i.textContent===""+s||o.suppressHydrationWarning===!0||Ug(i.textContent,s)?(o.popover!=null&&(xe("beforetoggle",i),xe("toggle",i)),o.onScroll!=null&&xe("scroll",i),o.onScrollEnd!=null&&xe("scrollend",i),o.onClick!=null&&(i.onclick=ea),i=!0):i=!1,i||za(e,!0)}function gm(e){for(Un=e.return;Un;)switch(Un.tag){case 5:case 31:case 13:Ei=!1;return;case 27:case 3:Ei=!0;return;default:Un=Un.return}}function ar(e){if(e!==Un)return!1;if(!Ae)return gm(e),Ae=!0,!1;var i=e.tag,s;if((s=i!==3&&i!==27)&&((s=i===5)&&(s=e.type,s=!(s!=="form"&&s!=="button")||gh(e.type,e.memoizedProps)),s=!s),s&&Ke&&za(e),gm(e),i===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));Ke=Gg(e)}else if(i===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(317));Ke=Gg(e)}else i===27?(i=Ke,Ka(e.type)?(e=Sh,Sh=null,Ke=e):Ke=i):Ke=Un?bi(e.stateNode.nextSibling):null;return!0}function Ms(){Ke=Un=null,Ae=!1}function Ju(){var e=Pa;return e!==null&&(Jn===null?Jn=e:Jn.push.apply(Jn,e),Pa=null),e}function So(e){Pa===null?Pa=[e]:Pa.push(e)}var $u=P(null),Ss=null,sa=null;function Ba(e,i,s){Mt($u,i._currentValue),i._currentValue=s}function ra(e){e._currentValue=$u.current,it($u)}function tf(e,i,s){for(;e!==null;){var o=e.alternate;if((e.childLanes&i)!==i?(e.childLanes|=i,o!==null&&(o.childLanes|=i)):o!==null&&(o.childLanes&i)!==i&&(o.childLanes|=i),e===s)break;e=e.return}}function ef(e,i,s,o){var u=e.child;for(u!==null&&(u.return=e);u!==null;){var h=u.dependencies;if(h!==null){var E=u.child;h=h.firstContext;t:for(;h!==null;){var A=h;h=u;for(var F=0;F<i.length;F++)if(A.context===i[F]){h.lanes|=s,A=h.alternate,A!==null&&(A.lanes|=s),tf(h.return,s,e),o||(E=null);break t}h=A.next}}else if(u.tag===18){if(E=u.return,E===null)throw Error(a(341));E.lanes|=s,h=E.alternate,h!==null&&(h.lanes|=s),tf(E,s,e),E=null}else E=u.child;if(E!==null)E.return=u;else for(E=u;E!==null;){if(E===e){E=null;break}if(u=E.sibling,u!==null){u.return=E.return,E=u;break}E=E.return}u=E}}function sr(e,i,s,o){e=null;for(var u=i,h=!1;u!==null;){if(!h){if((u.flags&524288)!==0)h=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var E=u.alternate;if(E===null)throw Error(a(387));if(E=E.memoizedProps,E!==null){var A=u.type;ai(u.pendingProps.value,E.value)||(e!==null?e.push(A):e=[A])}}else if(u===_t.current){if(E=u.alternate,E===null)throw Error(a(387));E.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(e!==null?e.push(Yo):e=[Yo])}u=u.return}e!==null&&ef(i,e,s,o),i.flags|=262144}function Cl(e){for(e=e.firstContext;e!==null;){if(!ai(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ys(e){Ss=e,sa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Nn(e){return vm(Ss,e)}function Dl(e,i){return Ss===null&&ys(e),vm(e,i)}function vm(e,i){var s=i._currentValue;if(i={context:i,memoizedValue:s,next:null},sa===null){if(e===null)throw Error(a(308));sa=i,e.dependencies={lanes:0,firstContext:i},e.flags|=524288}else sa=sa.next=i;return s}var PM=typeof AbortController<"u"?AbortController:function(){var e=[],i=this.signal={aborted:!1,addEventListener:function(s,o){e.push(o)}};this.abort=function(){i.aborted=!0,e.forEach(function(s){return s()})}},zM=r.unstable_scheduleCallback,BM=r.unstable_NormalPriority,fn={$$typeof:U,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function nf(){return{controller:new PM,data:new Map,refCount:0}}function yo(e){e.refCount--,e.refCount===0&&zM(BM,function(){e.controller.abort()})}var Eo=null,af=0,rr=0,or=null;function IM(e,i){if(Eo===null){var s=Eo=[];af=0,rr=oh(),or={status:"pending",value:void 0,then:function(o){s.push(o)}}}return af++,i.then(xm,xm),i}function xm(){if(--af===0&&Eo!==null){or!==null&&(or.status="fulfilled");var e=Eo;Eo=null,rr=0,or=null;for(var i=0;i<e.length;i++)(0,e[i])()}}function FM(e,i){var s=[],o={status:"pending",value:null,reason:null,then:function(u){s.push(u)}};return e.then(function(){o.status="fulfilled",o.value=i;for(var u=0;u<s.length;u++)(0,s[u])(i)},function(u){for(o.status="rejected",o.reason=u,u=0;u<s.length;u++)(0,s[u])(void 0)}),o}var _m=z.S;z.S=function(e,i){ng=dt(),typeof i=="object"&&i!==null&&typeof i.then=="function"&&IM(e,i),_m!==null&&_m(e,i)};var Es=P(null);function sf(){var e=Es.current;return e!==null?e:Ye.pooledCache}function Ll(e,i){i===null?Mt(Es,Es.current):Mt(Es,i.pool)}function Mm(){var e=sf();return e===null?null:{parent:fn._currentValue,pool:e}}var lr=Error(a(460)),rf=Error(a(474)),Ul=Error(a(542)),Nl={then:function(){}};function Sm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function ym(e,i,s){switch(s=e[s],s===void 0?e.push(i):s!==i&&(i.then(ea,ea),i=s),i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,Tm(e),e;default:if(typeof i.status=="string")i.then(ea,ea);else{if(e=Ye,e!==null&&100<e.shellSuspendCounter)throw Error(a(482));e=i,e.status="pending",e.then(function(o){if(i.status==="pending"){var u=i;u.status="fulfilled",u.value=o}},function(o){if(i.status==="pending"){var u=i;u.status="rejected",u.reason=o}})}switch(i.status){case"fulfilled":return i.value;case"rejected":throw e=i.reason,Tm(e),e}throw bs=i,lr}}function Ts(e){try{var i=e._init;return i(e._payload)}catch(s){throw s!==null&&typeof s=="object"&&typeof s.then=="function"?(bs=s,lr):s}}var bs=null;function Em(){if(bs===null)throw Error(a(459));var e=bs;return bs=null,e}function Tm(e){if(e===lr||e===Ul)throw Error(a(483))}var cr=null,To=0;function Ol(e){var i=To;return To+=1,cr===null&&(cr=[]),ym(cr,e,i)}function bo(e,i){i=i.props.ref,e.ref=i!==void 0?i:null}function Pl(e,i){throw i.$$typeof===x?Error(a(525)):(e=Object.prototype.toString.call(i),Error(a(31,e==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":e)))}function bm(e){function i(Y,G){if(e){var J=Y.deletions;J===null?(Y.deletions=[G],Y.flags|=16):J.push(G)}}function s(Y,G){if(!e)return null;for(;G!==null;)i(Y,G),G=G.sibling;return null}function o(Y){for(var G=new Map;Y!==null;)Y.key!==null?G.set(Y.key,Y):G.set(Y.index,Y),Y=Y.sibling;return G}function u(Y,G){return Y=ia(Y,G),Y.index=0,Y.sibling=null,Y}function h(Y,G,J){return Y.index=J,e?(J=Y.alternate,J!==null?(J=J.index,J<G?(Y.flags|=67108866,G):J):(Y.flags|=67108866,G)):(Y.flags|=1048576,G)}function E(Y){return e&&Y.alternate===null&&(Y.flags|=67108866),Y}function A(Y,G,J,pt){return G===null||G.tag!==6?(G=ju(J,Y.mode,pt),G.return=Y,G):(G=u(G,J),G.return=Y,G)}function F(Y,G,J,pt){var Yt=J.type;return Yt===T?ft(Y,G,J.props.children,pt,J.key):G!==null&&(G.elementType===Yt||typeof Yt=="object"&&Yt!==null&&Yt.$$typeof===B&&Ts(Yt)===G.type)?(G=u(G,J.props),bo(G,J),G.return=Y,G):(G=wl(J.type,J.key,J.props,null,Y.mode,pt),bo(G,J),G.return=Y,G)}function $(Y,G,J,pt){return G===null||G.tag!==4||G.stateNode.containerInfo!==J.containerInfo||G.stateNode.implementation!==J.implementation?(G=Yu(J,Y.mode,pt),G.return=Y,G):(G=u(G,J.children||[]),G.return=Y,G)}function ft(Y,G,J,pt,Yt){return G===null||G.tag!==7?(G=_s(J,Y.mode,pt,Yt),G.return=Y,G):(G=u(G,J),G.return=Y,G)}function vt(Y,G,J){if(typeof G=="string"&&G!==""||typeof G=="number"||typeof G=="bigint")return G=ju(""+G,Y.mode,J),G.return=Y,G;if(typeof G=="object"&&G!==null){switch(G.$$typeof){case M:return J=wl(G.type,G.key,G.props,null,Y.mode,J),bo(J,G),J.return=Y,J;case y:return G=Yu(G,Y.mode,J),G.return=Y,G;case B:return G=Ts(G),vt(Y,G,J)}if(mt(G)||tt(G))return G=_s(G,Y.mode,J,null),G.return=Y,G;if(typeof G.then=="function")return vt(Y,Ol(G),J);if(G.$$typeof===U)return vt(Y,Dl(Y,G),J);Pl(Y,G)}return null}function et(Y,G,J,pt){var Yt=G!==null?G.key:null;if(typeof J=="string"&&J!==""||typeof J=="number"||typeof J=="bigint")return Yt!==null?null:A(Y,G,""+J,pt);if(typeof J=="object"&&J!==null){switch(J.$$typeof){case M:return J.key===Yt?F(Y,G,J,pt):null;case y:return J.key===Yt?$(Y,G,J,pt):null;case B:return J=Ts(J),et(Y,G,J,pt)}if(mt(J)||tt(J))return Yt!==null?null:ft(Y,G,J,pt,null);if(typeof J.then=="function")return et(Y,G,Ol(J),pt);if(J.$$typeof===U)return et(Y,G,Dl(Y,J),pt);Pl(Y,J)}return null}function ot(Y,G,J,pt,Yt){if(typeof pt=="string"&&pt!==""||typeof pt=="number"||typeof pt=="bigint")return Y=Y.get(J)||null,A(G,Y,""+pt,Yt);if(typeof pt=="object"&&pt!==null){switch(pt.$$typeof){case M:return Y=Y.get(pt.key===null?J:pt.key)||null,F(G,Y,pt,Yt);case y:return Y=Y.get(pt.key===null?J:pt.key)||null,$(G,Y,pt,Yt);case B:return pt=Ts(pt),ot(Y,G,J,pt,Yt)}if(mt(pt)||tt(pt))return Y=Y.get(J)||null,ft(G,Y,pt,Yt,null);if(typeof pt.then=="function")return ot(Y,G,J,Ol(pt),Yt);if(pt.$$typeof===U)return ot(Y,G,J,Dl(G,pt),Yt);Pl(G,pt)}return null}function Ft(Y,G,J,pt){for(var Yt=null,De=null,Wt=G,fe=G=0,ye=null;Wt!==null&&fe<J.length;fe++){Wt.index>fe?(ye=Wt,Wt=null):ye=Wt.sibling;var Le=et(Y,Wt,J[fe],pt);if(Le===null){Wt===null&&(Wt=ye);break}e&&Wt&&Le.alternate===null&&i(Y,Wt),G=h(Le,G,fe),De===null?Yt=Le:De.sibling=Le,De=Le,Wt=ye}if(fe===J.length)return s(Y,Wt),Ae&&aa(Y,fe),Yt;if(Wt===null){for(;fe<J.length;fe++)Wt=vt(Y,J[fe],pt),Wt!==null&&(G=h(Wt,G,fe),De===null?Yt=Wt:De.sibling=Wt,De=Wt);return Ae&&aa(Y,fe),Yt}for(Wt=o(Wt);fe<J.length;fe++)ye=ot(Wt,Y,fe,J[fe],pt),ye!==null&&(e&&ye.alternate!==null&&Wt.delete(ye.key===null?fe:ye.key),G=h(ye,G,fe),De===null?Yt=ye:De.sibling=ye,De=ye);return e&&Wt.forEach(function(es){return i(Y,es)}),Ae&&aa(Y,fe),Yt}function Jt(Y,G,J,pt){if(J==null)throw Error(a(151));for(var Yt=null,De=null,Wt=G,fe=G=0,ye=null,Le=J.next();Wt!==null&&!Le.done;fe++,Le=J.next()){Wt.index>fe?(ye=Wt,Wt=null):ye=Wt.sibling;var es=et(Y,Wt,Le.value,pt);if(es===null){Wt===null&&(Wt=ye);break}e&&Wt&&es.alternate===null&&i(Y,Wt),G=h(es,G,fe),De===null?Yt=es:De.sibling=es,De=es,Wt=ye}if(Le.done)return s(Y,Wt),Ae&&aa(Y,fe),Yt;if(Wt===null){for(;!Le.done;fe++,Le=J.next())Le=vt(Y,Le.value,pt),Le!==null&&(G=h(Le,G,fe),De===null?Yt=Le:De.sibling=Le,De=Le);return Ae&&aa(Y,fe),Yt}for(Wt=o(Wt);!Le.done;fe++,Le=J.next())Le=ot(Wt,Y,fe,Le.value,pt),Le!==null&&(e&&Le.alternate!==null&&Wt.delete(Le.key===null?fe:Le.key),G=h(Le,G,fe),De===null?Yt=Le:De.sibling=Le,De=Le);return e&&Wt.forEach(function(KS){return i(Y,KS)}),Ae&&aa(Y,fe),Yt}function qe(Y,G,J,pt){if(typeof J=="object"&&J!==null&&J.type===T&&J.key===null&&(J=J.props.children),typeof J=="object"&&J!==null){switch(J.$$typeof){case M:t:{for(var Yt=J.key;G!==null;){if(G.key===Yt){if(Yt=J.type,Yt===T){if(G.tag===7){s(Y,G.sibling),pt=u(G,J.props.children),pt.return=Y,Y=pt;break t}}else if(G.elementType===Yt||typeof Yt=="object"&&Yt!==null&&Yt.$$typeof===B&&Ts(Yt)===G.type){s(Y,G.sibling),pt=u(G,J.props),bo(pt,J),pt.return=Y,Y=pt;break t}s(Y,G);break}else i(Y,G);G=G.sibling}J.type===T?(pt=_s(J.props.children,Y.mode,pt,J.key),pt.return=Y,Y=pt):(pt=wl(J.type,J.key,J.props,null,Y.mode,pt),bo(pt,J),pt.return=Y,Y=pt)}return E(Y);case y:t:{for(Yt=J.key;G!==null;){if(G.key===Yt)if(G.tag===4&&G.stateNode.containerInfo===J.containerInfo&&G.stateNode.implementation===J.implementation){s(Y,G.sibling),pt=u(G,J.children||[]),pt.return=Y,Y=pt;break t}else{s(Y,G);break}else i(Y,G);G=G.sibling}pt=Yu(J,Y.mode,pt),pt.return=Y,Y=pt}return E(Y);case B:return J=Ts(J),qe(Y,G,J,pt)}if(mt(J))return Ft(Y,G,J,pt);if(tt(J)){if(Yt=tt(J),typeof Yt!="function")throw Error(a(150));return J=Yt.call(J),Jt(Y,G,J,pt)}if(typeof J.then=="function")return qe(Y,G,Ol(J),pt);if(J.$$typeof===U)return qe(Y,G,Dl(Y,J),pt);Pl(Y,J)}return typeof J=="string"&&J!==""||typeof J=="number"||typeof J=="bigint"?(J=""+J,G!==null&&G.tag===6?(s(Y,G.sibling),pt=u(G,J),pt.return=Y,Y=pt):(s(Y,G),pt=ju(J,Y.mode,pt),pt.return=Y,Y=pt),E(Y)):s(Y,G)}return function(Y,G,J,pt){try{To=0;var Yt=qe(Y,G,J,pt);return cr=null,Yt}catch(Wt){if(Wt===lr||Wt===Ul)throw Wt;var De=si(29,Wt,null,Y.mode);return De.lanes=pt,De.return=Y,De}finally{}}}var As=bm(!0),Am=bm(!1),Ia=!1;function of(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function lf(e,i){e=e.updateQueue,i.updateQueue===e&&(i.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Fa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Ha(e,i,s){var o=e.updateQueue;if(o===null)return null;if(o=o.shared,(Oe&2)!==0){var u=o.pending;return u===null?i.next=i:(i.next=u.next,u.next=i),o.pending=i,i=Al(e),cm(e,null,s),i}return bl(e,o,i,s),Al(e)}function Ao(e,i,s){if(i=i.updateQueue,i!==null&&(i=i.shared,(s&4194048)!==0)){var o=i.lanes;o&=e.pendingLanes,s|=o,i.lanes=s,oo(e,s)}}function cf(e,i){var s=e.updateQueue,o=e.alternate;if(o!==null&&(o=o.updateQueue,s===o)){var u=null,h=null;if(s=s.firstBaseUpdate,s!==null){do{var E={lane:s.lane,tag:s.tag,payload:s.payload,callback:null,next:null};h===null?u=h=E:h=h.next=E,s=s.next}while(s!==null);h===null?u=h=i:h=h.next=i}else u=h=i;s={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:h,shared:o.shared,callbacks:o.callbacks},e.updateQueue=s;return}e=s.lastBaseUpdate,e===null?s.firstBaseUpdate=i:e.next=i,s.lastBaseUpdate=i}var uf=!1;function wo(){if(uf){var e=or;if(e!==null)throw e}}function Ro(e,i,s,o){uf=!1;var u=e.updateQueue;Ia=!1;var h=u.firstBaseUpdate,E=u.lastBaseUpdate,A=u.shared.pending;if(A!==null){u.shared.pending=null;var F=A,$=F.next;F.next=null,E===null?h=$:E.next=$,E=F;var ft=e.alternate;ft!==null&&(ft=ft.updateQueue,A=ft.lastBaseUpdate,A!==E&&(A===null?ft.firstBaseUpdate=$:A.next=$,ft.lastBaseUpdate=F))}if(h!==null){var vt=u.baseState;E=0,ft=$=F=null,A=h;do{var et=A.lane&-536870913,ot=et!==A.lane;if(ot?(Se&et)===et:(o&et)===et){et!==0&&et===rr&&(uf=!0),ft!==null&&(ft=ft.next={lane:0,tag:A.tag,payload:A.payload,callback:null,next:null});t:{var Ft=e,Jt=A;et=i;var qe=s;switch(Jt.tag){case 1:if(Ft=Jt.payload,typeof Ft=="function"){vt=Ft.call(qe,vt,et);break t}vt=Ft;break t;case 3:Ft.flags=Ft.flags&-65537|128;case 0:if(Ft=Jt.payload,et=typeof Ft=="function"?Ft.call(qe,vt,et):Ft,et==null)break t;vt=g({},vt,et);break t;case 2:Ia=!0}}et=A.callback,et!==null&&(e.flags|=64,ot&&(e.flags|=8192),ot=u.callbacks,ot===null?u.callbacks=[et]:ot.push(et))}else ot={lane:et,tag:A.tag,payload:A.payload,callback:A.callback,next:null},ft===null?($=ft=ot,F=vt):ft=ft.next=ot,E|=et;if(A=A.next,A===null){if(A=u.shared.pending,A===null)break;ot=A,A=ot.next,ot.next=null,u.lastBaseUpdate=ot,u.shared.pending=null}}while(!0);ft===null&&(F=vt),u.baseState=F,u.firstBaseUpdate=$,u.lastBaseUpdate=ft,h===null&&(u.shared.lanes=0),Wa|=E,e.lanes=E,e.memoizedState=vt}}function wm(e,i){if(typeof e!="function")throw Error(a(191,e));e.call(i)}function Rm(e,i){var s=e.callbacks;if(s!==null)for(e.callbacks=null,e=0;e<s.length;e++)wm(s[e],i)}var ur=P(null),zl=P(0);function Cm(e,i){e=ma,Mt(zl,e),Mt(ur,i),ma=e|i.baseLanes}function ff(){Mt(zl,ma),Mt(ur,ur.current)}function hf(){ma=zl.current,it(ur),it(zl)}var ri=P(null),Ti=null;function Ga(e){var i=e.alternate;Mt(cn,cn.current&1),Mt(ri,e),Ti===null&&(i===null||ur.current!==null||i.memoizedState!==null)&&(Ti=e)}function df(e){Mt(cn,cn.current),Mt(ri,e),Ti===null&&(Ti=e)}function Dm(e){e.tag===22?(Mt(cn,cn.current),Mt(ri,e),Ti===null&&(Ti=e)):Va()}function Va(){Mt(cn,cn.current),Mt(ri,ri.current)}function oi(e){it(ri),Ti===e&&(Ti=null),it(cn)}var cn=P(0);function Bl(e){for(var i=e;i!==null;){if(i.tag===13){var s=i.memoizedState;if(s!==null&&(s=s.dehydrated,s===null||_h(s)||Mh(s)))return i}else if(i.tag===19&&(i.memoizedProps.revealOrder==="forwards"||i.memoizedProps.revealOrder==="backwards"||i.memoizedProps.revealOrder==="unstable_legacy-backwards"||i.memoizedProps.revealOrder==="together")){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var oa=0,ue=null,Xe=null,hn=null,Il=!1,fr=!1,ws=!1,Fl=0,Co=0,hr=null,HM=0;function on(){throw Error(a(321))}function pf(e,i){if(i===null)return!1;for(var s=0;s<i.length&&s<e.length;s++)if(!ai(e[s],i[s]))return!1;return!0}function mf(e,i,s,o,u,h){return oa=h,ue=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,z.H=e===null||e.memoizedState===null?d0:Df,ws=!1,h=s(o,u),ws=!1,fr&&(h=Um(i,s,o,u)),Lm(e),h}function Lm(e){z.H=Uo;var i=Xe!==null&&Xe.next!==null;if(oa=0,hn=Xe=ue=null,Il=!1,Co=0,hr=null,i)throw Error(a(300));e===null||dn||(e=e.dependencies,e!==null&&Cl(e)&&(dn=!0))}function Um(e,i,s,o){ue=e;var u=0;do{if(fr&&(hr=null),Co=0,fr=!1,25<=u)throw Error(a(301));if(u+=1,hn=Xe=null,e.updateQueue!=null){var h=e.updateQueue;h.lastEffect=null,h.events=null,h.stores=null,h.memoCache!=null&&(h.memoCache.index=0)}z.H=p0,h=i(s,o)}while(fr);return h}function GM(){var e=z.H,i=e.useState()[0];return i=typeof i.then=="function"?Do(i):i,e=e.useState()[0],(Xe!==null?Xe.memoizedState:null)!==e&&(ue.flags|=1024),i}function gf(){var e=Fl!==0;return Fl=0,e}function vf(e,i,s){i.updateQueue=e.updateQueue,i.flags&=-2053,e.lanes&=~s}function xf(e){if(Il){for(e=e.memoizedState;e!==null;){var i=e.queue;i!==null&&(i.pending=null),e=e.next}Il=!1}oa=0,hn=Xe=ue=null,fr=!1,Co=Fl=0,hr=null}function Xn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return hn===null?ue.memoizedState=hn=e:hn=hn.next=e,hn}function un(){if(Xe===null){var e=ue.alternate;e=e!==null?e.memoizedState:null}else e=Xe.next;var i=hn===null?ue.memoizedState:hn.next;if(i!==null)hn=i,Xe=e;else{if(e===null)throw ue.alternate===null?Error(a(467)):Error(a(310));Xe=e,e={memoizedState:Xe.memoizedState,baseState:Xe.baseState,baseQueue:Xe.baseQueue,queue:Xe.queue,next:null},hn===null?ue.memoizedState=hn=e:hn=hn.next=e}return hn}function Hl(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Do(e){var i=Co;return Co+=1,hr===null&&(hr=[]),e=ym(hr,e,i),i=ue,(hn===null?i.memoizedState:hn.next)===null&&(i=i.alternate,z.H=i===null||i.memoizedState===null?d0:Df),e}function Gl(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Do(e);if(e.$$typeof===U)return Nn(e)}throw Error(a(438,String(e)))}function _f(e){var i=null,s=ue.updateQueue;if(s!==null&&(i=s.memoCache),i==null){var o=ue.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(i={data:o.data.map(function(u){return u.slice()}),index:0})))}if(i==null&&(i={data:[],index:0}),s===null&&(s=Hl(),ue.updateQueue=s),s.memoCache=i,s=i.data[i.index],s===void 0)for(s=i.data[i.index]=Array(e),o=0;o<e;o++)s[o]=b;return i.index++,s}function la(e,i){return typeof i=="function"?i(e):i}function Vl(e){var i=un();return Mf(i,Xe,e)}function Mf(e,i,s){var o=e.queue;if(o===null)throw Error(a(311));o.lastRenderedReducer=s;var u=e.baseQueue,h=o.pending;if(h!==null){if(u!==null){var E=u.next;u.next=h.next,h.next=E}i.baseQueue=u=h,o.pending=null}if(h=e.baseState,u===null)e.memoizedState=h;else{i=u.next;var A=E=null,F=null,$=i,ft=!1;do{var vt=$.lane&-536870913;if(vt!==$.lane?(Se&vt)===vt:(oa&vt)===vt){var et=$.revertLane;if(et===0)F!==null&&(F=F.next={lane:0,revertLane:0,gesture:null,action:$.action,hasEagerState:$.hasEagerState,eagerState:$.eagerState,next:null}),vt===rr&&(ft=!0);else if((oa&et)===et){$=$.next,et===rr&&(ft=!0);continue}else vt={lane:0,revertLane:$.revertLane,gesture:null,action:$.action,hasEagerState:$.hasEagerState,eagerState:$.eagerState,next:null},F===null?(A=F=vt,E=h):F=F.next=vt,ue.lanes|=et,Wa|=et;vt=$.action,ws&&s(h,vt),h=$.hasEagerState?$.eagerState:s(h,vt)}else et={lane:vt,revertLane:$.revertLane,gesture:$.gesture,action:$.action,hasEagerState:$.hasEagerState,eagerState:$.eagerState,next:null},F===null?(A=F=et,E=h):F=F.next=et,ue.lanes|=vt,Wa|=vt;$=$.next}while($!==null&&$!==i);if(F===null?E=h:F.next=A,!ai(h,e.memoizedState)&&(dn=!0,ft&&(s=or,s!==null)))throw s;e.memoizedState=h,e.baseState=E,e.baseQueue=F,o.lastRenderedState=h}return u===null&&(o.lanes=0),[e.memoizedState,o.dispatch]}function Sf(e){var i=un(),s=i.queue;if(s===null)throw Error(a(311));s.lastRenderedReducer=e;var o=s.dispatch,u=s.pending,h=i.memoizedState;if(u!==null){s.pending=null;var E=u=u.next;do h=e(h,E.action),E=E.next;while(E!==u);ai(h,i.memoizedState)||(dn=!0),i.memoizedState=h,i.baseQueue===null&&(i.baseState=h),s.lastRenderedState=h}return[h,o]}function Nm(e,i,s){var o=ue,u=un(),h=Ae;if(h){if(s===void 0)throw Error(a(407));s=s()}else s=i();var E=!ai((Xe||u).memoizedState,s);if(E&&(u.memoizedState=s,dn=!0),u=u.queue,Tf(zm.bind(null,o,u,e),[e]),u.getSnapshot!==i||E||hn!==null&&hn.memoizedState.tag&1){if(o.flags|=2048,dr(9,{destroy:void 0},Pm.bind(null,o,u,s,i),null),Ye===null)throw Error(a(349));h||(oa&127)!==0||Om(o,i,s)}return s}function Om(e,i,s){e.flags|=16384,e={getSnapshot:i,value:s},i=ue.updateQueue,i===null?(i=Hl(),ue.updateQueue=i,i.stores=[e]):(s=i.stores,s===null?i.stores=[e]:s.push(e))}function Pm(e,i,s,o){i.value=s,i.getSnapshot=o,Bm(i)&&Im(e)}function zm(e,i,s){return s(function(){Bm(i)&&Im(e)})}function Bm(e){var i=e.getSnapshot;e=e.value;try{var s=i();return!ai(e,s)}catch{return!0}}function Im(e){var i=xs(e,2);i!==null&&$n(i,e,2)}function yf(e){var i=Xn();if(typeof e=="function"){var s=e;if(e=s(),ws){Ot(!0);try{s()}finally{Ot(!1)}}}return i.memoizedState=i.baseState=e,i.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:e},i}function Fm(e,i,s,o){return e.baseState=s,Mf(e,Xe,typeof o=="function"?o:la)}function VM(e,i,s,o,u){if(Wl(e))throw Error(a(485));if(e=i.action,e!==null){var h={payload:u,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(E){h.listeners.push(E)}};z.T!==null?s(!0):h.isTransition=!1,o(h),s=i.pending,s===null?(h.next=i.pending=h,Hm(i,h)):(h.next=s.next,i.pending=s.next=h)}}function Hm(e,i){var s=i.action,o=i.payload,u=e.state;if(i.isTransition){var h=z.T,E={};z.T=E;try{var A=s(u,o),F=z.S;F!==null&&F(E,A),Gm(e,i,A)}catch($){Ef(e,i,$)}finally{h!==null&&E.types!==null&&(h.types=E.types),z.T=h}}else try{h=s(u,o),Gm(e,i,h)}catch($){Ef(e,i,$)}}function Gm(e,i,s){s!==null&&typeof s=="object"&&typeof s.then=="function"?s.then(function(o){Vm(e,i,o)},function(o){return Ef(e,i,o)}):Vm(e,i,s)}function Vm(e,i,s){i.status="fulfilled",i.value=s,km(i),e.state=s,i=e.pending,i!==null&&(s=i.next,s===i?e.pending=null:(s=s.next,i.next=s,Hm(e,s)))}function Ef(e,i,s){var o=e.pending;if(e.pending=null,o!==null){o=o.next;do i.status="rejected",i.reason=s,km(i),i=i.next;while(i!==o)}e.action=null}function km(e){e=e.listeners;for(var i=0;i<e.length;i++)(0,e[i])()}function Xm(e,i){return i}function Wm(e,i){if(Ae){var s=Ye.formState;if(s!==null){t:{var o=ue;if(Ae){if(Ke){e:{for(var u=Ke,h=Ei;u.nodeType!==8;){if(!h){u=null;break e}if(u=bi(u.nextSibling),u===null){u=null;break e}}h=u.data,u=h==="F!"||h==="F"?u:null}if(u){Ke=bi(u.nextSibling),o=u.data==="F!";break t}}za(o)}o=!1}o&&(i=s[0])}}return s=Xn(),s.memoizedState=s.baseState=i,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Xm,lastRenderedState:i},s.queue=o,s=u0.bind(null,ue,o),o.dispatch=s,o=yf(!1),h=Cf.bind(null,ue,!1,o.queue),o=Xn(),u={state:i,dispatch:null,action:e,pending:null},o.queue=u,s=VM.bind(null,ue,u,h,s),u.dispatch=s,o.memoizedState=e,[i,s,!1]}function qm(e){var i=un();return jm(i,Xe,e)}function jm(e,i,s){if(i=Mf(e,i,Xm)[0],e=Vl(la)[0],typeof i=="object"&&i!==null&&typeof i.then=="function")try{var o=Do(i)}catch(E){throw E===lr?Ul:E}else o=i;i=un();var u=i.queue,h=u.dispatch;return s!==i.memoizedState&&(ue.flags|=2048,dr(9,{destroy:void 0},kM.bind(null,u,s),null)),[o,h,e]}function kM(e,i){e.action=i}function Ym(e){var i=un(),s=Xe;if(s!==null)return jm(i,s,e);un(),i=i.memoizedState,s=un();var o=s.queue.dispatch;return s.memoizedState=e,[i,o,!1]}function dr(e,i,s,o){return e={tag:e,create:s,deps:o,inst:i,next:null},i=ue.updateQueue,i===null&&(i=Hl(),ue.updateQueue=i),s=i.lastEffect,s===null?i.lastEffect=e.next=e:(o=s.next,s.next=e,e.next=o,i.lastEffect=e),e}function Zm(){return un().memoizedState}function kl(e,i,s,o){var u=Xn();ue.flags|=e,u.memoizedState=dr(1|i,{destroy:void 0},s,o===void 0?null:o)}function Xl(e,i,s,o){var u=un();o=o===void 0?null:o;var h=u.memoizedState.inst;Xe!==null&&o!==null&&pf(o,Xe.memoizedState.deps)?u.memoizedState=dr(i,h,s,o):(ue.flags|=e,u.memoizedState=dr(1|i,h,s,o))}function Km(e,i){kl(8390656,8,e,i)}function Tf(e,i){Xl(2048,8,e,i)}function XM(e){ue.flags|=4;var i=ue.updateQueue;if(i===null)i=Hl(),ue.updateQueue=i,i.events=[e];else{var s=i.events;s===null?i.events=[e]:s.push(e)}}function Qm(e){var i=un().memoizedState;return XM({ref:i,nextImpl:e}),function(){if((Oe&2)!==0)throw Error(a(440));return i.impl.apply(void 0,arguments)}}function Jm(e,i){return Xl(4,2,e,i)}function $m(e,i){return Xl(4,4,e,i)}function t0(e,i){if(typeof i=="function"){e=e();var s=i(e);return function(){typeof s=="function"?s():i(null)}}if(i!=null)return e=e(),i.current=e,function(){i.current=null}}function e0(e,i,s){s=s!=null?s.concat([e]):null,Xl(4,4,t0.bind(null,i,e),s)}function bf(){}function n0(e,i){var s=un();i=i===void 0?null:i;var o=s.memoizedState;return i!==null&&pf(i,o[1])?o[0]:(s.memoizedState=[e,i],e)}function i0(e,i){var s=un();i=i===void 0?null:i;var o=s.memoizedState;if(i!==null&&pf(i,o[1]))return o[0];if(o=e(),ws){Ot(!0);try{e()}finally{Ot(!1)}}return s.memoizedState=[o,i],o}function Af(e,i,s){return s===void 0||(oa&1073741824)!==0&&(Se&261930)===0?e.memoizedState=i:(e.memoizedState=s,e=ag(),ue.lanes|=e,Wa|=e,s)}function a0(e,i,s,o){return ai(s,i)?s:ur.current!==null?(e=Af(e,s,o),ai(e,i)||(dn=!0),e):(oa&42)===0||(oa&1073741824)!==0&&(Se&261930)===0?(dn=!0,e.memoizedState=s):(e=ag(),ue.lanes|=e,Wa|=e,i)}function s0(e,i,s,o,u){var h=Q.p;Q.p=h!==0&&8>h?h:8;var E=z.T,A={};z.T=A,Cf(e,!1,i,s);try{var F=u(),$=z.S;if($!==null&&$(A,F),F!==null&&typeof F=="object"&&typeof F.then=="function"){var ft=FM(F,o);Lo(e,i,ft,ui(e))}else Lo(e,i,o,ui(e))}catch(vt){Lo(e,i,{then:function(){},status:"rejected",reason:vt},ui())}finally{Q.p=h,E!==null&&A.types!==null&&(E.types=A.types),z.T=E}}function WM(){}function wf(e,i,s,o){if(e.tag!==5)throw Error(a(476));var u=r0(e).queue;s0(e,u,i,K,s===null?WM:function(){return o0(e),s(o)})}function r0(e){var i=e.memoizedState;if(i!==null)return i;i={memoizedState:K,baseState:K,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:K},next:null};var s={};return i.next={memoizedState:s,baseState:s,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:la,lastRenderedState:s},next:null},e.memoizedState=i,e=e.alternate,e!==null&&(e.memoizedState=i),i}function o0(e){var i=r0(e);i.next===null&&(i=e.alternate.memoizedState),Lo(e,i.next.queue,{},ui())}function Rf(){return Nn(Yo)}function l0(){return un().memoizedState}function c0(){return un().memoizedState}function qM(e){for(var i=e.return;i!==null;){switch(i.tag){case 24:case 3:var s=ui();e=Fa(s);var o=Ha(i,e,s);o!==null&&($n(o,i,s),Ao(o,i,s)),i={cache:nf()},e.payload=i;return}i=i.return}}function jM(e,i,s){var o=ui();s={lane:o,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null},Wl(e)?f0(i,s):(s=Wu(e,i,s,o),s!==null&&($n(s,e,o),h0(s,i,o)))}function u0(e,i,s){var o=ui();Lo(e,i,s,o)}function Lo(e,i,s,o){var u={lane:o,revertLane:0,gesture:null,action:s,hasEagerState:!1,eagerState:null,next:null};if(Wl(e))f0(i,u);else{var h=e.alternate;if(e.lanes===0&&(h===null||h.lanes===0)&&(h=i.lastRenderedReducer,h!==null))try{var E=i.lastRenderedState,A=h(E,s);if(u.hasEagerState=!0,u.eagerState=A,ai(A,E))return bl(e,i,u,0),Ye===null&&Tl(),!1}catch{}finally{}if(s=Wu(e,i,u,o),s!==null)return $n(s,e,o),h0(s,i,o),!0}return!1}function Cf(e,i,s,o){if(o={lane:2,revertLane:oh(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Wl(e)){if(i)throw Error(a(479))}else i=Wu(e,s,o,2),i!==null&&$n(i,e,2)}function Wl(e){var i=e.alternate;return e===ue||i!==null&&i===ue}function f0(e,i){fr=Il=!0;var s=e.pending;s===null?i.next=i:(i.next=s.next,s.next=i),e.pending=i}function h0(e,i,s){if((s&4194048)!==0){var o=i.lanes;o&=e.pendingLanes,s|=o,i.lanes=s,oo(e,s)}}var Uo={readContext:Nn,use:Gl,useCallback:on,useContext:on,useEffect:on,useImperativeHandle:on,useLayoutEffect:on,useInsertionEffect:on,useMemo:on,useReducer:on,useRef:on,useState:on,useDebugValue:on,useDeferredValue:on,useTransition:on,useSyncExternalStore:on,useId:on,useHostTransitionStatus:on,useFormState:on,useActionState:on,useOptimistic:on,useMemoCache:on,useCacheRefresh:on};Uo.useEffectEvent=on;var d0={readContext:Nn,use:Gl,useCallback:function(e,i){return Xn().memoizedState=[e,i===void 0?null:i],e},useContext:Nn,useEffect:Km,useImperativeHandle:function(e,i,s){s=s!=null?s.concat([e]):null,kl(4194308,4,t0.bind(null,i,e),s)},useLayoutEffect:function(e,i){return kl(4194308,4,e,i)},useInsertionEffect:function(e,i){kl(4,2,e,i)},useMemo:function(e,i){var s=Xn();i=i===void 0?null:i;var o=e();if(ws){Ot(!0);try{e()}finally{Ot(!1)}}return s.memoizedState=[o,i],o},useReducer:function(e,i,s){var o=Xn();if(s!==void 0){var u=s(i);if(ws){Ot(!0);try{s(i)}finally{Ot(!1)}}}else u=i;return o.memoizedState=o.baseState=u,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:u},o.queue=e,e=e.dispatch=jM.bind(null,ue,e),[o.memoizedState,e]},useRef:function(e){var i=Xn();return e={current:e},i.memoizedState=e},useState:function(e){e=yf(e);var i=e.queue,s=u0.bind(null,ue,i);return i.dispatch=s,[e.memoizedState,s]},useDebugValue:bf,useDeferredValue:function(e,i){var s=Xn();return Af(s,e,i)},useTransition:function(){var e=yf(!1);return e=s0.bind(null,ue,e.queue,!0,!1),Xn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,i,s){var o=ue,u=Xn();if(Ae){if(s===void 0)throw Error(a(407));s=s()}else{if(s=i(),Ye===null)throw Error(a(349));(Se&127)!==0||Om(o,i,s)}u.memoizedState=s;var h={value:s,getSnapshot:i};return u.queue=h,Km(zm.bind(null,o,h,e),[e]),o.flags|=2048,dr(9,{destroy:void 0},Pm.bind(null,o,h,s,i),null),s},useId:function(){var e=Xn(),i=Ye.identifierPrefix;if(Ae){var s=ji,o=qi;s=(o&~(1<<32-ie(o)-1)).toString(32)+s,i="_"+i+"R_"+s,s=Fl++,0<s&&(i+="H"+s.toString(32)),i+="_"}else s=HM++,i="_"+i+"r_"+s.toString(32)+"_";return e.memoizedState=i},useHostTransitionStatus:Rf,useFormState:Wm,useActionState:Wm,useOptimistic:function(e){var i=Xn();i.memoizedState=i.baseState=e;var s={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return i.queue=s,i=Cf.bind(null,ue,!0,s),s.dispatch=i,[e,i]},useMemoCache:_f,useCacheRefresh:function(){return Xn().memoizedState=qM.bind(null,ue)},useEffectEvent:function(e){var i=Xn(),s={impl:e};return i.memoizedState=s,function(){if((Oe&2)!==0)throw Error(a(440));return s.impl.apply(void 0,arguments)}}},Df={readContext:Nn,use:Gl,useCallback:n0,useContext:Nn,useEffect:Tf,useImperativeHandle:e0,useInsertionEffect:Jm,useLayoutEffect:$m,useMemo:i0,useReducer:Vl,useRef:Zm,useState:function(){return Vl(la)},useDebugValue:bf,useDeferredValue:function(e,i){var s=un();return a0(s,Xe.memoizedState,e,i)},useTransition:function(){var e=Vl(la)[0],i=un().memoizedState;return[typeof e=="boolean"?e:Do(e),i]},useSyncExternalStore:Nm,useId:l0,useHostTransitionStatus:Rf,useFormState:qm,useActionState:qm,useOptimistic:function(e,i){var s=un();return Fm(s,Xe,e,i)},useMemoCache:_f,useCacheRefresh:c0};Df.useEffectEvent=Qm;var p0={readContext:Nn,use:Gl,useCallback:n0,useContext:Nn,useEffect:Tf,useImperativeHandle:e0,useInsertionEffect:Jm,useLayoutEffect:$m,useMemo:i0,useReducer:Sf,useRef:Zm,useState:function(){return Sf(la)},useDebugValue:bf,useDeferredValue:function(e,i){var s=un();return Xe===null?Af(s,e,i):a0(s,Xe.memoizedState,e,i)},useTransition:function(){var e=Sf(la)[0],i=un().memoizedState;return[typeof e=="boolean"?e:Do(e),i]},useSyncExternalStore:Nm,useId:l0,useHostTransitionStatus:Rf,useFormState:Ym,useActionState:Ym,useOptimistic:function(e,i){var s=un();return Xe!==null?Fm(s,Xe,e,i):(s.baseState=e,[e,s.queue.dispatch])},useMemoCache:_f,useCacheRefresh:c0};p0.useEffectEvent=Qm;function Lf(e,i,s,o){i=e.memoizedState,s=s(o,i),s=s==null?i:g({},i,s),e.memoizedState=s,e.lanes===0&&(e.updateQueue.baseState=s)}var Uf={enqueueSetState:function(e,i,s){e=e._reactInternals;var o=ui(),u=Fa(o);u.payload=i,s!=null&&(u.callback=s),i=Ha(e,u,o),i!==null&&($n(i,e,o),Ao(i,e,o))},enqueueReplaceState:function(e,i,s){e=e._reactInternals;var o=ui(),u=Fa(o);u.tag=1,u.payload=i,s!=null&&(u.callback=s),i=Ha(e,u,o),i!==null&&($n(i,e,o),Ao(i,e,o))},enqueueForceUpdate:function(e,i){e=e._reactInternals;var s=ui(),o=Fa(s);o.tag=2,i!=null&&(o.callback=i),i=Ha(e,o,s),i!==null&&($n(i,e,s),Ao(i,e,s))}};function m0(e,i,s,o,u,h,E){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(o,h,E):i.prototype&&i.prototype.isPureReactComponent?!xo(s,o)||!xo(u,h):!0}function g0(e,i,s,o){e=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(s,o),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(s,o),i.state!==e&&Uf.enqueueReplaceState(i,i.state,null)}function Rs(e,i){var s=i;if("ref"in i){s={};for(var o in i)o!=="ref"&&(s[o]=i[o])}if(e=e.defaultProps){s===i&&(s=g({},s));for(var u in e)s[u]===void 0&&(s[u]=e[u])}return s}function v0(e){El(e)}function x0(e){console.error(e)}function _0(e){El(e)}function ql(e,i){try{var s=e.onUncaughtError;s(i.value,{componentStack:i.stack})}catch(o){setTimeout(function(){throw o})}}function M0(e,i,s){try{var o=e.onCaughtError;o(s.value,{componentStack:s.stack,errorBoundary:i.tag===1?i.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Nf(e,i,s){return s=Fa(s),s.tag=3,s.payload={element:null},s.callback=function(){ql(e,i)},s}function S0(e){return e=Fa(e),e.tag=3,e}function y0(e,i,s,o){var u=s.type.getDerivedStateFromError;if(typeof u=="function"){var h=o.value;e.payload=function(){return u(h)},e.callback=function(){M0(i,s,o)}}var E=s.stateNode;E!==null&&typeof E.componentDidCatch=="function"&&(e.callback=function(){M0(i,s,o),typeof u!="function"&&(qa===null?qa=new Set([this]):qa.add(this));var A=o.stack;this.componentDidCatch(o.value,{componentStack:A!==null?A:""})})}function YM(e,i,s,o,u){if(s.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(i=s.alternate,i!==null&&sr(i,s,u,!0),s=ri.current,s!==null){switch(s.tag){case 31:case 13:return Ti===null?ac():s.alternate===null&&ln===0&&(ln=3),s.flags&=-257,s.flags|=65536,s.lanes=u,o===Nl?s.flags|=16384:(i=s.updateQueue,i===null?s.updateQueue=new Set([o]):i.add(o),ah(e,o,u)),!1;case 22:return s.flags|=65536,o===Nl?s.flags|=16384:(i=s.updateQueue,i===null?(i={transitions:null,markerInstances:null,retryQueue:new Set([o])},s.updateQueue=i):(s=i.retryQueue,s===null?i.retryQueue=new Set([o]):s.add(o)),ah(e,o,u)),!1}throw Error(a(435,s.tag))}return ah(e,o,u),ac(),!1}if(Ae)return i=ri.current,i!==null?((i.flags&65536)===0&&(i.flags|=256),i.flags|=65536,i.lanes=u,o!==Qu&&(e=Error(a(422),{cause:o}),So(Mi(e,s)))):(o!==Qu&&(i=Error(a(423),{cause:o}),So(Mi(i,s))),e=e.current.alternate,e.flags|=65536,u&=-u,e.lanes|=u,o=Mi(o,s),u=Nf(e.stateNode,o,u),cf(e,u),ln!==4&&(ln=2)),!1;var h=Error(a(520),{cause:o});if(h=Mi(h,s),Ho===null?Ho=[h]:Ho.push(h),ln!==4&&(ln=2),i===null)return!0;o=Mi(o,s),s=i;do{switch(s.tag){case 3:return s.flags|=65536,e=u&-u,s.lanes|=e,e=Nf(s.stateNode,o,e),cf(s,e),!1;case 1:if(i=s.type,h=s.stateNode,(s.flags&128)===0&&(typeof i.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(qa===null||!qa.has(h))))return s.flags|=65536,u&=-u,s.lanes|=u,u=S0(u),y0(u,e,s,o),cf(s,u),!1}s=s.return}while(s!==null);return!1}var Of=Error(a(461)),dn=!1;function On(e,i,s,o){i.child=e===null?Am(i,null,s,o):As(i,e.child,s,o)}function E0(e,i,s,o,u){s=s.render;var h=i.ref;if("ref"in o){var E={};for(var A in o)A!=="ref"&&(E[A]=o[A])}else E=o;return ys(i),o=mf(e,i,s,E,h,u),A=gf(),e!==null&&!dn?(vf(e,i,u),ca(e,i,u)):(Ae&&A&&Zu(i),i.flags|=1,On(e,i,o,u),i.child)}function T0(e,i,s,o,u){if(e===null){var h=s.type;return typeof h=="function"&&!qu(h)&&h.defaultProps===void 0&&s.compare===null?(i.tag=15,i.type=h,b0(e,i,h,o,u)):(e=wl(s.type,null,o,i,i.mode,u),e.ref=i.ref,e.return=i,i.child=e)}if(h=e.child,!Vf(e,u)){var E=h.memoizedProps;if(s=s.compare,s=s!==null?s:xo,s(E,o)&&e.ref===i.ref)return ca(e,i,u)}return i.flags|=1,e=ia(h,o),e.ref=i.ref,e.return=i,i.child=e}function b0(e,i,s,o,u){if(e!==null){var h=e.memoizedProps;if(xo(h,o)&&e.ref===i.ref)if(dn=!1,i.pendingProps=o=h,Vf(e,u))(e.flags&131072)!==0&&(dn=!0);else return i.lanes=e.lanes,ca(e,i,u)}return Pf(e,i,s,o,u)}function A0(e,i,s,o){var u=o.children,h=e!==null?e.memoizedState:null;if(e===null&&i.stateNode===null&&(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((i.flags&128)!==0){if(h=h!==null?h.baseLanes|s:s,e!==null){for(o=i.child=e.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~h}else o=0,i.child=null;return w0(e,i,h,s,o)}if((s&536870912)!==0)i.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ll(i,h!==null?h.cachePool:null),h!==null?Cm(i,h):ff(),Dm(i);else return o=i.lanes=536870912,w0(e,i,h!==null?h.baseLanes|s:s,s,o)}else h!==null?(Ll(i,h.cachePool),Cm(i,h),Va(),i.memoizedState=null):(e!==null&&Ll(i,null),ff(),Va());return On(e,i,u,s),i.child}function No(e,i){return e!==null&&e.tag===22||i.stateNode!==null||(i.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.sibling}function w0(e,i,s,o,u){var h=sf();return h=h===null?null:{parent:fn._currentValue,pool:h},i.memoizedState={baseLanes:s,cachePool:h},e!==null&&Ll(i,null),ff(),Dm(i),e!==null&&sr(e,i,o,!0),i.childLanes=u,null}function jl(e,i){return i=Zl({mode:i.mode,children:i.children},e.mode),i.ref=e.ref,e.child=i,i.return=e,i}function R0(e,i,s){return As(i,e.child,null,s),e=jl(i,i.pendingProps),e.flags|=2,oi(i),i.memoizedState=null,e}function ZM(e,i,s){var o=i.pendingProps,u=(i.flags&128)!==0;if(i.flags&=-129,e===null){if(Ae){if(o.mode==="hidden")return e=jl(i,o),i.lanes=536870912,No(null,e);if(df(i),(e=Ke)?(e=Hg(e,Ei),e=e!==null&&e.data==="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Oa!==null?{id:qi,overflow:ji}:null,retryLane:536870912,hydrationErrors:null},s=fm(e),s.return=i,i.child=s,Un=i,Ke=null)):e=null,e===null)throw za(i);return i.lanes=536870912,null}return jl(i,o)}var h=e.memoizedState;if(h!==null){var E=h.dehydrated;if(df(i),u)if(i.flags&256)i.flags&=-257,i=R0(e,i,s);else if(i.memoizedState!==null)i.child=e.child,i.flags|=128,i=null;else throw Error(a(558));else if(dn||sr(e,i,s,!1),u=(s&e.childLanes)!==0,dn||u){if(o=Ye,o!==null&&(E=Wi(o,s),E!==0&&E!==h.retryLane))throw h.retryLane=E,xs(e,E),$n(o,e,E),Of;ac(),i=R0(e,i,s)}else e=h.treeContext,Ke=bi(E.nextSibling),Un=i,Ae=!0,Pa=null,Ei=!1,e!==null&&pm(i,e),i=jl(i,o),i.flags|=4096;return i}return e=ia(e.child,{mode:o.mode,children:o.children}),e.ref=i.ref,i.child=e,e.return=i,e}function Yl(e,i){var s=i.ref;if(s===null)e!==null&&e.ref!==null&&(i.flags|=4194816);else{if(typeof s!="function"&&typeof s!="object")throw Error(a(284));(e===null||e.ref!==s)&&(i.flags|=4194816)}}function Pf(e,i,s,o,u){return ys(i),s=mf(e,i,s,o,void 0,u),o=gf(),e!==null&&!dn?(vf(e,i,u),ca(e,i,u)):(Ae&&o&&Zu(i),i.flags|=1,On(e,i,s,u),i.child)}function C0(e,i,s,o,u,h){return ys(i),i.updateQueue=null,s=Um(i,o,s,u),Lm(e),o=gf(),e!==null&&!dn?(vf(e,i,h),ca(e,i,h)):(Ae&&o&&Zu(i),i.flags|=1,On(e,i,s,h),i.child)}function D0(e,i,s,o,u){if(ys(i),i.stateNode===null){var h=er,E=s.contextType;typeof E=="object"&&E!==null&&(h=Nn(E)),h=new s(o,h),i.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,h.updater=Uf,i.stateNode=h,h._reactInternals=i,h=i.stateNode,h.props=o,h.state=i.memoizedState,h.refs={},of(i),E=s.contextType,h.context=typeof E=="object"&&E!==null?Nn(E):er,h.state=i.memoizedState,E=s.getDerivedStateFromProps,typeof E=="function"&&(Lf(i,s,E,o),h.state=i.memoizedState),typeof s.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(E=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),E!==h.state&&Uf.enqueueReplaceState(h,h.state,null),Ro(i,o,h,u),wo(),h.state=i.memoizedState),typeof h.componentDidMount=="function"&&(i.flags|=4194308),o=!0}else if(e===null){h=i.stateNode;var A=i.memoizedProps,F=Rs(s,A);h.props=F;var $=h.context,ft=s.contextType;E=er,typeof ft=="object"&&ft!==null&&(E=Nn(ft));var vt=s.getDerivedStateFromProps;ft=typeof vt=="function"||typeof h.getSnapshotBeforeUpdate=="function",A=i.pendingProps!==A,ft||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(A||$!==E)&&g0(i,h,o,E),Ia=!1;var et=i.memoizedState;h.state=et,Ro(i,o,h,u),wo(),$=i.memoizedState,A||et!==$||Ia?(typeof vt=="function"&&(Lf(i,s,vt,o),$=i.memoizedState),(F=Ia||m0(i,s,F,o,et,$,E))?(ft||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount()),typeof h.componentDidMount=="function"&&(i.flags|=4194308)):(typeof h.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=o,i.memoizedState=$),h.props=o,h.state=$,h.context=E,o=F):(typeof h.componentDidMount=="function"&&(i.flags|=4194308),o=!1)}else{h=i.stateNode,lf(e,i),E=i.memoizedProps,ft=Rs(s,E),h.props=ft,vt=i.pendingProps,et=h.context,$=s.contextType,F=er,typeof $=="object"&&$!==null&&(F=Nn($)),A=s.getDerivedStateFromProps,($=typeof A=="function"||typeof h.getSnapshotBeforeUpdate=="function")||typeof h.UNSAFE_componentWillReceiveProps!="function"&&typeof h.componentWillReceiveProps!="function"||(E!==vt||et!==F)&&g0(i,h,o,F),Ia=!1,et=i.memoizedState,h.state=et,Ro(i,o,h,u),wo();var ot=i.memoizedState;E!==vt||et!==ot||Ia||e!==null&&e.dependencies!==null&&Cl(e.dependencies)?(typeof A=="function"&&(Lf(i,s,A,o),ot=i.memoizedState),(ft=Ia||m0(i,s,ft,o,et,ot,F)||e!==null&&e.dependencies!==null&&Cl(e.dependencies))?($||typeof h.UNSAFE_componentWillUpdate!="function"&&typeof h.componentWillUpdate!="function"||(typeof h.componentWillUpdate=="function"&&h.componentWillUpdate(o,ot,F),typeof h.UNSAFE_componentWillUpdate=="function"&&h.UNSAFE_componentWillUpdate(o,ot,F)),typeof h.componentDidUpdate=="function"&&(i.flags|=4),typeof h.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof h.componentDidUpdate!="function"||E===e.memoizedProps&&et===e.memoizedState||(i.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||E===e.memoizedProps&&et===e.memoizedState||(i.flags|=1024),i.memoizedProps=o,i.memoizedState=ot),h.props=o,h.state=ot,h.context=F,o=ft):(typeof h.componentDidUpdate!="function"||E===e.memoizedProps&&et===e.memoizedState||(i.flags|=4),typeof h.getSnapshotBeforeUpdate!="function"||E===e.memoizedProps&&et===e.memoizedState||(i.flags|=1024),o=!1)}return h=o,Yl(e,i),o=(i.flags&128)!==0,h||o?(h=i.stateNode,s=o&&typeof s.getDerivedStateFromError!="function"?null:h.render(),i.flags|=1,e!==null&&o?(i.child=As(i,e.child,null,u),i.child=As(i,null,s,u)):On(e,i,s,u),i.memoizedState=h.state,e=i.child):e=ca(e,i,u),e}function L0(e,i,s,o){return Ms(),i.flags|=256,On(e,i,s,o),i.child}var zf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Bf(e){return{baseLanes:e,cachePool:Mm()}}function If(e,i,s){return e=e!==null?e.childLanes&~s:0,i&&(e|=ci),e}function U0(e,i,s){var o=i.pendingProps,u=!1,h=(i.flags&128)!==0,E;if((E=h)||(E=e!==null&&e.memoizedState===null?!1:(cn.current&2)!==0),E&&(u=!0,i.flags&=-129),E=(i.flags&32)!==0,i.flags&=-33,e===null){if(Ae){if(u?Ga(i):Va(),(e=Ke)?(e=Hg(e,Ei),e=e!==null&&e.data!=="&"?e:null,e!==null&&(i.memoizedState={dehydrated:e,treeContext:Oa!==null?{id:qi,overflow:ji}:null,retryLane:536870912,hydrationErrors:null},s=fm(e),s.return=i,i.child=s,Un=i,Ke=null)):e=null,e===null)throw za(i);return Mh(e)?i.lanes=32:i.lanes=536870912,null}var A=o.children;return o=o.fallback,u?(Va(),u=i.mode,A=Zl({mode:"hidden",children:A},u),o=_s(o,u,s,null),A.return=i,o.return=i,A.sibling=o,i.child=A,o=i.child,o.memoizedState=Bf(s),o.childLanes=If(e,E,s),i.memoizedState=zf,No(null,o)):(Ga(i),Ff(i,A))}var F=e.memoizedState;if(F!==null&&(A=F.dehydrated,A!==null)){if(h)i.flags&256?(Ga(i),i.flags&=-257,i=Hf(e,i,s)):i.memoizedState!==null?(Va(),i.child=e.child,i.flags|=128,i=null):(Va(),A=o.fallback,u=i.mode,o=Zl({mode:"visible",children:o.children},u),A=_s(A,u,s,null),A.flags|=2,o.return=i,A.return=i,o.sibling=A,i.child=o,As(i,e.child,null,s),o=i.child,o.memoizedState=Bf(s),o.childLanes=If(e,E,s),i.memoizedState=zf,i=No(null,o));else if(Ga(i),Mh(A)){if(E=A.nextSibling&&A.nextSibling.dataset,E)var $=E.dgst;E=$,o=Error(a(419)),o.stack="",o.digest=E,So({value:o,source:null,stack:null}),i=Hf(e,i,s)}else if(dn||sr(e,i,s,!1),E=(s&e.childLanes)!==0,dn||E){if(E=Ye,E!==null&&(o=Wi(E,s),o!==0&&o!==F.retryLane))throw F.retryLane=o,xs(e,o),$n(E,e,o),Of;_h(A)||ac(),i=Hf(e,i,s)}else _h(A)?(i.flags|=192,i.child=e.child,i=null):(e=F.treeContext,Ke=bi(A.nextSibling),Un=i,Ae=!0,Pa=null,Ei=!1,e!==null&&pm(i,e),i=Ff(i,o.children),i.flags|=4096);return i}return u?(Va(),A=o.fallback,u=i.mode,F=e.child,$=F.sibling,o=ia(F,{mode:"hidden",children:o.children}),o.subtreeFlags=F.subtreeFlags&65011712,$!==null?A=ia($,A):(A=_s(A,u,s,null),A.flags|=2),A.return=i,o.return=i,o.sibling=A,i.child=o,No(null,o),o=i.child,A=e.child.memoizedState,A===null?A=Bf(s):(u=A.cachePool,u!==null?(F=fn._currentValue,u=u.parent!==F?{parent:F,pool:F}:u):u=Mm(),A={baseLanes:A.baseLanes|s,cachePool:u}),o.memoizedState=A,o.childLanes=If(e,E,s),i.memoizedState=zf,No(e.child,o)):(Ga(i),s=e.child,e=s.sibling,s=ia(s,{mode:"visible",children:o.children}),s.return=i,s.sibling=null,e!==null&&(E=i.deletions,E===null?(i.deletions=[e],i.flags|=16):E.push(e)),i.child=s,i.memoizedState=null,s)}function Ff(e,i){return i=Zl({mode:"visible",children:i},e.mode),i.return=e,e.child=i}function Zl(e,i){return e=si(22,e,null,i),e.lanes=0,e}function Hf(e,i,s){return As(i,e.child,null,s),e=Ff(i,i.pendingProps.children),e.flags|=2,i.memoizedState=null,e}function N0(e,i,s){e.lanes|=i;var o=e.alternate;o!==null&&(o.lanes|=i),tf(e.return,i,s)}function Gf(e,i,s,o,u,h){var E=e.memoizedState;E===null?e.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:o,tail:s,tailMode:u,treeForkCount:h}:(E.isBackwards=i,E.rendering=null,E.renderingStartTime=0,E.last=o,E.tail=s,E.tailMode=u,E.treeForkCount=h)}function O0(e,i,s){var o=i.pendingProps,u=o.revealOrder,h=o.tail;o=o.children;var E=cn.current,A=(E&2)!==0;if(A?(E=E&1|2,i.flags|=128):E&=1,Mt(cn,E),On(e,i,o,s),o=Ae?Mo:0,!A&&e!==null&&(e.flags&128)!==0)t:for(e=i.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&N0(e,s,i);else if(e.tag===19)N0(e,s,i);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===i)break t;for(;e.sibling===null;){if(e.return===null||e.return===i)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(u){case"forwards":for(s=i.child,u=null;s!==null;)e=s.alternate,e!==null&&Bl(e)===null&&(u=s),s=s.sibling;s=u,s===null?(u=i.child,i.child=null):(u=s.sibling,s.sibling=null),Gf(i,!1,u,s,h,o);break;case"backwards":case"unstable_legacy-backwards":for(s=null,u=i.child,i.child=null;u!==null;){if(e=u.alternate,e!==null&&Bl(e)===null){i.child=u;break}e=u.sibling,u.sibling=s,s=u,u=e}Gf(i,!0,s,null,h,o);break;case"together":Gf(i,!1,null,null,void 0,o);break;default:i.memoizedState=null}return i.child}function ca(e,i,s){if(e!==null&&(i.dependencies=e.dependencies),Wa|=i.lanes,(s&i.childLanes)===0)if(e!==null){if(sr(e,i,s,!1),(s&i.childLanes)===0)return null}else return null;if(e!==null&&i.child!==e.child)throw Error(a(153));if(i.child!==null){for(e=i.child,s=ia(e,e.pendingProps),i.child=s,s.return=i;e.sibling!==null;)e=e.sibling,s=s.sibling=ia(e,e.pendingProps),s.return=i;s.sibling=null}return i.child}function Vf(e,i){return(e.lanes&i)!==0?!0:(e=e.dependencies,!!(e!==null&&Cl(e)))}function KM(e,i,s){switch(i.tag){case 3:Vt(i,i.stateNode.containerInfo),Ba(i,fn,e.memoizedState.cache),Ms();break;case 27:case 5:oe(i);break;case 4:Vt(i,i.stateNode.containerInfo);break;case 10:Ba(i,i.type,i.memoizedProps.value);break;case 31:if(i.memoizedState!==null)return i.flags|=128,df(i),null;break;case 13:var o=i.memoizedState;if(o!==null)return o.dehydrated!==null?(Ga(i),i.flags|=128,null):(s&i.child.childLanes)!==0?U0(e,i,s):(Ga(i),e=ca(e,i,s),e!==null?e.sibling:null);Ga(i);break;case 19:var u=(e.flags&128)!==0;if(o=(s&i.childLanes)!==0,o||(sr(e,i,s,!1),o=(s&i.childLanes)!==0),u){if(o)return O0(e,i,s);i.flags|=128}if(u=i.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),Mt(cn,cn.current),o)break;return null;case 22:return i.lanes=0,A0(e,i,s,i.pendingProps);case 24:Ba(i,fn,e.memoizedState.cache)}return ca(e,i,s)}function P0(e,i,s){if(e!==null)if(e.memoizedProps!==i.pendingProps)dn=!0;else{if(!Vf(e,s)&&(i.flags&128)===0)return dn=!1,KM(e,i,s);dn=(e.flags&131072)!==0}else dn=!1,Ae&&(i.flags&1048576)!==0&&dm(i,Mo,i.index);switch(i.lanes=0,i.tag){case 16:t:{var o=i.pendingProps;if(e=Ts(i.elementType),i.type=e,typeof e=="function")qu(e)?(o=Rs(e,o),i.tag=1,i=D0(null,i,e,o,s)):(i.tag=0,i=Pf(null,i,e,o,s));else{if(e!=null){var u=e.$$typeof;if(u===R){i.tag=11,i=E0(null,i,e,o,s);break t}else if(u===N){i.tag=14,i=T0(null,i,e,o,s);break t}}throw i=ht(e)||e,Error(a(306,i,""))}}return i;case 0:return Pf(e,i,i.type,i.pendingProps,s);case 1:return o=i.type,u=Rs(o,i.pendingProps),D0(e,i,o,u,s);case 3:t:{if(Vt(i,i.stateNode.containerInfo),e===null)throw Error(a(387));o=i.pendingProps;var h=i.memoizedState;u=h.element,lf(e,i),Ro(i,o,null,s);var E=i.memoizedState;if(o=E.cache,Ba(i,fn,o),o!==h.cache&&ef(i,[fn],s,!0),wo(),o=E.element,h.isDehydrated)if(h={element:o,isDehydrated:!1,cache:E.cache},i.updateQueue.baseState=h,i.memoizedState=h,i.flags&256){i=L0(e,i,o,s);break t}else if(o!==u){u=Mi(Error(a(424)),i),So(u),i=L0(e,i,o,s);break t}else{switch(e=i.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Ke=bi(e.firstChild),Un=i,Ae=!0,Pa=null,Ei=!0,s=Am(i,null,o,s),i.child=s;s;)s.flags=s.flags&-3|4096,s=s.sibling}else{if(Ms(),o===u){i=ca(e,i,s);break t}On(e,i,o,s)}i=i.child}return i;case 26:return Yl(e,i),e===null?(s=qg(i.type,null,i.pendingProps,null))?i.memoizedState=s:Ae||(s=i.type,e=i.pendingProps,o=fc(Et.current).createElement(s),o[rn]=i,o[Dn]=e,Pn(o,s,e),Dt(o),i.stateNode=o):i.memoizedState=qg(i.type,e.memoizedProps,i.pendingProps,e.memoizedState),null;case 27:return oe(i),e===null&&Ae&&(o=i.stateNode=kg(i.type,i.pendingProps,Et.current),Un=i,Ei=!0,u=Ke,Ka(i.type)?(Sh=u,Ke=bi(o.firstChild)):Ke=u),On(e,i,i.pendingProps.children,s),Yl(e,i),e===null&&(i.flags|=4194304),i.child;case 5:return e===null&&Ae&&((u=o=Ke)&&(o=AS(o,i.type,i.pendingProps,Ei),o!==null?(i.stateNode=o,Un=i,Ke=bi(o.firstChild),Ei=!1,u=!0):u=!1),u||za(i)),oe(i),u=i.type,h=i.pendingProps,E=e!==null?e.memoizedProps:null,o=h.children,gh(u,h)?o=null:E!==null&&gh(u,E)&&(i.flags|=32),i.memoizedState!==null&&(u=mf(e,i,GM,null,null,s),Yo._currentValue=u),Yl(e,i),On(e,i,o,s),i.child;case 6:return e===null&&Ae&&((e=s=Ke)&&(s=wS(s,i.pendingProps,Ei),s!==null?(i.stateNode=s,Un=i,Ke=null,e=!0):e=!1),e||za(i)),null;case 13:return U0(e,i,s);case 4:return Vt(i,i.stateNode.containerInfo),o=i.pendingProps,e===null?i.child=As(i,null,o,s):On(e,i,o,s),i.child;case 11:return E0(e,i,i.type,i.pendingProps,s);case 7:return On(e,i,i.pendingProps,s),i.child;case 8:return On(e,i,i.pendingProps.children,s),i.child;case 12:return On(e,i,i.pendingProps.children,s),i.child;case 10:return o=i.pendingProps,Ba(i,i.type,o.value),On(e,i,o.children,s),i.child;case 9:return u=i.type._context,o=i.pendingProps.children,ys(i),u=Nn(u),o=o(u),i.flags|=1,On(e,i,o,s),i.child;case 14:return T0(e,i,i.type,i.pendingProps,s);case 15:return b0(e,i,i.type,i.pendingProps,s);case 19:return O0(e,i,s);case 31:return ZM(e,i,s);case 22:return A0(e,i,s,i.pendingProps);case 24:return ys(i),o=Nn(fn),e===null?(u=sf(),u===null&&(u=Ye,h=nf(),u.pooledCache=h,h.refCount++,h!==null&&(u.pooledCacheLanes|=s),u=h),i.memoizedState={parent:o,cache:u},of(i),Ba(i,fn,u)):((e.lanes&s)!==0&&(lf(e,i),Ro(i,null,null,s),wo()),u=e.memoizedState,h=i.memoizedState,u.parent!==o?(u={parent:o,cache:o},i.memoizedState=u,i.lanes===0&&(i.memoizedState=i.updateQueue.baseState=u),Ba(i,fn,o)):(o=h.cache,Ba(i,fn,o),o!==u.cache&&ef(i,[fn],s,!0))),On(e,i,i.pendingProps.children,s),i.child;case 29:throw i.pendingProps}throw Error(a(156,i.tag))}function ua(e){e.flags|=4}function kf(e,i,s,o,u){if((i=(e.mode&32)!==0)&&(i=!1),i){if(e.flags|=16777216,(u&335544128)===u)if(e.stateNode.complete)e.flags|=8192;else if(lg())e.flags|=8192;else throw bs=Nl,rf}else e.flags&=-16777217}function z0(e,i){if(i.type!=="stylesheet"||(i.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Qg(i))if(lg())e.flags|=8192;else throw bs=Nl,rf}function Kl(e,i){i!==null&&(e.flags|=4),e.flags&16384&&(i=e.tag!==22?vn():536870912,e.lanes|=i,vr|=i)}function Oo(e,i){if(!Ae)switch(e.tailMode){case"hidden":i=e.tail;for(var s=null;i!==null;)i.alternate!==null&&(s=i),i=i.sibling;s===null?e.tail=null:s.sibling=null;break;case"collapsed":s=e.tail;for(var o=null;s!==null;)s.alternate!==null&&(o=s),s=s.sibling;o===null?i||e.tail===null?e.tail=null:e.tail.sibling=null:o.sibling=null}}function Qe(e){var i=e.alternate!==null&&e.alternate.child===e.child,s=0,o=0;if(i)for(var u=e.child;u!==null;)s|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=e,u=u.sibling;else for(u=e.child;u!==null;)s|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=e,u=u.sibling;return e.subtreeFlags|=o,e.childLanes=s,i}function QM(e,i,s){var o=i.pendingProps;switch(Ku(i),i.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Qe(i),null;case 1:return Qe(i),null;case 3:return s=i.stateNode,o=null,e!==null&&(o=e.memoizedState.cache),i.memoizedState.cache!==o&&(i.flags|=2048),ra(fn),Gt(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(ar(i)?ua(i):e===null||e.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,Ju())),Qe(i),null;case 26:var u=i.type,h=i.memoizedState;return e===null?(ua(i),h!==null?(Qe(i),z0(i,h)):(Qe(i),kf(i,u,null,o,s))):h?h!==e.memoizedState?(ua(i),Qe(i),z0(i,h)):(Qe(i),i.flags&=-16777217):(e=e.memoizedProps,e!==o&&ua(i),Qe(i),kf(i,u,e,o,s)),null;case 27:if(Ge(i),s=Et.current,u=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==o&&ua(i);else{if(!o){if(i.stateNode===null)throw Error(a(166));return Qe(i),null}e=Z.current,ar(i)?mm(i):(e=kg(u,o,s),i.stateNode=e,ua(i))}return Qe(i),null;case 5:if(Ge(i),u=i.type,e!==null&&i.stateNode!=null)e.memoizedProps!==o&&ua(i);else{if(!o){if(i.stateNode===null)throw Error(a(166));return Qe(i),null}if(h=Z.current,ar(i))mm(i);else{var E=fc(Et.current);switch(h){case 1:h=E.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:h=E.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":h=E.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":h=E.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":h=E.createElement("div"),h.innerHTML="<script><\/script>",h=h.removeChild(h.firstChild);break;case"select":h=typeof o.is=="string"?E.createElement("select",{is:o.is}):E.createElement("select"),o.multiple?h.multiple=!0:o.size&&(h.size=o.size);break;default:h=typeof o.is=="string"?E.createElement(u,{is:o.is}):E.createElement(u)}}h[rn]=i,h[Dn]=o;t:for(E=i.child;E!==null;){if(E.tag===5||E.tag===6)h.appendChild(E.stateNode);else if(E.tag!==4&&E.tag!==27&&E.child!==null){E.child.return=E,E=E.child;continue}if(E===i)break t;for(;E.sibling===null;){if(E.return===null||E.return===i)break t;E=E.return}E.sibling.return=E.return,E=E.sibling}i.stateNode=h;t:switch(Pn(h,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&ua(i)}}return Qe(i),kf(i,i.type,e===null?null:e.memoizedProps,i.pendingProps,s),null;case 6:if(e&&i.stateNode!=null)e.memoizedProps!==o&&ua(i);else{if(typeof o!="string"&&i.stateNode===null)throw Error(a(166));if(e=Et.current,ar(i)){if(e=i.stateNode,s=i.memoizedProps,o=null,u=Un,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}e[rn]=i,e=!!(e.nodeValue===s||o!==null&&o.suppressHydrationWarning===!0||Ug(e.nodeValue,s)),e||za(i,!0)}else e=fc(e).createTextNode(o),e[rn]=i,i.stateNode=e}return Qe(i),null;case 31:if(s=i.memoizedState,e===null||e.memoizedState!==null){if(o=ar(i),s!==null){if(e===null){if(!o)throw Error(a(318));if(e=i.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(a(557));e[rn]=i}else Ms(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Qe(i),e=!1}else s=Ju(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),e=!0;if(!e)return i.flags&256?(oi(i),i):(oi(i),null);if((i.flags&128)!==0)throw Error(a(558))}return Qe(i),null;case 13:if(o=i.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(u=ar(i),o!==null&&o.dehydrated!==null){if(e===null){if(!u)throw Error(a(318));if(u=i.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(a(317));u[rn]=i}else Ms(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Qe(i),u=!1}else u=Ju(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=u),u=!0;if(!u)return i.flags&256?(oi(i),i):(oi(i),null)}return oi(i),(i.flags&128)!==0?(i.lanes=s,i):(s=o!==null,e=e!==null&&e.memoizedState!==null,s&&(o=i.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),h=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(h=o.memoizedState.cachePool.pool),h!==u&&(o.flags|=2048)),s!==e&&s&&(i.child.flags|=8192),Kl(i,i.updateQueue),Qe(i),null);case 4:return Gt(),e===null&&fh(i.stateNode.containerInfo),Qe(i),null;case 10:return ra(i.type),Qe(i),null;case 19:if(it(cn),o=i.memoizedState,o===null)return Qe(i),null;if(u=(i.flags&128)!==0,h=o.rendering,h===null)if(u)Oo(o,!1);else{if(ln!==0||e!==null&&(e.flags&128)!==0)for(e=i.child;e!==null;){if(h=Bl(e),h!==null){for(i.flags|=128,Oo(o,!1),e=h.updateQueue,i.updateQueue=e,Kl(i,e),i.subtreeFlags=0,e=s,s=i.child;s!==null;)um(s,e),s=s.sibling;return Mt(cn,cn.current&1|2),Ae&&aa(i,o.treeForkCount),i.child}e=e.sibling}o.tail!==null&&dt()>ec&&(i.flags|=128,u=!0,Oo(o,!1),i.lanes=4194304)}else{if(!u)if(e=Bl(h),e!==null){if(i.flags|=128,u=!0,e=e.updateQueue,i.updateQueue=e,Kl(i,e),Oo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!h.alternate&&!Ae)return Qe(i),null}else 2*dt()-o.renderingStartTime>ec&&s!==536870912&&(i.flags|=128,u=!0,Oo(o,!1),i.lanes=4194304);o.isBackwards?(h.sibling=i.child,i.child=h):(e=o.last,e!==null?e.sibling=h:i.child=h,o.last=h)}return o.tail!==null?(e=o.tail,o.rendering=e,o.tail=e.sibling,o.renderingStartTime=dt(),e.sibling=null,s=cn.current,Mt(cn,u?s&1|2:s&1),Ae&&aa(i,o.treeForkCount),e):(Qe(i),null);case 22:case 23:return oi(i),hf(),o=i.memoizedState!==null,e!==null?e.memoizedState!==null!==o&&(i.flags|=8192):o&&(i.flags|=8192),o?(s&536870912)!==0&&(i.flags&128)===0&&(Qe(i),i.subtreeFlags&6&&(i.flags|=8192)):Qe(i),s=i.updateQueue,s!==null&&Kl(i,s.retryQueue),s=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),o=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(o=i.memoizedState.cachePool.pool),o!==s&&(i.flags|=2048),e!==null&&it(Es),null;case 24:return s=null,e!==null&&(s=e.memoizedState.cache),i.memoizedState.cache!==s&&(i.flags|=2048),ra(fn),Qe(i),null;case 25:return null;case 30:return null}throw Error(a(156,i.tag))}function JM(e,i){switch(Ku(i),i.tag){case 1:return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 3:return ra(fn),Gt(),e=i.flags,(e&65536)!==0&&(e&128)===0?(i.flags=e&-65537|128,i):null;case 26:case 27:case 5:return Ge(i),null;case 31:if(i.memoizedState!==null){if(oi(i),i.alternate===null)throw Error(a(340));Ms()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 13:if(oi(i),e=i.memoizedState,e!==null&&e.dehydrated!==null){if(i.alternate===null)throw Error(a(340));Ms()}return e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 19:return it(cn),null;case 4:return Gt(),null;case 10:return ra(i.type),null;case 22:case 23:return oi(i),hf(),e!==null&&it(Es),e=i.flags,e&65536?(i.flags=e&-65537|128,i):null;case 24:return ra(fn),null;case 25:return null;default:return null}}function B0(e,i){switch(Ku(i),i.tag){case 3:ra(fn),Gt();break;case 26:case 27:case 5:Ge(i);break;case 4:Gt();break;case 31:i.memoizedState!==null&&oi(i);break;case 13:oi(i);break;case 19:it(cn);break;case 10:ra(i.type);break;case 22:case 23:oi(i),hf(),e!==null&&it(Es);break;case 24:ra(fn)}}function Po(e,i){try{var s=i.updateQueue,o=s!==null?s.lastEffect:null;if(o!==null){var u=o.next;s=u;do{if((s.tag&e)===e){o=void 0;var h=s.create,E=s.inst;o=h(),E.destroy=o}s=s.next}while(s!==u)}}catch(A){Fe(i,i.return,A)}}function ka(e,i,s){try{var o=i.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var h=u.next;o=h;do{if((o.tag&e)===e){var E=o.inst,A=E.destroy;if(A!==void 0){E.destroy=void 0,u=i;var F=s,$=A;try{$()}catch(ft){Fe(u,F,ft)}}}o=o.next}while(o!==h)}}catch(ft){Fe(i,i.return,ft)}}function I0(e){var i=e.updateQueue;if(i!==null){var s=e.stateNode;try{Rm(i,s)}catch(o){Fe(e,e.return,o)}}}function F0(e,i,s){s.props=Rs(e.type,e.memoizedProps),s.state=e.memoizedState;try{s.componentWillUnmount()}catch(o){Fe(e,i,o)}}function zo(e,i){try{var s=e.ref;if(s!==null){switch(e.tag){case 26:case 27:case 5:var o=e.stateNode;break;case 30:o=e.stateNode;break;default:o=e.stateNode}typeof s=="function"?e.refCleanup=s(o):s.current=o}}catch(u){Fe(e,i,u)}}function Yi(e,i){var s=e.ref,o=e.refCleanup;if(s!==null)if(typeof o=="function")try{o()}catch(u){Fe(e,i,u)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof s=="function")try{s(null)}catch(u){Fe(e,i,u)}else s.current=null}function H0(e){var i=e.type,s=e.memoizedProps,o=e.stateNode;try{t:switch(i){case"button":case"input":case"select":case"textarea":s.autoFocus&&o.focus();break t;case"img":s.src?o.src=s.src:s.srcSet&&(o.srcset=s.srcSet)}}catch(u){Fe(e,e.return,u)}}function Xf(e,i,s){try{var o=e.stateNode;MS(o,e.type,s,i),o[Dn]=i}catch(u){Fe(e,e.return,u)}}function G0(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ka(e.type)||e.tag===4}function Wf(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||G0(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ka(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function qf(e,i,s){var o=e.tag;if(o===5||o===6)e=e.stateNode,i?(s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s).insertBefore(e,i):(i=s.nodeType===9?s.body:s.nodeName==="HTML"?s.ownerDocument.body:s,i.appendChild(e),s=s._reactRootContainer,s!=null||i.onclick!==null||(i.onclick=ea));else if(o!==4&&(o===27&&Ka(e.type)&&(s=e.stateNode,i=null),e=e.child,e!==null))for(qf(e,i,s),e=e.sibling;e!==null;)qf(e,i,s),e=e.sibling}function Ql(e,i,s){var o=e.tag;if(o===5||o===6)e=e.stateNode,i?s.insertBefore(e,i):s.appendChild(e);else if(o!==4&&(o===27&&Ka(e.type)&&(s=e.stateNode),e=e.child,e!==null))for(Ql(e,i,s),e=e.sibling;e!==null;)Ql(e,i,s),e=e.sibling}function V0(e){var i=e.stateNode,s=e.memoizedProps;try{for(var o=e.type,u=i.attributes;u.length;)i.removeAttributeNode(u[0]);Pn(i,o,s),i[rn]=e,i[Dn]=s}catch(h){Fe(e,e.return,h)}}var fa=!1,pn=!1,jf=!1,k0=typeof WeakSet=="function"?WeakSet:Set,En=null;function $M(e,i){if(e=e.containerInfo,ph=xc,e=em(e),Fu(e)){if("selectionStart"in e)var s={start:e.selectionStart,end:e.selectionEnd};else t:{s=(s=e.ownerDocument)&&s.defaultView||window;var o=s.getSelection&&s.getSelection();if(o&&o.rangeCount!==0){s=o.anchorNode;var u=o.anchorOffset,h=o.focusNode;o=o.focusOffset;try{s.nodeType,h.nodeType}catch{s=null;break t}var E=0,A=-1,F=-1,$=0,ft=0,vt=e,et=null;e:for(;;){for(var ot;vt!==s||u!==0&&vt.nodeType!==3||(A=E+u),vt!==h||o!==0&&vt.nodeType!==3||(F=E+o),vt.nodeType===3&&(E+=vt.nodeValue.length),(ot=vt.firstChild)!==null;)et=vt,vt=ot;for(;;){if(vt===e)break e;if(et===s&&++$===u&&(A=E),et===h&&++ft===o&&(F=E),(ot=vt.nextSibling)!==null)break;vt=et,et=vt.parentNode}vt=ot}s=A===-1||F===-1?null:{start:A,end:F}}else s=null}s=s||{start:0,end:0}}else s=null;for(mh={focusedElem:e,selectionRange:s},xc=!1,En=i;En!==null;)if(i=En,e=i.child,(i.subtreeFlags&1028)!==0&&e!==null)e.return=i,En=e;else for(;En!==null;){switch(i=En,h=i.alternate,e=i.flags,i.tag){case 0:if((e&4)!==0&&(e=i.updateQueue,e=e!==null?e.events:null,e!==null))for(s=0;s<e.length;s++)u=e[s],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&h!==null){e=void 0,s=i,u=h.memoizedProps,h=h.memoizedState,o=s.stateNode;try{var Ft=Rs(s.type,u);e=o.getSnapshotBeforeUpdate(Ft,h),o.__reactInternalSnapshotBeforeUpdate=e}catch(Jt){Fe(s,s.return,Jt)}}break;case 3:if((e&1024)!==0){if(e=i.stateNode.containerInfo,s=e.nodeType,s===9)xh(e);else if(s===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":xh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(a(163))}if(e=i.sibling,e!==null){e.return=i.return,En=e;break}En=i.return}}function X0(e,i,s){var o=s.flags;switch(s.tag){case 0:case 11:case 15:da(e,s),o&4&&Po(5,s);break;case 1:if(da(e,s),o&4)if(e=s.stateNode,i===null)try{e.componentDidMount()}catch(E){Fe(s,s.return,E)}else{var u=Rs(s.type,i.memoizedProps);i=i.memoizedState;try{e.componentDidUpdate(u,i,e.__reactInternalSnapshotBeforeUpdate)}catch(E){Fe(s,s.return,E)}}o&64&&I0(s),o&512&&zo(s,s.return);break;case 3:if(da(e,s),o&64&&(e=s.updateQueue,e!==null)){if(i=null,s.child!==null)switch(s.child.tag){case 27:case 5:i=s.child.stateNode;break;case 1:i=s.child.stateNode}try{Rm(e,i)}catch(E){Fe(s,s.return,E)}}break;case 27:i===null&&o&4&&V0(s);case 26:case 5:da(e,s),i===null&&o&4&&H0(s),o&512&&zo(s,s.return);break;case 12:da(e,s);break;case 31:da(e,s),o&4&&j0(e,s);break;case 13:da(e,s),o&4&&Y0(e,s),o&64&&(e=s.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(s=lS.bind(null,s),RS(e,s))));break;case 22:if(o=s.memoizedState!==null||fa,!o){i=i!==null&&i.memoizedState!==null||pn,u=fa;var h=pn;fa=o,(pn=i)&&!h?pa(e,s,(s.subtreeFlags&8772)!==0):da(e,s),fa=u,pn=h}break;case 30:break;default:da(e,s)}}function W0(e){var i=e.alternate;i!==null&&(e.alternate=null,W0(i)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(i=e.stateNode,i!==null&&rt(i)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var en=null,Zn=!1;function ha(e,i,s){for(s=s.child;s!==null;)q0(e,i,s),s=s.sibling}function q0(e,i,s){if(jt&&typeof jt.onCommitFiberUnmount=="function")try{jt.onCommitFiberUnmount(Kt,s)}catch{}switch(s.tag){case 26:pn||Yi(s,i),ha(e,i,s),s.memoizedState?s.memoizedState.count--:s.stateNode&&(s=s.stateNode,s.parentNode.removeChild(s));break;case 27:pn||Yi(s,i);var o=en,u=Zn;Ka(s.type)&&(en=s.stateNode,Zn=!1),ha(e,i,s),Wo(s.stateNode),en=o,Zn=u;break;case 5:pn||Yi(s,i);case 6:if(o=en,u=Zn,en=null,ha(e,i,s),en=o,Zn=u,en!==null)if(Zn)try{(en.nodeType===9?en.body:en.nodeName==="HTML"?en.ownerDocument.body:en).removeChild(s.stateNode)}catch(h){Fe(s,i,h)}else try{en.removeChild(s.stateNode)}catch(h){Fe(s,i,h)}break;case 18:en!==null&&(Zn?(e=en,Ig(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,s.stateNode),br(e)):Ig(en,s.stateNode));break;case 4:o=en,u=Zn,en=s.stateNode.containerInfo,Zn=!0,ha(e,i,s),en=o,Zn=u;break;case 0:case 11:case 14:case 15:ka(2,s,i),pn||ka(4,s,i),ha(e,i,s);break;case 1:pn||(Yi(s,i),o=s.stateNode,typeof o.componentWillUnmount=="function"&&F0(s,i,o)),ha(e,i,s);break;case 21:ha(e,i,s);break;case 22:pn=(o=pn)||s.memoizedState!==null,ha(e,i,s),pn=o;break;default:ha(e,i,s)}}function j0(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{br(e)}catch(s){Fe(i,i.return,s)}}}function Y0(e,i){if(i.memoizedState===null&&(e=i.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{br(e)}catch(s){Fe(i,i.return,s)}}function tS(e){switch(e.tag){case 31:case 13:case 19:var i=e.stateNode;return i===null&&(i=e.stateNode=new k0),i;case 22:return e=e.stateNode,i=e._retryCache,i===null&&(i=e._retryCache=new k0),i;default:throw Error(a(435,e.tag))}}function Jl(e,i){var s=tS(e);i.forEach(function(o){if(!s.has(o)){s.add(o);var u=cS.bind(null,e,o);o.then(u,u)}})}function Kn(e,i){var s=i.deletions;if(s!==null)for(var o=0;o<s.length;o++){var u=s[o],h=e,E=i,A=E;t:for(;A!==null;){switch(A.tag){case 27:if(Ka(A.type)){en=A.stateNode,Zn=!1;break t}break;case 5:en=A.stateNode,Zn=!1;break t;case 3:case 4:en=A.stateNode.containerInfo,Zn=!0;break t}A=A.return}if(en===null)throw Error(a(160));q0(h,E,u),en=null,Zn=!1,h=u.alternate,h!==null&&(h.return=null),u.return=null}if(i.subtreeFlags&13886)for(i=i.child;i!==null;)Z0(i,e),i=i.sibling}var Bi=null;function Z0(e,i){var s=e.alternate,o=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Kn(i,e),Qn(e),o&4&&(ka(3,e,e.return),Po(3,e),ka(5,e,e.return));break;case 1:Kn(i,e),Qn(e),o&512&&(pn||s===null||Yi(s,s.return)),o&64&&fa&&(e=e.updateQueue,e!==null&&(o=e.callbacks,o!==null&&(s=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=s===null?o:s.concat(o))));break;case 26:var u=Bi;if(Kn(i,e),Qn(e),o&512&&(pn||s===null||Yi(s,s.return)),o&4){var h=s!==null?s.memoizedState:null;if(o=e.memoizedState,s===null)if(o===null)if(e.stateNode===null){t:{o=e.type,s=e.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":h=u.getElementsByTagName("title")[0],(!h||h[X]||h[rn]||h.namespaceURI==="http://www.w3.org/2000/svg"||h.hasAttribute("itemprop"))&&(h=u.createElement(o),u.head.insertBefore(h,u.querySelector("head > title"))),Pn(h,o,s),h[rn]=e,Dt(h),o=h;break t;case"link":var E=Zg("link","href",u).get(o+(s.href||""));if(E){for(var A=0;A<E.length;A++)if(h=E[A],h.getAttribute("href")===(s.href==null||s.href===""?null:s.href)&&h.getAttribute("rel")===(s.rel==null?null:s.rel)&&h.getAttribute("title")===(s.title==null?null:s.title)&&h.getAttribute("crossorigin")===(s.crossOrigin==null?null:s.crossOrigin)){E.splice(A,1);break e}}h=u.createElement(o),Pn(h,o,s),u.head.appendChild(h);break;case"meta":if(E=Zg("meta","content",u).get(o+(s.content||""))){for(A=0;A<E.length;A++)if(h=E[A],h.getAttribute("content")===(s.content==null?null:""+s.content)&&h.getAttribute("name")===(s.name==null?null:s.name)&&h.getAttribute("property")===(s.property==null?null:s.property)&&h.getAttribute("http-equiv")===(s.httpEquiv==null?null:s.httpEquiv)&&h.getAttribute("charset")===(s.charSet==null?null:s.charSet)){E.splice(A,1);break e}}h=u.createElement(o),Pn(h,o,s),u.head.appendChild(h);break;default:throw Error(a(468,o))}h[rn]=e,Dt(h),o=h}e.stateNode=o}else Kg(u,e.type,e.stateNode);else e.stateNode=Yg(u,o,e.memoizedProps);else h!==o?(h===null?s.stateNode!==null&&(s=s.stateNode,s.parentNode.removeChild(s)):h.count--,o===null?Kg(u,e.type,e.stateNode):Yg(u,o,e.memoizedProps)):o===null&&e.stateNode!==null&&Xf(e,e.memoizedProps,s.memoizedProps)}break;case 27:Kn(i,e),Qn(e),o&512&&(pn||s===null||Yi(s,s.return)),s!==null&&o&4&&Xf(e,e.memoizedProps,s.memoizedProps);break;case 5:if(Kn(i,e),Qn(e),o&512&&(pn||s===null||Yi(s,s.return)),e.flags&32){u=e.stateNode;try{Ys(u,"")}catch(Ft){Fe(e,e.return,Ft)}}o&4&&e.stateNode!=null&&(u=e.memoizedProps,Xf(e,u,s!==null?s.memoizedProps:u)),o&1024&&(jf=!0);break;case 6:if(Kn(i,e),Qn(e),o&4){if(e.stateNode===null)throw Error(a(162));o=e.memoizedProps,s=e.stateNode;try{s.nodeValue=o}catch(Ft){Fe(e,e.return,Ft)}}break;case 3:if(pc=null,u=Bi,Bi=hc(i.containerInfo),Kn(i,e),Bi=u,Qn(e),o&4&&s!==null&&s.memoizedState.isDehydrated)try{br(i.containerInfo)}catch(Ft){Fe(e,e.return,Ft)}jf&&(jf=!1,K0(e));break;case 4:o=Bi,Bi=hc(e.stateNode.containerInfo),Kn(i,e),Qn(e),Bi=o;break;case 12:Kn(i,e),Qn(e);break;case 31:Kn(i,e),Qn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Jl(e,o)));break;case 13:Kn(i,e),Qn(e),e.child.flags&8192&&e.memoizedState!==null!=(s!==null&&s.memoizedState!==null)&&(tc=dt()),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Jl(e,o)));break;case 22:u=e.memoizedState!==null;var F=s!==null&&s.memoizedState!==null,$=fa,ft=pn;if(fa=$||u,pn=ft||F,Kn(i,e),pn=ft,fa=$,Qn(e),o&8192)t:for(i=e.stateNode,i._visibility=u?i._visibility&-2:i._visibility|1,u&&(s===null||F||fa||pn||Cs(e)),s=null,i=e;;){if(i.tag===5||i.tag===26){if(s===null){F=s=i;try{if(h=F.stateNode,u)E=h.style,typeof E.setProperty=="function"?E.setProperty("display","none","important"):E.display="none";else{A=F.stateNode;var vt=F.memoizedProps.style,et=vt!=null&&vt.hasOwnProperty("display")?vt.display:null;A.style.display=et==null||typeof et=="boolean"?"":(""+et).trim()}}catch(Ft){Fe(F,F.return,Ft)}}}else if(i.tag===6){if(s===null){F=i;try{F.stateNode.nodeValue=u?"":F.memoizedProps}catch(Ft){Fe(F,F.return,Ft)}}}else if(i.tag===18){if(s===null){F=i;try{var ot=F.stateNode;u?Fg(ot,!0):Fg(F.stateNode,!1)}catch(Ft){Fe(F,F.return,Ft)}}}else if((i.tag!==22&&i.tag!==23||i.memoizedState===null||i===e)&&i.child!==null){i.child.return=i,i=i.child;continue}if(i===e)break t;for(;i.sibling===null;){if(i.return===null||i.return===e)break t;s===i&&(s=null),i=i.return}s===i&&(s=null),i.sibling.return=i.return,i=i.sibling}o&4&&(o=e.updateQueue,o!==null&&(s=o.retryQueue,s!==null&&(o.retryQueue=null,Jl(e,s))));break;case 19:Kn(i,e),Qn(e),o&4&&(o=e.updateQueue,o!==null&&(e.updateQueue=null,Jl(e,o)));break;case 30:break;case 21:break;default:Kn(i,e),Qn(e)}}function Qn(e){var i=e.flags;if(i&2){try{for(var s,o=e.return;o!==null;){if(G0(o)){s=o;break}o=o.return}if(s==null)throw Error(a(160));switch(s.tag){case 27:var u=s.stateNode,h=Wf(e);Ql(e,h,u);break;case 5:var E=s.stateNode;s.flags&32&&(Ys(E,""),s.flags&=-33);var A=Wf(e);Ql(e,A,E);break;case 3:case 4:var F=s.stateNode.containerInfo,$=Wf(e);qf(e,$,F);break;default:throw Error(a(161))}}catch(ft){Fe(e,e.return,ft)}e.flags&=-3}i&4096&&(e.flags&=-4097)}function K0(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var i=e;K0(i),i.tag===5&&i.flags&1024&&i.stateNode.reset(),e=e.sibling}}function da(e,i){if(i.subtreeFlags&8772)for(i=i.child;i!==null;)X0(e,i.alternate,i),i=i.sibling}function Cs(e){for(e=e.child;e!==null;){var i=e;switch(i.tag){case 0:case 11:case 14:case 15:ka(4,i,i.return),Cs(i);break;case 1:Yi(i,i.return);var s=i.stateNode;typeof s.componentWillUnmount=="function"&&F0(i,i.return,s),Cs(i);break;case 27:Wo(i.stateNode);case 26:case 5:Yi(i,i.return),Cs(i);break;case 22:i.memoizedState===null&&Cs(i);break;case 30:Cs(i);break;default:Cs(i)}e=e.sibling}}function pa(e,i,s){for(s=s&&(i.subtreeFlags&8772)!==0,i=i.child;i!==null;){var o=i.alternate,u=e,h=i,E=h.flags;switch(h.tag){case 0:case 11:case 15:pa(u,h,s),Po(4,h);break;case 1:if(pa(u,h,s),o=h,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch($){Fe(o,o.return,$)}if(o=h,u=o.updateQueue,u!==null){var A=o.stateNode;try{var F=u.shared.hiddenCallbacks;if(F!==null)for(u.shared.hiddenCallbacks=null,u=0;u<F.length;u++)wm(F[u],A)}catch($){Fe(o,o.return,$)}}s&&E&64&&I0(h),zo(h,h.return);break;case 27:V0(h);case 26:case 5:pa(u,h,s),s&&o===null&&E&4&&H0(h),zo(h,h.return);break;case 12:pa(u,h,s);break;case 31:pa(u,h,s),s&&E&4&&j0(u,h);break;case 13:pa(u,h,s),s&&E&4&&Y0(u,h);break;case 22:h.memoizedState===null&&pa(u,h,s),zo(h,h.return);break;case 30:break;default:pa(u,h,s)}i=i.sibling}}function Yf(e,i){var s=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(s=e.memoizedState.cachePool.pool),e=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(e=i.memoizedState.cachePool.pool),e!==s&&(e!=null&&e.refCount++,s!=null&&yo(s))}function Zf(e,i){e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&yo(e))}function Ii(e,i,s,o){if(i.subtreeFlags&10256)for(i=i.child;i!==null;)Q0(e,i,s,o),i=i.sibling}function Q0(e,i,s,o){var u=i.flags;switch(i.tag){case 0:case 11:case 15:Ii(e,i,s,o),u&2048&&Po(9,i);break;case 1:Ii(e,i,s,o);break;case 3:Ii(e,i,s,o),u&2048&&(e=null,i.alternate!==null&&(e=i.alternate.memoizedState.cache),i=i.memoizedState.cache,i!==e&&(i.refCount++,e!=null&&yo(e)));break;case 12:if(u&2048){Ii(e,i,s,o),e=i.stateNode;try{var h=i.memoizedProps,E=h.id,A=h.onPostCommit;typeof A=="function"&&A(E,i.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(F){Fe(i,i.return,F)}}else Ii(e,i,s,o);break;case 31:Ii(e,i,s,o);break;case 13:Ii(e,i,s,o);break;case 23:break;case 22:h=i.stateNode,E=i.alternate,i.memoizedState!==null?h._visibility&2?Ii(e,i,s,o):Bo(e,i):h._visibility&2?Ii(e,i,s,o):(h._visibility|=2,pr(e,i,s,o,(i.subtreeFlags&10256)!==0||!1)),u&2048&&Yf(E,i);break;case 24:Ii(e,i,s,o),u&2048&&Zf(i.alternate,i);break;default:Ii(e,i,s,o)}}function pr(e,i,s,o,u){for(u=u&&((i.subtreeFlags&10256)!==0||!1),i=i.child;i!==null;){var h=e,E=i,A=s,F=o,$=E.flags;switch(E.tag){case 0:case 11:case 15:pr(h,E,A,F,u),Po(8,E);break;case 23:break;case 22:var ft=E.stateNode;E.memoizedState!==null?ft._visibility&2?pr(h,E,A,F,u):Bo(h,E):(ft._visibility|=2,pr(h,E,A,F,u)),u&&$&2048&&Yf(E.alternate,E);break;case 24:pr(h,E,A,F,u),u&&$&2048&&Zf(E.alternate,E);break;default:pr(h,E,A,F,u)}i=i.sibling}}function Bo(e,i){if(i.subtreeFlags&10256)for(i=i.child;i!==null;){var s=e,o=i,u=o.flags;switch(o.tag){case 22:Bo(s,o),u&2048&&Yf(o.alternate,o);break;case 24:Bo(s,o),u&2048&&Zf(o.alternate,o);break;default:Bo(s,o)}i=i.sibling}}var Io=8192;function mr(e,i,s){if(e.subtreeFlags&Io)for(e=e.child;e!==null;)J0(e,i,s),e=e.sibling}function J0(e,i,s){switch(e.tag){case 26:mr(e,i,s),e.flags&Io&&e.memoizedState!==null&&HS(s,Bi,e.memoizedState,e.memoizedProps);break;case 5:mr(e,i,s);break;case 3:case 4:var o=Bi;Bi=hc(e.stateNode.containerInfo),mr(e,i,s),Bi=o;break;case 22:e.memoizedState===null&&(o=e.alternate,o!==null&&o.memoizedState!==null?(o=Io,Io=16777216,mr(e,i,s),Io=o):mr(e,i,s));break;default:mr(e,i,s)}}function $0(e){var i=e.alternate;if(i!==null&&(e=i.child,e!==null)){i.child=null;do i=e.sibling,e.sibling=null,e=i;while(e!==null)}}function Fo(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var o=i[s];En=o,eg(o,e)}$0(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)tg(e),e=e.sibling}function tg(e){switch(e.tag){case 0:case 11:case 15:Fo(e),e.flags&2048&&ka(9,e,e.return);break;case 3:Fo(e);break;case 12:Fo(e);break;case 22:var i=e.stateNode;e.memoizedState!==null&&i._visibility&2&&(e.return===null||e.return.tag!==13)?(i._visibility&=-3,$l(e)):Fo(e);break;default:Fo(e)}}function $l(e){var i=e.deletions;if((e.flags&16)!==0){if(i!==null)for(var s=0;s<i.length;s++){var o=i[s];En=o,eg(o,e)}$0(e)}for(e=e.child;e!==null;){switch(i=e,i.tag){case 0:case 11:case 15:ka(8,i,i.return),$l(i);break;case 22:s=i.stateNode,s._visibility&2&&(s._visibility&=-3,$l(i));break;default:$l(i)}e=e.sibling}}function eg(e,i){for(;En!==null;){var s=En;switch(s.tag){case 0:case 11:case 15:ka(8,s,i);break;case 23:case 22:if(s.memoizedState!==null&&s.memoizedState.cachePool!==null){var o=s.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:yo(s.memoizedState.cache)}if(o=s.child,o!==null)o.return=s,En=o;else t:for(s=e;En!==null;){o=En;var u=o.sibling,h=o.return;if(W0(o),o===s){En=null;break t}if(u!==null){u.return=h,En=u;break t}En=h}}}var eS={getCacheForType:function(e){var i=Nn(fn),s=i.data.get(e);return s===void 0&&(s=e(),i.data.set(e,s)),s},cacheSignal:function(){return Nn(fn).controller.signal}},nS=typeof WeakMap=="function"?WeakMap:Map,Oe=0,Ye=null,ve=null,Se=0,Ie=0,li=null,Xa=!1,gr=!1,Kf=!1,ma=0,ln=0,Wa=0,Ds=0,Qf=0,ci=0,vr=0,Ho=null,Jn=null,Jf=!1,tc=0,ng=0,ec=1/0,nc=null,qa=null,_n=0,ja=null,xr=null,ga=0,$f=0,th=null,ig=null,Go=0,eh=null;function ui(){return(Oe&2)!==0&&Se!==0?Se&-Se:z.T!==null?oh():lo()}function ag(){if(ci===0)if((Se&536870912)===0||Ae){var e=ct;ct<<=1,(ct&3932160)===0&&(ct=262144),ci=e}else ci=536870912;return e=ri.current,e!==null&&(e.flags|=32),ci}function $n(e,i,s){(e===Ye&&(Ie===2||Ie===9)||e.cancelPendingCommit!==null)&&(_r(e,0),Ya(e,Se,ci,!1)),Cn(e,s),((Oe&2)===0||e!==Ye)&&(e===Ye&&((Oe&2)===0&&(Ds|=s),ln===4&&Ya(e,Se,ci,!1)),Zi(e))}function sg(e,i,s){if((Oe&6)!==0)throw Error(a(327));var o=!s&&(i&127)===0&&(i&e.expiredLanes)===0||ae(e,i),u=o?sS(e,i):ih(e,i,!0),h=o;do{if(u===0){gr&&!o&&Ya(e,i,0,!1);break}else{if(s=e.current.alternate,h&&!iS(s)){u=ih(e,i,!1),h=!1;continue}if(u===2){if(h=i,e.errorRecoveryDisabledLanes&h)var E=0;else E=e.pendingLanes&-536870913,E=E!==0?E:E&536870912?536870912:0;if(E!==0){i=E;t:{var A=e;u=Ho;var F=A.current.memoizedState.isDehydrated;if(F&&(_r(A,E).flags|=256),E=ih(A,E,!1),E!==2){if(Kf&&!F){A.errorRecoveryDisabledLanes|=h,Ds|=h,u=4;break t}h=Jn,Jn=u,h!==null&&(Jn===null?Jn=h:Jn.push.apply(Jn,h))}u=E}if(h=!1,u!==2)continue}}if(u===1){_r(e,0),Ya(e,i,0,!0);break}t:{switch(o=e,h=u,h){case 0:case 1:throw Error(a(345));case 4:if((i&4194048)!==i)break;case 6:Ya(o,i,ci,!Xa);break t;case 2:Jn=null;break;case 3:case 5:break;default:throw Error(a(329))}if((i&62914560)===i&&(u=tc+300-dt(),10<u)){if(Ya(o,i,ci,!Xa),Ut(o,0,!0)!==0)break t;ga=i,o.timeoutHandle=zg(rg.bind(null,o,s,Jn,nc,Jf,i,ci,Ds,vr,Xa,h,"Throttled",-0,0),u);break t}rg(o,s,Jn,nc,Jf,i,ci,Ds,vr,Xa,h,null,-0,0)}}break}while(!0);Zi(e)}function rg(e,i,s,o,u,h,E,A,F,$,ft,vt,et,ot){if(e.timeoutHandle=-1,vt=i.subtreeFlags,vt&8192||(vt&16785408)===16785408){vt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ea},J0(i,h,vt);var Ft=(h&62914560)===h?tc-dt():(h&4194048)===h?ng-dt():0;if(Ft=GS(vt,Ft),Ft!==null){ga=h,e.cancelPendingCommit=Ft(pg.bind(null,e,i,h,s,o,u,E,A,F,ft,vt,null,et,ot)),Ya(e,h,E,!$);return}}pg(e,i,h,s,o,u,E,A,F)}function iS(e){for(var i=e;;){var s=i.tag;if((s===0||s===11||s===15)&&i.flags&16384&&(s=i.updateQueue,s!==null&&(s=s.stores,s!==null)))for(var o=0;o<s.length;o++){var u=s[o],h=u.getSnapshot;u=u.value;try{if(!ai(h(),u))return!1}catch{return!1}}if(s=i.child,i.subtreeFlags&16384&&s!==null)s.return=i,i=s;else{if(i===e)break;for(;i.sibling===null;){if(i.return===null||i.return===e)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function Ya(e,i,s,o){i&=~Qf,i&=~Ds,e.suspendedLanes|=i,e.pingedLanes&=~i,o&&(e.warmLanes|=i),o=e.expirationTimes;for(var u=i;0<u;){var h=31-ie(u),E=1<<h;o[h]=-1,u&=~E}s!==0&&ro(e,s,i)}function ic(){return(Oe&6)===0?(Vo(0),!1):!0}function nh(){if(ve!==null){if(Ie===0)var e=ve.return;else e=ve,sa=Ss=null,xf(e),cr=null,To=0,e=ve;for(;e!==null;)B0(e.alternate,e),e=e.return;ve=null}}function _r(e,i){var s=e.timeoutHandle;s!==-1&&(e.timeoutHandle=-1,ES(s)),s=e.cancelPendingCommit,s!==null&&(e.cancelPendingCommit=null,s()),ga=0,nh(),Ye=e,ve=s=ia(e.current,null),Se=i,Ie=0,li=null,Xa=!1,gr=ae(e,i),Kf=!1,vr=ci=Qf=Ds=Wa=ln=0,Jn=Ho=null,Jf=!1,(i&8)!==0&&(i|=i&32);var o=e.entangledLanes;if(o!==0)for(e=e.entanglements,o&=i;0<o;){var u=31-ie(o),h=1<<u;i|=e[u],o&=~h}return ma=i,Tl(),s}function og(e,i){ue=null,z.H=Uo,i===lr||i===Ul?(i=Em(),Ie=3):i===rf?(i=Em(),Ie=4):Ie=i===Of?8:i!==null&&typeof i=="object"&&typeof i.then=="function"?6:1,li=i,ve===null&&(ln=1,ql(e,Mi(i,e.current)))}function lg(){var e=ri.current;return e===null?!0:(Se&4194048)===Se?Ti===null:(Se&62914560)===Se||(Se&536870912)!==0?e===Ti:!1}function cg(){var e=z.H;return z.H=Uo,e===null?Uo:e}function ug(){var e=z.A;return z.A=eS,e}function ac(){ln=4,Xa||(Se&4194048)!==Se&&ri.current!==null||(gr=!0),(Wa&134217727)===0&&(Ds&134217727)===0||Ye===null||Ya(Ye,Se,ci,!1)}function ih(e,i,s){var o=Oe;Oe|=2;var u=cg(),h=ug();(Ye!==e||Se!==i)&&(nc=null,_r(e,i)),i=!1;var E=ln;t:do try{if(Ie!==0&&ve!==null){var A=ve,F=li;switch(Ie){case 8:nh(),E=6;break t;case 3:case 2:case 9:case 6:ri.current===null&&(i=!0);var $=Ie;if(Ie=0,li=null,Mr(e,A,F,$),s&&gr){E=0;break t}break;default:$=Ie,Ie=0,li=null,Mr(e,A,F,$)}}aS(),E=ln;break}catch(ft){og(e,ft)}while(!0);return i&&e.shellSuspendCounter++,sa=Ss=null,Oe=o,z.H=u,z.A=h,ve===null&&(Ye=null,Se=0,Tl()),E}function aS(){for(;ve!==null;)fg(ve)}function sS(e,i){var s=Oe;Oe|=2;var o=cg(),u=ug();Ye!==e||Se!==i?(nc=null,ec=dt()+500,_r(e,i)):gr=ae(e,i);t:do try{if(Ie!==0&&ve!==null){i=ve;var h=li;e:switch(Ie){case 1:Ie=0,li=null,Mr(e,i,h,1);break;case 2:case 9:if(Sm(h)){Ie=0,li=null,hg(i);break}i=function(){Ie!==2&&Ie!==9||Ye!==e||(Ie=7),Zi(e)},h.then(i,i);break t;case 3:Ie=7;break t;case 4:Ie=5;break t;case 7:Sm(h)?(Ie=0,li=null,hg(i)):(Ie=0,li=null,Mr(e,i,h,7));break;case 5:var E=null;switch(ve.tag){case 26:E=ve.memoizedState;case 5:case 27:var A=ve;if(E?Qg(E):A.stateNode.complete){Ie=0,li=null;var F=A.sibling;if(F!==null)ve=F;else{var $=A.return;$!==null?(ve=$,sc($)):ve=null}break e}}Ie=0,li=null,Mr(e,i,h,5);break;case 6:Ie=0,li=null,Mr(e,i,h,6);break;case 8:nh(),ln=6;break t;default:throw Error(a(462))}}rS();break}catch(ft){og(e,ft)}while(!0);return sa=Ss=null,z.H=o,z.A=u,Oe=s,ve!==null?0:(Ye=null,Se=0,Tl(),ln)}function rS(){for(;ve!==null&&!w();)fg(ve)}function fg(e){var i=P0(e.alternate,e,ma);e.memoizedProps=e.pendingProps,i===null?sc(e):ve=i}function hg(e){var i=e,s=i.alternate;switch(i.tag){case 15:case 0:i=C0(s,i,i.pendingProps,i.type,void 0,Se);break;case 11:i=C0(s,i,i.pendingProps,i.type.render,i.ref,Se);break;case 5:xf(i);default:B0(s,i),i=ve=um(i,ma),i=P0(s,i,ma)}e.memoizedProps=e.pendingProps,i===null?sc(e):ve=i}function Mr(e,i,s,o){sa=Ss=null,xf(i),cr=null,To=0;var u=i.return;try{if(YM(e,u,i,s,Se)){ln=1,ql(e,Mi(s,e.current)),ve=null;return}}catch(h){if(u!==null)throw ve=u,h;ln=1,ql(e,Mi(s,e.current)),ve=null;return}i.flags&32768?(Ae||o===1?e=!0:gr||(Se&536870912)!==0?e=!1:(Xa=e=!0,(o===2||o===9||o===3||o===6)&&(o=ri.current,o!==null&&o.tag===13&&(o.flags|=16384))),dg(i,e)):sc(i)}function sc(e){var i=e;do{if((i.flags&32768)!==0){dg(i,Xa);return}e=i.return;var s=QM(i.alternate,i,ma);if(s!==null){ve=s;return}if(i=i.sibling,i!==null){ve=i;return}ve=i=e}while(i!==null);ln===0&&(ln=5)}function dg(e,i){do{var s=JM(e.alternate,e);if(s!==null){s.flags&=32767,ve=s;return}if(s=e.return,s!==null&&(s.flags|=32768,s.subtreeFlags=0,s.deletions=null),!i&&(e=e.sibling,e!==null)){ve=e;return}ve=e=s}while(e!==null);ln=6,ve=null}function pg(e,i,s,o,u,h,E,A,F){e.cancelPendingCommit=null;do rc();while(_n!==0);if((Oe&6)!==0)throw Error(a(327));if(i!==null){if(i===e.current)throw Error(a(177));if(h=i.lanes|i.childLanes,h|=Xu,Ni(e,s,h,E,A,F),e===Ye&&(ve=Ye=null,Se=0),xr=i,ja=e,ga=s,$f=h,th=u,ig=o,(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,uS(Lt,function(){return _g(),null})):(e.callbackNode=null,e.callbackPriority=0),o=(i.flags&13878)!==0,(i.subtreeFlags&13878)!==0||o){o=z.T,z.T=null,u=Q.p,Q.p=2,E=Oe,Oe|=4;try{$M(e,i,s)}finally{Oe=E,Q.p=u,z.T=o}}_n=1,mg(),gg(),vg()}}function mg(){if(_n===1){_n=0;var e=ja,i=xr,s=(i.flags&13878)!==0;if((i.subtreeFlags&13878)!==0||s){s=z.T,z.T=null;var o=Q.p;Q.p=2;var u=Oe;Oe|=4;try{Z0(i,e);var h=mh,E=em(e.containerInfo),A=h.focusedElem,F=h.selectionRange;if(E!==A&&A&&A.ownerDocument&&tm(A.ownerDocument.documentElement,A)){if(F!==null&&Fu(A)){var $=F.start,ft=F.end;if(ft===void 0&&(ft=$),"selectionStart"in A)A.selectionStart=$,A.selectionEnd=Math.min(ft,A.value.length);else{var vt=A.ownerDocument||document,et=vt&&vt.defaultView||window;if(et.getSelection){var ot=et.getSelection(),Ft=A.textContent.length,Jt=Math.min(F.start,Ft),qe=F.end===void 0?Jt:Math.min(F.end,Ft);!ot.extend&&Jt>qe&&(E=qe,qe=Jt,Jt=E);var Y=$p(A,Jt),G=$p(A,qe);if(Y&&G&&(ot.rangeCount!==1||ot.anchorNode!==Y.node||ot.anchorOffset!==Y.offset||ot.focusNode!==G.node||ot.focusOffset!==G.offset)){var J=vt.createRange();J.setStart(Y.node,Y.offset),ot.removeAllRanges(),Jt>qe?(ot.addRange(J),ot.extend(G.node,G.offset)):(J.setEnd(G.node,G.offset),ot.addRange(J))}}}}for(vt=[],ot=A;ot=ot.parentNode;)ot.nodeType===1&&vt.push({element:ot,left:ot.scrollLeft,top:ot.scrollTop});for(typeof A.focus=="function"&&A.focus(),A=0;A<vt.length;A++){var pt=vt[A];pt.element.scrollLeft=pt.left,pt.element.scrollTop=pt.top}}xc=!!ph,mh=ph=null}finally{Oe=u,Q.p=o,z.T=s}}e.current=i,_n=2}}function gg(){if(_n===2){_n=0;var e=ja,i=xr,s=(i.flags&8772)!==0;if((i.subtreeFlags&8772)!==0||s){s=z.T,z.T=null;var o=Q.p;Q.p=2;var u=Oe;Oe|=4;try{X0(e,i.alternate,i)}finally{Oe=u,Q.p=o,z.T=s}}_n=3}}function vg(){if(_n===4||_n===3){_n=0,nt();var e=ja,i=xr,s=ga,o=ig;(i.subtreeFlags&10256)!==0||(i.flags&10256)!==0?_n=5:(_n=0,xr=ja=null,xg(e,e.pendingLanes));var u=e.pendingLanes;if(u===0&&(qa=null),js(s),i=i.stateNode,jt&&typeof jt.onCommitFiberRoot=="function")try{jt.onCommitFiberRoot(Kt,i,void 0,(i.current.flags&128)===128)}catch{}if(o!==null){i=z.T,u=Q.p,Q.p=2,z.T=null;try{for(var h=e.onRecoverableError,E=0;E<o.length;E++){var A=o[E];h(A.value,{componentStack:A.stack})}}finally{z.T=i,Q.p=u}}(ga&3)!==0&&rc(),Zi(e),u=e.pendingLanes,(s&261930)!==0&&(u&42)!==0?e===eh?Go++:(Go=0,eh=e):Go=0,Vo(0)}}function xg(e,i){(e.pooledCacheLanes&=i)===0&&(i=e.pooledCache,i!=null&&(e.pooledCache=null,yo(i)))}function rc(){return mg(),gg(),vg(),_g()}function _g(){if(_n!==5)return!1;var e=ja,i=$f;$f=0;var s=js(ga),o=z.T,u=Q.p;try{Q.p=32>s?32:s,z.T=null,s=th,th=null;var h=ja,E=ga;if(_n=0,xr=ja=null,ga=0,(Oe&6)!==0)throw Error(a(331));var A=Oe;if(Oe|=4,tg(h.current),Q0(h,h.current,E,s),Oe=A,Vo(0,!1),jt&&typeof jt.onPostCommitFiberRoot=="function")try{jt.onPostCommitFiberRoot(Kt,h)}catch{}return!0}finally{Q.p=u,z.T=o,xg(e,i)}}function Mg(e,i,s){i=Mi(s,i),i=Nf(e.stateNode,i,2),e=Ha(e,i,2),e!==null&&(Cn(e,2),Zi(e))}function Fe(e,i,s){if(e.tag===3)Mg(e,e,s);else for(;i!==null;){if(i.tag===3){Mg(i,e,s);break}else if(i.tag===1){var o=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(qa===null||!qa.has(o))){e=Mi(s,e),s=S0(2),o=Ha(i,s,2),o!==null&&(y0(s,o,i,e),Cn(o,2),Zi(o));break}}i=i.return}}function ah(e,i,s){var o=e.pingCache;if(o===null){o=e.pingCache=new nS;var u=new Set;o.set(i,u)}else u=o.get(i),u===void 0&&(u=new Set,o.set(i,u));u.has(s)||(Kf=!0,u.add(s),e=oS.bind(null,e,i,s),i.then(e,e))}function oS(e,i,s){var o=e.pingCache;o!==null&&o.delete(i),e.pingedLanes|=e.suspendedLanes&s,e.warmLanes&=~s,Ye===e&&(Se&s)===s&&(ln===4||ln===3&&(Se&62914560)===Se&&300>dt()-tc?(Oe&2)===0&&_r(e,0):Qf|=s,vr===Se&&(vr=0)),Zi(e)}function Sg(e,i){i===0&&(i=vn()),e=xs(e,i),e!==null&&(Cn(e,i),Zi(e))}function lS(e){var i=e.memoizedState,s=0;i!==null&&(s=i.retryLane),Sg(e,s)}function cS(e,i){var s=0;switch(e.tag){case 31:case 13:var o=e.stateNode,u=e.memoizedState;u!==null&&(s=u.retryLane);break;case 19:o=e.stateNode;break;case 22:o=e.stateNode._retryCache;break;default:throw Error(a(314))}o!==null&&o.delete(i),Sg(e,s)}function uS(e,i){return Zt(e,i)}var oc=null,Sr=null,sh=!1,lc=!1,rh=!1,Za=0;function Zi(e){e!==Sr&&e.next===null&&(Sr===null?oc=Sr=e:Sr=Sr.next=e),lc=!0,sh||(sh=!0,hS())}function Vo(e,i){if(!rh&&lc){rh=!0;do for(var s=!1,o=oc;o!==null;){if(e!==0){var u=o.pendingLanes;if(u===0)var h=0;else{var E=o.suspendedLanes,A=o.pingedLanes;h=(1<<31-ie(42|e)+1)-1,h&=u&~(E&~A),h=h&201326741?h&201326741|1:h?h|2:0}h!==0&&(s=!0,bg(o,h))}else h=Se,h=Ut(o,o===Ye?h:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(h&3)===0||ae(o,h)||(s=!0,bg(o,h));o=o.next}while(s);rh=!1}}function fS(){yg()}function yg(){lc=sh=!1;var e=0;Za!==0&&yS()&&(e=Za);for(var i=dt(),s=null,o=oc;o!==null;){var u=o.next,h=Eg(o,i);h===0?(o.next=null,s===null?oc=u:s.next=u,u===null&&(Sr=s)):(s=o,(e!==0||(h&3)!==0)&&(lc=!0)),o=u}_n!==0&&_n!==5||Vo(e),Za!==0&&(Za=0)}function Eg(e,i){for(var s=e.suspendedLanes,o=e.pingedLanes,u=e.expirationTimes,h=e.pendingLanes&-62914561;0<h;){var E=31-ie(h),A=1<<E,F=u[E];F===-1?((A&s)===0||(A&o)!==0)&&(u[E]=tn(A,i)):F<=i&&(e.expiredLanes|=A),h&=~A}if(i=Ye,s=Se,s=Ut(e,e===i?s:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o=e.callbackNode,s===0||e===i&&(Ie===2||Ie===9)||e.cancelPendingCommit!==null)return o!==null&&o!==null&&O(o),e.callbackNode=null,e.callbackPriority=0;if((s&3)===0||ae(e,s)){if(i=s&-s,i===e.callbackPriority)return i;switch(o!==null&&O(o),js(s)){case 2:case 8:s=qt;break;case 32:s=Lt;break;case 268435456:s=Me;break;default:s=Lt}return o=Tg.bind(null,e),s=Zt(s,o),e.callbackPriority=i,e.callbackNode=s,i}return o!==null&&o!==null&&O(o),e.callbackPriority=2,e.callbackNode=null,2}function Tg(e,i){if(_n!==0&&_n!==5)return e.callbackNode=null,e.callbackPriority=0,null;var s=e.callbackNode;if(rc()&&e.callbackNode!==s)return null;var o=Se;return o=Ut(e,e===Ye?o:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),o===0?null:(sg(e,o,i),Eg(e,dt()),e.callbackNode!=null&&e.callbackNode===s?Tg.bind(null,e):null)}function bg(e,i){if(rc())return null;sg(e,i,!0)}function hS(){TS(function(){(Oe&6)!==0?Zt(gt,fS):yg()})}function oh(){if(Za===0){var e=rr;e===0&&(e=wt,wt<<=1,(wt&261888)===0&&(wt=256)),Za=e}return Za}function Ag(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:gl(""+e)}function wg(e,i){var s=i.ownerDocument.createElement("input");return s.name=i.name,s.value=i.value,e.id&&s.setAttribute("form",e.id),i.parentNode.insertBefore(s,i),e=new FormData(e),s.parentNode.removeChild(s),e}function dS(e,i,s,o,u){if(i==="submit"&&s&&s.stateNode===u){var h=Ag((u[Dn]||null).action),E=o.submitter;E&&(i=(i=E[Dn]||null)?Ag(i.formAction):E.getAttribute("formAction"),i!==null&&(h=i,E=null));var A=new Ml("action","action",null,o,u);e.push({event:A,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(Za!==0){var F=E?wg(u,E):new FormData(u);wf(s,{pending:!0,data:F,method:u.method,action:h},null,F)}}else typeof h=="function"&&(A.preventDefault(),F=E?wg(u,E):new FormData(u),wf(s,{pending:!0,data:F,method:u.method,action:h},h,F))},currentTarget:u}]})}}for(var lh=0;lh<ku.length;lh++){var ch=ku[lh],pS=ch.toLowerCase(),mS=ch[0].toUpperCase()+ch.slice(1);zi(pS,"on"+mS)}zi(am,"onAnimationEnd"),zi(sm,"onAnimationIteration"),zi(rm,"onAnimationStart"),zi("dblclick","onDoubleClick"),zi("focusin","onFocus"),zi("focusout","onBlur"),zi(LM,"onTransitionRun"),zi(UM,"onTransitionStart"),zi(NM,"onTransitionCancel"),zi(om,"onTransitionEnd"),It("onMouseEnter",["mouseout","mouseover"]),It("onMouseLeave",["mouseout","mouseover"]),It("onPointerEnter",["pointerout","pointerover"]),It("onPointerLeave",["pointerout","pointerover"]),ee("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),ee("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),ee("onBeforeInput",["compositionend","keypress","textInput","paste"]),ee("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),ee("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),ee("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ko="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),gS=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ko));function Rg(e,i){i=(i&4)!==0;for(var s=0;s<e.length;s++){var o=e[s],u=o.event;o=o.listeners;t:{var h=void 0;if(i)for(var E=o.length-1;0<=E;E--){var A=o[E],F=A.instance,$=A.currentTarget;if(A=A.listener,F!==h&&u.isPropagationStopped())break t;h=A,u.currentTarget=$;try{h(u)}catch(ft){El(ft)}u.currentTarget=null,h=F}else for(E=0;E<o.length;E++){if(A=o[E],F=A.instance,$=A.currentTarget,A=A.listener,F!==h&&u.isPropagationStopped())break t;h=A,u.currentTarget=$;try{h(u)}catch(ft){El(ft)}u.currentTarget=null,h=F}}}}function xe(e,i){var s=i[co];s===void 0&&(s=i[co]=new Set);var o=e+"__bubble";s.has(o)||(Cg(i,e,2,!1),s.add(o))}function uh(e,i,s){var o=0;i&&(o|=4),Cg(s,e,o,i)}var cc="_reactListening"+Math.random().toString(36).slice(2);function fh(e){if(!e[cc]){e[cc]=!0,kt.forEach(function(s){s!=="selectionchange"&&(gS.has(s)||uh(s,!1,e),uh(s,!0,e))});var i=e.nodeType===9?e:e.ownerDocument;i===null||i[cc]||(i[cc]=!0,uh("selectionchange",!1,i))}}function Cg(e,i,s,o){switch(av(i)){case 2:var u=XS;break;case 8:u=WS;break;default:u=Ah}s=u.bind(null,i,s,e),u=void 0,!Du||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(u=!0),o?u!==void 0?e.addEventListener(i,s,{capture:!0,passive:u}):e.addEventListener(i,s,!0):u!==void 0?e.addEventListener(i,s,{passive:u}):e.addEventListener(i,s,!1)}function hh(e,i,s,o,u){var h=o;if((i&1)===0&&(i&2)===0&&o!==null)t:for(;;){if(o===null)return;var E=o.tag;if(E===3||E===4){var A=o.stateNode.containerInfo;if(A===u)break;if(E===4)for(E=o.return;E!==null;){var F=E.tag;if((F===3||F===4)&&E.stateNode.containerInfo===u)return;E=E.return}for(;A!==null;){if(E=at(A),E===null)return;if(F=E.tag,F===5||F===6||F===26||F===27){o=h=E;continue t}A=A.parentNode}}o=o.return}Op(function(){var $=h,ft=Ru(s),vt=[];t:{var et=lm.get(e);if(et!==void 0){var ot=Ml,Ft=e;switch(e){case"keypress":if(xl(s)===0)break t;case"keydown":case"keyup":ot=cM;break;case"focusin":Ft="focus",ot=Ou;break;case"focusout":Ft="blur",ot=Ou;break;case"beforeblur":case"afterblur":ot=Ou;break;case"click":if(s.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ot=Bp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ot=Q_;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ot=hM;break;case am:case sm:case rm:ot=tM;break;case om:ot=pM;break;case"scroll":case"scrollend":ot=Z_;break;case"wheel":ot=gM;break;case"copy":case"cut":case"paste":ot=nM;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ot=Fp;break;case"toggle":case"beforetoggle":ot=xM}var Jt=(i&4)!==0,qe=!Jt&&(e==="scroll"||e==="scrollend"),Y=Jt?et!==null?et+"Capture":null:et;Jt=[];for(var G=$,J;G!==null;){var pt=G;if(J=pt.stateNode,pt=pt.tag,pt!==5&&pt!==26&&pt!==27||J===null||Y===null||(pt=uo(G,Y),pt!=null&&Jt.push(Xo(G,pt,J))),qe)break;G=G.return}0<Jt.length&&(et=new ot(et,Ft,null,s,ft),vt.push({event:et,listeners:Jt}))}}if((i&7)===0){t:{if(et=e==="mouseover"||e==="pointerover",ot=e==="mouseout"||e==="pointerout",et&&s!==wu&&(Ft=s.relatedTarget||s.fromElement)&&(at(Ft)||Ft[$i]))break t;if((ot||et)&&(et=ft.window===ft?ft:(et=ft.ownerDocument)?et.defaultView||et.parentWindow:window,ot?(Ft=s.relatedTarget||s.toElement,ot=$,Ft=Ft?at(Ft):null,Ft!==null&&(qe=c(Ft),Jt=Ft.tag,Ft!==qe||Jt!==5&&Jt!==27&&Jt!==6)&&(Ft=null)):(ot=null,Ft=$),ot!==Ft)){if(Jt=Bp,pt="onMouseLeave",Y="onMouseEnter",G="mouse",(e==="pointerout"||e==="pointerover")&&(Jt=Fp,pt="onPointerLeave",Y="onPointerEnter",G="pointer"),qe=ot==null?et:bt(ot),J=Ft==null?et:bt(Ft),et=new Jt(pt,G+"leave",ot,s,ft),et.target=qe,et.relatedTarget=J,pt=null,at(ft)===$&&(Jt=new Jt(Y,G+"enter",Ft,s,ft),Jt.target=J,Jt.relatedTarget=qe,pt=Jt),qe=pt,ot&&Ft)e:{for(Jt=vS,Y=ot,G=Ft,J=0,pt=Y;pt;pt=Jt(pt))J++;pt=0;for(var Yt=G;Yt;Yt=Jt(Yt))pt++;for(;0<J-pt;)Y=Jt(Y),J--;for(;0<pt-J;)G=Jt(G),pt--;for(;J--;){if(Y===G||G!==null&&Y===G.alternate){Jt=Y;break e}Y=Jt(Y),G=Jt(G)}Jt=null}else Jt=null;ot!==null&&Dg(vt,et,ot,Jt,!1),Ft!==null&&qe!==null&&Dg(vt,qe,Ft,Jt,!0)}}t:{if(et=$?bt($):window,ot=et.nodeName&&et.nodeName.toLowerCase(),ot==="select"||ot==="input"&&et.type==="file")var De=jp;else if(Wp(et))if(Yp)De=RM;else{De=AM;var Wt=bM}else ot=et.nodeName,!ot||ot.toLowerCase()!=="input"||et.type!=="checkbox"&&et.type!=="radio"?$&&Au($.elementType)&&(De=jp):De=wM;if(De&&(De=De(e,$))){qp(vt,De,s,ft);break t}Wt&&Wt(e,et,$),e==="focusout"&&$&&et.type==="number"&&$.memoizedProps.value!=null&&xi(et,"number",et.value)}switch(Wt=$?bt($):window,e){case"focusin":(Wp(Wt)||Wt.contentEditable==="true")&&(Js=Wt,Hu=$,_o=null);break;case"focusout":_o=Hu=Js=null;break;case"mousedown":Gu=!0;break;case"contextmenu":case"mouseup":case"dragend":Gu=!1,nm(vt,s,ft);break;case"selectionchange":if(DM)break;case"keydown":case"keyup":nm(vt,s,ft)}var fe;if(zu)t:{switch(e){case"compositionstart":var ye="onCompositionStart";break t;case"compositionend":ye="onCompositionEnd";break t;case"compositionupdate":ye="onCompositionUpdate";break t}ye=void 0}else Qs?kp(e,s)&&(ye="onCompositionEnd"):e==="keydown"&&s.keyCode===229&&(ye="onCompositionStart");ye&&(Hp&&s.locale!=="ko"&&(Qs||ye!=="onCompositionStart"?ye==="onCompositionEnd"&&Qs&&(fe=Pp()):(Na=ft,Lu="value"in Na?Na.value:Na.textContent,Qs=!0)),Wt=uc($,ye),0<Wt.length&&(ye=new Ip(ye,e,null,s,ft),vt.push({event:ye,listeners:Wt}),fe?ye.data=fe:(fe=Xp(s),fe!==null&&(ye.data=fe)))),(fe=MM?SM(e,s):yM(e,s))&&(ye=uc($,"onBeforeInput"),0<ye.length&&(Wt=new Ip("onBeforeInput","beforeinput",null,s,ft),vt.push({event:Wt,listeners:ye}),Wt.data=fe)),dS(vt,e,$,s,ft)}Rg(vt,i)})}function Xo(e,i,s){return{instance:e,listener:i,currentTarget:s}}function uc(e,i){for(var s=i+"Capture",o=[];e!==null;){var u=e,h=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||h===null||(u=uo(e,s),u!=null&&o.unshift(Xo(e,u,h)),u=uo(e,i),u!=null&&o.push(Xo(e,u,h))),e.tag===3)return o;e=e.return}return[]}function vS(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Dg(e,i,s,o,u){for(var h=i._reactName,E=[];s!==null&&s!==o;){var A=s,F=A.alternate,$=A.stateNode;if(A=A.tag,F!==null&&F===o)break;A!==5&&A!==26&&A!==27||$===null||(F=$,u?($=uo(s,h),$!=null&&E.unshift(Xo(s,$,F))):u||($=uo(s,h),$!=null&&E.push(Xo(s,$,F)))),s=s.return}E.length!==0&&e.push({event:i,listeners:E})}var xS=/\r\n?/g,_S=/\u0000|\uFFFD/g;function Lg(e){return(typeof e=="string"?e:""+e).replace(xS,`
`).replace(_S,"")}function Ug(e,i){return i=Lg(i),Lg(e)===i}function We(e,i,s,o,u,h){switch(s){case"children":typeof o=="string"?i==="body"||i==="textarea"&&o===""||Ys(e,o):(typeof o=="number"||typeof o=="bigint")&&i!=="body"&&Ys(e,""+o);break;case"className":Xt(e,"class",o);break;case"tabIndex":Xt(e,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":Xt(e,s,o);break;case"style":Up(e,o,h);break;case"data":if(i!=="object"){Xt(e,"data",o);break}case"src":case"href":if(o===""&&(i!=="a"||s!=="href")){e.removeAttribute(s);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(s);break}o=gl(""+o),e.setAttribute(s,o);break;case"action":case"formAction":if(typeof o=="function"){e.setAttribute(s,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof h=="function"&&(s==="formAction"?(i!=="input"&&We(e,i,"name",u.name,u,null),We(e,i,"formEncType",u.formEncType,u,null),We(e,i,"formMethod",u.formMethod,u,null),We(e,i,"formTarget",u.formTarget,u,null)):(We(e,i,"encType",u.encType,u,null),We(e,i,"method",u.method,u,null),We(e,i,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){e.removeAttribute(s);break}o=gl(""+o),e.setAttribute(s,o);break;case"onClick":o!=null&&(e.onclick=ea);break;case"onScroll":o!=null&&xe("scroll",e);break;case"onScrollEnd":o!=null&&xe("scrollend",e);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(a(61));if(s=o.__html,s!=null){if(u.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"multiple":e.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":e.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){e.removeAttribute("xlink:href");break}s=gl(""+o),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",s);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,""+o):e.removeAttribute(s);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,""):e.removeAttribute(s);break;case"capture":case"download":o===!0?e.setAttribute(s,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?e.setAttribute(s,o):e.removeAttribute(s);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?e.setAttribute(s,o):e.removeAttribute(s);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?e.removeAttribute(s):e.setAttribute(s,o);break;case"popover":xe("beforetoggle",e),xe("toggle",e),be(e,"popover",o);break;case"xlinkActuate":xn(e,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":xn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":xn(e,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":xn(e,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":xn(e,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":xn(e,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":xn(e,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":xn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":xn(e,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":be(e,"is",o);break;case"innerText":case"textContent":break;default:(!(2<s.length)||s[0]!=="o"&&s[0]!=="O"||s[1]!=="n"&&s[1]!=="N")&&(s=j_.get(s)||s,be(e,s,o))}}function dh(e,i,s,o,u,h){switch(s){case"style":Up(e,o,h);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(a(61));if(s=o.__html,s!=null){if(u.children!=null)throw Error(a(60));e.innerHTML=s}}break;case"children":typeof o=="string"?Ys(e,o):(typeof o=="number"||typeof o=="bigint")&&Ys(e,""+o);break;case"onScroll":o!=null&&xe("scroll",e);break;case"onScrollEnd":o!=null&&xe("scrollend",e);break;case"onClick":o!=null&&(e.onclick=ea);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!se.hasOwnProperty(s))t:{if(s[0]==="o"&&s[1]==="n"&&(u=s.endsWith("Capture"),i=s.slice(2,u?s.length-7:void 0),h=e[Dn]||null,h=h!=null?h[s]:null,typeof h=="function"&&e.removeEventListener(i,h,u),typeof o=="function")){typeof h!="function"&&h!==null&&(s in e?e[s]=null:e.hasAttribute(s)&&e.removeAttribute(s)),e.addEventListener(i,o,u);break t}s in e?e[s]=o:o===!0?e.setAttribute(s,""):be(e,s,o)}}}function Pn(e,i,s){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":xe("error",e),xe("load",e);var o=!1,u=!1,h;for(h in s)if(s.hasOwnProperty(h)){var E=s[h];if(E!=null)switch(h){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:We(e,i,h,E,s,null)}}u&&We(e,i,"srcSet",s.srcSet,s,null),o&&We(e,i,"src",s.src,s,null);return;case"input":xe("invalid",e);var A=h=E=u=null,F=null,$=null;for(o in s)if(s.hasOwnProperty(o)){var ft=s[o];if(ft!=null)switch(o){case"name":u=ft;break;case"type":E=ft;break;case"checked":F=ft;break;case"defaultChecked":$=ft;break;case"value":h=ft;break;case"defaultValue":A=ft;break;case"children":case"dangerouslySetInnerHTML":if(ft!=null)throw Error(a(137,i));break;default:We(e,i,o,ft,s,null)}}Pi(e,h,A,F,$,E,u,!1);return;case"select":xe("invalid",e),o=E=h=null;for(u in s)if(s.hasOwnProperty(u)&&(A=s[u],A!=null))switch(u){case"value":h=A;break;case"defaultValue":E=A;break;case"multiple":o=A;default:We(e,i,u,A,s,null)}i=h,s=E,e.multiple=!!o,i!=null?ta(e,!!o,i,!1):s!=null&&ta(e,!!o,s,!0);return;case"textarea":xe("invalid",e),h=u=o=null;for(E in s)if(s.hasOwnProperty(E)&&(A=s[E],A!=null))switch(E){case"value":o=A;break;case"defaultValue":u=A;break;case"children":h=A;break;case"dangerouslySetInnerHTML":if(A!=null)throw Error(a(91));break;default:We(e,i,E,A,s,null)}Dp(e,o,u,h);return;case"option":for(F in s)if(s.hasOwnProperty(F)&&(o=s[F],o!=null))switch(F){case"selected":e.selected=o&&typeof o!="function"&&typeof o!="symbol";break;default:We(e,i,F,o,s,null)}return;case"dialog":xe("beforetoggle",e),xe("toggle",e),xe("cancel",e),xe("close",e);break;case"iframe":case"object":xe("load",e);break;case"video":case"audio":for(o=0;o<ko.length;o++)xe(ko[o],e);break;case"image":xe("error",e),xe("load",e);break;case"details":xe("toggle",e);break;case"embed":case"source":case"link":xe("error",e),xe("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for($ in s)if(s.hasOwnProperty($)&&(o=s[$],o!=null))switch($){case"children":case"dangerouslySetInnerHTML":throw Error(a(137,i));default:We(e,i,$,o,s,null)}return;default:if(Au(i)){for(ft in s)s.hasOwnProperty(ft)&&(o=s[ft],o!==void 0&&dh(e,i,ft,o,s,void 0));return}}for(A in s)s.hasOwnProperty(A)&&(o=s[A],o!=null&&We(e,i,A,o,s,null))}function MS(e,i,s,o){switch(i){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,h=null,E=null,A=null,F=null,$=null,ft=null;for(ot in s){var vt=s[ot];if(s.hasOwnProperty(ot)&&vt!=null)switch(ot){case"checked":break;case"value":break;case"defaultValue":F=vt;default:o.hasOwnProperty(ot)||We(e,i,ot,null,o,vt)}}for(var et in o){var ot=o[et];if(vt=s[et],o.hasOwnProperty(et)&&(ot!=null||vt!=null))switch(et){case"type":h=ot;break;case"name":u=ot;break;case"checked":$=ot;break;case"defaultChecked":ft=ot;break;case"value":E=ot;break;case"defaultValue":A=ot;break;case"children":case"dangerouslySetInnerHTML":if(ot!=null)throw Error(a(137,i));break;default:ot!==vt&&We(e,i,et,ot,o,vt)}}Fn(e,E,A,F,$,ft,h,u);return;case"select":ot=E=A=et=null;for(h in s)if(F=s[h],s.hasOwnProperty(h)&&F!=null)switch(h){case"value":break;case"multiple":ot=F;default:o.hasOwnProperty(h)||We(e,i,h,null,o,F)}for(u in o)if(h=o[u],F=s[u],o.hasOwnProperty(u)&&(h!=null||F!=null))switch(u){case"value":et=h;break;case"defaultValue":A=h;break;case"multiple":E=h;default:h!==F&&We(e,i,u,h,o,F)}i=A,s=E,o=ot,et!=null?ta(e,!!s,et,!1):!!o!=!!s&&(i!=null?ta(e,!!s,i,!0):ta(e,!!s,s?[]:"",!1));return;case"textarea":ot=et=null;for(A in s)if(u=s[A],s.hasOwnProperty(A)&&u!=null&&!o.hasOwnProperty(A))switch(A){case"value":break;case"children":break;default:We(e,i,A,null,o,u)}for(E in o)if(u=o[E],h=s[E],o.hasOwnProperty(E)&&(u!=null||h!=null))switch(E){case"value":et=u;break;case"defaultValue":ot=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(a(91));break;default:u!==h&&We(e,i,E,u,o,h)}Cp(e,et,ot);return;case"option":for(var Ft in s)if(et=s[Ft],s.hasOwnProperty(Ft)&&et!=null&&!o.hasOwnProperty(Ft))switch(Ft){case"selected":e.selected=!1;break;default:We(e,i,Ft,null,o,et)}for(F in o)if(et=o[F],ot=s[F],o.hasOwnProperty(F)&&et!==ot&&(et!=null||ot!=null))switch(F){case"selected":e.selected=et&&typeof et!="function"&&typeof et!="symbol";break;default:We(e,i,F,et,o,ot)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Jt in s)et=s[Jt],s.hasOwnProperty(Jt)&&et!=null&&!o.hasOwnProperty(Jt)&&We(e,i,Jt,null,o,et);for($ in o)if(et=o[$],ot=s[$],o.hasOwnProperty($)&&et!==ot&&(et!=null||ot!=null))switch($){case"children":case"dangerouslySetInnerHTML":if(et!=null)throw Error(a(137,i));break;default:We(e,i,$,et,o,ot)}return;default:if(Au(i)){for(var qe in s)et=s[qe],s.hasOwnProperty(qe)&&et!==void 0&&!o.hasOwnProperty(qe)&&dh(e,i,qe,void 0,o,et);for(ft in o)et=o[ft],ot=s[ft],!o.hasOwnProperty(ft)||et===ot||et===void 0&&ot===void 0||dh(e,i,ft,et,o,ot);return}}for(var Y in s)et=s[Y],s.hasOwnProperty(Y)&&et!=null&&!o.hasOwnProperty(Y)&&We(e,i,Y,null,o,et);for(vt in o)et=o[vt],ot=s[vt],!o.hasOwnProperty(vt)||et===ot||et==null&&ot==null||We(e,i,vt,et,o,ot)}function Ng(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function SS(){if(typeof performance.getEntriesByType=="function"){for(var e=0,i=0,s=performance.getEntriesByType("resource"),o=0;o<s.length;o++){var u=s[o],h=u.transferSize,E=u.initiatorType,A=u.duration;if(h&&A&&Ng(E)){for(E=0,A=u.responseEnd,o+=1;o<s.length;o++){var F=s[o],$=F.startTime;if($>A)break;var ft=F.transferSize,vt=F.initiatorType;ft&&Ng(vt)&&(F=F.responseEnd,E+=ft*(F<A?1:(A-$)/(F-$)))}if(--o,i+=8*(h+E)/(u.duration/1e3),e++,10<e)break}}if(0<e)return i/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var ph=null,mh=null;function fc(e){return e.nodeType===9?e:e.ownerDocument}function Og(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Pg(e,i){if(e===0)switch(i){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&i==="foreignObject"?0:e}function gh(e,i){return e==="textarea"||e==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.children=="bigint"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var vh=null;function yS(){var e=window.event;return e&&e.type==="popstate"?e===vh?!1:(vh=e,!0):(vh=null,!1)}var zg=typeof setTimeout=="function"?setTimeout:void 0,ES=typeof clearTimeout=="function"?clearTimeout:void 0,Bg=typeof Promise=="function"?Promise:void 0,TS=typeof queueMicrotask=="function"?queueMicrotask:typeof Bg<"u"?function(e){return Bg.resolve(null).then(e).catch(bS)}:zg;function bS(e){setTimeout(function(){throw e})}function Ka(e){return e==="head"}function Ig(e,i){var s=i,o=0;do{var u=s.nextSibling;if(e.removeChild(s),u&&u.nodeType===8)if(s=u.data,s==="/$"||s==="/&"){if(o===0){e.removeChild(u),br(i);return}o--}else if(s==="$"||s==="$?"||s==="$~"||s==="$!"||s==="&")o++;else if(s==="html")Wo(e.ownerDocument.documentElement);else if(s==="head"){s=e.ownerDocument.head,Wo(s);for(var h=s.firstChild;h;){var E=h.nextSibling,A=h.nodeName;h[X]||A==="SCRIPT"||A==="STYLE"||A==="LINK"&&h.rel.toLowerCase()==="stylesheet"||s.removeChild(h),h=E}}else s==="body"&&Wo(e.ownerDocument.body);s=u}while(s);br(i)}function Fg(e,i){var s=e;e=0;do{var o=s.nextSibling;if(s.nodeType===1?i?(s._stashedDisplay=s.style.display,s.style.display="none"):(s.style.display=s._stashedDisplay||"",s.getAttribute("style")===""&&s.removeAttribute("style")):s.nodeType===3&&(i?(s._stashedText=s.nodeValue,s.nodeValue=""):s.nodeValue=s._stashedText||""),o&&o.nodeType===8)if(s=o.data,s==="/$"){if(e===0)break;e--}else s!=="$"&&s!=="$?"&&s!=="$~"&&s!=="$!"||e++;s=o}while(s)}function xh(e){var i=e.firstChild;for(i&&i.nodeType===10&&(i=i.nextSibling);i;){var s=i;switch(i=i.nextSibling,s.nodeName){case"HTML":case"HEAD":case"BODY":xh(s),rt(s);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(s.rel.toLowerCase()==="stylesheet")continue}e.removeChild(s)}}function AS(e,i,s,o){for(;e.nodeType===1;){var u=s;if(e.nodeName.toLowerCase()!==i.toLowerCase()){if(!o&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(o){if(!e[X])switch(i){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(h=e.getAttribute("rel"),h==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(h!==u.rel||e.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||e.getAttribute("title")!==(u.title==null?null:u.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(h=e.getAttribute("src"),(h!==(u.src==null?null:u.src)||e.getAttribute("type")!==(u.type==null?null:u.type)||e.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&h&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(i==="input"&&e.type==="hidden"){var h=u.name==null?null:""+u.name;if(u.type==="hidden"&&e.getAttribute("name")===h)return e}else return e;if(e=bi(e.nextSibling),e===null)break}return null}function wS(e,i,s){if(i==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!s||(e=bi(e.nextSibling),e===null))return null;return e}function Hg(e,i){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!i||(e=bi(e.nextSibling),e===null))return null;return e}function _h(e){return e.data==="$?"||e.data==="$~"}function Mh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function RS(e,i){var s=e.ownerDocument;if(e.data==="$~")e._reactRetry=i;else if(e.data!=="$?"||s.readyState!=="loading")i();else{var o=function(){i(),s.removeEventListener("DOMContentLoaded",o)};s.addEventListener("DOMContentLoaded",o),e._reactRetry=o}}function bi(e){for(;e!=null;e=e.nextSibling){var i=e.nodeType;if(i===1||i===3)break;if(i===8){if(i=e.data,i==="$"||i==="$!"||i==="$?"||i==="$~"||i==="&"||i==="F!"||i==="F")break;if(i==="/$"||i==="/&")return null}}return e}var Sh=null;function Gg(e){e=e.nextSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="/$"||s==="/&"){if(i===0)return bi(e.nextSibling);i--}else s!=="$"&&s!=="$!"&&s!=="$?"&&s!=="$~"&&s!=="&"||i++}e=e.nextSibling}return null}function Vg(e){e=e.previousSibling;for(var i=0;e;){if(e.nodeType===8){var s=e.data;if(s==="$"||s==="$!"||s==="$?"||s==="$~"||s==="&"){if(i===0)return e;i--}else s!=="/$"&&s!=="/&"||i++}e=e.previousSibling}return null}function kg(e,i,s){switch(i=fc(s),e){case"html":if(e=i.documentElement,!e)throw Error(a(452));return e;case"head":if(e=i.head,!e)throw Error(a(453));return e;case"body":if(e=i.body,!e)throw Error(a(454));return e;default:throw Error(a(451))}}function Wo(e){for(var i=e.attributes;i.length;)e.removeAttributeNode(i[0]);rt(e)}var Ai=new Map,Xg=new Set;function hc(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var va=Q.d;Q.d={f:CS,r:DS,D:LS,C:US,L:NS,m:OS,X:zS,S:PS,M:BS};function CS(){var e=va.f(),i=ic();return e||i}function DS(e){var i=W(e);i!==null&&i.tag===5&&i.type==="form"?o0(i):va.r(e)}var yr=typeof document>"u"?null:document;function Wg(e,i,s){var o=yr;if(o&&typeof i=="string"&&i){var u=yn(i);u='link[rel="'+e+'"][href="'+u+'"]',typeof s=="string"&&(u+='[crossorigin="'+s+'"]'),Xg.has(u)||(Xg.add(u),e={rel:e,crossOrigin:s,href:i},o.querySelector(u)===null&&(i=o.createElement("link"),Pn(i,"link",e),Dt(i),o.head.appendChild(i)))}}function LS(e){va.D(e),Wg("dns-prefetch",e,null)}function US(e,i){va.C(e,i),Wg("preconnect",e,i)}function NS(e,i,s){va.L(e,i,s);var o=yr;if(o&&e&&i){var u='link[rel="preload"][as="'+yn(i)+'"]';i==="image"&&s&&s.imageSrcSet?(u+='[imagesrcset="'+yn(s.imageSrcSet)+'"]',typeof s.imageSizes=="string"&&(u+='[imagesizes="'+yn(s.imageSizes)+'"]')):u+='[href="'+yn(e)+'"]';var h=u;switch(i){case"style":h=Er(e);break;case"script":h=Tr(e)}Ai.has(h)||(e=g({rel:"preload",href:i==="image"&&s&&s.imageSrcSet?void 0:e,as:i},s),Ai.set(h,e),o.querySelector(u)!==null||i==="style"&&o.querySelector(qo(h))||i==="script"&&o.querySelector(jo(h))||(i=o.createElement("link"),Pn(i,"link",e),Dt(i),o.head.appendChild(i)))}}function OS(e,i){va.m(e,i);var s=yr;if(s&&e){var o=i&&typeof i.as=="string"?i.as:"script",u='link[rel="modulepreload"][as="'+yn(o)+'"][href="'+yn(e)+'"]',h=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":h=Tr(e)}if(!Ai.has(h)&&(e=g({rel:"modulepreload",href:e},i),Ai.set(h,e),s.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(s.querySelector(jo(h)))return}o=s.createElement("link"),Pn(o,"link",e),Dt(o),s.head.appendChild(o)}}}function PS(e,i,s){va.S(e,i,s);var o=yr;if(o&&e){var u=Ct(o).hoistableStyles,h=Er(e);i=i||"default";var E=u.get(h);if(!E){var A={loading:0,preload:null};if(E=o.querySelector(qo(h)))A.loading=5;else{e=g({rel:"stylesheet",href:e,"data-precedence":i},s),(s=Ai.get(h))&&yh(e,s);var F=E=o.createElement("link");Dt(F),Pn(F,"link",e),F._p=new Promise(function($,ft){F.onload=$,F.onerror=ft}),F.addEventListener("load",function(){A.loading|=1}),F.addEventListener("error",function(){A.loading|=2}),A.loading|=4,dc(E,i,o)}E={type:"stylesheet",instance:E,count:1,state:A},u.set(h,E)}}}function zS(e,i){va.X(e,i);var s=yr;if(s&&e){var o=Ct(s).hoistableScripts,u=Tr(e),h=o.get(u);h||(h=s.querySelector(jo(u)),h||(e=g({src:e,async:!0},i),(i=Ai.get(u))&&Eh(e,i),h=s.createElement("script"),Dt(h),Pn(h,"link",e),s.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function BS(e,i){va.M(e,i);var s=yr;if(s&&e){var o=Ct(s).hoistableScripts,u=Tr(e),h=o.get(u);h||(h=s.querySelector(jo(u)),h||(e=g({src:e,async:!0,type:"module"},i),(i=Ai.get(u))&&Eh(e,i),h=s.createElement("script"),Dt(h),Pn(h,"link",e),s.head.appendChild(h)),h={type:"script",instance:h,count:1,state:null},o.set(u,h))}}function qg(e,i,s,o){var u=(u=Et.current)?hc(u):null;if(!u)throw Error(a(446));switch(e){case"meta":case"title":return null;case"style":return typeof s.precedence=="string"&&typeof s.href=="string"?(i=Er(s.href),s=Ct(u).hoistableStyles,o=s.get(i),o||(o={type:"style",instance:null,count:0,state:null},s.set(i,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(s.rel==="stylesheet"&&typeof s.href=="string"&&typeof s.precedence=="string"){e=Er(s.href);var h=Ct(u).hoistableStyles,E=h.get(e);if(E||(u=u.ownerDocument||u,E={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},h.set(e,E),(h=u.querySelector(qo(e)))&&!h._p&&(E.instance=h,E.state.loading=5),Ai.has(e)||(s={rel:"preload",as:"style",href:s.href,crossOrigin:s.crossOrigin,integrity:s.integrity,media:s.media,hrefLang:s.hrefLang,referrerPolicy:s.referrerPolicy},Ai.set(e,s),h||IS(u,e,s,E.state))),i&&o===null)throw Error(a(528,""));return E}if(i&&o!==null)throw Error(a(529,""));return null;case"script":return i=s.async,s=s.src,typeof s=="string"&&i&&typeof i!="function"&&typeof i!="symbol"?(i=Tr(s),s=Ct(u).hoistableScripts,o=s.get(i),o||(o={type:"script",instance:null,count:0,state:null},s.set(i,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(a(444,e))}}function Er(e){return'href="'+yn(e)+'"'}function qo(e){return'link[rel="stylesheet"]['+e+"]"}function jg(e){return g({},e,{"data-precedence":e.precedence,precedence:null})}function IS(e,i,s,o){e.querySelector('link[rel="preload"][as="style"]['+i+"]")?o.loading=1:(i=e.createElement("link"),o.preload=i,i.addEventListener("load",function(){return o.loading|=1}),i.addEventListener("error",function(){return o.loading|=2}),Pn(i,"link",s),Dt(i),e.head.appendChild(i))}function Tr(e){return'[src="'+yn(e)+'"]'}function jo(e){return"script[async]"+e}function Yg(e,i,s){if(i.count++,i.instance===null)switch(i.type){case"style":var o=e.querySelector('style[data-href~="'+yn(s.href)+'"]');if(o)return i.instance=o,Dt(o),o;var u=g({},s,{"data-href":s.href,"data-precedence":s.precedence,href:null,precedence:null});return o=(e.ownerDocument||e).createElement("style"),Dt(o),Pn(o,"style",u),dc(o,s.precedence,e),i.instance=o;case"stylesheet":u=Er(s.href);var h=e.querySelector(qo(u));if(h)return i.state.loading|=4,i.instance=h,Dt(h),h;o=jg(s),(u=Ai.get(u))&&yh(o,u),h=(e.ownerDocument||e).createElement("link"),Dt(h);var E=h;return E._p=new Promise(function(A,F){E.onload=A,E.onerror=F}),Pn(h,"link",o),i.state.loading|=4,dc(h,s.precedence,e),i.instance=h;case"script":return h=Tr(s.src),(u=e.querySelector(jo(h)))?(i.instance=u,Dt(u),u):(o=s,(u=Ai.get(h))&&(o=g({},s),Eh(o,u)),e=e.ownerDocument||e,u=e.createElement("script"),Dt(u),Pn(u,"link",o),e.head.appendChild(u),i.instance=u);case"void":return null;default:throw Error(a(443,i.type))}else i.type==="stylesheet"&&(i.state.loading&4)===0&&(o=i.instance,i.state.loading|=4,dc(o,s.precedence,e));return i.instance}function dc(e,i,s){for(var o=s.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,h=u,E=0;E<o.length;E++){var A=o[E];if(A.dataset.precedence===i)h=A;else if(h!==u)break}h?h.parentNode.insertBefore(e,h.nextSibling):(i=s.nodeType===9?s.head:s,i.insertBefore(e,i.firstChild))}function yh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.title==null&&(e.title=i.title)}function Eh(e,i){e.crossOrigin==null&&(e.crossOrigin=i.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=i.referrerPolicy),e.integrity==null&&(e.integrity=i.integrity)}var pc=null;function Zg(e,i,s){if(pc===null){var o=new Map,u=pc=new Map;u.set(s,o)}else u=pc,o=u.get(s),o||(o=new Map,u.set(s,o));if(o.has(e))return o;for(o.set(e,null),s=s.getElementsByTagName(e),u=0;u<s.length;u++){var h=s[u];if(!(h[X]||h[rn]||e==="link"&&h.getAttribute("rel")==="stylesheet")&&h.namespaceURI!=="http://www.w3.org/2000/svg"){var E=h.getAttribute(i)||"";E=e+E;var A=o.get(E);A?A.push(h):o.set(E,[h])}}return o}function Kg(e,i,s){e=e.ownerDocument||e,e.head.insertBefore(s,i==="title"?e.querySelector("head > title"):null)}function FS(e,i,s){if(s===1||i.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof i.precedence!="string"||typeof i.href!="string"||i.href==="")break;return!0;case"link":if(typeof i.rel!="string"||typeof i.href!="string"||i.href===""||i.onLoad||i.onError)break;switch(i.rel){case"stylesheet":return e=i.disabled,typeof i.precedence=="string"&&e==null;default:return!0}case"script":if(i.async&&typeof i.async!="function"&&typeof i.async!="symbol"&&!i.onLoad&&!i.onError&&i.src&&typeof i.src=="string")return!0}return!1}function Qg(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function HS(e,i,s,o){if(s.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(s.state.loading&4)===0){if(s.instance===null){var u=Er(o.href),h=i.querySelector(qo(u));if(h){i=h._p,i!==null&&typeof i=="object"&&typeof i.then=="function"&&(e.count++,e=mc.bind(e),i.then(e,e)),s.state.loading|=4,s.instance=h,Dt(h);return}h=i.ownerDocument||i,o=jg(o),(u=Ai.get(u))&&yh(o,u),h=h.createElement("link"),Dt(h);var E=h;E._p=new Promise(function(A,F){E.onload=A,E.onerror=F}),Pn(h,"link",o),s.instance=h}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(s,i),(i=s.state.preload)&&(s.state.loading&3)===0&&(e.count++,s=mc.bind(e),i.addEventListener("load",s),i.addEventListener("error",s))}}var Th=0;function GS(e,i){return e.stylesheets&&e.count===0&&vc(e,e.stylesheets),0<e.count||0<e.imgCount?function(s){var o=setTimeout(function(){if(e.stylesheets&&vc(e,e.stylesheets),e.unsuspend){var h=e.unsuspend;e.unsuspend=null,h()}},6e4+i);0<e.imgBytes&&Th===0&&(Th=62500*SS());var u=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&vc(e,e.stylesheets),e.unsuspend)){var h=e.unsuspend;e.unsuspend=null,h()}},(e.imgBytes>Th?50:800)+i);return e.unsuspend=s,function(){e.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function mc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)vc(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var gc=null;function vc(e,i){e.stylesheets=null,e.unsuspend!==null&&(e.count++,gc=new Map,i.forEach(VS,e),gc=null,mc.call(e))}function VS(e,i){if(!(i.state.loading&4)){var s=gc.get(e);if(s)var o=s.get(null);else{s=new Map,gc.set(e,s);for(var u=e.querySelectorAll("link[data-precedence],style[data-precedence]"),h=0;h<u.length;h++){var E=u[h];(E.nodeName==="LINK"||E.getAttribute("media")!=="not all")&&(s.set(E.dataset.precedence,E),o=E)}o&&s.set(null,o)}u=i.instance,E=u.getAttribute("data-precedence"),h=s.get(E)||o,h===o&&s.set(null,u),s.set(E,u),this.count++,o=mc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),h?h.parentNode.insertBefore(u,h.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(u,e.firstChild)),i.state.loading|=4}}var Yo={$$typeof:U,Provider:null,Consumer:null,_currentValue:K,_currentValue2:K,_threadCount:0};function kS(e,i,s,o,u,h,E,A,F){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ce(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ce(0),this.hiddenUpdates=Ce(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=h,this.onRecoverableError=E,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=F,this.incompleteTransitions=new Map}function Jg(e,i,s,o,u,h,E,A,F,$,ft,vt){return e=new kS(e,i,s,E,F,$,ft,vt,A),i=1,h===!0&&(i|=24),h=si(3,null,null,i),e.current=h,h.stateNode=e,i=nf(),i.refCount++,e.pooledCache=i,i.refCount++,h.memoizedState={element:o,isDehydrated:s,cache:i},of(h),e}function $g(e){return e?(e=er,e):er}function tv(e,i,s,o,u,h){u=$g(u),o.context===null?o.context=u:o.pendingContext=u,o=Fa(i),o.payload={element:s},h=h===void 0?null:h,h!==null&&(o.callback=h),s=Ha(e,o,i),s!==null&&($n(s,e,i),Ao(s,e,i))}function ev(e,i){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var s=e.retryLane;e.retryLane=s!==0&&s<i?s:i}}function bh(e,i){ev(e,i),(e=e.alternate)&&ev(e,i)}function nv(e){if(e.tag===13||e.tag===31){var i=xs(e,67108864);i!==null&&$n(i,e,67108864),bh(e,67108864)}}function iv(e){if(e.tag===13||e.tag===31){var i=ui();i=ds(i);var s=xs(e,i);s!==null&&$n(s,e,i),bh(e,i)}}var xc=!0;function XS(e,i,s,o){var u=z.T;z.T=null;var h=Q.p;try{Q.p=2,Ah(e,i,s,o)}finally{Q.p=h,z.T=u}}function WS(e,i,s,o){var u=z.T;z.T=null;var h=Q.p;try{Q.p=8,Ah(e,i,s,o)}finally{Q.p=h,z.T=u}}function Ah(e,i,s,o){if(xc){var u=wh(o);if(u===null)hh(e,i,o,_c,s),sv(e,o);else if(jS(u,e,i,s,o))o.stopPropagation();else if(sv(e,o),i&4&&-1<qS.indexOf(e)){for(;u!==null;){var h=W(u);if(h!==null)switch(h.tag){case 3:if(h=h.stateNode,h.current.memoizedState.isDehydrated){var E=Rt(h.pendingLanes);if(E!==0){var A=h;for(A.pendingLanes|=2,A.entangledLanes|=2;E;){var F=1<<31-ie(E);A.entanglements[1]|=F,E&=~F}Zi(h),(Oe&6)===0&&(ec=dt()+500,Vo(0))}}break;case 31:case 13:A=xs(h,2),A!==null&&$n(A,h,2),ic(),bh(h,2)}if(h=wh(o),h===null&&hh(e,i,o,_c,s),h===u)break;u=h}u!==null&&o.stopPropagation()}else hh(e,i,o,null,s)}}function wh(e){return e=Ru(e),Rh(e)}var _c=null;function Rh(e){if(_c=null,e=at(e),e!==null){var i=c(e);if(i===null)e=null;else{var s=i.tag;if(s===13){if(e=f(i),e!==null)return e;e=null}else if(s===31){if(e=d(i),e!==null)return e;e=null}else if(s===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;e=null}else i!==e&&(e=null)}}return _c=e,null}function av(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(yt()){case gt:return 2;case qt:return 8;case Lt:case zt:return 32;case Me:return 268435456;default:return 32}default:return 32}}var Ch=!1,Qa=null,Ja=null,$a=null,Zo=new Map,Ko=new Map,ts=[],qS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function sv(e,i){switch(e){case"focusin":case"focusout":Qa=null;break;case"dragenter":case"dragleave":Ja=null;break;case"mouseover":case"mouseout":$a=null;break;case"pointerover":case"pointerout":Zo.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ko.delete(i.pointerId)}}function Qo(e,i,s,o,u,h){return e===null||e.nativeEvent!==h?(e={blockedOn:i,domEventName:s,eventSystemFlags:o,nativeEvent:h,targetContainers:[u]},i!==null&&(i=W(i),i!==null&&nv(i)),e):(e.eventSystemFlags|=o,i=e.targetContainers,u!==null&&i.indexOf(u)===-1&&i.push(u),e)}function jS(e,i,s,o,u){switch(i){case"focusin":return Qa=Qo(Qa,e,i,s,o,u),!0;case"dragenter":return Ja=Qo(Ja,e,i,s,o,u),!0;case"mouseover":return $a=Qo($a,e,i,s,o,u),!0;case"pointerover":var h=u.pointerId;return Zo.set(h,Qo(Zo.get(h)||null,e,i,s,o,u)),!0;case"gotpointercapture":return h=u.pointerId,Ko.set(h,Qo(Ko.get(h)||null,e,i,s,o,u)),!0}return!1}function rv(e){var i=at(e.target);if(i!==null){var s=c(i);if(s!==null){if(i=s.tag,i===13){if(i=f(s),i!==null){e.blockedOn=i,ps(e.priority,function(){iv(s)});return}}else if(i===31){if(i=d(s),i!==null){e.blockedOn=i,ps(e.priority,function(){iv(s)});return}}else if(i===3&&s.stateNode.current.memoizedState.isDehydrated){e.blockedOn=s.tag===3?s.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Mc(e){if(e.blockedOn!==null)return!1;for(var i=e.targetContainers;0<i.length;){var s=wh(e.nativeEvent);if(s===null){s=e.nativeEvent;var o=new s.constructor(s.type,s);wu=o,s.target.dispatchEvent(o),wu=null}else return i=W(s),i!==null&&nv(i),e.blockedOn=s,!1;i.shift()}return!0}function ov(e,i,s){Mc(e)&&s.delete(i)}function YS(){Ch=!1,Qa!==null&&Mc(Qa)&&(Qa=null),Ja!==null&&Mc(Ja)&&(Ja=null),$a!==null&&Mc($a)&&($a=null),Zo.forEach(ov),Ko.forEach(ov)}function Sc(e,i){e.blockedOn===i&&(e.blockedOn=null,Ch||(Ch=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,YS)))}var yc=null;function lv(e){yc!==e&&(yc=e,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){yc===e&&(yc=null);for(var i=0;i<e.length;i+=3){var s=e[i],o=e[i+1],u=e[i+2];if(typeof o!="function"){if(Rh(o||s)===null)continue;break}var h=W(s);h!==null&&(e.splice(i,3),i-=3,wf(h,{pending:!0,data:u,method:s.method,action:o},o,u))}}))}function br(e){function i(F){return Sc(F,e)}Qa!==null&&Sc(Qa,e),Ja!==null&&Sc(Ja,e),$a!==null&&Sc($a,e),Zo.forEach(i),Ko.forEach(i);for(var s=0;s<ts.length;s++){var o=ts[s];o.blockedOn===e&&(o.blockedOn=null)}for(;0<ts.length&&(s=ts[0],s.blockedOn===null);)rv(s),s.blockedOn===null&&ts.shift();if(s=(e.ownerDocument||e).$$reactFormReplay,s!=null)for(o=0;o<s.length;o+=3){var u=s[o],h=s[o+1],E=u[Dn]||null;if(typeof h=="function")E||lv(s);else if(E){var A=null;if(h&&h.hasAttribute("formAction")){if(u=h,E=h[Dn]||null)A=E.formAction;else if(Rh(u)!==null)continue}else A=E.action;typeof A=="function"?s[o+1]=A:(s.splice(o,3),o-=3),lv(s)}}}function cv(){function e(h){h.canIntercept&&h.info==="react-transition"&&h.intercept({handler:function(){return new Promise(function(E){return u=E})},focusReset:"manual",scroll:"manual"})}function i(){u!==null&&(u(),u=null),o||setTimeout(s,20)}function s(){if(!o&&!navigation.transition){var h=navigation.currentEntry;h&&h.url!=null&&navigation.navigate(h.url,{state:h.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",i),navigation.addEventListener("navigateerror",i),setTimeout(s,100),function(){o=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",i),navigation.removeEventListener("navigateerror",i),u!==null&&(u(),u=null)}}}function Dh(e){this._internalRoot=e}Ec.prototype.render=Dh.prototype.render=function(e){var i=this._internalRoot;if(i===null)throw Error(a(409));var s=i.current,o=ui();tv(s,o,e,i,null,null)},Ec.prototype.unmount=Dh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var i=e.containerInfo;tv(e.current,2,null,e,null,null),ic(),i[$i]=null}};function Ec(e){this._internalRoot=e}Ec.prototype.unstable_scheduleHydration=function(e){if(e){var i=lo();e={blockedOn:null,target:e,priority:i};for(var s=0;s<ts.length&&i!==0&&i<ts[s].priority;s++);ts.splice(s,0,e),s===0&&rv(e)}};var uv=t.version;if(uv!=="19.2.8")throw Error(a(527,uv,"19.2.8"));Q.findDOMNode=function(e){var i=e._reactInternals;if(i===void 0)throw typeof e.render=="function"?Error(a(188)):(e=Object.keys(e).join(","),Error(a(268,e)));return e=m(i),e=e!==null?v(e):null,e=e===null?null:e.stateNode,e};var ZS={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:z,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Tc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Tc.isDisabled&&Tc.supportsFiber)try{Kt=Tc.inject(ZS),jt=Tc}catch{}}return $o.createRoot=function(e,i){if(!l(e))throw Error(a(299));var s=!1,o="",u=v0,h=x0,E=_0;return i!=null&&(i.unstable_strictMode===!0&&(s=!0),i.identifierPrefix!==void 0&&(o=i.identifierPrefix),i.onUncaughtError!==void 0&&(u=i.onUncaughtError),i.onCaughtError!==void 0&&(h=i.onCaughtError),i.onRecoverableError!==void 0&&(E=i.onRecoverableError)),i=Jg(e,1,!1,null,null,s,o,null,u,h,E,cv),e[$i]=i.current,fh(e),new Dh(i)},$o.hydrateRoot=function(e,i,s){if(!l(e))throw Error(a(299));var o=!1,u="",h=v0,E=x0,A=_0,F=null;return s!=null&&(s.unstable_strictMode===!0&&(o=!0),s.identifierPrefix!==void 0&&(u=s.identifierPrefix),s.onUncaughtError!==void 0&&(h=s.onUncaughtError),s.onCaughtError!==void 0&&(E=s.onCaughtError),s.onRecoverableError!==void 0&&(A=s.onRecoverableError),s.formState!==void 0&&(F=s.formState)),i=Jg(e,1,!0,i,s??null,o,u,F,h,E,A,cv),i.context=$g(null),s=i.current,o=ui(),o=ds(o),u=Fa(o),u.callback=null,Ha(s,u,o),s=o,i.current.lanes=s,Cn(i,s),Zi(i),e[$i]=i.current,fh(e),new Ec(i)},$o.version="19.2.8",$o}var Mv;function oy(){if(Mv)return Nh.exports;Mv=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(t){console.error(t)}}return r(),Nh.exports=ry(),Nh.exports}var ly=oy();const cy=e_(ly),Sv=r=>{let t;const n=new Set,a=(m,v)=>{const g=typeof m=="function"?m(t):m;if(!Object.is(g,t)){const x=t;t=v??(typeof g!="object"||g===null)?g:Object.assign({},t,g),n.forEach(M=>M(t,x))}},l=()=>t,d={setState:a,getState:l,getInitialState:()=>p,subscribe:m=>(n.add(m),()=>n.delete(m))},p=t=r(a,l,d);return d},uy=(r=>r?Sv(r):Sv),fy=r=>r;function hy(r,t=fy){const n=ol.useSyncExternalStore(r.subscribe,ol.useCallback(()=>t(r.getState()),[r,t]),ol.useCallback(()=>t(r.getInitialState()),[r,t]));return ol.useDebugValue(n),n}const yv=r=>{const t=uy(r),n=a=>hy(t,a);return Object.assign(n,t),n},dy=(r=>r?yv(r):yv),Bh=1/60,Ev=100,py=100,my=20,gy=1.5,ns=200,Ar=60,vy=5,Tv=1.5,xy=3,_y=2,bv=30,Ih=200,Av=60,au=150,My=.4,Sy=.9,Fh=15,wv=8,yy=4,Ey=10,Ty=2,Hh=4,by=.3,Ay=2.5,wy=.4,Rv={screen:"menu",gameMode:null,score:0,wave:0,time:0,paused:!1,gameOver:!1,bossFight:!1,bossName:""};function Cv(r){return{id:r,pos:{x:0,y:0,z:0},rot:{x:0,y:0,z:0},hp:Ev,maxHp:Ev,speed:my,weapon:1,weapons:[1,2,3],specialGauge:0,maxSpecialGauge:py,invulnTimer:0,alive:!0,score:0,kills:0,combo:0}}function Dv(){return{forward:!1,backward:!1,left:!1,right:!1,up:!1,down:!1,shoot:!1,aimX:.5,aimY:.5,weaponSwitch:0,boost:!1,brake:!1,dodge:!1,special:!1,lockToggle:!1,pause:!1}}const bn=dy(r=>({game:{...Rv},players:[Cv(0)],inputs:[Dv()],setGame:t=>r(n=>({game:{...n.game,...t}})),setPlayers:t=>r({players:t}),setInputs:t=>r({inputs:t}),resetGame:()=>r({game:{...Rv},players:[Cv(0)],inputs:[Dv()]})})),Ry=r=>lt.jsx("svg",{className:"absolute top-0 left-0 w-4 h-4",viewBox:"0 0 16 16",children:lt.jsx("path",{d:"M0 0h14v2H2v12H0z",fill:r})}),Cy=r=>lt.jsx("svg",{className:"absolute top-0 right-0 w-4 h-4",viewBox:"0 0 16 16",children:lt.jsx("path",{d:"M16 0H2v2h12v12h2z",fill:r})}),Dy=r=>lt.jsx("svg",{className:"absolute bottom-0 left-0 w-4 h-4",viewBox:"0 0 16 16",children:lt.jsx("path",{d:"M0 16h14v-2H2V2H0z",fill:r})}),Ly=r=>lt.jsx("svg",{className:"absolute bottom-0 right-0 w-4 h-4",viewBox:"0 0 16 16",children:lt.jsx("path",{d:"M16 16H2v-2h12V2h2z",fill:r})}),Lv=()=>{const r=bn(t=>t.setGame);return lt.jsxs("div",{className:"w-full h-full flex flex-col items-center justify-center bg-dark-bg",children:[lt.jsx("div",{className:"absolute inset-0 opacity-[0.03] pointer-events-none",style:{backgroundImage:"linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)",backgroundSize:"40px 40px"}}),lt.jsx("div",{className:"text-center mb-16 relative",children:lt.jsxs("div",{className:"relative inline-block px-8 py-6 pixel-border bg-black/60",children:[Ry("#00f0ff"),Cy("#00f0ff"),Dy("#00f0ff"),Ly("#00f0ff"),lt.jsx("h1",{className:"font-pixel-title text-2xl md:text-3xl text-neon-cyan mb-4 pixel-text-glow tracking-wide",children:"纯白枪骑兵"}),lt.jsx("p",{className:"font-pixel text-lg text-white/40 tracking-[0.2em]",children:"PURE WHITE LANCER"}),lt.jsxs("div",{className:"mt-3 flex items-center justify-center gap-3 text-[10px] text-white/25",children:[lt.jsx("span",{className:"px-2 py-0.5 pixel-border-dim",children:"3D ACTION"}),lt.jsx("span",{className:"px-2 py-0.5 pixel-border-dim",children:"REMAKE"})]})]})}),lt.jsxs("div",{className:"space-y-3 w-64",children:[lt.jsx("button",{onClick:()=>r({screen:"pve",gameMode:"pve"}),className:"pixel-btn w-full py-2.5 text-base tracking-[0.15em]",children:"START GAME"}),lt.jsxs("div",{className:"text-center mt-8",children:[lt.jsx("p",{className:"font-pixel text-xs text-white/20 tracking-wider",children:"BASED ON THE FLASH ORIGINAL"}),lt.jsx("p",{className:"font-pixel text-[10px] text-white/15 mt-1",children:"ORIGINAL: phixcat | REMAKE: KIMI3"})]})]})]})};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const mp="170",Uy=0,Uv=1,Ny=2,n_=1,Oy=2,Ea=3,hs=0,ii=1,ba=2,Ra=0,qr=1,jr=2,Nv=3,Ov=4,Py=5,Fs=100,zy=101,By=102,Iy=103,Fy=104,Hy=200,Gy=201,Vy=202,ky=203,Td=204,bd=205,Xy=206,Wy=207,qy=208,jy=209,Yy=210,Zy=211,Ky=212,Qy=213,Jy=214,Ad=0,wd=1,Rd=2,Kr=3,Cd=4,Dd=5,Ld=6,Ud=7,i_=0,$y=1,t1=2,us=0,a_=1,s_=2,r_=3,o_=4,e1=5,l_=6,c_=7,u_=300,Qr=301,Jr=302,Nd=303,Od=304,_u=306,Pd=1e3,Gs=1001,zd=1002,mi=1003,n1=1004,bc=1005,Vi=1006,Gh=1007,Vs=1008,Da=1009,f_=1010,h_=1011,ul=1012,gp=1013,Xs=1014,Aa=1015,Xi=1016,vp=1017,xp=1018,$r=1020,d_=35902,p_=1021,m_=1022,ki=1023,g_=1024,v_=1025,Yr=1026,to=1027,x_=1028,_p=1029,__=1030,Mp=1031,Sp=1033,su=33776,ru=33777,ou=33778,lu=33779,Bd=35840,Id=35841,Fd=35842,Hd=35843,Gd=36196,Vd=37492,kd=37496,Xd=37808,Wd=37809,qd=37810,jd=37811,Yd=37812,Zd=37813,Kd=37814,Qd=37815,Jd=37816,$d=37817,tp=37818,ep=37819,np=37820,ip=37821,cu=36492,ap=36494,sp=36495,M_=36283,rp=36284,op=36285,lp=36286,i1=3200,a1=3201,S_=0,s1=1,cs="",Di="srgb",io="srgb-linear",Mu="linear",He="srgb",wr=7680,Pv=519,r1=512,o1=513,l1=514,y_=515,c1=516,u1=517,f1=518,h1=519,zv=35044,Bv="300 es",wa=2e3,du=2001;class ao{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const a=this._listeners;a[t]===void 0&&(a[t]=[]),a[t].indexOf(n)===-1&&a[t].push(n)}hasEventListener(t,n){if(this._listeners===void 0)return!1;const a=this._listeners;return a[t]!==void 0&&a[t].indexOf(n)!==-1}removeEventListener(t,n){if(this._listeners===void 0)return;const l=this._listeners[t];if(l!==void 0){const c=l.indexOf(n);c!==-1&&l.splice(c,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const a=this._listeners[t.type];if(a!==void 0){t.target=this;const l=a.slice(0);for(let c=0,f=l.length;c<f;c++)l[c].call(this,t);t.target=null}}}const Gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],uu=Math.PI/180,cp=180/Math.PI;function fl(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(Gn[r&255]+Gn[r>>8&255]+Gn[r>>16&255]+Gn[r>>24&255]+"-"+Gn[t&255]+Gn[t>>8&255]+"-"+Gn[t>>16&15|64]+Gn[t>>24&255]+"-"+Gn[n&63|128]+Gn[n>>8&255]+"-"+Gn[n>>16&255]+Gn[n>>24&255]+Gn[a&255]+Gn[a>>8&255]+Gn[a>>16&255]+Gn[a>>24&255]).toLowerCase()}function ni(r,t,n){return Math.max(t,Math.min(n,r))}function d1(r,t){return(r%t+t)%t}function Vh(r,t,n){return(1-n)*r+n*t}function tl(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ti(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class ne{constructor(t=0,n=0){ne.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,a=this.y,l=t.elements;return this.x=l[0]*n+l[3]*a+l[6],this.y=l[1]*n+l[4]*a+l[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(t,Math.min(n,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(ni(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y;return n*n+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const a=Math.cos(n),l=Math.sin(n),c=this.x-t.x,f=this.y-t.y;return this.x=c*a-f*l+t.x,this.y=c*l+f*a+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class he{constructor(t,n,a,l,c,f,d,p,m){he.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,a,l,c,f,d,p,m)}set(t,n,a,l,c,f,d,p,m){const v=this.elements;return v[0]=t,v[1]=l,v[2]=d,v[3]=n,v[4]=c,v[5]=p,v[6]=a,v[7]=f,v[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],this}extractBasis(t,n,a){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,l=n.elements,c=this.elements,f=a[0],d=a[3],p=a[6],m=a[1],v=a[4],g=a[7],x=a[2],M=a[5],y=a[8],T=l[0],S=l[3],_=l[6],L=l[1],U=l[4],R=l[7],q=l[2],I=l[5],N=l[8];return c[0]=f*T+d*L+p*q,c[3]=f*S+d*U+p*I,c[6]=f*_+d*R+p*N,c[1]=m*T+v*L+g*q,c[4]=m*S+v*U+g*I,c[7]=m*_+v*R+g*N,c[2]=x*T+M*L+y*q,c[5]=x*S+M*U+y*I,c[8]=x*_+M*R+y*N,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[1],l=t[2],c=t[3],f=t[4],d=t[5],p=t[6],m=t[7],v=t[8];return n*f*v-n*d*m-a*c*v+a*d*p+l*c*m-l*f*p}invert(){const t=this.elements,n=t[0],a=t[1],l=t[2],c=t[3],f=t[4],d=t[5],p=t[6],m=t[7],v=t[8],g=v*f-d*m,x=d*p-v*c,M=m*c-f*p,y=n*g+a*x+l*M;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);const T=1/y;return t[0]=g*T,t[1]=(l*m-v*a)*T,t[2]=(d*a-l*f)*T,t[3]=x*T,t[4]=(v*n-l*p)*T,t[5]=(l*c-d*n)*T,t[6]=M*T,t[7]=(a*p-m*n)*T,t[8]=(f*n-a*c)*T,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,a,l,c,f,d){const p=Math.cos(c),m=Math.sin(c);return this.set(a*p,a*m,-a*(p*f+m*d)+f+t,-l*m,l*p,-l*(-m*f+p*d)+d+n,0,0,1),this}scale(t,n){return this.premultiply(kh.makeScale(t,n)),this}rotate(t){return this.premultiply(kh.makeRotation(-t)),this}translate(t,n){return this.premultiply(kh.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,a,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,a=t.elements;for(let l=0;l<9;l++)if(n[l]!==a[l])return!1;return!0}fromArray(t,n=0){for(let a=0;a<9;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const kh=new he;function E_(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function pu(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function p1(){const r=pu("canvas");return r.style.display="block",r}const Iv={};function ll(r){r in Iv||(Iv[r]=!0,console.warn(r))}function m1(r,t,n){return new Promise(function(a,l){function c(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,n);break;default:a()}}setTimeout(c,n)})}function g1(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function v1(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Re={enabled:!0,workingColorSpace:io,spaces:{},convert:function(r,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===He&&(r.r=Ca(r.r),r.g=Ca(r.g),r.b=Ca(r.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(r.applyMatrix3(this.spaces[t].toXYZ),r.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===He&&(r.r=Zr(r.r),r.g=Zr(r.g),r.b=Zr(r.b))),r},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===cs?Mu:this.spaces[r].transfer},getLuminanceCoefficients:function(r,t=this.workingColorSpace){return r.fromArray(this.spaces[t].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,t,n){return r.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function Ca(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Zr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const Fv=[.64,.33,.3,.6,.15,.06],Hv=[.2126,.7152,.0722],Gv=[.3127,.329],Vv=new he().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),kv=new he().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Re.define({[io]:{primaries:Fv,whitePoint:Gv,transfer:Mu,toXYZ:Vv,fromXYZ:kv,luminanceCoefficients:Hv,workingColorSpaceConfig:{unpackColorSpace:Di},outputColorSpaceConfig:{drawingBufferColorSpace:Di}},[Di]:{primaries:Fv,whitePoint:Gv,transfer:He,toXYZ:Vv,fromXYZ:kv,luminanceCoefficients:Hv,outputColorSpaceConfig:{drawingBufferColorSpace:Di}}});let Rr;class x1{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Rr===void 0&&(Rr=pu("canvas")),Rr.width=t.width,Rr.height=t.height;const a=Rr.getContext("2d");t instanceof ImageData?a.putImageData(t,0,0):a.drawImage(t,0,0,t.width,t.height),n=Rr}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=pu("canvas");n.width=t.width,n.height=t.height;const a=n.getContext("2d");a.drawImage(t,0,0,t.width,t.height);const l=a.getImageData(0,0,t.width,t.height),c=l.data;for(let f=0;f<c.length;f++)c[f]=Ca(c[f]/255)*255;return a.putImageData(l,0,0),n}else if(t.data){const n=t.data.slice(0);for(let a=0;a<n.length;a++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[a]=Math.floor(Ca(n[a]/255)*255):n[a]=Ca(n[a]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let _1=0;class T_{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_1++}),this.uuid=fl(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const a={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let f=0,d=l.length;f<d;f++)l[f].isDataTexture?c.push(Xh(l[f].image)):c.push(Xh(l[f]))}else c=Xh(l);a.url=c}return n||(t.images[this.uuid]=a),a}}function Xh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?x1.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let M1=0;class kn extends ao{constructor(t=kn.DEFAULT_IMAGE,n=kn.DEFAULT_MAPPING,a=Gs,l=Gs,c=Vi,f=Vs,d=ki,p=Da,m=kn.DEFAULT_ANISOTROPY,v=cs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:M1++}),this.uuid=fl(),this.name="",this.source=new T_(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=a,this.wrapT=l,this.magFilter=c,this.minFilter=f,this.anisotropy=m,this.format=d,this.internalFormat=null,this.type=p,this.offset=new ne(0,0),this.repeat=new ne(1,1),this.center=new ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new he,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const a={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(a.userData=this.userData),n||(t.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==u_)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Pd:t.x=t.x-Math.floor(t.x);break;case Gs:t.x=t.x<0?0:1;break;case zd:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Pd:t.y=t.y-Math.floor(t.y);break;case Gs:t.y=t.y<0?0:1;break;case zd:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}kn.DEFAULT_IMAGE=null;kn.DEFAULT_MAPPING=u_;kn.DEFAULT_ANISOTROPY=1;class je{constructor(t=0,n=0,a=0,l=1){je.prototype.isVector4=!0,this.x=t,this.y=n,this.z=a,this.w=l}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,a,l){return this.x=t,this.y=n,this.z=a,this.w=l,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,a=this.y,l=this.z,c=this.w,f=t.elements;return this.x=f[0]*n+f[4]*a+f[8]*l+f[12]*c,this.y=f[1]*n+f[5]*a+f[9]*l+f[13]*c,this.z=f[2]*n+f[6]*a+f[10]*l+f[14]*c,this.w=f[3]*n+f[7]*a+f[11]*l+f[15]*c,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,a,l,c;const p=t.elements,m=p[0],v=p[4],g=p[8],x=p[1],M=p[5],y=p[9],T=p[2],S=p[6],_=p[10];if(Math.abs(v-x)<.01&&Math.abs(g-T)<.01&&Math.abs(y-S)<.01){if(Math.abs(v+x)<.1&&Math.abs(g+T)<.1&&Math.abs(y+S)<.1&&Math.abs(m+M+_-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const U=(m+1)/2,R=(M+1)/2,q=(_+1)/2,I=(v+x)/4,N=(g+T)/4,B=(y+S)/4;return U>R&&U>q?U<.01?(a=0,l=.707106781,c=.707106781):(a=Math.sqrt(U),l=I/a,c=N/a):R>q?R<.01?(a=.707106781,l=0,c=.707106781):(l=Math.sqrt(R),a=I/l,c=B/l):q<.01?(a=.707106781,l=.707106781,c=0):(c=Math.sqrt(q),a=N/c,l=B/c),this.set(a,l,c,n),this}let L=Math.sqrt((S-y)*(S-y)+(g-T)*(g-T)+(x-v)*(x-v));return Math.abs(L)<.001&&(L=1),this.x=(S-y)/L,this.y=(g-T)/L,this.z=(x-v)/L,this.w=Math.acos((m+M+_-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this.w=Math.max(t.w,Math.min(n.w,this.w)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this.w=Math.max(t,Math.min(n,this.w)),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(t,Math.min(n,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this.w=t.w+(n.w-t.w)*a,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class S1 extends ao{constructor(t=1,n=1,a={}){super(),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=1,this.scissor=new je(0,0,t,n),this.scissorTest=!1,this.viewport=new je(0,0,t,n);const l={width:t,height:n,depth:1};a=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},a);const c=new kn(l,a.mapping,a.wrapS,a.wrapT,a.magFilter,a.minFilter,a.format,a.type,a.anisotropy,a.colorSpace);c.flipY=!1,c.generateMipmaps=a.generateMipmaps,c.internalFormat=a.internalFormat,this.textures=[];const f=a.count;for(let d=0;d<f;d++)this.textures[d]=c.clone(),this.textures[d].isRenderTargetTexture=!0;this.depthBuffer=a.depthBuffer,this.stencilBuffer=a.stencilBuffer,this.resolveDepthBuffer=a.resolveDepthBuffer,this.resolveStencilBuffer=a.resolveStencilBuffer,this.depthTexture=a.depthTexture,this.samples=a.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,n,a=1){if(this.width!==t||this.height!==n||this.depth!==a){this.width=t,this.height=n,this.depth=a;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=t,this.textures[l].image.height=n,this.textures[l].image.depth=a;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let a=0,l=t.textures.length;a<l;a++)this.textures[a]=t.textures[a].clone(),this.textures[a].isRenderTargetTexture=!0;const n=Object.assign({},t.texture.image);return this.texture.source=new T_(n),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class gi extends S1{constructor(t=1,n=1,a={}){super(t,n,a),this.isWebGLRenderTarget=!0}}class b_ extends kn{constructor(t=null,n=1,a=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:a,depth:l},this.magFilter=mi,this.minFilter=mi,this.wrapR=Gs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class y1 extends kn{constructor(t=null,n=1,a=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:a,depth:l},this.magFilter=mi,this.minFilter=mi,this.wrapR=Gs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hl{constructor(t=0,n=0,a=0,l=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=a,this._w=l}static slerpFlat(t,n,a,l,c,f,d){let p=a[l+0],m=a[l+1],v=a[l+2],g=a[l+3];const x=c[f+0],M=c[f+1],y=c[f+2],T=c[f+3];if(d===0){t[n+0]=p,t[n+1]=m,t[n+2]=v,t[n+3]=g;return}if(d===1){t[n+0]=x,t[n+1]=M,t[n+2]=y,t[n+3]=T;return}if(g!==T||p!==x||m!==M||v!==y){let S=1-d;const _=p*x+m*M+v*y+g*T,L=_>=0?1:-1,U=1-_*_;if(U>Number.EPSILON){const q=Math.sqrt(U),I=Math.atan2(q,_*L);S=Math.sin(S*I)/q,d=Math.sin(d*I)/q}const R=d*L;if(p=p*S+x*R,m=m*S+M*R,v=v*S+y*R,g=g*S+T*R,S===1-d){const q=1/Math.sqrt(p*p+m*m+v*v+g*g);p*=q,m*=q,v*=q,g*=q}}t[n]=p,t[n+1]=m,t[n+2]=v,t[n+3]=g}static multiplyQuaternionsFlat(t,n,a,l,c,f){const d=a[l],p=a[l+1],m=a[l+2],v=a[l+3],g=c[f],x=c[f+1],M=c[f+2],y=c[f+3];return t[n]=d*y+v*g+p*M-m*x,t[n+1]=p*y+v*x+m*g-d*M,t[n+2]=m*y+v*M+d*x-p*g,t[n+3]=v*y-d*g-p*x-m*M,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,a,l){return this._x=t,this._y=n,this._z=a,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const a=t._x,l=t._y,c=t._z,f=t._order,d=Math.cos,p=Math.sin,m=d(a/2),v=d(l/2),g=d(c/2),x=p(a/2),M=p(l/2),y=p(c/2);switch(f){case"XYZ":this._x=x*v*g+m*M*y,this._y=m*M*g-x*v*y,this._z=m*v*y+x*M*g,this._w=m*v*g-x*M*y;break;case"YXZ":this._x=x*v*g+m*M*y,this._y=m*M*g-x*v*y,this._z=m*v*y-x*M*g,this._w=m*v*g+x*M*y;break;case"ZXY":this._x=x*v*g-m*M*y,this._y=m*M*g+x*v*y,this._z=m*v*y+x*M*g,this._w=m*v*g-x*M*y;break;case"ZYX":this._x=x*v*g-m*M*y,this._y=m*M*g+x*v*y,this._z=m*v*y-x*M*g,this._w=m*v*g+x*M*y;break;case"YZX":this._x=x*v*g+m*M*y,this._y=m*M*g+x*v*y,this._z=m*v*y-x*M*g,this._w=m*v*g-x*M*y;break;case"XZY":this._x=x*v*g-m*M*y,this._y=m*M*g-x*v*y,this._z=m*v*y+x*M*g,this._w=m*v*g+x*M*y;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+f)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const a=n/2,l=Math.sin(a);return this._x=t.x*l,this._y=t.y*l,this._z=t.z*l,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,a=n[0],l=n[4],c=n[8],f=n[1],d=n[5],p=n[9],m=n[2],v=n[6],g=n[10],x=a+d+g;if(x>0){const M=.5/Math.sqrt(x+1);this._w=.25/M,this._x=(v-p)*M,this._y=(c-m)*M,this._z=(f-l)*M}else if(a>d&&a>g){const M=2*Math.sqrt(1+a-d-g);this._w=(v-p)/M,this._x=.25*M,this._y=(l+f)/M,this._z=(c+m)/M}else if(d>g){const M=2*Math.sqrt(1+d-a-g);this._w=(c-m)/M,this._x=(l+f)/M,this._y=.25*M,this._z=(p+v)/M}else{const M=2*Math.sqrt(1+g-a-d);this._w=(f-l)/M,this._x=(c+m)/M,this._y=(p+v)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let a=t.dot(n)+1;return a<Number.EPSILON?(a=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=a):(this._x=0,this._y=-t.z,this._z=t.y,this._w=a)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=a),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ni(this.dot(t),-1,1)))}rotateTowards(t,n){const a=this.angleTo(t);if(a===0)return this;const l=Math.min(1,n/a);return this.slerp(t,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const a=t._x,l=t._y,c=t._z,f=t._w,d=n._x,p=n._y,m=n._z,v=n._w;return this._x=a*v+f*d+l*m-c*p,this._y=l*v+f*p+c*d-a*m,this._z=c*v+f*m+a*p-l*d,this._w=f*v-a*d-l*p-c*m,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);const a=this._x,l=this._y,c=this._z,f=this._w;let d=f*t._w+a*t._x+l*t._y+c*t._z;if(d<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,d=-d):this.copy(t),d>=1)return this._w=f,this._x=a,this._y=l,this._z=c,this;const p=1-d*d;if(p<=Number.EPSILON){const M=1-n;return this._w=M*f+n*this._w,this._x=M*a+n*this._x,this._y=M*l+n*this._y,this._z=M*c+n*this._z,this.normalize(),this}const m=Math.sqrt(p),v=Math.atan2(m,d),g=Math.sin((1-n)*v)/m,x=Math.sin(n*v)/m;return this._w=f*g+this._w*x,this._x=a*g+this._x*x,this._y=l*g+this._y*x,this._z=c*g+this._z*x,this._onChangeCallback(),this}slerpQuaternions(t,n,a){return this.copy(t).slerp(n,a)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),a=Math.random(),l=Math.sqrt(1-a),c=Math.sqrt(a);return this.set(l*Math.sin(t),l*Math.cos(t),c*Math.sin(n),c*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(t=0,n=0,a=0){V.prototype.isVector3=!0,this.x=t,this.y=n,this.z=a}set(t,n,a){return a===void 0&&(a=this.z),this.x=t,this.y=n,this.z=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Xv.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Xv.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,a=this.y,l=this.z,c=t.elements;return this.x=c[0]*n+c[3]*a+c[6]*l,this.y=c[1]*n+c[4]*a+c[7]*l,this.z=c[2]*n+c[5]*a+c[8]*l,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,a=this.y,l=this.z,c=t.elements,f=1/(c[3]*n+c[7]*a+c[11]*l+c[15]);return this.x=(c[0]*n+c[4]*a+c[8]*l+c[12])*f,this.y=(c[1]*n+c[5]*a+c[9]*l+c[13])*f,this.z=(c[2]*n+c[6]*a+c[10]*l+c[14])*f,this}applyQuaternion(t){const n=this.x,a=this.y,l=this.z,c=t.x,f=t.y,d=t.z,p=t.w,m=2*(f*l-d*a),v=2*(d*n-c*l),g=2*(c*a-f*n);return this.x=n+p*m+f*g-d*v,this.y=a+p*v+d*m-c*g,this.z=l+p*g+c*v-f*m,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,a=this.y,l=this.z,c=t.elements;return this.x=c[0]*n+c[4]*a+c[8]*l,this.y=c[1]*n+c[5]*a+c[9]*l,this.z=c[2]*n+c[6]*a+c[10]*l,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this}clampLength(t,n){const a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(t,Math.min(n,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,a){return this.x=t.x+(n.x-t.x)*a,this.y=t.y+(n.y-t.y)*a,this.z=t.z+(n.z-t.z)*a,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const a=t.x,l=t.y,c=t.z,f=n.x,d=n.y,p=n.z;return this.x=l*p-c*d,this.y=c*f-a*p,this.z=a*d-l*f,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const a=t.dot(this)/n;return this.copy(t).multiplyScalar(a)}projectOnPlane(t){return Wh.copy(this).projectOnVector(t),this.sub(Wh)}reflect(t){return this.sub(Wh.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const a=this.dot(t)/n;return Math.acos(ni(a,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,a=this.y-t.y,l=this.z-t.z;return n*n+a*a+l*l}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,a){const l=Math.sin(n)*t;return this.x=l*Math.sin(a),this.y=Math.cos(n)*t,this.z=l*Math.cos(a),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,a){return this.x=t*Math.sin(n),this.y=a,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),a=this.setFromMatrixColumn(t,1).length(),l=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=a,this.z=l,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,a=Math.sqrt(1-n*n);return this.x=a*Math.cos(t),this.y=n,this.z=a*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Wh=new V,Xv=new hl;class dl{constructor(t=new V(1/0,1/0,1/0),n=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n+=3)this.expandByPoint(Fi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,a=t.count;n<a;n++)this.expandByPoint(Fi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,a=t.length;n<a;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const a=Fi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(a),this.max.copy(t).add(a),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const a=t.geometry;if(a!==void 0){const c=a.getAttribute("position");if(n===!0&&c!==void 0&&t.isInstancedMesh!==!0)for(let f=0,d=c.count;f<d;f++)t.isMesh===!0?t.getVertexPosition(f,Fi):Fi.fromBufferAttribute(c,f),Fi.applyMatrix4(t.matrixWorld),this.expandByPoint(Fi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ac.copy(t.boundingBox)):(a.boundingBox===null&&a.computeBoundingBox(),Ac.copy(a.boundingBox)),Ac.applyMatrix4(t.matrixWorld),this.union(Ac)}const l=t.children;for(let c=0,f=l.length;c<f;c++)this.expandByObject(l[c],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Fi),Fi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,a;return t.normal.x>0?(n=t.normal.x*this.min.x,a=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,a=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,a+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,a+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,a+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,a+=t.normal.z*this.min.z),n<=-t.constant&&a>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(el),wc.subVectors(this.max,el),Cr.subVectors(t.a,el),Dr.subVectors(t.b,el),Lr.subVectors(t.c,el),is.subVectors(Dr,Cr),as.subVectors(Lr,Dr),Ls.subVectors(Cr,Lr);let n=[0,-is.z,is.y,0,-as.z,as.y,0,-Ls.z,Ls.y,is.z,0,-is.x,as.z,0,-as.x,Ls.z,0,-Ls.x,-is.y,is.x,0,-as.y,as.x,0,-Ls.y,Ls.x,0];return!qh(n,Cr,Dr,Lr,wc)||(n=[1,0,0,0,1,0,0,0,1],!qh(n,Cr,Dr,Lr,wc))?!1:(Rc.crossVectors(is,as),n=[Rc.x,Rc.y,Rc.z],qh(n,Cr,Dr,Lr,wc))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Fi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Fi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(xa[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),xa[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),xa[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),xa[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),xa[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),xa[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),xa[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),xa[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(xa),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const xa=[new V,new V,new V,new V,new V,new V,new V,new V],Fi=new V,Ac=new dl,Cr=new V,Dr=new V,Lr=new V,is=new V,as=new V,Ls=new V,el=new V,wc=new V,Rc=new V,Us=new V;function qh(r,t,n,a,l){for(let c=0,f=r.length-3;c<=f;c+=3){Us.fromArray(r,c);const d=l.x*Math.abs(Us.x)+l.y*Math.abs(Us.y)+l.z*Math.abs(Us.z),p=t.dot(Us),m=n.dot(Us),v=a.dot(Us);if(Math.max(-Math.max(p,m,v),Math.min(p,m,v))>d)return!1}return!0}const E1=new dl,nl=new V,jh=new V;class pl{constructor(t=new V,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const a=this.center;n!==void 0?a.copy(n):E1.setFromPoints(t).getCenter(a);let l=0;for(let c=0,f=t.length;c<f;c++)l=Math.max(l,a.distanceToSquared(t[c]));return this.radius=Math.sqrt(l),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const a=this.center.distanceToSquared(t);return n.copy(t),a>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;nl.subVectors(t,this.center);const n=nl.lengthSq();if(n>this.radius*this.radius){const a=Math.sqrt(n),l=(a-this.radius)*.5;this.center.addScaledVector(nl,l/a),this.radius+=l}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(jh.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(nl.copy(t.center).add(jh)),this.expandByPoint(nl.copy(t.center).sub(jh))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const _a=new V,Yh=new V,Cc=new V,ss=new V,Zh=new V,Dc=new V,Kh=new V;class yp{constructor(t=new V,n=new V(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,_a)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const a=n.dot(this.direction);return a<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,a)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=_a.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(_a.copy(this.origin).addScaledVector(this.direction,n),_a.distanceToSquared(t))}distanceSqToSegment(t,n,a,l){Yh.copy(t).add(n).multiplyScalar(.5),Cc.copy(n).sub(t).normalize(),ss.copy(this.origin).sub(Yh);const c=t.distanceTo(n)*.5,f=-this.direction.dot(Cc),d=ss.dot(this.direction),p=-ss.dot(Cc),m=ss.lengthSq(),v=Math.abs(1-f*f);let g,x,M,y;if(v>0)if(g=f*p-d,x=f*d-p,y=c*v,g>=0)if(x>=-y)if(x<=y){const T=1/v;g*=T,x*=T,M=g*(g+f*x+2*d)+x*(f*g+x+2*p)+m}else x=c,g=Math.max(0,-(f*x+d)),M=-g*g+x*(x+2*p)+m;else x=-c,g=Math.max(0,-(f*x+d)),M=-g*g+x*(x+2*p)+m;else x<=-y?(g=Math.max(0,-(-f*c+d)),x=g>0?-c:Math.min(Math.max(-c,-p),c),M=-g*g+x*(x+2*p)+m):x<=y?(g=0,x=Math.min(Math.max(-c,-p),c),M=x*(x+2*p)+m):(g=Math.max(0,-(f*c+d)),x=g>0?c:Math.min(Math.max(-c,-p),c),M=-g*g+x*(x+2*p)+m);else x=f>0?-c:c,g=Math.max(0,-(f*x+d)),M=-g*g+x*(x+2*p)+m;return a&&a.copy(this.origin).addScaledVector(this.direction,g),l&&l.copy(Yh).addScaledVector(Cc,x),M}intersectSphere(t,n){_a.subVectors(t.center,this.origin);const a=_a.dot(this.direction),l=_a.dot(_a)-a*a,c=t.radius*t.radius;if(l>c)return null;const f=Math.sqrt(c-l),d=a-f,p=a+f;return p<0?null:d<0?this.at(p,n):this.at(d,n)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const a=-(this.origin.dot(t.normal)+t.constant)/n;return a>=0?a:null}intersectPlane(t,n){const a=this.distanceToPlane(t);return a===null?null:this.at(a,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let a,l,c,f,d,p;const m=1/this.direction.x,v=1/this.direction.y,g=1/this.direction.z,x=this.origin;return m>=0?(a=(t.min.x-x.x)*m,l=(t.max.x-x.x)*m):(a=(t.max.x-x.x)*m,l=(t.min.x-x.x)*m),v>=0?(c=(t.min.y-x.y)*v,f=(t.max.y-x.y)*v):(c=(t.max.y-x.y)*v,f=(t.min.y-x.y)*v),a>f||c>l||((c>a||isNaN(a))&&(a=c),(f<l||isNaN(l))&&(l=f),g>=0?(d=(t.min.z-x.z)*g,p=(t.max.z-x.z)*g):(d=(t.max.z-x.z)*g,p=(t.min.z-x.z)*g),a>p||d>l)||((d>a||a!==a)&&(a=d),(p<l||l!==l)&&(l=p),l<0)?null:this.at(a>=0?a:l,n)}intersectsBox(t){return this.intersectBox(t,_a)!==null}intersectTriangle(t,n,a,l,c){Zh.subVectors(n,t),Dc.subVectors(a,t),Kh.crossVectors(Zh,Dc);let f=this.direction.dot(Kh),d;if(f>0){if(l)return null;d=1}else if(f<0)d=-1,f=-f;else return null;ss.subVectors(this.origin,t);const p=d*this.direction.dot(Dc.crossVectors(ss,Dc));if(p<0)return null;const m=d*this.direction.dot(Zh.cross(ss));if(m<0||p+m>f)return null;const v=-d*ss.dot(Kh);return v<0?null:this.at(v/f,c)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Je{constructor(t,n,a,l,c,f,d,p,m,v,g,x,M,y,T,S){Je.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,a,l,c,f,d,p,m,v,g,x,M,y,T,S)}set(t,n,a,l,c,f,d,p,m,v,g,x,M,y,T,S){const _=this.elements;return _[0]=t,_[4]=n,_[8]=a,_[12]=l,_[1]=c,_[5]=f,_[9]=d,_[13]=p,_[2]=m,_[6]=v,_[10]=g,_[14]=x,_[3]=M,_[7]=y,_[11]=T,_[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Je().fromArray(this.elements)}copy(t){const n=this.elements,a=t.elements;return n[0]=a[0],n[1]=a[1],n[2]=a[2],n[3]=a[3],n[4]=a[4],n[5]=a[5],n[6]=a[6],n[7]=a[7],n[8]=a[8],n[9]=a[9],n[10]=a[10],n[11]=a[11],n[12]=a[12],n[13]=a[13],n[14]=a[14],n[15]=a[15],this}copyPosition(t){const n=this.elements,a=t.elements;return n[12]=a[12],n[13]=a[13],n[14]=a[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,a){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this}makeBasis(t,n,a){return this.set(t.x,n.x,a.x,0,t.y,n.y,a.y,0,t.z,n.z,a.z,0,0,0,0,1),this}extractRotation(t){const n=this.elements,a=t.elements,l=1/Ur.setFromMatrixColumn(t,0).length(),c=1/Ur.setFromMatrixColumn(t,1).length(),f=1/Ur.setFromMatrixColumn(t,2).length();return n[0]=a[0]*l,n[1]=a[1]*l,n[2]=a[2]*l,n[3]=0,n[4]=a[4]*c,n[5]=a[5]*c,n[6]=a[6]*c,n[7]=0,n[8]=a[8]*f,n[9]=a[9]*f,n[10]=a[10]*f,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,a=t.x,l=t.y,c=t.z,f=Math.cos(a),d=Math.sin(a),p=Math.cos(l),m=Math.sin(l),v=Math.cos(c),g=Math.sin(c);if(t.order==="XYZ"){const x=f*v,M=f*g,y=d*v,T=d*g;n[0]=p*v,n[4]=-p*g,n[8]=m,n[1]=M+y*m,n[5]=x-T*m,n[9]=-d*p,n[2]=T-x*m,n[6]=y+M*m,n[10]=f*p}else if(t.order==="YXZ"){const x=p*v,M=p*g,y=m*v,T=m*g;n[0]=x+T*d,n[4]=y*d-M,n[8]=f*m,n[1]=f*g,n[5]=f*v,n[9]=-d,n[2]=M*d-y,n[6]=T+x*d,n[10]=f*p}else if(t.order==="ZXY"){const x=p*v,M=p*g,y=m*v,T=m*g;n[0]=x-T*d,n[4]=-f*g,n[8]=y+M*d,n[1]=M+y*d,n[5]=f*v,n[9]=T-x*d,n[2]=-f*m,n[6]=d,n[10]=f*p}else if(t.order==="ZYX"){const x=f*v,M=f*g,y=d*v,T=d*g;n[0]=p*v,n[4]=y*m-M,n[8]=x*m+T,n[1]=p*g,n[5]=T*m+x,n[9]=M*m-y,n[2]=-m,n[6]=d*p,n[10]=f*p}else if(t.order==="YZX"){const x=f*p,M=f*m,y=d*p,T=d*m;n[0]=p*v,n[4]=T-x*g,n[8]=y*g+M,n[1]=g,n[5]=f*v,n[9]=-d*v,n[2]=-m*v,n[6]=M*g+y,n[10]=x-T*g}else if(t.order==="XZY"){const x=f*p,M=f*m,y=d*p,T=d*m;n[0]=p*v,n[4]=-g,n[8]=m*v,n[1]=x*g+T,n[5]=f*v,n[9]=M*g-y,n[2]=y*g-M,n[6]=d*v,n[10]=T*g+x}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(T1,t,b1)}lookAt(t,n,a){const l=this.elements;return fi.subVectors(t,n),fi.lengthSq()===0&&(fi.z=1),fi.normalize(),rs.crossVectors(a,fi),rs.lengthSq()===0&&(Math.abs(a.z)===1?fi.x+=1e-4:fi.z+=1e-4,fi.normalize(),rs.crossVectors(a,fi)),rs.normalize(),Lc.crossVectors(fi,rs),l[0]=rs.x,l[4]=Lc.x,l[8]=fi.x,l[1]=rs.y,l[5]=Lc.y,l[9]=fi.y,l[2]=rs.z,l[6]=Lc.z,l[10]=fi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const a=t.elements,l=n.elements,c=this.elements,f=a[0],d=a[4],p=a[8],m=a[12],v=a[1],g=a[5],x=a[9],M=a[13],y=a[2],T=a[6],S=a[10],_=a[14],L=a[3],U=a[7],R=a[11],q=a[15],I=l[0],N=l[4],B=l[8],C=l[12],b=l[1],H=l[5],tt=l[9],st=l[13],ht=l[2],mt=l[6],z=l[10],Q=l[14],K=l[3],St=l[7],Tt=l[11],P=l[15];return c[0]=f*I+d*b+p*ht+m*K,c[4]=f*N+d*H+p*mt+m*St,c[8]=f*B+d*tt+p*z+m*Tt,c[12]=f*C+d*st+p*Q+m*P,c[1]=v*I+g*b+x*ht+M*K,c[5]=v*N+g*H+x*mt+M*St,c[9]=v*B+g*tt+x*z+M*Tt,c[13]=v*C+g*st+x*Q+M*P,c[2]=y*I+T*b+S*ht+_*K,c[6]=y*N+T*H+S*mt+_*St,c[10]=y*B+T*tt+S*z+_*Tt,c[14]=y*C+T*st+S*Q+_*P,c[3]=L*I+U*b+R*ht+q*K,c[7]=L*N+U*H+R*mt+q*St,c[11]=L*B+U*tt+R*z+q*Tt,c[15]=L*C+U*st+R*Q+q*P,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],a=t[4],l=t[8],c=t[12],f=t[1],d=t[5],p=t[9],m=t[13],v=t[2],g=t[6],x=t[10],M=t[14],y=t[3],T=t[7],S=t[11],_=t[15];return y*(+c*p*g-l*m*g-c*d*x+a*m*x+l*d*M-a*p*M)+T*(+n*p*M-n*m*x+c*f*x-l*f*M+l*m*v-c*p*v)+S*(+n*m*g-n*d*M-c*f*g+a*f*M+c*d*v-a*m*v)+_*(-l*d*v-n*p*g+n*d*x+l*f*g-a*f*x+a*p*v)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,a){const l=this.elements;return t.isVector3?(l[12]=t.x,l[13]=t.y,l[14]=t.z):(l[12]=t,l[13]=n,l[14]=a),this}invert(){const t=this.elements,n=t[0],a=t[1],l=t[2],c=t[3],f=t[4],d=t[5],p=t[6],m=t[7],v=t[8],g=t[9],x=t[10],M=t[11],y=t[12],T=t[13],S=t[14],_=t[15],L=g*S*m-T*x*m+T*p*M-d*S*M-g*p*_+d*x*_,U=y*x*m-v*S*m-y*p*M+f*S*M+v*p*_-f*x*_,R=v*T*m-y*g*m+y*d*M-f*T*M-v*d*_+f*g*_,q=y*g*p-v*T*p-y*d*x+f*T*x+v*d*S-f*g*S,I=n*L+a*U+l*R+c*q;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/I;return t[0]=L*N,t[1]=(T*x*c-g*S*c-T*l*M+a*S*M+g*l*_-a*x*_)*N,t[2]=(d*S*c-T*p*c+T*l*m-a*S*m-d*l*_+a*p*_)*N,t[3]=(g*p*c-d*x*c-g*l*m+a*x*m+d*l*M-a*p*M)*N,t[4]=U*N,t[5]=(v*S*c-y*x*c+y*l*M-n*S*M-v*l*_+n*x*_)*N,t[6]=(y*p*c-f*S*c-y*l*m+n*S*m+f*l*_-n*p*_)*N,t[7]=(f*x*c-v*p*c+v*l*m-n*x*m-f*l*M+n*p*M)*N,t[8]=R*N,t[9]=(y*g*c-v*T*c-y*a*M+n*T*M+v*a*_-n*g*_)*N,t[10]=(f*T*c-y*d*c+y*a*m-n*T*m-f*a*_+n*d*_)*N,t[11]=(v*d*c-f*g*c-v*a*m+n*g*m+f*a*M-n*d*M)*N,t[12]=q*N,t[13]=(v*T*l-y*g*l+y*a*x-n*T*x-v*a*S+n*g*S)*N,t[14]=(y*d*l-f*T*l-y*a*p+n*T*p+f*a*S-n*d*S)*N,t[15]=(f*g*l-v*d*l+v*a*p-n*g*p-f*a*x+n*d*x)*N,this}scale(t){const n=this.elements,a=t.x,l=t.y,c=t.z;return n[0]*=a,n[4]*=l,n[8]*=c,n[1]*=a,n[5]*=l,n[9]*=c,n[2]*=a,n[6]*=l,n[10]*=c,n[3]*=a,n[7]*=l,n[11]*=c,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],a=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],l=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,a,l))}makeTranslation(t,n,a){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,a,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),a=Math.sin(t);return this.set(1,0,0,0,0,n,-a,0,0,a,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,0,a,0,0,1,0,0,-a,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),a=Math.sin(t);return this.set(n,-a,0,0,a,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const a=Math.cos(n),l=Math.sin(n),c=1-a,f=t.x,d=t.y,p=t.z,m=c*f,v=c*d;return this.set(m*f+a,m*d-l*p,m*p+l*d,0,m*d+l*p,v*d+a,v*p-l*f,0,m*p-l*d,v*p+l*f,c*p*p+a,0,0,0,0,1),this}makeScale(t,n,a){return this.set(t,0,0,0,0,n,0,0,0,0,a,0,0,0,0,1),this}makeShear(t,n,a,l,c,f){return this.set(1,a,c,0,t,1,f,0,n,l,1,0,0,0,0,1),this}compose(t,n,a){const l=this.elements,c=n._x,f=n._y,d=n._z,p=n._w,m=c+c,v=f+f,g=d+d,x=c*m,M=c*v,y=c*g,T=f*v,S=f*g,_=d*g,L=p*m,U=p*v,R=p*g,q=a.x,I=a.y,N=a.z;return l[0]=(1-(T+_))*q,l[1]=(M+R)*q,l[2]=(y-U)*q,l[3]=0,l[4]=(M-R)*I,l[5]=(1-(x+_))*I,l[6]=(S+L)*I,l[7]=0,l[8]=(y+U)*N,l[9]=(S-L)*N,l[10]=(1-(x+T))*N,l[11]=0,l[12]=t.x,l[13]=t.y,l[14]=t.z,l[15]=1,this}decompose(t,n,a){const l=this.elements;let c=Ur.set(l[0],l[1],l[2]).length();const f=Ur.set(l[4],l[5],l[6]).length(),d=Ur.set(l[8],l[9],l[10]).length();this.determinant()<0&&(c=-c),t.x=l[12],t.y=l[13],t.z=l[14],Hi.copy(this);const m=1/c,v=1/f,g=1/d;return Hi.elements[0]*=m,Hi.elements[1]*=m,Hi.elements[2]*=m,Hi.elements[4]*=v,Hi.elements[5]*=v,Hi.elements[6]*=v,Hi.elements[8]*=g,Hi.elements[9]*=g,Hi.elements[10]*=g,n.setFromRotationMatrix(Hi),a.x=c,a.y=f,a.z=d,this}makePerspective(t,n,a,l,c,f,d=wa){const p=this.elements,m=2*c/(n-t),v=2*c/(a-l),g=(n+t)/(n-t),x=(a+l)/(a-l);let M,y;if(d===wa)M=-(f+c)/(f-c),y=-2*f*c/(f-c);else if(d===du)M=-f/(f-c),y=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return p[0]=m,p[4]=0,p[8]=g,p[12]=0,p[1]=0,p[5]=v,p[9]=x,p[13]=0,p[2]=0,p[6]=0,p[10]=M,p[14]=y,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(t,n,a,l,c,f,d=wa){const p=this.elements,m=1/(n-t),v=1/(a-l),g=1/(f-c),x=(n+t)*m,M=(a+l)*v;let y,T;if(d===wa)y=(f+c)*g,T=-2*g;else if(d===du)y=c*g,T=-1*g;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return p[0]=2*m,p[4]=0,p[8]=0,p[12]=-x,p[1]=0,p[5]=2*v,p[9]=0,p[13]=-M,p[2]=0,p[6]=0,p[10]=T,p[14]=-y,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(t){const n=this.elements,a=t.elements;for(let l=0;l<16;l++)if(n[l]!==a[l])return!1;return!0}fromArray(t,n=0){for(let a=0;a<16;a++)this.elements[a]=t[a+n];return this}toArray(t=[],n=0){const a=this.elements;return t[n]=a[0],t[n+1]=a[1],t[n+2]=a[2],t[n+3]=a[3],t[n+4]=a[4],t[n+5]=a[5],t[n+6]=a[6],t[n+7]=a[7],t[n+8]=a[8],t[n+9]=a[9],t[n+10]=a[10],t[n+11]=a[11],t[n+12]=a[12],t[n+13]=a[13],t[n+14]=a[14],t[n+15]=a[15],t}}const Ur=new V,Hi=new Je,T1=new V(0,0,0),b1=new V(1,1,1),rs=new V,Lc=new V,fi=new V,Wv=new Je,qv=new hl;class Ji{constructor(t=0,n=0,a=0,l=Ji.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=a,this._order=l}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,a,l=this._order){return this._x=t,this._y=n,this._z=a,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,a=!0){const l=t.elements,c=l[0],f=l[4],d=l[8],p=l[1],m=l[5],v=l[9],g=l[2],x=l[6],M=l[10];switch(n){case"XYZ":this._y=Math.asin(ni(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-v,M),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(x,m),this._z=0);break;case"YXZ":this._x=Math.asin(-ni(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(d,M),this._z=Math.atan2(p,m)):(this._y=Math.atan2(-g,c),this._z=0);break;case"ZXY":this._x=Math.asin(ni(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-g,M),this._z=Math.atan2(-f,m)):(this._y=0,this._z=Math.atan2(p,c));break;case"ZYX":this._y=Math.asin(-ni(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(x,M),this._z=Math.atan2(p,c)):(this._x=0,this._z=Math.atan2(-f,m));break;case"YZX":this._z=Math.asin(ni(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-v,m),this._y=Math.atan2(-g,c)):(this._x=0,this._y=Math.atan2(d,M));break;case"XZY":this._z=Math.asin(-ni(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(x,m),this._y=Math.atan2(d,c)):(this._x=Math.atan2(-v,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,a===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,a){return Wv.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Wv,n,a)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return qv.setFromEuler(this),this.setFromQuaternion(qv,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ji.DEFAULT_ORDER="XYZ";class A_{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let A1=0;const jv=new V,Nr=new hl,Ma=new Je,Uc=new V,il=new V,w1=new V,R1=new hl,Yv=new V(1,0,0),Zv=new V(0,1,0),Kv=new V(0,0,1),Qv={type:"added"},C1={type:"removed"},Or={type:"childadded",child:null},Qh={type:"childremoved",child:null};class wn extends ao{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:A1++}),this.uuid=fl(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=wn.DEFAULT_UP.clone();const t=new V,n=new Ji,a=new hl,l=new V(1,1,1);function c(){a.setFromEuler(n,!1)}function f(){n.setFromQuaternion(a,void 0,!1)}n._onChange(c),a._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new Je},normalMatrix:{value:new he}}),this.matrix=new Je,this.matrixWorld=new Je,this.matrixAutoUpdate=wn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new A_,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Nr.setFromAxisAngle(t,n),this.quaternion.multiply(Nr),this}rotateOnWorldAxis(t,n){return Nr.setFromAxisAngle(t,n),this.quaternion.premultiply(Nr),this}rotateX(t){return this.rotateOnAxis(Yv,t)}rotateY(t){return this.rotateOnAxis(Zv,t)}rotateZ(t){return this.rotateOnAxis(Kv,t)}translateOnAxis(t,n){return jv.copy(t).applyQuaternion(this.quaternion),this.position.add(jv.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(Yv,t)}translateY(t){return this.translateOnAxis(Zv,t)}translateZ(t){return this.translateOnAxis(Kv,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ma.copy(this.matrixWorld).invert())}lookAt(t,n,a){t.isVector3?Uc.copy(t):Uc.set(t,n,a);const l=this.parent;this.updateWorldMatrix(!0,!1),il.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ma.lookAt(il,Uc,this.up):Ma.lookAt(Uc,il,this.up),this.quaternion.setFromRotationMatrix(Ma),l&&(Ma.extractRotation(l.matrixWorld),Nr.setFromRotationMatrix(Ma),this.quaternion.premultiply(Nr.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Qv),Or.child=t,this.dispatchEvent(Or),Or.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(C1),Qh.child=t,this.dispatchEvent(Qh),Qh.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ma.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ma.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ma),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Qv),Or.child=t,this.dispatchEvent(Or),Or.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let a=0,l=this.children.length;a<l;a++){const f=this.children[a].getObjectByProperty(t,n);if(f!==void 0)return f}}getObjectsByProperty(t,n,a=[]){this[t]===n&&a.push(this);const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].getObjectsByProperty(t,n,a);return a}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(il,t,w1),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(il,R1,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let a=0,l=n.length;a<l;a++)n[a].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let a=0,l=n.length;a<l;a++)n[a].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let a=0,l=n.length;a<l;a++)n[a].updateMatrixWorld(t)}updateWorldMatrix(t,n){const a=this.parent;if(t===!0&&a!==null&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",a={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},a.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.visibility=this._visibility,l.active=this._active,l.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.geometryCount=this._geometryCount,l.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(l.boundingSphere={center:l.boundingSphere.center.toArray(),radius:l.boundingSphere.radius}),this.boundingBox!==null&&(l.boundingBox={min:l.boundingBox.min.toArray(),max:l.boundingBox.max.toArray()}));function c(d,p){return d[p.uuid]===void 0&&(d[p.uuid]=p.toJSON(t)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(t.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const p=d.shapes;if(Array.isArray(p))for(let m=0,v=p.length;m<v;m++){const g=p[m];c(t.shapes,g)}else c(t.shapes,p)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(t.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let p=0,m=this.material.length;p<m;p++)d.push(c(t.materials,this.material[p]));l.material=d}else l.material=c(t.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(t).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const p=this.animations[d];l.animations.push(c(t.animations,p))}}if(n){const d=f(t.geometries),p=f(t.materials),m=f(t.textures),v=f(t.images),g=f(t.shapes),x=f(t.skeletons),M=f(t.animations),y=f(t.nodes);d.length>0&&(a.geometries=d),p.length>0&&(a.materials=p),m.length>0&&(a.textures=m),v.length>0&&(a.images=v),g.length>0&&(a.shapes=g),x.length>0&&(a.skeletons=x),M.length>0&&(a.animations=M),y.length>0&&(a.nodes=y)}return a.object=l,a;function f(d){const p=[];for(const m in d){const v=d[m];delete v.metadata,p.push(v)}return p}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let a=0;a<t.children.length;a++){const l=t.children[a];this.add(l.clone())}return this}}wn.DEFAULT_UP=new V(0,1,0);wn.DEFAULT_MATRIX_AUTO_UPDATE=!0;wn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Gi=new V,Sa=new V,Jh=new V,ya=new V,Pr=new V,zr=new V,Jv=new V,$h=new V,td=new V,ed=new V,nd=new je,id=new je,ad=new je;class Ui{constructor(t=new V,n=new V,a=new V){this.a=t,this.b=n,this.c=a}static getNormal(t,n,a,l){l.subVectors(a,n),Gi.subVectors(t,n),l.cross(Gi);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(t,n,a,l,c){Gi.subVectors(l,n),Sa.subVectors(a,n),Jh.subVectors(t,n);const f=Gi.dot(Gi),d=Gi.dot(Sa),p=Gi.dot(Jh),m=Sa.dot(Sa),v=Sa.dot(Jh),g=f*m-d*d;if(g===0)return c.set(0,0,0),null;const x=1/g,M=(m*p-d*v)*x,y=(f*v-d*p)*x;return c.set(1-M-y,y,M)}static containsPoint(t,n,a,l){return this.getBarycoord(t,n,a,l,ya)===null?!1:ya.x>=0&&ya.y>=0&&ya.x+ya.y<=1}static getInterpolation(t,n,a,l,c,f,d,p){return this.getBarycoord(t,n,a,l,ya)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(c,ya.x),p.addScaledVector(f,ya.y),p.addScaledVector(d,ya.z),p)}static getInterpolatedAttribute(t,n,a,l,c,f){return nd.setScalar(0),id.setScalar(0),ad.setScalar(0),nd.fromBufferAttribute(t,n),id.fromBufferAttribute(t,a),ad.fromBufferAttribute(t,l),f.setScalar(0),f.addScaledVector(nd,c.x),f.addScaledVector(id,c.y),f.addScaledVector(ad,c.z),f}static isFrontFacing(t,n,a,l){return Gi.subVectors(a,n),Sa.subVectors(t,n),Gi.cross(Sa).dot(l)<0}set(t,n,a){return this.a.copy(t),this.b.copy(n),this.c.copy(a),this}setFromPointsAndIndices(t,n,a,l){return this.a.copy(t[n]),this.b.copy(t[a]),this.c.copy(t[l]),this}setFromAttributeAndIndices(t,n,a,l){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,a),this.c.fromBufferAttribute(t,l),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Gi.subVectors(this.c,this.b),Sa.subVectors(this.a,this.b),Gi.cross(Sa).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ui.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return Ui.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,a,l,c){return Ui.getInterpolation(t,this.a,this.b,this.c,n,a,l,c)}containsPoint(t){return Ui.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ui.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const a=this.a,l=this.b,c=this.c;let f,d;Pr.subVectors(l,a),zr.subVectors(c,a),$h.subVectors(t,a);const p=Pr.dot($h),m=zr.dot($h);if(p<=0&&m<=0)return n.copy(a);td.subVectors(t,l);const v=Pr.dot(td),g=zr.dot(td);if(v>=0&&g<=v)return n.copy(l);const x=p*g-v*m;if(x<=0&&p>=0&&v<=0)return f=p/(p-v),n.copy(a).addScaledVector(Pr,f);ed.subVectors(t,c);const M=Pr.dot(ed),y=zr.dot(ed);if(y>=0&&M<=y)return n.copy(c);const T=M*m-p*y;if(T<=0&&m>=0&&y<=0)return d=m/(m-y),n.copy(a).addScaledVector(zr,d);const S=v*y-M*g;if(S<=0&&g-v>=0&&M-y>=0)return Jv.subVectors(c,l),d=(g-v)/(g-v+(M-y)),n.copy(l).addScaledVector(Jv,d);const _=1/(S+T+x);return f=T*_,d=x*_,n.copy(a).addScaledVector(Pr,f).addScaledVector(zr,d)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const w_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},os={h:0,s:0,l:0},Nc={h:0,s:0,l:0};function sd(r,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?r+(t-r)*6*n:n<1/2?t:n<2/3?r+(t-r)*6*(2/3-n):r}class te{constructor(t,n,a){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,a)}set(t,n,a){if(n===void 0&&a===void 0){const l=t;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(t,n,a);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=Di){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Re.toWorkingColorSpace(this,n),this}setRGB(t,n,a,l=Re.workingColorSpace){return this.r=t,this.g=n,this.b=a,Re.toWorkingColorSpace(this,l),this}setHSL(t,n,a,l=Re.workingColorSpace){if(t=d1(t,1),n=ni(n,0,1),a=ni(a,0,1),n===0)this.r=this.g=this.b=a;else{const c=a<=.5?a*(1+n):a+n-a*n,f=2*a-c;this.r=sd(f,c,t+1/3),this.g=sd(f,c,t),this.b=sd(f,c,t-1/3)}return Re.toWorkingColorSpace(this,l),this}setStyle(t,n=Di){function a(c){c!==void 0&&parseFloat(c)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(t)){let c;const f=l[1],d=l[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return a(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,n);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return a(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,n);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return a(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){const c=l[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,n);if(f===6)return this.setHex(parseInt(c,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=Di){const a=w_[t.toLowerCase()];return a!==void 0?this.setHex(a,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ca(t.r),this.g=Ca(t.g),this.b=Ca(t.b),this}copyLinearToSRGB(t){return this.r=Zr(t.r),this.g=Zr(t.g),this.b=Zr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Di){return Re.fromWorkingColorSpace(Vn.copy(this),t),Math.round(ni(Vn.r*255,0,255))*65536+Math.round(ni(Vn.g*255,0,255))*256+Math.round(ni(Vn.b*255,0,255))}getHexString(t=Di){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Re.workingColorSpace){Re.fromWorkingColorSpace(Vn.copy(this),n);const a=Vn.r,l=Vn.g,c=Vn.b,f=Math.max(a,l,c),d=Math.min(a,l,c);let p,m;const v=(d+f)/2;if(d===f)p=0,m=0;else{const g=f-d;switch(m=v<=.5?g/(f+d):g/(2-f-d),f){case a:p=(l-c)/g+(l<c?6:0);break;case l:p=(c-a)/g+2;break;case c:p=(a-l)/g+4;break}p/=6}return t.h=p,t.s=m,t.l=v,t}getRGB(t,n=Re.workingColorSpace){return Re.fromWorkingColorSpace(Vn.copy(this),n),t.r=Vn.r,t.g=Vn.g,t.b=Vn.b,t}getStyle(t=Di){Re.fromWorkingColorSpace(Vn.copy(this),t);const n=Vn.r,a=Vn.g,l=Vn.b;return t!==Di?`color(${t} ${n.toFixed(3)} ${a.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(a*255)},${Math.round(l*255)})`}offsetHSL(t,n,a){return this.getHSL(os),this.setHSL(os.h+t,os.s+n,os.l+a)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,a){return this.r=t.r+(n.r-t.r)*a,this.g=t.g+(n.g-t.g)*a,this.b=t.b+(n.b-t.b)*a,this}lerpHSL(t,n){this.getHSL(os),t.getHSL(Nc);const a=Vh(os.h,Nc.h,n),l=Vh(os.s,Nc.s,n),c=Vh(os.l,Nc.l,n);return this.setHSL(a,l,c),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,a=this.g,l=this.b,c=t.elements;return this.r=c[0]*n+c[3]*a+c[6]*l,this.g=c[1]*n+c[4]*a+c[7]*l,this.b=c[2]*n+c[5]*a+c[8]*l,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Vn=new te;te.NAMES=w_;let D1=0;class Ws extends ao{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:D1++}),this.uuid=fl(),this.name="",this.blending=qr,this.side=hs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Td,this.blendDst=bd,this.blendEquation=Fs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new te(0,0,0),this.blendAlpha=0,this.depthFunc=Kr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Pv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wr,this.stencilZFail=wr,this.stencilZPass=wr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const a=t[n];if(a===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const l=this[n];if(l===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(a):l&&l.isVector3&&a&&a.isVector3?l.copy(a):this[n]=a}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const a={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.color&&this.color.isColor&&(a.color=this.color.getHex()),this.roughness!==void 0&&(a.roughness=this.roughness),this.metalness!==void 0&&(a.metalness=this.metalness),this.sheen!==void 0&&(a.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(a.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(a.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(a.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(a.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(a.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(a.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(a.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(a.shininess=this.shininess),this.clearcoat!==void 0&&(a.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(a.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(a.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(a.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(a.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,a.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(a.dispersion=this.dispersion),this.iridescence!==void 0&&(a.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(a.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(a.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(a.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(a.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(a.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(a.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(a.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(a.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(a.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(a.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(a.lightMap=this.lightMap.toJSON(t).uuid,a.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(a.aoMap=this.aoMap.toJSON(t).uuid,a.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(a.bumpMap=this.bumpMap.toJSON(t).uuid,a.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(a.normalMap=this.normalMap.toJSON(t).uuid,a.normalMapType=this.normalMapType,a.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(a.displacementMap=this.displacementMap.toJSON(t).uuid,a.displacementScale=this.displacementScale,a.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(a.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(a.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(a.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(a.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(a.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(a.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(a.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(a.combine=this.combine)),this.envMapRotation!==void 0&&(a.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(a.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(a.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(a.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(a.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(a.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(a.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(a.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(a.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(a.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(a.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(a.size=this.size),this.shadowSide!==null&&(a.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(a.sizeAttenuation=this.sizeAttenuation),this.blending!==qr&&(a.blending=this.blending),this.side!==hs&&(a.side=this.side),this.vertexColors===!0&&(a.vertexColors=!0),this.opacity<1&&(a.opacity=this.opacity),this.transparent===!0&&(a.transparent=!0),this.blendSrc!==Td&&(a.blendSrc=this.blendSrc),this.blendDst!==bd&&(a.blendDst=this.blendDst),this.blendEquation!==Fs&&(a.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(a.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(a.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(a.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(a.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(a.blendAlpha=this.blendAlpha),this.depthFunc!==Kr&&(a.depthFunc=this.depthFunc),this.depthTest===!1&&(a.depthTest=this.depthTest),this.depthWrite===!1&&(a.depthWrite=this.depthWrite),this.colorWrite===!1&&(a.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(a.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Pv&&(a.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(a.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(a.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==wr&&(a.stencilFail=this.stencilFail),this.stencilZFail!==wr&&(a.stencilZFail=this.stencilZFail),this.stencilZPass!==wr&&(a.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(a.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(a.rotation=this.rotation),this.polygonOffset===!0&&(a.polygonOffset=!0),this.polygonOffsetFactor!==0&&(a.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(a.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(a.linewidth=this.linewidth),this.dashSize!==void 0&&(a.dashSize=this.dashSize),this.gapSize!==void 0&&(a.gapSize=this.gapSize),this.scale!==void 0&&(a.scale=this.scale),this.dithering===!0&&(a.dithering=!0),this.alphaTest>0&&(a.alphaTest=this.alphaTest),this.alphaHash===!0&&(a.alphaHash=!0),this.alphaToCoverage===!0&&(a.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(a.premultipliedAlpha=!0),this.forceSinglePass===!0&&(a.forceSinglePass=!0),this.wireframe===!0&&(a.wireframe=!0),this.wireframeLinewidth>1&&(a.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(a.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(a.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(a.flatShading=!0),this.visible===!1&&(a.visible=!1),this.toneMapped===!1&&(a.toneMapped=!1),this.fog===!1&&(a.fog=!1),Object.keys(this.userData).length>0&&(a.userData=this.userData);function l(c){const f=[];for(const d in c){const p=c[d];delete p.metadata,f.push(p)}return f}if(n){const c=l(t.textures),f=l(t.images);c.length>0&&(a.textures=c),f.length>0&&(a.images=f)}return a}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let a=null;if(n!==null){const l=n.length;a=new Array(l);for(let c=0;c!==l;++c)a[c]=n[c].clone()}return this.clippingPlanes=a,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ta extends Ws{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ji,this.combine=i_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const mn=new V,Oc=new ne;class qn{constructor(t,n,a=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=a,this.usage=zv,this.updateRanges=[],this.gpuType=Aa,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,a){t*=this.itemSize,a*=n.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[t+l]=n.array[a+l];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,a=this.count;n<a;n++)Oc.fromBufferAttribute(this,n),Oc.applyMatrix3(t),this.setXY(n,Oc.x,Oc.y);else if(this.itemSize===3)for(let n=0,a=this.count;n<a;n++)mn.fromBufferAttribute(this,n),mn.applyMatrix3(t),this.setXYZ(n,mn.x,mn.y,mn.z);return this}applyMatrix4(t){for(let n=0,a=this.count;n<a;n++)mn.fromBufferAttribute(this,n),mn.applyMatrix4(t),this.setXYZ(n,mn.x,mn.y,mn.z);return this}applyNormalMatrix(t){for(let n=0,a=this.count;n<a;n++)mn.fromBufferAttribute(this,n),mn.applyNormalMatrix(t),this.setXYZ(n,mn.x,mn.y,mn.z);return this}transformDirection(t){for(let n=0,a=this.count;n<a;n++)mn.fromBufferAttribute(this,n),mn.transformDirection(t),this.setXYZ(n,mn.x,mn.y,mn.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let a=this.array[t*this.itemSize+n];return this.normalized&&(a=tl(a,this.array)),a}setComponent(t,n,a){return this.normalized&&(a=ti(a,this.array)),this.array[t*this.itemSize+n]=a,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=tl(n,this.array)),n}setX(t,n){return this.normalized&&(n=ti(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=tl(n,this.array)),n}setY(t,n){return this.normalized&&(n=ti(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=tl(n,this.array)),n}setZ(t,n){return this.normalized&&(n=ti(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=tl(n,this.array)),n}setW(t,n){return this.normalized&&(n=ti(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,a){return t*=this.itemSize,this.normalized&&(n=ti(n,this.array),a=ti(a,this.array)),this.array[t+0]=n,this.array[t+1]=a,this}setXYZ(t,n,a,l){return t*=this.itemSize,this.normalized&&(n=ti(n,this.array),a=ti(a,this.array),l=ti(l,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=l,this}setXYZW(t,n,a,l,c){return t*=this.itemSize,this.normalized&&(n=ti(n,this.array),a=ti(a,this.array),l=ti(l,this.array),c=ti(c,this.array)),this.array[t+0]=n,this.array[t+1]=a,this.array[t+2]=l,this.array[t+3]=c,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==zv&&(t.usage=this.usage),t}}class R_ extends qn{constructor(t,n,a){super(new Uint16Array(t),n,a)}}class C_ extends qn{constructor(t,n,a){super(new Uint32Array(t),n,a)}}class an extends qn{constructor(t,n,a){super(new Float32Array(t),n,a)}}let L1=0;const wi=new Je,rd=new wn,Br=new V,hi=new dl,al=new dl,Tn=new V;class Rn extends ao{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:L1++}),this.uuid=fl(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(E_(t)?C_:R_)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,a=0){this.groups.push({start:t,count:n,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const a=this.attributes.normal;if(a!==void 0){const c=new he().getNormalMatrix(t);a.applyNormalMatrix(c),a.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(t),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return wi.makeRotationFromQuaternion(t),this.applyMatrix4(wi),this}rotateX(t){return wi.makeRotationX(t),this.applyMatrix4(wi),this}rotateY(t){return wi.makeRotationY(t),this.applyMatrix4(wi),this}rotateZ(t){return wi.makeRotationZ(t),this.applyMatrix4(wi),this}translate(t,n,a){return wi.makeTranslation(t,n,a),this.applyMatrix4(wi),this}scale(t,n,a){return wi.makeScale(t,n,a),this.applyMatrix4(wi),this}lookAt(t){return rd.lookAt(t),rd.updateMatrix(),this.applyMatrix4(rd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Br).negate(),this.translate(Br.x,Br.y,Br.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const a=[];for(let l=0,c=t.length;l<c;l++){const f=t[l];a.push(f.x,f.y,f.z||0)}this.setAttribute("position",new an(a,3))}else{for(let a=0,l=n.count;a<l;a++){const c=t[a];n.setXYZ(a,c.x,c.y,c.z||0)}t.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new dl);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let a=0,l=n.length;a<l;a++){const c=n[a];hi.setFromBufferAttribute(c),this.morphTargetsRelative?(Tn.addVectors(this.boundingBox.min,hi.min),this.boundingBox.expandByPoint(Tn),Tn.addVectors(this.boundingBox.max,hi.max),this.boundingBox.expandByPoint(Tn)):(this.boundingBox.expandByPoint(hi.min),this.boundingBox.expandByPoint(hi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pl);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(t){const a=this.boundingSphere.center;if(hi.setFromBufferAttribute(t),n)for(let c=0,f=n.length;c<f;c++){const d=n[c];al.setFromBufferAttribute(d),this.morphTargetsRelative?(Tn.addVectors(hi.min,al.min),hi.expandByPoint(Tn),Tn.addVectors(hi.max,al.max),hi.expandByPoint(Tn)):(hi.expandByPoint(al.min),hi.expandByPoint(al.max))}hi.getCenter(a);let l=0;for(let c=0,f=t.count;c<f;c++)Tn.fromBufferAttribute(t,c),l=Math.max(l,a.distanceToSquared(Tn));if(n)for(let c=0,f=n.length;c<f;c++){const d=n[c],p=this.morphTargetsRelative;for(let m=0,v=d.count;m<v;m++)Tn.fromBufferAttribute(d,m),p&&(Br.fromBufferAttribute(t,m),Tn.add(Br)),l=Math.max(l,a.distanceToSquared(Tn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const a=n.position,l=n.normal,c=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new qn(new Float32Array(4*a.count),4));const f=this.getAttribute("tangent"),d=[],p=[];for(let B=0;B<a.count;B++)d[B]=new V,p[B]=new V;const m=new V,v=new V,g=new V,x=new ne,M=new ne,y=new ne,T=new V,S=new V;function _(B,C,b){m.fromBufferAttribute(a,B),v.fromBufferAttribute(a,C),g.fromBufferAttribute(a,b),x.fromBufferAttribute(c,B),M.fromBufferAttribute(c,C),y.fromBufferAttribute(c,b),v.sub(m),g.sub(m),M.sub(x),y.sub(x);const H=1/(M.x*y.y-y.x*M.y);isFinite(H)&&(T.copy(v).multiplyScalar(y.y).addScaledVector(g,-M.y).multiplyScalar(H),S.copy(g).multiplyScalar(M.x).addScaledVector(v,-y.x).multiplyScalar(H),d[B].add(T),d[C].add(T),d[b].add(T),p[B].add(S),p[C].add(S),p[b].add(S))}let L=this.groups;L.length===0&&(L=[{start:0,count:t.count}]);for(let B=0,C=L.length;B<C;++B){const b=L[B],H=b.start,tt=b.count;for(let st=H,ht=H+tt;st<ht;st+=3)_(t.getX(st+0),t.getX(st+1),t.getX(st+2))}const U=new V,R=new V,q=new V,I=new V;function N(B){q.fromBufferAttribute(l,B),I.copy(q);const C=d[B];U.copy(C),U.sub(q.multiplyScalar(q.dot(C))).normalize(),R.crossVectors(I,C);const H=R.dot(p[B])<0?-1:1;f.setXYZW(B,U.x,U.y,U.z,H)}for(let B=0,C=L.length;B<C;++B){const b=L[B],H=b.start,tt=b.count;for(let st=H,ht=H+tt;st<ht;st+=3)N(t.getX(st+0)),N(t.getX(st+1)),N(t.getX(st+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let a=this.getAttribute("normal");if(a===void 0)a=new qn(new Float32Array(n.count*3),3),this.setAttribute("normal",a);else for(let x=0,M=a.count;x<M;x++)a.setXYZ(x,0,0,0);const l=new V,c=new V,f=new V,d=new V,p=new V,m=new V,v=new V,g=new V;if(t)for(let x=0,M=t.count;x<M;x+=3){const y=t.getX(x+0),T=t.getX(x+1),S=t.getX(x+2);l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,T),f.fromBufferAttribute(n,S),v.subVectors(f,c),g.subVectors(l,c),v.cross(g),d.fromBufferAttribute(a,y),p.fromBufferAttribute(a,T),m.fromBufferAttribute(a,S),d.add(v),p.add(v),m.add(v),a.setXYZ(y,d.x,d.y,d.z),a.setXYZ(T,p.x,p.y,p.z),a.setXYZ(S,m.x,m.y,m.z)}else for(let x=0,M=n.count;x<M;x+=3)l.fromBufferAttribute(n,x+0),c.fromBufferAttribute(n,x+1),f.fromBufferAttribute(n,x+2),v.subVectors(f,c),g.subVectors(l,c),v.cross(g),a.setXYZ(x+0,v.x,v.y,v.z),a.setXYZ(x+1,v.x,v.y,v.z),a.setXYZ(x+2,v.x,v.y,v.z);this.normalizeNormals(),a.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,a=t.count;n<a;n++)Tn.fromBufferAttribute(t,n),Tn.normalize(),t.setXYZ(n,Tn.x,Tn.y,Tn.z)}toNonIndexed(){function t(d,p){const m=d.array,v=d.itemSize,g=d.normalized,x=new m.constructor(p.length*v);let M=0,y=0;for(let T=0,S=p.length;T<S;T++){d.isInterleavedBufferAttribute?M=p[T]*d.data.stride+d.offset:M=p[T]*v;for(let _=0;_<v;_++)x[y++]=m[M++]}return new qn(x,v,g)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Rn,a=this.index.array,l=this.attributes;for(const d in l){const p=l[d],m=t(p,a);n.setAttribute(d,m)}const c=this.morphAttributes;for(const d in c){const p=[],m=c[d];for(let v=0,g=m.length;v<g;v++){const x=m[v],M=t(x,a);p.push(M)}n.morphAttributes[d]=p}n.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let d=0,p=f.length;d<p;d++){const m=f[d];n.addGroup(m.start,m.count,m.materialIndex)}return n}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const p=this.parameters;for(const m in p)p[m]!==void 0&&(t[m]=p[m]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const a=this.attributes;for(const p in a){const m=a[p];t.data.attributes[p]=m.toJSON(t.data)}const l={};let c=!1;for(const p in this.morphAttributes){const m=this.morphAttributes[p],v=[];for(let g=0,x=m.length;g<x;g++){const M=m[g];v.push(M.toJSON(t.data))}v.length>0&&(l[p]=v,c=!0)}c&&(t.data.morphAttributes=l,t.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(t.data.groups=JSON.parse(JSON.stringify(f)));const d=this.boundingSphere;return d!==null&&(t.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const a=t.index;a!==null&&this.setIndex(a.clone(n));const l=t.attributes;for(const m in l){const v=l[m];this.setAttribute(m,v.clone(n))}const c=t.morphAttributes;for(const m in c){const v=[],g=c[m];for(let x=0,M=g.length;x<M;x++)v.push(g[x].clone(n));this.morphAttributes[m]=v}this.morphTargetsRelative=t.morphTargetsRelative;const f=t.groups;for(let m=0,v=f.length;m<v;m++){const g=f[m];this.addGroup(g.start,g.count,g.materialIndex)}const d=t.boundingBox;d!==null&&(this.boundingBox=d.clone());const p=t.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const $v=new Je,Ns=new yp,Pc=new pl,tx=new V,zc=new V,Bc=new V,Ic=new V,od=new V,Fc=new V,ex=new V,Hc=new V;class $t extends wn{constructor(t=new Rn,n=new Ta){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const l=n[a[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}getVertexPosition(t,n){const a=this.geometry,l=a.attributes.position,c=a.morphAttributes.position,f=a.morphTargetsRelative;n.fromBufferAttribute(l,t);const d=this.morphTargetInfluences;if(c&&d){Fc.set(0,0,0);for(let p=0,m=c.length;p<m;p++){const v=d[p],g=c[p];v!==0&&(od.fromBufferAttribute(g,t),f?Fc.addScaledVector(od,v):Fc.addScaledVector(od.sub(n),v))}n.add(Fc)}return n}raycast(t,n){const a=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(a.boundingSphere===null&&a.computeBoundingSphere(),Pc.copy(a.boundingSphere),Pc.applyMatrix4(c),Ns.copy(t.ray).recast(t.near),!(Pc.containsPoint(Ns.origin)===!1&&(Ns.intersectSphere(Pc,tx)===null||Ns.origin.distanceToSquared(tx)>(t.far-t.near)**2))&&($v.copy(c).invert(),Ns.copy(t.ray).applyMatrix4($v),!(a.boundingBox!==null&&Ns.intersectsBox(a.boundingBox)===!1)&&this._computeIntersections(t,n,Ns)))}_computeIntersections(t,n,a){let l;const c=this.geometry,f=this.material,d=c.index,p=c.attributes.position,m=c.attributes.uv,v=c.attributes.uv1,g=c.attributes.normal,x=c.groups,M=c.drawRange;if(d!==null)if(Array.isArray(f))for(let y=0,T=x.length;y<T;y++){const S=x[y],_=f[S.materialIndex],L=Math.max(S.start,M.start),U=Math.min(d.count,Math.min(S.start+S.count,M.start+M.count));for(let R=L,q=U;R<q;R+=3){const I=d.getX(R),N=d.getX(R+1),B=d.getX(R+2);l=Gc(this,_,t,a,m,v,g,I,N,B),l&&(l.faceIndex=Math.floor(R/3),l.face.materialIndex=S.materialIndex,n.push(l))}}else{const y=Math.max(0,M.start),T=Math.min(d.count,M.start+M.count);for(let S=y,_=T;S<_;S+=3){const L=d.getX(S),U=d.getX(S+1),R=d.getX(S+2);l=Gc(this,f,t,a,m,v,g,L,U,R),l&&(l.faceIndex=Math.floor(S/3),n.push(l))}}else if(p!==void 0)if(Array.isArray(f))for(let y=0,T=x.length;y<T;y++){const S=x[y],_=f[S.materialIndex],L=Math.max(S.start,M.start),U=Math.min(p.count,Math.min(S.start+S.count,M.start+M.count));for(let R=L,q=U;R<q;R+=3){const I=R,N=R+1,B=R+2;l=Gc(this,_,t,a,m,v,g,I,N,B),l&&(l.faceIndex=Math.floor(R/3),l.face.materialIndex=S.materialIndex,n.push(l))}}else{const y=Math.max(0,M.start),T=Math.min(p.count,M.start+M.count);for(let S=y,_=T;S<_;S+=3){const L=S,U=S+1,R=S+2;l=Gc(this,f,t,a,m,v,g,L,U,R),l&&(l.faceIndex=Math.floor(S/3),n.push(l))}}}}function U1(r,t,n,a,l,c,f,d){let p;if(t.side===ii?p=a.intersectTriangle(f,c,l,!0,d):p=a.intersectTriangle(l,c,f,t.side===hs,d),p===null)return null;Hc.copy(d),Hc.applyMatrix4(r.matrixWorld);const m=n.ray.origin.distanceTo(Hc);return m<n.near||m>n.far?null:{distance:m,point:Hc.clone(),object:r}}function Gc(r,t,n,a,l,c,f,d,p,m){r.getVertexPosition(d,zc),r.getVertexPosition(p,Bc),r.getVertexPosition(m,Ic);const v=U1(r,t,n,a,zc,Bc,Ic,ex);if(v){const g=new V;Ui.getBarycoord(ex,zc,Bc,Ic,g),l&&(v.uv=Ui.getInterpolatedAttribute(l,d,p,m,g,new ne)),c&&(v.uv1=Ui.getInterpolatedAttribute(c,d,p,m,g,new ne)),f&&(v.normal=Ui.getInterpolatedAttribute(f,d,p,m,g,new V),v.normal.dot(a.direction)>0&&v.normal.multiplyScalar(-1));const x={a:d,b:p,c:m,normal:new V,materialIndex:0};Ui.getNormal(zc,Bc,Ic,x.normal),v.face=x,v.barycoord=g}return v}class pe extends Rn{constructor(t=1,n=1,a=1,l=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:a,widthSegments:l,heightSegments:c,depthSegments:f};const d=this;l=Math.floor(l),c=Math.floor(c),f=Math.floor(f);const p=[],m=[],v=[],g=[];let x=0,M=0;y("z","y","x",-1,-1,a,n,t,f,c,0),y("z","y","x",1,-1,a,n,-t,f,c,1),y("x","z","y",1,1,t,a,n,l,f,2),y("x","z","y",1,-1,t,a,-n,l,f,3),y("x","y","z",1,-1,t,n,a,l,c,4),y("x","y","z",-1,-1,t,n,-a,l,c,5),this.setIndex(p),this.setAttribute("position",new an(m,3)),this.setAttribute("normal",new an(v,3)),this.setAttribute("uv",new an(g,2));function y(T,S,_,L,U,R,q,I,N,B,C){const b=R/N,H=q/B,tt=R/2,st=q/2,ht=I/2,mt=N+1,z=B+1;let Q=0,K=0;const St=new V;for(let Tt=0;Tt<z;Tt++){const P=Tt*H-st;for(let it=0;it<mt;it++){const Mt=it*b-tt;St[T]=Mt*L,St[S]=P*U,St[_]=ht,m.push(St.x,St.y,St.z),St[T]=0,St[S]=0,St[_]=I>0?1:-1,v.push(St.x,St.y,St.z),g.push(it/N),g.push(1-Tt/B),Q+=1}}for(let Tt=0;Tt<B;Tt++)for(let P=0;P<N;P++){const it=x+P+mt*Tt,Mt=x+P+mt*(Tt+1),Z=x+(P+1)+mt*(Tt+1),ut=x+(P+1)+mt*Tt;p.push(it,Mt,ut),p.push(Mt,Z,ut),K+=6}d.addGroup(M,K,C),M+=K,x+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pe(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function eo(r){const t={};for(const n in r){t[n]={};for(const a in r[n]){const l=r[n][a];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][a]=null):t[n][a]=l.clone():Array.isArray(l)?t[n][a]=l.slice():t[n][a]=l}}return t}function Wn(r){const t={};for(let n=0;n<r.length;n++){const a=eo(r[n]);for(const l in a)t[l]=a[l]}return t}function N1(r){const t=[];for(let n=0;n<r.length;n++)t.push(r[n].clone());return t}function D_(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Re.workingColorSpace}const fs={clone:eo,merge:Wn};var O1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,P1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class An extends Ws{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=O1,this.fragmentShader=P1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=eo(t.uniforms),this.uniformsGroups=N1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const l in this.uniforms){const f=this.uniforms[l].value;f&&f.isTexture?n.uniforms[l]={type:"t",value:f.toJSON(t).uuid}:f&&f.isColor?n.uniforms[l]={type:"c",value:f.getHex()}:f&&f.isVector2?n.uniforms[l]={type:"v2",value:f.toArray()}:f&&f.isVector3?n.uniforms[l]={type:"v3",value:f.toArray()}:f&&f.isVector4?n.uniforms[l]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?n.uniforms[l]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?n.uniforms[l]={type:"m4",value:f.toArray()}:n.uniforms[l]={value:f}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const a={};for(const l in this.extensions)this.extensions[l]===!0&&(a[l]=!0);return Object.keys(a).length>0&&(n.extensions=a),n}}class L_ extends wn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Je,this.projectionMatrix=new Je,this.projectionMatrixInverse=new Je,this.coordinateSystem=wa}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ls=new V,nx=new ne,ix=new ne;class pi extends L_{constructor(t=50,n=1,a=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=a,this.far=l,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=cp*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(uu*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return cp*2*Math.atan(Math.tan(uu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,a){ls.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ls.x,ls.y).multiplyScalar(-t/ls.z),ls.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),a.set(ls.x,ls.y).multiplyScalar(-t/ls.z)}getViewSize(t,n){return this.getViewBounds(t,nx,ix),n.subVectors(ix,nx)}setViewOffset(t,n,a,l,c,f){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(uu*.5*this.fov)/this.zoom,a=2*n,l=this.aspect*a,c=-.5*l;const f=this.view;if(this.view!==null&&this.view.enabled){const p=f.fullWidth,m=f.fullHeight;c+=f.offsetX*l/p,n-=f.offsetY*a/m,l*=f.width/p,a*=f.height/m}const d=this.filmOffset;d!==0&&(c+=t*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,n,n-a,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Ir=-90,Fr=1;class z1 extends wn{constructor(t,n,a){super(),this.type="CubeCamera",this.renderTarget=a,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new pi(Ir,Fr,t,n);l.layers=this.layers,this.add(l);const c=new pi(Ir,Fr,t,n);c.layers=this.layers,this.add(c);const f=new pi(Ir,Fr,t,n);f.layers=this.layers,this.add(f);const d=new pi(Ir,Fr,t,n);d.layers=this.layers,this.add(d);const p=new pi(Ir,Fr,t,n);p.layers=this.layers,this.add(p);const m=new pi(Ir,Fr,t,n);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[a,l,c,f,d,p]=n;for(const m of n)this.remove(m);if(t===wa)a.up.set(0,1,0),a.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(t===du)a.up.set(0,-1,0),a.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const m of n)this.add(m),m.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:a,activeMipmapLevel:l}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[c,f,d,p,m,v]=this.children,g=t.getRenderTarget(),x=t.getActiveCubeFace(),M=t.getActiveMipmapLevel(),y=t.xr.enabled;t.xr.enabled=!1;const T=a.texture.generateMipmaps;a.texture.generateMipmaps=!1,t.setRenderTarget(a,0,l),t.render(n,c),t.setRenderTarget(a,1,l),t.render(n,f),t.setRenderTarget(a,2,l),t.render(n,d),t.setRenderTarget(a,3,l),t.render(n,p),t.setRenderTarget(a,4,l),t.render(n,m),a.texture.generateMipmaps=T,t.setRenderTarget(a,5,l),t.render(n,v),t.setRenderTarget(g,x,M),t.xr.enabled=y,a.texture.needsPMREMUpdate=!0}}class U_ extends kn{constructor(t,n,a,l,c,f,d,p,m,v){t=t!==void 0?t:[],n=n!==void 0?n:Qr,super(t,n,a,l,c,f,d,p,m,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class B1 extends gi{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const a={width:t,height:t,depth:1},l=[a,a,a,a,a,a];this.texture=new U_(l,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Vi}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const a={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new pe(5,5,5),c=new An({name:"CubemapFromEquirect",uniforms:eo(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:ii,blending:Ra});c.uniforms.tEquirect.value=n;const f=new $t(l,c),d=n.minFilter;return n.minFilter===Vs&&(n.minFilter=Vi),new z1(1,10,this).update(t,f),n.minFilter=d,f.geometry.dispose(),f.material.dispose(),this}clear(t,n,a,l){const c=t.getRenderTarget();for(let f=0;f<6;f++)t.setRenderTarget(this,f),t.clear(n,a,l);t.setRenderTarget(c)}}const ld=new V,I1=new V,F1=new he;class Bs{constructor(t=new V(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,a,l){return this.normal.set(t,n,a),this.constant=l,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,a){const l=ld.subVectors(a,n).cross(I1.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(l,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const a=t.delta(ld),l=this.normal.dot(a);if(l===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const c=-(t.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:n.copy(t.start).addScaledVector(a,c)}intersectsLine(t){const n=this.distanceToPoint(t.start),a=this.distanceToPoint(t.end);return n<0&&a>0||a<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const a=n||F1.getNormalMatrix(t),l=this.coplanarPoint(ld).applyMatrix4(t),c=this.normal.applyMatrix3(a).normalize();return this.constant=-l.dot(c),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Os=new pl,Vc=new V;class Ep{constructor(t=new Bs,n=new Bs,a=new Bs,l=new Bs,c=new Bs,f=new Bs){this.planes=[t,n,a,l,c,f]}set(t,n,a,l,c,f){const d=this.planes;return d[0].copy(t),d[1].copy(n),d[2].copy(a),d[3].copy(l),d[4].copy(c),d[5].copy(f),this}copy(t){const n=this.planes;for(let a=0;a<6;a++)n[a].copy(t.planes[a]);return this}setFromProjectionMatrix(t,n=wa){const a=this.planes,l=t.elements,c=l[0],f=l[1],d=l[2],p=l[3],m=l[4],v=l[5],g=l[6],x=l[7],M=l[8],y=l[9],T=l[10],S=l[11],_=l[12],L=l[13],U=l[14],R=l[15];if(a[0].setComponents(p-c,x-m,S-M,R-_).normalize(),a[1].setComponents(p+c,x+m,S+M,R+_).normalize(),a[2].setComponents(p+f,x+v,S+y,R+L).normalize(),a[3].setComponents(p-f,x-v,S-y,R-L).normalize(),a[4].setComponents(p-d,x-g,S-T,R-U).normalize(),n===wa)a[5].setComponents(p+d,x+g,S+T,R+U).normalize();else if(n===du)a[5].setComponents(d,g,T,U).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Os.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Os.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Os)}intersectsSprite(t){return Os.center.set(0,0,0),Os.radius=.7071067811865476,Os.applyMatrix4(t.matrixWorld),this.intersectsSphere(Os)}intersectsSphere(t){const n=this.planes,a=t.center,l=-t.radius;for(let c=0;c<6;c++)if(n[c].distanceToPoint(a)<l)return!1;return!0}intersectsBox(t){const n=this.planes;for(let a=0;a<6;a++){const l=n[a];if(Vc.x=l.normal.x>0?t.max.x:t.min.x,Vc.y=l.normal.y>0?t.max.y:t.min.y,Vc.z=l.normal.z>0?t.max.z:t.min.z,l.distanceToPoint(Vc)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let a=0;a<6;a++)if(n[a].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function N_(){let r=null,t=!1,n=null,a=null;function l(c,f){n(c,f),a=r.requestAnimationFrame(l)}return{start:function(){t!==!0&&n!==null&&(a=r.requestAnimationFrame(l),t=!0)},stop:function(){r.cancelAnimationFrame(a),t=!1},setAnimationLoop:function(c){n=c},setContext:function(c){r=c}}}function H1(r){const t=new WeakMap;function n(d,p){const m=d.array,v=d.usage,g=m.byteLength,x=r.createBuffer();r.bindBuffer(p,x),r.bufferData(p,m,v),d.onUploadCallback();let M;if(m instanceof Float32Array)M=r.FLOAT;else if(m instanceof Uint16Array)d.isFloat16BufferAttribute?M=r.HALF_FLOAT:M=r.UNSIGNED_SHORT;else if(m instanceof Int16Array)M=r.SHORT;else if(m instanceof Uint32Array)M=r.UNSIGNED_INT;else if(m instanceof Int32Array)M=r.INT;else if(m instanceof Int8Array)M=r.BYTE;else if(m instanceof Uint8Array)M=r.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)M=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:x,type:M,bytesPerElement:m.BYTES_PER_ELEMENT,version:d.version,size:g}}function a(d,p,m){const v=p.array,g=p.updateRanges;if(r.bindBuffer(m,d),g.length===0)r.bufferSubData(m,0,v);else{g.sort((M,y)=>M.start-y.start);let x=0;for(let M=1;M<g.length;M++){const y=g[x],T=g[M];T.start<=y.start+y.count+1?y.count=Math.max(y.count,T.start+T.count-y.start):(++x,g[x]=T)}g.length=x+1;for(let M=0,y=g.length;M<y;M++){const T=g[M];r.bufferSubData(m,T.start*v.BYTES_PER_ELEMENT,v,T.start,T.count)}p.clearUpdateRanges()}p.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),t.get(d)}function c(d){d.isInterleavedBufferAttribute&&(d=d.data);const p=t.get(d);p&&(r.deleteBuffer(p.buffer),t.delete(d))}function f(d,p){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const v=t.get(d);(!v||v.version<d.version)&&t.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const m=t.get(d);if(m===void 0)t.set(d,n(d,p));else if(m.version<d.version){if(m.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");a(m.buffer,d,p),m.version=d.version}}return{get:l,remove:c,update:f}}class Su extends Rn{constructor(t=1,n=1,a=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:a,heightSegments:l};const c=t/2,f=n/2,d=Math.floor(a),p=Math.floor(l),m=d+1,v=p+1,g=t/d,x=n/p,M=[],y=[],T=[],S=[];for(let _=0;_<v;_++){const L=_*x-f;for(let U=0;U<m;U++){const R=U*g-c;y.push(R,-L,0),T.push(0,0,1),S.push(U/d),S.push(1-_/p)}}for(let _=0;_<p;_++)for(let L=0;L<d;L++){const U=L+m*_,R=L+m*(_+1),q=L+1+m*(_+1),I=L+1+m*_;M.push(U,R,I),M.push(R,q,I)}this.setIndex(M),this.setAttribute("position",new an(y,3)),this.setAttribute("normal",new an(T,3)),this.setAttribute("uv",new an(S,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Su(t.width,t.height,t.widthSegments,t.heightSegments)}}var G1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,V1=`#ifdef USE_ALPHAHASH
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
#endif`,k1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,X1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,W1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,q1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,j1=`#ifdef USE_AOMAP
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
#endif`,Y1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Z1=`#ifdef USE_BATCHING
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
#endif`,K1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Q1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,J1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,tE=`#ifdef USE_IRIDESCENCE
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
#endif`,eE=`#ifdef USE_BUMPMAP
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
#endif`,nE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,iE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,aE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,sE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,rE=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,oE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,lE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,cE=`#if defined( USE_COLOR_ALPHA )
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
#endif`,uE=`#define PI 3.141592653589793
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
} // validated`,fE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,hE=`vec3 transformedNormal = objectNormal;
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
#endif`,dE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,mE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,vE="gl_FragColor = linearToOutputTexel( gl_FragColor );",xE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,_E=`#ifdef USE_ENVMAP
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
#endif`,ME=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,SE=`#ifdef USE_ENVMAP
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
#endif`,yE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,EE=`#ifdef USE_ENVMAP
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
#endif`,TE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,bE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,AE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,RE=`#ifdef USE_GRADIENTMAP
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
}`,CE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,DE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,LE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,UE=`uniform bool receiveShadow;
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
#endif`,NE=`#ifdef USE_ENVMAP
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
#endif`,OE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,PE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,zE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,BE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,IE=`PhysicalMaterial material;
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
#endif`,FE=`struct PhysicalMaterial {
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
}`,HE=`
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
#endif`,GE=`#if defined( RE_IndirectDiffuse )
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
#endif`,VE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,kE=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,XE=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,WE=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qE=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,jE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,YE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ZE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,KE=`#if defined( USE_POINTS_UV )
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
#endif`,QE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,JE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$E=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tT=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,eT=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nT=`#ifdef USE_MORPHTARGETS
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
#endif`,iT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,aT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,sT=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,rT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,oT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,cT=`#ifdef USE_NORMALMAP
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
#endif`,uT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,fT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,dT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,pT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,mT=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,gT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,vT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,_T=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,MT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ST=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,yT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ET=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,TT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,bT=`float getShadowMask() {
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
}`,AT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wT=`#ifdef USE_SKINNING
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
#endif`,RT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,CT=`#ifdef USE_SKINNING
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
#endif`,DT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,LT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,UT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,NT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,OT=`#ifdef USE_TRANSMISSION
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
#endif`,PT=`#ifdef USE_TRANSMISSION
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
#endif`,zT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,BT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,IT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,FT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const HT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,GT=`uniform sampler2D t2D;
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
}`,VT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,XT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,WT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qT=`#include <common>
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
}`,jT=`#if DEPTH_PACKING == 3200
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
}`,YT=`#define DISTANCE
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
}`,ZT=`#define DISTANCE
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
}`,KT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,QT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,JT=`uniform float scale;
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
}`,$T=`uniform vec3 diffuse;
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
}`,tb=`#include <common>
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
}`,eb=`uniform vec3 diffuse;
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
}`,nb=`#define LAMBERT
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
}`,ib=`#define LAMBERT
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
}`,ab=`#define MATCAP
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
}`,sb=`#define MATCAP
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
}`,rb=`#define NORMAL
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
}`,ob=`#define NORMAL
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
}`,lb=`#define PHONG
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
}`,cb=`#define PHONG
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
}`,ub=`#define STANDARD
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
}`,fb=`#define STANDARD
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
}`,hb=`#define TOON
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
}`,db=`#define TOON
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
}`,pb=`uniform float size;
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
}`,mb=`uniform vec3 diffuse;
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
}`,gb=`#include <common>
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
}`,vb=`uniform vec3 color;
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
}`,xb=`uniform float rotation;
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
}`,_b=`uniform vec3 diffuse;
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
}`,de={alphahash_fragment:G1,alphahash_pars_fragment:V1,alphamap_fragment:k1,alphamap_pars_fragment:X1,alphatest_fragment:W1,alphatest_pars_fragment:q1,aomap_fragment:j1,aomap_pars_fragment:Y1,batching_pars_vertex:Z1,batching_vertex:K1,begin_vertex:Q1,beginnormal_vertex:J1,bsdfs:$1,iridescence_fragment:tE,bumpmap_pars_fragment:eE,clipping_planes_fragment:nE,clipping_planes_pars_fragment:iE,clipping_planes_pars_vertex:aE,clipping_planes_vertex:sE,color_fragment:rE,color_pars_fragment:oE,color_pars_vertex:lE,color_vertex:cE,common:uE,cube_uv_reflection_fragment:fE,defaultnormal_vertex:hE,displacementmap_pars_vertex:dE,displacementmap_vertex:pE,emissivemap_fragment:mE,emissivemap_pars_fragment:gE,colorspace_fragment:vE,colorspace_pars_fragment:xE,envmap_fragment:_E,envmap_common_pars_fragment:ME,envmap_pars_fragment:SE,envmap_pars_vertex:yE,envmap_physical_pars_fragment:NE,envmap_vertex:EE,fog_vertex:TE,fog_pars_vertex:bE,fog_fragment:AE,fog_pars_fragment:wE,gradientmap_pars_fragment:RE,lightmap_pars_fragment:CE,lights_lambert_fragment:DE,lights_lambert_pars_fragment:LE,lights_pars_begin:UE,lights_toon_fragment:OE,lights_toon_pars_fragment:PE,lights_phong_fragment:zE,lights_phong_pars_fragment:BE,lights_physical_fragment:IE,lights_physical_pars_fragment:FE,lights_fragment_begin:HE,lights_fragment_maps:GE,lights_fragment_end:VE,logdepthbuf_fragment:kE,logdepthbuf_pars_fragment:XE,logdepthbuf_pars_vertex:WE,logdepthbuf_vertex:qE,map_fragment:jE,map_pars_fragment:YE,map_particle_fragment:ZE,map_particle_pars_fragment:KE,metalnessmap_fragment:QE,metalnessmap_pars_fragment:JE,morphinstance_vertex:$E,morphcolor_vertex:tT,morphnormal_vertex:eT,morphtarget_pars_vertex:nT,morphtarget_vertex:iT,normal_fragment_begin:aT,normal_fragment_maps:sT,normal_pars_fragment:rT,normal_pars_vertex:oT,normal_vertex:lT,normalmap_pars_fragment:cT,clearcoat_normal_fragment_begin:uT,clearcoat_normal_fragment_maps:fT,clearcoat_pars_fragment:hT,iridescence_pars_fragment:dT,opaque_fragment:pT,packing:mT,premultiplied_alpha_fragment:gT,project_vertex:vT,dithering_fragment:xT,dithering_pars_fragment:_T,roughnessmap_fragment:MT,roughnessmap_pars_fragment:ST,shadowmap_pars_fragment:yT,shadowmap_pars_vertex:ET,shadowmap_vertex:TT,shadowmask_pars_fragment:bT,skinbase_vertex:AT,skinning_pars_vertex:wT,skinning_vertex:RT,skinnormal_vertex:CT,specularmap_fragment:DT,specularmap_pars_fragment:LT,tonemapping_fragment:UT,tonemapping_pars_fragment:NT,transmission_fragment:OT,transmission_pars_fragment:PT,uv_pars_fragment:zT,uv_pars_vertex:BT,uv_vertex:IT,worldpos_vertex:FT,background_vert:HT,background_frag:GT,backgroundCube_vert:VT,backgroundCube_frag:kT,cube_vert:XT,cube_frag:WT,depth_vert:qT,depth_frag:jT,distanceRGBA_vert:YT,distanceRGBA_frag:ZT,equirect_vert:KT,equirect_frag:QT,linedashed_vert:JT,linedashed_frag:$T,meshbasic_vert:tb,meshbasic_frag:eb,meshlambert_vert:nb,meshlambert_frag:ib,meshmatcap_vert:ab,meshmatcap_frag:sb,meshnormal_vert:rb,meshnormal_frag:ob,meshphong_vert:lb,meshphong_frag:cb,meshphysical_vert:ub,meshphysical_frag:fb,meshtoon_vert:hb,meshtoon_frag:db,points_vert:pb,points_frag:mb,shadow_vert:gb,shadow_frag:vb,sprite_vert:xb,sprite_frag:_b},Nt={common:{diffuse:{value:new te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new he},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new he}},envmap:{envMap:{value:null},envMapRotation:{value:new he},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new he}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new he}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new he},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new he},normalScale:{value:new ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new he},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new he}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new he}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new he}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0},uvTransform:{value:new he}},sprite:{diffuse:{value:new te(16777215)},opacity:{value:1},center:{value:new ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new he},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0}}},Qi={basic:{uniforms:Wn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.fog]),vertexShader:de.meshbasic_vert,fragmentShader:de.meshbasic_frag},lambert:{uniforms:Wn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new te(0)}}]),vertexShader:de.meshlambert_vert,fragmentShader:de.meshlambert_frag},phong:{uniforms:Wn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new te(0)},specular:{value:new te(1118481)},shininess:{value:30}}]),vertexShader:de.meshphong_vert,fragmentShader:de.meshphong_frag},standard:{uniforms:Wn([Nt.common,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.roughnessmap,Nt.metalnessmap,Nt.fog,Nt.lights,{emissive:{value:new te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:de.meshphysical_vert,fragmentShader:de.meshphysical_frag},toon:{uniforms:Wn([Nt.common,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.gradientmap,Nt.fog,Nt.lights,{emissive:{value:new te(0)}}]),vertexShader:de.meshtoon_vert,fragmentShader:de.meshtoon_frag},matcap:{uniforms:Wn([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,{matcap:{value:null}}]),vertexShader:de.meshmatcap_vert,fragmentShader:de.meshmatcap_frag},points:{uniforms:Wn([Nt.points,Nt.fog]),vertexShader:de.points_vert,fragmentShader:de.points_frag},dashed:{uniforms:Wn([Nt.common,Nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:de.linedashed_vert,fragmentShader:de.linedashed_frag},depth:{uniforms:Wn([Nt.common,Nt.displacementmap]),vertexShader:de.depth_vert,fragmentShader:de.depth_frag},normal:{uniforms:Wn([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,{opacity:{value:1}}]),vertexShader:de.meshnormal_vert,fragmentShader:de.meshnormal_frag},sprite:{uniforms:Wn([Nt.sprite,Nt.fog]),vertexShader:de.sprite_vert,fragmentShader:de.sprite_frag},background:{uniforms:{uvTransform:{value:new he},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:de.background_vert,fragmentShader:de.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new he}},vertexShader:de.backgroundCube_vert,fragmentShader:de.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:de.cube_vert,fragmentShader:de.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:de.equirect_vert,fragmentShader:de.equirect_frag},distanceRGBA:{uniforms:Wn([Nt.common,Nt.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:de.distanceRGBA_vert,fragmentShader:de.distanceRGBA_frag},shadow:{uniforms:Wn([Nt.lights,Nt.fog,{color:{value:new te(0)},opacity:{value:1}}]),vertexShader:de.shadow_vert,fragmentShader:de.shadow_frag}};Qi.physical={uniforms:Wn([Qi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new he},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new he},clearcoatNormalScale:{value:new ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new he},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new he},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new he},sheen:{value:0},sheenColor:{value:new te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new he},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new he},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new he},transmissionSamplerSize:{value:new ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new he},attenuationDistance:{value:0},attenuationColor:{value:new te(0)},specularColor:{value:new te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new he},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new he},anisotropyVector:{value:new ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new he}}]),vertexShader:de.meshphysical_vert,fragmentShader:de.meshphysical_frag};const kc={r:0,b:0,g:0},Ps=new Ji,Mb=new Je;function Sb(r,t,n,a,l,c,f){const d=new te(0);let p=c===!0?0:1,m,v,g=null,x=0,M=null;function y(L){let U=L.isScene===!0?L.background:null;return U&&U.isTexture&&(U=(L.backgroundBlurriness>0?n:t).get(U)),U}function T(L){let U=!1;const R=y(L);R===null?_(d,p):R&&R.isColor&&(_(R,1),U=!0);const q=r.xr.getEnvironmentBlendMode();q==="additive"?a.buffers.color.setClear(0,0,0,1,f):q==="alpha-blend"&&a.buffers.color.setClear(0,0,0,0,f),(r.autoClear||U)&&(a.buffers.depth.setTest(!0),a.buffers.depth.setMask(!0),a.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function S(L,U){const R=y(U);R&&(R.isCubeTexture||R.mapping===_u)?(v===void 0&&(v=new $t(new pe(1,1,1),new An({name:"BackgroundCubeMaterial",uniforms:eo(Qi.backgroundCube.uniforms),vertexShader:Qi.backgroundCube.vertexShader,fragmentShader:Qi.backgroundCube.fragmentShader,side:ii,depthTest:!1,depthWrite:!1,fog:!1})),v.geometry.deleteAttribute("normal"),v.geometry.deleteAttribute("uv"),v.onBeforeRender=function(q,I,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(v.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(v)),Ps.copy(U.backgroundRotation),Ps.x*=-1,Ps.y*=-1,Ps.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Ps.y*=-1,Ps.z*=-1),v.material.uniforms.envMap.value=R,v.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,v.material.uniforms.backgroundBlurriness.value=U.backgroundBlurriness,v.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,v.material.uniforms.backgroundRotation.value.setFromMatrix4(Mb.makeRotationFromEuler(Ps)),v.material.toneMapped=Re.getTransfer(R.colorSpace)!==He,(g!==R||x!==R.version||M!==r.toneMapping)&&(v.material.needsUpdate=!0,g=R,x=R.version,M=r.toneMapping),v.layers.enableAll(),L.unshift(v,v.geometry,v.material,0,0,null)):R&&R.isTexture&&(m===void 0&&(m=new $t(new Su(2,2),new An({name:"BackgroundMaterial",uniforms:eo(Qi.background.uniforms),vertexShader:Qi.background.vertexShader,fragmentShader:Qi.background.fragmentShader,side:hs,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(m)),m.material.uniforms.t2D.value=R,m.material.uniforms.backgroundIntensity.value=U.backgroundIntensity,m.material.toneMapped=Re.getTransfer(R.colorSpace)!==He,R.matrixAutoUpdate===!0&&R.updateMatrix(),m.material.uniforms.uvTransform.value.copy(R.matrix),(g!==R||x!==R.version||M!==r.toneMapping)&&(m.material.needsUpdate=!0,g=R,x=R.version,M=r.toneMapping),m.layers.enableAll(),L.unshift(m,m.geometry,m.material,0,0,null))}function _(L,U){L.getRGB(kc,D_(r)),a.buffers.color.setClear(kc.r,kc.g,kc.b,U,f)}return{getClearColor:function(){return d},setClearColor:function(L,U=1){d.set(L),p=U,_(d,p)},getClearAlpha:function(){return p},setClearAlpha:function(L){p=L,_(d,p)},render:T,addToRenderList:S}}function yb(r,t){const n=r.getParameter(r.MAX_VERTEX_ATTRIBS),a={},l=x(null);let c=l,f=!1;function d(b,H,tt,st,ht){let mt=!1;const z=g(st,tt,H);c!==z&&(c=z,m(c.object)),mt=M(b,st,tt,ht),mt&&y(b,st,tt,ht),ht!==null&&t.update(ht,r.ELEMENT_ARRAY_BUFFER),(mt||f)&&(f=!1,R(b,H,tt,st),ht!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(ht).buffer))}function p(){return r.createVertexArray()}function m(b){return r.bindVertexArray(b)}function v(b){return r.deleteVertexArray(b)}function g(b,H,tt){const st=tt.wireframe===!0;let ht=a[b.id];ht===void 0&&(ht={},a[b.id]=ht);let mt=ht[H.id];mt===void 0&&(mt={},ht[H.id]=mt);let z=mt[st];return z===void 0&&(z=x(p()),mt[st]=z),z}function x(b){const H=[],tt=[],st=[];for(let ht=0;ht<n;ht++)H[ht]=0,tt[ht]=0,st[ht]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:tt,attributeDivisors:st,object:b,attributes:{},index:null}}function M(b,H,tt,st){const ht=c.attributes,mt=H.attributes;let z=0;const Q=tt.getAttributes();for(const K in Q)if(Q[K].location>=0){const Tt=ht[K];let P=mt[K];if(P===void 0&&(K==="instanceMatrix"&&b.instanceMatrix&&(P=b.instanceMatrix),K==="instanceColor"&&b.instanceColor&&(P=b.instanceColor)),Tt===void 0||Tt.attribute!==P||P&&Tt.data!==P.data)return!0;z++}return c.attributesNum!==z||c.index!==st}function y(b,H,tt,st){const ht={},mt=H.attributes;let z=0;const Q=tt.getAttributes();for(const K in Q)if(Q[K].location>=0){let Tt=mt[K];Tt===void 0&&(K==="instanceMatrix"&&b.instanceMatrix&&(Tt=b.instanceMatrix),K==="instanceColor"&&b.instanceColor&&(Tt=b.instanceColor));const P={};P.attribute=Tt,Tt&&Tt.data&&(P.data=Tt.data),ht[K]=P,z++}c.attributes=ht,c.attributesNum=z,c.index=st}function T(){const b=c.newAttributes;for(let H=0,tt=b.length;H<tt;H++)b[H]=0}function S(b){_(b,0)}function _(b,H){const tt=c.newAttributes,st=c.enabledAttributes,ht=c.attributeDivisors;tt[b]=1,st[b]===0&&(r.enableVertexAttribArray(b),st[b]=1),ht[b]!==H&&(r.vertexAttribDivisor(b,H),ht[b]=H)}function L(){const b=c.newAttributes,H=c.enabledAttributes;for(let tt=0,st=H.length;tt<st;tt++)H[tt]!==b[tt]&&(r.disableVertexAttribArray(tt),H[tt]=0)}function U(b,H,tt,st,ht,mt,z){z===!0?r.vertexAttribIPointer(b,H,tt,ht,mt):r.vertexAttribPointer(b,H,tt,st,ht,mt)}function R(b,H,tt,st){T();const ht=st.attributes,mt=tt.getAttributes(),z=H.defaultAttributeValues;for(const Q in mt){const K=mt[Q];if(K.location>=0){let St=ht[Q];if(St===void 0&&(Q==="instanceMatrix"&&b.instanceMatrix&&(St=b.instanceMatrix),Q==="instanceColor"&&b.instanceColor&&(St=b.instanceColor)),St!==void 0){const Tt=St.normalized,P=St.itemSize,it=t.get(St);if(it===void 0)continue;const Mt=it.buffer,Z=it.type,ut=it.bytesPerElement,Et=Z===r.INT||Z===r.UNSIGNED_INT||St.gpuType===gp;if(St.isInterleavedBufferAttribute){const _t=St.data,Vt=_t.stride,Gt=St.offset;if(_t.isInstancedInterleavedBuffer){for(let oe=0;oe<K.locationSize;oe++)_(K.location+oe,_t.meshPerAttribute);b.isInstancedMesh!==!0&&st._maxInstanceCount===void 0&&(st._maxInstanceCount=_t.meshPerAttribute*_t.count)}else for(let oe=0;oe<K.locationSize;oe++)S(K.location+oe);r.bindBuffer(r.ARRAY_BUFFER,Mt);for(let oe=0;oe<K.locationSize;oe++)U(K.location+oe,P/K.locationSize,Z,Tt,Vt*ut,(Gt+P/K.locationSize*oe)*ut,Et)}else{if(St.isInstancedBufferAttribute){for(let _t=0;_t<K.locationSize;_t++)_(K.location+_t,St.meshPerAttribute);b.isInstancedMesh!==!0&&st._maxInstanceCount===void 0&&(st._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let _t=0;_t<K.locationSize;_t++)S(K.location+_t);r.bindBuffer(r.ARRAY_BUFFER,Mt);for(let _t=0;_t<K.locationSize;_t++)U(K.location+_t,P/K.locationSize,Z,Tt,P*ut,P/K.locationSize*_t*ut,Et)}}else if(z!==void 0){const Tt=z[Q];if(Tt!==void 0)switch(Tt.length){case 2:r.vertexAttrib2fv(K.location,Tt);break;case 3:r.vertexAttrib3fv(K.location,Tt);break;case 4:r.vertexAttrib4fv(K.location,Tt);break;default:r.vertexAttrib1fv(K.location,Tt)}}}}L()}function q(){B();for(const b in a){const H=a[b];for(const tt in H){const st=H[tt];for(const ht in st)v(st[ht].object),delete st[ht];delete H[tt]}delete a[b]}}function I(b){if(a[b.id]===void 0)return;const H=a[b.id];for(const tt in H){const st=H[tt];for(const ht in st)v(st[ht].object),delete st[ht];delete H[tt]}delete a[b.id]}function N(b){for(const H in a){const tt=a[H];if(tt[b.id]===void 0)continue;const st=tt[b.id];for(const ht in st)v(st[ht].object),delete st[ht];delete tt[b.id]}}function B(){C(),f=!0,c!==l&&(c=l,m(c.object))}function C(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:B,resetDefaultState:C,dispose:q,releaseStatesOfGeometry:I,releaseStatesOfProgram:N,initAttributes:T,enableAttribute:S,disableUnusedAttributes:L}}function Eb(r,t,n){let a;function l(m){a=m}function c(m,v){r.drawArrays(a,m,v),n.update(v,a,1)}function f(m,v,g){g!==0&&(r.drawArraysInstanced(a,m,v,g),n.update(v,a,g))}function d(m,v,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(a,m,0,v,0,g);let M=0;for(let y=0;y<g;y++)M+=v[y];n.update(M,a,1)}function p(m,v,g,x){if(g===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let y=0;y<m.length;y++)f(m[y],v[y],x[y]);else{M.multiDrawArraysInstancedWEBGL(a,m,0,v,0,x,0,g);let y=0;for(let T=0;T<g;T++)y+=v[T]*x[T];n.update(y,a,1)}}this.setMode=l,this.render=c,this.renderInstances=f,this.renderMultiDraw=d,this.renderMultiDrawInstances=p}function Tb(r,t,n,a){let l;function c(){if(l!==void 0)return l;if(t.has("EXT_texture_filter_anisotropic")===!0){const N=t.get("EXT_texture_filter_anisotropic");l=r.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function f(N){return!(N!==ki&&a.convert(N)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(N){const B=N===Xi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(N!==Da&&a.convert(N)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&N!==Aa&&!B)}function p(N){if(N==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=n.precision!==void 0?n.precision:"highp";const v=p(m);v!==m&&(console.warn("THREE.WebGLRenderer:",m,"not supported, using",v,"instead."),m=v);const g=n.logarithmicDepthBuffer===!0,x=n.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),M=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),y=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=r.getParameter(r.MAX_TEXTURE_SIZE),S=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),_=r.getParameter(r.MAX_VERTEX_ATTRIBS),L=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),U=r.getParameter(r.MAX_VARYING_VECTORS),R=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),q=y>0,I=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:p,textureFormatReadable:f,textureTypeReadable:d,precision:m,logarithmicDepthBuffer:g,reverseDepthBuffer:x,maxTextures:M,maxVertexTextures:y,maxTextureSize:T,maxCubemapSize:S,maxAttributes:_,maxVertexUniforms:L,maxVaryings:U,maxFragmentUniforms:R,vertexTextures:q,maxSamples:I}}function bb(r){const t=this;let n=null,a=0,l=!1,c=!1;const f=new Bs,d=new he,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(g,x){const M=g.length!==0||x||a!==0||l;return l=x,a=g.length,M},this.beginShadows=function(){c=!0,v(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(g,x){n=v(g,x,0)},this.setState=function(g,x,M){const y=g.clippingPlanes,T=g.clipIntersection,S=g.clipShadows,_=r.get(g);if(!l||y===null||y.length===0||c&&!S)c?v(null):m();else{const L=c?0:a,U=L*4;let R=_.clippingState||null;p.value=R,R=v(y,x,U,M);for(let q=0;q!==U;++q)R[q]=n[q];_.clippingState=R,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=L}};function m(){p.value!==n&&(p.value=n,p.needsUpdate=a>0),t.numPlanes=a,t.numIntersection=0}function v(g,x,M,y){const T=g!==null?g.length:0;let S=null;if(T!==0){if(S=p.value,y!==!0||S===null){const _=M+T*4,L=x.matrixWorldInverse;d.getNormalMatrix(L),(S===null||S.length<_)&&(S=new Float32Array(_));for(let U=0,R=M;U!==T;++U,R+=4)f.copy(g[U]).applyMatrix4(L,d),f.normal.toArray(S,R),S[R+3]=f.constant}p.value=S,p.needsUpdate=!0}return t.numPlanes=T,t.numIntersection=0,S}}function Ab(r){let t=new WeakMap;function n(f,d){return d===Nd?f.mapping=Qr:d===Od&&(f.mapping=Jr),f}function a(f){if(f&&f.isTexture){const d=f.mapping;if(d===Nd||d===Od)if(t.has(f)){const p=t.get(f).texture;return n(p,f.mapping)}else{const p=f.image;if(p&&p.height>0){const m=new B1(p.height);return m.fromEquirectangularTexture(r,f),t.set(f,m),f.addEventListener("dispose",l),n(m.texture,f.mapping)}else return null}}return f}function l(f){const d=f.target;d.removeEventListener("dispose",l);const p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function c(){t=new WeakMap}return{get:a,dispose:c}}class Tp extends L_{constructor(t=-1,n=1,a=1,l=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=a,this.bottom=l,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,a,l,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=a,this.view.offsetY=l,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=a-t,f=a+t,d=l+n,p=l-n;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=m*this.view.offsetX,f=c+m*this.view.width,d-=v*this.view.offsetY,p=d-v*this.view.height}this.projectionMatrix.makeOrthographic(c,f,d,p,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Xr=4,ax=[.125,.215,.35,.446,.526,.582],Hs=20,cd=new Tp,sx=new te;let ud=null,fd=0,hd=0,dd=!1;const Is=(1+Math.sqrt(5))/2,Hr=1/Is,rx=[new V(-Is,Hr,0),new V(Is,Hr,0),new V(-Hr,0,Is),new V(Hr,0,Is),new V(0,Is,-Hr),new V(0,Is,Hr),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)];class ox{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,a=.1,l=100){ud=this._renderer.getRenderTarget(),fd=this._renderer.getActiveCubeFace(),hd=this._renderer.getActiveMipmapLevel(),dd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,a,l,c),n>0&&this._blur(c,0,0,n),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ux(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=cx(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ud,fd,hd),this._renderer.xr.enabled=dd,t.scissorTest=!1,Xc(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Qr||t.mapping===Jr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ud=this._renderer.getRenderTarget(),fd=this._renderer.getActiveCubeFace(),hd=this._renderer.getActiveMipmapLevel(),dd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const a=n||this._allocateTargets();return this._textureToCubeUV(t,a),this._applyPMREM(a),this._cleanup(a),a}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,a={magFilter:Vi,minFilter:Vi,generateMipmaps:!1,type:Xi,format:ki,colorSpace:io,depthBuffer:!1},l=lx(t,n,a);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=lx(t,n,a);const{_lodMax:c}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=wb(c)),this._blurMaterial=Rb(c,t,n)}return l}_compileMaterial(t){const n=new $t(this._lodPlanes[0],t);this._renderer.compile(n,cd)}_sceneToCubeUV(t,n,a,l){const d=new pi(90,1,n,a),p=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],v=this._renderer,g=v.autoClear,x=v.toneMapping;v.getClearColor(sx),v.toneMapping=us,v.autoClear=!1;const M=new Ta({name:"PMREM.Background",side:ii,depthWrite:!1,depthTest:!1}),y=new $t(new pe,M);let T=!1;const S=t.background;S?S.isColor&&(M.color.copy(S),t.background=null,T=!0):(M.color.copy(sx),T=!0);for(let _=0;_<6;_++){const L=_%3;L===0?(d.up.set(0,p[_],0),d.lookAt(m[_],0,0)):L===1?(d.up.set(0,0,p[_]),d.lookAt(0,m[_],0)):(d.up.set(0,p[_],0),d.lookAt(0,0,m[_]));const U=this._cubeSize;Xc(l,L*U,_>2?U:0,U,U),v.setRenderTarget(l),T&&v.render(y,d),v.render(t,d)}y.geometry.dispose(),y.material.dispose(),v.toneMapping=x,v.autoClear=g,t.background=S}_textureToCubeUV(t,n){const a=this._renderer,l=t.mapping===Qr||t.mapping===Jr;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=ux()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=cx());const c=l?this._cubemapMaterial:this._equirectMaterial,f=new $t(this._lodPlanes[0],c),d=c.uniforms;d.envMap.value=t;const p=this._cubeSize;Xc(n,0,0,3*p,2*p),a.setRenderTarget(n),a.render(f,cd)}_applyPMREM(t){const n=this._renderer,a=n.autoClear;n.autoClear=!1;const l=this._lodPlanes.length;for(let c=1;c<l;c++){const f=Math.sqrt(this._sigmas[c]*this._sigmas[c]-this._sigmas[c-1]*this._sigmas[c-1]),d=rx[(l-c-1)%rx.length];this._blur(t,c-1,c,f,d)}n.autoClear=a}_blur(t,n,a,l,c){const f=this._pingPongRenderTarget;this._halfBlur(t,f,n,a,l,"latitudinal",c),this._halfBlur(f,t,a,a,l,"longitudinal",c)}_halfBlur(t,n,a,l,c,f,d){const p=this._renderer,m=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const v=3,g=new $t(this._lodPlanes[l],m),x=m.uniforms,M=this._sizeLods[a]-1,y=isFinite(c)?Math.PI/(2*M):2*Math.PI/(2*Hs-1),T=c/y,S=isFinite(c)?1+Math.floor(v*T):Hs;S>Hs&&console.warn(`sigmaRadians, ${c}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${Hs}`);const _=[];let L=0;for(let N=0;N<Hs;++N){const B=N/T,C=Math.exp(-B*B/2);_.push(C),N===0?L+=C:N<S&&(L+=2*C)}for(let N=0;N<_.length;N++)_[N]=_[N]/L;x.envMap.value=t.texture,x.samples.value=S,x.weights.value=_,x.latitudinal.value=f==="latitudinal",d&&(x.poleAxis.value=d);const{_lodMax:U}=this;x.dTheta.value=y,x.mipInt.value=U-a;const R=this._sizeLods[l],q=3*R*(l>U-Xr?l-U+Xr:0),I=4*(this._cubeSize-R);Xc(n,q,I,3*R,2*R),p.setRenderTarget(n),p.render(g,cd)}}function wb(r){const t=[],n=[],a=[];let l=r;const c=r-Xr+1+ax.length;for(let f=0;f<c;f++){const d=Math.pow(2,l);n.push(d);let p=1/d;f>r-Xr?p=ax[f-r+Xr-1]:f===0&&(p=0),a.push(p);const m=1/(d-2),v=-m,g=1+m,x=[v,v,g,v,g,g,v,v,g,g,v,g],M=6,y=6,T=3,S=2,_=1,L=new Float32Array(T*y*M),U=new Float32Array(S*y*M),R=new Float32Array(_*y*M);for(let I=0;I<M;I++){const N=I%3*2/3-1,B=I>2?0:-1,C=[N,B,0,N+2/3,B,0,N+2/3,B+1,0,N,B,0,N+2/3,B+1,0,N,B+1,0];L.set(C,T*y*I),U.set(x,S*y*I);const b=[I,I,I,I,I,I];R.set(b,_*y*I)}const q=new Rn;q.setAttribute("position",new qn(L,T)),q.setAttribute("uv",new qn(U,S)),q.setAttribute("faceIndex",new qn(R,_)),t.push(q),l>Xr&&l--}return{lodPlanes:t,sizeLods:n,sigmas:a}}function lx(r,t,n){const a=new gi(r,t,n);return a.texture.mapping=_u,a.texture.name="PMREM.cubeUv",a.scissorTest=!0,a}function Xc(r,t,n,a,l){r.viewport.set(t,n,a,l),r.scissor.set(t,n,a,l)}function Rb(r,t,n){const a=new Float32Array(Hs),l=new V(0,1,0);return new An({name:"SphericalGaussianBlur",defines:{n:Hs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:a},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:bp(),fragmentShader:`

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
		`,blending:Ra,depthTest:!1,depthWrite:!1})}function cx(){return new An({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bp(),fragmentShader:`

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
		`,blending:Ra,depthTest:!1,depthWrite:!1})}function ux(){return new An({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ra,depthTest:!1,depthWrite:!1})}function bp(){return`

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
	`}function Cb(r){let t=new WeakMap,n=null;function a(d){if(d&&d.isTexture){const p=d.mapping,m=p===Nd||p===Od,v=p===Qr||p===Jr;if(m||v){let g=t.get(d);const x=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==x)return n===null&&(n=new ox(r)),g=m?n.fromEquirectangular(d,g):n.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{const M=d.image;return m&&M&&M.height>0||v&&M&&l(M)?(n===null&&(n=new ox(r)),g=m?n.fromEquirectangular(d):n.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",c),g.texture):null}}}return d}function l(d){let p=0;const m=6;for(let v=0;v<m;v++)d[v]!==void 0&&p++;return p===m}function c(d){const p=d.target;p.removeEventListener("dispose",c);const m=t.get(p);m!==void 0&&(t.delete(p),m.dispose())}function f(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:a,dispose:f}}function Db(r){const t={};function n(a){if(t[a]!==void 0)return t[a];let l;switch(a){case"WEBGL_depth_texture":l=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=r.getExtension(a)}return t[a]=l,l}return{has:function(a){return n(a)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(a){const l=n(a);return l===null&&ll("THREE.WebGLRenderer: "+a+" extension not supported."),l}}}function Lb(r,t,n,a){const l={},c=new WeakMap;function f(g){const x=g.target;x.index!==null&&t.remove(x.index);for(const y in x.attributes)t.remove(x.attributes[y]);for(const y in x.morphAttributes){const T=x.morphAttributes[y];for(let S=0,_=T.length;S<_;S++)t.remove(T[S])}x.removeEventListener("dispose",f),delete l[x.id];const M=c.get(x);M&&(t.remove(M),c.delete(x)),a.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,n.memory.geometries--}function d(g,x){return l[x.id]===!0||(x.addEventListener("dispose",f),l[x.id]=!0,n.memory.geometries++),x}function p(g){const x=g.attributes;for(const y in x)t.update(x[y],r.ARRAY_BUFFER);const M=g.morphAttributes;for(const y in M){const T=M[y];for(let S=0,_=T.length;S<_;S++)t.update(T[S],r.ARRAY_BUFFER)}}function m(g){const x=[],M=g.index,y=g.attributes.position;let T=0;if(M!==null){const L=M.array;T=M.version;for(let U=0,R=L.length;U<R;U+=3){const q=L[U+0],I=L[U+1],N=L[U+2];x.push(q,I,I,N,N,q)}}else if(y!==void 0){const L=y.array;T=y.version;for(let U=0,R=L.length/3-1;U<R;U+=3){const q=U+0,I=U+1,N=U+2;x.push(q,I,I,N,N,q)}}else return;const S=new(E_(x)?C_:R_)(x,1);S.version=T;const _=c.get(g);_&&t.remove(_),c.set(g,S)}function v(g){const x=c.get(g);if(x){const M=g.index;M!==null&&x.version<M.version&&m(g)}else m(g);return c.get(g)}return{get:d,update:p,getWireframeAttribute:v}}function Ub(r,t,n){let a;function l(x){a=x}let c,f;function d(x){c=x.type,f=x.bytesPerElement}function p(x,M){r.drawElements(a,M,c,x*f),n.update(M,a,1)}function m(x,M,y){y!==0&&(r.drawElementsInstanced(a,M,c,x*f,y),n.update(M,a,y))}function v(x,M,y){if(y===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(a,M,0,c,x,0,y);let S=0;for(let _=0;_<y;_++)S+=M[_];n.update(S,a,1)}function g(x,M,y,T){if(y===0)return;const S=t.get("WEBGL_multi_draw");if(S===null)for(let _=0;_<x.length;_++)m(x[_]/f,M[_],T[_]);else{S.multiDrawElementsInstancedWEBGL(a,M,0,c,x,0,T,0,y);let _=0;for(let L=0;L<y;L++)_+=M[L]*T[L];n.update(_,a,1)}}this.setMode=l,this.setIndex=d,this.render=p,this.renderInstances=m,this.renderMultiDraw=v,this.renderMultiDrawInstances=g}function Nb(r){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function a(c,f,d){switch(n.calls++,f){case r.TRIANGLES:n.triangles+=d*(c/3);break;case r.LINES:n.lines+=d*(c/2);break;case r.LINE_STRIP:n.lines+=d*(c-1);break;case r.LINE_LOOP:n.lines+=d*c;break;case r.POINTS:n.points+=d*c;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function l(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:l,update:a}}function Ob(r,t,n){const a=new WeakMap,l=new je;function c(f,d,p){const m=f.morphTargetInfluences,v=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,g=v!==void 0?v.length:0;let x=a.get(d);if(x===void 0||x.count!==g){let b=function(){B.dispose(),a.delete(d),d.removeEventListener("dispose",b)};var M=b;x!==void 0&&x.texture.dispose();const y=d.morphAttributes.position!==void 0,T=d.morphAttributes.normal!==void 0,S=d.morphAttributes.color!==void 0,_=d.morphAttributes.position||[],L=d.morphAttributes.normal||[],U=d.morphAttributes.color||[];let R=0;y===!0&&(R=1),T===!0&&(R=2),S===!0&&(R=3);let q=d.attributes.position.count*R,I=1;q>t.maxTextureSize&&(I=Math.ceil(q/t.maxTextureSize),q=t.maxTextureSize);const N=new Float32Array(q*I*4*g),B=new b_(N,q,I,g);B.type=Aa,B.needsUpdate=!0;const C=R*4;for(let H=0;H<g;H++){const tt=_[H],st=L[H],ht=U[H],mt=q*I*4*H;for(let z=0;z<tt.count;z++){const Q=z*C;y===!0&&(l.fromBufferAttribute(tt,z),N[mt+Q+0]=l.x,N[mt+Q+1]=l.y,N[mt+Q+2]=l.z,N[mt+Q+3]=0),T===!0&&(l.fromBufferAttribute(st,z),N[mt+Q+4]=l.x,N[mt+Q+5]=l.y,N[mt+Q+6]=l.z,N[mt+Q+7]=0),S===!0&&(l.fromBufferAttribute(ht,z),N[mt+Q+8]=l.x,N[mt+Q+9]=l.y,N[mt+Q+10]=l.z,N[mt+Q+11]=ht.itemSize===4?l.w:1)}}x={count:g,texture:B,size:new ne(q,I)},a.set(d,x),d.addEventListener("dispose",b)}if(f.isInstancedMesh===!0&&f.morphTexture!==null)p.getUniforms().setValue(r,"morphTexture",f.morphTexture,n);else{let y=0;for(let S=0;S<m.length;S++)y+=m[S];const T=d.morphTargetsRelative?1:1-y;p.getUniforms().setValue(r,"morphTargetBaseInfluence",T),p.getUniforms().setValue(r,"morphTargetInfluences",m)}p.getUniforms().setValue(r,"morphTargetsTexture",x.texture,n),p.getUniforms().setValue(r,"morphTargetsTextureSize",x.size)}return{update:c}}function Pb(r,t,n,a){let l=new WeakMap;function c(p){const m=a.render.frame,v=p.geometry,g=t.get(p,v);if(l.get(g)!==m&&(t.update(g),l.set(g,m)),p.isInstancedMesh&&(p.hasEventListener("dispose",d)===!1&&p.addEventListener("dispose",d),l.get(p)!==m&&(n.update(p.instanceMatrix,r.ARRAY_BUFFER),p.instanceColor!==null&&n.update(p.instanceColor,r.ARRAY_BUFFER),l.set(p,m))),p.isSkinnedMesh){const x=p.skeleton;l.get(x)!==m&&(x.update(),l.set(x,m))}return g}function f(){l=new WeakMap}function d(p){const m=p.target;m.removeEventListener("dispose",d),n.remove(m.instanceMatrix),m.instanceColor!==null&&n.remove(m.instanceColor)}return{update:c,dispose:f}}class O_ extends kn{constructor(t,n,a,l,c,f,d,p,m,v=Yr){if(v!==Yr&&v!==to)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");a===void 0&&v===Yr&&(a=Xs),a===void 0&&v===to&&(a=$r),super(null,l,c,f,d,p,v,a,m),this.isDepthTexture=!0,this.image={width:t,height:n},this.magFilter=d!==void 0?d:mi,this.minFilter=p!==void 0?p:mi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const P_=new kn,fx=new O_(1,1),z_=new b_,B_=new y1,I_=new U_,hx=[],dx=[],px=new Float32Array(16),mx=new Float32Array(9),gx=new Float32Array(4);function so(r,t,n){const a=r[0];if(a<=0||a>0)return r;const l=t*n;let c=hx[l];if(c===void 0&&(c=new Float32Array(l),hx[l]=c),t!==0){a.toArray(c,0);for(let f=1,d=0;f!==t;++f)d+=n,r[f].toArray(c,d)}return c}function Mn(r,t){if(r.length!==t.length)return!1;for(let n=0,a=r.length;n<a;n++)if(r[n]!==t[n])return!1;return!0}function Sn(r,t){for(let n=0,a=t.length;n<a;n++)r[n]=t[n]}function yu(r,t){let n=dx[t];n===void 0&&(n=new Int32Array(t),dx[t]=n);for(let a=0;a!==t;++a)n[a]=r.allocateTextureUnit();return n}function zb(r,t){const n=this.cache;n[0]!==t&&(r.uniform1f(this.addr,t),n[0]=t)}function Bb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Mn(n,t))return;r.uniform2fv(this.addr,t),Sn(n,t)}}function Ib(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Mn(n,t))return;r.uniform3fv(this.addr,t),Sn(n,t)}}function Fb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Mn(n,t))return;r.uniform4fv(this.addr,t),Sn(n,t)}}function Hb(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(Mn(n,t))return;r.uniformMatrix2fv(this.addr,!1,t),Sn(n,t)}else{if(Mn(n,a))return;gx.set(a),r.uniformMatrix2fv(this.addr,!1,gx),Sn(n,a)}}function Gb(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(Mn(n,t))return;r.uniformMatrix3fv(this.addr,!1,t),Sn(n,t)}else{if(Mn(n,a))return;mx.set(a),r.uniformMatrix3fv(this.addr,!1,mx),Sn(n,a)}}function Vb(r,t){const n=this.cache,a=t.elements;if(a===void 0){if(Mn(n,t))return;r.uniformMatrix4fv(this.addr,!1,t),Sn(n,t)}else{if(Mn(n,a))return;px.set(a),r.uniformMatrix4fv(this.addr,!1,px),Sn(n,a)}}function kb(r,t){const n=this.cache;n[0]!==t&&(r.uniform1i(this.addr,t),n[0]=t)}function Xb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Mn(n,t))return;r.uniform2iv(this.addr,t),Sn(n,t)}}function Wb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Mn(n,t))return;r.uniform3iv(this.addr,t),Sn(n,t)}}function qb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Mn(n,t))return;r.uniform4iv(this.addr,t),Sn(n,t)}}function jb(r,t){const n=this.cache;n[0]!==t&&(r.uniform1ui(this.addr,t),n[0]=t)}function Yb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Mn(n,t))return;r.uniform2uiv(this.addr,t),Sn(n,t)}}function Zb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Mn(n,t))return;r.uniform3uiv(this.addr,t),Sn(n,t)}}function Kb(r,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Mn(n,t))return;r.uniform4uiv(this.addr,t),Sn(n,t)}}function Qb(r,t,n){const a=this.cache,l=n.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(fx.compareFunction=y_,c=fx):c=P_,n.setTexture2D(t||c,l)}function Jb(r,t,n){const a=this.cache,l=n.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l),n.setTexture3D(t||B_,l)}function $b(r,t,n){const a=this.cache,l=n.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l),n.setTextureCube(t||I_,l)}function tA(r,t,n){const a=this.cache,l=n.allocateTextureUnit();a[0]!==l&&(r.uniform1i(this.addr,l),a[0]=l),n.setTexture2DArray(t||z_,l)}function eA(r){switch(r){case 5126:return zb;case 35664:return Bb;case 35665:return Ib;case 35666:return Fb;case 35674:return Hb;case 35675:return Gb;case 35676:return Vb;case 5124:case 35670:return kb;case 35667:case 35671:return Xb;case 35668:case 35672:return Wb;case 35669:case 35673:return qb;case 5125:return jb;case 36294:return Yb;case 36295:return Zb;case 36296:return Kb;case 35678:case 36198:case 36298:case 36306:case 35682:return Qb;case 35679:case 36299:case 36307:return Jb;case 35680:case 36300:case 36308:case 36293:return $b;case 36289:case 36303:case 36311:case 36292:return tA}}function nA(r,t){r.uniform1fv(this.addr,t)}function iA(r,t){const n=so(t,this.size,2);r.uniform2fv(this.addr,n)}function aA(r,t){const n=so(t,this.size,3);r.uniform3fv(this.addr,n)}function sA(r,t){const n=so(t,this.size,4);r.uniform4fv(this.addr,n)}function rA(r,t){const n=so(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,n)}function oA(r,t){const n=so(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,n)}function lA(r,t){const n=so(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,n)}function cA(r,t){r.uniform1iv(this.addr,t)}function uA(r,t){r.uniform2iv(this.addr,t)}function fA(r,t){r.uniform3iv(this.addr,t)}function hA(r,t){r.uniform4iv(this.addr,t)}function dA(r,t){r.uniform1uiv(this.addr,t)}function pA(r,t){r.uniform2uiv(this.addr,t)}function mA(r,t){r.uniform3uiv(this.addr,t)}function gA(r,t){r.uniform4uiv(this.addr,t)}function vA(r,t,n){const a=this.cache,l=t.length,c=yu(n,l);Mn(a,c)||(r.uniform1iv(this.addr,c),Sn(a,c));for(let f=0;f!==l;++f)n.setTexture2D(t[f]||P_,c[f])}function xA(r,t,n){const a=this.cache,l=t.length,c=yu(n,l);Mn(a,c)||(r.uniform1iv(this.addr,c),Sn(a,c));for(let f=0;f!==l;++f)n.setTexture3D(t[f]||B_,c[f])}function _A(r,t,n){const a=this.cache,l=t.length,c=yu(n,l);Mn(a,c)||(r.uniform1iv(this.addr,c),Sn(a,c));for(let f=0;f!==l;++f)n.setTextureCube(t[f]||I_,c[f])}function MA(r,t,n){const a=this.cache,l=t.length,c=yu(n,l);Mn(a,c)||(r.uniform1iv(this.addr,c),Sn(a,c));for(let f=0;f!==l;++f)n.setTexture2DArray(t[f]||z_,c[f])}function SA(r){switch(r){case 5126:return nA;case 35664:return iA;case 35665:return aA;case 35666:return sA;case 35674:return rA;case 35675:return oA;case 35676:return lA;case 5124:case 35670:return cA;case 35667:case 35671:return uA;case 35668:case 35672:return fA;case 35669:case 35673:return hA;case 5125:return dA;case 36294:return pA;case 36295:return mA;case 36296:return gA;case 35678:case 36198:case 36298:case 36306:case 35682:return vA;case 35679:case 36299:case 36307:return xA;case 35680:case 36300:case 36308:case 36293:return _A;case 36289:case 36303:case 36311:case 36292:return MA}}class yA{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.setValue=eA(n.type)}}class EA{constructor(t,n,a){this.id=t,this.addr=a,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=SA(n.type)}}class TA{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,a){const l=this.seq;for(let c=0,f=l.length;c!==f;++c){const d=l[c];d.setValue(t,n[d.id],a)}}}const pd=/(\w+)(\])?(\[|\.)?/g;function vx(r,t){r.seq.push(t),r.map[t.id]=t}function bA(r,t,n){const a=r.name,l=a.length;for(pd.lastIndex=0;;){const c=pd.exec(a),f=pd.lastIndex;let d=c[1];const p=c[2]==="]",m=c[3];if(p&&(d=d|0),m===void 0||m==="["&&f+2===l){vx(n,m===void 0?new yA(d,r,t):new EA(d,r,t));break}else{let g=n.map[d];g===void 0&&(g=new TA(d),vx(n,g)),n=g}}}class fu{constructor(t,n){this.seq=[],this.map={};const a=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let l=0;l<a;++l){const c=t.getActiveUniform(n,l),f=t.getUniformLocation(n,c.name);bA(c,f,this)}}setValue(t,n,a,l){const c=this.map[n];c!==void 0&&c.setValue(t,a,l)}setOptional(t,n,a){const l=n[a];l!==void 0&&this.setValue(t,a,l)}static upload(t,n,a,l){for(let c=0,f=n.length;c!==f;++c){const d=n[c],p=a[d.id];p.needsUpdate!==!1&&d.setValue(t,p.value,l)}}static seqWithValue(t,n){const a=[];for(let l=0,c=t.length;l!==c;++l){const f=t[l];f.id in n&&a.push(f)}return a}}function xx(r,t,n){const a=r.createShader(t);return r.shaderSource(a,n),r.compileShader(a),a}const AA=37297;let wA=0;function RA(r,t){const n=r.split(`
`),a=[],l=Math.max(t-6,0),c=Math.min(t+6,n.length);for(let f=l;f<c;f++){const d=f+1;a.push(`${d===t?">":" "} ${d}: ${n[f]}`)}return a.join(`
`)}const _x=new he;function CA(r){Re._getMatrix(_x,Re.workingColorSpace,r);const t=`mat3( ${_x.elements.map(n=>n.toFixed(4))} )`;switch(Re.getTransfer(r)){case Mu:return[t,"LinearTransferOETF"];case He:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Mx(r,t,n){const a=r.getShaderParameter(t,r.COMPILE_STATUS),l=r.getShaderInfoLog(t).trim();if(a&&l==="")return"";const c=/ERROR: 0:(\d+)/.exec(l);if(c){const f=parseInt(c[1]);return n.toUpperCase()+`

`+l+`

`+RA(r.getShaderSource(t),f)}else return l}function DA(r,t){const n=CA(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function LA(r,t){let n;switch(t){case a_:n="Linear";break;case s_:n="Reinhard";break;case r_:n="Cineon";break;case o_:n="ACESFilmic";break;case l_:n="AgX";break;case c_:n="Neutral";break;case e1:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+r+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Wc=new V;function UA(){Re.getLuminanceCoefficients(Wc);const r=Wc.x.toFixed(4),t=Wc.y.toFixed(4),n=Wc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function NA(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(cl).join(`
`)}function OA(r){const t=[];for(const n in r){const a=r[n];a!==!1&&t.push("#define "+n+" "+a)}return t.join(`
`)}function PA(r,t){const n={},a=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let l=0;l<a;l++){const c=r.getActiveAttrib(t,l),f=c.name;let d=1;c.type===r.FLOAT_MAT2&&(d=2),c.type===r.FLOAT_MAT3&&(d=3),c.type===r.FLOAT_MAT4&&(d=4),n[f]={type:c.type,location:r.getAttribLocation(t,f),locationSize:d}}return n}function cl(r){return r!==""}function Sx(r,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function yx(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const zA=/^[ \t]*#include +<([\w\d./]+)>/gm;function up(r){return r.replace(zA,IA)}const BA=new Map;function IA(r,t){let n=de[t];if(n===void 0){const a=BA.get(t);if(a!==void 0)n=de[a],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,a);else throw new Error("Can not resolve #include <"+t+">")}return up(n)}const FA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ex(r){return r.replace(FA,HA)}function HA(r,t,n,a){let l="";for(let c=parseInt(t);c<parseInt(n);c++)l+=a.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function Tx(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}function GA(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===n_?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Oy?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Ea&&(t="SHADOWMAP_TYPE_VSM"),t}function VA(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Qr:case Jr:t="ENVMAP_TYPE_CUBE";break;case _u:t="ENVMAP_TYPE_CUBE_UV";break}return t}function kA(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Jr:t="ENVMAP_MODE_REFRACTION";break}return t}function XA(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case i_:t="ENVMAP_BLENDING_MULTIPLY";break;case $y:t="ENVMAP_BLENDING_MIX";break;case t1:t="ENVMAP_BLENDING_ADD";break}return t}function WA(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,a=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:a,maxMip:n}}function qA(r,t,n,a){const l=r.getContext(),c=n.defines;let f=n.vertexShader,d=n.fragmentShader;const p=GA(n),m=VA(n),v=kA(n),g=XA(n),x=WA(n),M=NA(n),y=OA(c),T=l.createProgram();let S,_,L=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(S=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y].filter(cl).join(`
`),S.length>0&&(S+=`
`),_=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y].filter(cl).join(`
`),_.length>0&&(_+=`
`)):(S=[Tx(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+v:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+p:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(cl).join(`
`),_=[Tx(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,y,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+m:"",n.envMap?"#define "+v:"",n.envMap?"#define "+g:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+p:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==us?"#define TONE_MAPPING":"",n.toneMapping!==us?de.tonemapping_pars_fragment:"",n.toneMapping!==us?LA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",de.colorspace_pars_fragment,DA("linearToOutputTexel",n.outputColorSpace),UA(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(cl).join(`
`)),f=up(f),f=Sx(f,n),f=yx(f,n),d=up(d),d=Sx(d,n),d=yx(d,n),f=Ex(f),d=Ex(d),n.isRawShaderMaterial!==!0&&(L=`#version 300 es
`,S=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,_=["#define varying in",n.glslVersion===Bv?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Bv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const U=L+S+f,R=L+_+d,q=xx(l,l.VERTEX_SHADER,U),I=xx(l,l.FRAGMENT_SHADER,R);l.attachShader(T,q),l.attachShader(T,I),n.index0AttributeName!==void 0?l.bindAttribLocation(T,0,n.index0AttributeName):n.morphTargets===!0&&l.bindAttribLocation(T,0,"position"),l.linkProgram(T);function N(H){if(r.debug.checkShaderErrors){const tt=l.getProgramInfoLog(T).trim(),st=l.getShaderInfoLog(q).trim(),ht=l.getShaderInfoLog(I).trim();let mt=!0,z=!0;if(l.getProgramParameter(T,l.LINK_STATUS)===!1)if(mt=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,T,q,I);else{const Q=Mx(l,q,"vertex"),K=Mx(l,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(T,l.VALIDATE_STATUS)+`

Material Name: `+H.name+`
Material Type: `+H.type+`

Program Info Log: `+tt+`
`+Q+`
`+K)}else tt!==""?console.warn("THREE.WebGLProgram: Program Info Log:",tt):(st===""||ht==="")&&(z=!1);z&&(H.diagnostics={runnable:mt,programLog:tt,vertexShader:{log:st,prefix:S},fragmentShader:{log:ht,prefix:_}})}l.deleteShader(q),l.deleteShader(I),B=new fu(l,T),C=PA(l,T)}let B;this.getUniforms=function(){return B===void 0&&N(this),B};let C;this.getAttributes=function(){return C===void 0&&N(this),C};let b=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=l.getProgramParameter(T,AA)),b},this.destroy=function(){a.releaseStatesOfProgram(this),l.deleteProgram(T),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=wA++,this.cacheKey=t,this.usedTimes=1,this.program=T,this.vertexShader=q,this.fragmentShader=I,this}let jA=0;class YA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,a=t.fragmentShader,l=this._getShaderStage(n),c=this._getShaderStage(a),f=this._getShaderCacheForMaterial(t);return f.has(l)===!1&&(f.add(l),l.usedTimes++),f.has(c)===!1&&(f.add(c),c.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const a of n)a.usedTimes--,a.usedTimes===0&&this.shaderCache.delete(a.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let a=n.get(t);return a===void 0&&(a=new Set,n.set(t,a)),a}_getShaderStage(t){const n=this.shaderCache;let a=n.get(t);return a===void 0&&(a=new ZA(t),n.set(t,a)),a}}class ZA{constructor(t){this.id=jA++,this.code=t,this.usedTimes=0}}function KA(r,t,n,a,l,c,f){const d=new A_,p=new YA,m=new Set,v=[],g=l.logarithmicDepthBuffer,x=l.vertexTextures;let M=l.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(C){return m.add(C),C===0?"uv":`uv${C}`}function S(C,b,H,tt,st){const ht=tt.fog,mt=st.geometry,z=C.isMeshStandardMaterial?tt.environment:null,Q=(C.isMeshStandardMaterial?n:t).get(C.envMap||z),K=Q&&Q.mapping===_u?Q.image.height:null,St=y[C.type];C.precision!==null&&(M=l.getMaxPrecision(C.precision),M!==C.precision&&console.warn("THREE.WebGLProgram.getParameters:",C.precision,"not supported, using",M,"instead."));const Tt=mt.morphAttributes.position||mt.morphAttributes.normal||mt.morphAttributes.color,P=Tt!==void 0?Tt.length:0;let it=0;mt.morphAttributes.position!==void 0&&(it=1),mt.morphAttributes.normal!==void 0&&(it=2),mt.morphAttributes.color!==void 0&&(it=3);let Mt,Z,ut,Et;if(St){const Ce=Qi[St];Mt=Ce.vertexShader,Z=Ce.fragmentShader}else Mt=C.vertexShader,Z=C.fragmentShader,p.update(C),ut=p.getVertexShaderID(C),Et=p.getFragmentShaderID(C);const _t=r.getRenderTarget(),Vt=r.state.buffers.depth.getReversed(),Gt=st.isInstancedMesh===!0,oe=st.isBatchedMesh===!0,Ge=!!C.map,ge=!!C.matcap,$e=!!Q,j=!!C.aoMap,Bn=!!C.lightMap,me=!!C.bumpMap,_e=!!C.normalMap,Qt=!!C.displacementMap,ze=!!C.emissiveMap,Zt=!!C.metalnessMap,O=!!C.roughnessMap,w=C.anisotropy>0,nt=C.clearcoat>0,dt=C.dispersion>0,yt=C.iridescence>0,gt=C.sheen>0,qt=C.transmission>0,Lt=w&&!!C.anisotropyMap,zt=nt&&!!C.clearcoatMap,Me=nt&&!!C.clearcoatNormalMap,At=nt&&!!C.clearcoatRoughnessMap,Bt=yt&&!!C.iridescenceMap,Kt=yt&&!!C.iridescenceThicknessMap,jt=gt&&!!C.sheenColorMap,Ot=gt&&!!C.sheenRoughnessMap,ie=!!C.specularMap,ce=!!C.specularColorMap,Ve=!!C.specularIntensityMap,k=qt&&!!C.transmissionMap,wt=qt&&!!C.thicknessMap,ct=!!C.gradientMap,xt=!!C.alphaMap,Rt=C.alphaTest>0,Ut=!!C.alphaHash,ae=!!C.extensions;let tn=us;C.toneMapped&&(_t===null||_t.isXRRenderTarget===!0)&&(tn=r.toneMapping);const vn={shaderID:St,shaderType:C.type,shaderName:C.name,vertexShader:Mt,fragmentShader:Z,defines:C.defines,customVertexShaderID:ut,customFragmentShaderID:Et,isRawShaderMaterial:C.isRawShaderMaterial===!0,glslVersion:C.glslVersion,precision:M,batching:oe,batchingColor:oe&&st._colorsTexture!==null,instancing:Gt,instancingColor:Gt&&st.instanceColor!==null,instancingMorph:Gt&&st.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:_t===null?r.outputColorSpace:_t.isXRRenderTarget===!0?_t.texture.colorSpace:io,alphaToCoverage:!!C.alphaToCoverage,map:Ge,matcap:ge,envMap:$e,envMapMode:$e&&Q.mapping,envMapCubeUVHeight:K,aoMap:j,lightMap:Bn,bumpMap:me,normalMap:_e,displacementMap:x&&Qt,emissiveMap:ze,normalMapObjectSpace:_e&&C.normalMapType===s1,normalMapTangentSpace:_e&&C.normalMapType===S_,metalnessMap:Zt,roughnessMap:O,anisotropy:w,anisotropyMap:Lt,clearcoat:nt,clearcoatMap:zt,clearcoatNormalMap:Me,clearcoatRoughnessMap:At,dispersion:dt,iridescence:yt,iridescenceMap:Bt,iridescenceThicknessMap:Kt,sheen:gt,sheenColorMap:jt,sheenRoughnessMap:Ot,specularMap:ie,specularColorMap:ce,specularIntensityMap:Ve,transmission:qt,transmissionMap:k,thicknessMap:wt,gradientMap:ct,opaque:C.transparent===!1&&C.blending===qr&&C.alphaToCoverage===!1,alphaMap:xt,alphaTest:Rt,alphaHash:Ut,combine:C.combine,mapUv:Ge&&T(C.map.channel),aoMapUv:j&&T(C.aoMap.channel),lightMapUv:Bn&&T(C.lightMap.channel),bumpMapUv:me&&T(C.bumpMap.channel),normalMapUv:_e&&T(C.normalMap.channel),displacementMapUv:Qt&&T(C.displacementMap.channel),emissiveMapUv:ze&&T(C.emissiveMap.channel),metalnessMapUv:Zt&&T(C.metalnessMap.channel),roughnessMapUv:O&&T(C.roughnessMap.channel),anisotropyMapUv:Lt&&T(C.anisotropyMap.channel),clearcoatMapUv:zt&&T(C.clearcoatMap.channel),clearcoatNormalMapUv:Me&&T(C.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:At&&T(C.clearcoatRoughnessMap.channel),iridescenceMapUv:Bt&&T(C.iridescenceMap.channel),iridescenceThicknessMapUv:Kt&&T(C.iridescenceThicknessMap.channel),sheenColorMapUv:jt&&T(C.sheenColorMap.channel),sheenRoughnessMapUv:Ot&&T(C.sheenRoughnessMap.channel),specularMapUv:ie&&T(C.specularMap.channel),specularColorMapUv:ce&&T(C.specularColorMap.channel),specularIntensityMapUv:Ve&&T(C.specularIntensityMap.channel),transmissionMapUv:k&&T(C.transmissionMap.channel),thicknessMapUv:wt&&T(C.thicknessMap.channel),alphaMapUv:xt&&T(C.alphaMap.channel),vertexTangents:!!mt.attributes.tangent&&(_e||w),vertexColors:C.vertexColors,vertexAlphas:C.vertexColors===!0&&!!mt.attributes.color&&mt.attributes.color.itemSize===4,pointsUvs:st.isPoints===!0&&!!mt.attributes.uv&&(Ge||xt),fog:!!ht,useFog:C.fog===!0,fogExp2:!!ht&&ht.isFogExp2,flatShading:C.flatShading===!0,sizeAttenuation:C.sizeAttenuation===!0,logarithmicDepthBuffer:g,reverseDepthBuffer:Vt,skinning:st.isSkinnedMesh===!0,morphTargets:mt.morphAttributes.position!==void 0,morphNormals:mt.morphAttributes.normal!==void 0,morphColors:mt.morphAttributes.color!==void 0,morphTargetsCount:P,morphTextureStride:it,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:C.dithering,shadowMapEnabled:r.shadowMap.enabled&&H.length>0,shadowMapType:r.shadowMap.type,toneMapping:tn,decodeVideoTexture:Ge&&C.map.isVideoTexture===!0&&Re.getTransfer(C.map.colorSpace)===He,decodeVideoTextureEmissive:ze&&C.emissiveMap.isVideoTexture===!0&&Re.getTransfer(C.emissiveMap.colorSpace)===He,premultipliedAlpha:C.premultipliedAlpha,doubleSided:C.side===ba,flipSided:C.side===ii,useDepthPacking:C.depthPacking>=0,depthPacking:C.depthPacking||0,index0AttributeName:C.index0AttributeName,extensionClipCullDistance:ae&&C.extensions.clipCullDistance===!0&&a.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&C.extensions.multiDraw===!0||oe)&&a.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:a.has("KHR_parallel_shader_compile"),customProgramCacheKey:C.customProgramCacheKey()};return vn.vertexUv1s=m.has(1),vn.vertexUv2s=m.has(2),vn.vertexUv3s=m.has(3),m.clear(),vn}function _(C){const b=[];if(C.shaderID?b.push(C.shaderID):(b.push(C.customVertexShaderID),b.push(C.customFragmentShaderID)),C.defines!==void 0)for(const H in C.defines)b.push(H),b.push(C.defines[H]);return C.isRawShaderMaterial===!1&&(L(b,C),U(b,C),b.push(r.outputColorSpace)),b.push(C.customProgramCacheKey),b.join()}function L(C,b){C.push(b.precision),C.push(b.outputColorSpace),C.push(b.envMapMode),C.push(b.envMapCubeUVHeight),C.push(b.mapUv),C.push(b.alphaMapUv),C.push(b.lightMapUv),C.push(b.aoMapUv),C.push(b.bumpMapUv),C.push(b.normalMapUv),C.push(b.displacementMapUv),C.push(b.emissiveMapUv),C.push(b.metalnessMapUv),C.push(b.roughnessMapUv),C.push(b.anisotropyMapUv),C.push(b.clearcoatMapUv),C.push(b.clearcoatNormalMapUv),C.push(b.clearcoatRoughnessMapUv),C.push(b.iridescenceMapUv),C.push(b.iridescenceThicknessMapUv),C.push(b.sheenColorMapUv),C.push(b.sheenRoughnessMapUv),C.push(b.specularMapUv),C.push(b.specularColorMapUv),C.push(b.specularIntensityMapUv),C.push(b.transmissionMapUv),C.push(b.thicknessMapUv),C.push(b.combine),C.push(b.fogExp2),C.push(b.sizeAttenuation),C.push(b.morphTargetsCount),C.push(b.morphAttributeCount),C.push(b.numDirLights),C.push(b.numPointLights),C.push(b.numSpotLights),C.push(b.numSpotLightMaps),C.push(b.numHemiLights),C.push(b.numRectAreaLights),C.push(b.numDirLightShadows),C.push(b.numPointLightShadows),C.push(b.numSpotLightShadows),C.push(b.numSpotLightShadowsWithMaps),C.push(b.numLightProbes),C.push(b.shadowMapType),C.push(b.toneMapping),C.push(b.numClippingPlanes),C.push(b.numClipIntersection),C.push(b.depthPacking)}function U(C,b){d.disableAll(),b.supportsVertexTextures&&d.enable(0),b.instancing&&d.enable(1),b.instancingColor&&d.enable(2),b.instancingMorph&&d.enable(3),b.matcap&&d.enable(4),b.envMap&&d.enable(5),b.normalMapObjectSpace&&d.enable(6),b.normalMapTangentSpace&&d.enable(7),b.clearcoat&&d.enable(8),b.iridescence&&d.enable(9),b.alphaTest&&d.enable(10),b.vertexColors&&d.enable(11),b.vertexAlphas&&d.enable(12),b.vertexUv1s&&d.enable(13),b.vertexUv2s&&d.enable(14),b.vertexUv3s&&d.enable(15),b.vertexTangents&&d.enable(16),b.anisotropy&&d.enable(17),b.alphaHash&&d.enable(18),b.batching&&d.enable(19),b.dispersion&&d.enable(20),b.batchingColor&&d.enable(21),C.push(d.mask),d.disableAll(),b.fog&&d.enable(0),b.useFog&&d.enable(1),b.flatShading&&d.enable(2),b.logarithmicDepthBuffer&&d.enable(3),b.reverseDepthBuffer&&d.enable(4),b.skinning&&d.enable(5),b.morphTargets&&d.enable(6),b.morphNormals&&d.enable(7),b.morphColors&&d.enable(8),b.premultipliedAlpha&&d.enable(9),b.shadowMapEnabled&&d.enable(10),b.doubleSided&&d.enable(11),b.flipSided&&d.enable(12),b.useDepthPacking&&d.enable(13),b.dithering&&d.enable(14),b.transmission&&d.enable(15),b.sheen&&d.enable(16),b.opaque&&d.enable(17),b.pointsUvs&&d.enable(18),b.decodeVideoTexture&&d.enable(19),b.decodeVideoTextureEmissive&&d.enable(20),b.alphaToCoverage&&d.enable(21),C.push(d.mask)}function R(C){const b=y[C.type];let H;if(b){const tt=Qi[b];H=fs.clone(tt.uniforms)}else H=C.uniforms;return H}function q(C,b){let H;for(let tt=0,st=v.length;tt<st;tt++){const ht=v[tt];if(ht.cacheKey===b){H=ht,++H.usedTimes;break}}return H===void 0&&(H=new qA(r,b,C,c),v.push(H)),H}function I(C){if(--C.usedTimes===0){const b=v.indexOf(C);v[b]=v[v.length-1],v.pop(),C.destroy()}}function N(C){p.remove(C)}function B(){p.dispose()}return{getParameters:S,getProgramCacheKey:_,getUniforms:R,acquireProgram:q,releaseProgram:I,releaseShaderCache:N,programs:v,dispose:B}}function QA(){let r=new WeakMap;function t(f){return r.has(f)}function n(f){let d=r.get(f);return d===void 0&&(d={},r.set(f,d)),d}function a(f){r.delete(f)}function l(f,d,p){r.get(f)[d]=p}function c(){r=new WeakMap}return{has:t,get:n,remove:a,update:l,dispose:c}}function JA(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function bx(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Ax(){const r=[];let t=0;const n=[],a=[],l=[];function c(){t=0,n.length=0,a.length=0,l.length=0}function f(g,x,M,y,T,S){let _=r[t];return _===void 0?(_={id:g.id,object:g,geometry:x,material:M,groupOrder:y,renderOrder:g.renderOrder,z:T,group:S},r[t]=_):(_.id=g.id,_.object=g,_.geometry=x,_.material=M,_.groupOrder=y,_.renderOrder=g.renderOrder,_.z=T,_.group=S),t++,_}function d(g,x,M,y,T,S){const _=f(g,x,M,y,T,S);M.transmission>0?a.push(_):M.transparent===!0?l.push(_):n.push(_)}function p(g,x,M,y,T,S){const _=f(g,x,M,y,T,S);M.transmission>0?a.unshift(_):M.transparent===!0?l.unshift(_):n.unshift(_)}function m(g,x){n.length>1&&n.sort(g||JA),a.length>1&&a.sort(x||bx),l.length>1&&l.sort(x||bx)}function v(){for(let g=t,x=r.length;g<x;g++){const M=r[g];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:n,transmissive:a,transparent:l,init:c,push:d,unshift:p,finish:v,sort:m}}function $A(){let r=new WeakMap;function t(a,l){const c=r.get(a);let f;return c===void 0?(f=new Ax,r.set(a,[f])):l>=c.length?(f=new Ax,c.push(f)):f=c[l],f}function n(){r=new WeakMap}return{get:t,dispose:n}}function t2(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new V,color:new te};break;case"SpotLight":n={position:new V,direction:new V,color:new te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new V,color:new te,distance:0,decay:0};break;case"HemisphereLight":n={direction:new V,skyColor:new te,groundColor:new te};break;case"RectAreaLight":n={color:new te,position:new V,halfWidth:new V,halfHeight:new V};break}return r[t.id]=n,n}}}function e2(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=n,n}}}let n2=0;function i2(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function a2(r){const t=new t2,n=e2(),a={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)a.probe.push(new V);const l=new V,c=new Je,f=new Je;function d(m){let v=0,g=0,x=0;for(let C=0;C<9;C++)a.probe[C].set(0,0,0);let M=0,y=0,T=0,S=0,_=0,L=0,U=0,R=0,q=0,I=0,N=0;m.sort(i2);for(let C=0,b=m.length;C<b;C++){const H=m[C],tt=H.color,st=H.intensity,ht=H.distance,mt=H.shadow&&H.shadow.map?H.shadow.map.texture:null;if(H.isAmbientLight)v+=tt.r*st,g+=tt.g*st,x+=tt.b*st;else if(H.isLightProbe){for(let z=0;z<9;z++)a.probe[z].addScaledVector(H.sh.coefficients[z],st);N++}else if(H.isDirectionalLight){const z=t.get(H);if(z.color.copy(H.color).multiplyScalar(H.intensity),H.castShadow){const Q=H.shadow,K=n.get(H);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,a.directionalShadow[M]=K,a.directionalShadowMap[M]=mt,a.directionalShadowMatrix[M]=H.shadow.matrix,L++}a.directional[M]=z,M++}else if(H.isSpotLight){const z=t.get(H);z.position.setFromMatrixPosition(H.matrixWorld),z.color.copy(tt).multiplyScalar(st),z.distance=ht,z.coneCos=Math.cos(H.angle),z.penumbraCos=Math.cos(H.angle*(1-H.penumbra)),z.decay=H.decay,a.spot[T]=z;const Q=H.shadow;if(H.map&&(a.spotLightMap[q]=H.map,q++,Q.updateMatrices(H),H.castShadow&&I++),a.spotLightMatrix[T]=Q.matrix,H.castShadow){const K=n.get(H);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,a.spotShadow[T]=K,a.spotShadowMap[T]=mt,R++}T++}else if(H.isRectAreaLight){const z=t.get(H);z.color.copy(tt).multiplyScalar(st),z.halfWidth.set(H.width*.5,0,0),z.halfHeight.set(0,H.height*.5,0),a.rectArea[S]=z,S++}else if(H.isPointLight){const z=t.get(H);if(z.color.copy(H.color).multiplyScalar(H.intensity),z.distance=H.distance,z.decay=H.decay,H.castShadow){const Q=H.shadow,K=n.get(H);K.shadowIntensity=Q.intensity,K.shadowBias=Q.bias,K.shadowNormalBias=Q.normalBias,K.shadowRadius=Q.radius,K.shadowMapSize=Q.mapSize,K.shadowCameraNear=Q.camera.near,K.shadowCameraFar=Q.camera.far,a.pointShadow[y]=K,a.pointShadowMap[y]=mt,a.pointShadowMatrix[y]=H.shadow.matrix,U++}a.point[y]=z,y++}else if(H.isHemisphereLight){const z=t.get(H);z.skyColor.copy(H.color).multiplyScalar(st),z.groundColor.copy(H.groundColor).multiplyScalar(st),a.hemi[_]=z,_++}}S>0&&(r.has("OES_texture_float_linear")===!0?(a.rectAreaLTC1=Nt.LTC_FLOAT_1,a.rectAreaLTC2=Nt.LTC_FLOAT_2):(a.rectAreaLTC1=Nt.LTC_HALF_1,a.rectAreaLTC2=Nt.LTC_HALF_2)),a.ambient[0]=v,a.ambient[1]=g,a.ambient[2]=x;const B=a.hash;(B.directionalLength!==M||B.pointLength!==y||B.spotLength!==T||B.rectAreaLength!==S||B.hemiLength!==_||B.numDirectionalShadows!==L||B.numPointShadows!==U||B.numSpotShadows!==R||B.numSpotMaps!==q||B.numLightProbes!==N)&&(a.directional.length=M,a.spot.length=T,a.rectArea.length=S,a.point.length=y,a.hemi.length=_,a.directionalShadow.length=L,a.directionalShadowMap.length=L,a.pointShadow.length=U,a.pointShadowMap.length=U,a.spotShadow.length=R,a.spotShadowMap.length=R,a.directionalShadowMatrix.length=L,a.pointShadowMatrix.length=U,a.spotLightMatrix.length=R+q-I,a.spotLightMap.length=q,a.numSpotLightShadowsWithMaps=I,a.numLightProbes=N,B.directionalLength=M,B.pointLength=y,B.spotLength=T,B.rectAreaLength=S,B.hemiLength=_,B.numDirectionalShadows=L,B.numPointShadows=U,B.numSpotShadows=R,B.numSpotMaps=q,B.numLightProbes=N,a.version=n2++)}function p(m,v){let g=0,x=0,M=0,y=0,T=0;const S=v.matrixWorldInverse;for(let _=0,L=m.length;_<L;_++){const U=m[_];if(U.isDirectionalLight){const R=a.directional[g];R.direction.setFromMatrixPosition(U.matrixWorld),l.setFromMatrixPosition(U.target.matrixWorld),R.direction.sub(l),R.direction.transformDirection(S),g++}else if(U.isSpotLight){const R=a.spot[M];R.position.setFromMatrixPosition(U.matrixWorld),R.position.applyMatrix4(S),R.direction.setFromMatrixPosition(U.matrixWorld),l.setFromMatrixPosition(U.target.matrixWorld),R.direction.sub(l),R.direction.transformDirection(S),M++}else if(U.isRectAreaLight){const R=a.rectArea[y];R.position.setFromMatrixPosition(U.matrixWorld),R.position.applyMatrix4(S),f.identity(),c.copy(U.matrixWorld),c.premultiply(S),f.extractRotation(c),R.halfWidth.set(U.width*.5,0,0),R.halfHeight.set(0,U.height*.5,0),R.halfWidth.applyMatrix4(f),R.halfHeight.applyMatrix4(f),y++}else if(U.isPointLight){const R=a.point[x];R.position.setFromMatrixPosition(U.matrixWorld),R.position.applyMatrix4(S),x++}else if(U.isHemisphereLight){const R=a.hemi[T];R.direction.setFromMatrixPosition(U.matrixWorld),R.direction.transformDirection(S),T++}}}return{setup:d,setupView:p,state:a}}function wx(r){const t=new a2(r),n=[],a=[];function l(v){m.camera=v,n.length=0,a.length=0}function c(v){n.push(v)}function f(v){a.push(v)}function d(){t.setup(n)}function p(v){t.setupView(n,v)}const m={lightsArray:n,shadowsArray:a,camera:null,lights:t,transmissionRenderTarget:{}};return{init:l,state:m,setupLights:d,setupLightsView:p,pushLight:c,pushShadow:f}}function s2(r){let t=new WeakMap;function n(l,c=0){const f=t.get(l);let d;return f===void 0?(d=new wx(r),t.set(l,[d])):c>=f.length?(d=new wx(r),f.push(d)):d=f[c],d}function a(){t=new WeakMap}return{get:n,dispose:a}}class r2 extends Ws{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=i1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class o2 extends Ws{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const l2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,c2=`uniform sampler2D shadow_pass;
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
}`;function u2(r,t,n){let a=new Ep;const l=new ne,c=new ne,f=new je,d=new r2({depthPacking:a1}),p=new o2,m={},v=n.maxTextureSize,g={[hs]:ii,[ii]:hs,[ba]:ba},x=new An({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ne},radius:{value:4}},vertexShader:l2,fragmentShader:c2}),M=x.clone();M.defines.HORIZONTAL_PASS=1;const y=new Rn;y.setAttribute("position",new qn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const T=new $t(y,x),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=n_;let _=this.type;this.render=function(I,N,B){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||I.length===0)return;const C=r.getRenderTarget(),b=r.getActiveCubeFace(),H=r.getActiveMipmapLevel(),tt=r.state;tt.setBlending(Ra),tt.buffers.color.setClear(1,1,1,1),tt.buffers.depth.setTest(!0),tt.setScissorTest(!1);const st=_!==Ea&&this.type===Ea,ht=_===Ea&&this.type!==Ea;for(let mt=0,z=I.length;mt<z;mt++){const Q=I[mt],K=Q.shadow;if(K===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(K.autoUpdate===!1&&K.needsUpdate===!1)continue;l.copy(K.mapSize);const St=K.getFrameExtents();if(l.multiply(St),c.copy(K.mapSize),(l.x>v||l.y>v)&&(l.x>v&&(c.x=Math.floor(v/St.x),l.x=c.x*St.x,K.mapSize.x=c.x),l.y>v&&(c.y=Math.floor(v/St.y),l.y=c.y*St.y,K.mapSize.y=c.y)),K.map===null||st===!0||ht===!0){const P=this.type!==Ea?{minFilter:mi,magFilter:mi}:{};K.map!==null&&K.map.dispose(),K.map=new gi(l.x,l.y,P),K.map.texture.name=Q.name+".shadowMap",K.camera.updateProjectionMatrix()}r.setRenderTarget(K.map),r.clear();const Tt=K.getViewportCount();for(let P=0;P<Tt;P++){const it=K.getViewport(P);f.set(c.x*it.x,c.y*it.y,c.x*it.z,c.y*it.w),tt.viewport(f),K.updateMatrices(Q,P),a=K.getFrustum(),R(N,B,K.camera,Q,this.type)}K.isPointLightShadow!==!0&&this.type===Ea&&L(K,B),K.needsUpdate=!1}_=this.type,S.needsUpdate=!1,r.setRenderTarget(C,b,H)};function L(I,N){const B=t.update(T);x.defines.VSM_SAMPLES!==I.blurSamples&&(x.defines.VSM_SAMPLES=I.blurSamples,M.defines.VSM_SAMPLES=I.blurSamples,x.needsUpdate=!0,M.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new gi(l.x,l.y)),x.uniforms.shadow_pass.value=I.map.texture,x.uniforms.resolution.value=I.mapSize,x.uniforms.radius.value=I.radius,r.setRenderTarget(I.mapPass),r.clear(),r.renderBufferDirect(N,null,B,x,T,null),M.uniforms.shadow_pass.value=I.mapPass.texture,M.uniforms.resolution.value=I.mapSize,M.uniforms.radius.value=I.radius,r.setRenderTarget(I.map),r.clear(),r.renderBufferDirect(N,null,B,M,T,null)}function U(I,N,B,C){let b=null;const H=B.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(H!==void 0)b=H;else if(b=B.isPointLight===!0?p:d,r.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0){const tt=b.uuid,st=N.uuid;let ht=m[tt];ht===void 0&&(ht={},m[tt]=ht);let mt=ht[st];mt===void 0&&(mt=b.clone(),ht[st]=mt,N.addEventListener("dispose",q)),b=mt}if(b.visible=N.visible,b.wireframe=N.wireframe,C===Ea?b.side=N.shadowSide!==null?N.shadowSide:N.side:b.side=N.shadowSide!==null?N.shadowSide:g[N.side],b.alphaMap=N.alphaMap,b.alphaTest=N.alphaTest,b.map=N.map,b.clipShadows=N.clipShadows,b.clippingPlanes=N.clippingPlanes,b.clipIntersection=N.clipIntersection,b.displacementMap=N.displacementMap,b.displacementScale=N.displacementScale,b.displacementBias=N.displacementBias,b.wireframeLinewidth=N.wireframeLinewidth,b.linewidth=N.linewidth,B.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const tt=r.properties.get(b);tt.light=B}return b}function R(I,N,B,C,b){if(I.visible===!1)return;if(I.layers.test(N.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&b===Ea)&&(!I.frustumCulled||a.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,I.matrixWorld);const st=t.update(I),ht=I.material;if(Array.isArray(ht)){const mt=st.groups;for(let z=0,Q=mt.length;z<Q;z++){const K=mt[z],St=ht[K.materialIndex];if(St&&St.visible){const Tt=U(I,St,C,b);I.onBeforeShadow(r,I,N,B,st,Tt,K),r.renderBufferDirect(B,null,st,Tt,I,K),I.onAfterShadow(r,I,N,B,st,Tt,K)}}}else if(ht.visible){const mt=U(I,ht,C,b);I.onBeforeShadow(r,I,N,B,st,mt,null),r.renderBufferDirect(B,null,st,mt,I,null),I.onAfterShadow(r,I,N,B,st,mt,null)}}const tt=I.children;for(let st=0,ht=tt.length;st<ht;st++)R(tt[st],N,B,C,b)}function q(I){I.target.removeEventListener("dispose",q);for(const B in m){const C=m[B],b=I.target.uuid;b in C&&(C[b].dispose(),delete C[b])}}}const f2={[Ad]:wd,[Rd]:Ld,[Cd]:Ud,[Kr]:Dd,[wd]:Ad,[Ld]:Rd,[Ud]:Cd,[Dd]:Kr};function h2(r,t){function n(){let k=!1;const wt=new je;let ct=null;const xt=new je(0,0,0,0);return{setMask:function(Rt){ct!==Rt&&!k&&(r.colorMask(Rt,Rt,Rt,Rt),ct=Rt)},setLocked:function(Rt){k=Rt},setClear:function(Rt,Ut,ae,tn,vn){vn===!0&&(Rt*=tn,Ut*=tn,ae*=tn),wt.set(Rt,Ut,ae,tn),xt.equals(wt)===!1&&(r.clearColor(Rt,Ut,ae,tn),xt.copy(wt))},reset:function(){k=!1,ct=null,xt.set(-1,0,0,0)}}}function a(){let k=!1,wt=!1,ct=null,xt=null,Rt=null;return{setReversed:function(Ut){if(wt!==Ut){const ae=t.get("EXT_clip_control");wt?ae.clipControlEXT(ae.LOWER_LEFT_EXT,ae.ZERO_TO_ONE_EXT):ae.clipControlEXT(ae.LOWER_LEFT_EXT,ae.NEGATIVE_ONE_TO_ONE_EXT);const tn=Rt;Rt=null,this.setClear(tn)}wt=Ut},getReversed:function(){return wt},setTest:function(Ut){Ut?_t(r.DEPTH_TEST):Vt(r.DEPTH_TEST)},setMask:function(Ut){ct!==Ut&&!k&&(r.depthMask(Ut),ct=Ut)},setFunc:function(Ut){if(wt&&(Ut=f2[Ut]),xt!==Ut){switch(Ut){case Ad:r.depthFunc(r.NEVER);break;case wd:r.depthFunc(r.ALWAYS);break;case Rd:r.depthFunc(r.LESS);break;case Kr:r.depthFunc(r.LEQUAL);break;case Cd:r.depthFunc(r.EQUAL);break;case Dd:r.depthFunc(r.GEQUAL);break;case Ld:r.depthFunc(r.GREATER);break;case Ud:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}xt=Ut}},setLocked:function(Ut){k=Ut},setClear:function(Ut){Rt!==Ut&&(wt&&(Ut=1-Ut),r.clearDepth(Ut),Rt=Ut)},reset:function(){k=!1,ct=null,xt=null,Rt=null,wt=!1}}}function l(){let k=!1,wt=null,ct=null,xt=null,Rt=null,Ut=null,ae=null,tn=null,vn=null;return{setTest:function(Ce){k||(Ce?_t(r.STENCIL_TEST):Vt(r.STENCIL_TEST))},setMask:function(Ce){wt!==Ce&&!k&&(r.stencilMask(Ce),wt=Ce)},setFunc:function(Ce,Cn,Ni){(ct!==Ce||xt!==Cn||Rt!==Ni)&&(r.stencilFunc(Ce,Cn,Ni),ct=Ce,xt=Cn,Rt=Ni)},setOp:function(Ce,Cn,Ni){(Ut!==Ce||ae!==Cn||tn!==Ni)&&(r.stencilOp(Ce,Cn,Ni),Ut=Ce,ae=Cn,tn=Ni)},setLocked:function(Ce){k=Ce},setClear:function(Ce){vn!==Ce&&(r.clearStencil(Ce),vn=Ce)},reset:function(){k=!1,wt=null,ct=null,xt=null,Rt=null,Ut=null,ae=null,tn=null,vn=null}}}const c=new n,f=new a,d=new l,p=new WeakMap,m=new WeakMap;let v={},g={},x=new WeakMap,M=[],y=null,T=!1,S=null,_=null,L=null,U=null,R=null,q=null,I=null,N=new te(0,0,0),B=0,C=!1,b=null,H=null,tt=null,st=null,ht=null;const mt=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,Q=0;const K=r.getParameter(r.VERSION);K.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(K)[1]),z=Q>=1):K.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),z=Q>=2);let St=null,Tt={};const P=r.getParameter(r.SCISSOR_BOX),it=r.getParameter(r.VIEWPORT),Mt=new je().fromArray(P),Z=new je().fromArray(it);function ut(k,wt,ct,xt){const Rt=new Uint8Array(4),Ut=r.createTexture();r.bindTexture(k,Ut),r.texParameteri(k,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(k,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ae=0;ae<ct;ae++)k===r.TEXTURE_3D||k===r.TEXTURE_2D_ARRAY?r.texImage3D(wt,0,r.RGBA,1,1,xt,0,r.RGBA,r.UNSIGNED_BYTE,Rt):r.texImage2D(wt+ae,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Rt);return Ut}const Et={};Et[r.TEXTURE_2D]=ut(r.TEXTURE_2D,r.TEXTURE_2D,1),Et[r.TEXTURE_CUBE_MAP]=ut(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Et[r.TEXTURE_2D_ARRAY]=ut(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Et[r.TEXTURE_3D]=ut(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),f.setClear(1),d.setClear(0),_t(r.DEPTH_TEST),f.setFunc(Kr),me(!1),_e(Uv),_t(r.CULL_FACE),j(Ra);function _t(k){v[k]!==!0&&(r.enable(k),v[k]=!0)}function Vt(k){v[k]!==!1&&(r.disable(k),v[k]=!1)}function Gt(k,wt){return g[k]!==wt?(r.bindFramebuffer(k,wt),g[k]=wt,k===r.DRAW_FRAMEBUFFER&&(g[r.FRAMEBUFFER]=wt),k===r.FRAMEBUFFER&&(g[r.DRAW_FRAMEBUFFER]=wt),!0):!1}function oe(k,wt){let ct=M,xt=!1;if(k){ct=x.get(wt),ct===void 0&&(ct=[],x.set(wt,ct));const Rt=k.textures;if(ct.length!==Rt.length||ct[0]!==r.COLOR_ATTACHMENT0){for(let Ut=0,ae=Rt.length;Ut<ae;Ut++)ct[Ut]=r.COLOR_ATTACHMENT0+Ut;ct.length=Rt.length,xt=!0}}else ct[0]!==r.BACK&&(ct[0]=r.BACK,xt=!0);xt&&r.drawBuffers(ct)}function Ge(k){return y!==k?(r.useProgram(k),y=k,!0):!1}const ge={[Fs]:r.FUNC_ADD,[zy]:r.FUNC_SUBTRACT,[By]:r.FUNC_REVERSE_SUBTRACT};ge[Iy]=r.MIN,ge[Fy]=r.MAX;const $e={[Hy]:r.ZERO,[Gy]:r.ONE,[Vy]:r.SRC_COLOR,[Td]:r.SRC_ALPHA,[Yy]:r.SRC_ALPHA_SATURATE,[qy]:r.DST_COLOR,[Xy]:r.DST_ALPHA,[ky]:r.ONE_MINUS_SRC_COLOR,[bd]:r.ONE_MINUS_SRC_ALPHA,[jy]:r.ONE_MINUS_DST_COLOR,[Wy]:r.ONE_MINUS_DST_ALPHA,[Zy]:r.CONSTANT_COLOR,[Ky]:r.ONE_MINUS_CONSTANT_COLOR,[Qy]:r.CONSTANT_ALPHA,[Jy]:r.ONE_MINUS_CONSTANT_ALPHA};function j(k,wt,ct,xt,Rt,Ut,ae,tn,vn,Ce){if(k===Ra){T===!0&&(Vt(r.BLEND),T=!1);return}if(T===!1&&(_t(r.BLEND),T=!0),k!==Py){if(k!==S||Ce!==C){if((_!==Fs||R!==Fs)&&(r.blendEquation(r.FUNC_ADD),_=Fs,R=Fs),Ce)switch(k){case qr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case jr:r.blendFunc(r.ONE,r.ONE);break;case Nv:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ov:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case qr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case jr:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Nv:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ov:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}L=null,U=null,q=null,I=null,N.set(0,0,0),B=0,S=k,C=Ce}return}Rt=Rt||wt,Ut=Ut||ct,ae=ae||xt,(wt!==_||Rt!==R)&&(r.blendEquationSeparate(ge[wt],ge[Rt]),_=wt,R=Rt),(ct!==L||xt!==U||Ut!==q||ae!==I)&&(r.blendFuncSeparate($e[ct],$e[xt],$e[Ut],$e[ae]),L=ct,U=xt,q=Ut,I=ae),(tn.equals(N)===!1||vn!==B)&&(r.blendColor(tn.r,tn.g,tn.b,vn),N.copy(tn),B=vn),S=k,C=!1}function Bn(k,wt){k.side===ba?Vt(r.CULL_FACE):_t(r.CULL_FACE);let ct=k.side===ii;wt&&(ct=!ct),me(ct),k.blending===qr&&k.transparent===!1?j(Ra):j(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),f.setFunc(k.depthFunc),f.setTest(k.depthTest),f.setMask(k.depthWrite),c.setMask(k.colorWrite);const xt=k.stencilWrite;d.setTest(xt),xt&&(d.setMask(k.stencilWriteMask),d.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),d.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),ze(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?_t(r.SAMPLE_ALPHA_TO_COVERAGE):Vt(r.SAMPLE_ALPHA_TO_COVERAGE)}function me(k){b!==k&&(k?r.frontFace(r.CW):r.frontFace(r.CCW),b=k)}function _e(k){k!==Uy?(_t(r.CULL_FACE),k!==H&&(k===Uv?r.cullFace(r.BACK):k===Ny?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Vt(r.CULL_FACE),H=k}function Qt(k){k!==tt&&(z&&r.lineWidth(k),tt=k)}function ze(k,wt,ct){k?(_t(r.POLYGON_OFFSET_FILL),(st!==wt||ht!==ct)&&(r.polygonOffset(wt,ct),st=wt,ht=ct)):Vt(r.POLYGON_OFFSET_FILL)}function Zt(k){k?_t(r.SCISSOR_TEST):Vt(r.SCISSOR_TEST)}function O(k){k===void 0&&(k=r.TEXTURE0+mt-1),St!==k&&(r.activeTexture(k),St=k)}function w(k,wt,ct){ct===void 0&&(St===null?ct=r.TEXTURE0+mt-1:ct=St);let xt=Tt[ct];xt===void 0&&(xt={type:void 0,texture:void 0},Tt[ct]=xt),(xt.type!==k||xt.texture!==wt)&&(St!==ct&&(r.activeTexture(ct),St=ct),r.bindTexture(k,wt||Et[k]),xt.type=k,xt.texture=wt)}function nt(){const k=Tt[St];k!==void 0&&k.type!==void 0&&(r.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function dt(){try{r.compressedTexImage2D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function yt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function gt(){try{r.texSubImage2D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function qt(){try{r.texSubImage3D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Lt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function zt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Me(){try{r.texStorage2D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function At(){try{r.texStorage3D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Bt(){try{r.texImage2D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Kt(){try{r.texImage3D.apply(r,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function jt(k){Mt.equals(k)===!1&&(r.scissor(k.x,k.y,k.z,k.w),Mt.copy(k))}function Ot(k){Z.equals(k)===!1&&(r.viewport(k.x,k.y,k.z,k.w),Z.copy(k))}function ie(k,wt){let ct=m.get(wt);ct===void 0&&(ct=new WeakMap,m.set(wt,ct));let xt=ct.get(k);xt===void 0&&(xt=r.getUniformBlockIndex(wt,k.name),ct.set(k,xt))}function ce(k,wt){const xt=m.get(wt).get(k);p.get(wt)!==xt&&(r.uniformBlockBinding(wt,xt,k.__bindingPointIndex),p.set(wt,xt))}function Ve(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),f.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),v={},St=null,Tt={},g={},x=new WeakMap,M=[],y=null,T=!1,S=null,_=null,L=null,U=null,R=null,q=null,I=null,N=new te(0,0,0),B=0,C=!1,b=null,H=null,tt=null,st=null,ht=null,Mt.set(0,0,r.canvas.width,r.canvas.height),Z.set(0,0,r.canvas.width,r.canvas.height),c.reset(),f.reset(),d.reset()}return{buffers:{color:c,depth:f,stencil:d},enable:_t,disable:Vt,bindFramebuffer:Gt,drawBuffers:oe,useProgram:Ge,setBlending:j,setMaterial:Bn,setFlipSided:me,setCullFace:_e,setLineWidth:Qt,setPolygonOffset:ze,setScissorTest:Zt,activeTexture:O,bindTexture:w,unbindTexture:nt,compressedTexImage2D:dt,compressedTexImage3D:yt,texImage2D:Bt,texImage3D:Kt,updateUBOMapping:ie,uniformBlockBinding:ce,texStorage2D:Me,texStorage3D:At,texSubImage2D:gt,texSubImage3D:qt,compressedTexSubImage2D:Lt,compressedTexSubImage3D:zt,scissor:jt,viewport:Ot,reset:Ve}}function Rx(r,t,n,a){const l=d2(a);switch(n){case p_:return r*t;case g_:return r*t;case v_:return r*t*2;case x_:return r*t/l.components*l.byteLength;case _p:return r*t/l.components*l.byteLength;case __:return r*t*2/l.components*l.byteLength;case Mp:return r*t*2/l.components*l.byteLength;case m_:return r*t*3/l.components*l.byteLength;case ki:return r*t*4/l.components*l.byteLength;case Sp:return r*t*4/l.components*l.byteLength;case su:case ru:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case ou:case lu:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Id:case Hd:return Math.max(r,16)*Math.max(t,8)/4;case Bd:case Fd:return Math.max(r,8)*Math.max(t,8)/2;case Gd:case Vd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case kd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Xd:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Wd:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case qd:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case jd:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case Yd:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Zd:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Kd:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Qd:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Jd:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case $d:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case tp:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case ep:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case np:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case ip:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case cu:case ap:case sp:return Math.ceil(r/4)*Math.ceil(t/4)*16;case M_:case rp:return Math.ceil(r/4)*Math.ceil(t/4)*8;case op:case lp:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function d2(r){switch(r){case Da:case f_:return{byteLength:1,components:1};case ul:case h_:case Xi:return{byteLength:2,components:1};case vp:case xp:return{byteLength:2,components:4};case Xs:case gp:case Aa:return{byteLength:4,components:1};case d_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function p2(r,t,n,a,l,c,f){const d=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new ne,v=new WeakMap;let g;const x=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(O,w){return M?new OffscreenCanvas(O,w):pu("canvas")}function T(O,w,nt){let dt=1;const yt=Zt(O);if((yt.width>nt||yt.height>nt)&&(dt=nt/Math.max(yt.width,yt.height)),dt<1)if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&O instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&O instanceof ImageBitmap||typeof VideoFrame<"u"&&O instanceof VideoFrame){const gt=Math.floor(dt*yt.width),qt=Math.floor(dt*yt.height);g===void 0&&(g=y(gt,qt));const Lt=w?y(gt,qt):g;return Lt.width=gt,Lt.height=qt,Lt.getContext("2d").drawImage(O,0,0,gt,qt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+yt.width+"x"+yt.height+") to ("+gt+"x"+qt+")."),Lt}else return"data"in O&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+yt.width+"x"+yt.height+")."),O;return O}function S(O){return O.generateMipmaps}function _(O){r.generateMipmap(O)}function L(O){return O.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:O.isWebGL3DRenderTarget?r.TEXTURE_3D:O.isWebGLArrayRenderTarget||O.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function U(O,w,nt,dt,yt=!1){if(O!==null){if(r[O]!==void 0)return r[O];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+O+"'")}let gt=w;if(w===r.RED&&(nt===r.FLOAT&&(gt=r.R32F),nt===r.HALF_FLOAT&&(gt=r.R16F),nt===r.UNSIGNED_BYTE&&(gt=r.R8)),w===r.RED_INTEGER&&(nt===r.UNSIGNED_BYTE&&(gt=r.R8UI),nt===r.UNSIGNED_SHORT&&(gt=r.R16UI),nt===r.UNSIGNED_INT&&(gt=r.R32UI),nt===r.BYTE&&(gt=r.R8I),nt===r.SHORT&&(gt=r.R16I),nt===r.INT&&(gt=r.R32I)),w===r.RG&&(nt===r.FLOAT&&(gt=r.RG32F),nt===r.HALF_FLOAT&&(gt=r.RG16F),nt===r.UNSIGNED_BYTE&&(gt=r.RG8)),w===r.RG_INTEGER&&(nt===r.UNSIGNED_BYTE&&(gt=r.RG8UI),nt===r.UNSIGNED_SHORT&&(gt=r.RG16UI),nt===r.UNSIGNED_INT&&(gt=r.RG32UI),nt===r.BYTE&&(gt=r.RG8I),nt===r.SHORT&&(gt=r.RG16I),nt===r.INT&&(gt=r.RG32I)),w===r.RGB_INTEGER&&(nt===r.UNSIGNED_BYTE&&(gt=r.RGB8UI),nt===r.UNSIGNED_SHORT&&(gt=r.RGB16UI),nt===r.UNSIGNED_INT&&(gt=r.RGB32UI),nt===r.BYTE&&(gt=r.RGB8I),nt===r.SHORT&&(gt=r.RGB16I),nt===r.INT&&(gt=r.RGB32I)),w===r.RGBA_INTEGER&&(nt===r.UNSIGNED_BYTE&&(gt=r.RGBA8UI),nt===r.UNSIGNED_SHORT&&(gt=r.RGBA16UI),nt===r.UNSIGNED_INT&&(gt=r.RGBA32UI),nt===r.BYTE&&(gt=r.RGBA8I),nt===r.SHORT&&(gt=r.RGBA16I),nt===r.INT&&(gt=r.RGBA32I)),w===r.RGB&&nt===r.UNSIGNED_INT_5_9_9_9_REV&&(gt=r.RGB9_E5),w===r.RGBA){const qt=yt?Mu:Re.getTransfer(dt);nt===r.FLOAT&&(gt=r.RGBA32F),nt===r.HALF_FLOAT&&(gt=r.RGBA16F),nt===r.UNSIGNED_BYTE&&(gt=qt===He?r.SRGB8_ALPHA8:r.RGBA8),nt===r.UNSIGNED_SHORT_4_4_4_4&&(gt=r.RGBA4),nt===r.UNSIGNED_SHORT_5_5_5_1&&(gt=r.RGB5_A1)}return(gt===r.R16F||gt===r.R32F||gt===r.RG16F||gt===r.RG32F||gt===r.RGBA16F||gt===r.RGBA32F)&&t.get("EXT_color_buffer_float"),gt}function R(O,w){let nt;return O?w===null||w===Xs||w===$r?nt=r.DEPTH24_STENCIL8:w===Aa?nt=r.DEPTH32F_STENCIL8:w===ul&&(nt=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Xs||w===$r?nt=r.DEPTH_COMPONENT24:w===Aa?nt=r.DEPTH_COMPONENT32F:w===ul&&(nt=r.DEPTH_COMPONENT16),nt}function q(O,w){return S(O)===!0||O.isFramebufferTexture&&O.minFilter!==mi&&O.minFilter!==Vi?Math.log2(Math.max(w.width,w.height))+1:O.mipmaps!==void 0&&O.mipmaps.length>0?O.mipmaps.length:O.isCompressedTexture&&Array.isArray(O.image)?w.mipmaps.length:1}function I(O){const w=O.target;w.removeEventListener("dispose",I),B(w),w.isVideoTexture&&v.delete(w)}function N(O){const w=O.target;w.removeEventListener("dispose",N),b(w)}function B(O){const w=a.get(O);if(w.__webglInit===void 0)return;const nt=O.source,dt=x.get(nt);if(dt){const yt=dt[w.__cacheKey];yt.usedTimes--,yt.usedTimes===0&&C(O),Object.keys(dt).length===0&&x.delete(nt)}a.remove(O)}function C(O){const w=a.get(O);r.deleteTexture(w.__webglTexture);const nt=O.source,dt=x.get(nt);delete dt[w.__cacheKey],f.memory.textures--}function b(O){const w=a.get(O);if(O.depthTexture&&(O.depthTexture.dispose(),a.remove(O.depthTexture)),O.isWebGLCubeRenderTarget)for(let dt=0;dt<6;dt++){if(Array.isArray(w.__webglFramebuffer[dt]))for(let yt=0;yt<w.__webglFramebuffer[dt].length;yt++)r.deleteFramebuffer(w.__webglFramebuffer[dt][yt]);else r.deleteFramebuffer(w.__webglFramebuffer[dt]);w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer[dt])}else{if(Array.isArray(w.__webglFramebuffer))for(let dt=0;dt<w.__webglFramebuffer.length;dt++)r.deleteFramebuffer(w.__webglFramebuffer[dt]);else r.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&r.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let dt=0;dt<w.__webglColorRenderbuffer.length;dt++)w.__webglColorRenderbuffer[dt]&&r.deleteRenderbuffer(w.__webglColorRenderbuffer[dt]);w.__webglDepthRenderbuffer&&r.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const nt=O.textures;for(let dt=0,yt=nt.length;dt<yt;dt++){const gt=a.get(nt[dt]);gt.__webglTexture&&(r.deleteTexture(gt.__webglTexture),f.memory.textures--),a.remove(nt[dt])}a.remove(O)}let H=0;function tt(){H=0}function st(){const O=H;return O>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+O+" texture units while this GPU supports only "+l.maxTextures),H+=1,O}function ht(O){const w=[];return w.push(O.wrapS),w.push(O.wrapT),w.push(O.wrapR||0),w.push(O.magFilter),w.push(O.minFilter),w.push(O.anisotropy),w.push(O.internalFormat),w.push(O.format),w.push(O.type),w.push(O.generateMipmaps),w.push(O.premultiplyAlpha),w.push(O.flipY),w.push(O.unpackAlignment),w.push(O.colorSpace),w.join()}function mt(O,w){const nt=a.get(O);if(O.isVideoTexture&&Qt(O),O.isRenderTargetTexture===!1&&O.version>0&&nt.__version!==O.version){const dt=O.image;if(dt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(dt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(nt,O,w);return}}n.bindTexture(r.TEXTURE_2D,nt.__webglTexture,r.TEXTURE0+w)}function z(O,w){const nt=a.get(O);if(O.version>0&&nt.__version!==O.version){Z(nt,O,w);return}n.bindTexture(r.TEXTURE_2D_ARRAY,nt.__webglTexture,r.TEXTURE0+w)}function Q(O,w){const nt=a.get(O);if(O.version>0&&nt.__version!==O.version){Z(nt,O,w);return}n.bindTexture(r.TEXTURE_3D,nt.__webglTexture,r.TEXTURE0+w)}function K(O,w){const nt=a.get(O);if(O.version>0&&nt.__version!==O.version){ut(nt,O,w);return}n.bindTexture(r.TEXTURE_CUBE_MAP,nt.__webglTexture,r.TEXTURE0+w)}const St={[Pd]:r.REPEAT,[Gs]:r.CLAMP_TO_EDGE,[zd]:r.MIRRORED_REPEAT},Tt={[mi]:r.NEAREST,[n1]:r.NEAREST_MIPMAP_NEAREST,[bc]:r.NEAREST_MIPMAP_LINEAR,[Vi]:r.LINEAR,[Gh]:r.LINEAR_MIPMAP_NEAREST,[Vs]:r.LINEAR_MIPMAP_LINEAR},P={[r1]:r.NEVER,[h1]:r.ALWAYS,[o1]:r.LESS,[y_]:r.LEQUAL,[l1]:r.EQUAL,[f1]:r.GEQUAL,[c1]:r.GREATER,[u1]:r.NOTEQUAL};function it(O,w){if(w.type===Aa&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===Vi||w.magFilter===Gh||w.magFilter===bc||w.magFilter===Vs||w.minFilter===Vi||w.minFilter===Gh||w.minFilter===bc||w.minFilter===Vs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(O,r.TEXTURE_WRAP_S,St[w.wrapS]),r.texParameteri(O,r.TEXTURE_WRAP_T,St[w.wrapT]),(O===r.TEXTURE_3D||O===r.TEXTURE_2D_ARRAY)&&r.texParameteri(O,r.TEXTURE_WRAP_R,St[w.wrapR]),r.texParameteri(O,r.TEXTURE_MAG_FILTER,Tt[w.magFilter]),r.texParameteri(O,r.TEXTURE_MIN_FILTER,Tt[w.minFilter]),w.compareFunction&&(r.texParameteri(O,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(O,r.TEXTURE_COMPARE_FUNC,P[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===mi||w.minFilter!==bc&&w.minFilter!==Vs||w.type===Aa&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||a.get(w).__currentAnisotropy){const nt=t.get("EXT_texture_filter_anisotropic");r.texParameterf(O,nt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,l.getMaxAnisotropy())),a.get(w).__currentAnisotropy=w.anisotropy}}}function Mt(O,w){let nt=!1;O.__webglInit===void 0&&(O.__webglInit=!0,w.addEventListener("dispose",I));const dt=w.source;let yt=x.get(dt);yt===void 0&&(yt={},x.set(dt,yt));const gt=ht(w);if(gt!==O.__cacheKey){yt[gt]===void 0&&(yt[gt]={texture:r.createTexture(),usedTimes:0},f.memory.textures++,nt=!0),yt[gt].usedTimes++;const qt=yt[O.__cacheKey];qt!==void 0&&(yt[O.__cacheKey].usedTimes--,qt.usedTimes===0&&C(w)),O.__cacheKey=gt,O.__webglTexture=yt[gt].texture}return nt}function Z(O,w,nt){let dt=r.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(dt=r.TEXTURE_2D_ARRAY),w.isData3DTexture&&(dt=r.TEXTURE_3D);const yt=Mt(O,w),gt=w.source;n.bindTexture(dt,O.__webglTexture,r.TEXTURE0+nt);const qt=a.get(gt);if(gt.version!==qt.__version||yt===!0){n.activeTexture(r.TEXTURE0+nt);const Lt=Re.getPrimaries(Re.workingColorSpace),zt=w.colorSpace===cs?null:Re.getPrimaries(w.colorSpace),Me=w.colorSpace===cs||Lt===zt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);let At=T(w.image,!1,l.maxTextureSize);At=ze(w,At);const Bt=c.convert(w.format,w.colorSpace),Kt=c.convert(w.type);let jt=U(w.internalFormat,Bt,Kt,w.colorSpace,w.isVideoTexture);it(dt,w);let Ot;const ie=w.mipmaps,ce=w.isVideoTexture!==!0,Ve=qt.__version===void 0||yt===!0,k=gt.dataReady,wt=q(w,At);if(w.isDepthTexture)jt=R(w.format===to,w.type),Ve&&(ce?n.texStorage2D(r.TEXTURE_2D,1,jt,At.width,At.height):n.texImage2D(r.TEXTURE_2D,0,jt,At.width,At.height,0,Bt,Kt,null));else if(w.isDataTexture)if(ie.length>0){ce&&Ve&&n.texStorage2D(r.TEXTURE_2D,wt,jt,ie[0].width,ie[0].height);for(let ct=0,xt=ie.length;ct<xt;ct++)Ot=ie[ct],ce?k&&n.texSubImage2D(r.TEXTURE_2D,ct,0,0,Ot.width,Ot.height,Bt,Kt,Ot.data):n.texImage2D(r.TEXTURE_2D,ct,jt,Ot.width,Ot.height,0,Bt,Kt,Ot.data);w.generateMipmaps=!1}else ce?(Ve&&n.texStorage2D(r.TEXTURE_2D,wt,jt,At.width,At.height),k&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,At.width,At.height,Bt,Kt,At.data)):n.texImage2D(r.TEXTURE_2D,0,jt,At.width,At.height,0,Bt,Kt,At.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){ce&&Ve&&n.texStorage3D(r.TEXTURE_2D_ARRAY,wt,jt,ie[0].width,ie[0].height,At.depth);for(let ct=0,xt=ie.length;ct<xt;ct++)if(Ot=ie[ct],w.format!==ki)if(Bt!==null)if(ce){if(k)if(w.layerUpdates.size>0){const Rt=Rx(Ot.width,Ot.height,w.format,w.type);for(const Ut of w.layerUpdates){const ae=Ot.data.subarray(Ut*Rt/Ot.data.BYTES_PER_ELEMENT,(Ut+1)*Rt/Ot.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ct,0,0,Ut,Ot.width,Ot.height,1,Bt,ae)}w.clearLayerUpdates()}else n.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ct,0,0,0,Ot.width,Ot.height,At.depth,Bt,Ot.data)}else n.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ct,jt,Ot.width,Ot.height,At.depth,0,Ot.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ce?k&&n.texSubImage3D(r.TEXTURE_2D_ARRAY,ct,0,0,0,Ot.width,Ot.height,At.depth,Bt,Kt,Ot.data):n.texImage3D(r.TEXTURE_2D_ARRAY,ct,jt,Ot.width,Ot.height,At.depth,0,Bt,Kt,Ot.data)}else{ce&&Ve&&n.texStorage2D(r.TEXTURE_2D,wt,jt,ie[0].width,ie[0].height);for(let ct=0,xt=ie.length;ct<xt;ct++)Ot=ie[ct],w.format!==ki?Bt!==null?ce?k&&n.compressedTexSubImage2D(r.TEXTURE_2D,ct,0,0,Ot.width,Ot.height,Bt,Ot.data):n.compressedTexImage2D(r.TEXTURE_2D,ct,jt,Ot.width,Ot.height,0,Ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ce?k&&n.texSubImage2D(r.TEXTURE_2D,ct,0,0,Ot.width,Ot.height,Bt,Kt,Ot.data):n.texImage2D(r.TEXTURE_2D,ct,jt,Ot.width,Ot.height,0,Bt,Kt,Ot.data)}else if(w.isDataArrayTexture)if(ce){if(Ve&&n.texStorage3D(r.TEXTURE_2D_ARRAY,wt,jt,At.width,At.height,At.depth),k)if(w.layerUpdates.size>0){const ct=Rx(At.width,At.height,w.format,w.type);for(const xt of w.layerUpdates){const Rt=At.data.subarray(xt*ct/At.data.BYTES_PER_ELEMENT,(xt+1)*ct/At.data.BYTES_PER_ELEMENT);n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,xt,At.width,At.height,1,Bt,Kt,Rt)}w.clearLayerUpdates()}else n.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,At.width,At.height,At.depth,Bt,Kt,At.data)}else n.texImage3D(r.TEXTURE_2D_ARRAY,0,jt,At.width,At.height,At.depth,0,Bt,Kt,At.data);else if(w.isData3DTexture)ce?(Ve&&n.texStorage3D(r.TEXTURE_3D,wt,jt,At.width,At.height,At.depth),k&&n.texSubImage3D(r.TEXTURE_3D,0,0,0,0,At.width,At.height,At.depth,Bt,Kt,At.data)):n.texImage3D(r.TEXTURE_3D,0,jt,At.width,At.height,At.depth,0,Bt,Kt,At.data);else if(w.isFramebufferTexture){if(Ve)if(ce)n.texStorage2D(r.TEXTURE_2D,wt,jt,At.width,At.height);else{let ct=At.width,xt=At.height;for(let Rt=0;Rt<wt;Rt++)n.texImage2D(r.TEXTURE_2D,Rt,jt,ct,xt,0,Bt,Kt,null),ct>>=1,xt>>=1}}else if(ie.length>0){if(ce&&Ve){const ct=Zt(ie[0]);n.texStorage2D(r.TEXTURE_2D,wt,jt,ct.width,ct.height)}for(let ct=0,xt=ie.length;ct<xt;ct++)Ot=ie[ct],ce?k&&n.texSubImage2D(r.TEXTURE_2D,ct,0,0,Bt,Kt,Ot):n.texImage2D(r.TEXTURE_2D,ct,jt,Bt,Kt,Ot);w.generateMipmaps=!1}else if(ce){if(Ve){const ct=Zt(At);n.texStorage2D(r.TEXTURE_2D,wt,jt,ct.width,ct.height)}k&&n.texSubImage2D(r.TEXTURE_2D,0,0,0,Bt,Kt,At)}else n.texImage2D(r.TEXTURE_2D,0,jt,Bt,Kt,At);S(w)&&_(dt),qt.__version=gt.version,w.onUpdate&&w.onUpdate(w)}O.__version=w.version}function ut(O,w,nt){if(w.image.length!==6)return;const dt=Mt(O,w),yt=w.source;n.bindTexture(r.TEXTURE_CUBE_MAP,O.__webglTexture,r.TEXTURE0+nt);const gt=a.get(yt);if(yt.version!==gt.__version||dt===!0){n.activeTexture(r.TEXTURE0+nt);const qt=Re.getPrimaries(Re.workingColorSpace),Lt=w.colorSpace===cs?null:Re.getPrimaries(w.colorSpace),zt=w.colorSpace===cs||qt===Lt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);const Me=w.isCompressedTexture||w.image[0].isCompressedTexture,At=w.image[0]&&w.image[0].isDataTexture,Bt=[];for(let xt=0;xt<6;xt++)!Me&&!At?Bt[xt]=T(w.image[xt],!0,l.maxCubemapSize):Bt[xt]=At?w.image[xt].image:w.image[xt],Bt[xt]=ze(w,Bt[xt]);const Kt=Bt[0],jt=c.convert(w.format,w.colorSpace),Ot=c.convert(w.type),ie=U(w.internalFormat,jt,Ot,w.colorSpace),ce=w.isVideoTexture!==!0,Ve=gt.__version===void 0||dt===!0,k=yt.dataReady;let wt=q(w,Kt);it(r.TEXTURE_CUBE_MAP,w);let ct;if(Me){ce&&Ve&&n.texStorage2D(r.TEXTURE_CUBE_MAP,wt,ie,Kt.width,Kt.height);for(let xt=0;xt<6;xt++){ct=Bt[xt].mipmaps;for(let Rt=0;Rt<ct.length;Rt++){const Ut=ct[Rt];w.format!==ki?jt!==null?ce?k&&n.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Rt,0,0,Ut.width,Ut.height,jt,Ut.data):n.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Rt,ie,Ut.width,Ut.height,0,Ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ce?k&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Rt,0,0,Ut.width,Ut.height,jt,Ot,Ut.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Rt,ie,Ut.width,Ut.height,0,jt,Ot,Ut.data)}}}else{if(ct=w.mipmaps,ce&&Ve){ct.length>0&&wt++;const xt=Zt(Bt[0]);n.texStorage2D(r.TEXTURE_CUBE_MAP,wt,ie,xt.width,xt.height)}for(let xt=0;xt<6;xt++)if(At){ce?k&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,Bt[xt].width,Bt[xt].height,jt,Ot,Bt[xt].data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,ie,Bt[xt].width,Bt[xt].height,0,jt,Ot,Bt[xt].data);for(let Rt=0;Rt<ct.length;Rt++){const ae=ct[Rt].image[xt].image;ce?k&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Rt+1,0,0,ae.width,ae.height,jt,Ot,ae.data):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Rt+1,ie,ae.width,ae.height,0,jt,Ot,ae.data)}}else{ce?k&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,jt,Ot,Bt[xt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,ie,jt,Ot,Bt[xt]);for(let Rt=0;Rt<ct.length;Rt++){const Ut=ct[Rt];ce?k&&n.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Rt+1,0,0,jt,Ot,Ut.image[xt]):n.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Rt+1,ie,jt,Ot,Ut.image[xt])}}}S(w)&&_(r.TEXTURE_CUBE_MAP),gt.__version=yt.version,w.onUpdate&&w.onUpdate(w)}O.__version=w.version}function Et(O,w,nt,dt,yt,gt){const qt=c.convert(nt.format,nt.colorSpace),Lt=c.convert(nt.type),zt=U(nt.internalFormat,qt,Lt,nt.colorSpace),Me=a.get(w),At=a.get(nt);if(At.__renderTarget=w,!Me.__hasExternalTextures){const Bt=Math.max(1,w.width>>gt),Kt=Math.max(1,w.height>>gt);yt===r.TEXTURE_3D||yt===r.TEXTURE_2D_ARRAY?n.texImage3D(yt,gt,zt,Bt,Kt,w.depth,0,qt,Lt,null):n.texImage2D(yt,gt,zt,Bt,Kt,0,qt,Lt,null)}n.bindFramebuffer(r.FRAMEBUFFER,O),_e(w)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,dt,yt,At.__webglTexture,0,me(w)):(yt===r.TEXTURE_2D||yt>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&yt<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,dt,yt,At.__webglTexture,gt),n.bindFramebuffer(r.FRAMEBUFFER,null)}function _t(O,w,nt){if(r.bindRenderbuffer(r.RENDERBUFFER,O),w.depthBuffer){const dt=w.depthTexture,yt=dt&&dt.isDepthTexture?dt.type:null,gt=R(w.stencilBuffer,yt),qt=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Lt=me(w);_e(w)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Lt,gt,w.width,w.height):nt?r.renderbufferStorageMultisample(r.RENDERBUFFER,Lt,gt,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,gt,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,qt,r.RENDERBUFFER,O)}else{const dt=w.textures;for(let yt=0;yt<dt.length;yt++){const gt=dt[yt],qt=c.convert(gt.format,gt.colorSpace),Lt=c.convert(gt.type),zt=U(gt.internalFormat,qt,Lt,gt.colorSpace),Me=me(w);nt&&_e(w)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Me,zt,w.width,w.height):_e(w)?d.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Me,zt,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,zt,w.width,w.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Vt(O,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(r.FRAMEBUFFER,O),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const dt=a.get(w.depthTexture);dt.__renderTarget=w,(!dt.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),mt(w.depthTexture,0);const yt=dt.__webglTexture,gt=me(w);if(w.depthTexture.format===Yr)_e(w)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,yt,0,gt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,yt,0);else if(w.depthTexture.format===to)_e(w)?d.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,yt,0,gt):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,yt,0);else throw new Error("Unknown depthTexture format")}function Gt(O){const w=a.get(O),nt=O.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==O.depthTexture){const dt=O.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),dt){const yt=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,dt.removeEventListener("dispose",yt)};dt.addEventListener("dispose",yt),w.__depthDisposeCallback=yt}w.__boundDepthTexture=dt}if(O.depthTexture&&!w.__autoAllocateDepthBuffer){if(nt)throw new Error("target.depthTexture not supported in Cube render targets");Vt(w.__webglFramebuffer,O)}else if(nt){w.__webglDepthbuffer=[];for(let dt=0;dt<6;dt++)if(n.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[dt]),w.__webglDepthbuffer[dt]===void 0)w.__webglDepthbuffer[dt]=r.createRenderbuffer(),_t(w.__webglDepthbuffer[dt],O,!1);else{const yt=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,gt=w.__webglDepthbuffer[dt];r.bindRenderbuffer(r.RENDERBUFFER,gt),r.framebufferRenderbuffer(r.FRAMEBUFFER,yt,r.RENDERBUFFER,gt)}}else if(n.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=r.createRenderbuffer(),_t(w.__webglDepthbuffer,O,!1);else{const dt=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,yt=w.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,yt),r.framebufferRenderbuffer(r.FRAMEBUFFER,dt,r.RENDERBUFFER,yt)}n.bindFramebuffer(r.FRAMEBUFFER,null)}function oe(O,w,nt){const dt=a.get(O);w!==void 0&&Et(dt.__webglFramebuffer,O,O.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),nt!==void 0&&Gt(O)}function Ge(O){const w=O.texture,nt=a.get(O),dt=a.get(w);O.addEventListener("dispose",N);const yt=O.textures,gt=O.isWebGLCubeRenderTarget===!0,qt=yt.length>1;if(qt||(dt.__webglTexture===void 0&&(dt.__webglTexture=r.createTexture()),dt.__version=w.version,f.memory.textures++),gt){nt.__webglFramebuffer=[];for(let Lt=0;Lt<6;Lt++)if(w.mipmaps&&w.mipmaps.length>0){nt.__webglFramebuffer[Lt]=[];for(let zt=0;zt<w.mipmaps.length;zt++)nt.__webglFramebuffer[Lt][zt]=r.createFramebuffer()}else nt.__webglFramebuffer[Lt]=r.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){nt.__webglFramebuffer=[];for(let Lt=0;Lt<w.mipmaps.length;Lt++)nt.__webglFramebuffer[Lt]=r.createFramebuffer()}else nt.__webglFramebuffer=r.createFramebuffer();if(qt)for(let Lt=0,zt=yt.length;Lt<zt;Lt++){const Me=a.get(yt[Lt]);Me.__webglTexture===void 0&&(Me.__webglTexture=r.createTexture(),f.memory.textures++)}if(O.samples>0&&_e(O)===!1){nt.__webglMultisampledFramebuffer=r.createFramebuffer(),nt.__webglColorRenderbuffer=[],n.bindFramebuffer(r.FRAMEBUFFER,nt.__webglMultisampledFramebuffer);for(let Lt=0;Lt<yt.length;Lt++){const zt=yt[Lt];nt.__webglColorRenderbuffer[Lt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,nt.__webglColorRenderbuffer[Lt]);const Me=c.convert(zt.format,zt.colorSpace),At=c.convert(zt.type),Bt=U(zt.internalFormat,Me,At,zt.colorSpace,O.isXRRenderTarget===!0),Kt=me(O);r.renderbufferStorageMultisample(r.RENDERBUFFER,Kt,Bt,O.width,O.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Lt,r.RENDERBUFFER,nt.__webglColorRenderbuffer[Lt])}r.bindRenderbuffer(r.RENDERBUFFER,null),O.depthBuffer&&(nt.__webglDepthRenderbuffer=r.createRenderbuffer(),_t(nt.__webglDepthRenderbuffer,O,!0)),n.bindFramebuffer(r.FRAMEBUFFER,null)}}if(gt){n.bindTexture(r.TEXTURE_CUBE_MAP,dt.__webglTexture),it(r.TEXTURE_CUBE_MAP,w);for(let Lt=0;Lt<6;Lt++)if(w.mipmaps&&w.mipmaps.length>0)for(let zt=0;zt<w.mipmaps.length;zt++)Et(nt.__webglFramebuffer[Lt][zt],O,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,zt);else Et(nt.__webglFramebuffer[Lt],O,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Lt,0);S(w)&&_(r.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(qt){for(let Lt=0,zt=yt.length;Lt<zt;Lt++){const Me=yt[Lt],At=a.get(Me);n.bindTexture(r.TEXTURE_2D,At.__webglTexture),it(r.TEXTURE_2D,Me),Et(nt.__webglFramebuffer,O,Me,r.COLOR_ATTACHMENT0+Lt,r.TEXTURE_2D,0),S(Me)&&_(r.TEXTURE_2D)}n.unbindTexture()}else{let Lt=r.TEXTURE_2D;if((O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(Lt=O.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),n.bindTexture(Lt,dt.__webglTexture),it(Lt,w),w.mipmaps&&w.mipmaps.length>0)for(let zt=0;zt<w.mipmaps.length;zt++)Et(nt.__webglFramebuffer[zt],O,w,r.COLOR_ATTACHMENT0,Lt,zt);else Et(nt.__webglFramebuffer,O,w,r.COLOR_ATTACHMENT0,Lt,0);S(w)&&_(Lt),n.unbindTexture()}O.depthBuffer&&Gt(O)}function ge(O){const w=O.textures;for(let nt=0,dt=w.length;nt<dt;nt++){const yt=w[nt];if(S(yt)){const gt=L(O),qt=a.get(yt).__webglTexture;n.bindTexture(gt,qt),_(gt),n.unbindTexture()}}}const $e=[],j=[];function Bn(O){if(O.samples>0){if(_e(O)===!1){const w=O.textures,nt=O.width,dt=O.height;let yt=r.COLOR_BUFFER_BIT;const gt=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,qt=a.get(O),Lt=w.length>1;if(Lt)for(let zt=0;zt<w.length;zt++)n.bindFramebuffer(r.FRAMEBUFFER,qt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.RENDERBUFFER,null),n.bindFramebuffer(r.FRAMEBUFFER,qt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.TEXTURE_2D,null,0);n.bindFramebuffer(r.READ_FRAMEBUFFER,qt.__webglMultisampledFramebuffer),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,qt.__webglFramebuffer);for(let zt=0;zt<w.length;zt++){if(O.resolveDepthBuffer&&(O.depthBuffer&&(yt|=r.DEPTH_BUFFER_BIT),O.stencilBuffer&&O.resolveStencilBuffer&&(yt|=r.STENCIL_BUFFER_BIT)),Lt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,qt.__webglColorRenderbuffer[zt]);const Me=a.get(w[zt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Me,0)}r.blitFramebuffer(0,0,nt,dt,0,0,nt,dt,yt,r.NEAREST),p===!0&&($e.length=0,j.length=0,$e.push(r.COLOR_ATTACHMENT0+zt),O.depthBuffer&&O.resolveDepthBuffer===!1&&($e.push(gt),j.push(gt),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,j)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,$e))}if(n.bindFramebuffer(r.READ_FRAMEBUFFER,null),n.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Lt)for(let zt=0;zt<w.length;zt++){n.bindFramebuffer(r.FRAMEBUFFER,qt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.RENDERBUFFER,qt.__webglColorRenderbuffer[zt]);const Me=a.get(w[zt]).__webglTexture;n.bindFramebuffer(r.FRAMEBUFFER,qt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+zt,r.TEXTURE_2D,Me,0)}n.bindFramebuffer(r.DRAW_FRAMEBUFFER,qt.__webglMultisampledFramebuffer)}else if(O.depthBuffer&&O.resolveDepthBuffer===!1&&p){const w=O.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[w])}}}function me(O){return Math.min(l.maxSamples,O.samples)}function _e(O){const w=a.get(O);return O.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Qt(O){const w=f.render.frame;v.get(O)!==w&&(v.set(O,w),O.update())}function ze(O,w){const nt=O.colorSpace,dt=O.format,yt=O.type;return O.isCompressedTexture===!0||O.isVideoTexture===!0||nt!==io&&nt!==cs&&(Re.getTransfer(nt)===He?(dt!==ki||yt!==Da)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",nt)),w}function Zt(O){return typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement?(m.width=O.naturalWidth||O.width,m.height=O.naturalHeight||O.height):typeof VideoFrame<"u"&&O instanceof VideoFrame?(m.width=O.displayWidth,m.height=O.displayHeight):(m.width=O.width,m.height=O.height),m}this.allocateTextureUnit=st,this.resetTextureUnits=tt,this.setTexture2D=mt,this.setTexture2DArray=z,this.setTexture3D=Q,this.setTextureCube=K,this.rebindTextures=oe,this.setupRenderTarget=Ge,this.updateRenderTargetMipmap=ge,this.updateMultisampleRenderTarget=Bn,this.setupDepthRenderbuffer=Gt,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=_e}function m2(r,t){function n(a,l=cs){let c;const f=Re.getTransfer(l);if(a===Da)return r.UNSIGNED_BYTE;if(a===vp)return r.UNSIGNED_SHORT_4_4_4_4;if(a===xp)return r.UNSIGNED_SHORT_5_5_5_1;if(a===d_)return r.UNSIGNED_INT_5_9_9_9_REV;if(a===f_)return r.BYTE;if(a===h_)return r.SHORT;if(a===ul)return r.UNSIGNED_SHORT;if(a===gp)return r.INT;if(a===Xs)return r.UNSIGNED_INT;if(a===Aa)return r.FLOAT;if(a===Xi)return r.HALF_FLOAT;if(a===p_)return r.ALPHA;if(a===m_)return r.RGB;if(a===ki)return r.RGBA;if(a===g_)return r.LUMINANCE;if(a===v_)return r.LUMINANCE_ALPHA;if(a===Yr)return r.DEPTH_COMPONENT;if(a===to)return r.DEPTH_STENCIL;if(a===x_)return r.RED;if(a===_p)return r.RED_INTEGER;if(a===__)return r.RG;if(a===Mp)return r.RG_INTEGER;if(a===Sp)return r.RGBA_INTEGER;if(a===su||a===ru||a===ou||a===lu)if(f===He)if(c=t.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(a===su)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(a===ru)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(a===ou)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(a===lu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=t.get("WEBGL_compressed_texture_s3tc"),c!==null){if(a===su)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(a===ru)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(a===ou)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(a===lu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(a===Bd||a===Id||a===Fd||a===Hd)if(c=t.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(a===Bd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(a===Id)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(a===Fd)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(a===Hd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(a===Gd||a===Vd||a===kd)if(c=t.get("WEBGL_compressed_texture_etc"),c!==null){if(a===Gd||a===Vd)return f===He?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(a===kd)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(a===Xd||a===Wd||a===qd||a===jd||a===Yd||a===Zd||a===Kd||a===Qd||a===Jd||a===$d||a===tp||a===ep||a===np||a===ip)if(c=t.get("WEBGL_compressed_texture_astc"),c!==null){if(a===Xd)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(a===Wd)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(a===qd)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(a===jd)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(a===Yd)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(a===Zd)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(a===Kd)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(a===Qd)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(a===Jd)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(a===$d)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(a===tp)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(a===ep)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(a===np)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(a===ip)return f===He?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(a===cu||a===ap||a===sp)if(c=t.get("EXT_texture_compression_bptc"),c!==null){if(a===cu)return f===He?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(a===ap)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(a===sp)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(a===M_||a===rp||a===op||a===lp)if(c=t.get("EXT_texture_compression_rgtc"),c!==null){if(a===cu)return c.COMPRESSED_RED_RGTC1_EXT;if(a===rp)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(a===op)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(a===lp)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return a===$r?r.UNSIGNED_INT_24_8:r[a]!==void 0?r[a]:null}return{convert:n}}class g2 extends pi{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ks extends wn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const v2={type:"move"};class md{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ks,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ks,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ks,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const a of t.hand.values())this._getHandJoint(n,a)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,a){let l=null,c=null,f=null;const d=this._targetRay,p=this._grip,m=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(m&&t.hand){f=!0;for(const T of t.hand.values()){const S=n.getJointPose(T,a),_=this._getHandJoint(m,T);S!==null&&(_.matrix.fromArray(S.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=S.radius),_.visible=S!==null}const v=m.joints["index-finger-tip"],g=m.joints["thumb-tip"],x=v.position.distanceTo(g.position),M=.02,y=.005;m.inputState.pinching&&x>M+y?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!m.inputState.pinching&&x<=M-y&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else p!==null&&t.gripSpace&&(c=n.getPose(t.gripSpace,a),c!==null&&(p.matrix.fromArray(c.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,c.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(c.linearVelocity)):p.hasLinearVelocity=!1,c.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(c.angularVelocity)):p.hasAngularVelocity=!1));d!==null&&(l=n.getPose(t.targetRaySpace,a),l===null&&c!==null&&(l=c),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(v2)))}return d!==null&&(d.visible=l!==null),p!==null&&(p.visible=c!==null),m!==null&&(m.visible=f!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const a=new ks;a.matrixAutoUpdate=!1,a.visible=!1,t.joints[n.jointName]=a,t.add(a)}return t.joints[n.jointName]}}const x2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_2=`
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

}`;class M2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n,a){if(this.texture===null){const l=new kn,c=t.properties.get(l);c.__webglTexture=n.texture,(n.depthNear!=a.depthNear||n.depthFar!=a.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=l}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,a=new An({vertexShader:x2,fragmentShader:_2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new $t(new Su(20,20),a)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class S2 extends ao{constructor(t,n){super();const a=this;let l=null,c=1,f=null,d="local-floor",p=1,m=null,v=null,g=null,x=null,M=null,y=null;const T=new M2,S=n.getContextAttributes();let _=null,L=null;const U=[],R=[],q=new ne;let I=null;const N=new pi;N.viewport=new je;const B=new pi;B.viewport=new je;const C=[N,B],b=new g2;let H=null,tt=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ut=U[Z];return ut===void 0&&(ut=new md,U[Z]=ut),ut.getTargetRaySpace()},this.getControllerGrip=function(Z){let ut=U[Z];return ut===void 0&&(ut=new md,U[Z]=ut),ut.getGripSpace()},this.getHand=function(Z){let ut=U[Z];return ut===void 0&&(ut=new md,U[Z]=ut),ut.getHandSpace()};function st(Z){const ut=R.indexOf(Z.inputSource);if(ut===-1)return;const Et=U[ut];Et!==void 0&&(Et.update(Z.inputSource,Z.frame,m||f),Et.dispatchEvent({type:Z.type,data:Z.inputSource}))}function ht(){l.removeEventListener("select",st),l.removeEventListener("selectstart",st),l.removeEventListener("selectend",st),l.removeEventListener("squeeze",st),l.removeEventListener("squeezestart",st),l.removeEventListener("squeezeend",st),l.removeEventListener("end",ht),l.removeEventListener("inputsourceschange",mt);for(let Z=0;Z<U.length;Z++){const ut=R[Z];ut!==null&&(R[Z]=null,U[Z].disconnect(ut))}H=null,tt=null,T.reset(),t.setRenderTarget(_),M=null,x=null,g=null,l=null,L=null,Mt.stop(),a.isPresenting=!1,t.setPixelRatio(I),t.setSize(q.width,q.height,!1),a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){c=Z,a.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){d=Z,a.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||f},this.setReferenceSpace=function(Z){m=Z},this.getBaseLayer=function(){return x!==null?x:M},this.getBinding=function(){return g},this.getFrame=function(){return y},this.getSession=function(){return l},this.setSession=async function(Z){if(l=Z,l!==null){if(_=t.getRenderTarget(),l.addEventListener("select",st),l.addEventListener("selectstart",st),l.addEventListener("selectend",st),l.addEventListener("squeeze",st),l.addEventListener("squeezestart",st),l.addEventListener("squeezeend",st),l.addEventListener("end",ht),l.addEventListener("inputsourceschange",mt),S.xrCompatible!==!0&&await n.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(q),l.renderState.layers===void 0){const ut={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:c};M=new XRWebGLLayer(l,n,ut),l.updateRenderState({baseLayer:M}),t.setPixelRatio(1),t.setSize(M.framebufferWidth,M.framebufferHeight,!1),L=new gi(M.framebufferWidth,M.framebufferHeight,{format:ki,type:Da,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil})}else{let ut=null,Et=null,_t=null;S.depth&&(_t=S.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ut=S.stencil?to:Yr,Et=S.stencil?$r:Xs);const Vt={colorFormat:n.RGBA8,depthFormat:_t,scaleFactor:c};g=new XRWebGLBinding(l,n),x=g.createProjectionLayer(Vt),l.updateRenderState({layers:[x]}),t.setPixelRatio(1),t.setSize(x.textureWidth,x.textureHeight,!1),L=new gi(x.textureWidth,x.textureHeight,{format:ki,type:Da,depthTexture:new O_(x.textureWidth,x.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,ut),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1})}L.isXRRenderTarget=!0,this.setFoveation(p),m=null,f=await l.requestReferenceSpace(d),Mt.setContext(l),Mt.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return T.getDepthTexture()};function mt(Z){for(let ut=0;ut<Z.removed.length;ut++){const Et=Z.removed[ut],_t=R.indexOf(Et);_t>=0&&(R[_t]=null,U[_t].disconnect(Et))}for(let ut=0;ut<Z.added.length;ut++){const Et=Z.added[ut];let _t=R.indexOf(Et);if(_t===-1){for(let Gt=0;Gt<U.length;Gt++)if(Gt>=R.length){R.push(Et),_t=Gt;break}else if(R[Gt]===null){R[Gt]=Et,_t=Gt;break}if(_t===-1)break}const Vt=U[_t];Vt&&Vt.connect(Et)}}const z=new V,Q=new V;function K(Z,ut,Et){z.setFromMatrixPosition(ut.matrixWorld),Q.setFromMatrixPosition(Et.matrixWorld);const _t=z.distanceTo(Q),Vt=ut.projectionMatrix.elements,Gt=Et.projectionMatrix.elements,oe=Vt[14]/(Vt[10]-1),Ge=Vt[14]/(Vt[10]+1),ge=(Vt[9]+1)/Vt[5],$e=(Vt[9]-1)/Vt[5],j=(Vt[8]-1)/Vt[0],Bn=(Gt[8]+1)/Gt[0],me=oe*j,_e=oe*Bn,Qt=_t/(-j+Bn),ze=Qt*-j;if(ut.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(ze),Z.translateZ(Qt),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Vt[10]===-1)Z.projectionMatrix.copy(ut.projectionMatrix),Z.projectionMatrixInverse.copy(ut.projectionMatrixInverse);else{const Zt=oe+Qt,O=Ge+Qt,w=me-ze,nt=_e+(_t-ze),dt=ge*Ge/O*Zt,yt=$e*Ge/O*Zt;Z.projectionMatrix.makePerspective(w,nt,dt,yt,Zt,O),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function St(Z,ut){ut===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ut.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(l===null)return;let ut=Z.near,Et=Z.far;T.texture!==null&&(T.depthNear>0&&(ut=T.depthNear),T.depthFar>0&&(Et=T.depthFar)),b.near=B.near=N.near=ut,b.far=B.far=N.far=Et,(H!==b.near||tt!==b.far)&&(l.updateRenderState({depthNear:b.near,depthFar:b.far}),H=b.near,tt=b.far),N.layers.mask=Z.layers.mask|2,B.layers.mask=Z.layers.mask|4,b.layers.mask=N.layers.mask|B.layers.mask;const _t=Z.parent,Vt=b.cameras;St(b,_t);for(let Gt=0;Gt<Vt.length;Gt++)St(Vt[Gt],_t);Vt.length===2?K(b,N,B):b.projectionMatrix.copy(N.projectionMatrix),Tt(Z,b,_t)};function Tt(Z,ut,Et){Et===null?Z.matrix.copy(ut.matrixWorld):(Z.matrix.copy(Et.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ut.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ut.projectionMatrix),Z.projectionMatrixInverse.copy(ut.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=cp*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(x===null&&M===null))return p},this.setFoveation=function(Z){p=Z,x!==null&&(x.fixedFoveation=Z),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=Z)},this.hasDepthSensing=function(){return T.texture!==null},this.getDepthSensingMesh=function(){return T.getMesh(b)};let P=null;function it(Z,ut){if(v=ut.getViewerPose(m||f),y=ut,v!==null){const Et=v.views;M!==null&&(t.setRenderTargetFramebuffer(L,M.framebuffer),t.setRenderTarget(L));let _t=!1;Et.length!==b.cameras.length&&(b.cameras.length=0,_t=!0);for(let Gt=0;Gt<Et.length;Gt++){const oe=Et[Gt];let Ge=null;if(M!==null)Ge=M.getViewport(oe);else{const $e=g.getViewSubImage(x,oe);Ge=$e.viewport,Gt===0&&(t.setRenderTargetTextures(L,$e.colorTexture,x.ignoreDepthValues?void 0:$e.depthStencilTexture),t.setRenderTarget(L))}let ge=C[Gt];ge===void 0&&(ge=new pi,ge.layers.enable(Gt),ge.viewport=new je,C[Gt]=ge),ge.matrix.fromArray(oe.transform.matrix),ge.matrix.decompose(ge.position,ge.quaternion,ge.scale),ge.projectionMatrix.fromArray(oe.projectionMatrix),ge.projectionMatrixInverse.copy(ge.projectionMatrix).invert(),ge.viewport.set(Ge.x,Ge.y,Ge.width,Ge.height),Gt===0&&(b.matrix.copy(ge.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),_t===!0&&b.cameras.push(ge)}const Vt=l.enabledFeatures;if(Vt&&Vt.includes("depth-sensing")){const Gt=g.getDepthInformation(Et[0]);Gt&&Gt.isValid&&Gt.texture&&T.init(t,Gt,l.renderState)}}for(let Et=0;Et<U.length;Et++){const _t=R[Et],Vt=U[Et];_t!==null&&Vt!==void 0&&Vt.update(_t,ut,m||f)}P&&P(Z,ut),ut.detectedPlanes&&a.dispatchEvent({type:"planesdetected",data:ut}),y=null}const Mt=new N_;Mt.setAnimationLoop(it),this.setAnimationLoop=function(Z){P=Z},this.dispose=function(){}}}const zs=new Ji,y2=new Je;function E2(r,t){function n(S,_){S.matrixAutoUpdate===!0&&S.updateMatrix(),_.value.copy(S.matrix)}function a(S,_){_.color.getRGB(S.fogColor.value,D_(r)),_.isFog?(S.fogNear.value=_.near,S.fogFar.value=_.far):_.isFogExp2&&(S.fogDensity.value=_.density)}function l(S,_,L,U,R){_.isMeshBasicMaterial||_.isMeshLambertMaterial?c(S,_):_.isMeshToonMaterial?(c(S,_),g(S,_)):_.isMeshPhongMaterial?(c(S,_),v(S,_)):_.isMeshStandardMaterial?(c(S,_),x(S,_),_.isMeshPhysicalMaterial&&M(S,_,R)):_.isMeshMatcapMaterial?(c(S,_),y(S,_)):_.isMeshDepthMaterial?c(S,_):_.isMeshDistanceMaterial?(c(S,_),T(S,_)):_.isMeshNormalMaterial?c(S,_):_.isLineBasicMaterial?(f(S,_),_.isLineDashedMaterial&&d(S,_)):_.isPointsMaterial?p(S,_,L,U):_.isSpriteMaterial?m(S,_):_.isShadowMaterial?(S.color.value.copy(_.color),S.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function c(S,_){S.opacity.value=_.opacity,_.color&&S.diffuse.value.copy(_.color),_.emissive&&S.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(S.map.value=_.map,n(_.map,S.mapTransform)),_.alphaMap&&(S.alphaMap.value=_.alphaMap,n(_.alphaMap,S.alphaMapTransform)),_.bumpMap&&(S.bumpMap.value=_.bumpMap,n(_.bumpMap,S.bumpMapTransform),S.bumpScale.value=_.bumpScale,_.side===ii&&(S.bumpScale.value*=-1)),_.normalMap&&(S.normalMap.value=_.normalMap,n(_.normalMap,S.normalMapTransform),S.normalScale.value.copy(_.normalScale),_.side===ii&&S.normalScale.value.negate()),_.displacementMap&&(S.displacementMap.value=_.displacementMap,n(_.displacementMap,S.displacementMapTransform),S.displacementScale.value=_.displacementScale,S.displacementBias.value=_.displacementBias),_.emissiveMap&&(S.emissiveMap.value=_.emissiveMap,n(_.emissiveMap,S.emissiveMapTransform)),_.specularMap&&(S.specularMap.value=_.specularMap,n(_.specularMap,S.specularMapTransform)),_.alphaTest>0&&(S.alphaTest.value=_.alphaTest);const L=t.get(_),U=L.envMap,R=L.envMapRotation;U&&(S.envMap.value=U,zs.copy(R),zs.x*=-1,zs.y*=-1,zs.z*=-1,U.isCubeTexture&&U.isRenderTargetTexture===!1&&(zs.y*=-1,zs.z*=-1),S.envMapRotation.value.setFromMatrix4(y2.makeRotationFromEuler(zs)),S.flipEnvMap.value=U.isCubeTexture&&U.isRenderTargetTexture===!1?-1:1,S.reflectivity.value=_.reflectivity,S.ior.value=_.ior,S.refractionRatio.value=_.refractionRatio),_.lightMap&&(S.lightMap.value=_.lightMap,S.lightMapIntensity.value=_.lightMapIntensity,n(_.lightMap,S.lightMapTransform)),_.aoMap&&(S.aoMap.value=_.aoMap,S.aoMapIntensity.value=_.aoMapIntensity,n(_.aoMap,S.aoMapTransform))}function f(S,_){S.diffuse.value.copy(_.color),S.opacity.value=_.opacity,_.map&&(S.map.value=_.map,n(_.map,S.mapTransform))}function d(S,_){S.dashSize.value=_.dashSize,S.totalSize.value=_.dashSize+_.gapSize,S.scale.value=_.scale}function p(S,_,L,U){S.diffuse.value.copy(_.color),S.opacity.value=_.opacity,S.size.value=_.size*L,S.scale.value=U*.5,_.map&&(S.map.value=_.map,n(_.map,S.uvTransform)),_.alphaMap&&(S.alphaMap.value=_.alphaMap,n(_.alphaMap,S.alphaMapTransform)),_.alphaTest>0&&(S.alphaTest.value=_.alphaTest)}function m(S,_){S.diffuse.value.copy(_.color),S.opacity.value=_.opacity,S.rotation.value=_.rotation,_.map&&(S.map.value=_.map,n(_.map,S.mapTransform)),_.alphaMap&&(S.alphaMap.value=_.alphaMap,n(_.alphaMap,S.alphaMapTransform)),_.alphaTest>0&&(S.alphaTest.value=_.alphaTest)}function v(S,_){S.specular.value.copy(_.specular),S.shininess.value=Math.max(_.shininess,1e-4)}function g(S,_){_.gradientMap&&(S.gradientMap.value=_.gradientMap)}function x(S,_){S.metalness.value=_.metalness,_.metalnessMap&&(S.metalnessMap.value=_.metalnessMap,n(_.metalnessMap,S.metalnessMapTransform)),S.roughness.value=_.roughness,_.roughnessMap&&(S.roughnessMap.value=_.roughnessMap,n(_.roughnessMap,S.roughnessMapTransform)),_.envMap&&(S.envMapIntensity.value=_.envMapIntensity)}function M(S,_,L){S.ior.value=_.ior,_.sheen>0&&(S.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),S.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(S.sheenColorMap.value=_.sheenColorMap,n(_.sheenColorMap,S.sheenColorMapTransform)),_.sheenRoughnessMap&&(S.sheenRoughnessMap.value=_.sheenRoughnessMap,n(_.sheenRoughnessMap,S.sheenRoughnessMapTransform))),_.clearcoat>0&&(S.clearcoat.value=_.clearcoat,S.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(S.clearcoatMap.value=_.clearcoatMap,n(_.clearcoatMap,S.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,n(_.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(S.clearcoatNormalMap.value=_.clearcoatNormalMap,n(_.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===ii&&S.clearcoatNormalScale.value.negate())),_.dispersion>0&&(S.dispersion.value=_.dispersion),_.iridescence>0&&(S.iridescence.value=_.iridescence,S.iridescenceIOR.value=_.iridescenceIOR,S.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(S.iridescenceMap.value=_.iridescenceMap,n(_.iridescenceMap,S.iridescenceMapTransform)),_.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=_.iridescenceThicknessMap,n(_.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),_.transmission>0&&(S.transmission.value=_.transmission,S.transmissionSamplerMap.value=L.texture,S.transmissionSamplerSize.value.set(L.width,L.height),_.transmissionMap&&(S.transmissionMap.value=_.transmissionMap,n(_.transmissionMap,S.transmissionMapTransform)),S.thickness.value=_.thickness,_.thicknessMap&&(S.thicknessMap.value=_.thicknessMap,n(_.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=_.attenuationDistance,S.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(S.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(S.anisotropyMap.value=_.anisotropyMap,n(_.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=_.specularIntensity,S.specularColor.value.copy(_.specularColor),_.specularColorMap&&(S.specularColorMap.value=_.specularColorMap,n(_.specularColorMap,S.specularColorMapTransform)),_.specularIntensityMap&&(S.specularIntensityMap.value=_.specularIntensityMap,n(_.specularIntensityMap,S.specularIntensityMapTransform))}function y(S,_){_.matcap&&(S.matcap.value=_.matcap)}function T(S,_){const L=t.get(_).light;S.referencePosition.value.setFromMatrixPosition(L.matrixWorld),S.nearDistance.value=L.shadow.camera.near,S.farDistance.value=L.shadow.camera.far}return{refreshFogUniforms:a,refreshMaterialUniforms:l}}function T2(r,t,n,a){let l={},c={},f=[];const d=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function p(L,U){const R=U.program;a.uniformBlockBinding(L,R)}function m(L,U){let R=l[L.id];R===void 0&&(y(L),R=v(L),l[L.id]=R,L.addEventListener("dispose",S));const q=U.program;a.updateUBOMapping(L,q);const I=t.render.frame;c[L.id]!==I&&(x(L),c[L.id]=I)}function v(L){const U=g();L.__bindingPointIndex=U;const R=r.createBuffer(),q=L.__size,I=L.usage;return r.bindBuffer(r.UNIFORM_BUFFER,R),r.bufferData(r.UNIFORM_BUFFER,q,I),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,U,R),R}function g(){for(let L=0;L<d;L++)if(f.indexOf(L)===-1)return f.push(L),L;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(L){const U=l[L.id],R=L.uniforms,q=L.__cache;r.bindBuffer(r.UNIFORM_BUFFER,U);for(let I=0,N=R.length;I<N;I++){const B=Array.isArray(R[I])?R[I]:[R[I]];for(let C=0,b=B.length;C<b;C++){const H=B[C];if(M(H,I,C,q)===!0){const tt=H.__offset,st=Array.isArray(H.value)?H.value:[H.value];let ht=0;for(let mt=0;mt<st.length;mt++){const z=st[mt],Q=T(z);typeof z=="number"||typeof z=="boolean"?(H.__data[0]=z,r.bufferSubData(r.UNIFORM_BUFFER,tt+ht,H.__data)):z.isMatrix3?(H.__data[0]=z.elements[0],H.__data[1]=z.elements[1],H.__data[2]=z.elements[2],H.__data[3]=0,H.__data[4]=z.elements[3],H.__data[5]=z.elements[4],H.__data[6]=z.elements[5],H.__data[7]=0,H.__data[8]=z.elements[6],H.__data[9]=z.elements[7],H.__data[10]=z.elements[8],H.__data[11]=0):(z.toArray(H.__data,ht),ht+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,tt,H.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function M(L,U,R,q){const I=L.value,N=U+"_"+R;if(q[N]===void 0)return typeof I=="number"||typeof I=="boolean"?q[N]=I:q[N]=I.clone(),!0;{const B=q[N];if(typeof I=="number"||typeof I=="boolean"){if(B!==I)return q[N]=I,!0}else if(B.equals(I)===!1)return B.copy(I),!0}return!1}function y(L){const U=L.uniforms;let R=0;const q=16;for(let N=0,B=U.length;N<B;N++){const C=Array.isArray(U[N])?U[N]:[U[N]];for(let b=0,H=C.length;b<H;b++){const tt=C[b],st=Array.isArray(tt.value)?tt.value:[tt.value];for(let ht=0,mt=st.length;ht<mt;ht++){const z=st[ht],Q=T(z),K=R%q,St=K%Q.boundary,Tt=K+St;R+=St,Tt!==0&&q-Tt<Q.storage&&(R+=q-Tt),tt.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),tt.__offset=R,R+=Q.storage}}}const I=R%q;return I>0&&(R+=q-I),L.__size=R,L.__cache={},this}function T(L){const U={boundary:0,storage:0};return typeof L=="number"||typeof L=="boolean"?(U.boundary=4,U.storage=4):L.isVector2?(U.boundary=8,U.storage=8):L.isVector3||L.isColor?(U.boundary=16,U.storage=12):L.isVector4?(U.boundary=16,U.storage=16):L.isMatrix3?(U.boundary=48,U.storage=48):L.isMatrix4?(U.boundary=64,U.storage=64):L.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",L),U}function S(L){const U=L.target;U.removeEventListener("dispose",S);const R=f.indexOf(U.__bindingPointIndex);f.splice(R,1),r.deleteBuffer(l[U.id]),delete l[U.id],delete c[U.id]}function _(){for(const L in l)r.deleteBuffer(l[L]);f=[],l={},c={}}return{bind:p,update:m,dispose:_}}class b2{constructor(t={}){const{canvas:n=p1(),context:a=null,depth:l=!0,stencil:c=!1,alpha:f=!1,antialias:d=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:m=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:g=!1,reverseDepthBuffer:x=!1}=t;this.isWebGLRenderer=!0;let M;if(a!==null){if(typeof WebGLRenderingContext<"u"&&a instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=a.getContextAttributes().alpha}else M=f;const y=new Uint32Array(4),T=new Int32Array(4);let S=null,_=null;const L=[],U=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Di,this.toneMapping=us,this.toneMappingExposure=1;const R=this;let q=!1,I=0,N=0,B=null,C=-1,b=null;const H=new je,tt=new je;let st=null;const ht=new te(0);let mt=0,z=n.width,Q=n.height,K=1,St=null,Tt=null;const P=new je(0,0,z,Q),it=new je(0,0,z,Q);let Mt=!1;const Z=new Ep;let ut=!1,Et=!1;const _t=new Je,Vt=new Je,Gt=new V,oe=new je,Ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ge=!1;function $e(){return B===null?K:1}let j=a;function Bn(D,X){return n.getContext(D,X)}try{const D={alpha:!0,depth:l,stencil:c,antialias:d,premultipliedAlpha:p,preserveDrawingBuffer:m,powerPreference:v,failIfMajorPerformanceCaveat:g};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${mp}`),n.addEventListener("webglcontextlost",xt,!1),n.addEventListener("webglcontextrestored",Rt,!1),n.addEventListener("webglcontextcreationerror",Ut,!1),j===null){const X="webgl2";if(j=Bn(X,D),j===null)throw Bn(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(D){throw console.error("THREE.WebGLRenderer: "+D.message),D}let me,_e,Qt,ze,Zt,O,w,nt,dt,yt,gt,qt,Lt,zt,Me,At,Bt,Kt,jt,Ot,ie,ce,Ve,k;function wt(){me=new Db(j),me.init(),ce=new m2(j,me),_e=new Tb(j,me,t,ce),Qt=new h2(j,me),_e.reverseDepthBuffer&&x&&Qt.buffers.depth.setReversed(!0),ze=new Nb(j),Zt=new QA,O=new p2(j,me,Qt,Zt,_e,ce,ze),w=new Ab(R),nt=new Cb(R),dt=new H1(j),Ve=new yb(j,dt),yt=new Lb(j,dt,ze,Ve),gt=new Pb(j,yt,dt,ze),jt=new Ob(j,_e,O),At=new bb(Zt),qt=new KA(R,w,nt,me,_e,Ve,At),Lt=new E2(R,Zt),zt=new $A,Me=new s2(me),Kt=new Sb(R,w,nt,Qt,gt,M,p),Bt=new u2(R,gt,_e),k=new T2(j,ze,_e,Qt),Ot=new Eb(j,me,ze),ie=new Ub(j,me,ze),ze.programs=qt.programs,R.capabilities=_e,R.extensions=me,R.properties=Zt,R.renderLists=zt,R.shadowMap=Bt,R.state=Qt,R.info=ze}wt();const ct=new S2(R,j);this.xr=ct,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){const D=me.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=me.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(D){D!==void 0&&(K=D,this.setSize(z,Q,!1))},this.getSize=function(D){return D.set(z,Q)},this.setSize=function(D,X,rt=!0){if(ct.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=D,Q=X,n.width=Math.floor(D*K),n.height=Math.floor(X*K),rt===!0&&(n.style.width=D+"px",n.style.height=X+"px"),this.setViewport(0,0,D,X)},this.getDrawingBufferSize=function(D){return D.set(z*K,Q*K).floor()},this.setDrawingBufferSize=function(D,X,rt){z=D,Q=X,K=rt,n.width=Math.floor(D*rt),n.height=Math.floor(X*rt),this.setViewport(0,0,D,X)},this.getCurrentViewport=function(D){return D.copy(H)},this.getViewport=function(D){return D.copy(P)},this.setViewport=function(D,X,rt,at){D.isVector4?P.set(D.x,D.y,D.z,D.w):P.set(D,X,rt,at),Qt.viewport(H.copy(P).multiplyScalar(K).round())},this.getScissor=function(D){return D.copy(it)},this.setScissor=function(D,X,rt,at){D.isVector4?it.set(D.x,D.y,D.z,D.w):it.set(D,X,rt,at),Qt.scissor(tt.copy(it).multiplyScalar(K).round())},this.getScissorTest=function(){return Mt},this.setScissorTest=function(D){Qt.setScissorTest(Mt=D)},this.setOpaqueSort=function(D){St=D},this.setTransparentSort=function(D){Tt=D},this.getClearColor=function(D){return D.copy(Kt.getClearColor())},this.setClearColor=function(){Kt.setClearColor.apply(Kt,arguments)},this.getClearAlpha=function(){return Kt.getClearAlpha()},this.setClearAlpha=function(){Kt.setClearAlpha.apply(Kt,arguments)},this.clear=function(D=!0,X=!0,rt=!0){let at=0;if(D){let W=!1;if(B!==null){const bt=B.texture.format;W=bt===Sp||bt===Mp||bt===_p}if(W){const bt=B.texture.type,Ct=bt===Da||bt===Xs||bt===ul||bt===$r||bt===vp||bt===xp,Dt=Kt.getClearColor(),kt=Kt.getClearAlpha(),se=Dt.r,ee=Dt.g,It=Dt.b;Ct?(y[0]=se,y[1]=ee,y[2]=It,y[3]=kt,j.clearBufferuiv(j.COLOR,0,y)):(T[0]=se,T[1]=ee,T[2]=It,T[3]=kt,j.clearBufferiv(j.COLOR,0,T))}else at|=j.COLOR_BUFFER_BIT}X&&(at|=j.DEPTH_BUFFER_BIT),rt&&(at|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j.clear(at)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",xt,!1),n.removeEventListener("webglcontextrestored",Rt,!1),n.removeEventListener("webglcontextcreationerror",Ut,!1),zt.dispose(),Me.dispose(),Zt.dispose(),w.dispose(),nt.dispose(),gt.dispose(),Ve.dispose(),k.dispose(),qt.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",ro),ct.removeEventListener("sessionend",oo),Wi.stop()};function xt(D){D.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),q=!0}function Rt(){console.log("THREE.WebGLRenderer: Context Restored."),q=!1;const D=ze.autoReset,X=Bt.enabled,rt=Bt.autoUpdate,at=Bt.needsUpdate,W=Bt.type;wt(),ze.autoReset=D,Bt.enabled=X,Bt.autoUpdate=rt,Bt.needsUpdate=at,Bt.type=W}function Ut(D){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function ae(D){const X=D.target;X.removeEventListener("dispose",ae),tn(X)}function tn(D){vn(D),Zt.remove(D)}function vn(D){const X=Zt.get(D).programs;X!==void 0&&(X.forEach(function(rt){qt.releaseProgram(rt)}),D.isShaderMaterial&&qt.releaseShaderCache(D))}this.renderBufferDirect=function(D,X,rt,at,W,bt){X===null&&(X=Ge);const Ct=W.isMesh&&W.matrixWorld.determinant()<0,Dt=co(D,X,rt,at,W);Qt.setMaterial(at,Ct);let kt=rt.index,se=1;if(at.wireframe===!0){if(kt=yt.getWireframeAttribute(rt),kt===void 0)return;se=2}const ee=rt.drawRange,It=rt.attributes.position;let we=ee.start*se,Be=(ee.start+ee.count)*se;bt!==null&&(we=Math.max(we,bt.start*se),Be=Math.min(Be,(bt.start+bt.count)*se)),kt!==null?(we=Math.max(we,0),Be=Math.min(Be,kt.count)):It!=null&&(we=Math.max(we,0),Be=Math.min(Be,It.count));const ke=Be-we;if(ke<0||ke===1/0)return;Ve.setup(W,at,Dt,rt,kt);let In,be=Ot;if(kt!==null&&(In=dt.get(kt),be=ie,be.setIndex(In)),W.isMesh)at.wireframe===!0?(Qt.setLineWidth(at.wireframeLinewidth*$e()),be.setMode(j.LINES)):be.setMode(j.TRIANGLES);else if(W.isLine){let Xt=at.linewidth;Xt===void 0&&(Xt=1),Qt.setLineWidth(Xt*$e()),W.isLineSegments?be.setMode(j.LINES):W.isLineLoop?be.setMode(j.LINE_LOOP):be.setMode(j.LINE_STRIP)}else W.isPoints?be.setMode(j.POINTS):W.isSprite&&be.setMode(j.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)be.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(me.get("WEBGL_multi_draw"))be.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Xt=W._multiDrawStarts,xn=W._multiDrawCounts,le=W._multiDrawCount,jn=kt?dt.get(kt).bytesPerElement:1,La=Zt.get(at).currentProgram.getUniforms();for(let Ln=0;Ln<le;Ln++)La.setValue(j,"_gl_DrawID",Ln),be.render(Xt[Ln]/jn,xn[Ln])}else if(W.isInstancedMesh)be.renderInstances(we,ke,W.count);else if(rt.isInstancedBufferGeometry){const Xt=rt._maxInstanceCount!==void 0?rt._maxInstanceCount:1/0,xn=Math.min(rt.instanceCount,Xt);be.renderInstances(we,ke,xn)}else be.render(we,ke)};function Ce(D,X,rt){D.transparent===!0&&D.side===ba&&D.forceSinglePass===!1?(D.side=ii,D.needsUpdate=!0,rn(D,X,rt),D.side=hs,D.needsUpdate=!0,rn(D,X,rt),D.side=ba):rn(D,X,rt)}this.compile=function(D,X,rt=null){rt===null&&(rt=D),_=Me.get(rt),_.init(X),U.push(_),rt.traverseVisible(function(W){W.isLight&&W.layers.test(X.layers)&&(_.pushLight(W),W.castShadow&&_.pushShadow(W))}),D!==rt&&D.traverseVisible(function(W){W.isLight&&W.layers.test(X.layers)&&(_.pushLight(W),W.castShadow&&_.pushShadow(W))}),_.setupLights();const at=new Set;return D.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const bt=W.material;if(bt)if(Array.isArray(bt))for(let Ct=0;Ct<bt.length;Ct++){const Dt=bt[Ct];Ce(Dt,rt,W),at.add(Dt)}else Ce(bt,rt,W),at.add(bt)}),U.pop(),_=null,at},this.compileAsync=function(D,X,rt=null){const at=this.compile(D,X,rt);return new Promise(W=>{function bt(){if(at.forEach(function(Ct){Zt.get(Ct).currentProgram.isReady()&&at.delete(Ct)}),at.size===0){W(D);return}setTimeout(bt,10)}me.get("KHR_parallel_shader_compile")!==null?bt():setTimeout(bt,10)})};let Cn=null;function Ni(D){Cn&&Cn(D)}function ro(){Wi.stop()}function oo(){Wi.start()}const Wi=new N_;Wi.setAnimationLoop(Ni),typeof self<"u"&&Wi.setContext(self),this.setAnimationLoop=function(D){Cn=D,ct.setAnimationLoop(D),D===null?Wi.stop():Wi.start()},ct.addEventListener("sessionstart",ro),ct.addEventListener("sessionend",oo),this.render=function(D,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(q===!0)return;if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(X),X=ct.getCamera()),D.isScene===!0&&D.onBeforeRender(R,D,X,B),_=Me.get(D,U.length),_.init(X),U.push(_),Vt.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),Z.setFromProjectionMatrix(Vt),Et=this.localClippingEnabled,ut=At.init(this.clippingPlanes,Et),S=zt.get(D,L.length),S.init(),L.push(S),ct.enabled===!0&&ct.isPresenting===!0){const bt=R.xr.getDepthSensingMesh();bt!==null&&ds(bt,X,-1/0,R.sortObjects)}ds(D,X,0,R.sortObjects),S.finish(),R.sortObjects===!0&&S.sort(St,Tt),ge=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,ge&&Kt.addToRenderList(S,D),this.info.render.frame++,ut===!0&&At.beginShadows();const rt=_.state.shadowsArray;Bt.render(rt,D,X),ut===!0&&At.endShadows(),this.info.autoReset===!0&&this.info.reset();const at=S.opaque,W=S.transmissive;if(_.setupLights(),X.isArrayCamera){const bt=X.cameras;if(W.length>0)for(let Ct=0,Dt=bt.length;Ct<Dt;Ct++){const kt=bt[Ct];lo(at,W,D,kt)}ge&&Kt.render(D);for(let Ct=0,Dt=bt.length;Ct<Dt;Ct++){const kt=bt[Ct];js(S,D,kt,kt.viewport)}}else W.length>0&&lo(at,W,D,X),ge&&Kt.render(D),js(S,D,X);B!==null&&(O.updateMultisampleRenderTarget(B),O.updateRenderTargetMipmap(B)),D.isScene===!0&&D.onAfterRender(R,D,X),Ve.resetDefaultState(),C=-1,b=null,U.pop(),U.length>0?(_=U[U.length-1],ut===!0&&At.setGlobalState(R.clippingPlanes,_.state.camera)):_=null,L.pop(),L.length>0?S=L[L.length-1]:S=null};function ds(D,X,rt,at){if(D.visible===!1)return;if(D.layers.test(X.layers)){if(D.isGroup)rt=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(X);else if(D.isLight)_.pushLight(D),D.castShadow&&_.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||Z.intersectsSprite(D)){at&&oe.setFromMatrixPosition(D.matrixWorld).applyMatrix4(Vt);const Ct=gt.update(D),Dt=D.material;Dt.visible&&S.push(D,Ct,Dt,rt,oe.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||Z.intersectsObject(D))){const Ct=gt.update(D),Dt=D.material;if(at&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),oe.copy(D.boundingSphere.center)):(Ct.boundingSphere===null&&Ct.computeBoundingSphere(),oe.copy(Ct.boundingSphere.center)),oe.applyMatrix4(D.matrixWorld).applyMatrix4(Vt)),Array.isArray(Dt)){const kt=Ct.groups;for(let se=0,ee=kt.length;se<ee;se++){const It=kt[se],we=Dt[It.materialIndex];we&&we.visible&&S.push(D,Ct,we,rt,oe.z,It)}}else Dt.visible&&S.push(D,Ct,Dt,rt,oe.z,null)}}const bt=D.children;for(let Ct=0,Dt=bt.length;Ct<Dt;Ct++)ds(bt[Ct],X,rt,at)}function js(D,X,rt,at){const W=D.opaque,bt=D.transmissive,Ct=D.transparent;_.setupLightsView(rt),ut===!0&&At.setGlobalState(R.clippingPlanes,rt),at&&Qt.viewport(H.copy(at)),W.length>0&&ps(W,X,rt),bt.length>0&&ps(bt,X,rt),Ct.length>0&&ps(Ct,X,rt),Qt.buffers.depth.setTest(!0),Qt.buffers.depth.setMask(!0),Qt.buffers.color.setMask(!0),Qt.setPolygonOffset(!1)}function lo(D,X,rt,at){if((rt.isScene===!0?rt.overrideMaterial:null)!==null)return;_.state.transmissionRenderTarget[at.id]===void 0&&(_.state.transmissionRenderTarget[at.id]=new gi(1,1,{generateMipmaps:!0,type:me.has("EXT_color_buffer_half_float")||me.has("EXT_color_buffer_float")?Xi:Da,minFilter:Vs,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Re.workingColorSpace}));const bt=_.state.transmissionRenderTarget[at.id],Ct=at.viewport||H;bt.setSize(Ct.z,Ct.w);const Dt=R.getRenderTarget();R.setRenderTarget(bt),R.getClearColor(ht),mt=R.getClearAlpha(),mt<1&&R.setClearColor(16777215,.5),R.clear(),ge&&Kt.render(rt);const kt=R.toneMapping;R.toneMapping=us;const se=at.viewport;if(at.viewport!==void 0&&(at.viewport=void 0),_.setupLightsView(at),ut===!0&&At.setGlobalState(R.clippingPlanes,at),ps(D,rt,at),O.updateMultisampleRenderTarget(bt),O.updateRenderTargetMipmap(bt),me.has("WEBGL_multisampled_render_to_texture")===!1){let ee=!1;for(let It=0,we=X.length;It<we;It++){const Be=X[It],ke=Be.object,In=Be.geometry,be=Be.material,Xt=Be.group;if(be.side===ba&&ke.layers.test(at.layers)){const xn=be.side;be.side=ii,be.needsUpdate=!0,Oi(ke,rt,at,In,be,Xt),be.side=xn,be.needsUpdate=!0,ee=!0}}ee===!0&&(O.updateMultisampleRenderTarget(bt),O.updateRenderTargetMipmap(bt))}R.setRenderTarget(Dt),R.setClearColor(ht,mt),se!==void 0&&(at.viewport=se),R.toneMapping=kt}function ps(D,X,rt){const at=X.isScene===!0?X.overrideMaterial:null;for(let W=0,bt=D.length;W<bt;W++){const Ct=D[W],Dt=Ct.object,kt=Ct.geometry,se=at===null?Ct.material:at,ee=Ct.group;Dt.layers.test(rt.layers)&&Oi(Dt,X,rt,kt,se,ee)}}function Oi(D,X,rt,at,W,bt){D.onBeforeRender(R,X,rt,at,W,bt),D.modelViewMatrix.multiplyMatrices(rt.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),W.onBeforeRender(R,X,rt,at,D,bt),W.transparent===!0&&W.side===ba&&W.forceSinglePass===!1?(W.side=ii,W.needsUpdate=!0,R.renderBufferDirect(rt,X,at,W,D,bt),W.side=hs,W.needsUpdate=!0,R.renderBufferDirect(rt,X,at,W,D,bt),W.side=ba):R.renderBufferDirect(rt,X,at,W,D,bt),D.onAfterRender(R,X,rt,at,W,bt)}function rn(D,X,rt){X.isScene!==!0&&(X=Ge);const at=Zt.get(D),W=_.state.lights,bt=_.state.shadowsArray,Ct=W.state.version,Dt=qt.getParameters(D,W.state,bt,X,rt),kt=qt.getProgramCacheKey(Dt);let se=at.programs;at.environment=D.isMeshStandardMaterial?X.environment:null,at.fog=X.fog,at.envMap=(D.isMeshStandardMaterial?nt:w).get(D.envMap||at.environment),at.envMapRotation=at.environment!==null&&D.envMap===null?X.environmentRotation:D.envMapRotation,se===void 0&&(D.addEventListener("dispose",ae),se=new Map,at.programs=se);let ee=se.get(kt);if(ee!==void 0){if(at.currentProgram===ee&&at.lightsStateVersion===Ct)return $i(D,Dt),ee}else Dt.uniforms=qt.getUniforms(D),D.onBeforeCompile(Dt,R),ee=qt.acquireProgram(Dt,kt),se.set(kt,ee),at.uniforms=Dt.uniforms;const It=at.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(It.clippingPlanes=At.uniform),$i(D,Dt),at.needsLights=bu(D),at.lightsStateVersion=Ct,at.needsLights&&(It.ambientLightColor.value=W.state.ambient,It.lightProbe.value=W.state.probe,It.directionalLights.value=W.state.directional,It.directionalLightShadows.value=W.state.directionalShadow,It.spotLights.value=W.state.spot,It.spotLightShadows.value=W.state.spotShadow,It.rectAreaLights.value=W.state.rectArea,It.ltc_1.value=W.state.rectAreaLTC1,It.ltc_2.value=W.state.rectAreaLTC2,It.pointLights.value=W.state.point,It.pointLightShadows.value=W.state.pointShadow,It.hemisphereLights.value=W.state.hemi,It.directionalShadowMap.value=W.state.directionalShadowMap,It.directionalShadowMatrix.value=W.state.directionalShadowMatrix,It.spotShadowMap.value=W.state.spotShadowMap,It.spotLightMatrix.value=W.state.spotLightMatrix,It.spotLightMap.value=W.state.spotLightMap,It.pointShadowMap.value=W.state.pointShadowMap,It.pointShadowMatrix.value=W.state.pointShadowMatrix),at.currentProgram=ee,at.uniformsList=null,ee}function Dn(D){if(D.uniformsList===null){const X=D.currentProgram.getUniforms();D.uniformsList=fu.seqWithValue(X.seq,D.uniforms)}return D.uniformsList}function $i(D,X){const rt=Zt.get(D);rt.outputColorSpace=X.outputColorSpace,rt.batching=X.batching,rt.batchingColor=X.batchingColor,rt.instancing=X.instancing,rt.instancingColor=X.instancingColor,rt.instancingMorph=X.instancingMorph,rt.skinning=X.skinning,rt.morphTargets=X.morphTargets,rt.morphNormals=X.morphNormals,rt.morphColors=X.morphColors,rt.morphTargetsCount=X.morphTargetsCount,rt.numClippingPlanes=X.numClippingPlanes,rt.numIntersection=X.numClipIntersection,rt.vertexAlphas=X.vertexAlphas,rt.vertexTangents=X.vertexTangents,rt.toneMapping=X.toneMapping}function co(D,X,rt,at,W){X.isScene!==!0&&(X=Ge),O.resetTextureUnits();const bt=X.fog,Ct=at.isMeshStandardMaterial?X.environment:null,Dt=B===null?R.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:io,kt=(at.isMeshStandardMaterial?nt:w).get(at.envMap||Ct),se=at.vertexColors===!0&&!!rt.attributes.color&&rt.attributes.color.itemSize===4,ee=!!rt.attributes.tangent&&(!!at.normalMap||at.anisotropy>0),It=!!rt.morphAttributes.position,we=!!rt.morphAttributes.normal,Be=!!rt.morphAttributes.color;let ke=us;at.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(ke=R.toneMapping);const In=rt.morphAttributes.position||rt.morphAttributes.normal||rt.morphAttributes.color,be=In!==void 0?In.length:0,Xt=Zt.get(at),xn=_.state.lights;if(ut===!0&&(Et===!0||D!==b)){const Fn=D===b&&at.id===C;At.setState(at,D,Fn)}let le=!1;at.version===Xt.__version?(Xt.needsLights&&Xt.lightsStateVersion!==xn.state.version||Xt.outputColorSpace!==Dt||W.isBatchedMesh&&Xt.batching===!1||!W.isBatchedMesh&&Xt.batching===!0||W.isBatchedMesh&&Xt.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Xt.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Xt.instancing===!1||!W.isInstancedMesh&&Xt.instancing===!0||W.isSkinnedMesh&&Xt.skinning===!1||!W.isSkinnedMesh&&Xt.skinning===!0||W.isInstancedMesh&&Xt.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Xt.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Xt.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Xt.instancingMorph===!1&&W.morphTexture!==null||Xt.envMap!==kt||at.fog===!0&&Xt.fog!==bt||Xt.numClippingPlanes!==void 0&&(Xt.numClippingPlanes!==At.numPlanes||Xt.numIntersection!==At.numIntersection)||Xt.vertexAlphas!==se||Xt.vertexTangents!==ee||Xt.morphTargets!==It||Xt.morphNormals!==we||Xt.morphColors!==Be||Xt.toneMapping!==ke||Xt.morphTargetsCount!==be)&&(le=!0):(le=!0,Xt.__version=at.version);let jn=Xt.currentProgram;le===!0&&(jn=rn(at,X,W));let La=!1,Ln=!1,Ua=!1;const Pe=jn.getUniforms(),vi=Xt.uniforms;if(Qt.useProgram(jn.program)&&(La=!0,Ln=!0,Ua=!0),at.id!==C&&(C=at.id,Ln=!0),La||b!==D){Qt.buffers.depth.getReversed()?(_t.copy(D.projectionMatrix),g1(_t),v1(_t),Pe.setValue(j,"projectionMatrix",_t)):Pe.setValue(j,"projectionMatrix",D.projectionMatrix),Pe.setValue(j,"viewMatrix",D.matrixWorldInverse);const Pi=Pe.map.cameraPosition;Pi!==void 0&&Pi.setValue(j,Gt.setFromMatrixPosition(D.matrixWorld)),_e.logarithmicDepthBuffer&&Pe.setValue(j,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(at.isMeshPhongMaterial||at.isMeshToonMaterial||at.isMeshLambertMaterial||at.isMeshBasicMaterial||at.isMeshStandardMaterial||at.isShaderMaterial)&&Pe.setValue(j,"isOrthographic",D.isOrthographicCamera===!0),b!==D&&(b=D,Ln=!0,Ua=!0)}if(W.isSkinnedMesh){Pe.setOptional(j,W,"bindMatrix"),Pe.setOptional(j,W,"bindMatrixInverse");const Fn=W.skeleton;Fn&&(Fn.boneTexture===null&&Fn.computeBoneTexture(),Pe.setValue(j,"boneTexture",Fn.boneTexture,O))}W.isBatchedMesh&&(Pe.setOptional(j,W,"batchingTexture"),Pe.setValue(j,"batchingTexture",W._matricesTexture,O),Pe.setOptional(j,W,"batchingIdTexture"),Pe.setValue(j,"batchingIdTexture",W._indirectTexture,O),Pe.setOptional(j,W,"batchingColorTexture"),W._colorsTexture!==null&&Pe.setValue(j,"batchingColorTexture",W._colorsTexture,O));const yn=rt.morphAttributes;if((yn.position!==void 0||yn.normal!==void 0||yn.color!==void 0)&&jt.update(W,rt,jn),(Ln||Xt.receiveShadow!==W.receiveShadow)&&(Xt.receiveShadow=W.receiveShadow,Pe.setValue(j,"receiveShadow",W.receiveShadow)),at.isMeshGouraudMaterial&&at.envMap!==null&&(vi.envMap.value=kt,vi.flipEnvMap.value=kt.isCubeTexture&&kt.isRenderTargetTexture===!1?-1:1),at.isMeshStandardMaterial&&at.envMap===null&&X.environment!==null&&(vi.envMapIntensity.value=X.environmentIntensity),Ln&&(Pe.setValue(j,"toneMappingExposure",R.toneMappingExposure),Xt.needsLights&&Tu(vi,Ua),bt&&at.fog===!0&&Lt.refreshFogUniforms(vi,bt),Lt.refreshMaterialUniforms(vi,at,K,Q,_.state.transmissionRenderTarget[D.id]),fu.upload(j,Dn(Xt),vi,O)),at.isShaderMaterial&&at.uniformsNeedUpdate===!0&&(fu.upload(j,Dn(Xt),vi,O),at.uniformsNeedUpdate=!1),at.isSpriteMaterial&&Pe.setValue(j,"center",W.center),Pe.setValue(j,"modelViewMatrix",W.modelViewMatrix),Pe.setValue(j,"normalMatrix",W.normalMatrix),Pe.setValue(j,"modelMatrix",W.matrixWorld),at.isShaderMaterial||at.isRawShaderMaterial){const Fn=at.uniformsGroups;for(let Pi=0,xi=Fn.length;Pi<xi;Pi++){const ta=Fn[Pi];k.update(ta,jn),k.bind(ta,jn)}}return jn}function Tu(D,X){D.ambientLightColor.needsUpdate=X,D.lightProbe.needsUpdate=X,D.directionalLights.needsUpdate=X,D.directionalLightShadows.needsUpdate=X,D.pointLights.needsUpdate=X,D.pointLightShadows.needsUpdate=X,D.spotLights.needsUpdate=X,D.spotLightShadows.needsUpdate=X,D.rectAreaLights.needsUpdate=X,D.hemisphereLights.needsUpdate=X}function bu(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(D,X,rt){Zt.get(D.texture).__webglTexture=X,Zt.get(D.depthTexture).__webglTexture=rt;const at=Zt.get(D);at.__hasExternalTextures=!0,at.__autoAllocateDepthBuffer=rt===void 0,at.__autoAllocateDepthBuffer||me.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),at.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(D,X){const rt=Zt.get(D);rt.__webglFramebuffer=X,rt.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(D,X=0,rt=0){B=D,I=X,N=rt;let at=!0,W=null,bt=!1,Ct=!1;if(D){const kt=Zt.get(D);if(kt.__useDefaultFramebuffer!==void 0)Qt.bindFramebuffer(j.FRAMEBUFFER,null),at=!1;else if(kt.__webglFramebuffer===void 0)O.setupRenderTarget(D);else if(kt.__hasExternalTextures)O.rebindTextures(D,Zt.get(D.texture).__webglTexture,Zt.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){const It=D.depthTexture;if(kt.__boundDepthTexture!==It){if(It!==null&&Zt.has(It)&&(D.width!==It.image.width||D.height!==It.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");O.setupDepthRenderbuffer(D)}}const se=D.texture;(se.isData3DTexture||se.isDataArrayTexture||se.isCompressedArrayTexture)&&(Ct=!0);const ee=Zt.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(ee[X])?W=ee[X][rt]:W=ee[X],bt=!0):D.samples>0&&O.useMultisampledRTT(D)===!1?W=Zt.get(D).__webglMultisampledFramebuffer:Array.isArray(ee)?W=ee[rt]:W=ee,H.copy(D.viewport),tt.copy(D.scissor),st=D.scissorTest}else H.copy(P).multiplyScalar(K).floor(),tt.copy(it).multiplyScalar(K).floor(),st=Mt;if(Qt.bindFramebuffer(j.FRAMEBUFFER,W)&&at&&Qt.drawBuffers(D,W),Qt.viewport(H),Qt.scissor(tt),Qt.setScissorTest(st),bt){const kt=Zt.get(D.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+X,kt.__webglTexture,rt)}else if(Ct){const kt=Zt.get(D.texture),se=X||0;j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,kt.__webglTexture,rt||0,se)}C=-1},this.readRenderTargetPixels=function(D,X,rt,at,W,bt,Ct){if(!(D&&D.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Dt=Zt.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Ct!==void 0&&(Dt=Dt[Ct]),Dt){Qt.bindFramebuffer(j.FRAMEBUFFER,Dt);try{const kt=D.texture,se=kt.format,ee=kt.type;if(!_e.textureFormatReadable(se)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_e.textureTypeReadable(ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=D.width-at&&rt>=0&&rt<=D.height-W&&j.readPixels(X,rt,at,W,ce.convert(se),ce.convert(ee),bt)}finally{const kt=B!==null?Zt.get(B).__webglFramebuffer:null;Qt.bindFramebuffer(j.FRAMEBUFFER,kt)}}},this.readRenderTargetPixelsAsync=async function(D,X,rt,at,W,bt,Ct){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Dt=Zt.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Ct!==void 0&&(Dt=Dt[Ct]),Dt){const kt=D.texture,se=kt.format,ee=kt.type;if(!_e.textureFormatReadable(se))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_e.textureTypeReadable(ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(X>=0&&X<=D.width-at&&rt>=0&&rt<=D.height-W){Qt.bindFramebuffer(j.FRAMEBUFFER,Dt);const It=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,It),j.bufferData(j.PIXEL_PACK_BUFFER,bt.byteLength,j.STREAM_READ),j.readPixels(X,rt,at,W,ce.convert(se),ce.convert(ee),0);const we=B!==null?Zt.get(B).__webglFramebuffer:null;Qt.bindFramebuffer(j.FRAMEBUFFER,we);const Be=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await m1(j,Be,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,It),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,bt),j.deleteBuffer(It),j.deleteSync(Be),bt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(D,X=null,rt=0){D.isTexture!==!0&&(ll("WebGLRenderer: copyFramebufferToTexture function signature has changed."),X=arguments[0]||null,D=arguments[1]);const at=Math.pow(2,-rt),W=Math.floor(D.image.width*at),bt=Math.floor(D.image.height*at),Ct=X!==null?X.x:0,Dt=X!==null?X.y:0;O.setTexture2D(D,0),j.copyTexSubImage2D(j.TEXTURE_2D,rt,0,0,Ct,Dt,W,bt),Qt.unbindTexture()},this.copyTextureToTexture=function(D,X,rt=null,at=null,W=0){D.isTexture!==!0&&(ll("WebGLRenderer: copyTextureToTexture function signature has changed."),at=arguments[0]||null,D=arguments[1],X=arguments[2],W=arguments[3]||0,rt=null);let bt,Ct,Dt,kt,se,ee,It,we,Be;const ke=D.isCompressedTexture?D.mipmaps[W]:D.image;rt!==null?(bt=rt.max.x-rt.min.x,Ct=rt.max.y-rt.min.y,Dt=rt.isBox3?rt.max.z-rt.min.z:1,kt=rt.min.x,se=rt.min.y,ee=rt.isBox3?rt.min.z:0):(bt=ke.width,Ct=ke.height,Dt=ke.depth||1,kt=0,se=0,ee=0),at!==null?(It=at.x,we=at.y,Be=at.z):(It=0,we=0,Be=0);const In=ce.convert(X.format),be=ce.convert(X.type);let Xt;X.isData3DTexture?(O.setTexture3D(X,0),Xt=j.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(O.setTexture2DArray(X,0),Xt=j.TEXTURE_2D_ARRAY):(O.setTexture2D(X,0),Xt=j.TEXTURE_2D),j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,X.flipY),j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),j.pixelStorei(j.UNPACK_ALIGNMENT,X.unpackAlignment);const xn=j.getParameter(j.UNPACK_ROW_LENGTH),le=j.getParameter(j.UNPACK_IMAGE_HEIGHT),jn=j.getParameter(j.UNPACK_SKIP_PIXELS),La=j.getParameter(j.UNPACK_SKIP_ROWS),Ln=j.getParameter(j.UNPACK_SKIP_IMAGES);j.pixelStorei(j.UNPACK_ROW_LENGTH,ke.width),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,ke.height),j.pixelStorei(j.UNPACK_SKIP_PIXELS,kt),j.pixelStorei(j.UNPACK_SKIP_ROWS,se),j.pixelStorei(j.UNPACK_SKIP_IMAGES,ee);const Ua=D.isDataArrayTexture||D.isData3DTexture,Pe=X.isDataArrayTexture||X.isData3DTexture;if(D.isRenderTargetTexture||D.isDepthTexture){const vi=Zt.get(D),yn=Zt.get(X),Fn=Zt.get(vi.__renderTarget),Pi=Zt.get(yn.__renderTarget);Qt.bindFramebuffer(j.READ_FRAMEBUFFER,Fn.__webglFramebuffer),Qt.bindFramebuffer(j.DRAW_FRAMEBUFFER,Pi.__webglFramebuffer);for(let xi=0;xi<Dt;xi++)Ua&&j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,Zt.get(D).__webglTexture,W,ee+xi),D.isDepthTexture?(Pe&&j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,Zt.get(X).__webglTexture,W,Be+xi),j.blitFramebuffer(kt,se,bt,Ct,It,we,bt,Ct,j.DEPTH_BUFFER_BIT,j.NEAREST)):Pe?j.copyTexSubImage3D(Xt,W,It,we,Be+xi,kt,se,bt,Ct):j.copyTexSubImage2D(Xt,W,It,we,Be+xi,kt,se,bt,Ct);Qt.bindFramebuffer(j.READ_FRAMEBUFFER,null),Qt.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else Pe?D.isDataTexture||D.isData3DTexture?j.texSubImage3D(Xt,W,It,we,Be,bt,Ct,Dt,In,be,ke.data):X.isCompressedArrayTexture?j.compressedTexSubImage3D(Xt,W,It,we,Be,bt,Ct,Dt,In,ke.data):j.texSubImage3D(Xt,W,It,we,Be,bt,Ct,Dt,In,be,ke):D.isDataTexture?j.texSubImage2D(j.TEXTURE_2D,W,It,we,bt,Ct,In,be,ke.data):D.isCompressedTexture?j.compressedTexSubImage2D(j.TEXTURE_2D,W,It,we,ke.width,ke.height,In,ke.data):j.texSubImage2D(j.TEXTURE_2D,W,It,we,bt,Ct,In,be,ke);j.pixelStorei(j.UNPACK_ROW_LENGTH,xn),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,le),j.pixelStorei(j.UNPACK_SKIP_PIXELS,jn),j.pixelStorei(j.UNPACK_SKIP_ROWS,La),j.pixelStorei(j.UNPACK_SKIP_IMAGES,Ln),W===0&&X.generateMipmaps&&j.generateMipmap(Xt),Qt.unbindTexture()},this.copyTextureToTexture3D=function(D,X,rt=null,at=null,W=0){return D.isTexture!==!0&&(ll("WebGLRenderer: copyTextureToTexture3D function signature has changed."),rt=arguments[0]||null,at=arguments[1]||null,D=arguments[2],X=arguments[3],W=arguments[4]||0),ll('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(D,X,rt,at,W)},this.initRenderTarget=function(D){Zt.get(D).__webglFramebuffer===void 0&&O.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?O.setTextureCube(D,0):D.isData3DTexture?O.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?O.setTexture2DArray(D,0):O.setTexture2D(D,0),Qt.unbindTexture()},this.resetState=function(){I=0,N=0,B=null,Qt.reset(),Ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wa}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorspace=Re._getDrawingBufferColorSpace(t),n.unpackColorSpace=Re._getUnpackColorSpace()}}class A2 extends wn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ji,this.environmentIntensity=1,this.environmentRotation=new Ji,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class Vr extends Ws{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new te(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const mu=new V,gu=new V,Cx=new Je,sl=new yp,qc=new pl,gd=new V,Dx=new V;class F_ extends wn{constructor(t=new Rn,n=new Vr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,a=[0];for(let l=1,c=n.count;l<c;l++)mu.fromBufferAttribute(n,l-1),gu.fromBufferAttribute(n,l),a[l]=a[l-1],a[l]+=mu.distanceTo(gu);t.setAttribute("lineDistance",new an(a,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){const a=this.geometry,l=this.matrixWorld,c=t.params.Line.threshold,f=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),qc.copy(a.boundingSphere),qc.applyMatrix4(l),qc.radius+=c,t.ray.intersectsSphere(qc)===!1)return;Cx.copy(l).invert(),sl.copy(t.ray).applyMatrix4(Cx);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),p=d*d,m=this.isLineSegments?2:1,v=a.index,x=a.attributes.position;if(v!==null){const M=Math.max(0,f.start),y=Math.min(v.count,f.start+f.count);for(let T=M,S=y-1;T<S;T+=m){const _=v.getX(T),L=v.getX(T+1),U=jc(this,t,sl,p,_,L);U&&n.push(U)}if(this.isLineLoop){const T=v.getX(y-1),S=v.getX(M),_=jc(this,t,sl,p,T,S);_&&n.push(_)}}else{const M=Math.max(0,f.start),y=Math.min(x.count,f.start+f.count);for(let T=M,S=y-1;T<S;T+=m){const _=jc(this,t,sl,p,T,T+1);_&&n.push(_)}if(this.isLineLoop){const T=jc(this,t,sl,p,y-1,M);T&&n.push(T)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const l=n[a[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function jc(r,t,n,a,l,c){const f=r.geometry.attributes.position;if(mu.fromBufferAttribute(f,l),gu.fromBufferAttribute(f,c),n.distanceSqToSegment(mu,gu,gd,Dx)>a)return;gd.applyMatrix4(r.matrixWorld);const p=t.ray.origin.distanceTo(gd);if(!(p<t.near||p>t.far))return{distance:p,point:Dx.clone().applyMatrix4(r.matrixWorld),index:l,face:null,faceIndex:null,barycoord:null,object:r}}const Lx=new V,Ux=new V;class Yc extends F_{constructor(t,n){super(t,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,a=[];for(let l=0,c=n.count;l<c;l+=2)Lx.fromBufferAttribute(n,l),Ux.fromBufferAttribute(n,l+1),a[l]=l===0?0:a[l-1],a[l+1]=a[l]+Lx.distanceTo(Ux);t.setAttribute("lineDistance",new an(a,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class fp extends Ws{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new te(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Nx=new Je,hp=new yp,Zc=new pl,Kc=new V;class Ox extends wn{constructor(t=new Rn,n=new fp){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,n){const a=this.geometry,l=this.matrixWorld,c=t.params.Points.threshold,f=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),Zc.copy(a.boundingSphere),Zc.applyMatrix4(l),Zc.radius+=c,t.ray.intersectsSphere(Zc)===!1)return;Nx.copy(l).invert(),hp.copy(t.ray).applyMatrix4(Nx);const d=c/((this.scale.x+this.scale.y+this.scale.z)/3),p=d*d,m=a.index,g=a.attributes.position;if(m!==null){const x=Math.max(0,f.start),M=Math.min(m.count,f.start+f.count);for(let y=x,T=M;y<T;y++){const S=m.getX(y);Kc.fromBufferAttribute(g,S),Px(Kc,S,p,l,t,n,this)}}else{const x=Math.max(0,f.start),M=Math.min(g.count,f.start+f.count);for(let y=x,T=M;y<T;y++)Kc.fromBufferAttribute(g,y),Px(Kc,y,p,l,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,a=Object.keys(n);if(a.length>0){const l=n[a[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=l.length;c<f;c++){const d=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=c}}}}}function Px(r,t,n,a,l,c,f){const d=hp.distanceSqToPoint(r);if(d<n){const p=new V;hp.closestPointToPoint(r,p),p.applyMatrix4(a);const m=l.ray.origin.distanceTo(p);if(m<l.near||m>l.far)return;c.push({distance:m,distanceToRay:Math.sqrt(d),point:p,index:t,face:null,faceIndex:null,barycoord:null,object:f})}}class Ze extends Rn{constructor(t=1,n=1,a=1,l=32,c=1,f=!1,d=0,p=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:a,radialSegments:l,heightSegments:c,openEnded:f,thetaStart:d,thetaLength:p};const m=this;l=Math.floor(l),c=Math.floor(c);const v=[],g=[],x=[],M=[];let y=0;const T=[],S=a/2;let _=0;L(),f===!1&&(t>0&&U(!0),n>0&&U(!1)),this.setIndex(v),this.setAttribute("position",new an(g,3)),this.setAttribute("normal",new an(x,3)),this.setAttribute("uv",new an(M,2));function L(){const R=new V,q=new V;let I=0;const N=(n-t)/a;for(let B=0;B<=c;B++){const C=[],b=B/c,H=b*(n-t)+t;for(let tt=0;tt<=l;tt++){const st=tt/l,ht=st*p+d,mt=Math.sin(ht),z=Math.cos(ht);q.x=H*mt,q.y=-b*a+S,q.z=H*z,g.push(q.x,q.y,q.z),R.set(mt,N,z).normalize(),x.push(R.x,R.y,R.z),M.push(st,1-b),C.push(y++)}T.push(C)}for(let B=0;B<l;B++)for(let C=0;C<c;C++){const b=T[C][B],H=T[C+1][B],tt=T[C+1][B+1],st=T[C][B+1];(t>0||C!==0)&&(v.push(b,H,st),I+=3),(n>0||C!==c-1)&&(v.push(H,tt,st),I+=3)}m.addGroup(_,I,0),_+=I}function U(R){const q=y,I=new ne,N=new V;let B=0;const C=R===!0?t:n,b=R===!0?1:-1;for(let tt=1;tt<=l;tt++)g.push(0,S*b,0),x.push(0,b,0),M.push(.5,.5),y++;const H=y;for(let tt=0;tt<=l;tt++){const ht=tt/l*p+d,mt=Math.cos(ht),z=Math.sin(ht);N.x=C*z,N.y=S*b,N.z=C*mt,g.push(N.x,N.y,N.z),x.push(0,b,0),I.x=mt*.5+.5,I.y=z*.5*b+.5,M.push(I.x,I.y),y++}for(let tt=0;tt<l;tt++){const st=q+tt,ht=H+tt;R===!0?v.push(ht,ht+1,st):v.push(ht+1,ht,st),B+=3}m.addGroup(_,B,R===!0?1:2),_+=B}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ze(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Wr extends Ze{constructor(t=1,n=1,a=32,l=1,c=!1,f=0,d=Math.PI*2){super(0,t,n,a,l,c,f,d),this.type="ConeGeometry",this.parameters={radius:t,height:n,radialSegments:a,heightSegments:l,openEnded:c,thetaStart:f,thetaLength:d}}static fromJSON(t){return new Wr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ml extends Rn{constructor(t=[],n=[],a=1,l=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:n,radius:a,detail:l};const c=[],f=[];d(l),m(a),v(),this.setAttribute("position",new an(c,3)),this.setAttribute("normal",new an(c.slice(),3)),this.setAttribute("uv",new an(f,2)),l===0?this.computeVertexNormals():this.normalizeNormals();function d(L){const U=new V,R=new V,q=new V;for(let I=0;I<n.length;I+=3)M(n[I+0],U),M(n[I+1],R),M(n[I+2],q),p(U,R,q,L)}function p(L,U,R,q){const I=q+1,N=[];for(let B=0;B<=I;B++){N[B]=[];const C=L.clone().lerp(R,B/I),b=U.clone().lerp(R,B/I),H=I-B;for(let tt=0;tt<=H;tt++)tt===0&&B===I?N[B][tt]=C:N[B][tt]=C.clone().lerp(b,tt/H)}for(let B=0;B<I;B++)for(let C=0;C<2*(I-B)-1;C++){const b=Math.floor(C/2);C%2===0?(x(N[B][b+1]),x(N[B+1][b]),x(N[B][b])):(x(N[B][b+1]),x(N[B+1][b+1]),x(N[B+1][b]))}}function m(L){const U=new V;for(let R=0;R<c.length;R+=3)U.x=c[R+0],U.y=c[R+1],U.z=c[R+2],U.normalize().multiplyScalar(L),c[R+0]=U.x,c[R+1]=U.y,c[R+2]=U.z}function v(){const L=new V;for(let U=0;U<c.length;U+=3){L.x=c[U+0],L.y=c[U+1],L.z=c[U+2];const R=S(L)/2/Math.PI+.5,q=_(L)/Math.PI+.5;f.push(R,1-q)}y(),g()}function g(){for(let L=0;L<f.length;L+=6){const U=f[L+0],R=f[L+2],q=f[L+4],I=Math.max(U,R,q),N=Math.min(U,R,q);I>.9&&N<.1&&(U<.2&&(f[L+0]+=1),R<.2&&(f[L+2]+=1),q<.2&&(f[L+4]+=1))}}function x(L){c.push(L.x,L.y,L.z)}function M(L,U){const R=L*3;U.x=t[R+0],U.y=t[R+1],U.z=t[R+2]}function y(){const L=new V,U=new V,R=new V,q=new V,I=new ne,N=new ne,B=new ne;for(let C=0,b=0;C<c.length;C+=9,b+=6){L.set(c[C+0],c[C+1],c[C+2]),U.set(c[C+3],c[C+4],c[C+5]),R.set(c[C+6],c[C+7],c[C+8]),I.set(f[b+0],f[b+1]),N.set(f[b+2],f[b+3]),B.set(f[b+4],f[b+5]),q.copy(L).add(U).add(R).divideScalar(3);const H=S(q);T(I,b+0,L,H),T(N,b+2,U,H),T(B,b+4,R,H)}}function T(L,U,R,q){q<0&&L.x===1&&(f[U]=L.x-1),R.x===0&&R.z===0&&(f[U]=q/2/Math.PI+.5)}function S(L){return Math.atan2(L.z,-L.x)}function _(L){return Math.atan2(-L.y,Math.sqrt(L.x*L.x+L.z*L.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ml(t.vertices,t.indices,t.radius,t.details)}}class vu extends ml{constructor(t=1,n=0){const a=(1+Math.sqrt(5))/2,l=1/a,c=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-l,-a,0,-l,a,0,l,-a,0,l,a,-l,-a,0,-l,a,0,l,-a,0,l,a,0,-a,0,-l,a,0,-l,-a,0,l,a,0,l],f=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(c,f,t,n),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new vu(t.radius,t.detail)}}const Qc=new V,Jc=new V,vd=new V,$c=new Ui;class tu extends Rn{constructor(t=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:n},t!==null){const l=Math.pow(10,4),c=Math.cos(uu*n),f=t.getIndex(),d=t.getAttribute("position"),p=f?f.count:d.count,m=[0,0,0],v=["a","b","c"],g=new Array(3),x={},M=[];for(let y=0;y<p;y+=3){f?(m[0]=f.getX(y),m[1]=f.getX(y+1),m[2]=f.getX(y+2)):(m[0]=y,m[1]=y+1,m[2]=y+2);const{a:T,b:S,c:_}=$c;if(T.fromBufferAttribute(d,m[0]),S.fromBufferAttribute(d,m[1]),_.fromBufferAttribute(d,m[2]),$c.getNormal(vd),g[0]=`${Math.round(T.x*l)},${Math.round(T.y*l)},${Math.round(T.z*l)}`,g[1]=`${Math.round(S.x*l)},${Math.round(S.y*l)},${Math.round(S.z*l)}`,g[2]=`${Math.round(_.x*l)},${Math.round(_.y*l)},${Math.round(_.z*l)}`,!(g[0]===g[1]||g[1]===g[2]||g[2]===g[0]))for(let L=0;L<3;L++){const U=(L+1)%3,R=g[L],q=g[U],I=$c[v[L]],N=$c[v[U]],B=`${R}_${q}`,C=`${q}_${R}`;C in x&&x[C]?(vd.dot(x[C].normal)<=c&&(M.push(I.x,I.y,I.z),M.push(N.x,N.y,N.z)),x[C]=null):B in x||(x[B]={index0:m[L],index1:m[U],normal:vd.clone()})}}for(const y in x)if(x[y]){const{index0:T,index1:S}=x[y];Qc.fromBufferAttribute(d,T),Jc.fromBufferAttribute(d,S),M.push(Qc.x,Qc.y,Qc.z),M.push(Jc.x,Jc.y,Jc.z)}this.setAttribute("position",new an(M,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Ap extends ml{constructor(t=1,n=0){const a=(1+Math.sqrt(5))/2,l=[-1,a,0,1,a,0,-1,-a,0,1,-a,0,0,-1,a,0,1,a,0,-1,-a,0,1,-a,a,0,-1,a,0,1,-a,0,-1,-a,0,1],c=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(l,c,t,n),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new Ap(t.radius,t.detail)}}class xu extends ml{constructor(t=1,n=0){const a=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],l=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(a,l,t,n),this.type="OctahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new xu(t.radius,t.detail)}}class nn extends Rn{constructor(t=1,n=32,a=16,l=0,c=Math.PI*2,f=0,d=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:a,phiStart:l,phiLength:c,thetaStart:f,thetaLength:d},n=Math.max(3,Math.floor(n)),a=Math.max(2,Math.floor(a));const p=Math.min(f+d,Math.PI);let m=0;const v=[],g=new V,x=new V,M=[],y=[],T=[],S=[];for(let _=0;_<=a;_++){const L=[],U=_/a;let R=0;_===0&&f===0?R=.5/n:_===a&&p===Math.PI&&(R=-.5/n);for(let q=0;q<=n;q++){const I=q/n;g.x=-t*Math.cos(l+I*c)*Math.sin(f+U*d),g.y=t*Math.cos(f+U*d),g.z=t*Math.sin(l+I*c)*Math.sin(f+U*d),y.push(g.x,g.y,g.z),x.copy(g).normalize(),T.push(x.x,x.y,x.z),S.push(I+R,1-U),L.push(m++)}v.push(L)}for(let _=0;_<a;_++)for(let L=0;L<n;L++){const U=v[_][L+1],R=v[_][L],q=v[_+1][L],I=v[_+1][L+1];(_!==0||f>0)&&M.push(U,R,I),(_!==a-1||p<Math.PI)&&M.push(R,q,I)}this.setIndex(M),this.setAttribute("position",new an(y,3)),this.setAttribute("normal",new an(T,3)),this.setAttribute("uv",new an(S,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class wp extends Rn{constructor(t=1,n=.4,a=12,l=48,c=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:n,radialSegments:a,tubularSegments:l,arc:c},a=Math.floor(a),l=Math.floor(l);const f=[],d=[],p=[],m=[],v=new V,g=new V,x=new V;for(let M=0;M<=a;M++)for(let y=0;y<=l;y++){const T=y/l*c,S=M/a*Math.PI*2;g.x=(t+n*Math.cos(S))*Math.cos(T),g.y=(t+n*Math.cos(S))*Math.sin(T),g.z=n*Math.sin(S),d.push(g.x,g.y,g.z),v.x=t*Math.cos(T),v.y=t*Math.sin(T),x.subVectors(g,v).normalize(),p.push(x.x,x.y,x.z),m.push(y/l),m.push(M/a)}for(let M=1;M<=a;M++)for(let y=1;y<=l;y++){const T=(l+1)*M+y-1,S=(l+1)*(M-1)+y-1,_=(l+1)*(M-1)+y,L=(l+1)*M+y;f.push(T,S,L),f.push(S,_,L)}this.setIndex(f),this.setAttribute("position",new an(d,3)),this.setAttribute("normal",new an(p,3)),this.setAttribute("uv",new an(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wp(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class w2 extends An{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class zn extends Ws{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new te(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=S_,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ji,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Rp extends wn{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new te(t),this.intensity=n}dispose(){}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}const xd=new Je,zx=new V,Bx=new V;class H_{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ne(512,512),this.map=null,this.mapPass=null,this.matrix=new Je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ep,this._frameExtents=new ne(1,1),this._viewportCount=1,this._viewports=[new je(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const n=this.camera,a=this.matrix;zx.setFromMatrixPosition(t.matrixWorld),n.position.copy(zx),Bx.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(Bx),n.updateMatrixWorld(),xd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xd),a.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),a.multiply(xd)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Ix=new Je,rl=new V,_d=new V;class R2 extends H_{constructor(){super(new pi(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ne(4,2),this._viewportCount=6,this._viewports=[new je(2,1,1,1),new je(0,1,1,1),new je(3,1,1,1),new je(1,1,1,1),new je(3,0,1,1),new je(1,0,1,1)],this._cubeDirections=[new V(1,0,0),new V(-1,0,0),new V(0,0,1),new V(0,0,-1),new V(0,1,0),new V(0,-1,0)],this._cubeUps=[new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,1,0),new V(0,0,1),new V(0,0,-1)]}updateMatrices(t,n=0){const a=this.camera,l=this.matrix,c=t.distance||a.far;c!==a.far&&(a.far=c,a.updateProjectionMatrix()),rl.setFromMatrixPosition(t.matrixWorld),a.position.copy(rl),_d.copy(a.position),_d.add(this._cubeDirections[n]),a.up.copy(this._cubeUps[n]),a.lookAt(_d),a.updateMatrixWorld(),l.makeTranslation(-rl.x,-rl.y,-rl.z),Ix.multiplyMatrices(a.projectionMatrix,a.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ix)}}class Fx extends Rp{constructor(t,n,a=0,l=2){super(t,n),this.isPointLight=!0,this.type="PointLight",this.distance=a,this.decay=l,this.shadow=new R2}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,n){return super.copy(t,n),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class C2 extends H_{constructor(){super(new Tp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class D2 extends Rp{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wn.DEFAULT_UP),this.updateMatrix(),this.target=new wn,this.shadow=new C2}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class L2 extends Rp{constructor(t,n){super(t,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class G_{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Hx(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=Hx();t=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=t}return t}}function Hx(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:mp}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=mp);const V_={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class qs{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const U2=new Tp(-1,1,1,-1,0,1);class N2 extends Rn{constructor(){super(),this.setAttribute("position",new an([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new an([0,2,0,0,2,0],2))}}const O2=new N2;class Eu{constructor(t){this._mesh=new $t(O2,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,U2)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class P2 extends qs{constructor(t,n){super(),this.textureID=n!==void 0?n:"tDiffuse",t instanceof An?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=fs.clone(t.uniforms),this.material=new An({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Eu(this.material)}render(t,n,a){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=a.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Gx extends qs{constructor(t,n){super(),this.scene=t,this.camera=n,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,n,a){const l=t.getContext(),c=t.state;c.buffers.color.setMask(!1),c.buffers.depth.setMask(!1),c.buffers.color.setLocked(!0),c.buffers.depth.setLocked(!0);let f,d;this.inverse?(f=0,d=1):(f=1,d=0),c.buffers.stencil.setTest(!0),c.buffers.stencil.setOp(l.REPLACE,l.REPLACE,l.REPLACE),c.buffers.stencil.setFunc(l.ALWAYS,f,4294967295),c.buffers.stencil.setClear(d),c.buffers.stencil.setLocked(!0),t.setRenderTarget(a),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),c.buffers.color.setLocked(!1),c.buffers.depth.setLocked(!1),c.buffers.color.setMask(!0),c.buffers.depth.setMask(!0),c.buffers.stencil.setLocked(!1),c.buffers.stencil.setFunc(l.EQUAL,1,4294967295),c.buffers.stencil.setOp(l.KEEP,l.KEEP,l.KEEP),c.buffers.stencil.setLocked(!0)}}class z2 extends qs{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class B2{constructor(t,n){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),n===void 0){const a=t.getSize(new ne);this._width=a.width,this._height=a.height,n=new gi(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Xi}),n.texture.name="EffectComposer.rt1"}else this._width=n.width,this._height=n.height;this.renderTarget1=n,this.renderTarget2=n.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new P2(V_),this.copyPass.material.blending=Ra,this.clock=new G_}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,n){this.passes.splice(n,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const n=this.passes.indexOf(t);n!==-1&&this.passes.splice(n,1)}isLastEnabledPass(t){for(let n=t+1;n<this.passes.length;n++)if(this.passes[n].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const n=this.renderer.getRenderTarget();let a=!1;for(let l=0,c=this.passes.length;l<c;l++){const f=this.passes[l];if(f.enabled!==!1){if(f.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(l),f.render(this.renderer,this.writeBuffer,this.readBuffer,t,a),f.needsSwap){if(a){const d=this.renderer.getContext(),p=this.renderer.state.buffers.stencil;p.setFunc(d.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),p.setFunc(d.EQUAL,1,4294967295)}this.swapBuffers()}Gx!==void 0&&(f instanceof Gx?a=!0:f instanceof z2&&(a=!1))}}this.renderer.setRenderTarget(n)}reset(t){if(t===void 0){const n=this.renderer.getSize(new ne);this._pixelRatio=this.renderer.getPixelRatio(),this._width=n.width,this._height=n.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,n){this._width=t,this._height=n;const a=this._width*this._pixelRatio,l=this._height*this._pixelRatio;this.renderTarget1.setSize(a,l),this.renderTarget2.setSize(a,l);for(let c=0;c<this.passes.length;c++)this.passes[c].setSize(a,l)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class I2 extends qs{constructor(t,n,a=null,l=null,c=null){super(),this.scene=t,this.camera=n,this.overrideMaterial=a,this.clearColor=l,this.clearAlpha=c,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new te}render(t,n,a){const l=t.autoClear;t.autoClear=!1;let c,f;this.overrideMaterial!==null&&(f=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(c=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:a),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(c),this.overrideMaterial!==null&&(this.scene.overrideMaterial=f),t.autoClear=l}}const F2={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new te(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class no extends qs{constructor(t,n,a,l){super(),this.strength=n!==void 0?n:1,this.radius=a,this.threshold=l,this.resolution=t!==void 0?new ne(t.x,t.y):new ne(256,256),this.clearColor=new te(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let c=Math.round(this.resolution.x/2),f=Math.round(this.resolution.y/2);this.renderTargetBright=new gi(c,f,{type:Xi}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let g=0;g<this.nMips;g++){const x=new gi(c,f,{type:Xi});x.texture.name="UnrealBloomPass.h"+g,x.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(x);const M=new gi(c,f,{type:Xi});M.texture.name="UnrealBloomPass.v"+g,M.texture.generateMipmaps=!1,this.renderTargetsVertical.push(M),c=Math.round(c/2),f=Math.round(f/2)}const d=F2;this.highPassUniforms=fs.clone(d.uniforms),this.highPassUniforms.luminosityThreshold.value=l,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new An({uniforms:this.highPassUniforms,vertexShader:d.vertexShader,fragmentShader:d.fragmentShader}),this.separableBlurMaterials=[];const p=[3,5,7,9,11];c=Math.round(this.resolution.x/2),f=Math.round(this.resolution.y/2);for(let g=0;g<this.nMips;g++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(p[g])),this.separableBlurMaterials[g].uniforms.invSize.value=new ne(1/c,1/f),c=Math.round(c/2),f=Math.round(f/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=n,this.compositeMaterial.uniforms.bloomRadius.value=.1;const m=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=m,this.bloomTintColors=[new V(1,1,1),new V(1,1,1),new V(1,1,1),new V(1,1,1),new V(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const v=V_;this.copyUniforms=fs.clone(v.uniforms),this.blendMaterial=new An({uniforms:this.copyUniforms,vertexShader:v.vertexShader,fragmentShader:v.fragmentShader,blending:jr,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new te,this.oldClearAlpha=1,this.basic=new Ta,this.fsQuad=new Eu(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,n){let a=Math.round(t/2),l=Math.round(n/2);this.renderTargetBright.setSize(a,l);for(let c=0;c<this.nMips;c++)this.renderTargetsHorizontal[c].setSize(a,l),this.renderTargetsVertical[c].setSize(a,l),this.separableBlurMaterials[c].uniforms.invSize.value=new ne(1/a,1/l),a=Math.round(a/2),l=Math.round(l/2)}render(t,n,a,l,c){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const f=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),c&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=a.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=a.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let d=this.renderTargetBright;for(let p=0;p<this.nMips;p++)this.fsQuad.material=this.separableBlurMaterials[p],this.separableBlurMaterials[p].uniforms.colorTexture.value=d.texture,this.separableBlurMaterials[p].uniforms.direction.value=no.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[p]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[p].uniforms.colorTexture.value=this.renderTargetsHorizontal[p].texture,this.separableBlurMaterials[p].uniforms.direction.value=no.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[p]),t.clear(),this.fsQuad.render(t),d=this.renderTargetsVertical[p];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,c&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(a),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=f}getSeperableBlurMaterial(t){const n=[];for(let a=0;a<t;a++)n.push(.39894*Math.exp(-.5*a*a/(t*t))/t);return new An({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new ne(.5,.5)},direction:{value:new ne(.5,.5)},gaussianCoefficients:{value:n}},vertexShader:`varying vec2 vUv;
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
				}`})}}no.BlurDirectionX=new ne(1,0);no.BlurDirectionY=new ne(0,1);const eu={defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new ne(1/1024,1/512)}},vertexShader:`

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

		}`},nu={defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new ne(1/1024,1/512)}},vertexShader:`

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

		}`},Md={uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new ne(1/1024,1/512)}},vertexShader:`

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

		}`};class H2 extends qs{constructor(t,n){super(),this.edgesRT=new gi(t,n,{depthBuffer:!1,type:Xi}),this.edgesRT.texture.name="SMAAPass.edges",this.weightsRT=new gi(t,n,{depthBuffer:!1,type:Xi}),this.weightsRT.texture.name="SMAAPass.weights";const a=this,l=new Image;l.src=this.getAreaTexture(),l.onload=function(){a.areaTexture.needsUpdate=!0},this.areaTexture=new kn,this.areaTexture.name="SMAAPass.area",this.areaTexture.image=l,this.areaTexture.minFilter=Vi,this.areaTexture.generateMipmaps=!1,this.areaTexture.flipY=!1;const c=new Image;c.src=this.getSearchTexture(),c.onload=function(){a.searchTexture.needsUpdate=!0},this.searchTexture=new kn,this.searchTexture.name="SMAAPass.search",this.searchTexture.image=c,this.searchTexture.magFilter=mi,this.searchTexture.minFilter=mi,this.searchTexture.generateMipmaps=!1,this.searchTexture.flipY=!1,this.uniformsEdges=fs.clone(eu.uniforms),this.uniformsEdges.resolution.value.set(1/t,1/n),this.materialEdges=new An({defines:Object.assign({},eu.defines),uniforms:this.uniformsEdges,vertexShader:eu.vertexShader,fragmentShader:eu.fragmentShader}),this.uniformsWeights=fs.clone(nu.uniforms),this.uniformsWeights.resolution.value.set(1/t,1/n),this.uniformsWeights.tDiffuse.value=this.edgesRT.texture,this.uniformsWeights.tArea.value=this.areaTexture,this.uniformsWeights.tSearch.value=this.searchTexture,this.materialWeights=new An({defines:Object.assign({},nu.defines),uniforms:this.uniformsWeights,vertexShader:nu.vertexShader,fragmentShader:nu.fragmentShader}),this.uniformsBlend=fs.clone(Md.uniforms),this.uniformsBlend.resolution.value.set(1/t,1/n),this.uniformsBlend.tDiffuse.value=this.weightsRT.texture,this.materialBlend=new An({uniforms:this.uniformsBlend,vertexShader:Md.vertexShader,fragmentShader:Md.fragmentShader}),this.fsQuad=new Eu(null)}render(t,n,a){this.uniformsEdges.tDiffuse.value=a.texture,this.fsQuad.material=this.materialEdges,t.setRenderTarget(this.edgesRT),this.clear&&t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.materialWeights,t.setRenderTarget(this.weightsRT),this.clear&&t.clear(),this.fsQuad.render(t),this.uniformsBlend.tColor.value=a.texture,this.fsQuad.material=this.materialBlend,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.clear&&t.clear(),this.fsQuad.render(t))}setSize(t,n){this.edgesRT.setSize(t,n),this.weightsRT.setSize(t,n),this.materialEdges.uniforms.resolution.value.set(1/t,1/n),this.materialWeights.uniforms.resolution.value.set(1/t,1/n),this.materialBlend.uniforms.resolution.value.set(1/t,1/n)}getAreaTexture(){return"data:image/png;base64,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"}getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}dispose(){this.edgesRT.dispose(),this.weightsRT.dispose(),this.areaTexture.dispose(),this.searchTexture.dispose(),this.materialEdges.dispose(),this.materialWeights.dispose(),this.materialBlend.dispose(),this.fsQuad.dispose()}}const G2={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class V2 extends qs{constructor(){super();const t=G2;this.uniforms=fs.clone(t.uniforms),this.material=new w2({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Eu(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,n,a){this.uniforms.tDiffuse.value=a.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Re.getTransfer(this._outputColorSpace)===He&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===a_?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===s_?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===r_?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===o_?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===l_?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===c_&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const k2=.75,X2=.6,W2=.85;class q2{constructor(t,n,a,l,c){Pt(this,"composer");Pt(this,"bloomPass");Pt(this,"smaaPass");Pt(this,"outputPass");this.composer=new B2(t),this.composer.addPass(new I2(n,a)),this.bloomPass=new no(new ne(l,c),k2,X2,W2),this.composer.addPass(this.bloomPass),this.smaaPass=new H2(l,c),this.composer.addPass(this.smaaPass),this.outputPass=new V2,this.composer.addPass(this.outputPass),this.composer.setSize(l,c)}setSize(t,n){this.composer.setSize(t,n)}render(t){this.composer.render(t)}dispose(){this.composer.dispose(),this.bloomPass.dispose(),this.smaaPass.dispose(),this.outputPass.dispose()}}class j2{constructor(t,n,a){Pt(this,"scene");Pt(this,"renderer");Pt(this,"camera");Pt(this,"playerMeshes",new Map);Pt(this,"enemyMeshes",new Map);Pt(this,"projectileMeshes",new Map);Pt(this,"particleMeshes",new Map);Pt(this,"bossMeshes",new Map);Pt(this,"lockIndicators",new Map);Pt(this,"ambientLight");Pt(this,"dirLight");Pt(this,"pointLight");Pt(this,"clock");Pt(this,"postFX");this.scene=new A2,this.scene.background=new te(328975),this.renderer=new b2({canvas:t,antialias:!0,alpha:!1}),this.renderer.setSize(n,a),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.camera=new pi(60,n/a,.1,2e3),this.camera.position.set(0,wv,Fh),this.clock=new G_,this.postFX=new q2(this.renderer,this.scene,this.camera,n,a),this.ambientLight=new L2(3359846,.9),this.scene.add(this.ambientLight),this.dirLight=new D2(16777215,1.5),this.dirLight.position.set(50,100,50),this.scene.add(this.dirLight),this.pointLight=new Fx(4491519,2,50),this.pointLight.position.set(0,10,0),this.scene.add(this.pointLight);const l=new Rn,c=6e3,f=new Float32Array(c*3),d=new Float32Array(c*3),p=[new te(16777215),new te(11193599),new te(16768426)];for(let _=0;_<c;_++){f[_*3]=(Math.random()-.5)*1e3,f[_*3+1]=Math.random()*600-200,f[_*3+2]=(Math.random()-.5)*1e3;const L=p[Math.floor(Math.random()*p.length)];d[_*3]=L.r,d[_*3+1]=L.g,d[_*3+2]=L.b}l.setAttribute("position",new qn(f,3)),l.setAttribute("color",new qn(d,3));const m=new fp({size:1,vertexColors:!0,transparent:!0}),v=new Ox(l,m);this.scene.add(v);const g=new $t(new nn(90,24,24),new zn({color:2776023,roughness:1,metalness:0}));g.position.set(-320,120,-650),this.scene.add(g);const x=new $t(new nn(92,24,24),new Ta({color:16777215,transparent:!0,opacity:.25}));x.position.copy(g.position),this.scene.add(x);const M=new $t(new nn(97,24,24),new Ta({color:8961023,transparent:!0,opacity:.12,blending:jr,depthWrite:!1}));M.position.copy(g.position),this.scene.add(M);const y=new $t(new nn(55,16,16),new Ta({color:16755268}));y.position.set(520,320,-900),this.scene.add(y);const T=new $t(new nn(80,16,16),new Ta({color:16746547,transparent:!0,opacity:.35,blending:jr,depthWrite:!1}));T.position.copy(y.position),this.scene.add(T);const S=new Fx(16755302,1200,2500);S.position.copy(y.position),this.scene.add(S)}updateCamera(t,n,a,l=null){const c=new V(t.x-Math.sin(a)*Fh,t.y+wv,t.z-Math.cos(a)*Fh),f=1-Math.exp(-8*n);this.camera.position.lerp(c,f);let d=t.x,p=t.y,m=t.z;if(l){const v=l.x-t.x,g=l.y-t.y,x=l.z-t.z,M=Math.sqrt(v*v+g*g+x*x);if(M>.001){const y=My*Math.max(0,1-M/au);d=t.x+v*y,p=t.y+g*y,m=t.z+x*y}}this.camera.lookAt(d,p,m)}resize(t,n){this.renderer.setSize(t,n),this.camera.aspect=t/n,this.camera.updateProjectionMatrix(),this.postFX.setSize(t,n)}render(){this.postFX.render()}addPart(t,n,a,l,c,f=10066346,d=15){const p=new $t(n,a);p.position.set(l[0],l[1],l[2]),c&&p.rotation.set(c[0],c[1],c[2]),p.castShadow=!0,t.add(p);const m=new tu(n,d),v=new Vr({color:f,transparent:!0,opacity:.4}),g=new Yc(m,v);return g.position.copy(p.position),c&&g.rotation.set(c[0],c[1],c[2]),t.add(g),p}createPlayerMesh(t=new te(4491519)){const n=new ks,a=new zn({color:16054010,metalness:.5,roughness:.3}),l=new zn({color:14212324,metalness:.8,roughness:.2}),c=new zn({color:t,metalness:.6,roughness:.3}),f=new zn({color:t.clone().multiplyScalar(.6),metalness:.7,roughness:.3}),d=new zn({color:16777215,emissive:t,emissiveIntensity:1,metalness:.3,roughness:.1}),p=new zn({color:12106950,metalness:.9,roughness:.2}),m=new zn({color:13620186,metalness:.3,roughness:.8}),v=(y,T,S)=>{const _=new tu(y,25),L=new Yc(_,new Vr({color:6710920,transparent:!0,opacity:.25}));L.position.set(T[0],T[1],T[2]),n.add(L)};this.addPart(n,new pe(1.8,1,1.4),a,[0,.5,0]),v(new pe(1.8,1,1.4),[0,.5,0]),this.addPart(n,new pe(1.6,.7,.4),c,[0,.6,.75]),this.addPart(n,new pe(1.2,.5,.2),f,[0,.6,.95]),this.addPart(n,new nn(.25,8,8),d,[0,.5,.9]);for(let y=-1;y<=1;y+=2)this.addPart(n,new pe(.15,.3,.5),m,[y*.95,.4,.4]);this.addPart(n,new Ze(.8,1,.4,6),l,[0,0,0]),this.addPart(n,new pe(.7,.5,.7,2,2,2),a,[0,1.3,0]),v(new pe(.7,.5,.7,2,2,2),[0,1.3,0]),this.addPart(n,new pe(.6,.1,.1),d,[0,1.3,.4]),this.addPart(n,new pe(.1,.18,.1),d,[0,1.2,.4]),this.addPart(n,new pe(.08,.25,.3),c,[0,1.6,0]),this.addPart(n,new pe(.5,.15,.1),l,[0,1.1,.35]);for(let y=-1;y<=1;y+=2)this.addPart(n,new pe(.8,.3,.6,2,2,2),a,[y*1.3,.9,0]),v(new pe(.8,.3,.6,2,2,2),[y*1.3,.9,0]),this.addPart(n,new pe(.6,.15,.4),c,[y*1.3,1,0]),this.addPart(n,new nn(.2,6,6),p,[y*1.1,.7,0]);for(let y=-1;y<=1;y+=2)this.addPart(n,new Ze(.2,.25,.7,6),a,[y*1.2,.3,0]),this.addPart(n,new Ze(.15,.18,.55,6),c,[y*1.2,.3,.15]),this.addPart(n,new nn(.14,6,6),p,[y*1.2,-.1,0]),this.addPart(n,new Ze(.16,.14,.5,6),a,[y*1.2,-.45,0]),this.addPart(n,new pe(.2,.3,.15),c,[y*1.2,-.45,.2]),this.addPart(n,new nn(.1,6,6),p,[y*1.2,-.7,0]),y>0&&(this.addPart(n,new Ze(.08,.1,.8,6),l,[y*1.35,-.3,.6],[0,0,Math.PI/2]),this.addPart(n,new Ze(.05,.06,1,6),l,[y*1.35,-.3,1],[0,0,Math.PI/2]),this.addPart(n,new Ze(.07,.09,.1,6),c,[y*1.35,-.3,1.1],[0,0,Math.PI/2]),this.addPart(n,new pe(.2,.12,.3),c,[y*1.35,-.3,.3]));for(let y=-1;y<=1;y+=2)this.addPart(n,new Ze(.3,.35,.7,6),a,[y*.5,-.4,0]),v(new Ze(.3,.35,.7,6),[y*.5,-.4,0]),this.addPart(n,new pe(.3,.4,.4),c,[y*.5,-.3,.25]),this.addPart(n,new nn(.2,6,6),p,[y*.5,-.8,0]),this.addPart(n,new nn(.18,6,6),c,[y*.5,-.8,.15]),this.addPart(n,new Ze(.25,.2,.6,6),a,[y*.5,-1.2,0]),this.addPart(n,new pe(.25,.4,.3),c,[y*.5,-1.2,.2]),this.addPart(n,new nn(.15,6,6),p,[y*.5,-1.55,0]),this.addPart(n,new pe(.4,.12,.5),a,[y*.5,-1.65,.1]),v(new pe(.4,.12,.5),[y*.5,-1.65,.1]),this.addPart(n,new pe(.3,.06,.15),c,[y*.5,-1.7,.35]);this.addPart(n,new pe(1,.6,.4),l,[0,.5,-.95]),this.addPart(n,new Ze(.35,.4,.4,8),l,[0,.4,-1.2]);for(let y=-1;y<=1;y+=2)this.addPart(n,new Ze(.2,.25,.35,6),l,[y*.45,.4,-1.15]);for(let y=-1;y<=1;y+=2)this.addPart(n,new Ze(.15,.18,.25,6),l,[y*.35,.85,-.95]);const g=new Ze(.3,.1,.15,8),x=new Ta({color:t,transparent:!0,opacity:.5}),M=new $t(g,x);M.position.set(0,.3,-1.4),n.add(M);for(let y=-1;y<=1;y+=2){const T=new $t(new Ze(.18,.06,.1,6),x);T.position.set(y*.45,.3,-1.35),n.add(T)}this.addPart(n,new pe(.7,.2,.15),c,[0,-.1,.55]);for(let y=-1;y<=1;y+=2)this.addPart(n,new pe(.15,.2,.4),c,[y*.65,-.1,.2]);return n}createEnemyMesh(t,n,a){const l=new ks,c=new zn({color:t,metalness:.6,roughness:.3}),f=new zn({color:4473958,metalness:.7,roughness:.3}),d=new zn({color:16777215,emissive:t,emissiveIntensity:.6}),p=new zn({color:t,emissive:t,emissiveIntensity:.4,metalness:.5,roughness:.3}),m=(v,g,x)=>{const M=new tu(v,20),y=new Yc(M,new Vr({color:0,transparent:!0,opacity:.15}));y.position.set(g[0],g[1],g[2]),l.add(y)};switch(a){case"scout":{const v=new $t(new xu(n*.7,1),c);v.castShadow=!0,l.add(v);const g=new $t(new nn(n*.2,6,6),d);l.add(g);for(let M=0;M<4;M++){const y=M/4*Math.PI*2,T=new $t(new Wr(n*.08,n*.5,4),p);T.position.set(Math.cos(y)*n*.6,0,Math.sin(y)*n*.6),T.rotation.z=Math.PI/2,T.rotation.y=-y,l.add(T)}const x=new $t(new Ze(.02,.03,n*.4),f);x.position.set(0,n*.5,0),l.add(x);break}case"assault":{const v=new $t(new pe(n*1,n*.8,n*.7),c);v.castShadow=!0,l.add(v),m(new pe(n*1,n*.8,n*.7),[0,0,0]);const g=new $t(new pe(n*.7,n*.4,n*.2),p);g.position.set(0,0,n*.45),l.add(g);const x=new $t(new pe(n*.3,n*.25,n*.3),f);x.position.set(0,n*.55,0),l.add(x);const M=new $t(new pe(n*.25,n*.06,.05),d);M.position.set(0,n*.55,n*.17),l.add(M);for(let y=-1;y<=1;y+=2){const T=new $t(new Ze(n*.08,n*.1,n*.4,6),f);T.position.set(y*n*.6,n*.1,n*.3),T.rotation.x=Math.PI/2,l.add(T)}break}case"sniper":{const v=new $t(new Ze(n*.2,n*.3,n*1,6),c);v.castShadow=!0,l.add(v),m(new Ze(n*.2,n*.3,n*1,6),[0,0,0]);const g=new $t(new Ze(n*.06,n*.06,n*.15,6),f);g.position.set(0,n*.6,0),l.add(g);const x=new $t(new nn(n*.08,6,6),d);x.position.set(0,n*.68,0),l.add(x);const M=new $t(new Ze(n*.04,n*.06,n*1.2,6),f);M.position.set(0,0,n*.7),M.rotation.x=Math.PI/2,l.add(M);for(let y=-1;y<=1;y+=2){const T=new $t(new Ze(n*.04,n*.06,n*.3,4),f);T.position.set(y*n*.2,-n*.55,0),l.add(T)}break}case"shield":{const v=new $t(new pe(n*1.2,n*.6,n*.5,2,2,2),c);v.castShadow=!0,l.add(v),m(new pe(n*1.2,n*.6,n*.5,2,2,2),[0,0,0]);const g=new $t(new pe(n*1.1,n*.8,n*.15),p);g.position.set(0,0,n*.35),l.add(g);const x=new tu(new pe(n*1.1,n*.8,n*.15),15),M=new Yc(x,new Vr({color:16777215,transparent:!0,opacity:.3}));M.position.set(0,0,n*.35),l.add(M);const y=new $t(new nn(n*.15,6,6),d);y.position.set(0,0,n*.45),l.add(y);for(let T=-1;T<=1;T+=2){const S=new $t(new Ze(n*.1,n*.15,n*.2,6),f);S.position.set(T*n*.4,0,-n*.3),l.add(S)}break}case"bomber":{const v=new $t(new nn(n*.6,8,8),c);v.castShadow=!0,l.add(v);for(let x=0;x<8;x++){const M=x/8*Math.PI*2,y=Math.PI*.5,T=new $t(new Wr(n*.06,n*.35,4),p);T.position.set(Math.cos(M)*Math.sin(y)*n*.6,Math.cos(y)*n*.6,Math.sin(M)*Math.sin(y)*n*.6),T.quaternion.setFromUnitVectors(new V(0,1,0),new V(Math.cos(M)*Math.sin(y),Math.cos(y),Math.sin(M)*Math.sin(y))),l.add(T)}const g=new $t(new nn(n*.2,6,6),new zn({color:16711680,emissive:16711680,emissiveIntensity:1}));g.position.set(0,0,0),l.add(g);break}case"commander":{const v=new $t(new vu(n*.6),c);v.castShadow=!0,l.add(v);const g=new $t(new Wr(n*.1,n*.5,4),p);g.position.set(0,n*.6,0),l.add(g);for(let y=-1;y<=1;y+=2){const T=new $t(new nn(n*.25,6,6),f);T.position.set(y*n*.55,n*.2,0),l.add(T)}const x=new $t(new nn(n*.15,6,6),d);l.add(x);const M=new $t(new pe(n*.4,n*.3,n*.2),f);M.position.set(0,0,-n*.4),l.add(M);break}default:{const v=new $t(new xu(n*.8),c);v.castShadow=!0,l.add(v);const g=new $t(new nn(n*.3,6,6),d);l.add(g);break}}return l}createBossMesh(t=new te(16729156),n=4){const a=new ks,l=new $t(new vu(n),new zn({color:t,emissive:t,emissiveIntensity:.3,metalness:.7,roughness:.3}));l.castShadow=!0,a.add(l);const c=new $t(new Ap(n*.4),new zn({color:16777215,emissive:16746496,emissiveIntensity:1,transparent:!0,opacity:.8}));a.add(c);const f=new $t(new wp(n*1.2,.1,8,24),new zn({color:16755200,emissive:16729088,emissiveIntensity:.5}));f.rotation.x=Math.PI/2,a.add(f);for(let d=0;d<6;d++){const p=new $t(new Ze(.3,.4,.8,6),new zn({color:8947848,metalness:.8,roughness:.2})),m=d/6*Math.PI*2;p.position.set(Math.cos(m)*n*1.1,0,Math.sin(m)*n*1.1),p.rotation.z=Math.PI/2,p.rotation.y=-m,a.add(p)}return a}createProjectileMesh(t,n){const a=new te(t);let l;switch(n){case"beam":case"sniper":l=new nn(.3,6,6);break;case"missile":l=new Wr(.2,.6,6);break;default:l=new nn(.15,4,4)}const c=new Ta({color:a});return new $t(l,c)}createExplosion(t,n,a=1){const c=new Float32Array(90),f=new Float32Array(90),d=new te(n);for(let M=0;M<30;M++){const y=Math.random()*Math.PI*2,T=Math.random()*Math.PI,S=a*(.5+Math.random()*.5);c[M*3]=t.x+S*Math.sin(T)*Math.cos(y),c[M*3+1]=t.y+S*Math.cos(T),c[M*3+2]=t.z+S*Math.sin(T)*Math.sin(y),f[M*3]=d.r,f[M*3+1]=d.g,f[M*3+2]=d.b}const p=new Rn;p.setAttribute("position",new qn(c,3)),p.setAttribute("color",new qn(f,3));const m=new fp({size:.5,vertexColors:!0,transparent:!0,opacity:1,blending:jr,depthWrite:!1}),v=new Ox(p,m);this.scene.add(v);let g=1;const x=()=>{if(g-=.02,g<=0){this.scene.remove(v),p.dispose(),m.dispose();return}m.opacity=g;const M=p.attributes.position,y=M.array;for(let T=0;T<30;T++)y[T*3]+=(Math.random()-.5)*.5,y[T*3+1]+=(Math.random()-.5)*.5,y[T*3+2]+=(Math.random()-.5)*.5;M.needsUpdate=!0,requestAnimationFrame(x)};x()}updateLockIndicator(t,n,a,l="#00ff88"){const c=this.lockIndicators.get(t);if(!a){c&&(this.scene.remove(c),this.lockIndicators.delete(t));return}if(c){const f=c.geometry.attributes.position,d=f.array;d[0]=n.x,d[1]=n.y,d[2]=n.z,d[3]=a.x,d[4]=a.y,d[5]=a.z,f.needsUpdate=!0;const p=c.material;p.color.getStyle()!==l&&p.color.set(l)}else{const f=new Rn,d=new Float32Array([n.x,n.y,n.z,a.x,a.y,a.z]);f.setAttribute("position",new qn(d,3));const p=new Vr({color:l,transparent:!0,opacity:.5,linewidth:1}),m=new F_(f,p);this.scene.add(m),this.lockIndicators.set(t,m)}}dispose(){this.postFX.dispose(),this.renderer.dispose()}}class Y2{constructor(t){Pt(this,"keys",new Set);Pt(this,"mouseNormX",.5);Pt(this,"mouseNormY",.5);Pt(this,"aimNormX",.5);Pt(this,"aimNormY",.5);Pt(this,"mouseDown",!1);Pt(this,"_weaponSwitch",0);Pt(this,"_dodge",!1);Pt(this,"_special",!1);Pt(this,"_lockToggle",!1);Pt(this,"lastSpaceTime",0);Pt(this,"canvasWidth",1);Pt(this,"canvasHeight",1)}setCanvasSize(t,n){this.canvasWidth=t,this.canvasHeight=n}getMouseNormX(){return this.aimNormX}getMouseNormY(){return this.aimNormY}getRawMouseNormX(){return this.mouseNormX}getRawMouseNormY(){return this.mouseNormY}setAimNorm(t,n){this.aimNormX=t,this.aimNormY=n}has(t){return this.keys.has(t)||this.keys.has(t.toLowerCase())||this.keys.has(t.toUpperCase())}getState(){const t=this._weaponSwitch;this._weaponSwitch=0;const n=this._dodge;this._dodge=!1;const a=this._special;this._special=!1;const l=this._lockToggle;return this._lockToggle=!1,{forward:this.has("w")||this.keys.has("ArrowUp"),backward:this.has("s")||this.keys.has("ArrowDown"),left:this.has("a")||this.keys.has("ArrowLeft"),right:this.has("d")||this.keys.has("ArrowRight"),up:this.has("Shift"),down:this.has("Control"),shoot:this.mouseDown,aimX:this.aimNormX,aimY:this.aimNormY,weaponSwitch:t,boost:this.has(" "),brake:this.has("e"),dodge:n,special:a,lockToggle:l,pause:this.has("Escape")||this.has("Enter")}}keyDown(t){if(this.keys.add(t),t===" "){const a=performance.now();a-this.lastSpaceTime<300&&(this._dodge=!0),this.lastSpaceTime=a}(t==="z"||t==="Z")&&(this._special=!0),t==="Tab"&&(this._lockToggle=!0);const n=parseInt(t,10);n>=1&&n<=4&&(this._weaponSwitch=n)}keyUp(t){this.keys.delete(t),this.keys.delete(t.toLowerCase()),this.keys.delete(t.toUpperCase())}mouseMove(t,n){this.mouseNormX=this.canvasWidth>0?t/this.canvasWidth:.5,this.mouseNormY=this.canvasHeight>0?n/this.canvasHeight:.5}mouseDownFn(){this.mouseDown=!0}mouseUpFn(){this.mouseDown=!1}}const Z2=120,Vx=60/Z2/4,K2=64,Q2=.12,J2=25,$2=[{root:45,tones:[57,60,64]},{root:41,tones:[53,57,60]},{root:38,tones:[50,53,57]},{root:40,tones:[52,55,59]}],kx=r=>440*Math.pow(2,(r-69)/12);class k_{constructor(){Pt(this,"ctx",null);Pt(this,"masterGain",null);Pt(this,"bgmGain",null);Pt(this,"sfxGain",null);Pt(this,"initialized",!1);Pt(this,"bgmTimer",null);Pt(this,"bgmActiveOscs",[]);Pt(this,"nextStepTime",0);Pt(this,"step",0);Pt(this,"noiseBuffer",null)}init(){this.initialized||(this.ctx=new AudioContext,this.masterGain=this.ctx.createGain(),this.masterGain.gain.value=.3,this.masterGain.connect(this.ctx.destination),this.bgmGain=this.ctx.createGain(),this.bgmGain.gain.value=.15,this.bgmGain.connect(this.masterGain),this.sfxGain=this.ctx.createGain(),this.sfxGain.gain.value=.5,this.sfxGain.connect(this.masterGain),this.initialized=!0)}ensureCtx(){this.ctx||this.init()}playShoot(t=800){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const n=this.ctx.createOscillator(),a=this.ctx.createGain();n.type="square",n.frequency.value=t,a.gain.setValueAtTime(.3,this.ctx.currentTime),a.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.1),n.connect(a),a.connect(this.sfxGain),n.start(),n.stop(this.ctx.currentTime+.1)}playExplosion(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.sampleRate*.3,n=this.ctx.createBuffer(1,t,this.ctx.sampleRate),a=n.getChannelData(0);for(let f=0;f<t;f++)a[f]=(Math.random()*2-1)*Math.pow(1-f/t,2);const l=this.ctx.createBufferSource();l.buffer=n;const c=this.ctx.createGain();c.gain.setValueAtTime(.5,this.ctx.currentTime),c.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.3),l.connect(c),c.connect(this.sfxGain),l.start()}playHit(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sine",t.frequency.value=1200,n.gain.setValueAtTime(.2,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.05),t.connect(n),n.connect(this.sfxGain),t.start(),t.stop(this.ctx.currentTime+.05)}playSpecial(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(200,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(2e3,this.ctx.currentTime+.5),n.gain.setValueAtTime(.4,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.5),t.connect(n),n.connect(this.sfxGain),t.start(),t.stop(this.ctx.currentTime+.5)}playDodge(){if(this.ensureCtx(),!this.ctx||!this.sfxGain)return;const t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(300,this.ctx.currentTime),t.frequency.exponentialRampToValueAtTime(1800,this.ctx.currentTime+.18),n.gain.setValueAtTime(.25,this.ctx.currentTime),n.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.2),t.connect(n),n.connect(this.sfxGain),t.start(),t.stop(this.ctx.currentTime+.2)}playBossWarning(){if(this.ensureCtx(),!(!this.ctx||!this.sfxGain))for(let t=0;t<3;t++){const n=this.ctx.createOscillator(),a=this.ctx.createGain();n.type="square",n.frequency.value=440,a.gain.setValueAtTime(.3,this.ctx.currentTime+t*.3),a.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+t*.3+.2),n.connect(a),a.connect(this.sfxGain),n.start(this.ctx.currentTime+t*.3),n.stop(this.ctx.currentTime+t*.3+.2)}}startBGM(){this.ensureCtx(),!(!this.ctx||!this.bgmGain||this.bgmTimer!==null)&&(this.step=0,this.nextStepTime=this.ctx.currentTime+.1,this.bgmTimer=window.setInterval(()=>this.scheduleBgmAhead(),J2))}stopBGM(){this.bgmTimer!==null&&(clearInterval(this.bgmTimer),this.bgmTimer=null);for(const t of this.bgmActiveOscs)try{t.stop()}catch{}this.bgmActiveOscs.length=0,this.step=0,this.nextStepTime=0}scheduleBgmAhead(){if(!(!this.ctx||!this.bgmGain))for(;this.nextStepTime<this.ctx.currentTime+Q2;)this.scheduleStep(this.step,this.nextStepTime),this.nextStepTime+=Vx,this.step=(this.step+1)%K2}scheduleStep(t,n){const a=Math.floor(t/16),l=t%16,c=$2[a];l===0&&this.schedulePad(c,n),(l===0||l===8)&&this.scheduleBass(c,l===8,n),l%8===4&&this.scheduleHat(n)}schedulePad(t,n){if(!this.ctx||!this.bgmGain)return;const a=16*Vx,l=.06,c=.4;for(const f of t.tones)for(const d of[-6,5]){const p=this.ctx.createOscillator(),m=this.ctx.createGain();p.type="sawtooth",p.frequency.value=kx(f),p.detune.value=d,m.gain.setValueAtTime(1e-4,n),m.gain.exponentialRampToValueAtTime(.022,n+l),m.gain.setValueAtTime(.022,n+a-c),m.gain.exponentialRampToValueAtTime(1e-4,n+a-.02),p.connect(m),m.connect(this.bgmGain),this.trackBgmOsc(p),p.start(n),p.stop(n+a)}}scheduleBass(t,n,a){if(!this.ctx||!this.bgmGain)return;const l=this.ctx.createOscillator(),c=this.ctx.createBiquadFilter(),f=this.ctx.createGain();l.type="sawtooth",l.frequency.value=kx(t.root-12+(n?7:0)),c.type="lowpass",c.frequency.setValueAtTime(420,a),c.frequency.exponentialRampToValueAtTime(120,a+.3),c.Q.value=2;const d=n?.2:.24;f.gain.setValueAtTime(1e-4,a),f.gain.exponentialRampToValueAtTime(.16,a+.01),f.gain.exponentialRampToValueAtTime(1e-4,a+d),l.connect(c),c.connect(f),f.connect(this.bgmGain),this.trackBgmOsc(l),l.start(a),l.stop(a+d+.05)}scheduleHat(t){if(!this.ctx||!this.bgmGain)return;const n=this.getNoiseBuffer();if(!n)return;const a=this.ctx.createBufferSource();a.buffer=n;const l=this.ctx.createBiquadFilter();l.type="highpass",l.frequency.value=6500;const c=this.ctx.createGain();c.gain.setValueAtTime(.035,t),c.gain.exponentialRampToValueAtTime(1e-4,t+.06),a.connect(l),l.connect(c),c.connect(this.bgmGain),a.start(t),a.stop(t+.08)}getNoiseBuffer(){if(!this.ctx)return null;if(this.noiseBuffer)return this.noiseBuffer;const t=this.ctx.sampleRate*.1,n=this.ctx.createBuffer(1,t,this.ctx.sampleRate),a=n.getChannelData(0);for(let l=0;l<t;l++)a[l]=Math.random()*2-1;return this.noiseBuffer=n,n}trackBgmOsc(t){this.bgmActiveOscs.push(t),t.onended=()=>{const n=this.bgmActiveOscs.indexOf(t);n>=0&&this.bgmActiveOscs.splice(n,1)}}playBossAnnounce(t){if(this.ensureCtx(),!this.ctx)return;const n=this.ctx.currentTime,a=[...t].reduce((f,d)=>f+d.charCodeAt(0),0),l=120+a%60,c=1+(a>>3)%5/10;this.voiceChip(n,{freq:l,duration:.42,waveA:"sawtooth",waveB:"square",waveC:"triangle",pulseHz:34,depth:.55,gainA:.26,gainB:.14,gainC:.1,glideTo:l*.92}),this.voiceChip(n+.3,{freq:l*c,duration:.55,waveA:"sawtooth",waveB:"square",waveC:"triangle",pulseHz:30,depth:.5,gainA:.24,gainB:.13,gainC:.09,glideTo:l*c*.9})}playSpecialAnnounce(){if(this.ensureCtx(),!this.ctx)return;const t=this.ctx.currentTime,n=330;this.voiceChip(t,{freq:n,duration:.8,waveA:"square",waveB:"sawtooth",waveC:"sine",pulseHz:46,depth:.6,gainA:.2,gainB:.14,gainC:.12,glideTo:n*1.8}),this.voiceChip(t+.15,{freq:n*1.25,duration:.6,waveA:"square",waveB:"sawtooth",waveC:"sine",pulseHz:52,depth:.55,gainA:.18,gainB:.12,gainC:.1,glideTo:n*1.25*1.5})}voiceChip(t,n){if(!this.ctx||!this.sfxGain)return;const a=this.ctx.createGain();a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(1,t+.01),a.gain.setValueAtTime(1,t+n.duration*.45),a.gain.exponentialRampToValueAtTime(1e-4,t+n.duration);const l=this.ctx.createGain();l.gain.value=.5;const c=this.ctx.createOscillator(),f=this.ctx.createGain();c.type="sine",c.frequency.value=n.pulseHz,f.gain.value=n.depth,c.connect(f),f.connect(l.gain),c.start(t),c.stop(t+n.duration);const d=[[n.waveA,n.freq,n.gainA],[n.waveB,n.freq*1.005,n.gainB],[n.waveC,n.freq*2.01,n.gainC]];for(const[p,m,v]of d){const g=this.ctx.createOscillator(),x=this.ctx.createGain();g.type=p,g.frequency.setValueAtTime(m,t),g.frequency.exponentialRampToValueAtTime(n.glideTo*(m/n.freq),t+n.duration),x.gain.value=v,g.connect(x),x.connect(l),g.start(t),g.stop(t+n.duration+.02)}l.connect(a),a.connect(this.sfxGain)}}const di=new k_;var Te=(r=>(r.Scout="scout",r.Assault="assault",r.Sniper="sniper",r.Shield="shield",r.Bomber="bomber",r.Commander="commander",r.Boss="boss",r))(Te||{}),Ht=(r=>(r.Idle="idle",r.Patrol="patrol",r.Alert="alert",r.Chase="chase",r.Attack="attack",r.Cooldown="cooldown",r.Flee="flee",r.Phase1="phase1",r.Phase2="phase2",r.Phase3="phase3",r.Phase4="phase4",r))(Ht||{}),gn=(r=>(r.Bullet="bullet",r.Missile="missile",r.Beam="beam",r.Spread="spread",r.Sniper="sniper",r.Funnel="funnel",r.Laser="laser",r.BossBullet="bossBullet",r))(gn||{}),Li=(r=>(r.FreeFire="freeFire",r.LockShortRange="lockShortRange",r.LockRequired="lockRequired",r))(Li||{});const dp=[{id:1,name:"光束机枪",type:gn.Bullet,damage:5,fireRate:.1,speed:40,spread:.05,color:"#4488ff",unlockLevel:1,description:"快速连射的基础光束武器",lockRange:0,fireMode:Li.FreeFire},{id:2,name:"追踪导弹",type:gn.Missile,damage:20,fireRate:.8,speed:20,spread:0,color:"#ff6644",unlockLevel:2,description:"自动追踪目标的导弹",lockRange:60,fireMode:Li.LockRequired},{id:3,name:"光束加农",type:gn.Beam,damage:50,fireRate:1.2,speed:60,spread:0,color:"#00ffff",unlockLevel:3,description:"高穿透力的蓄力光束",lockRange:80,fireMode:Li.LockRequired},{id:4,name:"散射弹幕",type:gn.Spread,damage:8,fireRate:.4,speed:30,spread:.3,color:"#ffff00",unlockLevel:4,description:"扇形扩散的近距离火力",lockRange:0,fireMode:Li.FreeFire},{id:5,name:"狙击光束",type:gn.Sniper,damage:80,fireRate:1.5,speed:100,spread:0,color:"#ff00ff",unlockLevel:5,description:"远程高精度狙击",lockRange:120,fireMode:Li.LockRequired},{id:6,name:"浮游炮",type:gn.Funnel,damage:12,fireRate:.3,speed:15,spread:.1,color:"#00ff88",unlockLevel:6,description:"自动攻击周围的浮游兵器",lockRange:40,fireMode:Li.LockShortRange}];function hu(r){return dp.find(t=>t.id===r)||dp[0]}const Xx=[{type:Te.Scout,name:"侦察兵",hp:20,speed:12,damage:5,attackRange:20,alertRange:40,score:10,color:"#44aaff",size:1},{type:Te.Assault,name:"突击兵",hp:40,speed:18,damage:10,attackRange:15,alertRange:35,score:20,color:"#ff6644",size:1.2},{type:Te.Sniper,name:"狙击手",hp:15,speed:8,damage:25,attackRange:50,alertRange:60,score:25,color:"#ff00ff",size:.8},{type:Te.Shield,name:"护盾兵",hp:60,speed:10,damage:8,attackRange:18,alertRange:30,score:30,color:"#00ffff",size:1.5},{type:Te.Bomber,name:"自爆兵",hp:10,speed:25,damage:40,attackRange:3,alertRange:30,score:15,color:"#ff0000",size:.8},{type:Te.Commander,name:"指挥官",hp:80,speed:8,damage:15,attackRange:25,alertRange:50,score:50,color:"#ffaa00",size:1.3}];function iu(r){return Xx.find(t=>t.type===r)||Xx[0]}function Ki(r,t,n,a,l){return{hpPercent:r,speed:t,attacks:n,minionSpawn:a,attackPattern:l}}const Wx=[{id:1,name:"巨型运输舰",score:500,color:"#ff4444",size:4,phases:[Ki(1,5,["弹幕散布"],!0,"spread"),Ki(.6,7,["弹幕散布","召唤小兵"],!0,"spawn"),Ki(.3,9,["弹幕散布","召唤小兵","轨道炮"],!1,"laser")]},{id:2,name:"实验体-α",score:1e3,color:"#ff00ff",size:3,phases:[Ki(1,12,["高速突进"],!1,"rush"),Ki(.6,15,["高速突进","分身攻击"],!0,"clone"),Ki(.3,18,["高速突进","分身攻击","全屏激光"],!1,"fullLaser")]},{id:3,name:"最终兵器",score:2e3,color:"#ffaa00",size:5,phases:[Ki(1,4,["多重导弹"],!1,"missile"),Ki(.75,6,["多重导弹","力场护盾"],!1,"shield"),Ki(.5,8,["多重导弹","力场护盾","激光网"],!0,"laserNet"),Ki(.25,10,["多重导弹","力场护盾","激光网","终极光束"],!1,"finalBeam")]}];function Sd(r){return Wx.find(t=>t.id===r)||Wx[0]}function sn(r,t){return{x:r.x+t.x,y:r.y+t.y,z:r.z+t.z}}function Ne(r,t){return{x:r.x-t.x,y:r.y-t.y,z:r.z-t.z}}function Ue(r,t){return{x:r.x*t,y:r.y*t,z:r.z*t}}function X_(r){return Math.sqrt(r.x*r.x+r.y*r.y+r.z*r.z)}function ei(r,t){return X_(Ne(r,t))}function Ee(r){const t=X_(r);return t<1e-4?{x:0,y:0,z:0}:{x:r.x/t,y:r.y/t,z:r.z/t}}function qx(r,t,n){return r+(t-r)*n}function Ri(r,t,n){return Math.max(t,Math.min(n,r))}function kr(r,t){return r+Math.random()*(t-r)}function tw(r,t){return Math.floor(kr(r,t+1))}let W_=1;function Ci(){return W_++}const ew=4,nw=1.5,jx=3,yd=.6,Yx=2.5,iw=6,aw=60,sw=4;class rw{constructor(t){Pt(this,"scene");Pt(this,"input");Pt(this,"audio");Pt(this,"canvas");Pt(this,"players",[]);Pt(this,"enemies",[]);Pt(this,"projectiles",[]);Pt(this,"particles",[]);Pt(this,"active",!1);Pt(this,"velocities",[]);Pt(this,"fireTimers",[]);Pt(this,"dodgeTimer",0);Pt(this,"dodgeCooldown",0);Pt(this,"accumulator",0);Pt(this,"lastTime",0);Pt(this,"animFrameId",0);Pt(this,"enemySpawnTimer",0);Pt(this,"waveTimer",0);Pt(this,"levelSpawned",0);Pt(this,"bossCount",0);Pt(this,"currentBossIndex",-1);Pt(this,"bossPhase",1);Pt(this,"bossAttackTimer",0);Pt(this,"bossSweepAngle",0);Pt(this,"bossNetAngle",0);Pt(this,"comboTimeout",[0]);Pt(this,"lockTargets",[null]);Pt(this,"lockOn",!1);Pt(this,"gameLoop",t=>{if(!this.active)return;this.animFrameId=requestAnimationFrame(this.gameLoop);const n=Math.min((t-this.lastTime)/1e3,.05);for(this.lastTime=t,this.accumulator+=n;this.accumulator>=Bh;)this.update(Bh),this.accumulator-=Bh;this.render(n)});this.canvas=t,this.scene=new j2(t,t.width,t.height),this.input=new Y2(0),this.input.setCanvasSize(t.width,t.height),this.audio=new k_}start(){const t=bn.getState();this.players=t.players.map(n=>({...n})),this.velocities=this.players.map(()=>({x:0,y:0,z:0})),this.fireTimers=this.players.map(()=>0),this.dodgeTimer=0,this.dodgeCooldown=0,this.enemies=[],this.projectiles=[],this.particles=[],this.bossCount=0,this.currentBossIndex=-1,this.bossPhase=1,this.bossAttackTimer=0,this.bossSweepAngle=0,this.bossNetAngle=0,this.enemySpawnTimer=0,this.waveTimer=0,this.lockOn=!1,this.active=!0,this.lastTime=performance.now(),this.accumulator=0,W_=1,this.players.forEach((n,a)=>{const l=a===0?new te(4491519):new te(16737860),c=this.scene.createPlayerMesh(l);c.position.set(n.pos.x,n.pos.y,n.pos.z),this.scene.playerMeshes.set(n.id,c),this.scene.scene.add(c)}),di.init(),di.startBGM(),this.gameLoop(performance.now())}stop(){this.active=!1,cancelAnimationFrame(this.animFrameId),di.stopBGM(),this.scene.playerMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.enemyMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.bossMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.projectileMeshes.forEach(t=>this.scene.scene.remove(t)),this.scene.playerMeshes.clear(),this.scene.enemyMeshes.clear(),this.scene.bossMeshes.clear(),this.scene.projectileMeshes.clear()}resize(t,n){this.scene.resize(t,n),this.input.setCanvasSize(t,n)}update(t){bn.getState().game;const a=[this.input.getState()];this.updatePlayers(t,a),this.updateEnemies(t),this.updateProjectiles(t),this.updateParticles(t),this.checkCollisions(),this.spawnEnemies(t),this.updateUI(t),this.updateBoss(t)}updatePlayers(t,n){this.players.forEach((a,l)=>{if(!a.alive)return;const c=n[l],f=this.scene.playerMeshes.get(a.id);if(!f)return;const d=bn.getState().game;for(const N of dp)d.wave>=N.unlockLevel&&!a.weapons.includes(N.id)&&a.weapons.push(N.id);(a.weapon===0||!a.weapons.includes(a.weapon))&&(a.weapon=a.weapons[0]);const p=this.velocities[l],m=(c.right?1:0)-(c.left?1:0),v=(c.up?1:0)-(c.down?1:0),g=(c.forward?1:0)-(c.backward?1:0),x=Math.sqrt(m*m+v*v+g*g),M=c.boost?xy:1,y=a.speed*M,T=c.brake?Ey:yy;if(c.lockToggle&&(this.lockOn=!this.lockOn),!this.lockOn)this.lockTargets[l]=null;else{const N=this.lockTargets[l]!==null?this.enemies.find(B=>B.id===this.lockTargets[l]&&B.hp>0):null;if(!N||ei(N.pos,a.pos)>au){let B=null,C=au;for(const b of this.enemies){if(b.hp<=0)continue;const H=ei(a.pos,b.pos);H<C&&(C=H,B=b)}this.lockTargets[l]=B?B.id:null}}let S=this.input.getRawMouseNormX(),_=this.input.getRawMouseNormY();if(this.lockOn&&this.lockTargets[l]!==null){const N=this.enemies.find(B=>B.id===this.lockTargets[l]&&B.hp>0);if(N){const B=this.worldToScreen(N.pos);if(B){const C=ei(a.pos,N.pos),b=Sy*Math.max(0,1-C/au),H=Ri(B.x/this.canvas.width,0,1),tt=Ri(B.y/this.canvas.height,0,1);S=S+(H-S)*b,_=_+(tt-_)*b}}}this.input.setAimNorm(S,_);const L=this.computeCrosshairDir(a),U={x:-L.z,z:L.x},R=(N,B,C)=>({x:C*L.x+N*U.x,y:B,z:C*L.z+N*U.z});if(this.dodgeCooldown-=t,c.dodge&&this.dodgeCooldown<=0&&(this.dodgeTimer=by,this.dodgeCooldown=Ay,a.invulnTimer=Math.max(a.invulnTimer,wy),di.playDodge()),this.dodgeTimer>0){this.dodgeTimer-=t;let N=0,B=0,C=0;if(x>.001){const b=1/x,H=R(m,v,g);N=H.x*b,B=H.y*b,C=H.z*b}else{const b=this.computeAimDir(a);N=b.x,B=b.y,C=b.z}p.x=N*a.speed*Hh,p.y=B*a.speed*Hh,p.z=C*a.speed*Hh,a.pos.x+=p.x*t,a.pos.y+=p.y*t,a.pos.z+=p.z*t}else{let N=0,B=0,C=0;if(x>.001){const H=1/x,tt=R(m,v,g);N=tt.x*y*H,B=tt.y*y*H,C=tt.z*y*H}const b=1-Math.exp(-T*t);p.x+=(N-p.x)*b,p.y+=(B-p.y)*b,p.z+=(C-p.z)*b,a.pos.x+=p.x*t,a.pos.y+=p.y*t,a.pos.z+=p.z*t}a.pos.x=Ri(a.pos.x,-ns,ns),a.pos.y=Ri(a.pos.y,-Ar,Ar),a.pos.z=Ri(a.pos.z,-ns,ns),a.rot.y=Math.atan2(L.x,L.z);const q=-Math.asin(Ri(L.y,-1,1));a.rot.x=qx(a.rot.x,q,.15);const I=Ri(p.x/y,-1,1)*.35;a.rot.z=qx(a.rot.z,I,.15),f.position.set(a.pos.x,a.pos.y,a.pos.z),f.rotation.set(a.rot.x,a.rot.y,a.rot.z),this.fireTimers[l]-=t,c.shoot&&this.fireTimers[l]<=0&&(this.playerShoot(a,l),this.fireTimers[l]=hu(a.weapon).fireRate),c.weaponSwitch>0&&a.weapons.includes(c.weaponSwitch)&&(a.weapon=c.weaponSwitch),a.invulnTimer>0&&(a.invulnTimer-=t),a.specialGauge=Math.min(a.specialGauge+t*2,a.maxSpecialGauge),c.special&&a.specialGauge>=100&&(this.useSpecial(a,l),a.specialGauge=0),a.combo>0&&(this.comboTimeout[l]-=t,this.comboTimeout[l]<=0&&(a.combo=0))})}worldToScreen(t){const n=this.scene.camera,a=n.matrixWorldInverse.elements,l=n.projectionMatrix.elements,c=t.x,f=t.y,d=t.z,p=a[0]*c+a[4]*f+a[8]*d+a[12],m=a[1]*c+a[5]*f+a[9]*d+a[13],v=a[2]*c+a[6]*f+a[10]*d+a[14],g=a[3]*c+a[7]*f+a[11]*d+a[15],x=l[0]*p+l[4]*m+l[8]*v+l[12]*g,M=l[1]*p+l[5]*m+l[9]*v+l[13]*g;l[2]*p+l[6]*m+l[10]*v+l[14]*g;const y=l[3]*p+l[7]*m+l[11]*v+l[15]*g;if(y<=0)return null;const T=x/y,S=M/y;return Math.abs(T)>1.2||Math.abs(S)>1.2?null:{x:(T*.5+.5)*this.canvas.width,y:(-S*.5+.5)*this.canvas.height}}computeAimDir(t){const n=this.scene.camera,a=(this.input.getMouseNormX()-.5)*2,l=(.5-this.input.getMouseNormY())*2,c=new V(0,0,-1).applyQuaternion(n.quaternion),f=new V(1,0,0).applyQuaternion(n.quaternion),d=new V(0,1,0).applyQuaternion(n.quaternion),p=Math.tan(n.fov*Math.PI/360),m=new V().addScaledVector(c,1).addScaledVector(f,a*p*n.aspect).addScaledVector(d,l*p).normalize();let v=1/0,g=null;for(const x of this.enemies){if(x.hp<=0)continue;const M=x.type===Te.Boss?4:1.5,y=n.position.x-x.pos.x,T=n.position.y-x.pos.y,S=n.position.z-x.pos.z,_=y*m.x+T*m.y+S*m.z,L=y*y+T*T+S*S-M*M,U=_*_-L;if(U<0)continue;const R=-_-Math.sqrt(U);R>=0&&R<v&&(v=R,g=x)}return g?Ee(Ne(g.pos,t.pos)):this.computeCrosshairDir(t)}computeCrosshairDir(t){const n=this.scene.camera,a=(this.input.getMouseNormX()-.5)*2,l=(.5-this.input.getMouseNormY())*2,c=new V(0,0,-1).applyQuaternion(n.quaternion),f=new V(1,0,0).applyQuaternion(n.quaternion),d=new V(0,1,0).applyQuaternion(n.quaternion),p=Math.tan(n.fov*Math.PI/360),m=new V().addScaledVector(c,1).addScaledVector(f,a*p*n.aspect).addScaledVector(d,l*p).normalize(),v=120,g=new V(n.position.x+m.x*v,t.pos.y,n.position.z+m.z*v);return Ee({x:g.x-t.pos.x,y:g.y-t.pos.y,z:g.z-t.pos.z})}playerShoot(t,n){const a=hu(t.weapon);if(!this.scene.playerMeshes.get(t.id))return;const c=this.lockTargets[n],f=c!==null?this.enemies.find(x=>x.id===c&&x.hp>0):null,d=f?ei(f.pos,t.pos):1/0,p=Math.max(a.lockRange,Av),m=f!==null&&d<=p;if(a.fireMode===Li.LockRequired&&!m)return;let v;if(f&&m){const x=Ee(Ne(f.pos,t.pos)),M=this.computeAimDir(t);v=Ee({x:M.x*.3+x.x*.7,y:M.y*.3+x.y*.7,z:M.z*.3+x.z*.7})}else v=this.computeAimDir(t);const g=a.fireMode===Li.LockShortRange&&m;if(a.type===gn.Funnel)for(let x=0;x<jx;x++){const M={id:Ci(),pos:{...t.pos},vel:{x:0,y:0,z:0},damage:a.damage,owner:t.id,type:gn.Funnel,lifetime:sw,radius:.3,color:a.color,phase:"orbit",phaseTimer:yd,orbitAngle:x/jx*Math.PI*2};if(this.projectiles.length<Ih){this.projectiles.push(M);const y=this.scene.createProjectileMesh(a.color,a.type);y.position.set(M.pos.x,M.pos.y,M.pos.z),this.scene.projectileMeshes.set(M.id,y),this.scene.scene.add(y)}}else for(let x=0;x<(a.type===gn.Spread?5:1);x++){const M=a.spread*(Math.random()-.5)*2,y=Ee(sn(v,{x:M,y:M*.5,z:0})),T={id:Ci(),pos:{...t.pos},vel:Ue(y,a.speed),damage:a.damage,owner:t.id,type:a.type,lifetime:3,radius:.3,color:a.color};if(g&&f&&(T.vel=Ue(Ee(Ne(f.pos,t.pos)),a.speed)),this.projectiles.length<Ih){this.projectiles.push(T);const S=this.scene.createProjectileMesh(a.color,a.type);S.position.set(T.pos.x,T.pos.y,T.pos.z),this.scene.projectileMeshes.set(T.id,S),this.scene.scene.add(S)}}di.playShoot(600+Math.random()*400)}useSpecial(t,n){di.playSpecial(),di.playSpecialAnnounce(),this.enemies.forEach(a=>{ei(a.pos,t.pos)<50&&(a.hp-=150,this.scene.createExplosion(a.pos,"#00ffff",2))})}updateEnemies(t){this.enemies.forEach(n=>{if(n.hp<=0){this.scene.createExplosion(n.pos,n.type===Te.Boss?"#ff4400":"#ff6644",n.type===Te.Boss?3:1),di.playExplosion(),this.players.forEach((d,p)=>{const m=n.type===Te.Boss?Sd(this.currentBossIndex+1).score:iu(n.type).score;d.score+=m,d.kills++,d.combo++,this.comboTimeout[p]=_y});return}const a=n.type===Te.Boss?this.scene.bossMeshes.get(n.id):this.scene.enemyMeshes.get(n.id);if(!a)return;const l=this.players.find(d=>d.alive);if(!l)return;const c=ei(n.pos,l.pos),f=iu(n.type);switch(n.type){case Te.Scout:this.updateAIScout(n,l,c,f,t);break;case Te.Assault:this.updateAIAssault(n,l,c,f,t);break;case Te.Sniper:this.updateAISniper(n,l,c,f,t);break;case Te.Shield:this.updateAIShield(n,l,c,f,t);break;case Te.Bomber:this.updateAIBomber(n,l,c,f,t);break;case Te.Commander:this.updateAICommander(n,l,c,f,t);break;default:this.updateAIDefault(n,l,c,f,t)}if(n.state===Ht.Patrol&&n.type!==Te.Boss){const d=Ee(Ne(l.pos,n.pos));n.pos=sn(n.pos,Ue(d,n.speed*.4*t))}n.state===Ht.Flee&&n.fleeTimer!==void 0&&(n.fleeTimer-=t,n.fleeTimer<=0&&(n.state=Ht.Chase)),n.hp<f.hp*.3&&n.type!==Te.Boss&&n.type!==Te.Bomber&&n.state!==Ht.Flee&&n.fleeTimer===void 0&&(n.state=Ht.Flee,n.fleeTimer=Ty),n.pos.x=Ri(n.pos.x,-ns,ns),n.pos.y=Ri(n.pos.y,-Ar,Ar),n.pos.z=Ri(n.pos.z,-ns,ns),a.position.set(n.pos.x,n.pos.y,n.pos.z),a.rotation.y+=t*2,n.type===Te.Boss&&(a.rotation.x+=t*.5)}),this.enemies=this.enemies.filter(n=>{if(n.hp<=0){const a=n.type===Te.Boss?this.scene.bossMeshes.get(n.id):this.scene.enemyMeshes.get(n.id);return a&&(this.scene.scene.remove(a),this.scene.enemyMeshes.delete(n.id),this.scene.bossMeshes.delete(n.id)),!1}return!0})}enemyShoot(t,n){const a=Ee(Ne(n.pos,t.pos)),l=iu(t.type),c={id:Ci(),pos:{...t.pos},vel:Ue(a,25),damage:l.damage,owner:t.id+1e4,type:gn.BossBullet,lifetime:4,radius:.3,color:l.color};if(this.projectiles.length<Ih){this.projectiles.push(c);const f=this.scene.createProjectileMesh(l.color,"bullet");f.position.set(c.pos.x,c.pos.y,c.pos.z),this.scene.projectileMeshes.set(c.id,f),this.scene.scene.add(f)}}updateAIDefault(t,n,a,l,c){switch(t.state){case Ht.Patrol:a<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:if(a<l.attackRange)t.state=Ht.Attack;else if(a>l.alertRange*1.5)t.state=Ht.Patrol;else{const d=Ee(Ne(n.pos,t.pos));t.pos=sn(t.pos,Ue(d,t.speed*c))}break;case Ht.Attack:a>l.attackRange*1.2&&(t.state=Ht.Chase),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.8+Math.random()*.6);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const f=Ee(Ne(t.pos,n.pos));t.pos=sn(t.pos,Ue(f,t.speed*1.5*c));break}}updateAIScout(t,n,a,l,c){switch(t.state){case Ht.Patrol:a<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:if(a<l.attackRange)t.state=Ht.Attack;else if(a>l.alertRange*1.5)t.state=Ht.Patrol;else{const m=Ee(Ne(n.pos,t.pos));t.pos=sn(t.pos,Ue(m,t.speed*c))}break;case Ht.Attack:a>l.attackRange*1.3&&(t.state=Ht.Chase);const f=Ee(Ne(t.pos,n.pos)),d={x:-f.z,y:0,z:f.x};t.pos=sn(t.pos,Ue(d,t.speed*.8*c)),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.5+Math.random()*.5);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const p=Ee(Ne(t.pos,n.pos));t.pos=sn(t.pos,Ue(p,t.speed*1.5*c));break}}updateAIAssault(t,n,a,l,c){switch(t.state){case Ht.Patrol:a<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:const f=Ee(Ne(n.pos,t.pos));t.pos=sn(t.pos,Ue(f,t.speed*c)),a<l.attackRange&&(t.state=Ht.Attack);break;case Ht.Attack:const d=Ee(Ne(n.pos,t.pos));t.pos=sn(t.pos,Ue(d,t.speed*.5*c)),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.3+Math.random()*.3),a>l.attackRange*1.5&&(t.state=Ht.Chase);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const p=Ee(Ne(t.pos,n.pos));t.pos=sn(t.pos,Ue(p,t.speed*1.5*c));break}}updateAISniper(t,n,a,l,c){switch(t.state){case Ht.Patrol:a<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:if(a<l.attackRange)t.state=Ht.Attack;else{const d=Ee(Ne(n.pos,t.pos));t.pos=sn(t.pos,Ue(d,t.speed*c))}break;case Ht.Attack:if(a<l.attackRange*.5){const d=Ee(Ne(t.pos,n.pos));t.pos=sn(t.pos,Ue(d,t.speed*c))}else a>l.attackRange*1.2&&(t.state=Ht.Chase);t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=1+Math.random()*.5);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const f=Ee(Ne(t.pos,n.pos));t.pos=sn(t.pos,Ue(f,t.speed*1.5*c));break}}updateAIShield(t,n,a,l,c){switch(t.state){case Ht.Patrol:a<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:if(a<l.attackRange)t.state=Ht.Attack;else if(a>l.alertRange*1.5)t.state=Ht.Patrol;else{const p=Ee(Ne(n.pos,t.pos));t.pos=sn(t.pos,Ue(p,t.speed*c))}break;case Ht.Attack:const f=Ee(Ne(n.pos,t.pos));t.pos=sn(t.pos,Ue(f,t.speed*.3*c)),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=1.2+Math.random()*.8),a>l.attackRange*1.5&&(t.state=Ht.Chase);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const d=Ee(Ne(t.pos,n.pos));t.pos=sn(t.pos,Ue(d,t.speed*1.5*c));break}}updateAIBomber(t,n,a,l,c){switch(t.state){case Ht.Patrol:a<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:case Ht.Attack:const f=Ee(Ne(n.pos,t.pos));t.pos=sn(t.pos,Ue(f,t.speed*c));break}a<3&&(this.scene.createExplosion(t.pos,"#ff4400",2),di.playExplosion(),n.hp-=l.damage,n.invulnTimer=Tv,t.hp=0)}updateAICommander(t,n,a,l,c){switch(this.enemies.forEach(f=>{if(f.id===t.id||f.hp<=0)return;ei(t.pos,f.pos)<30&&(f.speed=l.speed*1.3)}),t.state){case Ht.Patrol:a<l.alertRange&&(t.state=Ht.Chase);break;case Ht.Chase:if(a<l.attackRange)t.state=Ht.Attack;else if(a>l.alertRange*1.5)t.state=Ht.Patrol;else{const d=Ee(Ne(n.pos,t.pos));t.pos=sn(t.pos,Ue(d,t.speed*c))}break;case Ht.Attack:a>l.attackRange*1.2&&(t.state=Ht.Chase),t.attackTimer-=c,t.attackTimer<=0&&(this.enemyShoot(t,n),t.attackTimer=.6+Math.random()*.4);break;case Ht.Flee:t.hp>l.hp*.3&&(t.state=Ht.Chase);const f=Ee(Ne(t.pos,n.pos));t.pos=sn(t.pos,Ue(f,t.speed*1.5*c));break}}updateProjectiles(t){this.projectiles.forEach(n=>{n.type===gn.Missile?this.steerMissile(n,t):n.type===gn.Funnel&&this.updateFunnel(n,t),n.pos=sn(n.pos,Ue(n.vel,t)),n.lifetime-=t;const a=this.scene.projectileMeshes.get(n.id);a&&(a.position.set(n.pos.x,n.pos.y,n.pos.z),n.type===gn.Missile&&(a.rotation.x+=t*5))}),this.projectiles=this.projectiles.filter(n=>{if(n.lifetime<=0){const a=this.scene.projectileMeshes.get(n.id);return a&&(this.scene.scene.remove(a),this.scene.projectileMeshes.delete(n.id)),!1}return!0})}steerMissile(t,n){const a=t.owner>=1e4,l=(a?nw:ew)*n;let c=null;if(a){let S=null,_=1/0;for(const L of this.players){if(!L.alive)continue;const U=ei(t.pos,L.pos);U<_&&(_=U,S=L)}S&&(c=Ee(Ne(S.pos,t.pos)))}else{let S=null;const _=this.players.findIndex(U=>U.id===t.owner),L=_>=0?this.lockTargets[_]:null;if(L!=null){const U=this.enemies.find(R=>R.id===L&&R.hp>0);U&&(S=U)}if(!S){let U=1/0;for(const R of this.enemies){if(R.hp<=0)continue;const q=ei(t.pos,R.pos);q<U&&(U=q,S=R)}}S&&(c=Ee(Ne(S.pos,t.pos)))}if(!c)return;const f=Math.sqrt(t.vel.x*t.vel.x+t.vel.y*t.vel.y+t.vel.z*t.vel.z);if(f<1e-4)return;const d=Ee(t.vel),p=Ri(d.x*c.x+d.y*c.y+d.z*c.z,-1,1),m=Math.acos(p);if(m<=l||m<1e-6){t.vel=Ue(c,f);return}let v=d.y*c.z-d.z*c.y,g=d.z*c.x-d.x*c.z,x=d.x*c.y-d.y*c.x;const M=Math.sqrt(v*v+g*g+x*x);if(M<1e-6){const S=Math.abs(d.y)<.9?{x:0,y:1,z:0}:{x:1,y:0,z:0};v=d.y*S.z-d.z*S.y,g=d.z*S.x-d.x*S.z,x=d.x*S.y-d.y*S.x}else v/=M,g/=M,x/=M;const y=Math.cos(l),T=Math.sin(l);t.vel={x:(d.x*y+(g*d.z-x*d.y)*T)*f,y:(d.y*y+(x*d.x-v*d.z)*T)*f,z:(d.z*y+(v*d.y-g*d.x)*T)*f}}updateFunnel(t,n){const a=this.players.find(l=>l.id===t.owner);if(!(!a||!a.alive)&&t.phase!=="strike"){t.phaseTimer=(t.phaseTimer??yd)-n;const l=(t.orbitAngle??0)+iw*n;if(t.orbitAngle=l,t.pos={x:a.pos.x+Math.cos(l)*Yx,y:a.pos.y+Math.sin(l*3)*.6,z:a.pos.z+Math.sin(l)*Yx},t.vel={x:0,y:0,z:0},t.phaseTimer<=0){let c=null,f=1/0;for(const d of this.enemies){if(d.hp<=0)continue;const p=ei(t.pos,d.pos);p<f&&(f=p,c=d)}c?(t.phase="strike",t.vel=Ue(Ee(Ne(c.pos,t.pos)),aw)):(t.phase="orbit",t.phaseTimer=yd)}}}updateParticles(t){}checkCollisions(){this.projectiles.forEach(t=>{t.owner>=1e4||this.enemies.forEach(n=>{const a=n.type===Te.Boss?4:1.5;ei(t.pos,n.pos)<a&&(n.hp-=(n.shieldTimer||0)>0?t.damage*.5:t.damage,t.lifetime=0,this.scene.createExplosion(t.pos,"#ffaa00",.5),di.playHit())})}),this.projectiles.forEach(t=>{t.owner<1e4||this.players.forEach(n=>{!n.alive||n.invulnTimer>0||ei(t.pos,n.pos)<gy&&(n.hp-=t.damage,t.lifetime=0,n.invulnTimer=Tv,this.scene.createExplosion(t.pos,"#ff4444",.5),di.playHit(),n.hp<=0&&(n.alive=!1,this.scene.createExplosion(n.pos,"#4488ff",3)))})})}spawnEnemies(t){const n=bn.getState(),a=n.game;if(a.wave<1){this.levelSpawned=0,this.enemySpawnTimer=0,this.waveTimer=0,n.setGame({wave:1});return}if(this.waveTimer>0){this.waveTimer-=t;return}const l=a.wave%vy===0;if(l&&!this.enemies.some(m=>m.type===Te.Boss)&&this.currentBossIndex<0){this.spawnBoss();return}const c=l?0:Math.min(6+a.wave,bv);if(this.enemySpawnTimer+=t,this.levelSpawned<c&&this.enemies.length<bv&&this.enemySpawnTimer>=.15){this.enemySpawnTimer=0;const m=[Te.Scout,Te.Assault,Te.Shield];a.wave>2&&m.push(Te.Sniper),a.wave>3&&m.push(Te.Bomber),a.wave>4&&m.push(Te.Commander);const v=m[tw(0,m.length-1)],g=iu(v);let x;do{const T=kr(30,Math.min(g.alertRange+25,80)),S=Math.random()*Math.PI*2,_=kr(-.5,.5);x={x:this.players[0].pos.x+Math.sin(S)*T,y:Ri(this.players[0].pos.y+Math.sin(_)*T,-Ar*.5,Ar*.5),z:this.players[0].pos.z+Math.cos(S)*T}}while(this.players.some(T=>ei(x,T.pos)<20));const M={id:Ci(),type:v,pos:x,rot:{x:0,y:0,z:0},hp:g.hp*(1+a.wave*.1),maxHp:g.hp,speed:g.speed*(1+a.wave*.05),state:Ht.Patrol,targetId:0,attackTimer:1+Math.random()};this.enemies.push(M);const y=this.scene.createEnemyMesh(new te(g.color),g.size,v);y.position.set(x.x,x.y,x.z),this.scene.enemyMeshes.set(M.id,y),this.scene.scene.add(y),this.levelSpawned++}const f=this.enemies.some(m=>m.type===Te.Boss),d=this.enemies.some(m=>m.hp>0);(l?this.currentBossIndex>=0&&!f:this.levelSpawned>=c&&!d)&&(this.enemies.forEach(m=>{const v=m.type===Te.Boss?this.scene.bossMeshes.get(m.id):this.scene.enemyMeshes.get(m.id);v&&(this.scene.scene.remove(v),this.scene.enemyMeshes.delete(m.id),this.scene.bossMeshes.delete(m.id))}),this.enemies=[],this.levelSpawned=0,this.enemySpawnTimer=0,this.currentBossIndex=-1,this.waveTimer=2.5,n.setGame({wave:a.wave+1}))}spawnBoss(){const t=this.bossCount%3;this.currentBossIndex=t,this.bossCount++,this.bossPhase=1,this.bossAttackTimer=0,this.bossSweepAngle=0,this.bossNetAngle=0;const n=Sd(t+1),a={x:kr(-30,30),y:5,z:-50},l={id:Ci(),type:Te.Boss,pos:a,rot:{x:0,y:0,z:0},hp:200*(1+this.bossCount*.2),maxHp:200,speed:5,state:Ht.Phase1,targetId:0,attackTimer:2,phase:1,shieldTimer:0};this.enemies.push(l);const c=this.scene.createBossMesh(new te(n.color),n.size);c.position.set(a.x,a.y,a.z),this.scene.bossMeshes.set(l.id,c),this.scene.scene.add(c),di.playBossWarning(),di.playBossAnnounce(n.name),bn.getState().setGame({bossFight:!0,bossName:n.name})}updateBoss(t){const n=this.enemies.find(f=>f.type===Te.Boss);if(!n){bn.getState().game.bossFight&&bn.getState().setGame({bossFight:!1,bossName:""});return}const a=Sd(this.currentBossIndex+1),l=n.hp/n.maxHp;if(a.phases.forEach((f,d)=>{l<=f.hpPercent&&(n.phase||1)<=d&&(n.phase=d+1,n.speed=f.speed,n.state=["phase1","phase2","phase3","phase4"][d])}),this.bossAttackTimer+=t,this.bossAttackTimer>2){this.bossAttackTimer=0;const f=this.players.find(m=>m.alive);if(!f)return;const d=a.phases[(n.phase||1)-1];switch(d.attackPattern){case"spread":for(let v=0;v<12;v++){const g=v/12*Math.PI*2,x={x:Math.cos(g),y:0,z:Math.sin(g)},M={id:Ci(),pos:{...n.pos},vel:Ue(x,10),damage:5,owner:n.id+1e4,type:gn.BossBullet,lifetime:4,radius:.3,color:"#ff4444"};this.projectiles.push(M);const y=this.scene.createProjectileMesh("#ff4444","bullet");y.position.set(M.pos.x,M.pos.y,M.pos.z),this.scene.projectileMeshes.set(M.id,y),this.scene.scene.add(y)}break;case"laser":case"finalBeam":{const v=Ee(Ne(f.pos,n.pos)),g={id:Ci(),pos:{...n.pos},vel:Ue(v,30),damage:25,owner:n.id+1e4,type:gn.Laser,lifetime:2,radius:.5,color:"#ff0000"};this.projectiles.push(g);const x=this.scene.createProjectileMesh("#ff0000","beam");x.position.set(g.pos.x,g.pos.y,g.pos.z),x.scale.set(1,1,3),this.scene.projectileMeshes.set(g.id,x),this.scene.scene.add(x);break}case"missile":for(let v=0;v<5;v++){const g=Ee(Ne(f.pos,n.pos)),x={x:(Math.random()-.5)*2,y:0,z:(Math.random()-.5)*2},M={id:Ci(),pos:{...n.pos},vel:Ue(sn(g,x),8),damage:10,owner:n.id+1e4,type:gn.Missile,lifetime:5,radius:.4,color:"#ffaa00"};this.projectiles.push(M);const y=this.scene.createProjectileMesh("#ffaa00","missile");y.position.set(M.pos.x,M.pos.y,M.pos.z),this.scene.projectileMeshes.set(M.id,y),this.scene.scene.add(y)}break;case"rush":n.speed=20;const m=Ee(Ne(f.pos,n.pos));n.pos=sn(n.pos,Ue(m,n.speed*t));break;case"clone":{const v=Ee(Ne(f.pos,n.pos)),g=Math.atan2(v.z,v.x);for(let x=-2;x<=2;x++){const M=g+x*.6,y=Ee({x:Math.cos(M),y:v.y,z:Math.sin(M)}),T={id:Ci(),pos:{...n.pos},vel:Ue(y,16),damage:8,owner:n.id+1e4,type:gn.BossBullet,lifetime:3.5,radius:.3,color:"#ff00ff"};this.projectiles.push(T);const S=this.scene.createProjectileMesh("#ff00ff","bullet");S.position.set(T.pos.x,T.pos.y,T.pos.z),this.scene.projectileMeshes.set(T.id,S),this.scene.scene.add(S)}break}case"fullLaser":{for(let v=0;v<6;v++){const g=this.bossSweepAngle+v/6*Math.PI*2,x={x:Math.cos(g),y:0,z:Math.sin(g)},M={id:Ci(),pos:{...n.pos},vel:Ue(x,26),damage:15,owner:n.id+1e4,type:gn.Laser,lifetime:2.2,radius:.5,color:"#ff00ff"};this.projectiles.push(M);const y=this.scene.createProjectileMesh("#ff00ff","beam");y.position.set(M.pos.x,M.pos.y,M.pos.z),y.scale.set(1,1,3),this.scene.projectileMeshes.set(M.id,y),this.scene.scene.add(y)}this.bossSweepAngle+=Math.PI/8;break}case"shield":n.shieldTimer=Math.max(n.shieldTimer||0,4);break;case"laserNet":{const v=Ee(Ne(f.pos,n.pos)),g=Math.atan2(v.z,v.x)+this.bossNetAngle;for(let x=0;x<9;x++){const M=x/8-.5,y=g+M*Math.PI*.66,T={x:Math.cos(y),y:0,z:Math.sin(y)},S={id:Ci(),pos:{...n.pos},vel:Ue(T,25),damage:12,owner:n.id+1e4,type:gn.Laser,lifetime:2.5,radius:.4,color:"#ffaa00"};this.projectiles.push(S);const _=this.scene.createProjectileMesh("#ffaa00","beam");_.position.set(S.pos.x,S.pos.y,S.pos.z),_.scale.set(1,1,3),this.scene.projectileMeshes.set(S.id,_),this.scene.scene.add(_)}this.bossNetAngle+=Math.PI/9;break}case"spawn":if(d.minionSpawn)for(let v=0;v<3;v++){const g={id:Ci(),type:Te.Scout,pos:{x:n.pos.x+kr(-5,5),y:0,z:n.pos.z+kr(-5,5)},rot:{x:0,y:0,z:0},hp:20,maxHp:20,speed:10,state:Ht.Chase,targetId:0,attackTimer:1};this.enemies.push(g);const x=this.scene.createEnemyMesh(new te(4500223),1,"scout");x.position.set(g.pos.x,g.pos.y,g.pos.z),this.scene.enemyMeshes.set(g.id,x),this.scene.scene.add(x)}break}}const c=this.players.find(f=>f.alive);if(c){const f=a.phases[(n.phase||1)-1],d=Ee(Ne(c.pos,n.pos));n.pos=sn(n.pos,Ue(d,(f?f.speed:n.speed)*t))}(n.shieldTimer||0)>0&&(n.shieldTimer=Math.max(0,(n.shieldTimer||0)-t))}updateUI(t){const n=bn.getState(),a=n.game;!this.players[0].alive&&!a.gameOver&&(n.setGame({gameOver:!0,screen:"result"}),this.stop()),n.setPlayers(this.players),n.setGame({score:this.players.reduce((l,c)=>l+c.score,0)})}render(t){this.players.forEach((n,a)=>{const l=this.lockTargets[a],c=l!==null?this.enemies.find(f=>f.id===l&&f.hp>0):null;if(this.scene.updateCamera(n.pos,t,n.rot.y,c?c.pos:null),c){const f=hu(n.weapon),d=Math.max(f.lockRange,Av),p=ei(c.pos,n.pos)<=d?"#00ff88":"#ff4444";this.scene.updateLockIndicator(n.id,n.pos,c.pos,p)}else this.scene.updateLockIndicator(n.id,n.pos,null)}),this.scene.render()}}const Zx=["w","W","a","A","s","S","d","D","e","E","z","Z"," ","Tab","1","2","3","4","Shift","Control","Enter"],ow=()=>{const r=Gr.useRef(null),t=Gr.useRef(null),n=Gr.useRef(null),a=Gr.useRef({x:0,y:0});return Gr.useEffect(()=>{const l=r.current;if(!l)return;l.width=window.innerWidth,l.height=window.innerHeight;const c=new rw(l);t.current=c;const f=()=>{l.width=window.innerWidth,l.height=window.innerHeight,c.resize(window.innerWidth,window.innerHeight)};window.addEventListener("resize",f);const d=()=>{const S=n.current;if(!S)return;const _=c.input.getMouseNormX()*l.width,L=c.input.getMouseNormY()*l.height;S.style.transform=`translate(${_}px, ${L}px) translate(-50%, -50%)`};let p=0;const m=()=>{d(),p=requestAnimationFrame(m)};p=requestAnimationFrame(m);const v=S=>{(S.ctrlKey||S.metaKey)&&S.preventDefault(),c.input.keyDown(S.key),S.key==="Escape"&&(document.pointerLockElement===l&&document.exitPointerLock(),bn.getState().setGame({screen:"pause"})),Zx.includes(S.key)&&S.preventDefault()},g=S=>{c.input.keyUp(S.key),Zx.includes(S.key)&&S.preventDefault()},x=S=>{const _=a.current;if(document.pointerLockElement===l)_.x=Math.max(0,Math.min(l.width,_.x+S.movementX)),_.y=Math.max(0,Math.min(l.height,_.y+S.movementY));else{const L=l.getBoundingClientRect();_.x=S.clientX-L.left,_.y=S.clientY-L.top}c.input.mouseMove(_.x,_.y)},M=()=>{c.input.mouseDownFn(),document.pointerLockElement!==l&&l.requestPointerLock()},y=()=>c.input.mouseUpFn();window.addEventListener("keydown",v),window.addEventListener("keyup",g),l.addEventListener("mousemove",x),l.addEventListener("mousedown",M),l.addEventListener("mouseup",y);const T=S=>S.preventDefault();return l.addEventListener("contextmenu",T),c.start(),()=>{c.stop(),cancelAnimationFrame(p),window.removeEventListener("resize",f),window.removeEventListener("keydown",v),window.removeEventListener("keyup",g),l.removeEventListener("mousemove",x),l.removeEventListener("mousedown",M),l.removeEventListener("mouseup",y),l.removeEventListener("contextmenu",T)}},[]),lt.jsxs(lt.Fragment,{children:[lt.jsx("canvas",{ref:r,className:"absolute top-0 left-0 w-full h-full cursor-none"}),lt.jsx("div",{ref:n,className:"absolute top-0 left-0 z-20 pointer-events-none",style:{transform:"translate(-50%, -50%)",filter:"drop-shadow(0 0 3px rgba(0,240,255,0.9))"},children:lt.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",children:[lt.jsx("line",{x1:"12",y1:"3",x2:"12",y2:"8",stroke:"#00f0ff",strokeWidth:"2"}),lt.jsx("line",{x1:"12",y1:"16",x2:"12",y2:"21",stroke:"#00f0ff",strokeWidth:"2"}),lt.jsx("line",{x1:"3",y1:"12",x2:"8",y2:"12",stroke:"#00f0ff",strokeWidth:"2"}),lt.jsx("line",{x1:"16",y1:"12",x2:"21",y2:"12",stroke:"#00f0ff",strokeWidth:"2"}),lt.jsx("circle",{cx:"12",cy:"12",r:"1.6",fill:"#00f0ff"})]})})]})},Kx={[Li.FreeFire]:"FR",[Li.LockShortRange]:"SR",[Li.LockRequired]:"LCK"},lw=r=>lt.jsx("svg",{className:"absolute top-0 left-0 w-3 h-3",viewBox:"0 0 12 12",children:lt.jsx("path",{d:"M0 0h10v2H2v8H0z",fill:r})}),cw=r=>lt.jsx("svg",{className:"absolute top-0 right-0 w-3 h-3",viewBox:"0 0 12 12",children:lt.jsx("path",{d:"M12 0H2v2h8v8h2z",fill:r})}),uw=r=>lt.jsx("svg",{className:"absolute bottom-0 left-0 w-3 h-3",viewBox:"0 0 12 12",children:lt.jsx("path",{d:"M0 12h10v-2H2V2H0z",fill:r})}),fw=r=>lt.jsx("svg",{className:"absolute bottom-0 right-0 w-3 h-3",viewBox:"0 0 12 12",children:lt.jsx("path",{d:"M12 12H2v-2h8V2h2z",fill:r})}),Ed=({children:r,className:t="",color:n="#00f0ff",noFrame:a=!1})=>lt.jsxs("div",{className:`relative ${a?"":"pixel-border"} bg-black/70 ${t}`,children:[!a&&lt.jsxs(lt.Fragment,{children:[lw(n),cw(n),uw(n),fw(n)]}),r]}),hw=({current:r,max:t})=>{const n=r/t*100,a=n>50?"#00f0ff":n>25?"#ff8800":"#ff2244",l=n>50?"pixel-border":n>25?"pixel-border-warning":"pixel-border-danger";return lt.jsxs("div",{className:`relative ${l} bg-black/80`,style:{height:14},children:[lt.jsx("div",{className:"pixel-bar-fill",style:{width:n+"%",background:a}}),[20,40,60,80].map(c=>lt.jsx("div",{className:"pixel-bar-segment",style:{left:c+"%"}},c))]})},dw=({current:r,max:t})=>{const n=r/t*100;return lt.jsx("div",{className:"relative pixel-border-dim bg-black/80",style:{height:10},children:lt.jsx("div",{className:"pixel-bar-fill",style:{width:n+"%",background:"#ffcc00"}})})},pw=()=>{const{game:r,players:t}=bn(),n=t[0];if(!n)return null;const a=hu(n.weapon),l=n.hp/n.maxHp*100,c=l>50?"#00f0ff":l>25?"#ff8800":"#ff2244";return lt.jsxs(lt.Fragment,{children:[lt.jsx("div",{className:"absolute top-3 left-1/2 -translate-x-1/2 z-10",children:lt.jsx(Ed,{className:"px-4 py-1.5",children:lt.jsxs("div",{className:"flex items-center gap-3 text-xs",children:[lt.jsx("span",{className:"text-neon-cyan tracking-widest",children:"[PVE MODE]"}),lt.jsxs("span",{className:"text-white/50",children:["LEVEL ",r.wave]}),r.bossFight&&lt.jsxs("span",{className:"text-mecha-danger pixel-text-glow-red",children:["BOSS: ",r.bossName]})]})})}),lt.jsx("div",{className:"absolute bottom-3 left-3",children:lt.jsxs(Ed,{className:"px-3 py-2 min-w-[220px]",children:[lt.jsxs("div",{className:"flex justify-between items-baseline mb-1",children:[lt.jsx("span",{className:"text-xs tracking-wider",style:{color:c},children:"ARMOR"}),lt.jsxs("span",{className:"text-xs",style:{color:c},children:[Math.ceil(n.hp),"/",n.maxHp]})]}),lt.jsx(hw,{current:n.hp,max:n.maxHp}),lt.jsxs("div",{className:"flex justify-between items-baseline mt-1.5 mb-0.5",children:[lt.jsx("span",{className:"text-[10px] text-yellow-400 tracking-wider",children:"SP GAUGE"}),lt.jsxs("span",{className:"text-[10px] text-yellow-400/80",children:[Math.ceil(n.specialGauge),"%"]})]}),lt.jsx(dw,{current:n.specialGauge,max:n.maxSpecialGauge}),lt.jsxs("div",{className:"flex items-center gap-2 mt-1.5",children:[lt.jsx("span",{className:"text-[10px] text-white/40",children:"WPN"}),lt.jsx("span",{className:"text-xs text-neon-cyan pixel-text-glow",children:a.name}),lt.jsxs("span",{className:"text-[10px] text-white/30",children:["DMG:",a.damage]}),lt.jsxs("span",{className:`text-[10px] ${Kx[a.fireMode]==="LCK"?"text-mecha-danger":"text-neon-cyan"}`,children:["[",Kx[a.fireMode],"]"]})]}),lt.jsxs("div",{className:"flex items-center gap-2 mt-1",children:[lt.jsx("span",{className:"text-[10px] text-white/40",children:"SCORE"}),lt.jsx("span",{className:"text-xs text-white",children:n.score}),n.combo>1&&lt.jsxs("span",{className:"text-xs text-mecha-warning pixel-text-glow",children:["x",n.combo]})]})]})}),lt.jsx("div",{className:"absolute top-3 right-3 z-10",children:lt.jsx(Ed,{className:"px-2 py-1.5",noFrame:!0,children:lt.jsxs("div",{className:"text-[9px] text-white/25 leading-relaxed text-right tracking-wider",children:[lt.jsx("div",{children:"WASD MOVE       SHIFT/CTRL UP-DOWN       MOUSE AIM"}),lt.jsx("div",{children:"LMB FIRE       SPACE BOOST       SPACE x2 DODGE"}),lt.jsx("div",{children:"E BRAKE       1-4 SWITCH WPN       TAB LOCK"}),lt.jsx("div",{children:"Z SPECIAL       ESC/ENTER PAUSE"})]})})})]})},mw=r=>lt.jsx("svg",{className:"absolute top-0 left-0 w-3 h-3",viewBox:"0 0 12 12",children:lt.jsx("path",{d:"M0 0h10v2H2v8H0z",fill:r})}),gw=r=>lt.jsx("svg",{className:"absolute top-0 right-0 w-3 h-3",viewBox:"0 0 12 12",children:lt.jsx("path",{d:"M12 0H2v2h8v8h2z",fill:r})}),vw=r=>lt.jsx("svg",{className:"absolute bottom-0 left-0 w-3 h-3",viewBox:"0 0 12 12",children:lt.jsx("path",{d:"M0 12h10v-2H2V2H0z",fill:r})}),xw=r=>lt.jsx("svg",{className:"absolute bottom-0 right-0 w-3 h-3",viewBox:"0 0 12 12",children:lt.jsx("path",{d:"M12 12H2v-2h8V2h2z",fill:r})}),_w=()=>{const{game:r,setGame:t}=bn();return lt.jsxs("div",{className:"absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50",children:[lt.jsx("div",{className:"absolute inset-0 opacity-[0.03] pointer-events-none",style:{backgroundImage:"linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)",backgroundSize:"40px 40px"}}),lt.jsxs("div",{className:"relative px-8 py-6 pixel-border bg-black/80",children:[mw("#00f0ff"),gw("#00f0ff"),vw("#00f0ff"),xw("#00f0ff"),lt.jsx("h2",{className:"font-pixel-title text-xl text-neon-cyan mb-8 pixel-text-glow text-center tracking-wider",children:"PAUSED"}),lt.jsxs("div",{className:"space-y-3 w-64",children:[lt.jsx("button",{onClick:()=>t({screen:"pve",paused:!1}),className:"pixel-btn w-full py-2 text-base tracking-[0.15em]",children:"CONTINUE"}),lt.jsx("button",{onClick:()=>{bn.getState().resetGame(),t({screen:"menu"})},className:"pixel-btn-danger w-full py-2 text-base tracking-[0.15em]",children:"QUIT"})]})]})]})},Qx=r=>lt.jsx("svg",{className:"absolute top-0 left-0 w-3 h-3",viewBox:"0 0 12 12",children:lt.jsx("path",{d:"M0 0h10v2H2v8H0z",fill:r})}),Jx=r=>lt.jsx("svg",{className:"absolute top-0 right-0 w-3 h-3",viewBox:"0 0 12 12",children:lt.jsx("path",{d:"M12 0H2v2h8v8h2z",fill:r})}),$x=r=>lt.jsx("svg",{className:"absolute bottom-0 left-0 w-3 h-3",viewBox:"0 0 12 12",children:lt.jsx("path",{d:"M0 12h10v-2H2V2H0z",fill:r})}),t_=r=>lt.jsx("svg",{className:"absolute bottom-0 right-0 w-3 h-3",viewBox:"0 0 12 12",children:lt.jsx("path",{d:"M12 12H2v-2h8V2h2z",fill:r})}),Mw=()=>{const{game:r,players:t}=bn(),n=bn(l=>l.setGame),a="#ff2244";return lt.jsxs("div",{className:"w-full h-full flex flex-col items-center justify-center bg-dark-bg",children:[lt.jsx("div",{className:"absolute inset-0 opacity-[0.03] pointer-events-none",style:{backgroundImage:"linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)",backgroundSize:"40px 40px"}}),lt.jsxs("div",{className:"relative px-8 py-6 pixel-border bg-black/80 mb-8",children:[Qx(a),Jx(a),$x(a),t_(a),lt.jsx("h1",{className:"font-pixel-title text-xl tracking-wider pixel-text-glow",style:{color:a},children:"GAME OVER"})]}),lt.jsxs("div",{className:"relative px-5 py-4 pixel-border-dim bg-black/60 w-80 mb-8",children:[Qx("#00f0ff"),Jx("#00f0ff"),$x("#00f0ff"),t_("#00f0ff"),lt.jsx("h3",{className:"font-pixel text-sm text-white/40 mb-3 tracking-wider",children:"BATTLE STATS"}),t.map((l,c)=>lt.jsxs("div",{className:"flex justify-between font-pixel text-sm mb-1.5 tracking-wider",children:[lt.jsxs("span",{className:"text-white/60",children:["P",c+1]}),lt.jsxs("span",{className:"text-white",children:["KILLS:",l.kills," SCORE:",l.score]})]},l.id)),lt.jsxs("div",{className:"flex justify-between font-pixel text-sm mt-2 pt-2 tracking-wider",style:{borderTop:"1px solid rgba(0,240,255,0.2)"},children:[lt.jsx("span",{className:"text-white/40",children:"WAVE"}),lt.jsx("span",{className:"text-white font-bold",children:r.wave})]})]}),lt.jsxs("div",{className:"space-y-3 w-64",children:[lt.jsx("button",{onClick:()=>{bn.getState().resetGame(),n({screen:"pve",gameMode:"pve"})},className:"pixel-btn w-full py-2 text-base tracking-[0.15em]",children:"PLAY AGAIN"}),lt.jsx("button",{onClick:()=>{bn.getState().resetGame(),n({screen:"menu"})},className:"pixel-btn w-full py-2 text-base tracking-[0.15em]",children:"MAIN MENU"})]})]})},Sw=()=>{const r=bn(n=>n.game),t=()=>{switch(r.screen){case"menu":return lt.jsx(Lv,{});case"pve":return lt.jsxs("div",{className:"w-full h-full relative",children:[lt.jsx(ow,{}),lt.jsx(pw,{})]});case"pause":return lt.jsxs("div",{className:"w-full h-full relative",children:[lt.jsx("div",{className:"w-full h-full bg-black/30"}),lt.jsx(_w,{})]});case"result":return lt.jsx(Mw,{});default:return lt.jsx(Lv,{})}};return lt.jsx("div",{className:"w-full h-full overflow-hidden font-pixel",children:t()})};cy.createRoot(document.getElementById("root")).render(lt.jsx(ol.StrictMode,{children:lt.jsx(Sw,{})}));
