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
    const [valorInicial, setValorInicial] = useState(1000000000000)
    const [calculado, setCalculado] = useState(false)

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
          description: props.info.description,
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

  
  function calcularImpostos(){
    //setTax(props.base)

    let impostos = parseInt(tax,10);
    
    let valorGeral = parseInt(renda,10);

    let totalImposto = ((parseInt(valorGeral) / 100) * impostos) 

    let valorParcela = (totalImposto / 12);

    let receita = valorGeral - totalImposto;
     
    let parcelaReceita = (receita / 12);

    console.log('Impostos: '+ impostos);
    console.log('Valor Geral: '+ valorGeral);
    console.log('Total do valor do imposto: '+ totalImposto);
    console.log('Parcela do Imposto: '+ valorParcela);
    console.log('Receita: '+ receita)
    
    setState(prevState => {
      const data = [...prevState.data];
      data.push({
          description: '(-) Impostos',
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
          description: '(=) Receita',
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
    setCalculado(true)
  }



  function adicionarCanal(){
    setState(prevState => {
      const data = [...prevState.data];
      data.push({
          description: description,
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

      });
      return { ...prevState, data };
    });

    setShow(false)
  }

  function editarCanal(){

  }


return(
    <>
   
    <Button variant="primary" onClick={handleShow}>
    (+) Adicionar Canal
    </Button>


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


    <MaterialTable
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
        }
      }}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
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

                if (state.data[0].count < newData.count){
                  state.data[0].mouth1 = newData.mouth1;
                  state.data[0].mouth2 = newData.mouth2;
                  state.data[0].mouth3 = newData.mouth3;
                  state.data[0].mouth4 = newData.mouth4;
                  state.data[0].mouth5 = newData.mouth5;
                  state.data[0].mouth6 = newData.mouth6;
                  state.data[0].mouth7 = newData.mouth7;
                  state.data[0].mouth8 = newData.mouth8;
                  state.data[0].mouth9 = newData.mouth9;
                  state.data[0].mouth10 = newData.mouth10;
                  state.data[0].mouth11 = newData.mouth11;
                  state.data[0].mouth12 = newData.mouth12;
                  state.data[0].count = newData.count;
                }
                
                console.log(newData)
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
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
    />


<div class="card-body">


    <div class="row justify-content-center">
      <div class="col-2">
      <Button variant="primary" onClick={handleShow2}>
        Salvar
      </Button>
        </div>

    </div>

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
              {calculado 
              ? 
              ''
              : 
              <a id="save" onClick={calcularImpostos} 
                 class="btn mx-auto mt-5 text-white px-5 font-weight-bold" 
                 href="#"
                 role="button">Salvar
              </a>}
          </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>



  </>
    
  );
}

export default DashFinal;

