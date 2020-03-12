module.exports = (sequelize, DataTypes) => {
  const webhooks = sequelize.define('webhooks', {
    siteID: DataTypes.INTEGER,

    type    : DataTypes.ENUM('CLICK'),
    endpoint: DataTypes.STRING,

    deletedAt: DataTypes.DATE
  }, { paranoid: true });

  webhooks.associate = function(models) {
    webhooks.belongsTo(models.sites, { foreignKey: 'siteID' });
  };

  return webhooks;
};
