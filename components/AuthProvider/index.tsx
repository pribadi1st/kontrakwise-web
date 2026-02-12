import { Toaster } from "sonner";
import QueryProvider from "../QueryProvider";
import { cookies } from "next/headers";
import Sidebar from "../Sidebar";

export default async function AuthProvider({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const session = cookieStore.get("bearer_token");
    return (
        <QueryProvider>
            {session && <Sidebar />}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
            <Toaster position="top-center" />
        </QueryProvider>
    )
}