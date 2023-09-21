(window.webpackJsonp=window.webpackJsonp||[]).push([[45,112],{39:function(t,e,a){"use strict";a.r(e),a.d(e,"ChartData",(function(){return s}));class s{static get DEFAULT_MULTIPLIER(){return 1.2}static get MAXIMUM_DIVISIONS(){return 10}static get COLORS(){return["#003663","#E84E0F","#02A99A","#999999"]}constructor(t,e,a,s){this.filter=s,this.initialChartSetup(t,e,a)}initialChartSetup(t,e,a,s=!0){this.disableRangeUpdate=e,this.disableOldDataRemoval=a,this.translateService=t,this.range=150,this.chartOptions=this.getDefaultChartOptions(t),this.chartSetup(this.chartOptions),s&&(this.dataHolder=this.createDataHolder(),this.firstLoad=!0)}refresh(){this.initialChartSetup(this.translateService,this.disableRangeUpdate,this.disableOldDataRemoval,!1),this.translateLabels(this.dataHolder),this.updateRange(this.dataHolder)}translateLabels(t){this.createDataHolder().forEach((e,a)=>{t[a].originalKey?t[a].originalKey=e.key:t[a].key=e.key})}setSubTitle(t){this.chartOptions.title.enable=!0;const e=t.map(t=>{if(Array.isArray(t.value)&&!t.value.length)return;const e=Array.isArray(t.value)?t.value.join("/"):t.value;return t.label+(void 0!==e?`<span class="data-value">${e}</span>`:"")});this.chartOptions.title.html=e.map(t=>`<span class="info-element">${t}</span>`)}chartSetup(t){}createDataHolder(){throw new Error("Must implement data holder creation")}addData(t,e){this.removeOldData(this.dataHolder,this.range),this.addNewData(this.dataHolder,t,e,this.isFirstLoad()),this.updateRange(this.dataHolder),this.firstLoad&&(this.firstLoad=!1)}removeOldData(t,e){this.disableOldDataRemoval||t[0].values.length>e&&t.forEach(t=>t.values.shift())}addNewData(t,e,a,s){}updateRange(t,e){if(this.disableRangeUpdate)return;const[a]=s.calculateMaxChartValueAndDivisions(t,e);this.chartOptions.chart.yDomain=[0,a]}isFirstLoad(){return this.firstLoad}getDefaultChartOptions(t){return{chart:{interpolate:"monotone",type:"lineChart",height:500,margin:{left:80,right:80},x:function(t){return t[0]},y:function(t){return t[1]},clipEdge:!0,noData:t.instant("resource.no_data"),showControls:!1,duration:0,rightAlignYAxis:!1,useInteractiveGuideline:!0,xAxis:{showMaxMin:!1,tickFormat:function(t){return d3.time.format("%X")(new Date(t))}},yAxis:{showMaxMin:!1,tickFormat:function(t){return t}},legend:{maxKeyLength:100},color:s.COLORS},title:{enable:!0,className:"chart-additional-info",html:" "}}}static getMaxValueFromDataHolder(t){return Math.max(...t.filter(t=>!t.disabled).flatMap(t=>s.getMaxValueForDataSeries(t)))}static getMaxValueForDataSeries(t){return Math.max(...t.values.map(t=>t[1]))}static calculateMaxChartValueAndDivisions(t,e){let a;a=Array.isArray(t)?s.getMaxValueFromDataHolder(t):s.getMaxValueForDataSeries(t);const r=Math.round(a*(e||s.DEFAULT_MULTIPLIER))||1;return[r,Math.ceil(r/s.MAXIMUM_DIVISIONS)]}static getIntegerRangeForValues(t,e){const[a,r]=s.calculateMaxChartValueAndDivisions(t,e);return d3.range(0,a+1,r)}static formatBytesValue(t,e){let a=t;e&&(a=Math.max(...e.filter(t=>!t.disabled).flatMap(t=>t.values).flatMap(t=>t[1])));const s=Math.floor(Math.log(a)/Math.log(1024));return`${(parseFloat(t)/Math.pow(1024,s)).toFixed(2)} ${["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][s]}`}formatNumber(t){if(t&&this.filter)return this.filter("currency")(t,"",0)}}},54:function(t,e,a){"use strict";a.r(e),a.d(e,"ClusterHealthChart",(function(){return r}));var s=a(39);class r extends s.ChartData{constructor(t){super(t,!0,!1),this.nodesCount=0}chartSetup(t){const e={type:"stackedAreaChart",interpolate:"step-after",stacked:!0,yAxis:{showMaxMin:!1,tickFormat:function(t){return t},tickValues:()=>d3.range(0,this.nodesCount+1,1)}};Object.assign(t.chart,e)}getTitle(){return this.translateService.instant("resources.cluster_health.label")}createDataHolder(){const[t,e,a,s]=r.COLORS;return[{key:this.translateService.instant("resources.cluster_health.in_sync"),color:t,values:[]},{key:this.translateService.instant("resources.cluster_health.syncing"),color:a,values:[]},{key:this.translateService.instant("resources.cluster_health.out_sync"),color:e,values:[]},{key:this.translateService.instant("resources.cluster_health.disconnected"),color:s,values:[]}]}addNewData(t,e,a){const s=a.nodesStats;this.nodesCount=s.nodesInCluster;const[r,i,n,l]=t;r.values.push([e,s.nodesInSync]),n.values.push([e,s.nodesOutOfSync]),l.values.push([e,s.nodesDisconnected]),i.values.push([e,s.nodesSyncing]);const o=[{label:this.translateService.instant("resource.cluster_health.leader_elections"),value:a.term},{label:this.translateService.instant("resource.cluster_health.recoveries"),value:a.failureRecoveriesCount},{label:this.translateService.instant("resource.cluster_health.failed_transactions"),value:a.failedTransactionsCount}];this.setSubTitle(o)}}}}]);