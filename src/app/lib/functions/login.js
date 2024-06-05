import {getUsers} from "@/app/lib/database/databaseAPI";

function handleUserLogin(userEmail, password, data, context, navigate, setValidation, setUserEmail, setPassword) {
    return function(e) {
        e.preventDefault();
        if (!userEmail || !password) return;

        const user = data.find((item) => item.email === userEmail);
        if (user?.password === password) {
            context.login(user.fullName, user.password, user.id, user.hiddenOptions, user.photoUrl, userEmail);
            setValidation("");
            navigate.push(`/dashboard`);
        } else {
            setValidation("Logowanie nie powiodło się. Nieprawidłowy login lub hasło.")
        }
        setUserEmail("");
        setPassword("");
    }
}

export async function processUserLogin()
{
    const data = await getUsers();
    return data || null;
}
