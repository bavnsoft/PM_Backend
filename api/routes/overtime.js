const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');


app.post('/overtime', (req, res, next) => {


	let Data = new overtime({
		  overtimeDate: req.body.overtimeDate,
		  Time: req.body.Time,
		  id: req.body.id,

		 
	 
	 });

	 Data.save()
		   .then(Signupresult => {
			   return res.status(200).json({
		          message: "Overtime Added Successful",
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



app.post('/getovertime', (req, res, next) => {
		  var user_id =req.body.user_id;
            overtime.find({}).then(result=>{
                    return res.status(200).json({
                              result: result,
                              status: true,
                              
                    });
            });

    

});


app.post('/deleteovertime', (req, res, next) => {
		    var Timeid =req.body.Timeid;
			overtime.remove({_id:Timeid})
				   .then(emp => {
				   	return res.status(200).json({
					          result: emp,
					          status: true,
					          message:"Deleted successfully"
					          
					});

		      });

	

});


app.post('/GetovertimeId', (req, res, next) => {
	overtime.find({_id:req.body.id}).then(result=>{
		return res.status(200).json({
		          result: result,
		          status: true,
		          
		});
	 });
  		  
})




app.post('/editovertime', (req, res, next) => {


        overtime.update({'_id': req.body.id}, {'$set': {
                    'overtimeDate': req.body.overtimeDate,
                    'Time': req.body.Time,
                  //  'Timeid': req.body.Timeid,
                }}).then(result=>{
                     return res.status(201).json({message:"Updated successfull",  status: true});

		             });

		

	

});



module.exports = app;