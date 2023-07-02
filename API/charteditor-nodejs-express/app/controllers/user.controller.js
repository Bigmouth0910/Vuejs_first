// const db = require("../models");
// const Concept = db.conceptdata;
// const Op = db.Sequelize.Op;

const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

exports.login = (req, res)  => {
  const username = req.body.username
  const token = tokens[username]

  if (!token) {
    res.send({
      code: 60204,
      message: 'Account and password are incorrect.'
    });
  }

  res.send({
    code: 200,
    data: token
  });
};

exports.getInfo = (req, res)  => {
  const token = req.query.token;
  const info = users[token]

  if (!info) {
    res.send({
      code: 50008,
      message: 'Login failed, unable to get user details.'
    });
  }

  res.send({
    code: 200,
    data: info
  });

};

exports.logout = (req, res)  => {
  res.send({
    code: 200,
    data: 'success'
  });
};
