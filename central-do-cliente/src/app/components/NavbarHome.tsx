"use client";

import Image from "next/image";
import { Dropdown, Navbar } from "flowbite-react";
import logoRHM from "../../icons/favicon.svg";
import userIcon from "../../icons/iconUser.svg";
import Theme from "./Theme";
import { useRouter } from "next/navigation";

function NavBar() {
  const route = useRouter();

  const singOut = () => {
    localStorage.removeItem("token");
    route.push("/login");
  };

  return (
    <Navbar fluid>
      <Navbar.Brand href="#">
        <Image
          width={20}
          height={80}
          src={logoRHM}
          className="mr-3 h-6 sm:h-9"
          alt="RHM Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          RHM Tecnologia
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <div className="mx-2">
          <Theme />
        </div>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Image
              width={40}
              height={40}
              src={userIcon}
              className="mx-2"
              alt="User settings"
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">
              Yarles de Andrade Espirito Santo
            </span>
            <span className="block truncate text-sm font-medium">
              yarles100@gmail.com
            </span>
          </Dropdown.Header>

          <Dropdown.Item>Meus dados</Dropdown.Item>
          <Dropdown.Item>Configurações</Dropdown.Item>
          <Dropdown.Item>Faturas</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={singOut}>Sair</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#">Inicio</Navbar.Link>
        <Navbar.Link href="#">Sobre</Navbar.Link>
        <Navbar.Link href="#">Financeiro</Navbar.Link>
        <Navbar.Link href="#">Serviços</Navbar.Link>
        <Navbar.Link href="#">Planos</Navbar.Link>
        <Navbar.Link href="#">Suporte</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
