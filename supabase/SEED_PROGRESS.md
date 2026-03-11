# Seed Data Progress Tracker

## Overview
Restaurants are added in batches. Each batch is a separate SQL file to keep
files manageable and easy to review before running.

Run order: `schema.sql` → `seed.sql` → `seed2.sql` → `seed3.sql` → ...

---

## Batch 1 — seed.sql (original, 8 restaurants)
Status: ✅ Complete & uploaded

| # | Name | Location |
|---|------|----------|
| 1 | Al Aseel | Greenacre |
| 2 | Jasmin1 | Punchbowl |
| 3 | Lakemba Sweets | Lakemba |
| 4 | Kayal | Parramatta |
| 5 | Pho Phu Quoc | Cabramatta |
| 6 | Sultan BBQ | Bankstown |
| 7 | Taste of Morocco | Surry Hills |
| 8 | Naan & Curry House | Auburn |

---

## Batch 2 — seed2.sql (83 restaurants)
Status: ✅ Written — ready to upload

### Edmondson Park (24)
| # | Name | Notes |
|---|------|-------|
| 1 | Makan | Malaysian |
| 2 | Gami Chicken | Korean fried chicken chain |
| 3 | At Mex | Mexican — halal certified |
| 4 | Sushi on Fire | Japanese |
| 5 | Kerbside Eatery | Australian café |
| 6 | Enzo's Cucina | Italian |
| 7 | Thanh Binh | Vietnamese |
| 8 | Baby Bao | Chinese bao/dumplings |
| 9 | Burger Point | Burgers |
| 10 | Auntie Tang | Halal malatang |
| 11 | Noodle Den | Noodles |
| 12 | Oporto | Chicken chain |
| 13 | Ogalo | Portuguese chicken — halal certified |
| 14 | Kitchai | Thai — halal certified |
| 15 | Bom KBBQ | Korean BBQ + soju bar |
| 16 | Lone Star | American rib house |
| 17 | Meet and Eat | Café |
| 18 | Masala Kitchen | Indian — halal certified |
| 19 | Mad Manoush | Lebanese — halal certified |
| 20 | Philliez | American burgers |
| 21 | Naji's Charcoal Chicken & Kebabs | Lebanese — halal certified |
| 22 | Frango | Portuguese chicken |
| 23 | The Shed | Café |
| 24 | Dough Sisters | Bakery — halal, Muslim-owned |

### Prestons (3)
| # | Name | Notes |
|---|------|-------|
| 25 | Mad Grillz Smokehouse | BBQ — halal certified |
| 26 | XS Espresso | Café |
| 27 | Thaidition | Thai |

### Sydney CBD (16)
| # | Name | Notes |
|---|------|-------|
| 28 | It's Time for Thai | Thai — halal certified |
| 29 | 1915 Halal Lanzhou Beef Noodles | Chinese — halal certified |
| 30 | No 1 Beef Noodles | Chinese — Muslim-owned, prayer room |
| 31 | Mecca Bah | Middle Eastern |
| 32 | Open Sesame | Lebanese — halal certified |
| 33 | Meat and Wine Co | Steakhouse |
| 34 | Shalom | Indonesian — halal certified |
| 35 | Pandawa | Indonesian — halal certified |
| 36 | D'Penyetz & D'Cendol | Indonesian — halal certified |
| 37 | Neptune Palace | Chinese seafood — halal certified |
| 38 | 6Head | Australian steakhouse |
| 39 | Kiroran Silk Road | Uyghur — halal certified |
| 40 | Lal Qila | Indian — halal certified |
| 41 | Dapur Sate | Indonesian — halal certified |
| 42 | Wingboy Darling Square | Wings |
| 43 | Shabuway | Japanese shabu-shabu — halal certified |

### Burwood (10)
| # | Name | Notes |
|---|------|-------|
| 44 | 1915 (Burwood) | Chinese noodles — halal certified |
| 45 | D'Penyetz (Burwood) | Indonesian — halal certified |
| 46 | Sahara by the Park | Turkish — halal certified |
| 47 | Fat Cat | Asian |
| 48 | Apandim Uyghur | Uyghur — halal certified |
| 49 | Lanzhou Golden Taste | Chinese — halal certified |
| 50 | SparQling Pizza & Grill | Pizza — halal certified |
| 51 | Geprek in Sydney | Indonesian |
| 52 | Kumadon | Japanese |
| 53 | Moyashi Japanese Hotpot | Japanese hotpot |

### Strathfield (2)
| # | Name | Notes |
|---|------|-------|
| 54 | Butchers Buffet (Strathfield) | Korean BBQ buffet |
| 55 | Gajok | Korean BBQ — halal certified |

### Cabramatta (5)
| # | Name | Notes |
|---|------|-------|
| 56 | Big Z Halal Fried Skewers | Chinese — halal certified |
| 57 | Butchers Buffet (Cabramatta) | Korean BBQ buffet |
| 58 | Super Fried Skewers | Chinese |
| 59 | Pho Anna | Vietnamese |
| 60 | Hot Star | Taiwanese fried chicken |

### Merrylands (20)
| # | Name | Notes |
|---|------|-------|
| 61 | Yuzu | Japanese — halal certified |
| 62 | Iftar | Middle Eastern — halal certified, Muslim-owned |
| 63 | Al Turath | Lebanese — halal certified |
| 64 | Al Shami | Syrian — halal certified |
| 65 | Macelleria | Italian steakhouse |
| 66 | Nando's | Portuguese — halal certified |
| 67 | Karachi Biryani | Pakistani — halal certified |
| 68 | Mase and Co | Modern café |
| 69 | Mataam Al Mandi | Yemeni — halal certified |
| 70 | Toranj | Persian — halal certified |
| 71 | Mr Peri Peri Lebanese Pizza | Lebanese — halal certified |
| 72 | Fat Jak's | Burgers — halal certified |
| 73 | Get Stuff'd | Burgers — halal certified |
| 74 | Kabul House | Afghan — halal certified, Muslim-owned |
| 75 | Kabul Sydney Restaurant | Afghan — halal certified |
| 76 | Sofram Adana | Turkish — halal certified |
| 77 | La Mono | Lebanese — halal certified |
| 78 | Hayat Turkish Cuisine | Turkish — halal certified |
| 79 | Extra Crispy | Fried chicken — halal certified |
| 80 | Burgerville | Burgers |

### Bankstown (3)
| # | Name | Notes |
|---|------|-------|
| 81 | Miami Pizza | Pizza — halal certified |
| 82 | Hot Pot City | Chinese hotpot |
| 83 | BBQ City Buffet | Korean BBQ — halal certified |

---

## Batch 3 — seed3.sql (planned)
Status: 🔲 Not yet started

Areas to cover in future batches:
- Liverpool
- Lakemba (more restaurants)
- Punchbowl (more restaurants)
- Auburn
- Granville
- Fairfield
- Parramatta (more restaurants)
- Inner city / other suburbs

---

## Notes
- All booleans are best-guess estimates — owner must vet before marking `verified = true`
- Lat/long sourced from Nominatim/Google — run "Geocode Missing" in admin to fill any gaps
- Duplicate check: "Butchers Buffet" appears in both Strathfield (slug: butchers-buffet-strathfield) and Cabramatta (slug: butchers-buffet-cabramatta) — these are separate branches, intentional
- Kabul House and Kabul Sydney Restaurant are two distinct Afghan restaurants at adjacent addresses on Merrylands Rd — confirmed not duplicates
