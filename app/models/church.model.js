module.exports = (sequelize, Sequelize) => {
    const Church = sequelize.define("church", {
      nombre: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.INTEGER 
      },
      imagen: {
        type: Sequelize.STRING
      }
    });
  
    return Church;
  };
  