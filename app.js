const express = require("express")
const app =express()
const request=require("request")
const bodyParser=require("body-parser")
const https=require("https")




app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})
app.post("/",function(req,res){
    const Fname=req.body.Fname
    const Lname=req.body.Lname
    const Email=req.body.Email
    const  data ={
        members:[{
            email_address:Email,
            status:"subscribed",
            merge_fields:{
                FNAME:Fname,
                LNAME:Lname
            }
        }
        ]
    }

    const jsondata = JSON.stringify(data)
    const url ="https://us14.api.mailchimp.com/3.0/lists/05cc9a7a74"
    const options={
        method:"POST",
        auth:"lokesh903:cf46bd3fb595fef71dc5a99b33b704cb-us14"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode==200){
            var pat= __dirname+"/success.html"
            res.sendFile(pat)
        }else{
            var pat= __dirname+"/failure.html"
            res.sendFile(pat)
        }
        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
    })
    request.write(jsondata)
    request.end()

})
app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000,function(){
    console.log("server is listning at port 3000");
})
//API KEY
//cf46bd3fb595fef71dc5a99b33b704cb-us14
//audi id 05cc9a7a74