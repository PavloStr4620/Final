
function addProductCard() {
  let img = document.getElementById('img-card').value;
  let imgName = img.split('\\').pop();
  let name = document.getElementById('name-card').value;
  let model = document.getElementById('model-card').value;
  let megapixels = document.getElementById('megapixels-card').value;
  let zoom = document.getElementById('zoom-card').value;
  let fps = document.getElementById('fps-card').value;
  let sum = document.getElementById('sum-card').value;

  fetch('http://localhost:3000/addModal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      model: model,
      megapixels: megapixels,
      zoom: zoom,
      fps: fps,
      sum: sum
    })
  })
    .then(response => {
      console.log('Product card added');
    })
    .catch(error => {
      console.log('Error adding product', error);
    });
}


// Тестовий код
async function getCard(page = 1, limit = 6, searchQuery = '') {
  try {
    let url = `http://localhost:3000/addModal?page=${page}&limit=${limit}`;
    if (searchQuery) {
      url += `&query=${searchQuery}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    
    const { products, totalPages, currentPage } = data;
    
    
    let container = document.querySelector('.main-product-container');
    
    container.innerHTML = ''; // Очистити контейнер перед вставкою нових даних
    products.forEach(product => {
      let newProductCard = `
      <div class="col-lg-4 col-sm-6">
            <div class="product-card">
                <div class="product-thumb">
                    <a href="#"><img src="img/1.png" alt=""></a>
                </div>
                <div class="product-details">
                <h4>${product.name}</h4>
                    <p>Модель: ${product.model}</p>
                    <p>Кількість мегапікселів: ${product.megapixels}</p>
                    <p>Оптичний зум: ${product.zoom}</p>
                    <p>Кількість кадрів в секунду: ${product.fps}</p>
                    <div class="product-bottom-details d-flex justify-content-between">
                        <div class="product-price">
                            <small>$${product.sum * 2}</small>
                            <h5>${product.sum}</h5>
                        </div>
                        <div class="product-links">
                        <p id="card-id-for-update" style="display: none;">${product._id}</p>
                            <button id="delete-product"><i class="fa-solid fa-trash" onclick="removeProduct('${product._id}')"></i></button>
                            <button id="edit-button" onclick="editProductCard('${product._id}')"><i class="fa-solid fa-bars" data-bs-toggle="modal"></i></button>
                            <a href="#"><i class="fa-solid fa-cart-shopping" onclick="addToCart('${product.name}', ${product.sum})"></i></a>
                            <a href="#"><i class="fa-regular fa-heart"></i></a>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        `;

      container.innerHTML += newProductCard;
    });

    let paginationContainer = document.querySelector('#pagination-container');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === currentPage ? 'active' : '';
      const pageLinkHTML = `<a class="${isActive} next-page-button" href="#" onclick="getCard(${i}, ${limit}, '${searchQuery}')">${i}</a>`;
      paginationContainer.innerHTML += pageLinkHTML;
    }
  } catch (error) {
    console.error('Error retrieving products:', error);
  }
}

function searchProducts(event) {
  event.preventDefault();

  const searchQuery = document.getElementById('search-for-card').value;
  getCard(1, 6, searchQuery);
}

getCard();
