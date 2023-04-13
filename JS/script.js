// Variable for the parent container where each ToDo block is generated
let todoContainer = $("#parentDiv");
// An array of all of the blocks, 1 block for each hour of the day
let todoArray = $(".todo");

// The current time from the dayjs api
let currentTime = parseInt(dayjs().format("H"));

// gets the id from each to do block and compares it to the current time to set the color
function colorCode() {
  // gets the id of the div with the id in format "hour-#" by spliting at the dash (-)
  let currentId = parseInt($(this).attr("id").split("-")[1]);
  // compares the id of the divs to the current time of the day
  if (currentId > currentTime) {
    $(this).addClass("future");
  } else if (currentId == currentTime) {
    $(this).addClass("present");
  } else if (currentId < currentTime) {
    $(this).addClass("past");
  }
}

$(function () {
  // get the items from local storage to display in the text areas
  for (let i = 1; i <= 24; i++) {
    let todoText = localStorage.getItem(`hour-${i}`);
    if (todoText !== null) {
      $(`#hour-${i}`).find("textarea").val(todoText);
    }
  }

  // Adds a listener on the container for all of the save buttons
  /*
    It uses even delegation so it will only activate when we click on a button (save button)
    then it will get the parent div of the button which has the id's in the format "hour-#".
    When it has the id it will store that id along with the text from the text area in 
    local storage only if there is text to be stored. 
  */
  todoContainer.on("click", "button", (event) => {
    let parentDiv = $(event.target).closest(".time-block");
    let parentId = parentDiv.attr("id");
    let idArr = parentId.split("-");
    let hourId = idArr[1];
    let todoText = parentDiv.find("textarea").val();

    if (todoText.trim() !== "") {
      // Set todoText to local storage
      localStorage.setItem(`hour-${hourId}`, todoText);
    }
  });

  /* 
  Get any user input that was saved in localStorage and set the values of the corresponding 
  textarea elements
  Display the current date in the header of the page
  */
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  // Set the colors of the time-blocks based on the current time
  todoArray.each(colorCode);
});
