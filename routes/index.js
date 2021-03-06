const express= require('express');

const router=express.Router();
const homeController= require('../controllers/home_controller');

console.log('router loaded');

router.get('/',homeController.home);
router.get("/chat/:id", homeController.chat);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/likes',require('./likes'));
router.use('/api',require('./api'));
router.use("/forgot", require("./reset-pass"));
router.use("/search", require("./search"));
router.use("/friends", require("./friends"));
//for any further routes,acess from here
//router.use('/routerName',require('./routerfile'));
module.exports=router;