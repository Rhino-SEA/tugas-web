var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const db = require('../config/database')

const urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    db.query(
      `SELECT * FROM data_mahasiswa WHERE id="${req.params.id}"`,
      function(err, results, fields){
        res.render("update-page", {results:results[0]})
      }
    );
});

router.post('/:id', urlencodedParser, [
    check('nama', 'Kolom Nama masih kosong')
      .not().isEmpty(),
    check('nim', 'Kolom NIM masih kosong')
      .not().isEmpty(),
    check('fakultas', 'Kolom Fakultas masih kosong')
      .not().isEmpty()
  ], (req, res)=> {
    const err = validationResult(req);
    if(!err.isEmpty()) {
      const errNotif = err.array();
      res.render('update-page', {errNotif})
    }
    else {
      db.query(
        `UPDATE data_mahasiswa SET ? WHERE id="${req.params.id}"`, req.body,
        function (err, success) {
          if(!err) {
            req.flash('flashmessage', 'Data berhasil diubah');
            res.redirect('/');
          }
          else {
            res.send(err.message)
          }
        }
      );
    }
});

module.exports = router;