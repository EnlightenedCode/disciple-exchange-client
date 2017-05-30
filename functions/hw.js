const cors = require('cors')({ origin: true });

module.exports = class HW {
  constructor() {
  }

  getFunction() {
    return (req, res) => {
      // [END trigger]
      // [START sendError]
      // Forbidding PUT requests.
      console.log(req);
      console.log(res);
      console.log('therasdasd');
      if (req.method === 'PUT') {
        res.status(403).send('Forbidden!');
      }



      console.log('Sending message: hello world');
      res.status(200).send('hello world');
      // [END sendResponse]
    }
  }
};