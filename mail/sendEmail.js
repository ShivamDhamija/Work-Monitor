 const mailjet = require('node-mailjet').connect(
    "07ee3e1ebfd68d2597cbee669e08d1fb",//api key
    "5aa1f08951146a8ec55954ef9b657112"//secreat key
  )
  
  module.exports = function(email,userName,userType,token ,port,callback)
  {
    const request = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'dhamijasaahb@gmail.com',
            Name: 'Check-List&Company',
          },
          To: [
            {
              Email: email,
              Name: userName,
            },
          ],
          Subject: 'Confirm Email',
          TextPart: 'Hopfull we will look you in futuer',
          HTMLPart: `<h1>${userName} Click below to confirm your Email</h1>
          <br/>
          <br/>
            <a href="http://${port}/verifymail/${token}/${userName}/${userType}"> Click here !!!!</a>
          `/*a m panga h kyoki local host kese check karo */
        },
      ],
    })
  
  
    request
      .then(result => {
        //console.log(result.body)
        callback(null, result.body)
      })
      .catch(err => {
        //console.log(err);
        callback(err, null)
  
      })
  }
  