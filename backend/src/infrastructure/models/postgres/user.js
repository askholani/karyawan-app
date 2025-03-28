const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "user",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      full_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      ktp: {
        type: DataTypes.STRING(16),
        allowNull: false,
        unique: true,
      },
      gender: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      birth_place: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      province: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      subdistrict: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      headman: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      roles: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      start_contract: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_contract: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      bpjs_code: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      martial: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      is_activated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: true,
      paranoid: true, // Mengaktifkan soft delete (deleted_at)
      underscored: true, // Menggunakan snake_case untuk nama kolom
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
