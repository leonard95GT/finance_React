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

        data2: [{
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

    //console..log(props.info.mouth1)
    if(props.info.mouth1 == 0){
      //console.log('não precisa alterar')
    }else{
      //console.log('agora pode') 
      if(valorInicial == props.info.mouth1){
        //console.log('Ops, acho q dessa vez não, haha')
      }else{
        //console.log('lets go')
        setValorInicial(props.info.mouth1);
        setState(prevState => {
        const data = [...prevState.data];
        data[0] = props.info;
        return { ...prevState, data };
      });
      
      setState(prevState => {
        const data2 = [...prevState.data2];
        data2[0] = props.info;
        return { ...prevState, data2 };
      });

      }

    }

  });

  
  function calcularImpostos(){
    //setTax(props.base)
    const valor = contadorFinal;
    setContadorFinal(valor);
    //console..log('Contador final: ' + contador);


    let impostos = parseInt(tax,10);

    let resultadoParaImposto=[];

    resultadoParaImposto = state.data[0];

    let valorImpostoParcela1 = ((resultadoParaImposto.mouth1 / 100) * impostos)
    let descontoImposto1 = resultadoParaImposto.mouth1 - valorImpostoParcela1
    //console.log(descontoImposto1)

    let valorImpostoParcela2 = ((resultadoParaImposto.mouth2 / 100) * impostos)
    let descontoImposto2 = resultadoParaImposto.mouth2 - valorImpostoParcela2
    //console.log(descontoImposto2)

    let valorImpostoParcela3 = ((resultadoParaImposto.mouth3 / 100) * impostos)
    let descontoImposto3 = resultadoParaImposto.mouth3 - valorImpostoParcela3

    let valorImpostoParcela4 = ((resultadoParaImposto.mouth4 / 100) * impostos)
    let descontoImposto4 = resultadoParaImposto.mouth4 - valorImpostoParcela4

    let valorImpostoParcela5 = ((resultadoParaImposto.mouth5 / 100) * impostos)
    let descontoImposto5 = resultadoParaImposto.mouth5 - valorImpostoParcela5

    let valorImpostoParcela6 = ((resultadoParaImposto.mouth6 / 100) * impostos)
    let descontoImposto6 = resultadoParaImposto.mouth6 - valorImpostoParcela6

    let valorImpostoParcela7 = ((resultadoParaImposto.mouth7 / 100) * impostos)
    let descontoImposto7 = resultadoParaImposto.mouth7 - valorImpostoParcela7

    let valorImpostoParcela8 = ((resultadoParaImposto.mouth8 / 100) * impostos)
    let descontoImposto8 = resultadoParaImposto.mouth8 - valorImpostoParcela8

    let valorImpostoParcela9 = ((resultadoParaImposto.mouth9 / 100) * impostos)
    let descontoImposto9 = resultadoParaImposto.mouth9 - valorImpostoParcela9

    let valorImpostoParcela10 = ((resultadoParaImposto.mouth10 / 100) * impostos)
    let descontoImposto10 = resultadoParaImposto.mouth10 - valorImpostoParcela10

    let valorImpostoParcela11 = ((resultadoParaImposto.mouth11 / 100) * impostos)
    let descontoImposto11 = resultadoParaImposto.mouth11 - valorImpostoParcela11

    let valorImpostoParcela12 = ((resultadoParaImposto.mouth12 / 100) * impostos)
    let descontoImposto12 = resultadoParaImposto.mouth12 - valorImpostoParcela12

    let valorGeral = ((renda2 / 100) * impostos)
    let descontoGeral = renda2 - valorGeral
    
    
    setState(prevState => {
      const data = [...prevState.data];
      data.push({
          description: '(-) Impostos s/ serviços',
          mouth1: valorImpostoParcela1,
          mouth2: valorImpostoParcela2,
          mouth3: valorImpostoParcela3,
          mouth4: valorImpostoParcela4,
          mouth5: valorImpostoParcela5,
          mouth6: valorImpostoParcela6,
          mouth7: valorImpostoParcela7,
          mouth8: valorImpostoParcela8,
          mouth9: valorImpostoParcela9,
          mouth10: valorImpostoParcela10,
          mouth11: valorImpostoParcela11,
          mouth12: valorImpostoParcela12,
          count: valorGeral
      });
      return { ...prevState, data };
    });

    setState(prevState => {
      const data = [...prevState.data];
      data.push({
          description: '(=) Receita Líquida',
          mouth1: descontoImposto1,
          mouth2: descontoImposto2,
          mouth3: descontoImposto3,
          mouth4: descontoImposto4,
          mouth5: descontoImposto5,
          mouth6: descontoImposto6,
          mouth7: descontoImposto7,
          mouth8: descontoImposto8,
          mouth9: descontoImposto9,
          mouth10: descontoImposto10,
          mouth11: descontoImposto11,
          mouth12: descontoImposto12,
          count: descontoGeral
      });
      return { ...prevState, data };
    });

    
    setShow2(false);
    setCalculado(false)
  }



  function adicionarCanal(){
    const valor = contador;
    setContador(valor+2);
    setRenda2(state.data[0].count)
    //console..log('Contador para a cor: ' + contador);

    if(state.data[1]){
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
      localization={{
        body:{
         
        }
      }}
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
        isEditable: rowData => calculado,// only name(a) rows would be editable
        isDeletable: rowData => calculado, // only name(a) rows would be deletable
        
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                if(oldData == state.data[1]){
                  //Aqui deve ocorrer o ajuste do campo um para o campo de renda bruta.
                }
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

                  if(parseInt(newData.mouth1)>parseInt(oldData.mouth1)){
                    console.log('add')
                    var diff = (parseInt(newData.mouth1) - parseInt(oldData.mouth1))
                    console.log(diff)
                    var valor = parseInt(state.data[0].mouth1);
                    state.data[0].mouth1 = valor + diff;
                    console.log('valor depois: '+ state.data[0].mouth1)
                  }else{
                    console.log('remove')
                    var diff = (parseInt(oldData.mouth1) - parseInt(newData.mouth1))
                    console.log(diff)
                    var valor = parseInt(state.data[0].mouth1);
                    state.data[0].mouth1 = valor - diff;
                  }

                  if(parseInt(newData.mout2)>parseInt(oldData.mouth2)){
                    console.log('add')
                    var diff = (parseInt(newData.mouth2) - parseInt(oldData.mouth2))
                    var valor = parseInt(state.data[0].mouth2);
                    state.data[0].mouth2 = valor + diff;
                  }else{
                    console.log('remove')
                    var diff = (parseInt(oldData.mouth2) - parseInt(newData.mouth2))
                    var valor = parseInt(state.data[0].mouth2);
                    state.data[0].mouth2 = valor - diff;
                  }

                  if(parseInt(newData.mouth3)>parseInt(oldData.mouth3)){
                    console.log('add')
                    var diff = (parseInt(newData.mouth3) - parseInt(oldData.mouth3))
                    var valor = parseInt(state.data[0].mouth3);
                    state.data[0].mouth3 = valor + diff;
                  }else{
                    console.log('remove')
                    var diff = (parseInt(oldData.mouth3) - parseInt(newData.mouth3))
                    var valor = parseInt(state.data[0].mouth3);
                    state.data[0].mouth3 = valor - diff;
                  }

                  if(parseInt(newData.mouth4)>parseInt(oldData.mouth4)){
                    console.log('add')
                    var diff = (parseInt(newData.mouth4) - parseInt(oldData.mouth4))
                    var valor = parseInt(state.data[0].mouth4);
                    state.data[0].mouth4 = valor + diff;
                  }else{
                    console.log('remove')
                    var diff = (parseInt(oldData.mouth4) - parseInt(newData.mouth4))
                    var valor = parseInt(state.data[0].mouth4);
                    state.data[0].mouth4 = valor - diff;
                  }

                  if(parseInt(newData.mouth5)>parseInt(oldData.mouth5)){
                    console.log('add')
                    var diff = (parseInt(newData.mouth5) - parseInt(oldData.mouth5))
                    var valor = parseInt(state.data[0].mouth5);
                    state.data[0].mouth5 = valor + diff;
                  }else{
                    console.log('remove')
                    var diff = (parseInt(oldData.mouth5) - parseInt(newData.mouth5))
                    var valor = parseInt(state.data[0].mouth5);
                    state.data[0].mouth5 = valor - diff;
                  }

                  if(parseInt(newData.mouth6)>parseInt(oldData.mouth6)){
                    console.log('add')
                    var diff = (parseInt(newData.mouth6) - parseInt(oldData.mouth6))
                    var valor = parseInt(state.data[0].mouth6);
                    state.data[0].mouth6 = valor + diff;
                  }else{
                    console.log('remove')
                    var diff = (parseInt(oldData.mouth6) - parseInt(newData.mouth6))
                    var valor = parseInt(state.data[0].mouth6);
                    state.data[0].mouth6 = valor - diff;
                  }

                  if(parseInt(newData.mouth7)>parseInt(oldData.mouth7)){
                    console.log('add')
                    var diff = (parseInt(newData.mouth7) - parseInt(oldData.mouth7))
                    var valor = parseInt(state.data[0].mouth7);
                    state.data[0].mouth7 = valor + diff;
                  }else{
                    console.log('remove')
                    var diff = (parseInt(oldData.mouth7) - parseInt(newData.mouth7))
                    var valor = parseInt(state.data[0].mouth7);
                    state.data[0].mouth7 = valor - diff;
                  }

                  if(parseInt(newData.mouth8)>parseInt(oldData.mouth8)){
                    console.log('add')
                    var diff = (parseInt(newData.mouth8) - parseInt(oldData.mouth8))
                    var valor = parseInt(state.data[0].mouth8);
                    state.data[0].mouth8 = valor + diff;
                  }else{
                    console.log('remove')
                    var diff = (parseInt(oldData.mouth8) - parseInt(newData.mouth8))
                    var valor = parseInt(state.data[0].mouth8);
                    state.data[0].mouth8 = valor - diff;
                  }

                  if(parseInt(newData.mouth10)>parseInt(oldData.mouth10)){
                    console.log('add')
                    var diff = (parseInt(newData.mouth10) - parseInt(oldData.mouth10))
                    var valor = parseInt(state.data[0].mouth10);
                    state.data[0].mouth10 = valor + diff;
                  }else{
                    console.log('remove')
                    var diff = (parseInt(oldData.mouth10) - parseInt(newData.mouth10))
                    var valor = parseInt(state.data[0].mouth10);
                    state.data[0].mouth10 = valor - diff;
                  }

                  if(parseInt(newData.mouth11)>parseInt(oldData.mouth11)){
                    console.log('add')
                    var diff = (parseInt(newData.mouth11) - parseInt(oldData.mouth11))
                    var valor = parseInt(state.data[0].mouth11);
                    state.data[0].mouth11 = valor + diff;
                  }else{
                    console.log('remove')
                    var diff = (parseInt(oldData.mouth11) - parseInt(newData.mouth11))
                    var valor = parseInt(state.data[0].mouth11);
                    state.data[0].mouth11 = valor - diff;
                  }

                  if(parseInt(newData.mouth12)>parseInt(oldData.mouth12)){
                    console.log('add')
                    var diff = (parseInt(newData.mouth12) - parseInt(oldData.mouth12))
                    var valor = parseInt(state.data[0].mouth12);
                    state.data[0].mouth12 = valor + diff;
                  }else{
                    console.log('remove')
                    var diff = (parseInt(oldData.mouth12) - parseInt(newData.mouth12))
                    var valor = parseInt(state.data[0].mouth12);
                    state.data[0].mouth12 = valor - diff;
                  }


                  if(parseInt(newData.mouth9)>parseInt(oldData.mouth9)){
                    console.log('add')
                    var diff = (parseInt(newData.mouth9) - parseInt(oldData.mouth9))
                    var valor = parseInt(state.data[0].mouth9);
                    state.data[0].mouth9 = valor + diff;
                  }else{
                    console.log('remove')
                    var diff = (parseInt(oldData.mouth9) - parseInt(newData.mouth9))
                    var valor = parseInt(state.data[0].mouth9);
                    state.data[0].mouth9 = valor - diff;
                  }

                  state.data[0].count =  
                  (parseInt(state.data[0].mouth1)
                  +parseInt(state.data[0].mouth2)
                  +parseInt(state.data[0].mouth3)
                  +parseInt(state.data[0].mouth4)
                  +parseInt(state.data[0].mouth5)
                  +parseInt(state.data[0].mouth6)
                  +parseInt(state.data[0].mouth7)
                  +parseInt(state.data[0].mouth8)
                  +parseInt(state.data[0].mouth9)
                  +parseInt(state.data[0].mouth10)
                  +parseInt(state.data[0].mouth11)
                  +parseInt(state.data[0].mouth12));

                  setRenda2(state.data[0].count)
                
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
    /> :   <MaterialTable
    title="Orçamento Base Zero"
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

