var today_obj = new Date(Date.now());
cal = $('#calendar');

console.log(Lunar.getLunarDateStr(today_obj) + " - " + Lunar.termStr(today_obj));
CalendarTable(today_obj.getYear()+1900, today_obj.getMonth());

function CalendarTable(year, month) {
    calendar = cal.find('#lunar')[0];
    calendar.innerHTML = "";
    calendar.setAttribute("year", year);
    calendar.setAttribute("month", month);

    var week_arr = new Array('日', '一', '二', '三', '四', '五', '六');
    var month_arr = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
    var days = new Array(31, 28, 31, 30, 31, 30,
                         31, 31, 30, 31, 30, 31);
    var date = new Date(year, month, 1);
    // 閏年
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        days[1] = 29;
    }

    var getWeekDay = date.getDay();
    var tempArray = new Array();
    for (var i = 0; i < getWeekDay; i++) tempArray.push(0);
    for (var i = 1; i <= days[month]; i++) tempArray.push(i);
    var getWeekCount = Math.ceil(tempArray.length / 7);
    var tempInt = 0;

    var caption = document.createElement("caption");
    caption.textContent = year + " " + month_arr[month];
    calendar.appendChild(caption);

    var btn_prev = document.createElement("span");
    btn_prev.textContent = '<-';
    btn_prev.addEventListener("click", function() {
        calendar = document.getElementById('lunar');
        m = (parseInt(calendar.getAttribute("month"))+11)%12;
        y = parseInt(calendar.getAttribute("year"));
        if (m == 11) { y = y - 1; }
        CalendarTable(y,m);
    });
    caption.insertBefore(btn_prev, caption.childNodes[0]);

    var btn_prev_y = document.createElement("span");
    btn_prev_y.textContent = '<=';
    btn_prev_y.addEventListener("click", function() {
        calendar = document.getElementById('lunar');
        m = parseInt(calendar.getAttribute('month'));
        y = parseInt(calendar.getAttribute('year'))-1;
        CalendarTable(y,m);
    });
    caption.insertBefore(btn_prev_y, caption.childNodes[0]);

    var btn_next = document.createElement("span");
    btn_next.textContent = '->';
    btn_next.addEventListener("click", function() {
        calendar = document.getElementById('lunar');
        m = (parseInt(calendar.getAttribute("month"))+1)%12;
        y = parseInt(calendar.getAttribute("year"));
        if (m == 0) { y = y + 1; }
        CalendarTable(y,m);
    });
    caption.appendChild(btn_next);

    var btn_next_y = document.createElement("span");
    btn_next_y.textContent = '=>';
    btn_next_y.addEventListener("click", function() {
        m = parseInt(calendar.getAttribute("month"));
        y = parseInt(calendar.getAttribute("year"))+1;
        CalendarTable(y,m);
    });
    caption.appendChild(btn_next_y);

    var tr = document.createElement("tr");
    for (var i = 0; i < week_arr.length; i++) {
        var td = document.createElement("td");
        td.textContent = week_arr[i];
        tr.appendChild(td);
    }
    calendar.appendChild(tr);
    for (var i = 0; i < getWeekCount; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < week_arr.length; j++) {
            if (typeof tempArray[tempInt] == "undefined") {
                tempArray.push(0);
            } else if (tempArray[tempInt] < 0) {
                tempArray[tempInt] = 0;
            }
            var td = document.createElement("td");
            td.textContent = (tempArray[tempInt] == 0) ? "" : tempArray[tempInt];
            if (td.textContent != "") {
                td.appendChild(document.createElement("br"));
                var t_span = document.createElement("span");
                t_span.setAttribute("style", "font-size: 50%;");
                t_span.textContent = Lunar.getSimpleLunarDateStr(new Date(year, month, tempArray[tempInt], 12));
                td.appendChild(t_span);
            }
            if (today_obj.getDate() == tempArray[tempInt] && today_obj.getMonth() == month && today_obj.getYear() == year-1900) {
                td.style.backgroundColor = '#EECCEE';
            }
            tr.appendChild(td);
            tempInt++;
        }
        calendar.appendChild(tr);
    }
    return calendar;
}