import User from '../models/user.model.js';
class UserDAO {
    async createUser(userData) {
        try {
            const user = new User(userData);
            await user.save();
            return user;
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    async getUserById(userId) {
        try {
            const user = await User.findById(userId).exec();
            return user;
        } catch (error) {
            throw new Error(`Error fetching user by ID: ${error.message}`);
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await User.findOne({ email }).exec();
            return user;
        } catch (error) {
            throw new Error(`Error fetching user by email: ${error.message}`);
        }
    }

    async updateUserById(userId, updateData) {
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).exec();
            return updatedUser;
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    async deleteUserById(userId) {
        try {
            await User.findByIdAndDelete(userId).exec();
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }

    async getAllUsers({ limit = 10, page = 1, sort = 'asc' }) {
        try {
            const options = {
                limit: Number(limit),
                skip: (Number(page) - 1) * Number(limit),
                sort: { createdAt: sort === 'asc' ? 1 : -1 }
            };
            const users = await User.find({}).limit(options.limit).skip(options.skip).sort(options.sort).exec();
            return users;
        } catch (error) {
            throw new Error(`Error fetching users: ${error.message}`);
        }
    }
}

export default new UserDAO();
