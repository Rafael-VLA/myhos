import { FeatherIcon } from "@/components";
import Link from "next/link";

export const AppLogo = () => (
    <Link href="/">
        <div className="flex gap-1 items-center">
            <FeatherIcon />
            <span className="tracking-tighter font-medium">MYTHOS</span>
        </div>
    </Link>
)
