var Admin = false;

document.getElementById('sing-in').addEventListener('submit', function (event) {
  event.preventDefault(); // Зупиняємо стандартну поведінку форми

  let email = document.getElementById('exampleDropdownFormEmail1').value;
  let password = document.getElementById('exampleDropdownFormPassword1').value;


  if (email.trim() === '' || password.trim() === '') {
    alert('Ви незаповнили дані!');
  } else {
    if (email == "admin@gmail.com" && password == "admin") {
      document.getElementById("create-card-id").style.visibility = "visible"; // показує кнопку для добавляння товару
      Admin = true;
      let objects = document.getElementsByClassName('fa-trash'); // Показує іконку корзинки для адміна
      let objects2 = document.getElementsByClassName('fa-bars'); // Ховає іконку корзинки якщо не адмін
      for (var i = 0; i < objects.length; i++) {
        objects[i].style.visibility = 'visible';
        objects2[i].style.visibility = 'visible';
      }
      $('#sing-in').modal('hide');
      // document.getElementById("remove-card").style.visibility = "visible";
    } else {
      Admin = false;
      let objects = document.getElementsByClassName('fa-trash'); // Ховає іконку корзинки якщо не адмін
      let objects2 = document.getElementsByClassName('fa-bars'); // Ховає іконку корзинки якщо не адмін
      for (var i = 0; i < objects.length; i++) {
        objects[i].style.visibility = 'hidden';
        objects2[i].style.visibility = 'hidden';
      }
    }

    fetch('http://localhost:3000/sing-in', {
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
          console.log('User log in');
        } else {
          console.error('Error log in user');
        }
      })
      .catch(error => {
        console.error('Error log in user:', error);
      });
  }
});


