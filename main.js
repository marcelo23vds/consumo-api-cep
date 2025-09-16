/* *****************************************************************************************
* Objetivo: Preencher automaticamente o formulario de acordo com o CEP digitado (API CEP)
* Data: 16/09/2025
* Autor: Marcelo Vieira
* Versão: 1.0
* *****************************************************************************************/

'use strict'

async function pesquisarCep(cep){
    const url = `https://cdn.apicep.com/file/apicep/${cep}.json`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

async function preencherCampos ({target}){
    const infoCep = await pesquisarCep(target.value)
    document.getElementById('endereco').value = infoCep.address
    document.getElementById('bairro').value = infoCep.district
    document.getElementById('cidade').value = infoCep.city
    document.getElementById('estado').value = infoCep.state

}

document.getElementById('cep')
        .addEventListener('focusout', preencherCampos)
        