const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'Lisdallan96',
    database: 'Prueba',
    port: '5432'
});

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM hijo ORDER BY id ASC');
    res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM hijo WHERE id = $1', [id]);
    res.json(response.rows);
};

const createUser = async (req, res) => {
    const { name, birth, mother, father} = req.body;
    const response = await pool.query('INSERT INTO hijo (name,birth,mother,father) VALUES ($1,$2,$3,$4)',[name, birth, mother, father]);
    res.json({
        message: 'User Added successfully',
        body: {
            user: { name, birth, mother, father}
        }
    })
};

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const {name, birth, mother, father } = req.body;

    const response =await pool.query('UPDATE hijo SET name = $1, birth = $2,mother = $3,father = $4 WHERE id = $5', [
        name,
        birth,
        mother,
        father,
        id
    ]);
    res.json('User Updated Successfully');
};

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM hijo where id = $1', [
        id
    ]);
    res.json(`hijos ${id} deleted Successfully`);
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
