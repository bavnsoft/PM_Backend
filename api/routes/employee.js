const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');


app.post('/employee', (req, res, next) => {

        var data = req.files.employeeprofile.name;
		var splitname = data.split('.');
		var time = new Date().getTime() / 1000;
		var image_name = parseInt(time)
		+ "_."  + splitname[1];
		pictures = image_name.trim(' ');
		// Use the mv() method to place the file somewhere on your server 
		req.files.employeeprofile.mv('uploads/Emp_img/' + pictures, function (err) {
		    if (err)
		        console.log("error is:" + err);
		});
	
		 var empPass = Math.random().toString(36).slice(-8);
			
				let Data = new employee({
					  employeeid: req.body.employeeid,
					  employeename: req.body.employeename,
					  employeeemail: req.body.employeeemail,
					  PhoneNo: req.body.PhoneNo,
					  EmpPassword: empPass,
					  employeedepartment: req.body.employeedepartment,
				      employeeprofile: req.protocol+'://'+req.get('host')+'/Emp_img/'+pictures,
				      role: "user",

				 });


				 Data.save()
					   .then(Signupresult => {
						   return res.status(200).json({
					          message: "Add Employee Successful",
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
  
})






app.post('/GetEmpById', (req, res, next) => {
	employee.find({_id:req.body.id}).then(result=>{
		return res.status(200).json({
		          result: result,
		          status: true,
		          
		});
	 });
  		  
})

app.post('/getempolyes', (req, res, next) => {

		  var user_id =req.body.user_id;

			employee.find({}).then(result=>{
					return res.status(200).json({
					          result: result,
					          status: true,
					          
					});
			});

	

});


app.post('/autogenrate', (req, res, next) => {


var empl_id = [];
			employee.find({}).then(result=>{
				for(let i=0;i<result.length;i++){
		     // console.log(result[i].employeeid)

                   empl_id.push(result[i].employeeid)
	            }
	            console.log(Math.max.apply(null, empl_id))
		         return res.status(200).json({
			          maxvalue: Math.max.apply(null, empl_id)+1,
			          status: true,

				});
           });

});


app.post('/editempolyes', (req, res, next) => {


   if(req.files){
   	
   	  var data = req.files.employeeprofile.name;
		var splitname = data.split('.');
		var time = new Date().getTime() / 1000;
		var image_name = parseInt(time)
		+ "_."  + splitname[1];
		pictures = image_name.trim(' ');
		// Use the mv() method to place the file somewhere on your server 
		req.files.employeeprofile.mv('uploads/Emp_img/' + pictures, function (err) {
		    if (err)
		        console.log("error is:" + err);
		});

		 var employeeprofile = req.protocol+'://'+req.get('host')+'/Emp_img/'+pictures;
       }else{
   	     var employeeprofile = req.body.employeeprofile;
   }
        employee.update({'_id': req.body.id}, {'$set': {
                    'employeeid': req.body.employeeid,
                    'employeename': req.body.employeename,
                    'PhoneNo': req.body.PhoneNo,
                    'employeedepartment': req.body.employeedepartment,
                    'employeeprofile': employeeprofile
                }}).then(result=>{
                     return res.status(201).json({message:"Employee updated successfull",  status: true});

		             });

		

	

});



app.post('/deleteempolyes', (req, res, next) => {
		    var employeeid =req.body.employeeid;
			employee.remove({_id:employeeid})
				   .then(emp => {
				   	return res.status(200).json({
					          result: emp,
					          status: true,
					          message:"Employee deleted successfully"
					          
					});

		      });

	

});



module.exports = app;