var db=require('../models/sqldb');
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};
module.exports.getSyncLogSummary=function(req,res){
	var q="SELECT *FROM (	SELECT DataName AS dataName,Status AS [status],COUNT(1) AS c FROM dbo.IntegrationLog with(nolock) GROUP BY DataName, Status ) as s PIVOT(    SUM([c])    FOR [status] IN (New,NoNeedUpload,UpdateSuccess,Exception,Processing,Inqueue))AS pvt";
	db.select(q,function(r){		
		sendJSONresponse(res,200,r);
	});
}

module.exports.getSyncErrors=function (req,res) {
	var q="SELECT ID, DataName,Destination,Key1,key2,Key3,Result,EntityXml,PostEntityXml,SyncTimes,CreatedBy,CreatedDttm,UpdatedDttm FROM dbo.IntegrationLog WHERE Status='exception' ORDER BY CreatedDttm DESC";
	db.select(q,function(r){		
		sendJSONresponse(res,200,r);
	});
}