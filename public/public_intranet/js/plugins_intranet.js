/*
 Copyright (C) Federico Zivolo 2017
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */(function(e,t){'object'==typeof exports&&'undefined'!=typeof module?module.exports=t():'function'==typeof define&&define.amd?define(t):e.Popper=t()})(this,function(){'use strict';function e(e){return e&&'[object Function]'==={}.toString.call(e)}function t(e,t){if(1!==e.nodeType)return[];var o=getComputedStyle(e,null);return t?o[t]:o}function o(e){return'HTML'===e.nodeName?e:e.parentNode||e.host}function n(e){if(!e)return document.body;switch(e.nodeName){case'HTML':case'BODY':return e.ownerDocument.body;case'#document':return e.body;}var i=t(e),r=i.overflow,p=i.overflowX,s=i.overflowY;return /(auto|scroll)/.test(r+s+p)?e:n(o(e))}function r(e){var o=e&&e.offsetParent,i=o&&o.nodeName;return i&&'BODY'!==i&&'HTML'!==i?-1!==['TD','TABLE'].indexOf(o.nodeName)&&'static'===t(o,'position')?r(o):o:e?e.ownerDocument.documentElement:document.documentElement}function p(e){var t=e.nodeName;return'BODY'!==t&&('HTML'===t||r(e.firstElementChild)===e)}function s(e){return null===e.parentNode?e:s(e.parentNode)}function d(e,t){if(!e||!e.nodeType||!t||!t.nodeType)return document.documentElement;var o=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,i=o?e:t,n=o?t:e,a=document.createRange();a.setStart(i,0),a.setEnd(n,0);var l=a.commonAncestorContainer;if(e!==l&&t!==l||i.contains(n))return p(l)?l:r(l);var f=s(e);return f.host?d(f.host,t):d(e,s(t).host)}function a(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:'top',o='top'===t?'scrollTop':'scrollLeft',i=e.nodeName;if('BODY'===i||'HTML'===i){var n=e.ownerDocument.documentElement,r=e.ownerDocument.scrollingElement||n;return r[o]}return e[o]}function l(e,t){var o=2<arguments.length&&void 0!==arguments[2]&&arguments[2],i=a(t,'top'),n=a(t,'left'),r=o?-1:1;return e.top+=i*r,e.bottom+=i*r,e.left+=n*r,e.right+=n*r,e}function f(e,t){var o='x'===t?'Left':'Top',i='Left'==o?'Right':'Bottom';return parseFloat(e['border'+o+'Width'],10)+parseFloat(e['border'+i+'Width'],10)}function m(e,t,o,i){return J(t['offset'+e],t['scroll'+e],o['client'+e],o['offset'+e],o['scroll'+e],ie()?o['offset'+e]+i['margin'+('Height'===e?'Top':'Left')]+i['margin'+('Height'===e?'Bottom':'Right')]:0)}function h(){var e=document.body,t=document.documentElement,o=ie()&&getComputedStyle(t);return{height:m('Height',e,t,o),width:m('Width',e,t,o)}}function c(e){return se({},e,{right:e.left+e.width,bottom:e.top+e.height})}function g(e){var o={};if(ie())try{o=e.getBoundingClientRect();var i=a(e,'top'),n=a(e,'left');o.top+=i,o.left+=n,o.bottom+=i,o.right+=n}catch(e){}else o=e.getBoundingClientRect();var r={left:o.left,top:o.top,width:o.right-o.left,height:o.bottom-o.top},p='HTML'===e.nodeName?h():{},s=p.width||e.clientWidth||r.right-r.left,d=p.height||e.clientHeight||r.bottom-r.top,l=e.offsetWidth-s,m=e.offsetHeight-d;if(l||m){var g=t(e);l-=f(g,'x'),m-=f(g,'y'),r.width-=l,r.height-=m}return c(r)}function u(e,o){var i=ie(),r='HTML'===o.nodeName,p=g(e),s=g(o),d=n(e),a=t(o),f=parseFloat(a.borderTopWidth,10),m=parseFloat(a.borderLeftWidth,10),h=c({top:p.top-s.top-f,left:p.left-s.left-m,width:p.width,height:p.height});if(h.marginTop=0,h.marginLeft=0,!i&&r){var u=parseFloat(a.marginTop,10),b=parseFloat(a.marginLeft,10);h.top-=f-u,h.bottom-=f-u,h.left-=m-b,h.right-=m-b,h.marginTop=u,h.marginLeft=b}return(i?o.contains(d):o===d&&'BODY'!==d.nodeName)&&(h=l(h,o)),h}function b(e){var t=e.ownerDocument.documentElement,o=u(e,t),i=J(t.clientWidth,window.innerWidth||0),n=J(t.clientHeight,window.innerHeight||0),r=a(t),p=a(t,'left'),s={top:r-o.top+o.marginTop,left:p-o.left+o.marginLeft,width:i,height:n};return c(s)}function w(e){var i=e.nodeName;return'BODY'===i||'HTML'===i?!1:'fixed'===t(e,'position')||w(o(e))}function y(e,t,i,r){var p={top:0,left:0},s=d(e,t);if('viewport'===r)p=b(s);else{var a;'scrollParent'===r?(a=n(o(t)),'BODY'===a.nodeName&&(a=e.ownerDocument.documentElement)):'window'===r?a=e.ownerDocument.documentElement:a=r;var l=u(a,s);if('HTML'===a.nodeName&&!w(s)){var f=h(),m=f.height,c=f.width;p.top+=l.top-l.marginTop,p.bottom=m+l.top,p.left+=l.left-l.marginLeft,p.right=c+l.left}else p=l}return p.left+=i,p.top+=i,p.right-=i,p.bottom-=i,p}function E(e){var t=e.width,o=e.height;return t*o}function v(e,t,o,i,n){var r=5<arguments.length&&void 0!==arguments[5]?arguments[5]:0;if(-1===e.indexOf('auto'))return e;var p=y(o,i,r,n),s={top:{width:p.width,height:t.top-p.top},right:{width:p.right-t.right,height:p.height},bottom:{width:p.width,height:p.bottom-t.bottom},left:{width:t.left-p.left,height:p.height}},d=Object.keys(s).map(function(e){return se({key:e},s[e],{area:E(s[e])})}).sort(function(e,t){return t.area-e.area}),a=d.filter(function(e){var t=e.width,i=e.height;return t>=o.clientWidth&&i>=o.clientHeight}),l=0<a.length?a[0].key:d[0].key,f=e.split('-')[1];return l+(f?'-'+f:'')}function O(e,t,o){var i=d(t,o);return u(o,i)}function L(e){var t=getComputedStyle(e),o=parseFloat(t.marginTop)+parseFloat(t.marginBottom),i=parseFloat(t.marginLeft)+parseFloat(t.marginRight),n={width:e.offsetWidth+i,height:e.offsetHeight+o};return n}function x(e){var t={left:'right',right:'left',bottom:'top',top:'bottom'};return e.replace(/left|right|bottom|top/g,function(e){return t[e]})}function S(e,t,o){o=o.split('-')[0];var i=L(e),n={width:i.width,height:i.height},r=-1!==['right','left'].indexOf(o),p=r?'top':'left',s=r?'left':'top',d=r?'height':'width',a=r?'width':'height';return n[p]=t[p]+t[d]/2-i[d]/2,n[s]=o===s?t[s]-i[a]:t[x(s)],n}function T(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function D(e,t,o){if(Array.prototype.findIndex)return e.findIndex(function(e){return e[t]===o});var i=T(e,function(e){return e[t]===o});return e.indexOf(i)}function C(t,o,i){var n=void 0===i?t:t.slice(0,D(t,'name',i));return n.forEach(function(t){t['function']&&console.warn('`modifier.function` is deprecated, use `modifier.fn`!');var i=t['function']||t.fn;t.enabled&&e(i)&&(o.offsets.popper=c(o.offsets.popper),o.offsets.reference=c(o.offsets.reference),o=i(o,t))}),o}function N(){if(!this.state.isDestroyed){var e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=O(this.state,this.popper,this.reference),e.placement=v(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.offsets.popper=S(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position='absolute',e=C(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}function k(e,t){return e.some(function(e){var o=e.name,i=e.enabled;return i&&o===t})}function W(e){for(var t=[!1,'ms','Webkit','Moz','O'],o=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<t.length-1;n++){var i=t[n],r=i?''+i+o:e;if('undefined'!=typeof document.body.style[r])return r}return null}function P(){return this.state.isDestroyed=!0,k(this.modifiers,'applyStyle')&&(this.popper.removeAttribute('x-placement'),this.popper.style.left='',this.popper.style.position='',this.popper.style.top='',this.popper.style[W('transform')]=''),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function B(e){var t=e.ownerDocument;return t?t.defaultView:window}function H(e,t,o,i){var r='BODY'===e.nodeName,p=r?e.ownerDocument.defaultView:e;p.addEventListener(t,o,{passive:!0}),r||H(n(p.parentNode),t,o,i),i.push(p)}function A(e,t,o,i){o.updateBound=i,B(e).addEventListener('resize',o.updateBound,{passive:!0});var r=n(e);return H(r,'scroll',o.updateBound,o.scrollParents),o.scrollElement=r,o.eventsEnabled=!0,o}function I(){this.state.eventsEnabled||(this.state=A(this.reference,this.options,this.state,this.scheduleUpdate))}function M(e,t){return B(e).removeEventListener('resize',t.updateBound),t.scrollParents.forEach(function(e){e.removeEventListener('scroll',t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}function R(){this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=M(this.reference,this.state))}function U(e){return''!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function Y(e,t){Object.keys(t).forEach(function(o){var i='';-1!==['width','height','top','right','bottom','left'].indexOf(o)&&U(t[o])&&(i='px'),e.style[o]=t[o]+i})}function j(e,t){Object.keys(t).forEach(function(o){var i=t[o];!1===i?e.removeAttribute(o):e.setAttribute(o,t[o])})}function F(e,t,o){var i=T(e,function(e){var o=e.name;return o===t}),n=!!i&&e.some(function(e){return e.name===o&&e.enabled&&e.order<i.order});if(!n){var r='`'+t+'`';console.warn('`'+o+'`'+' modifier is required by '+r+' modifier in order to work, be sure to include it before '+r+'!')}return n}function K(e){return'end'===e?'start':'start'===e?'end':e}function q(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1],o=ae.indexOf(e),i=ae.slice(o+1).concat(ae.slice(0,o));return t?i.reverse():i}function V(e,t,o,i){var n=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),r=+n[1],p=n[2];if(!r)return e;if(0===p.indexOf('%')){var s;switch(p){case'%p':s=o;break;case'%':case'%r':default:s=i;}var d=c(s);return d[t]/100*r}if('vh'===p||'vw'===p){var a;return a='vh'===p?J(document.documentElement.clientHeight,window.innerHeight||0):J(document.documentElement.clientWidth,window.innerWidth||0),a/100*r}return r}function z(e,t,o,i){var n=[0,0],r=-1!==['right','left'].indexOf(i),p=e.split(/(\+|\-)/).map(function(e){return e.trim()}),s=p.indexOf(T(p,function(e){return-1!==e.search(/,|\s/)}));p[s]&&-1===p[s].indexOf(',')&&console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');var d=/\s*,\s*|\s+/,a=-1===s?[p]:[p.slice(0,s).concat([p[s].split(d)[0]]),[p[s].split(d)[1]].concat(p.slice(s+1))];return a=a.map(function(e,i){var n=(1===i?!r:r)?'height':'width',p=!1;return e.reduce(function(e,t){return''===e[e.length-1]&&-1!==['+','-'].indexOf(t)?(e[e.length-1]=t,p=!0,e):p?(e[e.length-1]+=t,p=!1,e):e.concat(t)},[]).map(function(e){return V(e,n,t,o)})}),a.forEach(function(e,t){e.forEach(function(o,i){U(o)&&(n[t]+=o*('-'===e[i-1]?-1:1))})}),n}function G(e,t){var o,i=t.offset,n=e.placement,r=e.offsets,p=r.popper,s=r.reference,d=n.split('-')[0];return o=U(+i)?[+i,0]:z(i,p,s,d),'left'===d?(p.top+=o[0],p.left-=o[1]):'right'===d?(p.top+=o[0],p.left+=o[1]):'top'===d?(p.left+=o[0],p.top-=o[1]):'bottom'===d&&(p.left+=o[0],p.top+=o[1]),e.popper=p,e}for(var _=Math.min,X=Math.floor,J=Math.max,Q='undefined'!=typeof window&&'undefined'!=typeof document,Z=['Edge','Trident','Firefox'],$=0,ee=0;ee<Z.length;ee+=1)if(Q&&0<=navigator.userAgent.indexOf(Z[ee])){$=1;break}var i,te=Q&&window.Promise,oe=te?function(e){var t=!1;return function(){t||(t=!0,window.Promise.resolve().then(function(){t=!1,e()}))}}:function(e){var t=!1;return function(){t||(t=!0,setTimeout(function(){t=!1,e()},$))}},ie=function(){return void 0==i&&(i=-1!==navigator.appVersion.indexOf('MSIE 10')),i},ne=function(e,t){if(!(e instanceof t))throw new TypeError('Cannot call a class as a function')},re=function(){function e(e,t){for(var o,n=0;n<t.length;n++)o=t[n],o.enumerable=o.enumerable||!1,o.configurable=!0,'value'in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}return function(t,o,i){return o&&e(t.prototype,o),i&&e(t,i),t}}(),pe=function(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e},se=Object.assign||function(e){for(var t,o=1;o<arguments.length;o++)for(var i in t=arguments[o],t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},de=['auto-start','auto','auto-end','top-start','top','top-end','right-start','right','right-end','bottom-end','bottom','bottom-start','left-end','left','left-start'],ae=de.slice(3),le={FLIP:'flip',CLOCKWISE:'clockwise',COUNTERCLOCKWISE:'counterclockwise'},fe=function(){function t(o,i){var n=this,r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};ne(this,t),this.scheduleUpdate=function(){return requestAnimationFrame(n.update)},this.update=oe(this.update.bind(this)),this.options=se({},t.Defaults,r),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=o&&o.jquery?o[0]:o,this.popper=i&&i.jquery?i[0]:i,this.options.modifiers={},Object.keys(se({},t.Defaults.modifiers,r.modifiers)).forEach(function(e){n.options.modifiers[e]=se({},t.Defaults.modifiers[e]||{},r.modifiers?r.modifiers[e]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(e){return se({name:e},n.options.modifiers[e])}).sort(function(e,t){return e.order-t.order}),this.modifiers.forEach(function(t){t.enabled&&e(t.onLoad)&&t.onLoad(n.reference,n.popper,n.options,t,n.state)}),this.update();var p=this.options.eventsEnabled;p&&this.enableEventListeners(),this.state.eventsEnabled=p}return re(t,[{key:'update',value:function(){return N.call(this)}},{key:'destroy',value:function(){return P.call(this)}},{key:'enableEventListeners',value:function(){return I.call(this)}},{key:'disableEventListeners',value:function(){return R.call(this)}}]),t}();return fe.Utils=('undefined'==typeof window?global:window).PopperUtils,fe.placements=de,fe.Defaults={placement:'bottom',eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(e){var t=e.placement,o=t.split('-')[0],i=t.split('-')[1];if(i){var n=e.offsets,r=n.reference,p=n.popper,s=-1!==['bottom','top'].indexOf(o),d=s?'left':'top',a=s?'width':'height',l={start:pe({},d,r[d]),end:pe({},d,r[d]+r[a]-p[a])};e.offsets.popper=se({},p,l[i])}return e}},offset:{order:200,enabled:!0,fn:G,offset:0},preventOverflow:{order:300,enabled:!0,fn:function(e,t){var o=t.boundariesElement||r(e.instance.popper);e.instance.reference===o&&(o=r(o));var i=y(e.instance.popper,e.instance.reference,t.padding,o);t.boundaries=i;var n=t.priority,p=e.offsets.popper,s={primary:function(e){var o=p[e];return p[e]<i[e]&&!t.escapeWithReference&&(o=J(p[e],i[e])),pe({},e,o)},secondary:function(e){var o='right'===e?'left':'top',n=p[o];return p[e]>i[e]&&!t.escapeWithReference&&(n=_(p[o],i[e]-('right'===e?p.width:p.height))),pe({},o,n)}};return n.forEach(function(e){var t=-1===['left','top'].indexOf(e)?'secondary':'primary';p=se({},p,s[t](e))}),e.offsets.popper=p,e},priority:['left','right','top','bottom'],padding:5,boundariesElement:'scrollParent'},keepTogether:{order:400,enabled:!0,fn:function(e){var t=e.offsets,o=t.popper,i=t.reference,n=e.placement.split('-')[0],r=X,p=-1!==['top','bottom'].indexOf(n),s=p?'right':'bottom',d=p?'left':'top',a=p?'width':'height';return o[s]<r(i[d])&&(e.offsets.popper[d]=r(i[d])-o[a]),o[d]>r(i[s])&&(e.offsets.popper[d]=r(i[s])),e}},arrow:{order:500,enabled:!0,fn:function(e,o){var i;if(!F(e.instance.modifiers,'arrow','keepTogether'))return e;var n=o.element;if('string'==typeof n){if(n=e.instance.popper.querySelector(n),!n)return e;}else if(!e.instance.popper.contains(n))return console.warn('WARNING: `arrow.element` must be child of its popper element!'),e;var r=e.placement.split('-')[0],p=e.offsets,s=p.popper,d=p.reference,a=-1!==['left','right'].indexOf(r),l=a?'height':'width',f=a?'Top':'Left',m=f.toLowerCase(),h=a?'left':'top',g=a?'bottom':'right',u=L(n)[l];d[g]-u<s[m]&&(e.offsets.popper[m]-=s[m]-(d[g]-u)),d[m]+u>s[g]&&(e.offsets.popper[m]+=d[m]+u-s[g]),e.offsets.popper=c(e.offsets.popper);var b=d[m]+d[l]/2-u/2,w=t(e.instance.popper),y=parseFloat(w['margin'+f],10),E=parseFloat(w['border'+f+'Width'],10),v=b-e.offsets.popper[m]-y-E;return v=J(_(s[l]-u,v),0),e.arrowElement=n,e.offsets.arrow=(i={},pe(i,m,Math.round(v)),pe(i,h,''),i),e},element:'[x-arrow]'},flip:{order:600,enabled:!0,fn:function(e,t){if(k(e.instance.modifiers,'inner'))return e;if(e.flipped&&e.placement===e.originalPlacement)return e;var o=y(e.instance.popper,e.instance.reference,t.padding,t.boundariesElement),i=e.placement.split('-')[0],n=x(i),r=e.placement.split('-')[1]||'',p=[];switch(t.behavior){case le.FLIP:p=[i,n];break;case le.CLOCKWISE:p=q(i);break;case le.COUNTERCLOCKWISE:p=q(i,!0);break;default:p=t.behavior;}return p.forEach(function(s,d){if(i!==s||p.length===d+1)return e;i=e.placement.split('-')[0],n=x(i);var a=e.offsets.popper,l=e.offsets.reference,f=X,m='left'===i&&f(a.right)>f(l.left)||'right'===i&&f(a.left)<f(l.right)||'top'===i&&f(a.bottom)>f(l.top)||'bottom'===i&&f(a.top)<f(l.bottom),h=f(a.left)<f(o.left),c=f(a.right)>f(o.right),g=f(a.top)<f(o.top),u=f(a.bottom)>f(o.bottom),b='left'===i&&h||'right'===i&&c||'top'===i&&g||'bottom'===i&&u,w=-1!==['top','bottom'].indexOf(i),y=!!t.flipVariations&&(w&&'start'===r&&h||w&&'end'===r&&c||!w&&'start'===r&&g||!w&&'end'===r&&u);(m||b||y)&&(e.flipped=!0,(m||b)&&(i=p[d+1]),y&&(r=K(r)),e.placement=i+(r?'-'+r:''),e.offsets.popper=se({},e.offsets.popper,S(e.instance.popper,e.offsets.reference,e.placement)),e=C(e.instance.modifiers,e,'flip'))}),e},behavior:'flip',padding:5,boundariesElement:'viewport'},inner:{order:700,enabled:!1,fn:function(e){var t=e.placement,o=t.split('-')[0],i=e.offsets,n=i.popper,r=i.reference,p=-1!==['left','right'].indexOf(o),s=-1===['top','left'].indexOf(o);return n[p?'left':'top']=r[o]-(s?n[p?'width':'height']:0),e.placement=x(t),e.offsets.popper=c(n),e}},hide:{order:800,enabled:!0,fn:function(e){if(!F(e.instance.modifiers,'hide','preventOverflow'))return e;var t=e.offsets.reference,o=T(e.instance.modifiers,function(e){return'preventOverflow'===e.name}).boundaries;if(t.bottom<o.top||t.left>o.right||t.top>o.bottom||t.right<o.left){if(!0===e.hide)return e;e.hide=!0,e.attributes['x-out-of-boundaries']=''}else{if(!1===e.hide)return e;e.hide=!1,e.attributes['x-out-of-boundaries']=!1}return e}},computeStyle:{order:850,enabled:!0,fn:function(e,t){var o=t.x,i=t.y,n=e.offsets.popper,p=T(e.instance.modifiers,function(e){return'applyStyle'===e.name}).gpuAcceleration;void 0!==p&&console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');var s,d,a=void 0===p?t.gpuAcceleration:p,l=r(e.instance.popper),f=g(l),m={position:n.position},h={left:X(n.left),top:X(n.top),bottom:X(n.bottom),right:X(n.right)},c='bottom'===o?'top':'bottom',u='right'===i?'left':'right',b=W('transform');if(d='bottom'==c?-f.height+h.bottom:h.top,s='right'==u?-f.width+h.right:h.left,a&&b)m[b]='translate3d('+s+'px, '+d+'px, 0)',m[c]=0,m[u]=0,m.willChange='transform';else{var w='bottom'==c?-1:1,y='right'==u?-1:1;m[c]=d*w,m[u]=s*y,m.willChange=c+', '+u}var E={"x-placement":e.placement};return e.attributes=se({},E,e.attributes),e.styles=se({},m,e.styles),e.arrowStyles=se({},e.offsets.arrow,e.arrowStyles),e},gpuAcceleration:!0,x:'bottom',y:'right'},applyStyle:{order:900,enabled:!0,fn:function(e){return Y(e.instance.popper,e.styles),j(e.instance.popper,e.attributes),e.arrowElement&&Object.keys(e.arrowStyles).length&&Y(e.arrowElement,e.arrowStyles),e},onLoad:function(e,t,o,i,n){var r=O(n,t,e),p=v(o.placement,r,t,e,o.modifiers.flip.boundariesElement,o.modifiers.flip.padding);return t.setAttribute('x-placement',p),Y(t,{position:'absolute'}),o},gpuAcceleration:void 0}}},fe});
//# sourceMappingURL=popper.min.js.map

/* perfect-scrollbar v0.7.1 */
!function t(e,n,r){function o(i,s){if(!n[i]){if(!e[i]){var a="function"==typeof require&&require;if(!s&&a)return a(i,!0);if(l)return l(i,!0);var c=new Error("Cannot find module '"+i+"'");throw c.code="MODULE_NOT_FOUND",c}var u=n[i]={exports:{}};e[i][0].call(u.exports,function(t){var n=e[i][1][t];return o(n?n:t)},u,u.exports,t,e,n,r)}return n[i].exports}for(var l="function"==typeof require&&require,i=0;i<r.length;i++)o(r[i]);return o}({1:[function(t,e,n){"use strict";function r(t){t.fn.perfectScrollbar=function(t){return this.each(function(){if("object"==typeof t||"undefined"==typeof t){var e=t;l.get(this)||o.initialize(this,e)}else{var n=t;"update"===n?o.update(this):"destroy"===n&&o.destroy(this)}})}}var o=t("../main"),l=t("../plugin/instances");if("function"==typeof define&&define.amd)define(["jquery"],r);else{var i=window.jQuery?window.jQuery:window.$;"undefined"!=typeof i&&r(i)}e.exports=r},{"../main":7,"../plugin/instances":18}],2:[function(t,e,n){"use strict";function r(t,e){var n=t.className.split(" ");n.indexOf(e)<0&&n.push(e),t.className=n.join(" ")}function o(t,e){var n=t.className.split(" "),r=n.indexOf(e);r>=0&&n.splice(r,1),t.className=n.join(" ")}n.add=function(t,e){t.classList?t.classList.add(e):r(t,e)},n.remove=function(t,e){t.classList?t.classList.remove(e):o(t,e)},n.list=function(t){return t.classList?Array.prototype.slice.apply(t.classList):t.className.split(" ")}},{}],3:[function(t,e,n){"use strict";function r(t,e){return window.getComputedStyle(t)[e]}function o(t,e,n){return"number"==typeof n&&(n=n.toString()+"px"),t.style[e]=n,t}function l(t,e){for(var n in e){var r=e[n];"number"==typeof r&&(r=r.toString()+"px"),t.style[n]=r}return t}var i={};i.e=function(t,e){var n=document.createElement(t);return n.className=e,n},i.appendTo=function(t,e){return e.appendChild(t),t},i.css=function(t,e,n){return"object"==typeof e?l(t,e):"undefined"==typeof n?r(t,e):o(t,e,n)},i.matches=function(t,e){return"undefined"!=typeof t.matches?t.matches(e):"undefined"!=typeof t.matchesSelector?t.matchesSelector(e):"undefined"!=typeof t.webkitMatchesSelector?t.webkitMatchesSelector(e):"undefined"!=typeof t.mozMatchesSelector?t.mozMatchesSelector(e):"undefined"!=typeof t.msMatchesSelector?t.msMatchesSelector(e):void 0},i.remove=function(t){"undefined"!=typeof t.remove?t.remove():t.parentNode&&t.parentNode.removeChild(t)},i.queryChildren=function(t,e){return Array.prototype.filter.call(t.childNodes,function(t){return i.matches(t,e)})},e.exports=i},{}],4:[function(t,e,n){"use strict";var r=function(t){this.element=t,this.events={}};r.prototype.bind=function(t,e){"undefined"==typeof this.events[t]&&(this.events[t]=[]),this.events[t].push(e),this.element.addEventListener(t,e,!1)},r.prototype.unbind=function(t,e){var n="undefined"!=typeof e;this.events[t]=this.events[t].filter(function(r){return!(!n||r===e)||(this.element.removeEventListener(t,r,!1),!1)},this)},r.prototype.unbindAll=function(){for(var t in this.events)this.unbind(t)};var o=function(){this.eventElements=[]};o.prototype.eventElement=function(t){var e=this.eventElements.filter(function(e){return e.element===t})[0];return"undefined"==typeof e&&(e=new r(t),this.eventElements.push(e)),e},o.prototype.bind=function(t,e,n){this.eventElement(t).bind(e,n)},o.prototype.unbind=function(t,e,n){this.eventElement(t).unbind(e,n)},o.prototype.unbindAll=function(){for(var t=0;t<this.eventElements.length;t++)this.eventElements[t].unbindAll()},o.prototype.once=function(t,e,n){var r=this.eventElement(t),o=function(t){r.unbind(e,o),n(t)};r.bind(e,o)},e.exports=o},{}],5:[function(t,e,n){"use strict";e.exports=function(){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return function(){return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()}}()},{}],6:[function(t,e,n){"use strict";function r(t){return function(e,n){t(e,"ps--in-scrolling"),"undefined"!=typeof n?t(e,"ps--"+n):(t(e,"ps--x"),t(e,"ps--y"))}}var o=t("./class"),l=t("./dom"),i=n.toInt=function(t){return parseInt(t,10)||0},s=n.clone=function(t){if(t){if(Array.isArray(t))return t.map(s);if("object"==typeof t){var e={};for(var n in t)e[n]=s(t[n]);return e}return t}return null};n.extend=function(t,e){var n=s(t);for(var r in e)n[r]=s(e[r]);return n},n.isEditable=function(t){return l.matches(t,"input,[contenteditable]")||l.matches(t,"select,[contenteditable]")||l.matches(t,"textarea,[contenteditable]")||l.matches(t,"button,[contenteditable]")},n.removePsClasses=function(t){for(var e=o.list(t),n=0;n<e.length;n++){var r=e[n];0===r.indexOf("ps-")&&o.remove(t,r)}},n.outerWidth=function(t){return i(l.css(t,"width"))+i(l.css(t,"paddingLeft"))+i(l.css(t,"paddingRight"))+i(l.css(t,"borderLeftWidth"))+i(l.css(t,"borderRightWidth"))},n.startScrolling=r(o.add),n.stopScrolling=r(o.remove),n.env={isWebKit:"undefined"!=typeof document&&"WebkitAppearance"in document.documentElement.style,supportsTouch:"undefined"!=typeof window&&("ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch),supportsIePointer:"undefined"!=typeof window&&null!==window.navigator.msMaxTouchPoints}},{"./class":2,"./dom":3}],7:[function(t,e,n){"use strict";var r=t("./plugin/destroy"),o=t("./plugin/initialize"),l=t("./plugin/update");e.exports={initialize:o,update:l,destroy:r}},{"./plugin/destroy":9,"./plugin/initialize":17,"./plugin/update":21}],8:[function(t,e,n){"use strict";e.exports={handlers:["click-rail","drag-scrollbar","keyboard","wheel","touch"],maxScrollbarLength:null,minScrollbarLength:null,scrollXMarginOffset:0,scrollYMarginOffset:0,suppressScrollX:!1,suppressScrollY:!1,swipePropagation:!0,swipeEasing:!0,useBothWheelAxes:!1,wheelPropagation:!1,wheelSpeed:1,theme:"default"}},{}],9:[function(t,e,n){"use strict";var r=t("../lib/helper"),o=t("../lib/dom"),l=t("./instances");e.exports=function(t){var e=l.get(t);e&&(e.event.unbindAll(),o.remove(e.scrollbarX),o.remove(e.scrollbarY),o.remove(e.scrollbarXRail),o.remove(e.scrollbarYRail),r.removePsClasses(t),l.remove(t))}},{"../lib/dom":3,"../lib/helper":6,"./instances":18}],10:[function(t,e,n){"use strict";function r(t,e){function n(t){return t.getBoundingClientRect()}var r=function(t){t.stopPropagation()};e.event.bind(e.scrollbarY,"click",r),e.event.bind(e.scrollbarYRail,"click",function(r){var o=r.pageY-window.pageYOffset-n(e.scrollbarYRail).top,s=o>e.scrollbarYTop?1:-1;i(t,"top",t.scrollTop+s*e.containerHeight),l(t),r.stopPropagation()}),e.event.bind(e.scrollbarX,"click",r),e.event.bind(e.scrollbarXRail,"click",function(r){var o=r.pageX-window.pageXOffset-n(e.scrollbarXRail).left,s=o>e.scrollbarXLeft?1:-1;i(t,"left",t.scrollLeft+s*e.containerWidth),l(t),r.stopPropagation()})}var o=t("../instances"),l=t("../update-geometry"),i=t("../update-scroll");e.exports=function(t){var e=o.get(t);r(t,e)}},{"../instances":18,"../update-geometry":19,"../update-scroll":20}],11:[function(t,e,n){"use strict";function r(t,e){function n(n){var o=r+n*e.railXRatio,i=Math.max(0,e.scrollbarXRail.getBoundingClientRect().left)+e.railXRatio*(e.railXWidth-e.scrollbarXWidth);o<0?e.scrollbarXLeft=0:o>i?e.scrollbarXLeft=i:e.scrollbarXLeft=o;var s=l.toInt(e.scrollbarXLeft*(e.contentWidth-e.containerWidth)/(e.containerWidth-e.railXRatio*e.scrollbarXWidth))-e.negativeScrollAdjustment;c(t,"left",s)}var r=null,o=null,s=function(e){n(e.pageX-o),a(t),e.stopPropagation(),e.preventDefault()},u=function(){l.stopScrolling(t,"x"),e.event.unbind(e.ownerDocument,"mousemove",s)};e.event.bind(e.scrollbarX,"mousedown",function(n){o=n.pageX,r=l.toInt(i.css(e.scrollbarX,"left"))*e.railXRatio,l.startScrolling(t,"x"),e.event.bind(e.ownerDocument,"mousemove",s),e.event.once(e.ownerDocument,"mouseup",u),n.stopPropagation(),n.preventDefault()})}function o(t,e){function n(n){var o=r+n*e.railYRatio,i=Math.max(0,e.scrollbarYRail.getBoundingClientRect().top)+e.railYRatio*(e.railYHeight-e.scrollbarYHeight);o<0?e.scrollbarYTop=0:o>i?e.scrollbarYTop=i:e.scrollbarYTop=o;var s=l.toInt(e.scrollbarYTop*(e.contentHeight-e.containerHeight)/(e.containerHeight-e.railYRatio*e.scrollbarYHeight));c(t,"top",s)}var r=null,o=null,s=function(e){n(e.pageY-o),a(t),e.stopPropagation(),e.preventDefault()},u=function(){l.stopScrolling(t,"y"),e.event.unbind(e.ownerDocument,"mousemove",s)};e.event.bind(e.scrollbarY,"mousedown",function(n){o=n.pageY,r=l.toInt(i.css(e.scrollbarY,"top"))*e.railYRatio,l.startScrolling(t,"y"),e.event.bind(e.ownerDocument,"mousemove",s),e.event.once(e.ownerDocument,"mouseup",u),n.stopPropagation(),n.preventDefault()})}var l=t("../../lib/helper"),i=t("../../lib/dom"),s=t("../instances"),a=t("../update-geometry"),c=t("../update-scroll");e.exports=function(t){var e=s.get(t);r(t,e),o(t,e)}},{"../../lib/dom":3,"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],12:[function(t,e,n){"use strict";function r(t,e){function n(n,r){var o=t.scrollTop;if(0===n){if(!e.scrollbarYActive)return!1;if(0===o&&r>0||o>=e.contentHeight-e.containerHeight&&r<0)return!e.settings.wheelPropagation}var l=t.scrollLeft;if(0===r){if(!e.scrollbarXActive)return!1;if(0===l&&n<0||l>=e.contentWidth-e.containerWidth&&n>0)return!e.settings.wheelPropagation}return!0}var r=!1;e.event.bind(t,"mouseenter",function(){r=!0}),e.event.bind(t,"mouseleave",function(){r=!1});var i=!1;e.event.bind(e.ownerDocument,"keydown",function(c){if(!(c.isDefaultPrevented&&c.isDefaultPrevented()||c.defaultPrevented)){var u=l.matches(e.scrollbarX,":focus")||l.matches(e.scrollbarY,":focus");if(r||u){var d=document.activeElement?document.activeElement:e.ownerDocument.activeElement;if(d){if("IFRAME"===d.tagName)d=d.contentDocument.activeElement;else for(;d.shadowRoot;)d=d.shadowRoot.activeElement;if(o.isEditable(d))return}var p=0,f=0;switch(c.which){case 37:p=c.metaKey?-e.contentWidth:c.altKey?-e.containerWidth:-30;break;case 38:f=c.metaKey?e.contentHeight:c.altKey?e.containerHeight:30;break;case 39:p=c.metaKey?e.contentWidth:c.altKey?e.containerWidth:30;break;case 40:f=c.metaKey?-e.contentHeight:c.altKey?-e.containerHeight:-30;break;case 33:f=90;break;case 32:f=c.shiftKey?90:-90;break;case 34:f=-90;break;case 35:f=c.ctrlKey?-e.contentHeight:-e.containerHeight;break;case 36:f=c.ctrlKey?t.scrollTop:e.containerHeight;break;default:return}a(t,"top",t.scrollTop-f),a(t,"left",t.scrollLeft+p),s(t),i=n(p,f),i&&c.preventDefault()}}})}var o=t("../../lib/helper"),l=t("../../lib/dom"),i=t("../instances"),s=t("../update-geometry"),a=t("../update-scroll");e.exports=function(t){var e=i.get(t);r(t,e)}},{"../../lib/dom":3,"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],13:[function(t,e,n){"use strict";function r(t,e){function n(n,r){var o=t.scrollTop;if(0===n){if(!e.scrollbarYActive)return!1;if(0===o&&r>0||o>=e.contentHeight-e.containerHeight&&r<0)return!e.settings.wheelPropagation}var l=t.scrollLeft;if(0===r){if(!e.scrollbarXActive)return!1;if(0===l&&n<0||l>=e.contentWidth-e.containerWidth&&n>0)return!e.settings.wheelPropagation}return!0}function r(t){var e=t.deltaX,n=-1*t.deltaY;return"undefined"!=typeof e&&"undefined"!=typeof n||(e=-1*t.wheelDeltaX/6,n=t.wheelDeltaY/6),t.deltaMode&&1===t.deltaMode&&(e*=10,n*=10),e!==e&&n!==n&&(e=0,n=t.wheelDelta),t.shiftKey?[-n,-e]:[e,n]}function o(e,n){var r=t.querySelector("textarea:hover, select[multiple]:hover, .ps-child:hover");if(r){var o=window.getComputedStyle(r),l=[o.overflow,o.overflowX,o.overflowY].join("");if(!l.match(/(scroll|auto)/))return!1;var i=r.scrollHeight-r.clientHeight;if(i>0&&!(0===r.scrollTop&&n>0||r.scrollTop===i&&n<0))return!0;var s=r.scrollLeft-r.clientWidth;if(s>0&&!(0===r.scrollLeft&&e<0||r.scrollLeft===s&&e>0))return!0}return!1}function s(s){var c=r(s),u=c[0],d=c[1];o(u,d)||(a=!1,e.settings.useBothWheelAxes?e.scrollbarYActive&&!e.scrollbarXActive?(d?i(t,"top",t.scrollTop-d*e.settings.wheelSpeed):i(t,"top",t.scrollTop+u*e.settings.wheelSpeed),a=!0):e.scrollbarXActive&&!e.scrollbarYActive&&(u?i(t,"left",t.scrollLeft+u*e.settings.wheelSpeed):i(t,"left",t.scrollLeft-d*e.settings.wheelSpeed),a=!0):(i(t,"top",t.scrollTop-d*e.settings.wheelSpeed),i(t,"left",t.scrollLeft+u*e.settings.wheelSpeed)),l(t),a=a||n(u,d),a&&(s.stopPropagation(),s.preventDefault()))}var a=!1;"undefined"!=typeof window.onwheel?e.event.bind(t,"wheel",s):"undefined"!=typeof window.onmousewheel&&e.event.bind(t,"mousewheel",s)}var o=t("../instances"),l=t("../update-geometry"),i=t("../update-scroll");e.exports=function(t){var e=o.get(t);r(t,e)}},{"../instances":18,"../update-geometry":19,"../update-scroll":20}],14:[function(t,e,n){"use strict";function r(t,e){e.event.bind(t,"scroll",function(){l(t)})}var o=t("../instances"),l=t("../update-geometry");e.exports=function(t){var e=o.get(t);r(t,e)}},{"../instances":18,"../update-geometry":19}],15:[function(t,e,n){"use strict";function r(t,e){function n(){var t=window.getSelection?window.getSelection():document.getSelection?document.getSelection():"";return 0===t.toString().length?null:t.getRangeAt(0).commonAncestorContainer}function r(){c||(c=setInterval(function(){return l.get(t)?(s(t,"top",t.scrollTop+u.top),s(t,"left",t.scrollLeft+u.left),void i(t)):void clearInterval(c)},50))}function a(){c&&(clearInterval(c),c=null),o.stopScrolling(t)}var c=null,u={top:0,left:0},d=!1;e.event.bind(e.ownerDocument,"selectionchange",function(){t.contains(n())?d=!0:(d=!1,a())}),e.event.bind(window,"mouseup",function(){d&&(d=!1,a())}),e.event.bind(window,"keyup",function(){d&&(d=!1,a())}),e.event.bind(window,"mousemove",function(e){if(d){var n={x:e.pageX,y:e.pageY},l={left:t.offsetLeft,right:t.offsetLeft+t.offsetWidth,top:t.offsetTop,bottom:t.offsetTop+t.offsetHeight};n.x<l.left+3?(u.left=-5,o.startScrolling(t,"x")):n.x>l.right-3?(u.left=5,o.startScrolling(t,"x")):u.left=0,n.y<l.top+3?(l.top+3-n.y<5?u.top=-5:u.top=-20,o.startScrolling(t,"y")):n.y>l.bottom-3?(n.y-l.bottom+3<5?u.top=5:u.top=20,o.startScrolling(t,"y")):u.top=0,0===u.top&&0===u.left?a():r()}})}var o=t("../../lib/helper"),l=t("../instances"),i=t("../update-geometry"),s=t("../update-scroll");e.exports=function(t){var e=l.get(t);r(t,e)}},{"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],16:[function(t,e,n){"use strict";function r(t,e,n,r){function o(n,r){var o=t.scrollTop,l=t.scrollLeft,i=Math.abs(n),s=Math.abs(r);if(s>i){if(r<0&&o===e.contentHeight-e.containerHeight||r>0&&0===o)return!e.settings.swipePropagation}else if(i>s&&(n<0&&l===e.contentWidth-e.containerWidth||n>0&&0===l))return!e.settings.swipePropagation;return!0}function a(e,n){s(t,"top",t.scrollTop-n),s(t,"left",t.scrollLeft-e),i(t)}function c(){w=!0}function u(){w=!1}function d(t){return t.targetTouches?t.targetTouches[0]:t}function p(t){return!(!t.targetTouches||1!==t.targetTouches.length)||!(!t.pointerType||"mouse"===t.pointerType||t.pointerType===t.MSPOINTER_TYPE_MOUSE)}function f(t){if(p(t)){Y=!0;var e=d(t);g.pageX=e.pageX,g.pageY=e.pageY,v=(new Date).getTime(),null!==y&&clearInterval(y),t.stopPropagation()}}function h(t){if(!Y&&e.settings.swipePropagation&&f(t),!w&&Y&&p(t)){var n=d(t),r={pageX:n.pageX,pageY:n.pageY},l=r.pageX-g.pageX,i=r.pageY-g.pageY;a(l,i),g=r;var s=(new Date).getTime(),c=s-v;c>0&&(m.x=l/c,m.y=i/c,v=s),o(l,i)&&(t.stopPropagation(),t.preventDefault())}}function b(){!w&&Y&&(Y=!1,e.settings.swipeEasing&&(clearInterval(y),y=setInterval(function(){return l.get(t)&&(m.x||m.y)?Math.abs(m.x)<.01&&Math.abs(m.y)<.01?void clearInterval(y):(a(30*m.x,30*m.y),m.x*=.8,void(m.y*=.8)):void clearInterval(y)},10)))}var g={},v=0,m={},y=null,w=!1,Y=!1;n?(e.event.bind(window,"touchstart",c),e.event.bind(window,"touchend",u),e.event.bind(t,"touchstart",f),e.event.bind(t,"touchmove",h),e.event.bind(t,"touchend",b)):r&&(window.PointerEvent?(e.event.bind(window,"pointerdown",c),e.event.bind(window,"pointerup",u),e.event.bind(t,"pointerdown",f),e.event.bind(t,"pointermove",h),e.event.bind(t,"pointerup",b)):window.MSPointerEvent&&(e.event.bind(window,"MSPointerDown",c),e.event.bind(window,"MSPointerUp",u),e.event.bind(t,"MSPointerDown",f),e.event.bind(t,"MSPointerMove",h),e.event.bind(t,"MSPointerUp",b)))}var o=t("../../lib/helper"),l=t("../instances"),i=t("../update-geometry"),s=t("../update-scroll");e.exports=function(t){if(o.env.supportsTouch||o.env.supportsIePointer){var e=l.get(t);r(t,e,o.env.supportsTouch,o.env.supportsIePointer)}}},{"../../lib/helper":6,"../instances":18,"../update-geometry":19,"../update-scroll":20}],17:[function(t,e,n){"use strict";var r=t("../lib/helper"),o=t("../lib/class"),l=t("./instances"),i=t("./update-geometry"),s={"click-rail":t("./handler/click-rail"),"drag-scrollbar":t("./handler/drag-scrollbar"),keyboard:t("./handler/keyboard"),wheel:t("./handler/mouse-wheel"),touch:t("./handler/touch"),selection:t("./handler/selection")},a=t("./handler/native-scroll");e.exports=function(t,e){e="object"==typeof e?e:{},o.add(t,"ps");var n=l.add(t);n.settings=r.extend(n.settings,e),o.add(t,"ps--theme_"+n.settings.theme),n.settings.handlers.forEach(function(e){s[e](t)}),a(t),i(t)}},{"../lib/class":2,"../lib/helper":6,"./handler/click-rail":10,"./handler/drag-scrollbar":11,"./handler/keyboard":12,"./handler/mouse-wheel":13,"./handler/native-scroll":14,"./handler/selection":15,"./handler/touch":16,"./instances":18,"./update-geometry":19}],18:[function(t,e,n){"use strict";function r(t){function e(){a.add(t,"ps--focus")}function n(){a.remove(t,"ps--focus")}var r=this;r.settings=s.clone(c),r.containerWidth=null,r.containerHeight=null,r.contentWidth=null,r.contentHeight=null,r.isRtl="rtl"===u.css(t,"direction"),r.isNegativeScroll=function(){var e=t.scrollLeft,n=null;return t.scrollLeft=-1,n=t.scrollLeft<0,t.scrollLeft=e,n}(),r.negativeScrollAdjustment=r.isNegativeScroll?t.scrollWidth-t.clientWidth:0,r.event=new d,r.ownerDocument=t.ownerDocument||document,r.scrollbarXRail=u.appendTo(u.e("div","ps__scrollbar-x-rail"),t),r.scrollbarX=u.appendTo(u.e("div","ps__scrollbar-x"),r.scrollbarXRail),r.scrollbarX.setAttribute("tabindex",0),r.event.bind(r.scrollbarX,"focus",e),r.event.bind(r.scrollbarX,"blur",n),r.scrollbarXActive=null,r.scrollbarXWidth=null,r.scrollbarXLeft=null,r.scrollbarXBottom=s.toInt(u.css(r.scrollbarXRail,"bottom")),r.isScrollbarXUsingBottom=r.scrollbarXBottom===r.scrollbarXBottom,r.scrollbarXTop=r.isScrollbarXUsingBottom?null:s.toInt(u.css(r.scrollbarXRail,"top")),r.railBorderXWidth=s.toInt(u.css(r.scrollbarXRail,"borderLeftWidth"))+s.toInt(u.css(r.scrollbarXRail,"borderRightWidth")),u.css(r.scrollbarXRail,"display","block"),r.railXMarginWidth=s.toInt(u.css(r.scrollbarXRail,"marginLeft"))+s.toInt(u.css(r.scrollbarXRail,"marginRight")),u.css(r.scrollbarXRail,"display",""),r.railXWidth=null,r.railXRatio=null,r.scrollbarYRail=u.appendTo(u.e("div","ps__scrollbar-y-rail"),t),r.scrollbarY=u.appendTo(u.e("div","ps__scrollbar-y"),r.scrollbarYRail),r.scrollbarY.setAttribute("tabindex",0),r.event.bind(r.scrollbarY,"focus",e),r.event.bind(r.scrollbarY,"blur",n),r.scrollbarYActive=null,r.scrollbarYHeight=null,r.scrollbarYTop=null,r.scrollbarYRight=s.toInt(u.css(r.scrollbarYRail,"right")),r.isScrollbarYUsingRight=r.scrollbarYRight===r.scrollbarYRight,r.scrollbarYLeft=r.isScrollbarYUsingRight?null:s.toInt(u.css(r.scrollbarYRail,"left")),r.scrollbarYOuterWidth=r.isRtl?s.outerWidth(r.scrollbarY):null,r.railBorderYWidth=s.toInt(u.css(r.scrollbarYRail,"borderTopWidth"))+s.toInt(u.css(r.scrollbarYRail,"borderBottomWidth")),u.css(r.scrollbarYRail,"display","block"),r.railYMarginHeight=s.toInt(u.css(r.scrollbarYRail,"marginTop"))+s.toInt(u.css(r.scrollbarYRail,"marginBottom")),u.css(r.scrollbarYRail,"display",""),r.railYHeight=null,r.railYRatio=null}function o(t){return t.getAttribute("data-ps-id")}function l(t,e){t.setAttribute("data-ps-id",e)}function i(t){t.removeAttribute("data-ps-id")}var s=t("../lib/helper"),a=t("../lib/class"),c=t("./default-setting"),u=t("../lib/dom"),d=t("../lib/event-manager"),p=t("../lib/guid"),f={};n.add=function(t){var e=p();return l(t,e),f[e]=new r(t),f[e]},n.remove=function(t){delete f[o(t)],i(t)},n.get=function(t){return f[o(t)]}},{"../lib/class":2,"../lib/dom":3,"../lib/event-manager":4,"../lib/guid":5,"../lib/helper":6,"./default-setting":8}],19:[function(t,e,n){"use strict";function r(t,e){return t.settings.minScrollbarLength&&(e=Math.max(e,t.settings.minScrollbarLength)),t.settings.maxScrollbarLength&&(e=Math.min(e,t.settings.maxScrollbarLength)),e}function o(t,e){var n={width:e.railXWidth};e.isRtl?n.left=e.negativeScrollAdjustment+t.scrollLeft+e.containerWidth-e.contentWidth:n.left=t.scrollLeft,e.isScrollbarXUsingBottom?n.bottom=e.scrollbarXBottom-t.scrollTop:n.top=e.scrollbarXTop+t.scrollTop,s.css(e.scrollbarXRail,n);var r={top:t.scrollTop,height:e.railYHeight};e.isScrollbarYUsingRight?e.isRtl?r.right=e.contentWidth-(e.negativeScrollAdjustment+t.scrollLeft)-e.scrollbarYRight-e.scrollbarYOuterWidth:r.right=e.scrollbarYRight-t.scrollLeft:e.isRtl?r.left=e.negativeScrollAdjustment+t.scrollLeft+2*e.containerWidth-e.contentWidth-e.scrollbarYLeft-e.scrollbarYOuterWidth:r.left=e.scrollbarYLeft+t.scrollLeft,s.css(e.scrollbarYRail,r),s.css(e.scrollbarX,{left:e.scrollbarXLeft,width:e.scrollbarXWidth-e.railBorderXWidth}),s.css(e.scrollbarY,{top:e.scrollbarYTop,height:e.scrollbarYHeight-e.railBorderYWidth})}var l=t("../lib/helper"),i=t("../lib/class"),s=t("../lib/dom"),a=t("./instances"),c=t("./update-scroll");e.exports=function(t){var e=a.get(t);e.containerWidth=t.clientWidth,e.containerHeight=t.clientHeight,e.contentWidth=t.scrollWidth,e.contentHeight=t.scrollHeight;var n;t.contains(e.scrollbarXRail)||(n=s.queryChildren(t,".ps__scrollbar-x-rail"),n.length>0&&n.forEach(function(t){s.remove(t)}),s.appendTo(e.scrollbarXRail,t)),t.contains(e.scrollbarYRail)||(n=s.queryChildren(t,".ps__scrollbar-y-rail"),n.length>0&&n.forEach(function(t){s.remove(t)}),s.appendTo(e.scrollbarYRail,t)),!e.settings.suppressScrollX&&e.containerWidth+e.settings.scrollXMarginOffset<e.contentWidth?(e.scrollbarXActive=!0,e.railXWidth=e.containerWidth-e.railXMarginWidth,e.railXRatio=e.containerWidth/e.railXWidth,e.scrollbarXWidth=r(e,l.toInt(e.railXWidth*e.containerWidth/e.contentWidth)),e.scrollbarXLeft=l.toInt((e.negativeScrollAdjustment+t.scrollLeft)*(e.railXWidth-e.scrollbarXWidth)/(e.contentWidth-e.containerWidth))):e.scrollbarXActive=!1,!e.settings.suppressScrollY&&e.containerHeight+e.settings.scrollYMarginOffset<e.contentHeight?(e.scrollbarYActive=!0,e.railYHeight=e.containerHeight-e.railYMarginHeight,e.railYRatio=e.containerHeight/e.railYHeight,e.scrollbarYHeight=r(e,l.toInt(e.railYHeight*e.containerHeight/e.contentHeight)),e.scrollbarYTop=l.toInt(t.scrollTop*(e.railYHeight-e.scrollbarYHeight)/(e.contentHeight-e.containerHeight))):e.scrollbarYActive=!1,e.scrollbarXLeft>=e.railXWidth-e.scrollbarXWidth&&(e.scrollbarXLeft=e.railXWidth-e.scrollbarXWidth),e.scrollbarYTop>=e.railYHeight-e.scrollbarYHeight&&(e.scrollbarYTop=e.railYHeight-e.scrollbarYHeight),o(t,e),e.scrollbarXActive?i.add(t,"ps--active-x"):(i.remove(t,"ps--active-x"),e.scrollbarXWidth=0,e.scrollbarXLeft=0,c(t,"left",0)),e.scrollbarYActive?i.add(t,"ps--active-y"):(i.remove(t,"ps--active-y"),e.scrollbarYHeight=0,e.scrollbarYTop=0,c(t,"top",0))}},{"../lib/class":2,"../lib/dom":3,"../lib/helper":6,"./instances":18,"./update-scroll":20}],20:[function(t,e,n){"use strict";var r=t("./instances"),o=function(t){var e=document.createEvent("Event");return e.initEvent(t,!0,!0),e};e.exports=function(t,e,n){if("undefined"==typeof t)throw"You must provide an element to the update-scroll function";if("undefined"==typeof e)throw"You must provide an axis to the update-scroll function";if("undefined"==typeof n)throw"You must provide a value to the update-scroll function";"top"===e&&n<=0&&(t.scrollTop=n=0,t.dispatchEvent(o("ps-y-reach-start"))),"left"===e&&n<=0&&(t.scrollLeft=n=0,t.dispatchEvent(o("ps-x-reach-start")));var l=r.get(t);"top"===e&&n>=l.contentHeight-l.containerHeight&&(n=l.contentHeight-l.containerHeight,n-t.scrollTop<=1?n=t.scrollTop:t.scrollTop=n,t.dispatchEvent(o("ps-y-reach-end"))),"left"===e&&n>=l.contentWidth-l.containerWidth&&(n=l.contentWidth-l.containerWidth,n-t.scrollLeft<=1?n=t.scrollLeft:t.scrollLeft=n,t.dispatchEvent(o("ps-x-reach-end"))),void 0===l.lastTop&&(l.lastTop=t.scrollTop),void 0===l.lastLeft&&(l.lastLeft=t.scrollLeft),"top"===e&&n<l.lastTop&&t.dispatchEvent(o("ps-scroll-up")),"top"===e&&n>l.lastTop&&t.dispatchEvent(o("ps-scroll-down")),"left"===e&&n<l.lastLeft&&t.dispatchEvent(o("ps-scroll-left")),"left"===e&&n>l.lastLeft&&t.dispatchEvent(o("ps-scroll-right")),"top"===e&&n!==l.lastTop&&(t.scrollTop=l.lastTop=n,t.dispatchEvent(o("ps-scroll-y"))),"left"===e&&n!==l.lastLeft&&(t.scrollLeft=l.lastLeft=n,t.dispatchEvent(o("ps-scroll-x")))}},{"./instances":18}],21:[function(t,e,n){"use strict";var r=t("../lib/helper"),o=t("../lib/dom"),l=t("./instances"),i=t("./update-geometry"),s=t("./update-scroll");e.exports=function(t){var e=l.get(t);e&&(e.negativeScrollAdjustment=e.isNegativeScroll?t.scrollWidth-t.clientWidth:0,o.css(e.scrollbarXRail,"display","block"),o.css(e.scrollbarYRail,"display","block"),e.railXMarginWidth=r.toInt(o.css(e.scrollbarXRail,"marginLeft"))+r.toInt(o.css(e.scrollbarXRail,"marginRight")),e.railYMarginHeight=r.toInt(o.css(e.scrollbarYRail,"marginTop"))+r.toInt(o.css(e.scrollbarYRail,"marginBottom")),o.css(e.scrollbarXRail,"display","none"),o.css(e.scrollbarYRail,"display","none"),i(t),s(t,"top",t.scrollTop),s(t,"left",t.scrollLeft),o.css(e.scrollbarXRail,"display",""),o.css(e.scrollbarYRail,"display",""))}},{"../lib/dom":3,"../lib/helper":6,"./instances":18,"./update-geometry":19,"./update-scroll":20}]},{},[1]);
!function(t){"use strict";function e(t){return null!==t&&t===t.window}function n(t){return e(t)?t:9===t.nodeType&&t.defaultView}function a(t){var e,a,i={top:0,left:0},o=t&&t.ownerDocument;return e=o.documentElement,"undefined"!=typeof t.getBoundingClientRect&&(i=t.getBoundingClientRect()),a=n(o),{top:i.top+a.pageYOffset-e.clientTop,left:i.left+a.pageXOffset-e.clientLeft}}function i(t){var e="";for(var n in t)t.hasOwnProperty(n)&&(e+=n+":"+t[n]+";");return e}function o(t){if(d.allowEvent(t)===!1)return null;for(var e=null,n=t.target||t.srcElement;null!==n.parentElement;){if(!(n instanceof SVGElement||-1===n.className.indexOf("waves-effect"))){e=n;break}if(n.classList.contains("waves-effect")){e=n;break}n=n.parentElement}return e}function r(e){var n=o(e);null!==n&&(c.show(e,n),"ontouchstart"in t&&(n.addEventListener("touchend",c.hide,!1),n.addEventListener("touchcancel",c.hide,!1)),n.addEventListener("mouseup",c.hide,!1),n.addEventListener("mouseleave",c.hide,!1))}var s=s||{},u=document.querySelectorAll.bind(document),c={duration:750,show:function(t,e){if(2===t.button)return!1;var n=e||this,o=document.createElement("div");o.className="waves-ripple",n.appendChild(o);var r=a(n),s=t.pageY-r.top,u=t.pageX-r.left,d="scale("+n.clientWidth/100*10+")";"touches"in t&&(s=t.touches[0].pageY-r.top,u=t.touches[0].pageX-r.left),o.setAttribute("data-hold",Date.now()),o.setAttribute("data-scale",d),o.setAttribute("data-x",u),o.setAttribute("data-y",s);var l={top:s+"px",left:u+"px"};o.className=o.className+" waves-notransition",o.setAttribute("style",i(l)),o.className=o.className.replace("waves-notransition",""),l["-webkit-transform"]=d,l["-moz-transform"]=d,l["-ms-transform"]=d,l["-o-transform"]=d,l.transform=d,l.opacity="1",l["-webkit-transition-duration"]=c.duration+"ms",l["-moz-transition-duration"]=c.duration+"ms",l["-o-transition-duration"]=c.duration+"ms",l["transition-duration"]=c.duration+"ms",l["-webkit-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",l["-moz-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",l["-o-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",l["transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",o.setAttribute("style",i(l))},hide:function(t){d.touchup(t);var e=this,n=(1.4*e.clientWidth,null),a=e.getElementsByClassName("waves-ripple");if(!(a.length>0))return!1;n=a[a.length-1];var o=n.getAttribute("data-x"),r=n.getAttribute("data-y"),s=n.getAttribute("data-scale"),u=Date.now()-Number(n.getAttribute("data-hold")),l=350-u;0>l&&(l=0),setTimeout(function(){var t={top:r+"px",left:o+"px",opacity:"0","-webkit-transition-duration":c.duration+"ms","-moz-transition-duration":c.duration+"ms","-o-transition-duration":c.duration+"ms","transition-duration":c.duration+"ms","-webkit-transform":s,"-moz-transform":s,"-ms-transform":s,"-o-transform":s,transform:s};n.setAttribute("style",i(t)),setTimeout(function(){try{e.removeChild(n)}catch(t){return!1}},c.duration)},l)},wrapInput:function(t){for(var e=0;e<t.length;e++){var n=t[e];if("input"===n.tagName.toLowerCase()){var a=n.parentNode;if("i"===a.tagName.toLowerCase()&&-1!==a.className.indexOf("waves-effect"))continue;var i=document.createElement("i");i.className=n.className+" waves-input-wrapper";var o=n.getAttribute("style");o||(o=""),i.setAttribute("style",o),n.className="waves-button-input",n.removeAttribute("style"),a.replaceChild(i,n),i.appendChild(n)}}}},d={touches:0,allowEvent:function(t){var e=!0;return"touchstart"===t.type?d.touches+=1:"touchend"===t.type||"touchcancel"===t.type?setTimeout(function(){d.touches>0&&(d.touches-=1)},500):"mousedown"===t.type&&d.touches>0&&(e=!1),e},touchup:function(t){d.allowEvent(t)}};s.displayEffect=function(e){e=e||{},"duration"in e&&(c.duration=e.duration),c.wrapInput(u(".waves-effect")),"ontouchstart"in t&&document.body.addEventListener("touchstart",r,!1),document.body.addEventListener("mousedown",r,!1)},s.attach=function(e){"input"===e.tagName.toLowerCase()&&(c.wrapInput([e]),e=e.parentElement),"ontouchstart"in t&&e.addEventListener("touchstart",r,!1),e.addEventListener("mousedown",r,!1)},t.Waves=s,document.addEventListener("DOMContentLoaded",function(){s.displayEffect()},!1)}(window);
/*
Template Name: Admin Template
Author: Wrappixel

File: js
*/
// ============================================================== 
// Auto select left navbar
// ============================================================== 
$(function () {
    var url = window.location;
    var element = $('ul#sidebarnav a').filter(function () {
        return this.href == url;
    }).addClass('active').parent().addClass('active');
    while (true) {
        if (element.is('li')) {
            element = element.parent().addClass('in').parent().addClass('active').children('a').addClass('active');
            
        }
        else {
            break; 
        }
    }
    $('#sidebarnav a').on('click', function (e) {
        
            if (!$(this).hasClass("active")) {
                // hide any open menus and remove all other classes
                $("ul", $(this).parents("ul:first")).removeClass("in");
                $("a", $(this).parents("ul:first")).removeClass("active");
                
                // open our new menu and add the open class
                $(this).next("ul").addClass("in");
                $(this).addClass("active");
                
            }
            else if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $(this).parents("ul:first").removeClass("active");
                $(this).next("ul").removeClass("in");
            }
    })
    $('#sidebarnav >li >a.has-arrow').on('click', function (e) {
        e.preventDefault();
    });
});
$(function(){"use strict";$(function(){$(".preloader").fadeOut()}),jQuery(document).on("click",".mega-dropdown",function(e){e.stopPropagation()});var e=function(){(window.innerWidth>0?window.innerWidth:this.screen.width)<1170?($("body").addClass("mini-sidebar"),$(".navbar-brand span").hide(),$(".sidebartoggler i").addClass("ti-menu")):($("body").removeClass("mini-sidebar"),$(".navbar-brand span").show());var e=(window.innerHeight>0?window.innerHeight:this.screen.height)-1;(e-=55)<1&&(e=1),e>55&&$(".page-wrapper").css("min-height",e+"px")};$(window).ready(e),$(window).on("resize",e),$(".sidebartoggler").on("click",function(){$("body").hasClass("mini-sidebar")?($("body").trigger("resize"),$("body").removeClass("mini-sidebar"),$(".navbar-brand span").show()):($("body").trigger("resize"),$("body").addClass("mini-sidebar"),$(".navbar-brand span").hide())}),$(".nav-toggler").click(function(){$("body").toggleClass("show-sidebar"),$(".nav-toggler i").toggleClass("ti-menu"),$(".nav-toggler i").addClass("ti-close")}),$(".search-box a, .search-box .app-search .srh-btn").on("click",function(){$(".app-search").toggle(200)}),$(".right-side-toggle").click(function(){$(".right-sidebar").slideDown(50),$(".right-sidebar").toggleClass("shw-rside")}),$(".floating-labels .form-control").on("focus blur",function(e){$(this).parents(".form-group").toggleClass("focused","focus"===e.type||this.value.length>0)}).trigger("blur"),$(function(){$('[data-toggle="tooltip"]').tooltip()}),$(function(){$('[data-toggle="popover"]').popover()}),$(".scroll-sidebar, .right-side-panel, .message-center, .right-sidebar").perfectScrollbar(),$("body").trigger("resize"),$(".list-task li label").click(function(){$(this).toggleClass("task-done")}),$('a[data-action="collapse"]').on("click",function(e){e.preventDefault(),$(this).closest(".card").find('[data-action="collapse"] i').toggleClass("ti-minus ti-plus"),$(this).closest(".card").children(".card-body").collapse("toggle")}),$('a[data-action="expand"]').on("click",function(e){e.preventDefault(),$(this).closest(".card").find('[data-action="expand"] i').toggleClass("mdi-arrow-expand mdi-arrow-compress"),$(this).closest(".card").toggleClass("card-fullscreen")}),$('a[data-action="close"]').on("click",function(){$(this).closest(".card").removeClass().slideUp("fast")});var i,a=function(){$("#eco-spark").sparkline([6,10,9,11,9,10,12,11,10,7,11,9,8,10,9,12],{type:"bar",height:"50",barWidth:"4",resize:!0,barSpacing:"7",barColor:"#01c0c8"})};$(window).on("resize",function(e){clearTimeout(i),i=setTimeout(a,500)}),a();var s,n=["skin-default","skin-green","skin-red","skin-blue","skin-purple","skin-megna","skin-default-dark","skin-green-dark","skin-red-dark","skin-blue-dark","skin-purple-dark","skin-megna-dark"];function o(e){var i,a;return $.each(n,function(e){$("body").removeClass(n[e])}),$("body").addClass(e),i="skin",a=e,"undefined"!=typeof Storage?localStorage.setItem(i,a):window.alert("Please use a modern browser to properly view this template!"),!1}(s=function(e){if("undefined"!=typeof Storage)return localStorage.getItem(e);window.alert("Please use a modern browser to properly view this template!")}("skin"))&&$.inArray(s,n)&&o(s),$("[data-skin]").on("click",function(e){$(this).hasClass("knob")||(e.preventDefault(),o($(this).data("skin")))}),$("#themecolors").on("click","a",function(){$("#themecolors li a").removeClass("working"),$(this).addClass("working")})});
/* jquery.sparkline 2.1.2 - http://omnipotent.net/jquery.sparkline/ 
** Licensed under the New BSD License - see above site for details */

(function(a,b,c){(function(a){typeof define=="function"&&define.amd?define(["jquery"],a):jQuery&&!jQuery.fn.sparkline&&a(jQuery)})(function(d){"use strict";var e={},f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L=0;f=function(){return{common:{type:"line",lineColor:"#00f",fillColor:"#cdf",defaultPixelsPerValue:3,width:"auto",height:"auto",composite:!1,tagValuesAttribute:"values",tagOptionsPrefix:"spark",enableTagOptions:!1,enableHighlight:!0,highlightLighten:1.4,tooltipSkipNull:!0,tooltipPrefix:"",tooltipSuffix:"",disableHiddenCheck:!1,numberFormatter:!1,numberDigitGroupCount:3,numberDigitGroupSep:",",numberDecimalMark:".",disableTooltips:!1,disableInteraction:!1},line:{spotColor:"#f80",highlightSpotColor:"#5f5",highlightLineColor:"#f22",spotRadius:1.5,minSpotColor:"#f80",maxSpotColor:"#f80",lineWidth:1,normalRangeMin:c,normalRangeMax:c,normalRangeColor:"#ccc",drawNormalOnTop:!1,chartRangeMin:c,chartRangeMax:c,chartRangeMinX:c,chartRangeMaxX:c,tooltipFormat:new h('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{y}}{{suffix}}')},bar:{barColor:"#3366cc",negBarColor:"#f44",stackedBarColor:["#3366cc","#dc3912","#ff9900","#109618","#66aa00","#dd4477","#0099c6","#990099"],zeroColor:c,nullColor:c,zeroAxis:!0,barWidth:4,barSpacing:1,chartRangeMax:c,chartRangeMin:c,chartRangeClip:!1,colorMap:c,tooltipFormat:new h('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}}{{suffix}}')},tristate:{barWidth:4,barSpacing:1,posBarColor:"#6f6",negBarColor:"#f44",zeroBarColor:"#999",colorMap:{},tooltipFormat:new h('<span style="color: {{color}}">&#9679;</span> {{value:map}}'),tooltipValueLookups:{map:{"-1":"Loss",0:"Draw",1:"Win"}}},discrete:{lineHeight:"auto",thresholdColor:c,thresholdValue:0,chartRangeMax:c,chartRangeMin:c,chartRangeClip:!1,tooltipFormat:new h("{{prefix}}{{value}}{{suffix}}")},bullet:{targetColor:"#f33",targetWidth:3,performanceColor:"#33f",rangeColors:["#d3dafe","#a8b6ff","#7f94ff"],base:c,tooltipFormat:new h("{{fieldkey:fields}} - {{value}}"),tooltipValueLookups:{fields:{r:"Range",p:"Performance",t:"Target"}}},pie:{offset:0,sliceColors:["#3366cc","#dc3912","#ff9900","#109618","#66aa00","#dd4477","#0099c6","#990099"],borderWidth:0,borderColor:"#000",tooltipFormat:new h('<span style="color: {{color}}">&#9679;</span> {{value}} ({{percent.1}}%)')},box:{raw:!1,boxLineColor:"#000",boxFillColor:"#cdf",whiskerColor:"#000",outlierLineColor:"#333",outlierFillColor:"#fff",medianColor:"#f00",showOutliers:!0,outlierIQR:1.5,spotRadius:1.5,target:c,targetColor:"#4a2",chartRangeMax:c,chartRangeMin:c,tooltipFormat:new h("{{field:fields}}: {{value}}"),tooltipFormatFieldlistKey:"field",tooltipValueLookups:{fields:{lq:"Lower Quartile",med:"Median",uq:"Upper Quartile",lo:"Left Outlier",ro:"Right Outlier",lw:"Left Whisker",rw:"Right Whisker"}}}}},E='.jqstooltip { position: absolute;left: 0px;top: 0px;visibility: hidden;background: rgb(0, 0, 0) transparent;background-color: rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";color: white;font: 10px arial, san serif;text-align: left;white-space: nowrap;padding: 5px;border: 1px solid white;z-index: 10000;}.jqsfield { color: white;font: 10px arial, san serif;text-align: left;}',g=function(){var a,b;return a=function(){this.init.apply(this,arguments)},arguments.length>1?(arguments[0]?(a.prototype=d.extend(new arguments[0],arguments[arguments.length-1]),a._super=arguments[0].prototype):a.prototype=arguments[arguments.length-1],arguments.length>2&&(b=Array.prototype.slice.call(arguments,1,-1),b.unshift(a.prototype),d.extend.apply(d,b))):a.prototype=arguments[0],a.prototype.cls=a,a},d.SPFormatClass=h=g({fre:/\{\{([\w.]+?)(:(.+?))?\}\}/g,precre:/(\w+)\.(\d+)/,init:function(a,b){this.format=a,this.fclass=b},render:function(a,b,d){var e=this,f=a,g,h,i,j,k;return this.format.replace(this.fre,function(){var a;return h=arguments[1],i=arguments[3],g=e.precre.exec(h),g?(k=g[2],h=g[1]):k=!1,j=f[h],j===c?"":i&&b&&b[i]?(a=b[i],a.get?b[i].get(j)||j:b[i][j]||j):(n(j)&&(d.get("numberFormatter")?j=d.get("numberFormatter")(j):j=s(j,k,d.get("numberDigitGroupCount"),d.get("numberDigitGroupSep"),d.get("numberDecimalMark"))),j)})}}),d.spformat=function(a,b){return new h(a,b)},i=function(a,b,c){return a<b?b:a>c?c:a},j=function(a,c){var d;return c===2?(d=b.floor(a.length/2),a.length%2?a[d]:(a[d-1]+a[d])/2):a.length%2?(d=(a.length*c+c)/4,d%1?(a[b.floor(d)]+a[b.floor(d)-1])/2:a[d-1]):(d=(a.length*c+2)/4,d%1?(a[b.floor(d)]+a[b.floor(d)-1])/2:a[d-1])},k=function(a){var b;switch(a){case"undefined":a=c;break;case"null":a=null;break;case"true":a=!0;break;case"false":a=!1;break;default:b=parseFloat(a),a==b&&(a=b)}return a},l=function(a){var b,c=[];for(b=a.length;b--;)c[b]=k(a[b]);return c},m=function(a,b){var c,d,e=[];for(c=0,d=a.length;c<d;c++)a[c]!==b&&e.push(a[c]);return e},n=function(a){return!isNaN(parseFloat(a))&&isFinite(a)},s=function(a,b,c,e,f){var g,h;a=(b===!1?parseFloat(a).toString():a.toFixed(b)).split(""),g=(g=d.inArray(".",a))<0?a.length:g,g<a.length&&(a[g]=f);for(h=g-c;h>0;h-=c)a.splice(h,0,e);return a.join("")},o=function(a,b,c){var d;for(d=b.length;d--;){if(c&&b[d]===null)continue;if(b[d]!==a)return!1}return!0},p=function(a){var b=0,c;for(c=a.length;c--;)b+=typeof a[c]=="number"?a[c]:0;return b},r=function(a){return d.isArray(a)?a:[a]},q=function(b){var c;a.createStyleSheet?a.createStyleSheet().cssText=b:(c=a.createElement("style"),c.type="text/css",a.getElementsByTagName("head")[0].appendChild(c),c[typeof a.body.style.WebkitAppearance=="string"?"innerText":"innerHTML"]=b)},d.fn.simpledraw=function(b,e,f,g){var h,i;if(f&&(h=this.data("_jqs_vcanvas")))return h;if(d.fn.sparkline.canvas===!1)return!1;if(d.fn.sparkline.canvas===c){var j=a.createElement("canvas");if(!j.getContext||!j.getContext("2d")){if(!a.namespaces||!!a.namespaces.v)return d.fn.sparkline.canvas=!1,!1;a.namespaces.add("v","urn:schemas-microsoft-com:vml","#default#VML"),d.fn.sparkline.canvas=function(a,b,c,d){return new J(a,b,c)}}else d.fn.sparkline.canvas=function(a,b,c,d){return new I(a,b,c,d)}}return b===c&&(b=d(this).innerWidth()),e===c&&(e=d(this).innerHeight()),h=d.fn.sparkline.canvas(b,e,this,g),i=d(this).data("_jqs_mhandler"),i&&i.registerCanvas(h),h},d.fn.cleardraw=function(){var a=this.data("_jqs_vcanvas");a&&a.reset()},d.RangeMapClass=t=g({init:function(a){var b,c,d=[];for(b in a)a.hasOwnProperty(b)&&typeof b=="string"&&b.indexOf(":")>-1&&(c=b.split(":"),c[0]=c[0].length===0?-Infinity:parseFloat(c[0]),c[1]=c[1].length===0?Infinity:parseFloat(c[1]),c[2]=a[b],d.push(c));this.map=a,this.rangelist=d||!1},get:function(a){var b=this.rangelist,d,e,f;if((f=this.map[a])!==c)return f;if(b)for(d=b.length;d--;){e=b[d];if(e[0]<=a&&e[1]>=a)return e[2]}return c}}),d.range_map=function(a){return new t(a)},u=g({init:function(a,b){var c=d(a);this.$el=c,this.options=b,this.currentPageX=0,this.currentPageY=0,this.el=a,this.splist=[],this.tooltip=null,this.over=!1,this.displayTooltips=!b.get("disableTooltips"),this.highlightEnabled=!b.get("disableHighlight")},registerSparkline:function(a){this.splist.push(a),this.over&&this.updateDisplay()},registerCanvas:function(a){var b=d(a.canvas);this.canvas=a,this.$canvas=b,b.mouseenter(d.proxy(this.mouseenter,this)),b.mouseleave(d.proxy(this.mouseleave,this)),b.click(d.proxy(this.mouseclick,this))},reset:function(a){this.splist=[],this.tooltip&&a&&(this.tooltip.remove(),this.tooltip=c)},mouseclick:function(a){var b=d.Event("sparklineClick");b.originalEvent=a,b.sparklines=this.splist,this.$el.trigger(b)},mouseenter:function(b){d(a.body).unbind("mousemove.jqs"),d(a.body).bind("mousemove.jqs",d.proxy(this.mousemove,this)),this.over=!0,this.currentPageX=b.pageX,this.currentPageY=b.pageY,this.currentEl=b.target,!this.tooltip&&this.displayTooltips&&(this.tooltip=new v(this.options),this.tooltip.updatePosition(b.pageX,b.pageY)),this.updateDisplay()},mouseleave:function(){d(a.body).unbind("mousemove.jqs");var b=this.splist,c=b.length,e=!1,f,g;this.over=!1,this.currentEl=null,this.tooltip&&(this.tooltip.remove(),this.tooltip=null);for(g=0;g<c;g++)f=b[g],f.clearRegionHighlight()&&(e=!0);e&&this.canvas.render()},mousemove:function(a){this.currentPageX=a.pageX,this.currentPageY=a.pageY,this.currentEl=a.target,this.tooltip&&this.tooltip.updatePosition(a.pageX,a.pageY),this.updateDisplay()},updateDisplay:function(){var a=this.splist,b=a.length,c=!1,e=this.$canvas.offset(),f=this.currentPageX-e.left,g=this.currentPageY-e.top,h,i,j,k,l;if(!this.over)return;for(j=0;j<b;j++)i=a[j],k=i.setRegionHighlight(this.currentEl,f,g),k&&(c=!0);if(c){l=d.Event("sparklineRegionChange"),l.sparklines=this.splist,this.$el.trigger(l);if(this.tooltip){h="";for(j=0;j<b;j++)i=a[j],h+=i.getCurrentRegionTooltip();this.tooltip.setContent(h)}this.disableHighlight||this.canvas.render()}k===null&&this.mouseleave()}}),v=g({sizeStyle:"position: static !important;display: block !important;visibility: hidden !important;float: left !important;",init:function(b){var c=b.get("tooltipClassname","jqstooltip"),e=this.sizeStyle,f;this.container=b.get("tooltipContainer")||a.body,this.tooltipOffsetX=b.get("tooltipOffsetX",10),this.tooltipOffsetY=b.get("tooltipOffsetY",12),d("#jqssizetip").remove(),d("#jqstooltip").remove(),this.sizetip=d("<div/>",{id:"jqssizetip",style:e,"class":c}),this.tooltip=d("<div/>",{id:"jqstooltip","class":c}).appendTo(this.container),f=this.tooltip.offset(),this.offsetLeft=f.left,this.offsetTop=f.top,this.hidden=!0,d(window).unbind("resize.jqs scroll.jqs"),d(window).bind("resize.jqs scroll.jqs",d.proxy(this.updateWindowDims,this)),this.updateWindowDims()},updateWindowDims:function(){this.scrollTop=d(window).scrollTop(),this.scrollLeft=d(window).scrollLeft(),this.scrollRight=this.scrollLeft+d(window).width(),this.updatePosition()},getSize:function(a){this.sizetip.html(a).appendTo(this.container),this.width=this.sizetip.width()+1,this.height=this.sizetip.height(),this.sizetip.remove()},setContent:function(a){if(!a){this.tooltip.css("visibility","hidden"),this.hidden=!0;return}this.getSize(a),this.tooltip.html(a).css({width:this.width,height:this.height,visibility:"visible"}),this.hidden&&(this.hidden=!1,this.updatePosition())},updatePosition:function(a,b){if(a===c){if(this.mousex===c)return;a=this.mousex-this.offsetLeft,b=this.mousey-this.offsetTop}else this.mousex=a-=this.offsetLeft,this.mousey=b-=this.offsetTop;if(!this.height||!this.width||this.hidden)return;b-=this.height+this.tooltipOffsetY,a+=this.tooltipOffsetX,b<this.scrollTop&&(b=this.scrollTop),a<this.scrollLeft?a=this.scrollLeft:a+this.width>this.scrollRight&&(a=this.scrollRight-this.width),this.tooltip.css({left:a,top:b})},remove:function(){this.tooltip.remove(),this.sizetip.remove(),this.sizetip=this.tooltip=c,d(window).unbind("resize.jqs scroll.jqs")}}),F=function(){q(E)},d(F),K=[],d.fn.sparkline=function(b,e){return this.each(function(){var f=new d.fn.sparkline.options(this,e),g=d(this),h,i;h=function(){var e,h,i,j,k,l,m;if(b==="html"||b===c){m=this.getAttribute(f.get("tagValuesAttribute"));if(m===c||m===null)m=g.html();e=m.replace(/(^\s*<!--)|(-->\s*$)|\s+/g,"").split(",")}else e=b;h=f.get("width")==="auto"?e.length*f.get("defaultPixelsPerValue"):f.get("width");if(f.get("height")==="auto"){if(!f.get("composite")||!d.data(this,"_jqs_vcanvas"))j=a.createElement("span"),j.innerHTML="a",g.html(j),i=d(j).innerHeight()||d(j).height(),d(j).remove(),j=null}else i=f.get("height");f.get("disableInteraction")?k=!1:(k=d.data(this,"_jqs_mhandler"),k?f.get("composite")||k.reset():(k=new u(this,f),d.data(this,"_jqs_mhandler",k)));if(f.get("composite")&&!d.data(this,"_jqs_vcanvas")){d.data(this,"_jqs_errnotify")||(alert("Attempted to attach a composite sparkline to an element with no existing sparkline"),d.data(this,"_jqs_errnotify",!0));return}l=new(d.fn.sparkline[f.get("type")])(this,e,f,h,i),l.render(),k&&k.registerSparkline(l)};if(d(this).html()&&!f.get("disableHiddenCheck")&&d(this).is(":hidden")||!d(this).parents("body").length){if(!f.get("composite")&&d.data(this,"_jqs_pending"))for(i=K.length;i;i--)K[i-1][0]==this&&K.splice(i-1,1);K.push([this,h]),d.data(this,"_jqs_pending",!0)}else h.call(this)})},d.fn.sparkline.defaults=f(),d.sparkline_display_visible=function(){var a,b,c,e=[];for(b=0,c=K.length;b<c;b++)a=K[b][0],d(a).is(":visible")&&!d(a).parents().is(":hidden")?(K[b][1].call(a),d.data(K[b][0],"_jqs_pending",!1),e.push(b)):!d(a).closest("html").length&&!d.data(a,"_jqs_pending")&&(d.data(K[b][0],"_jqs_pending",!1),e.push(b));for(b=e.length;b;b--)K.splice(e[b-1],1)},d.fn.sparkline.options=g({init:function(a,b){var c,f,g,h;this.userOptions=b=b||{},this.tag=a,this.tagValCache={},f=d.fn.sparkline.defaults,g=f.common,this.tagOptionsPrefix=b.enableTagOptions&&(b.tagOptionsPrefix||g.tagOptionsPrefix),h=this.getTagSetting("type"),h===e?c=f[b.type||g.type]:c=f[h],this.mergedOptions=d.extend({},g,c,b)},getTagSetting:function(a){var b=this.tagOptionsPrefix,d,f,g,h;if(b===!1||b===c)return e;if(this.tagValCache.hasOwnProperty(a))d=this.tagValCache.key;else{d=this.tag.getAttribute(b+a);if(d===c||d===null)d=e;else if(d.substr(0,1)==="["){d=d.substr(1,d.length-2).split(",");for(f=d.length;f--;)d[f]=k(d[f].replace(/(^\s*)|(\s*$)/g,""))}else if(d.substr(0,1)==="{"){g=d.substr(1,d.length-2).split(","),d={};for(f=g.length;f--;)h=g[f].split(":",2),d[h[0].replace(/(^\s*)|(\s*$)/g,"")]=k(h[1].replace(/(^\s*)|(\s*$)/g,""))}else d=k(d);this.tagValCache.key=d}return d},get:function(a,b){var d=this.getTagSetting(a),f;return d!==e?d:(f=this.mergedOptions[a])===c?b:f}}),d.fn.sparkline._base=g({disabled:!1,init:function(a,b,e,f,g){this.el=a,this.$el=d(a),this.values=b,this.options=e,this.width=f,this.height=g,this.currentRegion=c},initTarget:function(){var a=!this.options.get("disableInteraction");(this.target=this.$el.simpledraw(this.width,this.height,this.options.get("composite"),a))?(this.canvasWidth=this.target.pixelWidth,this.canvasHeight=this.target.pixelHeight):this.disabled=!0},render:function(){return this.disabled?(this.el.innerHTML="",!1):!0},getRegion:function(a,b){},setRegionHighlight:function(a,b,d){var e=this.currentRegion,f=!this.options.get("disableHighlight"),g;return b>this.canvasWidth||d>this.canvasHeight||b<0||d<0?null:(g=this.getRegion(a,b,d),e!==g?(e!==c&&f&&this.removeHighlight(),this.currentRegion=g,g!==c&&f&&this.renderHighlight(),!0):!1)},clearRegionHighlight:function(){return this.currentRegion!==c?(this.removeHighlight(),this.currentRegion=c,!0):!1},renderHighlight:function(){this.changeHighlight(!0)},removeHighlight:function(){this.changeHighlight(!1)},changeHighlight:function(a){},getCurrentRegionTooltip:function(){var a=this.options,b="",e=[],f,g,i,j,k,l,m,n,o,p,q,r,s,t;if(this.currentRegion===c)return"";f=this.getCurrentRegionFields(),q=a.get("tooltipFormatter");if(q)return q(this,a,f);a.get("tooltipChartTitle")&&(b+='<div class="jqs jqstitle">'+a.get("tooltipChartTitle")+"</div>\n"),g=this.options.get("tooltipFormat");if(!g)return"";d.isArray(g)||(g=[g]),d.isArray(f)||(f=[f]),m=this.options.get("tooltipFormatFieldlist"),n=this.options.get("tooltipFormatFieldlistKey");if(m&&n){o=[];for(l=f.length;l--;)p=f[l][n],(t=d.inArray(p,m))!=-1&&(o[t]=f[l]);f=o}i=g.length,s=f.length;for(l=0;l<i;l++){r=g[l],typeof r=="string"&&(r=new h(r)),j=r.fclass||"jqsfield";for(t=0;t<s;t++)if(!f[t].isNull||!a.get("tooltipSkipNull"))d.extend(f[t],{prefix:a.get("tooltipPrefix"),suffix:a.get("tooltipSuffix")}),k=r.render(f[t],a.get("tooltipValueLookups"),a),e.push('<div class="'+j+'">'+k+"</div>")}return e.length?b+e.join("\n"):""},getCurrentRegionFields:function(){},calcHighlightColor:function(a,c){var d=c.get("highlightColor"),e=c.get("highlightLighten"),f,g,h,j;if(d)return d;if(e){f=/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(a)||/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(a);if(f){h=[],g=a.length===4?16:1;for(j=0;j<3;j++)h[j]=i(b.round(parseInt(f[j+1],16)*g*e),0,255);return"rgb("+h.join(",")+")"}}return a}}),w={changeHighlight:function(a){var b=this.currentRegion,c=this.target,e=this.regionShapes[b],f;e&&(f=this.renderRegion(b,a),d.isArray(f)||d.isArray(e)?(c.replaceWithShapes(e,f),this.regionShapes[b]=d.map(f,function(a){return a.id})):(c.replaceWithShape(e,f),this.regionShapes[b]=f.id))},render:function(){var a=this.values,b=this.target,c=this.regionShapes,e,f,g,h;if(!this.cls._super.render.call(this))return;for(g=a.length;g--;){e=this.renderRegion(g);if(e)if(d.isArray(e)){f=[];for(h=e.length;h--;)e[h].append(),f.push(e[h].id);c[g]=f}else e.append(),c[g]=e.id;else c[g]=null}b.render()}},d.fn.sparkline.line=x=g(d.fn.sparkline._base,{type:"line",init:function(a,b,c,d,e){x._super.init.call(this,a,b,c,d,e),this.vertices=[],this.regionMap=[],this.xvalues=[],this.yvalues=[],this.yminmax=[],this.hightlightSpotId=null,this.lastShapeId=null,this.initTarget()},getRegion:function(a,b,d){var e,f=this.regionMap;for(e=f.length;e--;)if(f[e]!==null&&b>=f[e][0]&&b<=f[e][1])return f[e][2];return c},getCurrentRegionFields:function(){var a=this.currentRegion;return{isNull:this.yvalues[a]===null,x:this.xvalues[a],y:this.yvalues[a],color:this.options.get("lineColor"),fillColor:this.options.get("fillColor"),offset:a}},renderHighlight:function(){var a=this.currentRegion,b=this.target,d=this.vertices[a],e=this.options,f=e.get("spotRadius"),g=e.get("highlightSpotColor"),h=e.get("highlightLineColor"),i,j;if(!d)return;f&&g&&(i=b.drawCircle(d[0],d[1],f,c,g),this.highlightSpotId=i.id,b.insertAfterShape(this.lastShapeId,i)),h&&(j=b.drawLine(d[0],this.canvasTop,d[0],this.canvasTop+this.canvasHeight,h),this.highlightLineId=j.id,b.insertAfterShape(this.lastShapeId,j))},removeHighlight:function(){var a=this.target;this.highlightSpotId&&(a.removeShapeId(this.highlightSpotId),this.highlightSpotId=null),this.highlightLineId&&(a.removeShapeId(this.highlightLineId),this.highlightLineId=null)},scanValues:function(){var a=this.values,c=a.length,d=this.xvalues,e=this.yvalues,f=this.yminmax,g,h,i,j,k;for(g=0;g<c;g++)h=a[g],i=typeof a[g]=="string",j=typeof a[g]=="object"&&a[g]instanceof Array,k=i&&a[g].split(":"),i&&k.length===2?(d.push(Number(k[0])),e.push(Number(k[1])),f.push(Number(k[1]))):j?(d.push(h[0]),e.push(h[1]),f.push(h[1])):(d.push(g),a[g]===null||a[g]==="null"?e.push(null):(e.push(Number(h)),f.push(Number(h))));this.options.get("xvalues")&&(d=this.options.get("xvalues")),this.maxy=this.maxyorg=b.max.apply(b,f),this.miny=this.minyorg=b.min.apply(b,f),this.maxx=b.max.apply(b,d),this.minx=b.min.apply(b,d),this.xvalues=d,this.yvalues=e,this.yminmax=f},processRangeOptions:function(){var a=this.options,b=a.get("normalRangeMin"),d=a.get("normalRangeMax");b!==c&&(b<this.miny&&(this.miny=b),d>this.maxy&&(this.maxy=d)),a.get("chartRangeMin")!==c&&(a.get("chartRangeClip")||a.get("chartRangeMin")<this.miny)&&(this.miny=a.get("chartRangeMin")),a.get("chartRangeMax")!==c&&(a.get("chartRangeClip")||a.get("chartRangeMax")>this.maxy)&&(this.maxy=a.get("chartRangeMax")),a.get("chartRangeMinX")!==c&&(a.get("chartRangeClipX")||a.get("chartRangeMinX")<this.minx)&&(this.minx=a.get("chartRangeMinX")),a.get("chartRangeMaxX")!==c&&(a.get("chartRangeClipX")||a.get("chartRangeMaxX")>this.maxx)&&(this.maxx=a.get("chartRangeMaxX"))},drawNormalRange:function(a,d,e,f,g){var h=this.options.get("normalRangeMin"),i=this.options.get("normalRangeMax"),j=d+b.round(e-e*((i-this.miny)/g)),k=b.round(e*(i-h)/g);this.target.drawRect(a,j,f,k,c,this.options.get("normalRangeColor")).append()},render:function(){var a=this.options,e=this.target,f=this.canvasWidth,g=this.canvasHeight,h=this.vertices,i=a.get("spotRadius"),j=this.regionMap,k,l,m,n,o,p,q,r,s,u,v,w,y,z,A,B,C,D,E,F,G,H,I,J,K;if(!x._super.render.call(this))return;this.scanValues(),this.processRangeOptions(),I=this.xvalues,J=this.yvalues;if(!this.yminmax.length||this.yvalues.length<2)return;n=o=0,k=this.maxx-this.minx===0?1:this.maxx-this.minx,l=this.maxy-this.miny===0?1:this.maxy-this.miny,m=this.yvalues.length-1,i&&(f<i*4||g<i*4)&&(i=0);if(i){G=a.get("highlightSpotColor")&&!a.get("disableInteraction");if(G||a.get("minSpotColor")||a.get("spotColor")&&J[m]===this.miny)g-=b.ceil(i);if(G||a.get("maxSpotColor")||a.get("spotColor")&&J[m]===this.maxy)g-=b.ceil(i),n+=b.ceil(i);if(G||(a.get("minSpotColor")||a.get("maxSpotColor"))&&(J[0]===this.miny||J[0]===this.maxy))o+=b.ceil(i),f-=b.ceil(i);if(G||a.get("spotColor")||a.get("minSpotColor")||a.get("maxSpotColor")&&(J[m]===this.miny||J[m]===this.maxy))f-=b.ceil(i)}g--,a.get("normalRangeMin")!==c&&!a.get("drawNormalOnTop")&&this.drawNormalRange(o,n,g,f,l),q=[],r=[q],z=A=null,B=J.length;for(K=0;K<B;K++)s=I[K],v=I[K+1],u=J[K],w=o+b.round((s-this.minx)*(f/k)),y=K<B-1?o+b.round((v-this.minx)*(f/k)):f,A=w+(y-w)/2,j[K]=[z||0,A,K],z=A,u===null?K&&(J[K-1]!==null&&(q=[],r.push(q)),h.push(null)):(u<this.miny&&(u=this.miny),u>this.maxy&&(u=this.maxy),q.length||q.push([w,n+g]),p=[w,n+b.round(g-g*((u-this.miny)/l))],q.push(p),h.push(p));C=[],D=[],E=r.length;for(K=0;K<E;K++)q=r[K],q.length&&(a.get("fillColor")&&(q.push([q[q.length-1][0],n+g]),D.push(q.slice(0)),q.pop()),q.length>2&&(q[0]=[q[0][0],q[1][1]]),C.push(q));E=D.length;for(K=0;K<E;K++)e.drawShape(D[K],a.get("fillColor"),a.get("fillColor")).append();a.get("normalRangeMin")!==c&&a.get("drawNormalOnTop")&&this.drawNormalRange(o,n,g,f,l),E=C.length;for(K=0;K<E;K++)e.drawShape(C[K],a.get("lineColor"),c,a.get("lineWidth")).append();if(i&&a.get("valueSpots")){F=a.get("valueSpots"),F.get===c&&(F=new t(F));for(K=0;K<B;K++)H=F.get(J[K]),H&&e.drawCircle(o+b.round((I[K]-this.minx)*(f/k)),n+b.round(g-g*((J[K]-this.miny)/l)),i,c,H).append()}i&&a.get("spotColor")&&J[m]!==null&&e.drawCircle(o+b.round((I[I.length-1]-this.minx)*(f/k)),n+b.round(g-g*((J[m]-this.miny)/l)),i,c,a.get("spotColor")).append(),this.maxy!==this.minyorg&&(i&&a.get("minSpotColor")&&(s=I[d.inArray(this.minyorg,J)],e.drawCircle(o+b.round((s-this.minx)*(f/k)),n+b.round(g-g*((this.minyorg-this.miny)/l)),i,c,a.get("minSpotColor")).append()),i&&a.get("maxSpotColor")&&(s=I[d.inArray(this.maxyorg,J)],e.drawCircle(o+b.round((s-this.minx)*(f/k)),n+b.round(g-g*((this.maxyorg-this.miny)/l)),i,c,a.get("maxSpotColor")).append())),this.lastShapeId=e.getLastShapeId(),this.canvasTop=n,e.render()}}),d.fn.sparkline.bar=y=g(d.fn.sparkline._base,w,{type:"bar",init:function(a,e,f,g,h){var j=parseInt(f.get("barWidth"),10),n=parseInt(f.get("barSpacing"),10),o=f.get("chartRangeMin"),p=f.get("chartRangeMax"),q=f.get("chartRangeClip"),r=Infinity,s=-Infinity,u,v,w,x,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R;y._super.init.call(this,a,e,f,g,h);for(A=0,B=e.length;A<B;A++){O=e[A],u=typeof O=="string"&&O.indexOf(":")>-1;if(u||d.isArray(O))J=!0,u&&(O=e[A]=l(O.split(":"))),O=m(O,null),v=b.min.apply(b,O),w=b.max.apply(b,O),v<r&&(r=v),w>s&&(s=w)}this.stacked=J,this.regionShapes={},this.barWidth=j,this.barSpacing=n,this.totalBarWidth=j+n,this.width=g=e.length*j+(e.length-1)*n,this.initTarget(),q&&(H=o===c?-Infinity:o,I=p===c?Infinity:p),z=[],x=J?[]:z;var S=[],T=[];for(A=0,B=e.length;A<B;A++)if(J){K=e[A],e[A]=N=[],S[A]=0,x[A]=T[A]=0;for(L=0,M=K.length;L<M;L++)O=N[L]=q?i(K[L],H,I):K[L],O!==null&&(O>0&&(S[A]+=O),r<0&&s>0?O<0?T[A]+=b.abs(O):x[A]+=O:x[A]+=b.abs(O-(O<0?s:r)),z.push(O))}else O=q?i(e[A],H,I):e[A],O=e[A]=k(O),O!==null&&z.push(O);this.max=G=b.max.apply(b,z),this.min=F=b.min.apply(b,z),this.stackMax=s=J?b.max.apply(b,S):G,this.stackMin=r=J?b.min.apply(b,z):F,f.get("chartRangeMin")!==c&&(f.get("chartRangeClip")||f.get("chartRangeMin")<F)&&(F=f.get("chartRangeMin")),f.get("chartRangeMax")!==c&&(f.get("chartRangeClip")||f.get("chartRangeMax")>G)&&(G=f.get("chartRangeMax")),this.zeroAxis=D=f.get("zeroAxis",!0),F<=0&&G>=0&&D?E=0:D==0?E=F:F>0?E=F:E=G,this.xaxisOffset=E,C=J?b.max.apply(b,x)+b.max.apply(b,T):G-F,this.canvasHeightEf=D&&F<0?this.canvasHeight-2:this.canvasHeight-1,F<E?(Q=J&&G>=0?s:G,P=(Q-E)/C*this.canvasHeight,P!==b.ceil(P)&&(this.canvasHeightEf-=2,P=b.ceil(P))):P=this.canvasHeight,this.yoffset=P,d.isArray(f.get("colorMap"))?(this.colorMapByIndex=f.get("colorMap"),this.colorMapByValue=null):(this.colorMapByIndex=null,this.colorMapByValue=f.get("colorMap"),this.colorMapByValue&&this.colorMapByValue.get===c&&(this.colorMapByValue=new t(this.colorMapByValue))),this.range=C},getRegion:function(a,d,e){var f=b.floor(d/this.totalBarWidth);return f<0||f>=this.values.length?c:f},getCurrentRegionFields:function(){var a=this.currentRegion,b=r(this.values[a]),c=[],d,e;for(e=b.length;e--;)d=b[e],c.push({isNull:d===null,value:d,color:this.calcColor(e,d,a),offset:a});return c},calcColor:function(a,b,e){var f=this.colorMapByIndex,g=this.colorMapByValue,h=this.options,i,j;return this.stacked?i=h.get("stackedBarColor"):i=b<0?h.get("negBarColor"):h.get("barColor"),b===0&&h.get("zeroColor")!==c&&(i=h.get("zeroColor")),g&&(j=g.get(b))?i=j:f&&f.length>e&&(i=f[e]),d.isArray(i)?i[a%i.length]:i},renderRegion:function(a,e){var f=this.values[a],g=this.options,h=this.xaxisOffset,i=[],j=this.range,k=this.stacked,l=this.target,m=a*this.totalBarWidth,n=this.canvasHeightEf,p=this.yoffset,q,r,s,t,u,v,w,x,y,z;f=d.isArray(f)?f:[f],w=f.length,x=f[0],t=o(null,f),z=o(h,f,!0);if(t)return g.get("nullColor")?(s=e?g.get("nullColor"):this.calcHighlightColor(g.get("nullColor"),g),q=p>0?p-1:p,l.drawRect(m,q,this.barWidth-1,0,s,s)):c;u=p;for(v=0;v<w;v++){x=f[v];if(k&&x===h){if(!z||y)continue;y=!0}j>0?r=b.floor(n*(b.abs(x-h)/j))+1:r=1,x<h||x===h&&p===0?(q=u,u+=r):(q=p-r,p-=r),s=this.calcColor(v,x,a),e&&(s=this.calcHighlightColor(s,g)),i.push(l.drawRect(m,q,this.barWidth-1,r-1,s,s))}return i.length===1?i[0]:i}}),d.fn.sparkline.tristate=z=g(d.fn.sparkline._base,w,{type:"tristate",init:function(a,b,e,f,g){var h=parseInt(e.get("barWidth"),10),i=parseInt(e.get("barSpacing"),10);z._super.init.call(this,a,b,e,f,g),this.regionShapes={},this.barWidth=h,this.barSpacing=i,this.totalBarWidth=h+i,this.values=d.map(b,Number),this.width=f=b.length*h+(b.length-1)*i,d.isArray(e.get("colorMap"))?(this.colorMapByIndex=e.get("colorMap"),this.colorMapByValue=null):(this.colorMapByIndex=null,this.colorMapByValue=e.get("colorMap"),this.colorMapByValue&&this.colorMapByValue.get===c&&(this.colorMapByValue=new t(this.colorMapByValue))),this.initTarget()},getRegion:function(a,c,d){return b.floor(c/this.totalBarWidth)},getCurrentRegionFields:function(){var a=this.currentRegion;return{isNull:this.values[a]===c,value:this.values[a],color:this.calcColor(this.values[a],a),offset:a}},calcColor:function(a,b){var c=this.values,d=this.options,e=this.colorMapByIndex,f=this.colorMapByValue,g,h;return f&&(h=f.get(a))?g=h:e&&e.length>b?g=e[b]:c[b]<0?g=d.get("negBarColor"):c[b]>0?g=d.get("posBarColor"):g=d.get("zeroBarColor"),g},renderRegion:function(a,c){var d=this.values,e=this.options,f=this.target,g,h,i,j,k,l;g=f.pixelHeight,i=b.round(g/2),j=a*this.totalBarWidth,d[a]<0?(k=i,h=i-1):d[a]>0?(k=0,h=i-1):(k=i-1,h=2),l=this.calcColor(d[a],a);if(l===null)return;return c&&(l=this.calcHighlightColor(l,e)),f.drawRect(j,k,this.barWidth-1,h-1,l,l)}}),d.fn.sparkline.discrete=A=g(d.fn.sparkline._base,w,{type:"discrete",init:function(a,e,f,g,h){A._super.init.call(this,a,e,f,g,h),this.regionShapes={},this.values=e=d.map(e,Number),this.min=b.min.apply(b,e),this.max=b.max.apply(b,e),this.range=this.max-this.min,this.width=g=f.get("width")==="auto"?e.length*2:this.width,this.interval=b.floor(g/e.length),this.itemWidth=g/e.length,f.get("chartRangeMin")!==c&&(f.get("chartRangeClip")||f.get("chartRangeMin")<this.min)&&(this.min=f.get("chartRangeMin")),f.get("chartRangeMax")!==c&&(f.get("chartRangeClip")||f.get("chartRangeMax")>this.max)&&(this.max=f.get("chartRangeMax")),this.initTarget(),this.target&&(this.lineHeight=f.get("lineHeight")==="auto"?b.round(this.canvasHeight*.3):f.get("lineHeight"))},getRegion:function(a,c,d){return b.floor(c/this.itemWidth)},getCurrentRegionFields:function(){var a=this.currentRegion;return{isNull:this.values[a]===c,value:this.values[a],offset:a}},renderRegion:function(a,c){var d=this.values,e=this.options,f=this.min,g=this.max,h=this.range,j=this.interval,k=this.target,l=this.canvasHeight,m=this.lineHeight,n=l-m,o,p,q,r;return p=i(d[a],f,g),r=a*j,o=b.round(n-n*((p-f)/h)),q=e.get("thresholdColor")&&p<e.get("thresholdValue")?e.get("thresholdColor"):e.get("lineColor"),c&&(q=this.calcHighlightColor(q,e)),k.drawLine(r,o,r,o+m,q)}}),d.fn.sparkline.bullet=B=g(d.fn.sparkline._base,{type:"bullet",init:function(a,d,e,f,g){var h,i,j;B._super.init.call(this,a,d,e,f,g),this.values=d=l(d),j=d.slice(),j[0]=j[0]===null?j[2]:j[0],j[1]=d[1]===null?j[2]:j[1],h=b.min.apply(b,d),i=b.max.apply(b,d),e.get("base")===c?h=h<0?h:0:h=e.get("base"),this.min=h,this.max=i,this.range=i-h,this.shapes={},this.valueShapes={},this.regiondata={},this.width=f=e.get("width")==="auto"?"4.0em":f,this.target=this.$el.simpledraw(f,g,e.get("composite")),d.length||(this.disabled=!0),this.initTarget()},getRegion:function(a,b,d){var e=this.target.getShapeAt(a,b,d);return e!==c&&this.shapes[e]!==c?this.shapes[e]:c},getCurrentRegionFields:function(){var a=this.currentRegion;return{fieldkey:a.substr(0,1),value:this.values[a.substr(1)],region:a}},changeHighlight:function(a){var b=this.currentRegion,c=this.valueShapes[b],d;delete this.shapes[c];switch(b.substr(0,1)){case"r":d=this.renderRange(b.substr(1),a);break;case"p":d=this.renderPerformance(a);break;case"t":d=this.renderTarget(a)}this.valueShapes[b]=d.id,this.shapes[d.id]=b,this.target.replaceWithShape(c,d)},renderRange:function(a,c){var d=this.values[a],e=b.round(this.canvasWidth*((d-this.min)/this.range)),f=this.options.get("rangeColors")[a-2];return c&&(f=this.calcHighlightColor(f,this.options)),this.target.drawRect(0,0,e-1,this.canvasHeight-1,f,f)},renderPerformance:function(a){var c=this.values[1],d=b.round(this.canvasWidth*((c-this.min)/this.range)),e=this.options.get("performanceColor");return a&&(e=this.calcHighlightColor(e,this.options)),this.target.drawRect(0,b.round(this.canvasHeight*.3),d-1,b.round(this.canvasHeight*.4)-1,e,e)},renderTarget:function(a){var c=this.values[0],d=b.round(this.canvasWidth*((c-this.min)/this.range)-this.options.get("targetWidth")/2),e=b.round(this.canvasHeight*.1),f=this.canvasHeight-e*2,g=this.options.get("targetColor");return a&&(g=this.calcHighlightColor(g,this.options)),this.target.drawRect(d,e,this.options.get("targetWidth")-1,f-1,g,g)},render:function(){var a=this.values.length,b=this.target,c,d;if(!B._super.render.call(this))return;for(c=2;c<a;c++)d=this.renderRange(c).append(),this.shapes[d.id]="r"+c,this.valueShapes["r"+c]=d.id;this.values[1]!==null&&(d=this.renderPerformance().append(),this.shapes[d.id]="p1",this.valueShapes.p1=d.id),this.values[0]!==null&&(d=this.renderTarget().append(),this.shapes[d.id]="t0",this.valueShapes.t0=d.id),b.render()}}),d.fn.sparkline.pie=C=g(d.fn.sparkline._base,{type:"pie",init:function(a,c,e,f,g){var h=0,i;C._super.init.call(this,a,c,e,f,g),this.shapes={},this.valueShapes={},this.values=c=d.map(c,Number),e.get("width")==="auto"&&(this.width=this.height);if(c.length>0)for(i=c.length;i--;)h+=c[i];this.total=h,this.initTarget(),this.radius=b.floor(b.min(this.canvasWidth,this.canvasHeight)/2)},getRegion:function(a,b,d){var e=this.target.getShapeAt(a,b,d);return e!==c&&this.shapes[e]!==c?this.shapes[e]:c},getCurrentRegionFields:function(){var a=this.currentRegion;return{isNull:this.values[a]===c,value:this.values[a],percent:this.values[a]/this.total*100,color:this.options.get("sliceColors")[a%this.options.get("sliceColors").length],offset:a}},changeHighlight:function(a){var b=this.currentRegion,c=this.renderSlice(b,a),d=this.valueShapes[b];delete this.shapes[d],this.target.replaceWithShape(d,c),this.valueShapes[b]=c.id,this.shapes[c.id]=b},renderSlice:function(a,d){var e=this.target,f=this.options,g=this.radius,h=f.get("borderWidth"),i=f.get("offset"),j=2*b.PI,k=this.values,l=this.total,m=i?2*b.PI*(i/360):0,n,o,p,q,r;q=k.length;for(p=0;p<q;p++){n=m,o=m,l>0&&(o=m+j*(k[p]/l));if(a===p)return r=f.get("sliceColors")[p%f.get("sliceColors").length],d&&(r=this.calcHighlightColor(r,f)),e.drawPieSlice(g,g,g-h,n,o,c,r);m=o}},render:function(){var a=this.target,d=this.values,e=this.options,f=this.radius,g=e.get("borderWidth"),h,i;if(!C._super.render.call(this))return;g&&a.drawCircle(f,f,b.floor(f-g/2),e.get("borderColor"),c,g).append();for(i=d.length;i--;)d[i]&&(h=this.renderSlice(i).append(),this.valueShapes[i]=h.id,this.shapes[h.id]=i);a.render()}}),d.fn.sparkline.box=D=g(d.fn.sparkline._base,{type:"box",init:function(a,b,c,e,f){D._super.init.call(this,a,b,c,e,f),this.values=d.map(b,Number),this.width=c.get("width")==="auto"?"4.0em":e,this.initTarget(),this.values.length||(this.disabled=1)},getRegion:function(){return 1},getCurrentRegionFields:function(){var a=[{field:"lq",value:this.quartiles[0]},{field:"med",value:this.quartiles
[1]},{field:"uq",value:this.quartiles[2]}];return this.loutlier!==c&&a.push({field:"lo",value:this.loutlier}),this.routlier!==c&&a.push({field:"ro",value:this.routlier}),this.lwhisker!==c&&a.push({field:"lw",value:this.lwhisker}),this.rwhisker!==c&&a.push({field:"rw",value:this.rwhisker}),a},render:function(){var a=this.target,d=this.values,e=d.length,f=this.options,g=this.canvasWidth,h=this.canvasHeight,i=f.get("chartRangeMin")===c?b.min.apply(b,d):f.get("chartRangeMin"),k=f.get("chartRangeMax")===c?b.max.apply(b,d):f.get("chartRangeMax"),l=0,m,n,o,p,q,r,s,t,u,v,w;if(!D._super.render.call(this))return;if(f.get("raw"))f.get("showOutliers")&&d.length>5?(n=d[0],m=d[1],p=d[2],q=d[3],r=d[4],s=d[5],t=d[6]):(m=d[0],p=d[1],q=d[2],r=d[3],s=d[4]);else{d.sort(function(a,b){return a-b}),p=j(d,1),q=j(d,2),r=j(d,3),o=r-p;if(f.get("showOutliers")){m=s=c;for(u=0;u<e;u++)m===c&&d[u]>p-o*f.get("outlierIQR")&&(m=d[u]),d[u]<r+o*f.get("outlierIQR")&&(s=d[u]);n=d[0],t=d[e-1]}else m=d[0],s=d[e-1]}this.quartiles=[p,q,r],this.lwhisker=m,this.rwhisker=s,this.loutlier=n,this.routlier=t,w=g/(k-i+1),f.get("showOutliers")&&(l=b.ceil(f.get("spotRadius")),g-=2*b.ceil(f.get("spotRadius")),w=g/(k-i+1),n<m&&a.drawCircle((n-i)*w+l,h/2,f.get("spotRadius"),f.get("outlierLineColor"),f.get("outlierFillColor")).append(),t>s&&a.drawCircle((t-i)*w+l,h/2,f.get("spotRadius"),f.get("outlierLineColor"),f.get("outlierFillColor")).append()),a.drawRect(b.round((p-i)*w+l),b.round(h*.1),b.round((r-p)*w),b.round(h*.8),f.get("boxLineColor"),f.get("boxFillColor")).append(),a.drawLine(b.round((m-i)*w+l),b.round(h/2),b.round((p-i)*w+l),b.round(h/2),f.get("lineColor")).append(),a.drawLine(b.round((m-i)*w+l),b.round(h/4),b.round((m-i)*w+l),b.round(h-h/4),f.get("whiskerColor")).append(),a.drawLine(b.round((s-i)*w+l),b.round(h/2),b.round((r-i)*w+l),b.round(h/2),f.get("lineColor")).append(),a.drawLine(b.round((s-i)*w+l),b.round(h/4),b.round((s-i)*w+l),b.round(h-h/4),f.get("whiskerColor")).append(),a.drawLine(b.round((q-i)*w+l),b.round(h*.1),b.round((q-i)*w+l),b.round(h*.9),f.get("medianColor")).append(),f.get("target")&&(v=b.ceil(f.get("spotRadius")),a.drawLine(b.round((f.get("target")-i)*w+l),b.round(h/2-v),b.round((f.get("target")-i)*w+l),b.round(h/2+v),f.get("targetColor")).append(),a.drawLine(b.round((f.get("target")-i)*w+l-v),b.round(h/2),b.round((f.get("target")-i)*w+l+v),b.round(h/2),f.get("targetColor")).append()),a.render()}}),G=g({init:function(a,b,c,d){this.target=a,this.id=b,this.type=c,this.args=d},append:function(){return this.target.appendShape(this),this}}),H=g({_pxregex:/(\d+)(px)?\s*$/i,init:function(a,b,c){if(!a)return;this.width=a,this.height=b,this.target=c,this.lastShapeId=null,c[0]&&(c=c[0]),d.data(c,"_jqs_vcanvas",this)},drawLine:function(a,b,c,d,e,f){return this.drawShape([[a,b],[c,d]],e,f)},drawShape:function(a,b,c,d){return this._genShape("Shape",[a,b,c,d])},drawCircle:function(a,b,c,d,e,f){return this._genShape("Circle",[a,b,c,d,e,f])},drawPieSlice:function(a,b,c,d,e,f,g){return this._genShape("PieSlice",[a,b,c,d,e,f,g])},drawRect:function(a,b,c,d,e,f){return this._genShape("Rect",[a,b,c,d,e,f])},getElement:function(){return this.canvas},getLastShapeId:function(){return this.lastShapeId},reset:function(){alert("reset not implemented")},_insert:function(a,b){d(b).html(a)},_calculatePixelDims:function(a,b,c){var e;e=this._pxregex.exec(b),e?this.pixelHeight=e[1]:this.pixelHeight=d(c).height(),e=this._pxregex.exec(a),e?this.pixelWidth=e[1]:this.pixelWidth=d(c).width()},_genShape:function(a,b){var c=L++;return b.unshift(c),new G(this,c,a,b)},appendShape:function(a){alert("appendShape not implemented")},replaceWithShape:function(a,b){alert("replaceWithShape not implemented")},insertAfterShape:function(a,b){alert("insertAfterShape not implemented")},removeShapeId:function(a){alert("removeShapeId not implemented")},getShapeAt:function(a,b,c){alert("getShapeAt not implemented")},render:function(){alert("render not implemented")}}),I=g(H,{init:function(b,e,f,g){I._super.init.call(this,b,e,f),this.canvas=a.createElement("canvas"),f[0]&&(f=f[0]),d.data(f,"_jqs_vcanvas",this),d(this.canvas).css({display:"inline-block",width:b,height:e,verticalAlign:"top"}),this._insert(this.canvas,f),this._calculatePixelDims(b,e,this.canvas),this.canvas.width=this.pixelWidth,this.canvas.height=this.pixelHeight,this.interact=g,this.shapes={},this.shapeseq=[],this.currentTargetShapeId=c,d(this.canvas).css({width:this.pixelWidth,height:this.pixelHeight})},_getContext:function(a,b,d){var e=this.canvas.getContext("2d");return a!==c&&(e.strokeStyle=a),e.lineWidth=d===c?1:d,b!==c&&(e.fillStyle=b),e},reset:function(){var a=this._getContext();a.clearRect(0,0,this.pixelWidth,this.pixelHeight),this.shapes={},this.shapeseq=[],this.currentTargetShapeId=c},_drawShape:function(a,b,d,e,f){var g=this._getContext(d,e,f),h,i;g.beginPath(),g.moveTo(b[0][0]+.5,b[0][1]+.5);for(h=1,i=b.length;h<i;h++)g.lineTo(b[h][0]+.5,b[h][1]+.5);d!==c&&g.stroke(),e!==c&&g.fill(),this.targetX!==c&&this.targetY!==c&&g.isPointInPath(this.targetX,this.targetY)&&(this.currentTargetShapeId=a)},_drawCircle:function(a,d,e,f,g,h,i){var j=this._getContext(g,h,i);j.beginPath(),j.arc(d,e,f,0,2*b.PI,!1),this.targetX!==c&&this.targetY!==c&&j.isPointInPath(this.targetX,this.targetY)&&(this.currentTargetShapeId=a),g!==c&&j.stroke(),h!==c&&j.fill()},_drawPieSlice:function(a,b,d,e,f,g,h,i){var j=this._getContext(h,i);j.beginPath(),j.moveTo(b,d),j.arc(b,d,e,f,g,!1),j.lineTo(b,d),j.closePath(),h!==c&&j.stroke(),i&&j.fill(),this.targetX!==c&&this.targetY!==c&&j.isPointInPath(this.targetX,this.targetY)&&(this.currentTargetShapeId=a)},_drawRect:function(a,b,c,d,e,f,g){return this._drawShape(a,[[b,c],[b+d,c],[b+d,c+e],[b,c+e],[b,c]],f,g)},appendShape:function(a){return this.shapes[a.id]=a,this.shapeseq.push(a.id),this.lastShapeId=a.id,a.id},replaceWithShape:function(a,b){var c=this.shapeseq,d;this.shapes[b.id]=b;for(d=c.length;d--;)c[d]==a&&(c[d]=b.id);delete this.shapes[a]},replaceWithShapes:function(a,b){var c=this.shapeseq,d={},e,f,g;for(f=a.length;f--;)d[a[f]]=!0;for(f=c.length;f--;)e=c[f],d[e]&&(c.splice(f,1),delete this.shapes[e],g=f);for(f=b.length;f--;)c.splice(g,0,b[f].id),this.shapes[b[f].id]=b[f]},insertAfterShape:function(a,b){var c=this.shapeseq,d;for(d=c.length;d--;)if(c[d]===a){c.splice(d+1,0,b.id),this.shapes[b.id]=b;return}},removeShapeId:function(a){var b=this.shapeseq,c;for(c=b.length;c--;)if(b[c]===a){b.splice(c,1);break}delete this.shapes[a]},getShapeAt:function(a,b,c){return this.targetX=b,this.targetY=c,this.render(),this.currentTargetShapeId},render:function(){var a=this.shapeseq,b=this.shapes,c=a.length,d=this._getContext(),e,f,g;d.clearRect(0,0,this.pixelWidth,this.pixelHeight);for(g=0;g<c;g++)e=a[g],f=b[e],this["_draw"+f.type].apply(this,f.args);this.interact||(this.shapes={},this.shapeseq=[])}}),J=g(H,{init:function(b,c,e){var f;J._super.init.call(this,b,c,e),e[0]&&(e=e[0]),d.data(e,"_jqs_vcanvas",this),this.canvas=a.createElement("span"),d(this.canvas).css({display:"inline-block",position:"relative",overflow:"hidden",width:b,height:c,margin:"0px",padding:"0px",verticalAlign:"top"}),this._insert(this.canvas,e),this._calculatePixelDims(b,c,this.canvas),this.canvas.width=this.pixelWidth,this.canvas.height=this.pixelHeight,f='<v:group coordorigin="0 0" coordsize="'+this.pixelWidth+" "+this.pixelHeight+'"'+' style="position:absolute;top:0;left:0;width:'+this.pixelWidth+"px;height="+this.pixelHeight+'px;"></v:group>',this.canvas.insertAdjacentHTML("beforeEnd",f),this.group=d(this.canvas).children()[0],this.rendered=!1,this.prerender=""},_drawShape:function(a,b,d,e,f){var g=[],h,i,j,k,l,m,n;for(n=0,m=b.length;n<m;n++)g[n]=""+b[n][0]+","+b[n][1];return h=g.splice(0,1),f=f===c?1:f,i=d===c?' stroked="false" ':' strokeWeight="'+f+'px" strokeColor="'+d+'" ',j=e===c?' filled="false"':' fillColor="'+e+'" filled="true" ',k=g[0]===g[g.length-1]?"x ":"",l='<v:shape coordorigin="0 0" coordsize="'+this.pixelWidth+" "+this.pixelHeight+'" '+' id="jqsshape'+a+'" '+i+j+' style="position:absolute;left:0px;top:0px;height:'+this.pixelHeight+"px;width:"+this.pixelWidth+'px;padding:0px;margin:0px;" '+' path="m '+h+" l "+g.join(", ")+" "+k+'e">'+" </v:shape>",l},_drawCircle:function(a,b,d,e,f,g,h){var i,j,k;return b-=e,d-=e,i=f===c?' stroked="false" ':' strokeWeight="'+h+'px" strokeColor="'+f+'" ',j=g===c?' filled="false"':' fillColor="'+g+'" filled="true" ',k='<v:oval  id="jqsshape'+a+'" '+i+j+' style="position:absolute;top:'+d+"px; left:"+b+"px; width:"+e*2+"px; height:"+e*2+'px"></v:oval>',k},_drawPieSlice:function(a,d,e,f,g,h,i,j){var k,l,m,n,o,p,q,r;if(g===h)return"";h-g===2*b.PI&&(g=0,h=2*b.PI),l=d+b.round(b.cos(g)*f),m=e+b.round(b.sin(g)*f),n=d+b.round(b.cos(h)*f),o=e+b.round(b.sin(h)*f);if(l===n&&m===o){if(h-g<b.PI)return"";l=n=d+f,m=o=e}return l===n&&m===o&&h-g<b.PI?"":(k=[d-f,e-f,d+f,e+f,l,m,n,o],p=i===c?' stroked="false" ':' strokeWeight="1px" strokeColor="'+i+'" ',q=j===c?' filled="false"':' fillColor="'+j+'" filled="true" ',r='<v:shape coordorigin="0 0" coordsize="'+this.pixelWidth+" "+this.pixelHeight+'" '+' id="jqsshape'+a+'" '+p+q+' style="position:absolute;left:0px;top:0px;height:'+this.pixelHeight+"px;width:"+this.pixelWidth+'px;padding:0px;margin:0px;" '+' path="m '+d+","+e+" wa "+k.join(", ")+' x e">'+" </v:shape>",r)},_drawRect:function(a,b,c,d,e,f,g){return this._drawShape(a,[[b,c],[b,c+e],[b+d,c+e],[b+d,c],[b,c]],f,g)},reset:function(){this.group.innerHTML=""},appendShape:function(a){var b=this["_draw"+a.type].apply(this,a.args);return this.rendered?this.group.insertAdjacentHTML("beforeEnd",b):this.prerender+=b,this.lastShapeId=a.id,a.id},replaceWithShape:function(a,b){var c=d("#jqsshape"+a),e=this["_draw"+b.type].apply(this,b.args);c[0].outerHTML=e},replaceWithShapes:function(a,b){var c=d("#jqsshape"+a[0]),e="",f=b.length,g;for(g=0;g<f;g++)e+=this["_draw"+b[g].type].apply(this,b[g].args);c[0].outerHTML=e;for(g=1;g<a.length;g++)d("#jqsshape"+a[g]).remove()},insertAfterShape:function(a,b){var c=d("#jqsshape"+a),e=this["_draw"+b.type].apply(this,b.args);c[0].insertAdjacentHTML("afterEnd",e)},removeShapeId:function(a){var b=d("#jqsshape"+a);this.group.removeChild(b[0])},getShapeAt:function(a,b,c){var d=a.id.substr(8);return d},render:function(){this.rendered||(this.group.innerHTML=this.prerender,this.rendered=!0)}})})})(document,Math);
!function t(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.Raphael=r():e.Raphael=r()}(this,function(){return function(t){function e(i){if(r[i])return r[i].exports;var n=r[i]={exports:{},id:i,loaded:!1};return t[i].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){var i,n;i=[r(1),r(3),r(4)],n=function(t){return t}.apply(e,i),!(void 0!==n&&(t.exports=n))},function(t,e,r){var i,n;i=[r(2)],n=function(t){function e(r){if(e.is(r,"function"))return w?r():t.on("raphael.DOMload",r);if(e.is(r,Q))return e._engine.create[z](e,r.splice(0,3+e.is(r[0],$))).add(r);var i=Array.prototype.slice.call(arguments,0);if(e.is(i[i.length-1],"function")){var n=i.pop();return w?n.call(e._engine.create[z](e,i)):t.on("raphael.DOMload",function(){n.call(e._engine.create[z](e,i))})}return e._engine.create[z](e,arguments)}function r(t){if("function"==typeof t||Object(t)!==t)return t;var e=new t.constructor;for(var i in t)t[A](i)&&(e[i]=r(t[i]));return e}function i(t,e){for(var r=0,i=t.length;r<i;r++)if(t[r]===e)return t.push(t.splice(r,1)[0])}function n(t,e,r){function n(){var a=Array.prototype.slice.call(arguments,0),s=a.join("␀"),o=n.cache=n.cache||{},l=n.count=n.count||[];return o[A](s)?(i(l,s),r?r(o[s]):o[s]):(l.length>=1e3&&delete o[l.shift()],l.push(s),o[s]=t[z](e,a),r?r(o[s]):o[s])}return n}function a(){return this.hex}function s(t,e){for(var r=[],i=0,n=t.length;n-2*!e>i;i+=2){var a=[{x:+t[i-2],y:+t[i-1]},{x:+t[i],y:+t[i+1]},{x:+t[i+2],y:+t[i+3]},{x:+t[i+4],y:+t[i+5]}];e?i?n-4==i?a[3]={x:+t[0],y:+t[1]}:n-2==i&&(a[2]={x:+t[0],y:+t[1]},a[3]={x:+t[2],y:+t[3]}):a[0]={x:+t[n-2],y:+t[n-1]}:n-4==i?a[3]=a[2]:i||(a[0]={x:+t[i],y:+t[i+1]}),r.push(["C",(-a[0].x+6*a[1].x+a[2].x)/6,(-a[0].y+6*a[1].y+a[2].y)/6,(a[1].x+6*a[2].x-a[3].x)/6,(a[1].y+6*a[2].y-a[3].y)/6,a[2].x,a[2].y])}return r}function o(t,e,r,i,n){var a=-3*e+9*r-9*i+3*n,s=t*a+6*e-12*r+6*i;return t*s-3*e+3*r}function l(t,e,r,i,n,a,s,l,h){null==h&&(h=1),h=h>1?1:h<0?0:h;for(var u=h/2,c=12,f=[-.1252,.1252,-.3678,.3678,-.5873,.5873,-.7699,.7699,-.9041,.9041,-.9816,.9816],p=[.2491,.2491,.2335,.2335,.2032,.2032,.1601,.1601,.1069,.1069,.0472,.0472],d=0,g=0;g<c;g++){var v=u*f[g]+u,x=o(v,t,r,n,s),y=o(v,e,i,a,l),m=x*x+y*y;d+=p[g]*Y.sqrt(m)}return u*d}function h(t,e,r,i,n,a,s,o,h){if(!(h<0||l(t,e,r,i,n,a,s,o)<h)){var u=1,c=u/2,f=u-c,p,d=.01;for(p=l(t,e,r,i,n,a,s,o,f);H(p-h)>d;)c/=2,f+=(p<h?1:-1)*c,p=l(t,e,r,i,n,a,s,o,f);return f}}function u(t,e,r,i,n,a,s,o){if(!(W(t,r)<G(n,s)||G(t,r)>W(n,s)||W(e,i)<G(a,o)||G(e,i)>W(a,o))){var l=(t*i-e*r)*(n-s)-(t-r)*(n*o-a*s),h=(t*i-e*r)*(a-o)-(e-i)*(n*o-a*s),u=(t-r)*(a-o)-(e-i)*(n-s);if(u){var c=l/u,f=h/u,p=+c.toFixed(2),d=+f.toFixed(2);if(!(p<+G(t,r).toFixed(2)||p>+W(t,r).toFixed(2)||p<+G(n,s).toFixed(2)||p>+W(n,s).toFixed(2)||d<+G(e,i).toFixed(2)||d>+W(e,i).toFixed(2)||d<+G(a,o).toFixed(2)||d>+W(a,o).toFixed(2)))return{x:c,y:f}}}}function c(t,e){return p(t,e)}function f(t,e){return p(t,e,1)}function p(t,r,i){var n=e.bezierBBox(t),a=e.bezierBBox(r);if(!e.isBBoxIntersect(n,a))return i?0:[];for(var s=l.apply(0,t),o=l.apply(0,r),h=W(~~(s/5),1),c=W(~~(o/5),1),f=[],p=[],d={},g=i?0:[],v=0;v<h+1;v++){var x=e.findDotsAtSegment.apply(e,t.concat(v/h));f.push({x:x.x,y:x.y,t:v/h})}for(v=0;v<c+1;v++)x=e.findDotsAtSegment.apply(e,r.concat(v/c)),p.push({x:x.x,y:x.y,t:v/c});for(v=0;v<h;v++)for(var y=0;y<c;y++){var m=f[v],b=f[v+1],_=p[y],w=p[y+1],k=H(b.x-m.x)<.001?"y":"x",B=H(w.x-_.x)<.001?"y":"x",C=u(m.x,m.y,b.x,b.y,_.x,_.y,w.x,w.y);if(C){if(d[C.x.toFixed(4)]==C.y.toFixed(4))continue;d[C.x.toFixed(4)]=C.y.toFixed(4);var S=m.t+H((C[k]-m[k])/(b[k]-m[k]))*(b.t-m.t),A=_.t+H((C[B]-_[B])/(w[B]-_[B]))*(w.t-_.t);S>=0&&S<=1.001&&A>=0&&A<=1.001&&(i?g++:g.push({x:C.x,y:C.y,t1:G(S,1),t2:G(A,1)}))}}return g}function d(t,r,i){t=e._path2curve(t),r=e._path2curve(r);for(var n,a,s,o,l,h,u,c,f,d,g=i?0:[],v=0,x=t.length;v<x;v++){var y=t[v];if("M"==y[0])n=l=y[1],a=h=y[2];else{"C"==y[0]?(f=[n,a].concat(y.slice(1)),n=f[6],a=f[7]):(f=[n,a,n,a,l,h,l,h],n=l,a=h);for(var m=0,b=r.length;m<b;m++){var _=r[m];if("M"==_[0])s=u=_[1],o=c=_[2];else{"C"==_[0]?(d=[s,o].concat(_.slice(1)),s=d[6],o=d[7]):(d=[s,o,s,o,u,c,u,c],s=u,o=c);var w=p(f,d,i);if(i)g+=w;else{for(var k=0,B=w.length;k<B;k++)w[k].segment1=v,w[k].segment2=m,w[k].bez1=f,w[k].bez2=d;g=g.concat(w)}}}}}return g}function g(t,e,r,i,n,a){null!=t?(this.a=+t,this.b=+e,this.c=+r,this.d=+i,this.e=+n,this.f=+a):(this.a=1,this.b=0,this.c=0,this.d=1,this.e=0,this.f=0)}function v(){return this.x+j+this.y}function x(){return this.x+j+this.y+j+this.width+" × "+this.height}function y(t,e,r,i,n,a){function s(t){return((c*t+u)*t+h)*t}function o(t,e){var r=l(t,e);return((d*r+p)*r+f)*r}function l(t,e){var r,i,n,a,o,l;for(n=t,l=0;l<8;l++){if(a=s(n)-t,H(a)<e)return n;if(o=(3*c*n+2*u)*n+h,H(o)<1e-6)break;n-=a/o}if(r=0,i=1,n=t,n<r)return r;if(n>i)return i;for(;r<i;){if(a=s(n),H(a-t)<e)return n;t>a?r=n:i=n,n=(i-r)/2+r}return n}var h=3*e,u=3*(i-e)-h,c=1-h-u,f=3*r,p=3*(n-r)-f,d=1-f-p;return o(t,1/(200*a))}function m(t,e){var r=[],i={};if(this.ms=e,this.times=1,t){for(var n in t)t[A](n)&&(i[ht(n)]=t[n],r.push(ht(n)));r.sort(Bt)}this.anim=i,this.top=r[r.length-1],this.percents=r}function b(r,i,n,a,s,o){n=ht(n);var l,h,u,c=[],f,p,d,v=r.ms,x={},m={},b={};if(a)for(w=0,B=Ee.length;w<B;w++){var _=Ee[w];if(_.el.id==i.id&&_.anim==r){_.percent!=n?(Ee.splice(w,1),u=1):h=_,i.attr(_.totalOrigin);break}}else a=+m;for(var w=0,B=r.percents.length;w<B;w++){if(r.percents[w]==n||r.percents[w]>a*r.top){n=r.percents[w],p=r.percents[w-1]||0,v=v/r.top*(n-p),f=r.percents[w+1],l=r.anim[n];break}a&&i.attr(r.anim[r.percents[w]])}if(l){if(h)h.initstatus=a,h.start=new Date-h.ms*a;else{for(var C in l)if(l[A](C)&&(pt[A](C)||i.paper.customAttributes[A](C)))switch(x[C]=i.attr(C),null==x[C]&&(x[C]=ft[C]),m[C]=l[C],pt[C]){case $:b[C]=(m[C]-x[C])/v;break;case"colour":x[C]=e.getRGB(x[C]);var S=e.getRGB(m[C]);b[C]={r:(S.r-x[C].r)/v,g:(S.g-x[C].g)/v,b:(S.b-x[C].b)/v};break;case"path":var T=Qt(x[C],m[C]),E=T[1];for(x[C]=T[0],b[C]=[],w=0,B=x[C].length;w<B;w++){b[C][w]=[0];for(var M=1,N=x[C][w].length;M<N;M++)b[C][w][M]=(E[w][M]-x[C][w][M])/v}break;case"transform":var L=i._,z=le(L[C],m[C]);if(z)for(x[C]=z.from,m[C]=z.to,b[C]=[],b[C].real=!0,w=0,B=x[C].length;w<B;w++)for(b[C][w]=[x[C][w][0]],M=1,N=x[C][w].length;M<N;M++)b[C][w][M]=(m[C][w][M]-x[C][w][M])/v;else{var F=i.matrix||new g,R={_:{transform:L.transform},getBBox:function(){return i.getBBox(1)}};x[C]=[F.a,F.b,F.c,F.d,F.e,F.f],se(R,m[C]),m[C]=R._.transform,b[C]=[(R.matrix.a-F.a)/v,(R.matrix.b-F.b)/v,(R.matrix.c-F.c)/v,(R.matrix.d-F.d)/v,(R.matrix.e-F.e)/v,(R.matrix.f-F.f)/v]}break;case"csv":var j=I(l[C])[q](k),D=I(x[C])[q](k);if("clip-rect"==C)for(x[C]=D,b[C]=[],w=D.length;w--;)b[C][w]=(j[w]-x[C][w])/v;m[C]=j;break;default:for(j=[][P](l[C]),D=[][P](x[C]),b[C]=[],w=i.paper.customAttributes[C].length;w--;)b[C][w]=((j[w]||0)-(D[w]||0))/v}var V=l.easing,O=e.easing_formulas[V];if(!O)if(O=I(V).match(st),O&&5==O.length){var Y=O;O=function(t){return y(t,+Y[1],+Y[2],+Y[3],+Y[4],v)}}else O=St;if(d=l.start||r.start||+new Date,_={anim:r,percent:n,timestamp:d,start:d+(r.del||0),status:0,initstatus:a||0,stop:!1,ms:v,easing:O,from:x,diff:b,to:m,el:i,callback:l.callback,prev:p,next:f,repeat:o||r.times,origin:i.attr(),totalOrigin:s},Ee.push(_),a&&!h&&!u&&(_.stop=!0,_.start=new Date-v*a,1==Ee.length))return Ne();u&&(_.start=new Date-_.ms*a),1==Ee.length&&Me(Ne)}t("raphael.anim.start."+i.id,i,r)}}function _(t){for(var e=0;e<Ee.length;e++)Ee[e].el.paper==t&&Ee.splice(e--,1)}e.version="2.2.0",e.eve=t;var w,k=/[, ]+/,B={circle:1,rect:1,path:1,ellipse:1,text:1,image:1},C=/\{(\d+)\}/g,S="prototype",A="hasOwnProperty",T={doc:document,win:window},E={was:Object.prototype[A].call(T.win,"Raphael"),is:T.win.Raphael},M=function(){this.ca=this.customAttributes={}},N,L="appendChild",z="apply",P="concat",F="ontouchstart"in T.win||T.win.DocumentTouch&&T.doc instanceof DocumentTouch,R="",j=" ",I=String,q="split",D="click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[q](j),V={mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"},O=I.prototype.toLowerCase,Y=Math,W=Y.max,G=Y.min,H=Y.abs,X=Y.pow,U=Y.PI,$="number",Z="string",Q="array",J="toString",K="fill",tt=Object.prototype.toString,et={},rt="push",it=e._ISURL=/^url\(['"]?(.+?)['"]?\)$/i,nt=/^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,at={NaN:1,Infinity:1,"-Infinity":1},st=/^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,ot=Y.round,lt="setAttribute",ht=parseFloat,ut=parseInt,ct=I.prototype.toUpperCase,ft=e._availableAttrs={"arrow-end":"none","arrow-start":"none",blur:0,"clip-rect":"0 0 1e9 1e9",cursor:"default",cx:0,cy:0,fill:"#fff","fill-opacity":1,font:'10px "Arial"',"font-family":'"Arial"',"font-size":"10","font-style":"normal","font-weight":400,gradient:0,height:0,href:"http://raphaeljs.com/","letter-spacing":0,opacity:1,path:"M0,0",r:0,rx:0,ry:0,src:"",stroke:"#000","stroke-dasharray":"","stroke-linecap":"butt","stroke-linejoin":"butt","stroke-miterlimit":0,"stroke-opacity":1,"stroke-width":1,target:"_blank","text-anchor":"middle",title:"Raphael",transform:"",width:0,x:0,y:0,"class":""},pt=e._availableAnimAttrs={blur:$,"clip-rect":"csv",cx:$,cy:$,fill:"colour","fill-opacity":$,"font-size":$,height:$,opacity:$,path:"path",r:$,rx:$,ry:$,stroke:"colour","stroke-opacity":$,"stroke-width":$,transform:"transform",width:$,x:$,y:$},dt=/[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,gt=/[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,vt={hs:1,rg:1},xt=/,?([achlmqrstvxz]),?/gi,yt=/([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,mt=/([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,bt=/(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,_t=e._radial_gradient=/^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,wt={},kt=function(t,e){return t.key-e.key},Bt=function(t,e){return ht(t)-ht(e)},Ct=function(){},St=function(t){return t},At=e._rectPath=function(t,e,r,i,n){return n?[["M",t+n,e],["l",r-2*n,0],["a",n,n,0,0,1,n,n],["l",0,i-2*n],["a",n,n,0,0,1,-n,n],["l",2*n-r,0],["a",n,n,0,0,1,-n,-n],["l",0,2*n-i],["a",n,n,0,0,1,n,-n],["z"]]:[["M",t,e],["l",r,0],["l",0,i],["l",-r,0],["z"]]},Tt=function(t,e,r,i){return null==i&&(i=r),[["M",t,e],["m",0,-i],["a",r,i,0,1,1,0,2*i],["a",r,i,0,1,1,0,-2*i],["z"]]},Et=e._getPath={path:function(t){return t.attr("path")},circle:function(t){var e=t.attrs;return Tt(e.cx,e.cy,e.r)},ellipse:function(t){var e=t.attrs;return Tt(e.cx,e.cy,e.rx,e.ry)},rect:function(t){var e=t.attrs;return At(e.x,e.y,e.width,e.height,e.r)},image:function(t){var e=t.attrs;return At(e.x,e.y,e.width,e.height)},text:function(t){var e=t._getBBox();return At(e.x,e.y,e.width,e.height)},set:function(t){var e=t._getBBox();return At(e.x,e.y,e.width,e.height)}},Mt=e.mapPath=function(t,e){if(!e)return t;var r,i,n,a,s,o,l;for(t=Qt(t),n=0,s=t.length;n<s;n++)for(l=t[n],a=1,o=l.length;a<o;a+=2)r=e.x(l[a],l[a+1]),i=e.y(l[a],l[a+1]),l[a]=r,l[a+1]=i;return t};if(e._g=T,e.type=T.win.SVGAngle||T.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML","VML"==e.type){var Nt=T.doc.createElement("div"),Lt;if(Nt.innerHTML='<v:shape adj="1"/>',Lt=Nt.firstChild,Lt.style.behavior="url(#default#VML)",!Lt||"object"!=typeof Lt.adj)return e.type=R;Nt=null}e.svg=!(e.vml="VML"==e.type),e._Paper=M,e.fn=N=M.prototype=e.prototype,e._id=0,e.is=function(t,e){return e=O.call(e),"finite"==e?!at[A](+t):"array"==e?t instanceof Array:"null"==e&&null===t||e==typeof t&&null!==t||"object"==e&&t===Object(t)||"array"==e&&Array.isArray&&Array.isArray(t)||tt.call(t).slice(8,-1).toLowerCase()==e},e.angle=function(t,r,i,n,a,s){if(null==a){var o=t-i,l=r-n;return o||l?(180+180*Y.atan2(-l,-o)/U+360)%360:0}return e.angle(t,r,a,s)-e.angle(i,n,a,s)},e.rad=function(t){return t%360*U/180},e.deg=function(t){return Math.round(180*t/U%360*1e3)/1e3},e.snapTo=function(t,r,i){if(i=e.is(i,"finite")?i:10,e.is(t,Q)){for(var n=t.length;n--;)if(H(t[n]-r)<=i)return t[n]}else{t=+t;var a=r%t;if(a<i)return r-a;if(a>t-i)return r-a+t}return r};var zt=e.createUUID=function(t,e){return function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(t,e).toUpperCase()}}(/[xy]/g,function(t){var e=16*Y.random()|0,r="x"==t?e:3&e|8;return r.toString(16)});e.setWindow=function(r){t("raphael.setWindow",e,T.win,r),T.win=r,T.doc=T.win.document,e._engine.initWin&&e._engine.initWin(T.win)};var Pt=function(t){if(e.vml){var r=/^\s+|\s+$/g,i;try{var a=new ActiveXObject("htmlfile");a.write("<body>"),a.close(),i=a.body}catch(s){i=createPopup().document.body}var o=i.createTextRange();Pt=n(function(t){try{i.style.color=I(t).replace(r,R);var e=o.queryCommandValue("ForeColor");return e=(255&e)<<16|65280&e|(16711680&e)>>>16,"#"+("000000"+e.toString(16)).slice(-6)}catch(n){return"none"}})}else{var l=T.doc.createElement("i");l.title="Raphaël Colour Picker",l.style.display="none",T.doc.body.appendChild(l),Pt=n(function(t){return l.style.color=t,T.doc.defaultView.getComputedStyle(l,R).getPropertyValue("color")})}return Pt(t)},Ft=function(){return"hsb("+[this.h,this.s,this.b]+")"},Rt=function(){return"hsl("+[this.h,this.s,this.l]+")"},jt=function(){return this.hex},It=function(t,r,i){if(null==r&&e.is(t,"object")&&"r"in t&&"g"in t&&"b"in t&&(i=t.b,r=t.g,t=t.r),null==r&&e.is(t,Z)){var n=e.getRGB(t);t=n.r,r=n.g,i=n.b}return(t>1||r>1||i>1)&&(t/=255,r/=255,i/=255),[t,r,i]},qt=function(t,r,i,n){t*=255,r*=255,i*=255;var a={r:t,g:r,b:i,hex:e.rgb(t,r,i),toString:jt};return e.is(n,"finite")&&(a.opacity=n),a};e.color=function(t){var r;return e.is(t,"object")&&"h"in t&&"s"in t&&"b"in t?(r=e.hsb2rgb(t),t.r=r.r,t.g=r.g,t.b=r.b,t.hex=r.hex):e.is(t,"object")&&"h"in t&&"s"in t&&"l"in t?(r=e.hsl2rgb(t),t.r=r.r,t.g=r.g,t.b=r.b,t.hex=r.hex):(e.is(t,"string")&&(t=e.getRGB(t)),e.is(t,"object")&&"r"in t&&"g"in t&&"b"in t?(r=e.rgb2hsl(t),t.h=r.h,t.s=r.s,t.l=r.l,r=e.rgb2hsb(t),t.v=r.b):(t={hex:"none"},t.r=t.g=t.b=t.h=t.s=t.v=t.l=-1)),t.toString=jt,t},e.hsb2rgb=function(t,e,r,i){this.is(t,"object")&&"h"in t&&"s"in t&&"b"in t&&(r=t.b,e=t.s,i=t.o,t=t.h),t*=360;var n,a,s,o,l;return t=t%360/60,l=r*e,o=l*(1-H(t%2-1)),n=a=s=r-l,t=~~t,n+=[l,o,0,0,o,l][t],a+=[o,l,l,o,0,0][t],s+=[0,0,o,l,l,o][t],qt(n,a,s,i)},e.hsl2rgb=function(t,e,r,i){this.is(t,"object")&&"h"in t&&"s"in t&&"l"in t&&(r=t.l,e=t.s,t=t.h),(t>1||e>1||r>1)&&(t/=360,e/=100,r/=100),t*=360;var n,a,s,o,l;return t=t%360/60,l=2*e*(r<.5?r:1-r),o=l*(1-H(t%2-1)),n=a=s=r-l/2,t=~~t,n+=[l,o,0,0,o,l][t],a+=[o,l,l,o,0,0][t],s+=[0,0,o,l,l,o][t],qt(n,a,s,i)},e.rgb2hsb=function(t,e,r){r=It(t,e,r),t=r[0],e=r[1],r=r[2];var i,n,a,s;return a=W(t,e,r),s=a-G(t,e,r),i=0==s?null:a==t?(e-r)/s:a==e?(r-t)/s+2:(t-e)/s+4,i=(i+360)%6*60/360,n=0==s?0:s/a,{h:i,s:n,b:a,toString:Ft}},e.rgb2hsl=function(t,e,r){r=It(t,e,r),t=r[0],e=r[1],r=r[2];var i,n,a,s,o,l;return s=W(t,e,r),o=G(t,e,r),l=s-o,i=0==l?null:s==t?(e-r)/l:s==e?(r-t)/l+2:(t-e)/l+4,i=(i+360)%6*60/360,a=(s+o)/2,n=0==l?0:a<.5?l/(2*a):l/(2-2*a),{h:i,s:n,l:a,toString:Rt}},e._path2string=function(){return this.join(",").replace(xt,"$1")};var Dt=e._preload=function(t,e){var r=T.doc.createElement("img");r.style.cssText="position:absolute;left:-9999em;top:-9999em",r.onload=function(){e.call(this),this.onload=null,T.doc.body.removeChild(this)},r.onerror=function(){T.doc.body.removeChild(this)},T.doc.body.appendChild(r),r.src=t};e.getRGB=n(function(t){if(!t||(t=I(t)).indexOf("-")+1)return{r:-1,g:-1,b:-1,hex:"none",error:1,toString:a};if("none"==t)return{r:-1,g:-1,b:-1,hex:"none",toString:a};!(vt[A](t.toLowerCase().substring(0,2))||"#"==t.charAt())&&(t=Pt(t));var r,i,n,s,o,l,h,u=t.match(nt);return u?(u[2]&&(s=ut(u[2].substring(5),16),n=ut(u[2].substring(3,5),16),i=ut(u[2].substring(1,3),16)),u[3]&&(s=ut((l=u[3].charAt(3))+l,16),n=ut((l=u[3].charAt(2))+l,16),i=ut((l=u[3].charAt(1))+l,16)),u[4]&&(h=u[4][q](gt),i=ht(h[0]),"%"==h[0].slice(-1)&&(i*=2.55),n=ht(h[1]),"%"==h[1].slice(-1)&&(n*=2.55),s=ht(h[2]),"%"==h[2].slice(-1)&&(s*=2.55),"rgba"==u[1].toLowerCase().slice(0,4)&&(o=ht(h[3])),h[3]&&"%"==h[3].slice(-1)&&(o/=100)),u[5]?(h=u[5][q](gt),i=ht(h[0]),"%"==h[0].slice(-1)&&(i*=2.55),n=ht(h[1]),"%"==h[1].slice(-1)&&(n*=2.55),s=ht(h[2]),"%"==h[2].slice(-1)&&(s*=2.55),("deg"==h[0].slice(-3)||"°"==h[0].slice(-1))&&(i/=360),"hsba"==u[1].toLowerCase().slice(0,4)&&(o=ht(h[3])),h[3]&&"%"==h[3].slice(-1)&&(o/=100),e.hsb2rgb(i,n,s,o)):u[6]?(h=u[6][q](gt),i=ht(h[0]),"%"==h[0].slice(-1)&&(i*=2.55),n=ht(h[1]),"%"==h[1].slice(-1)&&(n*=2.55),s=ht(h[2]),"%"==h[2].slice(-1)&&(s*=2.55),("deg"==h[0].slice(-3)||"°"==h[0].slice(-1))&&(i/=360),"hsla"==u[1].toLowerCase().slice(0,4)&&(o=ht(h[3])),h[3]&&"%"==h[3].slice(-1)&&(o/=100),e.hsl2rgb(i,n,s,o)):(u={r:i,g:n,b:s,toString:a},u.hex="#"+(16777216|s|n<<8|i<<16).toString(16).slice(1),e.is(o,"finite")&&(u.opacity=o),u)):{r:-1,g:-1,b:-1,hex:"none",error:1,toString:a}},e),e.hsb=n(function(t,r,i){return e.hsb2rgb(t,r,i).hex}),e.hsl=n(function(t,r,i){return e.hsl2rgb(t,r,i).hex}),e.rgb=n(function(t,e,r){function i(t){return t+.5|0}return"#"+(16777216|i(r)|i(e)<<8|i(t)<<16).toString(16).slice(1)}),e.getColor=function(t){var e=this.getColor.start=this.getColor.start||{h:0,s:1,b:t||.75},r=this.hsb2rgb(e.h,e.s,e.b);return e.h+=.075,e.h>1&&(e.h=0,e.s-=.2,e.s<=0&&(this.getColor.start={h:0,s:1,b:e.b})),r.hex},e.getColor.reset=function(){delete this.start},e.parsePathString=function(t){if(!t)return null;var r=Vt(t);if(r.arr)return Yt(r.arr);var i={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},n=[];return e.is(t,Q)&&e.is(t[0],Q)&&(n=Yt(t)),n.length||I(t).replace(yt,function(t,e,r){var a=[],s=e.toLowerCase();if(r.replace(bt,function(t,e){e&&a.push(+e)}),"m"==s&&a.length>2&&(n.push([e][P](a.splice(0,2))),s="l",e="m"==e?"l":"L"),"r"==s)n.push([e][P](a));else for(;a.length>=i[s]&&(n.push([e][P](a.splice(0,i[s]))),i[s]););}),n.toString=e._path2string,r.arr=Yt(n),n},e.parseTransformString=n(function(t){if(!t)return null;var r={r:3,s:4,t:2,m:6},i=[];return e.is(t,Q)&&e.is(t[0],Q)&&(i=Yt(t)),i.length||I(t).replace(mt,function(t,e,r){var n=[],a=O.call(e);r.replace(bt,function(t,e){e&&n.push(+e)}),i.push([e][P](n))}),i.toString=e._path2string,i});var Vt=function(t){var e=Vt.ps=Vt.ps||{};return e[t]?e[t].sleep=100:e[t]={sleep:100},setTimeout(function(){for(var r in e)e[A](r)&&r!=t&&(e[r].sleep--,!e[r].sleep&&delete e[r])}),e[t]};e.findDotsAtSegment=function(t,e,r,i,n,a,s,o,l){var h=1-l,u=X(h,3),c=X(h,2),f=l*l,p=f*l,d=u*t+3*c*l*r+3*h*l*l*n+p*s,g=u*e+3*c*l*i+3*h*l*l*a+p*o,v=t+2*l*(r-t)+f*(n-2*r+t),x=e+2*l*(i-e)+f*(a-2*i+e),y=r+2*l*(n-r)+f*(s-2*n+r),m=i+2*l*(a-i)+f*(o-2*a+i),b=h*t+l*r,_=h*e+l*i,w=h*n+l*s,k=h*a+l*o,B=90-180*Y.atan2(v-y,x-m)/U;return(v>y||x<m)&&(B+=180),{x:d,y:g,m:{x:v,y:x},n:{x:y,y:m},start:{x:b,y:_},end:{x:w,y:k},alpha:B}},e.bezierBBox=function(t,r,i,n,a,s,o,l){e.is(t,"array")||(t=[t,r,i,n,a,s,o,l]);var h=Zt.apply(null,t);return{x:h.min.x,y:h.min.y,x2:h.max.x,y2:h.max.y,width:h.max.x-h.min.x,height:h.max.y-h.min.y}},e.isPointInsideBBox=function(t,e,r){return e>=t.x&&e<=t.x2&&r>=t.y&&r<=t.y2},e.isBBoxIntersect=function(t,r){var i=e.isPointInsideBBox;return i(r,t.x,t.y)||i(r,t.x2,t.y)||i(r,t.x,t.y2)||i(r,t.x2,t.y2)||i(t,r.x,r.y)||i(t,r.x2,r.y)||i(t,r.x,r.y2)||i(t,r.x2,r.y2)||(t.x<r.x2&&t.x>r.x||r.x<t.x2&&r.x>t.x)&&(t.y<r.y2&&t.y>r.y||r.y<t.y2&&r.y>t.y)},e.pathIntersection=function(t,e){return d(t,e)},e.pathIntersectionNumber=function(t,e){return d(t,e,1)},e.isPointInsidePath=function(t,r,i){var n=e.pathBBox(t);return e.isPointInsideBBox(n,r,i)&&d(t,[["M",r,i],["H",n.x2+10]],1)%2==1},e._removedFactory=function(e){return function(){t("raphael.log",null,"Raphaël: you are calling to method “"+e+"” of removed object",e)}};var Ot=e.pathBBox=function(t){var e=Vt(t);if(e.bbox)return r(e.bbox);if(!t)return{x:0,y:0,width:0,height:0,x2:0,y2:0};t=Qt(t);for(var i=0,n=0,a=[],s=[],o,l=0,h=t.length;l<h;l++)if(o=t[l],"M"==o[0])i=o[1],n=o[2],a.push(i),s.push(n);else{var u=Zt(i,n,o[1],o[2],o[3],o[4],o[5],o[6]);a=a[P](u.min.x,u.max.x),s=s[P](u.min.y,u.max.y),i=o[5],n=o[6]}var c=G[z](0,a),f=G[z](0,s),p=W[z](0,a),d=W[z](0,s),g=p-c,v=d-f,x={x:c,y:f,x2:p,y2:d,width:g,height:v,cx:c+g/2,cy:f+v/2};return e.bbox=r(x),x},Yt=function(t){var i=r(t);return i.toString=e._path2string,i},Wt=e._pathToRelative=function(t){var r=Vt(t);if(r.rel)return Yt(r.rel);e.is(t,Q)&&e.is(t&&t[0],Q)||(t=e.parsePathString(t));var i=[],n=0,a=0,s=0,o=0,l=0;"M"==t[0][0]&&(n=t[0][1],a=t[0][2],s=n,o=a,l++,i.push(["M",n,a]));for(var h=l,u=t.length;h<u;h++){var c=i[h]=[],f=t[h];if(f[0]!=O.call(f[0]))switch(c[0]=O.call(f[0]),c[0]){case"a":c[1]=f[1],c[2]=f[2],c[3]=f[3],c[4]=f[4],c[5]=f[5],c[6]=+(f[6]-n).toFixed(3),c[7]=+(f[7]-a).toFixed(3);break;case"v":c[1]=+(f[1]-a).toFixed(3);break;case"m":s=f[1],o=f[2];default:for(var p=1,d=f.length;p<d;p++)c[p]=+(f[p]-(p%2?n:a)).toFixed(3)}else{c=i[h]=[],"m"==f[0]&&(s=f[1]+n,o=f[2]+a);for(var g=0,v=f.length;g<v;g++)i[h][g]=f[g]}var x=i[h].length;switch(i[h][0]){case"z":n=s,a=o;break;case"h":n+=+i[h][x-1];break;case"v":a+=+i[h][x-1];break;default:n+=+i[h][x-2],a+=+i[h][x-1]}}return i.toString=e._path2string,r.rel=Yt(i),i},Gt=e._pathToAbsolute=function(t){var r=Vt(t);if(r.abs)return Yt(r.abs);if(e.is(t,Q)&&e.is(t&&t[0],Q)||(t=e.parsePathString(t)),!t||!t.length)return[["M",0,0]];var i=[],n=0,a=0,o=0,l=0,h=0;"M"==t[0][0]&&(n=+t[0][1],a=+t[0][2],o=n,l=a,h++,i[0]=["M",n,a]);for(var u=3==t.length&&"M"==t[0][0]&&"R"==t[1][0].toUpperCase()&&"Z"==t[2][0].toUpperCase(),c,f,p=h,d=t.length;p<d;p++){if(i.push(c=[]),f=t[p],f[0]!=ct.call(f[0]))switch(c[0]=ct.call(f[0]),c[0]){case"A":c[1]=f[1],c[2]=f[2],c[3]=f[3],c[4]=f[4],c[5]=f[5],c[6]=+(f[6]+n),c[7]=+(f[7]+a);break;case"V":c[1]=+f[1]+a;break;case"H":c[1]=+f[1]+n;break;case"R":for(var g=[n,a][P](f.slice(1)),v=2,x=g.length;v<x;v++)g[v]=+g[v]+n,g[++v]=+g[v]+a;i.pop(),i=i[P](s(g,u));break;case"M":o=+f[1]+n,l=+f[2]+a;default:for(v=1,x=f.length;v<x;v++)c[v]=+f[v]+(v%2?n:a)}else if("R"==f[0])g=[n,a][P](f.slice(1)),i.pop(),i=i[P](s(g,u)),c=["R"][P](f.slice(-2));else for(var y=0,m=f.length;y<m;y++)c[y]=f[y];switch(c[0]){case"Z":n=o,a=l;break;case"H":n=c[1];break;case"V":a=c[1];break;case"M":o=c[c.length-2],l=c[c.length-1];default:n=c[c.length-2],a=c[c.length-1]}}return i.toString=e._path2string,r.abs=Yt(i),i},Ht=function(t,e,r,i){return[t,e,r,i,r,i]},Xt=function(t,e,r,i,n,a){var s=1/3,o=2/3;return[s*t+o*r,s*e+o*i,s*n+o*r,s*a+o*i,n,a]},Ut=function(t,e,r,i,a,s,o,l,h,u){var c=120*U/180,f=U/180*(+a||0),p=[],d,g=n(function(t,e,r){var i=t*Y.cos(r)-e*Y.sin(r),n=t*Y.sin(r)+e*Y.cos(r);return{x:i,y:n}});if(u)S=u[0],A=u[1],B=u[2],C=u[3];else{d=g(t,e,-f),t=d.x,e=d.y,d=g(l,h,-f),l=d.x,h=d.y;var v=Y.cos(U/180*a),x=Y.sin(U/180*a),y=(t-l)/2,m=(e-h)/2,b=y*y/(r*r)+m*m/(i*i);b>1&&(b=Y.sqrt(b),r=b*r,i=b*i);var _=r*r,w=i*i,k=(s==o?-1:1)*Y.sqrt(H((_*w-_*m*m-w*y*y)/(_*m*m+w*y*y))),B=k*r*m/i+(t+l)/2,C=k*-i*y/r+(e+h)/2,S=Y.asin(((e-C)/i).toFixed(9)),A=Y.asin(((h-C)/i).toFixed(9));S=t<B?U-S:S,A=l<B?U-A:A,S<0&&(S=2*U+S),A<0&&(A=2*U+A),o&&S>A&&(S-=2*U),!o&&A>S&&(A-=2*U)}var T=A-S;if(H(T)>c){var E=A,M=l,N=h;A=S+c*(o&&A>S?1:-1),l=B+r*Y.cos(A),h=C+i*Y.sin(A),p=Ut(l,h,r,i,a,0,o,M,N,[A,E,B,C])}T=A-S;var L=Y.cos(S),z=Y.sin(S),F=Y.cos(A),R=Y.sin(A),j=Y.tan(T/4),I=4/3*r*j,D=4/3*i*j,V=[t,e],O=[t+I*z,e-D*L],W=[l+I*R,h-D*F],G=[l,h];if(O[0]=2*V[0]-O[0],O[1]=2*V[1]-O[1],u)return[O,W,G][P](p);p=[O,W,G][P](p).join()[q](",");for(var X=[],$=0,Z=p.length;$<Z;$++)X[$]=$%2?g(p[$-1],p[$],f).y:g(p[$],p[$+1],f).x;return X},$t=function(t,e,r,i,n,a,s,o,l){var h=1-l;return{x:X(h,3)*t+3*X(h,2)*l*r+3*h*l*l*n+X(l,3)*s,y:X(h,3)*e+3*X(h,2)*l*i+3*h*l*l*a+X(l,3)*o}},Zt=n(function(t,e,r,i,n,a,s,o){var l=n-2*r+t-(s-2*n+r),h=2*(r-t)-2*(n-r),u=t-r,c=(-h+Y.sqrt(h*h-4*l*u))/2/l,f=(-h-Y.sqrt(h*h-4*l*u))/2/l,p=[e,o],d=[t,s],g;return H(c)>"1e12"&&(c=.5),H(f)>"1e12"&&(f=.5),c>0&&c<1&&(g=$t(t,e,r,i,n,a,s,o,c),d.push(g.x),p.push(g.y)),f>0&&f<1&&(g=$t(t,e,r,i,n,a,s,o,f),d.push(g.x),p.push(g.y)),l=a-2*i+e-(o-2*a+i),h=2*(i-e)-2*(a-i),u=e-i,c=(-h+Y.sqrt(h*h-4*l*u))/2/l,f=(-h-Y.sqrt(h*h-4*l*u))/2/l,H(c)>"1e12"&&(c=.5),H(f)>"1e12"&&(f=.5),c>0&&c<1&&(g=$t(t,e,r,i,n,a,s,o,c),d.push(g.x),p.push(g.y)),f>0&&f<1&&(g=$t(t,e,r,i,n,a,s,o,f),d.push(g.x),p.push(g.y)),{min:{x:G[z](0,d),y:G[z](0,p)},max:{x:W[z](0,d),y:W[z](0,p)}}}),Qt=e._path2curve=n(function(t,e){var r=!e&&Vt(t);if(!e&&r.curve)return Yt(r.curve);for(var i=Gt(t),n=e&&Gt(e),a={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},s={x:0,y:0,bx:0,by:0,X:0,Y:0,qx:null,qy:null},o=(function(t,e,r){var i,n,a={T:1,Q:1};if(!t)return["C",e.x,e.y,e.x,e.y,e.x,e.y];switch(!(t[0]in a)&&(e.qx=e.qy=null),t[0]){case"M":e.X=t[1],e.Y=t[2];break;case"A":t=["C"][P](Ut[z](0,[e.x,e.y][P](t.slice(1))));break;case"S":"C"==r||"S"==r?(i=2*e.x-e.bx,n=2*e.y-e.by):(i=e.x,n=e.y),t=["C",i,n][P](t.slice(1));break;case"T":"Q"==r||"T"==r?(e.qx=2*e.x-e.qx,e.qy=2*e.y-e.qy):(e.qx=e.x,e.qy=e.y),t=["C"][P](Xt(e.x,e.y,e.qx,e.qy,t[1],t[2]));break;case"Q":e.qx=t[1],e.qy=t[2],t=["C"][P](Xt(e.x,e.y,t[1],t[2],t[3],t[4]));break;case"L":t=["C"][P](Ht(e.x,e.y,t[1],t[2]));break;case"H":t=["C"][P](Ht(e.x,e.y,t[1],e.y));break;case"V":t=["C"][P](Ht(e.x,e.y,e.x,t[1]));break;case"Z":t=["C"][P](Ht(e.x,e.y,e.X,e.Y))}return t}),l=function(t,e){if(t[e].length>7){t[e].shift();for(var r=t[e];r.length;)u[e]="A",n&&(c[e]="A"),t.splice(e++,0,["C"][P](r.splice(0,6)));t.splice(e,1),g=W(i.length,n&&n.length||0)}},h=function(t,e,r,a,s){t&&e&&"M"==t[s][0]&&"M"!=e[s][0]&&(e.splice(s,0,["M",a.x,a.y]),r.bx=0,r.by=0,r.x=t[s][1],r.y=t[s][2],g=W(i.length,n&&n.length||0))},u=[],c=[],f="",p="",d=0,g=W(i.length,n&&n.length||0);d<g;d++){i[d]&&(f=i[d][0]),"C"!=f&&(u[d]=f,d&&(p=u[d-1])),i[d]=o(i[d],a,p),"A"!=u[d]&&"C"==f&&(u[d]="C"),l(i,d),n&&(n[d]&&(f=n[d][0]),"C"!=f&&(c[d]=f,d&&(p=c[d-1])),n[d]=o(n[d],s,p),"A"!=c[d]&&"C"==f&&(c[d]="C"),l(n,d)),h(i,n,a,s,d),h(n,i,s,a,d);var v=i[d],x=n&&n[d],y=v.length,m=n&&x.length;a.x=v[y-2],a.y=v[y-1],a.bx=ht(v[y-4])||a.x,a.by=ht(v[y-3])||a.y,s.bx=n&&(ht(x[m-4])||s.x),s.by=n&&(ht(x[m-3])||s.y),s.x=n&&x[m-2],s.y=n&&x[m-1]}return n||(r.curve=Yt(i)),n?[i,n]:i},null,Yt),Jt=e._parseDots=n(function(t){for(var r=[],i=0,n=t.length;i<n;i++){var a={},s=t[i].match(/^([^:]*):?([\d\.]*)/);if(a.color=e.getRGB(s[1]),a.color.error)return null;a.opacity=a.color.opacity,a.color=a.color.hex,s[2]&&(a.offset=s[2]+"%"),r.push(a)}for(i=1,n=r.length-1;i<n;i++)if(!r[i].offset){for(var o=ht(r[i-1].offset||0),l=0,h=i+1;h<n;h++)if(r[h].offset){l=r[h].offset;break}l||(l=100,h=n),l=ht(l);for(var u=(l-o)/(h-i+1);i<h;i++)o+=u,r[i].offset=o+"%"}return r}),Kt=e._tear=function(t,e){t==e.top&&(e.top=t.prev),t==e.bottom&&(e.bottom=t.next),t.next&&(t.next.prev=t.prev),t.prev&&(t.prev.next=t.next)},te=e._tofront=function(t,e){e.top!==t&&(Kt(t,e),t.next=null,t.prev=e.top,e.top.next=t,e.top=t)},ee=e._toback=function(t,e){e.bottom!==t&&(Kt(t,e),t.next=e.bottom,t.prev=null,e.bottom.prev=t,e.bottom=t)},re=e._insertafter=function(t,e,r){Kt(t,r),e==r.top&&(r.top=t),e.next&&(e.next.prev=t),t.next=e.next,t.prev=e,e.next=t},ie=e._insertbefore=function(t,e,r){Kt(t,r),e==r.bottom&&(r.bottom=t),e.prev&&(e.prev.next=t),t.prev=e.prev,e.prev=t,t.next=e},ne=e.toMatrix=function(t,e){var r=Ot(t),i={_:{transform:R},getBBox:function(){return r}};return se(i,e),i.matrix},ae=e.transformPath=function(t,e){return Mt(t,ne(t,e))},se=e._extractTransform=function(t,r){if(null==r)return t._.transform;r=I(r).replace(/\.{3}|\u2026/g,t._.transform||R);var i=e.parseTransformString(r),n=0,a=0,s=0,o=1,l=1,h=t._,u=new g;if(h.transform=i||[],i)for(var c=0,f=i.length;c<f;c++){var p=i[c],d=p.length,v=I(p[0]).toLowerCase(),x=p[0]!=v,y=x?u.invert():0,m,b,_,w,k;"t"==v&&3==d?x?(m=y.x(0,0),b=y.y(0,0),_=y.x(p[1],p[2]),w=y.y(p[1],p[2]),u.translate(_-m,w-b)):u.translate(p[1],p[2]):"r"==v?2==d?(k=k||t.getBBox(1),u.rotate(p[1],k.x+k.width/2,k.y+k.height/2),n+=p[1]):4==d&&(x?(_=y.x(p[2],p[3]),w=y.y(p[2],p[3]),u.rotate(p[1],_,w)):u.rotate(p[1],p[2],p[3]),n+=p[1]):"s"==v?2==d||3==d?(k=k||t.getBBox(1),u.scale(p[1],p[d-1],k.x+k.width/2,k.y+k.height/2),o*=p[1],l*=p[d-1]):5==d&&(x?(_=y.x(p[3],p[4]),w=y.y(p[3],p[4]),u.scale(p[1],p[2],_,w)):u.scale(p[1],p[2],p[3],p[4]),o*=p[1],l*=p[2]):"m"==v&&7==d&&u.add(p[1],p[2],p[3],p[4],p[5],p[6]),h.dirtyT=1,t.matrix=u}t.matrix=u,h.sx=o,h.sy=l,h.deg=n,h.dx=a=u.e,h.dy=s=u.f,1==o&&1==l&&!n&&h.bbox?(h.bbox.x+=+a,h.bbox.y+=+s):h.dirtyT=1},oe=function(t){var e=t[0];switch(e.toLowerCase()){case"t":return[e,0,0];case"m":return[e,1,0,0,1,0,0];case"r":return 4==t.length?[e,0,t[2],t[3]]:[e,0];case"s":return 5==t.length?[e,1,1,t[3],t[4]]:3==t.length?[e,1,1]:[e,1]}},le=e._equaliseTransform=function(t,r){r=I(r).replace(/\.{3}|\u2026/g,t),t=e.parseTransformString(t)||[],r=e.parseTransformString(r)||[];for(var i=W(t.length,r.length),n=[],a=[],s=0,o,l,h,u;s<i;s++){if(h=t[s]||oe(r[s]),u=r[s]||oe(h),h[0]!=u[0]||"r"==h[0].toLowerCase()&&(h[2]!=u[2]||h[3]!=u[3])||"s"==h[0].toLowerCase()&&(h[3]!=u[3]||h[4]!=u[4]))return;for(n[s]=[],a[s]=[],o=0,l=W(h.length,u.length);o<l;o++)o in h&&(n[s][o]=h[o]),o in u&&(a[s][o]=u[o])}return{from:n,to:a}};e._getContainer=function(t,r,i,n){var a;if(a=null!=n||e.is(t,"object")?t:T.doc.getElementById(t),null!=a)return a.tagName?null==r?{container:a,width:a.style.pixelWidth||a.offsetWidth,height:a.style.pixelHeight||a.offsetHeight}:{container:a,width:r,height:i}:{container:1,x:t,y:r,width:i,height:n}},e.pathToRelative=Wt,e._engine={},e.path2curve=Qt,e.matrix=function(t,e,r,i,n,a){return new g(t,e,r,i,n,a)},function(t){function r(t){return t[0]*t[0]+t[1]*t[1]}function i(t){var e=Y.sqrt(r(t));t[0]&&(t[0]/=e),t[1]&&(t[1]/=e)}t.add=function(t,e,r,i,n,a){var s=[[],[],[]],o=[[this.a,this.c,this.e],[this.b,this.d,this.f],[0,0,1]],l=[[t,r,n],[e,i,a],[0,0,1]],h,u,c,f;for(t&&t instanceof g&&(l=[[t.a,t.c,t.e],[t.b,t.d,t.f],[0,0,1]]),h=0;h<3;h++)for(u=0;u<3;u++){for(f=0,c=0;c<3;c++)f+=o[h][c]*l[c][u];s[h][u]=f}this.a=s[0][0],this.b=s[1][0],this.c=s[0][1],this.d=s[1][1],this.e=s[0][2],this.f=s[1][2]},t.invert=function(){var t=this,e=t.a*t.d-t.b*t.c;return new g(t.d/e,-t.b/e,-t.c/e,t.a/e,(t.c*t.f-t.d*t.e)/e,(t.b*t.e-t.a*t.f)/e)},t.clone=function(){return new g(this.a,this.b,this.c,this.d,this.e,this.f)},t.translate=function(t,e){
this.add(1,0,0,1,t,e)},t.scale=function(t,e,r,i){null==e&&(e=t),(r||i)&&this.add(1,0,0,1,r,i),this.add(t,0,0,e,0,0),(r||i)&&this.add(1,0,0,1,-r,-i)},t.rotate=function(t,r,i){t=e.rad(t),r=r||0,i=i||0;var n=+Y.cos(t).toFixed(9),a=+Y.sin(t).toFixed(9);this.add(n,a,-a,n,r,i),this.add(1,0,0,1,-r,-i)},t.x=function(t,e){return t*this.a+e*this.c+this.e},t.y=function(t,e){return t*this.b+e*this.d+this.f},t.get=function(t){return+this[I.fromCharCode(97+t)].toFixed(4)},t.toString=function(){return e.svg?"matrix("+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)].join()+")":[this.get(0),this.get(2),this.get(1),this.get(3),0,0].join()},t.toFilter=function(){return"progid:DXImageTransform.Microsoft.Matrix(M11="+this.get(0)+", M12="+this.get(2)+", M21="+this.get(1)+", M22="+this.get(3)+", Dx="+this.get(4)+", Dy="+this.get(5)+", sizingmethod='auto expand')"},t.offset=function(){return[this.e.toFixed(4),this.f.toFixed(4)]},t.split=function(){var t={};t.dx=this.e,t.dy=this.f;var n=[[this.a,this.c],[this.b,this.d]];t.scalex=Y.sqrt(r(n[0])),i(n[0]),t.shear=n[0][0]*n[1][0]+n[0][1]*n[1][1],n[1]=[n[1][0]-n[0][0]*t.shear,n[1][1]-n[0][1]*t.shear],t.scaley=Y.sqrt(r(n[1])),i(n[1]),t.shear/=t.scaley;var a=-n[0][1],s=n[1][1];return s<0?(t.rotate=e.deg(Y.acos(s)),a<0&&(t.rotate=360-t.rotate)):t.rotate=e.deg(Y.asin(a)),t.isSimple=!(+t.shear.toFixed(9)||t.scalex.toFixed(9)!=t.scaley.toFixed(9)&&t.rotate),t.isSuperSimple=!+t.shear.toFixed(9)&&t.scalex.toFixed(9)==t.scaley.toFixed(9)&&!t.rotate,t.noRotation=!+t.shear.toFixed(9)&&!t.rotate,t},t.toTransformString=function(t){var e=t||this[q]();return e.isSimple?(e.scalex=+e.scalex.toFixed(4),e.scaley=+e.scaley.toFixed(4),e.rotate=+e.rotate.toFixed(4),(e.dx||e.dy?"t"+[e.dx,e.dy]:R)+(1!=e.scalex||1!=e.scaley?"s"+[e.scalex,e.scaley,0,0]:R)+(e.rotate?"r"+[e.rotate,0,0]:R)):"m"+[this.get(0),this.get(1),this.get(2),this.get(3),this.get(4),this.get(5)]}}(g.prototype);for(var he=function(){this.returnValue=!1},ue=function(){return this.originalEvent.preventDefault()},ce=function(){this.cancelBubble=!0},fe=function(){return this.originalEvent.stopPropagation()},pe=function(t){var e=T.doc.documentElement.scrollTop||T.doc.body.scrollTop,r=T.doc.documentElement.scrollLeft||T.doc.body.scrollLeft;return{x:t.clientX+r,y:t.clientY+e}},de=function(){return T.doc.addEventListener?function(t,e,r,i){var n=function(t){var e=pe(t);return r.call(i,t,e.x,e.y)};if(t.addEventListener(e,n,!1),F&&V[e]){var a=function(e){for(var n=pe(e),a=e,s=0,o=e.targetTouches&&e.targetTouches.length;s<o;s++)if(e.targetTouches[s].target==t){e=e.targetTouches[s],e.originalEvent=a,e.preventDefault=ue,e.stopPropagation=fe;break}return r.call(i,e,n.x,n.y)};t.addEventListener(V[e],a,!1)}return function(){return t.removeEventListener(e,n,!1),F&&V[e]&&t.removeEventListener(V[e],a,!1),!0}}:T.doc.attachEvent?function(t,e,r,i){var n=function(t){t=t||T.win.event;var e=T.doc.documentElement.scrollTop||T.doc.body.scrollTop,n=T.doc.documentElement.scrollLeft||T.doc.body.scrollLeft,a=t.clientX+n,s=t.clientY+e;return t.preventDefault=t.preventDefault||he,t.stopPropagation=t.stopPropagation||ce,r.call(i,t,a,s)};t.attachEvent("on"+e,n);var a=function(){return t.detachEvent("on"+e,n),!0};return a}:void 0}(),ge=[],ve=function(e){for(var r=e.clientX,i=e.clientY,n=T.doc.documentElement.scrollTop||T.doc.body.scrollTop,a=T.doc.documentElement.scrollLeft||T.doc.body.scrollLeft,s,o=ge.length;o--;){if(s=ge[o],F&&e.touches){for(var l=e.touches.length,h;l--;)if(h=e.touches[l],h.identifier==s.el._drag.id){r=h.clientX,i=h.clientY,(e.originalEvent?e.originalEvent:e).preventDefault();break}}else e.preventDefault();var u=s.el.node,c,f=u.nextSibling,p=u.parentNode,d=u.style.display;T.win.opera&&p.removeChild(u),u.style.display="none",c=s.el.paper.getElementByPoint(r,i),u.style.display=d,T.win.opera&&(f?p.insertBefore(u,f):p.appendChild(u)),c&&t("raphael.drag.over."+s.el.id,s.el,c),r+=a,i+=n,t("raphael.drag.move."+s.el.id,s.move_scope||s.el,r-s.el._drag.x,i-s.el._drag.y,r,i,e)}},xe=function(r){e.unmousemove(ve).unmouseup(xe);for(var i=ge.length,n;i--;)n=ge[i],n.el._drag={},t("raphael.drag.end."+n.el.id,n.end_scope||n.start_scope||n.move_scope||n.el,r);ge=[]},ye=e.el={},me=D.length;me--;)!function(t){e[t]=ye[t]=function(r,i){return e.is(r,"function")&&(this.events=this.events||[],this.events.push({name:t,f:r,unbind:de(this.shape||this.node||T.doc,t,r,i||this)})),this},e["un"+t]=ye["un"+t]=function(r){for(var i=this.events||[],n=i.length;n--;)i[n].name!=t||!e.is(r,"undefined")&&i[n].f!=r||(i[n].unbind(),i.splice(n,1),!i.length&&delete this.events);return this}}(D[me]);ye.data=function(r,i){var n=wt[this.id]=wt[this.id]||{};if(0==arguments.length)return n;if(1==arguments.length){if(e.is(r,"object")){for(var a in r)r[A](a)&&this.data(a,r[a]);return this}return t("raphael.data.get."+this.id,this,n[r],r),n[r]}return n[r]=i,t("raphael.data.set."+this.id,this,i,r),this},ye.removeData=function(t){return null==t?wt[this.id]={}:wt[this.id]&&delete wt[this.id][t],this},ye.getData=function(){return r(wt[this.id]||{})},ye.hover=function(t,e,r,i){return this.mouseover(t,r).mouseout(e,i||r)},ye.unhover=function(t,e){return this.unmouseover(t).unmouseout(e)};var be=[];ye.drag=function(r,i,n,a,s,o){function l(l){(l.originalEvent||l).preventDefault();var h=l.clientX,u=l.clientY,c=T.doc.documentElement.scrollTop||T.doc.body.scrollTop,f=T.doc.documentElement.scrollLeft||T.doc.body.scrollLeft;if(this._drag.id=l.identifier,F&&l.touches)for(var p=l.touches.length,d;p--;)if(d=l.touches[p],this._drag.id=d.identifier,d.identifier==this._drag.id){h=d.clientX,u=d.clientY;break}this._drag.x=h+f,this._drag.y=u+c,!ge.length&&e.mousemove(ve).mouseup(xe),ge.push({el:this,move_scope:a,start_scope:s,end_scope:o}),i&&t.on("raphael.drag.start."+this.id,i),r&&t.on("raphael.drag.move."+this.id,r),n&&t.on("raphael.drag.end."+this.id,n),t("raphael.drag.start."+this.id,s||a||this,l.clientX+f,l.clientY+c,l)}return this._drag={},be.push({el:this,start:l}),this.mousedown(l),this},ye.onDragOver=function(e){e?t.on("raphael.drag.over."+this.id,e):t.unbind("raphael.drag.over."+this.id)},ye.undrag=function(){for(var r=be.length;r--;)be[r].el==this&&(this.unmousedown(be[r].start),be.splice(r,1),t.unbind("raphael.drag.*."+this.id));!be.length&&e.unmousemove(ve).unmouseup(xe),ge=[]},N.circle=function(t,r,i){var n=e._engine.circle(this,t||0,r||0,i||0);return this.__set__&&this.__set__.push(n),n},N.rect=function(t,r,i,n,a){var s=e._engine.rect(this,t||0,r||0,i||0,n||0,a||0);return this.__set__&&this.__set__.push(s),s},N.ellipse=function(t,r,i,n){var a=e._engine.ellipse(this,t||0,r||0,i||0,n||0);return this.__set__&&this.__set__.push(a),a},N.path=function(t){t&&!e.is(t,Z)&&!e.is(t[0],Q)&&(t+=R);var r=e._engine.path(e.format[z](e,arguments),this);return this.__set__&&this.__set__.push(r),r},N.image=function(t,r,i,n,a){var s=e._engine.image(this,t||"about:blank",r||0,i||0,n||0,a||0);return this.__set__&&this.__set__.push(s),s},N.text=function(t,r,i){var n=e._engine.text(this,t||0,r||0,I(i));return this.__set__&&this.__set__.push(n),n},N.set=function(t){!e.is(t,"array")&&(t=Array.prototype.splice.call(arguments,0,arguments.length));var r=new ze(t);return this.__set__&&this.__set__.push(r),r.paper=this,r.type="set",r},N.setStart=function(t){this.__set__=t||this.set()},N.setFinish=function(t){var e=this.__set__;return delete this.__set__,e},N.getSize=function(){var t=this.canvas.parentNode;return{width:t.offsetWidth,height:t.offsetHeight}},N.setSize=function(t,r){return e._engine.setSize.call(this,t,r)},N.setViewBox=function(t,r,i,n,a){return e._engine.setViewBox.call(this,t,r,i,n,a)},N.top=N.bottom=null,N.raphael=e;var _e=function(t){var e=t.getBoundingClientRect(),r=t.ownerDocument,i=r.body,n=r.documentElement,a=n.clientTop||i.clientTop||0,s=n.clientLeft||i.clientLeft||0,o=e.top+(T.win.pageYOffset||n.scrollTop||i.scrollTop)-a,l=e.left+(T.win.pageXOffset||n.scrollLeft||i.scrollLeft)-s;return{y:o,x:l}};N.getElementByPoint=function(t,e){var r=this,i=r.canvas,n=T.doc.elementFromPoint(t,e);if(T.win.opera&&"svg"==n.tagName){var a=_e(i),s=i.createSVGRect();s.x=t-a.x,s.y=e-a.y,s.width=s.height=1;var o=i.getIntersectionList(s,null);o.length&&(n=o[o.length-1])}if(!n)return null;for(;n.parentNode&&n!=i.parentNode&&!n.raphael;)n=n.parentNode;return n==r.canvas.parentNode&&(n=i),n=n&&n.raphael?r.getById(n.raphaelid):null},N.getElementsByBBox=function(t){var r=this.set();return this.forEach(function(i){e.isBBoxIntersect(i.getBBox(),t)&&r.push(i)}),r},N.getById=function(t){for(var e=this.bottom;e;){if(e.id==t)return e;e=e.next}return null},N.forEach=function(t,e){for(var r=this.bottom;r;){if(t.call(e,r)===!1)return this;r=r.next}return this},N.getElementsByPoint=function(t,e){var r=this.set();return this.forEach(function(i){i.isPointInside(t,e)&&r.push(i)}),r},ye.isPointInside=function(t,r){var i=this.realPath=Et[this.type](this);return this.attr("transform")&&this.attr("transform").length&&(i=e.transformPath(i,this.attr("transform"))),e.isPointInsidePath(i,t,r)},ye.getBBox=function(t){if(this.removed)return{};var e=this._;return t?(!e.dirty&&e.bboxwt||(this.realPath=Et[this.type](this),e.bboxwt=Ot(this.realPath),e.bboxwt.toString=x,e.dirty=0),e.bboxwt):((e.dirty||e.dirtyT||!e.bbox)&&(!e.dirty&&this.realPath||(e.bboxwt=0,this.realPath=Et[this.type](this)),e.bbox=Ot(Mt(this.realPath,this.matrix)),e.bbox.toString=x,e.dirty=e.dirtyT=0),e.bbox)},ye.clone=function(){if(this.removed)return null;var t=this.paper[this.type]().attr(this.attr());return this.__set__&&this.__set__.push(t),t},ye.glow=function(t){if("text"==this.type)return null;t=t||{};var e={width:(t.width||10)+(+this.attr("stroke-width")||1),fill:t.fill||!1,opacity:null==t.opacity?.5:t.opacity,offsetx:t.offsetx||0,offsety:t.offsety||0,color:t.color||"#000"},r=e.width/2,i=this.paper,n=i.set(),a=this.realPath||Et[this.type](this);a=this.matrix?Mt(a,this.matrix):a;for(var s=1;s<r+1;s++)n.push(i.path(a).attr({stroke:e.color,fill:e.fill?e.color:"none","stroke-linejoin":"round","stroke-linecap":"round","stroke-width":+(e.width/r*s).toFixed(3),opacity:+(e.opacity/r).toFixed(3)}));return n.insertBefore(this).translate(e.offsetx,e.offsety)};var we={},ke=function(t,r,i,n,a,s,o,u,c){return null==c?l(t,r,i,n,a,s,o,u):e.findDotsAtSegment(t,r,i,n,a,s,o,u,h(t,r,i,n,a,s,o,u,c))},Be=function(t,r){return function(i,n,a){i=Qt(i);for(var s,o,l,h,u="",c={},f,p=0,d=0,g=i.length;d<g;d++){if(l=i[d],"M"==l[0])s=+l[1],o=+l[2];else{if(h=ke(s,o,l[1],l[2],l[3],l[4],l[5],l[6]),p+h>n){if(r&&!c.start){if(f=ke(s,o,l[1],l[2],l[3],l[4],l[5],l[6],n-p),u+=["C"+f.start.x,f.start.y,f.m.x,f.m.y,f.x,f.y],a)return u;c.start=u,u=["M"+f.x,f.y+"C"+f.n.x,f.n.y,f.end.x,f.end.y,l[5],l[6]].join(),p+=h,s=+l[5],o=+l[6];continue}if(!t&&!r)return f=ke(s,o,l[1],l[2],l[3],l[4],l[5],l[6],n-p),{x:f.x,y:f.y,alpha:f.alpha}}p+=h,s=+l[5],o=+l[6]}u+=l.shift()+l}return c.end=u,f=t?p:r?c:e.findDotsAtSegment(s,o,l[0],l[1],l[2],l[3],l[4],l[5],1),f.alpha&&(f={x:f.x,y:f.y,alpha:f.alpha}),f}},Ce=Be(1),Se=Be(),Ae=Be(0,1);e.getTotalLength=Ce,e.getPointAtLength=Se,e.getSubpath=function(t,e,r){if(this.getTotalLength(t)-r<1e-6)return Ae(t,e).end;var i=Ae(t,r,1);return e?Ae(i,e).end:i},ye.getTotalLength=function(){var t=this.getPath();if(t)return this.node.getTotalLength?this.node.getTotalLength():Ce(t)},ye.getPointAtLength=function(t){var e=this.getPath();if(e)return Se(e,t)},ye.getPath=function(){var t,r=e._getPath[this.type];if("text"!=this.type&&"set"!=this.type)return r&&(t=r(this)),t},ye.getSubpath=function(t,r){var i=this.getPath();if(i)return e.getSubpath(i,t,r)};var Te=e.easing_formulas={linear:function(t){return t},"<":function(t){return X(t,1.7)},">":function(t){return X(t,.48)},"<>":function(t){var e=.48-t/1.04,r=Y.sqrt(.1734+e*e),i=r-e,n=X(H(i),1/3)*(i<0?-1:1),a=-r-e,s=X(H(a),1/3)*(a<0?-1:1),o=n+s+.5;return 3*(1-o)*o*o+o*o*o},backIn:function(t){var e=1.70158;return t*t*((e+1)*t-e)},backOut:function(t){t-=1;var e=1.70158;return t*t*((e+1)*t+e)+1},elastic:function(t){return t==!!t?t:X(2,-10*t)*Y.sin((t-.075)*(2*U)/.3)+1},bounce:function(t){var e=7.5625,r=2.75,i;return t<1/r?i=e*t*t:t<2/r?(t-=1.5/r,i=e*t*t+.75):t<2.5/r?(t-=2.25/r,i=e*t*t+.9375):(t-=2.625/r,i=e*t*t+.984375),i}};Te.easeIn=Te["ease-in"]=Te["<"],Te.easeOut=Te["ease-out"]=Te[">"],Te.easeInOut=Te["ease-in-out"]=Te["<>"],Te["back-in"]=Te.backIn,Te["back-out"]=Te.backOut;var Ee=[],Me=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){setTimeout(t,16)},Ne=function(){for(var r=+new Date,i=0;i<Ee.length;i++){var n=Ee[i];if(!n.el.removed&&!n.paused){var a=r-n.start,s=n.ms,o=n.easing,l=n.from,h=n.diff,u=n.to,c=n.t,f=n.el,p={},d,g={},v;if(n.initstatus?(a=(n.initstatus*n.anim.top-n.prev)/(n.percent-n.prev)*s,n.status=n.initstatus,delete n.initstatus,n.stop&&Ee.splice(i--,1)):n.status=(n.prev+(n.percent-n.prev)*(a/s))/n.anim.top,!(a<0))if(a<s){var x=o(a/s);for(var y in l)if(l[A](y)){switch(pt[y]){case $:d=+l[y]+x*s*h[y];break;case"colour":d="rgb("+[Le(ot(l[y].r+x*s*h[y].r)),Le(ot(l[y].g+x*s*h[y].g)),Le(ot(l[y].b+x*s*h[y].b))].join(",")+")";break;case"path":d=[];for(var m=0,_=l[y].length;m<_;m++){d[m]=[l[y][m][0]];for(var w=1,k=l[y][m].length;w<k;w++)d[m][w]=+l[y][m][w]+x*s*h[y][m][w];d[m]=d[m].join(j)}d=d.join(j);break;case"transform":if(h[y].real)for(d=[],m=0,_=l[y].length;m<_;m++)for(d[m]=[l[y][m][0]],w=1,k=l[y][m].length;w<k;w++)d[m][w]=l[y][m][w]+x*s*h[y][m][w];else{var B=function(t){return+l[y][t]+x*s*h[y][t]};d=[["m",B(0),B(1),B(2),B(3),B(4),B(5)]]}break;case"csv":if("clip-rect"==y)for(d=[],m=4;m--;)d[m]=+l[y][m]+x*s*h[y][m];break;default:var C=[][P](l[y]);for(d=[],m=f.paper.customAttributes[y].length;m--;)d[m]=+C[m]+x*s*h[y][m]}p[y]=d}f.attr(p),function(e,r,i){setTimeout(function(){t("raphael.anim.frame."+e,r,i)})}(f.id,f,n.anim)}else{if(function(r,i,n){setTimeout(function(){t("raphael.anim.frame."+i.id,i,n),t("raphael.anim.finish."+i.id,i,n),e.is(r,"function")&&r.call(i)})}(n.callback,f,n.anim),f.attr(u),Ee.splice(i--,1),n.repeat>1&&!n.next){for(v in u)u[A](v)&&(g[v]=n.totalOrigin[v]);n.el.attr(g),b(n.anim,n.el,n.anim.percents[0],null,n.totalOrigin,n.repeat-1)}n.next&&!n.stop&&b(n.anim,n.el,n.next,null,n.totalOrigin,n.repeat)}}}Ee.length&&Me(Ne)},Le=function(t){return t>255?255:t<0?0:t};ye.animateWith=function(t,r,i,n,a,s){var o=this;if(o.removed)return s&&s.call(o),o;var l=i instanceof m?i:e.animation(i,n,a,s),h,u;b(l,o,l.percents[0],null,o.attr());for(var c=0,f=Ee.length;c<f;c++)if(Ee[c].anim==r&&Ee[c].el==t){Ee[f-1].start=Ee[c].start;break}return o},ye.onAnimation=function(e){return e?t.on("raphael.anim.frame."+this.id,e):t.unbind("raphael.anim.frame."+this.id),this},m.prototype.delay=function(t){var e=new m(this.anim,this.ms);return e.times=this.times,e.del=+t||0,e},m.prototype.repeat=function(t){var e=new m(this.anim,this.ms);return e.del=this.del,e.times=Y.floor(W(t,0))||1,e},e.animation=function(t,r,i,n){if(t instanceof m)return t;!e.is(i,"function")&&i||(n=n||i||null,i=null),t=Object(t),r=+r||0;var a={},s,o;for(o in t)t[A](o)&&ht(o)!=o&&ht(o)+"%"!=o&&(s=!0,a[o]=t[o]);if(s)return i&&(a.easing=i),n&&(a.callback=n),new m({100:a},r);if(n){var l=0;for(var h in t){var u=ut(h);t[A](h)&&u>l&&(l=u)}l+="%",!t[l].callback&&(t[l].callback=n)}return new m(t,r)},ye.animate=function(t,r,i,n){var a=this;if(a.removed)return n&&n.call(a),a;var s=t instanceof m?t:e.animation(t,r,i,n);return b(s,a,s.percents[0],null,a.attr()),a},ye.setTime=function(t,e){return t&&null!=e&&this.status(t,G(e,t.ms)/t.ms),this},ye.status=function(t,e){var r=[],i=0,n,a;if(null!=e)return b(t,this,-1,G(e,1)),this;for(n=Ee.length;i<n;i++)if(a=Ee[i],a.el.id==this.id&&(!t||a.anim==t)){if(t)return a.status;r.push({anim:a.anim,status:a.status})}return t?0:r},ye.pause=function(e){for(var r=0;r<Ee.length;r++)Ee[r].el.id!=this.id||e&&Ee[r].anim!=e||t("raphael.anim.pause."+this.id,this,Ee[r].anim)!==!1&&(Ee[r].paused=!0);return this},ye.resume=function(e){for(var r=0;r<Ee.length;r++)if(Ee[r].el.id==this.id&&(!e||Ee[r].anim==e)){var i=Ee[r];t("raphael.anim.resume."+this.id,this,i.anim)!==!1&&(delete i.paused,this.status(i.anim,i.status))}return this},ye.stop=function(e){for(var r=0;r<Ee.length;r++)Ee[r].el.id!=this.id||e&&Ee[r].anim!=e||t("raphael.anim.stop."+this.id,this,Ee[r].anim)!==!1&&Ee.splice(r--,1);return this},t.on("raphael.remove",_),t.on("raphael.clear",_),ye.toString=function(){return"Raphaël’s object"};var ze=function(t){if(this.items=[],this.length=0,this.type="set",t)for(var e=0,r=t.length;e<r;e++)!t[e]||t[e].constructor!=ye.constructor&&t[e].constructor!=ze||(this[this.items.length]=this.items[this.items.length]=t[e],this.length++)},Pe=ze.prototype;Pe.push=function(){for(var t,e,r=0,i=arguments.length;r<i;r++)t=arguments[r],!t||t.constructor!=ye.constructor&&t.constructor!=ze||(e=this.items.length,this[e]=this.items[e]=t,this.length++);return this},Pe.pop=function(){return this.length&&delete this[this.length--],this.items.pop()},Pe.forEach=function(t,e){for(var r=0,i=this.items.length;r<i;r++)if(t.call(e,this.items[r],r)===!1)return this;return this};for(var Fe in ye)ye[A](Fe)&&(Pe[Fe]=function(t){return function(){var e=arguments;return this.forEach(function(r){r[t][z](r,e)})}}(Fe));return Pe.attr=function(t,r){if(t&&e.is(t,Q)&&e.is(t[0],"object"))for(var i=0,n=t.length;i<n;i++)this.items[i].attr(t[i]);else for(var a=0,s=this.items.length;a<s;a++)this.items[a].attr(t,r);return this},Pe.clear=function(){for(;this.length;)this.pop()},Pe.splice=function(t,e,r){t=t<0?W(this.length+t,0):t,e=W(0,G(this.length-t,e));var i=[],n=[],a=[],s;for(s=2;s<arguments.length;s++)a.push(arguments[s]);for(s=0;s<e;s++)n.push(this[t+s]);for(;s<this.length-t;s++)i.push(this[t+s]);var o=a.length;for(s=0;s<o+i.length;s++)this.items[t+s]=this[t+s]=s<o?a[s]:i[s-o];for(s=this.items.length=this.length-=e-o;this[s];)delete this[s++];return new ze(n)},Pe.exclude=function(t){for(var e=0,r=this.length;e<r;e++)if(this[e]==t)return this.splice(e,1),!0},Pe.animate=function(t,r,i,n){(e.is(i,"function")||!i)&&(n=i||null);var a=this.items.length,s=a,o,l=this,h;if(!a)return this;n&&(h=function(){!--a&&n.call(l)}),i=e.is(i,Z)?i:h;var u=e.animation(t,r,i,h);for(o=this.items[--s].animate(u);s--;)this.items[s]&&!this.items[s].removed&&this.items[s].animateWith(o,u,u),this.items[s]&&!this.items[s].removed||a--;return this},Pe.insertAfter=function(t){for(var e=this.items.length;e--;)this.items[e].insertAfter(t);return this},Pe.getBBox=function(){for(var t=[],e=[],r=[],i=[],n=this.items.length;n--;)if(!this.items[n].removed){var a=this.items[n].getBBox();t.push(a.x),e.push(a.y),r.push(a.x+a.width),i.push(a.y+a.height)}return t=G[z](0,t),e=G[z](0,e),r=W[z](0,r),i=W[z](0,i),{x:t,y:e,x2:r,y2:i,width:r-t,height:i-e}},Pe.clone=function(t){t=this.paper.set();for(var e=0,r=this.items.length;e<r;e++)t.push(this.items[e].clone());return t},Pe.toString=function(){return"Raphaël‘s set"},Pe.glow=function(t){var e=this.paper.set();return this.forEach(function(r,i){var n=r.glow(t);null!=n&&n.forEach(function(t,r){e.push(t)})}),e},Pe.isPointInside=function(t,e){var r=!1;return this.forEach(function(i){if(i.isPointInside(t,e))return r=!0,!1}),r},e.registerFont=function(t){if(!t.face)return t;this.fonts=this.fonts||{};var e={w:t.w,face:{},glyphs:{}},r=t.face["font-family"];for(var i in t.face)t.face[A](i)&&(e.face[i]=t.face[i]);if(this.fonts[r]?this.fonts[r].push(e):this.fonts[r]=[e],!t.svg){e.face["units-per-em"]=ut(t.face["units-per-em"],10);for(var n in t.glyphs)if(t.glyphs[A](n)){var a=t.glyphs[n];if(e.glyphs[n]={w:a.w,k:{},d:a.d&&"M"+a.d.replace(/[mlcxtrv]/g,function(t){return{l:"L",c:"C",x:"z",t:"m",r:"l",v:"c"}[t]||"M"})+"z"},a.k)for(var s in a.k)a[A](s)&&(e.glyphs[n].k[s]=a.k[s])}}return t},N.getFont=function(t,r,i,n){if(n=n||"normal",i=i||"normal",r=+r||{normal:400,bold:700,lighter:300,bolder:800}[r]||400,e.fonts){var a=e.fonts[t];if(!a){var s=new RegExp("(^|\\s)"+t.replace(/[^\w\d\s+!~.:_-]/g,R)+"(\\s|$)","i");for(var o in e.fonts)if(e.fonts[A](o)&&s.test(o)){a=e.fonts[o];break}}var l;if(a)for(var h=0,u=a.length;h<u&&(l=a[h],l.face["font-weight"]!=r||l.face["font-style"]!=i&&l.face["font-style"]||l.face["font-stretch"]!=n);h++);return l}},N.print=function(t,r,i,n,a,s,o,l){s=s||"middle",o=W(G(o||0,1),-1),l=W(G(l||1,3),1);var h=I(i)[q](R),u=0,c=0,f=R,p;if(e.is(n,"string")&&(n=this.getFont(n)),n){p=(a||16)/n.face["units-per-em"];for(var d=n.face.bbox[q](k),g=+d[0],v=d[3]-d[1],x=0,y=+d[1]+("baseline"==s?v+ +n.face.descent:v/2),m=0,b=h.length;m<b;m++){if("\n"==h[m])u=0,w=0,c=0,x+=v*l;else{var _=c&&n.glyphs[h[m-1]]||{},w=n.glyphs[h[m]];u+=c?(_.w||n.w)+(_.k&&_.k[h[m]]||0)+n.w*o:0,c=1}w&&w.d&&(f+=e.transformPath(w.d,["t",u*p,x*p,"s",p,p,g,y,"t",(t-g)/p,(r-y)/p]))}}return this.path(f).attr({fill:"#000",stroke:"none"})},N.add=function(t){if(e.is(t,"array"))for(var r=this.set(),i=0,n=t.length,a;i<n;i++)a=t[i]||{},B[A](a.type)&&r.push(this[a.type]().attr(a));return r},e.format=function(t,r){var i=e.is(r,Q)?[0][P](r):arguments;return t&&e.is(t,Z)&&i.length-1&&(t=t.replace(C,function(t,e){return null==i[++e]?R:i[e]})),t||R},e.fullfill=function(){var t=/\{([^\}]+)\}/g,e=/(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,r=function(t,r,i){var n=i;return r.replace(e,function(t,e,r,i,a){e=e||i,n&&(e in n&&(n=n[e]),"function"==typeof n&&a&&(n=n()))}),n=(null==n||n==i?t:n)+""};return function(e,i){return String(e).replace(t,function(t,e){return r(t,e,i)})}}(),e.ninja=function(){if(E.was)T.win.Raphael=E.is;else{window.Raphael=void 0;try{delete window.Raphael}catch(t){}}return e},e.st=Pe,t.on("raphael.DOMload",function(){w=!0}),function(t,r,i){function n(){/in/.test(t.readyState)?setTimeout(n,9):e.eve("raphael.DOMload")}null==t.readyState&&t.addEventListener&&(t.addEventListener(r,i=function(){t.removeEventListener(r,i,!1),t.readyState="complete"},!1),t.readyState="loading"),n()}(document,"DOMContentLoaded"),e}.apply(e,i),!(void 0!==n&&(t.exports=n))},function(t,e,r){var i,n;!function(r){var a="0.5.0",s="hasOwnProperty",o=/[\.\/]/,l=/\s*,\s*/,h="*",u=function(){},c=function(t,e){return t-e},f,p,d={n:{}},g=function(){for(var t=0,e=this.length;t<e;t++)if("undefined"!=typeof this[t])return this[t]},v=function(){for(var t=this.length;--t;)if("undefined"!=typeof this[t])return this[t]},x=Object.prototype.toString,y=String,m=Array.isArray||function(t){return t instanceof Array||"[object Array]"==x.call(t)};eve=function(t,e){var r=d,i=p,n=Array.prototype.slice.call(arguments,2),a=eve.listeners(t),s=0,o=!1,l,h=[],u={},x=[],y=f,m=[];x.firstDefined=g,x.lastDefined=v,f=t,p=0;for(var b=0,_=a.length;b<_;b++)"zIndex"in a[b]&&(h.push(a[b].zIndex),a[b].zIndex<0&&(u[a[b].zIndex]=a[b]));for(h.sort(c);h[s]<0;)if(l=u[h[s++]],x.push(l.apply(e,n)),p)return p=i,x;for(b=0;b<_;b++)if(l=a[b],"zIndex"in l)if(l.zIndex==h[s]){if(x.push(l.apply(e,n)),p)break;do if(s++,l=u[h[s]],l&&x.push(l.apply(e,n)),p)break;while(l)}else u[l.zIndex]=l;else if(x.push(l.apply(e,n)),p)break;return p=i,f=y,x},eve._events=d,eve.listeners=function(t){var e=m(t)?t:t.split(o),r=d,i,n,a,s,l,u,c,f,p=[r],g=[];for(s=0,l=e.length;s<l;s++){for(f=[],u=0,c=p.length;u<c;u++)for(r=p[u].n,n=[r[e[s]],r[h]],a=2;a--;)i=n[a],i&&(f.push(i),g=g.concat(i.f||[]));p=f}return g},eve.separator=function(t){t?(t=y(t).replace(/(?=[\.\^\]\[\-])/g,"\\"),t="["+t+"]",o=new RegExp(t)):o=/[\.\/]/},eve.on=function(t,e){if("function"!=typeof e)return function(){};for(var r=m(t)?m(t[0])?t:[t]:y(t).split(l),i=0,n=r.length;i<n;i++)!function(t){for(var r=m(t)?t:y(t).split(o),i=d,n,a=0,s=r.length;a<s;a++)i=i.n,i=i.hasOwnProperty(r[a])&&i[r[a]]||(i[r[a]]={n:{}});for(i.f=i.f||[],a=0,s=i.f.length;a<s;a++)if(i.f[a]==e){n=!0;break}!n&&i.f.push(e)}(r[i]);return function(t){+t==+t&&(e.zIndex=+t)}},eve.f=function(t){var e=[].slice.call(arguments,1);return function(){eve.apply(null,[t,null].concat(e).concat([].slice.call(arguments,0)))}},eve.stop=function(){p=1},eve.nt=function(t){var e=m(f)?f.join("."):f;return t?new RegExp("(?:\\.|\\/|^)"+t+"(?:\\.|\\/|$)").test(e):e},eve.nts=function(){return m(f)?f:f.split(o)},eve.off=eve.unbind=function(t,e){if(!t)return void(eve._events=d={n:{}});var r=m(t)?m(t[0])?t:[t]:y(t).split(l);if(r.length>1)for(var i=0,n=r.length;i<n;i++)eve.off(r[i],e);else{r=m(t)?t:y(t).split(o);var a,u,c,i,n,f,p,g=[d];for(i=0,n=r.length;i<n;i++)for(f=0;f<g.length;f+=c.length-2){if(c=[f,1],a=g[f].n,r[i]!=h)a[r[i]]&&c.push(a[r[i]]);else for(u in a)a[s](u)&&c.push(a[u]);g.splice.apply(g,c)}for(i=0,n=g.length;i<n;i++)for(a=g[i];a.n;){if(e){if(a.f){for(f=0,p=a.f.length;f<p;f++)if(a.f[f]==e){a.f.splice(f,1);break}!a.f.length&&delete a.f}for(u in a.n)if(a.n[s](u)&&a.n[u].f){var v=a.n[u].f;for(f=0,p=v.length;f<p;f++)if(v[f]==e){v.splice(f,1);break}!v.length&&delete a.n[u].f}}else{delete a.f;for(u in a.n)a.n[s](u)&&a.n[u].f&&delete a.n[u].f}a=a.n}}},eve.once=function(t,e){var r=function(){return eve.off(t,r),e.apply(this,arguments)};return eve.on(t,r)},eve.version=a,eve.toString=function(){return"You are running Eve "+a},"undefined"!=typeof t&&t.exports?t.exports=eve:(i=[],n=function(){return eve}.apply(e,i),!(void 0!==n&&(t.exports=n)))}(this)},function(t,e,r){var i,n;i=[r(1)],n=function(t){if(!t||t.svg){var e="hasOwnProperty",r=String,i=parseFloat,n=parseInt,a=Math,s=a.max,o=a.abs,l=a.pow,h=/[, ]+/,u=t.eve,c="",f=" ",p="http://www.w3.org/1999/xlink",d={block:"M5,0 0,2.5 5,5z",classic:"M5,0 0,2.5 5,5 3.5,3 3.5,2z",diamond:"M2.5,0 5,2.5 2.5,5 0,2.5z",open:"M6,1 1,3.5 6,6",oval:"M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"},g={};t.toString=function(){return"Your browser supports SVG.\nYou are running Raphaël "+this.version};var v=function(i,n){if(n){"string"==typeof i&&(i=v(i));for(var a in n)n[e](a)&&("xlink:"==a.substring(0,6)?i.setAttributeNS(p,a.substring(6),r(n[a])):i.setAttribute(a,r(n[a])))}else i=t._g.doc.createElementNS("http://www.w3.org/2000/svg",i),i.style&&(i.style.webkitTapHighlightColor="rgba(0,0,0,0)");return i},x=function(e,n){var h="linear",u=e.id+n,f=.5,p=.5,d=e.node,g=e.paper,x=d.style,y=t._g.doc.getElementById(u);if(!y){if(n=r(n).replace(t._radial_gradient,function(t,e,r){if(h="radial",e&&r){f=i(e),p=i(r);var n=2*(p>.5)-1;l(f-.5,2)+l(p-.5,2)>.25&&(p=a.sqrt(.25-l(f-.5,2))*n+.5)&&.5!=p&&(p=p.toFixed(5)-1e-5*n)}return c}),n=n.split(/\s*\-\s*/),"linear"==h){var b=n.shift();if(b=-i(b),isNaN(b))return null;var _=[0,0,a.cos(t.rad(b)),a.sin(t.rad(b))],w=1/(s(o(_[2]),o(_[3]))||1);_[2]*=w,_[3]*=w,_[2]<0&&(_[0]=-_[2],_[2]=0),_[3]<0&&(_[1]=-_[3],_[3]=0)}var k=t._parseDots(n);if(!k)return null;if(u=u.replace(/[\(\)\s,\xb0#]/g,"_"),e.gradient&&u!=e.gradient.id&&(g.defs.removeChild(e.gradient),delete e.gradient),!e.gradient){y=v(h+"Gradient",{id:u}),e.gradient=y,v(y,"radial"==h?{fx:f,fy:p}:{x1:_[0],y1:_[1],x2:_[2],y2:_[3],gradientTransform:e.matrix.invert()}),g.defs.appendChild(y);for(var B=0,C=k.length;B<C;B++)y.appendChild(v("stop",{offset:k[B].offset?k[B].offset:B?"100%":"0%","stop-color":k[B].color||"#fff","stop-opacity":isFinite(k[B].opacity)?k[B].opacity:1}))}}return v(d,{fill:m(u),opacity:1,"fill-opacity":1}),x.fill=c,x.opacity=1,x.fillOpacity=1,1},y=function(){var t=document.documentMode;return t&&(9===t||10===t)},m=function(t){if(y())return"url('#"+t+"')";var e=document.location,r=e.protocol+"//"+e.host+e.pathname+e.search;return"url('"+r+"#"+t+"')"},b=function(t){var e=t.getBBox(1);v(t.pattern,{patternTransform:t.matrix.invert()+" translate("+e.x+","+e.y+")"})},_=function(i,n,a){if("path"==i.type){for(var s=r(n).toLowerCase().split("-"),o=i.paper,l=a?"end":"start",h=i.node,u=i.attrs,f=u["stroke-width"],p=s.length,x="classic",y,m,b,_,w,k=3,B=3,C=5;p--;)switch(s[p]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":x=s[p];break;case"wide":B=5;break;case"narrow":B=2;break;case"long":k=5;break;case"short":k=2}if("open"==x?(k+=2,B+=2,C+=2,b=1,_=a?4:1,w={fill:"none",stroke:u.stroke}):(_=b=k/2,w={fill:u.stroke,stroke:"none"}),i._.arrows?a?(i._.arrows.endPath&&g[i._.arrows.endPath]--,i._.arrows.endMarker&&g[i._.arrows.endMarker]--):(i._.arrows.startPath&&g[i._.arrows.startPath]--,i._.arrows.startMarker&&g[i._.arrows.startMarker]--):i._.arrows={},"none"!=x){var S="raphael-marker-"+x,A="raphael-marker-"+l+x+k+B+"-obj"+i.id;t._g.doc.getElementById(S)?g[S]++:(o.defs.appendChild(v(v("path"),{"stroke-linecap":"round",d:d[x],id:S})),g[S]=1);var T=t._g.doc.getElementById(A),E;T?(g[A]++,E=T.getElementsByTagName("use")[0]):(T=v(v("marker"),{id:A,markerHeight:B,markerWidth:k,orient:"auto",refX:_,refY:B/2}),E=v(v("use"),{"xlink:href":"#"+S,transform:(a?"rotate(180 "+k/2+" "+B/2+") ":c)+"scale("+k/C+","+B/C+")","stroke-width":(1/((k/C+B/C)/2)).toFixed(4)}),T.appendChild(E),o.defs.appendChild(T),g[A]=1),v(E,w);var M=b*("diamond"!=x&&"oval"!=x);a?(y=i._.arrows.startdx*f||0,m=t.getTotalLength(u.path)-M*f):(y=M*f,m=t.getTotalLength(u.path)-(i._.arrows.enddx*f||0)),w={},w["marker-"+l]="url(#"+A+")",(m||y)&&(w.d=t.getSubpath(u.path,y,m)),v(h,w),i._.arrows[l+"Path"]=S,i._.arrows[l+"Marker"]=A,i._.arrows[l+"dx"]=M,i._.arrows[l+"Type"]=x,i._.arrows[l+"String"]=n}else a?(y=i._.arrows.startdx*f||0,m=t.getTotalLength(u.path)-y):(y=0,m=t.getTotalLength(u.path)-(i._.arrows.enddx*f||0)),i._.arrows[l+"Path"]&&v(h,{d:t.getSubpath(u.path,y,m)}),delete i._.arrows[l+"Path"],delete i._.arrows[l+"Marker"],delete i._.arrows[l+"dx"],delete i._.arrows[l+"Type"],delete i._.arrows[l+"String"];for(w in g)if(g[e](w)&&!g[w]){var N=t._g.doc.getElementById(w);N&&N.parentNode.removeChild(N)}}},w={"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]},k=function(t,e,i){if(e=w[r(e).toLowerCase()]){for(var n=t.attrs["stroke-width"]||"1",a={round:n,square:n,butt:0}[t.attrs["stroke-linecap"]||i["stroke-linecap"]]||0,s=[],o=e.length;o--;)s[o]=e[o]*n+(o%2?1:-1)*a;v(t.node,{"stroke-dasharray":s.join(",")})}else v(t.node,{"stroke-dasharray":"none"})},B=function(i,a){var l=i.node,u=i.attrs,f=l.style.visibility;l.style.visibility="hidden";for(var d in a)if(a[e](d)){if(!t._availableAttrs[e](d))continue;var g=a[d];switch(u[d]=g,d){case"blur":i.blur(g);break;case"title":var y=l.getElementsByTagName("title");if(y.length&&(y=y[0]))y.firstChild.nodeValue=g;else{y=v("title");var m=t._g.doc.createTextNode(g);y.appendChild(m),l.appendChild(y)}break;case"href":case"target":var w=l.parentNode;if("a"!=w.tagName.toLowerCase()){var B=v("a");w.insertBefore(B,l),B.appendChild(l),w=B}"target"==d?w.setAttributeNS(p,"show","blank"==g?"new":g):w.setAttributeNS(p,d,g);break;case"cursor":l.style.cursor=g;break;case"transform":i.transform(g);break;case"arrow-start":_(i,g);break;case"arrow-end":_(i,g,1);break;case"clip-rect":var C=r(g).split(h);if(4==C.length){i.clip&&i.clip.parentNode.parentNode.removeChild(i.clip.parentNode);var A=v("clipPath"),T=v("rect");A.id=t.createUUID(),v(T,{x:C[0],y:C[1],width:C[2],height:C[3]}),A.appendChild(T),i.paper.defs.appendChild(A),v(l,{"clip-path":"url(#"+A.id+")"}),i.clip=T}if(!g){var E=l.getAttribute("clip-path");if(E){var M=t._g.doc.getElementById(E.replace(/(^url\(#|\)$)/g,c));M&&M.parentNode.removeChild(M),v(l,{"clip-path":c}),delete i.clip}}break;case"path":"path"==i.type&&(v(l,{d:g?u.path=t._pathToAbsolute(g):"M0,0"}),i._.dirty=1,i._.arrows&&("startString"in i._.arrows&&_(i,i._.arrows.startString),"endString"in i._.arrows&&_(i,i._.arrows.endString,1)));break;case"width":if(l.setAttribute(d,g),i._.dirty=1,!u.fx)break;d="x",g=u.x;case"x":u.fx&&(g=-u.x-(u.width||0));case"rx":if("rx"==d&&"rect"==i.type)break;case"cx":l.setAttribute(d,g),i.pattern&&b(i),i._.dirty=1;break;case"height":if(l.setAttribute(d,g),i._.dirty=1,!u.fy)break;d="y",g=u.y;case"y":u.fy&&(g=-u.y-(u.height||0));case"ry":if("ry"==d&&"rect"==i.type)break;case"cy":l.setAttribute(d,g),i.pattern&&b(i),i._.dirty=1;break;case"r":"rect"==i.type?v(l,{rx:g,ry:g}):l.setAttribute(d,g),i._.dirty=1;break;case"src":"image"==i.type&&l.setAttributeNS(p,"href",g);break;case"stroke-width":1==i._.sx&&1==i._.sy||(g/=s(o(i._.sx),o(i._.sy))||1),l.setAttribute(d,g),u["stroke-dasharray"]&&k(i,u["stroke-dasharray"],a),
i._.arrows&&("startString"in i._.arrows&&_(i,i._.arrows.startString),"endString"in i._.arrows&&_(i,i._.arrows.endString,1));break;case"stroke-dasharray":k(i,g,a);break;case"fill":var N=r(g).match(t._ISURL);if(N){A=v("pattern");var L=v("image");A.id=t.createUUID(),v(A,{x:0,y:0,patternUnits:"userSpaceOnUse",height:1,width:1}),v(L,{x:0,y:0,"xlink:href":N[1]}),A.appendChild(L),function(e){t._preload(N[1],function(){var t=this.offsetWidth,r=this.offsetHeight;v(e,{width:t,height:r}),v(L,{width:t,height:r})})}(A),i.paper.defs.appendChild(A),v(l,{fill:"url(#"+A.id+")"}),i.pattern=A,i.pattern&&b(i);break}var z=t.getRGB(g);if(z.error){if(("circle"==i.type||"ellipse"==i.type||"r"!=r(g).charAt())&&x(i,g)){if("opacity"in u||"fill-opacity"in u){var P=t._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g,c));if(P){var F=P.getElementsByTagName("stop");v(F[F.length-1],{"stop-opacity":("opacity"in u?u.opacity:1)*("fill-opacity"in u?u["fill-opacity"]:1)})}}u.gradient=g,u.fill="none";break}}else delete a.gradient,delete u.gradient,!t.is(u.opacity,"undefined")&&t.is(a.opacity,"undefined")&&v(l,{opacity:u.opacity}),!t.is(u["fill-opacity"],"undefined")&&t.is(a["fill-opacity"],"undefined")&&v(l,{"fill-opacity":u["fill-opacity"]});z[e]("opacity")&&v(l,{"fill-opacity":z.opacity>1?z.opacity/100:z.opacity});case"stroke":z=t.getRGB(g),l.setAttribute(d,z.hex),"stroke"==d&&z[e]("opacity")&&v(l,{"stroke-opacity":z.opacity>1?z.opacity/100:z.opacity}),"stroke"==d&&i._.arrows&&("startString"in i._.arrows&&_(i,i._.arrows.startString),"endString"in i._.arrows&&_(i,i._.arrows.endString,1));break;case"gradient":("circle"==i.type||"ellipse"==i.type||"r"!=r(g).charAt())&&x(i,g);break;case"opacity":u.gradient&&!u[e]("stroke-opacity")&&v(l,{"stroke-opacity":g>1?g/100:g});case"fill-opacity":if(u.gradient){P=t._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g,c)),P&&(F=P.getElementsByTagName("stop"),v(F[F.length-1],{"stop-opacity":g}));break}default:"font-size"==d&&(g=n(g,10)+"px");var R=d.replace(/(\-.)/g,function(t){return t.substring(1).toUpperCase()});l.style[R]=g,i._.dirty=1,l.setAttribute(d,g)}}S(i,a),l.style.visibility=f},C=1.2,S=function(i,a){if("text"==i.type&&(a[e]("text")||a[e]("font")||a[e]("font-size")||a[e]("x")||a[e]("y"))){var s=i.attrs,o=i.node,l=o.firstChild?n(t._g.doc.defaultView.getComputedStyle(o.firstChild,c).getPropertyValue("font-size"),10):10;if(a[e]("text")){for(s.text=a.text;o.firstChild;)o.removeChild(o.firstChild);for(var h=r(a.text).split("\n"),u=[],f,p=0,d=h.length;p<d;p++)f=v("tspan"),p&&v(f,{dy:l*C,x:s.x}),f.appendChild(t._g.doc.createTextNode(h[p])),o.appendChild(f),u[p]=f}else for(u=o.getElementsByTagName("tspan"),p=0,d=u.length;p<d;p++)p?v(u[p],{dy:l*C,x:s.x}):v(u[0],{dy:0});v(o,{x:s.x,y:s.y}),i._.dirty=1;var g=i._getBBox(),x=s.y-(g.y+g.height/2);x&&t.is(x,"finite")&&v(u[0],{dy:x})}},A=function(t){return t.parentNode&&"a"===t.parentNode.tagName.toLowerCase()?t.parentNode:t},T=function(e,r){function i(){return("0000"+(Math.random()*Math.pow(36,5)<<0).toString(36)).slice(-5)}var n=0,a=0;this[0]=this.node=e,e.raphael=!0,this.id=i(),e.raphaelid=this.id,this.matrix=t.matrix(),this.realPath=null,this.paper=r,this.attrs=this.attrs||{},this._={transform:[],sx:1,sy:1,deg:0,dx:0,dy:0,dirty:1},!r.bottom&&(r.bottom=this),this.prev=r.top,r.top&&(r.top.next=this),r.top=this,this.next=null},E=t.el;T.prototype=E,E.constructor=T,t._engine.path=function(t,e){var r=v("path");e.canvas&&e.canvas.appendChild(r);var i=new T(r,e);return i.type="path",B(i,{fill:"none",stroke:"#000",path:t}),i},E.rotate=function(t,e,n){if(this.removed)return this;if(t=r(t).split(h),t.length-1&&(e=i(t[1]),n=i(t[2])),t=i(t[0]),null==n&&(e=n),null==e||null==n){var a=this.getBBox(1);e=a.x+a.width/2,n=a.y+a.height/2}return this.transform(this._.transform.concat([["r",t,e,n]])),this},E.scale=function(t,e,n,a){if(this.removed)return this;if(t=r(t).split(h),t.length-1&&(e=i(t[1]),n=i(t[2]),a=i(t[3])),t=i(t[0]),null==e&&(e=t),null==a&&(n=a),null==n||null==a)var s=this.getBBox(1);return n=null==n?s.x+s.width/2:n,a=null==a?s.y+s.height/2:a,this.transform(this._.transform.concat([["s",t,e,n,a]])),this},E.translate=function(t,e){return this.removed?this:(t=r(t).split(h),t.length-1&&(e=i(t[1])),t=i(t[0])||0,e=+e||0,this.transform(this._.transform.concat([["t",t,e]])),this)},E.transform=function(r){var i=this._;if(null==r)return i.transform;if(t._extractTransform(this,r),this.clip&&v(this.clip,{transform:this.matrix.invert()}),this.pattern&&b(this),this.node&&v(this.node,{transform:this.matrix}),1!=i.sx||1!=i.sy){var n=this.attrs[e]("stroke-width")?this.attrs["stroke-width"]:1;this.attr({"stroke-width":n})}return this},E.hide=function(){return this.removed||(this.node.style.display="none"),this},E.show=function(){return this.removed||(this.node.style.display=""),this},E.remove=function(){var e=A(this.node);if(!this.removed&&e.parentNode){var r=this.paper;r.__set__&&r.__set__.exclude(this),u.unbind("raphael.*.*."+this.id),this.gradient&&r.defs.removeChild(this.gradient),t._tear(this,r),e.parentNode.removeChild(e),this.removeData();for(var i in this)this[i]="function"==typeof this[i]?t._removedFactory(i):null;this.removed=!0}},E._getBBox=function(){if("none"==this.node.style.display){this.show();var t=!0}var e=!1,r;this.paper.canvas.parentElement?r=this.paper.canvas.parentElement.style:this.paper.canvas.parentNode&&(r=this.paper.canvas.parentNode.style),r&&"none"==r.display&&(e=!0,r.display="");var i={};try{i=this.node.getBBox()}catch(n){i={x:this.node.clientLeft,y:this.node.clientTop,width:this.node.clientWidth,height:this.node.clientHeight}}finally{i=i||{},e&&(r.display="none")}return t&&this.hide(),i},E.attr=function(r,i){if(this.removed)return this;if(null==r){var n={};for(var a in this.attrs)this.attrs[e](a)&&(n[a]=this.attrs[a]);return n.gradient&&"none"==n.fill&&(n.fill=n.gradient)&&delete n.gradient,n.transform=this._.transform,n}if(null==i&&t.is(r,"string")){if("fill"==r&&"none"==this.attrs.fill&&this.attrs.gradient)return this.attrs.gradient;if("transform"==r)return this._.transform;for(var s=r.split(h),o={},l=0,c=s.length;l<c;l++)r=s[l],r in this.attrs?o[r]=this.attrs[r]:t.is(this.paper.customAttributes[r],"function")?o[r]=this.paper.customAttributes[r].def:o[r]=t._availableAttrs[r];return c-1?o:o[s[0]]}if(null==i&&t.is(r,"array")){for(o={},l=0,c=r.length;l<c;l++)o[r[l]]=this.attr(r[l]);return o}if(null!=i){var f={};f[r]=i}else null!=r&&t.is(r,"object")&&(f=r);for(var p in f)u("raphael.attr."+p+"."+this.id,this,f[p]);for(p in this.paper.customAttributes)if(this.paper.customAttributes[e](p)&&f[e](p)&&t.is(this.paper.customAttributes[p],"function")){var d=this.paper.customAttributes[p].apply(this,[].concat(f[p]));this.attrs[p]=f[p];for(var g in d)d[e](g)&&(f[g]=d[g])}return B(this,f),this},E.toFront=function(){if(this.removed)return this;var e=A(this.node);e.parentNode.appendChild(e);var r=this.paper;return r.top!=this&&t._tofront(this,r),this},E.toBack=function(){if(this.removed)return this;var e=A(this.node),r=e.parentNode;r.insertBefore(e,r.firstChild),t._toback(this,this.paper);var i=this.paper;return this},E.insertAfter=function(e){if(this.removed||!e)return this;var r=A(this.node),i=A(e.node||e[e.length-1].node);return i.nextSibling?i.parentNode.insertBefore(r,i.nextSibling):i.parentNode.appendChild(r),t._insertafter(this,e,this.paper),this},E.insertBefore=function(e){if(this.removed||!e)return this;var r=A(this.node),i=A(e.node||e[0].node);return i.parentNode.insertBefore(r,i),t._insertbefore(this,e,this.paper),this},E.blur=function(e){var r=this;if(0!==+e){var i=v("filter"),n=v("feGaussianBlur");r.attrs.blur=e,i.id=t.createUUID(),v(n,{stdDeviation:+e||1.5}),i.appendChild(n),r.paper.defs.appendChild(i),r._blur=i,v(r.node,{filter:"url(#"+i.id+")"})}else r._blur&&(r._blur.parentNode.removeChild(r._blur),delete r._blur,delete r.attrs.blur),r.node.removeAttribute("filter");return r},t._engine.circle=function(t,e,r,i){var n=v("circle");t.canvas&&t.canvas.appendChild(n);var a=new T(n,t);return a.attrs={cx:e,cy:r,r:i,fill:"none",stroke:"#000"},a.type="circle",v(n,a.attrs),a},t._engine.rect=function(t,e,r,i,n,a){var s=v("rect");t.canvas&&t.canvas.appendChild(s);var o=new T(s,t);return o.attrs={x:e,y:r,width:i,height:n,rx:a||0,ry:a||0,fill:"none",stroke:"#000"},o.type="rect",v(s,o.attrs),o},t._engine.ellipse=function(t,e,r,i,n){var a=v("ellipse");t.canvas&&t.canvas.appendChild(a);var s=new T(a,t);return s.attrs={cx:e,cy:r,rx:i,ry:n,fill:"none",stroke:"#000"},s.type="ellipse",v(a,s.attrs),s},t._engine.image=function(t,e,r,i,n,a){var s=v("image");v(s,{x:r,y:i,width:n,height:a,preserveAspectRatio:"none"}),s.setAttributeNS(p,"href",e),t.canvas&&t.canvas.appendChild(s);var o=new T(s,t);return o.attrs={x:r,y:i,width:n,height:a,src:e},o.type="image",o},t._engine.text=function(e,r,i,n){var a=v("text");e.canvas&&e.canvas.appendChild(a);var s=new T(a,e);return s.attrs={x:r,y:i,"text-anchor":"middle",text:n,"font-family":t._availableAttrs["font-family"],"font-size":t._availableAttrs["font-size"],stroke:"none",fill:"#000"},s.type="text",B(s,s.attrs),s},t._engine.setSize=function(t,e){return this.width=t||this.width,this.height=e||this.height,this.canvas.setAttribute("width",this.width),this.canvas.setAttribute("height",this.height),this._viewBox&&this.setViewBox.apply(this,this._viewBox),this},t._engine.create=function(){var e=t._getContainer.apply(0,arguments),r=e&&e.container,i=e.x,n=e.y,a=e.width,s=e.height;if(!r)throw new Error("SVG container not found.");var o=v("svg"),l="overflow:hidden;",h;return i=i||0,n=n||0,a=a||512,s=s||342,v(o,{height:s,version:1.1,width:a,xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}),1==r?(o.style.cssText=l+"position:absolute;left:"+i+"px;top:"+n+"px",t._g.doc.body.appendChild(o),h=1):(o.style.cssText=l+"position:relative",r.firstChild?r.insertBefore(o,r.firstChild):r.appendChild(o)),r=new t._Paper,r.width=a,r.height=s,r.canvas=o,r.clear(),r._left=r._top=0,h&&(r.renderfix=function(){}),r.renderfix(),r},t._engine.setViewBox=function(t,e,r,i,n){u("raphael.setViewBox",this,this._viewBox,[t,e,r,i,n]);var a=this.getSize(),o=s(r/a.width,i/a.height),l=this.top,h=n?"xMidYMid meet":"xMinYMin",c,p;for(null==t?(this._vbSize&&(o=1),delete this._vbSize,c="0 0 "+this.width+f+this.height):(this._vbSize=o,c=t+f+e+f+r+f+i),v(this.canvas,{viewBox:c,preserveAspectRatio:h});o&&l;)p="stroke-width"in l.attrs?l.attrs["stroke-width"]:1,l.attr({"stroke-width":p}),l._.dirty=1,l._.dirtyT=1,l=l.prev;return this._viewBox=[t,e,r,i,!!n],this},t.prototype.renderfix=function(){var t=this.canvas,e=t.style,r;try{r=t.getScreenCTM()||t.createSVGMatrix()}catch(i){r=t.createSVGMatrix()}var n=-r.e%1,a=-r.f%1;(n||a)&&(n&&(this._left=(this._left+n)%1,e.left=this._left+"px"),a&&(this._top=(this._top+a)%1,e.top=this._top+"px"))},t.prototype.clear=function(){t.eve("raphael.clear",this);for(var e=this.canvas;e.firstChild;)e.removeChild(e.firstChild);this.bottom=this.top=null,(this.desc=v("desc")).appendChild(t._g.doc.createTextNode("Created with Raphaël "+t.version)),e.appendChild(this.desc),e.appendChild(this.defs=v("defs"))},t.prototype.remove=function(){u("raphael.remove",this),this.canvas.parentNode&&this.canvas.parentNode.removeChild(this.canvas);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null};var M=t.st;for(var N in E)E[e](N)&&!M[e](N)&&(M[N]=function(t){return function(){var e=arguments;return this.forEach(function(r){r[t].apply(r,e)})}}(N))}}.apply(e,i),!(void 0!==n&&(t.exports=n))},function(t,e,r){var i,n;i=[r(1)],n=function(t){if(!t||t.vml){var e="hasOwnProperty",r=String,i=parseFloat,n=Math,a=n.round,s=n.max,o=n.min,l=n.abs,h="fill",u=/[, ]+/,c=t.eve,f=" progid:DXImageTransform.Microsoft",p=" ",d="",g={M:"m",L:"l",C:"c",Z:"x",m:"t",l:"r",c:"v",z:"x"},v=/([clmz]),?([^clmz]*)/gi,x=/ progid:\S+Blur\([^\)]+\)/g,y=/-?[^,\s-]+/g,m="position:absolute;left:0;top:0;width:1px;height:1px;behavior:url(#default#VML)",b=21600,_={path:1,rect:1,image:1},w={circle:1,ellipse:1},k=function(e){var i=/[ahqstv]/gi,n=t._pathToAbsolute;if(r(e).match(i)&&(n=t._path2curve),i=/[clmz]/g,n==t._pathToAbsolute&&!r(e).match(i)){var s=r(e).replace(v,function(t,e,r){var i=[],n="m"==e.toLowerCase(),s=g[e];return r.replace(y,function(t){n&&2==i.length&&(s+=i+g["m"==e?"l":"L"],i=[]),i.push(a(t*b))}),s+i});return s}var o=n(e),l,h;s=[];for(var u=0,c=o.length;u<c;u++){l=o[u],h=o[u][0].toLowerCase(),"z"==h&&(h="x");for(var f=1,x=l.length;f<x;f++)h+=a(l[f]*b)+(f!=x-1?",":d);s.push(h)}return s.join(p)},B=function(e,r,i){var n=t.matrix();return n.rotate(-e,.5,.5),{dx:n.x(r,i),dy:n.y(r,i)}},C=function(t,e,r,i,n,a){var s=t._,o=t.matrix,u=s.fillpos,c=t.node,f=c.style,d=1,g="",v,x=b/e,y=b/r;if(f.visibility="hidden",e&&r){if(c.coordsize=l(x)+p+l(y),f.rotation=a*(e*r<0?-1:1),a){var m=B(a,i,n);i=m.dx,n=m.dy}if(e<0&&(g+="x"),r<0&&(g+=" y")&&(d=-1),f.flip=g,c.coordorigin=i*-x+p+n*-y,u||s.fillsize){var _=c.getElementsByTagName(h);_=_&&_[0],c.removeChild(_),u&&(m=B(a,o.x(u[0],u[1]),o.y(u[0],u[1])),_.position=m.dx*d+p+m.dy*d),s.fillsize&&(_.size=s.fillsize[0]*l(e)+p+s.fillsize[1]*l(r)),c.appendChild(_)}f.visibility="visible"}};t.toString=function(){return"Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël "+this.version};var S=function(t,e,i){for(var n=r(e).toLowerCase().split("-"),a=i?"end":"start",s=n.length,o="classic",l="medium",h="medium";s--;)switch(n[s]){case"block":case"classic":case"oval":case"diamond":case"open":case"none":o=n[s];break;case"wide":case"narrow":h=n[s];break;case"long":case"short":l=n[s]}var u=t.node.getElementsByTagName("stroke")[0];u[a+"arrow"]=o,u[a+"arrowlength"]=l,u[a+"arrowwidth"]=h},A=function(n,l){n.attrs=n.attrs||{};var c=n.node,f=n.attrs,g=c.style,v,x=_[n.type]&&(l.x!=f.x||l.y!=f.y||l.width!=f.width||l.height!=f.height||l.cx!=f.cx||l.cy!=f.cy||l.rx!=f.rx||l.ry!=f.ry||l.r!=f.r),y=w[n.type]&&(f.cx!=l.cx||f.cy!=l.cy||f.r!=l.r||f.rx!=l.rx||f.ry!=l.ry),m=n;for(var B in l)l[e](B)&&(f[B]=l[B]);if(x&&(f.path=t._getPath[n.type](n),n._.dirty=1),l.href&&(c.href=l.href),l.title&&(c.title=l.title),l.target&&(c.target=l.target),l.cursor&&(g.cursor=l.cursor),"blur"in l&&n.blur(l.blur),(l.path&&"path"==n.type||x)&&(c.path=k(~r(f.path).toLowerCase().indexOf("r")?t._pathToAbsolute(f.path):f.path),n._.dirty=1,"image"==n.type&&(n._.fillpos=[f.x,f.y],n._.fillsize=[f.width,f.height],C(n,1,1,0,0,0))),"transform"in l&&n.transform(l.transform),y){var A=+f.cx,E=+f.cy,M=+f.rx||+f.r||0,L=+f.ry||+f.r||0;c.path=t.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x",a((A-M)*b),a((E-L)*b),a((A+M)*b),a((E+L)*b),a(A*b)),n._.dirty=1}if("clip-rect"in l){var z=r(l["clip-rect"]).split(u);if(4==z.length){z[2]=+z[2]+ +z[0],z[3]=+z[3]+ +z[1];var P=c.clipRect||t._g.doc.createElement("div"),F=P.style;F.clip=t.format("rect({1}px {2}px {3}px {0}px)",z),c.clipRect||(F.position="absolute",F.top=0,F.left=0,F.width=n.paper.width+"px",F.height=n.paper.height+"px",c.parentNode.insertBefore(P,c),P.appendChild(c),c.clipRect=P)}l["clip-rect"]||c.clipRect&&(c.clipRect.style.clip="auto")}if(n.textpath){var R=n.textpath.style;l.font&&(R.font=l.font),l["font-family"]&&(R.fontFamily='"'+l["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g,d)+'"'),l["font-size"]&&(R.fontSize=l["font-size"]),l["font-weight"]&&(R.fontWeight=l["font-weight"]),l["font-style"]&&(R.fontStyle=l["font-style"])}if("arrow-start"in l&&S(m,l["arrow-start"]),"arrow-end"in l&&S(m,l["arrow-end"],1),null!=l.opacity||null!=l.fill||null!=l.src||null!=l.stroke||null!=l["stroke-width"]||null!=l["stroke-opacity"]||null!=l["fill-opacity"]||null!=l["stroke-dasharray"]||null!=l["stroke-miterlimit"]||null!=l["stroke-linejoin"]||null!=l["stroke-linecap"]){var j=c.getElementsByTagName(h),I=!1;if(j=j&&j[0],!j&&(I=j=N(h)),"image"==n.type&&l.src&&(j.src=l.src),l.fill&&(j.on=!0),null!=j.on&&"none"!=l.fill&&null!==l.fill||(j.on=!1),j.on&&l.fill){var q=r(l.fill).match(t._ISURL);if(q){j.parentNode==c&&c.removeChild(j),j.rotate=!0,j.src=q[1],j.type="tile";var D=n.getBBox(1);j.position=D.x+p+D.y,n._.fillpos=[D.x,D.y],t._preload(q[1],function(){n._.fillsize=[this.offsetWidth,this.offsetHeight]})}else j.color=t.getRGB(l.fill).hex,j.src=d,j.type="solid",t.getRGB(l.fill).error&&(m.type in{circle:1,ellipse:1}||"r"!=r(l.fill).charAt())&&T(m,l.fill,j)&&(f.fill="none",f.gradient=l.fill,j.rotate=!1)}if("fill-opacity"in l||"opacity"in l){var V=((+f["fill-opacity"]+1||2)-1)*((+f.opacity+1||2)-1)*((+t.getRGB(l.fill).o+1||2)-1);V=o(s(V,0),1),j.opacity=V,j.src&&(j.color="none")}c.appendChild(j);var O=c.getElementsByTagName("stroke")&&c.getElementsByTagName("stroke")[0],Y=!1;!O&&(Y=O=N("stroke")),(l.stroke&&"none"!=l.stroke||l["stroke-width"]||null!=l["stroke-opacity"]||l["stroke-dasharray"]||l["stroke-miterlimit"]||l["stroke-linejoin"]||l["stroke-linecap"])&&(O.on=!0),("none"==l.stroke||null===l.stroke||null==O.on||0==l.stroke||0==l["stroke-width"])&&(O.on=!1);var W=t.getRGB(l.stroke);O.on&&l.stroke&&(O.color=W.hex),V=((+f["stroke-opacity"]+1||2)-1)*((+f.opacity+1||2)-1)*((+W.o+1||2)-1);var G=.75*(i(l["stroke-width"])||1);if(V=o(s(V,0),1),null==l["stroke-width"]&&(G=f["stroke-width"]),l["stroke-width"]&&(O.weight=G),G&&G<1&&(V*=G)&&(O.weight=1),O.opacity=V,l["stroke-linejoin"]&&(O.joinstyle=l["stroke-linejoin"]||"miter"),O.miterlimit=l["stroke-miterlimit"]||8,l["stroke-linecap"]&&(O.endcap="butt"==l["stroke-linecap"]?"flat":"square"==l["stroke-linecap"]?"square":"round"),"stroke-dasharray"in l){var H={"-":"shortdash",".":"shortdot","-.":"shortdashdot","-..":"shortdashdotdot",". ":"dot","- ":"dash","--":"longdash","- .":"dashdot","--.":"longdashdot","--..":"longdashdotdot"};O.dashstyle=H[e](l["stroke-dasharray"])?H[l["stroke-dasharray"]]:d}Y&&c.appendChild(O)}if("text"==m.type){m.paper.canvas.style.display=d;var X=m.paper.span,U=100,$=f.font&&f.font.match(/\d+(?:\.\d*)?(?=px)/);g=X.style,f.font&&(g.font=f.font),f["font-family"]&&(g.fontFamily=f["font-family"]),f["font-weight"]&&(g.fontWeight=f["font-weight"]),f["font-style"]&&(g.fontStyle=f["font-style"]),$=i(f["font-size"]||$&&$[0])||10,g.fontSize=$*U+"px",m.textpath.string&&(X.innerHTML=r(m.textpath.string).replace(/</g,"&#60;").replace(/&/g,"&#38;").replace(/\n/g,"<br>"));var Z=X.getBoundingClientRect();m.W=f.w=(Z.right-Z.left)/U,m.H=f.h=(Z.bottom-Z.top)/U,m.X=f.x,m.Y=f.y+m.H/2,("x"in l||"y"in l)&&(m.path.v=t.format("m{0},{1}l{2},{1}",a(f.x*b),a(f.y*b),a(f.x*b)+1));for(var Q=["x","y","text","font","font-family","font-weight","font-style","font-size"],J=0,K=Q.length;J<K;J++)if(Q[J]in l){m._.dirty=1;break}switch(f["text-anchor"]){case"start":m.textpath.style["v-text-align"]="left",m.bbx=m.W/2;break;case"end":m.textpath.style["v-text-align"]="right",m.bbx=-m.W/2;break;default:m.textpath.style["v-text-align"]="center",m.bbx=0}m.textpath.style["v-text-kern"]=!0}},T=function(e,a,s){e.attrs=e.attrs||{};var o=e.attrs,l=Math.pow,h,u,c="linear",f=".5 .5";if(e.attrs.gradient=a,a=r(a).replace(t._radial_gradient,function(t,e,r){return c="radial",e&&r&&(e=i(e),r=i(r),l(e-.5,2)+l(r-.5,2)>.25&&(r=n.sqrt(.25-l(e-.5,2))*(2*(r>.5)-1)+.5),f=e+p+r),d}),a=a.split(/\s*\-\s*/),"linear"==c){var g=a.shift();if(g=-i(g),isNaN(g))return null}var v=t._parseDots(a);if(!v)return null;if(e=e.shape||e.node,v.length){e.removeChild(s),s.on=!0,s.method="none",s.color=v[0].color,s.color2=v[v.length-1].color;for(var x=[],y=0,m=v.length;y<m;y++)v[y].offset&&x.push(v[y].offset+p+v[y].color);s.colors=x.length?x.join():"0% "+s.color,"radial"==c?(s.type="gradientTitle",s.focus="100%",s.focussize="0 0",s.focusposition=f,s.angle=0):(s.type="gradient",s.angle=(270-g)%360),e.appendChild(s)}return 1},E=function(e,r){this[0]=this.node=e,e.raphael=!0,this.id=t._oid++,e.raphaelid=this.id,this.X=0,this.Y=0,this.attrs={},this.paper=r,this.matrix=t.matrix(),this._={transform:[],sx:1,sy:1,dx:0,dy:0,deg:0,dirty:1,dirtyT:1},!r.bottom&&(r.bottom=this),this.prev=r.top,r.top&&(r.top.next=this),r.top=this,this.next=null},M=t.el;E.prototype=M,M.constructor=E,M.transform=function(e){if(null==e)return this._.transform;var i=this.paper._viewBoxShift,n=i?"s"+[i.scale,i.scale]+"-1-1t"+[i.dx,i.dy]:d,a;i&&(a=e=r(e).replace(/\.{3}|\u2026/g,this._.transform||d)),t._extractTransform(this,n+e);var s=this.matrix.clone(),o=this.skew,l=this.node,h,u=~r(this.attrs.fill).indexOf("-"),c=!r(this.attrs.fill).indexOf("url(");if(s.translate(1,1),c||u||"image"==this.type)if(o.matrix="1 0 0 1",o.offset="0 0",h=s.split(),u&&h.noRotation||!h.isSimple){l.style.filter=s.toFilter();var f=this.getBBox(),g=this.getBBox(1),v=f.x-g.x,x=f.y-g.y;l.coordorigin=v*-b+p+x*-b,C(this,1,1,v,x,0)}else l.style.filter=d,C(this,h.scalex,h.scaley,h.dx,h.dy,h.rotate);else l.style.filter=d,o.matrix=r(s),o.offset=s.offset();return null!==a&&(this._.transform=a,t._extractTransform(this,a)),this},M.rotate=function(t,e,n){if(this.removed)return this;if(null!=t){if(t=r(t).split(u),t.length-1&&(e=i(t[1]),n=i(t[2])),t=i(t[0]),null==n&&(e=n),null==e||null==n){var a=this.getBBox(1);e=a.x+a.width/2,n=a.y+a.height/2}return this._.dirtyT=1,this.transform(this._.transform.concat([["r",t,e,n]])),this}},M.translate=function(t,e){return this.removed?this:(t=r(t).split(u),t.length-1&&(e=i(t[1])),t=i(t[0])||0,e=+e||0,this._.bbox&&(this._.bbox.x+=t,this._.bbox.y+=e),this.transform(this._.transform.concat([["t",t,e]])),this)},M.scale=function(t,e,n,a){if(this.removed)return this;if(t=r(t).split(u),t.length-1&&(e=i(t[1]),n=i(t[2]),a=i(t[3]),isNaN(n)&&(n=null),isNaN(a)&&(a=null)),t=i(t[0]),null==e&&(e=t),null==a&&(n=a),null==n||null==a)var s=this.getBBox(1);return n=null==n?s.x+s.width/2:n,a=null==a?s.y+s.height/2:a,this.transform(this._.transform.concat([["s",t,e,n,a]])),this._.dirtyT=1,this},M.hide=function(){return!this.removed&&(this.node.style.display="none"),this},M.show=function(){return!this.removed&&(this.node.style.display=d),this},M.auxGetBBox=t.el.getBBox,M.getBBox=function(){var t=this.auxGetBBox();if(this.paper&&this.paper._viewBoxShift){var e={},r=1/this.paper._viewBoxShift.scale;return e.x=t.x-this.paper._viewBoxShift.dx,e.x*=r,e.y=t.y-this.paper._viewBoxShift.dy,e.y*=r,e.width=t.width*r,e.height=t.height*r,e.x2=e.x+e.width,e.y2=e.y+e.height,e}return t},M._getBBox=function(){return this.removed?{}:{x:this.X+(this.bbx||0)-this.W/2,y:this.Y-this.H,width:this.W,height:this.H}},M.remove=function(){if(!this.removed&&this.node.parentNode){this.paper.__set__&&this.paper.__set__.exclude(this),t.eve.unbind("raphael.*.*."+this.id),t._tear(this,this.paper),this.node.parentNode.removeChild(this.node),this.shape&&this.shape.parentNode.removeChild(this.shape);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null;this.removed=!0}},M.attr=function(r,i){if(this.removed)return this;if(null==r){var n={};for(var a in this.attrs)this.attrs[e](a)&&(n[a]=this.attrs[a]);return n.gradient&&"none"==n.fill&&(n.fill=n.gradient)&&delete n.gradient,n.transform=this._.transform,n}if(null==i&&t.is(r,"string")){if(r==h&&"none"==this.attrs.fill&&this.attrs.gradient)return this.attrs.gradient;for(var s=r.split(u),o={},l=0,f=s.length;l<f;l++)r=s[l],r in this.attrs?o[r]=this.attrs[r]:t.is(this.paper.customAttributes[r],"function")?o[r]=this.paper.customAttributes[r].def:o[r]=t._availableAttrs[r];return f-1?o:o[s[0]]}if(this.attrs&&null==i&&t.is(r,"array")){for(o={},l=0,f=r.length;l<f;l++)o[r[l]]=this.attr(r[l]);return o}var p;null!=i&&(p={},p[r]=i),null==i&&t.is(r,"object")&&(p=r);for(var d in p)c("raphael.attr."+d+"."+this.id,this,p[d]);if(p){for(d in this.paper.customAttributes)if(this.paper.customAttributes[e](d)&&p[e](d)&&t.is(this.paper.customAttributes[d],"function")){var g=this.paper.customAttributes[d].apply(this,[].concat(p[d]));this.attrs[d]=p[d];for(var v in g)g[e](v)&&(p[v]=g[v])}p.text&&"text"==this.type&&(this.textpath.string=p.text),A(this,p)}return this},M.toFront=function(){return!this.removed&&this.node.parentNode.appendChild(this.node),this.paper&&this.paper.top!=this&&t._tofront(this,this.paper),this},M.toBack=function(){return this.removed?this:(this.node.parentNode.firstChild!=this.node&&(this.node.parentNode.insertBefore(this.node,this.node.parentNode.firstChild),t._toback(this,this.paper)),this)},M.insertAfter=function(e){return this.removed?this:(e.constructor==t.st.constructor&&(e=e[e.length-1]),e.node.nextSibling?e.node.parentNode.insertBefore(this.node,e.node.nextSibling):e.node.parentNode.appendChild(this.node),t._insertafter(this,e,this.paper),this)},M.insertBefore=function(e){return this.removed?this:(e.constructor==t.st.constructor&&(e=e[0]),e.node.parentNode.insertBefore(this.node,e.node),t._insertbefore(this,e,this.paper),this)},M.blur=function(e){var r=this.node.runtimeStyle,i=r.filter;return i=i.replace(x,d),0!==+e?(this.attrs.blur=e,r.filter=i+p+f+".Blur(pixelradius="+(+e||1.5)+")",r.margin=t.format("-{0}px 0 0 -{0}px",a(+e||1.5))):(r.filter=i,r.margin=0,delete this.attrs.blur),this},t._engine.path=function(t,e){var r=N("shape");r.style.cssText=m,r.coordsize=b+p+b,r.coordorigin=e.coordorigin;var i=new E(r,e),n={fill:"none",stroke:"#000"};t&&(n.path=t),i.type="path",i.path=[],i.Path=d,A(i,n),e.canvas&&e.canvas.appendChild(r);var a=N("skew");return a.on=!0,r.appendChild(a),i.skew=a,i.transform(d),i},t._engine.rect=function(e,r,i,n,a,s){var o=t._rectPath(r,i,n,a,s),l=e.path(o),h=l.attrs;return l.X=h.x=r,l.Y=h.y=i,l.W=h.width=n,l.H=h.height=a,h.r=s,h.path=o,l.type="rect",l},t._engine.ellipse=function(t,e,r,i,n){var a=t.path(),s=a.attrs;return a.X=e-i,a.Y=r-n,a.W=2*i,a.H=2*n,a.type="ellipse",A(a,{cx:e,cy:r,rx:i,ry:n}),a},t._engine.circle=function(t,e,r,i){var n=t.path(),a=n.attrs;return n.X=e-i,n.Y=r-i,n.W=n.H=2*i,n.type="circle",A(n,{cx:e,cy:r,r:i}),n},t._engine.image=function(e,r,i,n,a,s){var o=t._rectPath(i,n,a,s),l=e.path(o).attr({stroke:"none"}),u=l.attrs,c=l.node,f=c.getElementsByTagName(h)[0];return u.src=r,l.X=u.x=i,l.Y=u.y=n,l.W=u.width=a,l.H=u.height=s,u.path=o,l.type="image",f.parentNode==c&&c.removeChild(f),f.rotate=!0,f.src=r,f.type="tile",l._.fillpos=[i,n],l._.fillsize=[a,s],c.appendChild(f),C(l,1,1,0,0,0),l},t._engine.text=function(e,i,n,s){var o=N("shape"),l=N("path"),h=N("textpath");i=i||0,n=n||0,s=s||"",l.v=t.format("m{0},{1}l{2},{1}",a(i*b),a(n*b),a(i*b)+1),l.textpathok=!0,h.string=r(s),h.on=!0,o.style.cssText=m,o.coordsize=b+p+b,o.coordorigin="0 0";var u=new E(o,e),c={fill:"#000",stroke:"none",font:t._availableAttrs.font,text:s};u.shape=o,u.path=l,u.textpath=h,u.type="text",u.attrs.text=r(s),u.attrs.x=i,u.attrs.y=n,u.attrs.w=1,u.attrs.h=1,A(u,c),o.appendChild(h),o.appendChild(l),e.canvas.appendChild(o);var f=N("skew");return f.on=!0,o.appendChild(f),u.skew=f,u.transform(d),u},t._engine.setSize=function(e,r){var i=this.canvas.style;return this.width=e,this.height=r,e==+e&&(e+="px"),r==+r&&(r+="px"),i.width=e,i.height=r,i.clip="rect(0 "+e+" "+r+" 0)",this._viewBox&&t._engine.setViewBox.apply(this,this._viewBox),this},t._engine.setViewBox=function(e,r,i,n,a){t.eve("raphael.setViewBox",this,this._viewBox,[e,r,i,n,a]);var s=this.getSize(),o=s.width,l=s.height,h,u;return a&&(h=l/n,u=o/i,i*h<o&&(e-=(o-i*h)/2/h),n*u<l&&(r-=(l-n*u)/2/u)),this._viewBox=[e,r,i,n,!!a],this._viewBoxShift={dx:-e,dy:-r,scale:s},this.forEach(function(t){t.transform("...")}),this};var N;t._engine.initWin=function(t){var e=t.document;e.styleSheets.length<31?e.createStyleSheet().addRule(".rvml","behavior:url(#default#VML)"):e.styleSheets[0].addRule(".rvml","behavior:url(#default#VML)");try{!e.namespaces.rvml&&e.namespaces.add("rvml","urn:schemas-microsoft-com:vml"),N=function(t){return e.createElement("<rvml:"+t+' class="rvml">')}}catch(r){N=function(t){return e.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')}}},t._engine.initWin(t._g.win),t._engine.create=function(){var e=t._getContainer.apply(0,arguments),r=e.container,i=e.height,n,a=e.width,s=e.x,o=e.y;if(!r)throw new Error("VML container not found.");var l=new t._Paper,h=l.canvas=t._g.doc.createElement("div"),u=h.style;return s=s||0,o=o||0,a=a||512,i=i||342,l.width=a,l.height=i,a==+a&&(a+="px"),i==+i&&(i+="px"),l.coordsize=1e3*b+p+1e3*b,l.coordorigin="0 0",l.span=t._g.doc.createElement("span"),l.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;",h.appendChild(l.span),u.cssText=t.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden",a,i),1==r?(t._g.doc.body.appendChild(h),u.left=s+"px",u.top=o+"px",u.position="absolute"):r.firstChild?r.insertBefore(h,r.firstChild):r.appendChild(h),l.renderfix=function(){},l},t.prototype.clear=function(){t.eve("raphael.clear",this),this.canvas.innerHTML=d,this.span=t._g.doc.createElement("span"),this.span.style.cssText="position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;",this.canvas.appendChild(this.span),this.bottom=this.top=null},t.prototype.remove=function(){t.eve("raphael.remove",this),this.canvas.parentNode.removeChild(this.canvas);for(var e in this)this[e]="function"==typeof this[e]?t._removedFactory(e):null;return!0};var L=t.st;for(var z in M)M[e](z)&&!L[e](z)&&(L[z]=function(t){return function(){var e=arguments;return this.forEach(function(r){r[t].apply(r,e)})}}(z))}}.apply(e,i),!(void 0!==n&&(t.exports=n))}])});

/* @license
morris.js v0.5.0
Copyright 2014 Olly Smith All rights reserved.
Licensed under the BSD-2-Clause License.
*/
(function(){var a,b,c,d,e=[].slice,f=function(a,b){return function(){return a.apply(b,arguments)}},g={}.hasOwnProperty,h=function(a,b){function c(){this.constructor=a}for(var d in b)g.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},i=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};b=window.Morris={},a=jQuery,b.EventEmitter=function(){function a(){}return a.prototype.on=function(a,b){return null==this.handlers&&(this.handlers={}),null==this.handlers[a]&&(this.handlers[a]=[]),this.handlers[a].push(b),this},a.prototype.fire=function(){var a,b,c,d,f,g,h;if(c=arguments[0],a=2<=arguments.length?e.call(arguments,1):[],null!=this.handlers&&null!=this.handlers[c]){for(g=this.handlers[c],h=[],d=0,f=g.length;f>d;d++)b=g[d],h.push(b.apply(null,a));return h}},a}(),b.commas=function(a){var b,c,d,e;return null!=a?(d=0>a?"-":"",b=Math.abs(a),c=Math.floor(b).toFixed(0),d+=c.replace(/(?=(?:\d{3})+$)(?!^)/g,","),e=b.toString(),e.length>c.length&&(d+=e.slice(c.length)),d):"-"},b.pad2=function(a){return(10>a?"0":"")+a},b.Grid=function(c){function d(b){this.resizeHandler=f(this.resizeHandler,this);var c=this;if(this.el="string"==typeof b.element?a(document.getElementById(b.element)):a(b.element),null==this.el||0===this.el.length)throw new Error("Graph container element not found");"static"===this.el.css("position")&&this.el.css("position","relative"),this.options=a.extend({},this.gridDefaults,this.defaults||{},b),"string"==typeof this.options.units&&(this.options.postUnits=b.units),this.raphael=new Raphael(this.el[0]),this.elementWidth=null,this.elementHeight=null,this.dirty=!1,this.selectFrom=null,this.init&&this.init(),this.setData(this.options.data),this.el.bind("mousemove",function(a){var b,d,e,f,g;return d=c.el.offset(),g=a.pageX-d.left,c.selectFrom?(b=c.data[c.hitTest(Math.min(g,c.selectFrom))]._x,e=c.data[c.hitTest(Math.max(g,c.selectFrom))]._x,f=e-b,c.selectionRect.attr({x:b,width:f})):c.fire("hovermove",g,a.pageY-d.top)}),this.el.bind("mouseleave",function(){return c.selectFrom&&(c.selectionRect.hide(),c.selectFrom=null),c.fire("hoverout")}),this.el.bind("touchstart touchmove touchend",function(a){var b,d;return d=a.originalEvent.touches[0]||a.originalEvent.changedTouches[0],b=c.el.offset(),c.fire("hovermove",d.pageX-b.left,d.pageY-b.top)}),this.el.bind("click",function(a){var b;return b=c.el.offset(),c.fire("gridclick",a.pageX-b.left,a.pageY-b.top)}),this.options.rangeSelect&&(this.selectionRect=this.raphael.rect(0,0,0,this.el.innerHeight()).attr({fill:this.options.rangeSelectColor,stroke:!1}).toBack().hide(),this.el.bind("mousedown",function(a){var b;return b=c.el.offset(),c.startRange(a.pageX-b.left)}),this.el.bind("mouseup",function(a){var b;return b=c.el.offset(),c.endRange(a.pageX-b.left),c.fire("hovermove",a.pageX-b.left,a.pageY-b.top)})),this.options.resize&&a(window).bind("resize",function(){return null!=c.timeoutId&&window.clearTimeout(c.timeoutId),c.timeoutId=window.setTimeout(c.resizeHandler,100)}),this.el.css("-webkit-tap-highlight-color","rgba(0,0,0,0)"),this.postInit&&this.postInit()}return h(d,c),d.prototype.gridDefaults={dateFormat:null,axes:!0,grid:!0,gridLineColor:"#aaa",gridStrokeWidth:.5,gridTextColor:"#888",gridTextSize:12,gridTextFamily:"sans-serif",gridTextWeight:"normal",hideHover:!1,yLabelFormat:null,xLabelAngle:0,numLines:5,padding:25,parseTime:!0,postUnits:"",preUnits:"",ymax:"auto",ymin:"auto 0",goals:[],goalStrokeWidth:1,goalLineColors:["#666633","#999966","#cc6666","#663333"],events:[],eventStrokeWidth:1,eventLineColors:["#005a04","#ccffbb","#3a5f0b","#005502"],rangeSelect:null,rangeSelectColor:"#eef",resize:!1},d.prototype.setData=function(a,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r;return null==c&&(c=!0),this.options.data=a,null==a||0===a.length?(this.data=[],this.raphael.clear(),null!=this.hover&&this.hover.hide(),void 0):(o=this.cumulative?0:null,p=this.cumulative?0:null,this.options.goals.length>0&&(h=Math.min.apply(Math,this.options.goals),g=Math.max.apply(Math,this.options.goals),p=null!=p?Math.min(p,h):h,o=null!=o?Math.max(o,g):g),this.data=function(){var c,d,g;for(g=[],f=c=0,d=a.length;d>c;f=++c)j=a[f],i={src:j},i.label=j[this.options.xkey],this.options.parseTime?(i.x=b.parseDate(i.label),this.options.dateFormat?i.label=this.options.dateFormat(i.x):"number"==typeof i.label&&(i.label=new Date(i.label).toString())):(i.x=f,this.options.xLabelFormat&&(i.label=this.options.xLabelFormat(i))),l=0,i.y=function(){var a,b,c,d;for(c=this.options.ykeys,d=[],e=a=0,b=c.length;b>a;e=++a)n=c[e],q=j[n],"string"==typeof q&&(q=parseFloat(q)),null!=q&&"number"!=typeof q&&(q=null),null!=q&&(this.cumulative?l+=q:null!=o?(o=Math.max(q,o),p=Math.min(q,p)):o=p=q),this.cumulative&&null!=l&&(o=Math.max(l,o),p=Math.min(l,p)),d.push(q);return d}.call(this),g.push(i);return g}.call(this),this.options.parseTime&&(this.data=this.data.sort(function(a,b){return(a.x>b.x)-(b.x>a.x)})),this.xmin=this.data[0].x,this.xmax=this.data[this.data.length-1].x,this.events=[],this.options.events.length>0&&(this.events=this.options.parseTime?function(){var a,c,e,f;for(e=this.options.events,f=[],a=0,c=e.length;c>a;a++)d=e[a],f.push(b.parseDate(d));return f}.call(this):this.options.events,this.xmax=Math.max(this.xmax,Math.max.apply(Math,this.events)),this.xmin=Math.min(this.xmin,Math.min.apply(Math,this.events))),this.xmin===this.xmax&&(this.xmin-=1,this.xmax+=1),this.ymin=this.yboundary("min",p),this.ymax=this.yboundary("max",o),this.ymin===this.ymax&&(p&&(this.ymin-=1),this.ymax+=1),((r=this.options.axes)===!0||"both"===r||"y"===r||this.options.grid===!0)&&(this.options.ymax===this.gridDefaults.ymax&&this.options.ymin===this.gridDefaults.ymin?(this.grid=this.autoGridLines(this.ymin,this.ymax,this.options.numLines),this.ymin=Math.min(this.ymin,this.grid[0]),this.ymax=Math.max(this.ymax,this.grid[this.grid.length-1])):(k=(this.ymax-this.ymin)/(this.options.numLines-1),this.grid=function(){var a,b,c,d;for(d=[],m=a=b=this.ymin,c=this.ymax;k>0?c>=a:a>=c;m=a+=k)d.push(m);return d}.call(this))),this.dirty=!0,c?this.redraw():void 0)},d.prototype.yboundary=function(a,b){var c,d;return c=this.options["y"+a],"string"==typeof c?"auto"===c.slice(0,4)?c.length>5?(d=parseInt(c.slice(5),10),null==b?d:Math[a](b,d)):null!=b?b:0:parseInt(c,10):c},d.prototype.autoGridLines=function(a,b,c){var d,e,f,g,h,i,j,k,l;return h=b-a,l=Math.floor(Math.log(h)/Math.log(10)),j=Math.pow(10,l),e=Math.floor(a/j)*j,d=Math.ceil(b/j)*j,i=(d-e)/(c-1),1===j&&i>1&&Math.ceil(i)!==i&&(i=Math.ceil(i),d=e+i*(c-1)),0>e&&d>0&&(e=Math.floor(a/i)*i,d=Math.ceil(b/i)*i),1>i?(g=Math.floor(Math.log(i)/Math.log(10)),f=function(){var a,b;for(b=[],k=a=e;i>0?d>=a:a>=d;k=a+=i)b.push(parseFloat(k.toFixed(1-g)));return b}()):f=function(){var a,b;for(b=[],k=a=e;i>0?d>=a:a>=d;k=a+=i)b.push(k);return b}(),f},d.prototype._calc=function(){var a,b,c,d,e,f,g,h;return e=this.el.width(),c=this.el.height(),(this.elementWidth!==e||this.elementHeight!==c||this.dirty)&&(this.elementWidth=e,this.elementHeight=c,this.dirty=!1,this.left=this.options.padding,this.right=this.elementWidth-this.options.padding,this.top=this.options.padding,this.bottom=this.elementHeight-this.options.padding,((g=this.options.axes)===!0||"both"===g||"y"===g)&&(f=function(){var a,c,d,e;for(d=this.grid,e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(this.measureText(this.yAxisFormat(b)).width);return e}.call(this),this.left+=Math.max.apply(Math,f)),((h=this.options.axes)===!0||"both"===h||"x"===h)&&(a=function(){var a,b,c;for(c=[],d=a=0,b=this.data.length;b>=0?b>a:a>b;d=b>=0?++a:--a)c.push(this.measureText(this.data[d].text,-this.options.xLabelAngle).height);return c}.call(this),this.bottom-=Math.max.apply(Math,a)),this.width=Math.max(1,this.right-this.left),this.height=Math.max(1,this.bottom-this.top),this.dx=this.width/(this.xmax-this.xmin),this.dy=this.height/(this.ymax-this.ymin),this.calc)?this.calc():void 0},d.prototype.transY=function(a){return this.bottom-(a-this.ymin)*this.dy},d.prototype.transX=function(a){return 1===this.data.length?(this.left+this.right)/2:this.left+(a-this.xmin)*this.dx},d.prototype.redraw=function(){return this.raphael.clear(),this._calc(),this.drawGrid(),this.drawGoals(),this.drawEvents(),this.draw?this.draw():void 0},d.prototype.measureText=function(a,b){var c,d;return null==b&&(b=0),d=this.raphael.text(100,100,a).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).rotate(b),c=d.getBBox(),d.remove(),c},d.prototype.yAxisFormat=function(a){return this.yLabelFormat(a)},d.prototype.yLabelFormat=function(a){return"function"==typeof this.options.yLabelFormat?this.options.yLabelFormat(a):""+this.options.preUnits+b.commas(a)+this.options.postUnits},d.prototype.drawGrid=function(){var a,b,c,d,e,f,g,h;if(this.options.grid!==!1||(e=this.options.axes)===!0||"both"===e||"y"===e){for(f=this.grid,h=[],c=0,d=f.length;d>c;c++)a=f[c],b=this.transY(a),((g=this.options.axes)===!0||"both"===g||"y"===g)&&this.drawYAxisLabel(this.left-this.options.padding/2,b,this.yAxisFormat(a)),this.options.grid?h.push(this.drawGridLine("M"+this.left+","+b+"H"+(this.left+this.width))):h.push(void 0);return h}},d.prototype.drawGoals=function(){var a,b,c,d,e,f,g;for(f=this.options.goals,g=[],c=d=0,e=f.length;e>d;c=++d)b=f[c],a=this.options.goalLineColors[c%this.options.goalLineColors.length],g.push(this.drawGoal(b,a));return g},d.prototype.drawEvents=function(){var a,b,c,d,e,f,g;for(f=this.events,g=[],c=d=0,e=f.length;e>d;c=++d)b=f[c],a=this.options.eventLineColors[c%this.options.eventLineColors.length],g.push(this.drawEvent(b,a));return g},d.prototype.drawGoal=function(a,b){return this.raphael.path("M"+this.left+","+this.transY(a)+"H"+this.right).attr("stroke",b).attr("stroke-width",this.options.goalStrokeWidth)},d.prototype.drawEvent=function(a,b){return this.raphael.path("M"+this.transX(a)+","+this.bottom+"V"+this.top).attr("stroke",b).attr("stroke-width",this.options.eventStrokeWidth)},d.prototype.drawYAxisLabel=function(a,b,c){return this.raphael.text(a,b,c).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).attr("fill",this.options.gridTextColor).attr("text-anchor","end")},d.prototype.drawGridLine=function(a){return this.raphael.path(a).attr("stroke",this.options.gridLineColor).attr("stroke-width",this.options.gridStrokeWidth)},d.prototype.startRange=function(a){return this.hover.hide(),this.selectFrom=a,this.selectionRect.attr({x:a,width:0}).show()},d.prototype.endRange=function(a){var b,c;return this.selectFrom?(c=Math.min(this.selectFrom,a),b=Math.max(this.selectFrom,a),this.options.rangeSelect.call(this.el,{start:this.data[this.hitTest(c)].x,end:this.data[this.hitTest(b)].x}),this.selectFrom=null):void 0},d.prototype.resizeHandler=function(){return this.timeoutId=null,this.raphael.setSize(this.el.width(),this.el.height()),this.redraw()},d}(b.EventEmitter),b.parseDate=function(a){var b,c,d,e,f,g,h,i,j,k,l;return"number"==typeof a?a:(c=a.match(/^(\d+) Q(\d)$/),e=a.match(/^(\d+)-(\d+)$/),f=a.match(/^(\d+)-(\d+)-(\d+)$/),h=a.match(/^(\d+) W(\d+)$/),i=a.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+)(Z|([+-])(\d\d):?(\d\d))?$/),j=a.match(/^(\d+)-(\d+)-(\d+)[ T](\d+):(\d+):(\d+(\.\d+)?)(Z|([+-])(\d\d):?(\d\d))?$/),c?new Date(parseInt(c[1],10),3*parseInt(c[2],10)-1,1).getTime():e?new Date(parseInt(e[1],10),parseInt(e[2],10)-1,1).getTime():f?new Date(parseInt(f[1],10),parseInt(f[2],10)-1,parseInt(f[3],10)).getTime():h?(k=new Date(parseInt(h[1],10),0,1),4!==k.getDay()&&k.setMonth(0,1+(4-k.getDay()+7)%7),k.getTime()+6048e5*parseInt(h[2],10)):i?i[6]?(g=0,"Z"!==i[6]&&(g=60*parseInt(i[8],10)+parseInt(i[9],10),"+"===i[7]&&(g=0-g)),Date.UTC(parseInt(i[1],10),parseInt(i[2],10)-1,parseInt(i[3],10),parseInt(i[4],10),parseInt(i[5],10)+g)):new Date(parseInt(i[1],10),parseInt(i[2],10)-1,parseInt(i[3],10),parseInt(i[4],10),parseInt(i[5],10)).getTime():j?(l=parseFloat(j[6]),b=Math.floor(l),d=Math.round(1e3*(l-b)),j[8]?(g=0,"Z"!==j[8]&&(g=60*parseInt(j[10],10)+parseInt(j[11],10),"+"===j[9]&&(g=0-g)),Date.UTC(parseInt(j[1],10),parseInt(j[2],10)-1,parseInt(j[3],10),parseInt(j[4],10),parseInt(j[5],10)+g,b,d)):new Date(parseInt(j[1],10),parseInt(j[2],10)-1,parseInt(j[3],10),parseInt(j[4],10),parseInt(j[5],10),b,d).getTime()):new Date(parseInt(a,10),0,1).getTime())},b.Hover=function(){function c(c){null==c&&(c={}),this.options=a.extend({},b.Hover.defaults,c),this.el=a("<div class='"+this.options["class"]+"'></div>"),this.el.hide(),this.options.parent.append(this.el)}return c.defaults={"class":"morris-hover morris-default-style"},c.prototype.update=function(a,b,c){return a?(this.html(a),this.show(),this.moveTo(b,c)):this.hide()},c.prototype.html=function(a){return this.el.html(a)},c.prototype.moveTo=function(a,b){var c,d,e,f,g,h;return g=this.options.parent.innerWidth(),f=this.options.parent.innerHeight(),d=this.el.outerWidth(),c=this.el.outerHeight(),e=Math.min(Math.max(0,a-d/2),g-d),null!=b?(h=b-c-10,0>h&&(h=b+10,h+c>f&&(h=f/2-c/2))):h=f/2-c/2,this.el.css({left:e+"px",top:parseInt(h)+"px"})},c.prototype.show=function(){return this.el.show()},c.prototype.hide=function(){return this.el.hide()},c}(),b.Line=function(a){function c(a){return this.hilight=f(this.hilight,this),this.onHoverOut=f(this.onHoverOut,this),this.onHoverMove=f(this.onHoverMove,this),this.onGridClick=f(this.onGridClick,this),this instanceof b.Line?(c.__super__.constructor.call(this,a),void 0):new b.Line(a)}return h(c,a),c.prototype.init=function(){return"always"!==this.options.hideHover?(this.hover=new b.Hover({parent:this.el}),this.on("hovermove",this.onHoverMove),this.on("hoverout",this.onHoverOut),this.on("gridclick",this.onGridClick)):void 0},c.prototype.defaults={lineWidth:3,pointSize:4,lineColors:["#0b62a4","#7A92A3","#4da74d","#afd8f8","#edc240","#cb4b4b","#9440ed"],pointStrokeWidths:[1],pointStrokeColors:["#ffffff"],pointFillColors:[],smooth:!0,xLabels:"auto",xLabelFormat:null,xLabelMargin:24,hideHover:!1},c.prototype.calc=function(){return this.calcPoints(),this.generatePaths()},c.prototype.calcPoints=function(){var a,b,c,d,e,f;for(e=this.data,f=[],c=0,d=e.length;d>c;c++)a=e[c],a._x=this.transX(a.x),a._y=function(){var c,d,e,f;for(e=a.y,f=[],c=0,d=e.length;d>c;c++)b=e[c],null!=b?f.push(this.transY(b)):f.push(b);return f}.call(this),f.push(a._ymax=Math.min.apply(Math,[this.bottom].concat(function(){var c,d,e,f;for(e=a._y,f=[],c=0,d=e.length;d>c;c++)b=e[c],null!=b&&f.push(b);return f}())));return f},c.prototype.hitTest=function(a){var b,c,d,e,f;if(0===this.data.length)return null;for(f=this.data.slice(1),b=d=0,e=f.length;e>d&&(c=f[b],!(a<(c._x+this.data[b]._x)/2));b=++d);return b},c.prototype.onGridClick=function(a,b){var c;return c=this.hitTest(a),this.fire("click",c,this.data[c].src,a,b)},c.prototype.onHoverMove=function(a){var b;return b=this.hitTest(a),this.displayHoverForRow(b)},c.prototype.onHoverOut=function(){return this.options.hideHover!==!1?this.displayHoverForRow(null):void 0},c.prototype.displayHoverForRow=function(a){var b;return null!=a?((b=this.hover).update.apply(b,this.hoverContentForRow(a)),this.hilight(a)):(this.hover.hide(),this.hilight())},c.prototype.hoverContentForRow=function(a){var b,c,d,e,f,g,h;for(d=this.data[a],b="<div class='morris-hover-row-label'>"+d.label+"</div>",h=d.y,c=f=0,g=h.length;g>f;c=++f)e=h[c],b+="<div class='morris-hover-point' style='color: "+this.colorFor(d,c,"label")+"'>\n  "+this.options.labels[c]+":\n  "+this.yLabelFormat(e)+"\n</div>";return"function"==typeof this.options.hoverCallback&&(b=this.options.hoverCallback(a,this.options,b,d.src)),[b,d._x,d._ymax]},c.prototype.generatePaths=function(){var a,c,d,e;return this.paths=function(){var f,g,h,j;for(j=[],c=f=0,g=this.options.ykeys.length;g>=0?g>f:f>g;c=g>=0?++f:--f)e="boolean"==typeof this.options.smooth?this.options.smooth:(h=this.options.ykeys[c],i.call(this.options.smooth,h)>=0),a=function(){var a,b,e,f;for(e=this.data,f=[],a=0,b=e.length;b>a;a++)d=e[a],void 0!==d._y[c]&&f.push({x:d._x,y:d._y[c]});return f}.call(this),a.length>1?j.push(b.Line.createPath(a,e,this.bottom)):j.push(null);return j}.call(this)},c.prototype.draw=function(){var a;return((a=this.options.axes)===!0||"both"===a||"x"===a)&&this.drawXAxis(),this.drawSeries(),this.options.hideHover===!1?this.displayHoverForRow(this.data.length-1):void 0},c.prototype.drawXAxis=function(){var a,c,d,e,f,g,h,i,j,k,l=this;for(h=this.bottom+this.options.padding/2,f=null,e=null,a=function(a,b){var c,d,g,i,j;return c=l.drawXAxisLabel(l.transX(b),h,a),j=c.getBBox(),c.transform("r"+-l.options.xLabelAngle),d=c.getBBox(),c.transform("t0,"+d.height/2+"..."),0!==l.options.xLabelAngle&&(i=-.5*j.width*Math.cos(l.options.xLabelAngle*Math.PI/180),c.transform("t"+i+",0...")),d=c.getBBox(),(null==f||f>=d.x+d.width||null!=e&&e>=d.x)&&d.x>=0&&d.x+d.width<l.el.width()?(0!==l.options.xLabelAngle&&(g=1.25*l.options.gridTextSize/Math.sin(l.options.xLabelAngle*Math.PI/180),e=d.x-g),f=d.x-l.options.xLabelMargin):c.remove()},d=this.options.parseTime?1===this.data.length&&"auto"===this.options.xLabels?[[this.data[0].label,this.data[0].x]]:b.labelSeries(this.xmin,this.xmax,this.width,this.options.xLabels,this.options.xLabelFormat):function(){var a,b,c,d;for(c=this.data,d=[],a=0,b=c.length;b>a;a++)g=c[a],d.push([g.label,g.x]);return d}.call(this),d.reverse(),k=[],i=0,j=d.length;j>i;i++)c=d[i],k.push(a(c[0],c[1]));return k},c.prototype.drawSeries=function(){var a,b,c,d,e,f;for(this.seriesPoints=[],a=b=d=this.options.ykeys.length-1;0>=d?0>=b:b>=0;a=0>=d?++b:--b)this._drawLineFor(a);for(f=[],a=c=e=this.options.ykeys.length-1;0>=e?0>=c:c>=0;a=0>=e?++c:--c)f.push(this._drawPointFor(a));return f},c.prototype._drawPointFor=function(a){var b,c,d,e,f,g;for(this.seriesPoints[a]=[],f=this.data,g=[],d=0,e=f.length;e>d;d++)c=f[d],b=null,null!=c._y[a]&&(b=this.drawLinePoint(c._x,c._y[a],this.colorFor(c,a,"point"),a)),g.push(this.seriesPoints[a].push(b));return g},c.prototype._drawLineFor=function(a){var b;return b=this.paths[a],null!==b?this.drawLinePath(b,this.colorFor(null,a,"line"),a):void 0},c.createPath=function(a,c,d){var e,f,g,h,i,j,k,l,m,n,o,p,q,r;for(k="",c&&(g=b.Line.gradients(a)),l={y:null},h=q=0,r=a.length;r>q;h=++q)e=a[h],null!=e.y&&(null!=l.y?c?(f=g[h],j=g[h-1],i=(e.x-l.x)/4,m=l.x+i,o=Math.min(d,l.y+i*j),n=e.x-i,p=Math.min(d,e.y-i*f),k+="C"+m+","+o+","+n+","+p+","+e.x+","+e.y):k+="L"+e.x+","+e.y:c&&null==g[h]||(k+="M"+e.x+","+e.y)),l=e;return k},c.gradients=function(a){var b,c,d,e,f,g,h,i;for(c=function(a,b){return(a.y-b.y)/(a.x-b.x)},i=[],d=g=0,h=a.length;h>g;d=++g)b=a[d],null!=b.y?(e=a[d+1]||{y:null},f=a[d-1]||{y:null},null!=f.y&&null!=e.y?i.push(c(f,e)):null!=f.y?i.push(c(f,b)):null!=e.y?i.push(c(b,e)):i.push(null)):i.push(null);return i},c.prototype.hilight=function(a){var b,c,d,e,f;if(null!==this.prevHilight&&this.prevHilight!==a)for(b=c=0,e=this.seriesPoints.length-1;e>=0?e>=c:c>=e;b=e>=0?++c:--c)this.seriesPoints[b][this.prevHilight]&&this.seriesPoints[b][this.prevHilight].animate(this.pointShrinkSeries(b));if(null!==a&&this.prevHilight!==a)for(b=d=0,f=this.seriesPoints.length-1;f>=0?f>=d:d>=f;b=f>=0?++d:--d)this.seriesPoints[b][a]&&this.seriesPoints[b][a].animate(this.pointGrowSeries(b));return this.prevHilight=a},c.prototype.colorFor=function(a,b,c){return"function"==typeof this.options.lineColors?this.options.lineColors.call(this,a,b,c):"point"===c?this.options.pointFillColors[b%this.options.pointFillColors.length]||this.options.lineColors[b%this.options.lineColors.length]:this.options.lineColors[b%this.options.lineColors.length]},c.prototype.drawXAxisLabel=function(a,b,c){return this.raphael.text(a,b,c).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).attr("fill",this.options.gridTextColor)},c.prototype.drawLinePath=function(a,b,c){return this.raphael.path(a).attr("stroke",b).attr("stroke-width",this.lineWidthForSeries(c))},c.prototype.drawLinePoint=function(a,b,c,d){return this.raphael.circle(a,b,this.pointSizeForSeries(d)).attr("fill",c).attr("stroke-width",this.pointStrokeWidthForSeries(d)).attr("stroke",this.pointStrokeColorForSeries(d))},c.prototype.pointStrokeWidthForSeries=function(a){return this.options.pointStrokeWidths[a%this.options.pointStrokeWidths.length]},c.prototype.pointStrokeColorForSeries=function(a){return this.options.pointStrokeColors[a%this.options.pointStrokeColors.length]},c.prototype.lineWidthForSeries=function(a){return this.options.lineWidth instanceof Array?this.options.lineWidth[a%this.options.lineWidth.length]:this.options.lineWidth},c.prototype.pointSizeForSeries=function(a){return this.options.pointSize instanceof Array?this.options.pointSize[a%this.options.pointSize.length]:this.options.pointSize},c.prototype.pointGrowSeries=function(a){return Raphael.animation({r:this.pointSizeForSeries(a)+3},25,"linear")},c.prototype.pointShrinkSeries=function(a){return Raphael.animation({r:this.pointSizeForSeries(a)},25,"linear")},c}(b.Grid),b.labelSeries=function(c,d,e,f,g){var h,i,j,k,l,m,n,o,p,q,r;if(j=200*(d-c)/e,i=new Date(c),n=b.LABEL_SPECS[f],void 0===n)for(r=b.AUTO_LABEL_ORDER,p=0,q=r.length;q>p;p++)if(k=r[p],m=b.LABEL_SPECS[k],j>=m.span){n=m;break}for(void 0===n&&(n=b.LABEL_SPECS.second),g&&(n=a.extend({},n,{fmt:g})),h=n.start(i),l=[];(o=h.getTime())<=d;)o>=c&&l.push([n.fmt(h),o]),n.incr(h);return l},c=function(a){return{span:60*a*1e3,start:function(a){return new Date(a.getFullYear(),a.getMonth(),a.getDate(),a.getHours())},fmt:function(a){return""+b.pad2(a.getHours())+":"+b.pad2(a.getMinutes())},incr:function(b){return b.setUTCMinutes(b.getUTCMinutes()+a)}}},d=function(a){return{span:1e3*a,start:function(a){return new Date(a.getFullYear(),a.getMonth(),a.getDate(),a.getHours(),a.getMinutes())},fmt:function(a){return""+b.pad2(a.getHours())+":"+b.pad2(a.getMinutes())+":"+b.pad2(a.getSeconds())},incr:function(b){return b.setUTCSeconds(b.getUTCSeconds()+a)}}},b.LABEL_SPECS={decade:{span:1728e8,start:function(a){return new Date(a.getFullYear()-a.getFullYear()%10,0,1)},fmt:function(a){return""+a.getFullYear()},incr:function(a){return a.setFullYear(a.getFullYear()+10)}},year:{span:1728e7,start:function(a){return new Date(a.getFullYear(),0,1)},fmt:function(a){return""+a.getFullYear()},incr:function(a){return a.setFullYear(a.getFullYear()+1)}},month:{span:24192e5,start:function(a){return new Date(a.getFullYear(),a.getMonth(),1)},fmt:function(a){return""+a.getFullYear()+"-"+b.pad2(a.getMonth()+1)},incr:function(a){return a.setMonth(a.getMonth()+1)}},week:{span:6048e5,start:function(a){return new Date(a.getFullYear(),a.getMonth(),a.getDate())},fmt:function(a){return""+a.getFullYear()+"-"+b.pad2(a.getMonth()+1)+"-"+b.pad2(a.getDate())},incr:function(a){return a.setDate(a.getDate()+7)}},day:{span:864e5,start:function(a){return new Date(a.getFullYear(),a.getMonth(),a.getDate())},fmt:function(a){return""+a.getFullYear()+"-"+b.pad2(a.getMonth()+1)+"-"+b.pad2(a.getDate())},incr:function(a){return a.setDate(a.getDate()+1)}},hour:c(60),"30min":c(30),"15min":c(15),"10min":c(10),"5min":c(5),minute:c(1),"30sec":d(30),"15sec":d(15),"10sec":d(10),"5sec":d(5),second:d(1)},b.AUTO_LABEL_ORDER=["decade","year","month","week","day","hour","30min","15min","10min","5min","minute","30sec","15sec","10sec","5sec","second"],b.Area=function(c){function d(c){var f;return this instanceof b.Area?(f=a.extend({},e,c),this.cumulative=!f.behaveLikeLine,"auto"===f.fillOpacity&&(f.fillOpacity=f.behaveLikeLine?.8:1),d.__super__.constructor.call(this,f),void 0):new b.Area(c)}var e;return h(d,c),e={fillOpacity:"auto",behaveLikeLine:!1},d.prototype.calcPoints=function(){var a,b,c,d,e,f,g;for(f=this.data,g=[],d=0,e=f.length;e>d;d++)a=f[d],a._x=this.transX(a.x),b=0,a._y=function(){var d,e,f,g;for(f=a.y,g=[],d=0,e=f.length;e>d;d++)c=f[d],this.options.behaveLikeLine?g.push(this.transY(c)):(b+=c||0,g.push(this.transY(b)));return g}.call(this),g.push(a._ymax=Math.max.apply(Math,a._y));return g},d.prototype.drawSeries=function(){var a,b,c,d,e,f,g,h;for(this.seriesPoints=[],b=this.options.behaveLikeLine?function(){f=[];for(var a=0,b=this.options.ykeys.length-1;b>=0?b>=a:a>=b;b>=0?a++:a--)f.push(a);return f}.apply(this):function(){g=[];for(var a=e=this.options.ykeys.length-1;0>=e?0>=a:a>=0;0>=e?a++:a--)g.push(a);return g}.apply(this),h=[],c=0,d=b.length;d>c;c++)a=b[c],this._drawFillFor(a),this._drawLineFor(a),h.push(this._drawPointFor(a));return h},d.prototype._drawFillFor=function(a){var b;return b=this.paths[a],null!==b?(b+="L"+this.transX(this.xmax)+","+this.bottom+"L"+this.transX(this.xmin)+","+this.bottom+"Z",this.drawFilledPath(b,this.fillForSeries(a))):void 0},d.prototype.fillForSeries=function(a){var b;return b=Raphael.rgb2hsl(this.colorFor(this.data[a],a,"line")),Raphael.hsl(b.h,this.options.behaveLikeLine?.9*b.s:.75*b.s,Math.min(.98,this.options.behaveLikeLine?1.2*b.l:1.25*b.l))},d.prototype.drawFilledPath=function(a,b){return this.raphael.path(a).attr("fill",b).attr("fill-opacity",this.options.fillOpacity).attr("stroke","none")},d}(b.Line),b.Bar=function(c){function d(c){return this.onHoverOut=f(this.onHoverOut,this),this.onHoverMove=f(this.onHoverMove,this),this.onGridClick=f(this.onGridClick,this),this instanceof b.Bar?(d.__super__.constructor.call(this,a.extend({},c,{parseTime:!1})),void 0):new b.Bar(c)}return h(d,c),d.prototype.init=function(){return this.cumulative=this.options.stacked,"always"!==this.options.hideHover?(this.hover=new b.Hover({parent:this.el}),this.on("hovermove",this.onHoverMove),this.on("hoverout",this.onHoverOut),this.on("gridclick",this.onGridClick)):void 0},d.prototype.defaults={barSizeRatio:.75,barGap:3,barColors:["#0b62a4","#7a92a3","#4da74d","#afd8f8","#edc240","#cb4b4b","#9440ed"],barOpacity:1,barRadius:[0,0,0,0],xLabelMargin:50},d.prototype.calc=function(){var a;return this.calcBars(),this.options.hideHover===!1?(a=this.hover).update.apply(a,this.hoverContentForRow(this.data.length-1)):void 0},d.prototype.calcBars=function(){var a,b,c,d,e,f,g;for(f=this.data,g=[],a=d=0,e=f.length;e>d;a=++d)b=f[a],b._x=this.left+this.width*(a+.5)/this.data.length,g.push(b._y=function(){var a,d,e,f;for(e=b.y,f=[],a=0,d=e.length;d>a;a++)c=e[a],null!=c?f.push(this.transY(c)):f.push(null);return f}.call(this));return g},d.prototype.draw=function(){var a;return((a=this.options.axes)===!0||"both"===a||"x"===a)&&this.drawXAxis(),this.drawSeries()},d.prototype.drawXAxis=function(){var a,b,c,d,e,f,g,h,i,j,k,l,m;for(j=this.bottom+(this.options.xAxisLabelTopPadding||this.options.padding/2),g=null,f=null,m=[],a=k=0,l=this.data.length;l>=0?l>k:k>l;a=l>=0?++k:--k)h=this.data[this.data.length-1-a],b=this.drawXAxisLabel(h._x,j,h.label),i=b.getBBox(),b.transform("r"+-this.options.xLabelAngle),c=b.getBBox(),b.transform("t0,"+c.height/2+"..."),0!==this.options.xLabelAngle&&(e=-.5*i.width*Math.cos(this.options.xLabelAngle*Math.PI/180),b.transform("t"+e+",0...")),(null==g||g>=c.x+c.width||null!=f&&f>=c.x)&&c.x>=0&&c.x+c.width<this.el.width()?(0!==this.options.xLabelAngle&&(d=1.25*this.options.gridTextSize/Math.sin(this.options.xLabelAngle*Math.PI/180),f=c.x-d),m.push(g=c.x-this.options.xLabelMargin)):m.push(b.remove());return m},d.prototype.drawSeries=function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o;return c=this.width/this.options.data.length,h=this.options.stacked?1:this.options.ykeys.length,a=(c*this.options.barSizeRatio-this.options.barGap*(h-1))/h,this.options.barSize&&(a=Math.min(a,this.options.barSize)),l=c-a*h-this.options.barGap*(h-1),g=l/2,o=this.ymin<=0&&this.ymax>=0?this.transY(0):null,this.bars=function(){var h,l,p,q;for(p=this.data,q=[],d=h=0,l=p.length;l>h;d=++h)i=p[d],e=0,q.push(function(){var h,l,p,q;for(p=i._y,q=[],j=h=0,l=p.length;l>h;j=++h)n=p[j],null!==n?(o?(m=Math.min(n,o),b=Math.max(n,o)):(m=n,b=this.bottom),f=this.left+d*c+g,this.options.stacked||(f+=j*(a+this.options.barGap)),k=b-m,this.options.verticalGridCondition&&this.options.verticalGridCondition(i.x)&&this.drawBar(this.left+d*c,this.top,c,Math.abs(this.top-this.bottom),this.options.verticalGridColor,this.options.verticalGridOpacity,this.options.barRadius),this.options.stacked&&(m-=e),this.drawBar(f,m,a,k,this.colorFor(i,j,"bar"),this.options.barOpacity,this.options.barRadius),q.push(e+=k)):q.push(null);return q}.call(this));return q}.call(this)},d.prototype.colorFor=function(a,b,c){var d,e;return"function"==typeof this.options.barColors?(d={x:a.x,y:a.y[b],label:a.label},e={index:b,key:this.options.ykeys[b],label:this.options.labels[b]},this.options.barColors.call(this,d,e,c)):this.options.barColors[b%this.options.barColors.length]},d.prototype.hitTest=function(a){return 0===this.data.length?null:(a=Math.max(Math.min(a,this.right),this.left),Math.min(this.data.length-1,Math.floor((a-this.left)/(this.width/this.data.length))))},d.prototype.onGridClick=function(a,b){var c;return c=this.hitTest(a),this.fire("click",c,this.data[c].src,a,b)},d.prototype.onHoverMove=function(a){var b,c;return b=this.hitTest(a),(c=this.hover).update.apply(c,this.hoverContentForRow(b))},d.prototype.onHoverOut=function(){return this.options.hideHover!==!1?this.hover.hide():void 0},d.prototype.hoverContentForRow=function(a){var b,c,d,e,f,g,h,i;for(d=this.data[a],b="<div class='morris-hover-row-label'>"+d.label+"</div>",i=d.y,c=g=0,h=i.length;h>g;c=++g)f=i[c],b+="<div class='morris-hover-point' style='color: "+this.colorFor(d,c,"label")+"'>\n  "+this.options.labels[c]+":\n  "+this.yLabelFormat(f)+"\n</div>";return"function"==typeof this.options.hoverCallback&&(b=this.options.hoverCallback(a,this.options,b,d.src)),e=this.left+(a+.5)*this.width/this.data.length,[b,e]},d.prototype.drawXAxisLabel=function(a,b,c){var d;return d=this.raphael.text(a,b,c).attr("font-size",this.options.gridTextSize).attr("font-family",this.options.gridTextFamily).attr("font-weight",this.options.gridTextWeight).attr("fill",this.options.gridTextColor)},d.prototype.drawBar=function(a,b,c,d,e,f,g){var h,i;return h=Math.max.apply(Math,g),i=0===h||h>d?this.raphael.rect(a,b,c,d):this.raphael.path(this.roundedRect(a,b,c,d,g)),i.attr("fill",e).attr("fill-opacity",f).attr("stroke","none")},d.prototype.roundedRect=function(a,b,c,d,e){return null==e&&(e=[0,0,0,0]),["M",a,e[0]+b,"Q",a,b,a+e[0],b,"L",a+c-e[1],b,"Q",a+c,b,a+c,b+e[1],"L",a+c,b+d-e[2],"Q",a+c,b+d,a+c-e[2],b+d,"L",a+e[3],b+d,"Q",a,b+d,a,b+d-e[3],"Z"]},d}(b.Grid),b.Donut=function(c){function d(c){this.resizeHandler=f(this.resizeHandler,this),this.select=f(this.select,this),this.click=f(this.click,this);var d=this;if(!(this instanceof b.Donut))return new b.Donut(c);if(this.options=a.extend({},this.defaults,c),this.el="string"==typeof c.element?a(document.getElementById(c.element)):a(c.element),null===this.el||0===this.el.length)throw new Error("Graph placeholder not found.");void 0!==c.data&&0!==c.data.length&&(this.raphael=new Raphael(this.el[0]),this.options.resize&&a(window).bind("resize",function(){return null!=d.timeoutId&&window.clearTimeout(d.timeoutId),d.timeoutId=window.setTimeout(d.resizeHandler,100)}),this.setData(c.data))}return h(d,c),d.prototype.defaults={colors:["#0B62A4","#3980B5","#679DC6","#95BBD7","#B0CCE1","#095791","#095085","#083E67","#052C48","#042135"],backgroundColor:"#FFFFFF",labelColor:"#000000",formatter:b.commas,resize:!1},d.prototype.redraw=function(){var a,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x;for(this.raphael.clear(),c=this.el.width()/2,d=this.el.height()/2,n=(Math.min(c,d)-10)/3,l=0,u=this.values,o=0,r=u.length;r>o;o++)m=u[o],l+=m;for(i=5/(2*n),a=1.9999*Math.PI-i*this.data.length,g=0,f=0,this.segments=[],v=this.values,e=p=0,s=v.length;s>p;e=++p)m=v[e],j=g+i+a*(m/l),k=new b.DonutSegment(c,d,2*n,n,g,j,this.data[e].color||this.options.colors[f%this.options.colors.length],this.options.backgroundColor,f,this.raphael),k.render(),this.segments.push(k),k.on("hover",this.select),k.on("click",this.click),g=j,f+=1;for(this.text1=this.drawEmptyDonutLabel(c,d-10,this.options.labelColor,15,800),this.text2=this.drawEmptyDonutLabel(c,d+10,this.options.labelColor,14),h=Math.max.apply(Math,this.values),f=0,w=this.values,x=[],q=0,t=w.length;t>q;q++){if(m=w[q],m===h){this.select(f);
break}x.push(f+=1)}return x},d.prototype.setData=function(a){var b;return this.data=a,this.values=function(){var a,c,d,e;for(d=this.data,e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(parseFloat(b.value));return e}.call(this),this.redraw()},d.prototype.click=function(a){return this.fire("click",a,this.data[a])},d.prototype.select=function(a){var b,c,d,e,f,g;for(g=this.segments,e=0,f=g.length;f>e;e++)c=g[e],c.deselect();return d=this.segments[a],d.select(),b=this.data[a],this.setLabels(b.label,this.options.formatter(b.value,b))},d.prototype.setLabels=function(a,b){var c,d,e,f,g,h,i,j;return c=2*(Math.min(this.el.width()/2,this.el.height()/2)-10)/3,f=1.8*c,e=c/2,d=c/3,this.text1.attr({text:a,transform:""}),g=this.text1.getBBox(),h=Math.min(f/g.width,e/g.height),this.text1.attr({transform:"S"+h+","+h+","+(g.x+g.width/2)+","+(g.y+g.height)}),this.text2.attr({text:b,transform:""}),i=this.text2.getBBox(),j=Math.min(f/i.width,d/i.height),this.text2.attr({transform:"S"+j+","+j+","+(i.x+i.width/2)+","+i.y})},d.prototype.drawEmptyDonutLabel=function(a,b,c,d,e){var f;return f=this.raphael.text(a,b,"").attr("font-size",d).attr("fill",c),null!=e&&f.attr("font-weight",e),f},d.prototype.resizeHandler=function(){return this.timeoutId=null,this.raphael.setSize(this.el.width(),this.el.height()),this.redraw()},d}(b.EventEmitter),b.DonutSegment=function(a){function b(a,b,c,d,e,g,h,i,j,k){this.cx=a,this.cy=b,this.inner=c,this.outer=d,this.color=h,this.backgroundColor=i,this.index=j,this.raphael=k,this.deselect=f(this.deselect,this),this.select=f(this.select,this),this.sin_p0=Math.sin(e),this.cos_p0=Math.cos(e),this.sin_p1=Math.sin(g),this.cos_p1=Math.cos(g),this.is_long=g-e>Math.PI?1:0,this.path=this.calcSegment(this.inner+3,this.inner+this.outer-5),this.selectedPath=this.calcSegment(this.inner+3,this.inner+this.outer),this.hilight=this.calcArc(this.inner)}return h(b,a),b.prototype.calcArcPoints=function(a){return[this.cx+a*this.sin_p0,this.cy+a*this.cos_p0,this.cx+a*this.sin_p1,this.cy+a*this.cos_p1]},b.prototype.calcSegment=function(a,b){var c,d,e,f,g,h,i,j,k,l;return k=this.calcArcPoints(a),c=k[0],e=k[1],d=k[2],f=k[3],l=this.calcArcPoints(b),g=l[0],i=l[1],h=l[2],j=l[3],"M"+c+","+e+("A"+a+","+a+",0,"+this.is_long+",0,"+d+","+f)+("L"+h+","+j)+("A"+b+","+b+",0,"+this.is_long+",1,"+g+","+i)+"Z"},b.prototype.calcArc=function(a){var b,c,d,e,f;return f=this.calcArcPoints(a),b=f[0],d=f[1],c=f[2],e=f[3],"M"+b+","+d+("A"+a+","+a+",0,"+this.is_long+",0,"+c+","+e)},b.prototype.render=function(){var a=this;return this.arc=this.drawDonutArc(this.hilight,this.color),this.seg=this.drawDonutSegment(this.path,this.color,this.backgroundColor,function(){return a.fire("hover",a.index)},function(){return a.fire("click",a.index)})},b.prototype.drawDonutArc=function(a,b){return this.raphael.path(a).attr({stroke:b,"stroke-width":2,opacity:0})},b.prototype.drawDonutSegment=function(a,b,c,d,e){return this.raphael.path(a).attr({fill:b,stroke:c,"stroke-width":3}).hover(d).click(e)},b.prototype.select=function(){return this.selected?void 0:(this.seg.animate({path:this.selectedPath},150,"<>"),this.arc.animate({opacity:1},150,"<>"),this.selected=!0)},b.prototype.deselect=function(){return this.selected?(this.seg.animate({path:this.path},150,"<>"),this.arc.animate({opacity:0},150,"<>"),this.selected=!1):void 0},b}(b.EventEmitter)}).call(this);
$(function () {
    "use strict";
    //This is for the Notification top right
    Morris.Area({
        element: 'morris-area-chart'
        , data: [{
                period: '2010'
                , iphone: 50
                , ipad: 80
                , itouch: 20
        }, {
                period: '2011'
                , iphone: 130
                , ipad: 100
                , itouch: 80
        }, {
                period: '2012'
                , iphone: 80
                , ipad: 60
                , itouch: 70
        }, {
                period: '2013'
                , iphone: 70
                , ipad: 200
                , itouch: 140
        }, {
                period: '2014'
                , iphone: 180
                , ipad: 150
                , itouch: 140
        }, {
                period: '2015'
                , iphone: 105
                , ipad: 100
                , itouch: 80
        }
            , {
                period: '2016'
                , iphone: 250
                , ipad: 150
                , itouch: 200
        }]
        , xkey: 'period'
        , ykeys: ['iphone', 'ipad', 'itouch']
        , labels: ['iPhone', 'iPad', 'iPod Touch']
        , pointSize: 3
        , fillOpacity: 0
        , pointStrokeColors: ['#00bfc7', '#fb9678', '#9675ce']
        , behaveLikeLine: true
        , gridLineColor: '#e0e0e0'
        , lineWidth: 3
        , hideHover: 'auto'
        , lineColors: ['#00bfc7', '#fb9678', '#9675ce']
        , resize: true
    });
    Morris.Area({
        element: 'morris-area-chart2'
        , data: [{
                period: '2010'
                , SiteA: 0
                , SiteB: 0
        , }, {
                period: '2011'
                , SiteA: 130
                , SiteB: 100
        , }, {
                period: '2012'
                , SiteA: 80
                , SiteB: 60
        , }, {
                period: '2013'
                , SiteA: 70
                , SiteB: 200
        , }, {
                period: '2014'
                , SiteA: 180
                , SiteB: 150
        , }, {
                period: '2015'
                , SiteA: 105
                , SiteB: 90
        , }
            , {
                period: '2016'
                , SiteA: 250
                , SiteB: 150
        , }]
        , xkey: 'period'
        , ykeys: ['SiteA', 'SiteB']
        , labels: ['Site A', 'Site B']
        , pointSize: 0
        , fillOpacity: 0.4
        , pointStrokeColors: ['#b4becb', '#01c0c8']
        , behaveLikeLine: true
        , gridLineColor: '#e0e0e0'
        , lineWidth: 0
        , smooth: false
        , hideHover: 'auto'
        , lineColors: ['#b4becb', '#01c0c8']
        , resize: true
    });
});    
    // sparkline
    var sparklineLogin = function() { 
        $('#sales1').sparkline([20, 40, 30], {
            type: 'pie',
            height: '90',
            resize: true,
            sliceColors: ['#01c0c8', '#7d5ab6', '#ffffff']
        });
        $('#sparkline2dash').sparkline([6, 10, 9, 11, 9, 10, 12], {
            type: 'bar',
            height: '154',
            barWidth: '4',
            resize: true,
            barSpacing: '10',
            barColor: '#25a6f7'
        });
        
    };    
    var sparkResize;
 
        $(window).resize(function(e) {
            clearTimeout(sparkResize);
            sparkResize = setTimeout(sparklineLogin, 500);
        });
        sparklineLogin();

/*!
 * sweetalert2 v7.11.0
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Sweetalert2 = factory());
}(this, (function () { 'use strict';

var styles = "body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch; }\n  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-actions {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    -ms-flex-item-align: stretch;\n        align-self: stretch;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    height: 2.2em; }\n  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-loading {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-input {\n    height: 2em;\n    margin: .3125em auto;\n    font-size: 1em; }\n  body.swal2-toast-shown.swal2-has-input > .swal2-container > .swal2-toast .swal2-validationerror {\n    font-size: 1em; }\n\nbody.swal2-toast-shown > .swal2-container {\n  position: fixed;\n  background-color: transparent; }\n  body.swal2-toast-shown > .swal2-container.swal2-shown {\n    background-color: transparent; }\n  body.swal2-toast-shown > .swal2-container.swal2-top {\n    top: 0;\n    right: auto;\n    bottom: auto;\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-top-end, body.swal2-toast-shown > .swal2-container.swal2-top-right {\n    top: 0;\n    right: 0;\n    bottom: auto;\n    left: auto; }\n  body.swal2-toast-shown > .swal2-container.swal2-top-start, body.swal2-toast-shown > .swal2-container.swal2-top-left {\n    top: 0;\n    right: auto;\n    bottom: auto;\n    left: 0; }\n  body.swal2-toast-shown > .swal2-container.swal2-center-start, body.swal2-toast-shown > .swal2-container.swal2-center-left {\n    top: 50%;\n    right: auto;\n    bottom: auto;\n    left: 0;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-center {\n    top: 50%;\n    right: auto;\n    bottom: auto;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-center-end, body.swal2-toast-shown > .swal2-container.swal2-center-right {\n    top: 50%;\n    right: 0;\n    bottom: auto;\n    left: auto;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-bottom-start, body.swal2-toast-shown > .swal2-container.swal2-bottom-left {\n    top: auto;\n    right: auto;\n    bottom: 0;\n    left: 0; }\n  body.swal2-toast-shown > .swal2-container.swal2-bottom {\n    top: auto;\n    right: auto;\n    bottom: 0;\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n  body.swal2-toast-shown > .swal2-container.swal2-bottom-end, body.swal2-toast-shown > .swal2-container.swal2-bottom-right {\n    top: auto;\n    right: 0;\n    bottom: 0;\n    left: auto; }\n\n.swal2-popup.swal2-toast {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  width: auto;\n  padding: 0.625em;\n  -webkit-box-shadow: 0 0 10px #d9d9d9;\n          box-shadow: 0 0 10px #d9d9d9;\n  overflow-y: hidden; }\n  .swal2-popup.swal2-toast .swal2-header {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row; }\n  .swal2-popup.swal2-toast .swal2-title {\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    margin: 0 .6em;\n    font-size: 1em; }\n  .swal2-popup.swal2-toast .swal2-close {\n    position: initial; }\n  .swal2-popup.swal2-toast .swal2-content {\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n    font-size: 1em; }\n  .swal2-popup.swal2-toast .swal2-icon {\n    width: 32px;\n    min-width: 32px;\n    height: 32px;\n    margin: 0; }\n    .swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring {\n      width: 32px;\n      height: 32px; }\n    .swal2-popup.swal2-toast .swal2-icon.swal2-info, .swal2-popup.swal2-toast .swal2-icon.swal2-warning, .swal2-popup.swal2-toast .swal2-icon.swal2-question {\n      font-size: 26px;\n      line-height: 32px; }\n    .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {\n      top: 14px;\n      width: 22px; }\n      .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='left'] {\n        left: 5px; }\n      .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='right'] {\n        right: 5px; }\n  .swal2-popup.swal2-toast .swal2-actions {\n    height: auto;\n    margin: 0 .3125em; }\n  .swal2-popup.swal2-toast .swal2-styled {\n    margin: 0 .3125em;\n    padding: .3125em .625em;\n    font-size: 1em; }\n    .swal2-popup.swal2-toast .swal2-styled:focus {\n      -webkit-box-shadow: 0 0 0 1px #fff, 0 0 0 2px rgba(50, 100, 150, 0.4);\n              box-shadow: 0 0 0 1px #fff, 0 0 0 2px rgba(50, 100, 150, 0.4); }\n  .swal2-popup.swal2-toast .swal2-success {\n    border-color: #a5dc86; }\n    .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'] {\n      position: absolute;\n      width: 32px;\n      height: 45px;\n      -webkit-transform: rotate(45deg);\n              transform: rotate(45deg);\n      border-radius: 50%; }\n      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'][class$='left'] {\n        top: -4px;\n        left: -15px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg);\n        -webkit-transform-origin: 32px 32px;\n                transform-origin: 32px 32px;\n        border-radius: 64px 0 0 64px; }\n      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-circular-line'][class$='right'] {\n        top: -4px;\n        left: 15px;\n        -webkit-transform-origin: 0 32px;\n                transform-origin: 0 32px;\n        border-radius: 0 64px 64px 0; }\n    .swal2-popup.swal2-toast .swal2-success .swal2-success-ring {\n      width: 32px;\n      height: 32px; }\n    .swal2-popup.swal2-toast .swal2-success .swal2-success-fix {\n      top: 0;\n      left: 7px;\n      width: 7px;\n      height: 43px; }\n    .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'] {\n      height: 5px; }\n      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'][class$='tip'] {\n        top: 18px;\n        left: 3px;\n        width: 12px; }\n      .swal2-popup.swal2-toast .swal2-success [class^='swal2-success-line'][class$='long'] {\n        top: 15px;\n        right: 3px;\n        width: 22px; }\n  .swal2-popup.swal2-toast.swal2-show {\n    -webkit-animation: showSweetToast .5s;\n            animation: showSweetToast .5s; }\n  .swal2-popup.swal2-toast.swal2-hide {\n    -webkit-animation: hideSweetToast .2s forwards;\n            animation: hideSweetToast .2s forwards; }\n  .swal2-popup.swal2-toast .swal2-animate-success-line-tip {\n    -webkit-animation: animate-toast-success-tip .75s;\n            animation: animate-toast-success-tip .75s; }\n  .swal2-popup.swal2-toast .swal2-animate-success-line-long {\n    -webkit-animation: animate-toast-success-long .75s;\n            animation: animate-toast-success-long .75s; }\n\n@-webkit-keyframes showSweetToast {\n  0% {\n    -webkit-transform: translateY(-10px) rotateZ(2deg);\n            transform: translateY(-10px) rotateZ(2deg);\n    opacity: 0; }\n  33% {\n    -webkit-transform: translateY(0) rotateZ(-2deg);\n            transform: translateY(0) rotateZ(-2deg);\n    opacity: .5; }\n  66% {\n    -webkit-transform: translateY(5px) rotateZ(2deg);\n            transform: translateY(5px) rotateZ(2deg);\n    opacity: .7; }\n  100% {\n    -webkit-transform: translateY(0) rotateZ(0);\n            transform: translateY(0) rotateZ(0);\n    opacity: 1; } }\n\n@keyframes showSweetToast {\n  0% {\n    -webkit-transform: translateY(-10px) rotateZ(2deg);\n            transform: translateY(-10px) rotateZ(2deg);\n    opacity: 0; }\n  33% {\n    -webkit-transform: translateY(0) rotateZ(-2deg);\n            transform: translateY(0) rotateZ(-2deg);\n    opacity: .5; }\n  66% {\n    -webkit-transform: translateY(5px) rotateZ(2deg);\n            transform: translateY(5px) rotateZ(2deg);\n    opacity: .7; }\n  100% {\n    -webkit-transform: translateY(0) rotateZ(0);\n            transform: translateY(0) rotateZ(0);\n    opacity: 1; } }\n\n@-webkit-keyframes hideSweetToast {\n  0% {\n    opacity: 1; }\n  33% {\n    opacity: .5; }\n  100% {\n    -webkit-transform: rotateZ(1deg);\n            transform: rotateZ(1deg);\n    opacity: 0; } }\n\n@keyframes hideSweetToast {\n  0% {\n    opacity: 1; }\n  33% {\n    opacity: .5; }\n  100% {\n    -webkit-transform: rotateZ(1deg);\n            transform: rotateZ(1deg);\n    opacity: 0; } }\n\n@-webkit-keyframes animate-toast-success-tip {\n  0% {\n    top: 9px;\n    left: 1px;\n    width: 0; }\n  54% {\n    top: 2px;\n    left: 2px;\n    width: 0; }\n  70% {\n    top: 10px;\n    left: -4px;\n    width: 26px; }\n  84% {\n    top: 17px;\n    left: 12px;\n    width: 8px; }\n  100% {\n    top: 18px;\n    left: 3px;\n    width: 12px; } }\n\n@keyframes animate-toast-success-tip {\n  0% {\n    top: 9px;\n    left: 1px;\n    width: 0; }\n  54% {\n    top: 2px;\n    left: 2px;\n    width: 0; }\n  70% {\n    top: 10px;\n    left: -4px;\n    width: 26px; }\n  84% {\n    top: 17px;\n    left: 12px;\n    width: 8px; }\n  100% {\n    top: 18px;\n    left: 3px;\n    width: 12px; } }\n\n@-webkit-keyframes animate-toast-success-long {\n  0% {\n    top: 26px;\n    right: 22px;\n    width: 0; }\n  65% {\n    top: 20px;\n    right: 15px;\n    width: 0; }\n  84% {\n    top: 15px;\n    right: 0;\n    width: 18px; }\n  100% {\n    top: 15px;\n    right: 3px;\n    width: 22px; } }\n\n@keyframes animate-toast-success-long {\n  0% {\n    top: 26px;\n    right: 22px;\n    width: 0; }\n  65% {\n    top: 20px;\n    right: 15px;\n    width: 0; }\n  84% {\n    top: 15px;\n    right: 0;\n    width: 18px; }\n  100% {\n    top: 15px;\n    right: 3px;\n    width: 22px; } }\n\nhtml.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown),\nbody.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) {\n  height: auto;\n  overflow-y: hidden; }\n\nbody.swal2-iosfix {\n  position: fixed;\n  right: 0;\n  left: 0; }\n\nbody.swal2-no-backdrop .swal2-shown {\n  top: auto;\n  right: auto;\n  bottom: auto;\n  left: auto;\n  background-color: transparent; }\n  body.swal2-no-backdrop .swal2-shown > .swal2-modal {\n    -webkit-box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);\n            box-shadow: 0 0 10px rgba(0, 0, 0, 0.4); }\n  body.swal2-no-backdrop .swal2-shown.swal2-top {\n    top: 0;\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-top-start, body.swal2-no-backdrop .swal2-shown.swal2-top-left {\n    top: 0;\n    left: 0; }\n  body.swal2-no-backdrop .swal2-shown.swal2-top-end, body.swal2-no-backdrop .swal2-shown.swal2-top-right {\n    top: 0;\n    right: 0; }\n  body.swal2-no-backdrop .swal2-shown.swal2-center {\n    top: 50%;\n    left: 50%;\n    -webkit-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-center-start, body.swal2-no-backdrop .swal2-shown.swal2-center-left {\n    top: 50%;\n    left: 0;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-center-end, body.swal2-no-backdrop .swal2-shown.swal2-center-right {\n    top: 50%;\n    right: 0;\n    -webkit-transform: translateY(-50%);\n            transform: translateY(-50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-bottom {\n    bottom: 0;\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n            transform: translateX(-50%); }\n  body.swal2-no-backdrop .swal2-shown.swal2-bottom-start, body.swal2-no-backdrop .swal2-shown.swal2-bottom-left {\n    bottom: 0;\n    left: 0; }\n  body.swal2-no-backdrop .swal2-shown.swal2-bottom-end, body.swal2-no-backdrop .swal2-shown.swal2-bottom-right {\n    right: 0;\n    bottom: 0; }\n\n.swal2-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 10px;\n  background-color: transparent;\n  z-index: 1060;\n  overflow-x: hidden; }\n  .swal2-container.swal2-top {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start; }\n  .swal2-container.swal2-top-start, .swal2-container.swal2-top-left {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start; }\n  .swal2-container.swal2-top-end, .swal2-container.swal2-top-right {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n  .swal2-container.swal2-center {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n  .swal2-container.swal2-center-start, .swal2-container.swal2-center-left {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start; }\n  .swal2-container.swal2-center-end, .swal2-container.swal2-center-right {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n  .swal2-container.swal2-bottom {\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end; }\n  .swal2-container.swal2-bottom-start, .swal2-container.swal2-bottom-left {\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end;\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start; }\n  .swal2-container.swal2-bottom-end, .swal2-container.swal2-bottom-right {\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end;\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end; }\n  .swal2-container.swal2-grow-fullscreen > .swal2-modal {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    -ms-flex-item-align: stretch;\n        align-self: stretch;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n  .swal2-container.swal2-grow-row > .swal2-modal {\n    display: -webkit-box !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    -ms-flex-line-pack: center;\n        align-content: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n  .swal2-container.swal2-grow-column {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n    .swal2-container.swal2-grow-column.swal2-top, .swal2-container.swal2-grow-column.swal2-center, .swal2-container.swal2-grow-column.swal2-bottom {\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n    .swal2-container.swal2-grow-column.swal2-top-start, .swal2-container.swal2-grow-column.swal2-center-start, .swal2-container.swal2-grow-column.swal2-bottom-start, .swal2-container.swal2-grow-column.swal2-top-left, .swal2-container.swal2-grow-column.swal2-center-left, .swal2-container.swal2-grow-column.swal2-bottom-left {\n      -webkit-box-align: start;\n          -ms-flex-align: start;\n              align-items: flex-start; }\n    .swal2-container.swal2-grow-column.swal2-top-end, .swal2-container.swal2-grow-column.swal2-center-end, .swal2-container.swal2-grow-column.swal2-bottom-end, .swal2-container.swal2-grow-column.swal2-top-right, .swal2-container.swal2-grow-column.swal2-center-right, .swal2-container.swal2-grow-column.swal2-bottom-right {\n      -webkit-box-align: end;\n          -ms-flex-align: end;\n              align-items: flex-end; }\n    .swal2-container.swal2-grow-column > .swal2-modal {\n      display: -webkit-box !important;\n      display: -ms-flexbox !important;\n      display: flex !important;\n      -webkit-box-flex: 1;\n          -ms-flex: 1;\n              flex: 1;\n      -ms-flex-line-pack: center;\n          align-content: center;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center; }\n  .swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right) > .swal2-modal {\n    margin: auto; }\n  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n    .swal2-container .swal2-modal {\n      margin: 0 !important; } }\n  .swal2-container.swal2-fade {\n    -webkit-transition: background-color .1s;\n    transition: background-color .1s; }\n  .swal2-container.swal2-shown {\n    background-color: rgba(0, 0, 0, 0.4); }\n\n.swal2-popup {\n  display: none;\n  position: relative;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  width: 32em;\n  max-width: 100%;\n  padding: 1.25em;\n  border-radius: .3125em;\n  background-color: #fff;\n  font-family: inherit;\n  font-size: 1rem;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  overflow-x: hidden;\n  overflow-y: auto; }\n  .swal2-popup:focus {\n    outline: none; }\n  .swal2-popup.swal2-loading {\n    overflow-y: hidden; }\n  .swal2-popup .swal2-header {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n  .swal2-popup .swal2-title {\n    display: block;\n    position: relative;\n    margin: 0 0 .4em;\n    padding: 0;\n    color: #595959;\n    font-size: 1.875em;\n    font-weight: 600;\n    text-align: center;\n    text-transform: none;\n    word-wrap: break-word; }\n  .swal2-popup .swal2-actions {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    margin-top: 1.25em; }\n    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled[disabled] {\n      opacity: .4; }\n    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:hover {\n      background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.1)), to(rgba(0, 0, 0, 0.1)));\n      background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)); }\n    .swal2-popup .swal2-actions:not(.swal2-loading) .swal2-styled:active {\n      background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.2)), to(rgba(0, 0, 0, 0.2)));\n      background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)); }\n    .swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-confirm {\n      width: 2.5em;\n      height: 2.5em;\n      margin: .46875em;\n      padding: 0;\n      border: .25em solid transparent;\n      border-radius: 100%;\n      border-color: transparent;\n      background-color: transparent !important;\n      color: transparent;\n      cursor: default;\n      -webkit-box-sizing: border-box;\n              box-sizing: border-box;\n      -webkit-animation: rotate-loading 1.5s linear 0s infinite normal;\n              animation: rotate-loading 1.5s linear 0s infinite normal;\n      -webkit-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none; }\n    .swal2-popup .swal2-actions.swal2-loading .swal2-styled.swal2-cancel {\n      margin-right: 30px;\n      margin-left: 30px; }\n    .swal2-popup .swal2-actions.swal2-loading :not(.swal2-styled).swal2-confirm::after {\n      display: inline-block;\n      width: 15px;\n      height: 15px;\n      margin-left: 5px;\n      border: 3px solid #999999;\n      border-radius: 50%;\n      border-right-color: transparent;\n      -webkit-box-shadow: 1px 1px 1px #fff;\n              box-shadow: 1px 1px 1px #fff;\n      content: '';\n      -webkit-animation: rotate-loading 1.5s linear 0s infinite normal;\n              animation: rotate-loading 1.5s linear 0s infinite normal; }\n  .swal2-popup .swal2-styled {\n    margin: 0 .3125em;\n    padding: .625em 2em;\n    border: 0;\n    border-radius: .25em;\n    color: #fff;\n    font-size: 1.0625em;\n    font-weight: 500;\n    -webkit-box-shadow: none;\n            box-shadow: none; }\n    .swal2-popup .swal2-styled:not([disabled]) {\n      cursor: pointer; }\n    .swal2-popup .swal2-styled.swal2-confirm {\n      background-color: #3085d6; }\n    .swal2-popup .swal2-styled.swal2-cancel {\n      background-color: #aaa; }\n    .swal2-popup .swal2-styled:focus {\n      outline: none;\n      -webkit-box-shadow: 0 0 0 2px #fff, 0 0 0 4px rgba(50, 100, 150, 0.4);\n              box-shadow: 0 0 0 2px #fff, 0 0 0 4px rgba(50, 100, 150, 0.4); }\n    .swal2-popup .swal2-styled::-moz-focus-inner {\n      border: 0; }\n  .swal2-popup .swal2-footer {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    margin-top: 1.25em;\n    padding-top: 1em;\n    border-top: 1px solid #eee;\n    font-size: 1em; }\n  .swal2-popup .swal2-image {\n    max-width: 100%;\n    margin: 1.25em auto; }\n  .swal2-popup .swal2-close {\n    position: absolute;\n    top: 5px;\n    right: 8px;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    width: 1.2em;\n    min-width: 1.2em;\n    height: 1.2em;\n    margin: 0;\n    padding: 0;\n    -webkit-transition: color .1s ease;\n    transition: color .1s ease;\n    border: 0;\n    background: transparent;\n    color: #cccccc;\n    font-family: serif;\n    font-size: calc(2.5em - 0.25em);\n    line-height: 1.2em;\n    cursor: pointer; }\n    .swal2-popup .swal2-close:hover {\n      color: #d55; }\n  .swal2-popup > .swal2-input,\n  .swal2-popup > .swal2-file,\n  .swal2-popup > .swal2-textarea,\n  .swal2-popup > .swal2-select,\n  .swal2-popup > .swal2-radio,\n  .swal2-popup > .swal2-checkbox {\n    display: none; }\n  .swal2-popup .swal2-content {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    margin: 0;\n    padding: 0;\n    color: #545454;\n    font-size: 1.125em;\n    font-weight: 300;\n    line-height: normal;\n    word-wrap: break-word; }\n  .swal2-popup #swal2-content {\n    text-align: center; }\n  .swal2-popup .swal2-input,\n  .swal2-popup .swal2-file,\n  .swal2-popup .swal2-textarea,\n  .swal2-popup .swal2-select,\n  .swal2-popup .swal2-radio,\n  .swal2-popup .swal2-checkbox {\n    margin: 1em auto; }\n  .swal2-popup .swal2-input,\n  .swal2-popup .swal2-file,\n  .swal2-popup .swal2-textarea {\n    width: 100%;\n    -webkit-transition: border-color .3s, -webkit-box-shadow .3s;\n    transition: border-color .3s, -webkit-box-shadow .3s;\n    transition: border-color .3s, box-shadow .3s;\n    transition: border-color .3s, box-shadow .3s, -webkit-box-shadow .3s;\n    border: 1px solid #d9d9d9;\n    border-radius: 3px;\n    font-size: 1.125em;\n    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06);\n            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.06);\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box; }\n    .swal2-popup .swal2-input.swal2-inputerror,\n    .swal2-popup .swal2-file.swal2-inputerror,\n    .swal2-popup .swal2-textarea.swal2-inputerror {\n      border-color: #f27474 !important;\n      -webkit-box-shadow: 0 0 2px #f27474 !important;\n              box-shadow: 0 0 2px #f27474 !important; }\n    .swal2-popup .swal2-input:focus,\n    .swal2-popup .swal2-file:focus,\n    .swal2-popup .swal2-textarea:focus {\n      border: 1px solid #b4dbed;\n      outline: none;\n      -webkit-box-shadow: 0 0 3px #c4e6f5;\n              box-shadow: 0 0 3px #c4e6f5; }\n    .swal2-popup .swal2-input::-webkit-input-placeholder,\n    .swal2-popup .swal2-file::-webkit-input-placeholder,\n    .swal2-popup .swal2-textarea::-webkit-input-placeholder {\n      color: #cccccc; }\n    .swal2-popup .swal2-input:-ms-input-placeholder,\n    .swal2-popup .swal2-file:-ms-input-placeholder,\n    .swal2-popup .swal2-textarea:-ms-input-placeholder {\n      color: #cccccc; }\n    .swal2-popup .swal2-input::-ms-input-placeholder,\n    .swal2-popup .swal2-file::-ms-input-placeholder,\n    .swal2-popup .swal2-textarea::-ms-input-placeholder {\n      color: #cccccc; }\n    .swal2-popup .swal2-input::placeholder,\n    .swal2-popup .swal2-file::placeholder,\n    .swal2-popup .swal2-textarea::placeholder {\n      color: #cccccc; }\n  .swal2-popup .swal2-range input {\n    width: 80%; }\n  .swal2-popup .swal2-range output {\n    width: 20%;\n    font-weight: 600;\n    text-align: center; }\n  .swal2-popup .swal2-range input,\n  .swal2-popup .swal2-range output {\n    height: 2.625em;\n    margin: 1em auto;\n    padding: 0;\n    font-size: 1.125em;\n    line-height: 2.625em; }\n  .swal2-popup .swal2-input {\n    height: 2.625em;\n    padding: 0 .75em; }\n    .swal2-popup .swal2-input[type='number'] {\n      max-width: 10em; }\n  .swal2-popup .swal2-file {\n    font-size: 1.125em; }\n  .swal2-popup .swal2-textarea {\n    height: 6.75em;\n    padding: .75em; }\n  .swal2-popup .swal2-select {\n    min-width: 50%;\n    max-width: 100%;\n    padding: .375em .625em;\n    color: #545454;\n    font-size: 1.125em; }\n  .swal2-popup .swal2-radio,\n  .swal2-popup .swal2-checkbox {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; }\n    .swal2-popup .swal2-radio label,\n    .swal2-popup .swal2-checkbox label {\n      margin: 0 .6em;\n      font-size: 1.125em; }\n    .swal2-popup .swal2-radio input,\n    .swal2-popup .swal2-checkbox input {\n      margin: 0 .4em; }\n  .swal2-popup .swal2-validationerror {\n    display: none;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    padding: .625em;\n    background-color: #f0f0f0;\n    color: gray;\n    font-size: 1em;\n    font-weight: 300;\n    overflow: hidden; }\n    .swal2-popup .swal2-validationerror::before {\n      display: inline-block;\n      width: 1.5em;\n      height: 1.5em;\n      margin: 0 .625em;\n      border-radius: 50%;\n      background-color: #ea7d7d;\n      color: #fff;\n      font-weight: 600;\n      line-height: 1.5em;\n      text-align: center;\n      content: '!'; }\n\n@supports (-ms-accelerator: true) {\n  .swal2-range input {\n    width: 100% !important; }\n  .swal2-range output {\n    display: none; } }\n\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  .swal2-range input {\n    width: 100% !important; }\n  .swal2-range output {\n    display: none; } }\n\n.swal2-icon {\n  position: relative;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  width: 80px;\n  height: 80px;\n  margin: 1.25em auto 1.875em;\n  border: 4px solid transparent;\n  border-radius: 50%;\n  line-height: 80px;\n  cursor: default;\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none; }\n  .swal2-icon.swal2-error {\n    border-color: #f27474; }\n    .swal2-icon.swal2-error .swal2-x-mark {\n      position: relative;\n      -webkit-box-flex: 1;\n          -ms-flex-positive: 1;\n              flex-grow: 1; }\n    .swal2-icon.swal2-error [class^='swal2-x-mark-line'] {\n      display: block;\n      position: absolute;\n      top: 37px;\n      width: 47px;\n      height: 5px;\n      border-radius: 2px;\n      background-color: #f27474; }\n      .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='left'] {\n        left: 17px;\n        -webkit-transform: rotate(45deg);\n                transform: rotate(45deg); }\n      .swal2-icon.swal2-error [class^='swal2-x-mark-line'][class$='right'] {\n        right: 16px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg); }\n  .swal2-icon.swal2-warning, .swal2-icon.swal2-info, .swal2-icon.swal2-question {\n    margin: .333333em auto .5em;\n    font-family: inherit;\n    font-size: 3.75em; }\n  .swal2-icon.swal2-warning {\n    border-color: #facea8;\n    color: #f8bb86; }\n  .swal2-icon.swal2-info {\n    border-color: #9de0f6;\n    color: #3fc3ee; }\n  .swal2-icon.swal2-question {\n    border-color: #c9dae1;\n    color: #87adbd; }\n  .swal2-icon.swal2-success {\n    border-color: #a5dc86; }\n    .swal2-icon.swal2-success [class^='swal2-success-circular-line'] {\n      position: absolute;\n      width: 60px;\n      height: 120px;\n      -webkit-transform: rotate(45deg);\n              transform: rotate(45deg);\n      border-radius: 50%; }\n      .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='left'] {\n        top: -7px;\n        left: -33px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg);\n        -webkit-transform-origin: 60px 60px;\n                transform-origin: 60px 60px;\n        border-radius: 120px 0 0 120px; }\n      .swal2-icon.swal2-success [class^='swal2-success-circular-line'][class$='right'] {\n        top: -11px;\n        left: 30px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg);\n        -webkit-transform-origin: 0 60px;\n                transform-origin: 0 60px;\n        border-radius: 0 120px 120px 0; }\n    .swal2-icon.swal2-success .swal2-success-ring {\n      position: absolute;\n      top: -4px;\n      left: -4px;\n      width: 80px;\n      height: 80px;\n      border: 4px solid rgba(165, 220, 134, 0.2);\n      border-radius: 50%;\n      z-index: 2;\n      -webkit-box-sizing: content-box;\n              box-sizing: content-box; }\n    .swal2-icon.swal2-success .swal2-success-fix {\n      position: absolute;\n      top: 8px;\n      left: 26px;\n      width: 7px;\n      height: 90px;\n      -webkit-transform: rotate(-45deg);\n              transform: rotate(-45deg);\n      z-index: 1; }\n    .swal2-icon.swal2-success [class^='swal2-success-line'] {\n      display: block;\n      position: absolute;\n      height: 5px;\n      border-radius: 2px;\n      background-color: #a5dc86;\n      z-index: 2; }\n      .swal2-icon.swal2-success [class^='swal2-success-line'][class$='tip'] {\n        top: 46px;\n        left: 14px;\n        width: 25px;\n        -webkit-transform: rotate(45deg);\n                transform: rotate(45deg); }\n      .swal2-icon.swal2-success [class^='swal2-success-line'][class$='long'] {\n        top: 38px;\n        right: 8px;\n        width: 47px;\n        -webkit-transform: rotate(-45deg);\n                transform: rotate(-45deg); }\n\n.swal2-progresssteps {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  margin: 0 0 1.25em;\n  padding: 0;\n  font-weight: 600; }\n  .swal2-progresssteps li {\n    display: inline-block;\n    position: relative; }\n  .swal2-progresssteps .swal2-progresscircle {\n    width: 2em;\n    height: 2em;\n    border-radius: 2em;\n    background: #3085d6;\n    color: #fff;\n    line-height: 2em;\n    text-align: center;\n    z-index: 20; }\n    .swal2-progresssteps .swal2-progresscircle:first-child {\n      margin-left: 0; }\n    .swal2-progresssteps .swal2-progresscircle:last-child {\n      margin-right: 0; }\n    .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep {\n      background: #3085d6; }\n      .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep ~ .swal2-progresscircle {\n        background: #add8e6; }\n      .swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep ~ .swal2-progressline {\n        background: #add8e6; }\n  .swal2-progresssteps .swal2-progressline {\n    width: 2.5em;\n    height: .4em;\n    margin: 0 -1px;\n    background: #3085d6;\n    z-index: 10; }\n\n[class^='swal2'] {\n  -webkit-tap-highlight-color: transparent; }\n\n@-webkit-keyframes showSweetAlert {\n  0% {\n    -webkit-transform: scale(0.7);\n            transform: scale(0.7); }\n  45% {\n    -webkit-transform: scale(1.05);\n            transform: scale(1.05); }\n  80% {\n    -webkit-transform: scale(0.95);\n            transform: scale(0.95); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n@keyframes showSweetAlert {\n  0% {\n    -webkit-transform: scale(0.7);\n            transform: scale(0.7); }\n  45% {\n    -webkit-transform: scale(1.05);\n            transform: scale(1.05); }\n  80% {\n    -webkit-transform: scale(0.95);\n            transform: scale(0.95); }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1); } }\n\n@-webkit-keyframes hideSweetAlert {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; }\n  100% {\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    opacity: 0; } }\n\n@keyframes hideSweetAlert {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; }\n  100% {\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n    opacity: 0; } }\n\n.swal2-show {\n  -webkit-animation: showSweetAlert .3s;\n          animation: showSweetAlert .3s; }\n  .swal2-show.swal2-noanimation {\n    -webkit-animation: none;\n            animation: none; }\n\n.swal2-hide {\n  -webkit-animation: hideSweetAlert .15s forwards;\n          animation: hideSweetAlert .15s forwards; }\n  .swal2-hide.swal2-noanimation {\n    -webkit-animation: none;\n            animation: none; }\n\n[dir='rtl'] .swal2-close {\n  right: auto;\n  left: 8px; }\n\n@-webkit-keyframes animate-success-tip {\n  0% {\n    top: 19px;\n    left: 1px;\n    width: 0; }\n  54% {\n    top: 17px;\n    left: 2px;\n    width: 0; }\n  70% {\n    top: 35px;\n    left: -6px;\n    width: 50px; }\n  84% {\n    top: 48px;\n    left: 21px;\n    width: 17px; }\n  100% {\n    top: 45px;\n    left: 14px;\n    width: 25px; } }\n\n@keyframes animate-success-tip {\n  0% {\n    top: 19px;\n    left: 1px;\n    width: 0; }\n  54% {\n    top: 17px;\n    left: 2px;\n    width: 0; }\n  70% {\n    top: 35px;\n    left: -6px;\n    width: 50px; }\n  84% {\n    top: 48px;\n    left: 21px;\n    width: 17px; }\n  100% {\n    top: 45px;\n    left: 14px;\n    width: 25px; } }\n\n@-webkit-keyframes animate-success-long {\n  0% {\n    top: 54px;\n    right: 46px;\n    width: 0; }\n  65% {\n    top: 54px;\n    right: 46px;\n    width: 0; }\n  84% {\n    top: 35px;\n    right: 0;\n    width: 55px; }\n  100% {\n    top: 38px;\n    right: 8px;\n    width: 47px; } }\n\n@keyframes animate-success-long {\n  0% {\n    top: 54px;\n    right: 46px;\n    width: 0; }\n  65% {\n    top: 54px;\n    right: 46px;\n    width: 0; }\n  84% {\n    top: 35px;\n    right: 0;\n    width: 55px; }\n  100% {\n    top: 38px;\n    right: 8px;\n    width: 47px; } }\n\n@-webkit-keyframes rotatePlaceholder {\n  0% {\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg); }\n  5% {\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg); }\n  12% {\n    -webkit-transform: rotate(-405deg);\n            transform: rotate(-405deg); }\n  100% {\n    -webkit-transform: rotate(-405deg);\n            transform: rotate(-405deg); } }\n\n@keyframes rotatePlaceholder {\n  0% {\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg); }\n  5% {\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg); }\n  12% {\n    -webkit-transform: rotate(-405deg);\n            transform: rotate(-405deg); }\n  100% {\n    -webkit-transform: rotate(-405deg);\n            transform: rotate(-405deg); } }\n\n.swal2-animate-success-line-tip {\n  -webkit-animation: animate-success-tip .75s;\n          animation: animate-success-tip .75s; }\n\n.swal2-animate-success-line-long {\n  -webkit-animation: animate-success-long .75s;\n          animation: animate-success-long .75s; }\n\n.swal2-success.swal2-animate-success-icon .swal2-success-circular-line-right {\n  -webkit-animation: rotatePlaceholder 4.25s ease-in;\n          animation: rotatePlaceholder 4.25s ease-in; }\n\n@-webkit-keyframes animate-error-icon {\n  0% {\n    -webkit-transform: rotateX(100deg);\n            transform: rotateX(100deg);\n    opacity: 0; }\n  100% {\n    -webkit-transform: rotateX(0deg);\n            transform: rotateX(0deg);\n    opacity: 1; } }\n\n@keyframes animate-error-icon {\n  0% {\n    -webkit-transform: rotateX(100deg);\n            transform: rotateX(100deg);\n    opacity: 0; }\n  100% {\n    -webkit-transform: rotateX(0deg);\n            transform: rotateX(0deg);\n    opacity: 1; } }\n\n.swal2-animate-error-icon {\n  -webkit-animation: animate-error-icon .5s;\n          animation: animate-error-icon .5s; }\n\n@-webkit-keyframes animate-x-mark {\n  0% {\n    margin-top: 26px;\n    -webkit-transform: scale(0.4);\n            transform: scale(0.4);\n    opacity: 0; }\n  50% {\n    margin-top: 26px;\n    -webkit-transform: scale(0.4);\n            transform: scale(0.4);\n    opacity: 0; }\n  80% {\n    margin-top: -6px;\n    -webkit-transform: scale(1.15);\n            transform: scale(1.15); }\n  100% {\n    margin-top: 0;\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; } }\n\n@keyframes animate-x-mark {\n  0% {\n    margin-top: 26px;\n    -webkit-transform: scale(0.4);\n            transform: scale(0.4);\n    opacity: 0; }\n  50% {\n    margin-top: 26px;\n    -webkit-transform: scale(0.4);\n            transform: scale(0.4);\n    opacity: 0; }\n  80% {\n    margin-top: -6px;\n    -webkit-transform: scale(1.15);\n            transform: scale(1.15); }\n  100% {\n    margin-top: 0;\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; } }\n\n.swal2-animate-x-mark {\n  -webkit-animation: animate-x-mark .5s;\n          animation: animate-x-mark .5s; }\n\n@-webkit-keyframes rotate-loading {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes rotate-loading {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n";

var defaultParams = {
  title: '',
  titleText: '',
  text: '',
  html: '',
  footer: '',
  type: null,
  toast: false,
  customClass: '',
  target: 'body',
  backdrop: true,
  animation: true,
  allowOutsideClick: true,
  allowEscapeKey: true,
  allowEnterKey: true,
  showConfirmButton: true,
  showCancelButton: false,
  preConfirm: null,
  confirmButtonText: 'OK',
  confirmButtonAriaLabel: '',
  confirmButtonColor: null,
  confirmButtonClass: null,
  cancelButtonText: 'Cancel',
  cancelButtonAriaLabel: '',
  cancelButtonColor: null,
  cancelButtonClass: null,
  buttonsStyling: true,
  reverseButtons: false,
  focusConfirm: true,
  focusCancel: false,
  showCloseButton: false,
  closeButtonAriaLabel: 'Close this dialog',
  showLoaderOnConfirm: false,
  imageUrl: null,
  imageWidth: null,
  imageHeight: null,
  imageAlt: '',
  imageClass: null,
  timer: null,
  width: null,
  padding: null,
  background: null,
  input: null,
  inputPlaceholder: '',
  inputValue: '',
  inputOptions: {},
  inputAutoTrim: true,
  inputClass: null,
  inputAttributes: {},
  inputValidator: null,
  grow: false,
  position: 'center',
  progressSteps: [],
  currentProgressStep: null,
  progressStepsDistance: null,
  onBeforeOpen: null,
  onOpen: null,
  onClose: null,
  useRejections: false,
  expectRejections: false
};

var deprecatedParams = ['useRejections', 'expectRejections'];

var swalPrefix = 'swal2-';

var prefix = function prefix(items) {
  var result = {};
  for (var i in items) {
    result[items[i]] = swalPrefix + items[i];
  }
  return result;
};

var swalClasses = prefix(['container', 'shown', 'iosfix', 'popup', 'modal', 'no-backdrop', 'toast', 'toast-shown', 'fade', 'show', 'hide', 'noanimation', 'close', 'title', 'header', 'content', 'actions', 'confirm', 'cancel', 'footer', 'icon', 'image', 'input', 'has-input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea', 'inputerror', 'validationerror', 'progresssteps', 'activeprogressstep', 'progresscircle', 'progressline', 'loading', 'styled', 'top', 'top-start', 'top-end', 'top-left', 'top-right', 'center', 'center-start', 'center-end', 'center-left', 'center-right', 'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right', 'grow-row', 'grow-column', 'grow-fullscreen']);

var iconTypes = prefix(['success', 'warning', 'info', 'question', 'error']);

var consolePrefix = 'SweetAlert2:';

/**
 * Filter the unique values into a new array
 * @param arr
 */
var uniqueArray = function uniqueArray(arr) {
  var result = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var elem = _step.value;

      if (result.indexOf(elem) === -1) {
        result.push(elem);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
};

/**
 * Convert object into iterable Map
 * https://stackoverflow.com/a/36644532/1331425
 * @param obj
 */
var objectToMap = function objectToMap(obj) {
  if (obj instanceof Map) {
    return obj;
  }
  var map = new Map();
  Object.keys(obj).forEach(function (key) {
    map.set(key, obj[key]);
  });
  return map;
};

/**
 * Standardise console warnings
 * @param message
 */
var warn = function warn(message) {
  console.warn(consolePrefix + ' ' + message);
};

/**
 * Standardise console errors
 * @param message
 */
var error = function error(message) {
  console.error(consolePrefix + ' ' + message);
};

/**
 * Private global state for `warnOnce`
 * @type {Array}
 * @private
 */
var previousWarnOnceMessages = [];

/**
 * Show a console warning, but only if it hasn't already been shown
 * @param message
 */
var warnOnce = function warnOnce(message) {
  if (!(previousWarnOnceMessages.indexOf(message) !== -1)) {
    previousWarnOnceMessages.push(message);
    warn(message);
  }
};

/**
 * If `arg` is a function, call it (with no arguments or context) and return the result.
 * Otherwise, just pass the value through
 * @param arg
 */
var callIfFunction = function callIfFunction(arg) {
  return typeof arg === 'function' ? arg() : arg;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





















var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};





















var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var popupParams = _extends({}, defaultParams);
var queue = [];

var previousWindowKeyDown = void 0;
var windowOnkeydownOverridden = void 0;

/**
 * Show relevant warnings for given params
 *
 * @param params
 */
var showWarningsForParams = function showWarningsForParams(params) {
  for (var param in params) {
    if (!sweetAlert.isValidParameter(param)) {
      warn('Unknown parameter "' + param + '"');
    }
    if (sweetAlert.isDeprecatedParameter(param)) {
      warnOnce('The parameter "' + param + '" is deprecated and will be removed in the next major release.');
    }
  }
};

/**
 * Set type, text and actions on popup
 *
 * @param params
 * @returns {boolean}
 */
var setParameters = function setParameters(params) {
  // Determine if the custom target element is valid
  if (!params.target || typeof params.target === 'string' && !document.querySelector(params.target) || typeof params.target !== 'string' && !params.target.appendChild) {
    warn('Target parameter is not valid, defaulting to "body"');
    params.target = 'body';
  }

  var popup = void 0;
  var oldPopup = getPopup();
  var targetElement = typeof params.target === 'string' ? document.querySelector(params.target) : params.target;
  // If the model target has changed, refresh the popup
  if (oldPopup && targetElement && oldPopup.parentNode !== targetElement.parentNode) {
    popup = init(params);
  } else {
    popup = oldPopup || init(params);
  }

  // Set popup width
  if (params.width) {
    popup.style.width = typeof params.width === 'number' ? params.width + 'px' : params.width;
  }

  // Set popup padding
  if (params.padding) {
    popup.style.padding = typeof params.padding === 'number' ? params.padding + 'px' : params.padding;
  }

  // Set popup background
  if (params.background) {
    popup.style.background = params.background;
  }
  var popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color');
  var successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');
  for (var i = 0; i < successIconParts.length; i++) {
    successIconParts[i].style.backgroundColor = popupBackgroundColor;
  }

  var container = getContainer();
  var title = getTitle();
  var content = getContent().querySelector('#' + swalClasses.content);
  var actions = getActions();
  var confirmButton = getConfirmButton();
  var cancelButton = getCancelButton();
  var closeButton = getCloseButton();
  var footer = getFooter();

  // Title
  if (params.titleText) {
    title.innerText = params.titleText;
  } else if (params.title) {
    title.innerHTML = params.title.split('\n').join('<br />');
  }

  if (typeof params.backdrop === 'string') {
    getContainer().style.background = params.backdrop;
  } else if (!params.backdrop) {
    addClass([document.documentElement, document.body], swalClasses['no-backdrop']);
  }

  // Content as HTML
  if (params.html) {
    parseHtmlToContainer(params.html, content);

    // Content as plain text
  } else if (params.text) {
    content.textContent = params.text;
    show(content);
  } else {
    hide(content);
  }

  // Position
  if (params.position in swalClasses) {
    addClass(container, swalClasses[params.position]);
  } else {
    warn('The "position" parameter is not valid, defaulting to "center"');
    addClass(container, swalClasses.center);
  }

  // Grow
  if (params.grow && typeof params.grow === 'string') {
    var growClass = 'grow-' + params.grow;
    if (growClass in swalClasses) {
      addClass(container, swalClasses[growClass]);
    }
  }

  // Close button
  if (params.showCloseButton) {
    closeButton.setAttribute('aria-label', params.closeButtonAriaLabel);
    show(closeButton);
  } else {
    hide(closeButton);
  }

  // Default Class
  popup.className = swalClasses.popup;
  if (params.toast) {
    addClass([document.documentElement, document.body], swalClasses['toast-shown']);
    addClass(popup, swalClasses.toast);
  } else {
    addClass(popup, swalClasses.modal);
  }

  // Custom Class
  if (params.customClass) {
    addClass(popup, params.customClass);
  }

  // Progress steps
  var progressStepsContainer = getProgressSteps();
  var currentProgressStep = parseInt(params.currentProgressStep === null ? sweetAlert.getQueueStep() : params.currentProgressStep, 10);
  if (params.progressSteps && params.progressSteps.length) {
    show(progressStepsContainer);
    empty(progressStepsContainer);
    if (currentProgressStep >= params.progressSteps.length) {
      warn('Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
    }
    params.progressSteps.forEach(function (step, index) {
      var circle = document.createElement('li');
      addClass(circle, swalClasses.progresscircle);
      circle.innerHTML = step;
      if (index === currentProgressStep) {
        addClass(circle, swalClasses.activeprogressstep);
      }
      progressStepsContainer.appendChild(circle);
      if (index !== params.progressSteps.length - 1) {
        var line = document.createElement('li');
        addClass(line, swalClasses.progressline);
        if (params.progressStepsDistance) {
          line.style.width = params.progressStepsDistance;
        }
        progressStepsContainer.appendChild(line);
      }
    });
  } else {
    hide(progressStepsContainer);
  }

  // Icon
  var icons = getIcons();
  for (var _i = 0; _i < icons.length; _i++) {
    hide(icons[_i]);
  }
  if (params.type) {
    var validType = false;
    for (var iconType in iconTypes) {
      if (params.type === iconType) {
        validType = true;
        break;
      }
    }
    if (!validType) {
      error('Unknown alert type: ' + params.type);
      return false;
    }
    var icon = popup.querySelector('.' + swalClasses.icon + '.' + iconTypes[params.type]);
    show(icon);

    // Animate icon
    if (params.animation) {
      switch (params.type) {
        case 'success':
          addClass(icon, 'swal2-animate-success-icon');
          addClass(icon.querySelector('.swal2-success-line-tip'), 'swal2-animate-success-line-tip');
          addClass(icon.querySelector('.swal2-success-line-long'), 'swal2-animate-success-line-long');
          break;
        case 'error':
          addClass(icon, 'swal2-animate-error-icon');
          addClass(icon.querySelector('.swal2-x-mark'), 'swal2-animate-x-mark');
          break;
        default:
          break;
      }
    }
  }

  // Custom image
  var image = getImage();
  if (params.imageUrl) {
    image.setAttribute('src', params.imageUrl);
    image.setAttribute('alt', params.imageAlt);
    show(image);

    if (params.imageWidth) {
      image.setAttribute('width', params.imageWidth);
    } else {
      image.removeAttribute('width');
    }

    if (params.imageHeight) {
      image.setAttribute('height', params.imageHeight);
    } else {
      image.removeAttribute('height');
    }

    image.className = swalClasses.image;
    if (params.imageClass) {
      addClass(image, params.imageClass);
    }
  } else {
    hide(image);
  }

  // Cancel button
  if (params.showCancelButton) {
    cancelButton.style.display = 'inline-block';
  } else {
    hide(cancelButton);
  }

  // Confirm button
  if (params.showConfirmButton) {
    removeStyleProperty(confirmButton, 'display');
  } else {
    hide(confirmButton);
  }

  // Actions (buttons) wrapper
  if (!params.showConfirmButton && !params.showCancelButton) {
    hide(actions);
  } else {
    show(actions);
  }

  // Edit text on confirm and cancel buttons
  confirmButton.innerHTML = params.confirmButtonText;
  cancelButton.innerHTML = params.cancelButtonText;

  // ARIA labels for confirm and cancel buttons
  confirmButton.setAttribute('aria-label', params.confirmButtonAriaLabel);
  cancelButton.setAttribute('aria-label', params.cancelButtonAriaLabel);

  // Add buttons custom classes
  confirmButton.className = swalClasses.confirm;
  addClass(confirmButton, params.confirmButtonClass);
  cancelButton.className = swalClasses.cancel;
  addClass(cancelButton, params.cancelButtonClass);

  // Buttons styling
  if (params.buttonsStyling) {
    addClass([confirmButton, cancelButton], swalClasses.styled);

    // Buttons background colors
    if (params.confirmButtonColor) {
      confirmButton.style.backgroundColor = params.confirmButtonColor;
    }
    if (params.cancelButtonColor) {
      cancelButton.style.backgroundColor = params.cancelButtonColor;
    }

    // Loading state
    var confirmButtonBackgroundColor = window.getComputedStyle(confirmButton).getPropertyValue('background-color');
    confirmButton.style.borderLeftColor = confirmButtonBackgroundColor;
    confirmButton.style.borderRightColor = confirmButtonBackgroundColor;
  } else {
    removeClass([confirmButton, cancelButton], swalClasses.styled);

    confirmButton.style.backgroundColor = confirmButton.style.borderLeftColor = confirmButton.style.borderRightColor = '';
    cancelButton.style.backgroundColor = cancelButton.style.borderLeftColor = cancelButton.style.borderRightColor = '';
  }

  // Footer
  parseHtmlToContainer(params.footer, footer);

  // CSS animation
  if (params.animation === true) {
    removeClass(popup, swalClasses.noanimation);
  } else {
    addClass(popup, swalClasses.noanimation);
  }

  // showLoaderOnConfirm && preConfirm
  if (params.showLoaderOnConfirm && !params.preConfirm) {
    warn('showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' + 'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' + 'https://sweetalert2.github.io/#ajax-request');
  }
};

/**
 * Animations
 *
 * @param animation
 * @param onBeforeOpen
 * @param onComplete
 */
var openPopup = function openPopup(animation, onBeforeOpen, onComplete) {
  var container = getContainer();
  var popup = getPopup();

  if (onBeforeOpen !== null && typeof onBeforeOpen === 'function') {
    onBeforeOpen(popup);
  }

  if (animation) {
    addClass(popup, swalClasses.show);
    addClass(container, swalClasses.fade);
    removeClass(popup, swalClasses.hide);
  } else {
    removeClass(popup, swalClasses.fade);
  }
  show(popup);

  // scrolling is 'hidden' until animation is done, after that 'auto'
  container.style.overflowY = 'hidden';
  if (animationEndEvent && !hasClass(popup, swalClasses.noanimation)) {
    popup.addEventListener(animationEndEvent, function swalCloseEventFinished() {
      popup.removeEventListener(animationEndEvent, swalCloseEventFinished);
      container.style.overflowY = 'auto';
    });
  } else {
    container.style.overflowY = 'auto';
  }

  addClass([document.documentElement, document.body, container], swalClasses.shown);
  if (isModal()) {
    fixScrollbar();
    iOSfix();
  }
  states.previousActiveElement = document.activeElement;
  if (onComplete !== null && typeof onComplete === 'function') {
    setTimeout(function () {
      onComplete(popup);
    });
  }
};

var fixScrollbar = function fixScrollbar() {
  // for queues, do not do this more than once
  if (states.previousBodyPadding !== null) {
    return;
  }
  // if the body has overflow
  if (document.body.scrollHeight > window.innerHeight) {
    // add padding so the content doesn't shift after removal of scrollbar
    states.previousBodyPadding = document.body.style.paddingRight;
    document.body.style.paddingRight = measureScrollbar() + 'px';
  }
};

var undoScrollbar = function undoScrollbar() {
  if (states.previousBodyPadding !== null) {
    document.body.style.paddingRight = states.previousBodyPadding;
    states.previousBodyPadding = null;
  }
};

// Fix iOS scrolling http://stackoverflow.com/q/39626302/1331425
var iOSfix = function iOSfix() {
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
    var offset = document.body.scrollTop;
    document.body.style.top = offset * -1 + 'px';
    addClass(document.body, swalClasses.iosfix);
  }
};

var undoIOSfix = function undoIOSfix() {
  if (hasClass(document.body, swalClasses.iosfix)) {
    var offset = parseInt(document.body.style.top, 10);
    removeClass(document.body, swalClasses.iosfix);
    document.body.style.top = '';
    document.body.scrollTop = offset * -1;
  }
};

// SweetAlert entry point
var sweetAlert = function sweetAlert() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  // Prevent run in Node env
  if (typeof window === 'undefined') {
    return;
  }

  // Check for the existence of Promise
  if (typeof Promise === 'undefined') {
    error('This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)');
  }

  if (typeof args[0] === 'undefined') {
    error('SweetAlert2 expects at least 1 attribute!');
    return false;
  }

  var params = _extends({}, popupParams);

  switch (_typeof(args[0])) {
    case 'string':
      params.title = args[0];
      params.html = args[1];
      params.type = args[2];

      break;

    case 'object':
      showWarningsForParams(args[0]);
      _extends(params, args[0]);
      params.extraParams = args[0].extraParams;

      if (params.input === 'email' && params.inputValidator === null) {
        var inputValidator = function inputValidator(email) {
          return new Promise(function (resolve, reject) {
            var emailRegex = /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/;
            if (emailRegex.test(email)) {
              resolve();
            } else {
              reject('Invalid email address');
            }
          });
        };
        params.inputValidator = params.expectRejections ? inputValidator : sweetAlert.adaptInputValidator(inputValidator);
      }

      if (params.input === 'url' && params.inputValidator === null) {
        var _inputValidator = function _inputValidator(url) {
          return new Promise(function (resolve, reject) {
            // taken from https://stackoverflow.com/a/3809435/1331425
            var urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/;
            if (urlRegex.test(url)) {
              resolve();
            } else {
              reject('Invalid URL');
            }
          });
        };
        params.inputValidator = params.expectRejections ? _inputValidator : sweetAlert.adaptInputValidator(_inputValidator);
      }
      break;

    default:
      error('Unexpected type of argument! Expected "string" or "object", got ' + _typeof(args[0]));
      return false;
  }

  setParameters(params);

  var container = getContainer();
  var popup = getPopup();

  return new Promise(function (resolve, reject) {
    // functions to handle all resolving/rejecting/settling
    var succeedWith = function succeedWith(value) {
      sweetAlert.closePopup(params.onClose);
      if (params.useRejections) {
        resolve(value);
      } else {
        resolve({ value: value });
      }
    };
    var dismissWith = function dismissWith(dismiss) {
      sweetAlert.closePopup(params.onClose);
      if (params.useRejections) {
        reject(dismiss);
      } else {
        resolve({ dismiss: dismiss });
      }
    };
    var errorWith = function errorWith(error$$1) {
      sweetAlert.closePopup(params.onClose);
      reject(error$$1);
    };

    // Close on timer
    if (params.timer) {
      popup.timeout = setTimeout(function () {
        return dismissWith('timer');
      }, params.timer);
    }

    // Get input element by specified type or, if type isn't specified, by params.input
    var getInput = function getInput(inputType) {
      inputType = inputType || params.input;
      if (!inputType) {
        return null;
      }
      switch (inputType) {
        case 'select':
        case 'textarea':
        case 'file':
          return getChildByClass(content, swalClasses[inputType]);
        case 'checkbox':
          return popup.querySelector('.' + swalClasses.checkbox + ' input');
        case 'radio':
          return popup.querySelector('.' + swalClasses.radio + ' input:checked') || popup.querySelector('.' + swalClasses.radio + ' input:first-child');
        case 'range':
          return popup.querySelector('.' + swalClasses.range + ' input');
        default:
          return getChildByClass(content, swalClasses.input);
      }
    };

    // Get the value of the popup input
    var getInputValue = function getInputValue() {
      var input = getInput();
      if (!input) {
        return null;
      }
      switch (params.input) {
        case 'checkbox':
          return input.checked ? 1 : 0;
        case 'radio':
          return input.checked ? input.value : null;
        case 'file':
          return input.files.length ? input.files[0] : null;
        default:
          return params.inputAutoTrim ? input.value.trim() : input.value;
      }
    };

    // input autofocus
    if (params.input) {
      setTimeout(function () {
        var input = getInput();
        if (input) {
          focusInput(input);
        }
      }, 0);
    }

    var confirm = function confirm(value) {
      if (params.showLoaderOnConfirm) {
        sweetAlert.showLoading();
      }

      if (params.preConfirm) {
        sweetAlert.resetValidationError();
        var preConfirmPromise = Promise.resolve().then(function () {
          return params.preConfirm(value, params.extraParams);
        });
        if (params.expectRejections) {
          preConfirmPromise.then(function (preConfirmValue) {
            return succeedWith(preConfirmValue || value);
          }, function (validationError) {
            sweetAlert.hideLoading();
            if (validationError) {
              sweetAlert.showValidationError(validationError);
            }
          });
        } else {
          preConfirmPromise.then(function (preConfirmValue) {
            if (isVisible(getValidationError()) || preConfirmValue === false) {
              sweetAlert.hideLoading();
            } else {
              succeedWith(preConfirmValue || value);
            }
          }, function (error$$1) {
            return errorWith(error$$1);
          });
        }
      } else {
        succeedWith(value);
      }
    };

    // Mouse interactions
    var onButtonEvent = function onButtonEvent(event) {
      var e = event || window.event;
      var target = e.target || e.srcElement;
      var confirmButton = getConfirmButton();
      var cancelButton = getCancelButton();
      var targetedConfirm = confirmButton && (confirmButton === target || confirmButton.contains(target));
      var targetedCancel = cancelButton && (cancelButton === target || cancelButton.contains(target));

      switch (e.type) {
        case 'click':
          // Clicked 'confirm'
          if (targetedConfirm && sweetAlert.isVisible()) {
            sweetAlert.disableButtons();
            if (params.input) {
              var inputValue = getInputValue();

              if (params.inputValidator) {
                sweetAlert.disableInput();
                var validationPromise = Promise.resolve().then(function () {
                  return params.inputValidator(inputValue, params.extraParams);
                });
                if (params.expectRejections) {
                  validationPromise.then(function () {
                    sweetAlert.enableButtons();
                    sweetAlert.enableInput();
                    confirm(inputValue);
                  }, function (validationError) {
                    sweetAlert.enableButtons();
                    sweetAlert.enableInput();
                    if (validationError) {
                      sweetAlert.showValidationError(validationError);
                    }
                  });
                } else {
                  validationPromise.then(function (validationError) {
                    sweetAlert.enableButtons();
                    sweetAlert.enableInput();
                    if (validationError) {
                      sweetAlert.showValidationError(validationError);
                    } else {
                      confirm(inputValue);
                    }
                  }, function (error$$1) {
                    return errorWith(error$$1);
                  });
                }
              } else {
                confirm(inputValue);
              }
            } else {
              confirm(true);
            }

            // Clicked 'cancel'
          } else if (targetedCancel && sweetAlert.isVisible()) {
            sweetAlert.disableButtons();
            dismissWith(sweetAlert.DismissReason.cancel);
          }
          break;
        default:
      }
    };

    var buttons = popup.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].onclick = onButtonEvent;
      buttons[i].onmouseover = onButtonEvent;
      buttons[i].onmouseout = onButtonEvent;
      buttons[i].onmousedown = onButtonEvent;
    }

    // Closing popup by close button
    getCloseButton().onclick = function () {
      dismissWith(sweetAlert.DismissReason.close);
    };

    if (params.toast) {
      // Closing popup by backdrop click
      popup.onclick = function (e) {
        if (e.target !== popup || params.showConfirmButton || params.showCancelButton) {
          return;
        }
        if (params.allowOutsideClick) {
          sweetAlert.closePopup(params.onClose);
          dismissWith(sweetAlert.DismissReason.backdrop);
        }
      };
    } else {
      var ignoreOutsideClick = false;

      // Ignore click events that had mousedown on the popup but mouseup on the container
      // This can happen when the user drags a slider
      popup.onmousedown = function () {
        container.onmouseup = function (e) {
          container.onmouseup = undefined;
          // We only check if the mouseup target is the container because usually it doesn't
          // have any other direct children aside of the popup
          if (e.target === container) {
            ignoreOutsideClick = true;
          }
        };
      };

      // Ignore click events that had mousedown on the container but mouseup on the popup
      container.onmousedown = function () {
        popup.onmouseup = function (e) {
          popup.onmouseup = undefined;
          // We also need to check if the mouseup target is a child of the popup
          if (e.target === popup || popup.contains(e.target)) {
            ignoreOutsideClick = true;
          }
        };
      };

      container.onclick = function (e) {
        if (ignoreOutsideClick) {
          ignoreOutsideClick = false;
          return;
        }
        if (e.target !== container) {
          return;
        }
        if (callIfFunction(params.allowOutsideClick)) {
          dismissWith(sweetAlert.DismissReason.backdrop);
        }
      };
    }

    var content = getContent();
    var actions = getActions();
    var confirmButton = getConfirmButton();
    var cancelButton = getCancelButton();

    // Reverse buttons (Confirm on the right side)
    if (params.reverseButtons) {
      confirmButton.parentNode.insertBefore(cancelButton, confirmButton);
    } else {
      confirmButton.parentNode.insertBefore(confirmButton, cancelButton);
    }

    // Focus handling
    var setFocus = function setFocus(index, increment) {
      var focusableElements = getFocusableElements(params.focusCancel);
      // search for visible elements and select the next possible match
      for (var _i2 = 0; _i2 < focusableElements.length; _i2++) {
        index = index + increment;

        // rollover to first item
        if (index === focusableElements.length) {
          index = 0;

          // go to last item
        } else if (index === -1) {
          index = focusableElements.length - 1;
        }

        // determine if element is visible
        var el = focusableElements[index];
        if (isVisible(el)) {
          return el.focus();
        }
      }
    };

    var handleKeyDown = function handleKeyDown(event) {
      var e = event || window.event;

      var arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Left', 'Right', 'Up', 'Down' // IE11
      ];

      if (e.key === 'Enter' && !e.isComposing) {
        if (e.target === getInput()) {
          if (['textarea', 'file'].indexOf(params.input) !== -1) {
            return; // do not submit
          }

          sweetAlert.clickConfirm();
          e.preventDefault();
        }

        // TAB
      } else if (e.key === 'Tab') {
        var targetElement = e.target || e.srcElement;

        var focusableElements = getFocusableElements(params.focusCancel);
        var btnIndex = -1; // Find the button - note, this is a nodelist, not an array.
        for (var _i3 = 0; _i3 < focusableElements.length; _i3++) {
          if (targetElement === focusableElements[_i3]) {
            btnIndex = _i3;
            break;
          }
        }

        if (!e.shiftKey) {
          // Cycle to the next button
          setFocus(btnIndex, 1);
        } else {
          // Cycle to the prev button
          setFocus(btnIndex, -1);
        }
        e.stopPropagation();
        e.preventDefault();

        // ARROWS - switch focus between buttons
      } else if (arrowKeys.indexOf(e.key) !== -1) {
        // focus Cancel button if Confirm button is currently focused
        if (document.activeElement === confirmButton && isVisible(cancelButton)) {
          cancelButton.focus();
          // and vice versa
        } else if (document.activeElement === cancelButton && isVisible(confirmButton)) {
          confirmButton.focus();
        }

        // ESC
      } else if ((e.key === 'Escape' || e.key === 'Esc') && callIfFunction(params.allowEscapeKey) === true) {
        dismissWith(sweetAlert.DismissReason.esc);
      }
    };

    if (params.toast && windowOnkeydownOverridden) {
      window.onkeydown = previousWindowKeyDown;
      windowOnkeydownOverridden = false;
    }

    if (!params.toast && !windowOnkeydownOverridden) {
      previousWindowKeyDown = window.onkeydown;
      windowOnkeydownOverridden = true;
      window.onkeydown = handleKeyDown;
    }

    /**
     * Show spinner instead of Confirm button and disable Cancel button
     */
    sweetAlert.hideLoading = sweetAlert.disableLoading = function () {
      if (!params.showConfirmButton) {
        hide(confirmButton);
        if (!params.showCancelButton) {
          hide(getActions());
        }
      }
      removeClass([popup, actions], swalClasses.loading);
      popup.removeAttribute('aria-busy');
      popup.removeAttribute('data-loading');
      confirmButton.disabled = false;
      cancelButton.disabled = false;
    };

    sweetAlert.getTitle = function () {
      return getTitle();
    };
    sweetAlert.getContent = function () {
      return getContent();
    };
    sweetAlert.getInput = function () {
      return getInput();
    };
    sweetAlert.getImage = function () {
      return getImage();
    };
    sweetAlert.getButtonsWrapper = function () {
      return getButtonsWrapper();
    };
    sweetAlert.getActions = function () {
      return getActions();
    };
    sweetAlert.getConfirmButton = function () {
      return getConfirmButton();
    };
    sweetAlert.getCancelButton = function () {
      return getCancelButton();
    };
    sweetAlert.getFooter = function () {
      return getFooter();
    };
    sweetAlert.isLoading = function () {
      return isLoading();
    };

    sweetAlert.enableButtons = function () {
      confirmButton.disabled = false;
      cancelButton.disabled = false;
    };

    sweetAlert.disableButtons = function () {
      confirmButton.disabled = true;
      cancelButton.disabled = true;
    };

    sweetAlert.enableConfirmButton = function () {
      confirmButton.disabled = false;
    };

    sweetAlert.disableConfirmButton = function () {
      confirmButton.disabled = true;
    };

    sweetAlert.enableInput = function () {
      var input = getInput();
      if (!input) {
        return false;
      }
      if (input.type === 'radio') {
        var radiosContainer = input.parentNode.parentNode;
        var radios = radiosContainer.querySelectorAll('input');
        for (var _i4 = 0; _i4 < radios.length; _i4++) {
          radios[_i4].disabled = false;
        }
      } else {
        input.disabled = false;
      }
    };

    sweetAlert.disableInput = function () {
      var input = getInput();
      if (!input) {
        return false;
      }
      if (input && input.type === 'radio') {
        var radiosContainer = input.parentNode.parentNode;
        var radios = radiosContainer.querySelectorAll('input');
        for (var _i5 = 0; _i5 < radios.length; _i5++) {
          radios[_i5].disabled = true;
        }
      } else {
        input.disabled = true;
      }
    };

    // Show block with validation error
    sweetAlert.showValidationError = function (error$$1) {
      var validationError = getValidationError();
      validationError.innerHTML = error$$1;
      var popupComputedStyle = window.getComputedStyle(popup);
      validationError.style.marginLeft = '-' + popupComputedStyle.getPropertyValue('padding-left');
      validationError.style.marginRight = '-' + popupComputedStyle.getPropertyValue('padding-right');
      show(validationError);

      var input = getInput();
      if (input) {
        input.setAttribute('aria-invalid', true);
        input.setAttribute('aria-describedBy', swalClasses.validationerror);
        focusInput(input);
        addClass(input, swalClasses.inputerror);
      }
    };

    // Hide block with validation error
    sweetAlert.resetValidationError = function () {
      var validationError = getValidationError();
      hide(validationError);

      var input = getInput();
      if (input) {
        input.removeAttribute('aria-invalid');
        input.removeAttribute('aria-describedBy');
        removeClass(input, swalClasses.inputerror);
      }
    };

    sweetAlert.getProgressSteps = function () {
      return params.progressSteps;
    };

    sweetAlert.setProgressSteps = function (progressSteps) {
      params.progressSteps = progressSteps;
      setParameters(params);
    };

    sweetAlert.showProgressSteps = function () {
      show(getProgressSteps());
    };

    sweetAlert.hideProgressSteps = function () {
      hide(getProgressSteps());
    };

    sweetAlert.enableButtons();
    sweetAlert.hideLoading();
    sweetAlert.resetValidationError();

    if (params.input) {
      addClass(document.body, swalClasses['has-input']);
    }

    // inputs
    var inputTypes = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];
    var input = void 0;
    for (var _i6 = 0; _i6 < inputTypes.length; _i6++) {
      var inputClass = swalClasses[inputTypes[_i6]];
      var inputContainer = getChildByClass(content, inputClass);
      input = getInput(inputTypes[_i6]);

      // set attributes
      if (input) {
        for (var j in input.attributes) {
          if (input.attributes.hasOwnProperty(j)) {
            var attrName = input.attributes[j].name;
            if (attrName !== 'type' && attrName !== 'value') {
              input.removeAttribute(attrName);
            }
          }
        }
        for (var attr in params.inputAttributes) {
          input.setAttribute(attr, params.inputAttributes[attr]);
        }
      }

      // set class
      inputContainer.className = inputClass;
      if (params.inputClass) {
        addClass(inputContainer, params.inputClass);
      }

      hide(inputContainer);
    }

    var populateInputOptions = void 0;
    switch (params.input) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'tel':
      case 'url':
        input = getChildByClass(content, swalClasses.input);
        input.value = params.inputValue;
        input.placeholder = params.inputPlaceholder;
        input.type = params.input;
        show(input);
        break;
      case 'file':
        input = getChildByClass(content, swalClasses.file);
        input.placeholder = params.inputPlaceholder;
        input.type = params.input;
        show(input);
        break;
      case 'range':
        var range = getChildByClass(content, swalClasses.range);
        var rangeInput = range.querySelector('input');
        var rangeOutput = range.querySelector('output');
        rangeInput.value = params.inputValue;
        rangeInput.type = params.input;
        rangeOutput.value = params.inputValue;
        show(range);
        break;
      case 'select':
        var select = getChildByClass(content, swalClasses.select);
        select.innerHTML = '';
        if (params.inputPlaceholder) {
          var placeholder = document.createElement('option');
          placeholder.innerHTML = params.inputPlaceholder;
          placeholder.value = '';
          placeholder.disabled = true;
          placeholder.selected = true;
          select.appendChild(placeholder);
        }
        populateInputOptions = function populateInputOptions(inputOptions) {
          inputOptions = objectToMap(inputOptions);
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = inputOptions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var _step$value = slicedToArray(_step.value, 2),
                  optionValue = _step$value[0],
                  optionLabel = _step$value[1];

              var option = document.createElement('option');
              option.value = optionValue;
              option.innerHTML = optionLabel;
              if (params.inputValue.toString() === optionValue.toString()) {
                option.selected = true;
              }
              select.appendChild(option);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          show(select);
          select.focus();
        };
        break;
      case 'radio':
        var radio = getChildByClass(content, swalClasses.radio);
        radio.innerHTML = '';
        populateInputOptions = function populateInputOptions(inputOptions) {
          inputOptions = objectToMap(inputOptions);
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = inputOptions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _step2$value = slicedToArray(_step2.value, 2),
                  radioValue = _step2$value[0],
                  radioLabel = _step2$value[1];

              var radioInput = document.createElement('input');
              var radioLabelElement = document.createElement('label');
              radioInput.type = 'radio';
              radioInput.name = swalClasses.radio;
              radioInput.value = radioValue;
              if (params.inputValue.toString() === radioValue.toString()) {
                radioInput.checked = true;
              }
              radioLabelElement.innerHTML = radioLabel;
              radioLabelElement.insertBefore(radioInput, radioLabelElement.firstChild);
              radio.appendChild(radioLabelElement);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          show(radio);
          var radios = radio.querySelectorAll('input');
          if (radios.length) {
            radios[0].focus();
          }
        };
        break;
      case 'checkbox':
        var checkbox = getChildByClass(content, swalClasses.checkbox);
        var checkboxInput = getInput('checkbox');
        checkboxInput.type = 'checkbox';
        checkboxInput.value = 1;
        checkboxInput.id = swalClasses.checkbox;
        checkboxInput.checked = Boolean(params.inputValue);
        var label = checkbox.getElementsByTagName('span');
        if (label.length) {
          checkbox.removeChild(label[0]);
        }
        label = document.createElement('span');
        label.innerHTML = params.inputPlaceholder;
        checkbox.appendChild(label);
        show(checkbox);
        break;
      case 'textarea':
        var textarea = getChildByClass(content, swalClasses.textarea);
        textarea.value = params.inputValue;
        textarea.placeholder = params.inputPlaceholder;
        show(textarea);
        break;
      case null:
        break;
      default:
        error('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "' + params.input + '"');
        break;
    }

    if (params.input === 'select' || params.input === 'radio') {
      if (params.inputOptions instanceof Promise) {
        sweetAlert.showLoading();
        params.inputOptions.then(function (inputOptions) {
          sweetAlert.hideLoading();
          populateInputOptions(inputOptions);
        });
      } else if (_typeof(params.inputOptions) === 'object') {
        populateInputOptions(params.inputOptions);
      } else {
        error('Unexpected type of inputOptions! Expected object, Map or Promise, got ' + _typeof(params.inputOptions));
      }
    }

    openPopup(params.animation, params.onBeforeOpen, params.onOpen);

    if (!params.toast) {
      if (!callIfFunction(params.allowEnterKey)) {
        if (document.activeElement) {
          document.activeElement.blur();
        }
      } else if (params.focusCancel && isVisible(cancelButton)) {
        cancelButton.focus();
      } else if (params.focusConfirm && isVisible(confirmButton)) {
        confirmButton.focus();
      } else {
        setFocus(-1, 1);
      }
    }

    // fix scroll
    getContainer().scrollTop = 0;
  });
};

/*
 * Global function to determine if swal2 popup is shown
 */
sweetAlert.isVisible = function () {
  return !!getPopup();
};

/*
 * Global function for chaining sweetAlert popups
 */
sweetAlert.queue = function (steps) {
  queue = steps;
  var resetQueue = function resetQueue() {
    queue = [];
    document.body.removeAttribute('data-swal2-queue-step');
  };
  var queueResult = [];
  return new Promise(function (resolve, reject) {
    (function step(i, callback) {
      if (i < queue.length) {
        document.body.setAttribute('data-swal2-queue-step', i);

        sweetAlert(queue[i]).then(function (result) {
          if (typeof result.value !== 'undefined') {
            queueResult.push(result.value);
            step(i + 1, callback);
          } else {
            resetQueue();
            resolve({ dismiss: result.dismiss });
          }
        });
      } else {
        resetQueue();
        resolve({ value: queueResult });
      }
    })(0);
  });
};

/*
 * Global function for getting the index of current popup in queue
 */
sweetAlert.getQueueStep = function () {
  return document.body.getAttribute('data-swal2-queue-step');
};

/*
 * Global function for inserting a popup to the queue
 */
sweetAlert.insertQueueStep = function (step, index) {
  if (index && index < queue.length) {
    return queue.splice(index, 0, step);
  }
  return queue.push(step);
};

/*
 * Global function for deleting a popup from the queue
 */
sweetAlert.deleteQueueStep = function (index) {
  if (typeof queue[index] !== 'undefined') {
    queue.splice(index, 1);
  }
};

/*
 * Global function to close sweetAlert
 */
sweetAlert.close = sweetAlert.closePopup = sweetAlert.closeModal = sweetAlert.closeToast = function (onComplete) {
  var container = getContainer();
  var popup = getPopup();
  if (!popup) {
    return;
  }
  removeClass(popup, swalClasses.show);
  addClass(popup, swalClasses.hide);
  clearTimeout(popup.timeout);

  if (!isToast()) {
    resetPrevState();
    window.onkeydown = previousWindowKeyDown;
    windowOnkeydownOverridden = false;
  }

  var removePopupAndResetState = function removePopupAndResetState() {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    removeClass([document.documentElement, document.body], [swalClasses.shown, swalClasses['no-backdrop'], swalClasses['has-input'], swalClasses['toast-shown']]);

    if (isModal()) {
      undoScrollbar();
      undoIOSfix();
    }
  };

  // If animation is supported, animate
  if (animationEndEvent && !hasClass(popup, swalClasses.noanimation)) {
    popup.addEventListener(animationEndEvent, function swalCloseEventFinished() {
      popup.removeEventListener(animationEndEvent, swalCloseEventFinished);
      if (hasClass(popup, swalClasses.hide)) {
        removePopupAndResetState();
      }
    });
  } else {
    // Otherwise, remove immediately
    removePopupAndResetState();
  }
  if (onComplete !== null && typeof onComplete === 'function') {
    setTimeout(function () {
      onComplete(popup);
    });
  }
};

/*
 * Global function to click 'Confirm' button
 */
sweetAlert.clickConfirm = function () {
  return getConfirmButton().click();
};

/*
 * Global function to click 'Cancel' button
 */
sweetAlert.clickCancel = function () {
  return getCancelButton().click();
};

/**
 * Show spinner instead of Confirm button and disable Cancel button
 */
sweetAlert.showLoading = sweetAlert.enableLoading = function () {
  var popup = getPopup();
  if (!popup) {
    sweetAlert('');
  }
  popup = getPopup();
  var actions = getActions();
  var confirmButton = getConfirmButton();
  var cancelButton = getCancelButton();

  show(actions);
  show(confirmButton, 'inline-block');
  addClass([popup, actions], swalClasses.loading);
  confirmButton.disabled = true;
  cancelButton.disabled = true;

  popup.setAttribute('data-loading', true);
  popup.setAttribute('aria-busy', true);
  popup.focus();
};

/**
 * Is valid parameter
 * @param {String} paramName
 */
sweetAlert.isValidParameter = function (paramName) {
  return defaultParams.hasOwnProperty(paramName) || paramName === 'extraParams';
};

/**
 * Is deprecated parameter
 * @param {String} paramName
 */
sweetAlert.isDeprecatedParameter = function (paramName) {
  return deprecatedParams.indexOf(paramName) !== -1;
};

/**
 * Set default params for each popup
 * @param {Object} userParams
 */
sweetAlert.setDefaults = function (userParams) {
  if (!userParams || (typeof userParams === 'undefined' ? 'undefined' : _typeof(userParams)) !== 'object') {
    return error('the argument for setDefaults() is required and has to be a object');
  }

  showWarningsForParams(userParams);

  // assign valid params from userParams to popupParams
  for (var param in userParams) {
    if (sweetAlert.isValidParameter(param)) {
      popupParams[param] = userParams[param];
    }
  }
};

/**
 * Reset default params for each popup
 */
sweetAlert.resetDefaults = function () {
  popupParams = _extends({}, defaultParams);
};

/**
 * Adapt a legacy inputValidator for use with expectRejections=false
 */
sweetAlert.adaptInputValidator = function (legacyValidator) {
  return function adaptedInputValidator(inputValue, extraParams) {
    return legacyValidator.call(this, inputValue, extraParams).then(function () {
      return undefined;
    }, function (validationError) {
      return validationError;
    });
  };
};

sweetAlert.DismissReason = Object.freeze({
  cancel: 'cancel',
  backdrop: 'overlay',
  close: 'close',
  esc: 'esc',
  timer: 'timer'
});

sweetAlert.noop = function () {};

sweetAlert.version = '7.11.0';

sweetAlert.default = sweetAlert;

/**
 * Set default params if `window._swalDefaults` is an object
 */
if (typeof window !== 'undefined' && _typeof(window._swalDefaults) === 'object') {
  sweetAlert.setDefaults(window._swalDefaults);
}

// Remember state in cases where opening and handling a modal will fiddle with it.
var states = {
  previousActiveElement: null,
  previousBodyPadding: null

  // Detect Node env
};var isNodeEnv = function isNodeEnv() {
  return typeof window === 'undefined' || typeof document === 'undefined';
};

/*
 * Add modal + backdrop to DOM
 */
var init = function init(params) {
  // Clean up the old popup if it exists
  var c = getContainer();
  if (c) {
    c.parentNode.removeChild(c);
    removeClass([document.documentElement, document.body], [swalClasses['no-backdrop'], swalClasses['has-input'], swalClasses['toast-shown']]);
  }

  if (isNodeEnv()) {
    error('SweetAlert2 requires document to initialize');
    return;
  }

  var container = document.createElement('div');
  container.className = swalClasses.container;
  container.innerHTML = sweetHTML;

  var targetElement = typeof params.target === 'string' ? document.querySelector(params.target) : params.target;
  targetElement.appendChild(container);

  var popup = getPopup();
  var content = getContent();
  var input = getChildByClass(content, swalClasses.input);
  var file = getChildByClass(content, swalClasses.file);
  var range = content.querySelector('.' + swalClasses.range + ' input');
  var rangeOutput = content.querySelector('.' + swalClasses.range + ' output');
  var select = getChildByClass(content, swalClasses.select);
  var checkbox = content.querySelector('.' + swalClasses.checkbox + ' input');
  var textarea = getChildByClass(content, swalClasses.textarea);

  // a11y
  popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');

  var resetValidationError = function resetValidationError() {
    sweetAlert.isVisible() && sweetAlert.resetValidationError();
  };

  input.oninput = resetValidationError;
  file.onchange = resetValidationError;
  select.onchange = resetValidationError;
  checkbox.onchange = resetValidationError;
  textarea.oninput = resetValidationError;

  range.oninput = function () {
    resetValidationError();
    rangeOutput.value = range.value;
  };

  range.onchange = function () {
    resetValidationError();
    range.previousSibling.value = range.value;
  };

  return popup;
};

/*
 * Manipulate DOM
 */

var sweetHTML = ('\n <div role="dialog" aria-modal="true" aria-labelledby="' + swalClasses.title + '" aria-describedby="' + swalClasses.content + '" class="' + swalClasses.popup + '" tabindex="-1">\n   <div class="' + swalClasses.header + '">\n     <ul class="' + swalClasses.progresssteps + '"></ul>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.error + '">\n       <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>\n     </div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.question + '">?</div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.warning + '">!</div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.info + '">i</div>\n     <div class="' + swalClasses.icon + ' ' + iconTypes.success + '">\n       <div class="swal2-success-circular-line-left"></div>\n       <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n       <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n       <div class="swal2-success-circular-line-right"></div>\n     </div>\n     <img class="' + swalClasses.image + '" />\n     <h2 class="' + swalClasses.title + '" id="' + swalClasses.title + '"></h2>\n     <button type="button" class="' + swalClasses.close + '">\xD7</button>\n   </div>\n   <div class="' + swalClasses.content + '">\n     <div id="' + swalClasses.content + '"></div>\n     <input class="' + swalClasses.input + '" />\n     <input type="file" class="' + swalClasses.file + '" />\n     <div class="' + swalClasses.range + '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="' + swalClasses.select + '"></select>\n     <div class="' + swalClasses.radio + '"></div>\n     <label for="' + swalClasses.checkbox + '" class="' + swalClasses.checkbox + '">\n       <input type="checkbox" />\n     </label>\n     <textarea class="' + swalClasses.textarea + '"></textarea>\n     <div class="' + swalClasses.validationerror + '" id="' + swalClasses.validationerror + '"></div>\n   </div>\n   <div class="' + swalClasses.actions + '">\n     <button type="button" class="' + swalClasses.confirm + '">OK</button>\n     <button type="button" class="' + swalClasses.cancel + '">Cancel</button>\n   </div>\n   <div class="' + swalClasses.footer + '">\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, '');

var getContainer = function getContainer() {
  return document.body.querySelector('.' + swalClasses.container);
};

var getPopup = function getPopup() {
  return getContainer() ? getContainer().querySelector('.' + swalClasses.popup) : null;
};

var getIcons = function getIcons() {
  var popup = getPopup();
  return popup.querySelectorAll('.' + swalClasses.icon);
};

var elementByClass = function elementByClass(className) {
  return getContainer() ? getContainer().querySelector('.' + className) : null;
};

var getTitle = function getTitle() {
  return elementByClass(swalClasses.title);
};

var getContent = function getContent() {
  return elementByClass(swalClasses.content);
};

var getImage = function getImage() {
  return elementByClass(swalClasses.image);
};

var getProgressSteps = function getProgressSteps() {
  return elementByClass(swalClasses.progresssteps);
};

var getValidationError = function getValidationError() {
  return elementByClass(swalClasses.validationerror);
};

var getConfirmButton = function getConfirmButton() {
  return elementByClass(swalClasses.confirm);
};

var getCancelButton = function getCancelButton() {
  return elementByClass(swalClasses.cancel);
};

var getButtonsWrapper = function getButtonsWrapper() {
  warnOnce('swal.getButtonsWrapper() is deprecated and will be removed in the next major release, use swal.getActions() instead');
  return elementByClass(swalClasses.actions);
};

var getActions = function getActions() {
  return elementByClass(swalClasses.actions);
};

var getFooter = function getFooter() {
  return elementByClass(swalClasses.footer);
};

var getCloseButton = function getCloseButton() {
  return elementByClass(swalClasses.close);
};

var getFocusableElements = function getFocusableElements() {
  var focusableElementsWithTabindex = Array.prototype.slice.call(getPopup().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])'))
  // sort according to tabindex
  .sort(function (a, b) {
    a = parseInt(a.getAttribute('tabindex'));
    b = parseInt(b.getAttribute('tabindex'));
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }
    return 0;
  });

  var otherFocusableElements = Array.prototype.slice.call(getPopup().querySelectorAll('button, input:not([type=hidden]), textarea, select, a, [tabindex="0"]'));

  return uniqueArray(focusableElementsWithTabindex.concat(otherFocusableElements));
};

var parseHtmlToContainer = function parseHtmlToContainer(param, target) {
  if (!param) {
    return hide(target);
  }

  if ((typeof param === 'undefined' ? 'undefined' : _typeof(param)) === 'object') {
    target.innerHTML = '';
    if (0 in param) {
      for (var i = 0; i in param; i++) {
        target.appendChild(param[i].cloneNode(true));
      }
    } else {
      target.appendChild(param.cloneNode(true));
    }
  } else if (param) {
    target.innerHTML = param;
  } else {}
  show(target);
};

var isModal = function isModal() {
  return !document.body.classList.contains(swalClasses['toast-shown']);
};

var isToast = function isToast() {
  return document.body.classList.contains(swalClasses['toast-shown']);
};

var isLoading = function isLoading() {
  return getPopup().hasAttribute('data-loading');
};

var hasClass = function hasClass(elem, className) {
  if (elem.classList) {
    return elem.classList.contains(className);
  }
  return false;
};

var focusInput = function focusInput(input) {
  input.focus();

  // place cursor at end of text in text input
  if (input.type !== 'file') {
    // http://stackoverflow.com/a/2345915/1331425
    var val = input.value;
    input.value = '';
    input.value = val;
  }
};

var addOrRemoveClass = function addOrRemoveClass(target, classList, add) {
  if (!target || !classList) {
    return;
  }
  if (typeof classList === 'string') {
    classList = classList.split(/\s+/).filter(Boolean);
  }
  classList.forEach(function (className) {
    if (target.forEach) {
      target.forEach(function (elem) {
        add ? elem.classList.add(className) : elem.classList.remove(className);
      });
    } else {
      add ? target.classList.add(className) : target.classList.remove(className);
    }
  });
};

var addClass = function addClass(target, classList) {
  addOrRemoveClass(target, classList, true);
};

var removeClass = function removeClass(target, classList) {
  addOrRemoveClass(target, classList, false);
};

var getChildByClass = function getChildByClass(elem, className) {
  for (var i = 0; i < elem.childNodes.length; i++) {
    if (hasClass(elem.childNodes[i], className)) {
      return elem.childNodes[i];
    }
  }
};

var show = function show(elem, display) {
  if (!display) {
    display = elem.id === swalClasses.content ? 'block' : 'flex';
  }
  elem.style.opacity = '';
  elem.style.display = display;
};

var hide = function hide(elem) {
  elem.style.opacity = '';
  elem.style.display = 'none';
};

var empty = function empty(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
};

// borrowed from jquery $(elem).is(':visible') implementation
var isVisible = function isVisible(elem) {
  return elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
};

var removeStyleProperty = function removeStyleProperty(elem, property) {
  if (elem.style.removeProperty) {
    elem.style.removeProperty(property);
  } else {
    elem.style.removeAttribute(property);
  }
};

var animationEndEvent = function () {
  // Prevent run in Node env
  if (isNodeEnv()) {
    return false;
  }

  var testEl = document.createElement('div');
  var transEndEventNames = {
    'WebkitAnimation': 'webkitAnimationEnd',
    'OAnimation': 'oAnimationEnd oanimationend',
    'animation': 'animationend'
  };
  for (var i in transEndEventNames) {
    if (transEndEventNames.hasOwnProperty(i) && typeof testEl.style[i] !== 'undefined') {
      return transEndEventNames[i];
    }
  }

  return false;
}();

// Reset previous window keydown handler and focued element
var resetPrevState = function resetPrevState() {
  if (states.previousActiveElement && states.previousActiveElement.focus) {
    var x = window.scrollX;
    var y = window.scrollY;
    states.previousActiveElement.focus();
    if (typeof x !== 'undefined' && typeof y !== 'undefined') {
      // IE doesn't have scrollX/scrollY support
      window.scrollTo(x, y);
    }
  }
};

// Measure width of scrollbar
// https://github.com/twbs/bootstrap/blob/master/js/modal.js#L279-L286
var measureScrollbar = function measureScrollbar() {
  var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
  if (supportsTouch) {
    return 0;
  }
  var scrollDiv = document.createElement('div');
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  scrollDiv.style.overflow = 'scroll';
  document.body.appendChild(scrollDiv);
  var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

/**
 * Inject a string of CSS into the page header
 *
 * @param {String} css
 */
var injectCSS = function injectCSS() {
  var css = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  // Prevent run in Node env
  if (isNodeEnv()) {
    return false;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
};

injectCSS(styles);

return sweetAlert;

})));
if (typeof window !== 'undefined' && window.Sweetalert2) window.sweetAlert = window.swal = window.Sweetalert2;
