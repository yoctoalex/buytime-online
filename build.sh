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

# build buytime app without find a store service
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
 --build-arg REACT_APP_NO_NEAREST_STORE="true" \
 --tag buytime-fronted:v1 .
docker tag buytime-fronted:v1 interestingstorage/buytime-frontend:v1
docker push interestingstorage/buytime-frontend:v1

cd ../f5-buytime-frontend/
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
  --build-arg REACT_APP_NO_NEAREST_STORE="false" \
 --tag buytime-fronted:v2 .
docker tag buytime-fronted:v2 interestingstorage/buytime-frontend:v2
docker push interestingstorage/buytime-frontend:v2

cd ../f5-auction-backend
docker build --tag buytime-backend:v1 .
docker tag buytime-backend:v1 interestingstorage/buytime-backend:v1
docker push interestingstorage/buytime-backend:v1

cd ../f5-nearest-store-backend
docker build --tag buytime-find-a-store-service:v1 .
docker tag buytime-find-a-store-service:v1 interestingstorage/buytime-find-a-store-service:v1
docker push interestingstorage/buytime-find-a-store-service:v1

cd ../f5-nearest-store-db
docker build --tag buytime-db:v1 .
docker tag buytime-db:v1 interestingstorage/buytime-db:v1
docker push interestingstorage/buytime-db:v1

cd ../f5-buytime-rp
docker build --tag buytime-rp:v2 .
docker tag buytime-rp:v2 interestingstorage/buytime-rp:v2
docker push interestingstorage/buytime-rp:v2