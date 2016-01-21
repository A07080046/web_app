@echo off

if exist ..\www\js\thirdparty\mui.min.backup.js (
    ren ..\www\js\thirdparty\mui.min.js ..\www\js\thirdparty\mui-desktop.min.js
    ren ..\www\js\thirdparty\mui.min.backup.js ..\www\js\thirdparty\mui.min.js
    echo "nw mode off"
) else (
    ren ..\www\js\thirdparty\mui.min.js ..\www\js\thirdparty\mui.min.backup.js
    ren ..\www\js\thirdparty\mui-desktop.min.js ..\www\js\thirdparty\mui.min.js
    echo "nw mode on"
)
