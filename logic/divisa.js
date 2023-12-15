const cantidadUSDInput = document.getElementById('cantidadUSD');
const divisaDestinoSelect = document.getElementById('divisaDestino');
const resultadoElement = document.getElementById('resultado');

async function convertir() {
    const cantidadUSD = cantidadUSDInput.value;
    const divisaDestino = divisaDestinoSelect.value;

    try {
        const response = await fetch(`/api/divisas`);
        const tasasDeCambio = await response.json();

        const tasaDeCambio = tasasDeCambio[divisaDestino];
        const resultado = cantidadUSD * tasaDeCambio;

        resultadoElement.innerText = `Resultado: ${cantidadUSD} USD = ${resultado.toFixed(2)} ${divisaDestino}`;
    } catch (error) {
        console.error('Error al obtener tasas de cambio:', error);
    }
}

// Escucha eventos de cambio en los campos de entrada y realiza la conversión en tiempo real
cantidadUSDInput.addEventListener('input', convertir);
divisaDestinoSelect.addEventListener('change', convertir);

// Realiza la conversión inicial al cargar la página
convertir();