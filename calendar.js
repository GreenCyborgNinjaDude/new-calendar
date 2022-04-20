function initCalendar(elementId, settings) {
  //month in full title
  let monthTitle = [
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
  let daysInTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  var parent = createCalendarContainerWhole();
  createMonthContainer(parent);
  createCalendarContainerInside(parent, settings);

  // calendar-container-whole
  function createCalendarContainerWhole() {
    var calendarContainerWhole = document.getElementById(elementId);
    calendarContainerWhole.className = "calendar-container-whole";
    return calendarContainerWhole;
  }

  // month-container
  function createMonthContainer(parent) {
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
        tag.textContent = "April  2022";
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
          setings.onLeftClick && setings.onLeftClick();
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

        tag.onclick = () => {
          setings.onRightClick && setings.onRightClick();
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
    createDateSlot();

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

    //date-slot
    function createDateSlot() {
      var dateSlot = createTag(calendarContainerInside, "div", (tag) => {
        tag.className = "date-container";
      });
      var currentYear = settings.value.getFullYear();
      var currentMonth = settings.value.getMonth();
      var daysInMonth = [];

      /*generateDaysInMonth();

      //Calculate & generate dates in a month
      function generateDaysInMonth() {
        var date = createTag(dateSlot, "div", (tag) => {
          tag.className = "date";
          tag.style.backgroundColor = "wheat";
        });

        var firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDate();
        var lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0 ).getDate();

        for (var i = firstDayOfMonth; i <= lastDayOfMonth; i++) {
          var date = new Date(currentYear, currentMonth);
          date.setDate(i);
          daysInMonth.push(date);
          date.appendChild()
          //console.log(date);
        }

        //console.log(daysInMonth);

        return daysInMonth;
      }

      //Calculate & generate padding day (head front)
      function generatePadDayHead() {
        var padHead = createTag(dateSlot, "div", (tag) => {
          tag.className = "date";
          tag.style.backgroundColor = "grey";
        });
        var padDaysHead = [];
        var firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        for (var i = 0; i < firstDayOfMonth; i++) {
          var j = i;
          padDaysHead.push(new Date(currentYear, currentMonth, -j));
          //console.log("head " + i + ": " + padDaysHead[i]);
        }
        return padDaysHead.reverse();
      }

      //Calculate & generate padding day (tail end)
      function generatePadDayTail() {
        var padTail = createTag(dateSlot, "div", (tag) => {
          tag.className = "date";
          tag.style.backgroundColor = "grey";
        });
        var padDaysTail = [];
        var lastDayOfMonth = new Date(
          currentYear,
          currentMonth + 1,
          0
        ).getDay();
        //console.log("lastDayOfMonth:" + lastDayOfMonth);
        for (var i = lastDayOfMonth, j = 1; i < 6; i++, j++) {
          padDaysTail.push(new Date(currentYear, currentMonth + 1, j));
        }
        //for (var k = 0; k < padDaysTail.length; k++) {
        //  console.log("Tail " + k + ": " + padDaysTail[k]);
        //}
        return padDaysTail;
      }*/
    }
  }

  //create tag & set style for that tag
  function createTag(parent, type, adjustStyleCallback) {
    var tag = document.createElement(type);
    adjustStyleCallback(tag);
    parent.appendChild(tag);
    return tag;
  }
}
