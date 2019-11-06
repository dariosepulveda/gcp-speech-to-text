
var express = require('express');
var app = express();
var cors = require('cors');

app.use(express.json());

app.use(cors({
  origen: '*'
}));

app.get('/',[], async (req, res)=>{



const fs = require('fs');

// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const filename = './audio.raw';
const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US';

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  },
  interimResults: false, // If you want interim results, set this to true
};

// Stream the audio to the Google Cloud Speech API
const recognizeStream = client
  .streamingRecognize(request)
  .on('error', console.error)
  .on('data', data => {
    console.log(
      `Transcription: ${data.results[0].alternatives[0].transcript}`
    );

res.json({ msg:data.results[0].alternatives[0].transcript }); 

  });

// Stream an audio file from disk to the Speech API, e.g. "./resources/audio.raw"
fs.createReadStream(filename).pipe(recognizeStream);




});

app.listen(4600, function () {
  console.log('Listening on port 4600!');
});
