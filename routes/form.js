var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const db = require('../config/database')

const urlencodedParser = bodyParser.urlencoded({ extended: false });
/* GET users listing. */
router.get('/', function(req, res, next) {
  // let mess = req.flash('flashMessage');
  // console.log(mess);
  // res.render('form-input');
  res.render('form-input', { message: req.flash('flashmessage')})
});

router.post('/', urlencodedParser, [
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
    res.render('form-input', {errNotif})
    // return res.status(422).jsonp(err.array());
  }
  else {
    // const nama = req.body.nama;
    // const telp = req.body.telephone;
    // const identity = req.body.identity;
    // const fakultas = req.body.fakultas;
    // res.render('form-input', {success: 'Berhasil menambah data'})
    db.query(
      'INSERT INTO data_mahasiswa SET ?', req.body,
      function (err, success) {
        if(!err) {
          req.flash('flashmessage', 'Berhasil menambahkan data');
          res.redirect('/form');
        }
        else {
          res.send(err.message)
        }
      }
    );
    // req.flash('message', 'Berhasil menambah data');
    // res.render('form-input', {flashMessage: req.flash('success')})
    // res.redirect('/form');
    // res.end();
  }
});

// router.post('/', urlencodedParser, [
//   check('nama', 'Kolom nama masih kosong').exists()
// ], function(req, res) {
//   const err = validationResult(req);
//   if(!err.isEmpty()) {
//     return res.status(422).jsonp(err.array());
//   }
// });

module.exports = router;


