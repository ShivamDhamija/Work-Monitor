let read=require("./read");
/*isma data save krna ki h */
module.exports=function(callback){
    read("./userDetail.txt",function(err,data){
        if(err){
            callback("users data not found")
            return
        }

        let users={"daily":{},"professional":{}}
        if(data.length>0&&data[0]==="{"&&data[data.length-1]==="}")
        users=JSON.parse(data)
        callback(null,users);
    })
}