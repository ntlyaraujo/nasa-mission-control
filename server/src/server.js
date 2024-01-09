const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;
const MONGO_URL = 'mongodb+srv://ntlyaraujo:Z8mzOg2whO6hy2ef@cluster0.lnwomqs.mongodb.net/?retryWrites=true&w=majority'

const server = http.createServer(app);


async function startServer() {
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });

    mongoose.connection.once('connected', () => {
        console.log('Mongoose is connected!');
    });

    mongoose.connection.on('error', (err) => {
        console.error(err);
    });
}

startServer();
