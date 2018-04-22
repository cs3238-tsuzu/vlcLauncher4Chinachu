<!---
 Copyright (c) 2018 Tsuzu
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

# VLC launcher for Chinachu
- Chinachuの画面からXSPFを経由せずVLCを起動するやつです
- 現状何のオプションを指定していてもM2TSの無変換で飛ばします
- Google Chrome向け
- コマンドラインからVLCを起動する方法がわからないのでWinとLinuxは未対応です

# Installation
- Tampermonkeyをインストール
- /tampermonkey.jsのjsを追加
- Tampermonkeyの設定画面で"VLC launcher for Chinachu"の画面を開き、設定タブをクリック
- ユーザによるmatchにChinachuのURL(i.e. 192.168.2.1:20772)を追加
- goをインストール
- go get github.com/cs3238-tsuzu/vlcLauncher4Chinachu
- $ vlcLauncher4Chinachu
- インストール完了

# Screenshot
![スクリーンショット](/files/screenshot.png)

# License
- Under the MIT License
- Copyright (c) 2018 Tsuzu