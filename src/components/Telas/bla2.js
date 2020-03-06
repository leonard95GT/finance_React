import React, { Component } from 'react'

export default class bla2 extends Component {
    constructor(props, context) {
        super(props, context);
  
        
      }
    render() {
        if (this.props.sim === 1){
            return (
                <tr>
                    <td>(-) Impostos</td>  
                    <td>{this.props.valor / 12}</td>  
                    <td>{this.props.valor / 12}</td>  
                    <td>{this.props.valor / 12}</td>  
                    <td>{this.props.valor / 12}</td>  
                    <td>{this.props.valor / 12}</td>  
                    <td>{this.props.valor / 12}</td>  
                    <td>{this.props.valor / 12}</td>  
                    <td>{this.props.valor / 12}</td>  
                    <td>{this.props.valor / 12}</td>  
                    <td>{this.props.valor / 12}</td>  
                    <td>{this.props.valor / 12}</td>  
                    <td>{this.props.valor / 12}</td>  
                    <td>{this.props.valor}</td>          
                </tr>
            
            )

        }else{
            return null
        }
    }
}


