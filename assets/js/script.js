// Initialize Firebase
var config = {
apiKey: "AIzaSyAr5ghWLi-msSrtXVPQAR1qL-40ysKk23E",
authDomain: "train-times-38936.firebaseapp.com",
databaseURL: "https://train-times-38936.firebaseio.com",
projectId: "train-times-38936",
storageBucket: "train-times-38936.appspot.com",
messagingSenderId: "8427823775"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";
var e = 0;
var ide = [];


function sendtoFB() {
	trainName = $("#train-name").val().trim();
	destination = $("#destination").val().trim();
	firstTrainTime = $("#first-train").val().trim();

	database.ref().push({
		trainName:trainName,
		destination:destination,
		firstTrainTime:firstTrainTime
	});
};

// Time Converter
function timeConvert(sec) {
	var date = new Date(null);
	date.setSeconds(sec); // specify value for SECONDS here
	momentTime = date.toISOString().substr(11, 8);
};

// Send to Firebase
database.ref().on("child_added", function(snapshot) {
	console.log(snapshot.val());
	var times = snapshot.val().firstTrainTime;
	var newRow = $('<tr>');
	$('.train-div').append(newRow);
	newRow.append("<td>" + snapshot.val().trainName + "</td>");
	newRow.append("<td>" + snapshot.val().destination + "</td>");
	newRow.append("<td>" + moment(times, "hmm").format("HH:mm") + "</td>");
	var lastRow = $('<td class="last">');
	newRow.append(lastRow);

	function liveTime() {
		var momentTime = moment(times, "HH:mm").diff(moment(), "seconds");
		var date = new Date(null);
		date.setSeconds(momentTime); 
		newTime = date.toISOString().substr(11, 8);
		lastRow.html(newTime);
	}
	liveTime();
	setInterval(liveTime, 1000);
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// Show's Time Live
function showTime() {
	$('.current-time').html(moment().format('MMMM Do YYYY, h:mm:ss a'));
}
showTime();
setInterval(showTime, 1000);
