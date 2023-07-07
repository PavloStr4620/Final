async function removeProduct(id) {
    console.log(id);
    await fetch(`http://localhost:3000/deleteProduct/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({_id: id})
    })
        .then(response => {
            if (response.ok) {
                console.log('Карточка товару успішно видалена з бази даних');
            } else {
                console.error('Помилка при видаленні карточки з бази даних');
            }
        })
        .catch(error => {
            console.error('Помилка під час виконання запиту:', error);
        });
        location.reload();
}   