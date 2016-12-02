var PLUMDO = PLUMDO || {};

PLUMDO.URL = {

  
	analyzerOneWord: function(tdNum){
    	return PLUMDO.CONFIG.contextRoot + '/word-analyzer/one/'+tdNum;
    },
    analyzerTwoWord: function(tdNum){
    	return PLUMDO.CONFIG.contextRoot + '/word-analyzer/two/'+tdNum;
    }
    
};