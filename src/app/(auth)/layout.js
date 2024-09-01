import "bootstrap/dist/css/bootstrap.min.css";
import "@radix-ui/themes/styles.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    manifest: "/manifest.json",
    title: "HBI Web",
    description: "HBI Web",
};

export default function AuthLayout({children}) {
    return (
        <html lang="en">
            <body className={cn("h-screen", inter.className)}>
             {children}
            </body>
        </html>
    );
}