'use strict';
module.exports = (sequelize, DataTypes) => {
  const BatchStatus = sequelize.define('BatchStatus', {
    name : DataTypes.STRING
  }, { timestamps: true });
  
  BatchStatus.associate = function(models) {
  };

  return BatchStatus;
};
