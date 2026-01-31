# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo


## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

# iOS: Bygga och köra appen i Xcode
## 1.Förbered native-projektet
Om du har ändrat native-konfiguration (t.ex. `app.json`, lagt till native-moduler):

```bash
npx expo prebuild
cd ios
pod install
```

## 2. Öppna projektet i Xcode
Öppna ios/SystemLife.xcworkspace i Xcode (inte .xcodeproj).

## 3. Välj din iPhone som target
Anslut din iPhone med USB och välj den högst upp i Xcode.

## 4. Bygg och kör appen
Tryck på Run (play-knappen) i Xcode.

## 5. Starta Metro-bundlern
I projektroten, kör:

```bash
npx expo start --dev-client
```

Låt terminalen vara öppen medan du kör appen.


## Felsökning: Rensa cache i Xcode
Felsökning: Rensa cache i Xcode
1. Stäng Xcode.
2. Rensa Derived Data (Xcode-cache)
Kör i terminalen:
```bash
rm -rf ~/Library/Developer/Xcode/DerivedData
```
3. Öppna projektet igen och bygg om.

### Clean Build Folder
I Xcode:
Gå till Product > Clean Build Folder
(eller tryck Shift + Cmd + K).


## Vanliga tips
- Alltid öppna .xcworkspace (inte .xcodeproj) när du använder CocoaPods.
- Om du ändrar native-konfiguration, kör alltid npx expo prebuild och pod install innan du bygger i Xcode.
- Om appen inte hittar din backend, kontrollera att du använder din dators IP-adress i .env och att både iPhone och Mac är på samma nätverk.