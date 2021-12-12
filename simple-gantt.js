function SimpleGantt(tag, tasks, option) {
    let element = document.getElementById(tag);
    let dayCount = dayTime(option.start, option.end);
    let totalHtml = ''
    let title = '<div>'
    let date = getDate(option.start);
    let body = '<div class="gantt-body">'
    let bodyBg = ''

    let monthTitle = '<div>'
    let monthTitleArr = [
        {
            month:(date.getMonth()+1),
            box:1
        }
    ]
    let monthTitleFlag = 0;
    for (let i = 0; i <= dayCount; i++) {

        if(i!==0){
            if(monthTitleArr[monthTitleFlag].month!==date.getMonth()+1){
                monthTitleFlag++;
                monthTitleArr[monthTitleFlag] = {}
                monthTitleArr[monthTitleFlag].month = date.getMonth()+1
                monthTitleArr[monthTitleFlag].box = 1
            }else{
                monthTitleArr[monthTitleFlag].box++;
            }
        }
        let weekend  =''
        if(date.getDay()===6||date.getDay()===0){
            weekend = 'weekend'
        }
        title += `<span class="gantt-title gantt-col-${i} ${weekend}">${date.getDate()}</span>`
        bodyBg += `<span class="gantt-box gantt-col-${i} ${weekend}"></span>`
        date.setDate(date.getDate() + 1)
    }
    title += '</div>'

    for (let i = 0; i < monthTitleArr.length; i++) {

        monthTitle += `<span class="gantt-month"
        style="width:${monthTitleArr[i].box * 20}px;"
        >${monthTitleArr[i].month}</span>`
    }
    monthTitle += '</div>'

    //tasks
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let taskCount = 1;
        if (task.end) {
            taskCount = dayTime(task.start, task.end);
        }
        let leftCount = dayTime(option.start, task.start);
        let bgColor = option.statusColor[task.status];
        if(bgColor){
            bgColor = `background-color: ${bgColor};`
        }
        body += `<div class="gantt-line">`
        body += `<div class="gantt-task" 
               style="left:${leftCount * 20}px;height:20px;width:${taskCount * 20}px;
               ${bgColor}">
               </div>`
        if(!task.dev){
            task.dev = ''
        }
        body += `<div class="gantt-task-text" style="left:${5+leftCount * 20}px;height:20px;">【${task.dev}】${task.name}</div>`
        body += `<div class="gantt-bg">${bodyBg}</div>`
        body += `</div>`
    }

    //deadline
    for (let i = 0; i < option.deadline.length; i++) {
        let leftCount = dayTime(option.start, option.deadline[i].date);
        body += `<div style="
            left: ${leftCount * 20}px;
            background-color: ${option.deadline[i].backgroundColor};
            color: ${option.deadline[i].color}
            "
            class="gantt-deadline-title"
            >${option.deadline[i].title}</div>`

        body += `<div style="
            left: ${leftCount * 20}px;
            background-color: ${option.deadline[i].backgroundColor}
            " 
            class="gantt-deadline"
            ></div>`
    }

    body += '</div>'

    totalHtml += monthTitle;
    totalHtml += title;
    totalHtml += body;
    element.innerHTML = totalHtml


    function dayTime(start, end) {
        start = getDate(start).getTime();
        end = getDate(end).getTime();
        return (end - start) / (1000 * 60 * 60 * 24)
    }

    function getDate(date) {
        return new Date(date.replace(/-/g, "/"))
    }
}
