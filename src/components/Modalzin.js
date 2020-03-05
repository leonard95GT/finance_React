import React, { Component } from 'react'
import {Button, Modal, Input} from 'react-bootstrap'
import '../assets/css/style.css'
import axios from 'axios'
 
export default class Modalzin extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange_Renda_Ano = this.handleChange_Renda_Ano.bind(this)
        this.handleChange_Tipo_Crescimento = this.handleChange_Tipo_Crescimento.bind(this)
        this.handleChange_Valor_Crescimento = this.handleChange_Valor_Crescimento.bind(this)
        this.handleChange_Porcento_Crescimento = this.handleChange_Porcento_Crescimento.bind(this)
        this.handleChange_Valor_Meta_Ebitda = this.handleChange_Valor_Meta_Ebitda.bind(this)
        this.handleChange_Porcento_Ebitda = this.handleChange_Porcento_Ebitda.bind(this)
        this.handleChange_Meta_Ebitda = this.handleChange_Meta_Ebitda.bind(this)

        this.saveInDB = this.saveInDB.bind(this);
    
        this.state = {
          show: true,
          renda_ano_passado:0,
          tipo_crescimento: 1,
          valor_crescimento: 0,
          porcento_crescimento: 0,
          meta_ebitda: 0,
          valor_meta_ebitda: 0,
          porcento_ebitda: 0
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
          tipo_crescimento: this.state.tipo_crescimento,
          valor_crescimento: this.state.valor_crescimento,
          porcento_crescimento: this.state.porcento_crescimento,
          meta_ebitda: this.state.meta_ebitda,
          valor_meta_ebitda: this.state.valor_meta_ebitda,
          porcento_ebitda: this.state.porcento_ebitda

        }
        axios.post('',projection)
        alert('Salvo!')
        this.setState({ show: false });
      }


      handleChange_Renda_Ano(event) {
        if(event.target.value == ""){

        }else{
          this.setState({renda_ano_passado: event.target.value});
          var v1 = this.state.renda_ano_passado;
          var v2 = this.state.porcento_crescimento;
  
          var opt = this.state.tipo_crescimento;
  
          if (opt == 0){
            var porcent = ((v1 / 100) * v2);
  
            this.setState({
              valor_crescimento: porcent
            })
          }else{
              
            var calc = (v2 - v1);
            calc = (calc / v1);
            calc = (calc * 100);
  
            this.setState({
              porcento_crescimento: calc
            })
          }
  
        }


      }
      handleChange_Tipo_Crescimento(event) {
        var v1 = this.state.renda_ano_passado;
        var v2 = this.state.valor_crescimento;


        if(event.target.value==""){

        }else{
          this.setState({
            tipo_crescimento: event.target.value,
            porcento_crescimento: 0,
            valor_crescimento: 0

          });
          var opt = this.state.tipo_crescimento


  
          if (opt == 0){
            var porcent = ((v1 / 100) * v2);
  
            this.setState({
              valor_crescimento: porcent
            })
          }else{
              
            let calc = (v2 - v1);
            calc = (calc / v1);
            calc = (calc * 100);
  
            this.setState({
              porcento_crescimento: calc
            })
          }
  
  
        }
      }
      handleChange_Valor_Crescimento(event) {
        this.setState({valor_crescimento: event.target.value});

        var v1 = this.state.renda_ano_passado;
        var v2 = this.state.valor_crescimento;
          
        var calc = (v2 - v1);
        calc = (calc / v1);
        calc = (calc * 100);

        this.setState({
          porcento_crescimento: calc
        })
        
      }
      handleChange_Porcento_Crescimento(event) {
        this.setState({porcento_crescimento: event.target.value});
        var v1 = this.state.renda_ano_passado;
        var v2 = this.state.porcento_crescimento;

        var porcent = ((v1 / 100) * v2);

        this.setState({
          valor_crescimento: porcent
        })

      }
      handleChange_Meta_Ebitda(event) {
        
        this.setState({meta_ebitda: event.target.value});
        if(event.target.value==""){

        }else{
          this.setState({
            tipo_crescimento: event.target.value,
            valor_meta_ebitda: 0,
            porcento_ebitda: 0

          });
          var opt = this.state.meta_ebitda


  
          if (opt == 0){
            var v1 = this.state.renda_ano_passado;
            var v2 = this.state.valor_meta_ebitda;

            var porcent = ((v1 / 100) * v2);
  
            this.setState({
              valor_crescimento: porcent
            })
          }else{
            var v1 = this.state.renda_ano_passado;
            var v2 = this.state.porcento_ebitda;
              
            let calc = (v2 - v1);
            calc = (calc / v1);
            calc = (calc * 100);
  
            this.setState({
              porcento_crescimento: calc
            })
          }
  
  
        }

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
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Body>
                <h4 class="font-weight-bold">Base zero</h4>
                <p class="subTitle">Para iniciar as projeçoes precisamos preencher algumas informações básicas</p>

                <div class="container text-muted " id="container-central">

            <div class="row mb-4">

              <div class="col-4">

                <span  class="titulo-caixa">Renda bruta ano anterior:</span>
                <input value={this.state.renda_ano_passado} onChange={this.handleChange_Renda_Ano} type="text" placeholder="R$100.000,00" class="caixa texto-cinza" />

              </div>
              <div class="col-4"></div>
              <div class="col-4"></div>

            </div>
            <div class="row mb-4 ">
              
              <div class="col-4">

                <div class="dropdown">
                <span class="titulo-caixa">Tipo de<br/>crescimento</span>
                  <select value={this.state.tipo_crescimento} onChange={this.handleChange_Tipo_Crescimento}>
                    <option value="1" class="titulo-caixa">Valor Bruto</option>
                    <option value="0" class="titulo-caixa" >% de Crescimento</option>
                  </select>
                </div>

              </div>
              <div className="col-4">
                <span class="titulo-caixa">Valor de<br/>crescimento:</span>
                <input value={this.state.valor_crescimento} onChange={this.handleChange_Valor_Crescimento} type="text" placeholder="R$100.000,00" class="caixa texto-cinza"/>
              </div>

              <div class="col-4">
                
                <span class="titulo-caixa">% de<br/>crescimento:</span>
                <input value={this.state.porcento_crescimento} onChange={this.handleChange_Porcento_Crescimento} type="text" placeholder="R$100.000,00" class="caixa texto-cinza"/>

              </div>

            </div>
            <div class="row mb-4">
              
              <div class="col-4">

              <div class="dropdown">
                <span class="titulo-caixa">Tipo de<br/>crescimento</span>
                  <select value={this.state.meta_ebitda} onChange={this.handleChange_Meta_Ebitda}>
                    <option value="1" class="titulo-caixa">Meta do EBITDA</option>
                    <option value="0" class="titulo-caixa" >% de EBITDA</option>
                  </select>
                </div>

              </div>
              <div class="col-4">
                
                <span class="titulo-caixa">Meta do<br/>EBITDA:</span>
                <input value={this.state.meta_ebitda} onChange={this.handleChange_Meta_Ebitda} type="text" placeholder="R$100.000,00" class="caixa texto-cinza"/>

              </div>
              <div class="col-4">
                
                <span class="titulo-caixa">% do<br/>EBITDA:</span>
                <input value={this.state.porcento_ebitda} onChange={this.handleChange_Porcento_Ebitda} type="text" placeholder="R$100.000,00" class="caixa texto-cinza"/>

              </div>

              <a id="saveBtn" class="btn mx-auto mt-5 text-white px-5 font-weight-bold" onClick={this.saveInDB} role="button" >Salvar</a>

            </div>
          </div>
              </Modal.Body>
            </Modal>
          </div>
        )
    }
}
