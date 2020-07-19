import React from 'react';
import { Button, Descriptions } from 'antd';

const ProductInfo = props => {
	const clickHandler = () => {
		console.log('add to cart');
	};
	return (
		<div>
			<Descriptions title='Product Info'>
				<Descriptions.Item label='Price'>{props.detail.price}</Descriptions.Item>
				<Descriptions.Item label='Sold'>{props.detail.sold}</Descriptions.Item>
				<Descriptions.Item label='View'>{props.detail.views}</Descriptions.Item>
				<Descriptions.Item label='Description'>
					{props.detail.description}
				</Descriptions.Item>
			</Descriptions>

			<br />
			<br />
			<br />
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Button size='large' shape='round' onClick={clickHandler}>
					Add to Cart
				</Button>
			</div>
		</div>
	);
};

export default ProductInfo;
