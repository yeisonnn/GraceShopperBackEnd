const { faker } = require('@faker-js/faker');

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const dataProducts = [];
const dataProductsCategories = [];

for (i = 0; i < 50; i++) {
  const newproduct = {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: +faker.commerce.price(),
    category_id: randomNumber(1, 15),
    inventory_id: randomNumber(1, 2),
  };

  dataProducts.push(newproduct);
}

for (i = 0; i < 15; i++) {
  const newProductCategory = {
    name: faker.commerce.department(),
    description: faker.commerce.productDescription(),
  };

  dataProductsCategories.push(newProductCategory);
}

module.exports = { dataProducts, dataProductsCategories };
