import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LastUpdated from "../components/LastUpdated";
import SystemHealth from "../components/SystemHealth";


export default function HomePage() {
  return (
    <div className="p-2">
      <div>
        <Header />
        <LastUpdated />
      </div>
      <SystemHealth />
      {/* <div className="mt-32">
        <Footer />
      </div> */}
    </div>
  );
}
