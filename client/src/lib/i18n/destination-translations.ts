import type { IDestination } from "@/lib/types/destinations";
import { Language, toBengaliNumber } from "@/lib/i18n/translations";

export const countryBnMap: Record<string, string> = {
  "Saudi Arabia": "সৌদি আরব",
  "Turkey": "তুরস্ক",
  "Spain": "স্পেন",
  "Bosnia & Herzegovina": "বসনিয়া ও হার্জেগোভিনা",
  "Malaysia": "মালয়েশিয়া",
  "Morocco": "মরক্কো",
  "Egypt": "মিশর",
  "Jordan": "জর্ডান",
  "Uzbekistan": "উজবেকিস্তান",
  "Oman": "ওমান",
  "Qatar": "কাতার",
  "United Arab Emirates": "সংযুক্ত আরব আমিরাত",
  "UAE": "সংযুক্ত আরব আমিরাত",
  "Indonesia": "ইন্দোনেশিয়া",
  "Palestine": "ফিলিস্তিন",
  "Bangladesh": "বাংলাদেশ",
};

export const destinationNameBnMap: Record<string, string> = {
  "Makkah & Madinah Spiritual Umrah": "মক্কা ও মদিনা আত্মিক ওমরাহ সফর",
  "Istanbul & Bosphorus Heritage": "ইস্তাম্বুল ও বসফরাস ঐতিহাসিক সফর",
  "Granada & Cordoba Andalusia Tour": "গ্রানাডা ও কর্ডোবা আন্দালুসিয়া ট্যুর",
  "Sarajevo & Bosnian Springs Retreat": "সারায়েভো ও বসনিয়ান স্প্রিংস রিট্রিট",
  "Langkawi & Kuala Lumpur Halal Sanctuary": "লাংকাউই ও কুয়ালালামপুর হালাল অবকাশ",
  "Marrakech & Atlas Mountains Riad": "মারাকেশ ও এটলাস মাউন্টেন রিয়াদ",
};

export const halalDiningBnMap: Record<string, string> = {
  "100% Zabiha Halal Certified": "১০০% জবিহা হালাল সার্টিফাইড খাবার",
  "Verified Halal Andalusian & Mediterranean Cuisine": "যাচাইকৃত হালাল আন্দালুসিয়ান ও ভূমধ্যসাগরীয় খাবার",
  "100% Halal Traditional Bosnian Kitchen": "১০০% হালাল ঐতিহ্যবাহী বসনিয়ান খাবার",
  "JAKIM Certified Halal Resort Dining": "জাকিম (JAKIM) অনুমোদিত হালাল রিসোর্ট ডাইনিং",
  "100% Halal Moroccan Tagine & Farm-to-Table": "১০০% হালাল মরক্কান তাগিন ও ফ্রেশ ফুড",
};

export const prayerFacilitiesBnMap: Record<string, string> = {
  "Steps from Al-Haram & Masjid An-Nabawi": "মসজিদুল হারাম ও মসজিদে নববীর সন্নিকটে",
  "Historic Ottoman Masjids & Dedicated Prayer Stops": "ঐতিহাসিক অটোমান মসজিদ ও নামাযের বিশেষ বিরতি",
  "Albaicin Mosque & Quiet Prayer Spaces Included": "আলবাইসিন মসজিদ ও নিরিবিলি নামাযের ব্যবস্থা",
  "Gazi Husrev-beg Mosque & Mountain Prayer Stops": "গাজী হুসরেভ-বেগ মসজিদ ও পাহাড়ি নামাযের স্থান",
  "Private Villa Qibla, Musalla & Putra Mosque Tour": "ভিলায় কিবলা নির্দেশক, মুসাল্লা ও পুত্রা মসজিদ ভ্রমণ",
  "Koutoubia Mosque Access & Riad Prayer Corners": "কুতুবিয়া মসজিদে প্রবেশাধিকার ও রিয়াদে নামাযের স্থান",
  "Nearby Masjid & Prayer-Friendly Schedule": "নিকটবর্তী মসজিদ ও নামাযের সুব্যবস্থা",
};

export const descriptionBnMap: Record<string, string> = {
  "Makkah & Madinah Spiritual Umrah":
    "১০ দিনের আত্মিক ও বরকতময় ওমরাহ এবং মক্কা ও মদিনার ঐতিহাসিক যিয়ারত সফর। ৫-স্টার হারাম-ভিউ হোটেল, প্রখ্যাত স্কলারদের সান্নিধ্যে দিকনির্দেশনা, মসজিদে কুবা, উহুদ প্রান্তর এবং হেরা গুহা পরিদর্শনের সুব্যবস্থা এবং পরিবার ও প্রবীণদের জন্য বিশেষ হালাল খাবারের আয়োজন।",
  "Istanbul & Bosphorus Heritage":
    "সুলতানাহমেত ও আইয়ুব সুলতান মসজিদ থেকে শুরু করে তোপকাপি প্রাসাদের পবিত্র নিদর্শন কক্ষ পর্যন্ত অটোমান সভ্যতার গৌরবময় শতাব্দীসমূহ ঘুরে দেখুন। বসফরাস প্রণালীতে সূর্যাস্তের মনোরম ক্রুজ এবং ঐতিহ্যবাহী তুর্কি হালাল খাবারের বিশেষ অভিজ্ঞতা।",
  "Granada & Cordoba Andalusia Tour":
    "গ্রানাডা, কর্ডোবা এবং সেভিলে আল-আন্দালুসের সোনালী যুগকে নতুন করে আবিষ্কার করুন। মুসলিম ইতিহাসবিদের সাথে শ্বাসরুদ্ধকর আলহামব্রা প্রাঙ্গণ, কর্ডোবার ঐতিহাসিক মসজিদ-ক্যাথেড্রাল এবং মদিনাত আজ-জাহরা পরিদর্শন করুন।",
  "Sarajevo & Bosnian Springs Retreat":
    "ইউরোপের জীবন্ত ইসলামিক ঐতিহ্য আবিষ্কার করার সাথে সাথে বলকান পর্বতের বিশুদ্ধ বাতাসে প্রশান্তি অনুভব করুন। সারায়েভোর গাজী হুসরেভ-বেগ মসজিদ, ব্লাগাজের বুনা নদী তেকিয়া, মোস্তারের ঐতিহাসিক স্তারি মোস্ত সেতু এবং মনোরম ঝর্ণা পরিদর্শনের চমৎকার সুযোগ।",
  "Langkawi & Kuala Lumpur Halal Sanctuary":
    "লাংকাউইয়ের নীল সমুদ্র ও চিরসবুজ পাহাড়ে ঘেরা মদ্যপানমুক্ত রিসোর্টে পরিবারের সাথে ছুটি কাটান। প্রাইভেট বোট চার্টার, পুত্রজায়ার গোলাপি গম্বুজবিশিষ্ট পুত্রা মসজিদ পরিদর্শন এবং মালয়েশিয়ার সেরা হালাল খাবারের অবিস্মরণীয় স্বাদ।",
  "Marrakech & Atlas Mountains Riad":
    "মারাকেশের সবুজ টাইলস খচিত ঐতিহ্যবাহী পারিবারিক রিয়াদে অবস্থান এবং শান্ত হাই এটলাস উপত্যকায় ভ্রমণ। অভিজ্ঞ গাইডের সাথে সৌক বাজার অন্বেষণ, বারবার গ্রামে চা চক্র, সূর্যাস্তের সময় উটের পিঠে চড়া এবং দৈনিক নামাযের সাথে সামঞ্জস্যপূর্ণ আরামদায়ক সফরসূচি।",
};

const bnMonths: Record<number, string> = {
  0: "জানুয়ারি",
  1: "ফেব্রুয়ারি",
  2: "মার্চ",
  3: "এপ্রিল",
  4: "মে",
  5: "জুন",
  6: "জুলাই",
  7: "আগস্ট",
  8: "সেপ্টেম্বর",
  9: "অক্টোবর",
  10: "নভেম্বর",
  11: "ডিসেম্বর",
};

export function formatBilingualDepartureDate(value: string, lang: Language): string {
  if (!value || !value.includes("-")) {
    return lang === "bn" ? "যেকোনো সুবিধাজনক তারিখ" : (value || "Flexible Dates");
  }
  const [year, month, day] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (Number.isNaN(date.getTime())) return value;

  if (lang === "bn") {
    const bnDay = toBengaliNumber(date.getDate());
    const bnMonth = bnMonths[date.getMonth()] || "";
    const bnYear = toBengaliNumber(date.getFullYear());
    return `${bnDay} ${bnMonth}, ${bnYear}`;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function localizeDestination(dest: IDestination, lang: Language): IDestination {
  if (lang !== "bn") return dest;

  const nameBn = destinationNameBnMap[dest.name] || dest.name;
  const countryBn = countryBnMap[dest.country] || dest.country;
  const diningBn = halalDiningBnMap[dest.halalDining] || dest.halalDining;
  const prayerBn = prayerFacilitiesBnMap[dest.prayerFacilities] || dest.prayerFacilities;
  const descBn = descriptionBnMap[dest.name] || dest.description;

  return {
    ...dest,
    name: nameBn,
    country: countryBn,
    halalDining: diningBn,
    prayerFacilities: prayerBn,
    description: descBn,
  };
}
