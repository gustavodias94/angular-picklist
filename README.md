# Angular-picklist
Angular PickList - Simple angular 1 directive for dual multi select combos. Left to right.

### HTML
```html
<picklist config="vm.configPicklist" 
             opcoes-esquerda="vm.opcoesEsquerda" 
             opcoes-direita="vm.opcoesDireita"/>
```

### CONTROLLER
```js
vm.configPicklist = {
            id: "pickListExemplo", // opcional
            labelEsquerda: 'Opções Disponíveis:',
            labelDireita: 'Opções Adicionadas:',
            labelOpcao: "nome" // Metaprogramação para dizer a diretiva como ela encontrará o label da opção, exemplos abaixo:
            // p/ labelOpcao: "nome", vm.opcoesEsquerda[0] = {nome: 'Teste', codigo: 1}, o label resultante será 'Teste'
            // p/ labelOpcao: "nome", vm.opcoesEsquerda[0] = {chavePrimaria: {codigo: 1, tipoTeste: {codigo: 1, nome: 'Teste'} } }, o label será '', pois não existe o atributo nome na raiz
            // p/ labelOpcao: "chavePrimaria.tipoTeste.nome", vm.opcoesEsquerda[0] = {chavePrimaria: {codigo: 1, tipoTeste: {codigo: 1, nome: 'TesteAninhado'} } }, o label será 'TesteAninhado'
        };
    }
```
