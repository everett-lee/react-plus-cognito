import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
    CognitoUserAttribute,
} from 'amazon-cognito-identity-js'


const poolData = {
    UserPoolId: 'eu-west-1_axbpxcgGb',
    ClientId: '434dve789gjq7ksfnp2jf4jom8'
};
const userPool = new CognitoUserPool(poolData);

export const authenticate = (auth, f, username, password) => {
    let accessToken = false;

    const authenticationData = {
        Username: username,
        Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    var userData = {
        Username: username,
        Pool: userPool
    };

    var cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            accessToken = result.getAccessToken().getJwtToken();

            /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
            const idToken = result.idToken.jwtToken;
            console.log(accessToken)
            auth.signin(accessToken, f);
        },

        onFailure: function (err) {
            alert(err);
        },

    });
}