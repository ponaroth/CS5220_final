const superagent = require('superagent');

// send student's info
const sendStudent = (id, firstName, lastName) => {
    superagent
      .post('/student')
      .send({ id: '1', firstName: 'John', lastName: 'Snow' }) // sends a JSON post body
      .set('X-API-Key', 'foobar')
      .set('accept', 'json')
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
}

module.exports = sendStudent;