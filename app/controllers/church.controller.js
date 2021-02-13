const db = require("../models");
const Church = db.church;
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
  const church = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    estado: req.body.estado,
    imagen: req.body.imagen,
  };

  // Save Tutorial in the database
  Church.create(church)
    .then(data => {
      res.send(data && {
            message: "Iglesia creado correctamente"
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the church."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

  Church.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })  
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving church."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Church.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving church with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Church.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update church with id=${id}. Maybe church was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating church with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Church.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "church was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete church with id=${id}. Maybe church was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Church.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} church were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all church."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Church.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving church."
      });
    });
};
