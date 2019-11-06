async function main() {
  // Imports the Google Cloud client library
  const speech = require('@google-cloud/speech');
  const fs = require('fs');

  // Creates a client
  const client = new speech.SpeechClient();

  // The name of the audio file to transcribe
  const fileName = './audio.mp3';

  // Reads a local audio file and converts it to base64
  //const file = fs.readFileSync(fileName);
  const audioBytes = fs.readFileSync(fileName).toString('base64');

  //console.log(audioBytes)

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    content: audioBytes,
  };
  const config = {
    encoding: `LINEAR16`,
    sampleRateHertz: 16000,
    languageCode: `es-ES`,
    //model: `phone_call`,
  };
  const request = {
    audio: audio,
    config: config,
  };

 const [response] = await client.recognize(request);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');

  console.log(response);
  
}
main().catch(console.error);