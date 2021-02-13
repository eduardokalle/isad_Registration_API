const db = require("../models");
const Registration = db.registration;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const registration = {
    cedula: req.body.cedula,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    iglesia: req.body.iglesia,
    culto: req.body.culto,
  };

  // Save Tutorial in the database
  Registration.create(registration)
    .then(data => {
      res.send(data && {
        message : "Se creo correctamente el registro gracias te esperamos"
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

  Registration.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })  
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving registration."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Registration.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving registration with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Registration.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "registration was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update registration with id=${id}. Maybe registration was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating registration with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Registration.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "registration was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete registration with id=${id}. Maybe registration was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete registration with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Registration.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} registration were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all registration."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Registration.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving registration."
      });
    });
};
