# Portfolio interaction notes

This project is a portfolio website. It does not charge money, send orders or reserve real venue capacity.

Checkout saves the latest order summary on this device, keeps the bag editable, and supports reopening and downloading the summary. Contact/address inputs are not stored. Cart prices and presentation are rebuilt from the catalog. Newsletter signup is explicitly unavailable.

## Validation

JavaScript syntax checks passed. Headless Chromium interaction checks covered product size selection, adding to bag, checkout totals, saving/reopening summaries, malformed storage, catalog price restoration and truthful newsletter feedback. No page JavaScript errors occurred in those scenarios. Mobile width checks at 390px passed.

Tests used local HTML/CSS/JavaScript with external media requests blocked. Full photo/video rendering and deployed-site behavior still require a final live check.

## Connecting real services later

Real orders, emails, authentication and shared venue availability require a backend. Keep local-only notices until actual delivery/booking confirmation is received from that service. Do not add real payment collection for this portfolio scope.
