//npm install jsonwebtoken
import * as jwt from "jsonwebtoken"

export default function handler(req,res) {
    console.log(`profile api req`, req.body)

    /*
    // Test for CSRF token before execution
    if(!checkValidCSRFToken(req.body.csrf_token))
    {
        // unauthorized
		return res.status(401).end()
    }
    */


	try 
        {
            let payload = ""
            const token = req.cookies.token
            console.log(`Token:`, token)
            const jwtKey = "my_jwt_signing_key"

            // Custom authentication routine to simulate bad JWT handling
            var token_arr = token.split(".")

            // Decode first portion of token to check alg used
            let bufferObj = Buffer.from(token_arr[0], "base64");
            let decodedString = bufferObj.toString("utf8");
            let token_alg = JSON.parse(decodedString)

            if(token_alg.alg == 'none')
            {
                // Handle insecure 'none' alg tokens
		        payload = jwt.verify(token)
            }
            else
            {
                // Proper way to verify token
                // Specify acceptable algorithms for extra safety
		        payload = jwt.verify(token, jwtKey, { algorithms: ["HS256", "RS256", "HS384"] })
                console.log(payload)
            }
	    } 
    catch (err) 
        {
		    if (err instanceof jwt.JsonWebTokenError) 
            {
                // unauthorized token
			    return res.status(401).end()
		    }

		    // bad request
		    return res.status(400).end()
	    }



    // If we are here, the token is valid and we are logged in... but there's a flaw in our logic

    try
        {
            let user = {}
            user.user_id    = 0
            user.username   = ""
            user.fullname   = ""

            // ensure we have valid json
            if (typeof req.body === 'string') {
                req.body = JSON.parse(req.body)
            }
            
            // Instead of using a database, return static data
            if(req.body.user_id == 1000)
            {
                user.user_id    = 1000
                user.username   = "user@test.com"
                user.fullname   = "User Test"
            }
            else if(req.body.user_id == 1001)
            {
                user.user_id    = 1001
                user.username   = "user2@test.com"
                user.fullname   = "Some Other User"
            }
            else if(req.body.user_id == 1)
            {
                user.user_id    = 1
                user.username   = "admin@test.com"
                user.fullname   = "Admin User"
            }

            res.json(user)
  	    } 
    catch (err) 
        {
    	    console.log(err);
  	    }

}


// Hardcode a valid CSRF token
// In the real world, the CSRF token should be generated randomly 
// during user login and registered in a database
function checkValidCSRFToken(csrf_token) {
    if(csrf_token == "abc-123-random-stuff-here") {
        return true
    }
    return false
}

