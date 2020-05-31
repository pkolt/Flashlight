# flashlight ![](https://github.com/pkolt/flashlight/workflows/main/badge.svg)

## Android

- Папка с иконками `./android/app/src/main`
- Переименовать приложение `npx react-native-rename "Flashlight" -b com.pkolt.flashlight`
- Очистка кеша при старте приложения `react-native start --reset-cache`

## Иконка приложения

http://romannurik.github.io/AndroidAssetStudio/icons-launcher.html

- основной цвет `#7c1fa3`
- дополнительный цвет `#fffeff`
- отступ `40%`

## Обновление NPM-пакетов

- `npx ncu` просмотреть какие пакеты нуждаются в обновлении
- `npx ncu -i` выборочно обновить пакеты до последних версий
- `npx ncu -u` обновить все пакеты до последних версий

## Выпуск новой версии

- обновить версию в файле `android/app/build.grandle` (`versionCode` и `versionName`)
