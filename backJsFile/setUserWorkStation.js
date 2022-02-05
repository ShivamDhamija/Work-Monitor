let set=require("./set");
let readUserWork=require("./readUserWork");
/*isma data save krna ki h */
module.exports=function(newUser,callback){
    readUserWork(function(err,usersWorkDetail){
        if(err)
        callback("readUser is not reading in setUserWorkStation",false)
        let {userType,userName}=newUser;
        usersWorkDetail[userType][userName]={"task":{},"putInCompleted":[],"puttInMissed":[]};
        
        set("./userWorkDetail.txt",JSON.stringify(usersWorkDetail),function(err){
            if(err)
            callback("error while writing new user work basic data detail",false)
            else
            callback(null,true);
        })
    })
}