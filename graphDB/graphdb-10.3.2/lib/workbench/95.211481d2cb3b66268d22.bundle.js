(window.webpackJsonp=window.webpackJsonp||[]).push([[95],{92:function(t,e,i){"use strict";i.r(e);i(4),i(14);const r=angular.module("graphdb.framework.impex.import.directives",["graphdb.framework.utils.uriutils"]);r.directive("validateUri",["UriUtils",function(t){return{restrict:"A",require:"ngModel",link:function(e,i,r,a){a.$parsers.unshift((function(i){let r=!0;return"named"===e.target&&(r=t.isValidIri(i)),a.$setValidity("validateUri",r),i}))}}}]),r.directive("filesTable",(function(){return{restrict:"A",templateUrl:"js/angular/import/templates/filesTable.html"}})),r.directive("filesOntoLoader",(function(){return{link:function(t,e,i){t.$watch("file.status",(function(){"IMPORTING"!==t.file.status&&"UPLOADING"!==t.file.status||!$(e).has("object").length>0&&$(e).append('<object width="'+i.size+'" height="'+i.size+'" data="js/angular/templates/loader/ot-loader.svg?v=2.3.1">{{\'common.loading\' | translate}}</object>')}))}}}))}}]);