import { buttonVariants } from "@/components/ui/button";
import { pathnames } from "@/constants/pathnames";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import Logo from "../assets/logo.svg";

export default function Navbar() {
  return (
    <nav className="z-50 fixed left-0 top-0 flex justify-between items-center h-32 w-full px-20">
      {/* Logo */}
      <Link to={pathnames.home}>
        <img src={Logo} alt="logo" className="h-8" />
      </Link>
      {/* Links */}
      <ul className="flex space-x-4">
        <li>
          <Link
            to={"/decouvrir"}
            className="uppercase border rounded-full px-4 py-1 text-xs border-black "
          >
            Découvrir Scola
          </Link>
        </li>
        <li>
          <Link
            to={"/a-propos"}
            className="uppercase border rounded-full px-4 py-1 text-xs border-black "
          >
            À propos
          </Link>
        </li>
      </ul>
      <Link
        className={cn(
          buttonVariants({ variant: "default" }),
          "px-4 py-1 duration-200 text-xs transition-all rounded-full bg-[#81DFEF] hover:bg-[#81deef74] text-black font-normal uppercase"
        )}
        to={pathnames.student}
      >
        Connexion
      </Link>
    </nav>
  );
}
