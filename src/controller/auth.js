const AuthModel = require('../models/auth')

const getAllUsers = async (req, res) => {
    try {
        const [data] = await AuthModel.getAllUsers();

        res.json({
            message: 'GET all users success',
            data : data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}


const register = async (req, res) => {
    const {body} = req
    try {
        await AuthModel.register(body)
        res.json({
            message: 'register success',
            data: body
        })

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const login = async (req, res) => {
    const { name, password } = req.body;
    try {
        const [users] = await AuthModel.login(name, password);

        if (users.length > 0) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports ={
    getAllUsers,
    register,
    login,
}



