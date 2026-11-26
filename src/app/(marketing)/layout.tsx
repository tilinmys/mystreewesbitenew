import { CareChat } from "@/components/care-chat";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { SiteNavbar } from "@/components/site-navbar";
import { getBookingDoctors } from "@/lib/booking";
import type { ChatDoctor, ChatPackage } from "@/lib/care-chat/brain";
import { PACKAGES } from "@/lib/packages";

/**
 * Shared chrome for every marketing route.
 *
 * The announcement strip and navigation used to mount inside the homepage only,
 * which left /about (and now /doctors) rendering with no navigation at all.
 * Mounting them here keeps one nav instance per marketing route.
 *
 * The MyStree assistant (CareChat) gets the live booking roster and the care
 * packages from here, so its fees, visit lengths and booking links match the
 * booking system (cached by getBookingDoctors, refreshed every 5 minutes).
 */
export default async function MarketingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const roster = await getBookingDoctors();
  const doctors: ChatDoctor[] = roster
    .filter((d) => d.fee > 0)
    .sort((a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99))
    .map((d) => ({
      id: d.id,
      name: d.name,
      speciality: d.speciality,
      fee: d.fee,
      durationMinutes: d.durationMinutes,
      bookingUrl: d.bookingUrl,
    }));
  const packages: ChatPackage[] = PACKAGES.map((p) => ({
    slug: p.slug,
    name: p.name,
    priceDisplay: p.priceDisplay,
    priceFor: p.priceFor,
  }));

  return (
    <>
      <SiteNavbar />
      {children}
      <CareChat doctors={doctors} packages={packages} />
      <MobileActionBar />
    </>
  );
}
