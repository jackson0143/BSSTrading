const axios = require("axios");
const jwt = require("jsonwebtoken");

const getTokenParams = (code) => {
  return new URLSearchParams({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code,
    grant_type: "authorization_code",
    redirect_uri: process.env.REDIRECT_URL,
    scope: "identify",
  });
};

getRefreshTokenParams = (token)=> {
  return new URLSearchParams({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: token
  });
}





const LoggedIn = async (req, res) => {
  try {
    // Get the JWT token first
    const token = req.cookies.token
    console.log(token)
    //if (!token) return res.json({ loggedIn: false })


    //verify and retrieve refresh token
    const actual_token= jwt.verify(token, process.env.TOKEN_SECRET)
    console.log("actual token is "+actual_token)
    params = getRefreshTokenParams(actual_token);

    //now we can get the new token
    const output = await axios.post(
      "https://discord.com/api/oauth2/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    //get the new refresh token
    console.log(output.data)
    const new_token = output.data.refresh_token
    const newJWTToken = jwt.sign(new_token, process.env.TOKEN_SECRET, {})


    res.cookie('token', newJWTToken, {
      httpOnly: true,
    })
 
    res.json({ loggedIn: true, new_token})
  
  } catch(err){
    console.error(err)
    res.json({loggedIn:false})
  }
  


    
}

const Logout = async (req, res) => {
  try {
    // Look at the cookie and grab the current token
    const token = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET);

    // Prepare the request data
    const data = new URLSearchParams({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      token: token, // This should be the actual OAuth2 token from Discord
      
    });
  
    
    // Send the POST request to revoke the token
    const output = await axios.post(
      'https://discord.com/api/oauth2/token/revoke',
      data.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    

    console.log("Logged out");

    // Clear cookies and respond
    res.clearCookie("token");

    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Logout failed" });
  }
};


//After clicking on the oAuth link, redirects to our desired url /discord/redirect with the fragment
const DiscordAuth = async (req, res) => {
  const { code } = req.query;

  if (code) {
    try {

      //We get the code from the param, and trade it for an access token here
      params = getTokenParams(code);
      const output = await axios.post(
        "https://discord.com/api/oauth2/token",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const oauthData = output.data;
      console.log(oauthData);
      
      //Then using the access token, we can just get the user's data
      const userResult = await axios.get("https://discord.com/api/users/@me", {
        headers: {
          Authorization: `${oauthData.token_type} ${oauthData.access_token}`,
        },
      });

      const { id, username, avatar } = userResult.data;

      const user = { id, username, avatar };
  
      //additionally, since we successfully login, we should store the refresh token, so everytime we load the page, we can check the data by grabbing refresh token
      const token = jwt.sign(oauthData.refresh_token, process.env.TOKEN_SECRET, {});
      
  
      res.cookie("token", token, {
        httpOnly: true,
      });

      res.redirect('http://localhost:5173/')




    } catch (error) {
      console.error(error);
    }
  }
};

module.exports = {
  DiscordAuth,
  LoggedIn,
  Logout
};
