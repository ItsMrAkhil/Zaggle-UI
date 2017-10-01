const request = require('request');


const requestURL = 'https://mobile-api.zaggle.in/api/webservices/merchant_filters';
request.post(requestURL, {
  formData: {
    sort: 'near_me',
    city: 'Pune',
    first_offset: 0,
    last_offset: 12,
    latitude: 17.4122998,
    longitude: 78.2679572,
    location: 'NIBM',
    locations: ['"NIBM"'],
  },
}, (err, httpResponse, body) => {
  if (err) {
    console.log(err);
  }
  console.log(body);
  // console.log(httpResponse);
});
