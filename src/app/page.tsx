import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  
  const session = await auth();
  const user = session?.user;
  console.log(session, "register  1211212", user);
  if (!user) redirect("/login");

  return (
    <div></div>
  );
}
