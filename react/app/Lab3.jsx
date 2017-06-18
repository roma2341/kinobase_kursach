import React from 'react';
import CostumInput from '../css/costum_input.css'


require('../js/costum_input.js');

class Lab3 extends React.Component {

	constructor(props) {
		super(props);
		 this.state = {configValueJson: ''};
		var _self = this;
		this.handleInputAreaClick = function(event){
			setInputConfig(_self.state.configValueJson);
		}
		
		function setInputConfig(json){
			_self.setState({'configValueJson':json});
			if(json==null)return null;
			var configObj = null;
			try{
			configObj = JSON.parse(json);
			}
			catch(e){
				return;
			}
			window.updateCurrentConfig(configObj);
			window.initCostumInputs();
		}
		this.handleConfigInputChange = function(e){
			var newState = {'configValueJson': e.target.value};
			_self.setState(newState);
			console.log('state setted to:'+newState);
		}

	}

	render() {
		return <div>

					<div className="col-xs-6">
				<input type="text" className="costum_input"/>
			</div>

		<div className="row input_config_wrapper">
			<div className="col-xs-11 config_column">
					<textarea className="config_input"  id="formatArea"  className="form-control" rows="5" id="comment" onChange={this.handleConfigInputChange} value={this.state.configValueJson || ''}></textarea>
			</div>

			<div className="col-xs-1 config_column">
					<button className=" apply_config_btn" onClick={this.handleInputAreaClick}>Оновити конфіг</button>
			</div>
		</div>


		</div>
	}
	componentDidMount(){
		window.initCostumInputs();
		 this.setState({configValueJson: JSON.stringify(window.getCurrentConfig())});
		console.log('updated');
	}
}

export default Lab3;
