import React from 'react';
import Script from 'react-load-script'
import { Button } from 'react-bootstrap';
import $ from 'jquery';
import Velocity from 'velocity-animate';
import CostumInput from '../css/mit.css'
require('../js/mit.js');
/*$.prototype.velocity = Velocity;*/

class Lab2 extends React.Component {

    constructor(props) {
        super(props);
           //this.processTask1 = window.processTask1;
           this.processTask1 = window.processTask1
           this.processTask2 = window.processTask2;
           this.processTask3 = window.processTask3;
           this.processTask4 = window.processTask4;
    };
   
    render() {
        return <div>
        <h3 className="text-center">Лабораторна робота 3</h3>
    <label>Блок 1</label>
    <form onSubmit={this.processTask1} id="task1FormGroup" className="form-group" data-toggle="validator">

    <input required type="number" min="0"   className="form-control" id="task1FirstNumber" placeholder="Введіть перше число послідовності"/>
    <input required type="number" min="0"   className="form-control" id="task1LastNumber" placeholder="Введіть останнє число послідовності"/>
    <Button  type="submit" className="btn btn-default" value="Розрахувати">Розрахувати</Button>
    <span>Сума непарних чисел в проміжку:</span> <span id="task1Result">0</span>

  </form>

  <label>Блок 2</label>
    <form onSubmit={this.processTask2} id="task2FormGroup" className="form-group">

    <input required type="number" min="0" max="100" className="form-control" id="task2Input" placeholder="Введіть число"/>
    <button className="btn btn-default" >Розрахувати</button>
    <span>Факторіал числа:</span> <span id="task2Result">0</span>

  </form>

    <label >Блок 3</label>
    <form onSubmit={this.processTask3} id="task3FormGroup" className="form-group">

    <input  required type="number"  className="form-control" id="task3Input" placeholder="Введіть число"/>
    <button className="btn btn-default" >Розрахувати</button>
    <span>Послідовність Хеєса:</span> <span id="task3Result">0</span>

  </form>

  <label>Блок 4</label>
    <form onSubmit={this.processTask4} id="task4FormGroup" className="form-group">

    <input  required type="number" className="form-control" id="task4Input" placeholder="Введіть число"/>
    <button className="btn btn-default" >Розрахувати</button>
    <span>Результат:</span> <span id="task4Result">0</span>

  </form>
  <script src="js/jquery-3.2.1.min.js"></script>
  </div>
    }


}

export default Lab2;
