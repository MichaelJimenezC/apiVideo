const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.get('/api/videos', async (req, res) => {
  try {
    // Realiza la solicitud a la página de destino
    const response = await axios.get('https://elrincondegabriellayu.blogspot.com/p/one-piece-audio-latino-online-de-60.html');
    
    // Utiliza Cheerio para analizar el HTML
    const $ = cheerio.load(response.data);

    // Extrae los enlaces de los videos
    const videoLinks = [];
    $('iframe').each((index, element) => {
      const src = $(element).attr('src');
      videoLinks.push(src);
    });

    // Devuelve los enlaces de los videos como JSON
    res.json({ videoLinks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los videos' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});