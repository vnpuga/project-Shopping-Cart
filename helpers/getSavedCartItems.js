// A função getSavedCartItems deve recuperar os itens do carrinho de compras do localStorage quando carregamos a página.
const getSavedCartItems = (chave) => localStorage.getItem(chave);

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
