const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');
//=================================
//             Product
//=================================

var storage = multer.diskStorage({
	//저장될 파일위치
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		//cb(null, file.fieldname + '-' + Date.now());
		//cb(null, `${file.originalname}_${Date.now()}`);
		cb(null, `${file.originalname}`);
	},
});
var upload = multer({ storage: storage }).single('file');
router.post('/image', (req, res) => {
	//가져온 이미지 저장
	upload(req, res, err => {
		if (err) {
			return req.json({ success: false, err });
		}
		return res.json({
			success: true,
			filePath: res.req.file.path,
			fileName: res.req.file.fileName,
		});
	});
});
router.post('/', (req, res) => {
	const product = new Product(req.body);
	product.save(err => {
		if (err)
			return res.status(400).json({
				success: false,
				err,
			});
		return res.status(200).json({ success: true });
	});
});
router.post('/products', (req, res) => {
	let limit = req.body.limit ? parseInt(req.body.limit) : 20;
	let skip = req.body.skip ? parseInt(req.body.skip) : 0;

	let findArgs = {};
	for (let key in req.body.filters) {
		if (req.body.filters[key].length > 0) {
			findArgs[key] = req.body.filters[key];
		}
	}
	console.log('findArgs', findArgs);
	Product.find(findArgs)
		.populate('writer')
		.skip(skip)
		.limit(limit)
		.exec((err, productsInfo) => {
			if (err) return res.status(400).json({ success: false, err });
			return res
				.status(200)
				.json({ success: true, productsInfo, postSize: productsInfo.length });
		});
});

module.exports = router;
