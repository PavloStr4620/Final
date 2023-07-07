function addToCart(cartId) {
    let container = document.querySelector('.modal-body');

    console.log(product);

    fetch(`http://localhost:3000/cart/${cartId}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _id: product,
        })
    })
        .then(response => {
            console.log('Product card edit');
        })
        .catch(error => {
            console.log('Error edit product', error);
        });

    container.innerHTML = ''; // Очистити контейнер перед вставкою нових даних
    products.forEach(product => {
        let newProductCard = `
      <div class="col-lg-4 col-sm-6">
            <div class="product-card">
                <div class="product-thumb">
                    <a href="#"><img src="img/1.png" alt=""></a>
                </div>
                <div class="product-details">
                    <h4><a href="#">${product.name}</a></h4>
                    <p>Модель: ${product.model}</p>
                    <p>Кількість мегапікселів: ${product.megapixels}</p>
                    <p>Оптичний зум: ${product.zoom}</p>
                    <p>Кількість кадрів в секунду: ${product.fps}</p>
                    <div class="product-bottom-details d-flex justify-content-between">
                        <div class="product-price">
                            <small>$1000</small>
                            <h5>${product.sum}</h5>
                        </div>
                        <div class="product-links">
                        <p id="card-id-for-update" style="display: none;">${product._id}</p>
                            <button id="delete-product"><i class="fa-solid fa-trash" onclick="removeProduct('${product._id}')"></i></button>
                            <button id="edit-button" data-product-id="${product._id}"><i class="fa-solid fa-bars" data-bs-toggle="modal" onclick="editProductCard()"></i></button>
                            <a href="#"><i class="fa-solid fa-cart-shopping" onclick="addToCart(${product._id})"></i></a>
                            <a href="#"><i class="fa-regular fa-heart"></i></a>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        `;

        container.innerHTML += newProductCard;
    })
}