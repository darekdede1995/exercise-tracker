const router = require('express').Router();
let Group = require('../models/group.model');

router.route('/:id').get((req, res) => {
    Group.find({
        userid: req.params.id
    })
    .then(groups => res.json(groups))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const userid = req.body.userid;

    const newGroup = new Group ();
    newGroup.name=name;
    newGroup.userid=userid;

    newGroup.save()
    .then((group) => res.json(group))
    .catch( err => res.status(400).json('Error: '+ err));
})

module.exports = router;