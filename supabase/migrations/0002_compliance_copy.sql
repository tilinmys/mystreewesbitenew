-- Compliance copy update (Growthamp website compliance review, 13 Nov 2026).
--
-- Brings the seeded rows in line with src/lib/doctors.ts: plain role titles in
-- place of "expert"/praise titles, factual bios, and the qualification and
-- experience recorded in the booking system (NMC Guidelines on Ethical
-- Advertising 2026; CCPA). Re-running is safe.

update public.doctors set
  category    = 'Founder',
  title       = 'Founder and High-Risk Obstetrician',
  bio         = 'Dr. Smitha specializes in High Risk Obstetrics and In-utero Fetal Programming with a keen interest in treatment of endocrine disorders, recurrent pregnancy loss, bad obstetric history and high risk pregnancy. She strongly believes in patient care that goes beyond the illness by holistically approaching the care with the right mix of evidence-based medicine and personalized care.',
  background  = 'Alumnus of Dr. B.R. Ambedkar Medical College, Bangalore and Diplomate of the National Board. Active member of BSOG and ISUOG.',
  credentials = array['MBBS, DNB (Obstetrics & Gynaecology)', '23 years experience, 15 as specialist']::text[],
  experience  = null,
  updated_at  = now()
where slug = 'dr-smitha-ap';

update public.doctors set
  category    = 'Co-Founder',
  title       = 'Co-Founder, Obstetrician and Gynaecologist',
  bio         = 'Dr. Surbhi Sinha is an obstetrician and gynaecologist and a co-founder of MyStree. She sees women for gynaecology, fertility consultations, early pregnancy and minimal access surgery.',
  background  = null,
  credentials = array['MBBS, MS (Obstetrics & Gynaecology), DNB', '13 years experience, 9 as specialist', 'Reg. No. MAH 2018 0000672 KTK']::text[],
  experience  = null,
  updated_at  = now()
where slug = 'dr-surbhi-sinha';

update public.doctors set
  category    = 'Nutrition',
  title       = 'Nutritionist and Counsellor',
  bio         = 'Priyanka Savina is a nutritionist and counsellor at MyStree. She works with women on nutrition for PCOS, pregnancy and recovery after birth, with meal plans built around their food habits and routines.',
  background  = null,
  credentials = array['Diploma in Nutrition and Health Education, M.Sc Counselling Psychology', '10 years experience']::text[],
  experience  = null,
  updated_at  = now()
where slug = 'priyanka-savina';

update public.doctors set
  category    = 'Reproductive Medicine',
  title       = 'Reproductive Medicine Specialist',
  bio         = 'Dr. Chaitra Nayak is a reproductive medicine specialist who consults at MyStree. She is the founder of Kalpa Clinic, and her clinical work covers PCOS, endometriosis and fertility evaluation.',
  background  = null,
  credentials = array['MBBS, MS (OBG), FNB (Reproductive Medicine), Fellowship in Reproductive Medicine', '24 years experience']::text[],
  experience  = null,
  updated_at  = now()
where slug = 'dr-chaitra-nayak';

update public.doctors set
  category    = 'Physiotherapy',
  title       = 'Obstetric and Gynaecological Physiotherapist',
  bio         = 'Dr. Jasmine Flora is an obstetric and gynaecological physiotherapist at MyStree with 21 years of experience. She works with women on pelvic floor rehabilitation, diastasis recti and recovery after birth.',
  background  = null,
  credentials = array['BPT, MPT (Obstetrics and Gynaecology Physiotherapy)', '21 years experience']::text[],
  experience  = null,
  updated_at  = now()
where slug = 'dr-jasmine-flora';

update public.doctors set
  category    = 'Urology & Andrology',
  title       = 'Urologist & Andrologist',
  bio         = 'Dr. Sitaram M is a Urologist and Andrologist with 12 years of experience in these fields. He practises at Androcare Institute of Andrology & Men''s Health in Jubilee Hills and LB Nagar, Hyderabad.',
  background  = null,
  credentials = array['MBBS, MS (General Surgery), MCh (Urology)', '12 years experience']::text[],
  experience  = null,
  updated_at  = now()
where slug = 'dr-sitaram-m';
