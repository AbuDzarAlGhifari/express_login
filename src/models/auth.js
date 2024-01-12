const dbPool = require('../config/database')

const getAllUsers = () => {
    const SQLQuery = 'SELECT * FROM auth'

    return dbPool.execute(SQLQuery)
}


const register = (body) => {
    const SQLQuery = `  INSERT INTO auth (name, password) 
                        VALUE ('${body.name}', '${body.password}')`
    
    return dbPool.execute(SQLQuery)
}

const login = (name, password) => {
    const SQLQuery = `SELECT * FROM auth WHERE name='${name}' AND password='${password}'`;
    return dbPool.execute(SQLQuery);
}

module.exports = {
    getAllUsers,
    register,
    login,
}
