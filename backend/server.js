const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established succesfully')
})

const exercisesRoutes = require('./routes/exercises');
const trainingsRoutes = require('./routes/trainings');
const userRoutes = require('./routes/users');
const groupRoutes = require('./routes/groups');

app.use('/api/exercises', exercisesRoutes);
app.use('/api/trainings', trainingsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);

if (process.env.NODE_ENV === 'production') {
    // app.use(express.static('../client/build'));
    app.use(express.static(path.join(__dirname, '/../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/../client/build/index.html'));
        // res.sendFile(path.resolve(__dirname, '/../client', 'build', 'index.html'));
    });
}


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

