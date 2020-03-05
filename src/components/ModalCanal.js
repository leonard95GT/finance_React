import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
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
        const projection = {
          renda_ano_passado:this.state.renda_ano_passado,

        }
        axios.post('',projection)
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
        return (
            <div>
                  <button type="button" class="btn btn-primary" onClick={this.handleShow}>
                    (+) Adicionar Canal
                  </button>

            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Body>
              <div class="text-center text-muted">
                <h4 class="font-weight-bold" >Adicionar canal de distribuição</h4>
              </div>

              <div class="container" id="container-central">

<div class="row mb-4">

  <div class="col-12 text-center">

    <span class="texto-cinza mr-2">Canal de distribuição:</span>
    <input class="text-dark texto-cinza px-5 py-2 rounded" id="nome-canal" placeholder="Digite o nome do canal" type="text" name=""/>

  </div>

  <a id="save" class="btn mx-auto mt-5 text-white px-5 font-weight-bold" role="button" onClick={this.saveInDB}>Salvar</a>
  

</div>

</div>

              </Modal.Body>
            </Modal>
          </div>
        )
    }
}
