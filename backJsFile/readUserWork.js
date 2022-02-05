let read=require("./read");
/*isma data save krna ki h */
module.exports=function(callback){
    read("./userWorkDetail.txt",function(err,data){
        if(err){
            callback("users-work data not found")
        }
        let workDetail={"daily":{},"professional":{}}
        if(data.length>0&&data[0]==="{"&&data[data.length-1]==="}")
        workDetail=JSON.parse(data);
        callback(null,workDetail);
    })
}