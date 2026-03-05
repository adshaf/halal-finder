-- ─────────────────────────────────────────────
--  HalalFind — seed data (Sydney MVP)
--  Run this AFTER schema.sql
-- ─────────────────────────────────────────────

insert into restaurants (
  slug, name, description, long_description,
  cuisine, price, location, address, phone, email, website,
  hours, image, hero_image, gallery,
  no_alcohol, no_pork, halal_certified, muslim_owned, muslim_chefs,
  prayer_room, halal_chicken_only, halal_beef_only,
  seafood_options, vegetarian_options, vegan_options,
  featured, verified
) values

-- 1. Al Aseel
(
  'al-aseel-greenacre',
  'Al Aseel',
  'Iconic Lebanese grill house famous for charcoal chicken and mixed grills.',
  'A Sydney institution serving authentic Lebanese charcoal chicken, mixed grills, and mezze since 1996. Al Aseel''s flame-grilled chicken and garlic sauce have become a staple for Sydney''s halal dining scene. The Greenacre flagship is the original, beloved for its no-fuss atmosphere and consistently great food.',
  'Lebanese',
  '$$',
  'Greenacre, Sydney',
  '918 Waterloo Rd, Greenacre NSW 2190',
  '(02) 9759 8558',
  'info@alaseel.com.au',
  'https://www.alaseel.com.au',
  array['Mon–Sun: 10:00–22:00'],
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
  'https://images.unsplash.com/photo-1544025162-d76694265947?w=1400',
  array[
    'https://images.unsplash.com/photo-1544025162-d76694265947?w=600',
    'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600'
  ],
  true, true, true, true, true,
  false, false, false,
  false, false, false,
  true, true
),

-- 2. Jasmin1
(
  'jasmin1-punchbowl',
  'Jasmin1',
  'Beloved Lebanese restaurant serving wood-fired grills and homestyle cooking since 1998.',
  'Jasmin1 is a Punchbowl institution that has been feeding Sydney''s Lebanese community for over two decades. Famous for their wood-fired charcoal grills, freshly baked flatbread, and generous family platters. The warm, no-frills atmosphere and consistently excellent food have made it one of Sydney''s most trusted halal restaurants.',
  'Lebanese',
  '$$',
  'Punchbowl, Sydney',
  '1A The Boulevarde, Punchbowl NSW 2196',
  '(02) 9750 3444',
  'info@jasmin1.com.au',
  'https://www.jasmin1.com.au',
  array['Mon–Sun: 10:00–22:00'],
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400',
  array[
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600',
    'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600'
  ],
  true, true, true, true, true,
  false, false, false,
  false, true, false,
  true, true
),

-- 3. Lakemba Sweets
(
  'lakemba-sweets',
  'Lakemba Sweets',
  'Sydney''s most loved destination for authentic Middle Eastern sweets and pastries.',
  'Nestled in the heart of Lakemba, this beloved patisserie has been crafting baklava, kunafa, and Arabic sweets by hand for over 20 years. A must-visit during Ramadan, when the street comes alive and the shop stays open through the night. Everything is made fresh daily using traditional recipes.',
  'Middle Eastern',
  '$',
  'Lakemba, Sydney',
  '52 The Boulevarde, Lakemba NSW 2195',
  '(02) 9750 1234',
  'hello@lakembasweets.com.au',
  null,
  array['Mon–Sun: 09:00–23:00'],
  'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600',
  'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=1400',
  array[
    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600',
    'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=600'
  ],
  true, true, false, true, true,
  false, false, false,
  false, true, false,
  false, true
),

-- 4. Kayal
(
  'kayal-parramatta',
  'Kayal',
  'South Indian and Sri Lankan cuisine with fragrant curries and fresh dosas.',
  'Kayal is Parramatta''s go-to for South Indian and Sri Lankan flavours. From crispy masala dosas to rich coconut curries and freshly made rotis, the menu is a celebration of subcontinental home cooking. The restaurant is fully halal and a firm favourite with Sydney''s South Asian community.',
  'South Indian',
  '$$',
  'Parramatta, Sydney',
  '236 Church St, Parramatta NSW 2150',
  '(02) 9891 2233',
  'kayal@parramatta.com.au',
  null,
  array['Mon–Sun: 11:30–21:30'],
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600',
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1400',
  array[
    'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600',
    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600'
  ],
  true, true, false, true, true,
  false, false, false,
  false, true, true,
  false, true
),

-- 5. Pho Phu Quoc
(
  'pho-phu-quoc-cabramatta',
  'Pho Phu Quoc',
  'Authentic halal Vietnamese pho and rice dishes in the heart of Cabramatta.',
  'A halal-friendly Vietnamese eatery in Cabramatta''s famous food precinct. Pho Phu Quoc is known for its rich, slow-cooked bone broth, generous portions, and authentic flavours that keep locals coming back daily. One of the few Vietnamese restaurants in Sydney to use fully halal-certified meat.',
  'Vietnamese',
  '$',
  'Cabramatta, Sydney',
  '7 Park Rd, Cabramatta NSW 2166',
  '(02) 9726 4411',
  null,
  null,
  array['Mon–Sun: 08:00–20:00'],
  'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600',
  'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1400',
  array[
    'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600',
    'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600'
  ],
  true, true, true, false, false,
  false, true, true,
  true, false, false,
  false, true
),

-- 6. Bankstown Sports Halal BBQ
(
  'sultan-bbq-bankstown',
  'Sultan BBQ',
  'Turkish-style charcoal BBQ and kebabs with generous serves and bold flavours.',
  'Sultan BBQ brings the flavours of an Istanbul mangal house to Bankstown. Expect generously portioned charcoal-grilled meats, hand-rolled kofte, and freshly baked flatbread straight from the oven. A no-fuss, family-friendly spot that has earned a loyal following across South-West Sydney.',
  'Turkish',
  '$$',
  'Bankstown, Sydney',
  '14 Chapel Rd, Bankstown NSW 2200',
  '(02) 9793 7766',
  'sultanbbq@bankstown.com.au',
  null,
  array['Mon–Thu: 11:00–21:30', 'Fri–Sun: 11:00–22:30'],
  'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600',
  'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=1400',
  array[
    'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600',
    'https://images.unsplash.com/photo-1544025162-d76694265947?w=600'
  ],
  true, true, true, true, true,
  true, false, false,
  false, false, false,
  true, true
),

-- 7. Taste of Morocco
(
  'taste-of-morocco-surry-hills',
  'Taste of Morocco',
  'Slow-cooked tagines and Moroccan street food in a vibrant Surry Hills setting.',
  'Taste of Morocco transports you to the medinas of Marrakech with slow-cooked lamb tagines, fragrant couscous, and freshly baked khobz. Located in Surry Hills, this cosy restaurant is one of the few genuinely halal North African eateries in inner Sydney, drawing a diverse crowd of regulars.',
  'Moroccan',
  '$$$',
  'Surry Hills, Sydney',
  '88 Crown St, Surry Hills NSW 2010',
  '(02) 9211 5588',
  'hello@tasteofmorocco.com.au',
  'https://www.tasteofmorocco.com.au',
  array['Tue–Sun: 17:30–22:00', 'Mon: Closed'],
  'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=600',
  'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=1400',
  array[
    'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=600',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600'
  ],
  true, true, true, true, false,
  false, false, false,
  false, true, false,
  true, true
),

-- 8. Naan & Curry House
(
  'naan-curry-house-auburn',
  'Naan & Curry House',
  'Pakistani home-style cooking with rich curries, biryanis and fresh naan bread.',
  'A warm, family-run Pakistani kitchen in Auburn serving the kind of food you''d expect at a Sunday lunch in Lahore. The biryani is legendary — fragrant, layered, and cooked in the traditional dum style. The naan bread is baked fresh in a tandoor oven throughout service.',
  'Pakistani',
  '$',
  'Auburn, Sydney',
  '33 Auburn Rd, Auburn NSW 2144',
  '(02) 9646 9900',
  null,
  null,
  array['Mon–Sun: 11:00–22:00'],
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600',
  'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1400',
  array[
    'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600',
    'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600'
  ],
  true, true, false, true, true,
  false, false, false,
  false, true, false,
  false, true
);
