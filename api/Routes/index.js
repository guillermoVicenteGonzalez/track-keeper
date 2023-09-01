const{ Router } = require("express");

const usersCtrl = require("../Controllers/UserCtrl")
const MediaCtrl = require("../Controllers/MediaCtrl")
/*
const usersCtrl = require("../controllers/UsersCtrl");
const examsCtrl = require("../controllers/ExamsCtrl");
const resultsCtrl = require("../controllers/ResultsCtrl")*/

const router = Router();
/***********************
 * USERS
 **********************/

router.route("/users")
    .post(usersCtrl.createUser)

router.route("/users/login")
    .post(usersCtrl.userLogin)

router.route("/users/id/:user_id")
    .get(usersCtrl.getUserData)
    .delete(usersCtrl.deleteUser)
    .put(usersCtrl.updateUser)

router.route("/users/password/:user_id")
    .put(usersCtrl.updatePassword)

router.route("/users/verify/:user_id")
    .get(usersCtrl.verifyUser)
    //.put()

router.route("/users/photo/:user_id")
    .get(usersCtrl.getPhoto)
    .post(usersCtrl.uploadPhoto)


/********************************************************
 * MEDIA
 *******************************************************/

router.route("/media/:user_id")
    .get(MediaCtrl.getAllMedia)
    .post(MediaCtrl.createMedia)
    .delete(MediaCtrl.deleteAllMedia)

router.route("/media/:user_id/:media_id")
    .get(MediaCtrl.getMediaById)
    .delete(MediaCtrl.deleteMedia)

/*
router.route("/users")
    .post(usersCtrl.createUser)
    .delete(usersCtrl.deleteUser)
    .get(usersCtrl.getAllUsers)
    //get tiene que devolver todos los usuarios
    //pero sin todos sus datos.
    //es necesario para añadir miembros a una organizacion.*/

module.exports = router