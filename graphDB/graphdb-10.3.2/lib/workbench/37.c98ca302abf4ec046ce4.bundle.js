(window.webpackJsonp=window.webpackJsonp||[]).push([[37,62],{45:function(e,i){angular.module("graphdb.framework.core.directives.paginations",[]).directive("paginations",(function(){return{template:'<uib-pagination class="nav navbar-right" total-items="matchedElements.length" items-per-page="pageSize" ng-model="page" ng-change="changePagination()" direction-links="false" boundary-links="true" max-size="5" rotate="true"></uib-pagination>'}}))},91:function(e,i,a){"use strict";a.r(i);a(20),a(45);var n=a(1);function t(e,i,a,t,s,r){e.guides=[],e.pageSizeOptions=[10,20,50,100],e.page=1,e.pageSize=e.pageSizeOptions[0],e.translationSubscription=void 0,e.init=function(){a.getGuides().then(i=>{e.guides=t("orderBy")(i,"guideOrder"),e.guides.forEach(e=>{switch(e.translatedGuideName=n.GuideUtils.translateLocalMessage(s,r,e.guideName),e.translatedGuideDescription=n.GuideUtils.translateLocalMessage(s,r,e.guideDescription),e.guideLevel){case void 0:case 0:e.guideLevelLabel="view.guides.level.beginner";break;case 1:e.guideLevelLabel="view.guides.level.intermediate";break;default:e.guideLevelLabel="view.guides.level.advanced"}}),e.matchedElements=e.guides,e.changePagination()})},e.startGuide=function(e){a.startGuide(e)},this.translationSubscription||(this.translationSubscription=i.$on("$translateChangeSuccess",()=>{e.init()})),e.changePagination=function(){angular.isDefined(e.guides)&&(e.displayedGuides=e.guides.slice(e.pageSize*(e.page-1),e.pageSize*e.page))},e.changePageSize=function(i){e.page=1,e.pageSize=i||e.pageSizeOptions[0],e.changePagination()},e.init()}angular.module("graphdb.framework.guides.controllers",["ui.bootstrap","graphdb.framework.guides.services","graphdb.framework.core.directives.paginations"]).controller("GuidesCtrl",t),t.$inject=["$scope","$rootScope","GuidesService","$filter","$translate","$interpolate"]}}]);