import { getSubjects, insertSubjects } from "@/app/lib/database/databaseAPI";

//http://localhost:3000/api/subject?userId=1

export async function GET(request) {
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");

        const subjects = await getSubjects(userId);
        if (subjects) {
            return new Response(JSON.stringify(subjects), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to fetch subjects' }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

//http://localhost:3000/api/subject
// {
//     "userId": 1,
//     "name": "test name"
// }

export async function POST(request) {
    try {
        const requestData = await request.json();
        const { userId, name } = requestData;

        const newSubject = await insertSubjects(userId, name);

        if (newSubject) {
            return new Response(JSON.stringify(newSubject), { status: 201 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to create subject' }), { status: 500 });
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