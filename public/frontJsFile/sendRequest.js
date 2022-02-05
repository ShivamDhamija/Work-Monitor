export function sendRequest (whatToDo,url,callback){
    var request = new XMLHttpRequest();
    
        request.open(whatToDo,url);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify({ img:img}));
        request.addEventListener("load", function(){
            if(request.status === 200)
            {
                callback();
            }
        })
}