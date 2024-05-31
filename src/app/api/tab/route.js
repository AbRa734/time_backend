import { getHiddenTabs, hideTab } from "@/app/lib/database/databaseAPI";

//http://localhost:3000/api/tab?userId=1

export async function GET(request) {
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");

        const hiddenTabs = await getHiddenTabs(userId);
        if (hiddenTabs) {
            return new Response(JSON.stringify(hiddenTabs), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to fetch hidden tabs' }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

//http://localhost:3000/api/tab
// {
//     "userId": 1,
//     "hiddenOptions": "1"
// }

export async function POST(request) {
    try {
        const requestData = await request.json();
        const { userId, hiddenOptions } = requestData;

        const newHiddenTab = await hideTab(userId, hiddenOptions);

        if (newHiddenTab) {
            return new Response(JSON.stringify({ success: true }), { status: 201 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to hide tab' }), { status: 500 });
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