## .env variables

1. CLIENT_ID
2. ISSUER

## File Stucture:

1. This app uses React Navigation 5, navigation is how the user can switch between screens. At the moment of writing this there are not a lot of video tutorials that use Navigation 5 on Youtube, though, the documentation on the React Navigation website has a great tutorial page for how to manage through the screens. https://reactnavigation.org/docs/getting-started

2. The src folder was made by the team to make navigating inside one folder easier, and when saving a file as index.js inside a folder you do not need to specify the file path when importing.

3. Every feature for the app is separated into different folders according to their respective folder name.

4. Actions, reducers and store all use Redux while Routes is the Navigation 5 way to get around the app.

5. Styles are a separate folder meant to make the files less cluttered when designing them.

## Installation:

-This app is ran in expo, so we need to install expo in order for it to work. Do not make the mistake of trying to install React Native Cli components, just worry about expo installation.

1. Install NodeJs:
   https://nodejs.org/en/

2. Install Expo in Command Line:
   npm install -g expo-cli

3. Install Android Studio:
   https://developer.android.com/studio/

4. Run Android Studio

   - Go to Configure
   - SDK Manager
   - SDK Tools
   - Check these packages:
   - Android SDK Build-Tools
   - Android Emulator
   - Android SDK Platform-Tools
   - Google Play services
   - Intel x86 Emulator Accelerator (HAXM installer)
   - Click Apply, then OK.

5. Go to Configure:

   - AVD Manager
   - Create New Virtual Device
   - For this example I will use the Pixel 2.
   - Click Pixel 2, then Next.
   - Download Pie, then select it, then click Next.
   - Click Finish

6. Go to Configure:

   - AVD Manager
   - Click the Green Play button on the right side of the screen
   - This will run the emulator, may take a while to be fully functional.

7. Once you clone the repo from GitHub open it up inside of VS Code.
   - Inside your terminal in VS code run:
   - npm i
   - (This will make sure you have all the packages and dependencies installed, may take a while)
   - Once all of that is done and your emulator is running in the background run the command in VS code terminal:
   - expo start
   - You should have a window pop up in your browser, this window is the expo command line.
   - Either in VS code type the letter 'a' to have your app run on your Android emulator, or click 'Run on Android device/emulator' in the expo command line inside the browser.
   - Expo will detect any Android emulators that are currently running on your machine and install both expo and the app you are trying to use. (Will take a while for first build).
   - (If app crashes press 'a' in terminal or click 'Run on Android device/emulator' in expo client again, sometimes this happens).

## Configuring Okta

1. Create an Okta developer account, and create a react native application within that dev account
2. In the general settings of your app, under allowed grant types, check _Authorization Code_ and _Refresh Token_
3. Set the logout redirect URI to the same as the login redirect URI
4. On this same page you will also see your client ID, set this as an environment variable in your .env as CLIENT_ID
5. The 6 digit number in your redirect URI is your organization ID. set the ISSUER in your .env to
   https://dev-<{ORG_ID>.okta.com/oauth2/default
6. In the backend, the auth-router contains an endpoint that is calling an Okta api. The URL contains the org ID so that will need to be updated with your new org ID
7. In Login.js, there is currently a console.log of the response object coming from Okta. This contains the redirect URI that you will need to allow in your general settings in your Okta developer account. Each team member's machines will create a different redirect URI so each one will need to be added to the list of allowed redirect URIs.
