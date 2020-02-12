module.exports = (sequelize, DataTypes) => {
	const Agents = sequelize.define('agents', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING, allowNull: false,
			validate: {
				notEmpty: {
					args: true,
					msg: "Name Required"
				},
			}
		},
		contact_number: { type: DataTypes.STRING, allowNull: true },
		email: { type: DataTypes.STRING, allowNull: true,
			unique: {
				args: true,
				msg: 'Email id already in use!'
			}
		},
		address: { type: DataTypes.STRING, allowNull: true },
		zip_code: { type: DataTypes.STRING, allowNull: true },
		avatar_image_dir:{ type: DataTypes.STRING, allowNull: true },
	    license_image_dir:{ type: DataTypes.STRING, allowNull: true },
		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
		updatedAt: { type: DataTypes.DATE, allowNull: true },	
		deletedAt: { type: DataTypes.DATE, allowNull: true },
		is_active: { type: DataTypes.BOOLEAN, defaultValue: false }
	});
	return Agents;
}
