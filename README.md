## .env variables

1. CLIENT_ID
2. ISSUER
3. REDIRECT_URI

Installation:
-This app is ran in expo, so we need to install expo in order for it to work. Do not make the mistake of trying to install React Native Cli components, just worry about expo installation.

1. Install NodeJs:
   https://nodejs.org/en/

2. Install Expo in Command Line:
   npm install -g expo-cli

3. Install Android Studio:
   https://developer.android.com/studio/

4. Run Android Studio
   -Go to Configure
   -SDK Manager
   -SDK Tools
   -Check these packages:
   -Android SDK Build-Tools
   -Android Emulator
   -Android SDK Platform-Tools
   -Google Play services
   -Intel x86 Emulator Accelerator (HAXM installer)
   -Click Apply, then OK.

5. Go to Configure:
   -AVD Manager
   -Create New Virtual Device
   -For this example I will use the Pixel 2.
   -Click Pixel 2, then Next.
   -Download Pie, then select it, then click Next.
   -Click Finish

6. Go to Configure:
   -AVD Manager
   -Click the Green Play button on the right side of the screen
   -This will run the emulator, may take a while to be fully functional.

7. Once you clone the repo from GitHub open it up inside of VS Code.
   -Inside your terminal in VS code run:
   -npm i
   -(This will make sure you have all the packages and dependencies installed, may take a while)
   -Once all of that is done and your emulator is running in the background run the command in VS code terminal:
   -expo start
   -You should have a window pop up in your browser, this window is the expo command line.
   -Either in VS code type the letter 'a' to have your app run on your Android emulator, or click 'Run on Android device/emulator' in the expo command line inside the browser.
   -Expo will detect any Android emulators that are currently running on your machine and install both expo and the app you are trying to use. (Will take a while for first build).
   -(If app crashes press 'a' in terminal or click 'Run on Android device/emulator' in expo client again, sometimes this happens).
