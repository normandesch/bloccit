'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rule = sequelize.define('Rule', {
    description: DataTypes.STRING
  }, {});
  Rule.associate = function(models) {
    Rule.belongsTo(models.Topic, {
      foreignKey: "topicId",
        onDelete: "CASCADE"
    });
  };
  return Rule;
};
