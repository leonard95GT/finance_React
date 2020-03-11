import React, { useState, useEffect } from 'react';
import {Modal, Button} from 'react-bootstrap'
import MaterialTable from 'material-table';


function DashFinal(props) {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const [tabela, setTabela] = useState('');
    const [description, setDescription] = useState('');
    const [tax, setTax] = useState(0);
    const [renda, setRenda] = useState(2000);
    const [contador, setContador] = useState(0);
    const [contadorFinal, setContadorFinal] = useState(20);
    const [renda2, setRenda2] = useState(0);
    const [valorInicial, setValorInicial] = useState(1000000000000)
    const [calculado, setCalculado] = useState(true)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
  

  
    const [state, setState] = React.useState({
        columns: [
          { title: '', field: 'description'},
          { title: 'JAN', field: 'mouth1' },
          { title: 'FEV', field: 'mouth2' },
          { title: 'MAR', field: 'mouth3' },
          { title: 'ABR', field: 'mouth4' },
          { title: 'MAI', field: 'mouth5' },
          { title: 'JUN', field: 'mouth6' },
          { title: 'JUL', field: 'mouth7' },
          { title: 'AGO', field: 'mouth8' },
          { title: 'SET', field: 'mouth9' },
          { title: 'OUT', field: 'mouth10' },
          { title: 'NOV', field: 'mouth11' },
          { title: 'DEZ', field: 'mouth12' },
          { title: 'YDR', field: 'count' },
    
    
        ],
    
    
        data: [{
          mouth1: props.info.mouth1,
          mouth2: props.info.mouth2,
          mouth3: props.info.mouth3,
          mouth4: props.info.mouth4,
          mouth5: props.info.mouth5,
          mouth6: props.info.mouth6,
          mouth7: props.info.mouth7,
          mouth8: props.info.mouth8,
          mouth9: props.info.mouth9,
          mouth10: props.info.mouth10,
          mouth11: props.info.mouth11,
          mouth12: props.info.mouth12,
          count: renda
        }],
    
      });
    

  useEffect(() => {
    
    setTabela(props.info); 
    setRenda(props.base);

    console.log(props.info.mouth1)
    if(props.info.mouth1 == 0){
      console.log('não precisa alterar')
    }else{
      console.log('agora pode') 
      if(valorInicial == props.info.mouth1){
        console.log('Ops, acho q dessa vez não, haha')
      }else{
        console.log('lets go')
        setValorInicial(props.info.mouth1);
        setState(prevState => {
        const data = [...prevState.data];
        data[0] = props.info;
        return { ...prevState, data };
      });

      }

    }

  });

  //calcula 
  function calcularImpostos(){
    //setTax(props.base)
    const valor = contadorFinal;
    setContadorFinal(valor);
    console.log('Contador final: ' + contador);


    let impostos = parseInt(tax,10);
    
    let valorGeral = parseInt(renda2  ,10);

    let totalImposto = ((parseInt(valorGeral) / 100) * impostos) 

    let valorParcela = (totalImposto / 12).toFixed(2);

    let receita = valorGeral - totalImposto;
     
    let parcelaReceita = (receita / 12).toFixed(2);

    console.log('Impostos: '+ impostos);
    console.log('Valor Geral: '+ valorGeral);
    console.log('Total do valor do imposto: '+ totalImposto);
    console.log('Parcela do Imposto: '+ valorParcela);
    console.log('Receita: '+ receita)
    
    setState(prevState => {
      const data = [...prevState.data];
      data.push({
          description: '(-) Impostos s/ serviços',
          mouth1: valorParcela,
          mouth2: valorParcela,
          mouth3: valorParcela,
          mouth4: valorParcela,
          mouth5: valorParcela,
          mouth6: valorParcela,
          mouth7: valorParcela,
          mouth8: valorParcela,
          mouth9: valorParcela,
          mouth10: valorParcela,
          mouth11: valorParcela,
          mouth12: valorParcela,
          count: totalImposto
      });
      return { ...prevState, data };
    });

    setState(prevState => {
      const data = [...prevState.data];
      data.push({
          description: '(=) Receita Líquida',
          mouth1: parcelaReceita,
          mouth2: parcelaReceita,
          mouth3: parcelaReceita,
          mouth4: parcelaReceita,
          mouth5: parcelaReceita,
          mouth6: parcelaReceita,
          mouth7: parcelaReceita,
          mouth8: parcelaReceita,
          mouth9: parcelaReceita,
          mouth10: parcelaReceita,
          mouth11: parcelaReceita,
          mouth12: parcelaReceita,
          count: receita
      });
      return { ...prevState, data };
    });

    
    setShow2(false);
    setCalculado(false)
  }



  function adicionarCanal(){
    const valor = contador;
    setContador(valor+2);
    console.log('Contador para a cor: ' + contador);

    if(state.data[1]){
      setState(prevState => {
        const data = [...prevState.data];
        data.push({
            description: description,
            mouth1: '',
            mouth2: '',
            mouth3: '',
            mouth4: '',
            mouth5: '',
            mouth6: '',
            mouth7: '',
            mouth8: '',
            mouth9: '',
            mouth10: '',
            mouth11: '',
            mouth12: '',
            count: ''
  
        });
        return { ...prevState, data };
      });
      }else{
      setState(prevState => {
        const data = [...prevState.data];
        data.push({
            description: description,
            mouth1: state.data[0].mouth1,
            mouth2: state.data[0].mouth2,
            mouth3: state.data[0].mouth3,
            mouth4: state.data[0].mouth4,
            mouth5: state.data[0].mouth5,
            mouth6: state.data[0].mouth6,
            mouth7: state.data[0].mouth7,
            mouth8: state.data[0].mouth8,
            mouth9: state.data[0].mouth9,
            mouth10: state.data[0].mouth10,
            mouth11: state.data[0].mouth11,
            mouth12: state.data[0].mouth12,
            count: renda
  
        });
        return { ...prevState, data };
      });
      }


    setShow(false)
  }



return(
    <div id="tabela">

<div id="contentA" class="row container-fluid">
    {/* <div class="col-5">
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Detalhando os dados da receita bruta</h1>
      </div>  
    </div> */}
    <div class="col-6 d-sm-flex align-items-right justify-content-between mb-4">
      
    {calculado ?     
   <Button id="btn_add_Canal" variant="primary" onClick={handleShow}>
      (+) Adicionar Canal
    </Button>
 : ''}

    </div>
  </div>

   


    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
          
      <div class="text-center text-muted">
          <h4 class="font-weight-bold" >Adicionar canal de distribuição</h4>
        </div>

        <div class="container" id="container-central">

        <div class="row mb-4">

        <div class="col-12 text-center">

        <span class="texto-cinza mr-2">Canal de distribuição:</span>
        <input onChange={e => setDescription(e.target.value)} class="text-dark texto-cinza px-5 py-2 rounded" id="nome-canal" placeholder="Digite o nome do canal" type="text" name=""/>
        </div>

        <a id="save"
           class="btn mx-auto mt-5 text-white px-5 font-weight-bold"
           role="button"
           onClick={adicionarCanal}>Salvar</a>


        </div>

        </div>

      </Modal.Body>
    </Modal>

    {calculado ?   <MaterialTable
      title="Detalhando os dados da receita bruta"
      columns={state.columns}
      data={state.data}
      icons={{
        add: props => (
          <div>
             {calculado ?     
   <Button id="btn_add_Canal" variant="primary" onClick={handleShow}>
      (+) Adicionar Canal
    </Button>
 : ''}

          </div>
        ),
      }}
      actions={[
        {
          icon: () => calculado ?     
          <Button id="btn_add_Canal" variant="primary" onClick={handleShow}>
             (+) Adicionar Canal
           </Button>
        : '',
          isFreeAction: true,
          onClick: (event) => handleShow()
        }
      ]}
      options={{
        actionsColumnIndex: -1,
        search: false,
        paging:false,
        rowStyle: rowData => ({
          backgroundColor: (rowData.tableData.id === 0) ? '#6dc4e6' : '#fff',
          color: (rowData.tableData.id ===  0) ? '#fff' : 'black',

        }),
        headerStyle: {
          backgroundColor: '#6a6af8',
          color: '#FFF',
          fontSize: 12,
          paddingLeft:1
        }
      }}
      
      editable={{
        isEditable: rowData => calculado, // only name(a) rows would be editable
        isDeletable: rowData => calculado, // only name(a) rows would be deletable
       
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                newData.count = (parseInt(newData.mouth1)
                                +parseInt(newData.mouth2)
                                +parseInt(newData.mouth3)
                                +parseInt(newData.mouth4)
                                +parseInt(newData.mouth5)
                                +parseInt(newData.mouth6)
                                +parseInt(newData.mouth7)
                                +parseInt(newData.mouth8)
                                +parseInt(newData.mouth9)
                                +parseInt(newData.mouth10)
                                +parseInt(newData.mouth11)
                                +parseInt(newData.mouth12));
                


                    const nova = {          
                      mouth1: parseFloat(newData.mouth1),
                      mouth2: parseFloat(newData.mouth2),
                      mouth3: parseFloat(newData.mouth3),
                      mouth4: parseFloat(newData.mouth4),
                      mouth5: parseFloat(newData.mouth5),
                      mouth6: parseFloat(newData.mouth6),
                      mouth7: parseFloat(newData.mouth7),
                      mouth8: parseFloat(newData.mouth8),
                      mouth9: parseFloat(newData.mouth9),
                      mouth10: parseFloat(newData.mouth10),
                      mouth11: parseFloat(newData.mouth11),
                      mouth12: parseFloat(newData.mouth12),
                      count: 0
                    }

                    nova.count = (parseInt(nova.mouth1)
                    +parseInt(nova.mouth2)
                    +parseInt(nova.mouth3)
                    +parseInt(nova.mouth4)
                    +parseInt(nova.mouth5)
                    +parseInt(nova.mouth6)
                    +parseInt(nova.mouth7)
                    +parseInt(nova.mouth8)
                    +parseInt(nova.mouth9)
                    +parseInt(nova.mouth10)
                    +parseInt(nova.mouth11)
                    +parseInt(nova.mouth12));
                    
                    const antiga = {          
                      mouth1: parseFloat(state.data[0].mouth1),
                      mouth2: parseFloat(state.data[0].mouth2),
                      mouth3: parseFloat(state.data[0].mouth3),
                      mouth4: parseFloat(state.data[0].mouth4),
                      mouth5: parseFloat(state.data[0].mouth5),
                      mouth6: parseFloat(state.data[0].mouth6),
                      mouth7: parseFloat(state.data[0].mouth7),
                      mouth8: parseFloat(state.data[0].mouth8),
                      mouth9: parseFloat(state.data[0].mouth9),
                      mouth10: parseFloat(state.data[0].mouth10),
                      mouth11: parseFloat(state.data[0].mouth11),
                      mouth12: parseFloat(state.data[0].mouth12),
                      count: 0
                    }


                    antiga.count = (
                     parseInt(antiga.mouth1)
                    +parseInt(antiga.mouth2)
                    +parseInt(antiga.mouth3)
                    +parseInt(antiga.mouth4)
                    +parseInt(antiga.mouth5)
                    +parseInt(antiga.mouth6)
                    +parseInt(antiga.mouth7)
                    +parseInt(antiga.mouth8)
                    +parseInt(antiga.mouth9)
                    +parseInt(antiga.mouth10)
                    +parseInt(antiga.mouth11)
                    +parseInt(antiga.mouth12));


                    antiga.mouth1 += nova.mouth1;
                    antiga.mouth2 += nova.mouth2;
                    antiga.mouth3 += nova.mouth3;
                    antiga.mouth4 += nova.mouth4;
                    antiga.mouth5 += nova.mouth5;
                    antiga.mouth6 += nova.mouth6;
                    antiga.mouth7 += nova.mouth7;
                    antiga.mouth8 += nova.mouth8;
                    antiga.mouth9 += nova.mouth9;
                    antiga.mouth10 += nova.mouth10;
                    antiga.mouth11 += nova.mouth11;
                    antiga.mouth12 += nova.mouth12;
                    antiga.count +=  parseInt(nova.count)
                    
                    console.log('renda '+renda)
                    console.log('nova '+nova.count)
                    console.log('antiga '+antiga.count)

                  state.data[0].mouth1 = antiga.mouth1;
                  state.data[0].mouth2 = antiga.mouth2;
                  state.data[0].mouth3 = antiga.mouth3;
                  state.data[0].mouth4 = antiga.mouth4;
                  state.data[0].mouth5 = antiga.mouth5;
                  state.data[0].mouth6 = antiga.mouth6;
                  state.data[0].mouth7 = antiga.mouth7;
                  state.data[0].mouth8 = antiga.mouth8;
                  state.data[0].mouth9 = antiga.mouth9;
                  state.data[0].mouth10 = antiga.mouth10;
                  state.data[0].mouth11 = antiga.mouth11;
                  state.data[0].mouth12 = antiga.mouth12;
                  state.data[0].count = antiga.count;

                  setRenda2(antiga.count)

                
                //console.log(nova)
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
                state.data.forEach(function(el){
                  console.log('to contando'+el.count)
                })


              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    /> :   <MaterialTable
    title=""
    columns={state.columns}
    data={state.data}
    icons={{
      Add: props => (
        <div>
        </div>
      ),
    }}
    options={{
      actionsColumnIndex: -1,

      search: false,
      paging:false,
      headerStyle: {
        backgroundColor: '#6a6af8',
        color: '#FFF'
      },
      rowStyle: rowData => ({
        backgroundColor: (rowData.tableData.id === 0) ? '#6dc4e6' : '#fff',
        color: (rowData.tableData.id ===  0) ? '#fff' : 'black',

      }),

    }}
    
  
  />}
  


<div class="card-body">

      {calculado 
              ? 
              <div class="row justify-content-center">
              <div class="col-2">
              <Button id="btn_save" variant="primary" onClick={handleShow2}>
                Salvar
              </Button>
                </div>   </div>
              :  ''}
   

 

    <Modal show={show2} onHide={handleClose2}>
        <Modal.Body>
          <div class="text-center text-muted">
            <h4 class="font-weight-bold" >Adicionar imposto médio</h4>
          </div>

          <div class="container" id="container-central">
            <div class="row mb-4">
              <div class="col-12 text-center">
                <span class="texto-cinza mr-2">Imposto médio:</span>
                <input onChange={e => setTax(e.target.value)} class="text-dark texto-cinza px-5 py-2 rounded" id="nome-canal" placeholder="Digite a porcentagem" type="number" name=""/>
              </div>
           
              <a id="save" onClick={calcularImpostos} 
                 class="btn mx-auto mt-5 text-white px-5 font-weight-bold" 
                 href="#"
                 role="button">Salvar
              </a>
          </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>



  </div>
    
  );
}




export default DashFinal;

