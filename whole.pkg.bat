@echo off
cd Compile
echo ::[1/4]::
qjsc -o tmp.c -e ..\whole.js
echo ::[2/4]::
gcc -c tmp.c -o ..\whole.o
echo ::[3/4]::
gcc ..\whole.o -lquickjs -lpthread -Bstatic -Bdynamic -o ..\whole.exe
echo ::/ Done /::
