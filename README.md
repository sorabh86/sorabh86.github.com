# Sorabh86 Profile Website
This application based on React ^18(SPA) & firebase ^9. 

## Context
- Welcome
- Register to firebase user.
- Login with email and password.
- Authentication using firbase.
- 

## Instructions
1. Register on [Firebase](https://console.firebase.google.com/) & create a account.
2. Login to your account
3. You will find a button `Add App` -> `Web` -> `Add Firebase to your web app`
4. Give your `aap-name` & submit, it will give you javascript code to connect to database.
5. Go to `Authentication` -> `Sign-in method` & enable Email/Password.
6. Go to `Authentication` -> `Settings` -> `Authorized domains` & add your domains where you are goint to connect.
7. Create your react app using `npx create-react-app <myapp>`
8. Code your application.
9. gh-pages module for publish folder in separate branch
```cmd
# Install
npm -i gh-pages --save-dev
```
10. Add scripts into package.json file
```json
{
    // some values
    scripts: {
        "predeploy" : "npm run build",
        "deploy" : "gh-pages -d build",
    }
    // other values
}
```
11. deploy gh-pages `npm run deploy`

##
