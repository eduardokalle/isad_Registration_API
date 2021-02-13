module.exports = (sequelize, Sequelize) => {
    const Worship = sequelize.define("worship", {
      session: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.INTEGER 
      },
      fecha: {
        type: Sequelize.DATE
      }
    });
  
    return Worship;
  };
  