(window.webpackJsonp=window.webpackJsonp||[]).push([[117],{63:function(e,a){angular.module("graphdb.framework.rest.graphexplore.data.service",[]).factory("GraphDataRestService",t),t.$inject=["$http"];function t(e){return{getClassHierarchyData:function(a){return e.get("rest/class-hierarchy",{params:{graphURI:a}})},reloadClassHierarchy:function(a){return e.get("rest/class-hierarchy",{params:{doReload:!0,graphURI:a}})},getClassInstances:function(a){return e.get("rest/class-hierarchy/class-instances",{params:{targetUri:a}})},getDomainRangeData:function(a,t){return e.get("rest/domain-range",{params:{targetUri:a,collapsed:t}})},checkDomainRangeData:function(a){return e.head("rest/domain-range",{params:{targetUri:a}})},getRelationshipsData:function(a,t,r){return e.get("rest/dependencies/matrix",{params:{mode:t,classes:_.map(a,(function(e){return e.name})),graphURI:r}})},getRelationshipsClasses:function(a,t){return e.get("rest/dependencies/classes",{params:{mode:a,graphURI:t}})},getRelationshipsStatus:function(a){return e.get("rest/dependencies/status",{params:{graphURI:a}})},calculateRelationships:function(a){return e.get("rest/dependencies/update",{params:{graphURI:a}})},getPredicates:function(a,t,r){return e.get("rest/dependencies/predicates",{params:{from:a,to:t,mode:"all",graphURI:r}})},getInstanceNode:function(a){return e.get("rest/explore-graph/node",{params:{iri:a}})},getInstanceNodeLinks:function(a){return e.get("rest/explore-graph/links",{params:{iri:a}})},getRdfsLabelAndComment:function(a,t,r){const n=r||{};return e({url:"rest/explore/details",method:"GET",params:_.extend(n,{uri:a,languages:t}),headers:{Accept:"application/json"}})}}}}}]);