const { homePage, singleBlog, createForm, createBlog, deleteBlog, renderUpdateBlog, updateBlog } = require('../controller/blogController')


const router = require('express').Router()
const {multer,storage} = require('../middleware/multerConfig')
const upload = multer({ storage: storage })

router.route("/").get(homePage)
router.route("/blog/:id").get(singleBlog)
router.route("/delete/:id").get(deleteBlog)
router.route("/create").get(createForm).post(upload.single('image'),createBlog)
router.route("/update/:id").get(renderUpdateBlog)
router.route("/blog/:id").post(updateBlog)








module.exports = router