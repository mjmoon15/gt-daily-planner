$(document).ready(function () {
  // GIVEN I am using a daily planner to create a schedule
  // WHEN I open the planner
  // THEN the current day is displayed at the top of the calendar

  //Variables
  var timeblockContainer = $("#timeblock");

  //display current date at top

  var today = "Today is " + moment().format("MMMM DD");
  console.log(today);
  var now = parseInt(moment().format("HH"));
  console.log(now);
  function todayIs() {
    $("#currentDay").append(today);
  }
  todayIs();

  var defaultCalendar = [
    {
      time: 9,
      morning: true,
      notes: "",
    },
    {
      time: 10,
      morning: true,
      notes: "",
    },
    {
      time: 11,
      morning: true,
      notes: "",
    },
    {
      time: 12,
      morning: false,
      notes: "",
    },
    {
      time: 13,
      morning: false,
      notes: "",
    },
    {
      time: 14,
      morning: false,
      notes: "",
    },
    {
      time: 15,
      morning: false,
      notes: "",
    },
    {
      time: 16,
      morning: false,
      notes: "",
    },
    {
      time: 17,
      morning: false,
      notes: "",
    },
  ];

  // WHEN I scroll down
  // THEN I am presented with timeblocks for standard business hours
  //create timeblocks with jquery

  function makeTimeBlocks() {
    var cal;
    //storedCal variable to pull from local and parse back into object
    var storedCal = JSON.parse(localStorage.getItem("myCalendar"));
    //if cache is cleared, storedCal would be null, so return to defaultCalendar
    if (!storedCal) {
      storedCal = defaultCalendar;
    }
    if (storedCal) {
      cal = storedCal;
    }
    console.log("storedCal: " + storedCal);
    console.log("cal: " + cal);
    //compares each object in myCalendar array to determine AM/PM and set time block info
    cal.forEach(function (item, index) {
      var timeOfDay;
      var displayTime = item.time;
      //edge case at noon
      if (!item.morning && item.time !== 12) {
        displayTime = item.time - 12;
      } else if (item.time == 12) {
        displayTime = item.time;
      }
      if (item.morning) {
        timeOfDay = " AM";
      } else {
        timeOfDay = " PM";
      }

      var row = $(`<div id=${index} class="row" />`).appendTo(".container");

      //Create left time block
      var leftBlock = $("<div />", {
        text: displayTime + timeOfDay,
        // className: classUsed
      }).appendTo(row);

      // WHEN I click into a timeblock
      // THEN I can enter an event
      //Create middle input block and connect to object.notes
      var middleBlock = $(`<input />`, {
        id: item.time,
        text: item.notes,
        class: setTimeColor(item),
      }).appendTo(row);
      $(`#${item.time}`).attr("value", item.notes);

      //Create right save block
      var rightBlock = $("<button class='saveBtn' />").appendTo(row);
    });
  }
  makeTimeBlocks();

  // WHEN I view the timeblocks for that day
  // THEN each timeblock is color coded to indicate whether it is in the past, present, or future

  function setTimeColor(item) {
    //Set block to past
    if (item.time < now) {
      return "past";
    }
    //Set block to present
    else if (item.time == now) {
      return "present";
    }
    //Set block to future
    else {
      return "future";
    }
  }

  // WHEN I click the save button for that timeblock
  // THEN the text for that event is saved in local storage

  $("button").on("click", function () {
    var myCalendar = JSON.parse(localStorage.getItem("myCalendar"));
    //if cache is cleared, myCalendar would be null, so return to default
    if (!myCalendar) {
      myCalendar = defaultCalendar;
    }
    //using (this) to access the clicked save button and its closest div
    var clickedIndex = $(this).closest("div").attr("id");
    var row = myCalendar[clickedIndex];
    //specifying whole row after click
    var value = $(`#${row.time}`).val();
    console.log(value);
    myCalendar[clickedIndex].notes = value;
    console.log(myCalendar);
    //storing input in specific lines to
    localStorage.setItem("myCalendar", JSON.stringify(myCalendar));
  });
});
