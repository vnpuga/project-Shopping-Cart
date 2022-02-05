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

// requisito 3: Remova o item do carrinho de compras ao clicar nele
function cartItemClickListener(event) {
  event.target.remove();
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
async function olCartItems(id) {
  const ol = document.querySelector('.cart__items'); 
  const response = await fetchItem(id); // requisição da API, q retorna arquivo Json, de um único item
  const { id: sku, title: name, price: salePrice } = response;
  const cartItem = createCartItemElement({ sku, name, salePrice });
  ol.appendChild(cartItem);
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

window.onload = () => {
  createProductsList('computador');
};
