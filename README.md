# 3D Tune-In - Hearing test

This application is currently hosted on HEROKU -  [https://hearing-test-tq-stage.herokuapp.com/](https://hearing-test-tq-stage.herokuapp.com/)

This web app is 3D Tune-In's online hearing test.

## Deployment

The 3D Tune-In hearing test is hosted on Heroku. It is configured in the [Procfile](Procfile). To acquire permission to deploy you need to be logged in to the Heroku CLI tool as either the account owner or as an account listed as a collaborator.

There are at the moment two Heroku instance to deploy to: `hearing-test-stage` and `hearing-test-tq-stage` (`tq` stands for *trimmed* and *questionnaire*). To set these up, run the following in the repo root directory:

```sh
$ git remote add heroku-stage https://git.heroku.com/hearing-test-stage.git
$ git remote add heroku-tq-stage https://git.heroku.com/hearing-test-tq-stage.git
```

You can then deploy by pushing the `master` branch to the heroku remote(s):

```sh
git push heroku-stage master
```
