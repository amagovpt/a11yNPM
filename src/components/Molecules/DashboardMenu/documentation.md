# DashboardMenu

O `DashboardMenu` é um componente de menu lateral utilizado em dashboards para navegação entre diferentes seções ou páginas. Ele é fixado no lado esquerdo da tela e suporta itens de menu com ícones e rótulos.

<br>
<br>

## Acessibilidade
- Cada item do menu é navegável via teclado utilizando a tecla `Tab`.
- Os itens do menu podem ser ativados com as teclas `Enter` ou `Espaço`.
- O item atualmente ativo é indicado com o atributo `aria-current="page"`, garantindo que leitores de tela identifiquem o item selecionado.
- Ícones decorativos são marcados com `aria-hidden="true"` para evitar que sejam lidos por leitores de tela.
- O menu é envolvido por uma tag `<nav>` com o atributo `aria-label="Navegação do Dashboard"` para fornecer contexto aos leitores de tela.

<br>
<br>

## Props
<br>

#### menuItems
Uma lista de itens do menu. Cada item deve ser um objeto com as seguintes propriedades:
- `id` (string): Identificador único do item.
- `label` (string): Texto exibido no item do menu.
- `icon` (node): Ícone opcional exibido ao lado do texto.

Exemplo:
```javascript
menuItems: [
    { id: "home", label: "Início", icon: "🏠" },
    { id: "analytics", label: "Análises", icon: "📊" },
    { id: "settings", label: "Configurações", icon: "⚙️" },
    { id: "profile", label: "Perfil", icon: "👤" },
]