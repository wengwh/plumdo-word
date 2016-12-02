/**
 * 配置路由。
 * 注意这里采用的是ui-router这个路由，而不是ng原生的路由。
 * ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router。
 */
angular.module('plumdo.configs').config(function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds
	$urlRouterProvider.otherwise('/word-one');
	
	$stateProvider.state('word-one', {
		url : '/word-one',
        data: {pageTitle: ['单页分词'] },
		templateUrl: 'views/word-analyzer/word-one.html',
        resolve: {
            loadPlugin:["$ocLazyLoad", function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                     {files: ['js/controllers/word-analyzer-controller.js']},
                     {
                         name: 'summernote',
                         files: ['libs/plugins/summernote/summernote.css','libs/plugins/summernote/summernote-bs3.css','libs/plugins/summernote/summernote.min.js','libs/plugins/summernote/angular-summernote.min.js']
                     }]);
            }]
        }
	}).state('word-two', {
		url : '/word-two',
        data: {pageTitle: ['双页分词'] },
		templateUrl: 'views/word-analyzer/word-two.html',
        resolve: {
            loadPlugin:["$ocLazyLoad", function ($ocLazyLoad) {  
            	return $ocLazyLoad.load([
                   {files: ['js/controllers/word-analyzer-controller.js']},
                   {
                       name: 'summernote',
                       files: ['libs/plugins/summernote/summernote.css','libs/plugins/summernote/summernote-bs3.css','libs/plugins/summernote/summernote.min.js','libs/plugins/summernote/angular-summernote.min.js']
                   }]);
            }]
        }
	});
});