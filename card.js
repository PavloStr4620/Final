function addToCart(name, sum) {
  let productName = name;
  let productPrice = sum;
  let cardModal = document.getElementById("card-modal");

  let existingItemRow = findExistingItemRow(cardModal, productName);

  if (existingItemRow) {
    let quantityCell = existingItemRow.querySelector(".quantity");
    let currentQuantity = parseInt(quantityCell.textContent);
    quantityCell.textContent = currentQuantity + 1;

    let itemPriceCell = existingItemRow.querySelector(".price");
    let currentPrice = parseFloat(itemPriceCell.textContent);
    let newPrice = currentPrice + parseFloat(productPrice);
    itemPriceCell.textContent = newPrice.toFixed(2);
  } else {
    let newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${productName}</td>
      <td class="price">${productPrice}</td>
      <td class="quantity">1</td>
    `;
    cardModal.appendChild(newRow);
  }

  alert('Товар додано до корзини!');
}

function findExistingItemRow(cardModal, productName) {
  let rows = cardModal.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    let nameCell = rows[i].getElementsByTagName("td")[0];
    if (nameCell.textContent === productName) {
      return rows[i];
    }
  }
  return null;
}
