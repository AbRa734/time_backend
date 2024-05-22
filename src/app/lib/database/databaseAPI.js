import supabase from "./supabase.js";

export async function getUsers()
{
    try {
        const { data: notes_users, error } = await supabase
            .from('notes_users')
            .select('id, fullName, email, password, hiddenOptions, photoUrl')


        if (error)
            console.error(`Couldn't get users info! ${error}`);

        return notes_users;
    }
    catch (err)
    {
        console.error(`Couldn't get users info! ${err}`);
    }
}

export async function createUser(userName, userEmail, userPassword)
{
    try {
        const { data, error } = await supabase
            .from('notes_users')
            .insert([
                { fullName: userName, email: userEmail, password: userPassword },
            ])
            .select()

        if (error)
            console.error(`Couldn't add new note! ${error}`);

        return data;
    }
    catch (err)
    {
        console.error(`Couldn't add new user! ${err}`);
    }
}

export async function addNote(title, description, category, userId)
{
    try {
        const { data, error } = await supabase
            .from('notes_notes')
            .insert([
                { userId: userId, heading: title, content: description, category: category },
            ])
            .select()

        if (error)
            console.error(`Couldn't add new note! ${error}`);

        return data;
    }
    catch (err)
    {
        console.error(`Couldn't add new note! ${err}`);
    }
}

export async function getNotes(userId, category)
{
    if (!category)
        category= ["Dom", "Praca", "Rodzina"]
    try {
        let { data: notes_notes, error } = await supabase
            .from('notes_notes')
            .select('id, created_at, heading, content, category, completed')
            .in('category', category)

        if (error)
            console.error(`Couldn't get users info! ${error}`);

        return notes_notes;
    }
    catch (err)
    {
        console.error(`Couldn't get users info! ${err}`);
    }
}

export async function editNote(noteId, action, payload)
{
    try
    {
        if (action === "markAsCompleted")
        {
            const { error } = await supabase
                .from('notes_notes')
                .update({ completed: !payload })
                .eq('id', noteId)

            if (error)
                console.error(`Couldn't update note info! ${error}`);
        }
        else if (action === "editNote")
        {
            const { error } = await supabase
                .from('notes_notes')
                .update({ heading: payload.heading, content: payload.content, category: payload.category })
                .eq('id', noteId)

            if (error)
                console.error(`Couldn't update note info! ${error}`);

        }
        else if (action === "deleteNote")
        {
            const { error } = await supabase
                .from('notes_notes')
                .delete()
                .eq('id', noteId)

            if (error)
                console.error(`Couldn't update note info! ${error}`);
        }
    }
    catch (err)
    {
        console.error(`Couldn't update note info! ${err}`);
    }
}

export async function editTodo(todoId, action, payload)
{
    try
    {
        if (action === "markAsCompleted")
        {
            const { error } = await supabase
                .from('notes_todos')
                .update({ completed: !payload })
                .eq('id', todoId)

            if (error)
                console.error(`Couldn't update todo info! ${error}`);
        }
        else if (action === "editNote")
        {
            const { error } = await supabase
                .from('notes_todos')
                .update({ heading: payload.heading, content: payload.content, category: payload.category })
                .eq('id', todoId)

            if (error)
                console.error(`Couldn't update todo info! ${error}`);

        }
        else if (action === "deleteNote")
        {
            const { error } = await supabase
                .from('notes_todos')
                .delete()
                .eq('id', todoId)

            if (error)
                console.error(`Couldn't update todo info! ${error}`);
        }
    }
    catch (err)
    {
        console.error(`Couldn't update todo info! ${err}`);
    }
}

export async function addTodo(title, description, category, userId)
{
    try {
        const { data, error } = await supabase
            .from('notes_todos')
            .insert([
                { userId: userId, heading: title, content: description, category: category },
            ])
            .select()

        if (error)
            console.error(`Couldn't add new todo! ${error}`);

        return data;
    }
    catch (err)
    {
        console.error(`Couldn't add new todo! ${err}`);
    }
}

export async function getTodos(userId, category)
{
    if (!category)
        category= ["Wstrzymane", "Do zrobienia", "Ukończone"]
    try {
        let { data: notes_todos, error } = await supabase
            .from('notes_todos')
            .select('id, created_at, heading, content, category, completed')
            .in('category', category)

        if (error)
            console.error(`Couldn't get users info! ${error}`);

        return notes_todos;
    }
    catch (err)
    {
        console.error(`Couldn't get users info! ${err}`);
    }
}

export async function addCategory(title, description, userId)
{
    try {
        const { data, error } = await supabase
            .from('notes_categories')
            .insert([
                { userId: userId, categoryName: title, color: description },
            ])
            .select()

        if (error)
            console.error(`Couldn't add new category! ${error}`);

        return data;
    }
    catch (err)
    {
        console.error(`Couldn't add new category! ${err}`);
    }
}

export async function getCategories(userId)
{
    try {
        let { data: notes_categories, error } = await supabase
            .from('notes_categories')
            .select('id, created_at, userId, categoryName, color')
            .eq('userId', userId)

        if (error)
            console.error(`Couldn't get users categories! ${error}`);

        return notes_categories;
    }
    catch (err)
    {
        console.error(`Couldn't get users categories! ${err}`);
    }
}

export async function addStatus(title, description, userId)
{
    try {
        const { data, error } = await supabase
            .from('notes_todos_statuses')
            .insert([
                { userId: userId, statusName: title, color: description },
            ])
            .select()

        if (error)
            console.error(`Couldn't add new status! ${error}`);

        return data;
    }
    catch (err)
    {
        console.error(`Couldn't add new status! ${err}`);
    }
}

export async function getStatuses(userId)
{
    try {
        let { data: notes_todos_statuses, error } = await supabase
            .from('notes_todos_statuses')
            .select('id, created_at, userId, statusName, color')
            .eq('userId', userId)

        if (error)
            console.error(`Couldn't get users statuses! ${error}`);

        return notes_todos_statuses;
    }
    catch (err)
    {
        console.error(`Couldn't get users statuses! ${err}`);
    }
}

export async function getNotifications(userId)
{
    try {
        let { data: notes_notifications, error } = await supabase
            .from('notes_notifications')
            .select('id, created_at, userId, content, type, from')
            .eq('userId', userId)

        if (error)
            console.error(`Couldn't get user notification! ${error}`);

        return notes_notifications;
    }
    catch (err)
    {
        console.error(`Couldn't get user notification! ${err}`);
    }
}

export async function addNotification(userId, content, type, from)
{
    try {
        const { data, error } = await supabase
            .from('notes_notifications')
            .insert([
                { userId: userId, content: content, type: type, from: from },
            ])
            .select()

        if (error)
            console.error(`Couldn't add new notification! ${error}`);

        return data;
    }
    catch (err)
    {
        console.error(`Couldn't add new notification! ${err}`);
    }
}

export async function changePassword(userId, newPassword)
{
    try
    {
        const { error } = await supabase
            .from('notes_users')
            .update({ password: newPassword })
            .eq('id', userId)

        if (error)
            console.error(`Couldn't update user info! ${error}`);
    }
    catch (err)
    {
        console.error(`Couldn't update user info! ${err}`);
    }
}

export async function getEventsInCalendar(userId)
{
    try {
        let { data: notes_calendar, error } = await supabase
            .from('notes_calendar')
            .select('id, created_at, userId, title, description, fromTime, toTime, finished')
            .eq('userId', userId)

        if (error)
            console.error(`Couldn't get user events! ${error}`);

        return notes_calendar;
    }
    catch (err)
    {
        console.error(`Couldn't get user events! ${err}`);
    }
}

export async function addEventsInCalendar(userId, title, description, fromTime, toTime, finished)
{
    try {
        const { data, error } = await supabase
            .from('notes_calendar')
            .insert([
                { userId: userId, title: title, description: description, fromTime: fromTime, toTime:toTime, finished:finished },
            ])
            .select()

        if (error)
            console.error(`Couldn't add new event! ${error}`);

        return data;
    }
    catch (err)
    {
        console.error(`Couldn't add new event! ${err}`);
    }
}

export async function markEventAsCompleted(eventId, completed)
{
    try
    {
        const { error } = await supabase
            .from('notes_calendar')
            .update({ finished: !completed })
            .eq('id', eventId)

        if (error)
            console.error(`Couldn't update event info! ${error}`);
    }
    catch (err)
    {
        console.error(`Couldn't update event info! ${err}`);
    }
}

export async function hideTab(userId, hiddenOptions)
{
    try
    {
        const { error } = await supabase
            .from('notes_users')
            .update({ hiddenOptions: hiddenOptions })
            .eq('id', userId)

        if (error)
            console.error(`Couldn't update user info! ${error}`);
    }
    catch (err)
    {
        console.error(`Couldn't update user info! ${err}`);
    }
}

export async function getHiddenTabs(userId)
{
    try {
        let { data: notes_users, error } = await supabase
            .from('notes_users')
            .select('hiddenOptions')
            .eq('id', userId)

        if (error)
            console.error(`Couldn't get user infos! ${error}`);

        return notes_users;
    }
    catch (err)
    {
        console.error(`Couldn't get user infos! ${err}`);
    }
}

export async function changePhoto(userId, newPhoto)
{
    try
    {
        const { error } = await supabase
            .from('notes_users')
            .update({ photoUrl: newPhoto })
            .eq('id', userId)

        if (error)
            console.error(`Couldn't update user info! ${error}`);
    }
    catch (err)
    {
        console.error(`Couldn't update user info! ${err}`);
    }
}

export async function deleteAccount(userId)
{
    try
    {
        const { error } = await supabase
            .from('notes_users')
            .delete()
            .eq('id', userId)

        if (error)
            console.error(`Couldn't delete user account! ${error}`);
    }
    catch (err)
    {
        console.error(`Couldn't delete user account! ${err}`);
    }
}

export async function getSubjects(userId)
{
    try {
        let { data: notes_subjects, error } = await supabase
            .from('notes_subjects')
            .select('id, created_at, name')
            .eq('userId', userId)

        if (error)
            console.error(`Couldn't get user subjects! ${error}`);

        return notes_subjects;
    }
    catch (err)
    {
        console.error(`Couldn't get user subjects! ${err}`);
    }
}

export async function insertSubjects(userId, name)
{
    try {
        const { data, error } = await supabase
            .from('notes_subjects')
            .insert([
                { userId: userId, name:name },
            ])
            .select()

        if (error)
            console.error(`Couldn't add new subject! ${error}`);

        return data;
    }
    catch (err)
    {
        console.error(`Couldn't add new subject! ${err}`);
    }
}

export async function getTimetable(userId)
{
    try {
        let { data: notes_timetable, error } = await supabase
            .from('notes_timetable')
            .select('id, created_at, fromTime, toTime, data, notes_subjects(id, created_at, name, userId)')
            .eq('userId', userId)
            .eq('notes_subjects.userId', userId)

        if (error)
            console.error(`Couldn't get user timetable! ${error}`);

        return notes_timetable;
    }
    catch (err)
    {
        console.error(`Couldn't get user subjects! ${err}`);
    }
}

export async function insertTimetable(userId, fromTime, toTime, subjectId, ustawionaData)
{
    try {
        const { data, error } = await supabase
            .from('notes_timetable')
            .insert([
                { subjectId:subjectId, fromTime:fromTime, toTime:toTime, userId: userId, data:ustawionaData },
            ])
            .select()

        if (error)
            console.error(`Couldn't add new timetable! ${error}`);

        return data;
    }
    catch (err)
    {
        console.error(`Couldn't add new timetable! ${err}`);
    }
}

export async function getExams(userId)
{
    try {
        let { data: notes_exams, error } = await supabase
            .from('notes_exams')
            .select('id, created_at, teacher, date, time, notes_subjects(id, created_at, name, userId)')
            .eq('userId', userId)
            .eq('notes_subjects.userId', userId)

        if (error)
            console.error(`Couldn't get user timetable! ${error}`);

        return notes_exams;
    }
    catch (err)
    {
        console.error(`Couldn't get user subjects! ${err}`);
    }
}

export async function insertExams(userId, time, date, subjectId, teacher)
{
    try {
        const { data, error } = await supabase
            .from('notes_exams')
            .insert([
                { subjectId:subjectId, time:time, date:date, userId: userId, teacher:teacher },
            ])
            .select()

        if (error)
            console.error(`Couldn't add new timetable! ${error}`);

        return data;
    }
    catch (err)
    {
        console.error(`Couldn't add new timetable! ${err}`);
    }
}

export async function getActivities(userId)
{
    try {
        let { data: notes_activities, error } = await supabase
            .from('notes_activities')
            .select('id, date, name')
            .eq('userId', userId)

        if (error)
            console.error(`Couldn't get user activities! ${error}`);

        return notes_activities;
    }
    catch (err)
    {
        console.error(`Couldn't get user activities! ${err}`);
    }
}

export async function insertActivities(userId, date, name)
{
    try {
        const { data, error } = await supabase
            .from('notes_activities')
            .insert([
                { userId: userId, date:date, name:name },
            ])
            .select()

        if (error)
            console.error(`Couldn't add new activities! ${error}`);

        return data;
    }
    catch (err)
    {
        console.error(`Couldn't add new activities! ${err}`);
    }
}

export async function getActivitiesWork(userId)
{
    try {
        let { data: notes_work_activities, error } = await supabase
            .from('notes_work_activities')
            .select('id, date, time, content')
            .eq('userId', userId)

        if (error)
            console.error(`Couldn't get user work activities! ${error}`);

        return notes_work_activities;
    }
    catch (err)
    {
        console.error(`Couldn't get user work activities! ${err}`);
    }
}

export async function insertActivitiesWork(userId, date, time, content)
{
    try {
        const { data, error } = await supabase
            .from('notes_work_activities')
            .insert([
                { userId: userId, date:date, time:time, content:content },
            ])
            .select()

        if (error)
            console.error(`Couldn't add new work activities! ${error}`);

        return data;
    }
    catch (err)
    {
        console.error(`Couldn't add new work activities! ${err}`);
    }
}

export async function getTasksWork(userId)
{
    try {
        let { data: notes_work_tasks, error } = await supabase
            .from('notes_work_tasks')
            .select('id, created_at, date, time, content')
            .eq('userId', userId)

        if (error)
            console.error(`Couldn't get user tasks! ${error}`);

        return notes_work_tasks;
    }
    catch (err)
    {
        console.error(`Couldn't get user tasks! ${err}`);
    }
}

export async function insertTaskWork(userId, date, time, content)
{
    try {
        const { data, error } = await supabase
            .from('notes_work_tasks')
            .insert([
                { userId: userId, date:date, time:time, content:content },
            ])
            .select()

        if (error)
            console.error(`Couldn't add new task! ${error}`);

        return data;
    }
    catch (err)
    {
        console.error(`Couldn't add new task! ${err}`);
    }
}

export async function getMeetingWork(userId)
{
    try {
        let { data: notes_work_meetings, error } = await supabase
            .from('notes_work_meetings')
            .select('id, created_at, date, time, content')
            .eq('userId', userId)

        if (error)
            console.error(`Couldn't get user tasks! ${error}`);

        return notes_work_meetings;
    }
    catch (err)
    {
        console.error(`Couldn't get user meeting! ${err}`);
    }
}

export async function insertMeetingWork(userId, date, time, content)
{
    try {
        const { data, error } = await supabase
            .from('notes_work_meetings')
            .insert([
                { userId: userId, date:date, time:time, content:content },
            ])
            .select()

        if (error)
            console.error(`Couldn't add user meeting! ${error}`);

        return data;
    }
    catch (err)
    {
        console.error(`Couldn't add user meeting! ${err}`);
    }
}
