module.exports = (sequelize, DataTypes) => {
  const shortenedUrls = sequelize.define('shortenedUrls', {
    siteID: DataTypes.INTEGER,

    url: DataTypes.TEXT,

    deletedAt: DataTypes.DATE
  }, { paranoid: true });

  shortenedUrls.associate = function(models) {
    shortenedUrls.belongsTo(models.sites, { foreignKey: 'siteID' });
  };

  return shortenedUrls;
};
