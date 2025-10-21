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