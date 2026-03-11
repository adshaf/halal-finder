-- ─────────────────────────────────────────────
--  HalalBites — seed data batch 2 (83 restaurants)
--  Areas: Edmondson Park, Prestons, Sydney CBD,
--         Burwood, Strathfield, Cabramatta,
--         Merrylands, Bankstown
--  Run AFTER schema.sql and seed.sql
-- ─────────────────────────────────────────────

insert into restaurants (
  slug, name, description, long_description,
  cuisine, price, location, address, phone, website,
  hours, image, hero_image, gallery,
  no_alcohol, no_pork, halal_certified, muslim_owned, muslim_chefs,
  prayer_room, halal_chicken, halal_beef,
  seafood_options, vegetarian_options, vegan_options,
  featured, verified,
  latitude, longitude
) values

-- ═══════════════════════════════════════════
--  EDMONDSON PARK (1–24)
-- ═══════════════════════════════════════════

-- 1. Makan
(
  'makan-edmondson-park',
  'Makan',
  'Warm Malaysian kitchen serving authentic laksa, nasi lemak and bold Southeast Asian flavours.',
  'Makan brings the flavours of Malaysia to Ed.Square, with fragrant laksa, nasi lemak, and rich curry bowls made from scratch. A welcoming spot for both dine-in and takeaway in Edmondson Park Town Centre.',
  'Malaysian', '$$', 'Edmondson Park, Sydney',
  'Shop AG52/52 Soldiers Parade, Edmondson Park NSW 2174',
  NULL, NULL,
  array['Mon–Sun: 11:30–21:00'],
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1400',
  array['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600'],
  true, true, false, false, false,
  false, true, true,
  true, true, false,
  false, false,
  -33.9485, 150.8880
),

-- 2. Gami Chicken
(
  'gami-chicken-edmondson-park',
  'Gami Chicken',
  'Korean fried chicken chain known for crispy wings, beer and punchy sauces.',
  'Gami Chicken & Beer is a popular Korean fried-chicken chain that has landed at Ed.Square. Expect double-fried wings in flavours ranging from soy-garlic to fire, paired with cold drinks and Korean sides.',
  'Korean', '$$', 'Edmondson Park, Sydney',
  'Shop AG45/52 Soldiers Parade, Edmondson Park NSW 2174',
  '(02) 9618 5015', 'https://gamichicken.com.au',
  array['Mon–Sun: 11:30–20:50'],
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1400',
  array['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600'],
  false, false, false, false, false,
  false, true, false,
  false, true, false,
  false, false,
  -33.9485, 150.8882
),

-- 3. At Mex
(
  'at-mex-edmondson-park',
  'At Mex',
  'Halal-certified Mexican fast food serving burritos, tacos and loaded nachos.',
  'At Mex brings halal-certified Mexican street food to Edmondson Park with fresh burritos, tacos, and quesadillas made to order. A family-friendly fast-casual spot popular with the local community.',
  'Mexican', '$', 'Edmondson Park, Sydney',
  '22 Soldiers Parade, Edmondson Park NSW 2174',
  '(02) 8798 8388', NULL,
  array['Mon–Sun: 10:00–21:30'],
  'https://images.unsplash.com/photo-1551504734-5da7e163b5db?w=600',
  'https://images.unsplash.com/photo-1551504734-5da7e163b5db?w=1400',
  array['https://images.unsplash.com/photo-1551504734-5da7e163b5db?w=600'],
  true, true, true, false, false,
  false, true, true,
  false, true, false,
  false, false,
  -33.9487, 150.8876
),

-- 4. Sushi on Fire
(
  'sushi-on-fire-edmondson-park',
  'Sushi on Fire',
  'Fresh sushi and hot Japanese dishes cooked to order in a lively Ed.Square setting.',
  'Sushi on Fire offers a wide menu of freshly rolled sushi, donburi bowls, and hot Japanese mains in the heart of Edmondson Park Town Centre. A reliable halal-friendly option for Japanese food lovers in the south-west.',
  'Japanese', '$$', 'Edmondson Park, Sydney',
  'Shop AG39/52 Soldiers Parade, Edmondson Park NSW 2174',
  '(02) 9829 2006', 'https://sushionfire.com.au',
  array['Mon–Wed: 11:00–21:00', 'Thu–Sat: 11:00–21:30', 'Sun: 11:00–21:00'],
  'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600',
  'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1400',
  array['https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600'],
  true, true, false, false, false,
  false, false, false,
  true, true, false,
  false, false,
  -33.9484, 150.8880
),

-- 5. Kerbside Eatery
(
  'kerbside-eatery-edmondson-park',
  'Kerbside Eatery',
  'Modern deli-style eatery offering gourmet subs, sandwiches, burgers and signature cheesecake on a stick.',
  'Kerbside Eatery is a popular Ed.Square lunch spot known for generous gourmet subs and its cult-favourite cheesecake on a stick. The casual deli vibe and varied menu make it a go-to for a quick and satisfying meal.',
  'Australian', '$$', 'Edmondson Park, Sydney',
  '54 Soldiers Parade, Edmondson Park NSW 2174',
  NULL, 'https://kerbsideeatery.com.au',
  array['Mon–Sun: 11:00–21:10'],
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1400',
  array['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600'],
  false, false, false, false, false,
  false, false, false,
  false, true, false,
  false, false,
  -33.9484, 150.8882
),

-- 6. Enzo's Cucina
(
  'enzos-cucina-edmondson-park',
  'Enzo''s Cucina',
  'Family Italian restaurant with authentic pasta, wood-fired pizza and warm hospitality.',
  'Enzo''s Cucina brings a taste of Italy to Edmondson Park with hand-rolled pasta, wood-fired pizzas, and classic Italian mains. A warm and welcoming dining room that suits date nights and family gatherings alike.',
  'Italian', '$$', 'Edmondson Park, Sydney',
  '52 Soldiers Parade, Edmondson Park NSW 2174',
  '(02) 9829 1859', 'https://enzoscucina.com.au',
  array['Mon–Thu: 11:30–21:00', 'Fri–Sat: 11:30–21:30', 'Sun: 11:30–21:00'],
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1400',
  array['https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600'],
  false, false, false, false, false,
  false, false, false,
  true, true, false,
  false, false,
  -33.9485, 150.8879
),

-- 7. Thanh Binh
(
  'thanh-binh-edmondson-park',
  'Thanh Binh',
  'Vibrant Vietnamese fusion café serving pho, banh mi and traditional Asian comfort dishes.',
  'Thanh Binh Asian Fusion brings hearty Vietnamese classics — from silky pho to crispy banh mi — to Edmondson Park. The relaxed café atmosphere and generous portions make it a favourite for a quick and satisfying lunch.',
  'Vietnamese', '$', 'Edmondson Park, Sydney',
  'Shop AG42/52 Soldiers Parade, Edmondson Park NSW 2174',
  '0433 986 968', NULL,
  array['Mon: 10:30–15:30', 'Wed–Sun: 10:30–15:30', 'Tue: Closed'],
  'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600',
  'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1400',
  array['https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600'],
  true, true, false, false, false,
  false, false, false,
  true, true, false,
  false, false,
  -33.9485, 150.8880
),

-- 8. Baby Bao
(
  'baby-bao-edmondson-park',
  'Baby Bao',
  'Modern bao and dumpling bar serving fluffy steamed buns with creative Asian fillings.',
  'Baby Bao specialises in pillowy steamed bao buns and pan-fried dumplings with inventive fillings inspired by Asian street food. A fun and affordable spot at Ed.Square that is popular with the after-school and weekend crowd.',
  'Chinese', '$$', 'Edmondson Park, Sydney',
  'Shop AG44/52 Soldiers Parade, Edmondson Park NSW 2174',
  NULL, NULL,
  array['Sun–Thu: 11:00–21:00', 'Fri–Sat: 11:00–21:30'],
  'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600',
  'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1400',
  array['https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600'],
  true, true, false, false, false,
  false, false, false,
  false, true, false,
  false, false,
  -33.9485, 150.8881
),

-- 9. Burger Point
(
  'burger-point-edmondson-park',
  'Burger Point',
  'Gourmet burger chain famed for stacked burgers, loaded fries and American-style comfort food.',
  'Burger Point delivers towering gourmet burgers with premium patties, crispy coatings and house-made sauces. Located in Ed.Square, it is a favourite quick-service stop for burger lovers across Edmondson Park.',
  'American', '$', 'Edmondson Park, Sydney',
  '52 Soldiers Parade, Edmondson Park NSW 2174',
  '(02) 8664 3527', 'https://burgerpoint.com.au',
  array['Mon–Sun: 10:30–21:00'],
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1400',
  array['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600'],
  false, false, false, false, false,
  false, true, true,
  false, false, false,
  false, false,
  -33.9485, 150.8878
),

-- 10. Auntie Tang
(
  'auntie-tang-edmondson-park',
  'Auntie Tang',
  'Halal malatang hot-pot bar where diners build their own spicy broth bowl with fresh ingredients.',
  'Auntie Tang is a halal-certified malatang bar that lets you customise your own spicy broth bowl from dozens of fresh proteins, vegetables and noodles. Bold Sichuan-inspired flavours in a lively Ed.Square setting.',
  'Chinese', '$$', 'Edmondson Park, Sydney',
  'Shop AG32/52 Soldiers Parade, Edmondson Park NSW 2174',
  NULL, 'https://auntietang.com.au',
  array['Mon–Sun: 11:00–21:30'],
  'https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=600',
  'https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=1400',
  array['https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=600'],
  true, true, true, false, false,
  false, false, true,
  true, true, false,
  false, false,
  -33.9485, 150.8878
),

-- 11. Noodle Den
(
  'noodle-den-edmondson-park',
  'Noodle Den',
  'Family noodle house dishing up fresh hand-pulled and wok-tossed Asian noodle bowls.',
  'The Noodle Den is a cosy neighbourhood noodle house at Ed.Square serving hand-pulled and wok-fried noodle dishes from across Asia. Generous portions and friendly service make it a local staple for the whole family.',
  'Noodles', '$', 'Edmondson Park, Sydney',
  'Shop LA30/52 Soldiers Parade, Edmondson Park NSW 2174',
  '(02) 9605 6697', NULL,
  array['Tue–Thu: 11:00–15:00 & 16:30–21:00', 'Sat–Sun: 11:00–15:00 & 16:30–21:00', 'Mon & Fri: Closed'],
  'https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=600',
  'https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=1400',
  array['https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=600'],
  true, true, false, false, false,
  false, true, true,
  true, true, false,
  false, false,
  -33.9486, 150.8879
),

-- 12. Oporto
(
  'oporto-edmondson-park',
  'Oporto',
  'Fast-food chain known for flame-grilled peri-peri chicken burgers and wraps with a zesty kick.',
  'Oporto is a well-known Australian fast-food chain specialising in flame-grilled peri-peri chicken burgers, wraps, and sides. The Edmondson Park outlet is conveniently located near the town centre for a quick halal-friendly meal.',
  'Chicken', '$', 'Edmondson Park, Sydney',
  '2/1942 Camden Valley Way, Edmondson Park NSW 2174',
  '(02) 8783 7272', 'https://oporto.com.au',
  array['Mon–Wed: 09:00–22:30', 'Thu–Sat: 09:00–23:00', 'Sun: 09:00–22:30'],
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600',
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=1400',
  array['https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600'],
  false, false, false, false, false,
  false, true, false,
  false, false, false,
  false, false,
  -33.9527, 150.8838
),

-- 13. Ogalo
(
  'ogalo-edmondson-park',
  'Ogalo',
  'Halal-certified Portuguese BBQ chicken chain offering roast chooks, burgers and wraps.',
  'Ogalo is a halal-certified Portuguese-style charcoal-chicken chain serving juicy roast chickens, burgers, and wraps. The Edmondson Park location is a quick-service favourite for families looking for a no-fuss halal meal.',
  'Portuguese', '$', 'Edmondson Park, Sydney',
  'Shop 31/52 Soldiers Parade, Edmondson Park NSW 2174',
  '(02) 9829 4848', NULL,
  array['Mon–Sun: 09:00–22:00'],
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600',
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=1400',
  array['https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600'],
  true, true, true, false, false,
  false, true, false,
  false, false, false,
  false, false,
  -33.9485, 150.8880
),

-- 14. Kitchai
(
  'kitchai-edmondson-park',
  'Kitchai',
  'Halal-certified Thai restaurant and bar serving fragrant curries, street food and cocktails.',
  'Kitchai is a vibrant halal-certified Thai restaurant at Ed.Square offering authentic curries, stir-fries, street-food snacks and a full cocktail bar. Open daily until late, it is one of the most dynamic dining options in the precinct.',
  'Thai', '$$', 'Edmondson Park, Sydney',
  'Shop 50/52 Soldiers Parade, Edmondson Park NSW 2174',
  '1800 898 998', 'https://kitchai.com.au',
  array['Daily: 10:00–23:00'],
  'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600',
  'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1400',
  array['https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600'],
  true, true, true, false, true,
  false, true, true,
  true, true, false,
  false, false,
  -33.9485, 150.8882
),

-- 15. Bom KBBQ
(
  'bom-kbbq-edmondson-park',
  'Bom KBBQ',
  'All-you-can-eat Korean BBQ buffet and soju bar with weekend DJ sessions and karaoke rooms.',
  'Bom KBBQ & Soju Bar brings the full Korean dining-out experience to Ed.Square with table-side BBQ grills, all-you-can-eat meat platters, soju cocktails, and weekend entertainment. One of the most exciting dining venues in south-west Sydney.',
  'Korean', '$$$', 'Edmondson Park, Sydney',
  'Level 1/52 Soldiers Parade, Edmondson Park NSW 2174',
  '(02) 8530 0110', 'https://bombbq.com.au',
  array['Tue–Thu: 17:00–21:30', 'Fri: 17:00–22:30', 'Sat: 16:00–22:30', 'Sun: 16:00–21:30'],
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1400',
  array['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600'],
  false, false, false, false, false,
  false, true, true,
  true, false, false,
  false, false,
  -33.9484, 150.8881
),

-- 16. Lone Star
(
  'lone-star-edmondson-park',
  'Lone Star',
  'American-style rib house serving slow-cooked ribs, steaks, schnitzels and craft beers.',
  'Lone Star Rib House brings American comfort food to Ed.Square with slow-cooked baby-back ribs, prime steaks, and jumbo schnitzels. A lively atmosphere with plenty of options for the whole family.',
  'American', '$$$', 'Edmondson Park, Sydney',
  '52 Soldiers Parade, Edmondson Park NSW 2174',
  '(02) 8107 5861', 'https://lonestarribhouse.com.au',
  array['Mon–Fri: 11:30–21:00', 'Sat: 11:30–22:30', 'Sun: 11:30–21:00'],
  'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600',
  'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1400',
  array['https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600'],
  false, false, false, false, false,
  false, true, true,
  false, false, false,
  false, false,
  -33.9485, 150.8880
),

-- 17. Meet and Eat
(
  'meet-and-eat-edmondson-park',
  'Meet and Eat',
  'All-day café near the train station serving breakfast, wraps, toasties and desserts.',
  'Meet and Eat is a convenient all-day café tucked near Edmondson Park train station, serving hot breakfast, toasted sandwiches, and sweet treats from early morning. A handy stop for commuters and local workers.',
  'Café', '$', 'Edmondson Park, Sydney',
  'Shop AG07/52 Sergeant St, Edmondson Park NSW 2174',
  NULL, NULL,
  array['Mon–Sun: 06:00–23:00'],
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400',
  array['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600'],
  true, true, false, false, false,
  false, false, false,
  false, true, false,
  false, false,
  -33.9486, 150.8879
),

-- 18. Masala Kitchen
(
  'masala-kitchen-edmondson-park',
  'Masala Kitchen',
  'Halal-certified Indian restaurant delivering aromatic curries, biryanis and tandoor dishes.',
  'Masala Kitchen serves up a full repertoire of halal-certified Indian flavours at Ed.Square, from slow-cooked curries and fragrant biryanis to freshly baked naan from the tandoor oven. A reliable choice for Indian food lovers in south-west Sydney.',
  'Indian', '$$', 'Edmondson Park, Sydney',
  'Shop AG35/52 Soldiers Parade, Edmondson Park NSW 2174',
  '(02) 9618 0135', 'https://masalakitchen.com.au',
  array['Mon: 11:00–22:00', 'Wed–Sun: 11:00–22:00', 'Tue: Closed'],
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600',
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1400',
  array['https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600'],
  true, true, true, false, false,
  false, true, true,
  false, true, false,
  false, false,
  -33.9485, 150.8880
),

-- 19. Mad Manoush
(
  'mad-manoush-edmondson-park',
  'Mad Manoush',
  'Halal Lebanese bakery and pizza shop specialising in wood-fired manoush and shawarma wraps.',
  'Mad Manoush is a halal-certified Lebanese bakery at Ed.Square famous for its wood-fired manoush flatbreads, crispy shawarma wraps, and loaded pizzas. A crowd favourite for a quick, flavourful and affordable meal.',
  'Lebanese', '$', 'Edmondson Park, Sydney',
  'Shop AG49/52 Soldiers Parade, Edmondson Park NSW 2174',
  '(02) 9618 7665', 'https://madmanoush.com.au',
  array['Mon–Sun: 09:00–21:00'],
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=1400',
  array['https://images.unsplash.com/photo-1544025162-d76694265947?w=600'],
  true, true, true, true, false,
  false, true, true,
  false, true, false,
  false, false,
  -33.9485, 150.8881
),

-- 20. Philliez
(
  'philliez-edmondson-park',
  'Philliez',
  'American-inspired diner famous for Philly cheesesteaks, smashed burgers and loaded fries.',
  'Philliez is a late-night American diner on Camden Valley Way serving signature Philly cheesesteaks, smashed burgers, and indulgent loaded fries. Open until the early hours, it is the go-to spot for a satisfying late-night bite in Edmondson Park.',
  'American', '$', 'Edmondson Park, Sydney',
  '2072 Camden Valley Way, Edmondson Park NSW 2174',
  NULL, 'https://philliez.com',
  array['Mon–Sun: 09:00–01:30'],
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1400',
  array['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600'],
  false, false, false, false, false,
  false, true, true,
  false, false, false,
  false, false,
  -33.9525, 150.8840
),

-- 21. Naji's Charcoal Chicken & Kebabs
(
  'najis-charcoal-chicken-edmondson-park',
  'Naji''s Charcoal Chicken & Kebabs',
  'Halal Lebanese charcoal-chicken specialist with kebabs, wraps and mezze on the side.',
  'Naji''s serves succulent halal charcoal chicken, shish tawook, and mixed grill plates at Ed.Square. Generous portions, fresh Lebanese sides, and late opening hours make it a staple for the whole community.',
  'Lebanese', '$', 'Edmondson Park, Sydney',
  'Shop AG34/52 Soldiers Parade, Edmondson Park NSW 2174',
  NULL, NULL,
  array['Sun–Thu: 10:00–22:00', 'Fri–Sat: 10:00–23:30'],
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=1400',
  array['https://images.unsplash.com/photo-1544025162-d76694265947?w=600'],
  true, true, true, true, false,
  false, true, true,
  false, true, false,
  false, false,
  -33.9485, 150.8880
),

-- 22. Frango
(
  'frango-edmondson-park',
  'Frango',
  'Australia''s first charcoal-chicken drive-thru offering Portuguese-style chooks, burgers and seasonal salads.',
  'Frango Charcoal Chicken made history as Australia''s first charcoal-chicken drive-thru, serving Portuguese-inspired chooks hot off the rotisserie alongside burgers, wraps, and fresh salads. A convenient and delicious stop on Camden Valley Way.',
  'Portuguese', '$$', 'Edmondson Park, Sydney',
  '2074 Camden Valley Way, Edmondson Park NSW 2174',
  NULL, 'https://frangocharcoalchicken.com.au',
  array['Mon–Sun: 10:00–22:00'],
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600',
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=1400',
  array['https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600'],
  false, false, false, false, false,
  false, true, false,
  false, false, false,
  false, false,
  -33.9526, 150.8839
),

-- 23. The Shed
(
  'the-shed-edmondson-park',
  'The Shed Cafe',
  'Cosy home-style café serving breakfast, brunch, house-baked goods and hearty lunch plates.',
  'The Shed Café is a beloved all-day breakfast and brunch spot at Ed.Square with a warm, relaxed atmosphere. Fresh house-baked goods, generous brunch plates, and quality coffee make it a community favourite from morning to mid-afternoon.',
  'Café', '$', 'Edmondson Park, Sydney',
  'Shop AG70/52 Soldiers Parade, Edmondson Park NSW 2174',
  '(02) 9618 6709', NULL,
  array['Mon–Sat: 07:00–15:00', 'Sun: 08:00–15:00'],
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400',
  array['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600'],
  true, true, false, false, false,
  false, false, false,
  false, true, false,
  false, false,
  -33.9485, 150.8882
),

-- 24. Dough Sisters
(
  'dough-sisters-edmondson-park',
  'Dough Sisters',
  'Halal artisan focaccia sandwich and bakery shop run by two sisters, pork-free and community-focused.',
  'Dough Sisters is a Muslim-owned artisan bakery at Ed.Square run by two sisters passionate about quality ingredients and community. Expect inventive focaccia sandwiches, baked goods, and a fully pork-free menu.',
  'Bakery', '$', 'Edmondson Park, Sydney',
  '52 Soldiers Parade, Edmondson Park NSW 2174',
  '0459 592 929', NULL,
  array['Mon–Sat: 09:00–17:30', 'Sun: 10:00–16:00'],
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400',
  array['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600'],
  true, true, true, true, false,
  false, false, false,
  false, true, false,
  false, false,
  -33.9485, 150.8879
),

-- ═══════════════════════════════════════════
--  PRESTONS (25–27)
-- ═══════════════════════════════════════════

-- 25. Mad Grillz Smokehouse
(
  'mad-grillz-smokehouse-prestons',
  'Mad Grillz Smokehouse',
  'Halal smokehouse serving slow-smoked brisket, ribs, pulled meats and loaded burgers.',
  'Mad Grillz Smokehouse brings authentic American-style BBQ to South-West Sydney with halal-certified slow-smoked brisket, fall-off-the-bone ribs, and loaded burgers. A late-night venue with a lively weekend atmosphere at HomeCo Prestons.',
  'BBQ', '$$', 'Prestons, Sydney',
  'Shop T10/1985 Camden Valley Way, Prestons NSW 2170',
  '(02) 8080 8700', 'https://madgrillz.com.au',
  array['Mon–Thu: 17:00–22:00', 'Fri: 17:00–00:00', 'Sat: 15:00–01:00', 'Sun: 13:00–23:00'],
  'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600',
  'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=1400',
  array['https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600'],
  true, true, true, false, false,
  false, true, true,
  false, false, false,
  false, false,
  -33.9620, 150.8705
),

-- 26. XS Espresso
(
  'xs-espresso-prestons',
  'XS Espresso',
  'Popular café chain serving specialty coffee, breakfast and all-day dining favourites.',
  'XS Espresso is a well-established café chain with a location at Prestons, offering specialty coffee, hearty all-day breakfast, and a varied menu of café staples. A relaxed spot for casual dining near HomeCo Prestons.',
  'Café', '$', 'Prestons, Sydney',
  'Shop 5/1975 Camden Valley Way, Prestons NSW 2170',
  '(02) 9826 0076', 'https://xsespresso.com.au',
  array['Mon–Fri: 06:00–22:00', 'Sat–Sun: 07:00–22:00'],
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400',
  array['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600'],
  false, false, false, false, false,
  false, false, false,
  false, true, false,
  false, false,
  -33.9619, 150.8706
),

-- 27. Thaidition
(
  'thaidition-prestons',
  'Thaidition',
  'Authentic Thai restaurant serving curries, pad thai and classic street food at HomeCo Prestons.',
  'Thaidition brings genuine Thai home cooking to Prestons with fragrant curries, fresh pad thai, and classic street-food favourites. Generous serves and a friendly neighbourhood feel make it a local favourite at the HomeCo precinct.',
  'Thai', '$$', 'Prestons, Sydney',
  'Shop 3/1975 Camden Valley Way, Prestons NSW 2170',
  '0420 774 799', NULL,
  array['Mon–Sun: 11:00–15:00 & 16:00–22:00'],
  'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600',
  'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1400',
  array['https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600'],
  true, true, false, false, false,
  false, true, true,
  true, true, false,
  false, false,
  -33.9619, 150.8706
),

-- ═══════════════════════════════════════════
--  SYDNEY CBD (28–43)
-- ═══════════════════════════════════════════

-- 28. It's Time for Thai
(
  'its-time-for-thai-sydney-cbd',
  'It''s Time for Thai',
  'Halal Thai restaurant near Central Station serving fragrant curries, noodles and Thai street food.',
  'It''s Time for Thai is a halal-certified Thai restaurant on George Street near Central, serving an extensive menu of fragrant curries, pad thai, and Thai street food favourites. A well-loved spot for workers and students in the CBD.',
  'Thai', '$$', 'Sydney CBD',
  '767–769 George St, Haymarket NSW 2000',
  NULL, NULL,
  array['Mon–Sun: 11:00–23:30'],
  'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600',
  'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1400',
  array['https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600'],
  true, true, true, false, false,
  false, true, true,
  true, true, false,
  false, false,
  -33.8830, 151.2055
),

-- 29. 1915 Halal Lanzhou Beef Noodles (CBD)
(
  '1915-halal-lanzhou-sydney-cbd',
  '1915 Halal Lanzhou Beef Noodles',
  'Halal hand-pulled Lanzhou beef noodle restaurant with rich bone broth and silky noodles.',
  '1915 Halal Lanzhou Beef Noodles serves traditional hand-pulled noodles in a deeply flavoured slow-cooked beef broth, following the centuries-old Lanzhou noodle tradition. A satisfying and affordable halal meal right in the Sydney CBD.',
  'Chinese', '$', 'Sydney CBD',
  'Shop 171/123 Liverpool St, Sydney NSW 2000',
  NULL, NULL,
  array['Mon–Sun: 11:00–21:00'],
  'https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=600',
  'https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=1400',
  array['https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=600'],
  true, true, true, false, false,
  false, false, true,
  false, false, false,
  false, false,
  -33.8771, 151.2077
),

-- 30. No 1 Beef Noodles
(
  'no-1-beef-noodles-haymarket',
  'No 1 Beef Noodles',
  'Muslim-owned Uyghur-style beef noodle restaurant with a prayer room, kebabs and dumplings.',
  'No 1 Halal Beef Noodles & Kebab is a Muslim-owned gem in Haymarket serving hand-pulled noodles in robust halal beef broth alongside skewered lamb, steamed dumplings, and Uyghur-style flatbread. One of the few CBD restaurants with a dedicated prayer room.',
  'Chinese', '$', 'Sydney CBD',
  '8 Dixon St, Haymarket NSW 2000',
  NULL, NULL,
  array['Mon–Sun: 11:00–21:00'],
  'https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=600',
  'https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=1400',
  array['https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=600'],
  true, true, true, true, true,
  true, false, true,
  false, false, false,
  false, false,
  -33.8782, 151.2052
),

-- 31. Mecca Bah
(
  'mecca-bah-sydney-cbd',
  'Mecca Bah',
  'Contemporary Middle Eastern restaurant on King Street Wharf offering mezze, grills and cocktails.',
  'Mecca Bah is a stylish waterfront Middle Eastern restaurant at King Street Wharf serving share-style mezze, charcoal grills, and creative cocktails with harbour views. The relaxed atmosphere and bold flavours make it a popular CBD dining destination.',
  'Middle Eastern', '$$$', 'Sydney CBD',
  'Shop 5/32–34 The Promenade, King Street Wharf, Sydney NSW 2000',
  '(02) 9290 3814', 'https://meccabah.sydney',
  array['Daily: 11:30–late'],
  'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=600',
  'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=1400',
  array['https://images.unsplash.com/photo-1551782450-17144efb9c50?w=600'],
  false, false, false, false, false,
  false, true, true,
  true, true, false,
  false, false,
  -33.8680, 151.2015
),

-- 32. Open Sesame
(
  'open-sesame-sydney-cbd',
  'Open Sesame',
  'Halal Arabian food spot at Sydney Place serving shawarma, kebabs, wraps and signature dips.',
  'Open Sesame is a halal-certified Lebanese and Arabian fast-casual eatery in the Sydney CBD, known for its charcoal-grilled shawarma, crispy falafel, and house-made garlic and chilli dips. A fresh and flavourful option in the heart of the city.',
  'Lebanese', '$$', 'Sydney CBD',
  '39 Martin Place, Sydney NSW 2000',
  NULL, NULL,
  array['Mon–Sun: 11:00–22:00'],
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=1400',
  array['https://images.unsplash.com/photo-1544025162-d76694265947?w=600'],
  true, true, true, false, false,
  false, true, true,
  true, true, false,
  false, false,
  -33.8674, 151.2089
),

-- 33. Meat and Wine Co
(
  'meat-and-wine-co-darling-harbour',
  'The Meat and Wine Co',
  'Upscale steakhouse at Darling Harbour with premium cuts, extensive wine list and harbour views.',
  'The Meat & Wine Co is a premium steakhouse on Darling Harbour offering prime Australian and wagyu cuts, a lengthy wine list, and sweeping water views. A sophisticated dining experience for special occasions in the heart of Sydney.',
  'Steakhouse', '$$$', 'Sydney CBD',
  '31 Wheat Road, Darling Harbour, Sydney NSW 2000',
  '(02) 9211 9888', 'https://themeatandwineco.com',
  array['Sun–Thu: 12:00–22:00', 'Fri–Sat: 12:00–23:00'],
  'https://images.unsplash.com/photo-1546964124-0cce460e18ce?w=600',
  'https://images.unsplash.com/photo-1546964124-0cce460e18ce?w=1400',
  array['https://images.unsplash.com/photo-1546964124-0cce460e18ce?w=600'],
  false, false, false, false, false,
  false, false, true,
  true, false, false,
  false, false,
  -33.8726, 151.1998
),

-- 34. Shalom
(
  'shalom-indonesian-sydney-cbd',
  'Shalom',
  'Long-established halal Indonesian restaurant in the CBD serving nasi goreng, rendang and soto.',
  'Shalom is one of Sydney CBD''s most established halal Indonesian restaurants, serving rich rendang, fragrant nasi goreng, and comforting soto ayam to a loyal clientele for many years. A reliable and affordable taste of Indonesia steps from Town Hall.',
  'Indonesian', '$$', 'Sydney CBD',
  'Shop 3–4/299 Sussex St, Sydney NSW 2000',
  '(02) 9264 1144', NULL,
  array['Mon–Sat: 11:00–22:00', 'Sun: 12:00–22:00'],
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1400',
  array['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600'],
  true, true, true, false, false,
  false, true, true,
  true, true, false,
  false, false,
  -33.8753, 151.2036
),

-- 35. Pandawa
(
  'pandawa-sydney-cbd',
  'Pandawa',
  'Halal Indonesian restaurant with 150+ seats serving authentic nasi bungkus, satay and rendang.',
  'Pandawa is a large halal Indonesian dining institution in the CBD seating over 150 guests, celebrated for its authentic nasi bungkus parcels, charcoal satay sticks, and slow-braised rendang. A Sydney institution for Indonesian community gatherings and casual lunches alike.',
  'Indonesian', '$$', 'Sydney CBD',
  '220 Pitt St, Sydney NSW 2000',
  NULL, 'https://pandawa.com.au',
  array['Sun–Wed: 11:00–21:00', 'Thu–Sat: 11:00–22:00'],
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1400',
  array['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600'],
  true, true, true, false, false,
  false, true, true,
  true, true, false,
  false, false,
  -33.8748, 151.2075
),

-- 36. D'Penyetz & D'Cendol (CBD)
(
  'dpenyetz-dcendol-sydney-cbd',
  'D''Penyetz & D''Cendol',
  'Halal Indonesian chain famed for smashed penyetz chicken with bold sambal and refreshing cendol.',
  'D''Penyetz & D''Cendol brings the iconic Indonesian ayam penyet (smashed fried chicken) to the Sydney CBD, served with fiery sambal terasi and steamed rice. Round off the meal with a classic cendol shaved-ice dessert.',
  'Indonesian', '$$', 'Sydney CBD',
  'Shop 8/339 Sussex St, Sydney NSW 2000',
  NULL, 'https://dpenyetz.com.au',
  array['Mon–Sun: 11:00–21:00'],
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1400',
  array['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600'],
  true, true, true, false, false,
  false, true, true,
  true, true, false,
  false, false,
  -33.8765, 151.2032
),

-- 37. Neptune Palace
(
  'neptune-palace-sydney-cbd',
  'Neptune Palace',
  'Sydney''s premier halal Chinese-Malaysian fine-dining restaurant with live seafood and yum cha.',
  'Neptune Palace is widely regarded as Sydney''s leading halal Chinese-Malaysian fine-dining venue, offering premium live seafood, an extensive yum cha menu, and lavish banquet packages. Located near Circular Quay with elegant décor suited to family celebrations.',
  'Chinese', '$$$', 'Sydney CBD',
  'Level 1 Gateway Building, Cnr Pitt & Alfred St, Sydney NSW 2000',
  '(02) 9241 3338', 'https://neptunepalace.com.au',
  array['Daily: 12:00–15:00 & 17:00–22:30'],
  'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600',
  'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1400',
  array['https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600'],
  true, true, true, false, false,
  false, true, true,
  true, true, false,
  false, false,
  -33.8611, 151.2105
),

-- 38. 6Head
(
  '6head-the-rocks-sydney',
  '6Head',
  'Premium Australian steakhouse inside an 1839 heritage sandstone building with harbour views.',
  '6Head is a landmark Sydney steakhouse occupying a beautifully preserved 1839 sandstone building at Campbell''s Cove in The Rocks. The menu celebrates Australia''s finest beef with premium dry-aged cuts, seasonal sides, and a thoughtful wine list overlooking the harbour.',
  'Steakhouse', '$$$', 'The Rocks, Sydney',
  'Bay 10–11 Campbell''s Stores, 7–27 Circular Quay West, The Rocks NSW 2000',
  '(02) 8629 8866', 'https://6head.com.au',
  array['Mon–Thu: 12:00–22:00', 'Fri–Sat: 12:00–00:00', 'Sun: 12:00–22:00'],
  'https://images.unsplash.com/photo-1546964124-0cce460e18ce?w=600',
  'https://images.unsplash.com/photo-1546964124-0cce460e18ce?w=1400',
  array['https://images.unsplash.com/photo-1546964124-0cce460e18ce?w=600'],
  false, false, false, false, false,
  false, false, true,
  true, false, false,
  false, false,
  -33.8604, 151.2086
),

-- 39. Kiroran Silk Road
(
  'kiroran-silk-road-haymarket',
  'Kiroran Silk Road',
  'Atmospheric Uyghur restaurant serving hand-pulled noodles, lamb skewers and Central Asian bread.',
  'Kiroran Silk Road is a beloved Haymarket institution celebrating the cuisine of Xinjiang with fragrant hand-pulled laghman noodles, smoky lamb skewers, and freshly baked samsa pastries. Halal-certified with an authentic atmosphere that transports diners to the ancient Silk Road.',
  'Uyghur', '$$', 'Sydney CBD',
  'Shop 3/6 Dixon St, Haymarket NSW 2000',
  NULL, NULL,
  array['Tue–Sun: 12:00–22:00', 'Mon: Closed'],
  'https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=600',
  'https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=1400',
  array['https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=600'],
  true, true, true, false, true,
  false, true, true,
  false, true, false,
  false, false,
  -33.8784, 151.2048
),

-- 40. Lal Qila
(
  'lal-qila-darling-harbour',
  'Lal Qila',
  'Elegant 100% halal Indian restaurant at Darling Harbour with lavish buffets and à la carte dining.',
  'Lal Qila is a fully halal-certified upscale Indian restaurant on the edge of Darling Harbour, renowned for its lavish lunch buffets and elaborate à la carte dinner menu spanning the full breadth of Indian regional cuisine. Ideal for business lunches and special celebrations.',
  'Indian', '$$$', 'Sydney CBD',
  '30 Lime St, Darling Harbour, Sydney NSW 2000',
  '1300 525 745', 'https://lalqila.com.au',
  array['Mon–Sat: 12:00–15:00 & 17:00–22:30', 'Sun: 12:00–22:00'],
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600',
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1400',
  array['https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600'],
  true, true, true, false, false,
  false, true, true,
  true, true, false,
  false, false,
  -33.8718, 151.2006
),

-- 41. Dapur Sate
(
  'dapur-sate-darling-square',
  'Dapur Sate',
  'Darling Square Indonesian satay kitchen celebrating regional skewer traditions with rich sauces.',
  'Dapur Sate at Darling Square showcases Indonesia''s rich satay traditions with charcoal-grilled skewers served with house-made peanut, kecap manis, and rendang sauces. Halal-certified and packed with bold Indonesian flavours in a modern precinct setting.',
  'Indonesian', '$$', 'Sydney CBD',
  '4/1 Little Pier St, Haymarket NSW 2000',
  NULL, 'https://dapursate.com.au',
  array['Sun–Wed: 11:00–20:00', 'Thu–Sat: 11:00–21:00'],
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1400',
  array['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600'],
  true, true, true, false, false,
  false, true, true,
  true, true, false,
  false, false,
  -33.8775, 151.1992
),

-- 42. Wingboy Darling Square
(
  'wingboy-darling-square',
  'Wingboy',
  'Lively wing bar with 14 house-made flavours, bottomless weekend deals and craft beer.',
  'Wingboy at Darling Square is a high-energy chicken wing bar with 14 signature sauces ranging from classic buffalo to Korean gochujang. Bottomless wing deals on weekends and a vibrant atmosphere make it a popular night-out destination.',
  'American', '$$', 'Sydney CBD',
  '7 Steam Mill Lane, Haymarket NSW 2000',
  '(02) 7251 4497', 'https://wingboy.com.au',
  array['Mon–Tue: 12:00–21:00', 'Wed–Thu: 12:00–22:00', 'Fri–Sat: 12:00–23:00', 'Sun: 12:00–22:00'],
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600',
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=1400',
  array['https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600'],
  false, false, false, false, false,
  false, true, false,
  false, false, false,
  false, false,
  -33.8780, 151.1990
),

-- 43. Shabuway
(
  'shabuway-haymarket',
  'Shabuway',
  'Sydney''s first halal self-serve all-you-can-eat shabu-shabu buffet with wagyu and fresh produce.',
  'Shabuway is Sydney''s original halal shabu-shabu buffet, letting diners cook wagyu beef, premium proteins, and fresh vegetables in their choice of flavoured broths at their own pace. An immersive and excellent-value dining experience in Haymarket.',
  'Japanese', '$$', 'Sydney CBD',
  'Shop 35/1 Dixon St, Haymarket NSW 2000',
  NULL, 'https://shabuway.com.au',
  array['Sun–Thu: 12:00–22:00', 'Fri–Sat: 12:00–23:00'],
  'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600',
  'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1400',
  array['https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600'],
  true, true, true, false, false,
  false, true, true,
  true, true, false,
  false, false,
  -33.8780, 151.2048
),

-- ═══════════════════════════════════════════
--  BURWOOD (44–53)
-- ═══════════════════════════════════════════

-- 44. 1915 Lanzhou (Burwood)
(
  '1915-lanzhou-burwood',
  '1915 Lanzhou Beef Noodles',
  'Halal Lanzhou hand-pulled beef noodle restaurant with slow-cooked broth and no bookings required.',
  '1915 Lanzhou Beef Noodles at Burwood serves traditional hand-pulled noodles in a rich halal bone broth, following the time-honoured Lanzhou craft. A walk-in favourite on Burwood Road for a quick and deeply satisfying bowl.',
  'Chinese', '$', 'Burwood, Sydney',
  '168A Burwood Rd, Burwood NSW 2134',
  '(02) 9715 2608', NULL,
  array['Mon–Sun: 11:00–21:00'],
  'https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=600',
  'https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=1400',
  array['https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=600'],
  true, true, true, false, false,
  false, false, true,
  false, false, false,
  false, false,
  -33.8764, 151.1033
),

-- 45. D'Penyetz (Burwood)
(
  'dpenyetz-burwood',
  'D''Penyetz & D''Cendol',
  'Halal Indonesian ayam penyet specialist with crispy smashed chicken, sambal and cendol dessert.',
  'D''Penyetz Burwood serves the much-loved Indonesian ayam penyet — crispy fried chicken smashed with fiery sambal — alongside rice, tofu, and tempeh. Finish with a traditional cendol shaved-ice dessert for the full Indonesian experience.',
  'Indonesian', '$$', 'Burwood, Sydney',
  '183C Burwood Rd, Burwood NSW 2134',
  '(02) 8526 0199', 'https://dpenyetz.com.au',
  array['Mon: 12:00–22:00', 'Wed–Thu: 12:00–22:00', 'Fri: 12:00–22:30', 'Sat–Sun: 11:30–22:30', 'Tue: Closed'],
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1400',
  array['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600'],
  true, true, true, false, false,
  false, true, true,
  true, true, false,
  false, false,
  -33.8762, 151.1030
),

-- 46. Sahara by the Park
(
  'sahara-by-the-park-burwood',
  'Sahara by the Park',
  'Established Turkish-Mediterranean restaurant serving mezze, charcoal meats and fresh flatbreads.',
  'Sahara by the Park is a Burwood favourite for Turkish-Mediterranean dining, with a generous mezze spread, charcoal-grilled meats, and freshly baked flatbread. A warm and welcoming restaurant popular with families for over a decade.',
  'Turkish', '$$', 'Burwood, Sydney',
  '100 Burwood Rd, Burwood NSW 2134',
  '(02) 9747 4540', NULL,
  array['Mon–Sun: 10:00–22:30'],
  'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600',
  'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=1400',
  array['https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600'],
  true, true, true, false, false,
  false, true, true,
  true, true, false,
  false, false,
  -33.8743, 151.1038
),

-- 47. Fat Cat
(
  'fat-cat-burwood',
  'Fat Cat',
  'Modern Asian restaurant on Level 2 of The Grand Shanghai Hotel with eclectic share-plate menu.',
  'Fat Cat is a vibrant Asian fusion restaurant on the second floor of the Grand Shanghai Hotel in Burwood, offering a broad share-plate menu spanning Japanese, Korean, and Chinese influences. A fun spot for groups and late-night dining.',
  'Asian', '$$', 'Burwood, Sydney',
  '21–23 Belmore St, Burwood NSW 2134',
  '(02) 8552 1001', NULL,
  array['Sun–Thu: 11:00–21:00', 'Fri–Sat: 11:00–22:00'],
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1400',
  array['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600'],
  false, false, false, false, false,
  false, false, false,
  true, true, false,
  false, false,
  -33.8768, 151.1040
),

-- 48. Apandim Uyghur
(
  'apandim-uyghur-burwood',
  'Apandim Uyghur',
  'Authentic halal Uyghur restaurant dishing up handmade noodles, lamb stir-fries and pastries.',
  'Apandim Uyghur Restaurant is one of Sydney''s most authentic Xinjiang dining experiences, with Muslim chefs handmaking the laghman noodles, polo rice, and lamb-filled samsa pastries daily. Halal-certified with a welcoming atmosphere on Burwood Road.',
  'Uyghur', '$$', 'Burwood, Sydney',
  '189 Burwood Rd, Burwood NSW 2134',
  '(02) 9701 0527', 'https://apandimuyghur.com.au',
  array['Wed–Mon: 11:30–21:00', 'Tue: Closed'],
  'https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=600',
  'https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=1400',
  array['https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=600'],
  true, true, true, false, true,
  false, true, true,
  false, true, false,
  false, false,
  -33.8762, 151.1028
),

-- 49. Lanzhou Golden Taste
(
  'lanzhou-golden-taste-burwood',
  'Lanzhou Golden Taste',
  'Halal Lanzhou noodle house pulling hand-stretched noodles in premium Australian beef broth.',
  'Lanzhou Golden Taste is a specialist noodle house on Burwood Road, hand-stretching fresh noodles to order and serving them in a rich halal-certified Australian beef bone broth. A no-frills, high-quality bowl of noodle soup at an excellent price.',
  'Chinese', '$', 'Burwood, Sydney',
  'Shop 8/258–264 Burwood Rd, Burwood NSW 2134',
  '(02) 9360 0171', NULL,
  array['Mon–Sun: 11:00–21:00'],
  'https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=600',
  'https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=1400',
  array['https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=600'],
  true, true, true, false, false,
  false, false, true,
  false, false, false,
  false, false,
  -33.8760, 151.1025
),

-- 50. SparQling Pizza & Grill
(
  'sparqling-pizza-grill-burwood',
  'SparQling Pizza & Grill',
  'Halal pizza and grill restaurant with wood-fired pizzas, charcoal meats and Mediterranean flavours.',
  'SparQling Pizza & Grill on Burwood Road combines a wood-fired pizza oven with a charcoal grill for a Mediterranean-inspired halal menu. Stone-baked pizzas with generous toppings sit alongside grilled meats and hearty pasta dishes.',
  'Pizza', '$$', 'Burwood, Sydney',
  '126 Burwood Rd, Burwood NSW 2134',
  '(02) 9715 7730', 'https://sparqling.com.au',
  array['Tue–Sun: 11:00–22:00', 'Mon: Closed'],
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1400',
  array['https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600'],
  true, true, true, false, false,
  false, true, true,
  false, true, false,
  false, false,
  -33.8756, 151.1041
),

-- 51. Geprek in Sydney
(
  'geprek-in-sydney-burwood',
  'Geprek in Sydney',
  'Indonesian smashed fried chicken bowls with sambal, peanut or salted egg sauce in Burwood Chinatown.',
  'Geprek in Sydney brings the Indonesian street-food trend of crispy smashed fried chicken drowned in fiery sambal or luscious salted-egg sauce to Burwood Chinatown. A bold, affordable, and crowd-pleasing flavour hit.',
  'Indonesian', '$', 'Burwood, Sydney',
  'Kiosk 7/Level 1, 127–133 Burwood Rd, Burwood NSW 2134',
  NULL, NULL,
  array['Mon–Sun: 11:00–22:00'],
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1400',
  array['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600'],
  true, true, false, false, false,
  false, true, false,
  false, false, false,
  false, false,
  -33.8765, 151.1033
),

-- 52. Kumadon
(
  'kumadon-burwood',
  'Kumadon',
  'Japanese BBQ donburi bar serving freshly grilled wagyu, teriyaki chicken and premium rice bowls.',
  'Kumadon is a Japanese donburi bar in Burwood Chinatown specialising in freshly grilled wagyu beef, teriyaki chicken, and premium rice bowls topped with house-made sauces. A quick and satisfying Japanese meal at an accessible price point.',
  'Japanese', '$$', 'Burwood, Sydney',
  'Shop 10/127–133 Burwood Rd, Burwood NSW 2134',
  '0420 966 200', NULL,
  array['Mon–Thu: 11:00–21:30', 'Fri–Sat: 11:00–22:30', 'Sun: 11:00–21:30'],
  'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600',
  'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1400',
  array['https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600'],
  true, true, false, false, false,
  false, true, true,
  false, false, false,
  false, false,
  -33.8765, 151.1033
),

-- 53. Moyashi Japanese Hotpot
(
  'moyashi-japanese-hotpot-burwood',
  'Moyashi Japanese Hotpot',
  'Premium all-you-can-eat Japanese hotpot buffet with wagyu beef and seasonal broth options.',
  'Moyashi Japanese Hotpot at Burwood Chinatown offers a premium all-you-can-eat shabu-shabu experience with wagyu beef, fresh seafood, and seasonal vegetables cooked in your choice of artisanal broths. An indulgent and interactive dining experience for groups.',
  'Japanese', '$$$', 'Burwood, Sydney',
  'Level 1, Shop 112–113/127–133 Burwood Rd, Burwood NSW 2134',
  '(02) 8385 4940', NULL,
  array['Mon–Fri: 11:30–15:00 & 17:30–22:00', 'Sat: 11:30–22:30', 'Sun: 11:30–22:00'],
  'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600',
  'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1400',
  array['https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600'],
  false, false, false, false, false,
  false, false, true,
  true, true, false,
  false, false,
  -33.8765, 151.1033
),

-- ═══════════════════════════════════════════
--  STRATHFIELD (54–55)
-- ═══════════════════════════════════════════

-- 54. Butchers Buffet (Strathfield)
(
  'butchers-buffet-strathfield',
  'Butchers Buffet',
  'Halal-friendly Korean BBQ buffet with certified halal chicken and beef grilled at the table.',
  'Butchers Buffet at Strathfield is an all-you-can-eat Korean BBQ experience where diners grill marinated meats at their own table. A popular destination for groups and families looking for a social and satisfying Korean dining night out.',
  'Korean', '$$', 'Strathfield, Sydney',
  '11 Parnell St, Strathfield NSW 2135',
  '(02) 8040 2744', 'https://butchersbuffet.com.au',
  array['Daily: 11:30–16:30 & 17:30–22:00'],
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1400',
  array['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600'],
  false, false, false, false, false,
  false, true, true,
  true, false, false,
  false, false,
  -33.8673, 151.0924
),

-- 55. Gajok
(
  'gajok-strathfield',
  'Gajok BBQ',
  'Halal Korean BBQ buffet with premium cuts, traditional banchan and soju cocktails.',
  'Gajok BBQ is a halal-certified Korean BBQ buffet in Strathfield offering a wide selection of marinated meats, fresh banchan side dishes, and soju cocktails. A lively and generous dining experience in the heart of Sydney''s Korean dining precinct.',
  'Korean', '$$', 'Strathfield, Sydney',
  '2/41 The Boulevarde, Strathfield NSW 2135',
  '(02) 8542 4079', 'https://gajokbbq.com.au',
  array['Mon: 17:00–23:00', 'Tue–Sun: 15:00–23:00'],
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1400',
  array['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600'],
  false, false, true, false, false,
  false, true, true,
  false, false, false,
  false, false,
  -33.8690, 151.0921
),

-- ═══════════════════════════════════════════
--  CABRAMATTA (56–60)
-- ═══════════════════════════════════════════

-- 56. Big Z Halal Fried Skewers
(
  'big-z-halal-fried-skewers-cabramatta',
  'Big Z Halal Fried Skewers',
  'Halal Chinese street skewer shop frying up rice cakes, crispy chicken and lamb skewers to order.',
  'Big Z Halal Fried Skewers brings the beloved Chinese night-market skewer stall to Cabramatta, frying halal-certified chicken, lamb, and rice cakes to golden perfection right in front of you. A social and affordable snack stop loved by the local community.',
  'Chinese', '$', 'Cabramatta, Sydney',
  '51 John St, Cabramatta NSW 2166',
  NULL, NULL,
  array['Mon–Thu: 11:00–22:30', 'Fri–Sun: 11:00–23:30'],
  'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600',
  'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=1400',
  array['https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600'],
  true, true, true, false, false,
  false, true, true,
  false, true, false,
  false, false,
  -33.8950, 150.9359
),

-- 57. Butchers Buffet (Cabramatta)
(
  'butchers-buffet-cabramatta',
  'Butchers Buffet',
  'All-you-can-eat Korean BBQ buffet with halal-certified beef and chicken grilled tableside.',
  'The Cabramatta branch of Butchers Buffet offers the same beloved all-you-can-eat Korean BBQ format with a broad selection of halal-certified meats, fresh salads, and Korean side dishes. A great-value group dining experience in the heart of Cabramatta.',
  'Korean', '$$', 'Cabramatta, Sydney',
  'Shop 2/102 John St, Cabramatta NSW 2166',
  NULL, 'https://butchersbuffet.com.au',
  array['Daily: 11:30–16:30 & 17:30–22:00'],
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1400',
  array['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600'],
  false, false, false, false, false,
  false, true, true,
  true, false, false,
  false, false,
  -33.8948, 150.9361
),

-- 58. Super Fried Skewers
(
  'super-fried-skewers-cabramatta',
  'Super Fried Skewers',
  'Halal Chinese fried skewer stall with over 100 stick options, seasoned and fried fresh.',
  'Super Fried Skewers is a Cabramatta institution offering a huge variety of Chinese-style deep-fried and grilled skewers seasoned with cumin, chilli, and house spices. An affordable and addictive street-food experience steps from Cabramatta station.',
  'Chinese', '$', 'Cabramatta, Sydney',
  'Shop 5/206 Railway Parade, Cabramatta NSW 2166',
  NULL, NULL,
  array['Mon–Sun: 11:00–21:40'],
  'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600',
  'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=1400',
  array['https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600'],
  true, true, false, false, false,
  false, true, true,
  false, true, false,
  false, false,
  -33.8963, 150.9363
),

-- 59. Pho Anna
(
  'pho-anna-cabramatta',
  'Pho Anna',
  'Classic Vietnamese pho restaurant in Cabramatta with slow-cooked bone broth and fresh herbs.',
  'Pho Anna is a Cabramatta pho staple, serving deeply flavoured slow-cooked bone broth with fresh rice noodles, your choice of protein, and a generous plate of Vietnamese herbs on the side. A comforting and authentic taste of Vietnam in the heart of Sydney''s Little Saigon.',
  'Vietnamese', '$', 'Cabramatta, Sydney',
  '193 Railway Parade, Cabramatta NSW 2166',
  '0414 304 295', NULL,
  array['Mon–Sun: 08:00–21:00'],
  'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600',
  'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1400',
  array['https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600'],
  false, false, false, false, false,
  false, false, false,
  true, true, false,
  false, false,
  -33.8960, 150.9358
),

-- 60. Hot Star
(
  'hot-star-cabramatta',
  'Hot Star Large Fried Chicken',
  'Taiwanese giant fried chicken chain serving jumbo crispy chicken fillets and seasoned sides.',
  'Hot Star Large Fried Chicken is the iconic Taiwanese chain famous for its enormous crispy chicken fillets the size of your face, seasoned with a signature basil-salt blend. The Cabramatta location serves the classic lineup of oversized fried chicken in a fast-casual setting.',
  'Taiwanese', '$', 'Cabramatta, Sydney',
  '3/84 John St, Cabramatta NSW 2166',
  '(02) 9723 4336', 'https://hotstarchicken.com.au',
  array['Mon–Sun: 10:30–22:00'],
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600',
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=1400',
  array['https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600'],
  false, false, false, false, false,
  false, true, false,
  false, false, false,
  false, false,
  -33.8946, 150.9357
),

-- ═══════════════════════════════════════════
--  MERRYLANDS (61–80)
-- ═══════════════════════════════════════════

-- 61. Yuzu
(
  'yuzu-merrylands',
  'Yuzu',
  'Halal Japanese restaurant at Mason & Main serving fresh sushi, ramen and classic bento sets.',
  'Yuzu brings halal-certified Japanese cuisine to Mason & Main Merrylands with a menu spanning freshly rolled sushi, steaming ramen bowls, and satisfying bento sets. A reliable and popular choice for Japanese food in the western suburbs.',
  'Japanese', '$$', 'Merrylands, Sydney',
  'Shop C7/4 Main Lane, Merrylands NSW 2160',
  '0405 202 160', NULL,
  array['Mon–Sun: 11:30–15:00 & 17:00–22:00'],
  'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600',
  'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1400',
  array['https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600'],
  true, true, true, false, false,
  false, true, true,
  true, true, false,
  false, false,
  -33.8367, 150.9877
),

-- 62. Iftar
(
  'iftar-merrylands',
  'Iftar',
  'Modern Middle Eastern breakfast café at Mason & Main serving woodfired manoush and Lebanese bites.',
  'Iftar is a Muslim-owned modern café at Mason & Main Merrylands celebrated for its wood-fired manoush, Lebanese breakfast plates, and artisan coffee. Open from early morning, it is the preferred breakfast and brunch destination for the local Muslim community.',
  'Middle Eastern', '$$', 'Merrylands, Sydney',
  '4 Main Lane, Merrylands NSW 2160',
  NULL, NULL,
  array['Daily: 07:00–15:00'],
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=1400',
  array['https://images.unsplash.com/photo-1544025162-d76694265947?w=600'],
  true, true, true, true, false,
  false, true, true,
  false, true, false,
  false, false,
  -33.8367, 150.9877
),

-- 63. Al Turath
(
  'al-turath-merrylands',
  'Al Turath Restaurant',
  'Authentic Lebanese restaurant with charcoal grills, mezze platters and traditional family recipes.',
  'Al Turath is a well-regarded Lebanese restaurant in Merrylands West known for its charcoal-grilled meats, generous mezze spreads, and warm family hospitality rooted in traditional Levantine cooking. A destination restaurant for special occasions and weeknight dinners alike.',
  'Lebanese', '$$', 'Merrylands, Sydney',
  'Shop 7–8/33–37 Sherwood Rd, Merrylands West NSW 2160',
  NULL, NULL,
  array['Mon–Sun: 11:00–23:00'],
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=1400',
  array['https://images.unsplash.com/photo-1544025162-d76694265947?w=600'],
  true, true, true, false, false,
  false, true, true,
  true, true, false,
  false, false,
  -33.8353, 150.9845
),

-- 64. Al Shami
(
  'al-shami-merrylands',
  'Al Shami Restaurant',
  'Beloved Syrian-Lebanese restaurant opposite Merrylands station serving authentic Levantine cuisine.',
  'Al Shami is a Merrylands institution for Syrian and Lebanese cooking, situated directly opposite the train station. The menu spans classic fattoush and hummus through to slow-cooked stews and charcoal-grilled meats, with generous portions and welcoming service.',
  'Syrian', '$$', 'Merrylands, Sydney',
  '102–106 Railway Terrace, Merrylands NSW 2160',
  '(02) 8677 1671', NULL,
  array['Wed–Mon: 11:00–22:30', 'Tue: Closed'],
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=1400',
  array['https://images.unsplash.com/photo-1544025162-d76694265947?w=600'],
  true, true, true, false, false,
  false, true, true,
  true, true, false,
  false, false,
  -33.8360, 150.9870
),

-- 65. Macelleria Merrylands
(
  'macelleria-merrylands',
  'Macelleria',
  'Italian steakhouse and grill at Mason & Main with premium halal meats, pasta and sharing boards.',
  'Macelleria brings an Italian butcher-inspired steakhouse concept to Mason & Main Merrylands, offering premium grilled meats, house-made pastas, and indulgent sharing boards. The restaurant has a sleek, modern fit-out suited to date nights and group celebrations.',
  'Italian', '$$', 'Merrylands, Sydney',
  'Shop B01/3 Main Lane, Merrylands NSW 2160',
  NULL, 'https://macelleria.com.au',
  array['Mon–Sun: 11:00–21:30'],
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1400',
  array['https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600'],
  true, true, false, false, false,
  false, false, true,
  true, false, false,
  false, false,
  -33.8367, 150.9877
),

-- 66. Nando's Merrylands
(
  'nandos-merrylands',
  'Nando''s',
  'Popular peri-peri chicken chain using 100% halal chicken at this location.',
  'Nando''s Merrylands serves the beloved flame-grilled peri-peri chicken in its full range of heat levels from Lemon & Herb to Extra Hot. All chicken at this location is halal-certified, making it a convenient and crowd-pleasing halal choice in Merrylands.',
  'Portuguese', '$', 'Merrylands, Sydney',
  '196 Merrylands Rd, Merrylands NSW 2160',
  '(02) 9760 1480', 'https://nandos.com.au',
  array['Mon–Sun: 11:00–22:00'],
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600',
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=1400',
  array['https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600'],
  true, true, true, false, false,
  false, true, false,
  false, false, false,
  false, false,
  -33.8363, 150.9910
),

-- 67. Karachi Biryani
(
  'karachi-biryani-merrylands',
  'Karachi Biryani',
  'Late-night Pakistani restaurant famous for fragrant biryanis, karahi dishes and seekh kebabs.',
  'Karachi Biryani on Miller Street is a go-to late-night destination for Pakistani food lovers, serving aromatic dum biryanis, rich karahis, and freshly grilled seekh kebabs until the early hours. Generous portions and authentic Karachi flavours in a no-fuss setting.',
  'Pakistani', '$', 'Merrylands, Sydney',
  '5A Miller St, Merrylands NSW 2160',
  '0451 551 132', NULL,
  array['Mon–Sun: 11:00–01:30'],
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600',
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1400',
  array['https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600'],
  true, true, true, false, false,
  false, true, true,
  false, true, false,
  false, false,
  -33.8358, 150.9878
),

-- 68. Mase and Co
(
  'mase-and-co-merrylands',
  'Mase and Co',
  'Upscale café-restaurant at Mason & Main with modern Australian dishes and curated wine list.',
  'Mase and Co is the signature fine-dining destination at Mason & Main Merrylands, offering modern Australian cuisine with premium beef cuts, creative share plates, and a thoughtfully curated wine selection. An elevated dining experience in the heart of the new Merrylands precinct.',
  'Modern Australian', '$$$', 'Merrylands, Sydney',
  'Shop 2/1 Main Lane, Merrylands NSW 2160',
  '(02) 9188 2266', 'https://maseandcogroup.com.au',
  array['Wed–Sun: 17:00–22:30'],
  'https://images.unsplash.com/photo-1546964124-0cce460e18ce?w=600',
  'https://images.unsplash.com/photo-1546964124-0cce460e18ce?w=1400',
  array['https://images.unsplash.com/photo-1546964124-0cce460e18ce?w=600'],
  false, false, false, false, false,
  false, false, true,
  true, true, false,
  false, false,
  -33.8367, 150.9877
),

-- 69. Mataam Al Mandi
(
  'mataam-al-mandi-merrylands',
  'Mataam Al Mandi',
  'Authentic Yemeni mandi restaurant with slow-cooked rice and meat feasts on large communal trays.',
  'Mataam Al Mandi is a Merrylands favourite for Yemeni mandi — slow-cooked lamb or chicken buried in a pit oven over fragrant basmati rice, served on large communal trays for sharing. An utterly satisfying and deeply traditional meal experience.',
  'Yemeni', '$$', 'Merrylands, Sydney',
  '169 Merrylands Rd, Merrylands NSW 2160',
  '(02) 8851 7224', NULL,
  array['Mon–Sun: 12:00–00:00'],
  'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600',
  'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=1400',
  array['https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600'],
  true, true, true, false, false,
  false, true, true,
  false, false, false,
  false, false,
  -33.8364, 150.9908
),

-- 70. Toranj
(
  'toranj-merrylands',
  'Toranj',
  'Persian restaurant and mini mart serving saffron rice, slow-cooked stews and fresh flatbread.',
  'Toranj is a cosy Persian restaurant and pantry in Merrylands offering home-style Iranian cooking — saffron-infused rice dishes, slow-cooked herb stews (ghormeh sabzi, fesenjan), and freshly baked lavash flatbread. A warm, authentic taste of Persia in Western Sydney.',
  'Persian', '$$', 'Merrylands, Sydney',
  '264 Pitt St, Merrylands NSW 2160',
  NULL, NULL,
  array['Mon: 08:00–20:00', 'Wed–Fri: 08:00–20:00', 'Sat–Sun: 07:00–19:00', 'Tue: Closed'],
  'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=600',
  'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=1400',
  array['https://images.unsplash.com/photo-1551782450-17144efb9c50?w=600'],
  true, true, true, false, false,
  false, true, true,
  false, true, false,
  false, false,
  -33.8355, 150.9925
),

-- 71. Mr Peri Peri Lebanese Pizza
(
  'mr-peri-peri-merrylands',
  'Mr Peri Peri Lebanese Pizza',
  'Lebanese bakery and pizza shop open almost around the clock with manoush, shawarma and peri-peri.',
  'Mr Peri Peri combines the best of a Lebanese bakery and a peri-peri grill under one roof, serving freshly baked manoush, shawarma wraps, and peri-peri chicken from early morning until late at night. A Merrylands late-night staple.',
  'Lebanese', '$', 'Merrylands, Sydney',
  '252 Merrylands Rd, Merrylands NSW 2160',
  '(02) 8677 5554', 'https://mrperiperi.com.au',
  array['Mon–Sun: 05:00–23:30'],
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=1400',
  array['https://images.unsplash.com/photo-1544025162-d76694265947?w=600'],
  true, true, true, false, false,
  false, true, true,
  false, true, false,
  false, false,
  -33.8366, 150.9922
),

-- 72. Fat Jak's
(
  'fat-jaks-merrylands',
  'Fat Jak''s',
  '100% halal burger joint at Mason & Main with stacked smash burgers, parmas and fried chicken.',
  'Fat Jak''s is a fully halal-certified burger bar at Mason & Main Merrylands, delivering generously stacked smash burgers, crispy fried chicken, and indulgent loaded parmigianas. Comfort food done right, in a lively and casual atmosphere.',
  'Burgers', '$$', 'Merrylands, Sydney',
  'Shop C05/1 Main Lane, Merrylands NSW 2160',
  NULL, 'https://fatjaks.com.au',
  array['Mon–Sun: 11:00–22:00'],
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1400',
  array['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600'],
  true, true, true, false, false,
  false, true, true,
  false, false, false,
  false, false,
  -33.8367, 150.9877
),

-- 73. Get Stuff'd
(
  'get-stuffd-merrylands',
  'Get Stuff''d',
  'Fully halal late-night smash burger spot with gourmet sauces, loaded wraps and pork-free menu.',
  'Get Stuff''d is a fully halal late-night burger destination in Merrylands known for its generously loaded smash burgers, gourmet wraps, and indulgent sauce combinations. A popular spot for a quality burger well into the evening.',
  'Burgers', '$$', 'Merrylands, Sydney',
  '506 Merrylands Rd, Merrylands NSW 2160',
  NULL, NULL,
  array['Tue–Sat: 19:00–00:00'],
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1400',
  array['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600'],
  true, true, true, false, false,
  false, true, true,
  false, false, false,
  false, false,
  -33.8380, 150.9970
),

-- 74. Kabul House
(
  'kabul-house-merrylands',
  'Kabul House',
  'Iconic Merrylands Afghan restaurant famed for saffron rice, lamb korma and mantu dumplings.',
  'Kabul House is a Merrylands institution for Afghan cuisine, drawing diners from across Sydney for its legendary saffron-steamed qabuli rice, slow-braised lamb korma, and handmade mantu dumplings. A Muslim-owned restaurant with decades of community trust.',
  'Afghan', '$$', 'Merrylands, Sydney',
  '186A Merrylands Rd, Merrylands NSW 2160',
  '(02) 9682 4144', 'https://kabulhouse.com.au',
  array['Mon–Sun: 11:00–22:00'],
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600',
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1400',
  array['https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600'],
  true, true, true, true, false,
  false, true, true,
  false, true, false,
  false, false,
  -33.8364, 150.9909
),

-- 75. Kabul Sydney Restaurant
(
  'kabul-sydney-restaurant-merrylands',
  'Kabul Sydney Restaurant',
  'Neighbouring Afghan restaurant serving hearty qabuli rice, charcoal meats and yoghurt-based sides.',
  'Kabul Sydney Restaurant is a well-established Afghan eatery on Merrylands Road offering hearty qabuli palau rice, charcoal-grilled kebabs, and refreshing yoghurt-based sides. A welcoming spot for authentic Afghan flavours steps from the CBD of Merrylands.',
  'Afghan', '$$', 'Merrylands, Sydney',
  '178 Merrylands Rd, Merrylands NSW 2160',
  '(02) 8678 7887', NULL,
  array['Mon–Sun: 11:00–22:00'],
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600',
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1400',
  array['https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600'],
  true, true, true, false, false,
  false, true, true,
  false, true, false,
  false, false,
  -33.8363, 150.9908
),

-- 76. Sofram Adana
(
  'sofram-adana-merrylands',
  'Sofram Adana',
  'Halal Turkish kebab and pizza house with Adana-style minced lamb skewers and stone-baked pide.',
  'Sofram Adana specialises in the bold flavours of Adana, Turkey, with hand-minced spiced lamb skewers grilled over charcoal, stone-baked pide, and a range of fresh Turkish mezes. Open late, it is a staple for Turkish food lovers in Western Sydney.',
  'Turkish', '$', 'Merrylands, Sydney',
  'Unit 2/3 Sherwood Rd, Merrylands West NSW 2160',
  NULL, NULL,
  array['Mon–Sun: 10:00–01:00'],
  'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600',
  'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=1400',
  array['https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600'],
  true, true, true, false, false,
  false, true, true,
  false, true, false,
  false, false,
  -33.8353, 150.9845
),

-- 77. La Mono
(
  'la-mono-merrylands',
  'La Mono',
  'Lebanese charcoal chicken and grill with mezze, wraps, fattoush salads and house-made garlic sauce.',
  'La Mono is a Merrylands favourite for Lebanese charcoal chicken, offering succulent rotisserie birds alongside crispy wraps, fresh fattoush, and the signature house-made toum garlic sauce. Halal-certified and consistently reliable for a satisfying meal.',
  'Lebanese', '$$', 'Merrylands, Sydney',
  '106 Burnett St, Merrylands NSW 2160',
  '(02) 9891 1177', 'https://lamono.com.au',
  array['Mon–Sun: 10:00–22:00'],
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=1400',
  array['https://images.unsplash.com/photo-1544025162-d76694265947?w=600'],
  true, true, true, false, false,
  false, true, true,
  false, true, false,
  false, false,
  -33.8362, 150.9882
),

-- 78. Hayat Turkish Cuisine
(
  'hayat-turkish-cuisine-merrylands',
  'Hayat Turkish Cuisine',
  'Family-run authentic Turkish restaurant with doner, lamb shish, baklava and mezze.',
  'Hayat Turkish Cuisine is a family-run restaurant on Merrylands Road serving traditional Turkish fare — from slow-rotating doner and charcoal lamb shish to freshly made hummus and house-baked baklava. A warm and generous dining experience rooted in Turkish hospitality.',
  'Turkish', '$$', 'Merrylands, Sydney',
  '233–239 Merrylands Rd, Merrylands NSW 2160',
  '(02) 8201 3398', NULL,
  array['Mon–Sun: 10:00–23:00'],
  'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600',
  'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=1400',
  array['https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600'],
  true, true, true, false, false,
  false, true, true,
  false, true, false,
  false, false,
  -33.8367, 150.9918
),

-- 79. Extra Crispy
(
  'extra-crispy-merrylands',
  'Extra Crispy',
  'Halal fried chicken shop open late with crispy pieces, loaded fries and burger combos.',
  'Extra Crispy is a halal fried chicken shop on Merrylands Road serving golden crispy chicken pieces, loaded fries, and burger meal deals well into the night. An affordable and satisfying late-night option for chicken lovers in the area.',
  'Chicken', '$', 'Merrylands, Sydney',
  '1/228 Merrylands Rd, Merrylands NSW 2160',
  '1300 904 747', NULL,
  array['Mon–Sun: 11:00–03:00'],
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600',
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=1400',
  array['https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600'],
  true, true, true, false, false,
  false, true, false,
  false, false, false,
  false, false,
  -33.8366, 150.9919
),

-- 80. Burgerville Merrylands
(
  'burgerville-merrylands',
  'Burgerville',
  'Casual Merrylands burger bar with classic and loaded burgers, chicken fillets and sides.',
  'Burgerville is a local Merrylands burger bar serving classic beef burgers, crispy chicken fillets, and loaded fries at an accessible price. A no-fuss, quick-service option for a satisfying burger on Merrylands Road.',
  'Burgers', '$', 'Merrylands, Sydney',
  '227 Merrylands Rd, Merrylands NSW 2160',
  '(02) 8628 0135', 'https://burgerville.com.au',
  array['Mon–Sun: 11:00–22:00'],
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1400',
  array['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600'],
  true, true, false, false, false,
  false, true, true,
  false, false, false,
  false, false,
  -33.8366, 150.9920
),

-- ═══════════════════════════════════════════
--  BANKSTOWN (81–83)
-- ═══════════════════════════════════════════

-- 81. Miami Pizza
(
  'miami-pizza-bankstown',
  'Miami Pizza',
  'Halal Lebanese-style pizza restaurant in Bankstown with manoush, topped pizzas and charcoal grill.',
  'Miami Pizza is a Bankstown institution for Lebanese-style halal pizzas, wood-fired manoush, and charcoal-grilled meats. Generous toppings, late opening hours, and a loyal local following have made it a go-to destination for years.',
  'Pizza', '$', 'Bankstown, Sydney',
  '3–7 Fetherstone St, Bankstown NSW 2200',
  '(02) 8764 4477', NULL,
  array['Mon–Thu: 12:00–22:00', 'Fri: 14:00–23:00', 'Sat: 12:00–23:00', 'Sun: 13:00–22:00'],
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1400',
  array['https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600'],
  true, true, true, false, false,
  false, true, true,
  false, true, false,
  false, false,
  -33.9164, 151.0334
),

-- 82. Hot Pot City
(
  'hot-pot-city-bankstown',
  'Hot Pot City',
  'All-you-can-eat hotpot buffet with 130+ ingredients, hawker-inspired dishes and premium broths.',
  'Hot Pot City at Bankstown offers an extensive all-you-can-eat hotpot experience with over 130 ingredients including premium meats, fresh seafood, and seasonal vegetables cooked in a choice of signature broths. A social and satisfying dining experience for groups.',
  'Chinese', '$$', 'Bankstown, Sydney',
  'Ground Floor, Shop 22/462 Chapel Rd, Bankstown NSW 2200',
  '0472 788 898', 'https://hotpotcity.com.au',
  array['Mon–Fri: 11:30–15:00 & 17:00–22:00', 'Sat–Sun: 11:30–22:00'],
  'https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=600',
  'https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=1400',
  array['https://images.unsplash.com/photo-1551326844-4df70f2d0ef6?w=600'],
  false, false, false, false, false,
  false, false, true,
  true, true, false,
  false, false,
  -33.9153, 151.0346
),

-- 83. BBQ City Buffet
(
  'bbq-city-buffet-bankstown',
  'BBQ City Buffet',
  'Sydney''s first halal-friendly Korean BBQ buffet with tableside grilling and premium meat selections.',
  'BBQ City Buffet on the top floor of the Bankstown retail complex claims the title of Sydney''s original halal-friendly Korean BBQ buffet, featuring tableside charcoal grilling with premium meat selections, unlimited side dishes, and a lively group dining atmosphere.',
  'Korean', '$$', 'Bankstown, Sydney',
  'Level 5/462 Chapel Rd, Bankstown NSW 2200',
  '(02) 8739 1697', 'https://bbqcity.com.au',
  array['Mon–Sun: 11:00–15:00 & 16:30–22:00'],
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1400',
  array['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600'],
  false, false, true, false, false,
  false, true, true,
  true, false, false,
  false, false,
  -33.9153, 151.0346
);
