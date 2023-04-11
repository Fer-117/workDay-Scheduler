let todoContainer = $("#parentDiv");
let textContainer = $("textarea");
const hours = 24;

// let iElement = $("<i>");
// let button = $("<button>");
// let textArea = $("<textarea>");
// let hourDiv = $("<div>");
// let todoDiv = $("<div>");
let currentTime = dayjs().hour();
const items = { ...localStorage };

function colorCode() {
  let currentId = parseInt($(this).attr("id"));
  console.log(currentId);
  if (currentId > currentTime) {
    $(this).addClass("future");
  } else if (currentId == currentTime) {
    $(this).addClass("present");
  } else if (currentId < currentTime) {
    $(this).addClass("past");
  }
}

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  todoContainer.on("click", "button", (event) => {
    event.stopPropagation();
    // event.preventDefault();
    let parentID = event.target.parentElement.id;
    let textSibling = event.target.previousElementSibling.value;

    if (textSibling === null) {
      return;
    } else {
      localStorage.setItem(parentID, textSibling);
      console.log(textSibling);
    }
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  for (let i = 1; i <= hours; i++) {
    todoContainer.append(
      $("<div>")
        .prop({
          id: i,
          className: "row time-block todo",
        })
        .append(
          $("<div>").prop({
            innerHTML: i + " hour(s)",
            className: "col-2 col-md-1 hour text-center py-3",
          }),
          $("<textarea>").prop({
            className: "col-8 col-md-10 description",
            rows: "3",
          }),
          $("<button>")
            .prop({
              className: "btn saveBtn col-2 col-md-1",
              "aria-label": "save",
            })
            .append(
              $("<i>").prop({
                className: "fas fa-save",
                "aria-hidden": "true",
              })
            )
        )
    );
  }
  let todoArray = $(".todo");

  todoArray.each(colorCode);

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // TODO: Add code to display the current date in the header of the page.
  let today = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(today);
});
