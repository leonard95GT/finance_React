import React, { Component } from 'react'

export default class bla extends Component {
    constructor(props, context) {
        super(props, context);
  
        
      }
    render() {
        if (this.props.sim === 1){
            return (
                
                <tr>
                    <td>(+) Distribuição de Renda 1</td>  
                    <td>{120000 / 12}</td>  
                    <td>{120000 / 12}</td>  
                    <td>{120000 / 12}</td>  
                    <td>{120000 / 12}</td>  
                    <td>{120000 / 12}</td>  
                    <td>{120000 / 12}</td>  
                    <td>{120000 / 12}</td>  
                    <td>{120000 / 12}</td>  
                    <td>{120000 / 12}</td>  
                    <td>{120000 / 12}</td>  
                    <td>{120000 / 12}</td>  
                    <td>{120000 / 12}</td>  
                    <td>{120000}</td>          
                </tr>
            )

        }else{
            return null
        }
    }
}


