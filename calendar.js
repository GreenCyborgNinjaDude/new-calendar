
//month in full title
var monthTitle = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

//days in the week
var daysInTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//Calendar function & render
function initCalendar(elementId, settings) {
  let state = {
    value: undefined,
    events: undefined,
  };

  init();

  function init() {
    state.value = settings.value;
    state.events = settings.events;
    render();
  }

  function render() {
    var parent = createCalendarContainerWhole();
    createMonthContainer(parent, settings);
    createCalendarContainerInside(parent, settings);
  }

  // calendar-container-whole
  function createCalendarContainerWhole() {
    var calendarContainerWhole = document.getElementById(elementId);
    removeAllChildNodes(calendarContainerWhole);

    calendarContainerWhole.className = "calendar-container-whole";
    return calendarContainerWhole;
  }

  // month-container
  function createMonthContainer(parent, settings) {
    var monthContainer = createTag(parent, "div", (tag) => {
      tag.className = "month-container";
    });

    createMonthContainerLeftArrow();
    createMonthContainerTitle();
    createMonthContainerRightArrow();

    //month-title
    function createMonthContainerTitle() {
      var titleContainer = createTag(monthContainer, "div", (tag) => {
        tag.className = "title-container";
      });

      createTag(titleContainer, "span", (tag) => {
        tag.className = "month-title";
        tag.textContent =
          monthTitle[state.value.getMonth()] + " " + state.value.getFullYear();
      });
    }
    //month-left-arrow
    function createMonthContainerLeftArrow() {
      var leftArrowContainer = createTag(monthContainer, "div", (tag) => {
        tag.className = "left-arrow-container";
      });

      createTag(leftArrowContainer, "i", (tag) => {
        tag.className = "arrow left";

        tag.onclick = () => {
          var currentMonth = state.value.getMonth();
          var currentYear = state.value.getFullYear();

          var nextMonth = currentMonth - 1;

          var newDate = new Date(currentYear, nextMonth, 1);
          state.value = newDate;
          settings.onRightClick && settings.onRightClick(newDate);

          settings.onLeftClick && settings.onLeftClick();

          render();
        };
      });
    }
    //month-right-arrow
    function createMonthContainerRightArrow() {
      var rightArrowContainer = createTag(monthContainer, "div", (tag) => {
        tag.className = "right-arrow-container";
      });

      createTag(rightArrowContainer, "i", (tag) => {
        tag.className = "arrow right";

        //on right arrow clicked logic
        tag.onclick = () => {
          var currentMonth = state.value.getMonth();
          var currentYear = state.value.getFullYear();

          var nextMonth = currentMonth + 1;

          var newDate = new Date(currentYear, nextMonth, 1);
          state.value = newDate;
          settings.onRightClick && settings.onRightClick(newDate);

          render();
        };
      });
    }
  }

  //calendar-container-inside
  function createCalendarContainerInside(parent, settings) {
    var calendarContainerInside = createTag(parent, "div", (tag) => {
      tag.className = "calendar-container-inside";
    });
    createDayOfTheWeek();
    createDateContainer();

    //day-of-the-week
    function createDayOfTheWeek() {
      var dayOfTheWeek = createTag(calendarContainerInside, "div", (tag) => {
        tag.className = "day-of-the-week";
      });
      renderDaysOfWeek();

      //render day-of-the-week
      function renderDaysOfWeek() {
        for (var i = 0; i < daysInTheWeek.length; i++) {
          day = createTag(dayOfTheWeek, "div", (tag) => {
            tag.className = "day";
            tag.appendChild(document.createTextNode(daysInTheWeek[i]));
          });
        }
        console.log("Successfully added days of the week");
      }
    }

    //date-container
    function createDateContainer() {
      var dateContainer = createTag(calendarContainerInside, "div", (tag) => {
        tag.className = "date-container";
      });
      var currentYear = state.value.getFullYear();
      var currentMonth = state.value.getMonth();
      var daysInMonth = [];
      var padDaysHead = [];

      generateDaysInMonth();

      //Calculate & generate dates in a month
      function generateDaysInMonth() {
        var firstDateOfMonth = new Date(currentYear, currentMonth, 1).getDate();
        var firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        var lastDayOfMonth = new Date(
          currentYear,
          currentMonth + 1,
          0
        ).getDay();
        var lastDateOfMonth = new Date(
          currentYear,
          currentMonth + 1,
          0
        ).getDate();

        //calculate padding day for previous month
        for (var i = 0; i < firstDayOfMonth; i++) {
          var j = i;
          padDaysHead.push({
            date: new Date(currentYear, currentMonth, -j),
            dayType: "pad",
          });
          //console.log("head " + i + ": " + padDaysHead[i]);
        }

        //calculate normal day
        for (var i = firstDateOfMonth; i <= lastDateOfMonth; i++) {
          var date = new Date(currentYear, currentMonth);
          date.setDate(i);

          daysInMonth.push({ date: date, dayType: "norm" });
          //console.log(date);
        }

        //calculate padding day for next month
        for (var i = lastDayOfMonth, j = 1; i < 6; i++, j++) {
          daysInMonth.push({
            date: new Date(currentYear, currentMonth + 1, j),
            dayType: "pad",
          });
          //console.log("head " + i + ": " + padDaysHead[i]);
        }

        //Join pad day head & the rest of the day
        daysInMonth = padDaysHead.reverse().concat(daysInMonth);

        //add style to pad day & normal day
        daysInMonth.forEach((element) => {
          var date = createTag(dateContainer, "div", (tag) => {
            //var hover = "table td:hover{ background-color: rgb(81, 189, 240)}";
            tag.className = "date";
            tag.textContent = element.date.getDate();

            if (element.dayType === "pad") {
              tag.style.backgroundColor = "grey";
            }

            //prevent adding unwanted event form & delete scripted event
            tag.ondblclick = () => {
              //alert("date is clicked");
              settings.onSetEvent && settings.onSetEvent();
              if (tag.children.length > 0) {
                state.events.forEach((selectedEvents) => {
                  if (selectedEvents.event === tag.children[0].textContent) {
                    state.events.splice(
                      state.events.indexOf(selectedEvents),
                      1
                    );
                    //console.log(state.events.length);
                  }
                });
                tag.removeChild(tag.children[1]);
                tag.removeChild(tag.children[0]);
              }
              createUserEvent(state.events);
              tag.ondblclick = () => {
                deleteUserEvent();
                createUserEvent(state.events);
              };
            };

            //Delete event container in date
            function deleteUserEvent() {
              date.removeAllChildNodes();
              date.textContent = element.date.getDate();
            }
            //An event container
            function createUserEvent() {
              var eventContainer = createTag(date, "div", (tag) => {
                tag.className = "event-container";
              });
              createEventArea();
              createTimeArea();
              createSubmitButton();

              //render write area for event
              function createEventArea() {
                var event = createTag(eventContainer, "textarea", (tag) => {
                  tag.className = "user-event";
                  tag.id = "user-event";
                  tag.setAttribute("placeholder", "New Event?");
                });
              }
              //render write area for time
              function createTimeArea() {
                var time = createTag(eventContainer, "textarea", (tag) => {
                  tag.className = "user-time";
                  tag.id = "user-time";
                  tag.setAttribute("placeholder", "HH:MM PM/AM");
                });
              }
              //Submition button
              function createSubmitButton() {
                var reminderCheck = false;
                var button = createTag(eventContainer, "input", (tag) => {
                  tag.className = "user-confirmation";
                  tag.setAttribute("type", "submit");
                  tag.onclick = () => {
                    settings.addEvent && settings.addEvent();
                    alert("clicked");

                    //check if a date does have a reminder
                    if (
                      document.getElementById("user-time").value != "" ||
                      null
                    ) {
                      reminderCheck = true;
                    }

                    //How event will be stored
                    let data = {
                      date:
                        monthTitle[element.date.getMonth()] +
                        " " +
                        element.date.getDate() +
                        " " +
                        element.date.getFullYear(),
                      time: document.getElementById("user-time").value,
                      event: document.getElementById("user-event").value,
                      reminder: reminderCheck,
                      //description: "here lies very boring text.....",
                    };

                    state.events.push(data);
                    // console.log(
                    //   daysInTheWeek[element.date.getDay()] +
                    //     " " +
                    //     monthTitle[element.date.getMonth()] +
                    //     " " +
                    //     element.date.getDate() +
                    //     " " +
                    //     element.date.getFullYear()
                    // );
                    // console.log(document.getElementById("user-event").value);
                    // console.log("Reminder: " + data.reminder);
                    // console.log(document.getElementById("user-time").value);
                    date.removeChild(eventContainer);

                    //render event to calendar
                    createTag(date, "div", (tag) => {
                      tag.className = "event";
                      tag.textContent = data.event;
                    });

                    //render time to calendar
                    createTag(date, "div", (tag) => {
                      tag.className = "time";
                      tag.textContent = data.time;
                    });
                  };
                });
              }
            }
          });

          renderScriptedEvent(state.events);
          setInterval(() => reminderNotification(state.events, element), 1000);

          // check & render event if there is one
          function checkEvents(element, eventHolder, date) {
            var checker = false;
            var currentDate =
              monthTitle[element.date.getMonth()].substring(0, 3) +
              " " +
              element.date.getDate() +
              " " +
              element.date.getFullYear();
            //console.log("currentDate: " + currentDate);
            eventHolder.forEach((currentEvent) => {
              if (currentEvent.date === currentDate) {
                checker = currentEvent;
              }
            });
            return checker;
          }

          function renderScriptedEvent() {
            if (checkEvents(element, state.events) != false) {
              createTag(date, "div", (tag) => {
                tag.className = "event";
                tag.textContent = checkEvents(element, state.events).event;
              });

              //render time to calendar
              createTag(date, "div", (tag) => {
                tag.className = "time";
                tag.textContent = checkEvents(element, state.events).time;
              });
            }
          }

          //alert user for event (5 min before)
          function reminderNotification(events, element) {
            var currentDate =
              monthTitle[element.date.getMonth()].substring(0, 3) +
              " " +
              element.date.getDate() +
              " " +
              element.date.getFullYear();
            events.forEach((selectedEvent) => {
              //console.log(
              //selectedEvent.date === currentDate
              //currentTime() === "03:41 PM"
              //selectedEvent.reminder === true
              //);
              if (
                selectedEvent.date === currentDate &&
                currentTime() ===
                  selectedEvent.alarm.substring(0, 5) +
                    ":" +
                    "00" +
                    selectedEvent.alarm.substring(5, 8) &&
                selectedEvent.reminder === true
              ) {
                alert(
                  "Event: " + selectedEvent.event + " At " + selectedEvent.time
                );
              }
            });
          }
          //
        });

        //console.log(daysInMonth);
        return daysInMonth;
      }
    }
  }
}

//set time very 1000 millisec or 1 sec
setInterval(() => currentTime(), 1000);

//Information Center (about the calander)
function initInfoCenter(elementId, settings){
  //state of Information Center
  let state = {
        events: undefined,
        value: undefined,
        dateShow: undefined,
        clickedDateshow: undefined,
        timeShow: undefined,
        eventShow: undefined,
  };
 
  if (settings.showInfoCenter === true){
    console.log("info-center is up: " + settings.showInfoCenter);
    init();
  }

  //store html input into state
  function init() {
    state.events = settings.events,
    state.value = settings.value,
    state.dateShow = settings.dateShow;
    state.clickedDateshow = settings.clickedDateshow;
    state.timeShow = settings.timeShow,
    state.eventShow = settings.eventShow,
    render();
  }

  //render all information center component
  function render(){
    var parent = createInfoCenter();
    createInformationTitle(parent);
    createDateShowContainer(parent, settings);
    //createClickedDateShowContainer(parent, settings);
    //createTimeShowContainer(parent, settings);
    //createEventShowContainer(parent, settings);
  }

  function createInfoCenter(){
    var infoCenter = document.getElementById(elementId);
    //removeAllChildNodes(infoCenter);
    infoCenter.className = "information-center";
    return infoCenter
  }

  function createInformationTitle(parent){
    var infoTitle = createTag(parent, "div", (tag) => {
      tag.className = "information-title"
      tag.textContent = "Information Center"
    }) 
  }
  
  function createDateShowContainer(parent){
    if(state.dateShow === true){
      var dateShow = createTag(parent, "div", (tag) =>{
        tag.className = "today-date-container"
      });
      createTodayHeader();
      createTodayDate();

      function createTodayHeader(){
          var todayTitle = createTag (dateShow, "div", (tag) => {
            tag.className = "today-date-header"
            tag.textContent = "Today's Date"
          })
      }

      function createTodayDate(){
        var todayDate = createTag (dateShow, "div", (tag) => {
          tag.className = "today-date"
          tag.textContent = daysInTheWeek[state.value.getDay()] + " - " + monthTitle[state.value.getMonth()] + "/" + state.value.getDate() + "/" + state.value.getFullYear()
        })
      }
    }
  }
}

//Current time calculator
function currentTime() {
  var currentDate = new Date();
  let hh = currentDate.getHours();
  let mm = currentDate.getMinutes();
  let ss = currentDate.getSeconds();
  let session = "AM";

  if (hh == 0) {
    hh = 12;
  }
  if (hh > 12) {
    hh = hh - 12;
    session = "PM";
  }

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  let time = hh + ":" + mm + ":" + ss + " " + session;

  //console.log("inside clock: " + time);
  return time;
}

//create tag & set style for that tag
function createTag(parent, type, adjustStyleCallback) {
  if (!parent) return;
  var tag = document.createElement(type);
  parent.appendChild(tag);
  adjustStyleCallback(tag);
  return tag;
}

//remove all element in a container
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}