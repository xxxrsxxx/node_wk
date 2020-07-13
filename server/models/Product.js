const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
	{
		writer: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		title: {
			type: String,
			maxlength: 50,
		},
		description: {
			type: String,
		},
		price: {
			type: Number,
			default: 0,
		},
		images: {
			type: Array,
			default: [],
		},
		sold: {
			type: Number,
			maxlength: 50,
			default: 0,
		},
		option: {
			type: Number,
			default: 1,
		},
		views: {
			type: Number,
			default: 0,
		},
	},
	{ timestamp: true },
);

const Product = mongoose.model('Product', productSchema);
module.exports = { Product };
