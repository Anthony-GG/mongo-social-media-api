const { Schema, model } = require('mongoose');

const reactionSchema = new Schema({
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
    get: (timestamp) => dateFormat(timestamp),
  },
  thoughtId: {
    type: Schema.Types.ObjectId,
    ref: 'Thought',
    required: true,
  },
});

function dateFormat(timestamp) {
  // Format timestamp here
  return timestamp.toISOString();
}

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;
