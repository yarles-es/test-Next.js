import Link from "next/link";

export default function Home() {
  const name = "Yarles de Andrade";
  return (
    <div className="bg-red-600">
      <h1>Pagina inicial</h1>
      <div>
        <Link href="/dashboard">Dashboard</Link>
      </div>
      <div>
        <Link
          href={{
            pathname: "/dashboard",
            query: { name },
          }}
        >
          Dashboard com parametro nome usando query
        </Link>
      </div>
      <div>
        <Link href={`/dashboard?name=${name}`}>
          Dashboard com parametro nome usando interpolação {"${ }"}
        </Link>
      </div>

      <div>
        <Link prefetch={false} href="/dashboard">
          link com prefect False
        </Link>
      </div>
    </div>
  );
}
