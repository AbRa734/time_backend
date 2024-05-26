import { getMeetingWork, insertMeetingWork } from "@/app/lib/database/databaseAPI";

//http://localhost:3000/api/meeting?userId=1
export async function GET(request) {
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");

        const meetings = await getMeetingWork(userId);
        if (meetings) {
            return new Response(JSON.stringify(meetings), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to fetch meetings' }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

//http://localhost:3000/api/meeting
// {
//     "userId": 1,
//     "time": "15:00:00",
//     "date": "12.12.2024",
//     "content":"content test"
// }

export async function POST(request) {
    try {
        const requestData = await request.json();
        const { userId, date, time, content } = requestData;

        const newMeeting = await insertMeetingWork(userId, date, time, content);

        if (newMeeting) {
            return new Response(JSON.stringify(newMeeting), { status: 201 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to create meeting' }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function PUT(request) {
    return new Response(JSON.stringify({ error: 'Method not allowed!' }), { status: 501 });
}

export async function DELETE(request) {
    return new Response(JSON.stringify({ error: 'Method not allowed!' }), { status: 501 });
}