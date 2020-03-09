const router = require('express').Router();
let Training = require('../models/training.model');

router.route('/:id').get((req, res) => {

    Training.find({
            userid: req.params.id,
        })
        .then(trainings => {res.json(trainings)})
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

    const userid = req.body.userid;
    const description = req.body.description;
    const date = Date.parse(req.body.date);
    const exercises = req.body.exercises;

    const newTraining = new Training({
        userid: userid,
        description: description,
        date: date,
        exercises: exercises,
        finished: false,
    });

    newTraining.save()
        .then((training) => res.json(training))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req, res) => {

    Training.findById(req.params.id)
        .then(training => {
            training.userid = req.body.userid;
            training.description = req.body.description;
            training.date = Date.parse(req.body.date);
            training.exercises = req.body.exercises;
            if(req.body.finished){
                training.finished = true;
            }

            training.save()
                .then((training) => res.json(training))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
    Training.findByIdAndDelete(req.params.id)
        .then(() => res.json(req.params.id))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;