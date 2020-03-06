import React, { Component } from 'react'
import {Button, Modal, Input} from 'react-bootstrap'
import '../assets/css/style.css'
import axios from 'axios'

 
export default class Modalzin extends Component {
    constructor(props, context) {
        super(props, context);

        this.saveInDB = this.saveInDB.bind(this);
    
        this.state = {


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
  
          let porcent = (parseInt(v1) /100)
          let resultado = (parseInt(porcent) * parseInt(v2))
          let teste = (parseInt(resultado) + parseInt(v1))
          

          this.setState({
            valor_meta_ebitda: teste
          })  

        }
      }


    render() {
        return null
    }
}
