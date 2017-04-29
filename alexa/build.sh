cd ./alexa/src
rm *.zip
zip -r function.`date +"%Y%m%d.%s"`.zip index.js node_modules/*
