
#// each folder in the archive would create a new object property
#// eg. : in the archive [files.zip] 
#// video/mini.mp4
#// html/page.html
#// html/page.css
#//

screen files "files.zip" 

#//you can draw html from html procedure
#// here ze create a loader. It's used only once

screen loader mypage { return screen.html(screen.allfiles.html.page_html, screen.allfiles.html.page_css); }
screen mypage ("still")

#// html css and script indexers will draw html in-situ

screen [html] {	<h1>Big title here</h1>}
screen [css] { body { background-color:#202020; color:#ffffff; } }
screen [script] { document.write("Javascript generated."); }

#// you can then mix them in a still image
screen [pixel] 
{
	if (timecode < timecode("00:00:30"))	
		pixel = mypage.still + image.background_jpg; }
	else {
		pixel = html + image.background_jpg; 
		if (timecode > timecode(":01")
			timecode = timecode(":00");
	}
}

#// decoding video + audio from a video encoded inside a zip file requires a timecode
#// you can apply timecode to a video

{
	var synchronized = screen.allfiles.video.mini_mp4.start("00:00:00").end("00:00:03");
	write.to("frame.png", synchronized.toPNG("00:00:01.422"));
	write.to("frame.jpg", synchronized.toJPG("00:00:02.354"));
	write.to("sound.mp3", synchronized.toMP3());
	write.to("slice.mp4", synchronized.toMP4());
	
	//pass the file names to the indexer filter
	this.add("frame.jpg");
	this.add("slice.mp4");
	this.decoded();
}

[decoded] {
	//you can then zip files to another archive :
	file(this).toZIP("decoded.zip");
	
	//or use WQLite database storage
	wqlite.files(this).addTo("decoded.czw");	
	
}
