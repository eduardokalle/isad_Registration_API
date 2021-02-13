module.exports = app => {
    const worship = require("../controllers/worship.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all categories
    router.get("/", worship.findAll);

    // Create a new categories
    router.post("/", worship.create);

    // Retrieve all published categories
    router.get("/published", worship.findAllPublished);
  
    // Retrieve a single categories with id
    router.get("/:id", worship.findOne);
  
    // Update a categories with id
    router.put("/:id", worship.update);
  
    // Delete a categories with id
    router.delete("/:id", worship.delete);
  
    // Delete all categories
    router.delete("/", worship.deleteAll);
  
    app.use('/api/worship', router);
  };
  