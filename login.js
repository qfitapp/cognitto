<!DOCTYPE html>
<html>
  <head>
    <title>Login Form</title>
  </head>
  <body>
    <h1>Login Form</h1>
    <form id="login-form">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>
      <br>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      <br>
      <button type="submit">Log in</button>
    </form>
    <div id="error-message" style="display: none; color: red;"></div>
    <script src="https://sdk.amazonaws.com/js/aws-sdk-2.898.0.min.js"></script>
    <script>
      AWS.config.region = 'us-east-1'; // Replace with the region of your user pool
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'YOUR_IDENTITY_POOL_ID' // Replace with your identity pool ID
      });
      var cognitoUserPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool({
        UserPoolId: 'YOUR_USER_POOL_ID', // Replace with your user pool ID
        ClientId: 'YOUR_APP_CLIENT_ID' // Replace with your app client ID
      });

      document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails({
          Username: email,
          Password: password
        });
        var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser({
          Username: email,
          Pool: cognitoUserPool
        });
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function(result) {
            console.log('access token + ' + result.getAccessToken().getJwtToken());
            window.location.href = 'index.html'; // Replace with the URL of your app's main page
          },
          onFailure: function(err) {
            console.log(err);
            document.getElementById('error-message').innerHTML = err.message;
            document.getElementById('error-message').style.display = 'block';
          }
        });
      });
    </script>
  </body>
</html>
