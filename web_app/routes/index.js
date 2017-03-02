var express = require('express');
var router = express.Router();

var checkedVal = null;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Child Behavior Checklist'});
});

// var inputElements = document.getElementsByTypeName('checkbox');
// for(var i=0; inputElements[i]; ++i){
//       if(inputElements[i].checked){
//            checkedVal = inputElements[i].value;
//            console.log(checkedVal)
//            break;
//       }
// }

module.exports = router;
