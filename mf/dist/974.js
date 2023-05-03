/*! For license information please see 974.js.LICENSE.txt */
"use strict";(self.webpackChunkmf=self.webpackChunkmf||[]).push([[974],{974:(e,t,n)=>{n.d(t,{AW:()=>O,TH:()=>$,UO:()=>b,WU:()=>w,Z5:()=>j,j3:()=>E,oQ:()=>P,s0:()=>S});var a=n(648),r=n(416);const l=(0,r.createContext)(null),s=(0,r.createContext)(null),i=(0,r.createContext)({outlet:null,matches:[]});function h(e,t){if(!e)throw new Error(t)}function u(e,t,n){void 0===n&&(n="/");let r=function(e,t){if("/"===t)return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=e.charAt(t.length);return n&&"/"!==n?null:e.slice(t.length)||"/"}(("string"==typeof t?(0,a.cP)(t):t).pathname||"/",n);if(null==r)return null;let l=c(e);!function(e){e.sort(((e,t)=>e.score!==t.score?t.score-e.score:function(e,t){return e.length===t.length&&e.slice(0,-1).every(((e,n)=>e===t[n]))?e[e.length-1]-t[t.length-1]:0}(e.routesMeta.map((e=>e.childrenIndex)),t.routesMeta.map((e=>e.childrenIndex)))))}(l);let s=null;for(let e=0;null==s&&e<l.length;++e)s=f(l[e],r);return s}function c(e,t,n,a){return void 0===t&&(t=[]),void 0===n&&(n=[]),void 0===a&&(a=""),e.forEach(((e,r)=>{let l={relativePath:e.path||"",caseSensitive:!0===e.caseSensitive,childrenIndex:r,route:e};l.relativePath.startsWith("/")&&(l.relativePath.startsWith(a)||h(!1),l.relativePath=l.relativePath.slice(a.length));let s=v([a,l.relativePath]),i=n.concat(l);e.children&&e.children.length>0&&(!0===e.index&&h(!1),c(e.children,t,i,s)),(null!=e.path||e.index)&&t.push({path:s,score:m(s,e.index),routesMeta:i})})),t}const o=/^:\w+$/,p=e=>"*"===e;function m(e,t){let n=e.split("/"),a=n.length;return n.some(p)&&(a+=-2),t&&(a+=2),n.filter((e=>!p(e))).reduce(((e,t)=>e+(o.test(t)?3:""===t?1:10)),a)}function f(e,t){let{routesMeta:n}=e,a={},r="/",l=[];for(let e=0;e<n.length;++e){let s=n[e],i=e===n.length-1,h="/"===r?t:t.slice(r.length)||"/",u=d({path:s.relativePath,caseSensitive:s.caseSensitive,end:i},h);if(!u)return null;Object.assign(a,u.params);let c=s.route;l.push({params:a,pathname:v([r,u.pathname]),pathnameBase:x(v([r,u.pathnameBase])),route:c}),"/"!==u.pathnameBase&&(r=v([r,u.pathnameBase]))}return l}function d(e,t){"string"==typeof e&&(e={path:e,caseSensitive:!1,end:!0});let[n,a]=function(e,t,n){void 0===t&&(t=!1),void 0===n&&(n=!0);let a=[],r="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^$?{}|()[\]]/g,"\\$&").replace(/:(\w+)/g,((e,t)=>(a.push(t),"([^\\/]+)")));return e.endsWith("*")?(a.push("*"),r+="*"===e||"/*"===e?"(.*)$":"(?:\\/(.+)|\\/*)$"):r+=n?"\\/*$":"(?:(?=[.~-]|%[0-9A-F]{2})|\\b|\\/|$)",[new RegExp(r,t?void 0:"i"),a]}(e.path,e.caseSensitive,e.end),r=t.match(n);if(!r)return null;let l=r[0],s=l.replace(/(.)\/+$/,"$1"),i=r.slice(1);return{params:a.reduce(((e,t,n)=>{if("*"===t){let e=i[n]||"";s=l.slice(0,l.length-e.length).replace(/(.)\/+$/,"$1")}return e[t]=function(e,t){try{return decodeURIComponent(e)}catch(t){return e}}(i[n]||""),e}),{}),pathname:l,pathnameBase:s,pattern:e}}function g(e,t,n){let r,l="string"==typeof e?(0,a.cP)(e):e,s=""===e||""===l.pathname?"/":l.pathname;if(null==s)r=n;else{let e=t.length-1;if(s.startsWith("..")){let t=s.split("/");for(;".."===t[0];)t.shift(),e-=1;l.pathname=t.join("/")}r=e>=0?t[e]:"/"}let i=function(e,t){void 0===t&&(t="/");let{pathname:n,search:r="",hash:l=""}="string"==typeof e?(0,a.cP)(e):e,s=n?n.startsWith("/")?n:function(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach((e=>{".."===e?n.length>1&&n.pop():"."!==e&&n.push(e)})),n.length>1?n.join("/"):"/"}(n,t):t;return{pathname:s,search:C(r),hash:y(l)}}(l,r);return s&&"/"!==s&&s.endsWith("/")&&!i.pathname.endsWith("/")&&(i.pathname+="/"),i}const v=e=>e.join("/").replace(/\/\/+/g,"/"),x=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),C=e=>e&&"?"!==e?e.startsWith("?")?e:"?"+e:"",y=e=>e&&"#"!==e?e.startsWith("#")?e:"#"+e:"";function P(e){W()||h(!1);let{basename:t,navigator:n}=(0,r.useContext)(l),{hash:s,pathname:i,search:u}=w(e),c=i;if("/"!==t){let n=function(e){return""===e||""===e.pathname?"/":"string"==typeof e?(0,a.cP)(e).pathname:e.pathname}(e),r=null!=n&&n.endsWith("/");c="/"===i?t+(r?"/":""):v([t,i])}return n.createHref({pathname:c,search:u,hash:s})}function W(){return null!=(0,r.useContext)(s)}function $(){return W()||h(!1),(0,r.useContext)(s).location}function S(){W()||h(!1);let{basename:e,navigator:t}=(0,r.useContext)(l),{matches:n}=(0,r.useContext)(i),{pathname:a}=$(),s=JSON.stringify(n.map((e=>e.pathnameBase))),u=(0,r.useRef)(!1);return(0,r.useEffect)((()=>{u.current=!0})),(0,r.useCallback)((function(n,r){if(void 0===r&&(r={}),!u.current)return;if("number"==typeof n)return void t.go(n);let l=g(n,JSON.parse(s),a);"/"!==e&&(l.pathname=v([e,l.pathname])),(r.replace?t.replace:t.push)(l,r.state)}),[e,t,s,a])}const B=(0,r.createContext)(null);function b(){let{matches:e}=(0,r.useContext)(i),t=e[e.length-1];return t?t.params:{}}function w(e){let{matches:t}=(0,r.useContext)(i),{pathname:n}=$(),a=JSON.stringify(t.map((e=>e.pathnameBase)));return(0,r.useMemo)((()=>g(e,JSON.parse(a),n)),[e,a,n])}function E(e){return function(e){let t=(0,r.useContext)(i).outlet;return t?(0,r.createElement)(B.Provider,{value:e},t):t}(e.context)}function O(e){h(!1)}function j(e){let{children:t,location:n}=e;return function(e,t){W()||h(!1);let{matches:n}=(0,r.useContext)(i),l=n[n.length-1],s=l?l.params:{},c=(l&&l.pathname,l?l.pathnameBase:"/");l&&l.route;let o,p=$();if(t){var m;let e="string"==typeof t?(0,a.cP)(t):t;"/"===c||(null==(m=e.pathname)?void 0:m.startsWith(c))||h(!1),o=e}else o=p;let f=o.pathname||"/",d=u(e,{pathname:"/"===c?f:f.slice(c.length)||"/"});return function(e,t){return void 0===t&&(t=[]),null==e?null:e.reduceRight(((n,a,l)=>(0,r.createElement)(i.Provider,{children:void 0!==a.route.element?a.route.element:n,value:{outlet:n,matches:t.concat(e.slice(0,l+1))}})),null)}(d&&d.map((e=>Object.assign({},e,{params:Object.assign({},s,e.params),pathname:v([c,e.pathname]),pathnameBase:"/"===e.pathnameBase?c:v([c,e.pathnameBase])}))),n)}(k(t),n)}function k(e){let t=[];return r.Children.forEach(e,(e=>{if(!(0,r.isValidElement)(e))return;if(e.type===r.Fragment)return void t.push.apply(t,k(e.props.children));e.type!==O&&h(!1);let n={caseSensitive:e.props.caseSensitive,element:e.props.element,index:e.props.index,path:e.props.path};e.props.children&&(n.children=k(e.props.children)),t.push(n)})),t}}}]);