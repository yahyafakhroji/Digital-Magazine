const electron = require('electron')
const path = require('path');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const Tray = electron.Tray;  // Module to create native browser window.

process.env.GOOGLE_API_KEY = 'AIzaSyDUkSdMDWTNA5URq24hPosFQuHk_LNxCMM';
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;
let tray;

const appicon = path.join(__dirname, 'assets/images/appicon.png');
const apdicon = path.join(__dirname, 'assets/images/appicon-dot.png');

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 700,
        minWidth: 1281,
        minHeight: 700,
        icon: appicon
    });

    if (typeof mainWindow.setIcon === 'function') {
        mainWindow.setIcon(electron.nativeImage.createFromPath(appicon));
    }

    // and load the index.html of the app.
    mainWindow.loadURL('file://' + __dirname + '/flip.html');

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

function createTray() {
    const trayIcon = electron.nativeImage.createFromPath(appicon).resize({ height: 24 });
    tray = new Tray(trayIcon);
    tray.setToolTip('Ininama Magz');

    return tray;
}

app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    const m = createWindow();
    const t = createTray();

    app.$main = m;
    app.$tray = t;
    app.$apdicon = apdicon;
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
