const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// Schema to create Reaction model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timeStamp) => dateFormat(timeStamp),
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
)

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timeStamp) => dateFormat(timeStamp),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
)

// Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query
thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
    return this.reactions.length;
});

// Initialize our Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;