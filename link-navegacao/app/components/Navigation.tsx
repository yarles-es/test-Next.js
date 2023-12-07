"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navigation = ({ navLinks }: { navLinks: any }) => {
  const pathname = usePathname();
  const route = useRouter();

  return (
    <nav className="bg-slate-500">
      <ul>
        {navLinks.map((link: any) => {
          const active = pathname.endsWith(link.href);
          return (
            <li key={link.href} className={active ? "bg-green-500" : ""}>
              <div>
                <Link href={link.href}>
                  usando Link {link.name} {active ? "- Estou aqui" : ""}
                </Link>
              </div>
              <div>
                <button type="button" onClick={() => route.push(link.href)}>
                  usando route.push {link.name} {active ? "- Estou aqui" : ""}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
