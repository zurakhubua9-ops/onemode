# ONEMODE — The Colour Issue / 01

Independent portfolio fashion concept. Brand references are editorial only; generated garments are fictional, not official catalogue products. Checkout remains a local demo.

## Photographic system

Warm stone and cream space connect cobalt, coral, butter yellow, pale blue and lime. Mix human movement, tactile close-ups, clean studio work and everyday street settings. Keep the four existing multi-view neutral product galleries as quiet contrast. Never substitute another product's photograph as an alternate view.

Nine original photographs were generated with the built-in Imagegen tool (not an external API script). WebP derivatives in `assets/campaign/` are the site-ready assets. Original generated files are retained outside the repository. No downloaded third-party imagery was introduced.

| Asset | Brief / prompt subject | Usage |
| --- | --- | --- |
| hero | Three diverse adult friends walking through a sunlit stone plaza in cobalt tailoring, coral dress and butter-yellow shirt; relaxed smiles, full bodies, wide landscape, no text or logos | Home campaign |
| bag | Coral leather mini shoulder bag, silver buckle, pale blue plinth and yellow studio; tactile close-up, hard sun shadows, no logos | Product, accessories, saved/bag empty states |
| dress | Black adult woman walking in a coral column dress on cream steps with blue wall, breeze and sunlight, no logos | Product, women, Home editorial |
| shirt | East Asian androgynous adult model in butter-yellow utility overshirt and charcoal trousers against cobalt city wall, no logos | Product, unisex, Urban Form edit |
| shell | Dark-skinned adult man in cobalt technical hooded shell with lime zipper walking on concrete stairs, sharp garment and moving silhouette, no logos | Product, performance style |
| utility | Adult man with medium brown skin in sage utility jacket, white tee and indigo denim, peach storefront, afternoon sunlight, no logos | Product, men, brand index |
| trousers | Waist-down charcoal pleated wide-leg trousers, yellow shirt, burgundy loafers against sky-blue studio, entire garment visible, no logos | Product and tailoring reference |
| layer | Adult East Asian woman in black asymmetric draped layer against coral wall at dusk with blue architectural accent, no logos | Product, After Dark edit |
| set | Black adult woman in cobalt structured trouser suit seated on cream cube against lime studio, confident relaxed pose, no logos | Product, Home tailoring spotlight |

All prompts specify photorealistic premium independent-magazine photography, realistic fabric/anatomy, no text, logos or watermarks. Portraits use 2:3 framing. The hero uses 3:2.

## Implementation

- `products.js` remains the catalogue source for all commerce surfaces. Existing saved/cart records refresh their presentation by ID while retaining quantities and sizes.
- `campaign.js` adds responsive sources to static and dynamically inserted images, including search. `campaign.css` owns crop rules and the final responsive art direction.
- Product detail images use `contain` to show the full supplied photograph; editorial cards use consistent crops. Mobile brand photographs remain visible.
- Original assets remain available for history/rollback. Existing neutral multi-view galleries were compressed to WebP without changing their imagery.
- Duplicate product scripts and a pre-existing global variable collision in UI polish were corrected. Search results now have thumbnails and native links; gallery thumbnails support keyboard activation.

## Validation

Chromium layout checks at 320, 390, 768 and 1440px across all seven pages plus a second product: no document horizontal overflow, broken image references or page JavaScript errors. Browser interaction checks at 390 and 1440px cover menu/search, product selection, favourites, cart quantities, checkout confirmation, keyboard gallery selection, filter/sort and old cart image migration. Local content was served through browser request interception because this environment's isolated preview server could not be reached from the test browser. This tests rendering and interactions, not deployment networking.
