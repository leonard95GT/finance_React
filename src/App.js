import React, { Component } from 'react'
import './assets/css/style.css'
import axios from 'axios'
import Logo from './assets/images/img/financebox-logo.png'
import LogoPessoa from './assets/images/img/user.png'
import LogoIcone1 from './assets/images/sidebar_icons/icon-menu-home.png'
import LogoIcone2 from './assets/images/sidebar_icons/icon-menu-venda.png'
import LogoIcone3 from './assets/images/sidebar_icons/icon-menu-projecoes.png'
import LogoIcone4 from './assets/images/sidebar_icons/icon-menu-financeiro.png'
import LogoIcone5 from './assets/images/sidebar_icons/icon-menu-analise-economica.png'

import Tabela from './components/Tabela'

import { Modal } from 'react-bootstrap'


export default class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.tableData = this.tableData.bind(this);
    this.handleShow2 = this.handleShow2.bind(this);
    this.handleShow3 = this.handleShow3.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClose2 = this.handleClose2.bind(this);
    this.saveInDBI = this.saveInDBI.bind(this); 
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange_Renda_Ano = this.handleChange_Renda_Ano.bind(this)
    this.handleChange_Tipo_Crescimento = this.handleChange_Tipo_Crescimento.bind(this)
    this.handleChange_Valor_Crescimento = this.handleChange_Valor_Crescimento.bind(this)
    this.handleChange_Porcento_Crescimento = this.handleChange_Porcento_Crescimento.bind(this)
    this.handleChange_Valor_Meta_Ebitda = this.handleChange_Valor_Meta_Ebitda.bind(this)
    this.handleChange_Porcento_Ebitda = this.handleChange_Porcento_Ebitda.bind(this)
    this.handleChange_Meta_Ebitda = this.handleChange_Meta_Ebitda.bind(this)
    this.saveInDB = this.saveInDB.bind(this)
    this.saveImposto = this.saveImposto.bind(this)
    


    this.state = {
      renda: 12,
      imposto: 0,
      parcelaImposto: 0,
      tamanho: 0,
      tamanho2:0,
      show2:false,
      show: true,
      show3:false,
      renda_ano_passado:'',
      tipo_crescimento: 0,
      valor_crescimento: '',
      porcento_crescimento: '',
      meta_ebitda: 1,
      valor_meta_ebitda: '',
      porcento_ebitda: '',
      item1:'',
      item2:'disabled',
      item3:'',
      item4:'disabled',
      gastos: {
        valorGeral: 8000
      },
      tabela:
        { description:'(+) Receita Bruta',
        mouth1: 0, 
        mouth2: 0,
        mouth3: 0, 
        mouth4: 0, 
        mouth5: 0, 
        mouth6: 0, 
        mouth7: 0, 
        mouth8: 0, 
        mouth9: 0, 
        mouth10: 0, 
        mouth11: 0, 
        mouth12: 0,
        count: 0
        },
       
      
    }

  }

  handleClose() {
    if(this.state.valor_crescimento!='' && this.state.valor_crescimento > ''){
      this.setState({ show2: false, tamanho:1 });
    }
  }

  saveImposto(event){
    this.setState({ imposto:event.target.value });
    const calculo = this.state.imposto;

    const imposto = this.state.imposto;
    const renda = this.state.valor_crescimento;

    const parcela = (parseInt(renda) / 100);
    const parcelImposto = (parcela * imposto);

    this.setState({parcelaImposto: parcelImposto})

  }

  handleClose2() {
    this.setState({ show3: false, tamanho2:1});

    //this.props.history.push('/Dash')
    
  
  }
  
  saveInDBI() {
    this.setState({
      tamanho:1,
      show2:false
    })
  }

  handleShow2() {
    this.setState({ show2: true });

  }

  handleShow3() {
    this.setState({ show3: true });
  }

    tableData(){
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      axios.get(proxyurl + 'http://34.70.109.4/projection', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*'
        },
        proxy: {
          host: '34.70.109.4',
          port: 8080
        }
        }).then(res => {
          const va = res.data
          this.setState({
            tamanho: va.length,
            renda: va[va.length-1].grow_up_value,
          })
        })
        
    }

     
    handleClose() {
      if(this.state.valor_crescimento!='' && this.state.valor_crescimento > ''){
        this.setState({ show: false });
      }else{
        alert('Para iniciar no Base Zero, informe os dados abaixo!')
      }
  
    }
  
    handleShow() {
      this.setState({ show: true });
    }

    saveInDB() {
      ////console..log(this.state)
      this.setState({renda: this.state.valor_crescimento})
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
          //console..log('response is : ' + response.data);
          
        }).catch(function (err){
          //console..log(err)
        })

        const valor = (this.state.valor_crescimento / 12)
        //console..log(valor)
        this.setState({
          tabela:
            {description:'(+) Receita Bruta',
            mouth1: Math.round(valor), 
            mouth2: Math.round(valor),
            mouth3: Math.round(valor), 
            mouth4: Math.round(valor), 
            mouth5: Math.round(valor), 
            mouth6: Math.round(valor), 
            mouth7: Math.round(valor), 
            mouth8: Math.round(valor), 
            mouth9: Math.round(valor), 
            mouth10: Math.round(valor), 
            mouth11: Math.round(valor), 
            mouth12: Math.round(valor),
            count: this.state.valor_crescimento
          }
          
        })

      this.setState({ show: false });
    }


    handleChange_Renda_Ano(event) {
        this.setState({renda_ano_passado: event.target.value});
        //console..log(this.state.renda_ano_passado)
    }


    handleChange_Tipo_Crescimento(event) {
      if(this.state.renda_ano_passado ==""){
        alert('Insira os dados da Renda do Ano Passado')
      }else{
        this.setState({
          valor_crescimento: '',
          porcento_crescimento: '',
          tipo_crescimento: event.target.value       
        });
        let a = this.state.tipo_crescimento
        //console..log(a);
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

      }
    }


    handleChange_Porcento_Crescimento(event) {
      if(this.state.renda_ano_passado ==""){
        alert('Insira os dados da Renda do Ano Passado')
      }else{
        this.setState({porcento_crescimento: event.target.value});
        //console..log('esse é o valor: '+this.state.porcento_crescimento)
      }  
    }


    handleChange_Meta_Ebitda(event) {
      if(this.state.renda_ano_passado ==""){
        alert('Insira os dados da Renda do Ano Passado')
      }else{
        this.setState({
          valor_meta_ebitda: '',
          porcento_ebitda: '', 
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

      }


    }


    handleChange_Porcento_Ebitda(event) {
      if(this.state.renda_ano_passado ==""){
        alert('Insira os dados da Renda do Ano Passado')
      }else{
        this.setState({porcento_ebitda: event.target.value});

      }
    }

    componentDidUpdate(prevProps, prevState){  
      //valor de crescimento
      if (prevState.valor_crescimento !== this.state.valor_crescimento   && 
        this.state.tipo_crescimento == 0) {
        if(this.state.valor_crescimento==0 ){
          //console..log('nada')
        }else{
          //console..log('tem algo')
          var v1 = this.state.renda_ano_passado;
          var v2 = this.state.valor_crescimento;
            
          var calc = (v2 - v1);
          calc = (calc / v1);
          calc = (calc * 100);
  
          this.setState({
            porcento_crescimento: Math.round(calc)
          }) 

        }
 
      }  
      
      //% de crescimento      
      if (prevState.porcento_crescimento !== this.state.porcento_crescimento 
      && 
         this.state.tipo_crescimento == 1) {
        

        if(this.state.porcento_crescimento==0){
          //console..log('a')
        }else if (this.state.porcento_crescimento==''){
          this.state.porcento_crescimento=prevState.porcento_crescimento
          //console..log('c')
        }else{
          //console..log('b')
        var v1 = this.state.renda_ano_passado;
        var v2 = this.state.porcento_crescimento;

        //console..log('olha o valor: '+v2)
        var porcent = ((v1 / 100) * v2);
        var resultado = parseInt(porcent) + parseInt(v1)
        this.setState({
          valor_crescimento: Math.round(resultado)
        })  

        }
      }  

      //valor de meta ebitda
      if (prevState.valor_meta_ebitda !== this.state.valor_meta_ebitda
        && 
         this.state.meta_ebitda == 1) {
        ////console..log('Esse é o this '+ this.state.valor_crescimento)

        if(this.state.valor_meta_ebitda == 0){
          //console..log('teste')
        }else{
          var v1 = this.state.renda_ano_passado;
          var v2 = this.state.valor_meta_ebitda
            
          var calc = (v2 - v1);
          calc = (calc / v1);
          calc = (calc * 100);
  
          this.setState({
            porcento_ebitda: Math.round(calc)
          })  
  
        }
      }  
      
      //% de meta ebitda      
      if (prevState.porcento_ebitda !== this.state.porcento_ebitda
        && 
        this.state.meta_ebitda == 0) {
        ////console..log('Esse é o this '+ this.state.valor_crescimento)

        if (this.state.porcento_ebitda == 0 || this.state.porcento_ebitda ==0){
          //console..log('teste')
        }else{
          var v1 = this.state.renda_ano_passado;
          var v2 = this.state.porcento_ebitda;
  
          var porcent = ((v1 / 100) * v2);
          var resultado = parseInt(porcent) + parseInt(v1)
          this.setState({
            valor_meta_ebitda: Math.round(resultado)
          })  
  
        }
      }  


    }

  render() {
    return (


      <div id="wrapper">
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark" id="accordionSidebar">
          <a class="sidebar-brand d-flex align-items-center justify-content-center" href="#">
            <div class="sidebar-brand-icon rotate-n-15">
              <img src={Logo} alt="" />
            </div>
          </a>
          <hr class="sidebar-divider my-0"/>
          <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <i class="fas fa-fw fa-cog"></i>
          <span><img src={LogoPessoa} alt="" /></span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <i class="fas fa-fw fa-cog"></i>
          <span><img src={LogoIcone1} alt="" /></span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <i class="fas fa-fw fa-cog"></i>
          <span><img src={LogoIcone2} alt="" /></span>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <i class="fas fa-fw fa-cog"></i>
          <span><img src={LogoIcone3} alt="" /></span>
        </a>
        
      </li>
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <i class="fas fa-fw fa-cog"></i>
          <span><img src={LogoIcone4} alt="" /></span>
        </a>
      </li>

      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <i class="fas fa-fw fa-cog"></i>
          <span><img src={LogoIcone5} alt="" /></span>
        </a>
      </li>


        </ul>



        <div id="content-wrapper" className="d-flex flex-column">
          <div id="contentA">
            <div>
                <Modal className="modal-container" id="staticBackdrop"  show={this.state.show} onHide={this.handleClose}>
                  <Modal.Body>
                    <div class="text-center text-muted">
                      <h4 class="font-weight-bold ">Base zero</h4>
                      <p class="subTitle">Para iniciar as projeções precisamos preencher algumas informações básicas</p>
                    </div>
                      <div class="container text-muted " id="container-central">

                      <div class="row mb-4">

                      <div class="col-4">

                      <span  class="titulo-caixa">Renda bruta ano anterior:</span>
                      <input 
                          value={this.state.renda_ano_passado} 
                          type="number" 
                          onChange={this.handleChange_Renda_Ano} 
                          placeholder="R$" 
                          class="caixa texto-cinza" 
                      />

                  </div>
                  <div class="col-4"></div>
                  <div class="col-4"></div>

                </div>
                <div class="row mb-4 ">
                  
                  <div class="col-4">

                    <span class="titulo-caixa">Tipo de<br/>crescimento</span>
                      <select value={this.state.tipo_crescimento} onChange={this.handleChange_Tipo_Crescimento.bind(this)}>
                        <option value="0" class="titulo-caixa">Valor Bruto</option>
                        <option value="1" class="titulo-caixa" >% de Crescimento</option>
                      </select>

                  </div>
                  <div className="col-4">
                    <span class="titulo-caixa">Valor de<br/>crescimento:</span>
                    <input class="btn dropdown-azul dropdown-toggle" value={this.state.valor_crescimento} 
                          onChange={this.handleChange_Valor_Crescimento} 
                          type="number" placeholder="R$" 
                          class="caixa texto-cinza"
                          disabled = {(this.state.item1)? "disabled" : ""}

                    />
                  </div>

                  <div class="col-4">
                    
                    <span class="titulo-caixa">% de<br/>crescimento:</span>
                    <input value={this.state.porcento_crescimento} 
                          onChangeCapture={this.handleChange_Porcento_Crescimento} 
                          type="number" placeholder="%" 
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
                    <span class="titulo-caixa">Meta do<br/>EBITDA: </span>
                    <input value={this.state.valor_meta_ebitda} 
                          onChange={this.handleChange_Valor_Meta_Ebitda} 
                          type="number" 
                          placeholder="R$" 
                          class="caixa texto-cinza"
                          disabled = {(this.state.item3)? "disabled" : ""}
                    />
                  </div>
                  <div class="col-4">
                    
                    <span class="titulo-caixa">% do<br/>EBITDA:</span>
                    <input value={this.state.porcento_ebitda} 
                          onChange={this.handleChange_Porcento_Ebitda} 
                          type="number" 
                          placeholder="%" 
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

            <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
              <i class="fa fa-bars"></i>
            </button>


            <ul class="navbar-nav ml-auto">

              <li class="nav-item dropdown no-arrow mx-1">
                <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fas fa-bell fa-fw"></i>
                  <span class="badge badge-danger badge-counter">3+</span>
                </a>
            </li>

              <li class="nav-item dropdown no-arrow mx-1">
                <a class="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fas fa-envelope fa-fw"></i>
                  <span class="badge badge-danger badge-counter">7</span>
                </a>
                <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                  <h6 class="dropdown-header">
                    Message Center
                  </h6>
                  <a class="dropdown-item d-flex align-items-center" href="#">
                    <div class="dropdown-list-image mr-3">
                      <div class="status-indicator bg-success"></div>
                    </div>
                    <div class="font-weight-bold">
                      <div class="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                      <div class="small text-gray-500">Emily Fowler · 58m</div>
                    </div>
                  </a>
                  <a class="dropdown-item d-flex align-items-center" href="#">
                    <div class="dropdown-list-image mr-3">
                      <div class="status-indicator"></div>
                    </div>
                    <div>
                      <div class="text-truncate">I have the photos that you ordered last month, how would you like them sent to you?</div>
                      <div class="small text-gray-500">Jae Chun · 1d</div>
                    </div>
                  </a>
                  <a class="dropdown-item d-flex align-items-center" href="#">
                    <div class="dropdown-list-image mr-3">
                      <div class="status-indicator bg-warning"></div>
                    </div>
                    <div>
                      <div class="text-truncate">Last month's report looks great, I am very happy with the progress so far, keep up the good work!</div>
                      <div class="small text-gray-500">Morgan Alvarez · 2d</div>
                    </div>
                  </a>
                  <a class="dropdown-item d-flex align-items-center" href="#">
                    <div class="dropdown-list-image mr-3">
                      <div class="status-indicator bg-success"></div>
                    </div>
                    <div>
                      <div class="text-truncate">Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...</div>
                      <div class="small text-gray-500">Chicken the Dog · 2w</div>
                    </div>
                  </a>
                  <a class="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                </div>
              </li>

              <div class="topbar-divider d-none d-sm-block"></div>

              <li class="nav-item dropdown no-arrow">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={LogoPessoa} alt="" />
                </a>
                <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                  <a class="dropdown-item" href="#">
                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    Profile
                  </a>
                  <a class="dropdown-item" href="#">
                    <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                    Settings
                  </a>
                  <a class="dropdown-item" href="#">
                    <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                    Activity Log
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Logout
                  </a>
                </div>
              </li>

            </ul>

          </nav>


  <Tabela info={this.state.tabela} base={this.state.valor_crescimento}/>

  


</div>

</div>

      </div>


  
    
    
    )
  }
}


