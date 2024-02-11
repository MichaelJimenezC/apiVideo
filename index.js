const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

// Ruta para obtener videos por temporada
app.get('/api/videos', async (req, res) => {
  try {
    // Obtener el número de temporada de la consulta
    const season = req.query.season;

    // URL base que contiene todos los videos
    const baseUrl = 'https://elrincondegabriellayu.blogspot.com/';

    // URL específica para cada temporada
    const seasonUrls = {
      1: 'p/one-piece-audio-latino-online-de-60.html',
      2: '2022/09/one-piece-audio-latino-eps-61-al-80.html#more',
      3: '2022/09/one-piece-audio-latino-eps-81-al-100.html#more',
      4: '2022/09/one-piece-audio-latino-eps-101-al-120.html#more',
      5: '2022/09/one-piece-audio-latino-eps-121-al-140.html#more',
      6: '2022/09/one-piece-audio-latino-eps-141-al-160.html#more',
      7: '2022/09/one-piece-audio-latino-eps-161-al-180.html#more',
      8: '2022/09/one-piece-audio-latino-eps-181-al-200.html#more',
      9: '2022/09/one-piece-audio-latino-eps-201-al-220.html#more',
      10: '2022/09/one-piece-audio-latino-eps-221-al-240.html#more',
      11: '2022/09/one-piece-audio-latino-eps-241-al-260.html#more',
      12: '2022/09/one-piece-audio-latino-eps-261-al-280.html#more',
      13: '2022/09/one-piece-audio-latino-eps-281-al-300.html#more',
      14: '2022/09/one-piece-audio-latino-eps-301-al-325.html#more',
      15: '2023/04/one-piece-subtitulado-eps-326-al-340.html',
      16: '2023/04/one-piece-subtitulado-eps-341-al-360.html',
      17: '2023/04/one-piece-subtitulado-eps-361-al-380.html',
      18: '2024/01/one-piece-audio-latino-eps-381-al-400.html',
      19: '2024/01/one-piece-audio-latino-eps-401-al-407.html',
      
      // Agrega más temporadas si es necesario
    };

    // Construir la URL para la temporada seleccionada
    const seasonUrl = seasonUrls[season];

    // Realizar la solicitud a la página de la temporada específica
    const response = await axios.get(baseUrl + seasonUrl);

    // Utilizar Cheerio para analizar el HTML
    const $ = cheerio.load(response.data);

    // Extraer los enlaces de los videos
    const videoLinks = [];
    $('iframe').each((index, element) => {
      const src = $(element).attr('src');
      videoLinks.push(src);
    });

    // Devolver los enlaces de los videos como JSON
    res.json({ videoLinks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los videos de la temporada' });
  }
});
app.get('/api/seasons', async (req, res) => {
  try {
    // URL base que contiene todos los videos
    const baseUrl = 'https://elrincondegabriellayu.blogspot.com/';

    // URL específica para cada temporada
    const seasonUrls = {
      1: 'p/one-piece-audio-latino-online-de-60.html',
      2: '2022/09/one-piece-audio-latino-eps-61-al-80.html#more',
      3: '2022/09/one-piece-audio-latino-eps-81-al-100.html#more',
      4: '2022/09/one-piece-audio-latino-eps-101-al-120.html#more',
      5: '2022/09/one-piece-audio-latino-eps-121-al-140.html#more',
      6: '2022/09/one-piece-audio-latino-eps-141-al-160.html#more',
      7: '2022/09/one-piece-audio-latino-eps-161-al-180.html#more',
      8: '2022/09/one-piece-audio-latino-eps-181-al-200.html#more',
      9: '2022/09/one-piece-audio-latino-eps-201-al-220.html#more',
      10: '2022/09/one-piece-audio-latino-eps-221-al-240.html#more',
      11: '2022/09/one-piece-audio-latino-eps-241-al-260.html#more',
      12: '2022/09/one-piece-audio-latino-eps-261-al-280.html#more',
      13: '2022/09/one-piece-audio-latino-eps-281-al-300.html#more',
      14: '2022/09/one-piece-audio-latino-eps-301-al-325.html#more',
      15: '2023/04/one-piece-subtitulado-eps-326-al-340.html',
      16: '2023/04/one-piece-subtitulado-eps-341-al-360.html',
      17: '2023/04/one-piece-subtitulado-eps-361-al-380.html',
      18: '2024/01/one-piece-audio-latino-eps-381-al-400.html',
      19: '2024/01/one-piece-audio-latino-eps-401-al-407.html',
      // Agrega más temporadas si es necesario
    };

    // Construir la lista de temporadas
    const seasons = Object.keys(seasonUrls).map(seasonNumber => {
      return {
        seasonNumber: parseInt(seasonNumber),
        url: baseUrl + seasonUrls[seasonNumber]
      };
    });

    // Devolver la lista de temporadas como JSON
    res.json({ seasons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las temporadas' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
