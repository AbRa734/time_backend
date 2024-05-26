import { getEventsInCalendar, addEventsInCalendar } from "@/app/lib/database/databaseAPI";

//http://localhost:3000/api/event?userId=1
export async function GET(request) {
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");

        const events = await getEventsInCalendar(userId);
        if (events) {
            return new Response(JSON.stringify(events), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to fetch event' }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

//http://localhost:3000/api/event
// {
//     "userId": 1,
//     "title": "abcabc1",
//     "description": "abcabc2",
//     "fromTime": "15:00:00",
//     "toTime": "20:00:00",
//     "finished": false
// }

export async function POST(request) {
    try {
        const requestData = await request.json();
        const { userId, title, description, fromTime, toTime, finished } = requestData;

        const newEvent = await addEventsInCalendar(userId, title, description, fromTime, toTime, finished);

        if (newEvent) {
            return new Response(JSON.stringify(newEvent), { status: 201 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to create event' }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function PUT(request) {
    return new Response(JSON.stringify({ error: 'Method not allowed!' }), { status: 405 });
}

export async function DELETE(request) {
    return new Response(JSON.stringify({ error: 'Method not allowed!' }), { status: 405 });
}
