(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{258:function(t,e,r){"use strict";var a=a||{};a.Text=function(){function t(t,e,r,a){r=r||10;var n=e/3;return"string"==typeof t?(n*=10/(t.substring(0,e/3).length+1.5),n+=1,t.match(/[\u0900-\u0DFF\u1100-\u11FF\u2E80-\u2EFF\u3000-\u9FFF]/)&&(n*=.6),n<r&&(n=r),Math.round(n)):(n<r&&(n=r),Math.round(n))}return{calcFontSizeRaw:t,calcFontSize:function(e,r,a,n){return t(e,r,a)+"px"},getTextWithElipsisIfNeeded:function(t,e){return"string"==typeof t&&t.length>e?t.substring(0,e-3)+"...":t}}}(),a.Transition={fadeIn:function(t,e){t.style("opacity",0).transition().duration(e).style("opacity",1)},fadeOut:function(t,e){t.style("opacity",1).transition().duration(e).style("opacity",0)}},a.Click={delayDblClick:function(){var t=d3.dispatch("click","dblclick");return d3.rebind((function(e){var r,a=null;e.on("mousedown",(function(){r=d3.mouse(document.body),new Date})),e.on("mouseup",(function(e){var n,o;n=r,o=d3.mouse(document.body),Math.sqrt(Math.pow(n[0]-o[0],2),Math.pow(n[1]-o[1],2))>5||(a?(window.clearTimeout(a),a=null,t.dblclick(e)):a=window.setTimeout((d3.event,function(){t.click(e),a=null}),250))}))}),t,"on")}},e.a=a},259:function(t,e,r){"use strict";var a=a||{};a.Export={getCSSRules:function(t){var e=$('link[href="'+t+'"]')[0].sheet.rules,r="";return _.each(e,(function(t){r+=t.cssText})),r},generateBase64ImageSource:function(){var t=d3.selectAll("svg").attr({version:"1.1",xmlns:"http://www.w3.org/2000/svg"}).node().parentNode.innerHTML;return"data:image/svg+xml;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(t)))}},e.a=a},85:function(t,e,r){"use strict";r.r(e);var a=r(259),n=r(258);r(5);function o(t,e,r,o,s,i,c,l,d,u,p,f,g){return{restrict:"AE",template:'<div id="domain-range"></div>',scope:{showPredicatesInfoPanel:"=",selectedPredicate:"=",collapseEdges:"="},link:function(u){const p=l((function(){!function(u){d3.selection.prototype.moveToFront=function(){return this.each((function(){d3.select(this.parentNode.appendChild(this))}))},d3.selection.prototype.moveToBack=function(){return this.each((function(){const t=this.parentNode.firstChild;t&&this.parentNode.insertBefore(this,t)}))};var p=d3.layout.force().size([1200,600]).charge(-900),h=p.drag().on("dragstart",(function(t){d3.select(this).classed("selected",t.selected=!0)})),y=d3.select("#domain-range").append("svg").attr("viewBox","0 0 1200 600").attr("preserveAspectRatio","xMidYMid meet").on("dblclick.zoom",null),x=y.append("defs");x.append("marker").attr({id:"arrow",viewBox:"0 -5 10 10",refX:10,refY:0,markerUnits:"strokeWidth",markerWidth:5,markerHeight:5,orient:"auto",fill:f}).append("path").attr({d:"M0,-5L10,0L0,5",class:"arrowHead"}),x.append("marker").attr({id:"collapsed-arrow",viewBox:"0 -5 10 10",refX:9,refY:0,markerUnits:"strokeWidth",markerWidth:4,markerHeight:4,orient:"auto",fill:f}).append("path").attr({d:"M0,-5L10,0L0,5",class:"arrowHead"}),x.append("marker").attr({id:"arrow-loop",viewBox:"0 -5 10 10",refX:7,refY:0,markerUnits:"strokeWidth",markerWidth:5,markerHeight:5,orient:"auto",fill:f}).append("path").attr({d:"M0,-5L10,0L0,5",class:"arrowHead"}),d3.select("#download-svg").on("mouseover",(function(){var t=a.a.Export.getCSSRules("css/domain-range-graph.css?v=2.3.1");$("defs").append('<style type="text/css"><![CDATA['+t+"]]></style>");var e=a.a.Export.generateBase64ImageSource();d3.select(this).attr({href:e,download:"domain-range-graph-"+r.getActiveRepository()+".svg"})}));var m=d3.select(".legend-container").append("svg").attr("viewBox","0 0 "+1200/7+" "+1200/7*1.2).attr("preserveAspectRatio","xMidYMid meet");m.append("rect").attr({width:1200/7,height:1200/7*1.2}).style("fill","rgba(235, 235, 235, 0.9)");var v=16+1200/18/2.5,k=v+1200/90;m.append("circle").attr({class:"legend-class-node",cx:(16+v)/2,cy:30,r:1200/18/4.5});m.append("text").attr({x:k,y:30+1200/370}).style("font-size",1200/90/1.1+"px").text("main class node");m.append("circle").attr({class:"legend-object-node",cx:(16+v)/2,cy:70,r:1200/110/1.25});m.append("text").attr({x:k,y:30+1200/370+40}).style("font-size",1200/90/1.1+"px").text("class node");m.append("circle").attr({class:"legend-datatype-node",cx:(16+v)/2,cy:70+1200/45,r:1200/110/2});m.append("text").attr({x:k,y:99.90990990990991}).style("font-size",1200/90/1.1+"px").text("datatype node");d3.select(".legend-class-node");m.append("line").attr({class:"property-arrow",x1:16,y1:123.33333333333334,x2:v,y2:123.33333333333334}).style("stroke-width",1.2).attr("marker-end","url("+s.absUrl()+"#arrow)"),m.append("text").attr({x:k,y:126.57657657657658}).style("font-size",1200/90/1.1+"px").text("explicit property");m.append("line").attr({class:"implicit-property-arrow",x1:16,y1:150,x2:v,y2:150}).style("stroke-width",1.2).attr("marker-end","url("+s.absUrl()+"#arrow)"),m.append("text").attr({x:k,y:150+1200/370}).style("font-size",1200/90/1.1+"px").text("implicit property");m.append("line").attr({class:"collapsed-property-arrow",x1:16,y1:150+1200/45,x2:v,y2:150+1200/45}).style("stroke-width",2).attr("marker-end","url("+s.absUrl()+"#collapsed-arrow)"),m.append("text").attr({x:k,y:179.9099099099099}).style("font-size",1200/90/1.1+"px").text("collapsed property");var b=y,w=s.search().uri,E=s.search().name,N=s.search().collapsed;o.getDomainRangeData(w,N).success((function(t,e,r){u.domainRangeGraphData=t})).error((function(t){d.error("Request for "+E+" failed!")})),$(window).on("popstate",(function(){i.set(c.DOMAIN_RANGE_WENT_BACK,!0)})),e.onpopstate=function(e){e.state&&t.$broadcast("changeCollapsedEdgesState",e.state.collapsed)},u.$watch("collapseEdges",(function(){angular.isUndefined(u.collapseEdges)||(i.set(c.DOMAIN_RANGE_COLLAPSE_EDGES,u.collapseEdges),"true"!==i.get(c.DOMAIN_RANGE_WENT_BACK)&&function(e){t.$broadcast("switchEdgeMode",{uri:w,name:E,collapsed:e})}(u.collapseEdges),i.remove(c.DOMAIN_RANGE_WENT_BACK))})),u.$watch("domainRangeGraphData",(function(){if(u.domainRangeGraphData){var r=angular.copy(u.domainRangeGraphData);p.nodes(r.nodes).links(r.links);var a=b.selectAll(".link").data(r.links).enter().append("g");function o(t){t.style("stroke",f),t.style("stroke-width",2),t.attr("marker-end","url("+s.absUrl()+"#collapsed-arrow)")}var i,c,d=0;a.each((function(t){if(t.objectPropNodeClassUri!==w)i=a.append("line").attr({class:"link","marker-end":"url("+s.absUrl()+"#arrow)"}).style("stroke-width",1.2).each((function(t){switch(t.propertyType){case"objectLeft":t.targetRadius=1200/18;break;case"objectRight":t.targetRadius=1200/110;break;case"datatype":t.targetRadius=1200/110/2;break;default:t.targetRadius=0}var e=d3.select(this);t.targetNodeEdgeCount>1?o(e):t.implicit&&e.style("stroke-dasharray","3, 3")}));else{if(angular.isUndefined(c)){c=d3.select(this).append("path").attr({d:"M 0 0 A "+1200/18/2+" "+1200/18/2+" 0 1 1 0 "+1200/18/2,class:"loop-link",fill:"none","marker-end":"url("+s.absUrl()+"#arrow-loop)"}).style("stroke-width",1.2)}(d+=t.targetNodeEdgeCount)>1&&o(d3.select(".loop-link"))}}));var y={};function x(){$.isEmptyObject(y)||(y.text.style("fill","black"),y.background.style("fill","#f0f0f0"))}function m(t){x(),y.text=d3.select(this),y.background=d3.select(this.previousSibling),y.text.style("fill","white"),y.background.style("fill",f),l((function(){u.showPredicatesInfoPanel=!0,u.selectedPredicate=t})),d3.event.stopPropagation()}$("document").ready((function(){$("#domain-range").bind("click",x)}));var v=a.append("text").attr("class",(function(t){return t.objectPropNodeClassUri===w?"loop-link-property-name":"property-name"})).attr("dx",(function(t){return 1200/18/2*("objectLeft"===t.propertyType?1:-1)})).style("text-anchor",(function(t){return"objectLeft"===t.propertyType?"end":"start"})).style("font-size",1200/90).text((function(t){return t.targetNodeEdgeCount>1?t.targetNodeEdgeCount+" predicates":t.name}));v.each((function(t){var r=d3.select(this);/\d\spredicates/.test(r.text())?r.style("font-weight","bold").on("click",m):r.on("click",(function(t){e.open("resource?uri="+encodeURIComponent(t.uri),"_blank")}))}));var k=a.append("rect").attr("class",(function(t){return t.objectPropNodeClassUri!==w?"link-background":"loop-link-background"})).attr("width",(function(t){return t.calculatedWidth=this.previousSibling.getBBox().width,t.calculatedWidth+4})).attr("height",(function(t){return t.calculatedHeight=this.previousSibling.getBBox().height,t.calculatedHeight+2})).attr("transform",(function(t){var e=2-1200/18/2*("objectLeft"===t.propertyType?1:-1);return"objectLeft"===t.propertyType&&(e+=t.calculatedWidth),"translate(-"+e+",-"+(2+t.calculatedHeight/2)+")"})).on("click",(function(t){d3.event.stopPropagation()})),N=b.selectAll(".node").data(r.nodes).enter().append("g"),R=N.filter((function(t){return t.objectPropClassUri!==w})).append("circle").each((function(t){var e=d3.select(this);"main"===t.classPosition?e.attr({class:"class-node",r:1200/18}).attr("marker-end","url("+s.absUrl()+"#loop-link)"):null===t.objectPropClassName?e.attr({class:"datatype-node",r:1200/110/2}):e.attr({class:"object-prop-node",r:1200/110})})).call(h);d3.selectAll(".object-prop-node").on("dblclick",(function(e,r){u.$apply((function(){t.$broadcast("reloadDomainRangeGraphView",e,r)}))})),N.filter((function(t){return t.objectPropClassName&&t.objectPropClassUri!==w})).append("text").attr("class",(function(t){return t.classPosition+"-class-label"})).style("font-size",1200/90).text((function(t){return t.objectPropClassName})).on("click",(function(t){e.open("resource?uri="+encodeURIComponent(t.objectPropClassUri),"_blank")}));var C=N.select("text");b.select(".class-node").each((function(){d3.select(this.parentNode).append("text").attr("class","rdf-class-label").style("font-size",(function(t){return n.a.Text.calcFontSize(E,1200/18)})).text(E).on("click",(function(t){e.open("resource?uri="+encodeURIComponent(w),"_blank")}))}));var T=b.select(".class-node + text"),A=d3.select(".class-node"),L=d3.selectAll(".loop-link-background"),_=d3.selectAll(".loop-link-property-name");if(v=d3.selectAll(".property-name"),!angular.isUndefined(c)){var M=[];L.each((function(t,e){d3.select(this);M.push({idx:e,width:t.calculatedWidth,height:t.calculatedHeight})}))}p.on("tick",(function(t){var e=8*t.alpha;function r(t){var e=t.x+1200/18*2,r=t.y-1200/18/1.9;var a=[];L.each((function(n,o){a.push(n),o<g?function(a,n){var o=$.grep(M,(function(t){return t.idx==n}));n>0&&(e+=parseFloat(n*(o[0].height/(n/1.4)))),a.attr({transform:"rotate(270, "+t.x+","+t.y+") translate("+e+","+r+")",width:o[0].height,height:o[0].width})}(d3.select(this),o):d3.select(this).remove()})),function(t){var e;d3.select(".view-more-preds-label").style("font-weight","bold").each((function(r){r.target.allEdges=t,e=this.getComputedTextLength()})).on("click",m),d3.select(".view-more-preds-rect").attr("height",e+4)}(a)}i.filter((function(t){return t.objectPropNodeClassUri!==w})).attr("x1",(function(t){return t.source.x})).attr("y1",(function(t){return t.source.y})).attr("x2",(function(t){return t.targetX})).attr("y2",(function(t){return t.targetY})).each((function(t){!function(t){"objectLeft"===t.propertyType?(t.source.x-=8*e,t.source.y-=e/9):(t.target.x+=8*e,t.target.y-=e/9)}(t);var r=Math.atan2(t.target.y-t.source.y,t.target.x-t.source.x);t.targetX=t.target.x-Math.cos(r)*t.targetRadius,t.targetY=t.target.y-Math.sin(r)*t.targetRadius})),R.each((function(t){"main"!==t.classPosition||angular.isUndefined(c)||(!function(t){var e=t.x+64,r=t.y-1200/18/5.7-5;c.attr("transform","rotate(270, "+t.x+","+t.y+") translate("+e+","+r+")")}(t),function(t){function e(e,r){var a=$.grep(M,(function(t){return t.idx==r})),n=0;r>0&&(n=parseFloat(2*r*(a[0].height/1.4)));var o=t.x,s=t.y-1200/18*2.1-n;e.attr({x:o,y:s}).moveToFront()}_.each((function(t,r){var a=d3.select(this),n=_.size()-g;n<0?e(a,r):(0==r&&!u.collapseEdges&&n>1&&(!function(t,e,r){t.classed("view-more-preds-label",!0).text(r+" predicates more ..."),null!==this.nextSibling&&e.classed("view-more-preds-rect",!0)}(a,d3.select(this.nextSibling),n),e(a,r)),r<g?e(a,r):a.remove())}))}(t),r(t)),t.objectPropClassUri!==w&&d3.select(this).attr("cx",(function(t){return"main"===t.classPosition?function(t){!window.ActiveXObject&&"ActiveXObject"in window&&(Math.log10=function(t){return Math.log(t)/Math.LN10});var e=A.attr("cx")-600,r=.5*Math.log10(Math.abs(e));return t.x+=e>0?-r:r,t.x}(t):t.x})).attr("cy",(function(t){return t.y}))})),T.attr("x",(function(t){return t.x})).attr("y",(function(t){return t.y})).moveToFront(),k.filter((function(t){return t.objectPropNodeClassUri!==w})).attr("x",(function(t){return t.target.x>t.source.x?t.source.x+(t.target.x-t.source.x)/2:t.target.x+(t.source.x-t.target.x)/2})).attr("y",(function(t){return t.target.y>t.source.y?t.source.y+(t.target.y-t.source.y)/2:t.target.y+(t.source.y-t.target.y)/2})).moveToFront(),v.attr("x",(function(t){return t.target.x>t.source.x?t.source.x+(t.target.x-t.source.x)/2:t.target.x+(t.source.x-t.target.x)/2})).attr("y",(function(t){return t.target.y>t.source.y?t.source.y+(t.target.y-t.source.y)/2:t.target.y+(t.source.y-t.target.y)/2})).moveToFront(),C.attr("x",(function(t){return"right"===t.classPosition?t.x+1200/110*1.2:t.x-1200/110*1.2})).attr("y",(function(t){return t.y})).moveToFront()})).linkDistance(1200/3.5).start()}}))}(u)}),50);u.$on("$destroy",(function(){l.cancel(p)}))}}}angular.module("graphdb.framework.graphexplore.directives.domainrange",["graphdb.framework.graphexplore.controllers.domainrange","graphdb.framework.utils.localstorageadapter"]).constant("ONTO_RED","var(--onto-orange)").constant("ONTO_GREEN","var(--onto-green)").constant("ONTO_BLUE","var(--onto-blue)").constant("NON_COLLAPSED_REFLEXIVE_LINK_LIMIT",6).directive("domainRangeGraph",o),o.$inject=["$rootScope","$window","$repositories","GraphDataRestService","$location","LocalStorageAdapter","LSKeys","$timeout","toastr","ONTO_RED","ONTO_GREEN","ONTO_BLUE","NON_COLLAPSED_REFLEXIVE_LINK_LIMIT"]}}]);