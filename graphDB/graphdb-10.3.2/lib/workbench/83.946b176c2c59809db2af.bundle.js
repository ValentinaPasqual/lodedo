(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{125:function(e,t){const n=(e,t,n,l)=>{e.$location.url("/hierarchy"),e.$route.reload(),e.GuideUtils.waitFor(t,3).then(()=>{e.GuideUtils.classHierarchyFocus(t),e.GuideUtils.deferredShow(500)().then(()=>n())}).catch(e=>l(e))};PluginRegistry.add("guide.step",[{guideBlockName:"class-hierarchy",getSteps:(e,t)=>{const n=t.GuideUtils;e.mainAction="class-hierarchy";const l=[{guideBlockName:"click-main-menu",options:angular.extend({},{menu:"class-hierarchy",showIntro:!0},e)},{guideBlockName:"read-only-element",options:angular.extend({},{content:"guide.step_plugin.class_hierarchy_intro.content",url:"/hierarchy",elementSelector:"#classChart",placement:"left"},e)}];return e.introExtraContent&&l.push({guideBlockName:"read-only-element",options:angular.extend({},{content:"",extraContent:e.introExtraContent,url:"/hierarchy",elementSelector:"#classChart #main-group",placement:"left"},e)}),angular.isArray(e.zoomIris)&&e.zoomIris.forEach(t=>{const o=n.getGuideElementSelector("class-"+t.iri);l.push({guideBlockName:"clickable-element",options:angular.extend({},{content:"guide.step_plugin.class_hierarchy_zoom.content",url:"/hierarchy",placement:"left",elementSelector:o,onNextClick:(e,t)=>{n.classHierarchyZoom(t.elementSelector),e.next()}},e,t)}),t.postExtraContent&&l.push({guideBlockName:"read-only-element",options:angular.extend({},{content:"",extraContent:t.postExtraContent,url:"/hierarchy",placement:"left",beforeShowPromise:n.deferredShow(800),elementSelector:o},e)})}),l}},{guideBlockName:"class-hierarchy-instances",getSteps:(e,t)=>{const l=t.GuideUtils,o=t.$location,r=t.$route;e.title="guide.step_plugin.class-hierarchy-instances.title";const c=l.getGuideElementSelector("close-info-panel"),i=l.getGuideElementSelector("class-"+e.iri),a=[{guideBlockName:"clickable-element",options:angular.extend({},{content:"guide.step_plugin.class-hierarchy-instances.content",url:"/hierarchy",elementSelector:i,onNextClick:e=>{l.classHierarchyFocus(i),e.next()},initPreviousStep:()=>new Promise((e,t)=>{l.isVisible(c)?e():n({$location:o,$route:r,GuideUtils:l},i,e,t)})},e)},{guideBlockName:"read-only-element",options:angular.extend({},{content:"guide.step_plugin.class-hierarchy-instances-side-panel.content",url:"/hierarchy",elementSelector:".rdf-info-side-panel div",canBePaused:!1,placement:"left",beforeShowPromise:l.deferredShow(800),onPreviousClick:()=>new Promise((function(e){l.waitFor(c,1).then(()=>$(c).trigger("click")),e()}))},e)}];angular.isArray(e.focusInstances)&&e.focusInstances.forEach(t=>{angular.isObject(t)||(t={instance:t}),a.push({guideBlockName:"read-only-element",options:angular.extend({},{content:"guide.step_plugin.class-hierarchy-instances-focus.content",url:"/hierarchy",canBePaused:!1,elementSelector:l.getGuideElementSelector("instance-"+t.instance),focusInstance:t.instance,extraContent:t.message},e)})});const s=l.getGuideElementSelector("instances-count");return e.followCountLink&&(a.push({guideBlockName:"clickable-element",options:angular.extend({},{content:"guide.step_plugin.class-hierarchy-instances-count.content",url:"/hierarchy",canBePaused:!1,elementSelector:s,onNextClick:(e,t)=>{l.waitFor(t.elementSelector,3).then(()=>$(t.elementSelector).trigger("click")),e.next()}},e)}),a.push({guideBlockName:"read-only-element",options:angular.extend({},{content:"guide.step_plugin.class-hierarchy-instances-query.content",url:"/sparql",elementSelector:l.getSparqlEditorSelector(),scrollToHandler:l.scrollToTop},e)}),a.push({guideBlockName:"read-only-element",options:angular.extend({},{content:"guide.step_plugin.class-hierarchy-instances-results.content",extraContent:!1!==e.showExtraCommentSparql?"guide.step_plugin.class-hierarchy-instances-results.extraContent":null,url:"/sparql",placement:"top",elementSelector:l.getSparqlResultsSelector(),fileName:e.fileName,scrollToHandler:l.scrollToTop,onNextClick:e=>{window.history.back(),e.next()},initPreviousStep:()=>Promise.resolve()},e)})),a.push({guideBlockName:"clickable-element",options:angular.extend({},{content:"guide.step_plugin.class-hierarchy-instances-side-panel-close.content",url:"/hierarchy",canBePaused:!1,elementSelector:c,placement:"left",beforeShowPromise:e.followCountLink?l.deferredShow(1500):Promise.resolve(),advanceOn:{selector:c,event:"click"},onNextClick:()=>l.waitFor(c,3).then(()=>$(c).trigger("click")),initPreviousStep:(t,c)=>new Promise((a,u)=>{t.ShepherdService.getCurrentStepId()===c&&e.followCountLink?l.waitFor(s,3).then(()=>{$(s).trigger("click"),l.waitFor(l.getSparqlResultsSelector(),3).then(()=>{l.deferredShow(50)().then(()=>a()).catch(e=>u(e))}).catch(e=>u(e)),a()}).catch(e=>u(e)):n({$location:o,$route:r,GuideUtils:l},i,a,u)})},e)}),a}}])}}]);