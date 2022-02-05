let set=require("./set");
let readUser=require("./readUser");
let setUserWorkStation=require("./setUserWorkStation");
/*isma data save krna ki h */
module.exports=function(newUser,callback){
    readUser(function(err,users){
        if(err)
        callback("readUser is not reading",false)
        let {userType,userName}=newUser;
        usersTypeData=users[userType]
        
        if(Object.keys(usersTypeData).length>0)
            if(userName in usersTypeData)
            {
                callback("User with same User-Name exist, try with some other name")
                return;
            }
        users[userType][userName]=newUser;
        set("./userDetail.txt",JSON.stringify(users),function(err){
            if(err)
            callback("error while writing new user detail in setUser",false)
            else
            {
                setUserWorkStation(newUser,function(err,bool){
                    if(err)
                    callback(err)
                    if(bool)
                    callback(null,true);
                })
            }
        })
    })
}