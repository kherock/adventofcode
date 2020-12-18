#!/usr/bin/env bash
exec deno run $DENO_OPTIONS --allow-read --allow-write --allow-net ./common/util.ts "$@"
