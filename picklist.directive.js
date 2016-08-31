/**
 * Diretiva Picklist - Dual Select - multiselect
 * 
 * Componente que escolhe opções de uma lista de objetos passando para outra lista de selecionados, da esquerda para a direita.
 * 
 * -- Utilização --
 * 
 * - HTML -
 * <picklist config="vm.configPicklist" 
             opcoes-esquerda="vm.opcoesEsquerda" 
             opcoes-direita="vm.opcoesDireita"/>
 * 
 * - Controller -
 * vm.configPicklist = {
            id: "pickListExemplo", // opcional
            labelEsquerda: 'Opções Disponíveis:',
            labelDireita: 'Opções Adicionadas:',
            labelOpcao: "nome" // Metaprogramação para dizer a diretiva como ela encontrará o label da opção, exemplos abaixo:
            // p/ labelOpcao: "nome", vm.opcoesEsquerda[0] = {nome: 'Teste', codigo: 1}, o label resultante será 'Teste'
            // p/ labelOpcao: "nome", vm.opcoesEsquerda[0] = {chavePrimaria: {codigo: 1, tipoTeste: {codigo: 1, nome: 'Teste'} } }, o label será '', pois não existe o atributo nome na raiz
            // p/ labelOpcao: "chavePrimaria.tipoTeste.nome", vm.opcoesEsquerda[0] = {chavePrimaria: {codigo: 1, tipoTeste: {codigo: 1, nome: 'TesteAninhado'} } }, o label será 'TesteAninhado'
        };
    }
 * 
 */
define([
    '../../filters/json-como-valor.filter'
], function() {
    'use strict';

    return angular.module("app")
        .directive('picklist', picklist);

    function picklist() {
        return {
            restrict: 'EA',
            scope: {
                config: "=",
                opcoesEsquerda: "=",
                opcoesDireita: "="
            },
            templateUrl: 'app/diretivas/picklist/picklist.diretiva.html',
            controller: picklistDiretivaController,
            controllerAs: 'vm',
            bindToController: true
        };
    }

    function picklistDiretivaController($parse) {
        var vm = this;
        vm.labelOpcao = $parse(vm.config.labelOpcao);

        vm.markedLeft = [];
        vm.markedRight = [];

        vm.transferir = transferir;
        vm.filtroPesquisaEsquerda = filtroPesquisaEsquerda;
        vm.filtroPesquisaDireita = filtroPesquisaDireita;

        function filtroPesquisaEsquerda(value, index, array) {
            vm.pesquisaEsquerda = vm.pesquisaEsquerda || '';
            return filtroPesquisa(value, vm.pesquisaEsquerda);
        }

        function filtroPesquisaDireita(value, index, array) {
            vm.pesquisaDireita = vm.pesquisaDireita || '';
            return filtroPesquisa(value, vm.pesquisaDireita);
        }

        function transferir(de, para, elementos) {
            if (elementos) {
                angular.forEach(elementos, function(element) {
                    para.push(element);
                    de.splice(de.indexOf(element), 1);
                });
            } else {
                for (var i = 0; i < de.length; i++) {
                    para.push(de[i]);
                }
                de.length = 0;
            }
        };

        function filtroPesquisa(value, filtro) {
            if (_.deburr(vm.labelOpcao(value).toUpperCase()).indexOf(_.deburr(filtro.toUpperCase())) !== -1) {
                return true;
            }
            return false;
        }
    }

});
