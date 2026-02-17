



import { getUser, removeToken } from "@/lib/auth";
import LogoutButton from "./logoutButton";


export default async function Header() {
    const user = await getUser();

    return (
        <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center justify-between">
                <h1>Header {user!.name}</h1>
            </div>
            <div className="flex items-center justify-end">
                <LogoutButton />
            </div>
        </header>
    );
}