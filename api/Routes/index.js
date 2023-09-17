const{ Router }         = require("express");
const usersCtrl         = require("../Controllers/UserCtrl")
const MediaCtrl         = require("../Controllers/MediaCtrl")
const CollectionCtrl    = require("../Controllers/CollectionCtrl,")

const router = Router();

/********************************************************
 * USERS
 *******************************************************/

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

router.route("/users/email/:user_id")


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
    .put(MediaCtrl.updateMedia)

router.route("/media/cover/:user_id/:media_id")
    .post(MediaCtrl.uploadMediaCover)
    .get(MediaCtrl.getCover)

router.route("/entry/:user_id")
    .get(MediaCtrl.getEntries)
    .post(MediaCtrl.createEntry)

router.route("/entry/:user_id/:entry_id")
    .put(MediaCtrl.updateEntry)
    .delete(MediaCtrl.deleteEntry)
    .get(MediaCtrl.getEntry)

router.route("/entry/:user_id/state/:state")
    .get(MediaCtrl.getEntriesByState)

router.route("/entry/:user_id/genre/:genre")
    .get(MediaCtrl.getEntriesByGenre)

router.route("/entry/type/:user_id/:type")
    .get(MediaCtrl.getEntriesByType)

/********************************************************
 * COLLECTIONS
 *******************************************************/

router.route("/collection/:user_id")
    .post(CollectionCtrl.createCollection)
    .get(CollectionCtrl.getUserCollections)

router.route("/collection/:user_id/:collection_id")
    .post(CollectionCtrl.createCollectionEntry)
    .delete(CollectionCtrl.deleteCollection)
    .put(CollectionCtrl.updateCollection)
    .get(CollectionCtrl.getCollectionEntries)

router.route("/collection/:user_id/entry/:col_entry_id")
    .delete(CollectionCtrl.removeEntryFromCol)
module.exports = router