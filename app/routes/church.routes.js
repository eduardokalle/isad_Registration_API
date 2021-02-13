module.exports = app => {
    const church = require("../controllers/church.controller.js");
  
    var router = require("express").Router();
  
    // Create a new products
    router.post("/", church.create);
  
    // Retrieve all products
    router.get("/", church.findAll);
  
    // Retrieve all published products
    router.get("/published", church.findAllPublished);
  
    // Retrieve a single products with id
    router.get("/:id", church.findOne);
  
    // Update a products with id
    router.put("/:id", church.update);
  
    // Delete a products with id
    router.delete("/:id", church.delete);
  
    // Delete all products
    router.delete("/", church.deleteAll);
  
    app.use('/api/church', router);
  };