const express = require('express');
const app = express();
const fs = require('fs');
const faker = require('faker');
const csv = require('csv-parser');
const bodyParser = require('body-parser');  // Agrega esta línea

const port = 3000;

app.use(express.static('logic'));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas para las páginas HTML
app.get('/', (req, res) => {
    res.render('layout', { view: 'home' });
});

app.get('/divisa', (req, res) => {
    res.render('layout', { view: 'divisa' });
});



// Ruta para la API de tasas de cambio de divisas (simulada)
app.get('/api/divisas', (req, res) => {
    // Datos simulados
    const tasasDeCambio = {
        USD: 1.0,
        EUR: faker.random.number({ min: 0.7, max: 1.5 }),
        GBP: faker.random.number({ min: 0.6, max: 0.9 }),
        JPY: faker.random.number({ min: 100, max: 150 }),
        AUD: faker.random.number({ min: 1.2, max: 1.5 })
        // Agrega más divisas según sea necesario
    };

    res.json(tasasDeCambio);
});

// Rutas y funcionalidades para los ingresos
app.get('/ingresos', (req, res) => {
    const ingresos = [];

    fs.createReadStream('ingresos.csv')
        .pipe(csv())
        .on('data', (row) => {
            ingresos.push(row);
        })
        .on('end', () => {
            res.render('layout', { view: 'ingresos', ingresos });
        });
});

app.post('/editar-ingreso', (req, res) => {
    const { fecha, concepto, monto, indice } = req.body;
    const ingresos = [];

    fs.createReadStream('ingresos.csv')
        .pipe(csv())
        .on('data', (row) => {
            ingresos.push(row);
        })
        .on('end', () => {
            // Actualiza el ingreso en el array
            ingresos[indice] = { Fecha: fecha, Concepto: concepto, Monto: monto };

            // Vuelve a escribir el CSV con los datos actualizados
            const csvStream = fs.createWriteStream('ingresos.csv');
            csvStream.write('Fecha,Concepto,Monto\n');
            ingresos.forEach((ingreso) => {
                csvStream.write(`${ingreso.Fecha},${ingreso.Concepto},${ingreso.Monto}\n`);
            });
            csvStream.end();

            res.redirect('/ingresos');
        });
});

app.post('/eliminar-ingreso', (req, res) => {
    const { indice } = req.body;
    const ingresos = [];

    fs.createReadStream('ingresos.csv')
        .pipe(csv())
        .on('data', (row) => {
            ingresos.push(row);
        })
        .on('end', () => {
            // Elimina el ingreso del array
            const ingresoEliminado = ingresos.splice(indice, 1)[0];

            // Vuelve a escribir el CSV con los datos actualizados
            const csvStream = fs.createWriteStream('ingresos.csv');
            csvStream.write('Fecha,Concepto,Monto\n');
            ingresos.forEach((ingreso) => {
                csvStream.write(`${ingreso.Fecha},${ingreso.Concepto},${ingreso.Monto}\n`);
            });
            csvStream.end();

            res.json({ success: true, ingresoEliminado });
        });
});

app.listen(port, () => {
    console.log(`La aplicación está escuchando en http://localhost:${port}`);
});
