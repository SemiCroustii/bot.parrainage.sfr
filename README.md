# Bot.parrainage.sfr
Juste un gentil bot qui parraine à votre place :smiley: 

### Déploiement sur heroku :

    git clone https://github.com/hell0-Wor1d/bot.parrainage.sfr.git
    cd bot.parrainage.sfr
    heroku create
    heroku buildpacks:add --index 1 https://github.com/leesei/heroku-buildpack-casperjs.git
    heroku buildpacks:add --index 2 heroku/nodejs
    git push heroku master

### Configuration :
Il faut ensuite préciser vos variables avec `heroku config:set ...`:
- *LOGIN_SFR* : Identifiant du compte SFR
- *PASS_SFR* : Mot de passe du compte SFR
- *PUSHBULLET_API* : Api du compte pushbullet
- *PUSHBULLET_DEVICE_KEY* : Clé du device pushbullet à notifier

Pour parrainer l'email 'test@domaine.com' il suffit d'appeler l'url [/parrainage.sfr/test@domaine.com](#).

La page retournera alors error ou success.