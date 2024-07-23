const axios = require("axios");

const DiscordAuth = async (req, res) => {
  const { code } = req.query;

  if (code) {
    try {
      const params = new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: `http://localhost:5000/discord/redirect`,
        scope: "identify",
      });

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

      console.log(userResult.data);


    } catch (error) {
      console.error(error);
    }
  }
};

module.exports = {
  DiscordAuth,
};
