const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

const apiUrl = 'https://6622071827fcd16fa6c8818c.mockapi.io/api/v1/users';


registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        if (response.ok) {
            alert('Registro exitoso');
            container.classList.remove("active");
        } else {
            alert('Error en el registro');
        }
    } catch (error) {
        console.error('Error en el registro:', error);
    }
});


loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(apiUrl);
        const users = await response.json();
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            alert(`Bienvenido, ${user.name}`);
            
            window.location.href = '../Travel Blog/index.html';
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
    }
});
