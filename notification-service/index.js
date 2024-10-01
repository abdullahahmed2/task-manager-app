const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios')

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/notify', (req, res) => {
    const { message } = req.body;
    console.log(`Notification sent: ${message}`);
    res.status(200).json({ status: 'Notification sent' });
});

app.listen(3002, () => {
    console.log('NotificationService is running on port 3002');
});
