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

getRefreshTokenParams = (token) => {
  return new URLSearchParams({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "refresh_token",
    refresh_token: token,
  });
};

const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction, // Use secure cookies in production (requires HTTPS)
    sameSite: isProduction ? 'None' : 'Lax', // 'None' for production, 'Lax' for development

  };
};

const LoggedIn = async (req, res) => {
  try {
    // Log request cookies


    const JWTCookieToken = req.cookies.token;

    if (!JWTCookieToken) {
      return res.json({ loggedIn: false, message: req.cookies.token });
    }

    //verify and retrieve refresh token
    const access_token = jwt.verify(JWTCookieToken, process.env.TOKEN_SECRET);

    //USING THIS METHOD, we want to get a new refresh token everytime
    /*

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
    */

    //Resets token

    //get the new refresh token
    /*
    const new_token = output.data.refresh_token
    const newJWTToken = jwt.sign(new_token, process.env.TOKEN_SECRET, {})
    */

    const newToken = jwt.sign(access_token, process.env.TOKEN_SECRET, {});
    res.cookie("token", newToken,  getCookieOptions());

    //After we sign the new JWT token, use the token we just extracted to get the info for the user
    const userResult = await axios.get("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const { id, username, avatar } = userResult.data;
    const user = { id, username, avatar };
    //console.log(user)
    res.json({ loggedIn: true, user });
  } catch (err) {
    //console.error(err);
    res.json({ loggedIn: false });
  }
};

const Logout = async (req, res) => {
  try {
    const token = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET);

    // Prepare the request data
    const data = new URLSearchParams({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      token: token, // This should be the actual OAuth2 token from Discord
    });

    // Send the POST request to revoke the token
    const output = await axios.post(
      "https://discord.com/api/oauth2/token/revoke",
      data.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );



    // Clear cookies and respond
    res.clearCookie("token");

    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Logout failed" });
  }
};

//After clicking on the oAuth link, redirects to our desired url /discord/ with the fragment
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
      

      //Then using the access token, we can just get the user's data
      const userResult = await axios.get("https://discord.com/api/users/@me", {
        headers: {
          Authorization: `${oauthData.token_type} ${oauthData.access_token}`,
        },
      });

      const { id, username, avatar } = userResult.data;

      const user = { id, username, avatar };

      //additionally, since we successfully login, we should store the refresh token, so everytime we load the page, we can check the data by grabbing refresh token

      /*
      const token = jwt.sign(oauthData.refresh_token, process.env.TOKEN_SECRET, {});
      
  */
      const token = jwt.sign(
        oauthData.access_token,
        process.env.TOKEN_SECRET,
        {}
      );

      res.cookie("token", token, getCookieOptions());

      res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      console.error(error);
      
      res.status(500).json({ message: "Failed to login" });
    }
  }
};

module.exports = {
  DiscordAuth,
  LoggedIn,
  Logout,
};
