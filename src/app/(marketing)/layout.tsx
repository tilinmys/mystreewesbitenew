import { CareChat } from "@/components/care-chat";
import { SiteNavbar } from "@/components/site-navbar";

/**
 * Shared chrome for every marketing route.
 *
 * The announcement strip and navigation used to mount inside the homepage only,
 * which left /about (and now /doctors) rendering with no navigation at all.
 * Mounting them here keeps one nav instance per marketing route.
 */
export default function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteNavbar />
      {children}
      <CareChat />
    </>
  );
}
