const express = require("express");
const router = express.Router();

const db = require("../data/db");


router.use("/blogs/:blogId",async function(req,res){   
   const id = req.params.blogId
   //console.log(id)

   try{
      const [blog, ] = await db.execute("select* from blog where blogId=?", [id]);

      if(blog[0]){                     //urlden blogs/8 denilince dbde olmadıgi icin kontrol eklendi ve dbde yoksa yani öyle bir blog ve detayi yoksa redirect ile anasayfaya yönlendirildi
         return res.render( "users/blog-details", {
            title: blog[0].title,
            blog : blog[0]
         });
      }
      res.redirect("/")
      
  
   }catch(err){
      console.log(err)
   }
});

router.use("/blogs",async function(req,res){    
   try{
      const [blogs,] = await db.execute("select * from blog where isApproved = 1 ");
      //console.log(blogs);
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