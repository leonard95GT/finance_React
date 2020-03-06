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


