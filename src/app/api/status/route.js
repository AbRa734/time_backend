import { getStatuses, addStatus } from "@/app/lib/database/databaseAPI";

//http://localhost:3000/api/status?userId=1

export async function GET(request) {
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");

        const statuses = await getStatuses(userId);
        if (statuses) {
            return new Response(JSON.stringify(statuses), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to fetch statuses' }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

//http://localhost:3000/api/status
// {
//     "userId": 1,
//     "title": "test title",
//     "description": "test description"
// }

export async function POST(request) {
    try {
        const requestData = await request.json();
        const { title, description, userId } = requestData;

        const newStatus = await addStatus(title, description, userId);

        if (newStatus) {
            return new Response(JSON.stringify(newStatus), { status: 201 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to create status' }), { status: 500 });
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
