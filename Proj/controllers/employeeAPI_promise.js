// IMPORT EXPRESS SERVER
const express = require('express');

// USE Router FOR EXPRESS SERVER
const router = express.Router();

//IMPORT EMPLOYEE MODEL AND BIND IT
const EmpModel = require('../models/employee_schema');

// URL :- localhost:5000/emp/register  (USING POSTMAN POST)
/*
{
  "empid":500,
  "name":"Sachin",
  "position":"Team Lead",
  "office":"Mumbai",
  "salary":300000
}
*/
// post is used to INSERT DOCUMENT/RECORD
// CALLBACK using lambda 
router.post('/register', (req, res) => {

  //Create Object of Employee Model Class
  // And Receive value from request body and Store value within the Object
  const empobj = new EmpModel({
    empid: req.body.empid,
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary,
  });//CLOSE EmpModel
  //INSERT/SAVE THE RECORD/DOCUMENT
  empobj.save()
    .then(inserteddocument => {
      res.status(200).send('DOCUMENT INSERED IN MONGODB DATABASE' + '<br\>' + inserteddocument);
    })//CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Employee Save ' })
    });//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY
);//CLOSE POST METHOD


// BROWSER URL :- localhost:5000/emp/viewall 
// get IS USED FOR FETCHING DOCUMENTS FROM MONGODB
// CALLBACK using lambda 
router.get('/viewall', (req, res) => {
  EmpModel.find()
    .then(getalldocumentsfrommongodb => {
      res.status(200).send(getalldocumentsfrommongodb);
    }) //CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
    });//CLOSE CATCH
} //CLOSE CALLBACK FUNCTION BODY    
);//CLOSE GET METHOD

// localhost:5000/emp/search/10
//SEARCH EMPLOYEE BY EMPID
// CALLBACK function for get method using lambda 
router.get('/search/:empid', (req, res) => {
  // "empid" : parseInt(req.params.empid) Convert empid String to Int
  EmpModel.find({ "empid": parseInt(req.params.empid) })
    .then(getsearchdocument => {
      if (getsearchdocument.length > 0) {
        res.send(getsearchdocument);
      }
      else {
        return res.status(404).send({ message: "Note not found with id " + req.params.empid });
      }
    }) //CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in Retriving with id " + req.params.empid });
    })//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY
);//CLOSE GET METHOD


// => localhost:5000/emp/remove/30     (USING POSTMAN DELETE)
//DELETE A DOCUMENT FROM MONGODB
router.delete('/remove/:empid', (req, res) => {
  EmpModel.findOneAndRemove({ "empid": parseInt(req.params.empid) })
    .then(deleteddocument => {
      if (deleteddocument != null) {
        res.status(200).send('DOCUMENT DELETED successfully!' + deleteddocument);
      }
      else {
        res.status(404).send('INVALID EMP ID ' + req.params.empid);
      }
    }) //CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in Delete with id " + req.params.empid });
    })//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY
); //CLOSE Delete METHOD


// => localhost:5000/emp/update/20  (USING POSTMAN UPDATE)
/*
{
  "position":"Manager",
  "office":"Noida",
  "salary":7777777
}
*/
//UPDATE DOCUMENT IN MONGODB
router.put('/update/:empid', (req, res) => {
  // "empid" : parseInt(req.params.empid) Convert empid String to Int
  EmpModel.findOneAndUpdate({ "empid": parseInt(req.params.empid) },
    {
      $set: {
        "position": req.body.position,
        "office": req.body.office,
        "salary": req.body.salary
      }
    }, { new: true })
    .then(getupdateddocument => {
      if (getupdateddocument != null)
        res.status(200).send('DOCUMENT UPDATED ' + getupdateddocument);
      else
        res.status(404).send('INVALID EMP ID ' + req.params.empid);
    }) // CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in UPDATE with id " + req.params.empid });
    }) // CLOSE CATCH
} //CLOSE CALLBACK FUNCTION
); //CLOSE PUT METHOD


//SHOULD BE EXPORTED
module.exports = router;