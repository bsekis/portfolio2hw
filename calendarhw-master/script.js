var $currentDay = $("#currentDay");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");

var scheduleBlocks = [];
 
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

function initializeSchedule(){
//  console.log(scheduleBlocks);

  $timeBlocks.each(function(){
    var $thisBlock = $(this);
    var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

    var todoObj = {
    
      hour: thisBlockHr,
    
      text: "",
    }
    scheduleBlocks.push(todoObj);
  });

  // save objects to local storage 
  localStorage.setItem("scheduleBlocks", JSON.stringify(scheduleBlocks));
  //console.log(scheduleBlocks);
}

//format colors based on time
function setUpTimeBlocks(){
    $timeBlocks.each(function(){
      var $thisBlock = $(this);
      var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

      //add style to time blocks based on current time
      if (thisBlockHr == currentHour) {
        $thisBlock.addClass("present").removeClass("past future");
      }
      if (thisBlockHr < currentHour) {
        $thisBlock.addClass("past").removeClass("present future");
      }
      if (thisBlockHr > currentHour) {
        $thisBlock.addClass("future").removeClass("past present");
      }
    });
}

function renderSchedule(){
  
    scheduleBlocks = localStorage.getItem("scheduleBlocks");
    scheduleBlocks = JSON.parse(scheduleBlocks);

  for (var i = 0; i < scheduleBlocks.length; i++){
    var itemHour = scheduleBlocks[i].hour;
    var itemText = scheduleBlocks[i].text; 
   
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }

  console.log(scheduleBlocks);
}

function saveHandler(){
  var $thisBlock = $(this).parent();

  var hourToUpdate = $(this).parent().attr("data-hour");
  var itemToAdd = (($(this).parent()).children("textarea")).val();

 
  for (var j = 0; j < scheduleBlocks.length; j++){
    if (scheduleBlocks[j].hour == hourToUpdate){
      //set text in text area
      scheduleBlocks[j].text = itemToAdd;
    }
  }
  localStorage.setItem("scheduleBlocks", JSON.stringify());
  renderSchedule();
}

// when page loads set up time block based on current time
$(document).ready(function(){

 
  setUpTimeBlocks();
  if(!localStorage.getItem("scheduleBlocks")){
    initializeSchedule();
  }

  //display current date
  $currentDay.text(currentDate);

  //render schedule from local storage
  renderSchedule();
  //save item when save button is clicked
  $scheduleArea.on("click", "button", saveHandler);
  
});
