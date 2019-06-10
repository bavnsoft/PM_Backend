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
     console.log(req.protocol+'://'+req.get('host')+'/Emp_img/'+pictures)
	let Data = new employee({
		  employeeid: req.body.employeeid,
		  employeename: req.body.employeename,
		  employeedepartment: req.body.employeedepartment,
	      employeeprofile: req.protocol+'://'+req.get('host')+'/Emp_img/'+pictures,
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