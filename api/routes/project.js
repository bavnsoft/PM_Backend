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




app.post('/getproject', (req, res, next) => {

		  var user_id =req.body.user_id;

			console.log(user_id)
			project.find({}).then(result=>{
					return res.status(200).json({
					          result: result,
					          status: true,
					          
					});
			});

	

});





    /* var username = req.body.username;
     //var gender = req.body.gender;
     var status = req.body.status;
     var email = req.body.email;
     var mobileNumber = req.body.mobileNumber;
     var hashedPassword = bcrypt.hashSync(req.body.password, 8);
     var encryptedString = cryptr.encrypt(req.body.password);

   	 let Data = new usermodel({
		  username: username,
		  gender: '',
		  fullName:'',
		  DOB:'',
		  religion:'',
		  wanna_find:'',
		  child:'',
		  address:'',
		  status: status,
		  email: email,
		  mobileNumber: mobileNumber,
		  password: hashedPassword,
		  encryptedpass:encryptedString,
		  mobile_verified_status:'',
		  otp_expire_time:'',
		  otp:'',
		  role:'EMAIL'

		  
	 });


	
     	usermodel.find({email: email}).then(checkEmail=>{

     		usermodel.find({username: username}).then(checkusername=>{

     			usermodel.find({mobileNumber: mobileNumber}).then(checkmobileNumber=>{

                     console.log(checkEmail.length,'checkEmail' )
                     console.log(checkusername.length,'checkusername' )
                     console.log(checkmobileNumber.length,'checkmobileNumber' )
				    if(checkEmail.length == 0 && checkusername.length == 0  && checkmobileNumber.length == 0  ){
					    Data.save()
						   .then(Signupresult => {
						   	var token = jwt.sign({ id: checkEmail._id }, "ADNDJKWEDJKSABSCNMCBNXZCHSADA", {
						      expiresIn: 86400 // expires in 24 hours
						    });
						     return res.status(200).json({
					          message: "Signup Successful",
					          status: true,
					          token:token,
					          user_id:Signupresult._id
					        });
						   })
						   .catch(err => {
						   	 console.log(err);
						      return res.status(201).json({
						          message: err,
						          status: false,
						        });
						   })

					    }else{
					    	   if(checkEmail.length > 0){
					                return res.status(201).json({
							          message: 'Email ' + email + ' is already taken',
							          status: false,
							        });
					            }else if(checkusername.length > 0){
					            	 return res.status(201).json({
							          message: 'Username ' + username + ' is already taken',
							          status: false,
							        });

					            }else if(checkmobileNumber.length > 0){
					            	 return res.status(201).json({
							          message: 'Mobile No ' + mobileNumber + ' is already taken',
							          status: false,
							        });

					            }
					    }
   		 			 })
   	  		})
  	   })*/
	  
})





module.exports = app;