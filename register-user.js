

document.getElementById('register-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Зупиняє дія за замовчуванням (оновлення сторінки)

  let email = document.getElementById('exampleDropdownFormEmail2').value;
  let password = document.getElementById('exampleDropdownFormPassword2').value;

  if (email.trim() === '' || password.trim() === '') {
    alert('Ви незаповнили дані!');
  } else {

    fetch('http://localhost:3000/register-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(response => {
        if (response.ok) {
          console.log('User created successfully');
        } else {
          console.error('Error creating user');
        }
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
    $('#register-user').modal('hide');
  }
});


