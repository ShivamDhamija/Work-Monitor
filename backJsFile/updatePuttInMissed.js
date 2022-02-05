let readUserWork=require("./readUserWork")
module.exports=function(userName,userType,callback){
    readUserWork(function(err,usersWork){
        if(err)
        res.send("something got wrong in calling your data");
        else
        {
            works=usersWork[userType][userName]
            if(works==={})
            {
                callback(null)
            }
            else
            {//console.log(works.task)
                date1 = new Date();//"Dec 15, 2021, 21:45:10"
                newIndex={}
                Object.entries(works.task).map(function([key, val])
                {    
                        if(val.hour&&val.minute)
                        date2 = new Date (val.month+" "+val.day+", "+val.year+", "+val.hour+":"+val.minute);
                        else
                        date2=new Date(val.month+" "+val.day+", "+val.year); 
                        var total_seconds = (date2 - date1) / 1000;
                        var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                        if(days_difference<0&&!val.putInCompleted)
                        {
                            //set missed and put in missed true in task and add data in missed 
                            val.puttInMissed=true;
                            val.missed=true;
                            val["indexSetter"]=days_difference
                            works.puttInMissed.push(val);
                        }             
                        val["indexSetter"]=days_difference  
                       // console.log(days_difference)
                        newIndex[key]= days_difference ;                   
                })
                const ordered  = Object.fromEntries(
                    Object.entries(newIndex).sort(([,a],[,b]) => a-b)
                );
                //console.log(ordered)
                let newTask={}
                Object.entries(ordered).map(function([newKey,values]){
                    newTask[newKey]=works.task[newKey];
                })
                //console.log(newTask)
                works.puttInMissed.sort(function(a, b){return a.indexSetter - b.indexSetter});
                callback(
                    {
                        task:newTask,
                        putInCompleted:works.putInCompleted,
                        puttInMissed:works.puttInMissed
                    }
                )
                
            }
        }
    })
}