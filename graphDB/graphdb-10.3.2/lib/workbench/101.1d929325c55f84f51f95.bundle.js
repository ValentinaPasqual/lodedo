(window.webpackJsonp=window.webpackJsonp||[]).push([[101],{143:function(r,n){window.PluginRegistry=function(){const r=[],n={};function i(r){return!isNaN(parseFloat(r))&&isFinite(r)&&"string"!=typeof r}function o(r){return void 0!==r}function e(n,e){if(e.disabled)return;let t=r[n];if(o(t)||(t=[],t.extensionPoint=n,r[n]=t),i(e.order)){if(!1===t.ordered)throw new Error("Cannot add an ordered plugin definition to unordered extension point");!function(r){if(!i(r.priority)){if(o(r.priority))throw new Error("Priority is defined but is not a number");r.priority=0}}(e),function(r,n){let i;if(n.forEach((function(n,o){if(r.order===n.order)return i=o,!1})),o(i)){const o=n[i];if(r.priority===o.priority)throw new Error('There is already a plugin with the same order and priority. Extension point "'+n.extensionPoint+'" order "'+r.order+'"');r.priority>o.priority&&(n[i]=r)}else n.push(r);n.sort((function(r,n){return r.order-n.order}))}(e,t),t.ordered=!0}else{if(!0===t.ordered)throw new Error("Cannot add unordered plugin definition to an ordered extension point");t.push(e),t.ordered=!1}}return n.add=function(r,n){Array.isArray(n)?n.forEach((function(n){e(r,n)})):e(r,n)},n.get=function(n){return r[n]},n.clear=function(n){r[n]=[]},n.listModules=function(){return r},n}()}}]);