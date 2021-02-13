module.exports = app => {
    const registration = require("../controllers/registration.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all categories
    router.get("/", registration.findAll);

    // Create a new categories
    router.post("/", registration.create);

    // Retrieve all published categories
    router.get("/published", registration.findAllPublished);
  
    // Retrieve a single categories with id
    router.get("/:id", registration.findOne);
  
    // Update a categories with id
    router.put("/:id", registration.update);
  
    // Delete a categories with id
    router.delete("/:id", registration.delete);
  
    // Delete all categories
    router.delete("/", registration.deleteAll);
  
    app.use('/api/registration', router);
  };
  