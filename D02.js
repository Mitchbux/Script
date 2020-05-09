#// supported archives
#// 7-ZIP, A, ARC, ARJ, B64, BH, BIN, BZ2, BZA, C2D, CDI, CAB, 
#// CPIO, DEB, ENC, GCA, GZ, GZA, HA, IMG, ISO, IZE, JAR, LHA, 
#// LIB, LZH, MBF, MDF, MIM, NRG, PAK, PDI, PK3, RAR, RPM, TAR, 
#// TAZ, TBZ, TGZ, TZ, UUE, WAR, XPI, XXE, YZ1, Z, ZIP, ZOO
#// each entry in the archive would create a new object property
#// each folder in the archive would create a new object property
#// eg. : in the archive [archive.zip] 
#// image/photo.jpg 
#// image/background.jpg 
#//

screen allfiles "archive.zip" 

#//the submodule mytext is generating textual texture based on default fontFamily
#//you can draw html from this submodule
screen [mytext] {return "Hello World";}

screen [pixel] { pixel=mytext + allfiles.image.background_jpg; }

