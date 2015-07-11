"use strict";
//Lightbox
var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption =$("<p></p>")

//An image to overlay
$overlay.append($image);

$overlay.append($caption);

//Add overlay
$("body").append($overlay);
//Capture the click event on a link to an image
$("#imageGallery a").click(function(event) {
    event.preventDefault();
    var imageLocation = $(this).attr("href");

    $image.attr("src", imageLocation);
    //Show overlay
    $overlay.show("fast");

    //Retrieving alt attribute value to use as caption
    var captionText = $(this).children("img").attr("alt");
    //Plug alt attribute text to newly created <p> element
    $caption.text(captionText);

});

//Hide the overlay when user clicks on screen
$overlay.click(function() {
    $overlay.hide("fast");
});
//Twitter code
// !function(d,s,id) {
//                     var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
//                     if(!d.getElementById(id)) {
//                         js = d.createElement(s);
//                         js.id = id;
//                         js.src = p +'://platform.twitter.com/widgets.js';
//                         fjs.parentNode.insertBefore(js,fjs); } 
//                     }(document, 'script', 'twitter-wjs');





