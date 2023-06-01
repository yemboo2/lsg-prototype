'use strict';

/**
 * Lamda edge method functioning ad proxy for the
 * website provide password protection.
 */
exports.handler = (event, context, callback) => {
  // Get request and request headers
  const request = event.Records[0].cf.request;
  const headers = request.headers;

  // Configure authentication
  const authUser = 'lsg';
  const authPass = 'lsg2021';
  const authUser2 = 'Start';
  const authPass2 = '!Zuschuss';

  // Construct the Basic Auth string
  const authString = 'Basic ' + new Buffer(authUser + ':' + authPass).toString('base64');
  const authString2 = 'Basic ' + new Buffer(authUser2 + ':' + authPass2).toString('base64');

  // Require Basic authentication
  if (
    typeof headers.authorization == 'undefined' ||
    !(headers.authorization[0].value == authString || headers.authorization[0].value == authString2)
  ) {
    const body = 'Unauthorized';
    const response = {
      status: '401',
      statusDescription: 'Unauthorized',
      body: body,
      headers: {
        'www-authenticate': [{ key: 'WWW-Authenticate', value: 'Basic' }],
      },
    };
    callback(null, response);
  }

  // Continue request processing if authentication passed
  callback(null, request);
};
