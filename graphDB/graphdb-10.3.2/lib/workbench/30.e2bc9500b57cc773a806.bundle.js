(window.webpackJsonp=window.webpackJsonp||[]).push([[30,59],{255:function(t,e,n){var o,r,a;r=[],void 0===(a="function"==typeof(o=function(){return function(){var t=function(){return"n"},e=function(){return[0,0]},n=function(){return" "},o=u(),r=null,a=null,s=null,l=null;function c(t){var e;r="svg"===(e=(e=t).node()).tagName.toLowerCase()?e:e.ownerSVGElement,a=r.createSVGPoint(),document.body.appendChild(o)}c.show=function(){var o=Array.prototype.slice.call(arguments);o[o.length-1]instanceof SVGElement&&(s=o.pop());var r,a=n.apply(this,o),u=e.apply(this,o),p=t.apply(this,o),h=f(),g=i.length,y=document.documentElement.scrollTop||document.body.scrollTop,_=document.documentElement.scrollLeft||document.body.scrollLeft,m=l.apply(this,o);for(h.html(a).style({opacity:1,"pointer-events":"all"});g--;)h.classed(i[g],!1);return r=d.get(p).apply(this),m?h.style(m):h.classed(p,!0).style({top:r.top+u[0]+y+"px",left:r.left+u[1]+_+"px"}),c},c.hide=function(){return f().style({opacity:0,"pointer-events":"none"}),c},c.attr=function(t,e){if(arguments.length<2&&"string"==typeof t)return f().attr(t);var n=Array.prototype.slice.call(arguments);return d3.selection.prototype.attr.apply(f(),n),c},c.style=function(t,e){if(arguments.length<2&&"string"==typeof t)return f().style(t);var n=Array.prototype.slice.call(arguments);return d3.selection.prototype.style.apply(f(),n),c},c.direction=function(e){return arguments.length?(t=null==e?e:d3.functor(e),c):t},c.offset=function(t){return arguments.length?(e=null==t?t:d3.functor(t),c):e},c.html=function(t){return arguments.length?(n=null==t?t:d3.functor(t),c):n},c.customPosition=function(t){return arguments.length?(l=null==t?t:d3.functor(t),c):l},c.destroy=function(){return o&&(f().remove(),o=null),c};var d=d3.map({n:function(){var t=p();return{top:t.n.y-o.offsetHeight,left:t.n.x-o.offsetWidth/2}},s:function(){var t=p();return{top:t.s.y,left:t.s.x-o.offsetWidth/2}},e:function(){var t=p();return{top:t.e.y-o.offsetHeight/2,left:t.e.x}},w:function(){var t=p();return{top:t.w.y-o.offsetHeight/2,left:t.w.x-o.offsetWidth}},nw:function(){var t=p();return{top:t.nw.y-o.offsetHeight,left:t.nw.x-o.offsetWidth}},ne:function(){var t=p();return{top:t.ne.y-o.offsetHeight,left:t.ne.x}},sw:function(){var t=p();return{top:t.sw.y,left:t.sw.x-o.offsetWidth}},se:function(){var t=p();return{top:t.se.y,left:t.e.x}}}),i=d.keys();function u(){var t=d3.select(document.createElement("div"));return t.style({position:"absolute",top:0,opacity:0,"pointer-events":"none","box-sizing":"border-box"}),t.node()}function f(){return null===o&&(o=u(),document.body.appendChild(o)),d3.select(o)}function p(){for(var t=s||d3.event.target;void 0===t.getScreenCTM&&"undefined"===t.parentNode;)t=t.parentNode;var e={},n=t.getScreenCTM(),o=t.getBBox(),r=o.width,l=o.height,c=o.x,d=o.y;return a.x=c,a.y=d,e.nw=a.matrixTransform(n),a.x+=r,e.ne=a.matrixTransform(n),a.y+=l,e.se=a.matrixTransform(n),a.x-=r,e.sw=a.matrixTransform(n),a.y-=l/2,e.w=a.matrixTransform(n),a.x+=r,e.e=a.matrixTransform(n),a.x-=r/2,a.y-=l/2,e.n=a.matrixTransform(n),a.y+=l,e.s=a.matrixTransform(n),e}return c}})?o.apply(e,r):o)||(t.exports=a)},64:function(t,e,n){"use strict";n.r(e),n.d(e,"clusterColors",(function(){return r})),n.d(e,"createClusterSvgElement",(function(){return a})),n.d(e,"createClusterZone",(function(){return s})),n.d(e,"setCreateClusterZone",(function(){return l})),n.d(e,"updateClusterZoneLabels",(function(){return c})),n.d(e,"moveElement",(function(){return d})),n.d(e,"createNodes",(function(){return i})),n.d(e,"updateNodes",(function(){return u})),n.d(e,"createLinks",(function(){return p})),n.d(e,"updateLinks",(function(){return h})),n.d(e,"setLinkColor",(function(){return g})),n.d(e,"setLinkStyle",(function(){return y})),n.d(e,"positionNodesOnClusterZone",(function(){return _}));var o=n(56);const r={ontoOrange:"var(--onto-orange)",ontoBlue:"var(--onto-blue)",ontoGreen:"var(--onto-green)",ontoGrey:"var(--onto-grey)"};function a(t){return d3.select(t).append("svg")}function s(t){const e=t.append("g");return e.append("circle").classed("cluster-zone",!0).style("fill","transparent").style("stroke-width","2"),e}function l(t,e,n){if(e.select(".cluster-zone").classed("no-cluster",!t),t)e.selectAll("#no-cluster-zone").remove();else{const t=e.append("g").attr("id","no-cluster-zone");t.append("text").attr("id","no-cluster-label").text(n.no_cluster_configured||"No cluster group configured").attr("y",-50).classed("h2",!0).style("text-anchor","middle"),t.append("text").attr("id","create-cluster-label").classed("h3",!0).text(n.create_cluster_btn||"Click here to create a cluster").style("text-anchor","middle"),t.append("text").attr("y",130).attr("class","icon-any repo").attr("fill",r.ontoOrange).style("text-anchor","middle").classed("settings-icon",!0).text("")}}function c(t,e,n){t||(e.select("#no-cluster-zone #no-cluster-label").text(n.no_cluster_configured),e.select("#no-cluster-zone #create-cluster-label").text(n.create_cluster_btn))}function d(t,e,n){t.attr("transform",()=>`translate(${e}, ${n})`)}function i(t,e,n){const o=t.enter().append("g").attr("id","node-group").classed("legend",n);!function(t,e){const n=Math.sqrt(3)/2,o=[[e+0,0],[e/2+0,e*n+0],[-e/2+0,e*n+0],[0-e,0],[-e/2+0,-e*n+0],[e/2+0,-e*n+0],[e+0,0],[e/2+0,e*n+0]];t.selectAll("path.area").data([o]).enter().append("path").attr("class","node member").attr("d",d3.svg.line())}(o,e),t.exit().remove(),o.append("text").attr("class","icon-any node-icon"),function(t,e,n){const o=t.append("g");n?o.append("foreignObject").attr("y",e).attr("x",-e).attr("width",2*e).attr("height",10).attr("class","label-wrapper").append("xhtml:div").attr("class","id id-host"):(o.append("rect").attr("class","id-host-background").attr("rx",6),o.append("text").attr("y",e+10).attr("class","id id-host").style("text-anchor","middle"))}(o,e,n)}function u(t){!function(t){t.select(".icon-any.node-icon").text(f)}(t),function(t){t.select(".node.member").classed("leader",t=>t.nodeState===o.NodeState.LEADER).classed("follower",t=>t.nodeState===o.NodeState.FOLLOWER).classed("candidate",t=>t.nodeState===o.NodeState.CANDIDATE).classed("other",t=>t.nodeState!==o.NodeState.LEADER&&t.nodeState!==o.NodeState.FOLLOWER&&t.nodeState!==o.NodeState.CANDIDATE)}(t),function(t){t.select(".id.id-host").each((function(t){t.labelNode=this})).text((function(t){return t.hostname})),t.select(".id-host-background").attr("width",(function(t){return d3.select(t.labelNode).node().getBBox().width+10})).attr("height",(function(t){return d3.select(t.labelNode).node().getBBox().height+2})).attr("x",(function(t){return d3.select(t.labelNode).node().getBBox().x-5})).attr("y",(function(t){return d3.select(t.labelNode).node().getBBox().y-1})).attr("fill","#EEEEEE")}(t)}function f(t){return t.nodeState===o.NodeState.LEADER?"":t.nodeState===o.NodeState.FOLLOWER?"":t.nodeState===o.NodeState.CANDIDATE?"":t.nodeState===o.NodeState.NO_CONNECTION?"":t.nodeState===o.NodeState.OUT_OF_SYNC?"":t.nodeState===o.NodeState.READ_ONLY?"":t.nodeState===o.NodeState.RESTRICTED?"":""}function p(t){t.enter().append("path").classed("link",!0),t.exit().remove()}function h(t,e){t.attr("stroke",g).style("stroke-dasharray",y).attr("d",t=>function(t,e){const n=e.find(e=>e.address===t.source),o=e.find(e=>e.address===t.target),r=o.x-n.x,a=o.y-n.y,s=Math.sqrt(r*r+a*a),l=r/s,c=a/s,d=n.x+55*l,i=n.y+55*c,u=o.x-55*l,f=o.y-55*c;return"M"+d+","+i+"L"+u+","+f}(t,e))}function g(t){return t.status===o.LinkState.IN_SYNC||t.status===o.LinkState.SYNCING?r.ontoGreen:t.status===o.LinkState.OUT_OF_SYNC?r.ontoGrey:"none"}function y(t){return t.status===o.LinkState.OUT_OF_SYNC||t.status===o.LinkState.SYNCING?"10 10":"none"}function _(t,e,n,o){t.attr("transform",(r,a)=>{const s=2*Math.PI*a/t[0].length;var l=e+Math.cos(s)*o,c=n+Math.sin(s)*o;return r.x=l,r.y=c,`translate(${l}, ${c})`})}},69:function(t,e,n){"use strict";n.r(e);n(5);var o=n(64),r=n(56),a=n(255),s=n.n(a);let l=240;const c=angular.module("graphdb.framework.clustermanagement.directives",["graphdb.framework.utils.localstorageadapter"]),d={no_cluster_configured:"",create_cluster_btn:"",legend_node_state:"",legend_link_state:"",node_state_leader:"Leader",node_state_follower:"Follower",node_state_candidate:"Candidate",node_state_no_cluster:"No cluster",node_state_out_of_sync:"Out of sync",node_state_no_connection:"No connection",node_state_read_only:"Read only",node_state_restricted:"Restricted",link_state_in_sync:"In sync",link_state_syncing:"Syncing",link_state_out_of_sync:"Out of sync"},i={node_state:"legend_node_state",link_state:"legend_link_state"};c.directive("clusterGraphicalView",["$window","LocalStorageAdapter","LSKeys","UriUtils","$translate","$rootScope",function(t,e,n,r,a,c){return{restrict:"A",link:function(p,h){function g(){Object.keys(d).forEach(t=>{d[t]=a.instant("cluster_management.cluster_graphical_view."+t)})}function y(){const o="collapsedMenu"===e.get(n.MENU_STATE);return l=o?70:240,Math.max(Math.floor(.95*(t.innerWidth-l)),600)}function m(){return Math.max(.95*(t.innerHeight-250),600)}let x,S,N;p.showLegend=!1,c.$on("$translateChangeSuccess",(function(){g(),function(){o.updateClusterZoneLabels(k,E,d),Object.keys(i).forEach(t=>{d3.select("#"+t).text(D(t))}),x&&x.remove();B(),G()}()})),p.$on("$destroy",(function(){R.destroy()}));let k,v,E,w,C,T,L=y(),b=m(),O=Math.min(L,b)/2-100,A=L/2,M=b/2;function D(t){return d[i[t]]}function B(){x=v.append("g").attr("id","legend-group").classed("hidden",!p.showLegend).classed("legend-group",!0)}p.width=function(){return L},p.height=function(){return b};const R=s()().attr("class","d3-tip").customPosition((function(){const t=T.getBoundingClientRect(),e=document.documentElement.scrollTop||document.body.scrollTop,n=document.documentElement.scrollLeft||document.body.scrollLeft;return{left:t.left+n+"px",top:t.top-30+e+"px"}})).html((function(t){return t.toolTip})),I=function(t,e){T=e,R.show(t,T)},Y=function(){T=null,R.hide()};function G(){const t=u(),e=f();!function(t,e){t.forEach(t=>{t.toolTip=t.hostname=d[t.customText]}),e.forEach(t=>{t.toolTip=t.linkTypeText=d[t.linkTypeKey]})}(t,e),x.append("rect").attr("id","legend-background").attr("class","legend-background").attr("fill","#EEEEEE");const n=x.append("text").attr("id","node_state").attr("class","id id-host").attr("x",200).attr("y",24).text(D("node_state")),r=x.append("text").attr("id","link_state").attr("class","id id-host").attr("x",200).attr("y",179).text(D("link_state")),a=x.selectAll("#node-group").data(t);o.createNodes(a,25,!0),o.updateNodes(a),a.select(".node.member").on("mouseover",(function(t){d3.event.stopPropagation(),I(t,this)})).on("mouseout",Y),a.attr("transform",(function(t){const e=Math.floor(t.id/4);return`translate(${35+65*(t.id%4)}, ${59+65*e})`})),x.call((function(){S=this.node().getBBox().width})),n.attr("x",10+S/2),r.attr("x",10+S/2);const s=S/3,l=x.append("g").attr("id","links-group");l.attr("transform","translate(10, 189)"),e.forEach((t,e)=>{const n=s-5,r=l.append("g").classed("link",!0).classed("legend",!0).attr("transform",()=>`translate(${e*s}, 0)`);r.append("path").classed("link",!0).attr("stroke-dasharray",()=>o.setLinkStyle(t)).attr("stroke",()=>o.setLinkColor(t)).attr("d",()=>`M5,0,${n},0`),r.append("foreignObject").attr("y",10).attr("x",5).attr("width",s-10).attr("height",10).attr("class","label-wrapper").append("xhtml:div").attr("class","id id-host").style("font-size","9px").html(t.linkTypeText),r.on("mouseover",(function(){d3.event.stopPropagation(),I(t,this)})).on("mouseout",Y)}),x.call((function(t){N=this.node().getBBox().height,S=this.node().getBBox().width})),x.select(".legend-background").attr("height",N+40).attr("width",S+20).attr("rx","6"),z()}function z(){const t=b-(N+30+50);o.moveElement(x,0,t)}function F(){O=Math.min(L,b)/2-100,A=L/2,M=b/2,o.moveElement(E,A,M),E.select(".cluster-zone").attr("r",O)}function W(){F(),k!==p.clusterModel.hasCluster&&(k=!!p.clusterModel.hasCluster,function(t){let e;o.setCreateClusterZone(t,E,d),t||(e=()=>{p.$apply((function(){p.showCreateClusterDialog()}))}),E.on("mouseup",e)}(k));const t=_.cloneDeep(p.clusterModel.nodes)||[],e=_.cloneDeep(p.clusterModel.links)||[];!function(t){t.forEach(t=>t.hostname=r.shortenIri(t.endpoint));const e=w.selectAll("#node-group").data(t,t=>t.address);e.on("click",t=>{p.childContext.selectNode(t);const e=d3.select(".nodetooltip"),n=$(window).width();d3.event.pageX<n/2?(e.style("left",d3.event.pageX+"px"),e.style("right","")):(e.style("left",""),e.style("right",n-d3.event.pageX+"px")),e.style("top",d3.event.pageY-28+"px")}),o.createNodes(e,50),o.updateNodes(e),o.positionNodesOnClusterZone(e,A,M,O)}(t),function(t,e){const n=C.selectAll(".link").data(t,t=>t.id);o.createLinks(n),o.updateLinks(n,e)}(e,t)}p.childContext.redraw=W,p.childContext.resize=function(){L=y(),b=m(),v.attr("width",L),v.attr("height",b),W(),z()},p.childContext.toggleLegend=()=>{p.showLegend=!p.showLegend,x.classed("hidden",!p.showLegend)},g(),function(t){v=o.createClusterSvgElement(h[0]).attr("width",L).attr("height",b),v.call(R),E=o.createClusterZone(v,t),C=v.append("g").attr("id","links-group"),w=v.append("g").attr("id","nodes-group"),B()}(!(!p.clusterModel.nodes||!p.clusterModel.nodes.length)),G(),W()}}}]);const u=function(){const t=[];return t.push({nodeState:r.NodeState.LEADER,customText:"node_state_leader"}),t.push({nodeState:r.NodeState.FOLLOWER,customText:"node_state_follower"}),t.push({nodeState:r.NodeState.CANDIDATE,customText:"node_state_candidate"}),t.push({nodeState:r.NodeState.NO_CLUSTER,customText:"node_state_no_cluster"}),t.push({nodeState:r.NodeState.OUT_OF_SYNC,customText:"node_state_out_of_sync"}),t.push({nodeState:r.NodeState.NO_CONNECTION,customText:"node_state_no_connection"}),t.push({nodeState:r.NodeState.READ_ONLY,customText:"node_state_read_only"}),t.push({nodeState:r.NodeState.RESTRICTED,customText:"node_state_restricted"}),t.forEach((t,e)=>t.id=e),t},f=function(){const t=[];return t.push({status:r.LinkState.IN_SYNC,linkTypeKey:"link_state_in_sync"}),t.push({status:r.LinkState.SYNCING,linkTypeKey:"link_state_syncing"}),t.push({status:r.LinkState.OUT_OF_SYNC,linkTypeKey:"link_state_out_of_sync"}),t.forEach((t,e)=>t.id=e),t}}}]);