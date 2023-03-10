const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    supportBigNumbers: true,
  },
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.availability = require("./availability.model.js")(sequelize, Sequelize);
db.userRole = require("./userRole.model.js")(sequelize, Sequelize);
db.studentInstrument = require("./studentInstrument.model.js")(
  sequelize,
  Sequelize
);
db.instrument = require("./instrument.model.js")(sequelize, Sequelize);
db.studentTimeslot = require("./studentTimeslot.model.js")(
  sequelize,
  Sequelize
);
db.critique = require("./critique.model.js")(sequelize, Sequelize);
db.eventTimeslot = require("./eventTimeslot.model.js")(sequelize, Sequelize);
db.event = require("./event.model.js")(sequelize, Sequelize);
db.semester = require("./semester.model.js")(sequelize, Sequelize);
db.composer = require("./composer.model.js")(sequelize, Sequelize);
db.song = require("./song.model.js")(sequelize, Sequelize);
db.songTranslation = require("./songTranslation.model.js")(
  sequelize,
  Sequelize
);
db.repertoire = require("./repertoire.model.js")(sequelize, Sequelize);
db.timeslotSong = require("./timeslotSong.model.js")(sequelize, Sequelize);
db.evaluation = require("./evaluation.model.js")(sequelize, Sequelize);
db.evaluationComment = require("./evaluationComment.model.js")(
  sequelize,
  Sequelize
);
db.session = require("./session.model.js")(sequelize, Sequelize);

//Availability FKs
db.availability.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//Critique FKs
db.critique.belongsTo(
  db.userRole,
  { as: "critiquer" },
  { foreignKey: { name: "critiquer", allowNull: false }, onDelete: "CASCADE" }
);
db.critique.belongsTo(
  db.studentTimeslot,
  { as: "timeslot" },
  { foreignKey: { name: "timeslot", allowNull: false }, onDelete: "CASCADE" }
);

//Evaluation FKs
db.evaluation.belongsTo(
  db.userRole,
  { as: "faculty" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.evaluation.belongsTo(
  db.studentInstrument,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//EvaluationComment FKs
db.evaluationComment.belongsTo(
  db.evaluation,
  { as: "evaluation" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//Event FKs
db.event.belongsTo(
  db.semester,
  { as: "semester" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//EventTimeslot FKs
db.eventTimeslot.belongsTo(db.userRole, { as: "accompanist" });
db.eventTimeslot.belongsTo(
  db.event,
  { as: "event" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//Repertoire FKs
db.repertoire.belongsTo(
  db.studentInstrument,
  { as: "studentInstrument" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.repertoire.belongsTo(
  db.song,
  { as: "song" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//Song FKs
db.song.belongsTo(
  db.composer,
  { as: "composer" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//SongTranslation FKs
db.songTranslation.belongsTo(
  db.song,
  { as: "song" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//StudentInstrument FKs
db.studentInstrument.belongsTo(
  db.userRole,
  { as: "student" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.studentInstrument.belongsTo(
  db.instrument,
  { as: "instrument" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.studentInstrument.belongsTo(db.userRole, { as: "accompanist" });
db.studentInstrument.belongsTo(
  db.userRole,
  { as: "instructor" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//StudentTimeslot FKs
db.studentTimeslot.belongsTo(
  db.studentInstrument,
  { as: "studentInstrument" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.studentTimeslot.belongsTo(
  db.eventTimeslot,
  { as: "eventTimeslot" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.studentTimeslot.belongsTo(
  db.userRole,
  { as: "instructor" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//TimeslotSong KFs
db.timeslotSong.belongsTo(
  db.studentTimeslot,
  { as: "timeslot" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.timeslotSong.belongsTo(
  db.song,
  { as: "song" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//UserRole FKs
db.userRole.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//Session FKs
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

module.exports = db;
