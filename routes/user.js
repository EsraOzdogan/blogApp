const express = require("express");
const router = express.Router();

const db = require("../data/db");

router.use("/blogs/category/:categoryId",async function(req,res){          //sira önemli en yukarıda olmali
   const id = req.params.categoryId;

   try{
      const [blogs, ] = await db.execute("select* from blog where categoryId=?", [id]);
      const [categories, ] = await db.execute("select * from category");

      res.render("users/blogs", {         //blog.ejs gönderilir
         title: "All Courses",
         blogs: blogs,
         categories: categories,
         selectedCategory: id
      });
        
   }catch(err){
      console.log(err)
   }
 })

router.use("/blogs/:blogId",async function(req,res){      //blogs/category de karsilar 
   const id = req.params.blogId
   //console.log(id)

   try{
      const [blogs, ] = await db.execute("select * from blog where blogId=?", [id]);

      const blog = blogs[0];

      if(blog){                     //urlden blogs/8 denilince dbde olmadıgi icin kontrol eklendi ve dbde yoksa yani öyle bir blog ve detayi yoksa redirect ile anasayfaya yönlendirildi
         return res.render( "users/blog-details", {
            title: blog.title,
            blog : blog
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
         categories: categories,
         selectedCategory: null
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
         categories: categories,
         selectedCategory: null
      });
   }
   catch(err){
      console.log(err);
   }
});

module.exports = router;