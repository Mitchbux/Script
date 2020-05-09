#// display an overlay with default font

screen ("hello" "world")

#// play local media files
#// the timecode module starts a synchronization timer
#// local media files are played together 

timecode
( 
  #// the playlist starts element based on timecode
  #// 
  
  + "00:00:00" "hello.mp3" [output] {same}
  + "00:00:03" "hello.mp4" [output] {no-audio} start "00:00:30.453" 
),

#// the module screen has a sub-module [pixel]
#// you can write fragment shaders using pre-defined textures :
#// text for the current overlay
#// playing for the last media started
#// add media to screen to have them directly as texture
#// every element of the screen module has a loader.
#// you can load any type of media :
#// .png, .jpg, .bmp, .gif
#// .mp3, .wav, .wma, .mpc etc..

screen myTexture "hello.jpg",
screen [pixel] { pixel=text + playing + myTexture; }

