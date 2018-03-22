
// Initialize firebase


var config = {
    apiKey: "AIzaSyC_rBfuOIMHdLePbBbPEMz7ZXBLa-gmkf8",
    authDomain: "train-f6ade.firebaseapp.com",
    databaseURL: "https://train-f6ade.firebaseio.com",
    projectId: "train-f6ade",
    storageBucket: "train-f6ade.appspot.com",
    messagingSenderId: "893040600388"
};
firebase.initializeApp(config);
console.log(config);

// Create a variable to reference the database
var database = firebase.database();
console.log(database);

// Initial values

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";
var minutesUntilTrain="";
var nextTrain="";
// Capture button click
$("#submit").on("click", function () {
    //Dont refresh the page!
    event.preventDefault();

    trainName = $("#train-name-input").val().trim();
    destination = $("#dest-input").val().trim();
    firstTrainTime = $("#first-train-time-input").val().trim();
    frequency = $("#frequency-input").val().trim();


    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    })
})

// Firebase watcher + initial loader
database.ref().on("child_added", function (snapshot) {


    // Log everything thats coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().trainName);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().firstTrainTime);
    console.log(snapshot.val().frequency);
    console.log(snapshot.val().minutesUntilTrain);
    console.log(snapshot.val().nextTrain);
    // calculate variables before appending to the page
    // nextTrain = moment().add(minutesUntilTrain, "minutes");
    // console.log(nextTrain);
    // minutesUntilTrain = firstTrainTime+

    // console.log(minutesUntilTrain)
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log("FIRST TIME CONVERTED" + firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME" + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME:" + diffTime);

    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    var minutesUntilTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesUntilTrain);

    var nextTrain = moment().add(minutesUntilTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    console.log("NT " + nextTrain);

    var nextTrain2 = moment(nextTrain).format("hh:mm");
    console.log("NT2 " + nextTrain2);

    // Change the HTML to reflect
    $("#train-append").append("<tr> <td>" + (snapshot.val().trainName) + "</td>" + "<td>" + (snapshot.val().destination) + "</td>" + "<td>" + (snapshot.val().frequency) + "</td>" + "<td>" + (nextTrain2) + "</td>" + "<td>" + (minutesUntilTrain) + "</td> </tr>");

    //handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);

});
