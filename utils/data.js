const { Types } = require('mongoose');

const names = [
    'Liam Blad',
    'Olivia Wild',
    'Noah Hope',
    'Emma Watt',
    'Charlotte Love',
    'Oliver Hunt',
    'Elijah Mitchell',
    'Amelia James',
    'James King',
    'Ava Allen'
]

const usernames = [
    'miaL',
    'aivilO',
    'haoN',
    'ammE',
    'ettoloraC',
    'revilO',
    'hajilE',
    'ailemA',
    'semaJ',
    'avA'
]

const emails = [
    'Liam@email.com',
    'Olivia@email.com',
    'Noah@email.com',
    'Emma@email.com',
    'Charlotte@email.com',
    'Oliver@email.com',
    'Elijah@email.com',
    'Amelia@email.com',
    'James@email.com',
    'Ava@email.com'
]

const thoughts = [
    'Is the earth round?',
    'Are aliens real?',
    'The NFL is scripted',
    'Coding is cool',
    'Coding is interesting',
    'Coding is life',
    'Step Brothers is the best movie ever',
    'What would Jesus Do?',
    'Twitter is awesome',
    'Technology....'
]

const reactions = [
    {reactionId: new Types.ObjectId(), username:'miaL', reactionBody: 'Thats hilarious!'},

    {reactionId: new Types.ObjectId(), username: 'aivilO', reactionBody: 'HA'},

    {reactionId: new Types.ObjectId(), username: 'haoN', reactionBody: 'Nice!'},

    {reactionId: new Types.ObjectId(), username: 'ammE', reactionBody: 'Congrats!'},

    {reactionId: new Types.ObjectId(), username: 'ettoloraC', reactionBody: 'Boo'},

    {reactionId: new Types.ObjectId(), username:'revilO', reactionBody: 'Im sorry'},

    {reactionId: new Types.ObjectId(), username: 'hajilE', reactionBody: 'I disagree'},

    {reactionId: new Types.ObjectId(), username: 'ailemA', reactionBody: 'It is what it is'},

    {reactionId: new Types.ObjectId(), username: 'semaJ', reactionBody: 'Cool beans'},

    {reactionId: new Types.ObjectId(), username: 'avA', reactionBody: 'Gnarly'},

    {reactionId: new Types.ObjectId(), username:'mailliW', reactionBody: 'Bro what??'},

    {reactionId: new Types.ObjectId(), username: 'DannielleG', reactionBody: 'Sweeeeet'}
]

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets all users
function getUsers() {
    return getRandomArrItem(names).map((name, index) => ({
        name,
        username: usernames[index],
        email: emails[index]
    }));
}

// Gets all thoughts
function getThoughts() {
    return getRandomArryItem(thoughts).map((thoughtText, index) => ({
        thoughtText,
        reactions: [reactions[index]]
    }));
}

module.exports = { getUsers, getThoughts }