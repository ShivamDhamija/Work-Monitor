let yesProfessionalRadio=document.getElementById("yesProfessionalRadio");
let noProfessionalRadio=document.getElementById("noProfessionalRadio");
let yesSubChoice=document.getElementById("yesSubChoice");
let newSubTask=document.getElementById("newSubTask");
let noOfSubTask=document.getElementById("noOfSubTask")

newSubTask.addEventListener("click",function(event){
    event.preventDefault()
    let noOfSubTaskValue=parseInt(noOfSubTask.value, 10)+1;
    noOfSubTask.setAttribute("value",noOfSubTaskValue);
    let yesSubChoiceDiv=document.getElementById("yesSubChoiceDiv");
    let div=document.createElement("div");
    let br=document.createElement("br");
    let input =document.createElement("input")
    let lable =document.createElement("label")
    lable.innerText="Enter name of sub-task : ";
    input.setAttribute("type","text");
    input.setAttribute("placeholder","Enter name of sub-task ");
    input.setAttribute("name","subTask"+noOfSubTaskValue.toString())
    div.appendChild(br);
    div.appendChild(lable);
    div.appendChild(input);
    yesSubChoiceDiv.appendChild(div);
    

})

yesProfessionalRadio.addEventListener("click",function(){
    yesSubChoice.setAttribute("style","display:inline") 
})
noProfessionalRadio.addEventListener("click",function(){
    yesSubChoice.setAttribute("style","display:none")
})