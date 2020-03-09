const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/:id').get((req, res) => {

    Exercise.find({
            userid: req.params.id,
        })
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

    const pattern = req.body.pattern;
    const userid = req.body.userid;
    const name = req.body.name;
    const description = req.body.description;
    const group = {
        posses: req.body.group.posses,
        name: req.body.group.name
    };
    const repetition = {
        posses: req.body.repetition.posses,
        amount: req.body.repetition.amount
    }
    const weight = {
        posses: req.body.weight.posses,
        amount: req.body.weight.amount
    }
    const distance = {
        posses: req.body.distance.posses,
        amount: req.body.distance.amount
    }
    const duration = {
        posses: req.body.duration.posses,
        amount: req.body.duration.amount
    }


    const newExercise = new Exercise({
        pattern: pattern,
        userid: userid,
        name: name,
        description: description,
        group: group,
        repetition: repetition,
        weight: weight,
        distance: distance,
        duration: duration
    });

    newExercise.save()
        .then((exercise) => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json(req.params.id))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;