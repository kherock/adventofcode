#!/usr/bin/env bash
exec deno run $DENO_OPTIONS \
  --allow-read \
  --allow-write \
  --allow-hrtime \
  --allow-net \
  ./common/util.ts "$@"
