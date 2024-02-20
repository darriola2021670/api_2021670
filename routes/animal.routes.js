const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const{ 
  animalesPost, 
  animalDelete, 
  putAnimales, 
  getAnimalById,
  animalGet, }  = require('../controllers/animal.controller');
const { existentesId } = require('../helpers/db-validators');

const router = Router();

router.get("/", animalGet);

    router.get(
      "/:id",
    [
      check('id', 'no es un id valido').isMongoId(),
      check('id').custom(existentesId),
      validarCampos
    ], getAnimalById);

    router.put(
      "/:id",
    [
      check('id', 'No es un id valido').isMongoId(),
      check('id').custom(existentesId),
      validarCampos
    ], putAnimales);

    router.post(
    "/",
    [
        check("nombre","El nombre del animal no puede estar vacio").not().isEmpty(),
        check("raza","La raza no debe estar vacia").not().isEmpty(),
        validarCampos,
    ], animalesPost);

    router.delete(
      "/:id",
    [
      check('id', 'No es un id valido').isMongoId(),
      check('id').custom(existentesId),
      validarCampos
    ], animalDelete);

    module.exports = router;