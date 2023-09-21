(window.webpackJsonp=window.webpackJsonp||[]).push([[4,114],{42:function(e,t){angular.module("graphdb.framework.rest.cluster.service",[]).factory("ClusterRestService",n),n.$inject=["$http"];function n(e){return{getClusterConfig:function(){return e.get("rest/cluster/config")},createCluster:function(t){return e.post("rest/cluster/config",t)},updateCluster:function(t){t.nodes&&delete t.nodes;return e.patch("rest/cluster/config",t)},deleteCluster:function(t){const n=$.param({force:t});return e.delete("rest/cluster/config?"+n)},addNodesToCluster:function(t){return e.post("rest/cluster/config/node",{nodes:t})},removeNodesFromCluster:function(t){return e.delete("rest/cluster/config/node",{data:{nodes:t},headers:{"Content-Type":"application/json"}})},getClusterStatus:function(){return e.get("rest/cluster/group/status")},getNodeStatus:function(){return e.get("rest/cluster/node/status")}}}},56:function(e,t,n){"use strict";n.r(t),n.d(t,"NodeState",(function(){return r})),n.d(t,"LinkState",(function(){return s}));n(4),n(42);var o=n(67);angular.module("graphdb.framework.clustermanagement.controllers",["ui.bootstrap","graphdb.framework.core.services.repositories","graphdb.framework.rest.repositories.service","graphdb.framework.rest.cluster.service","toastr","pageslide-directive"]).controller("ClusterManagementCtrl",a).controller("CreateClusterCtrl",c).controller("DeleteClusterCtrl",i).controller("EditClusterCtrl",g).controller("AddLocationFromClusterCtrl",d).controller("AddNodesDialogCtrl",m).controller("RemoveNodesDialogCtrl",p).factory("RemoteLocationsService",u);const r={LEADER:"LEADER",FOLLOWER:"FOLLOWER",CANDIDATE:"CANDIDATE",OUT_OF_SYNC:"OUT_OF_SYNC",NO_CONNECTION:"NO_CONNECTION",READ_ONLY:"READ_ONLY",RESTRICTED:"RESTRICTED",NO_CLUSTER:"NO_CLUSTER"},s={IN_SYNC:"IN_SYNC",OUT_OF_SYNC:"OUT_OF_SYNC",SYNCING:"SYNCING",NO_CONNECTION:"NO_CONNECTION"};function a(e,t,n,a,l,c,i,u,d,g,f,m,p,C,h,_){e.loader=!0,e.isLeader=!1,e.currentNode=null,e.clusterModel={},e.NodeState=r,e.leaderChanged=!1,e.currentLeader=null,e.childContext={},e.shouldShowClusterSettingsPanel=!1;let N;function L(t){N||(N=e.getClusterStatus().then(()=>{if(t||!e.clusterConfiguration)return e.getClusterConfiguration()}).then(()=>{if(!e.currentNode||e.leaderChanged)return e.getCurrentNodeStatus()}).finally(()=>{N=null,e.childContext.redraw()}))}function $(){return h.getLocationsWithRpcAddresses().then(t=>{const n=t.find(e=>e.isLocal);n&&(n.endpoint=e.currentNode.endpoint,n.rpcAddress=e.currentNode.address),e.clusterModel.locations=t})}function v(t){a.success(t),e.getClusterConfiguration()}function S(e,t,n){let r=e.message||e;400===t&&Array.isArray(e)?r=e.reduce((e,t)=>e+`<div>${t}</div>`,""):412!==t||Object(o.isString)(e)||(r=Object.keys(e).reduce((t,n)=>t+`<div>${n} - ${e[n]}</div>`,"")),a.error(r,n,{allowHtml:!0})}e.onopen=e.onclose=()=>angular.noop(),e.toggleSidePanel=()=>{e.shouldShowClusterSettingsPanel=!e.shouldShowClusterSettingsPanel},e.toggleLegend=()=>{e.childContext.toggleLegend&&e.childContext.toggleLegend()},e.setLoader=function(t,n){f.cancel(e.loaderTimeout),t?(e.loaderMessage=n,e.loaderTimeout=f((function(){e.loader=t}),50)):e.loader=!1},e.childContext.selectNode=function(t){e.selectedNode!==t?e.selectedNode=t:e.selectedNode=null,e.$apply()},e.getLoaderMessage=function(){return e.loaderMessage||C.instant("common.loading")},e.getClusterConfiguration=()=>m.getClusterConfig().then(t=>{if(e.clusterConfiguration=t.data,!e.currentNode)return e.getCurrentNodeStatus()}).catch(()=>{e.clusterConfiguration=null}),e.getClusterStatus=function(){return m.getClusterStatus().then((function(t){const n=t.data.slice(),o=n.find(e=>e.nodeState===r.LEADER);var a,l;a=e.currentLeader,(l=o)&&a&&a.address===l.address||(e.currentLeader=o,e.leaderChanged=!0),e.currentNode=n.find(t=>t.address===e.currentNode.address);const c=[];o&&Object.keys(o.syncStatus).forEach(e=>{const t=o.syncStatus[e];t!==s.NO_CONNECTION&&c.push({id:`${o.address}-${e}`,source:o.address,target:e,status:t})}),e.clusterModel.hasCluster=!0,e.clusterModel.nodes=n,e.clusterModel.links=c})).catch((function(t){404===t.status&&(e.clusterModel.hasCluster=!1,e.clusterModel.nodes=[],e.clusterModel.links=[],e.clusterConfiguration=null)}))},e.showCreateClusterDialog=function(){c.open({templateUrl:"js/angular/clustermanagement/templates/modal/cluster-create-dialog.html",controller:"CreateClusterCtrl",size:"lg",resolve:{data:function(){return{clusterModel:e.clusterModel}}}}).result.finally((function(){$(),L(!0)}))},e.showDeleteDialog=()=>{c.open({templateUrl:"js/angular/clustermanagement/templates/modal/cluster-delete-dialog.html",controller:"DeleteClusterCtrl"}).result.then((function(t){const n=C.instant("cluster_management.delete_cluster_dialog.loader_message");e.setLoader(!0,n),m.deleteCluster(t).then(t=>{if(Object.values(t.data).every(e=>"Cluster was deleted on this node."===e)){const e=C.instant("cluster_management.delete_cluster_dialog.notifications.success_delete");a.success(e)}else{const e=C.instant("cluster_management.delete_cluster_dialog.notifications.success_delete_partial"),n=Object.keys(t.data).reduce((e,n)=>e+`<div>${n} - ${t.data[n]}</div>`,"");a.warning(n,e,{allowHtml:!0})}e.getClusterConfiguration()}).catch(e=>{const t=C.instant("cluster_management.delete_cluster_dialog.notifications.fail_delete");S(e.data,e.status,t)}).finally(()=>{e.setLoader(!1),L(!0),_.$broadcast("reloadLocations")})}))},e.showEditConfigurationDialog=()=>{c.open({templateUrl:"js/angular/clustermanagement/templates/modal/cluster-edit-dialog.html",controller:"EditClusterCtrl",size:"lg",resolve:{data:function(){return{clusterConfiguration:e.clusterConfiguration}}}}).result.finally((function(){L(!0)}))},e.getCurrentNodeStatus=()=>m.getNodeStatus().then(t=>{e.leaderChanged=!1,e.currentNode=t.data}).catch(t=>{e.currentNode=t.data,e.clusterModel.hasCluster=!1}).then(()=>$()),e.showAddNodeToClusterDialog=()=>{c.open({templateUrl:"js/angular/clustermanagement/templates/modal/add-nodes-dialog.html",controller:"AddNodesDialogCtrl",size:"lg",resolve:{data:function(){return{clusterModel:e.clusterModel,clusterConfiguration:e.clusterConfiguration}}}}).result.then((function(t){const n=C.instant("cluster_management.cluster_page.add_nodes_loader");e.setLoader(!0,n);const o=t.map(e=>e.rpcAddress);m.addNodesToCluster(o).then(()=>{v(C.instant("cluster_management.cluster_page.notifications.add_nodes_success"))}).catch(e=>{const t=C.instant("cluster_management.cluster_page.notifications.add_nodes_fail");S(e.data,e.status,t)}).finally(()=>{e.setLoader(!1),L(!0)})})).finally(()=>$())},e.showRemoveNodesFromClusterDialog=()=>{c.open({templateUrl:"js/angular/clustermanagement/templates/modal/remove-nodes-dialog.html",controller:"RemoveNodesDialogCtrl",size:"lg",resolve:{data:function(){return{clusterModel:e.clusterModel}}}}).result.then((function(t){const n=C.instant("cluster_management.cluster_page.remove_nodes_loader");e.setLoader(!0,n);const o=t.map(e=>e.address);m.removeNodesFromCluster(o).then(()=>{v(C.instant("cluster_management.cluster_page.notifications.remove_nodes_success"))}).catch(e=>{const t=C.instant("cluster_management.cluster_page.notifications.remove_nodes_fail");S(e.data,e.status,t)}).finally(()=>{e.setLoader(!1),L(!0)})}))},(e.loader=!0,e.getCurrentNodeStatus().then(()=>e.getClusterConfiguration()).then(()=>e.getClusterStatus()).finally(()=>{e.setLoader(!1)})).finally(()=>{const t=d((function(){L()}),1e3);e.$on("$destroy",(function(){d.cancel(t)}))});const w=angular.element(u),T=function(){e.childContext.resize()};w.bind("resize",T);const O=function(t){const n=t.target,o=document.getElementById("nodeTooltip");e.selectedNode&&o!==n&&!o.contains(n)&&e.childContext.selectNode(null)};w.bind("mousedown",O),e.$on("$destroy",(function(){w.unbind("resize",T),w.unbind("mousedown",O)}))}a.$inject=["$scope","$http","$q","toastr","$repositories","$uibModal","$sce","$window","$interval","ModalService","$timeout","ClusterRestService","$location","$translate","RemoteLocationsService","$rootScope"];const l=function(){const e=document.getElementById("advancedOptions");if(e){const t=e.getAttribute("aria-expanded");if(t&&"true"===t)return"fa fa-angle-down"}return"fa fa-angle-right"};function c(e,t,n,o,r,s,a,c,i,u){e.pageTitle=s.instant("cluster_management.cluster_page.create_page_title"),e.autofocusId="autofocus",e.errors=[],e.clusterConfiguration={electionMinTimeout:8e3,electionRangeTimeout:6e3,heartbeatInterval:2e3,messageSizeKB:64,verificationTimeout:1500,nodes:[]},e.locations=a.clusterModel.locations.filter(e=>!e.isLocal),e.selectedLocations=a.clusterModel.locations.filter(e=>e.isLocal),e.loader=!1,e.getAdvancedOptionsClass=l,e.createCluster=function(){return e.setLoader(!0,s.instant("cluster_management.cluster_page.creating_cluster_loader")),e.clusterConfiguration.nodes=e.selectedLocations.map(e=>e.rpcAddress),o.createCluster(e.clusterConfiguration).then(()=>{r.success(s.instant("cluster_management.cluster_page.notifications.create_success")),t.close()}).catch((function(t){!function(t,n){delete e.preconditionErrors,r.error(s.instant("cluster_management.cluster_page.notifications.create_failed")),e.errors.splice(0),412===n?e.preconditionErrors=Object.keys(t).map(e=>`${e} - ${t[e]}`):400===n?e.errors.push(...t):409===n&&e.errors.push(t)}(t.data,t.status)})).finally(()=>{e.setLoader(!1),u.$broadcast("reloadLocations")})},e.isClusterConfigurationValid=()=>{const t=!e.clusterConfigurationForm.$invalid,n=e.selectedLocations&&e.selectedLocations.length>=2;return t&&n},e.setLoader=function(t,o){n.cancel(e.loaderTimeout),t?e.loaderTimeout=n((function(){e.loader=t,e.loaderMessage=o}),300):e.loader=!1},e.addNodeToList=function(t){t.rpcAddress&&(e.selectedLocations.push(t),e.locations=e.locations.filter(e=>e.endpoint!==t.endpoint))},e.removeNodeFromList=function(t,n){n.isLocal||(e.selectedLocations.splice(t,1),e.locations.push(n))},e.addLocation=function(){i.addLocation().then(t=>{t&&e.locations.push(t)})},e.ok=function(){e.isClusterConfigurationValid()?e.createCluster():r.warning(s.instant("cluster_management.cluster_page.notifications.form_invalid"))},e.cancel=function(){t.dismiss("cancel")}}function i(e,t){e.forceDelete=!1,e.ok=function(){t.close(e.forceDelete)},e.cancel=function(){t.dismiss("cancel")}}function u(e,t,n,o,r){return{addLocation:function(){let e;return n.open({templateUrl:"js/angular/templates/modal/add-location.html",windowClass:"addLocationDialog",controller:"AddLocationFromClusterCtrl"}).result.then(n=>(e=n,e.isLocal=!1,e.endpoint=e.uri,function(e){let n;return o.addLocation(e).catch(e=>{const n=getError(e.data,e.status);return t.error(n,r.instant("common.error")),!1}).then(e=>!!e&&s()).then(t=>{if(!1!==t)return n=t.find(t=>t.endpoint===e.uri),n})}(e)))},getLocationsWithRpcAddresses:s};function s(){return o.getLocations().then((function(e){return e.data.map(e=>({isLocal:e.local,endpoint:e.uri,rpcAddress:e.rpcAddress||"",error:e.errorMsg}))})).catch((function(e){const n=getError(e.data,e.status);t.error(n,r.instant("common.error"))})).then(e=>{if(e)return function(e){const t=e.filter(e=>!e.isLocal&&!e.error).map(e=>function(e){return o.getLocationRpcAddress(e.endpoint)}(e).then(t=>(e.rpcAddress=t.data,e.isAvailable=!0,e)).catch(t=>{e.isAvailable=!1,e.error=getError(t.data,t.status)}));return Promise.allSettled(t).then(()=>e)}(e)})}}function d(e,t,n,o,r){e.newLocation={uri:"",authType:"signature",username:"",password:"",active:!1},e.docBase=f(o),e.isValidLocation=function(){return(e.newLocation.uri.length<6||0===e.newLocation.uri.indexOf("http:")||0===e.newLocation.uri.indexOf("https:"))&&e.newLocation.uri.indexOf("/repositories")<=-1},e.ok=function(){e.newLocation?t.close(e.newLocation):n.error(r.instant("location.cannot.be.empty.error"))},e.cancel=function(){t.dismiss("cancel")}}function g(e,t,n,o,r,s,a){e.pageTitle=s.instant("cluster_management.cluster_page.edit_page_title"),e.errors=[],e.clusterConfiguration=angular.copy(a.clusterConfiguration),e.loader=!1,e.updateCluster=function(){return e.setLoader(!0,s.instant("cluster_management.cluster_page.updating_cluster_loader")),o.updateCluster(e.clusterConfiguration).then(()=>{r.success(s.instant("cluster_management.cluster_page.notifications.update_success")),t.close()}).catch((function(t){!function(t,n){delete e.preconditionErrors,r.error(s.instant("cluster_management.cluster_page.notifications.update_failed")),e.errors.splice(0),409===n||"string"==typeof t?e.errors.push(t):412===n?e.preconditionErrors=Object.keys(t).map(e=>`${e} - ${t[e]}`):400===n&&e.errors.push(...t)}(t.data,t.status)})).finally(()=>e.setLoader(!1))},e.isClusterConfigurationValid=()=>!e.clusterConfigurationForm.$invalid,e.setLoader=function(t,o){n.cancel(e.loaderTimeout),t?e.loaderTimeout=n((function(){e.loader=t,e.loaderMessage=o}),300):e.loader=!1},e.ok=function(){e.isClusterConfigurationValid()?e.updateCluster():r.warning(s.instant("cluster_management.cluster_page.notifications.form_invalid"))},e.cancel=function(){t.dismiss("cancel")}}c.$inject=["$scope","$uibModalInstance","$timeout","ClusterRestService","toastr","$translate","data","$uibModal","RemoteLocationsService","$rootScope"],i.$inject=["$scope","$uibModalInstance"],u.$inject=["$http","toastr","$uibModal","LocationsRestService","$translate"],d.$inject=["$scope","$uibModalInstance","toastr","productInfo","$translate"],g.$inject=["$scope","$uibModalInstance","$timeout","ClusterRestService","toastr","$translate","data"];const f=function(e){return"https://graphdb.ontotext.com/documentation/"+e.productShortVersion};function m(e,t,n,o,r){const s=angular.copy(n.clusterConfiguration),a=angular.copy(n.clusterModel);e.nodes=[],e.clusterNodes=a.nodes.map(e=>({rpcAddress:e.address,endpoint:e.endpoint})),e.locations=a.locations.filter(e=>!s.nodes.includes(e.rpcAddress)),e.locations.forEach(e=>e.isNew=!0),e.addNodeToList=function(t){t.rpcAddress&&(e.nodes.push(t),e.locations=e.locations.filter(e=>e.endpoint!==t.endpoint))},e.removeNodeFromList=function(t,n){e.nodes.splice(t,1),e.locations.push(n)},e.addLocation=function(){r.addLocation().then(t=>{t&&e.locations.push(t)})},e.ok=function(){t.close(e.nodes)},e.cancel=function(){t.dismiss("cancel")}}function p(e,t,n){const o=angular.copy(n.clusterModel);e.clusterNodes=o.nodes,e.clusterNodes.forEach(e=>e.shouldRemove=!1),e.nodesToRemoveCount=0,e.leftNodesLessThanTwo=!1,e.toggleNode=function(t,n){n.shouldRemove=!n.shouldRemove,n.shouldRemove?e.nodesToRemoveCount++:e.nodesToRemoveCount--,e.leftNodesLessThanTwo=e.clusterNodes.length-e.nodesToRemoveCount<2},e.ok=function(){const n=e.clusterNodes.filter(e=>e.shouldRemove);t.close(n)},e.cancel=function(){t.dismiss("cancel")}}m.$inject=["$scope","$uibModalInstance","data","$uibModal","RemoteLocationsService"],p.$inject=["$scope","$uibModalInstance","data"]}}]);