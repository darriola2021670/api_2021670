const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { 
  usuariosPost,
  usuariosGet, 
  getUsuarioBYId,
  putUsuarios,
  usuariosDelete} = require('../controllers/user.controller');
const { existenteEamil, esRoleValido, existenteId, } = require('../helpers/db-validators');

const router = Router();

router.get("/", usuariosGet);

router.get(
  "/:id",
  [
     check('id', 'No es un id valido').isMongoId(),
     check('id').custom(existenteId),
     validarCampos
  ], getUsuarioBYId);

  router.put(
    "/:id",
    [
      check('id', 'No es un id valido').isMongoId(),
      check('id').custom(existenteId),
      check("role").custom(esRoleValido),
      validarCampos
    ], putUsuarios);

router.post(
    "/", 
    [
      check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
      check("password","El password debe ser mayor a 6 caracteres").isLength({min:6}),
      check("correo","Este no es un correo valido").isEmail(),
      check("correo").custom(existenteEamil),
      check("role").custom(esRoleValido),
      validarCampos,
    ],usuariosPost);

    router.delete(
      "/:id",
      [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteId),
        validarCampos
      ], usuariosDelete);

    module.exports = router;