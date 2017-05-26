import React from 'react';
import Script from 'react-load-script'

import $ from 'jquery';
import Velocity from 'velocity-animate';
require('../js/mit.js');
$.prototype.velocity = Velocity;

class Lab2 extends React.Component {

    constructor(props) {
        super(props);

      this.processTask1 = processTask1;
      this.processTask2 = processTask2;
      this.processTask3 = processTask3;
      this.processTask4 = processTask4;



    }

    render() {
        return <div>
        <h3 className="text-center">Лабораторна робота 3</h3>
    <label for="task1FormGroup">Task1</label>
    <div id="task1FormGroup" className="form-group">

    <input  className="form-control" id="task1FirstNumber" placeholder="Введіть перше число послідовності"/>
    <input  className="form-control" id="task1LastNumber" placeholder="Введіть останнє число послідовності"/>
    <button className="btn btn-default" onClick="processTask1()">Розрахувати</button>
    <span>Сума непарних чисел в проміжку:</span> <span id="task1Result">0</span>

  </div>

  <label for="task2FormGroup">Task2</label>
    <div id="task2FormGroup" className="form-group">

    <input  className="form-control" id="task2Input" placeholder="Введіть число"/>
    <button className="btn btn-default" onClick="processTask2()">Розрахувати</button>
    <span>Факторіал числа:</span> <span id="task2Result">0</span>

  </div>

    <label for="task3FormGroup">Task3</label>
    <div id="task3FormGroup" className="form-group">

    <input  className="form-control" id="task3Input" placeholder="Введіть число"/>
    <button className="btn btn-default" onClick="processTask3()">Розрахувати</button>
    <span>Послідовність Хеєса:</span> <span id="task3Result">0</span>

  </div>

  <label for="task4FormGroup">Task4</label>
    <div id="task4FormGroup" className="form-group">

    <input  className="form-control" id="task4Input" placeholder="Введіть число"/>
    <button className="btn btn-default" onClick="processTask4()">Розрахувати</button>
    <span>Результат:</span> <span id="task4Result">0</span>

  </div>
  </div>
    }


}

export default Lab2;
