# Setup
If you wish to make changes to the JavaScript code or the libraries, you must perform a few steps after cloning this repository before you can run and test the app on your device.
# Instructions
1. Open your device's directory in a command prompt window or terminal and run the comnmand *npm install*. If the command throws an error, run your terminal as an administrator and try again.
2. After doing so, type in *react-native link*. The libraries may already be linked in the build files, however it is good to do this as a precaution.
3. Before you run, there are a number of files that need to be modified. You can find them in the ModifiedNodeFiles folder. An explaination will be provided below as to how and where to replace these files.
4. Navigate to /SuvienMobile/SuvienRN/node_modules/react-native/ReactAndroid/src/main/java/com/facebook/react/modules/camera
5. Copy CameraRollManagerOld.java and paste into that folder
6. Delete CameraRollManager.java
7. Rename CameraRollManagerOld.java to CameraRollManager.java
5. Navigate to /SuvienMobile/SuvienRN/node_modules/react-native-musicplayercontroller/ios/
6. Copy Reactnativemusiccontrollerfix.m and paste into that folder
7. Delete RNReactNativeMusicplayercontroller.m
8. Rename Reactnativemusiccontrollerfix.m to RNReactNativeMusicplayercontroller.m 
9. Navigate to /SuvienMobile/SuvienRN/node_modules/react-native-musicplayercontroller/android/src/main/java/com/reactlibrary/
10. Copy RNReactNativeMusicplayercontroller.java and paste into that folder. When prompted, ask to overwrite the file of the same name.
11. If you are testing on Android, navigate to your directory in the terminal and type in the command *react-native run-android*.
12. If you are testing on iOS, you need to open up the SuvienRN.xcodeproj file in xcode (Note: you may only deploy for iOS on a device running OSX.)
13. After configuring signing, run the app by pressing the play button.

For more information on signing and running on devices, visit the [React Native Documentation](https://facebook.github.io/react-native/docs/running-on-device.html).

# Troubleshooting
A few problems may arise during builds. If all these methods fail, open an issue on the repository under the label 'Setup' ONLY after checking for a solution to the console errors on StackOverflow.

**Cleaning Gradle (Android)**

1. Navigate to the project's directory in a terminal
2. Run the command *cd android*
3. Run the command *gradlew clean*
4. Try rebulding the app

**Re-Installing Node Modules**

1. Delete the node_modules folder. If you've modified the library files, be sure to back it up.
2. Navitage to the project's directory in a terminal
3. Run the command *npm install*
4. Replace any files that you modified from your old folder and the ones from the modifiednodefiles folder

