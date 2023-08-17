const express = require("express");
const router = express.Router();

const db = require("../data/db");


router.use("/blogs/:blogid",function(req,res){   
   res.render( "users/blog-details");
});

router.use("/blogs",function(req,res){    
   db.execute("select * from blog where isApproved = 1 ")
   .then(blogResult => {
      db.execute("select * from category")
      .then(categoryResult => {
         res.render("users/index", {
            title: "All Courses",
            blogs: blogResult[0],
            categories: categoryResult[0]
         });
      })
      .catch(err => console.log(err))
   })
   .catch(err => console.log(err));
});

router.use("/",function(req,res){ 
   db.execute("select * from blog where isApproved = 1 and isHomepage=1")
      .then(blogResult => {
         //console.log(blogResults[0])

         db.execute("select * from category")
         .then(categoryResult => {
            console.log(categoryResult[0])

            res.render("users/index", {
               title: "Popular Courses",
               blogs: blogResult[0],
               categories: categoryResult[0]
            });
         })
         .catch(err => console.log(err))
      })
      .catch(err => console.log(err));
});

module.exports = router;