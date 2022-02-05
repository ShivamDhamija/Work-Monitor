let yesDailyRadio=document.getElementById("yesDailyRadio");
let noDailyRadio=document.getElementById("noDailyRadio");
let yesRangeChoice=document.getElementById("yesRangeChoice");
yesDailyRadio.addEventListener("click",function(){
    yesRangeChoice.setAttribute("style","display:inline") 
})
noDailyRadio.addEventListener("click",function(){
    yesRangeChoice.setAttribute("style","display:none")
})