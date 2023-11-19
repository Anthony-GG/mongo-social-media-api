// thoughtModel.js

const { Schema, model } = require('mongoose');

// Reaction schema
const reactionSchema = new Schema({
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  });

  //Thought schema
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
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Virtual for reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

function dateFormat(timestamp) {
    return timestamp.toISOString();
  }
  

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
