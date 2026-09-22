# Facebook ad creatives — Web Bangladesh

Ready-to-use ad graphics for `web.banglade.sh`, plus suggested ad copy.
Think of these as posters: one hook, one product visual, trust, and the link + WhatsApp.

## Files

| File | Size | Use | Theme |
|---|---|---|---|
| `ad1-square.png` / `ad1-portrait.png` | 1080×1080 / 1080×1350 | Website service | sky blue |
| `ad2-square.png` / `ad2-portrait.png` | 1080×1080 / 1080×1350 | E-commerce / online store | emerald |
| `ad3-square.png` / `ad3-portrait.png` | 1080×1080 / 1080×1350 | Mobile app / custom software | violet |
| `ad4-square.png` / `ad4-portrait.png` | 1080×1080 / 1080×1350 | Agency — all services | amber |

`portrait` (4:5) usually performs best on mobile feed — test it first.

## Suggested ad copy (Bengali)

**Ad 1 — Website**
- **Primary text:** আপনার ব্যবসার জন্য একটি ওয়েবসাইট দরকার? 🖥️ ডিজাইন, হোস্টিং ও সাপোর্ট — সব আমাদের দায়িত্বে। ফ্রি পরামর্শ নিতে WhatsApp-এ মেসেজ দিন।
- **Headline:** ব্যবসার জন্য ওয়েবসাইট বানান
- **Description:** দ্রুত ডেলিভারি • বাংলায় সাপোর্ট • সাশ্রয়ী মূল্য

**Ad 2 — E-commerce**
- **Primary text:** অনলাইনে বিক্রি শুরু করতে চান? 🛒 প্রোডাক্ট, কার্ট, পেমেন্ট ও ডেলিভারি সহ সম্পূর্ণ অনলাইন স্টোর আমরা বানিয়ে দেব।
- **Headline:** অনলাইন স্টোর খুলুন আজই
- **Description:** বিক্রির জন্য প্রস্তুত স্টোর, অল্প সময়ে।

**Ad 3 — Mobile app**
- **Primary text:** নিজের ব্যবসার জন্য অ্যাপ বানাতে চান? 📱 Android ও iOS — আপনার কাজের ধরন অনুযায়ী কাস্টম সমাধান।
- **Headline:** নিজের ব্যবসার অ্যাপ বানান
- **Description:** ড্যাশবোর্ড, অটোমেশন ও ম্যানেজমেন্ট — এক অ্যাপে।

**Ad 4 — Agency (all services)**
- **Primary text:** ওয়েবসাইট, ই-কমার্স, অ্যাপ বা কাস্টম সফটওয়্যার — সব ডিজিটাল সমাধান এক জায়গায়। ✨ বিনামূল্যে কোটেশন নিতে মেসেজ দিন।
- **Headline:** ওয়েবসাইট থেকে অ্যাপ — সব এক জায়গায়
- **Description:** ডিজাইন • ডেভেলপমেন্ট • হোস্টিং • সাপোর্ট

## Setup tips

- **Objective:** Traffic (to `web.banglade.sh`) or Engagement → **Click to WhatsApp**.
- **Link:** `web.banglade.sh/?utm_source=facebook&utm_medium=paid&utm_campaign=<name>`
  (UTM is captured by the site and appended to the WhatsApp message, so you can trace the ad.)
- **CTA button:** `Learn More` for website traffic, `Send Message` for WhatsApp campaigns.
- Install the **Meta Pixel** on the site (`assets/js/main.js` → `CONFIG.metaPixel`) so FB can optimize for leads.
- A/B test: one headline + one visual per ad set; start with the 4:5 portrait size.

## Rebuild the images

```bash
cd ads
./build.sh          # needs google-chrome; override with CHROME=/path/to/chrome
```

Templates: `creative.html` (variants 1–4, `?v=N`) — edit copy/colors there and re-run.
