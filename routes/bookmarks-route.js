const express = require('express');
const router = express.Router();
const verifyAuthentication = require('../middleware/auth-middleware');
const bookmarksController = require('../controllers/bookmarks-controller');

// All routes are protected
router.use(verifyAuthentication);

// CREATE a new bookmark
router.post('/', bookmarksController.createBookmark);

// GET all bookmarks of the logged-in user
router.get('/', bookmarksController.getAllBookmarks);

// GET a single bookmark by ID 
router.get('/:id', bookmarksController.getBookmarkById);

// UPDATE a bookmark by ID 
router.put('/:id', bookmarksController.updateBookmark);

// DELETE a bookmark by ID 
router.delete('/:id', bookmarksController.deleteBookmark);

module.exports = router;
