// Name: Add Comment
// Path: /add_comment
// Check for valid Twilio signature = CHECKED

const got = require('got');

exports.handler = function (context, event, callback) {
  let response = new Twilio.Response();

  got
    .post(context.SNOW_API_ROOT + 'update_ticket', {
      body: JSON.stringify({ ticketNumber: event.ticketNumber, comment: event.comment }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + Buffer.from(context.SNOW_USERNAME + ':' + context.SNOW_PASSWORD).toString('base64'),
      },
      json: true,
    })
    .then(function (data) {
      response.appendHeader('Content-Type', 'application/json');
      response.setBody(data.body);
      callback(null, response);
    })
    .catch(function (error) {
      response.appendHeader('Content-Type', 'plain/text');
      response.setBody(error.message);
      response.setStatusCode(500);
      callback(response);
    });
};
