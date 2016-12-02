/**************************WordAnalyzerCtrl****************************/
angular.module('plumdo.controllers').controller('WordAnalyzerCtrl',['$scope', function($scope) { 
    $scope.wordData = {};
    $scope.tdNum="3";
    $scope.resultData=null;
	var regxpForHtml = new RegExp(/<[^>]+>/g); 
	var reg = new RegExp(/[^\u4e00-\u9fa5]/g);

	$scope.sortWord = function () {
		try{
			$scope.showProgress();
			if($scope.resultData!=null){
				var arr = $scope.resultData.split("");
				var res = [];
				for (var i = 0, len = arr.length; i < len; i++) {
				  var j = Math.floor(Math.random() * arr.length);
				  res[i] = arr[j];
				  arr.splice(j, 1);
				}
				$scope.resultData = res.join("");
		    	$scope.result = strConvertTable($scope.resultData,$scope.tdNum);
			}
			$scope.hideProgressBySucess("排序成功");
		}catch (e) {
			console.info(e);
			$scope.hideProgressByError("排序异常");
		}
    };
    
    $scope.analyzerOneWord = function () {
		try{
			$scope.showProgress();
	    	$scope.resultData = analyzerOwnWord($scope.wordData.word);
	    	$scope.result = strConvertTable($scope.resultData,$scope.tdNum);
			$scope.hideProgressBySucess("分词成功");
		}catch (e) {
			console.info(e);
			$scope.hideProgressByError("分词异常");
		}
    };
    
    $scope.analyzerTwoWord = function () {
		try{
			$scope.showProgress();
	    	$scope.resultData = analyzerCompareWord(analyzerOwnWord($scope.wordData.word),$scope.wordData.wordcompare);
	    	$scope.result = strConvertTable($scope.resultData,$scope.tdNum);
			$scope.hideProgressBySucess("分词成功");
		}catch (e) {
			console.info(e);
			$scope.hideProgressByError("分词异常");
		}
    };
    
    analyzerCompareWord = function(word,compareWord){
		var baseStr = word;
    	if(compareWord && compareWord != null){
    		var compareStr = compareWord.replace(regxpForHtml,"").replace(reg,"");
			for(var j=0;j<baseStr.length;j++){
				if(compareStr.indexOf(baseStr.charAt(j))!=-1){
					baseStr = baseStr.replace(new RegExp(baseStr.charAt(j),"g")," ");
				}
			}
			baseStr = baseStr.replace(new RegExp(/( )/g),"");
		}
		return baseStr;
    };
    
	analyzerOwnWord = function(word){
		var baseStr = null;
    	if(word && word != null){
			var compareStr = word.replace(regxpForHtml,"").replace(reg,"");
			baseStr = compareStr;
			for(var j=0;j<baseStr.length;j++){
				if(compareStr.indexOf(baseStr.charAt(j))!=compareStr.lastIndexOf(baseStr.charAt(j))){
					baseStr = baseStr.substr(0,j+1)+baseStr.substr(j+1).replace(new RegExp(baseStr.charAt(j),"g")," ");
				}
			}
			baseStr = baseStr.replace(new RegExp(/( )/g),"");
    	}
		return baseStr;
	};
    
    strConvertTable = function (baseStr,tdNum){
    	var result=null;
    	if(baseStr && baseStr!=null){
	    	result="<table class=\"table table-bordered\"><tbody>";
			var tdCount=0;
	    	for(var j=0;j<baseStr.length;j++){
				if(tdCount==tdNum-1){
					result=result+"<td>"+baseStr.charAt(j)+"</td></tr>";
					tdCount=0;
				}else if(tdCount%tdNum==0){
					result=result+"<tr><td>"+baseStr.charAt(j)+"</td>";
					tdCount++;
				}else{
					result=result+"<td>"+baseStr.charAt(j)+"</td>";
					tdCount++;
				};
			}
			if(tdCount!=0){
				for(;tdCount<tdNum;tdCount++){
					result=result+"<td></td>";
				};
			}
			result = result+"</tbody></table>";
    	}
		return result;
    };
	   
}]);
    
