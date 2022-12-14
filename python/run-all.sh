#!/bin/zsh

# for dir in find -mindepth 1 -maxdepth 2 -type d)
for dir in */
do
    cd "$dir"
    echo "===== ${dir:0:-1} ====="
    if [ -f part1.py ]
    then
        python3 part1.py input.txt
    fi
    if [ -f part2.py ]
    then
        python3 part2.py input.txt
    fi
    if [ -f solution.py ]
    then
        python3 solution.py input.txt
    fi
    cd ..
done
