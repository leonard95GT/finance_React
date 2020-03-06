import React, { Component } from 'react'
import {HotTable} from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';
import axios from 'axios'

export default class Table extends Component {
    constructor(props) {
        super(props);
        
        this.data = [
            ["", "JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", 'SET', "OUT", "NOV", 'DEZ', 'YZD'],

        ];

        this.state={
            projection:0,
            dta: [
                ["", "JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", 'SET', "OUT", "NOV", 'DEZ', 'YZD'],
            ]
        }
      }
    
    //  
    


       
      

      render() {

        return (
          <div id="hot-app">
            <HotTable data={this.state.dta} colHeaders={false} rowHeaders={false} width="800" height="200" />
          </div>
        );
      }
}
