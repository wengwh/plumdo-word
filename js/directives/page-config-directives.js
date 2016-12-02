angular.module('plumdo.directives').directive('pageTitle', ['$rootScope','$timeout', function($rootScope, $timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                var title = 'Plumdo - simple';
            	$rootScope.pageTitles = ['首页'];
                
                if (toState.data && toState.data.pageTitle){
                	angular.forEach(toState.data.pageTitle, function(value,rowIndex) {
                		$rootScope.pageTitles.push(value);
            	    });

                	title = 'Plumdo - ' + $rootScope.pageTitles[$rootScope.pageTitles.length-1];
                } 
                
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    };
}]);

angular.module('plumdo.directives').directive('fixHeight', ['$rootScope','$timeout', function($rootScope, $timeout) {
    return {
        link: function(scope, element) {
        	
        	 function fix_height() {
    	        var heightWithoutNavbar = $("body > #wrapper").height() - 61;
    	        $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");
    	        
    	        var navbarHeigh = $('nav.navbar-default').height();
    	        var wrapperHeigh = $('#page-wrapper').height();
    	        if(navbarHeigh > wrapperHeigh){
    	            $('#page-wrapper').css("min-height", navbarHeigh + "px");
    	        }

    	        if(navbarHeigh < wrapperHeigh){
    	            $('#page-wrapper').css("min-height", $(window).height()  + "px");
    	        }
    	        
    	        if ($('body').hasClass('fixed-nav')) {
    	            if (navbarHeigh > wrapperHeigh) {
    	                $('#page-wrapper').css("min-height", navbarHeigh - 60 + "px");
    	            } else {
    	                $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
    	            }
    	        }

    	    }
        	    
    	    $(window).bind("load resize scroll", function() {
	            fix_height();
    	    });

    	    // Move right sidebar top after scroll
    	    $(window).scroll(function(){
    	        if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav') ) {
    	            $('#right-sidebar').addClass('sidebar-top');
    	        } else {
    	            $('#right-sidebar').removeClass('sidebar-top');
    	        }
    	    });

    	    $timeout(function(){
    	        fix_height();
    	    },500);
    	    
    	    
    	    $(window).bind("load resize", function() {
    	        if ($(document).width() < 769) {
    	            $('body').addClass('body-small');
    	        } else {
    	            $('body').removeClass('body-small');
    	        }
    	    });        	    
        }
    };
}]);


angular.module('plumdo.directives').directive('sideNavigation', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            $timeout(function(){
                element.metisMenu();
            });
        }
    };
}]);

angular.module('plumdo.directives').directive('minimalizaSidebar', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {
            $scope.minimalize = function () {
                $("body").toggleClass("mini-navbar");
                if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                    $('#side-menu').hide();
                    $timeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 200);
                } else if ($('body').hasClass('fixed-sidebar')){
                    $('#side-menu').hide();
                    $timeout(
                        function () {
                            $('#side-menu').fadeIn(400);
                        }, 100);
                } else {
                    $('#side-menu').removeAttr('style');
                }
            };
        }
    };
}]);

angular.module('plumdo.directives').directive('iboxTools', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/ibox-tools.html',
        controller: function ($scope, $element) {
            // Function for collapse ibox
            $scope.showhide = function () {
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                content.slideToggle(200);
                // Toggle icon from up to down
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                ibox.toggleClass('').toggleClass('border-bottom');
                $timeout(function () {
                    ibox.resize();
                    ibox.find('[id^=map-]').resize();
                }, 50);
            };
            // Function for close ibox
            $scope.closebox = function () {
                var ibox = $element.closest('div.ibox');
                ibox.remove();
            };
            // Function for full screen
            $scope.fullscreen = function () {
                var ibox = $element.closest('div.ibox');
                var button = $element.find('i.fa-expand');
                $('body').toggleClass('fullscreen-ibox-mode');
                button.toggleClass('fa-expand').toggleClass('fa-compress');
                ibox.toggleClass('fullscreen');
                $timeout(function() {
                    $(window).trigger('resize');
                }, 100);
            };
        }
    };
}]);


angular.module('plumdo.directives').directive('ngLoad', function() {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/load.html',
        link: function(scope, element) {
			$("#float").fadeIn(300);
        }
    };
});

angular.module('plumdo.directives').directive('themeConfig', function() {
    return {
        restrict: 'A',
        scope: true,
        templateUrl: 'views/common/theme-config.html',
        controller: function ($scope, $element) {
        	$scope.fixednavbar = function (){
                if ($('#fixednavbar').is(':checked')){
                    $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
                    $("body").removeClass('boxed-layout');
                    $("body").addClass('fixed-nav');
                    $('#boxedlayout').prop('checked', false);
                } else{
                    $(".navbar-fixed-top").removeClass('navbar-fixed-top').addClass('navbar-static-top');
                    $("body").removeClass('fixed-nav');
                    $("body").removeClass('fixed-nav-basic');
                    $('#fixednavbar2').prop('checked', false);
                }
            };

            // Enable/disable fixed sidebar
            $scope.fixedsidebar = function (){
                if ($('#fixedsidebar').is(':checked')){
                    $("body").addClass('fixed-sidebar');
                    $('.sidebar-collapse').slimScroll({
                        height: '100%',
                        railOpacity: 0.9
                    });
                } else{
                    $('.sidebar-collapse').slimscroll({destroy: true});
                    $('.sidebar-collapse').attr('style', '');
                    $("body").removeClass('fixed-sidebar');
                }
            };
            // Enable/disable collapse menu
            $scope.collapsemenu = function (){
                if ($('#collapsemenu').is(':checked')){
                    $("body").addClass('mini-navbar');
                    SmoothlyMenu();
                } else{
                    $("body").removeClass('mini-navbar');
                    SmoothlyMenu();
                }
            };

            // Enable/disable boxed layout
            $scope.boxedlayout = function (){
                if ($('#boxedlayout').is(':checked')){
                    $("body").addClass('boxed-layout');
                    $('#fixednavbar').prop('checked', false);
                    $('#fixednavbar2').prop('checked', false);
                    $(".navbar-fixed-top").removeClass('navbar-fixed-top').addClass('navbar-static-top');
                    $("body").removeClass('fixed-nav');
                    $("body").removeClass('fixed-nav-basic');
                    $(".footer").removeClass('fixed');
                    $('#fixedfooter').prop('checked', false);
                } else{
                    $("body").removeClass('boxed-layout');
                }
            };

            // Enable/disable fixed footer
            $scope.fixedfooter = function (){
                if ($('#fixedfooter').is(':checked')){
                    $('#boxedlayout').prop('checked', false);
                    $("body").removeClass('boxed-layout');
                    $(".footer").addClass('fixed');
                } else{
                    $(".footer").removeClass('fixed');
                }
            };

            // SKIN Select
            $scope.showConfig = function (){
                $(".theme-config-box").toggleClass("show");
            };

            // Default skin
            $scope.changeSkin0 = function (){
                $("body").removeClass("skin-1");
                $("body").removeClass("skin-2");
                $("body").removeClass("skin-3");
            };

            // Blue skin
            $scope.changeSkin1 = function (){
                $("body").removeClass("skin-2");
                $("body").removeClass("skin-3");
                $("body").addClass("skin-1");
            };
            $scope.changeSkin2 = function (){
                $("body").removeClass("skin-1");
                $("body").removeClass("skin-3");
                $("body").addClass("skin-2");
            };
            // Yellow skin
            $scope.changeSkin3 = function (){
                $("body").removeClass("skin-1");
                $("body").removeClass("skin-2");
                $("body").addClass("skin-3");
            };
        }
    };
});
function SmoothlyMenu() {
    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 200);
    } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 100);
    } else {
        $('#side-menu').removeAttr('style');
    }
}
