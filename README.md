# fatsolutions.xyz

Static site, no dependencies. `index.html` is **generated** — don't edit it directly.

## editing

| you want to change | edit |
|---|---|
| any text on the page (sections, projects, team, contact) | `content.md` |
| tab title, tagline, meta/SEO, social links, copyright | `site.json` |
| layout / markup shell | `template.html` |
| styles | `styles.css` |
| FAT logo variants + animation | `fat-logo.js` |
| matrix rain background | `rain.js` |

Then rebuild:

```sh
./build.py
```

That regenerates `index.html`. Python 3 stdlib only, nothing to install.

`content.md` conventions are documented in the comment at the top of that file
(`##` = section, `###` = project card, `[tag]` after a project title, `links:` rows,
`- name — role` team lists).

## client logos (matrix rain)

White logo marks live in `logos/*-white.png` (sources kept alongside).
To add or replace one: drop a white-on-transparent PNG in `logos/` and add its
path to `LOGO_SRCS` in `rain.js`.

## structured data

The JSON-LD blocks (SEO) live directly in `template.html` — they change rarely
and aren't worth templating.
