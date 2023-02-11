import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

interface NavBarProps {}

export default function NavBar(props: NavBarProps) {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) console.log(session);

  return (
    <div className="navbar">
      <nav className="navbar__content">
        <h3 className="navbar__title">Uno the game</h3>
        {session ? (
          <section className="navbar__status">
            <h3 className="navbar__name">signed in as {session.user?.name}</h3>
            <button onClick={() => signOut()}>logout</button>
          </section>
        ) : (
          <section className="navbar__status">
            <h3 className="navbar__name">signed out</h3>
            <button onClick={() => signIn()}>login</button>
            <Link href="/register">
            <button onClick={() => {}}>register</button>
            </Link>
          </section>
        )}
      </nav>
    </div>
  );
}

export async function getServerSideProps() {
  return {};
}
