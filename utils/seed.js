const connection = require('../config/connection');
const  { User, Thought }  = require('../models');
const  { getUsers, getThoughts }  = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected Successfully!');
    
    // Drop existing Users
    await User.deleteMany({});

    // Drop existing Thoughts
    await Thought.deleteMany({});

    // Creating empty array to hold thoughts
    const userThoughts = [];

    const users = getUsers();
    const thoughts = getThoughts();

    for (let i = 0; i <= 4; i++) {

        const thought = await Thought.create({...thoughts[i], username: users[i].username});

        userThoughts.push({
            ...users[i],
            thoughts: [thought._id]
        })
    }

    // Add Users to the collection and await the results
    await User.insertMany(userThoughts);

    // Log the data to the console to show relationships 
    console.table(userThoughts);

    console.info('Seeding complete! 🌱');
    process.exit(0);
})