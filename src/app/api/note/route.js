import {addNote, editNote, getNotes} from "@/app/lib/database/databaseAPI";

//http://localhost:3000/api/note?userId=1&?category=1
export async function GET(request) {
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");
        const category = searchParams.get('category');

        const notes = await getNotes(userId, category);
        if (notes) {
            return new Response(JSON.stringify(notes), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to fetch note' }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

//http://localhost:3000/api/note
// {
//     "title": "test title",
//     "description": "test description",
//     "category": 1,
//     "userId":1
// }

export async function POST(request) {
    try {
        const requestData = await request.json();
        const { title, description, category, userId } = requestData;

        const newNote = await addNote(title, description, category, userId);

        if (newNote) {
            return new Response(JSON.stringify(newNote), { status: 201 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to create note' }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

//http://localhost:3000/api/note
// {
//     "noteId": 1,
//     "heading": "changedTitle",
//     "content": "changedContent",
//     "category": 1
// }

export async function PUT(request) {
    try {
        const requestData = await request.json();
        const { noteId, heading, content, category } = requestData;
        const payload = {heading, content, category};
        const action = "editNote";

        const result = await editNote(noteId, action, payload);
        if (result) {
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to edit note' }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

//http://localhost:3000/api/note
// {
//     "noteId": 1
// }

export async function DELETE(request) {
    try {
        const requestData = await request.json();
        const { noteId } = requestData;
        const action = "deleteNote";

        const result = await editNote(noteId, action);
        if (result) {
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to delete note' }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
