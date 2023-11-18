const { Schema, model } = require('mongoose');

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
          type: String,
          required: true,
        },
        reactions: [reactionSchema],
      },
      {
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
      }
    );

//Returns - Number of reactions on thought's reaction array
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });
  

const User = model('User', userSchema);

module.exports = User;