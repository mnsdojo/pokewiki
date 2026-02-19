import React from "react";
import Header from "./header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-background ">
      <Header />
      {children}
    </main>
  );
}

export default Layout;
