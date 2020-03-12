module.exports = (sequelize, DataTypes) => {
  const sites = sequelize.define('sites', {
    ip    : DataTypes.STRING,
    name  : DataTypes.STRING,
    domain: DataTypes.STRING,

    deletedAt: DataTypes.DATE
  }, { paranoid: true });

  sites.associate = function(models) {
    sites.hasMany(models.webhooks,      { foreignKey: 'siteID' });
    sites.hasMany(models.shortenedUrls, { foreignKey: 'siteID' });
  };

  return sites;
};
