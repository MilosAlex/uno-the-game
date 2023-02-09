import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

interface NavBarProps {}

export default function NavBar(props: NavBarProps) {
  const { data: session } = useSession();
  return (
    <div className="navbar">
      <nav className="navbar__content">
        <h3 className="navbar__title">Uno the game</h3>
        {session ? (
          <section className="navbar__status">
            <h3 className="navbar__name">signed in</h3>
            <button onClick={() => signOut()}>logout</button>
          </section>
        ) : (
          <section className="navbar__status">
            <h3 className="navbar__name">signed out</h3>
            <button onClick={() => signIn()}>login</button>
          </section>
        )}
      </nav>
    </div>
  );
}

export async function getServerSideProps() {
  return {};
}
