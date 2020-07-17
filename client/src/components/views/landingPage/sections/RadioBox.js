import React, { useState } from 'react';
import { Collapse, Radio } from 'antd';
const { Panel } = Collapse;
const RadioBox = props => {
	const [Value, setValue] = useState(0);
	const renderRadioBox = () =>
		props.list &&
		props.list.map(value => (
			<Radio key={value.id} value={value.id}>
				{value.name}
			</Radio>
		));
	const handleChange = event => {
		setValue(event.target.value);
		props.handleFilters(event.target.value);
	};
	return (
		<div>
			<Collapse defaultActiveKey={['1']}>
				<Panel header='This is panel header 1' key='2'>
					<Radio.Group onChange={handleChange} value={Value}>
						{renderRadioBox()}
					</Radio.Group>
				</Panel>
			</Collapse>
		</div>
	);
};

export default RadioBox;
