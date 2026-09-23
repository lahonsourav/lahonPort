// Places I've been. Add a new entry to highlight it on the /travel map —
// lat/lng are plain decimal degrees (right-click a spot in Google Maps to
// copy them). `kind` is "home" for places I've lived, "bike" for places
// visited on a bike trip, "trip" otherwise.
// `image` is optional — shown in the detail modal at a fixed aspect ratio
// (object-fit: cover in travel.css), so source photos don't need to be
// pre-cropped to match each other.
import agraImage from "../../images/travel/agra.jpg";
import damanImage from "../../images/travel/daman.jpg";
import mumbaiImage from "../../images/travel/mumbai.jpg";
import dehradunImage from "../../images/travel/dehradun.jpg";
import delhiCjpProtestImage from "../../images/travel/delhi-cjp-protest.jpg";
import dharamshalaImage from "../../images/travel/dharamshala.jpg";
import mcleodGanjImage from "../../images/travel/mcleod-ganj.jpg";
import jaipurImage from "../../images/travel/jaipur.jpg";
import neemranaImage from "../../images/travel/neemrana.jpg";
import toshImage from "../../images/travel/tosh.jpg";
import kasolImage from "../../images/travel/kasol.jpg";
import kutlaImage from "../../images/travel/kutla.jpg";
import mandiImage from "../../images/travel/mandi.jpg";
import rishikeshImage from "../../images/travel/rishikesh.jpg";
import sibsagarImage from "../../images/travel/sibsagar.jpg";
import udaipurImage from "../../images/travel/udaipur.jpg";
import chittorgarhImage from "../../images/travel/chittorgarh.jpg";
import vrindavanImage from "../../images/travel/vrindavan.jpg";
import varanasiImage from "../../images/travel/varanasi.jpg";
import hyderabadImage from "../../images/travel/hyderabad.jpg";
import likabaliImage from "../../images/travel/likabali.jpg";
import kedarnathImage from "../../images/travel/kedarnath.jpg";
import shimlaImage from "../../images/travel/shimla.jpg";
import northLakhimpurImage from "../../images/travel/north-lakhimpur.jpg";
import shillongImage from "../../images/travel/shillong.jpg";

export const PLACES = [
  // ── Lived ──
  {
    name: "Gogamukh",
    state: "Assam",
    lat: 27.33,
    lng: 94.33,
    kind: "home",
    note: "Where it all started. Class I–V at Jatiya Vidyalaya.",
  },
  {
    name: "North Lakhimpur",
    state: "Assam",
    lat: 27.24,
    lng: 94.1,
    kind: "home",
    image: northLakhimpurImage,
    note: "Higher Secondary at Brilliant Academy.",
  },
  {
    name: "Silchar",
    state: "Assam",
    lat: 24.83,
    lng: 92.8,
    kind: "home",
    note: "Four years of B.Tech CSE at NIT Silchar.",
  },
  {
    name: "Gurgaon",
    state: "Haryana",
    lat: 28.46,
    lng: 77.03,
    kind: "home",
    note: "Software Engineer at BlackRock.",
  },
  {
    name: "Hyderabad",
    state: "Telangana",
    lat: 17.39,
    lng: 78.49,
    kind: "home",
    image: hyderabadImage,
  },

  // ── Visited — Northeast ──
  { name: "Likabali", state: "Arunachal Pradesh", lat: 27.9, lng: 94.56, kind: "trip", image: likabaliImage },
  { name: "Shillong", state: "Meghalaya", lat: 25.57, lng: 91.88, kind: "trip", image: shillongImage },
  { name: "Guwahati", state: "Assam", lat: 26.14, lng: 91.73, kind: "trip" },
  { name: "Dibrugarh", state: "Assam", lat: 27.48, lng: 94.91, kind: "trip" },
  { name: "Tinsukia", state: "Assam", lat: 27.49, lng: 95.36, kind: "trip" },
  { name: "Sibsagar", state: "Assam", lat: 26.98, lng: 94.64, kind: "trip", image: sibsagarImage },
  { name: "Tezpur", state: "Assam", lat: 26.63, lng: 92.8, kind: "trip" },

  // ── Visited — Himachal Pradesh ──
  { name: "Mandi", state: "Himachal Pradesh", lat: 31.71, lng: 76.93, kind: "trip", image: mandiImage },
  { name: "Kasol", state: "Himachal Pradesh", lat: 32.01, lng: 77.31, kind: "trip", image: kasolImage },
  // Kutla and Tosh sit within a couple of km of Kasol in real life — too
  // close to render as separate dots at this map's scale, so nudged apart
  // slightly for visual clarity (see the "not to scale" note on the page).
  { name: "Kutla", state: "Himachal Pradesh", lat: 31.95, lng: 77.4, kind: "trip", image: kutlaImage },
  { name: "Tosh", state: "Himachal Pradesh", lat: 32.1, lng: 77.42, kind: "trip", image: toshImage },
  { name: "Dharamshala", state: "Himachal Pradesh", lat: 32.22, lng: 76.32, kind: "trip", image: dharamshalaImage },
  // Real-world McLeod Ganj is a ~4km-away suburb of Dharamshala; nudged
  // apart for the same reason as Kutla/Tosh above.
  { name: "McLeod Ganj", state: "Himachal Pradesh", lat: 32.3, lng: 76.4, kind: "trip", image: mcleodGanjImage },
  { name: "Shimla", state: "Himachal Pradesh", lat: 31.1, lng: 77.17, kind: "trip", image: shimlaImage },

  // ── Visited — Uttarakhand ──
  { name: "Kedarnath - bike", state: "Uttarakhand", lat: 30.73, lng: 79.07, kind: "bike", image: kedarnathImage },
  { name: "Rishikesh - bike", state: "Uttarakhand", lat: 30.09, lng: 78.27, kind: "bike", image: rishikeshImage },
  { name: "Neelkanth Temple", state: "Uttarakhand", lat: 30.13, lng: 78.41, kind: "trip" },
  { name: "Dehradun", state: "Uttarakhand", lat: 30.32, lng: 78.03, kind: "trip", image: dehradunImage },

  // ── Visited — Delhi ──
  { name: "Delhi CJP Protest", state: "Delhi", lat: 28.61, lng: 77.21, kind: "trip", image: delhiCjpProtestImage },

  // ── Visited — Rajasthan ──
  { name: "Jaipur - bike", state: "Rajasthan", lat: 26.91, lng: 75.79, kind: "bike", image: jaipurImage },
  { name: "Udaipur - bike", state: "Rajasthan", lat: 24.58, lng: 73.68, kind: "bike", image: udaipurImage },
  { name: "Chittorgarh - bike", state: "Rajasthan", lat: 24.88, lng: 74.63, kind: "bike", image: chittorgarhImage },
  { name: "Neemrana - bike", state: "Rajasthan", lat: 27.99, lng: 76.39, kind: "bike", image: neemranaImage },
  { name: "Ajmer - bike", state: "Rajasthan", lat: 26.45, lng: 74.64, kind: "bike" },

  // ── Visited — Uttar Pradesh ──
  { name: "Agra - bike", state: "Uttar Pradesh", lat: 27.18, lng: 78.02, kind: "bike", image: agraImage },
  { name: "Varanasi", state: "Uttar Pradesh", lat: 25.32, lng: 83.01, kind: "trip", image: varanasiImage },
  { name: "Vrindavan - bike", state: "Uttar Pradesh", lat: 27.58, lng: 77.7, kind: "bike", image: vrindavanImage },
  { name: "Mathura", state: "Uttar Pradesh", lat: 27.49, lng: 77.67, kind: "trip" },

  // ── Visited — West ──
  { name: "Daman", state: "Daman and Diu", lat: 20.4, lng: 72.83, kind: "trip", image: damanImage },
  { name: "Mumbai", state: "Maharashtra", lat: 19.08, lng: 72.88, kind: "trip", image: mumbaiImage },
];
