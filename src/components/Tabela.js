import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo() {
    
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

    
    data: [],
    
  });

  
  const datas = (props) =>{
    console.log(props)   
}  
  return (

    
    <MaterialTable
      title=""
      columns={state.columns}
      data={state.data}
      options={{
        search: false,  
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
  );
}
