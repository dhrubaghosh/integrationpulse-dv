import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InterfaceMatrix from "../components/InterfaceMatrix";
import LastUpdated from "../components/LastUpdated";

import SeverityBreakdownCard from "../components/SeverityBreakDownCard";
import ImpactSummaryCard from "../components/ImpactSummaryCard";
import ParentGroupChart from "../components/ParentGroupChart";

export default function HomePage() {
  return (
    <div className="p-2">
      <div>
        <Header />
      </div>
      <div className="mb-20">
        <LastUpdated />
        <InterfaceMatrix />
      </div>
      <div className="grid grid-cols-3 gap-6 p-6 ml-12 font-montserrat">
        {/* Left Column */}
        <div className="col-span-1 space-y-4">
          <ImpactSummaryCard />
          <SeverityBreakdownCard />
        </div>

        {/* Right Column */}
        <div className="col-span-2">
          <ParentGroupChart />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
