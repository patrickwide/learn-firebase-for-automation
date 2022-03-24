const functions = require("firebase-functions");
const {Client} = require("whatsapp-web.js");
const qrcode = require('qrcode-terminal');
const http = require('http');





exports.helloWorld = functions
    .runWith({
      timeoutSeconds: 120,
      memory: "2GB",
    })
    .https.onRequest((request, response) => {
      functions.logger.info("Hello logs!", { structuredData: true });
        // open a new browser
      const client = new Client({ args: ["--no-sandbox"] });
      // take data from the url (id)(list of contacts,name and phone numbers)
      const data = request.query.data || "data";

      const json_data = JSON.parse(data)
      console.log(json_data);

      // Usage!
      sleep(500).then(() => {
      client.on("qr", (qr) => {
        
        console.log(qr);
        console.log(`user id : ${json_data.id}`);
        console.log(`qr code : ${qr}`);


        // SEND THE QR CODE TO THE DATA BASE USING A DJANGO
        // REST API WHARE THE REACT APP WILL TAKE IT AND
        // PRSENT IT TO THE USER TO SCAN

        // qrcode.generate(qr, { small: true });
            
        });
                
      });

      client.on('ready', () => {
        
          console.log('Client is ready!');
          response.send("done")

        });

        client.initialize();

    });

/**
 * Adds two numbers together.
 * @sleep {int} num1 The first number.
 * @param {int} time The second number.
 * @return {int} The sum of the two numbers.
 */
function sleep(time) {
  // do the sleep
  return new Promise((resolve) => setTimeout(resolve, time));
}



exports.sendQrFunction = functions.https.onRequest((request, response) => {
  response.send("hello from firebase");
});




















































// const functions = require("firebase-functions");
// const {Client} = require("whatsapp-web.js");
// const client = new Client({args: ["--no-sandbox"]});
// client.initialize();

// exports.trigerBrowser = functions
//     .runWith({
//       timeoutSeconds: 120,
//       memory: "2GB",
//     })
//     .https.onRequest(async (request, response) => {

//     sleep(500).then(() => {
      
//       client.on('qr', (qr) => {
//         response.send(qr);
//         console.log('QR RECEIVED', qr);
//       });

//     });

//     // client.on('ready', () => {
//     //   console.log('Client is ready!');
//     //   response.send("done");
//     // });

// });




// function sleep(time) {
//   // do the sleep
//   return new Promise((resolve) => setTimeout(resolve, time));
// }



// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});

//   response.send("hello from firebase!");
//   console.log('sent');


// });
