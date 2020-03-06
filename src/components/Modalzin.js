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
          renda_ano_passado:'',
          tipo_crescimento: 0,
          valor_crescimento: '',
          porcento_crescimento: '',
          meta_ebitda: 0,
          valor_meta_ebitda: '',
          porcento_ebitda: '',
          item1:'',
          item2:'disabled',
          item3:'',
          item4:'disabled',

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
          tipo_crescimento_ano: this.state.tipo_crescimento,
          crescimento_ano: this.state.valor_crescimento,
          porcento_ano: this.state.porcento_crescimento,
          meta_ebitda: this.state.meta_ebitda,
          crescimento_ebitda: this.state.valor_meta_ebitda,
          porcento_crescimento_ebitda: this.state.porcento_ebitda

        }
        const proxyurl = "https://cors-anywhere.herokuapp.com/";  
        axios.post(proxyurl + 'http://34.70.109.4/projection', {
          renda_ano_passado: this.state.renda_ano_passado,
          porcento_ano: this.state.porcento_crescimento,
          crescimento_ano: this.state.valor_crescimento,
          tipo_crescimento_ano: this.state.tipo_crescimento,
          meta_ebitda: this.state.meta_ebitda,
          crescimento_ebitda: this.state.valor_meta_ebitda,
          porcento_crescimento_ebitda: this.state.porcento_ebitda
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
          },
          proxy: {
            host: '34.70.109.4',
            port: 8080
          }
          }).then(function (response) {
            console.log('response is : ' + response.data);
          }).catch(function (err){
            console.log(err)
          })


        this.setState({ show: false });
      }


      handleChange_Renda_Ano(event) {
          this.setState({renda_ano_passado: event.target.value});
          //console.log(this.state.renda_ano_passado)
      }


      handleChange_Tipo_Crescimento(event) {
        if(this.state.renda_ano_passado ==""){
          alert('Insira os dados da Renda do Ano Passado')
        }else{
          this.setState({
            valor_crescimento: 'R$',
            porcento_crescimento: 'R$',
            tipo_crescimento: event.target.value       
          });
          let a = this.state.tipo_crescimento
          console.log(a);
          if(this.state.tipo_crescimento == 1){
            this.setState({item1:''})
            this.setState({item2:'disabled'})
          }else{
            //0 é %
            this.setState({item2:''})
            this.setState({item1:'disabled'})

          }
        }
      }


      handleChange_Valor_Crescimento(event) {
        if(this.state.renda_ano_passado ==""){
          alert('Insira os dados da Renda do Ano Passado')
        }else{
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
      }


      handleChange_Porcento_Crescimento(event) {
        if(this.state.renda_ano_passado ==""){
          alert('Insira os dados da Renda do Ano Passado')
        }else{
          this.setState({porcento_crescimento: event.target.value});
          var v1 = this.state.renda_ano_passado;
          var v2 = this.state.porcento_crescimento;
  
          var porcent = ((v1 / 100) * v2);
          var resultado = parseInt(porcent) + parseInt(v1)
          this.setState({
            valor_crescimento: resultado
          })  
        }  
      }


      handleChange_Meta_Ebitda(event) {
        if(this.state.renda_ano_passado ==""){
          alert('Insira os dados da Renda do Ano Passado')
        }else{
          this.setState({
            valor_meta_ebitda: 0,
            porcento_ebitda: 0  , 
            meta_ebitda: event.target.value            
          });
          if(this.state.meta_ebitda == 0){
            this.setState({item3:''})
            this.setState({item4:'disabled'})
          }else{
            //0 é %
            this.setState({item4:''})
            this.setState({item3:'disabled'})

          }

        }
      

      }

      handleChange_Valor_Meta_Ebitda(event) {
        if(this.state.renda_ano_passado ==""){
          alert('Insira os dados da Renda do Ano Passado')
        }else{
          this.setState({valor_meta_ebitda: event.target.value});

          var v1 = this.state.renda_ano_passado;
          var v2 = this.state.valor_meta_ebitda
            
          var calc = (v2 - v1);
          calc = (calc / v1);
          calc = (calc * 100);
  
          this.setState({
            porcento_ebitda: calc
          })  
        }


      }


      handleChange_Porcento_Ebitda(event) {
        if(this.state.renda_ano_passado ==""){
          alert('Insira os dados da Renda do Ano Passado')
        }else{
          this.setState({porcento_ebitda: event.target.value});

          var v1 = this.state.renda_ano_passado;
          var v2 = this.state.porcento_ebitda;
  
          var porcent = (((v1 / 100) * v2) + v1);
          var resultado = parseInt(porcent) + parseInt(v1)
          this.setState({
            crescimento_ebitda: resultado
          })  
          if(this.state.meta_ebitda === 1){
            this.setState({item3:''})
            this.setState({item4:'disabled'})
          }else{
            //0 é %
            this.setState({item4:''})
            this.setState({item3:'disabled'})

          }


        }
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
                <input value={this.state.renda_ano_passado}  
                       onChangeCapture={this.handleChange_Renda_Ano} 
                       placeholder="R$" 
                       class="caixa texto-cinza" 
                       />

              </div>
              <div class="col-4"></div>
              <div class="col-4"></div>

            </div>
            <div class="row mb-4 ">
              
              <div class="col-4">

                <div class="dropdown">
                <span class="titulo-caixa">Tipo de<br/>crescimento</span>
                  <select value={this.state.tipo_crescimento} onChange={this.handleChange_Tipo_Crescimento.bind(this)}>
                    <option value="0" class="titulo-caixa">Valor Bruto</option>
                    <option value="1" class="titulo-caixa" >% de Crescimento</option>
                  </select>
                </div>

              </div>
              <div className="col-4">
                <span class="titulo-caixa">Valor de<br/>crescimento:</span>
                <input value={this.state.valor_crescimento} 
                       onChangeCapture={this.handleChange_Valor_Crescimento} 
                       type="text" placeholder="R$" 
                       class="caixa texto-cinza"
                       disabled = {(this.state.item1)? "disabled" : ""}

                />
              </div>

              <div class="col-4">
                
                <span class="titulo-caixa">% de<br/>crescimento:</span>
                <input value={this.state.porcento_crescimento} 
                       onChangeCapture={this.handleChange_Porcento_Crescimento} 
                       type="text" placeholder="R$" 
                       class="caixa texto-cinza"
                       disabled = {(this.state.item2)? "disabled" : ""}
                       />

              </div>

            </div>
            <div class="row mb-4">
              
              <div class="col-4">

              <div class="dropdown">
                <span class="titulo-caixa">Tipo de<br/>crescimento</span>
                  <select value={this.state.meta_ebitda} onChange={this.handleChange_Meta_Ebitda.bind(this)}>
                    <option value="1" class="titulo-caixa">Meta do EBITDA</option>
                    <option value="0" class="titulo-caixa" >% de EBITDA</option>
                  </select>
                </div>

              </div>
              <div class="col-4">
                
                <span class="titulo-caixa">Meta do<br/>EBITDA:</span>
                <input value={this.state.valor_meta_ebitda} 
                       onChange={this.handleChange_Valor_Meta_Ebitda} 
                       type="text" 
                       placeholder="R$" 
                       class="caixa texto-cinza"
                       disabled = {(this.state.item3)? "disabled" : ""}
                />
              </div>
              <div class="col-4">
                
                <span class="titulo-caixa">% do<br/>EBITDA:</span>
                <input value={this.state.porcento_ebitda} 
                       onChange={this.handleChange_Porcento_Ebitda} 
                       type="text" 
                       placeholder="R$" 
                       class="caixa texto-cinza"
                       disabled = {(this.state.item4)? "disabled" : ""}
                />
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
