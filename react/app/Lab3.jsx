import React from 'react';
import CostumInput from '../css/costum_input.css'

require('../js/costum_input.js');

class Lab3 extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <div>
		<input type="text" className="costum_input"/>
		</div>
	}
	componentDidMount(){
		window.initCostumInputs();
		console.log('updated');
	}
}

export default Lab3;
