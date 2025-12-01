#!/bin/zsh

# Source SVG file
SOURCE="Chaos_Favicon_HP.svg"

# Check if source file exists
if [[ ! -f "$SOURCE" ]]; then
  echo "Error: $SOURCE not found!"
  exit 1
fi

# Create each PNG file explicitly with transparent background
echo "Creating apple-touch-icon-180.png at 180x180..."
convert "$SOURCE" -background none -resize 180x180 apple-touch-icon-180.png

echo "Creating favicon-16.png at 16x16..."
convert "$SOURCE" -background none -resize 16x16 favicon-16.png

echo "Creating favicon-32.png at 32x32..."
convert "$SOURCE" -background none -resize 32x32 favicon-32.png

echo "Creating favicon-48.png at 48x48..."
convert "$SOURCE" -background none -resize 48x48 favicon-48.png

echo "Creating favicon-192.png at 192x192..."
convert "$SOURCE" -background none -resize 192x192 favicon-192.png

echo "Creating favicon-512.png at 512x512..."
convert "$SOURCE" -background none -resize 512x512 favicon-512.png

# Create multi-resolution favicon.ico with transparent background
echo "Creating favicon.ico with multiple resolutions..."
convert "$SOURCE" -background none -define icon:auto-resize=16,32,48 favicon.ico

echo "Done! All favicon files created with transparent backgrounds."
