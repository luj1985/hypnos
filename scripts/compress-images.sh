#!/bin/sh
# Imagemagick is required
# convert image to fixed width 640px, and create thumbnails with width 100px

ORIG_DIR="../public/products/original"
ROOT_DIR="../public/products/images"
THUMB_DIR="../public/products/thumbnails"

mkdir -p $ROOT_DIR
mkdir -p $THUMB_DIR

# make directory structure
for directory in $(find $ORIG_DIR -type d); do
  name=$(basename $directory)
  mkdir -p "$ROOT_DIR/$name"
  mkdir -p "$THUMB_DIR/$name"
done

for image in $(find $ORIG_DIR -type f -name "*.jpg"); do
  path=${image##$ORIG_DIR/}
  target="$ROOT_DIR/$path"
  thumb_target="$THUMB_DIR/$path"
  convert $image -resize 640x $target
  convert $image -resize 100x $thumb_target
done
