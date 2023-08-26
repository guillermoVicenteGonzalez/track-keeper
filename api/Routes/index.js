const{ Router } = require("express");

const usersCtrl = require("../Controllers/UserCtrl")
/*
const usersCtrl = require("../controllers/UsersCtrl");
const examsCtrl = require("../controllers/ExamsCtrl");
const resultsCtrl = require("../controllers/ResultsCtrl")*/

const router = Router();
/***********************
 * TEST
 **********************/

router.route("/users")
    .post(usersCtrl.createUser)

/*
router.route("/users")
    .post(usersCtrl.createUser)
    .delete(usersCtrl.deleteUser)
    .get(usersCtrl.getAllUsers)
    //get tiene que devolver todos los usuarios
    //pero sin todos sus datos.
    //es necesario para añadir miembros a una organizacion.*/

module.exports = router