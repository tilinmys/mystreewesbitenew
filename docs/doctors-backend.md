# Clinician roster backend

The homepage rail, `/about` and `/doctors` all render the same roster. Editing a
row in the database changes every one of them — no redeploy, no code edit.

## How a record reaches a card

```
Supabase `doctors` table
  → GET /rest/v1/doctors?select=*&published=eq.true&order=sort_order.asc
  → getDoctors()            src/lib/doctors-repository.ts   (validate + cache)
  → server page             app/(marketing)/{page,about,doctors}
  → components as props     DoctorsSection / AboutPeople / TeamRibbon + TeamDirectory
```

Client components never import the data module. They receive the roster as a
prop from the server page, which is what keeps `process.env` and the backend
call out of the browser bundle.

## Setup

1. Run `supabase/migrations/0001_doctors.sql` against the project (Supabase SQL
   editor, or `supabase db push`). It creates the table, the read-only RLS
   policy and seeds the six current clinicians. Re-running it is safe.
2. Set `SUPABASE_URL` and `SUPABASE_ANON_KEY` (see `.env.example`).
3. Set `REVALIDATE_SECRET` to any long random string.
4. In Supabase → Database → Webhooks, add a webhook on `public.doctors` for
   INSERT, UPDATE and DELETE, pointing at:

   ```
   POST https://<your-domain>/api/revalidate/doctors
   header: x-revalidate-secret: <REVALIDATE_SECRET>
   ```

Without step 4 the pages still pick up changes, just on the 5-minute
revalidation window rather than instantly.

## Editing the roster

| To… | Do this |
| --- | --- |
| Change a name, bio, credential | Edit the row. |
| Add a clinician | Insert a row. `slug`, `category`, `name`, `title`, `specialty`, `image`, `bio` and at least one `credentials` entry are required. |
| Reorder the cards | Change `sort_order`. |
| Hide someone temporarily | Set `published = false`. The row stays, the card disappears. |
| Point a card at a booking link | Set `booking_url`. Absolute URLs open in a new tab; leave it null to use the site's own `/book`. |
| Mark a founder | `founder = true` — drives the About rail ordering and the "Founder-led" ribbon. |

`specialty` must be one of the six the filter row knows about: Obstetrics,
Fertility, Pelvic Health, Nutrition, Internal Medicine, Andrology. A database
constraint rejects anything else, because a clinician filed under an unknown
specialty would render a card the filter can never reach.

Images are still files in `public/`. Upload the file first, then reference its
path in `image`.

## Failure behaviour

The site is never allowed to go blank because a database hiccuped:

| Situation | What renders |
| --- | --- |
| No env vars set | The committed seed in `src/lib/doctors.ts`. |
| Backend down, 4xx/5xx, bad JSON | The seed, with an error logged. |
| Table returns zero rows | The seed — far more likely a broken RLS policy than a clinic with no clinicians. |
| One row fails validation | Every other row renders; the bad one is dropped and logged with its contents. |

That last rule is deliberate: a half-populated card on a page about real
clinicians would be a fabricated claim, so an invalid row becomes a missing card
rather than a partial one.

## Keeping the seed honest

The seed is the fallback, so it should not be allowed to drift far from the
table. When the roster changes in the database, mirror it into
`src/lib/doctors.ts` and the migration's seed block in the same pull request.
