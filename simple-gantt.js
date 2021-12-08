function SimpleGantt(tag, tasks, option) {
    let element = byId(tag);
    let dayCount = dayTime(option.start, option.end);
    let totalHtml = ''
    let title = '<div>'
    let date = getDate(option.start);
    let body = '<div class="gantt-body">'
    let bodyBg = ''
    for (let i = 0; i <= dayCount; i++) {
        title += `<span class="gantt-title gantt-col-${i}">${date.getDate()}</span>`
        bodyBg += `<span class="gantt-box gantt-col-${i}"></span>`
        date.setDate(date.getDate() + 1)
    }
    title += '</div>'

    //tasks
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let taskCount = 1;
        if (task.end) {
            taskCount = dayTime(task.start, task.end);
        }
        let leftCount = dayTime(option.start, task.start);
        body += `<div class="gantt-line">`
        body += `<div class="gantt-task" 
               style="left:${leftCount * 20}px;height:20px;width:${taskCount * 20}px"
               >
               ${task.name}
               </div>`
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
    totalHtml += title;
    totalHtml += body;
    element.innerHTML = totalHtml


    function byId(tag) {
        return document.getElementById(tag)
    }

    Date.prototype.format = function () {
        return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
    }

    function dayTime(start, end) {
        start = getDate(start).getTime();
        end = getDate(end).getTime();
        return (end - start) / (1000 * 60 * 60 * 24)
    }

    function getDate(date) {
        return new Date(date.replace(/-/g, "/"))
    }
}
