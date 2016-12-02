angular.module('plumdo.configs').config(["$httpProvider", function ($httpProvider) {
	$httpProvider.interceptors.push('httpInterceptor');
}]);

angular.module('plumdo.factorys').factory('httpInterceptor',[ '$q',"$injector","$rootScope",  function($q,$injector,$rootScope) {
	var interceptor = {
		'request' : function(config) {
			// 成功的请求方法
			$rootScope.showProgress();
			return config || $q.when(config);
		},
		'response' : function(response) {
			// 响应成功
			$rootScope.hideProgress();
			return response || $q.when(config);
		},
		'requestError' : function(rejection) {
			// 请求发生了错误，如果能从错误中恢复，可以返回一个新的请求或promise
			console.info("requestError:"+rejection);
			return $q.reject(rejection);
		},
		'responseError' : function(rejection) {
			// 请求发生了错误，如果能从错误中恢复，可以返回一个新的响应或promise
			if(rejection.data){
				var errorMsg = rejection.data.message;
				console.info("response error- status:"+rejection.status+",errorMsg:"+errorMsg);
				$rootScope.hideProgress(errorMsg);
			}else{
				console.info("response error- rejection:"+rejection);
				$rootScope.hideProgress();
			}
			return $q.reject(rejection);
		}
	};
	return interceptor;
}]);