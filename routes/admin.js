const express = require("express");
const router = express.Router();

const db = require("../data/db");

//blog

router.get("/blog/delete/:blogId",async function(req,res){   
   const blogId = req.params.blogId;
   try{
      const [blogs, ] = await db.execute("select * from blog where blogId=?", [blogId]);
      const blog = blogs[0];

      res.render( "admin/blog-delete", {
            title: "delete blog",
            blog : blog
         });
   }catch(err){
      console.log(err)
   }
});

router.post("/blog/delete/:blogId",async function(req,res){   
   const blogId = req.body.blogId;
   try{
      await db.execute("delete from blog where blogId=?",[blogId]);
      res.redirect("/admin/blogs?action=delete")
   }catch(err){
      console.log(err);
   }
});

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

const multer = require("multer")
const upload = multer({dest: "./public/images"})

router.post("/blog/create", upload.single("img"), async function(req,res){        //htmlden id'den aldik img degerini
   console.log(req.body)  //formda girilen data bilgilerini verir        //req. ejsteki htmldeki name'ler
   const title = req.body.title;
   const description = req.body.description;
   const img = req.file.filename;
   const category = req.body.category;
   const isHomepage = req.body.homepage == "on" ? 1:0;
   const isApproved = req.body.approval == "on" ? 1:0;

   try{
      console.log(img)
      await db.execute("INSERT INTO blog(title, description, img, isHomepage, isApproved, categoryId) VALUES (?,?,?,?,?,?)",          //db veri ekleme //sıra önemli ve dbdeki columnlar ile aynı olmali
      [title, description, img, isHomepage, isApproved, category]);
      res.redirect("/admin/blogs?action=create")
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
      res.redirect("/admin/blogs?action=edit&blogId=" + blogId)
   }catch(err){
      console.log(err);
   }
 });

router.get("/blogs",async function(req,res){    
   try{
      const [blogs,] = await db.execute("select blogId, title, img from blog");        //sadece bu kolonlari gönderiyorum
      res.render("admin/blog-list", {
         title: "blog list",
         blogs: blogs,
         action: req.query.action,
         blogId: req.query.blogId
      })
   }catch(err){
      console.log(err);
   }
});

//category

router.get("/category/delete/:categoryId",async function(req,res){   
   const categoryId = req.params.categoryId;
   try{
      const [categories, ] = await db.execute("select * from category where categoryId=?", [categoryId]);
      const category = categories[0];

      res.render( "admin/category-delete", {
            title: "delete category",
            category : category
         });
   }catch(err){
      console.log(err)
   }
});

router.post("/category/delete/:categoryId",async function(req,res){   
   const categoryId = req.body.categoryId;
   try{
      await db.execute("delete from category where categoryId=?",[categoryId]);
      res.redirect("/admin/categories?action=delete")
   }catch(err){
      console.log(err);
   }
});

router.get("/category/create",async function(req,res){   
   
   try{
      res.render( "admin/category-create", { 
         title: 'add category'
      });
   }catch(err){
      console.log(err)
   }
});

router.post("/category/create",async function(req,res){   
   const name = req.body.name;
   try{
      await db.execute("INSERT INTO category(name) VALUES (?)",  
      [name]);
      res.redirect("/admin/categories?action=create")
   }catch(err){
      console.log(err);
   }
});

router.get("/categories/:categoryId",async function(req,res){    
   const categoryId = req.params.categoryId;

   try{
      const [categories, ] = await db.execute("select * from category where categoryId=?",[categoryId]);

      const category = categories[0];

      if(category){                     
         return res.render( "admin/category-edit", {
            title: category.title,
            category : category
         });
      }
      
      res.redirect("admin/categories")
   }catch(err){
      console.log(err)
   }
 });

 router.post("/categories/:categoryId",async function(req,res){    
   const categoryId = req.body.categoryId;
   const name = req.body.name;

   try{
      await db.execute("UPDATE category SET name=? where categoryId=?",
      [name,,categoryId]);
      res.redirect("/admin/categories?action=edit&categoryId=" + categoryId)
   }catch(err){
      console.log(err);
   }
 });

router.get("/categories",async function(req,res){    
   try{
      const [categories,] = await db.execute("select * from category");        //sadece bu kolonlari gönderiyorum
      res.render("admin/category-list", {
         title: "category list",
         categories: categories,
         action: req.query.action,
         categoryId: req.query.categoryId
      })
   }catch(err){
      console.log(err);
   }
});

module.exports = router;