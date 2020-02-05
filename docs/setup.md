# React Native project setup
If you're going to work on an existing project, just jump to **step 3**.

1. Make sure you have npm with npx - `npx -v`.
2. Run `npx react-native init [projectName] --template react-native-template-typescript` in project's root directory.
3. Install Android Studio (select custom setup during the first run) and create an Android emulator following these steps: [https://medium.com/@wnyao0830/run-create-react-native-app-on-android-studios-emulator-ad678a0c362f](https://medium.com/@wnyao0830/run-create-react-native-app-on-android-studios-emulator-ad678a0c362f).
4. Add android sdk to system path: [https://www.dev2qa.com/how-to-set-android-sdk-path-in-windows-and-mac/](https://www.dev2qa.com/how-to-set-android-sdk-path-in-windows-and-mac/).
6. Add SDK location to the project: https://stackoverflow.com/a/48155800.
7. Accept SDK licences: https://stackoverflow.com/a/43003932.
8. Install JDK ([https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)) and set the environmental variable ([https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/](https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/)).
9. Restart your PC to make sure the environment variables are updated.
10. Execute `adb` in the terminal to make sure the Android SDK path is set correctly.
11. Run the emulator in Android Studio.
12. Configure VS Code to support React Native: [https://github.com/microsoft/vscode-react-native](https://github.com/microsoft/vscode-react-native).
13. Clone the repository and run the project using `npm run android`.