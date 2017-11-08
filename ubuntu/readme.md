1. 安装 nodejs
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
2. 其它相关软件
sudo apt-get install npm
sudo apt-get install nodejs-legacy
sudo npm -g install grunt-cli
sudo apt install python-pip
sudo pip install requests
3. 安装 java
java 使用 9 可能会引起 apprtc 编译失败，安装  jdk8 尝试

#安装python-software-properties，实际没运行
sudo apt-get install python-software-properties
sudo apt-get install software-properties-common
#首先添加ppa
sudo add-apt-repository ppa:webupd8team/java
#然后更新系统
sudo apt-get update
#安装
sudo apt-get install oracle-java8-installer

#java版本切换，实际没运行
sudo update-java-alternatives -s java-8-oracle