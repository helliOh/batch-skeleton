'use strict';
module.exports = (sequelize, DataTypes) => {
  const Batch = sequelize.define('Batch', {
    name: DataTypes.STRING,
    cursor : DataTypes.INTEGER,
    controllable : DataTypes.BOOLEAN
  }, { timestamps: true });
  
  Batch.associate = function(models) {
      Batch.belongsTo(models.BatchStatus, { foreignKey: 'StatusId', as: 'Status' });
  };

  return Batch;
};
