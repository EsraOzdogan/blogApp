const express = require("express");
const router = express.Router();

const db = require("../data/db");


router.use("/blogs/:blogid",function(req,res){   
   res.render( "users/blog-details");
});

router.use("/blogs",async function(req,res){    
   try{
      const [blogs,] = await db.execute("select * from blog where isApproved = 1 ");
      console.log(blogs);
      const [categories, ] = await db.execute("select * from category");

      res.render("users/index", {
         title: "All Courses",
         blogs: blogs,
         categories: categories
      });
   }
   catch(err){
      console.log(err);
   }
});

router.use("/", async function(req,res){ 
   try{
      const [blogs,] = await db.execute("select * from blog where isApproved = 1 and isHomepage=1");
      console.log(blogs);
      const [categories, ] = await db.execute("select * from category");

      res.render("users/index", {
         title: "Popular Courses",
         blogs: blogs,
         categories: categories
      });
   }
   catch(err){
      console.log(err);
   }
});

module.exports = router;