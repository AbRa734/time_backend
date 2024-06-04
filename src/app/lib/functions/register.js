import {createUser, getUsers} from "@/app/lib/database/databaseAPI";

function handleUserRegister(userFullName, userEmail, password, passwordValidation, data, setValidation, setUserEmail, setPassword, setPasswordValidation, setUserFullName) {
    return function(e) {
        e.preventDefault();
        if (!userEmail || !password || !userFullName) return;

        if (password !== passwordValidation) {
            setValidation("Hasło i hasło potwierdzające nie są zgodne!");
        } else {
            const user = data.find((item) => item.email === userEmail);
            console.log(user);
            if (user !== undefined) {
                setValidation("Istnieje już konto z tym adresem e-mail. Zaloguj się!");
            } else {
                createUser(userFullName, userEmail, password);
                setValidation("Konto utworzone. Możesz się teraz zalogować!");
            }
        }

        setUserEmail("");
        setPassword("");
        setPasswordValidation("");
        setUserFullName("");
    }
}

export async function processUserRegister()
{
    const data = await getUsers();
    return data || null;
}
