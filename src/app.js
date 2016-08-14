/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var stopWatchTime = 0;

function pad(num, size) {
	var s = "0000" + num;
	return s.substr(s.length - size);
}

function formatTime(time) {
	var h = 0;
  var m = 0;
  var s = 0;
  //var ms = 0;
	var newTime = '';

	h = Math.floor( time / (60 * 60) );
	time = time % (60 * 60);
	m = Math.floor( time / (60) );
	time = time % (60);
	s = Math.floor( time );

	newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2);
	return newTime;
}


var main = new UI.Window({
  backgroundColor: 'black'
});

  var radial = new UI.Radial({
    size: new Vector2(140, 140),
    angle: 0,
    angle2: 0,
    radius: 20,
    backgroundColor: 'cyan',
    borderColor: 'celeste',
    borderWidth: 1,
  });
  var textfield = new UI.Text({
    size: new Vector2(140, 60),
    font: 'gothic-24-bold',
    text: formatTime(stopWatchTime),
    textAlign: 'center',
    updateTimeUnits: 'second'
  });
  var windSize = main.size();
  // Center the radial in the window
  var radialPos = radial.position()
      .addSelf(windSize)
      .subSelf(radial.size())
      .multiplyScalar(0.5);
  radial.position(radialPos);
  // Center the textfield in the window
  var textfieldPos = textfield.position()
      .addSelf(windSize)
      .subSelf(textfield.size())
      .multiplyScalar(0.5);
  textfield.position(textfieldPos);
  main.add(radial);
  main.add(textfield);

var stopWatch = setInterval(updateTimer, 1000);

function stopTimer() {
  clearInterval(stopWatch);  
}
function startTimer() {
  stopWatch = setInterval(updateTimer, 1000);
}
function updateTimer() {
  textfield.text(formatTime(stopWatchTime));
  console.log("New time = " + formatTime(stopWatchTime));
  radial.angle2((stopWatchTime *6) % 360);
  stopWatchTime += 1;
}
function resetTimer() {
  stopWatchTime = 0;
  updateTimer();
}


main.on('click', 'up', startTimer);
main.on('click', 'down', stopTimer);
main.on('click', 'select', resetTimer);
main.show();
