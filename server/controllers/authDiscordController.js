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

const refresh_token = (refresh_token) => {
  return new URLSearchParams({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    grant_type: "refresh_token",
    refresh_token: refresh_token,
  });
};

const LoggedIn = async (req, res) => {
  try {
    //Look at cookie, grab current token
    //If non exists, return not logged in state
    const token = req.cookies.token;
    if (!token) {
      return res.json({ loggedIn: false });
    }

    const { user } = jwt.verify(token, process.env.TOKEN_SECRET);
    const newToken = jwt.sign({ user }, process.env.TOKEN_SECRET, {});

    //Reset token in cookie
    res.cookie("token", newToken, {
      maxAge: config.tokenExpiration,
      httpOnly: true,
    });
    res.json({ loggedIn: true, user });
  } catch (err) {
    res.json({ loggedIn: false });
  }
};




//This will actually get the authorization code
const DiscordAuth = async (req, res) => {
  const { code } = req.query;
  if (code) {
    try {
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

      const userResult = await axios.get("https://discord.com/api/users/@me", {
        headers: {
          Authorization: `${oauthData.token_type} ${oauthData.access_token}`,
        },
      });

      const { id, username, avatar } = userResult.data;
      const user = { id, username, avatar };
      const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {});
      res.cookie("token", token, {
        httpOnly: true,
      });
      res.redirect('http://localhost:5173/')
      /*
      res.json({
        user,
      });
      */



    } catch (error) {
      console.error(error);
    }
  }
};

module.exports = {
  DiscordAuth,
  LoggedIn,
};
