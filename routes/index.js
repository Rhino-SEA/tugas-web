var express = require('express');
var router = express.Router();
const db = require('../config/database');


/* GET home page. */
router.get('/', function(req, res, next) {
  db.query('SELECT * from data_mahasiswa', function(err, results){
    if(!err) {
      res.render("home", { data: results,
                           message: req.flash('flashmessage')})
    }
    else {
      res.send(err.message)
    }
  });
});

router.get('/delete/:id', function(req, res) { 
  db.query(
    `DELETE FROM data_mahasiswa WHERE id="${req.params.id}"`,
    function (err, success) {
      if(!err) {
        req.flash('flashmessage', 'Data berhasil dihapus');
        res.redirect('/');
      }
      else {
        res.send(err.message)
      }
    }
  );
});


module.exports = router;
