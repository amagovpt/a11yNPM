# Select

O componente **Select** é um elemento de formulário utilizado para permitir ao utilizador escolher uma opção de uma lista suspensa. É ideal para situações em que há múltiplas opções, mas apenas uma pode ser selecionada.

<br>

## Props

<br>

#### options
Array de objetos que define as opções disponíveis no select. Cada objeto deve conter:
- `value` (string ou number): Valor da opção.
- `label` (string): Texto apresentado ao utilizador.

Exemplo:
```js
[
  { value: "", label: "Selecione uma opção" },
  { value: "1", label: "Opção 1" },
  { value: "2", label: "Opção 2" }
]