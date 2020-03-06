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
    
      componentDidMount() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        axios.get(proxyurl + 'http://34.70.109.4/projection', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
          },
          proxy: {
            host: '34.70.109.4',
            port: 8080
          }
          }).then(res =>{
              var projection = res.data;
              const tam = projection.length;

                const verere = this.state.dta;
                verere+=[
                    ["", "JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", 'SET', "OUT", "NOV", 'DEZ', 'YZD'],
                ];

                console.log(verere);

                this.hotTableComponent.current.hotInstance.loadData(verere);
                
              this.setState({
                  projection: projection[tam-1].grow_up_value,
                  
              });
              //console.log(this.state)
              let dados = (this.state.projection / 12)
              console.log(dados)

            
    
            })  
            
        }


       
      

      render() {

        return (
          <div id="hot-app">
            <HotTable data={this.state.dta} colHeaders={false} rowHeaders={false} width="800" height="200" />
          </div>
        );
      }
}
