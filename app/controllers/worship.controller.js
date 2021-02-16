const db = require("../models");
const Worship = db.worship;
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
  const worship = {
    session: req.body.session,
    descripcion: req.body.descripcion,
    estado: req.body.estado,
    fecha: req.body.fecha,
    capacidad: req.body.capacidad,     
  };

  // Save Tutorial in the database
  Worship.create(worship)
    .then(data => {
      res.send(data && {
          message : "Se creo correctamente el culto."
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió algún error al crear el culto."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

  Worship.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })  
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Worship."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Worship.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Worship.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Worship was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Worship with id=${id}. Maybe Worship was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Worship with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Worship.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Worship was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Worship with id=${id}. Maybe Worship was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Worship with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Worship.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Worship were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Worship."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
    Worship.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Worship."
      });
    });
};
