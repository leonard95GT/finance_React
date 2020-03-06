import React, { Component } from 'react'
import {HotTable} from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';
import axios from 'axios'

export default class Table extends Component {
    constructor(props) {
        super(props);

        this.state={
            projection:0,
            unit_value:0
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
              

              const valor = (this.state.projection / 12);

              this.setState({
                  projection: projection[tam-1].grow_up_value,
                  unit_value: valor
              });


            })  
            
      }


      render() {
        return (
            <tr class="body_table_base_zero">
                  <td>(*) Receita Bruta</td>
                  <td>{this.state.projection / 12}</td>
                  <td>{this.state.projection / 12}</td>
                  <td>{this.state.projection / 12}</td>
                  <td>{this.state.projection / 12}</td>
                  <td>{this.state.projection / 12}</td>
                  <td>{this.state.projection / 12}</td>
                  <td>{this.state.projection / 12}</td>
                  <td>{this.state.projection / 12}</td>
                  <td>{this.state.projection / 12}</td>
                  <td>{this.state.projection / 12}</td>
                  <td>{this.state.projection / 12}</td>
                  <td>{this.state.projection / 12}</td>
                  <td>{this.state.projection}</td>

                </tr>
            );
      }
}
