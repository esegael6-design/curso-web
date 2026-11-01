// Precios del menú
const precios = {
    'Espresso Intenso': 45.00,
    'Latte Vainilla': 60.00,
    'Capuccino Canela': 55.00
};

// Cargar orden previa desde localStorage
let orden = JSON.parse(localStorage.getItem('ordenCafeteria')) || [];

// Referencias a elementos del DOM
const listaOrden = document.getElementById('listaOrden');
const totalTexto = document.getElementById('totalTexto');
const btnVaciar = document.getElementById('btnVaciar');
const btnAbrirModal = document.getElementById('btnAbrirModal');
const modalConfirmar = document.getElementById('modalConfirmar');
const btnCerrarModal = document.getElementById('btnCerrarModal');
const resumenModalTexto = document.getElementById('resumenModalTexto');

// Dibujar la orden en pantalla
function renderizarOrden() {
    if (!listaOrden || !totalTexto) return;
    listaOrden.innerHTML = '';
    let total = 0;

    orden.forEach((item, index) => {
        total += item.precio;

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.nombre} - $${item.precio.toFixed(2)}</span>
            <button onclick="eliminarItem(${index})" style="background:none; border:none; color:#f38ba8; cursor:pointer; font-weight:bold;">✕</button>
        `;
        listaOrden.appendChild(li);
    });

    totalTexto.textContent = `Total: $${total.toFixed(2)}`;
    localStorage.setItem('ordenCafeteria', JSON.stringify(orden));
}

// Agregar café
window.ordenar = function(nombre) {
    const precio = precios[nombre] || 0;
    orden.push({ nombre: nombre, precio: precio });
    renderizarOrden();
};

// Eliminar café individual
window.eliminarItem = function(index) {
    orden.splice(index, 1);
    renderizarOrden();
};

// Vaciar carrito
if (btnVaciar) {
    btnVaciar.addEventListener('click', () => {
        orden = [];
        renderizarOrden();
    });
}

// Abrir modal de confirmación
if (btnAbrirModal) {
    btnAbrirModal.addEventListener('click', () => {
        if (orden.length === 0) {
            alert('Agrega al menos un café del menú antes de confirmar.');
            return;
        }
        const total = orden.reduce((acc, item) => acc + item.precio, 0);
        if (resumenModalTexto) {
            resumenModalTexto.textContent = `Has ordenado ${orden.length} producto(s) por un total de $${total.toFixed(2)}. ¡Tu pedido está en preparación!`;
        }
        if (modalConfirmar) {
            modalConfirmar.style.display = 'flex';
        }
    });
}

// Cerrar modal y reiniciar carrito
if (btnCerrarModal) {
    btnCerrarModal.addEventListener('click', () => {
        if (modalConfirmar) modalConfirmar.style.display = 'none';
        orden = [];
        renderizarOrden();
    });
}

// Cerrar si hace clic fuera del cuadro
window.addEventListener('click', (e) => {
    if (modalConfirmar && e.target === modalConfirmar) {
        modalConfirmar.style.display = 'none';
        orden = [];
        renderizarOrden();
    }
});

// Render inicial al cargar
renderizarOrden();