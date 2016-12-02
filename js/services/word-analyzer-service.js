/**************************用户列表****************************/
angular.module('plumdo.services').service('WordAnalyzerService',['$http', function($http) { 
	return {
		analyzerOneWord : function(data,tdNum){
			return $http({
			 	method: 'POST', 
			 	url:PLUMDO.URL.analyzerOneWord(tdNum),
			 	data:data
			 });
		},
		analyzerTwoWord : function(data,tdNum){
			return $http({
			 	method: 'POST', 
			 	url:PLUMDO.URL.analyzerTwoWord(tdNum),
			 	data:data
			 });
		}
	};    
}]);

    
