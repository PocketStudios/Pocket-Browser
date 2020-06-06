echo off
echo ========
echo Pocket Browser Builder
echo Are you sure you want to build Pocket Browser?
pause
electron-packager ./ --asar --app-copyright Pocket,Inc. --icon ./icon.ico
echo Done.
pause