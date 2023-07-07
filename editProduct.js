function editProductCard(productId) {
    const editModal = new bootstrap.Modal(document.getElementById('edit-card'));
    editModal.show();

    const updateButton = document.getElementById('updateInfo');
    updateButton.addEventListener('click', function () {
        // Отримати значення з полів вводу
        const name = document.getElementById('name-card-edit').value;
        const model = document.getElementById('model-card-edit').value;
        const megapixels = document.getElementById('megapixels-card-edit').value;
        const zoom = document.getElementById('zoom-card-edit').value;
        const fps = document.getElementById('fps-card-edit').value;
        const sum = document.getElementById('sum-card-edit').value;


        fetch(`http://localhost:3000/editProduct/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: productId,
                name: name,
                model: model,
                megapixels: megapixels,
                zoom: zoom,
                fps: fps,
                sum: sum,
            })
        })
            .then(response => {
                console.log('Product card edit');
            })
            .catch(error => {
                console.log('Error edit product', error);
            });
            location.reload();
})
}