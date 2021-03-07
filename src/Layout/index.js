import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <NotFound />
      </div>
    </div>
  );
}

export default Layout;
