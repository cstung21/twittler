$(document).ready(function(){
  
  function loadTweets(tweetData) {
    var $body = $('.tweet-container');
    $body.html('');

    var totalTweets = tweetData.length - 1;
    while(totalTweets >= 0){
      var tweet = tweetData[totalTweets];
      var $tweet = $('<div><a class="' + tweet.user + '" href=#>@' + tweet.user + '</a><br>' + tweet.message + '<br><span class="time">tweeted ' + formatTime(tweet.created_at) + '</span></div>');
      $tweet.addClass("tweet");
      $tweet.appendTo($body);
      totalTweets -= 1;
    }
  }

  function formatTime(date) {  
    var curDateTime = new Date;
    var timeDiffInSeconds = Math.floor((curDateTime.getTime() - date.getTime()) / 1000); 
    var minutes = Math.floor(timeDiffInSeconds / 60);
    var hours = Math.floor(timeDiffInSeconds / 3600);
    var days = Math.floor(timeDiffInSeconds / 86400);
    var months = Math.floor(timeDiffInSeconds / 2592000);
    var years = Math.floor(timeDiffInSeconds / 31536000);

    if (timeDiffInSeconds <= 1) {
      return ('just now');
    } else if (timeDiffInSeconds < 60) {
      return (timeDiffInSeconds + ' seconds ago');
    } else if (timeDiffInSeconds >= 60 && timeDiffInSeconds < 120) {
      return (minutes + ' minute ago');
    } else if (timeDiffInSeconds >= 120 && timeDiffInSeconds < 3600) {
      return (minutes + ' minutes ago');
    } else if (timeDiffInSeconds >= 3600 && timeDiffInSeconds < 7200) {
      return (hours + ' hour ago');
    } else if (timeDiffInSeconds >= 7200 && timeDiffInSeconds < 86400) {
      return (hours + ' hours ago');
    } else if (timeDiffInSeconds >= 86400 && timeDiffInSeconds < 172800) {
      return (days + ' day ago');
    } else if (timeDiffInSeconds >= 172800 && timeDiffInSeconds < 2592000) {
      return (days + ' days ago');
    } else if (timeDiffInSeconds >= 2592000 && timeDiffInSeconds < 5184000) {
      return (months + ' month ago');
    } else if (timeDiffInSeconds >= 5184000 && timeDiffInSeconds < 31536000) {
      return (months + ' months ago');
    } else if (timeDiffInSeconds >= 31536000 && timeDiffInSeconds < 63072000) {
      return (years + ' year ago');
    } else {
      return (years + ' years ago');
    }
  }


  var allTweets = streams.home;
  loadTweets(allTweets);

  $("button").on("click", function() {
    loadTweets(allTweets);
  });

  $('.tweet-container').on("click", "a", (event) => {
    var userName = $(event.currentTarget).text().slice(1);
    var userTweets = streams['users'][userName];
    loadTweets(userTweets);
  });

});