import React, { Component } from 'react'
import '../assets/css/style.css'
import axios from 'axios'
 
export default class Modalzin extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange_Renda_Ano = this.handleChange_Renda_Ano.bind(this)

        this.saveInDB = this.saveInDB.bind(this);
    
        this.state = {
          show: false,
          renda_ano_passado:0,
        };
      }
    
      handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
      }

      saveInDB() {
        
        //alert('Salvo!')
        this.setState({ show: false });
      }


      handleChange_Renda_Ano(event) {
        this.setState({renda_ano_passado: event.target.value});
      }
      handleChange_Tipo_Crescimento(event) {
        this.setState({tipo_crescimento: event.target.value});
      }
      handleChange_Valor_Crescimento(event) {
        this.setState({valor_crescimento: event.target.value});
      }
      handleChange_Porcento_Crescimento(event) {
        this.setState({porcento_crescimento: event.target.value});
      }
      handleChange_Meta_Ebitda(event) {
        this.setState({meta_ebitda: event.target.value});
      }
      handleChange_Valor_Meta_Ebitda(event) {
        this.setState({valor_meta_ebitda: event.target.value});
      }
      handleChange_Porcento_Ebitda(event) {
        this.setState({porcento_ebitda: event.target.value});
      }


    render() {
        return null
    }
}
