// IMPORT EXPRESS SERVER
const express = require('express');

// USE Router FOR EXPRESS SERVER
const router = express.Router();

//IMPORT EMPLOYEE MODEL AND BIND IT
const EmpModel = require('../models/employee_model');
//const EmpModel = require('../models/employee_schema');

// URL :- localhost:5000/emp/register  (USING POSTMAN POST)
/*
{
  "empid":500,
  "name":"Sachin22",
  "position":"Captain",
  "office":"Mumbai",
  "salary":300000
}
*/
// post is used to INSERT DOCUMENT/RECORD
// CALLBACK using lambda 
router.post('/register', (req, res) => {
  //Create Object of Employee Model Class
  // And Receive value from request body and Store value within the Object
  var empobj = new EmpModel({
    empid: req.body.empid,
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary,
  });
  //INSERT/SAVE THE RECORD/DOCUMENT
  empobj.save((err, inserteddocument) => {
    if (!err) {
      res.send('DOCUMENT INSERED IN MONGODB DATABASE' + '<br\>' + inserteddocument);
    }
    else {
      console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2));
    }
  });
});

// BROWSER URL :- localhost:5000/emp/viewall
// get IS USED FOR FETCHING DOCUMENTS FROM MONGODB
// CALLBACK using lambda 
router.get('/viewall', (req, res) => {
  EmpModel.find((err, getalldocumentsfrommongodb) => {
    if (!err) {
      res.send(getalldocumentsfrommongodb);
    }
    else {
      console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2));
    }
  });
});

// localhost:5000/emp/search/10
//SEARCH EMPLOYEE BY EMPID
// CALLBACK function for get method using lambda 
router.get('/search/:empid', (req, res) => {
  // "empid" : parseInt(req.params.empid) Convert empid String to Int
  EmpModel.find({ "empid": parseInt(req.params.empid) },
    // CALLBACK function for find method using lambda 
    (err, getsearchdocument) => {
      if (!err) { //Check Document find or not using document length
        if (getsearchdocument.length > 0)
          res.send(getsearchdocument);
        else
          res.send('INVALID EMP ID');
      }
      else {
        console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2));
      }
    });
});

// => localhost:5000/emp/remove/30     (USING POSTMAN DELETE)
//DELETE A DOCUMENT FROM MONGODB
router.delete('/remove/:empid',
  (req, res) => {
    EmpModel.findOneAndRemove({ "empid": parseInt(req.params.empid) },
      (err, deleteddocument) => {
        if (!err) {
          if (deleteddocument != null)
            res.send('DOCUMENT DELETED ' + deleteddocument);
          else
            res.send('INVALID EMP ID ' + req.params.empid);
        }
        else {
          console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2));
        }
      });
  });

// => localhost:5000/emp/update/20  (USING POSTMAN UPDATE)
//UPDATE DOCUMENT IN MONGODB
router.put('/update/:empid', (req, res) => {
  // And Receive value from request body and Store value within the Object
  var emp = {
    empid: req.body.empid,
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary,
  };
  // "empid" : parseInt(req.params.empid) Convert empid String to Int
  EmpModel.findOneAndUpdate({ "empid": parseInt(req.params.empid) },
    { $set: emp }, { new: true },
    //CALLBACK FUNCTION USING LAMBDA 
    (err, getupdateddocument) => {
      if (!err) { // EMPID IS NOT FOUND null WILL STORE in getupdateddocument
        if (getupdateddocument != null)
          res.send('DOCUMENT UPDATED ' + getupdateddocument);
        else
          res.send('INVALID EMP ID');
      }
      else {
        console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2));
      }
    });
}//CLOSE CALLBACK FUNCTION Line No 115
);//CLOSE PUT METHOD Line No 114

//SHOULD BE EXPORTED
module.exports = router;