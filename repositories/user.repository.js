import UserDAO from '../dao/userDAO.js';

class UserRepository {
    async createUser(userData) {

        const user = await UserDAO.createUser(userData);
        return user;
    }
    async findUserById(userId) {

        const user = await UserDAO.getUserById(userId);
        return user;
    }
}

export default new UserRepository();
