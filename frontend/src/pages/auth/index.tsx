import React from "react";
import dynamic from "next/dynamic";
const Login = dynamic(() => import("@/components/Login"));
const Signup = dynamic(() => import("@/components/Signup"));
import Image from "next/image";
import logo from "../../../public/mmlogo.png";
import { Tabs, TabItem } from "@/components/Tabs";

function Auth() {
  return (
    <>
      <main className="auth">
        <article className="auth_card  dark:bg-[#22303c] bg-gray-30 dark:border dark:border-[#eee]">
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
          <Tabs defaultIndex="1" onTabClick={console.log}>
            <TabItem label="Signup" index="1">
              <Signup />
            </TabItem>
            <TabItem label="Login" index="2">
              <Login />
            </TabItem>
          </Tabs>
        </article>
      </main>
    </>
  );
}

export default Auth;
