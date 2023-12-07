"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const GenerateMenu = () => {
  const pathname = usePathname();
  const navigates = {
    "/": <Link href="/">Home</Link>,
    "/about": <Link href="/about">About</Link>,
    "/blog": <Link href="/blog">Blog</Link>,
    "/account": <Link href="/account">Account</Link>,
    "/cart": <Link href="/cart">Cart</Link>,
  };

  return (
    <ul className="flex flex-row justify-around">
      {Object.entries(navigates)
        .filter(([path]) => path !== pathname)
        .map(([path, linkElement]) => (
          <li key={path}>{linkElement}</li>
        ))}
    </ul>
  );
};

export default GenerateMenu;

