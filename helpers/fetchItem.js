const fetchItem = async (id) => {
  const url = `https://api.mercadolibre.com/items/${id}`;
  
  try {
    const response = await fetch(url); // requisição p/ API
    const data = await response.json(); // retorna da requisição em formato JSON
    // console.log(data);
    return data;
  } catch (error) {
      return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

console.log(fetchItem('MLB1341706310'));
