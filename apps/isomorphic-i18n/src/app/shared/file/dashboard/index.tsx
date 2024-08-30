"use client";
// PAGE HOME

import StorageReport from "@/app/shared/file/dashboard/storage-report";

export default function FileDashboard({ lang }: { lang?: string }) {
  return (
    <div className="@container">
      coucou Rogella
      <div className="mb-6 grid grid-cols-1 gap-6 @4xl:grid-cols-12 2xl:mb-8 2xl:gap-8">
        <StorageReport
          className="@container col-span-full"
          lang={lang}
        />
      </div>
    </div>
  );
}
