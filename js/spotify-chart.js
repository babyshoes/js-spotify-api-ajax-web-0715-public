var url = "http://charts.spotify.com/api/tracks/most_streamed/us/weekly/latest";

var dataSetProperties = {
  label: 'Spotify Chart of Top 20 Streamed Songs on Spotify with their Steam Count',
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
}

$(function() {
  getSpotifyTracks(success);
});

function extractTop20Tracks(tracks) {
  return tracks.slice(0, 20);
}

function extractNumberOfStreams(tracks) {
  var numStreams = [];
  tracks.forEach(function (track) {
    numStreams.push(track.num_streams);
  })
  return numStreams;
}

function extractNames(tracks) {
  var names = [];
  tracks.forEach(function (track) {
    names.push(track.track_name);
  })
  return names;
}

function chartData(labels, inputData) {
  dataSetProperties["data"] = inputData;
  var datasets = [];
  datasets.push(dataSetProperties);
  return { labels: labels,
    datasets: datasets
  }
}

function getSpotifyTracks(callback){
  $.ajax({
    url: url,
    dataType: 'jsonp',
    success: function(data){
      callback(data);
    }
  })
}

function success(parsedJSON) {
  var topTwenty = extractTop20Tracks(parsedJSON.tracks);
  var topTwentyNames = extractNames(topTwenty);
  var numberOfStreams = extractNumberOfStreams(topTwenty);
  var data = chartData(topTwentyNames, numberOfStreams);
  var ctx = document.getElementById('spotify-chart').getContext('2d')
  var spotifyBarChart = new Chart(ctx).Bar(data);
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop20Tracks - pass it tracks
  //  2. extractNames -  pass it the result of #1
  //  3. extractNumberOfStreams - pass it the result of #1
  //  4. chartData - pass it results of #2 and #3
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  //  6. make a new bar chart!
}
