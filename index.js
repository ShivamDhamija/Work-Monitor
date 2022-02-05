const express=require("express");
const fs=require("fs");

const { v4: mailTokenId } = require('uuid');
const session=require("express-session");
//password encription
const bcrypt = require('bcrypt');
const saltRounds = 10;
//
const { use } = require("express/lib/application");

const app=express();
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set("view engine","ejs");

const readUser=require("./backJsFile/readUser")
const readUserWork=require("./backJsFile/readUserWork")
const setUser=require("./backJsFile/setUser")
const setUserWork=require("./backJsFile/setUserWork");
const deleteUserWork=require("./backJsFile/deleteUserWork")
const updatUserWorkChange=require("./backJsFile/updatUserWorkChange");
const updatPuttInUpdate=require("./backJsFile/updatePuttInUpdate")
const updatePuttInMissed=require("./backJsFile/updatePuttInMissed");
const sendEmail=require("./mail/sendEmail");
const passwordEmail=require("./mail/passwordEmail");
const updateWholeUserData=require("./backJsFile/updateWholeUserData")

const { redirect } = require("express/lib/response");
const { verify } = require("crypto");

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

app.route("/")
.get(function(req,res){
    if(req.session.isLoggedIn==true)
    res.redirect("main")
    else
    res.render("login",{err:""});
})
.post(function(req,res){
    var{userName,userPassword}=req.body
    if(userName===""||userPassword==="")
    {
        res.render("login",{err:"pleas enter write detailss"});
          return;
    }
    readUser(function(err,users){
        if(err)
        res.render("login",{err:" and users data not found"})
        else
        { 
            
            if(userName in users["daily"]&&
            bcrypt.compareSync(userPassword,users["daily"][userName]["userPassword"])){
                req.session.isLoggedIn=true;
                req.session.userDetail=users["daily"][userName];
                delete req.session.userDetail["userPassword"]
                res.redirect("main")
                /*send user to main page */
            }
            else if(userName in users["professional"]&&
            bcrypt.compareSync(userPassword,users["professional"][userName]["userPassword"])){
                req.session.isLoggedIn=true;
                req.session.userDetail=users["professional"][userName];
                res.redirect("main")
                /*send user to main page */
            }
            else{
                res.render("login",{err:"doesnot exist"})
            }
        }
    })
})
app.route("/main")
.get(function(req,res){
let userType=req.session.userDetail.userType
let userName= req.session.userDetail.userName
let confirm=req.session.userDetail.emailVerify
if(confirm){    
    updatePuttInMissed(userName,userType,function(details){
        if(details===null)
        {
            res.render("main",
            {
                userDetail:req.session.userDetail,
                noInputsYet:false,
                showdiv:"newList",
                task:{},
                completedWork:[],
                inCompletedWork:[]
            })
        }
        else
        {
            res.render("main",
            {
                userDetail:req.session.userDetail,
                noInputsYet:true,
                showdiv:"myList",
                task:details.task,
                completedWork:details.putInCompleted,
                inCompletedWork:details.puttInMissed
            })
        }
    })
}
else
{
    res.redirect("/verify",{err:""})
}
})

app.route("/markCompleted")
.post(function(req,res){

    let {userType,userName}=req.session.userDetail;
    let{keyOfTask}=req.body;
    let m={"completed":true,
        "puttInCompleted":true,
        "missed":false,
        "puttInMisseds":false}
    updatUserWorkChange(userType,userName,"task",keyOfTask,m,function(err,bool){
        if(err)
        res.send("updata of range doesn't work try agaain!!!")
        if(bool)
        { 
            deleteUserWork(userType,userName,"task",keyOfTask,function(err,bool2){
                if(err)
                res.send("updata of range doesn't work try agaain!!!")
                if(bool2)
                res.redirect("main");
            })
            
        }
    })
})

app.route("/deleteFromData")
.post(function(req,res){
    let {userType,userName}=req.session.userDetail;
    let{keyOfTask}=req.body;
    deleteUserWork(userType,userName,"task",keyOfTask,function(err,bool){
        if(err)
        res.send("updata of range doesn't work try agaain!!!")
        if(bool)
        res.redirect("main");  
    })
})

app.route("/markChange")
.post(function(req,res){
  
    let {userType,userName}=req.session.userDetail;
    let{keyOfTask,workRange}=req.body;
    updatUserWorkChange(userType,userName,"task",keyOfTask,{"currentSelectRange":workRange},function(err,bool){
        if(err)
        res.send("updata of range doesn't work try agaain!!!")
        if(bool)
        res.redirect("main");
    })
    
})

app.route("/addInWorkData")
.post(function(req,res){
   let {userType,userName}= req.session.userDetail;
   let totalDetails
   //console.log(req.body)
   if(userType==="daily")
    {
       let{day,month,year,taskName,rangeChoice,rangeValue}=req.body
       taskDate=`${day}-${month}-${year}`
       totalDetails={userType,userName,taskDate,taskName,rangeChoice,rangeValue,day,month,year}
       totalDetails.currentSelectRange=0;
    }
   else
   {
    let{day,month,year,hour,minute,taskName,subChoice,reportingHeadName,...noOfSubTask}=req.body
       taskDate=`${day}-${month}-${year}`
       totalDetails={userType,userName,taskDate,taskName,reportingHeadName,hour,minute,subChoice,noOfSubTask,day,month,year}
       
       
       //console.log(totalDetails)
   } 
   totalDetails["completed"]=false
   totalDetails["puttInCompleted"]=false
   totalDetails["missed"]=false
   totalDetails["puttInMisseds"]=false
   
      setUserWork(totalDetails,"",userType,userName,function(err,bool){
       if(err)
       {
           res.send(err);
       }
       if(bool)
       {
           res.redirect("main");
       }
   })

})

app.route("/sigin")
.get(function(req,res){
    if(req.session.isLoggedIn==true)
    res.redirect("main")
    else
    res.render("sigin",{err:""});
})
.post(function(req,res){
    let {name,userName,userEmail,userPassword,userConfirmPassord,userType}=req.body;
    if(userPassword!=userConfirmPassord)
    res.render("sigin",{err:"password donot match"})
    
    const hash = bcrypt.hashSync(userPassword, saltRounds);
    userPassword=hash;
    let newUser={name,userName,userEmail,userPassword,userType,emailVerify:false}
    newUser["mailToken"]=mailTokenId();
    //console.log(newUser["mailToken"])
    setUser(newUser,function(error,bool){
        if(error)
        {
            res.render("sigin",{err:error});
        }
        if(bool)
        {
            req.session.isLoggedIn=true;
            req.session.userDetail=newUser;
            delete req.session.userDetail["userPassword"]
            res.redirect("main");
            
        }
    })
})

app.post("/logOut",function(req,res){
    req.session.destroy();
	res.redirect("/")
})


app.route("/verify")
.get(function(req,res){
    res.render("verifyPage",{err:"Come again after verifying page"});
})
.post(function(req,res){

    const email=req.session.userDetail.userEmail;
    const userName=req.session.userDetail.userName
    const userType=req.session.userDetail.userType
    const mailToken=req.session.userDetail.mailToken
    const port="localhost:3000"
    sendEmail(email,userName,userType, mailToken ,port,function(err,body)
    {
        if(err)
        { 
            res.render("verifyPage", { err: "something got wrong with server" })
            return
        }
        else
        res.render("verifyPage",{err:"Come again after verifying page"})
    })
})

app.get("/verifymail/:token/:userName/:userType", function(req, res)
{
    const {token,userName,userType} = req.params;
    //console.log(req.params)
    readUser(function(err,users){
        if(users[userType][userName]["mailToken"]===token)
        {            
            users[userType][userName]["emailVerify"]=true;
            updateWholeUserData(users,function (err,bool) {
                if(err)
                res.send(err)
                if(bool)
                {
                    req.session.isLoggedIn=true;
                    req.session.userDetail=users[userType][userName];
                    delete req.session.userDetail["userPassword"]
                    res.redirect("/main")
                   
                }
            })
        }
        else res.render("verifyPage",{err:"try again by sending new mail"})
    })
    
})

app.route("/forgotPassword")
.get(function(req,res){
    res.render("passwordForgotPage",{err:""})
})
.post(function (req,res) {
    const port="localhost:3000";
    if(req.session.isLoggedIn)
    {
        const mailToken=req.session.userDetail.mailToken
        const {userName,userType,userEmail} = req.session.userDetail;
        
        sendVerifyMail(userEmail,userName,userType,port,mailToken,function (err){
            if(err)
                {
                    res.send("something went wrong try again")
                }
                else
                {
                    res.render("verifyPasswordEmail")
                }
            })
    }
    else
    {
        const {userName,userType,userEmail}=req.body
        readUser(function(err,users)
        {
            if(users[userType][userName])
            {
                if(users[userType][userName]["userEmail"]===userEmail)
                {
                    const mailToken=users[userType][userName]["mailToken"]
                    sendVerifyMail(userEmail,userName,userType,port,mailToken,function (err){
                    if(err)
                        {
                            res.send("something went wrong try again")
                        }
                        else
                        {
                            res.render("verifyPasswordEmail")
                        }
                    })
                }
                else
                    res.render("passwordForgotPage",{err:"Email attach with this user is different try again"})                
            }
            else
            res.render("passwordForgotPage",{err:"no user of this name exist"})
        })
    }
})

function sendVerifyMail(userEmail,userName,userType,port,mailToken,callback) {
    passwordEmail(userEmail,userName,userType,mailToken,port,function (err,body) {
        if(err)
        callback(err)
        else
        callback(null)
    })
}

app.get("/paasswordChange/:token/:userName/:userType",function (req,res) {
    const {token,userName,userType} = req.params;
    readUser(function(err,users){
        if(users[userType][userName]["mailToken"]===token)
        {                       
                    req.session.isLoggedIn=true;
                    req.session.userDetail=users[userType][userName];
                    delete req.session.userDetail["userPassword"]
                    res.render("passwordPage",{err:""})
        }
        else res.send("somethig got wrong try again");
    
    })
})

app.post("/changePassword",function (req,res) {
    let {userPassword,userConfirmPassord}=req.body
    if(userPassword!=userConfirmPassord)
        res.render("passwordPage",{err:"passwoed didn't match try again."})
    else{        
        const{userName,userType}  =req.session.userDetail
        readUser(function(err,users){
            const hash = bcrypt.hashSync(userPassword, saltRounds);
            userPassword=hash;
            users[userType][userName]["userPassword"]=userPassword;
            updateWholeUserData(users,function (err,bool) {
                if(err)
                res.send(err)
                if(bool)
                {
                    res.redirect("/main")                  
                }
            })
        })
    }

})

app.get("*",function(req,res){
    res.send(
    "404, page you are looking for doesn't exist try some existing page "
    );
})

app.listen(3000,function(){
    console.log("running on 3000")
})