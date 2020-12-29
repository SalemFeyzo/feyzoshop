import bcrybt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrybt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Ahmed Feyzo',
    email: 'ahmedfeyzo@gmail.com',
    password: bcrybt.hashSync('123456', 10),
  },
  {
    name: 'Muhammed Feyzo',
    email: 'muhammedfeyzo@gmail.com',
    password: bcrybt.hashSync('123456', 10),
  },
]

export default users
