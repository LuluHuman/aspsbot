exports.router = (database) => {
	try{
  function makeToken() {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
      var charactersLength = characters.length;
      for ( var i = 0; i < 30; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


  const { encode, stringify } = require('querystring');
  const { get, post } = require('axios');
  const { Router } = require('express');

  const router = Router();

  const OAuthScope = ['identify', 'email', 'guilds'].join(' ');
  const OAuthData = encode({
      response_type: 'code',
      client_id: "869531206302175322",
      redirect_uri: `https://asps.mason-bot.xyz/oauth/callback`,
      scope: OAuthScope
  });

  router.get('/login', (req, res) => {
      req.redirect = req.query.redirect;
      res.redirect(`https://discordapp.com/oauth2/authorize?${OAuthData}`);
  });
  //------------------------------------------------------------------
  router.get('/callback', async (req, res) => {
      //res.status(429).redirect('/429');
      if (!req.query.code) return res.status(404).redirect('/404');
      const { data } = await post('https://discordapp.com/api/v7/oauth2/token', stringify({
          client_id: "869531206302175322",
          client_secret: "PTodvKZjIJjHU_5NB68F-sNLdWu209Hf",
          grant_type: 'authorization_code',
          code: req.query.code,
          redirect_uri: `https://asps.mason-bot.xyz/oauth/callback`
      }), {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      });

      if (data.scope !== OAuthScope) return res.status(403).send(`Expected scope "${OAuthScope}" but received scope "${data.scope}"`);

      const userData = await get('https://discordapp.com/api/v7/users/@me', {
          headers: {
              'Authorization': `Bearer ${data.access_token}`
          }
      });
      const user = userData.data
      var Cookies = require('cookies')
      var cookies = new Cookies(req, res)
      const token = makeToken()

      const time = Date.now() + (10 * 365 * 24 * 60 * 60)
      cookies.set('token', token, { httpOnly: false, expires: new Date(time)})
      database.set(token, {
        username: user.username,
        discriminator: user.discriminator,
        id: user.id,
        avarar: user.avatar
      })

      res.redirect("https://asps.mason-bot.xyz");
      console.log(database)
  });
  //------------------------------------------------------------
  router.get('/logout', (req, res) => {
      var Cookies = require('cookies')

      var cookies = new Cookies(req, res);
      cookies.set('username', "LAMBSAUCE", { expires: new Date(Date.now()) });
      cookies.set('discriminator', "LAMBSAUCE", { expires: new Date(Date.now()) });
      cookies.set('id', "LAMBSAUCE", { expires: new Date(Date.now()) });
      cookies.set('avatar', "LAMBSAUCE", { expires: new Date(Date.now()) });
      res.redirect('/');
  });

  return router;
	} catch (err) { require("./../config/errorHandler")(err, __filename) }
}
