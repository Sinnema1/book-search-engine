import User from '../models/User.js'

const resolvers = {
  Query: {
      helloWorld: () => {
        return "Hello silly World!";
      },
      getSingleUser: async (_: any, __: any, { req }: { req: any }) => {
        return await User.findOne({
          $or: [{ _id: req.user ? req.user._id : req.params.id }, { username: req.params.username }],
        });
      }
    },
  };

export default resolvers;
