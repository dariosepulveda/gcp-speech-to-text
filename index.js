var express = require('express');
var app = express();
var cors = require('cors');

app.use(express.json());

app.use(cors({
  origen: '*'
}));

app.get('/',[], async (req, res)=>{
res.json({ msg:'hola Felipe!' }); 
});

app.listen(4600, function () {
  console.log('Listening on port 4600!');
});

