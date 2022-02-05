let readUserWork=require("./readUserWork")
let setUserWork=require("./setUserWork");
let updatPuttInUpdate=require("./updatePuttInUpdate");

module.exports=function(userType,userName,whichField,keyOfTask,whatChange,callback){
    readUserWork(function(err,workDetail){
        if(err)
        res.send(err);
        else
        {              
            let changeData=workDetail[userType][userName][whichField][keyOfTask];
            Object.entries(whatChange).map(function([key, value]){
                changeData[key]=value;
            })
            changeData["taskCompletedDate"]=new Date().getDate()+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear()
            
            setUserWork(changeData,keyOfTask,userType,userName,function(err,bool){
                if(err)
                callback("updata of range doesn't work try agaain!!!")
                if(bool)
                {  
                    if(Object.keys(whatChange).length===4)
                    {
                        
                        updatPuttInUpdate(userType,userName,"putInCompleted",changeData,function(err,bool){
                            if(err)
                            callback("something goet wrong in updatPuttInUpdate inside updatUserWorkChange")
                            if(bool)
                            callback(null,true)
                        })
                                               
                    }
                    else
                    callback(null,true)
                }
            })
        }
    })
}