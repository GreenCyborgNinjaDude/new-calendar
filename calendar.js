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

        daysInMonth = padDaysHead.reverse().concat(daysInMonth);
        daysInMonth.forEach((element) => {
          var date = createTag(dateSlot, "div", (tag) => {
            tag.className = "date";
            tag.textContent = element.date.getDate();
            if (element.dayType === "norm") {
              tag.style.backgroundColor = "wheat";
            } else {
              tag.style.backgroundColor = "grey";
            }
          });
        });
        console.log(daysInMonth);

        return daysInMonth;
      }
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
