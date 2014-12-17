#!/bin/sh
ORIG_DIR="../public/products/original"

for d in $(find $ORIG_DIR -type d); do
  if [[ "$d" != "$ORIG_DIR" ]]
  then
    index=1
    for f in $(find $d -type f -name "*.jpg"); do
      newname="$(dirname $f)/${index}.jpg"
      mv $f $newname
      let index=index+1
    done
    index=1
  fi
done