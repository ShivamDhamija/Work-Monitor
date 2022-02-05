let set=require("./set");
let readUserWork=require("./readUserWork");
const { v4: workUniqueName } = require('uuid');
/*isma data save krna ki h */
module.exports=function(newAddition,oldWorkUniqueName,userType,userName,callback){
    readUserWork(function(err,works){
        if(err)
        callback("readUserWork is not reading")
        if(oldWorkUniqueName==="")
        {
            let id=workUniqueName();
            works[userType][userName]["task"][id]=newAddition
            works[userType][userName]["task"][id]["id"]=id;
        }
        else
            works[userType][userName]["task"][oldWorkUniqueName]=newAddition
    
        set("./userWorkDetail.txt",JSON.stringify(works),function(err){
        if(err)
            callback("error while writing new user detail")
        else
            callback(null,true);
        })
    
    })
}

