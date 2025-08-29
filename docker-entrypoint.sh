#!/bin/sh

if [ -n "$CUSTOM_HYPERCHAINS_CONFIG" ]; then
  PARSED_CONFIG=$(node -e "process.stdout.write(JSON.stringify(JSON.parse(process.env.CUSTOM_HYPERCHAINS_CONFIG)))")
  echo "window[\"##runtimeConfig\"] = Object.assign(window[\"##runtimeConfig\"] || {}, { public: { hyperchainsConfig: $PARSED_CONFIG } });" > /usr/src/app/dist/set-custom-hyperchains-config.js
fi

exec http-server -p $PORT -c-1 --proxy="http://127.0.0.1:$PORT/index.html?"
