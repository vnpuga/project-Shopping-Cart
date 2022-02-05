// A função saveCartItems deve salvar os itens do carrinho de compras no localStorage, em uma chave denominada cartItems.
const saveCartItems = (chave, valor) => localStorage.setItem(chave, valor);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
