import {getActivitiesWork, insertActivitiesWork} from "@/app/lib/database/databaseAPI";

//http://localhost:3000/api/workActivity?userId=1
export async function GET(request) {
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return new Response(JSON.stringify({ error: 'Missing userId in request body' }), { status: 400 });
        }

        const activities = await getActivitiesWork(userId);
        if (activities) {
            return new Response(JSON.stringify(activities), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'No activities found for the user' }), { status: 404 });
        }
    } catch (error) {
        console.error('Error fetching activities for user:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

//http://localhost:3000/api/workActivity
// {
//     "userId":1,
//     "date":"19.01.2024",
//     "name":"testettsteststst",
//     "time": "10:00:00"
// }

export async function POST(request) {
    try {
        const requestData = await request.json();
        const { userId, date, name, time } = requestData;

        const newActivity = await insertActivitiesWork(userId, date, time, name);
        if (newActivity) {
            return new Response(JSON.stringify(newActivity), { status: 201 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to create activity' }), { status: 500 });
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