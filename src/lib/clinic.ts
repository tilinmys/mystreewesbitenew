/**
 * Canonical MyStree business facts.
 *
 * Every route, structured-data block and visible contact detail reads from here
 * so the site's name/address/phone stay consistent. Only add a field once it has
 * been verified against real clinic data — an unverified value here propagates
 * into JSON-LD, where a wrong detail is worse than a missing one.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://my-stree.com";

export const clinic = {
  name: "MyStree",
  legalName: "MyStree Women's Health Clinic",
  telephone: "+916366573772",
  telephoneDisplay: "+91 63665 73772",
  email: "info@mystree.org",
  locality: "Indiranagar",
  city: "Bengaluru",
  region: "Karnataka",
  country: "IN",
  streetAddress: "No. 3366, 13th Main Road, HAL 2nd Stage, Indiranagar",
  postalCode: "560008",
  mapsUrl: "https://maps.app.goo.gl/JthHC6HbbAVegwxB9",
  mapsPlaceUrl: "https://maps.app.goo.gl/JthHC6HbbAVegwxB9",
} as const;

/** Human-readable area line, used where a full street address is not required. */
export const clinicArea = `${clinic.locality}, ${clinic.city}`;
