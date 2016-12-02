/**
 * 自定义table指令
 */
angular.module('plumdo.directives').directive('ngTable',['$compile', function( $compile ) {
	return {
		restrict: 'A', 
		link: function (scope, element, attrs ) {
			
			var conf = scope[attrs.ngTable];
			
			var tableId = conf.id;
			
			var loadFunction = conf.loadFunction || function(){};

			var pageList = conf.pageList || [10,20,50,100];

			scope[tableId] = scope[tableId] || {};
			
			scope[tableId].pageSize = conf.pageSize.toString() || "10";
			scope[tableId].sortName = conf.sortName||"";
			scope[tableId].sortOrder = conf.sortOrder || "desc";
			
			var headThStr = '';
			var bodyThStr = '';
			for(var i in conf.colModels){
				var sortHtml='';
				if(conf.colModels[i].sortable){
					sortHtml = 'ng-class="{\'sorting\':'+tableId+'.sortName!=\''+conf.colModels[i].index+'\','+
					'\'sorting_asc\':'+tableId+'.sortName==\''+conf.colModels[i].index+'\'&&'+tableId+'.sortOrder==\'asc\','+
					'\'sorting_desc\':'+tableId+'.sortName==\''+conf.colModels[i].index+'\'&&'+tableId+'.sortOrder==\'desc\'}" '+
					'ng-click="'+tableId+'.sortChange(\''+conf.colModels[i].index+'\')"';
				}
				var widthHtml='';
				if(conf.colModels[i].width){
					widthHtml = 'width='+conf.colModels[i].width;
				}
				headThStr = headThStr+'<th '+widthHtml+' '+sortHtml+' >'+conf.colModels[i].name+'</th>\n';
				
				if(conf.colModels[i].formatter){
					bodyThStr = bodyThStr+'<td>'+conf.colModels[i].formatter()+'</td>\n';
				}else{
					bodyThStr = bodyThStr+'<td>{{row.'+conf.colModels[i].index+'}}</td>\n';
				}
				
			}
			
			var tableHtml =
				'<thead><tr>'+headThStr+'</tr></thead>' +
				'<tbody><tr ng-repeat="row in '+conf.data+'.records ">' +bodyThStr+'</tr></tbody>';

			var optionStr = '';
			for(var i in pageList){
				optionStr = optionStr+'<option value="'+pageList[i]+'">'+pageList[i]+'</option>\n';
			}
			
			
			var pageHtml =
				'<div class="row">'+
				'<div class="col-xs-5 col-sm-5"><select class="form-control input-sm ng-table" ng-model="'+tableId+'.pageSize" ng-change="'+tableId+'.pageSizeChange()">'+optionStr+'</select>条 '+
				'{{('+conf.data+'.current-1)*'+tableId+'.pageSize+1}} - {{'+conf.data+'.current =='+conf.data+'.pages?'+conf.data+'.total:'+conf.data+'.current*'+conf.data+'.size}}  共 {{'+conf.data+'.total}} 条</div>'+
				'<div class="col-xs-7 col-sm-7"><nav class="ng-table">'+
				'<uib-pagination class="ng-table" ng-change="'+tableId+'.pageNumChange('+conf.data+'.current)" total-items="'+conf.data+'.total" items-per-page="'+conf.data+'.size" ng-model="'+conf.data+'.current" max-size="5" class="pagination-sm" boundary-links="true" previous-text="&lsaquo;" next-text="&rsaquo;" first-text="&laquo;" last-text="&raquo;"></uib-pagination>'+
				'</nav></div>'+
				'</div>';

			scope[tableId].pageNumChange = scope[tableId].pageNumChange || function(pageNum){
				loadFunction(pageNum,scope[tableId].pageSize,scope[tableId].sortName,scope[tableId].sortOrder);
			};
			
			scope[tableId].pageSizeChange = scope[tableId].pageSizeChange || function(){
				loadFunction(1,scope[tableId].pageSize,scope[tableId].sortName,scope[tableId].sortOrder);
			};
			
			scope[tableId].sortChange = scope[tableId].sortChange || function(sortName){
				if(scope[tableId].sortName != sortName){
					scope[tableId].sortName = sortName;
					scope[tableId].sortOrder = "desc";
				}else{
					if(scope[tableId].sortOrder=="desc"){
						scope[tableId].sortOrder = "asc";
					}else{
						scope[tableId].sortOrder = "desc";
					}
				}
				loadFunction(1,scope[tableId].pageSize,scope[tableId].sortName,scope[tableId].sortOrder);
			};
			
			loadFunction(1,scope[tableId].pageSize,scope[tableId].sortName,scope[tableId].sortOrder);
			
			element.html('').append( $compile( tableHtml )( scope ) );
			element.after($compile( pageHtml )( scope ) );
		}
	};
}]);