import UserDAO from '../dao/UserDAO.js';
import UserDTO from '../dto/userDTO.js';

export const getCurrentUser = async (req, res) => {
    try {
        const user = await UserDAO.getUserById(req.user.id);
        const userDTO = new UserDTO(user);
        res.status(200).json({ status: 'success', payload: userDTO });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};
