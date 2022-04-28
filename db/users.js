const pool = require('./index.js');


  
const getAllUsers = async () => {

  return new Promise(function(resolve, reject) {
    pool.query('SELECT id,full_name,role FROM users', (error, result) => {
      if (error) {
          reject(error);
      } else {
          resolve(result.rows);
      };
    });
  });
}
  
  const getUser = async (userId) => {
      
    return new Promise(function(resolve, reject) {
      pool.query('SELECT id,full_name,role FROM users WHERE id = $1', [userId], (error, result) => {
        if (error) {
            reject(error);
        } else {
          resolve(result.rows[0]);
        };
      });
    });
  }

const deleteUser = async (userId) => {
  return new Promise(function(resolve, reject) {
    pool.query('DELETE FROM users WHERE id = $1 RETURNING id,full_name,role', [userId], (error, result) => {
      if (error) {
          reject(error);
      } else {
        resolve(result.rows[0]);
      };
    });
  });
};


const addUser = async (user) => {
    const { full_name, password, role } = user;
    return new Promise(function(resolve, reject) {
      pool.query('INSERT INTO users (full_name,password,role) VALUES ($1, $2, $3) RETURNING full_name,password,role', [full_name,password,role], (error, result) => {
        if (error) {
            reject(error);
        } else {
          resolve(result.rows[0]);
        };
      });
    });
};

const updateUser = async (user) => {
    return await pool.query(
        'UPDATE users SET username=$1, password=$2 WHERE users.id = $3', 
        [user.full_name,user.password,user.id], (error, result) => {
            if (error) {
                console.log(error);
                return error;
            } else {
                return result.rows[0];
            };
        });
};

module.exports =
{ getAllUsers, deleteUser, getUser, updateUser, addUser };