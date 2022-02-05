let set=require("./set");
/*isma data save krna ki h */
module.exports=function(users,callback){

    set("./userDetail.txt",JSON.stringify(users),function(err){
        if(err)
        callback("error while writing new user detail in setUser",false)
        else
        {
            callback("",true);
        }
    })
}