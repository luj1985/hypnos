#!/bin/sh
# Imagemagick is required
# convert image to fixed width 640px, and create thumbnails with width 100px

RELATIVE="../public"
ORIG_DIR="$RELATIVE/original"
ROOT_DIR="$RELATIVE/images"
THUMB_DIR="$RELATIVE/thumbnails"

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

rm -rf $ROOT_DIR
rm -rf $THUMB_DIR
mkdir -p $ROOT_DIR
mkdir -p $THUMB_DIR

# make directory structure
for directory in $(find $ORIG_DIR -type d); do
  name=$(basename $directory)
  mkdir -p "$ROOT_DIR/$name"
  mkdir -p "$THUMB_DIR/$name"
done

echo "sid,image,thumbnail"

for image in $(find $ORIG_DIR -type f -name "*.jpg"); do
  path=${image##$ORIG_DIR/}
  tmp=${path%/*.jpg}
  sid=${tmp%.jpg}
  
  target="$ROOT_DIR/$path"
  thumb_target="$THUMB_DIR/$path"
  convert $image -resize 640x $target
  convert $image -resize x100 $thumb_target

  echo "$sid,/${target##$RELATIVE/},/${thumb_target##$RELATIVE/}"
done
