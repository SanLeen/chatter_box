@echo off
for /f "tokens=4" %%a in ('route print^|findstr 0.0.0.0.*0.0.0.0') do (
 set IP=%%a
)
chcp 65001

echo 请访问 %IP%:8080 以开始聊天
java -jar server\target\chatter_box-1.2.jar
