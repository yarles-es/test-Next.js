"use client";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const route = useRouter();
  return (
    <button type="button" onClick={() => route.back()}>
      Voltar
    </button>
  );
};

export default BackButton;
