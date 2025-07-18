'use strict';

const limparFormulario = (endereco) => {

    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';

}

const preencherFormulario = (endereco) => {

    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
    //selecionando os elementos e adicionando as informações do json referentes a cada um

}

const eNumero = (numero) => /^[0-9]+$/.test(numero);
//verifica se é numero

const cepValido = (cep) => cep.length == 8 && eNumero(cep);
//verifica se o digitado no campo de cep tem 8 digitos e se é um numero chamando a function que verifica se é numero

const pesquisarCep = async() => {

    limparFormulario();

    const cep = document.getElementById('cep').value;
    //neste caso ao inves de escutar, estou capturando o value que o elemento 'cep' possui

    const url = `http://viacep.com.br/ws/${cep}/json/`;
    //url do site que disponibiliza os dados do cep digitado

    if (cepValido(cep)) {

        const dados = await fetch(url);
        const endereco = await dados.json();
        // await para "aguardar resolver" para não ficar promessa pendente, 
        // ele espera e já da o retorno para eu poder trabalhar com ele

        /*
        OUTRA MANEIRA DE UTILIZAR O FETCH:

        fetch(url).then(responde => responde.json().then(console.log));

        com o fetch eu passo uma url para ele, e ele devolve uma promessa, 
        o nome é promessa por se tratar de algo que pode ou nao acontecer, 
        é um retorno asincrono, não posso atribuir a uma variavel
        o metodo then é utilizado para mostrar esse retorno.

        o json também retorna uma promessa então precisa utilizar o then também
        */

        if (endereco.hasOwnProperty('erro')) {
        // se o json tem a propriedade erro (ou seja, caso o cep seja invalido), então mensagem de erro, se não, preencher o formulario
            document.getElementById('endereco').value = 'CEP não encontrado!';
        } else {
            preencherFormulario(endereco);
            //acionar a function de preencher os elementos
        }

    } else {
        document.getElementById('endereco').value = 'CEP incorreto!';
    }
  
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);
/*
Va no elemento 'cep' e escuta o focusout, ou seja, quando clicar fora do elemento 'cep' ou quando der um enter por exemplo
Quando escutar o focus out, acionar a function 'pesquisarCep'
*/

