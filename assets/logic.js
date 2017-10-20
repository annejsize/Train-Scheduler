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
  name = $("#trainName").val().trim();
  dest = $("#destination").val().trim();
  firstTime = moment($("#firstTime").val(),"HH:mm").diff(moment(),"minutes");
  freq = $("#frequency").val().trim();
  timestamp = firebase.database.ServerValue.TIMESTAMP;

    console.log(name);
    console.log(dest);
    console.log(firstTime);
    console.log(frequency);

      database.ref().push({
        name: name,
        dest: dest,
        time: firstTime,
        freq: freq,
        date: timestamp
});


// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on("child_added", function(childSnapshot) {

  // Log everything that's coming out of snapshot
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().dest);
  console.log(childSnapshot.val().time);
  console.log(childSnapshot.val().freq);


  // full list of items to the well
  $("#train-list").append("<div class='well'><span id='name'> " + childSnapshot.val().name +
    " </span><span id='dest'> " + childSnapshot.val().dest+
    " </span><span id='time'> " + childSnapshot.val().time +
    " </span><span id='freq'> " + childSnapshot.val().freq + " </span></div>");

// Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
});
