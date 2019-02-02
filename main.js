'use strict';

const electron = require("electron"); // Electronのモジュール
const app = electron.app;// アプリケーションをコントロールするモジュール
const BrowserWindow = electron.BrowserWindow;// ウィンドウを作成するモジュール
let mainWindow;// メインウィンドウはGCされないようにグローバル宣言
const Tray = electron.Tray;// メニューバーにアイコンを表示させるために使う
var appIcon = null// アイコン画像を入れる変数
const Menu = electron.Menu;




// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on('ready', function() {
  mainWindow = new BrowserWindow({
    'width': 500,
    'height': 600,
    'transparent': false, //trueで背景色を透明にできる
    'frame': true
  });

  appIcon = new Tray(__dirname + '/images/icon.jpg');
    // コンテキストメニュー追加
    var contextMenu = Menu.buildFromTemplate([
      {label: '選択メニュー1', type: 'radio'},
      {label: '選択メニュー2', type: 'radio'},
      {type: 'separator'},
      {label: 'サブメニュー', submenu: [
        {label: 'サブメニュー1'},
        {label: 'サブメニュー2'}
        ]},
      // {label: '終了', accelerator: 'Command+Q', click: function() { app.quit(); }}
    ]);
  appIcon.setContextMenu(contextMenu);
  
  // アイコンにマウスオーバーした時の説明
  appIcon.setToolTip('This is sample.');

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // アプリケーションメニュー設定
var menu = Menu.buildFromTemplate([
  {
    label: 'Sample',
    submenu: [
      {label: 'About'},
      {label: 'Quit'}
    ]
  },
  {
    label: 'File',
    submenu: [
      {label: 'New File'},
      {label: 'Paste'}
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {label: 'Copy', accelerator: 'Command+C', selector: 'copy'},
      {label: 'Paste', accelerator: 'Command+V', selector: 'paste'}
    ]
  }
]);
Menu.setApplicationMenu(menu);


  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});