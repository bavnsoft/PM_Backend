const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');


app.post('/project', (req, res, next) => {

 var data = req.files.upload.name;
		var splitname = data.split('.');
		var time = new Date().getTime() / 1000;
		var image_name = parseInt(time)
		+ "_."  + splitname[1];
		doc = image_name.trim(' ');
		// Use the mv() method to place the file somewhere on your server 
		req.files.upload.mv('uploads/project_document/' + doc, function (err) {
		    if (err)
		        console.log("error is:" + err);
		});
	


	let Data = new project({
		  serialno: req.body.serialno,
		  projectname: req.body.projectname,
		  startDate: req.body.startDate,
	      endDate: req.body.endDate,
	      upload: req.protocol+'://'+req.get('host')+'/project_document/'+doc,
	 
	 });

	 Data.save()
		   .then(Signupresult => {
			   return res.status(200).json({
		          message: "Project Added Successful",
		          status: true,
		         
		        });
		   })
		   .catch(err => {
		   	 console.log(err);
		      return res.status(201).json({
		          message: "Something went wrong,Please try again",
		          status: false,
		        });
		   })





});

app.post('/getproject', (req, res, next) => {

 
            project.find({}).then(result=>{
                    return res.status(200).json({
                              result: result,
                              status: true,
                              
                    });
            });

    

});



app.post('/addmilestone', (req, res, next) => {
           
          var milestone =JSON.stringify(req.body.milestone);
          var id =req.body.id;
          
      
        
            project.update({'_id': id}, {'$set': {
                    'milestone': milestone,
                                
                        }}).then(result=>{
                                 return res.status(201).json({message:"Milestone Added successfully",  status: true});

                     });
                                                       
    



});











module.exports = app;