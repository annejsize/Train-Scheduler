var config = {
  apiKey: "AIzaSyBUDDP_XbHnSsxBVMJs3204G5MpG5UFu1c",
  authDomain: "train-scheduler-47c71.firebaseapp.com",
  databaseURL: "https://train-scheduler-47c71.firebaseio.com",
  projectId: "train-scheduler-47c71",
  storageBucket: "",
  messagingSenderId: "832835406990"
};

firebase.initializeApp(config);

// Create a variable to reference the database

var database = firebase.database();

var name = "";
var role = "";
var startDate = "";
var monthlyRate = "";

$("#submit").on("click", function() {
  event.preventDefault();
  name = $("#train-name").val().trim();
  dest = $("#dest-input").val().trim();
  firstTime = $("#start-input").val().trim();
  freq = $("#freq-input").val().trim();
  timestamp = firebase.database.ServerValue.TIMESTAMP;

  var CurrentDate = moment();

    console.log(name);
    console.log(dest);
    console.log(firstTime);
    console.log(freq);
    console.log(CurrentDate);

      database.ref().push({
        name: name,
        dest: dest,
        time: firstTime,
        freq: freq,
        date: timestamp
});


database.ref().on("child_added", function(childSnapshot) {

  // console.log(childSnapshot.val());

// Do the calculations here
var firstTimeConverted = moment(childSnapshot.val().time, "hh:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
//
// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);
//
// Time apart (remainder)
var tRemainder = diffTime % childSnapshot.val().freq;
console.log(tRemainder);
//
// // Minute Until Train
var tMinutesTillTrain = childSnapshot.val().freq - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
//
// // Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



$("#train-list > tbody").append("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().dest + "</td><td>" +
childSnapshot.val().freq + " mins" + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + " mins");

// Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
});
