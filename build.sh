REGION="us"
REACT_APP_META=""
REACT_APP_TITLE="BuyTime Online"
REACT_APP_FAVICON="favicon_b.ico"
REACT_APP_COUNTRY_FLAG="US"
REACT_APP_MAP_BG="map.png"
REACT_APP_META_FROM_URL="true"
REACT_APP_GEO_LOCATION_NEAREST_STORE="api/v2/geo-services/nearest-store/zip"
REACT_APP_GEO_LOCATION_USER_ZIPSTORES="api/v2/geo-services/nearest-store/geo"
REACT_APP_GEO_LOCATION_ZIP_INFO="api/v2/us-zip"
REACT_APP_SERVER_API=""

cd ./f5-buytime-frontend/
docker build \
 --build-arg REACT_APP_META="$REACT_APP_META" \
 --build-arg REACT_APP_TITLE="$REACT_APP_TITLE" \
 --build-arg REACT_APP_FAVICON="$REACT_APP_FAVICON" \
 --build-arg REACT_APP_COUNTRY_FLAG="$REACT_APP_COUNTRY_FLAG" \
 --build-arg REACT_APP_MAP_BG="$REACT_APP_MAP_BG" \
 --build-arg REACT_APP_META_FROM_URL="$REACT_APP_META_FROM_URL" \
 --build-arg REACT_APP_GEO_LOCATION_NEAREST_STORE="$REACT_APP_GEO_LOCATION_NEAREST_STORE" \
 --build-arg REACT_APP_GEO_LOCATION_USER_ZIPSTORES="$REACT_APP_GEO_LOCATION_USER_ZIPSTORES" \
 --build-arg REACT_APP_GEO_LOCATION_ZIP_INFO="$REACT_APP_GEO_LOCATION_ZIP_INFO" \
 --build-arg REACT_APP_SERVER_API="$REACT_APP_SERVER_API" \
 --build-arg REACT_APP_NO_NEAREST_STORE="false" \
 --tag buytime-fronted:latest .
docker tag buytime-fronted:latest interestingstorage/buytime-frontend:latest
docker push interestingstorage/buytime-frontend:latest

docker build \
 --build-arg REACT_APP_META="$REACT_APP_META" \
 --build-arg REACT_APP_TITLE="$REACT_APP_TITLE" \
 --build-arg REACT_APP_FAVICON="$REACT_APP_FAVICON" \
 --build-arg REACT_APP_COUNTRY_FLAG="$REACT_APP_COUNTRY_FLAG" \
 --build-arg REACT_APP_MAP_BG="$REACT_APP_MAP_BG" \
 --build-arg REACT_APP_META_FROM_URL="$REACT_APP_META_FROM_URL" \
 --build-arg REACT_APP_GEO_LOCATION_NEAREST_STORE="$REACT_APP_GEO_LOCATION_NEAREST_STORE" \
 --build-arg REACT_APP_GEO_LOCATION_USER_ZIPSTORES="$REACT_APP_GEO_LOCATION_USER_ZIPSTORES" \
 --build-arg REACT_APP_GEO_LOCATION_ZIP_INFO="$REACT_APP_GEO_LOCATION_ZIP_INFO" \
 --build-arg REACT_APP_SERVER_API="$REACT_APP_SERVER_API" \
 --build-arg REACT_APP_NO_NEAREST_STORE="true" \
 --tag buytime-fronted:latest-simple .
docker tag buytime-fronted:latest-simple interestingstorage/buytime-frontend:latest-simple
docker push interestingstorage/buytime-frontend:latest-simple

cd ../f5-auction-backend
docker build --tag buytime-backend:latest .
docker tag buytime-backend:latest interestingstorage/buytime-backend:latest
docker push interestingstorage/buytime-backend:latest

cd ../f5-nearest-store-backend
docker build --tag buytime-find-a-store-service:latest .
docker tag buytime-find-a-store-service:latest interestingstorage/buytime-find-a-store-service:latest
docker push interestingstorage/buytime-find-a-store-service:latest

cd ../f5-nearest-store-db
docker build --tag buytime-db:latest .
docker tag buytime-db:latest interestingstorage/buytime-db:latest
docker push interestingstorage/buytime-db:latest

cd ../f5-buytime-rp
docker build --tag buytime-rp:latest .
docker tag buytime-rp:latest interestingstorage/buytime-rp:latest
docker push interestingstorage/buytime-rp:latest