#!/bin/bash

set -euf
set -o pipefail

themes_directory=/usr/share/lightdm-webkit/themes

usage() {
    cat <<EOF
Usage: install.sh THEME_NAME

Install the theme to make it available for use by lightdm-webkit2-greeter.

Parameters:
    THEME_NAME  The name to install the theme under.
EOF
}

if [[ -z "${1+x}" ]]; then
    echo "No theme name provided."
    echo
    usage
    exit 1
fi

theme_name="${1}"
theme_directory="${themes_directory}/${theme_name}"
echo "Installing '${theme_name}' to directory: ${theme_directory}"

if [[ ! -d "./dist" ]]; then
    echo "The theme must be built before it can be installed. Run the following script to"
    echo "build the theme and make sure the installer is run from the root of the"
    echo "repository:"
    echo
    echo "$ yarn build"
    exit 1
fi

rm -rf "${theme_directory}"
echo "Removed prior contents of theme directory."

cp -r ./dist "${theme_directory}"
echo "Installed theme."

cat <<EOF

The theme files have been installed to: ${theme_directory}

To use the theme, edit the webkit greeter configuration and ensure the following
keys are set:

>>> # /etc/lightdm/lightdm-webkit2-greeter.conf
>>>
>>> [greeter]
>>> webkit_theme = ${theme_name}
>>>
>>> # You can also customize the directory that background images are sourced
>>> # from.
>>> [branding]
>>> background_images = /path/to/images

EOF
