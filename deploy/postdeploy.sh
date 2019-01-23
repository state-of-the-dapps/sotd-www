#!/usr/bin/env bash

set -e

# required env variables:
# CDN_PUBLIC_PATH
# CDN_REMOTE_PATH
# RCLONE_CONFIG_PASS

APP_BIN="/app/bin"
RCLONE_CONF="deploy/rclone.conf"
NUXT_CLIENT_DIST=".nuxt/dist/client/"

function install_rclone() {
  # error codes
  # 0 - exited without problems
  # 1 - parameters not supported were used or some unexpected error occured
  # 2 - OS not supported by this script
  # 3 - installed version of rclone is up to date
  # 4 - supported unzip tools are not available

  #when adding a tool to the list make sure to also add it's corresponding command further in the script
  unzip_tools_list=('unzip' '7z' 'busybox')

  #create tmp directory and move to it with macOS compatibility fallback
  tmp_dir=`mktemp -d 2>/dev/null || mktemp -d -t 'rclone-install'`; pushd $tmp_dir


  #make sure unzip tool is available and choose one to work with
  set +e
  for tool in ${unzip_tools_list[*]}; do
      trash=`hash $tool 2>>errors`
      if [ "$?" -eq 0 ]; then
          unzip_tool="$tool"
          break
      fi
  done  
  set -e

  # exit if no unzip tools available
  if [ -z "${unzip_tool}" ]; then
      printf "\nNone of the supported tools for extracting zip archives (${unzip_tools_list[*]}) were found. "
      printf "Please install one of them and try again.\n\n"
      exit 4
  fi

  # Make sure we don't create a root owned .config/rclone directory #2127
  export XDG_CONFIG_HOME=config

  #check installed version of rclone to determine if update is necessary
  version=`rclone --version 2>>errors | head -n 1`
  if [ -z "${install_beta}" ]; then
      current_version=`curl https://downloads.rclone.org/version.txt`
  else
      current_version=`curl https://beta.rclone.org/version.txt`
  fi

  if [ "$version" = "$current_version" ]; then
      printf "\nThe latest ${install_beta}version of rclone ${version} is already installed.\n\n"
      exit 3
  fi


  #detect the platform
  OS="`uname`"
  case $OS in
    Linux)
      OS='linux'
      ;;
    FreeBSD)
      OS='freebsd'
      ;;
    NetBSD)
      OS='netbsd'
      ;;
    OpenBSD)
      OS='openbsd'
      ;;  
    Darwin)
      OS='osx'
      ;;
    SunOS)
      OS='solaris'
      echo 'OS not supported'
      exit 2
      ;;
    *)
      echo 'OS not supported'
      exit 2
      ;;
  esac

  OS_type="`uname -m`"
  case $OS_type in
    x86_64|amd64)
      OS_type='amd64'
      ;;
    i?86|x86)
      OS_type='386'
      ;;
    arm*)
      OS_type='arm'
      ;;
    aarch64)
      OS_type='arm64'
      ;;
    *)
      echo 'OS type not supported'
      exit 2
      ;;
  esac


  #download and unzip
  if [ -z "${install_beta}" ]; then
      download_link="https://downloads.rclone.org/rclone-current-$OS-$OS_type.zip"
      rclone_zip="rclone-current-$OS-$OS_type.zip"
  else
      download_link="https://beta.rclone.org/rclone-beta-latest-$OS-$OS_type.zip"
      rclone_zip="rclone-beta-latest-$OS-$OS_type.zip"
  fi

  curl -O $download_link
  unzip_dir="tmp_unzip_dir_for_rclone"
  # there should be an entry in this switch for each element of unzip_tools_list
  case $unzip_tool in
    'unzip')
      unzip -a $rclone_zip -d $unzip_dir
      ;;
    '7z')
      7z x $rclone_zip -o$unzip_dir
      ;;
    'busybox')
      mkdir -p $unzip_dir
      busybox unzip $rclone_zip -d $unzip_dir
      ;;
  esac
      
  cd $unzip_dir/*


  #mounting rclone to enviroment

  case $OS in
    'linux')
      #binary
      mkdir -p $APP_BIN
      cp rclone $APP_BIN/rclone.new
      chmod 755 $APP_BIN/rclone.new
      # chown root:root /usr/bin/rclone.new
      mv $APP_BIN/rclone.new $APP_BIN/rclone
      #manuals
      # mkdir -p /usr/local/share/man/man1
      # cp rclone.1 /usr/local/share/man/man1/
      # mandb
      ;;
    'freebsd'|'openbsd'|'netbsd')
      #bin
      cp rclone /usr/bin/rclone.new
      chown root:wheel /usr/bin/rclone.new
      mv /usr/bin/rclone.new /usr/bin/rclone
      #man
      mkdir -p /usr/local/man/man1
      cp rclone.1 /usr/local/man/man1/
      makewhatis
      ;;
    'osx')
      #binary
      mkdir -p /usr/local/bin
      cp rclone /usr/local/bin/rclone.new
      mv /usr/local/bin/rclone.new /usr/local/bin/rclone
      #manual
      mkdir -p /usr/local/share/man/man1
      cp rclone.1 /usr/local/share/man/man1/    
      ;;
    *)
      echo 'OS not supported'
      exit 2
  esac

  popd

  #update version variable post install
  version=`rclone --version 2>>errors | head -n 1`

  printf "\n${version} has successfully installed."
}

if [ -z "$CDN_PUBLIC_PATH" ]; then
  echo "CDN_PUBLIC_PATH not set, no CDN postdeploy needed."
  exit 0
else
  echo "CDN_PUBLIC_PATH set, deploying to CDN..."
fi

if [ -z "$CDN_REMOTE_PATH" ]; then
  echo "CDN_REMOTE_PATH not set. Aborting postdeploy."
  exit 1
fi

if [ ! -f "$RCLONE_CONF" ]; then
  echo "$RCLONE_CONF not found. borting postdeploy."
  exit 1
fi

if [ -z "$RCLONE_CONFIG_PASS" ]; then
  echo "RCLONE_CONFIG_PASS not set, can't decrypt rclone config. Aborting postdeploy."
  exit 1
fi

if ! hash rclone 2>/dev/null; then
  echo "rclone not found, installing:"
  install_rclone
fi

if ! hash rclone 2>/dev/null; then
  echo "rclone still not found. Aborting postdeploy."
  exit 1
fi

if [ ! -d "$NUXT_CLIENT_DIST" ]; then
  echo "$NUXT_CLIENT_DIST not found. Aborting postdeploy."
  exit 1
fi

# rclone --config deploy/rclone.conf config show
echo "Copying $NUXT_CLIENT_DIST to $CDN_REMOTE_PATH"
rclone --config $RCLONE_CONF copy -v $NUXT_CLIENT_DIST $CDN_REMOTE_PATH
