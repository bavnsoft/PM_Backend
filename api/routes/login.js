const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

app.post('/', (req, res, next) => {

     var Email = req.body.email;
     var password = req.body.password;
  
     	 employee.find({$and: [{employeeemail: Email},{EmpPassword: password}]}).then(user=>{
			    if (user.length==0){
			    	   res.status(201).send({ status: false, user_id:null,message: 'Invalid login credentials' });
			    }else{ 
                       res.status(200).send({ status: true, message:"Login successfull" ,user_id:user[0]._id,role:user[0].role});
                        
					    
			     }

		     }).catch(err => {
			   	 console.log(err);
			      return res.status(504).json({
			          message: "Error on the server.",
			          status: false,
			          user_id:null
			        });
			   })

  
    
			  
})

module.exports = app;