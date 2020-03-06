import React, { Component } from 'react'

export default class bla3 extends Component {
    constructor(props, context) {
        super(props, context);
  
        
      }
    render() {
        if (this.props.sim === 1){
            return (
                <tr>
                    <td>(-) Receita</td>  
                    <td>8000</td>  
                    <td>8000</td>  
                    <td>8000</td>  
                    <td>8000</td>  
                    <td>8000</td>  
                    <td>8000</td>  
                    <td>8000</td>  
                    <td>8000</td>  
                    <td>8000</td>  
                    <td>8000</td>  
                    <td>8000</td>  
                    <td>8000</td>  
                    <td>96.000</td>          
                </tr>
            
            )

        }else{
            return null
        }
    }
}


