import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.hello = functions.https.onRequest((req, res) => {
  const name = req.query.name;

  const response = `Hello Cloud Functions ${name ? name : ''}`;
  res.status(200).json({ response });
});
