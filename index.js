
var express = require('express');
var app = express();
var cors = require('cors');

const formidableMiddleware = require('express-formidable');


const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

//app.use(upload.array());

//app.use(express.json());

//permitir cualquier origen
app.use(cors({
  origen: '*'
}));





//ruta /
app.get('/',[], async (req, res)=>{
res.sendFile(__dirname+'/index.html');
});

//ruta /test
app.get('/test',[], async (req, res)=>{
res.json({ msg:'ruta de prueba' });
});


    

//ruta archivo audio
app.use('/audio-uno.flac', express.static(__dirname + '/audio-uno.flac'));

//ruta archivo audio
app.use('/audio-dos.flac', express.static(__dirname + '/audio-dos.flac'));

//comando para convertir audio en flac
//para ser soportado por google speech
//no pude realizar la prueba con mp3 o wav
//sox audio-dos.mp3 --rate 16k --bits 16 --channels 1 audio-dos.flac


//ruta audio base64
app.get('/audio-encode',[], async (req, res)=>{

const fs = require('fs');
// Reads a local audio file and converts it to base64
const file = fs.readFileSync('./audio-uno.flac');
const audioBytes = file.toString('base64');
//data:audio/flac;base64,
res.send(audioBytes);

});



//ruta audio-uno
app.get('/audio-uno',[], async (req, res)=>{

const fs = require('fs');
// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();


/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */

//configuracion y archivo request
const filename = './audio-uno.flac';
const encoding = 'FLAC';
const sampleRateHertz = 16000;
const languageCode = 'es-ES';

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
    enableAutomaticPunctuation: false,
    enableWordTimeOffsets: false,
    //model: 'phone_call', 
  },
  interimResults: false, // If you want interim results, set this to true  
};

// Stream the audio to the Google Cloud Speech API
const recognizeStream = client
  .streamingRecognize(request)
  .on('error', console.error)
  .on('data', data => {
    
    //respuesta traduccion audio
    console.log(`Transcription: ${data.results[0].alternatives[0].transcript}`);
    res.json({ msg:data.results[0].alternatives[0].transcript }); 

  });

// Stream an audio file from disk to the Speech API, e.g. "./resources/audio.raw"
fs.createReadStream(filename).pipe(recognizeStream);

});


//ruta audio-uno
app.get('/audio-dos',[], async (req, res)=>{

const fs = require('fs');
// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();


/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */

//configuracion y archivo request
const filename = './audio-dos.flac';
const encoding = 'FLAC';
const sampleRateHertz = 16000;
const languageCode = 'es-ES';

const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
    enableAutomaticPunctuation: false,
    enableWordTimeOffsets: false,
    //model: 'phone_call', 
  },
  interimResults: false, // If you want interim results, set this to true  
};

// Stream the audio to the Google Cloud Speech API
const recognizeStream = client
  .streamingRecognize(request)
  .on('error', console.error)
  .on('data', data => {
    
    //respuesta traduccion audio
    console.log(`Transcription: ${data.results[0].alternatives[0].transcript}`);
    res.json({ msg:data.results[0].alternatives[0].transcript }); 

  });

// Stream an audio file from disk to the Speech API, e.g. "./resources/audio.raw"
fs.createReadStream(filename).pipe(recognizeStream);

});






//iniciar servicio
app.listen(4600, function () {
  console.log('Listening on port 4600!');
});





