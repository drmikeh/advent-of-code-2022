#!/bin/zsh

# for dir in find -mindepth 1 -maxdepth 2 -type d)
for dir in */
do
    cd "$dir"
    echo "-- ${dir:0:-1} --"
    ./run-all.sh
    echo ""
    cd ..
done
