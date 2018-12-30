#!/bin/bash

NUXT_URL_PREFIX="https://www.stateofthedapps.com/_nuxt/"
NUXT_CLIENT_JS=`scalingo run "ls .nuxt/dist/client/*.js"|grep -ohe "^.nuxt/dist/client/.*\.js"`
# NUXT_CLIENT_JS=`cat scalingo.txt|grep -ohe "^.nuxt/dist/client/.*\.js"`

for line in $NUXT_CLIENT_JS
do
    js_file=`basename $line`
    url="${NUXT_URL_PREFIX}${js_file}"
    cf_cache_status=`curl -s -i ${url}|grep cf-cache-status`
    echo "${url} ${cf_cache_status}"
done