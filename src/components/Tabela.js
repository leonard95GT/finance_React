import React, { useState, useEffect, useRef } from 'react';
import {Modal, Button} from 'react-bootstrap'
import MaterialTable from 'material-table';
import axios from 'axios'


function DashFinal(props) {
    const [fase, setFase] = useState(0);

    //Modais
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [showProduto, setShowProduto] = useState(false);
    const [showVariavel, setShowVariavel] = useState(false);
    const [showSalario, setShowSalario] = useState(false);
    const [showDespesas, setShowDespesas] = useState(false);

    const [tabela, setTabela] = useState('');
    const [description, setDescription] = useState('');

    //Tela inicial
    const [renda, setRenda] = useState(2000);
    const [contador, setContador] = useState(0);
    const [contador2, setContador2] = useState(0);
    const [contadorFinal, setContadorFinal] = useState(0);
    const [renda2, setRenda2] = useState(0);
    const [valorInicial, setValorInicial] = useState(1000000000000)
    const [calculado, setCalculado] = useState(true)

    //Cadastro das categorias de produtos
    const [nameCategoria, setNameCategoria] = useState('');
    const [tipoCusto, setTipoCusto] = useState(0);
    const [tipoVenda, setTipoVenda] = useState(0);
    const [valorVenda, setValorVenda] = useState(0);
    const [quantVenda, setQuantVenda] = useState(0);

    //Impostos
    const [tax, setTax] = useState(0);
    const [nameTax, setNameTax] = useState('');

    //Salários
    const [salary, setSalary] = useState(0);
    
    //Outras Despesas
    const [nameCost, setNameCost] = useState('');
    const [typeCost, setTypeCost] = useState(0);
    const [valueCost, setValueCost] = useState(0);

    //Despesas Variáveis
    const [nameCostVariable, setNameCostVariable] = useState('');
    const [typeCostVariable, setTypeCostVariable] = useState(0);
    const [valueCostVariable, setValueCostVariable] = useState(0);

    //Outras Despesas
    const [nameCostProduct, setNameCostProduct] = useState('');
    const [typeCostProduct, setTypeCostProduct] = useState(0);
    const [valueCostProduct, setValueCostProduct] = useState(0);

    //Valores recebidos do backend
    const [rol, setRol] = useState(0);
    const [bmargemBruta, setMargemBruta] = useState(0);
    const [lucroBruto, setLucroBruto] = useState(0);
    const [ebitda, setEbitda] = useState(0);
    const [percentEbitda, setPercentEbitda] = useState(0);
    const [lucroLiquido, setLucroLiquido] = useState(0);



    //Modais: só aparecer se a tabela não estiver sendo editada
    const handleClose = () => setShow(false);
    const handleShow = () => {
      if (props.tableRef.current.state.lastEditingRow == undefined){
        setShow(true);
        setControladorCategoria(true);
      }else{
        alert('Conclua a edição da planilha para dar continuidade')
      }
    };
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () =>{
      if (props.tableRef.current.state.lastEditingRow == undefined){
        setShow2(true)
      }else{
        alert('Conclua a edição da planilha para dar continuidade')
      }

    }; 
  
    const handleCloseProduto = () => setShowProduto(false);
    const handleShowProduto = () =>{
      if (props.tableRef.current.state.lastEditingRow == undefined){
        setShowProduto(true)
      }else{
        alert('Conclua a edição da planilha para dar continuidade')
      }

    }; 

    const handleCloseVariavel = () => setShowVariavel(false);
    const handleShowVariavel = () =>{
      if (props.tableRef.current.state.lastEditingRow == undefined){
        setShowVariavel(true)
      }else{
        alert('Conclua a edição da planilha para dar continuidade')
      }

    }; 

    const handleCloseSalario = () => setShowSalario(false);
    const handleShowSalario = () =>{
      if (props.tableRef.current.state.lastEditingRow == undefined){
        setShowSalario(true)
      }else{
        alert('Conclua a edição da planilha para dar continuidade')
      }

    }; 


    const handleCloseDespesas = () => setShowDespesas(false);
    const handleShowDespesas = () =>{
      if (props.tableRef.current.state.lastEditingRow == undefined){
        setShowDespesas(true)
      }else{
        alert('Conclua a edição da planilha para dar continuidade')
      }

    }; 


    //Set controlador para telas de categoria de produto.
    const [controlCategoria, setControladorCategoria] = useState(true)


    //Dados da tabela, initial state.
    const [state, setState] = React.useState({
        columns: [
          { title: '', field: 'description', type: 'text'},
          { title: 'JAN', field: 'mouth1', type: 'numeric'  },
          { title: 'FEV', field: 'mouth2', type: 'numeric' },
          { title: 'MAR', field: 'mouth3', type: 'numeric' },
          { title: 'ABR', field: 'mouth4', type: 'numeric' },
          { title: 'MAI', field: 'mouth5', type: 'numeric' },
          { title: 'JUN', field: 'mouth6', type: 'numeric' },
          { title: 'JUL', field: 'mouth7', type: 'numeric' },
          { title: 'AGO', field: 'mouth8', type: 'numeric' },
          { title: 'SET', field: 'mouth9', type: 'numeric' },
          { title: 'OUT', field: 'mouth10', type: 'numeric' },
          { title: 'NOV', field: 'mouth11', type: 'numeric' },
          { title: 'DEZ', field: 'mouth12' , type: 'numeric'},
          { title: 'YDR', field: 'count', type: 'numeric' },
    
    
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


    //Dados de todas as categorias inclusas no sistema
    const [produto, setProduto] = useState({
      it:[
        
      ]
    })

    const [itemsCost, setItemsCost] = useState({
      items:[
        {nameCost:'', typeCost:0, valueCost:0}
      ]
    })

    const [itemsCostVariable, setItemsCostVariable] = useState({
      items:[
        {nameCost:'', typeCost:0, valueCost:0}
      ]
    })

    const [itemsTax, setItemsTax] = useState({
      items:[
        {
          nameTax:'', 
          valueTax:0
        }
      ]
    })

    const [custosCPV, setCustosCPV] = useState({
      items:[
        {nomeDoCusto: '', tipoDoCusto: 0, valorDoCusto:0}
      ]
    })

    const [custosCPVFinal, setCustosCPVFinal] = useState({
      items:[]
    })

    const [limpa, setLimpa] = useState({
      items:[
        {nomeDoCusto: '', tipoDoCusto: 0, valorDoCusto:0}
      ]
    })


    //Referencia para tabela.
   const tableRef = useRef();   
    

  //Atualização via useEffect, qualquer mudança de state ocasiona efeito aqui.
  useEffect(() => {
    
    setTabela(props.info); 
    setRenda(props.base);
    console.log(tipoCusto)

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


  //Chama a tela de categoria
  function categoriaProd(){
    setControladorCategoria(false);
  }

   //Volta para a tela de Canal de distribuição, com a categoria já vinculada
   function distribuicao(){
    setProduto(prevProduto => ({
      it: [...prevProduto.it, {
        name: nameCategoria,
        type_cost: tipoCusto,
        type_sale: tipoVenda,
        value_sale: valorVenda,
        quantity_items: quantVenda
      }]
    
    }));
  
    setNameCategoria('');
    setDescription('')
    setTipoCusto(0);
    setTipoVenda(0);
    setValorVenda(0);
    setQuantVenda(0);
    setControladorCategoria(true);
  }

  function adicionarCanal(){
    //Insert into database
    const proxyurl = "https://cors-anywhere.herokuapp.com/";  
    axios.post(proxyurl + 'http://34.70.109.4/distribution', {
      
      channelName: description,
      categoryProduct: 'categoria',
      salesQt: 2,
      salesPrice: 2,
      costType: 1,
      projection_id: 1,
      cpv_feedstock: 2,
      cpv_indirect_cost: 2,
      cpv_labor: 2,
      total_cost: 300,
      
    },
    {
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


    const valor = contador;
    setContador(valor+2);
    setRenda2(state.data[0].count)
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
  
  function calcularImpostos(){
    const item = itemsTax.items[contador2];
  
    item.nameTax = nameTax;
    item.valueTax = tax;
  
    itemsTax.items[contador2] = item;
    console.log(itemsTax.items[contador2])
  
    var valor = 0;

    for(let i = 0; i < itemsTax.items.length; i++){
      valor = parseInt(valor) + parseInt(itemsTax.items[i].valueTax)
      console.log('valor geral a: '+valor)
      const proxyurl = "https://cors-anywhere.herokuapp.com/";  
      axios.post(proxyurl + 'http://34.70.109.4/tax', {
    
      name: itemsTax.items[i].nameTax,
      value: itemsTax.items[i].valueTax  

      },
      {
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
    }

    console.log('valor geral: '+valor)

    let impostos = parseInt(valor,10);

    let resultadoParaImposto=[];

    resultadoParaImposto = state.data[0];

    let valorImpostoParcela1 = ((resultadoParaImposto.mouth1 / 100) * impostos)
    let descontoImposto1 = resultadoParaImposto.mouth1 - valorImpostoParcela1

    let valorImpostoParcela2 = ((resultadoParaImposto.mouth2 / 100) * impostos)
    let descontoImposto2 = resultadoParaImposto.mouth2 - valorImpostoParcela2

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

    
    if (renda2 == 0){
     valorGeral = ((renda / 100) * impostos)
     descontoGeral = renda - valorGeral
    }else{
      valorGeral = ((renda2 / 100) * impostos)
      descontoGeral = renda2 - valorGeral
     }


    
    if(calculado){
      setState(prevState => {
        const data = [...prevState.data];
        data.push({
            description: '(-) Impostos s/ serviços',
            mouth1: Math.round(valorImpostoParcela1),
            mouth2: Math.round(valorImpostoParcela2),
            mouth3: Math.round(valorImpostoParcela3),
            mouth4: Math.round(valorImpostoParcela4),
            mouth5: Math.round(valorImpostoParcela5),
            mouth6: Math.round(valorImpostoParcela6),
            mouth7: Math.round(valorImpostoParcela7),
            mouth8: Math.round(valorImpostoParcela8),
            mouth9: Math.round(valorImpostoParcela9),
            mouth10: Math.round(valorImpostoParcela10),
            mouth11: Math.round(valorImpostoParcela11),
            mouth12: Math.round(valorImpostoParcela12),
            count: Math.round(valorGeral)
        });
        return { ...prevState, data };
      });

      for(let i = 0; i < itemsTax.items.length; i++){
        let valorAnual = (itemsTax.items[i].valueTax * 12)
        setState(prevState => {
          const data = [...prevState.data];
          data.push({
              description: itemsTax.items[i].nameTax,
              mouth1: itemsTax.items[i].valueTax,
              mouth2: itemsTax.items[i].valueTax,
              mouth3: itemsTax.items[i].valueTax,
              mouth4: itemsTax.items[i].valueTax,
              mouth5: itemsTax.items[i].valueTax,
              mouth6: itemsTax.items[i].valueTax,
              mouth7: itemsTax.items[i].valueTax,
              mouth8: itemsTax.items[i].valueTax,
              mouth9: itemsTax.items[i].valueTax,
              mouth10: itemsTax.items[i].valueTax,
              mouth11: itemsTax.items[i].valueTax,
              mouth12: itemsTax.items[i].valueTax,
              count: valorAnual
          });
          return { ...prevState, data };
        });
  
      }


  
  
      setState(prevState => {
        const data = [...prevState.data];
        data.push({
            description: '(=) Receita Líquida',
            mouth1: Math.round(descontoImposto1),
            mouth2: Math.round(descontoImposto2),
            mouth3: Math.round(descontoImposto3),
            mouth4: Math.round(descontoImposto4),
            mouth5: Math.round(descontoImposto5),
            mouth6: Math.round(descontoImposto6),
            mouth7: Math.round(descontoImposto7),
            mouth8: Math.round(descontoImposto8),
            mouth9: Math.round(descontoImposto9),
            mouth10: Math.round(descontoImposto10),
            mouth11: Math.round(descontoImposto11),
            mouth12: Math.round(descontoImposto12),
            count: Math.round(descontoGeral )
        });
        return { ...prevState, data };
      });



      let percentGrossfit;

      //ainda em ajuste
      setState(prevState => {
        const data = [...prevState.data];
        data.push({
            description: '% da Receita Bruta',
            mouth1: Math.round(valorImpostoParcela1),
            mouth2: Math.round(valorImpostoParcela2),
            mouth3: Math.round(valorImpostoParcela3),
            mouth4: Math.round(valorImpostoParcela4),
            mouth5: Math.round(valorImpostoParcela5),
            mouth6: Math.round(valorImpostoParcela6),
            mouth7: Math.round(valorImpostoParcela7),
            mouth8: Math.round(valorImpostoParcela8),
            mouth9: Math.round(valorImpostoParcela9),
            mouth10: Math.round(valorImpostoParcela10),
            mouth11: Math.round(valorImpostoParcela11),
            mouth12: Math.round(valorImpostoParcela12),
            count: Math.round(valorGeral)
        });
        return { ...prevState, data };
      });
    }else{
      console.log('é atualização')
      let pos = (state.data.length - 1)
      let pos2 = (state.data.length - 2)
      console.log(pos);
  
      
      setState(prevState => {
        const data = [...prevState.data];
        data[pos2] = ({
          description: '(-) Impostos s/ serviços',
            mouth1: Math.round(valorImpostoParcela1),
            mouth2: Math.round(valorImpostoParcela2),
            mouth3: Math.round(valorImpostoParcela3),
            mouth4: Math.round(valorImpostoParcela4),
            mouth5: Math.round(valorImpostoParcela5),
            mouth6: Math.round(valorImpostoParcela6),
            mouth7: Math.round(valorImpostoParcela7),
            mouth8: Math.round(valorImpostoParcela8),
            mouth9: Math.round(valorImpostoParcela9),
            mouth10: Math.round(valorImpostoParcela10),
            mouth11: Math.round(valorImpostoParcela11),
            mouth12: Math.round(valorImpostoParcela12),
            count: Math.round(valorGeral)
        });
        return { ...prevState, data };
      });
  
      setState(prevState => {
        const data = [...prevState.data];
        data[pos] = ({
            description: '(=) Receita Líquida',
            mouth1: Math.round(descontoImposto1),
            mouth2: Math.round(descontoImposto2),
            mouth3: Math.round(descontoImposto3),
            mouth4: Math.round(descontoImposto4),
            mouth5: Math.round(descontoImposto5),
            mouth6: Math.round(descontoImposto6),
            mouth7: Math.round(descontoImposto7),
            mouth8: Math.round(descontoImposto8),
            mouth9: Math.round(descontoImposto9),
            mouth10: Math.round(descontoImposto10),
            mouth11: Math.round(descontoImposto11),
            mouth12: Math.round(descontoImposto12),
            count: Math.round(descontoGeral )
        });
        return { ...prevState, data };
      });

    }
    

    
    setShow2(false);
    setContador2(0)
    setFase(1)
  }

 function custoProduto(){

  for(let i = 0; i < custosCPV.items.length; i++){
      custosCPVFinal.items.push({
        nomeDoCusto: custosCPV.items[i].nomeDoCusto,
        tipoDoCusto: custosCPV.items[i].tipoDoCusto,
        valorDoCusto: custosCPV.items[i].valorDoCusto
      })
  }

  let numero = contador2;

  if(contador2 === (parseInt(produto.it.length) - 1)){
    let valorTotalMes = 0; 

    for(var v = 0; v < custosCPVFinal.items.length; v++){
      valorTotalMes = (parseInt(valorTotalMes) + parseInt(custosCPVFinal.items[v].valorDoCusto))
    }

    let valorTotalGeral = (valorTotalMes * 12)

    setState(prevState => {
      const data = [...prevState.data];
      data.push({
          description: 'CPV/CSV/CMV',
          mouth1: valorTotalMes,
          mouth2: valorTotalMes,
          mouth3: valorTotalMes,
          mouth4: valorTotalMes,
          mouth5: valorTotalMes,
          mouth6: valorTotalMes,
          mouth7: valorTotalMes,
          mouth8: valorTotalMes,
          mouth9: valorTotalMes,
          mouth10: valorTotalMes,
          mouth11: valorTotalMes,
          mouth12: valorTotalMes,
          count: valorTotalGeral
      });
      return { ...prevState, data };
    });

    for(let r = 0; r < custosCPVFinal.items.length; r++){
      console.log('na variavel: '+ custosCPVFinal.items[r].nomeDoCusto);
      setNameCostProduct(custosCPVFinal.items[r].nomeDoCusto)
      console.log('no set', nameCostProduct)
      setState(prevState => {
        const data = [...prevState.data];
        data.push({
            description: custosCPVFinal.items[r].nomeDoCusto,
            mouth1: custosCPVFinal.items[r].valorDoCusto,
            mouth2: custosCPVFinal.items[r].valorDoCusto,
            mouth3: custosCPVFinal.items[r].valorDoCusto,
            mouth4: custosCPVFinal.items[r].valorDoCusto,
            mouth5: custosCPVFinal.items[r].valorDoCusto,
            mouth6: custosCPVFinal.items[r].valorDoCusto,
            mouth7: custosCPVFinal.items[r].valorDoCusto,
            mouth8: custosCPVFinal.items[r].valorDoCusto,
            mouth9: custosCPVFinal.items[r].valorDoCusto,
            mouth10: custosCPVFinal.items[r].valorDoCusto,
            mouth11: custosCPVFinal.items[r].valorDoCusto,
            mouth12: custosCPVFinal.items[r].valorDoCusto,
            count: custosCPVFinal.items[r].valorDoCusto
        });
        return { ...prevState, data };
      });
    }


    const proxyurl = "https://cors-anywhere.herokuapp.com/";  
    axios.post(proxyurl + 'http://34.70.109.4/tax', {
  
    //name: itemsTax.items[i].nameTax,
    //value: itemsTax.items[i].valueTax  

    },
    {
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

    setCustosCPV(limpa)
    handleCloseProduto()
    setContador2(0)
    setFase(2)


  }else{


    setContador2(numero + 1)
    setCustosCPV(limpa)
    handleCloseProduto()
    console.log('não é')
    setInterval(()=>{
      setShowProduto(true)
    }, 2000)

  }


 }

 function custoVariavel(){
  const item = itemsCostVariable.items[contador2];
  const numero = contador2;

  item.nameCost = nameCostVariable;
  item.typeCost = typeCostVariable;
  item.valueCost = valueCostVariable;

  itemsCostVariable.items[contador2] = item;

  
  let valorGeral = 0;

  for(let i = 0; i < itemsCostVariable.items.length; i++){
    valorGeral = parseInt(valorGeral) + parseInt(itemsCostVariable.items[i].valueCost)
  }

  console.log('Soma das despesas '+valorGeral)

  let valorMes = (valorGeral * 12)
   
  setState(prevState => {
    const data = [...prevState.data];
    data.push({
        description: 'Custos Variáveis  ',
        mouth1: valorGeral,
        mouth2: valorGeral,
        mouth3: valorGeral,
        mouth4: valorGeral,
        mouth5: valorGeral,
        mouth6: valorGeral,
        mouth7: valorGeral,
        mouth8: valorGeral,
        mouth9: valorGeral,
        mouth10: valorGeral,
        mouth11: valorGeral,
        mouth12: valorGeral,
        count: valorMes
    });
    return { ...prevState, data };
  });


  for(let i = 0; i < itemsCostVariable.items.length; i++){
    //valorGeral = parseInt(valorGeral) + parseInt(itemsCost.items[i].valueCost)
    let valor = (itemsCostVariable.items[i].valueCost * 12)
    setState(prevState => {
      const data = [...prevState.data];
      data.push({
          description: itemsCostVariable.items[i].nameCost,
          mouth1: itemsCostVariable.items[i].valueCost,
          mouth2: itemsCostVariable.items[i].valueCost,
          mouth3: itemsCostVariable.items[i].valueCost,
          mouth4: itemsCostVariable.items[i].valueCost,
          mouth5: itemsCostVariable.items[i].valueCost,
          mouth6: itemsCostVariable.items[i].valueCost,
          mouth7: itemsCostVariable.items[i].valueCost,
          mouth8: itemsCostVariable.items[i].valueCost,
          mouth9: itemsCostVariable.items[i].valueCost,
          mouth10: itemsCostVariable.items[i].valueCost,
          mouth11: itemsCostVariable.items[i].valueCost,
          mouth12: itemsCostVariable.items[i].valueCost,
          count: valor
      });
      return { ...prevState, data };
    });
  
  }

  setFase(3)
  setContador2(0);
 }

 function custoSalario(){
  let valorSalarioGeral = (parseInt(salary) * 12)

  setState(prevState => {
    const data = [...prevState.data];
    data.push({
        description: 'Salarios',
        mouth1: salary,
        mouth2: salary,
        mouth3: salary,
        mouth4: salary,
        mouth5: salary,
        mouth6: salary,
        mouth7: salary,
        mouth8: salary,
        mouth9: salary,
        mouth10: salary,
        mouth11: salary,
        mouth12: salary,
        count: valorSalarioGeral
    });
    return { ...prevState, data };
  });


  setFase(4)
 }

 function outrasDespesas(){
  const item = itemsCost.items[contador2];
  const numero = contador2;

  item.nameCost = nameCost;
  item.typeCost = typeCost;
  item.valueCost = valueCost;

  itemsCost.items[contador2] = item;

  
  let valorGeral = 0;

  for(let i = 0; i < itemsCost.items.length; i++){
    valorGeral = parseInt(valorGeral) + parseInt(itemsCost.items[i].valueCost)
  }

  console.log('Soma das despesas '+valorGeral)

  let valorMes = (valorGeral * 12)
   
  setState(prevState => {
    const data = [...prevState.data];
    data.push({
        description: 'Outras despesas',
        mouth1: valorGeral,
        mouth2: valorGeral,
        mouth3: valorGeral,
        mouth4: valorGeral,
        mouth5: valorGeral,
        mouth6: valorGeral,
        mouth7: valorGeral,
        mouth8: valorGeral,
        mouth9: valorGeral,
        mouth10: valorGeral,
        mouth11: valorGeral,
        mouth12: valorGeral,
        count: valorMes
    });
    return { ...prevState, data };
  });


  for(let i = 0; i < itemsCost.items.length; i++){
    //valorGeral = parseInt(valorGeral) + parseInt(itemsCost.items[i].valueCost)
    let valor = (itemsCost.items[i].valueCost * 12)
    setState(prevState => {
      const data = [...prevState.data];
      data.push({
          description: itemsCost.items[i].nameCost,
          mouth1: itemsCost.items[i].valueCost,
          mouth2: itemsCost.items[i].valueCost,
          mouth3: itemsCost.items[i].valueCost,
          mouth4: itemsCost.items[i].valueCost,
          mouth5: itemsCost.items[i].valueCost,
          mouth6: itemsCost.items[i].valueCost,
          mouth7: itemsCost.items[i].valueCost,
          mouth8: itemsCost.items[i].valueCost,
          mouth9: itemsCost.items[i].valueCost,
          mouth10: itemsCost.items[i].valueCost,
          mouth11: itemsCost.items[i].valueCost,
          mouth12: itemsCost.items[i].valueCost,
          count: valor
      });
      return { ...prevState, data };
    });
  
  }

  setFase(5)
 }

function addOutrasDespesas(){
  const item = itemsCost.items[contador2];
  const numero = contador2;

  item.nameCost = nameCost;
  item.typeCost = typeCost;
  item.valueCost = valueCost;

  itemsCost.items[contador2] = item;

  setContador2(numero+1);

  setNameCost('');
  setTypeCost(0);
  setValueCost('R$');

  setItemsCost(prevItems => ({
    items: [...prevItems.items, {
      nameCost: '',
      typeCost: 0,
      valueCost: 0
    }]
  }))
}

function addOutrasDespesasVariaveis(){
  const item = itemsCostVariable.items[contador2];
  const numero = contador2;

  item.nameCost = nameCostVariable;
  item.typeCost = typeCostVariable;
  item.valueCost = valueCostVariable;

  itemsCostVariable.items[contador2] = item;

  setContador2(numero+1);

  setNameCostVariable('');
  setTypeCostVariable(0);
  setValueCostVariable('R$');

  setItemsCostVariable(prevItems => ({
    items: [...prevItems.items, {
      nameCost: '',
      typeCost: 0,
      valueCost: 0
    }]
  }))
}

function addTax(){
  const item = itemsTax.items[contador2];
  const numero = contador2;

  item.nameTax = nameTax;
  item.valueTax = tax;

  itemsTax.items[contador2] = item;
  console.log(itemsTax.items[contador2])

  setContador2(numero+1);
  console.log('contador'+contador2)

  setNameTax('');
  setTax('%');

  setItemsTax(prevItems => ({
    items: [...prevItems.items, {
      nameTax: '',
      valueTax: 0
    }]
  }))

}

function addCusto(){
  let item = custosCPV.items[contadorFinal];
  let numero = contadorFinal;

  item.nomeDoCusto = nameCostProduct;
  item.valorDoCusto = valueCostProduct;
  item.tipoDoCusto = typeCostProduct;

  custosCPV.items[contadorFinal] = item;
  //console.log(itemsTax.items[contador2])

  setContadorFinal(numero+1);
  setNameCostProduct('');
  setValueCostProduct('');
  setTypeCost(0)
  
  setCustosCPV(prevItems => ({
    items: [...prevItems.items, {
      nomeDoCusto: '',
      tipoDoCusto: 0,
      valorDoCusto: 0
    }]
  }))

}

 

  if(fase===0){
      //adição de canais e impostos (início do base zero)
    return(
      <div id="tabela">
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>  
              {controlCategoria 
              ?
              <>
              <div class="text-center text-muted">
                <h4 class="font-weight-bold" >Adicionar canal de distribuição</h4>
              </div>
                <div class="container" id="container-central">
                  <div class="row mb-4">
                      <div class="col-12 text-center">
                        <span class="texto-cinza mr-2">Canal de distribuição:</span>
                          <input 
                          value={description}
                          onChange={e => setDescription(e.target.value)} 
                          class="text-dark texto-cinza px-5 py-2 rounded" 
                          id="nome-canal" 
                          placeholder="Digite o nome do canal" 
                          type="text" 
                          name="canal"
                          />
                      </div>

                      <div>
                      {produto.it.map((p, i)=>(
                        <div key={i} class="row">
                          <div class="col-6">
                            <span class="texto-cinza mr-2">Categoria do Produto:</span>
                          </div>
                          <div class="col-6">
                            <p class="text-dark texto-cinza px-5 py-2 rounded">{p.name}</p>                            
                          </div>

                        </div>
                        
                      ))}
                      </div>
                      <a id="save"
                        class="btn mx-auto mt-5 text-white px-5 font-weight-bold"
                        role="button"
                        onClick={categoriaProd}>Incluir categoria de produtos
                      </a>

                      <a id="save"
                        class="btn mx-auto mt-5 text-white px-5 font-weight-bold"
                        role="button"
                        onClick={adicionarCanal}>Salvar
                      </a>
                  </div>
              </div>
              </>
              :
              <>
              <div class="text-center text-muted">
                <h4 class="font-weight-bold" >Adicionar categoria de produto</h4>
              </div>
                <div class="container" id="container-central">
                  <div class="row mb-6">
                  <div class="col-6 text-center">
                          <span class="titulo-caixa">Nome da<br/>categoria<br/>do produto</span>
                          <input onChange={w => setNameCategoria(w.target.value)} 
                          class="text-dark texto-cinza px-5 py-2 rounded" 
                          id="nome-categoria" 
                          placeholder="Digite o nome da categoria" 
                          type="text" 
                          name="categoria"
                          />
                      </div>
                      <div class="col-6 text-center">
                        <span class="titulo-caixa">Tipo de<br/>custo</span>
                            <select value={tipoCusto} onChange={s => setTipoCusto(s.target.value)}>
                                <option value="0" class="titulo-caixa">CPV</option>
                                <option value="1" class="titulo-caixa" >CMV</option>
                                <option value="2" class="titulo-caixa" >CSV</option>
                            </select>
                      </div>

                      <div class="col-6 text-center">
                        <span class="titulo-caixa">Tipo de<br/>valor de venda</span>
                            <select value={tipoVenda} onChange={s => setTipoVenda(s.target.value)}>
                                <option value="0" class="titulo-caixa">Valor Total</option>
                                <option value="1" class="titulo-caixa" >Valor Unitário</option>
                            </select>
                      </div>
                      <div class="col-6 text-center">
                          <span class="titulo-caixa">Valor total<br/>de venda</span>
                          <input onChange={e => setValorVenda(e.target.value)} 
                          class="text-dark texto-cinza px-5 py-2 rounded" 
                          id="nome-canal" 
                          placeholder="R$" 
                          type="text" 
                          name=""
                          />
                      </div>

                      {tipoVenda === 0
                      ?
                      ''
                      :
                      <div class="col-6 text-center">
                          <span class="titulo-caixa">Quantidade</span>
                          <input onChange={e => setValorVenda(e.target.value)} 
                          class="text-dark texto-cinza px-5 py-2 rounded" 
                          id="nome-canal" 
                          placeholder="R$" 
                          type="text" 
                          name=""
                          />
                      </div>
                      
                  
                      }

                      <a id="save"
                        class="btn mx-auto mt-5 text-white px-5 font-weight-bold"
                        role="button"
                        onClick={
                          distribuicao
                          }>Salvar
                      </a>
                  </div>
              </div>
              </>}
            
            </Modal.Body>
          </Modal>
  
        <MaterialTable tableRef={props.tableRef}
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
              isEditable: rowData => {{
                let pos = state.data.length;
                if(rowData.tableData.id === 0){  
                    console.log(rowData.tableData.edittingw)       
                  return false
                }else{
                  return true
                }
              
              }},
              // only name(a) rows would be editable
              isDeletable: rowData => {{
                if(rowData.tableData.id === 0){
                  return false
                }else{
                  return true
                }

              }}, 
              // only name(a) rows would be deletable
              
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
                    
                      if(!calculado){
                        calcularImpostos()
                      }

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

        {calculado 
        ? 
        <div class="row justify-content-center">
        <div class="col-2">
        <Button id="btn_save" variant="primary" onClick={handleShow2}>
          Salvar
        </Button>
          </div>   </div>
        :  
        ''
        }

        <Modal show={show2} onHide={handleClose2}>
          <Modal.Body>
            <div class="text-center text-muted">
              <h4 class="font-weight-bold" >Adicionar imposto médio</h4>
            </div>

            <div class="container" id="container-central">
            {itemsTax.items.map((i, e) => 
                      <div key={i}>
                <div class="row mb-4">
  
                        <div class="col-6 text-center">
                          <span class="texto-cinza mr-2">Nome do Imposto:</span>
                          <input 
                          onChange={r => setNameTax(r.target.value)}
                          class="text-dark texto-cinza px-5 py-2 rounded" id="nome-canal" placeholder="Digite o nome do imposto" type="text" name=""/>
                        </div>

                        <div class="col-6 text-center">
                          <span class="texto-cinza mr-2">Imposto médio:</span>
                          <input onChange={e => setTax(e.target.value)} class="text-dark texto-cinza px-5 py-2 rounded" id="nome-do-canal" placeholder="Digite a porcentagem" type="number" name=""/>
                        </div>
                      </div>
                      </div>
                    )}


                  <a id="save" onClick={addTax} 
                    class="btn mx-auto mt-5 text-white px-5 font-weight-bold" 
                    href="#"
                    role="button">+
                  </a>


                  <a id="save" onClick={calcularImpostos} 
                    class="btn mx-auto mt-5 text-white px-5 font-weight-bold" 
                    href="#"
                    role="button">Salvar
                  </a>
              
            </div>
          </Modal.Body>
        </Modal>

      </div>
    </div>
      
    );
  }else if(fase===1){
      //Adição dos custos de CPV...
    return(
      <div id="tabela">

        <Modal show={showProduto} onHide={handleCloseProduto}>
          <Modal.Body>            
            <>
            <div class="text-center text-muted">
              <h4 class="font-weight-bold" >Adicionar custo do produto</h4>
            </div>
              
              <div class="container" id="container-central">
                <div class="row mb-4">
                    <div class="col-6 text-center">
                      <span class="texto-cinza mr-2">Nome da Categoria do produto:</span>
                        <input
                        value={produto.it[contador2].name} 
                        class="text-dark texto-cinza px-5 py-2 rounded" 
                        id="nome-canal" 
                        placeholder="Digite o nome do canal" 
                        type="text" 
                        name="canal"
                        />
                    </div>
                    
                    <div class="col-6 text-center">
                      <span class="texto-cinza mr-2">Tipo de Custo:</span>
                        <input 
                        value={produto.it[contador2].type_cost}  
                        class="text-dark texto-cinza px-5 py-2 rounded" 
                        id="nome-canal" 
                        placeholder="Digite o nome do canal" 
                        type="text" 
                        name="canal"
                        />
                    </div>
                </div>

                {produto.it[contador2].type_cost==0
                ?
                <>
                  {custosCPV.items.map((e, i) =>
                    <div key={i}>
                          <div class="row mb-4">
                            <div class="col-4 text-center">
                              <span class="texto-cinza mr-2">Nome do Custo:</span>
                                <input
                                onChange={e => setNameCostProduct(e.target.value)}
                                class="text-dark texto-cinza px-5 py-2 rounded" 
                                id="nome-canal" 
                                placeholder="Digite o nome do canal" 
                                type="text" 
                                name="canal"
                                />
                            </div>
                            <div class="col-4 text-center">
                              <span class="texto-cinza mr-2">Valor do Custo:</span>
                                <input 
                                onChange={e => setValueCostProduct(e.target.value)}
                                class="text-dark texto-cinza px-5 py-2 rounded" 
                                id="nome-canal" 
                                placeholder="Digite o nome do canal" 
                                type="text" 
                                name="canal"
                                />
                            </div>
                            <div class="col-4 text-center">
                              <span class="titulo-caixa">Tipo do<br/>custo</span>
                              <select value={tipoCusto} onChange={s => setTypeCostProduct(s.target.value)}>
                                  <option value="0" class="titulo-caixa">Matéria Prima</option>
                                  <option value="1" class="titulo-caixa" >Outros Custos</option>
                                  <option value="2" class="titulo-caixa" >Mão de Obra</option>
                              </select>
                            </div>
                        </div>

                    </div>

                  )}

                    <a id="save"
                      class="btn mx-auto mt-5 text-white px-5 font-weight-bold"
                      role="button"
                      onClick={addCusto}>+
                    </a>

                </>
                :
                <div class="row mb-4">
                            <div class="col-4 text-center">
                              <span class="texto-cinza mr-2">Nome do Custo:</span>
                                <input
                                onChange={e => setNameCostProduct(e.target.value)}
                                class="text-dark texto-cinza px-5 py-2 rounded" 
                                id="nome-canal" 
                                placeholder="Digite o nome do canal" 
                                type="text" 
                                name="canal"
                                />
                            </div>
                            <div class="col-4 text-center">
                              <span class="texto-cinza mr-2">Valor do Custo:</span>
                                <input 
                                onChange={e => setValueCostProduct(e.target.value)}
                                class="text-dark texto-cinza px-5 py-2 rounded" 
                                id="nome-canal" 
                                placeholder="Digite o nome do canal" 
                                type="text" 
                                name="canal"
                                />
                            </div>
                            <div class="col-4 text-center">
                              <span class="titulo-caixa">Tipo do<br/>custo</span>
                              <select value={typeCostProduct} onChange={s => setTypeCostProduct(s.target.value)}>
                                  <option value="0" class="titulo-caixa">Matéria Prima</option>
                                  <option value="1" class="titulo-caixa" >Outros Custos</option>
                                  <option value="2" class="titulo-caixa" >Mão de Obra</option>
                              </select>
                            </div>
            </div>
                }



                    <a id="save"
                      class="btn mx-auto mt-5 text-white px-5 font-weight-bold"
                      role="button"
                      onClick={custoProduto}>Salvar
                    </a>
                
            </div>
            </>
          
          </Modal.Body>
        </Modal>

  
      <MaterialTable tableRef={props.tableRef}
          title="Detalhando (CPV, CMS e CSV)"
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
                    <Button id="btn_add_Canal" variant="primary" onClick={handleShowProduto}>
                    (+) Adicionar (CPV, CMS e CSV)
                    </Button>
                    : ''}
              </div>
            ),
          }}
          actions={[
            
            {
              icon: () => calculado ?     
              <Button id="btn_add_CPV" variant="primary" onClick={handleShowProduto}>
                    (+) Adicionar (CPV, CMS e CSV)
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
            isEditable: rowData => {{
              let pos = state.data.length;
              if(rowData.tableData.id === 0){  
                  console.log(rowData.tableData.edittingw)       
                return false
              }else{
                return true
              }
            
            }},
            // only name(a) rows would be editable
            isDeletable: rowData => {{
              if(rowData.tableData.id === 0){
                return false
              }else{
                return true
              }

            }}, 
            // only name(a) rows would be deletable
            
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
                  
                    if(!calculado){
                      calcularImpostos()
                    }

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
 
    </div>
      
    );
  }else if(fase===2){
    //Adição de custos variáveis
    return(
      <div id="tabela">
      <Modal show={showVariavel} onHide={handleCloseVariavel}>
        <Modal.Body>      
          <>
          <div class="text-center text-muted">
            <h4 class="font-weight-bold" >Adicionar custos variáveis</h4>
          </div>
          <div class="container" id="container-central">
              {itemsCostVariable.items.map((i, ind) =>
                <div key={ind}>
                  <div class="row mb-4">
                    <div class="col-4 text-center">
                          <span class="titulo-caixa">Nome da<br/>despesa</span>
                          <input onChange={w => setNameCostVariable(w.target.value)} 
                          class="text-dark texto-cinza px-5 py-2 rounded" 
                          id="nome-categoria" 
                          placeholder="Digite o nome da despesa" 
                          type="text" 
                          name=""
                          />
                      </div>
                      <div class="col-4 text-center">
                        <span class="titulo-caixa">Tipo de<br/>custo</span>
                            <select value={typeCost} onChange={s => setTypeCostVariable(s.target.value)}>
                                <option value="0" class="titulo-caixa">Valor da despesa</option>
                                <option value="1" class="titulo-caixa" >% da despesa</option>
                            </select>
                      </div>
                      {
                      typeCost == 0
                      ?
                      <div class="col-4 text-center">
                        <span class="titulo-caixa">Valor<br/>de despesa</span>
                        <input onChange={e => setValueCostVariable(e.target.value)} 
                              class="text-dark texto-cinza px-5 py-2 rounded" 
                              id="nome-canal" 
                              placeholder="R$" 
                              type="text" 
                              name=""
                        />
                      </div>
                      :
                      <div class="col-4 text-center">
                        <span class="titulo-caixa">Porcentagem<br/>de despesa</span>
                        <input onChange={e => setValueCostVariable(e.target.value)} 
                              class="text-dark texto-cinza px-5 py-2 rounded" 
                              id="nome-canal" 
                              placeholder="%" 
                              type="text" 
                              name=""
                        />
                      </div>
                      }
                  </div>

                </div>              
              )
              }

                  <a id="save"
                    class="btn mx-auto mt-5 text-white px-5 font-weight-bold"
                    role="button"
                    onClick={
                      addOutrasDespesasVariaveis
                      }>Add
                  </a>


                  <a id="save"
                    class="btn mx-auto mt-5 text-white px-5 font-weight-bold"
                    role="button"
                    onClick={
                      custoVariavel
                      }>Salvar
                  </a>
             
          </div>
          </>
        
        </Modal.Body>
      </Modal>

      

  
      <MaterialTable tableRef={props.tableRef}
          title="Detalhando os custos variáveis"
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
                    <Button id="btn_add_Canal" variant="primary" onClick={handleShowVariavel}>
                    (+) Adicionar Canal
                    </Button>
                    : ''}
              </div>
            ),
          }}
          actions={[
            
            {
              icon: () => calculado ?     
              <Button id="btn_add_Variable" variant="primary" onClick={handleShowVariavel}>
                  (+) Adicionar Custos Variáveis
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
            isEditable: rowData => {{
              let pos = state.data.length;
              if(rowData.tableData.id === 0){  
                  console.log(rowData.tableData.edittingw)       
                return false
              }else{
                return true
              }
            
            }},
            // only name(a) rows would be editable
            isDeletable: rowData => {{
              if(rowData.tableData.id === 0){
                return false
              }else{
                return true
              }

            }}, 
            // only name(a) rows would be deletable
            
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
                  
                    if(!calculado){
                      calcularImpostos()
                    }

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

 
    </div>
      
    );
  }else if(fase===3){
    //Adição dos salários
    return(
      <div id="tabela">
      <Modal show={showSalario} onHide={handleCloseSalario}>
        <Modal.Body>  
          <>
          <div class="text-center text-muted">
            <h4 class="font-weight-bold" >Adicionar salário</h4>
          </div>
            <div class="container" id="container-central">
              <div class="row mb-6">
              <div class="col-6 text-center">
                      <span class="titulo-caixa">Valor mensal dos salários</span>
                      <input onChange={w => setSalary(w.target.value)} 
                      class="text-dark texto-cinza px-5 py-2 rounded" 
                      id="nome-categoria" 
                      placeholder="R$" 
                      type="text" 
                      name="categoria"
                      />
                  </div>

                  <a id="save"
                    class="btn mx-auto mt-5 text-white px-5 font-weight-bold"
                    role="button"
                    onClick={
                      custoSalario
                      }>Salvar
                  </a>
              </div>
          </div>
          </>
        
        </Modal.Body>
      </Modal>

      
  
      <MaterialTable tableRef={props.tableRef}
          title="Detalhando salários"
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
                    <Button id="btn_add_Canal" variant="primary" onClick={handleShowSalario}>
                    (+) Adicionar Canal
                    </Button>
                    : ''}
              </div>
            ),
          }}
          actions={[
            
            {
              icon: () => calculado ?     
              <Button id="btn_add_Canal" variant="primary" onClick={handleShowSalario}>
                  (+) Adicionar Salários
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
            isEditable: rowData => {{
              let pos = state.data.length;
              if(rowData.tableData.id === 0){  
                  console.log(rowData.tableData.edittingw)       
                return false
              }else{
                return true
              }
            
            }},
            // only name(a) rows would be editable
            isDeletable: rowData => {{
              if(rowData.tableData.id === 0){
                return false
              }else{
                return true
              }

            }}, 
            // only name(a) rows would be deletable
            
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
                  
                    if(!calculado){
                      calcularImpostos()
                    }

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
    </div>
      
    );
  }else if(fase===4){
    //Adição de outras despesas
    return(
      <div id="tabela">
      <Modal show={showDespesas} onHide={handleCloseDespesas}>
        <Modal.Body>  
          <>
          <div class="text-center text-muted">
            <h4 class="font-weight-bold" >Adicionar outras despesas</h4>
          </div>
            <div class="container" id="container-central">
              {itemsCost.items.map((i, ind) =>
                <div key={ind}>
                  <div class="row mb-4">
                    <div class="col-4 text-center">
                          <span class="titulo-caixa">Nome da<br/>despesa</span>
                          <input
                          onChange={s => setNameCost(s.target.value)}
                          class="text-dark texto-cinza px-5 py-2 rounded" 
                          id="nome-categoria" 
                          placeholder="Digite o nome da despesa" 
                          type="text" 
                          name=""
                          />
                      </div>
                      <div class="col-4 text-center">
                        <span class="titulo-caixa">Tipo de<br/>custo</span>
                            <select value={typeCost} onChange={s => setTypeCost(s.target.value)}>
                                <option value="0" class="titulo-caixa">Valor da despesa</option>
                                <option value="1" class="titulo-caixa" >% da despesa</option>
                            </select>
                      </div>
                      {
                      typeCost == 0
                      ?
                      <div class="col-4 text-center">
                        <span class="titulo-caixa">Valor<br/>de despesa</span>
                        <input onChange={e => setValueCost(e.target.value)} 
                              class="text-dark texto-cinza px-5 py-2 rounded" 
                              id="nome-canal" 
                              placeholder="R$" 
                              type="text" 
                              name=""
                        />
                      </div>
                      :
                      <div class="col-4 text-center">
                        <span class="titulo-caixa">Porcentagem<br/>de despesa</span>
                        <input onChange={e => setValueCost(e.target.value)} 
                              class="text-dark texto-cinza px-5 py-2 rounded" 
                              id="nome-canal" 
                              placeholder="%" 
                              type="text" 
                              name=""
                        />
                      </div>
                      }
                  </div>

                </div>              
              )
              }
                  <a id="save"
                    class="btn mx-auto mt-5 text-white px-5 font-weight-bold"
                    role="button"
                    onClick={
                      addOutrasDespesas
                      }>Add
                  </a>


                  <a id="save"
                    class="btn mx-auto mt-5 text-white px-5 font-weight-bold"
                    role="button"
                    onClick={
                      outrasDespesas
                      }>Salvar
                  </a>
             
          </div>
          </>
        
        </Modal.Body>
      </Modal>

      

  
      <MaterialTable tableRef={props.tableRef}
          title="Detalhando outras despesas"
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
                    <Button id="btn_add_Canal" variant="primary" onClick={handleShowDespesas}>
                    (+) Adicionar Canal
                    </Button>
                    : ''}
              </div>
            ),
          }}
          actions={[
            
            {
              icon: () => calculado ?     
              <Button id="btn_add_Canal" variant="primary" onClick={handleShowDespesas}>
                  (+) Adicionar Despesa
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
            isEditable: rowData => {{
              let pos = state.data.length;
              if(rowData.tableData.id === 0){  
                  console.log(rowData.tableData.edittingw)       
                return false
              }else{
                return true
              }
            
            }},
            // only name(a) rows would be editable
            isDeletable: rowData => {{
              if(rowData.tableData.id === 0){
                return false
              }else{
                return true
              }

            }}, 
            // only name(a) rows would be deletable
            
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
                  
                    if(!calculado){
                      calcularImpostos()
                    }

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
    </div>
      
    );
  }else if(fase===5){
    //Tela Final
    return(
      <div id="tabela">
      <MaterialTable 
        ref={tableRef}
        title="Orçamento Base Zero"
        columns={state.columns}
        data={state.data}
        localization={{
          body:{
            
          }
        }}
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
      />

    </div>
      
    );
  }
}




export default DashFinal;

