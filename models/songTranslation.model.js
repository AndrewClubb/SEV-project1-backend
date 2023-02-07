module.exports = (sequelize, Sequelize) => {
  const SongTranslation = sequelize.define("songTranslation", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    type: {
      type: Sequelize.STRING,
    },
    text: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false
  });

  return SongTranslation;
};
