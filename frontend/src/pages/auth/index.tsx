import Login from "@/components/Login";
import Signup from "@/components/Signup";
import Head from "next/head";
import Image from "next/image";
import logo from "../../../public/mmlogo.png";
import TabPane from "@/components/Tabs/TabPane";
import Tabs from "@/components/Tabs";

function Auth() {
  return (
    <>
      <Head>
        <title>Auth</title>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <main className="auth">
        <article className="auth_card dark:bg-[#22303c] bg-gray-30 dark:border dark:border-[#eee]">
          <div className="form_header">
            <span className="auth_card_logo mb-3">
              <Image
                src={logo}
                alt="allelectronics logo"
                priority={true}
                placeholder="blur"
              />
            </span>
          </div>
          <Tabs>
            <TabPane title="Login">
              <Login />
            </TabPane>
            <TabPane title="Signup">
              <Signup />
            </TabPane>
          </Tabs>
        </article>
      </main>
    </>
  );
}

export default Auth;
