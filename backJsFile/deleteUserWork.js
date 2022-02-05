let set=require("./set");
let readUserWork=require("./readUserWork");
/*isma data save krna ki h */
module.exports=function(userType,userName,whichField,keyOfTask,callback){

    readUserWork(function(err,works){
        if(err)
        res.send(err);
        else
        {
            if(typeof(keyOfTask)==='string')
                delete works[userType][userName][whichField][keyOfTask]
            if(typeof(keyOfTask)==='array')
            {
                const index = array.indexOf(keyOfTask);
                if (index > -1) 
                {
                    works[userType][userName][whichField].splice(index, 1);
                }
            }
            set("./userWorkDetail.txt",JSON.stringify(works),function(err){
                if(err)
                    callback("error while writing new user detail")
                else
                    callback(null,true);
                })
        }
    })

}