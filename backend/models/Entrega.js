const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Entrega = db.define('entrega', {
    codEntrega: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idCarga: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            key: 'codCarga',
            model: 'cargas'
        }
    },
    destino: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status_atual: {
        type: DataTypes.ENUM('ENTREGUE', 'TRANSITO'),
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'entregas'
})

module.exports = Entrega