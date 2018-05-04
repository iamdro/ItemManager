/**
 * Item model declaration.
 * @param sequelize
 * @param DataTypes
 * @returns {Model|*|{}|void}
 */
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('items', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        category_id: DataTypes.INTEGER
    })
}