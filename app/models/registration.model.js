module.exports = (sequelize, Sequelize) => {
    const Registration = sequelize.define("registration", {
      cedula: {
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING
      },
      fecha: {
        type: Sequelize.STRING 
      },
      iglesia: {
        type: Sequelize.STRING 
      },
      culto: {
        type: Sequelize.STRING
      }
    });
  
    return Registration;
  };
  