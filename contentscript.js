
var songName;
var artistName;
var albumName;

$(document).ready(function (){
   var left = $("#nav").width()+parseInt($("#nav").css("left"));
   var uiStyle = "style=\"left: "+left+"px; position: absolute; top: 4px;\"";

   var bgImageURL = chrome.extension.getURL("images/grooveshark-lyrics.png");
   var aStyle = "style=\"background-image:url("+bgImageURL+");display: block; width: 32px; height: 32px; position: relative; \"";

   //add Image Button at the header
   $("#header").append("<ul id=\"grooveshark_lyrics_nav\" "+ uiStyle+"><li id=\"header_nav_lyrics\" class=\"lyrics\"><a href=\"/#/user\" " + aStyle + " ></a></li></ul>");
   //reposition it
   $("#grooveshark_lyrics_nav").css("left",$("#nav").width()+parseInt($("#nav").css("left")));
   $("#grooveshark_lyrics_nav").click(getLyrics);
});

function getLyrics(){

   var nowPlayingDiv=document.getElementById('playerDetails_nowPlaying');
   var anchors= nowPlayingDiv.getElementsByTagName('a');

   songName   = $("#playerDetails_nowPlaying .song").text();
   artistName = $("#playerDetails_nowPlaying .artist").text();
   albumName  = $("#playerDetails_nowPlaying .album").text();
   
   if(songName==null){
      alert("Please Play a Song ");
      event.preventDefault();
   }
   else{

   chrome.extension.sendRequest({song: songName,artist: artistName, album: albumName}, function(response) {

      $("#page").attr("class","gs_page_user");
      $("theme_page_header").attr("style","display:block;");
      $("#page").html("<div id=\"page_header\"></div><div id=\"page_content\"><div id=\"gs_lyrics_content\">"+response.lyrics+"</div></div>");
      $("#page_header").append("<div class=\"meta\"><h3 data-translate-text=\"LYRICS_TITLE\">Lyrics for "+ songName +
                                     " - " +artistName+" - "+albumName + "</h3></div>");
      $("#page_header").append("<div class=\"page_controls\"> <ul class=\"left\"><li class=\"first last btn_group\">" + 
          "<button class=\"btn btn_style2 hide\" type=\"button\"><div><span class=\"label\">Edit Lyrics</span></div></button></li></ul></div>");
      $("#page_header").append("<div class=\"highlight\"></div><div class=\"shadow\"></div>");
      $("#page_header .page_controls").height($(".page_controls .left").outerHeight());
      $("#page_header").height(parseInt($("#page_header .meta").outerHeight()) + parseInt($("#page_header .page_controls").outerHeight())+20);
      $("#page_content").height(parseInt($("#page_wrapper").height()) - parseInt($("#theme_page_header").height()) - $("#page_header").height());   
      $("#page").attr("class","gs_page_popular");
      $("#page_content .rtMatcher").remove();
      
      //$("#gs_lyrics_content").append("<div id=\"gs_youtube_object\">"+response.youtubeElement+"</div>");
      //console.log(response.lyrics);
      //console.log(response.youtubeElement);
   });
   
   }
}




