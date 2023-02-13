import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";

export async function getServerSideProps(context: any) {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="home">
      <h1 className="home__title">Welcome to UNO the game!</h1>

      <section className="home__options">
        <Link className="home__join" href="/rooms">
          <h3>Join a room!</h3>
        </Link>
        <Link className="home__host" href="/rooms/create">
          <h3>Create a room!</h3>
        </Link>
      </section>

      {isConnected ? (
        <h2 className="home__subtitle">You are connected to MongoDB</h2>
      ) : (
        <h2 className="home__subtitle">
          You are NOT connected to MongoDB. Check the <code>README.md</code> for
          instructions.
        </h2>
      )}

      <p className="home__comments">
        Or comments:{" "}
        <Link href="/comments">
          <code>pages/comments.tsx</code>
        </Link>
      </p>

      {/* <style jsx>{`
          .container {
            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
  
          main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
  
          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }
  
          footer img {
            margin-left: 0.5rem;
          }
  
          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
          }
  
          a {
            color: inherit;
            text-decoration: none;
          }
  
          .title a {
            color: #0070f3;
            text-decoration: none;
          }
  
          .title a:hover,
          .title a:focus,
          .title a:active {
            text-decoration: underline;
          }
  
          .title {
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
          }
  
          .title,
          .description {
            text-align: center;
          }
  
          .subtitle {
            font-size: 2rem;
          }
  
          .description {
            line-height: 1.5;
            font-size: 1.5rem;
          }
  
          code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          }
  
          .grid {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
  
            max-width: 800px;
            margin-top: 3rem;
          }
  
          .card {
            margin: 1rem;
            flex-basis: 45%;
            padding: 1.5rem;
            text-align: left;
            color: inherit;
            text-decoration: none;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            transition: color 0.15s ease, border-color 0.15s ease;
          }
  
          .card:hover,
          .card:focus,
          .card:active {
            color: #0070f3;
            border-color: #0070f3;
          }
  
          .card h3 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }
  
          .card p {
            margin: 0;
            font-size: 1.25rem;
            line-height: 1.5;
          }
  
          .logo {
            height: 1em;
          }
  
          @media (max-width: 600px) {
            .grid {
              width: 100%;
              flex-direction: column;
            }
          }
        `}</style> */}
    </main>
  );
}
