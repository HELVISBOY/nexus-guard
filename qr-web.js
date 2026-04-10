const express = require('express');
const QRCode = require('qrcode');
const app = express();

let qrData = null;

// Simular recebimento de QR
app.get('/qr', async (req, res) => {
    if (qrData) {
        const qrImage = await QRCode.toDataURL(qrData);
        res.send(`<img src="${qrImage}" style="width:500px;height:500px">`);
    } else {
        res.send('Aguardando QR Code...');
    }
});

app.listen(3000, () => console.log('http://localhost:3000/qr'));