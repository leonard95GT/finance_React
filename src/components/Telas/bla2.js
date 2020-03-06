import React, { Component } from 'react'

export default class bla2 extends Component {
    constructor(props, context) {
        super(props, context);
        
        this.state={
            valor: 0,
            valorBase: 0,
            valorParcela: 0
        }
      }

    teste(){


        const imposto = this.props.valor;
        const renda = this.props.valorBase;
    
        const parcela = (parseInt(renda) / 100);
        const parcelImposto = (parcela * imposto);
        console.log(parcelImposto)
    
        this.setState({parcelaImposto: parcelImposto})
    
    

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


