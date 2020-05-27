const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: '8968748392c14bdf9a9a8a27d9e9216e'
   });

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('anable to work with API'))
}
   
const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
  }

  module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
};