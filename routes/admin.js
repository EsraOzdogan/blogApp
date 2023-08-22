const express = require("express");
const router = express.Router();

const db = require("../data/db");

router.get("/blog/create",async function(req,res){   
   
   try{
      const [categories, ] = await db.execute("select * from category");

      res.render( "admin/blog-create", { 
         title: 'add blog',
         categories: categories
      });
   }catch(err){
      console.log(err)
   }
});

router.post("/blog/create",async function(req,res){   
   console.log(req.body)  //formda girilen data bilgilerini verir        //req. ejsteki htmldeki name'ler
   const title = req.body.title;
   const description = req.body.description;
   const img = req.body.img;
   const category = req.body.category;
   const isHomepage = req.body.homepage == "on" ? 1:0;
   const isApproved = req.body.approval == "on" ? 1:0;

   try{
      await db.execute("INSERT INTO blog(title, description, img, isHomepage, isApproved, categoryId) VALUES (?,?,?,?,?,?)",          //db veri ekleme //sıra önemli ve dbdeki columnlar ile aynı olmali
      [title, description, img, isHomepage, isApproved, category]);
      res.redirect("/admin/blogs")
   }catch(err){
      console.log(err);
   }
});

router.get("/blogs/:blogId",async function(req,res){    
   const blogId = req.params.blogId;

   try{
      const [blogs, ] = await db.execute("select * from blog where blogId=?", [blogId]);
      const [categories, ] = await db.execute("select * from category");

      const blog = blogs[0];

      if(blog){                     
         return res.render( "admin/blog-edit", {
            title: blog.title,
            blog : blog,
            categories : categories
         });
      }
      
      res.redirect("admin/blogs")
   }catch(err){
      console.log(err)
   }
 });

 router.post("/blogs/:blogId",async function(req,res){    
   const blogId = req.body.blogId;
   const title = req.body.title;
   const description = req.body.description;
   const img = req.body.img;
   const categoryId = req.body.category;
   const isHomepage = req.body.homepage == "on" ? 1:0;
   const isApproved = req.body.approval == "on" ? 1:0;

   try{
      await db.execute("UPDATE blog SET title =?, description=?, img=?, isHomepage=?, isApproved=?, categoryId=? WHERE blogId=?",   //blog tablosunda sıralanan columnlari güncelle, hepsini güncelemek zorunda degilsins
      [title, description, img, isHomepage, isApproved, categoryId, blogId]);
      res.redirect("/admin/blogs")
   }catch(err){
      console.log(err);
   }
 });

router.get("/blogs",async function(req,res){    
   try{
      const [blogs,] = await db.execute("select blogId, title, img from blog");        //sadece bu kolonlari gönderiyorum
      res.render("admin/blog-list", {
         title: "blog list",
         blogs: blogs
      })
   }catch(err){
      console.log(err);
   }
});

module.exports = router;