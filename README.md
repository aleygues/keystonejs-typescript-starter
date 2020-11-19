# KeystoneJS Stater

How to setup the project:

- clone this repo
- install npm dependencies with `npm i`
- launch the project with `npm start`

You can also use `npm run build` and then `npm run launch`

To create an Admin user the first time, you have to disable the auth by setting the `DISABLE_AUTH` env variable when you are launching the app:

`export DISABLE_AUTH=true & npm start`

Navigate to the admin app and create an admin user. You can then relaunch your app without the `DISABLE_AUTH` env variable and try to log in!