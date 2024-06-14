// External imports
import { fetchCurrentUser } from "@/hooks/useFetch";
import dynamic from "next/dynamic";
import Head from "next/head";

// Custom imports
import Container from "@/components/Container";
import NotLoggedIn from "@/components/NotLoggedIn";
// Dynamic imports
const Navbar = dynamic(() => import("@/components/Navbar"));
const PageTitle = dynamic(() => import("@/components/PageTitle"));

function Claims() {
  const { userData } = fetchCurrentUser();

  return (
    <>
      <Head>
        <title>Claims</title>
      </Head>
      <Navbar />
      <main className="space-between-navbar-and-content">
        <Container>
          <PageTitle title="Claims" hasSpan={false} />
          {!userData ? (
            <NotLoggedIn />
          ) : (
            <>
              Claims
            </>
          )}
        </Container>
      </main>
    </>
  );
}

export default Claims;
