import { getExams, insertExams } from "@/app/lib/database/databaseAPI";

//http://localhost:3000/api/exam?userId=1
export async function GET(request) {
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");

        const exams = await getExams(userId);
        if (exams) {
            return new Response(JSON.stringify(exams), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to fetch exams' }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

//http://localhost:3000/api/exam
// {
//     "userId": 1,
//     "time": "15:00:00",
//     "date": "12.12.2024",
//     "subjectId": "1",
//     "teacher":"testowy"
// }

export async function POST(request) {
    try {
        const requestData = await request.json();
        const { userId, time, date, subjectId, teacher } = requestData;

        const newExam = await insertExams(userId, time, date, subjectId, teacher);

        if (newExam) {
            return new Response(JSON.stringify(newExam), { status: 201 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to create exam' }), { status: 500 });
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
