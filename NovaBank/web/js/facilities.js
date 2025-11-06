//desplegable
const menuBtn = document.getElementById('menuBtn');
const dropdown = document.getElementById('dropdownMenu');

menuBtn.addEventListener('click', () => {
    dropdown.classList.toggle('show');
});
window.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('show');
    }
});

//ojito de contraseña

//CERRR SESSION
function salirSession(){
    document.getElementById('botonCerrarSesion').addEventListener('click', function() {
    event.preventDefault();
    event.stopPropagation();
    sessionStorage.removeItem('customer.id');
    sessionStorage.removeItem('customer.firstName');
    sessionStorage.removeItem('customer.lastName');
    sessionStorage.removeItem('customer.middleInitial');
    sessionStorage.removeItem('customer.street');
    sessionStorage.removeItem('customer.city');
    sessionStorage.removeItem('customer.state');
    sessionStorage.removeItem('customer.zip');
    sessionStorage.removeItem('customer.phone');
    sessionStorage.removeItem('customer.email');
    sessionStorage.removeItem('customer.password');

    window.location.href = 'index.html'; 
    });
}