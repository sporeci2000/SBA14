const Bookmark = require('../models/bookmark-model');

// CREATE a new bookmark
async function createBookmark(req, res) {
    try {
        const { title, url, description } = req.body;
        const newBookmark = await Bookmark.create({
            title,
            url,
            description,
            user: req.user._id, // associate bookmark with logged-in user
        });
        res.status(201).json({ success: 'Bookmark created', bookmark: newBookmark });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

// GET all bookmarks of the logged-in user
async function getAllBookmarks(req, res) {
    try {
        const bookmarks = await Bookmark.find({ user: req.user._id });
        res.status(200).json(bookmarks);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

// GET a single bookmark by ID
async function getBookmarkById(req, res) {
    try {
        const bookmark = await Bookmark.findById(req.params.id);
        if (!bookmark) return res.status(404).json({ error: 'Bookmark not found' });

        if (!bookmark.user.equals(req.user._id)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        res.status(200).json(bookmark);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

// UPDATE a bookmark by ID
async function updateBookmark(req, res) {
    try {
        const bookmark = await Bookmark.findById(req.params.id);
        if (!bookmark) return res.status(404).json({ error: 'Bookmark not found' });

        if (!bookmark.user.equals(req.user._id)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const { title, url, description } = req.body;
        bookmark.title = title || bookmark.title;
        bookmark.url = url || bookmark.url;
        bookmark.description = description || bookmark.description;

        await bookmark.save();
        res.status(200).json({ success: 'Bookmark updated', bookmark });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

// DELETE a bookmark by ID
async function deleteBookmark(req, res) {
    try {
        const bookmark = await Bookmark.findById(req.params.id);
        if (!bookmark) return res.status(404).json({ error: 'Bookmark not found' });

        if (!bookmark.user.equals(req.user._id)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        await bookmark.remove();
        res.status(200).json({ success: 'Bookmark deleted' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createBookmark,
    getAllBookmarks,
    getBookmarkById,
    updateBookmark,
    deleteBookmark,
};
