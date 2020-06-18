const express= require('express');

const router=express.Router();
const postsApi= require("../../../controllers/api/v2/posts2_api");

router.get('/',postsApi.index1);


module.exports=router;