const fetchProducts = async (product) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

  try {
    const response = await fetch(url); // requisição p/ API
    const data = await response.json(); // retorna da requisição em formato JSON
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

console.log(fetchProducts('computador'));
