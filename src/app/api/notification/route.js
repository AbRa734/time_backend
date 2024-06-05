import { getNotifications, addNotification } from "@/app/lib/database/databaseAPI";

//http://localhost:3000/api/notification?userId=1

export async function GET(request) {
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");

        const notifications = await getNotifications(userId);
        if (notifications) {
            return new Response(JSON.stringify(notifications), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to fetch notification' }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

//http://localhost:3000/api/notification
// {
//     "userId": 1,
//     "content": "test content",
//     "type": "success",
//     "from": "test"
// }

export async function POST(request) {
    try {
        const requestData = await request.json();
        const { userId, content, type, from } = requestData;

        const newNotification = await addNotification(userId, content, type, from);

        if (newNotification) {
            return new Response(JSON.stringify(newNotification), { status: 201 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to create notification' }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

export async function PUT() {
    return new Response(JSON.stringify({ error: 'Method not allowed!' }), { status: 405 });
}

export async function DELETE() {
    return new Response(JSON.stringify({ error: 'Method not allowed!' }), { status: 405 });
}