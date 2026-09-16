# The Giggling Cult

Come for the giggles. Stay for the cult.

A platform for South African stand-up comedy: one calendar for every show, a directory of every
comedian, and the week in comedy — currently covering Gauteng, the Western Cape and KwaZulu-Natal.

**Features**
- Interactive events calendar with list and by-comedian views, filterable by province
- A–Z comedian directory with bios, social links, upcoming shows and a "Rising" list for new talent
- Weekly summary with live stats, latest news, and comedian/audience newsletter sign-up
- Zero dependencies — plain HTML, CSS and JavaScript; deploys anywhere static files are served

**Status:** demo build. All shows, dates, prices and news are sample data; see `assets/js/data.js`.

## Run it

No build step. Open `index.html`, or serve the folder:

```
npm run dev        # http://localhost:3000
# or
python -m http.server 8080
```

## Structure

```
index.html          Home — hero, this week in comedy, coming up (week/month), news, join
events.html         Calendar / list / by-comedian views with province filter
comedians.html      A–Z letter nav, province + rising filters, profile drawer
news.html           Topic-filtered listing; ?article=slug shows a single article
join.html           Comedian / audience signup (stores to localStorage in this demo)
assets/css/styles.css
assets/js/data.js   ALL content lives here — swap for an API/CMS
assets/js/app.js    Shared UI: nav, footer, cards, drawer, toast, segmented control
assets/js/*.js      One file per page
```

## Deep links

- `events.html?province=kzn` · `events.html?view=list` · `events.html?view=comedian&comedian=celeste-ntuli`
- `comedians.html?letter=M` · `comedians.html?province=wc&rising=1` · `comedians.html?open=loyiso-gola`
- `join.html?as=comedian`

## Before launch

- Verify every social handle in `data.js` — they are best-effort placeholders.
- Replace the `upcoming: true` placeholder comics with the real rising roster.
- Replace `day(n)` event dates with real dates (or an API).
- Wire `join.js` to a real newsletter/CRM endpoint (currently localStorage).
