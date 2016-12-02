(function (angular) {
	'use strict';
	
    angular.module('plumdo', [
        'ui.router',                    // Routing
        'oc.lazyLoad',                  // ocLazyLoad
        'ui.bootstrap',                 // Ui Bootstrap
        'cgNotify',
        'ngIdle',                       // Idle timer
        'plumdo.factorys',
        'plumdo.directives',
        'plumdo.configs',
        'plumdo.filters',
        'plumdo.controllers',
        'plumdo.services'
    ]).run(function($rootScope, $state,$uibModal,notify) {

    	$rootScope.progressNum = 0;
    	
    	$rootScope.showProgress = function (msg) {
    		$rootScope.progressNum++;
    		if(msg){
        		notify({ message: msg, duration:2000,position:'right',classes: 'notify-success'});
        	}
        };
        
        $rootScope.hideProgressBySucess = function(msg){
        	$rootScope.hideProgress(msg,'notify-success');
        };
        
        $rootScope.hideProgressByError = function(msg){
        	$rootScope.hideProgress(msg,'notify-error');
        };
        
        
        $rootScope.hideProgress = function (msg,classes) {
        	$rootScope.progressNum--;
        	if(msg){
        		if(classes && classes!=null){
            		notify({ message: msg, duration:1000,position:'right',classes: classes});
        		}else{
            		notify({ message: msg, duration:1000,position:'right',classes: 'notify-error'});
        		}
        	}
        };
        
        $rootScope.confirmModal = function(args) {
			$uibModal.open({
	            templateUrl: 'views/common/confirm-modal.html',
                controller:function($scope,$uibModalInstance){
                	$scope.modalTitle = angular.copy(args.title);
                	$scope.cancel = function(){
        		        $uibModalInstance.dismiss('cancel');
                    	args.confirm(false);
                    };
                    $scope.ok = function(){
                    	$uibModalInstance.close();
                    	args.confirm(true);
                    };
                }
	        });
		};
        
    });

    angular.module('plumdo.configs', []);
	angular.module('plumdo.services', []);
    angular.module('plumdo.controllers', []);
    angular.module('plumdo.directives', []);
	angular.module('plumdo.filters', []);
	angular.module('plumdo.factorys', []);
	angular.module('plumdo.constants', []);

})(angular);

