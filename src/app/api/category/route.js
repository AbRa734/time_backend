import { getCategories, addCategory } from "@/app/lib/database/databaseAPI";

//http://localhost:3000/api/category?userId=1
export async function GET(request) {
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");

        const categories = await getCategories(userId);
        if (categories) {
            return new Response(JSON.stringify(categories), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to fetch category' }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

//http://localhost:3000/api/category
//{
//    "userId":1,
//    "description":"test desc",
//    "title":"test title"
//}

export async function POST(request) {
    try {
        const requestData = await request.json();
        const { userId, description, title } = requestData;

        const newCategory = await addCategory(title, description, userId);

        if (newCategory) {
            return new Response(JSON.stringify(newCategory), { status: 201 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to create category' }), { status: 500 });
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
