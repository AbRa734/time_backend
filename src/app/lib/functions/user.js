import {addNotification, changePassword} from "@/app/lib/database/databaseAPI";
import {toast} from "react-hot-toast";

function handleChangingPassword(userId, oldPass, newPass, context, setNewPass, setOldPass, setChangingPassword) {
    return function(e) {
        e.preventDefault();
        if (oldPass !== context.userPassword){
            return;
        }
        if (!oldPass || !newPass) return;

        changePassword(userId, newPass);

        let content = 'Pomyślnie zmieniono hasło!';
        toast.success(content);
        addNotification(userId, content, 'success', 'Profil');
        context.setUserPassword(newPass);

        setNewPass('');
        setOldPass('');

        setChangingPassword(false);
    }
}
