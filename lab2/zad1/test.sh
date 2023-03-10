#!/bin/bash

docker-compose up -d --wait

curl -s http://0.0.0.0:8080/ > output.txt

EXPECTED="Hello World"
ACTUAL=$(cat output.txt)
if [ "$EXPECTED" == "$ACTUAL" ]; then
  echo "Test passed"
else
  echo "Test failed"
fi

rm -r output.txt
docker-compose down