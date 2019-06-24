const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');


app.post('/department', (req, res, next) => {
console.log (req.body);


	let Data = new department({
		  departmentname: req.body.departmentname,
		  
	 });

	 Data.save()
		   .then(Signupresult => {
			   return res.status(200).json({
		          message: "Department Added Successful",
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




app.post('/getdepartment', (req, res, next) => {

		  var user_id =req.body.user_id;

			console.log(user_id)
			department.find({}).sort({"_id":-1}).then(result=>{
					return res.status(200).json({
					          result: result,
					          status: true,
					          
					});
			});

	

});



app.post('/deletedepartment', (req, res, next) => {
		    var id =req.body.id;
			department.remove({_id:id})
				   .then(emp => {
				   	return res.status(200).json({
					          result: emp,
					          status: true,
					          message:"Depatment deleted successfully"
					          
					});

		      });

	

});


app.post('/editDepartment', (req, res, next) => {
		console.log(req.body)
		department.update({'_id': req.body.id}, {'$set': {
        'departmentname': req.body.departmentname,
                    
            }}).then(result=>{
                     return res.status(201).json({message:"Depatment updated successfull",  status: true});

		             });

		

	

	

});



module.exports = app;