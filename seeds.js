const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');
const Reaction = require('./models/Reaction');

mongoose.connect('mongodb://127.0.0.1:27017/socialMediaDB', {
});

const db = mongoose.connection;

db.once('open', async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Thought.deleteMany();
    await Reaction.deleteMany();

    // Create users
    const user1 = await User.create({
      username: 'user1',
      email: 'user1@example.com',
    });

    const user2 = await User.create({
      username: 'user2',
      email: 'user2@example.com',
      friends: [user1._id],
    });

    const user3 = await User.create({
      username: 'user3',
      email: 'user3@example.com',
      friends: [user2._id],
    });

    // Create thoughts for user1
    const thought1User1 = await Thought.create({
      thoughtText: 'This is a thought from user1.',
      username: user1._id,
    });
    user1.thoughts.push(thought1User1._id)

    const thought2User1 = await Thought.create({
      thoughtText: 'Another thought from user1.',
      username: user1._id,
    });
    user1.thoughts.push(thought2User1._id)

    // Create thoughts for user2
    const thought1User2 = await Thought.create({
      thoughtText: 'Thought from user2.',
      username: user2._id,
    });
    user2.thoughts.push(thought1User2._id)

    // Create reactions for thought1User1
    await Reaction.create({
      reactionBody: 'Interesting!',
      username: user2._id,
      thoughtId: thought1User1._id,
    });

    await Reaction.create({
      reactionBody: 'Agree!',
      username: user3._id,
      thoughtId: thought1User1._id,
    });

    await user1.save()
    await user2.save()
    await user3.save()

    console.log('Seed data inserted successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Closes the connection after seeding data
    mongoose.connection.close();
  }
});
