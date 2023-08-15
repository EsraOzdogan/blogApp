const express = require("express");
const router = express.Router();

const data = {
   title: "Popular Courses",
   categories:["Web Development","Mobile Application","Data Analysis","Programming","Office Applications"],
   blogs: [
      {
         blogId: 1,
         title: "Applied Web development",
         description : "'Web Development': Html, Css, Sass, Flexbox, Bootstrap, Javascript, Angular, JQuery, Asp.Net Mvc&Core Mvc",
         img: "1.jpg",
         homepage: true,
         isApproved : true,
      },
       {
         blogId: 2,
         title: "Python Programming",
         description : "Python Tutorials. Database, Data Analysis, Bot Writing, Web Development(Django)",
         img: "2.jpg",
         homepage: true,
         isApproved : false,
      },
       {
         blogId: 3,
         title: "Javascript Programming",
         description : "Nodejs, Angular, React and VueJs with modern javascript tutorials (ES6 & ES7+).",
         img: "3.jpg",
         homepage: false,
         isApproved : true,
      },
   ]
};

router.use("/blogs/:blogid",function(req,res){   
   res.render( "users/blog-details");
});

router.use("/blogs",function(req,res){    
   res.render( "users/blogs", data);
});

router.use("/",function(req,res){    
   res.render( "users/index",data);
});

module.exports = router;