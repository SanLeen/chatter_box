cd web && npm install && npm run build && cd ../server && mvn clean package && cd src/main/resources/ && rmdir /s static /q && cd ../../../../
