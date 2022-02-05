let set=require("./set");
let readUserWork=require("./readUserWork");
/*isma data save krna ki h */
module.exports=function(userType,userName,whichField,task,callback){

    readUserWork(function(err,works){
        if(err)
        res.send(err);
        else
        {    
                    works[userType][userName][whichField].unshift(task);
               
            set("./userWorkDetail.txt",JSON.stringify(works),function(err){
                if(err)
                    callback("error while writing new user detail")
                else
                    callback(null,true);
                })
        }
    })

}