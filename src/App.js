import React, { Component } from 'react'
import Modal from './components/Modalzin'
import Modal2 from './components/ModalCanal'
import Modal3 from './components/ModalImposto'
import './assets/css/style.css'
import axios from 'axios'
import Tabela from './components/Table'

export default class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.tableData = this.tableData.bind(this);

    this.state = {
      renda: 12,
      tamanho: 0
    }

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

  render() {
    return (
      <div id="content-wrapper" class="d-flex flex-column">

      <div id="content">
      <Modal />

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

        <div class="container-fluid">
          <div class="col-6">
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 onClick={this.tableData}class="h3 mb-0 text-gray-800">Detalhando os dados da receita bruta</h1>
            </div>  
          </div>
          <div class="col-6">


          <Modal2 />

            
          </div>

          <div>
  
          </div>
          <div>

          </div>
        </div>

        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
              <thead class="head_table_base_zero">
                <tr>
                  <th></th>
                  <th >JAN</th>
                  <th>FEV</th>
                  <th>MAR</th>
                  <th>ABR</th>
                  <th>MAI</th>
                  <th>JUN</th>
                  <th>JUL</th>
                  <th>AGO</th>
                  <th>SET</th>
                  <th>OUT</th>
                  <th>NOV</th>
                  <th>DEZ</th>
                  <th>YTD</th>
                </tr>
              </thead>
              <tbody class="body_table_base_zero">
              <Tabela data={this.state.renda}/>
              </tbody>
            </table>


          </div>
 
          <Modal3 />



      </div>


    </div>

  </div>
    )
  }
}
