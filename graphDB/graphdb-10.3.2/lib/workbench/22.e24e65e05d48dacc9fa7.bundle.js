(window.webpackJsonp=window.webpackJsonp||[]).push([[22,54,108,109,125],{100:function(e,r){function t(e,r,t,o){return{restrict:"E",scope:!0,templateUrl:"js/angular/repositories/templates/fedx-repo.html",link:function(n){const s="ResolvableRepository";n.fedxMembers=[],n.knownRepos=[],n.allAttachedRepos=[],n.editRepoPage&&(n.fedxMembers=n.repositoryInfo.params.member.value.slice());function i(){for(const e of n.fedxMembers)n.knownRepos=n.knownRepos.filter((function(r){return e.repositoryServer?r.id!==e.repositoryName||r.location!==e.repositoryServer:r.id!==e.repositoryName||!r.local}))}function a(){r.getRepositories(n.repositoryInfo.location).success((function(e){let r=[];_.values(e).forEach(e=>{r.push.apply(r,e)}),n.allAttachedRepos=_.cloneDeep(r)})).error((function(e){const r=getError(e);t.error(r,o.instant("common.error"))})).then((function(){n.knownRepos=n.allAttachedRepos.slice(),i()}))}n.setWritableRepo=function(e){let r=n.fedxMembers.find(e=>"true"===e.writable);r&&((r.store!==s||e.store===s&&r.repositoryName===e.repositoryName)&&("RemoteRepository"!==r.store||"RemoteRepository"===e.store&&r.repositoryName===e.repositoryName&&r.repositoryServer===e.repositoryServer)||(r.writable="false")),e.writable=JSON.stringify("false"===e.writable)},n.getActiveClass=function(e){return"true"===e.writable?" active":""},n.checkIfRepoExist=function(e){return!n.allAttachedRepos.length||(e.store===s?n.allAttachedRepos.find(r=>r.id===e.repositoryName&&!r.location):"RemoteRepository"!==e.store||n.allAttachedRepos.find(r=>r.id===e.repositoryName&&r.location===e.repositoryServer))},n.getRepositoryServer=function(e){return e.local?"Local":e.location};const c=setInterval((function(){a()}),5e3);function l(e){n.fedxMembers.push(e),n.repositoryInfo.params.member.value=n.fedxMembers}function p(e){return"/"===e.slice(-1)?e.slice(0,-1):e}function d(){return n.editRepoPage&&!n.editRepoPage||!n.model.editMode}n.$on("$destroy",(function(){clearInterval(c)})),n.addMember=function(e){let r;r="Local"===n.getRepositoryServer(e)?{store:s,repositoryName:e.id,repoType:e.type,respectRights:"true",writable:"false"}:{store:"RemoteRepository",repositoryName:e.id,repositoryServer:e.location,username:"",password:"",supportsASKQueries:"true",writable:"false"},n.knownRepos=n.knownRepos.filter(r=>r.id!==e.id||r.location!==e.location),l(r)},n.removeMember=function(e){e.store&&e.store===s?(n.fedxMembers=n.fedxMembers.filter(r=>r.store!==e.store||r.repositoryName!==e.repositoryName&&!r.repositoryServer),a()):e.store&&"SPARQLEndpoint"===e.store?n.fedxMembers=n.fedxMembers.filter(r=>r.endpoint!==e.endpoint):e.store&&"NativeStore"===e.store?n.fedxMembers=n.fedxMembers.filter(r=>r.repositoryLocation!==e.repositoryLocation):e.store&&"RemoteRepository"===e.store&&(n.fedxMembers=n.fedxMembers.filter(r=>r.store!==e.store||r.repositoryName!==e.repositoryName||r.repositoryServer!==e.repositoryServer),a()),n.repositoryInfo.params.member.value=n.fedxMembers},n.addRemoteMember=function(){n.mode="remote",n.model={editMode:!1,store:"RemoteRepository",repositoryName:"",repositoryServer:"",sparqlEndpoint:"",username:"",password:"",supportsASKQueries:"true",writable:"false"},n.$uibModalInstance=e.open({templateUrl:"js/angular/templates/modal/add-fedx-remote-repo.html",scope:n})},n.getMemberIcon=function(e){return e.repoType?"icon-repo-"+e.repoType:"NativeStore"===e.store?"icon-warning":"icon-link"},n.editFedXRepository=function(r){r.store===s?(n.mode="local",n.model={editMode:!0,store:r.store,respectRights:r.respectRights,repositoryName:r.repositoryName,repoType:r.repoType,writable:r.writable}):(n.mode="remote",n.model={editMode:!0,store:r.store,repositoryName:r.repositoryName,repositoryServer:r.repositoryServer,sparqlEndpoint:"SPARQLEndpoint"===r.store?r.endpoint:r.repositoryLocation,username:r.username,password:r.password,supportsASKQueries:r.supportsASKQueries,writable:r.writable}),n.$uibModalInstance=e.open({templateUrl:"js/angular/templates/modal/add-fedx-remote-repo.html",scope:n})},n.resolveName=function(e){switch(e.store){case s:return e.repositoryName;case"RemoteRepository":return e.repositoryName+"@"+e.repositoryServer;case"SPARQLEndpoint":return e.endpoint;case"NativeStore":return e.repositoryLocation;default:return""}},n.cancel=function(){n.$uibModalInstance.dismiss("cancel")},n.ok=function(){let e;if(n.model.repositoryName&&n.model.store===s)e={store:s,repositoryName:n.model.repositoryName,repoType:n.model.repoType,respectRights:n.model.respectRights,writable:n.model.writable},n.fedxMembers=n.fedxMembers.filter(r=>r.repositoryName!==e.repositoryName||r.store!==e.store);else if(n.model.repositoryName&&"RemoteRepository"===n.model.store){if(e={store:"RemoteRepository",repositoryName:n.model.repositoryName,repositoryServer:p(n.model.repositoryServer),username:n.model.username,password:n.model.password,writable:n.model.writable},d()&&n.fedxMembers.find(r=>r.repositoryName===e.repositoryName&&r.repositoryServer===e.repositoryServer)){let r=n.resolveName(e);return t.error(o.instant("fedx.repo.already.added.member.error",{name:r})),void n.$uibModalInstance.close()}n.fedxMembers=n.fedxMembers.filter(r=>r.repositoryName!==e.repositoryName||r.repositoryServer!==e.repositoryServer)}else{if(e={store:"SPARQLEndpoint",endpoint:p(n.model.sparqlEndpoint),username:n.model.username,password:n.model.password,supportsASKQueries:n.model.supportsASKQueries,writable:n.model.writable},d()&&n.fedxMembers.find(r=>r.endpoint===e.endpoint)){let r=n.resolveName(e);return t.error(o.instant("fedx.repo.already.added.sparql.endpoint.error",{name:r})),void n.$uibModalInstance.close()}n.fedxMembers=n.fedxMembers.filter(r=>r.endpoint!==e.endpoint)}l(e),i(),n.$uibModalInstance.close()},n.$on("changedLocation",(function(){n.fedxMembers=[],a()})),a()}}}angular.module("graphdb.framework.repositories.fedx-repo.directive",[]).directive("fedxRepo",t),t.$inject=["$uibModal","RepositoriesRestService","toastr","$translate"]},101:function(e,r,t){"use strict";t.r(r);t(4),t(11),t(8),t(65),t(21),t(12),t(35),t(36);function o(e){e.interceptors.push("$unauthorizedInterceptor")}function n(e,r,t){e.$on("$locationChangeStart",(function(){t.isLicenseHardcoded&&"/license/register"===r.url()&&r.path("license")}))}angular.module("graphdb.framework.settings",["toastr","ui.bootstrap","graphdb.framework.rest.license.service","graphdb.framework.settings.controllers","graphdb.framework.core.interceptors.unauthorized","graphdb.framework.core.services.jwtauth"]).config(o).run(n),o.$inject=["$httpProvider","$routeProvider"],n.$inject=["$rootScope","$location","$licenseService"]},107:function(e,r,t){"use strict";t.r(r);var o=t(66);const n={OBDA:"obdaFile",OWL:"owlFile",CONSTRAINT:"constraintFile",LENSES:"lensesFile",DB_METADATA:"dbMetadataFile"};class s{constructor(e="generic"){this.driverType=e,this.hostName="",this.port=void 0,this.databaseName="",this.username="",this.password="",this.driverClass="",this.url="",this.urlUserInput=""}}class i{constructor(e,r=!1){this.type=e,this.fileName="",this.loading=!1,this.required=r}}class a extends Error{}const c="generic",l="dremio",p="databricks",d="snowflake";class m{constructor(){this.classAvailable=!1,this.downloadDriverUrl="",this.driverClass="",this.driverName="",this.driverType="",this.portRequired=!1,this.urlTemplate=""}static isGenericDriver(e){return e===c}static isSnowflakeDriver(e){return e===d}}function f(e,r,t,f,u){return{restrict:"E",scope:!1,templateUrl:"js/angular/repositories/templates/ontop-repo.html",link:function(v){v.isGenericDriver=!0,v.defaultUrlTemplate="jdbc:database://localhost:port/database_name",v.ontopProperiesLink="https://ontop-vkg.org/guide/advanced/configuration.html",v.ontopFileType=n,v.selectedDriver=new m,v.supportedDriversData=[],v.formData={connectionInformation:new s,settings:{additionalProperties:"",ontopFiles:[]}},v.selectDriver=e=>{v.selectedDriver=v.supportedDriversData.find(r=>r.driverType===e),v.isGenericDriver=m.isGenericDriver(v.selectedDriver.driverType),v.editRepoPage&&v.currentOntopRepoInfo&&v.currentOntopRepoInfo.connectionInformation.driverType===e?v.formData=angular.copy(v.currentOntopRepoInfo):(L(),v.formData.connectionInformation.driverType=v.selectedDriver.driverType),v.formData.connectionInformation.driverClass=v.selectedDriver.driverClass,v.updateUrl()},v.getOntopFileInfo=e=>v.formData.settings.ontopFiles.find(r=>e===r.type),v.getHostNameLabel=()=>{const e=m.isSnowflakeDriver(v.selectedDriver.driverType)?"ontop.repo.database.snowflake.host_name":"ontop.repo.database.host_name";return u.instant(e)+"*"},v.getDatabaseNameLabel=()=>{let e="";switch(v.selectedDriver.driverType){case d:e="ontop.repo.database.warehouse.database_name";break;case p:e="ontop.repo.database.http_path.database_name";break;case l:e="ontop.repo.database.schema.database_name";break;default:e="ontop.repo.database.database_name"}return u.instant(e)},v.updateUrl=()=>{const e=y()||"";v.formData.connectionInformation.url=e+v.formData.connectionInformation.urlUserInput},v.isTestConnectionDisabled=()=>{const e=v.formData.connectionInformation,r=v.selectedDriver;return!(e.driverClass&&e.url&&(!r.portRequired||e.port))||!(m.isGenericDriver(r.driverType)||e.hostName&&e.databaseName)},v.testConnection=()=>{I().then(T).then(R).then(S).then(k).then(D).then(()=>r.validateOntopPropertiesConnection(v.repositoryInfo)).then(()=>t.success(u.instant("ontop.repo.successful.connection.msg"))).catch(e=>{e instanceof a?t.error(e.message):N(u.instant("ontop.repo.failed.to.connect"),e)})},v.editFile=t=>{const n=v.repositoryInfo.params[t.type].label,s=u.instant("update.file.edit.content.header",{fileName:n});e.open({templateUrl:"js/angular/templates/modal/editRepoFile.html",controller:"EditRepositoryFileCtrl",windowClass:"update-ontop-repo-dialog",resolve:{file:()=>{const e=v.repositoryInfo.params[t.type];return e?e.value:""},dialogTitle:()=>s}}).result.then(e=>{r.updateRepositoryFileContent(e.fileLocation,e.content,v.repositoryInfo.location).success(e=>{t.fileName=Object(o.getFileName)(e.fileLocation),v.repositoryInfo.params[t.type].value=e.fileLocation}).error(e=>{N(u.instant("common.error"),e)})})},v.uploadOntopFile=(e,r)=>{if(e&&e.length){const o=e[0];r.loading=!0;const n={url:"rest/repositories/file/upload",data:{file:o,location:v.repositoryInfo.location}};f.upload(n).success(e=>{e.success?(r.fileName=o.name,v.repositoryInfo.params[r.type].value=e.fileLocation):t.error(e.errorMessage)}).error(e=>{N(u.instant("common.error"),e),v.uploadFile=""}).finally(()=>{r.loading=!1})}},v.updateOntopRepo=()=>{const e=v.editRepoPage?v.editRepository:v.createRepo;$().then(I).then(T).then(R).then(S).then(k).then(M).then(D).then(e).catch(e=>{e instanceof a?t.error(e.message):console.log(e)})},v.onKeyDownInUrlInput=e=>{const r=e.keyCode;if(37===r||39===r||36===r||35===r)return;const t=y();if(!t)return;const o=e.ctrlKey||e.metaKey;if(o&&65===r||o&&67===r)return;const n=e.target.selectionStart;8===r&&n-1<t.length&&(e.preventDefault(),e.stopPropagation()),n<t.length&&(e.preventDefault(),e.stopPropagation())},v.onKeyUpInUrlInput=()=>{g()};const g=()=>{const e=y();e&&v.formData.connectionInformation.url.startsWith(e)?v.formData.connectionInformation.urlUserInput=v.formData.connectionInformation.url.substring(e.length):v.formData.connectionInformation.urlUserInput=v.formData.connectionInformation.url},y=()=>m.isSnowflakeDriver(v.selectedDriver.driverType)?b():h(),b=()=>{let e=v.selectedDriver.urlTemplate;const r=v.formData.connectionInformation;return r.hostName&&(e=e.replace("{identifier}",r.hostName)),r.port&&(e=e.replace(".snowflakecomputing.com/?",`.snowflakecomputing.com:${r.port}/?`)),r.databaseName&&(e=e.replace("{database}",r.databaseName)),e},h=()=>{let e=v.selectedDriver.urlTemplate;const r=v.formData.connectionInformation;return r.hostName&&(e=r.port?e.replace("{hostport}",`${r.hostName}:${r.port}`):e.replace("{hostport}",""+r.hostName)),r.databaseName&&(e=e.replace("{database}",r.databaseName)),e},w=e=>{v.formData.settings.ontopFiles.forEach(r=>{r.loading=e})},D=()=>{w(!0);const e=v.formData.connectionInformation,t={hostName:e.hostName,port:e.port,databaseName:e.databaseName,userName:e.username,password:e.password,driverClass:e.driverClass,url:e.url,additionalProperties:v.formData.settings.additionalProperties};return r.updatePropertiesFile(v.repositoryInfo.params.propertiesFile.value,t,v.repositoryInfo.location,v.selectedDriver.driverType).success(e=>{v.repositoryInfo.params.propertiesFile.value=e.fileLocation}).error(e=>{N(u.instant("common.error"),e)}).finally(()=>w(!1))},N=(e,r)=>{const o=getError(r);t.error(o,e)},I=()=>m.isGenericDriver(v.selectedDriver.driverType)||v.formData.connectionInformation.hostName?Promise.resolve():Promise.reject(new a(u.instant("missing.required.field",{fieldName:u.instant("ontop.repo.database.host_name")}))),R=()=>m.isGenericDriver(v.selectedDriver.driverType)||v.formData.connectionInformation.databaseName?Promise.resolve():Promise.reject(new a(u.instant("missing.required.field",{fieldName:u.instant("ontop.repo.database.database_name")}))),S=()=>v.formData.connectionInformation.driverClass?Promise.resolve():Promise.reject(new a(u.instant("missing.required.field",{fieldName:u.instant("ontop.repo.database.driver_class")}))),k=()=>v.formData.connectionInformation.url?Promise.resolve():Promise.reject(new a(u.instant("missing.required.field",{fieldName:u.instant("ontop.repo.database.url")}))),$=()=>v.repositoryInfo.id?Promise.resolve():Promise.reject(new a(u.instant("empty.repoid.warning"))),M=()=>v.getOntopFileInfo(n.OBDA).fileName?Promise.resolve():Promise.reject(new a(u.instant("ontop.repo.missing.required.file",{fileName:v.repositoryInfo.params[n.OBDA].label}))),T=()=>v.selectedDriver.portRequired&&!v.formData.connectionInformation.port?Promise.reject(new a(u.instant("missing.required.field",{fieldName:u.instant("ontop.repo.database.port")}))):Promise.resolve(),L=()=>{v.formData={connectionInformation:new s,settings:{additionalProperties:"",ontopFiles:[]}},Object.values(n).forEach(e=>{const r=new i(e);v.formData.settings.ontopFiles.push(r)}),v.getOntopFileInfo(n.OBDA).required=!0};r.getSupportedDriversData(v.repositoryInfo).success(e=>{v.supportedDriversData=e}).error(e=>{N(u.instant("common.error"),e)}).then(()=>{v.editRepoPage?(w(!0),r.loadPropertiesFile(v.repositoryInfo.params.propertiesFile.value,v.repositoryInfo.location,v.selectedDriver.driverType).success(e=>{let r=v.supportedDriversData.find(r=>r.driverClass===e.driverClass);r&&e.hostName||(r=v.supportedDriversData.find(e=>m.isGenericDriver(e.driverType))),v.selectDriver(r.driverType),v.formData.connectionInformation.driverType=r.driverType,v.formData.connectionInformation.driverClass=e.driverClass,v.formData.connectionInformation.password=e.password,v.formData.connectionInformation.username=e.userName,v.formData.connectionInformation.url=e.url,v.formData.settings.additionalProperties=e.additionalProperties,m.isGenericDriver(r.driverType)||(v.formData.connectionInformation.hostName=e.hostName,v.formData.connectionInformation.databaseName=e.databaseName,v.formData.connectionInformation.port=e.port?parseInt(e.port,10):void 0),g(),v.updateUrl(),Object.values(n).forEach(e=>{const r=v.repositoryInfo.params[e],t=v.getOntopFileInfo(e);r&&(t.fileName=Object(o.getFileName)(r.value))}),v.currentOntopRepoInfo=angular.copy(v.formData)}).error(e=>{N(u.instant("common.error"),e)}).finally(()=>{w(!1)})):v.selectDriver(c)})}}}angular.module("graphdb.framework.repositories.ontop-repo.directive",[]).directive("ontopRepo",f),f.$inject=["$uibModal","RepositoriesRestService","toastr","Upload","$translate"]},151:function(e,r,t){"use strict";t.r(r);t(4),t(11),t(17),t(66),t(107),t(100),t(10),t(101),t(35),t(36);angular.module("graphdb.framework.repositories",["ui.bootstrap","toastr","ngCookies","ngRoute","graphdb.framework.repositories.controllers","graphdb.framework.repositories.ontop-repo.directive","graphdb.framework.repositories.fedx-repo.directive","graphdb.framework.core.services.repositories","graphdb.framework.core.directives","graphdb.framework.core.controllers","graphdb.framework.settings"])},65:function(e,r,t){"use strict";t.r(r);t(4),t(12);function o(e,r,t,o,n){e.supportsStatistics=!0,e.settings={statistics:!1},e.getSettings=function(){e.loader=!0,o.getStatistics().then((function(r){e.settings.statistics="true"===r.data,e.supportsStatistics=!0}),(function(t){if(404===t.status)e.supportsStatistics=!1;else{const e=getError(t.data);r.error(e,n.instant("error.getting.settings"))}}))},e.getSettings(),e.setSettings=function(){e.loader=!0,o.toggleStatistics(e.settings.statistics).then((function(){t.close(),r.success(n.instant("saving.settings.success"))}),(function(e){const t=getError(e.data);r.error(t,n.instant("saving.settings.error"))}))},e.submitForm=function(){e.setSettings()},e.cancel=function(){t.dismiss("cancel")}}function n(e,r,t,o,n,s,i){e.loadingLicense=function(){return t.loadingLicense},t.checkLicenseStatus(),e.revertToFree=function(){s.openSimpleModal({title:i.instant("confirm.operation"),message:i.instant("revert.to.free.warning.msg"),warning:!0}).result.then((function(){r.unregisterLicense().success((function(){t.checkLicenseStatus()}))}))}}function s(e,r,t,o,n,s,i,a){e.$on("securityInit",(function(){i.isAdmin()||t.path("/license")})),e.sendLicenseToValidateAndActivate=l;const c=$(".license-textarea");function l(e){r.sendLicenseToValidate(e).success((function(t){"Invalid"!==t.licensee?(c.val(e),function(e,t){o.open({templateUrl:"js/angular/settings/modal/validate-license.html",controller:"ValidateLicenseModalCtrl",size:"lg",resolve:{license:function(){return e}}}).result.then((function(){!function(e){e||(e=c.val());if(e){const t=atob(e.replace(/\s/g,""));r.registerLicense(t).success((function(){s.history.back()})).error((function(){n.error(a.instant("license.register.error"))}))}else n.error(a.instant("no.license.code.error"))}(t)}))}(t,e)):(c.val(""),n.error(t.message))})).error((function(){n.error(a.instant("invalid.license"))}))}e.$watch("currentFile",(function(){if(e.currentFile){const t=e.currentFile;r.extractFromLicenseFile(t).success((function(e){l(e)})).error((function(){n.error(a.instant("could.not.upload.file.error"))}))}})),e.getBackToPreviousPage=function(){s.history.back()}}function i(e,r,t){e.ok=function(){r.close()},e.cancel=function(){r.dismiss("cancel")},e.license=t}function a(e){e.loader=!0,e.setLoader=function(r){e.loader=r}}angular.module("graphdb.framework.settings.controllers",["ngCookies","ui.bootstrap","graphdb.framework.core.services.jwtauth","toastr"]).controller("ActiveLocationSettingsCtrl",o).controller("ValidateLicenseModalCtrl",i).controller("LicenseCtrl",n).controller("RegisterLicenseCtrl",s).controller("LoaderSamplesCtrl",a),o.$inject=["$scope","toastr","$uibModalInstance","LicenseRestService","$translate"],n.$inject=["$scope","LicenseRestService","$licenseService","toastr","$rootScope","ModalService","$translate"],s.$inject=["$scope","LicenseRestService","$location","$uibModal","toastr","$window","$jwtAuth","$translate"],i.$inject=["$scope","$uibModalInstance","license"],a.$inject=["$scope"]}}]);