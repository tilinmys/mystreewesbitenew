-- MyStree clinician roster.
--
-- Column names are snake_case and map 1:1 onto the validator in
-- src/lib/doctors-repository.ts. Adding a column here without adding it there
-- means the site simply ignores it; renaming one means the field goes missing
-- from the cards, so change both together.

create table if not exists public.doctors (
  slug                text primary key,
  sort_order          integer     not null default 0,
  published           boolean     not null default true,

  category            text        not null,
  name                text        not null,
  title               text        not null,
  specialty           text        not null,
  image               text        not null,
  bio                 text        not null,
  background          text,

  -- Rendered as lists; stored as arrays rather than delimited strings so an
  -- editor cannot break a card with a stray comma inside a qualification.
  credentials         text[]      not null default '{}',
  languages           text[],
  experience          text[],

  action_label        text,
  booking_url         text,
  founder             boolean     not null default false,
  practises_elsewhere boolean     not null default false,

  updated_at          timestamptz not null default now(),

  -- The filter row on /doctors only knows these six. A seventh value would
  -- render a clinician the filter can never reach, so the database refuses it.
  constraint doctors_specialty_known check (
    specialty in (
      'Obstetrics', 'Fertility', 'Pelvic Health',
      'Nutrition', 'Internal Medicine', 'Andrology'
    )
  ),
  constraint doctors_credentials_present check (cardinality(credentials) > 0)
);

create index if not exists doctors_sort_order_idx
  on public.doctors (sort_order)
  where published;

-- Keep updated_at honest; it is how you tell which edit is live.
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists doctors_touch_updated_at on public.doctors;
create trigger doctors_touch_updated_at
  before update on public.doctors
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Row level security
--
-- The site reads with the ANON key, so anon needs SELECT and nothing else.
-- Unpublished rows stay invisible to it, which is what makes `published` a
-- usable staging flag rather than decoration. Writes are left to the service
-- role and the Supabase dashboard.
-- ---------------------------------------------------------------------------
alter table public.doctors enable row level security;

drop policy if exists "doctors are publicly readable when published" on public.doctors;
create policy "doctors are publicly readable when published"
  on public.doctors for select
  to anon, authenticated
  using (published);

-- ---------------------------------------------------------------------------
-- Seed: the six clinicians currently listed. Re-running is safe.
-- ---------------------------------------------------------------------------
insert into public.doctors (
  slug, sort_order, category, name, title, specialty, image, bio, background,
  credentials, languages, experience, action_label, booking_url,
  founder, practises_elsewhere
) values
(
  'dr-smitha-ap', 1, 'Founder', 'Dr. Smitha A.P',
  'Founder & High Risk Obstetrician', 'Obstetrics', '/public/drsmitha.webp',
  'Dr. Smitha specializes in High Risk Obstetrics and In-utero Fetal Programming with a keen interest in treatment of endocrine disorders, recurrent pregnancy loss, bad obstetric history and high risk pregnancy. She strongly believes in patient care that goes beyond the illness by holistically approaching the care with the right mix of evidence-based medicine and personalized care.',
  'Alumnus of Dr. B.R. Ambedkar Medical College, Bangalore and Diplomate of the National Board. Active member of BSOG and ISUOG.',
  array['MBBS, MS, DNB(OBG)', 'FFM, FRM, MBA', '23 Years Experience (15 as specialist)'],
  array['English', 'Kannada', 'Tamil'], null, null,
  'https://my-stree.com/booking/appointment/2', true, false
),
(
  'dr-surbhi-sinha', 2, 'Co-Founder', 'Dr. Surbhi Sinha',
  'Co-Founder & Fertility Specialist', 'Fertility', '/public/drsurbhi.webp',
  'Renowned for her precision and empathy, Dr. Sinha is an expert in advanced surgical techniques and fertility solutions. She prioritizes faster recovery and minimal discomfort, combining cutting-edge tech with compassionate care.',
  null,
  array['MBBS, MS, MD', 'MRCOG (UK), FRM'],
  array['English', 'Hindi'], null, null,
  'https://my-stree.com/booking/appointment/1', true, false
),
(
  'priyanka-savina', 3, 'Wellness Lead', 'Priyanka Savina',
  'Nutritionist & Wellness Consultant', 'Nutrition', '/public/priyankasavina.webp',
  'Priyanka is the architect behind the seamless mystree experience. Specializing in postpartum nutrition and PCOS management, she ensures that from diet planning to lifestyle changes, every interaction is efficient and respectful of your body.',
  null,
  array['M.Sc Nutrition & Dietetics', 'M.Sc Psychological Counseling', 'Certified Wellness Coach'],
  array['English', 'Hindi', 'Kannada'], null, null,
  'https://my-stree.com/booking/appointment/3', false, false
),
(
  'dr-chaitra-nayak', 4, 'Fertility Expert', 'Dr. Chaitra Nayak',
  'Infertility Specialist & Reproductive Endocrinologist', 'Fertility', '/public/DrChaitraNayak.webp',
  'With over 24 years of experience and founder of Kalpa Clinic, Dr. Nayak is a specialist in managing PCOS, recurrent IVF failures, and endometriosis. She combines deep clinical expertise with a passion for social causes.',
  null,
  array['MBBS, MS (OBG), FNB (Reproductive Medicine)', 'Fellowship in Reproductive Medicine'],
  array['English', 'Hindi', 'Kannada', 'Tamil'], null, null,
  'https://my-stree.com/booking/appointment/4', false, false
),
(
  'dr-jasmine-flora', 5, 'Women''s Health Specialist', 'Dr. Jasmine Flora',
  'Vaginismus / Pelvic Floor Friend', 'Pelvic Health', '/public/drjasmineflora.webp',
  'Dedicated to holistic women''s health with 21 years of experience. Dr. Jasmine specializes in obstetric and gynecological physiotherapy, pelvic floor rehab, and diastasis recti rehab, ensuring mothers recover strength and confidence.',
  null,
  array['MPT/MPTh - OBG Physiotherapy', 'Lactation Counsellor'],
  null, array['21 Years Overall', '9 Years Specialist'], null,
  'https://my-stree.com/booking/appointment/5', false, false
),
(
  'dr-sitaram-m', 6, 'Urology & Andrology', 'Dr. Sitaram M',
  'Urologist & Andrologist', 'Andrology', '/public/drsitaram.jpg',
  'Dr. Sitaram M is a Urologist and Andrologist with 12 years of experience in these fields. He practises at Androcare Institute of Andrology & Men''s Health in Jubilee Hills and LB Nagar, Hyderabad.',
  null,
  array['MCh - Urology', 'MS - General Surgery', 'MBBS'],
  array['English', 'Telugu', 'Hindi'], null, 'Request an Appointment',
  'https://my-stree.com/booking', false, true
)
on conflict (slug) do update set
  sort_order          = excluded.sort_order,
  category            = excluded.category,
  name                = excluded.name,
  title               = excluded.title,
  specialty           = excluded.specialty,
  image               = excluded.image,
  bio                 = excluded.bio,
  background          = excluded.background,
  credentials         = excluded.credentials,
  languages           = excluded.languages,
  experience          = excluded.experience,
  action_label        = excluded.action_label,
  booking_url         = excluded.booking_url,
  founder             = excluded.founder,
  practises_elsewhere = excluded.practises_elsewhere;
