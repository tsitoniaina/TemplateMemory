// import FileDashboard from "@/app/shared/file/dashboard";
// import { metaObject } from "@/config/site.config";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/[lang]/api/auth/[...nextauth]/auth-options";
// import { redirect } from "next/navigation";

// export const metadata = {
//   ...metaObject(),
// };

// export default async function FileDashboardPage({
//   params: { lang },
// }: {
//   params: {
//     lang: string;
//   };
// }) {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     redirect('/');
//     return null;
//   }

//   return <FileDashboard lang={lang} />;
// }
// @/app/file-dashboard/page.tsx
// @/app/file-dashboard/page.tsx
import FileDashboard from "@/app/shared/file/dashboard";
import { metaObject } from "@/config/site.config";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/[lang]/api/auth/[...nextauth]/auth-options";
import { redirect } from "next/navigation";
import SessionProviderWrapper from "@/app/shared/SessionProviderWrapper";

export const metadata = {
  ...metaObject(),
};

export default async function FileDashboardPage({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
    return null;
  }

  return (
    <SessionProviderWrapper session={session}>
      <FileDashboard lang={lang} />
    </SessionProviderWrapper>
  );
}
