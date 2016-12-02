/**
 * 自定义table指令
 */
angular.module('plumdo.directives').directive('ngDateTime',['$compile', function( $compile ) {
	return {
		restrict: 'A', 
		link: function (scope, element, attrs ) {
			var format="yyyy-mm-dd hh:ii:ss";
			var minView = "hour";
			if(attrs.ngDateTime == "date"){
				format = "yyyy-mm-dd";
				minView = "month";
			}
			element.datetimepicker({
		        format: format,
		        minView: minView, 
		        autoclose: true,
		        todayBtn: true,
		        showSeconds: true
			});
			
		}
	};
}]);