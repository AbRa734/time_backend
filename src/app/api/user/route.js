import {changePassword, changePhoto, createUser, deleteAccount, getUsers} from "@/app/lib/database/databaseAPI";

//http://localhost:3000/api/user

export async function GET(request) {
    try {
        const users = await getUsers();
        if (users) {
            return new Response(JSON.stringify(users), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to fetch user' }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

//http://localhost:3000/api/user
// {
//     "userName": "testApiUser",
//     "userEmail": "test@api.user",
//     "userPassword": "api123"
// }

export async function POST(request) {
    try {
        const requestData = await request.json();
        const { userName, userEmail, userPassword } = requestData;
        const newUser = await createUser(userName, userEmail, userPassword);

        if (newUser) {
            return new Response(JSON.stringify(newUser), { status: 201 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to create user' }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

//http://localhost:3000/api/user
// {
//     "userId": 6,
//     "newPassword": "123123"
// }

//http://localhost:3000/api/user
// {
//     "userId": 6,
//     "newPhoto": "https://i.pinimg.com/550x/e7/eb/1f/e7eb1fcf037699e7de777073d1bafd62.jpg"
// }

export async function PUT(request) {
    const requestData = await request.json();
    const { userId, newPassword, newPhoto } = requestData;

    try {
        if (newPassword) {
            const result = await changePassword(userId, newPassword);
            if (result) {
                return new Response(JSON.stringify({ success: true }), { status: 200 });
            } else {
                return new Response(JSON.stringify({ error: 'Failed to change password' }), { status: 500 });
            }
        } else if (newPhoto) {
            const result = await changePhoto(userId, newPhoto);
            if (result) {
                return new Response(JSON.stringify({ success: true }), { status: 200 });
            } else {
                return new Response(JSON.stringify({ error: 'Failed to change photo' }), { status: 500 });
            }
        } else {
            return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}

//http://localhost:3000/api/user
// {
//     "userId": 6
// }

export async function DELETE(request) {
    const requestData = await request.json();
    const { userId } = requestData;

    try {
        const result = await deleteAccount(userId);
        if (result) {
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to delete account' }), { status: 500 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
