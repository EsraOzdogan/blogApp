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
      res.redirect("/")
   }catch(err){
      console.log(err);
   }
   

});

router.get("/blogs/:blogId",function(req,res){    
    res.render( "admin/blog-edit");
 });

router.get("/blogs",function(req,res){    
   res.render( "admin/blog-list");
});

module.exports = router;