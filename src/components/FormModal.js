import React, { Component } from 'react'

export default class FormModal extends Component {
    render() {
        return (
            <div>
                <div class="container" id="container-central">
                    <div class="row mb-4">
                        <div class="col-6 text-center">
                            <span class="titulo-caixa">Nome da<br/>despesa</span>
                            <input onChange={w => setNameCost(w.target.value)} 
                            class="text-dark texto-cinza px-5 py-2 rounded" 
                            id="nome-categoria" 
                            placeholder="Digite o nome da despesa" 
                            type="text" 
                            name=""
                            />
                        </div>
                        <div class="col-4 text-center">
                            <span class="titulo-caixa">Tipo de<br/>custo</span>
                                <select value={tipoCusto} onChange={s => setTypeCost(s.target.value)}>
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
                        <a id="save"
                            class="btn mx-auto mt-5 text-white px-5 font-weight-bold"
                            role="button"
                            onClick={
                            outrasDespesas
                            }>Salvar
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
