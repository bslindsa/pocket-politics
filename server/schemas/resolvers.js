const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('games');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('games');
        },
        me: async (parent, { arg }, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('games');
            }
            throw new AuthenticationError('You must be logged in');
        },
    },


    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
    }
};

module.exports = resolvers;
