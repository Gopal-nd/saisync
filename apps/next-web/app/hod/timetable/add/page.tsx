// /app/admin/timetable/add/page.tsx
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Option 1: static import (works fine)
// import DayScheduleClient from "./DayScheduleClient";

// Option 2: dynamic import with ssr: false is NOT recommended here — prefer server Suspense.
// const DayScheduleClient = dynamic(() => import("./DayScheduleClient"), { ssr: false });

import DayScheduleClient from "./DayScheduleClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading schedule editor...</div>}>
      {/* DayScheduleClient is a client component that uses useSearchParams */}
      <DayScheduleClient />
    </Suspense>
  );
}

