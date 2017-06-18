import React from 'react';
import CostumInput from '../css/costum_input.css'


require('../js/costum_input.js');

class Lab3 extends React.Component {

	constructor(props) {
		super(props);
		var self = this;
		this.processSubmit = function(event){
			self.handleInputAreaClick;
		}



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

		<div className="row main">
           <div className="main-login main-center">
           <h5>Конфігурування елементу</h5>
          <form onSubmit={this.processSubmit} id="task2FormGroup">
          <div className="form-group">
          <label className="cols-sm-2 control-label">Json</label>
          <div className="cols-sm-10">
          <div className="input-group full_width">
          <textarea onChange={this.handleConfigInputChange} value={this.state.configValueJson || ''} id="formatArea" rows="8" required type="number" min="0" max="100" className="config_input form-control" id="task2Input" placeholder="Введіть число"/>
          </div>
          </div>
          </div>

          <div className="form-group ">
          <button type="submit" className="btn btn-primary btn-lg btn-block login-button" onClick={this.handleInputAreaClick}>Зберегти</button>
           </div>

 		 <div className="form-group">
          <label className="cols-sm-2 control-label">Вигляд елементу</label>
          <div className="cols-sm-10">
          <div className="input-group full_width">
          <input type="text" className="costum_input form-control" />
          </div>
          </div>
          </div>

          </form>
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
