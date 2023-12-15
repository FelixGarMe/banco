function editarIngreso(fecha, concepto, monto, indice) {
    document.getElementById('fecha').value = fecha;
    document.getElementById('concepto').value = concepto;
    document.getElementById('monto').value = monto;
    document.getElementById('indice').value = indice;
    $('#editarIngresoModal').modal('show');
}    
function eliminarIngreso(indice) {
    if (confirm('¿Estás seguro de que deseas eliminar este ingreso?')) {
        // Envía una solicitud al servidor para eliminar el ingreso
        fetch('/eliminar-ingreso', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ indice }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // Recarga la página después de eliminar el ingreso
                location.reload();
            } else {
                alert('Error al eliminar el ingreso.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error al eliminar el ingreso.');
        });
    }
}