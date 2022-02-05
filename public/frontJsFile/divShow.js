import {sendRequest} from "./sendRequest.js";

let newListbtn =document.getElementById("newListbtn");
let myListbtn =document.getElementById("myListbtn");
let completedWorkbtn =document.getElementById("completedWorkbtn");
let missedWorkbtn =document.getElementById("missedWorkbtn");

let newList=document.getElementById("newList")
let myList=document.getElementById("myList")
let completedWork=document.getElementById("completedWork")
let missedWork=document.getElementById("missedWork")

newListbtn.addEventListener("click",function(event){
    
    newList.setAttribute("style","display:inline")
    myList.setAttribute("style","display:none")
    completedWork.setAttribute("style","display:none")
    missedWork.setAttribute("style","display:none")
    
})
myListbtn.addEventListener("click",function(){
    newList.setAttribute("style","display:none")
    myList.setAttribute("style","display:inline")
    completedWork.setAttribute("style","display:none")
    missedWork.setAttribute("style","display:none")
    
})
completedWorkbtn.addEventListener("click",function(){
    newList.setAttribute("style","display:none")
    myList.setAttribute("style","display:none")
    completedWork.setAttribute("style","display:inline")
    missedWork.setAttribute("style","display:none")
    
})
missedWorkbtn.addEventListener("click",function(){
    newList.setAttribute("style","display:none")
    myList.setAttribute("style","display:none")
    completedWork.setAttribute("style","display:none")
    missedWork.setAttribute("style","display:inline")
    
})