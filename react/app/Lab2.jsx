import React from 'react';
import Script from 'react-load-script'
import { Button } from 'react-bootstrap';
import $ from 'jquery';
import Velocity from 'velocity-animate';
import CostumInput from '../css/mit.css';
import ButtonsAnimations from '../css/animation_button.css'
require('../js/mit.js');
/*$.prototype.velocity = Velocity;*/

class Lab2 extends React.Component {

    constructor(props) {
        super(props);
           //this.processTask1 = window.processTask1;
           this.processTask1 = window.processTask1
           this.processTask2 = window.processTask2;
           this.processTask3 = function(){
            window.processTask3();
            $("#resultModal").modal('show');
          }
           this.processTask4 = window.processTask4;
    };
   
    render() {
        return <div>
        <div className="second_module_container">
        <h3 className="text-center">Лабораторна робота 3</h3>
    <hr/>
    <form onSubmit={this.processTask1} id="task1FormGroup" className="form-group row" data-toggle="validator">
    <div className="col-xs-6"> 
        <input required type="number" min="0"   className="form-control" id="task1FirstNumber" placeholder="Введіть перше число послідовності"/>
    <input required type="number" min="0"   className="form-control" id="task1LastNumber" placeholder="Введіть останнє число послідовності"/>
    </div>
     <div className="col-xs-6">
     <div className="btn-bg bg-1">
    <div className="btn btn-1">
     <h2>Сума непарних чисел в проміжку:</h2> <h2 id="task1Result">0</h2>
      <Button  type="submit" className="btn btn-default submit_button" value="Розрахувати">Розрахувати</Button>
    </div>
    </div>
       </div>

  </form>


    <form onSubmit={this.processTask2} id="task2FormGroup" className="form-group row">
     <div className="col-xs-6"> 
    <input required type="number" min="0" max="100" className="form-control" id="task2Input" placeholder="Введіть число"/>
    </div>
     <div className="col-xs-6">
         <div className="btn-bg bg-1">
    <div className="btn btn-1">
     <h2>Факторіал числа:</h2> <h2 id="task2Result">0</h2>
    <button type="submit" className="btn btn-default submit_button" >Розрахувати</button>
    </div>
    </div>
    </div>

  </form>


    <form onSubmit={this.processTask3} id="task3FormGroup" className="form-group row">
     <div className="col-xs-6"> 
    <input  required type="number"  className="form-control" id="task3Input" placeholder="Введіть число"/>
    </div>
    <div className="col-xs-6"> 
    <button type="submit" className="btn btn-default submit_button" >Розрахувати</button>
    <span >Послідовність Хеєса:</span> <span id="task3Result">0</span>
    </div>

  </form>


    <form onSubmit={this.processTask4} id="task4FormGroup" className="form-group row">

    <div className="col-xs-6"> 
    <input  required type="number" className="form-control" id="task4Input" placeholder="Введіть число"/>
    </div>
    <div className="col-xs-6"> 
    <button type="submit" className="btn btn-default submit_button" >Розрахувати</button>
    <span>Результат:</span> <span id="task4Result">0</span>
    </div>

  </form>
  </div>


  <div id="resultModal" className="modal fade">
      <div className="modal-dialog">
          <div className="modal-content">
              <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                  <h4 className="modal-title">Результат</h4>
              </div>
              <div className="modal-body">
                  <p>Результат операції:</p>
                  <p className="text-warning"><small>If you dont save, your changes will be lost.</small></p>
              </div>
              <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
          </div>
      </div>
  </div>
  </div>
    }


}

export default Lab2;
