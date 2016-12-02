angular.module('plumdo.configs').config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider", function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
		angular.module('plumdo.controllers').controller = $controllerProvider.register;
		angular.module('plumdo.directives').directive = $compileProvider.directive;
		angular.module('plumdo.filters').filter = $filterProvider.register;
		angular.module('plumdo.factorys').factory = $provide.factory;
		angular.module('plumdo.services').service = $provide.service;
		angular.module('plumdo.constants').constant = $provide.constant;
}]);