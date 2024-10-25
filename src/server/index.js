const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');

dotenv.config();

const MEAN_CLOUD_API_URL = 'https://api.meaningcloud.com/sentiment-2.1';
const MEAN_CLOUD_API_KEY = process.env.MEAN_CLOUD_API_KEY || 8000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.sendFile(path.resolve('src/client/views/index.html'));
});

app.post('/add-url', async (req, res) => {
  const { articleUrl } = req.body;
  const meaningCloudUrl = `${MEAN_CLOUD_API_URL}?key=${MEAN_CLOUD_API_KEY}&url=${articleUrl}&lang=en`;

  try {
    const response = await axios(meaningCloudUrl);
    console.log(response.data);
    const {
      sentence_list,
      score_tag,
      agreement,
      subjectivity,
      confidence,
      irony,
    } = response.data;

    if (sentence_list && sentence_list.length > 0) {
      res.send({
        text: sentence_list[0].text || '',
        score_tag: score_tag,
        agreement: agreement,
        subjectivity: subjectivity,
        confidence: confidence,
        irony: irony,
      });
    } else {
      res.status(404).send({ error: 'No sentences found' });
    }
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    res.status(500).send({ error: 'Error processing request' });
  }
});

app.get('/test', function (req, res) {
  res.send(mockAPIResponse);
});


const server = app.listen(8000, (error) => {
  if (error) throw new Error(error);
  console.log('Server listening on port 8000!');
});


module.exports = {
  app,
  server, 
};
