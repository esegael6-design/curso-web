// Precios de referencia de los productos
const precios = {
    'Espresso Intenso': 45.00,
    'Latte Vainilla': 60.00,
    'Capuccino Canela': 55.00
};

// Cargar orden previa de localStorage o iniciar con un arreglo vacío
let orden = JSON.parse(localStorage.getItem('ordenCafeteria')) || [];

// Elementos del DOM
const listaOrden = document.getElementById('listaOrden');
const totalTexto = document.getElementById('totalTexto');
const btnVaciar = document.getElementById('btnVaciar');

// Función para actualizar y dibujar la lista de pedidos en el DOM
function renderizarOrden() {
    listaOrden.innerHTML = '';
    let totalAcumulado = 0;

    orden.forEach((item, index) => {
        totalAcumulado += item.precio;

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.nombre} - $${item.precio.toFixed(2)}</span>
            <button onclick="eliminarItem(${index})" style="background:none; border:none; color:#f38ba8; cursor:pointer; font-weight:bold;">✕</button>
        `;
        listaOrden.appendChild(li);
    });

    totalTexto.textContent = `Total: $${totalAcumulado.toFixed(2)}`;
    localStorage.setItem('ordenCafeteria', JSON.stringify(orden));
}

// Función para ordenar un producto desde los botones de las tarjetas
window.ordenar = function(nombreProducto) {
    const precio = precios[nombreProducto] || 0;
    orden.push({ nombre: nombreProducto, precio: precio });
    renderizarOrden();
};

// Función para eliminar un producto individual
window.eliminarItem = function(index) {
    orden.splice(index, 1);
    renderizarOrden();
};

// Botón para vaciar toda la orden
if (btnVaciar) {
    btnVaciar.addEventListener('click', () => {
        orden = [];
        renderizarOrden();
    });
}

// Renderizar la orden existente al cargar la página
renderizarOrden();