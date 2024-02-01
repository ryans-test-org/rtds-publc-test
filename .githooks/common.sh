#!/bin/sh

set -e

# Common git hook header that will run any personal git hook (if present), before continuing
PERSONAL_HOOK_PATH=.git/hooks/$(basename $0)

# Check if the individual developer has their own hook

if [ -f $PERSONAL_HOOK_PATH ]
then
  # If so, run it. $@ passes all the command line arguments passed to this function
  # If the personal hook fails, fail this one as well
  if ! $PERSONAL_HOOK_PATH $@
  then
    echo "User hook '$PERSONAL_HOOK_PATH' failed"
    exit 1
  fi
fi
