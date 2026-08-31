const API_URL = '/api/contactos';

document.getElementById('contactoForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const mensajeError = document.getElementById('mensajeError');
  mensajeError.textContent = '';

  const contacto = {
    nombre: document.getElementById('nombre').value,
    telefono: document.getElementById('telefono').value,
    email: document.getElementById('email').value
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contacto)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Error al guardar el contacto');
    }

    document.getElementById('contactoForm').reset();
    cargarContactos();
  } catch (err) {
    mensajeError.textContent = err.message;
  }
});

async function cargarContactos() {
  try {
    const res = await fetch(API_URL);
    const contactos = await res.json();
    
    const lista = document.getElementById('listaContactos');
    lista.innerHTML = '';

    contactos.forEach(c => {
      const li = document.createElement('li');
      li.textContent = `${c.nombre} - Tel: ${c.telefono}${c.email ? '| ' + c.email : ''}`;
      lista.appendChild(li);
    });
  } catch (err) {
    console.error('Error al cargar contactos:', err);
  }
}

cargarContactos();