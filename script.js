// para usar no requisito 4, sobre localStorage.
const olRecuperada = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

// Requisito 5 Some o valor total dos itens do carrinho de compras
function totalPrice() {
  const li = document.querySelectorAll('li');
  const pTotalPrice = document.querySelector('.total-price');
  const array = [];
  if (li.length === 0) {
    pTotalPrice.innerText = 0;
  } else {
    li.forEach((item) => {
      array.push((parseFloat(item.innerText.split(' ').pop().slice(1))));
      const arrayResult = array.reduce((acc, curr) => acc + curr, 0); // toFixed nao passa no teste (retirei)
      pTotalPrice.innerText = arrayResult;
    });  
  }
}

// requisito 3: Remova o item do carrinho de compras ao clicar nele
function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems('cartItems', olRecuperada.innerHTML);
  totalPrice();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// requisito 2: Adicione o produto ao carrinho de compras.
// Sou grata aos amigos Kaique, Pedro, Philippe, pela ajuda neste requisito, não teria conseguido sem eles.
async function olCartItems(id) {
  const ol = document.querySelector('.cart__items'); 
  const response = await fetchItem(id); // requisição da API, q retorna arquivo Json, de um único item
  const { id: sku, title: name, price: salePrice } = response;
  const cartItem = createCartItemElement({ sku, name, salePrice });
  ol.appendChild(cartItem);
  saveCartItems('cartItems', olRecuperada.innerHTML);
  totalPrice();
}

async function addProductsCart() {
  const btn = document.querySelectorAll('.item__add'); // class="item__add" do botao em cada produto.
    btn.forEach((botao) => {
      const parent = botao.parentElement; // acessando a seção class="item".
      const id = parent.firstChild.innerText; // capturando o id.
      botao.addEventListener('click', () => olCartItems(id));
    });  
}

// requisito 1: criar lista de produtos
async function createProductsList(product) {
  const classItems = document.querySelector('.items');
  const newArray = await fetchProducts(product); // requisição da API, q retorna arquivo Json.
  newArray.results.forEach((element) => {
    const newObject = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };
    const productSection = createProductItemElement(newObject);
    classItems.appendChild(productSection);
  });
  addProductsCart();
}

// requisito 6: Apagar carrinho.
function clear() {
  const btn = document.querySelector('.empty-cart');
  btn.addEventListener('click', () => {
    olRecuperada.innerHTML = '';
    saveCartItems('cartItems', olRecuperada.innerHTML);
  });
}

window.onload = () => {
  createProductsList('computador');
  olRecuperada.innerHTML = getSavedCartItems('cartItems');
  // recuperar evento de click após carregamento da pg, p/permitir remover itens do localStorage
  const liRecuperada = document.querySelectorAll('li');
  liRecuperada.forEach((li) => li.addEventListener('click', cartItemClickListener));
  clear();
};
