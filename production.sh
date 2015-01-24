#!/bin/bash

source env.sh
echo "mobile server: $MOBILE_SERVER_URL"
meteor --production --mobile-server $MOBILE_SERVER_URL $@