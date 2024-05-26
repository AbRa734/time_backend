import {addTodo, editTodo, getTodos} from "@/app/lib/database/databaseAPI";

//http://localhost:3000/api/todo?userId=1&category=1

export async function GET(request) {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const category = url.searchParams.get('category');

    try {
        const todos = await getTodos(userId, category);
        if (todos) {
            return new Response(JSON.stringify(todos), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to fetch todo' }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

//http://localhost:3000/api/todo
// {
//     "userId": 1,
//     "title": "test title",
//     "description":"test description",
//     "category":1
// }

export async function POST(request) {
    const requestData = await request.json();
    const { title, description, category, userId } = requestData;

    try {
        const newTodo = await addTodo(title, description, category, userId);
        if (newTodo) {
            return new Response(JSON.stringify(newTodo), { status: 201 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to create todo' }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

//http://localhost:3000/api/todo
// {
//     "todoId": 2,
//     "heading": "test title",
//     "content":"test description",
//     "category":1,
//     "completed":false
// }

export async function PUT(request) {
    const requestData = await request.json();
    const { todoId, heading, content, category, completed } = requestData;
    const payload = {
        heading,
        content,
        category,
        completed
    };
    const action = "editNote";

    try {
        const result = await editTodo(todoId, action, payload);
        if (result) {
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to edit todo' }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

//http://localhost:3000/api/todo
// {
//     "todoId": 2
// }

export async function DELETE(request) {
    const requestData = await request.json();
    const { todoId } = requestData;

    const action = "deleteNote";

    try {
        const result = await editTodo(todoId, action, {});
        if (result) {
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to delete todo' }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}