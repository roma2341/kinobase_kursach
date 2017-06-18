import React from 'react';
import Script from 'react-load-script'
import { Button } from 'react-bootstrap';
import Velocity from 'velocity-animate';
import CostumInput from '../css/mit.css';
require('../js/mit.js');
/*$.prototype.velocity = Velocity;*/

class Lab2 extends React.Component {

  constructor(props) {
    super(props);
           //this.processTask1 = window.processTask1;
           this.state ={result:''};
           this.processTask1 = window.processTask1
           this.processTask2 = window.processTask2;
           var self = this;

           function processTaskAndShowResultInModal(taskHandler) {
            var result = taskHandler();
            self.setState({'result':result});
            $("#resultModal").modal('show');
          }

          this.processTask3 = function(){
            processTaskAndShowResultInModal(window.processTask3);
          }
          this.processTask4 = function(){
            processTaskAndShowResultInModal(window.processTask4);
          }

        };

        render() {
          return <div>
          <div className="container">
          <div className="second_module_container row">
          <h3 className="text-center">Сучасний дизайн, валідація і модальні вікна</h3>
          <hr/>

           <div className="row main">
          <div className="main-login main-center">
          <h5>Ця форма дозволить вам розрахувати суму непарних чисел в проміжку</h5>
          <form onSubmit={this.processTask1} id="task1FormGroup" data-toggle="validator">
          <div className="form-group">
          <label className="cols-sm-2 control-label">Перше число</label>
          <div className="cols-sm-10">
          <div className="input-group">
           <span className="input-group-addon"><i className="fa fa-check fa" aria-hidden="true"></i></span>
          <input required type="number" min="0"   className="form-control" id="task1FirstNumber" placeholder="Введіть значення"/>
          </div>
          </div>
           <label className="cols-sm-2 control-label">Останнє число</label>
          <div className="cols-sm-10">
          <div className="input-group">
           <span className="input-group-addon"><i className="fa fa-check" aria-hidden="true"></i></span>
          <input required type="number" min="0"   className="form-control" id="task1LastNumber" placeholder="Введіть значення"/>
          </div>
          </div>
          </div>

          <span className="wrapable_word">Результат:</span> <span id="task1Result">0</span>
          <div className="form-group ">
          <Button  type="submit" className="btn btn-primary btn-lg btn-block login-button" value="Розрахувати">Розрахувати</Button>
          </div>
          </form>
          </div>
          </div>



          <div className="row main">
           <div className="main-login main-center">
           <h5>Ця форма дозволить вам розрахувати факторіал числа</h5>
          <form onSubmit={this.processTask2} id="task2FormGroup">
          <div className="form-group">
          <label className="cols-sm-2 control-label">Число, для якого шукати факторіал</label>
          <div className="cols-sm-10">
          <div className="input-group">
          <span className="input-group-addon"><i className="fa fa-check" aria-hidden="true"></i></span>
          <input required type="number" min="0" max="100" className="form-control" id="task2Input" placeholder="Введіть число"/>
          </div>
          </div>
          <span className="wrapable_word">Факторіал числа:</span> <span id="task2Result">0</span>
          <div className="form-group ">
          <button type="submit" className="btn btn-primary btn-lg btn-block login-button" >Розрахувати</button>
           </div>
          </div>
          </form>
          </div>
          </div>


          <div className="row main">
           <div className="main-login main-center">
            <h5>Ця форма дозволить вам розрахувати послідовність Хеєса і покаже її в модальному вікні</h5>
          <form onSubmit={this.processTask3} id="task3FormGroup" className="form-group row">
           <div className="form-group">
           <div className="cols-sm-10">
          <div className="input-group">
          <span className="input-group-addon"><i className="fa fa-check" aria-hidden="true"></i></span>
          <input  required type="number"  className="form-control" id="task3Input" placeholder="Введіть число"/>
          </div>
          </div>
          <div className="form-group"> 
          <button type="submit" className="btn btn-primary btn-lg btn-block login-button" >Розрахувати</button>
          </div>
          </div>
          </form>
          </div>
          </div>

          <div className="row main">
           <div className="main-login main-center">
            <h5>Ця форма покаже різного роду інформацію про число</h5>
          <form onSubmit={this.processTask4} id="task4FormGroup" className="form-group row">
           <div className="form-group">

          <div className="cols-sm-10">
          <div className="input-group">
          <span className="input-group-addon"><i className="fa fa-check" aria-hidden="true"></i></span>
          <input  required type="number" className="form-control" id="task4Input" placeholder="Введіть число"/>
          </div>
           </div>

          <div className="form-group"> 
          <button type="submit" className="btn btn-primary btn-lg btn-block login-button" >Розрахувати</button>
          </div>
           </div>
          </form>
           </div>
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
          <p className="text-warning"><small className="operation_result" id="operationResult"> {this.state.result}</small></p>
          </div>
          <div className="modal-footer">
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          </div>
          </div>
          </div>
          </div>


          </div>

          </div>

          </div>
        }


      }

      export default Lab2;
