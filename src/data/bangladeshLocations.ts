export interface Upazila {
  id: string;
  name: string;
  bnName: string;
}

export interface District {
  id: string;
  name: string;
  bnName: string;
  divisionId: string;
  upazilas: Upazila[];
}

export interface Division {
  id: string;
  name: string;
  bnName: string;
  districts: District[];
}

export const BANGLADESH_DIVISIONS: Division[] = [
  {
    id: "dhaka",
    name: "Dhaka",
    bnName: "ঢাকা",
    districts: [
      {
        id: "dhaka",
        name: "Dhaka",
        bnName: "ঢাকা",
        divisionId: "dhaka",
        upazilas: [
          { id: "dhanmondi", name: "Dhanmondi", bnName: "ধানমন্ডি" },
          { id: "gulshan", name: "Gulshan", bnName: "গুলশান" },
          { id: "banani", name: "Banani", bnName: "বনানী" },
          { id: "uttara", name: "Uttara", bnName: "উত্তরা" },
          { id: "mirpur", name: "Mirpur", bnName: "মিরপুর" },
          { id: "mohammadpur", name: "Mohammadpur", bnName: "মোহাম্মদপুর" },
          { id: "motijheel", name: "Motijheel", bnName: "মতিঝিল" },
          { id: "shahbagh", name: "Shahbagh", bnName: "শাহবাগ" },
          { id: "khilgaon", name: "Khilgaon", bnName: "খিলগাঁও" },
          { id: "badda", name: "Badda", bnName: "বাড্ডা" },
          { id: "savar", name: "Savar", bnName: "সাভার" },
          { id: "dhamrai", name: "Dhamrai", bnName: "ধামরাই" },
          { id: "keraniganj", name: "Keraniganj", bnName: "কেরানীগঞ্জ" },
          { id: "pallabi", name: "Pallabi", bnName: "পল্লবী" },
          { id: "jatrabari", name: "Jatrabari", bnName: "যাত্রাবাড়ী" },
          { id: "tejgaon", name: "Tejgaon", bnName: "তেজগাঁও" },
        ]
      },
      {
        id: "gazipur",
        name: "Gazipur",
        bnName: "গাজীপুর",
        divisionId: "dhaka",
        upazilas: [
          { id: "gazipur-sadar", name: "Gazipur Sadar", bnName: "গাজীপুর সদর" },
          { id: "kaliakair", name: "Kaliakair", bnName: "কালিয়াকৈর" },
          { id: "kaliganj", name: "Kaliganj", bnName: "কালীগঞ্জ" },
          { id: "kapasia", name: "Kapasia", bnName: "কাপাসিয়া" },
          { id: "sreepur", name: "Sreepur", bnName: "শ্রীপুর" },
          { id: "tongi", name: "Tongi", bnName: "টঙ্গী" },
        ]
      },
      {
        id: "narayanganj",
        name: "Narayanganj",
        bnName: "নারায়ণগঞ্জ",
        divisionId: "dhaka",
        upazilas: [
          { id: "narayanganj-sadar", name: "Narayanganj Sadar", bnName: "নারায়ণগঞ্জ সদর" },
          { id: "araihazar", name: "Araihazar", bnName: "আড়াইহাজার" },
          { id: "bandar", name: "Bandar", bnName: "বন্দর" },
          { id: "rupganj", name: "Rupganj", bnName: "রূপগঞ্জ" },
          { id: "sonargaon", name: "Sonargaon", bnName: "সোনারগাঁও" },
          { id: "siddhirganj", name: "Siddhirganj", bnName: "সিদ্ধিরগঞ্জ" },
        ]
      },
      {
        id: "narsingdi",
        name: "Narsingdi",
        bnName: "নরসিংদী",
        divisionId: "dhaka",
        upazilas: [
          { id: "narsingdi-sadar", name: "Narsingdi Sadar", bnName: "নরসিংদী সদর" },
          { id: "belabo", name: "Belabo", bnName: "বেলাবো" },
          { id: "monohardi", name: "Monohardi", bnName: "মনোহরদী" },
          { id: "palash", name: "Palash", bnName: "পলাশ" },
          { id: "raipura", name: "Raipura", bnName: "রায়পুরা" },
          { id: "shibpur", name: "Shibpur", bnName: "শিবপুর" },
        ]
      },
      {
        id: "tangail",
        name: "Tangail",
        bnName: "টাঙ্গাইল",
        divisionId: "dhaka",
        upazilas: [
          { id: "tangail-sadar", name: "Tangail Sadar", bnName: "টাঙ্গাইল সদর" },
          { id: "basail", name: "Basail", bnName: "বাসাইল" },
          { id: "bhuapur", name: "Bhuapur", bnName: "ভুয়াপুর" },
          { id: "delduar", name: "Delduar", bnName: "দেলদুয়ার" },
          { id: "ghatail", name: "Ghatail", bnName: "ঘাটাইল" },
          { id: "gopalpur", name: "Gopalpur", bnName: "গোপালপুর" },
          { id: "kalihati", name: "Kalihati", bnName: "কালিহাতী" },
          { id: "madhupur", name: "Madhupur", bnName: "মধুপুর" },
          { id: "mirzapur", name: "Mirzapur", bnName: "মির্জাপুর" },
          { id: "nagarpur", name: "Nagarpur", bnName: "নাগরপুর" },
          { id: "sakhipur", name: "Sakhipur", bnName: "সখিপুর" },
          { id: "dhanbari", name: "Dhanbari", bnName: "ধানবাড়ী" },
        ]
      },
      {
        id: "kishoreganj",
        name: "Kishoreganj",
        bnName: "কিশোরগঞ্জ",
        divisionId: "dhaka",
        upazilas: [
          { id: "kishoreganj-sadar", name: "Kishoreganj Sadar", bnName: "কিশোরগঞ্জ সদর" },
          { id: "astagram", name: "Astagram", bnName: "অষ্টগ্রাম" },
          { id: "bajitpur", name: "Bajitpur", bnName: "বাজিতপুর" },
          { id: "bhairab", name: "Bhairab", bnName: "ভৈরব" },
          { id: "hossainpur", name: "Hossainpur", bnName: "হোসেনপুর" },
          { id: "itna", name: "Itna", bnName: "ইটনা" },
          { id: "karimganj", name: "Karimganj", bnName: "করিমগঞ্জ" },
          { id: "katiadi", name: "Katiadi", bnName: "কটিয়াদী" },
          { id: "kuliarchar", name: "Kuliarchar", bnName: "কুলিয়ারচর" },
          { id: "mithamain", name: "Mithamain", bnName: "মিঠামইন" },
          { id: "nikli", name: "Nikli", bnName: "নিকলী" },
          { id: "pakundia", name: "Pakundia", bnName: "পাকুন্দিয়া" },
          { id: "tarail", name: "Tarail", bnName: "তাড়াইল" },
        ]
      },
      {
        id: "manikganj",
        name: "Manikganj",
        bnName: "মানিকগঞ্জ",
        divisionId: "dhaka",
        upazilas: [
          { id: "manikganj-sadar", name: "Manikganj Sadar", bnName: "মানিকগঞ্জ সদর" },
          { id: "daulatpur", name: "Daulatpur", bnName: "দৌলতপুর" },
          { id: "ghior", name: "Ghior", bnName: "ঘিওর" },
          { id: "harirampur", name: "Harirampur", bnName: "হরিরামপুর" },
          { id: "saturia", name: "Saturia", bnName: "সাটুরিয়া" },
          { id: "shivalaya", name: "Shivalaya", bnName: "শিবালয়" },
          { id: "singair", name: "Singair", bnName: "সিংগাইর" },
        ]
      },
      {
        id: "munshiganj",
        name: "Munshiganj",
        bnName: "মুন্সীগঞ্জ",
        divisionId: "dhaka",
        upazilas: [
          { id: "munshiganj-sadar", name: "Munshiganj Sadar", bnName: "মুন্সীগঞ্জ সদর" },
          { id: "gazaria", name: "Gazaria", bnName: "গজারিয়া" },
          { id: "lohajang", name: "Lohajang", bnName: "লৌহজং" },
          { id: "sirajdikhan", name: "Sirajdikhan", bnName: "সিরাজদিখান" },
          { id: "sreenagar", name: "Sreenagar", bnName: "শ্রীনগর" },
          { id: "tongibari", name: "Tongibari", bnName: "টংগিবাড়ী" },
        ]
      },
      {
        id: "faridpur",
        name: "Faridpur",
        bnName: "ফরিদপুর",
        divisionId: "dhaka",
        upazilas: [
          { id: "faridpur-sadar", name: "Faridpur Sadar", bnName: "ফরিদপুর সদর" },
          { id: "alfadanga", name: "Alfadanga", bnName: "আলফাডাঙ্গা" },
          { id: "bhanga", name: "Bhanga", bnName: "ভাঙ্গা" },
          { id: "boalmari", name: "Boalmari", bnName: "বোয়ালমারী" },
          { id: "charbhadrasan", name: "Charbhadrasan", bnName: "চরভদ্রাসন" },
          { id: "madhukhali", name: "Madhukhali", bnName: "মধুখালী" },
          { id: "nagarkanda", name: "Nagarkanda", bnName: "নগরকান্দা" },
          { id: "sadarpur", name: "Sadarpur", bnName: "সদরপুর" },
          { id: "saltha", name: "Saltha", bnName: "সালথা" },
        ]
      },
      {
        id: "gopalganj",
        name: "Gopalganj",
        bnName: "গোপালগঞ্জ",
        divisionId: "dhaka",
        upazilas: [
          { id: "gopalganj-sadar", name: "Gopalganj Sadar", bnName: "গোপালগঞ্জ সদর" },
          { id: "kashiani", name: "Kashiani", bnName: "কাশিয়ানী" },
          { id: "kotalipara", name: "Kotalipara", bnName: "কোটালীপাড়া" },
          { id: "muksudpur", name: "Muksudpur", bnName: "মুকসুদপুর" },
          { id: "tungipara", name: "Tungipara", bnName: "টুঙ্গিপাড়া" },
        ]
      },
      {
        id: "madaripur",
        name: "Madaripur",
        bnName: "মাদারীপুর",
        divisionId: "dhaka",
        upazilas: [
          { id: "madaripur-sadar", name: "Madaripur Sadar", bnName: "মাদারীপুর সদর" },
          { id: "kalkini", name: "Kalkini", bnName: "কালকিনি" },
          { id: "rajor", name: "Rajor", bnName: "রাজৈর" },
          { id: "shibchar", name: "Shibchar", bnName: "শিবচর" },
          { id: "dasar", name: "Dasar", bnName: "ডাসার" },
        ]
      },
      {
        id: "rajbari",
        name: "Rajbari",
        bnName: "রাজবাড়ী",
        divisionId: "dhaka",
        upazilas: [
          { id: "rajbari-sadar", name: "Rajbari Sadar", bnName: "রাজবাড়ী সদর" },
          { id: "baliakandi", name: "Baliakandi", bnName: "বালিয়াকান্দি" },
          { id: "goalandaghat", name: "Goalandaghat", bnName: "গোয়ালন্দ ঘাট" },
          { id: "pangsha", name: "Pangsha", bnName: "পাংশা" },
          { id: "kalukhali", name: "Kalukhali", bnName: "কালুখালী" },
        ]
      },
      {
        id: "shariatpur",
        name: "Shariatpur",
        bnName: "শরীয়তপুর",
        divisionId: "dhaka",
        upazilas: [
          { id: "shariatpur-sadar", name: "Shariatpur Sadar", bnName: "শরীয়তপুর সদর" },
          { id: "damudya", name: "Damudya", bnName: "ডামুড্যা" },
          { id: "gosairhat", name: "Gosairhat", bnName: "গোসাইরহাট" },
          { id: "naria", name: "Naria", bnName: "নড়িয়া" },
          { id: "bhedarganj", name: "Bhedarganj", bnName: "ভেদরগঞ্জ" },
          { id: "zajira", name: "Zajira", bnName: "জাজিরা" },
        ]
      },
    ]
  },
  {
    id: "chattogram",
    name: "Chattogram",
    bnName: "চট্টগ্রাম",
    districts: [
      {
        id: "chattogram",
        name: "Chattogram",
        bnName: "চট্টগ্রাম",
        divisionId: "chattogram",
        upazilas: [
          { id: "panchlaish", name: "Panchlaish", bnName: "পাঁচলাইশ" },
          { id: "kotwali", name: "Kotwali", bnName: "কোতোয়ালী" },
          { id: "halishahar", name: "Halishahar", bnName: "হালিশহর" },
          { id: "agrabad", name: "Agrabad", bnName: "আগ্রাবাদ" },
          { id: "pahartali", name: "Pahartali", bnName: "পাহাড়তলী" },
          { id: "chandgaon", name: "Chandgaon", bnName: "চাঁন্দগাঁও" },
          { id: "anwara", name: "Anwara", bnName: "আনোয়ারা" },
          { id: "banshkhali", name: "Banshkhali", bnName: "বাঁশখালী" },
          { id: "boalkhali", name: "Boalkhali", bnName: "বোয়ালখালী" },
          { id: "chandanpura", name: "Chandanpura", bnName: "চন্দনপুরা" },
          { id: "fatikchhari", name: "Fatikchhari", bnName: "ফটিকছড়ি" },
          { id: "hathazari", name: "Hathazari", bnName: "হাটহাজারী" },
          { id: "mirsharai", name: "Mirsharai", bnName: "মীরসরাই" },
          { id: "patia", name: "Patiya", bnName: "পটিয়া" },
          { id: "rangunia", name: "Rangunia", bnName: "রাঙ্গুনিয়া" },
          { id: "raozan", name: "Raozan", bnName: "রাউজান" },
          { id: "sandwip", name: "Sandwip", bnName: "সন্দ্বীপ" },
          { id: "satkania", name: "Satkania", bnName: "সাতকানিয়া" },
          { id: "sitakunda", name: "Sitakunda", bnName: "সীতাকুন্ড" },
        ]
      },
      {
        id: "coxs-bazar",
        name: "Cox's Bazar",
        bnName: "কক্সবাজার",
        divisionId: "chattogram",
        upazilas: [
          { id: "coxs-bazar-sadar", name: "Cox's Bazar Sadar", bnName: "কক্সবাজার সদর" },
          { id: "chakaria", name: "Chakaria", bnName: "চকোরিয়া" },
          { id: "kutubdia", name: "Kutubdia", bnName: "কুতুবদিয়া" },
          { id: "maheshkhali", name: "Maheshkhali", bnName: "মহেশখালী" },
          { id: "ramu", name: "Ramu", bnName: "রামু" },
          { id: "teknaf", name: "Teknaf", bnName: "টেকনাফ" },
          { id: "ukhiya", name: "Ukhiya", bnName: "উখিয়া" },
          { id: "pekuwa", name: "Pekua", bnName: "পেকুয়া" },
        ]
      },
      {
        id: "cumilla",
        name: "Cumilla",
        bnName: "কুমিল্লা",
        divisionId: "chattogram",
        upazilas: [
          { id: "cumilla-adarsha-sadar", name: "Adarsha Sadar", bnName: "আদর্শ সদর" },
          { id: "barura", name: "Barura", bnName: "বরুড়া" },
          { id: "brahmanpara", name: "Brahmanpara", bnName: "ব্রাহ্মণপাড়া" },
          { id: "burichang", name: "Burichang", bnName: "বুড়িচং" },
          { id: "chandina", name: "Chandina", bnName: "চান্দিনা" },
          { id: "chauddagram", name: "Chauddagram", bnName: "চৌদ্দগ্রাম" },
          { id: "daudkandi", name: "Daudkandi", bnName: "দাউদকান্দি" },
          { id: "debidwar", name: "Debidwar", bnName: "দেবিদ্বার" },
          { id: "homna", name: "Homna", bnName: "হোমনা" },
          { id: "laksam", name: "Laksam", bnName: "লাকসাম" },
          { id: "muradnagar", name: "Muradnagar", bnName: "মুরাদনগর" },
          { id: "nangalkot", name: "Nangalkot", bnName: "নাঙ্গলকোট" },
          { id: "titas", name: "Titas", bnName: "তিতাস" },
        ]
      },
      {
        id: "feni",
        name: "Feni",
        bnName: "ফেনী",
        divisionId: "chattogram",
        upazilas: [
          { id: "feni-sadar", name: "Feni Sadar", bnName: "ফেনী সদর" },
          { id: "chhagalnaiya", name: "Chhagalnaiya", bnName: "ছাগলনাইয়া" },
          { id: "daganbhuiyan", name: "Daganbhuiyan", bnName: "দাগনভূঞা" },
          { id: "parshuram", name: "Parshuram", bnName: "পরশুরাম" },
          { id: "fulgazi", name: "Fulgazi", bnName: "ফুলগাজী" },
          { id: "sonagazi", name: "Sonagazi", bnName: "সোনাগাজী" },
        ]
      },
      {
        id: "brahmanbaria",
        name: "Brahmanbaria",
        bnName: "ব্রাহ্মণবাড়িয়া",
        divisionId: "chattogram",
        upazilas: [
          { id: "brahmanbaria-sadar", name: "Brahmanbaria Sadar", bnName: "ব্রাহ্মণবাড়িয়া সদর" },
          { id: "ashuganj", name: "Ashuganj", bnName: "আশুগঞ্জ" },
          { id: "bancharampur", name: "Bancharampur", bnName: "বাঞ্ছারামপুর" },
          { id: "kasba", name: "Kasba", bnName: "কসবা" },
          { id: "nabinagar", name: "Nabinagar", bnName: "নবীনগর" },
          { id: "nasirnagar", name: "Nasirnagar", bnName: "নাসিরনগর" },
          { id: "sarail", name: "Sarail", bnName: "সরাইল" },
          { id: "akhaura", name: "Akhaura", bnName: "আখাউড়া" },
        ]
      },
      {
        id: "noakhali",
        name: "Noakhali",
        bnName: "নোয়াখালী",
        divisionId: "chattogram",
        upazilas: [
          { id: "noakhali-sadar", name: "Noakhali Sadar", bnName: "নোয়াখালী সদর" },
          { id: "begumganj", name: "Begumganj", bnName: "বেগমগঞ্জ" },
          { id: "chatkhil", name: "Chatkhil", bnName: "চাটখিল" },
          { id: "companiganj", name: "Companiganj", bnName: "কোম্পানীগঞ্জ" },
          { id: "hatiya", name: "Hatiya", bnName: "হাতিয়া" },
          { id: "senbagh", name: "Senbagh", bnName: "সেনবাগ" },
          { id: "subarnachar", name: "Subarnachar", bnName: "সুবর্ণচর" },
          { id: "kabirhat", name: "Kabirhat", bnName: "কবিরহাট" },
        ]
      },
      {
        id: "chandpur",
        name: "Chandpur",
        bnName: "চাঁদপুর",
        divisionId: "chattogram",
        upazilas: [
          { id: "chandpur-sadar", name: "Chandpur Sadar", bnName: "চাঁদপুর সদর" },
          { id: "faridganj", name: "Faridganj", bnName: "ফরিদগঞ্জ" },
          { id: "haimchar", name: "Haimchar", bnName: "হাইমচর" },
          { id: "hajiganj", name: "Hajiganj", bnName: "হাজীগঞ্জ" },
          { id: "kachua", name: "Kachua", bnName: "কচুয়া" },
          { id: "matlab-uttar", name: "Matlab Uttar", bnName: "মতলব উত্তর" },
          { id: "matlab-dakshin", name: "Matlab Dakshin", bnName: "মতলব দক্ষিণ" },
          { id: "shahrasti", name: "Shahrasti", bnName: "শাহরাস্তি" },
        ]
      },
      {
        id: "lakshmipur",
        name: "Lakshmipur",
        bnName: "লক্ষ্মীপুর",
        divisionId: "chattogram",
        upazilas: [
          { id: "lakshmipur-sadar", name: "Lakshmipur Sadar", bnName: "লক্ষ্মীপুর সদর" },
          { id: "raipur", name: "Raipur", bnName: "রায়পুর" },
          { id: "ramganj", name: "Ramganj", bnName: "রামগঞ্জ" },
          { id: "ramgati", name: "Ramgati", bnName: "রামগতি" },
          { id: "kamalnagar", name: "Kamalnagar", bnName: "কমলনগর" },
        ]
      },
      {
        id: "rangamati",
        name: "Rangamati",
        bnName: "রাঙ্গামাটি",
        divisionId: "chattogram",
        upazilas: [
          { id: "rangamati-sadar", name: "Rangamati Sadar", bnName: "রাঙ্গামাটি সদর" },
          { id: "baghaichhari", name: "Baghaichhari", bnName: "বাঘাইছড়ি" },
          { id: "barkal", name: "Barkal", bnName: "বরকল" },
          { id: "kaptai", name: "Kaptai", bnName: "কাপ্তাই" },
          { id: "jurachhari", name: "Jurachhari", bnName: "জুরাছড়ি" },
          { id: "kawkhali", name: "Kawkhali", bnName: "কাউখালী" },
        ]
      },
      {
        id: "khagrachhari",
        name: "Khagrachhari",
        bnName: "খাগড়াছড়ি",
        divisionId: "chattogram",
        upazilas: [
          { id: "khagrachhari-sadar", name: "Khagrachhari Sadar", bnName: "খাগড়াছড়ি সদর" },
          { id: "dighinala", name: "Dighinala", bnName: "দীঘিনালা" },
          { id: "lakshmichhari", name: "Lakshmichhari", bnName: "লক্ষ্মীছড়ি" },
          { id: "mahalchhari", name: "Mahalchhari", bnName: "মহালছড়ি" },
          { id: "manikchhari", name: "Manikchhari", bnName: "মানিকছড়ি" },
          { id: "matiranga", name: "Matiranga", bnName: "মাটিরাঙ্গা" },
          { id: "panchhari", name: "Panchhari", bnName: "পানছড়ি" },
          { id: "ramgarh", name: "Ramgarh", bnName: "রামগড়" },
        ]
      },
      {
        id: "bandarban",
        name: "Bandarban",
        bnName: "বান্দরবান",
        divisionId: "chattogram",
        upazilas: [
          { id: "bandarban-sadar", name: "Bandarban Sadar", bnName: "বান্দরবান সদর" },
          { id: "ali-kadam", name: "Ali Kadam", bnName: "আলীকদম" },
          { id: "lama", name: "Lama", bnName: "লামা" },
          { id: "naikhongchhari", name: "Naikhongchhari", bnName: "নাইক্ষ্যংছড়ি" },
          { id: "rowangchhari", name: "Rowangchhari", bnName: "রোয়াংছড়ি" },
          { id: "ruma", name: "Ruma", bnName: "রুমা" },
          { id: "thanchi", name: "Thanchi", bnName: "থানচি" },
        ]
      },
    ]
  },
  {
    id: "rajshahi",
    name: "Rajshahi",
    bnName: "রাজশাহী",
    districts: [
      {
        id: "rajshahi",
        name: "Rajshahi",
        bnName: "রাজশাহী",
        divisionId: "rajshahi",
        upazilas: [
          { id: "boalia", name: "Boalia", bnName: "বোয়ালিয়া" },
          { id: "rajpara", name: "Rajpara", bnName: "রাজপাড়া" },
          { id: "motihar", name: "Motihar", bnName: "মতিহার" },
          { id: "shah-makhdum", name: "Shah Makhdum", bnName: "শাহ মখদুম" },
          { id: "bagha", name: "Bagha", bnName: "বাঘা" },
          { id: "bagmara", name: "Bagmara", bnName: "বাগমারা" },
          { id: "charghat", name: "Charghat", bnName: "চারঘাট" },
          { id: "durgapur", name: "Durgapur", bnName: "দুর্গাপুর" },
          { id: "godagari", name: "Godagari", bnName: "গোদাগাড়ী" },
          { id: "mohanpur", name: "Mohanpur", bnName: "মোহনপুর" },
          { id: "paba", name: "Paba", bnName: "পবা" },
          { id: "puthia", name: "Puthia", bnName: "পুঠিয়া" },
          { id: "tanore", name: "Tanore", bnName: "তানোর" },
        ]
      },
      {
        id: "bogura",
        name: "Bogura",
        bnName: "বগুড়া",
        divisionId: "rajshahi",
        upazilas: [
          { id: "bogura-sadar", name: "Bogura Sadar", bnName: "বগুড়া সদর" },
          { id: "adamdighi", name: "Adamdighi", bnName: "আদমদিঘী" },
          { id: "dhunat", name: "Dhunat", bnName: "ধুনট" },
          { id: "dhupchanchia", name: "Dhupchanchia", bnName: "দুপচাঁচিয়া" },
          { id: "gabtali", name: "Gabtali", bnName: "গাবতলী" },
          { id: "kahaloo", name: "Kahaloo", bnName: "কাহালু" },
          { id: "nandigram", name: "Nandigram", bnName: "নন্দীগ্রাম" },
          { id: "sariakandi", name: "Sariakandi", bnName: "সারিয়াকান্দি" },
          { id: "shajahanpur", name: "Shajahanpur", bnName: "শাজাহানপুর" },
          { id: "sherpur", name: "Sherpur", bnName: "শেরপুর" },
          { id: "shibganj", name: "Shibganj", bnName: "শিবগঞ্জ" },
          { id: "sonatola", name: "Sonatola", bnName: "সোনাতলা" },
        ]
      },
      {
        id: "pabna",
        name: "Pabna",
        bnName: "পাবনা",
        divisionId: "rajshahi",
        upazilas: [
          { id: "pabna-sadar", name: "Pabna Sadar", bnName: "পাবনা সদর" },
          { id: "atgharia", name: "Atgharia", bnName: "আটঘরিয়া" },
          { id: "bera", name: "Bera", bnName: "বেড়া" },
          { id: "bhangura", name: "Bhangura", bnName: "ভাঙ্গুড়া" },
          { id: "chatmohar", name: "Chatmohar", bnName: "চাটমোহর" },
          { id: "faridpur", name: "Faridpur", bnName: "ফরিদপুর" },
          { id: "ishwardi", name: "Ishwardi", bnName: "ঈশ্বরদী" },
          { id: "santhia", name: "Santhia", bnName: "সাঁথিয়া" },
          { id: "sujanagar", name: "Sujanagar", bnName: "সুজানগর" },
        ]
      },
      {
        id: "sirajganj",
        name: "Sirajganj",
        bnName: "সিরাজগঞ্জ",
        divisionId: "rajshahi",
        upazilas: [
          { id: "sirajganj-sadar", name: "Sirajganj Sadar", bnName: "সিরাজগঞ্জ সদর" },
          { id: "belkuchi", name: "Belkuchi", bnName: "বেলকুচি" },
          { id: "chauhali", name: "Chauhali", bnName: "চৌহালী" },
          { id: "kamarkhanda", name: "Kamarkhanda", bnName: "কামারখন্দ" },
          { id: "kazipur", name: "Kazipur", bnName: "কাজীপুর" },
          { id: "royganj", name: "Royganj", bnName: "রায়গঞ্জ" },
          { id: "shahjadpur", name: "Shahjadpur", bnName: "শাহজাদপুর" },
          { id: "tarash", name: "Tarash", bnName: "তাড়াশ" },
          { id: "ullapara", name: "Ullapara", bnName: "উল্লাপাড়া" },
        ]
      },
      {
        id: "naogaon",
        name: "Naogaon",
        bnName: "নওগাঁ",
        divisionId: "rajshahi",
        upazilas: [
          { id: "naogaon-sadar", name: "Naogaon Sadar", bnName: "নওগাঁ সদর" },
          { id: "atrai", name: "Atrai", bnName: "আত্রাই" },
          { id: "badalgachhi", name: "Badalgachhi", bnName: "বদলগাছী" },
          { id: "dhamoirhat", name: "Dhamoirhat", bnName: "ধামইরহাট" },
          { id: "manda", name: "Manda", bnName: "মান্দা" },
          { id: "mohadadevpur", name: "Mohadevpur", bnName: "মহাদেবপুর" },
          { id: "niamatpur", name: "Niamatpur", bnName: "নিয়ামতপুর" },
          { id: "patnitala", name: "Patnitala", bnName: "পত্নীতলা" },
          { id: "porsha", name: "Porsha", bnName: "পোরশা" },
          { id: "raninagar", name: "Raninagar", bnName: "রাণীনগর" },
          { id: "sapahar", name: "Sapahar", bnName: "সাপাহার" },
        ]
      },
      {
        id: "natore",
        name: "Natore",
        bnName: "নাটোর",
        divisionId: "rajshahi",
        upazilas: [
          { id: "natore-sadar", name: "Natore Sadar", bnName: "নাটোর সদর" },
          { id: "bagatipara", name: "Bagatipara", bnName: "বাগাতিপাড়া" },
          { id: "baraigram", name: "Baraigram", bnName: "বড়াইগ্রাম" },
          { id: "gurudaspur", name: "Gurudaspur", bnName: "গুরুদাসপুর" },
          { id: "lalpur", name: "Lalpur", bnName: "লালপুর" },
          { id: "singra", name: "Singra", bnName: "সিংড়া" },
          { id: "naldanga", name: "Naldanga", bnName: "নলডাঙ্গা" },
        ]
      },
      {
        id: "joypurhat",
        name: "Joypurhat",
        bnName: "জয়পুরহাট",
        divisionId: "rajshahi",
        upazilas: [
          { id: "joypurhat-sadar", name: "Joypurhat Sadar", bnName: "জয়পুরহাট সদর" },
          { id: "akkelpur", name: "Akkelpur", bnName: "আক্কেলপুর" },
          { id: "kalai", name: "Kalai", bnName: "কালাই" },
          { id: "khetlal", name: "Khetlal", bnName: "ক্ষেতলাল" },
          { id: "panchbibi", name: "Panchbibi", bnName: "পাঁচবিবি" },
        ]
      },
      {
        id: "chapainawabganj",
        name: "Chapainawabganj",
        bnName: "চাঁপাইনবাবগঞ্জ",
        divisionId: "rajshahi",
        upazilas: [
          { id: "chapainawabganj-sadar", name: "Chapainawabganj Sadar", bnName: "চাঁপাইনবাবগঞ্জ সদর" },
          { id: "bholahat", name: "Bholahat", bnName: "ভোলাহাট" },
          { id: "gomastapur", name: "Gomastapur", bnName: "গোমস্তাপুর" },
          { id: "nachole", name: "Nachole", bnName: "নাচোল" },
          { id: "shibganj", name: "Shibganj", bnName: "শিবগঞ্জ" },
        ]
      },
    ]
  },
  {
    id: "khulna",
    name: "Khulna",
    bnName: "খুলনা",
    districts: [
      {
        id: "khulna",
        name: "Khulna",
        bnName: "খুলনা",
        divisionId: "khulna",
        upazilas: [
          { id: "khulna-sadar", name: "Khulna Sadar", bnName: "খুলনা সদর" },
          { id: "sonadanga", name: "Sonadanga", bnName: "সোনাডাঙ্গা" },
          { id: "khalishpur", name: "Khalishpur", bnName: "খালিশপুর" },
          { id: "daulatpur", name: "Daulatpur", bnName: "দৌলতপুর" },
          { id: "batiaghata", name: "Batiaghata", bnName: "বটিয়াঘাটা" },
          { id: "dacope", name: "Dacope", bnName: "দাকোপ" },
          { id: "dumuria", name: "Dumuria", bnName: "ডুমুরিয়া" },
          { id: "dighalia", name: "Dighalia", bnName: "দিঘলিয়া" },
          { id: "koyra", name: "Koyra", bnName: "কয়রা" },
          { id: "paikgachha", name: "Paikgachha", bnName: "পাইকগাছা" },
          { id: "phultala", name: "Phultala", bnName: "ফুলতলা" },
          { id: "rupsha", name: "Rupsha", bnName: "রূপসা" },
          { id: "terokhada", name: "Terokhada", bnName: "তেরখাদা" },
        ]
      },
      {
        id: "jashore",
        name: "Jashore",
        bnName: "যশোর",
        divisionId: "khulna",
        upazilas: [
          { id: "jashore-sadar", name: "Jashore Sadar", bnName: "যশোর সদর" },
          { id: "abhaynagar", name: "Abhaynagar", bnName: "অভয়নগর" },
          { id: "bagherpara", name: "Bagherpara", bnName: "বাঘারপাড়া" },
          { id: "chaugachha", name: "Chaugachha", bnName: "চৌগাছা" },
          { id: "jhikargachha", name: "Jhikargachha", bnName: "ঝিকরগাছা" },
          { id: "keshabpur", name: "Keshabpur", bnName: "কেশবপুর" },
          { id: "manirampur", name: "Manirampur", bnName: "মণিরামপুর" },
          { id: "sharsha", name: "Sharsha", bnName: "শার্শা" },
        ]
      },
      {
        id: "satkhira",
        name: "Satkhira",
        bnName: "সাতক্ষীরা",
        divisionId: "khulna",
        upazilas: [
          { id: "satkhira-sadar", name: "Satkhira Sadar", bnName: "সাতক্ষীরা সদর" },
          { id: "assasuni", name: "Assasuni", bnName: "আশাশুনি" },
          { id: "debhata", name: "Debhata", bnName: "দেবহাটা" },
          { id: "kalaroa", name: "Kalaroa", bnName: "কলারোয়া" },
          { id: "kaliganj", name: "Kaliganj", bnName: "কালীগঞ্জ" },
          { id: "shyamnagar", name: "Shyamnagar", bnName: "শ্যামনগর" },
          { id: "tala", name: "Tala", bnName: "তালা" },
        ]
      },
      {
        id: "kushtia",
        name: "Kushtia",
        bnName: "কুষ্টিয়া",
        divisionId: "khulna",
        upazilas: [
          { id: "kushtia-sadar", name: "Kushtia Sadar", bnName: "কুষ্টিয়া সদর" },
          { id: "bheramara", name: "Bheramara", bnName: "ভেড়ামারা" },
          { id: "daulatpur", name: "Daulatpur", bnName: "দৌলতপুর" },
          { id: "khoksa", name: "Khoksa", bnName: "খোকসা" },
          { id: "kumarkhali", name: "Kumarkhali", bnName: "কুমারখালী" },
          { id: "mirpur", name: "Mirpur", bnName: "মিরপুর" },
        ]
      },
      {
        id: "jhenaidah",
        name: "Jhenaidah",
        bnName: "ঝিনাইদহ",
        divisionId: "khulna",
        upazilas: [
          { id: "jhenaidah-sadar", name: "Jhenaidah Sadar", bnName: "ঝিনাইদহ সদর" },
          { id: "harinakunda", name: "Harinakunda", bnName: "হরিণাকুণ্ডু" },
          { id: "kaliganj", name: "Kaliganj", bnName: "কালীগঞ্জ" },
          { id: "kotchandpur", name: "Kotchandpur", bnName: "কোটচাঁদপুর" },
          { id: "maheshpur", name: "Maheshpur", bnName: "মহেশপুর" },
          { id: "shailkupa", name: "Shailkupa", bnName: "শৈলকুপা" },
        ]
      },
      {
        id: "bagerhat",
        name: "Bagerhat",
        bnName: "বাগেরহাট",
        divisionId: "khulna",
        upazilas: [
          { id: "bagerhat-sadar", name: "Bagerhat Sadar", bnName: "বাগেরহাট সদর" },
          { id: "chitalmari", name: "Chitalmari", bnName: "চিতলমারী" },
          { id: "fakirhat", name: "Fakirhat", bnName: "ফকিরহাট" },
          { id: "kachua", name: "Kachua", bnName: "কচুয়া" },
          { id: "mollahat", name: "Mollahat", bnName: "মোল্লাহাট" },
          { id: "mongla", name: "Mongla", bnName: "মোংলা" },
          { id: "morrelganj", name: "Morrelganj", bnName: "মোরেলগঞ্জ" },
          { id: "rampal", name: "Rampal", bnName: "রামপাল" },
          { id: "sarankhola", name: "Sarankhola", bnName: "শরণখোলা" },
        ]
      },
      {
        id: "chuadanga",
        name: "Chuadanga",
        bnName: "চুয়াডাঙ্গা",
        divisionId: "khulna",
        upazilas: [
          { id: "chuadanga-sadar", name: "Chuadanga Sadar", bnName: "চুয়াডাঙ্গা সদর" },
          { id: "alamdanga", name: "Alamdanga", bnName: "আলমডাঙ্গা" },
          { id: "damurhuda", name: "Damurhuda", bnName: "দামুড়হুদা" },
          { id: "jibannagar", name: "Jibannagar", bnName: "জীবননগর" },
        ]
      },
      {
        id: "meherpur",
        name: "Meherpur",
        bnName: "মেহেরপুর",
        divisionId: "khulna",
        upazilas: [
          { id: "meherpur-sadar", name: "Meherpur Sadar", bnName: "মেহেরপুর সদর" },
          { id: "gangni", name: "Gangni", bnName: "গাংনী" },
          { id: "mujibnagar", name: "Mujibnagar", bnName: "মুজিবনগর" },
        ]
      },
      {
        id: "narail",
        name: "Narail",
        bnName: "নড়াইল",
        divisionId: "khulna",
        upazilas: [
          { id: "narail-sadar", name: "Narail Sadar", bnName: "নড়াইল সদর" },
          { id: "kalia", name: "Kalia", bnName: "কালিয়া" },
          { id: "lohagagara", name: "Lohagara", bnName: "লোহাগড়া" },
        ]
      },
      {
        id: "magura",
        name: "Magura",
        bnName: "মাগুরা",
        divisionId: "khulna",
        upazilas: [
          { id: "magura-sadar", name: "Magura Sadar", bnName: "মাগুরা সদর" },
          { id: "mohammadpur", name: "Mohammadpur", bnName: "মহম্মদপুর" },
          { id: "shalikha", name: "Shalikha", bnName: "শালিখা" },
          { id: "sreepur", name: "Sreepur", bnName: "শ্রীপুর" },
        ]
      },
    ]
  },
  {
    id: "barishal",
    name: "Barishal",
    bnName: "বরিশাল",
    districts: [
      {
        id: "barishal",
        name: "Barishal",
        bnName: "বরিশাল",
        divisionId: "barishal",
        upazilas: [
          { id: "barishal-sadar", name: "Barishal Sadar", bnName: "বরিশাল সদর" },
          { id: "agailjhara", name: "Agailjhara", bnName: "আগৈলঝাড়া" },
          { id: "babuganj", name: "Babuganj", bnName: "বাবুগঞ্জ" },
          { id: "bakerganj", name: "Bakerganj", bnName: "বাকেরগঞ্জ" },
          { id: "banaripara", name: "Banaripara", bnName: "বানারীপাড়া" },
          { id: "gaurnadi", name: "Gaurnadi", bnName: "গৌরনদী" },
          { id: "hizla", name: "Hizla", bnName: "হিজলা" },
          { id: "mehendiganj", name: "Mehendiganj", bnName: "মেহেন্দীগঞ্জ" },
          { id: "muladi", name: "Muladi", bnName: "মুলাদী" },
          { id: "wazirpur", name: "Wazirpur", bnName: "উজিরপুর" },
        ]
      },
      {
        id: "patuakhali",
        name: "Patuakhali",
        bnName: "পটুয়াখালী",
        divisionId: "barishal",
        upazilas: [
          { id: "patuakhali-sadar", name: "Patuakhali Sadar", bnName: "পটুয়াখালী সদর" },
          { id: "bauphal", name: "Bauphal", bnName: "বাউফল" },
          { id: "dashmina", name: "Dashmina", bnName: "দশমিনা" },
          { id: "galachipa", name: "Galachipa", bnName: "গলাচিপা" },
          { id: "kalapara", name: "Kalapara", bnName: "কলাপাড়া" },
          { id: "mirzaganj", name: "Mirzaganj", bnName: "মির্জাগঞ্জ" },
          { id: "dumki", name: "Dumki", bnName: "দুমকি" },
          { id: "rangabali", name: "Rangabali", bnName: "রাঙ্গাবালী" },
        ]
      },
      {
        id: "bhola",
        name: "Bhola",
        bnName: "ভোলা",
        divisionId: "barishal",
        upazilas: [
          { id: "bhola-sadar", name: "Bhola Sadar", bnName: "ভোলা সদর" },
          { id: "burhanuddin", name: "Burhanuddin", bnName: "বোরহানউদ্দিন" },
          { id: "char-fasson", name: "Char Fasson", bnName: "চর ফ্যাশন" },
          { id: "daulatkhan", name: "Daulatkhan", bnName: "দৌলতখান" },
          { id: "lalmohan", name: "Lalmohan", bnName: "লালমোহন" },
          { id: "manpura", name: "Manpura", bnName: "মনপুরা" },
          { id: "tazumuddin", name: "Tazumuddin", bnName: "তজুমদ্দিন" },
        ]
      },
      {
        id: "pirojpur",
        name: "Pirojpur",
        bnName: "পিরোজপুর",
        divisionId: "barishal",
        upazilas: [
          { id: "pirojpur-sadar", name: "Pirojpur Sadar", bnName: "পিরোজপুর সদর" },
          { id: "bhandaria", name: "Bhandaria", bnName: "ভাণ্ডারিয়া" },
          { id: "kawkhali", name: "Kawkhali", bnName: "কাউখালী" },
          { id: "mathbaria", name: "Mathbaria", bnName: "মঠবাড়িয়া" },
          { id: "nazirpur", name: "Nazirpur", bnName: "নাজিরপুর" },
          { id: "nesarabad", name: "Nesarabad", bnName: "নেছারাবাদ" },
          { id: "zirian", name: "Zianagar", bnName: "জিয়ানগর" },
        ]
      },
      {
        id: "barguna",
        name: "Barguna",
        bnName: "বরগুনা",
        divisionId: "barishal",
        upazilas: [
          { id: "barguna-sadar", name: "Barguna Sadar", bnName: "বরগুনা সদর" },
          { id: "amtali", name: "Amtali", bnName: "আমতলী" },
          { id: "bamna", name: "Bamna", bnName: "বামনা" },
          { id: "betagi", name: "Betagi", bnName: "বেতাগী" },
          { id: "patharghata", name: "Patharghata", bnName: "পাথরঘাটা" },
          { id: "taltali", name: "Taltali", bnName: "তালতলী" },
        ]
      },
      {
        id: "jhalokati",
        name: "Jhalokati",
        bnName: "ঝালকাঠি",
        divisionId: "barishal",
        upazilas: [
          { id: "jhalokati-sadar", name: "Jhalokati Sadar", bnName: "ঝালকাঠি সদর" },
          { id: "kathalia", name: "Kathalia", bnName: "কাঠালিয়া" },
          { id: "nalchhiti", name: "Nalchhiti", bnName: "নলছিটি" },
          { id: "rajapur", name: "Rajapur", bnName: "রাজাপুর" },
        ]
      },
    ]
  },
  {
    id: "sylhet",
    name: "Sylhet",
    bnName: "সিলেট",
    districts: [
      {
        id: "sylhet",
        name: "Sylhet",
        bnName: "সিলেট",
        divisionId: "sylhet",
        upazilas: [
          { id: "sylhet-sadar", name: "Sylhet Sadar", bnName: "সিলেট সদর" },
          { id: "balaganj", name: "Balaganj", bnName: "বালাগঞ্জ" },
          { id: "beanibazar", name: "Beanibazar", bnName: "বিয়ানীবাজার" },
          { id: "bishwanath", name: "Bishwanath", bnName: "বিশ্বনাথ" },
          { id: "companiganj", name: "Companiganj", bnName: "কোম্পানীগঞ্জ" },
          { id: "fenchuganj", name: "Fenchuganj", bnName: "ফেঞ্চুগঞ্জ" },
          { id: "golapganj", name: "Golapganj", bnName: "গোলাপগঞ্জ" },
          { id: "gowainghat", name: "Gowainghat", bnName: "গোয়াইনঘাট" },
          { id: "jaintiapur", name: "Jaintiapur", bnName: "জৈন্তাপুর" },
          { id: "kanaighat", name: "Kanaighat", bnName: "কানাইঘাট" },
          { id: "osmaninagar", name: "Osmani Nagar", bnName: "ওসমানী নগর" },
          { id: "zakiganj", name: "Zakiganj", bnName: "জকিগঞ্জ" },
        ]
      },
      {
        id: "moulvibazar",
        name: "Moulvibazar",
        bnName: "মৌলভীবাজার",
        divisionId: "sylhet",
        upazilas: [
          { id: "moulvibazar-sadar", name: "Moulvibazar Sadar", bnName: "মৌলভীবাজার সদর" },
          { id: "barlekha", name: "Barlekha", bnName: "বড়লেখা" },
          { id: "kamalganj", name: "Kamalganj", bnName: "কমলগঞ্জ" },
          { id: "kulaura", name: "Kulaura", bnName: "কুলাউড়া" },
          { id: "rajanagar", name: "Rajnagar", bnName: "রাজনগর" },
          { id: "sreemangal", name: "Sreemangal", bnName: "শ্রীমঙ্গল" },
          { id: "juri", name: "Juri", bnName: "জুড়ী" },
        ]
      },
      {
        id: "habiganj",
        name: "Habiganj",
        bnName: "হবিগঞ্জ",
        divisionId: "sylhet",
        upazilas: [
          { id: "habiganj-sadar", name: "Habiganj Sadar", bnName: "হবিগঞ্জ সদর" },
          { id: "ajmiriganj", name: "Ajmiriganj", bnName: "আজমিরীগঞ্জ" },
          { id: "bahubal", name: "Bahubal", bnName: "বাহুবল" },
          { id: "baniyachong", name: "Baniyachong", bnName: "বানিয়াচং" },
          { id: "chunarughat", name: "Chunarughat", bnName: "চুনারুঘাট" },
          { id: "lakhai", name: "Lakhai", bnName: "লাখাই" },
          { id: "madhabpur", name: "Madhabpur", bnName: "মাধবপুর" },
          { id: "nabiganj", name: "Nabiganj", bnName: "নবীগঞ্জ" },
          { id: "shayestaganj", name: "Shayestaganj", bnName: "শায়েস্তাগঞ্জ" },
        ]
      },
      {
        id: "sunamganj",
        name: "Sunamganj",
        bnName: "সুনামগঞ্জ",
        divisionId: "sylhet",
        upazilas: [
          { id: "sunamganj-sadar", name: "Sunamganj Sadar", bnName: "সুনামগঞ্জ সদর" },
          { id: "bishwamvarpur", name: "Bishwamvarpur", bnName: "বিশ্বম্ভরপুর" },
          { id: "chhatak", name: "Chhatak", bnName: "ছাতক" },
          { id: "derai", name: "Derai", bnName: "দেরাই" },
          { id: "dharmapasha", name: "Dharmapasha", bnName: "ধর্মপাশা" },
          { id: "dowarabazar", name: "Dowarabazar", bnName: "দোয়ারাবাজার" },
          { id: "jagannathpur", name: "Jagannathpur", bnName: "জগন্নাথপুর" },
          { id: "jamalganj", name: "Jamalganj", bnName: "জামালগঞ্জ" },
          { id: "shantiganj", name: "Shantiganj", bnName: "শান্তিগঞ্জ" },
          { id: "tahirpur", name: "Tahirpur", bnName: "তাহিরপুর" },
        ]
      },
    ]
  },
  {
    id: "rangpur",
    name: "Rangpur",
    bnName: "রংপুর",
    districts: [
      {
        id: "rangpur",
        name: "Rangpur",
        bnName: "রংপুর",
        divisionId: "rangpur",
        upazilas: [
          { id: "rangpur-sadar", name: "Rangpur Sadar", bnName: "রংপুর সদর" },
          { id: "badarganj", name: "Badarganj", bnName: "বদরগঞ্জ" },
          { id: "gangachhara", name: "Gangachhara", bnName: "গংগাচড়া" },
          { id: "kaunia", name: "Kaunia", bnName: "কাউনিয়া" },
          { id: "mithapukur", name: "Mithapukur", bnName: "মিঠাপুকুর" },
          { id: "pirgachha", name: "Pirgachha", bnName: "পীরগাছা" },
          { id: "pirganj", name: "Pirganj", bnName: "পীরগঞ্জ" },
          { id: "taraganj", name: "Taraganj", bnName: "তারাগঞ্জ" },
        ]
      },
      {
        id: "dinajpur",
        name: "Dinajpur",
        bnName: "দিনাজপুর",
        divisionId: "rangpur",
        upazilas: [
          { id: "dinajpur-sadar", name: "Dinajpur Sadar", bnName: "দিনাজপুর সদর" },
          { id: "birampur", name: "Birampur", bnName: "বিরামপুর" },
          { id: "birganj", name: "Birganj", bnName: "বীরগঞ্জ" },
          { id: "bochaganj", name: "Bochaganj", bnName: "বোচাগঞ্জ" },
          { id: "fulbari", name: "Fulbari", bnName: "ফুলবাড়ী" },
          { id: "ghoraghat", name: "Ghoraghat", bnName: "ঘোড়াঘাট" },
          { id: "hakimpur", name: "Hakimpur", bnName: "হাকিমপুর" },
          { id: "kaharole", name: "Kaharole", bnName: "কাহারোল" },
          { id: "khansama", name: "Khansama", bnName: "খানসামা" },
          { id: "nawabganj", name: "Nawabganj", bnName: "নবাবগঞ্জ" },
          { id: "parbatipur", name: "Parbatipur", bnName: "পার্বতীপুর" },
        ]
      },
      {
        id: "gaibandha",
        name: "Gaibandha",
        bnName: "গাইবান্ধা",
        divisionId: "rangpur",
        upazilas: [
          { id: "gaibandha-sadar", name: "Gaibandha Sadar", bnName: "গাইবান্ধা সদর" },
          { id: "fulchhari", name: "Fulchhari", bnName: "ফুলছড়ি" },
          { id: "govindaganj", name: "Govindaganj", bnName: "গোবিন্দগঞ্জ" },
          { id: "palashbari", name: "Palashbari", bnName: "পলাশবাড়ী" },
          { id: "sadullapur", name: "Sadullapur", bnName: "সাদুল্লাপুর" },
          { id: "saghata", name: "Saghata", bnName: "সাঘাটা" },
          { id: "sundarganj", name: "Sundarganj", bnName: "সুন্দরগঞ্জ" },
        ]
      },
      {
        id: "kurigram",
        name: "Kurigram",
        bnName: "কুড়িগ্রাম",
        divisionId: "rangpur",
        upazilas: [
          { id: "kurigram-sadar", name: "Kurigram Sadar", bnName: "কুড়িগ্রাম সদর" },
          { id: "bhurungamari", name: "Bhurungamari", bnName: "ভুরুঙ্গামারী" },
          { id: "char-rajibpur", name: "Char Rajibpur", bnName: "চর রাজিবপুর" },
          { id: "chilmari", name: "Chilmari", bnName: "চিলমারী" },
          { id: "phulbari", name: "Phulbari", bnName: "ফুলবাড়ী" },
          { id: "nageshwari", name: "Nageshwari", bnName: "নাগেশ্বরী" },
          { id: "rajarhat", name: "Rajarhat", bnName: "রাজারহাট" },
          { id: "roumari", name: "Roumari", bnName: "রৌমারী" },
          { id: "ulipur", name: "Ulipur", bnName: "উলিপুর" },
        ]
      },
      {
        id: "lalmonirhat",
        name: "Lalmonirhat",
        bnName: "লালমনিরহাট",
        divisionId: "rangpur",
        upazilas: [
          { id: "lalmonirhat-sadar", name: "Lalmonirhat Sadar", bnName: "লালমনিরহাট সদর" },
          { id: "aditmari", name: "Aditmari", bnName: "আদিতমারী" },
          { id: "hatibandha", name: "Hatibandha", bnName: "হাতীবান্ধা" },
          { id: "kaliganj", name: "Kaliganj", bnName: "কালীগঞ্জ" },
          { id: "patgram", name: "Patgram", bnName: "পাটগ্রাম" },
        ]
      },
      {
        id: "nilphamari",
        name: "Nilphamari",
        bnName: "নীলফামারী",
        divisionId: "rangpur",
        upazilas: [
          { id: "nilphamari-sadar", name: "Nilphamari Sadar", bnName: "নীলফামারী সদর" },
          { id: "dimla", name: "Dimla", bnName: "ডিমলা" },
          { id: "domar", name: "Domar", bnName: "ডোমার" },
          { id: "jaldhaka", name: "Jaldhaka", bnName: "জলঢাকা" },
          { id: "kishoreganj", name: "Kishoreganj", bnName: "কিশোরগঞ্জ" },
          { id: "syedpur", name: "Syedpur", bnName: "সৈয়দপুর" },
        ]
      },
      {
        id: "panchagarh",
        name: "Panchagarh",
        bnName: "পঞ্চগড়",
        divisionId: "rangpur",
        upazilas: [
          { id: "panchagarh-sadar", name: "Panchagarh Sadar", bnName: "পঞ্চগড় সদর" },
          { id: "atwari", name: "Atwari", bnName: "আটোয়ারী" },
          { id: "boda", name: "Boda", bnName: "বোদা" },
          { id: "debiganj", name: "Debiganj", bnName: "দেবীগঞ্জ" },
          { id: "tetulia", name: "Tetulia", bnName: "তেঁতুলিয়া" },
        ]
      },
      {
        id: "thakurgaon",
        name: "Thakurgaon",
        bnName: "ঠাকুরগাঁও",
        divisionId: "rangpur",
        upazilas: [
          { id: "thakurgaon-sadar", name: "Thakurgaon Sadar", bnName: "ঠাকুরগাঁও সদর" },
          { id: "baliadangi", name: "Baliadangi", bnName: "বালিয়াডাঙ্গী" },
          { id: "haripur", name: "Haripur", bnName: "হরিপুর" },
          { id: "pirganj", name: "Pirganj", bnName: "পীরগঞ্জ" },
          { id: "ranisankail", name: "Ranisankail", bnName: "রাণীশংকৈল" },
        ]
      },
    ]
  },
  {
    id: "mymensingh",
    name: "Mymensingh",
    bnName: "ময়মনসিংহ",
    districts: [
      {
        id: "mymensingh",
        name: "Mymensingh",
        bnName: "ময়মনসিংহ",
        divisionId: "mymensingh",
        upazilas: [
          { id: "mymensingh-sadar", name: "Mymensingh Sadar", bnName: "ময়মনসিংহ সদর" },
          { id: "bhaluka", name: "Bhaluka", bnName: "ভালুকা" },
          { id: "dhobaura", name: "Dhobaura", bnName: "ধোবাউড়া" },
          { id: "fulbaria", name: "Fulbaria", bnName: "ফুলবাড়িয়া" },
          { id: "gaffargaon", name: "Gaffargaon", bnName: "গফরগাঁও" },
          { id: "gauripur", name: "Gauripur", bnName: "গৌরীপুর" },
          { id: "haluaghat", name: "Haluaghat", bnName: "হালুয়াঘাট" },
          { id: "iswarganj", name: "Ishwarganj", bnName: "ঈশ্বরগঞ্জ" },
          { id: "muktagachha", name: "Muktagachha", bnName: "মুক্তাগাছা" },
          { id: "nandail", name: "Nandail", bnName: "নান্দাইল" },
          { id: "phulpur", name: "Phulpur", bnName: "ফুলপুর" },
          { id: "trishal", name: "Trishal", bnName: "ত্রিশাল" },
          { id: "tarakanda", name: "Tarakanda", bnName: "তারাকান্দা" },
        ]
      },
      {
        id: "jamalpur",
        name: "Jamalpur",
        bnName: "জামালপুর",
        divisionId: "mymensingh",
        upazilas: [
          { id: "jamalpur-sadar", name: "Jamalpur Sadar", bnName: "জামালপুর সদর" },
          { id: "bakshiganj", name: "Bakshiganj", bnName: "বকশীগঞ্জ" },
          { id: "dewanganj", name: "Dewanganj", bnName: "দেওয়ানগঞ্জ" },
          { id: "isampur", name: "Islampur", bnName: "ইসলামপুর" },
          { id: "madarganj", name: "Madarganj", bnName: "মাদারগঞ্জ" },
          { id: "melandaha", name: "Melandaha", bnName: "মেলান্দহ" },
          { id: "sarishabari", name: "Sarishabari", bnName: "সরিষাবাড়ী" },
        ]
      },
      {
        id: "netrokona",
        name: "Netrokona",
        bnName: "নেত্রকোণা",
        divisionId: "mymensingh",
        upazilas: [
          { id: "netrokona-sadar", name: "Netrokona Sadar", bnName: "নেত্রকোণা সদর" },
          { id: "atpara", name: "Atpara", bnName: "আটপাড়া" },
          { id: "barhatta", name: "Barhatta", bnName: "বারহাট্টা" },
          { id: "durgapur", name: "Durgapur", bnName: "দুর্গাপুর" },
          { id: "khaliajuri", name: "Khaliajuri", bnName: "খালিয়াজুড়ী" },
          { id: "kalmakanda", name: "Kalmakanda", bnName: "কলমাকান্দা" },
          { id: "kendua", name: "Kendua", bnName: "কেন্দুয়া" },
          { id: "madan", name: "Madan", bnName: "মদন" },
          { id: "mohangonj", name: "Mohanganj", bnName: "মোহনগঞ্জ" },
          { id: "purbadhala", name: "Purbadhala", bnName: "পূর্বধলা" },
        ]
      },
      {
        id: "sherpur",
        name: "Sherpur",
        bnName: "শেরপুর",
        divisionId: "mymensingh",
        upazilas: [
          { id: "sherpur-sadar", name: "Sherpur Sadar", bnName: "শেরপুর সদর" },
          { id: "jhinaigati", name: "Jhinaigati", bnName: "ঝিনাইগাতী" },
          { id: "nakla", name: "Nakla", bnName: "নকলা" },
          { id: "nalitabari", name: "Nalitabari", bnName: "নালিতাবাড়ী" },
          { id: "sreebardi", name: "Sreebardi", bnName: "শ্রীবরদী" },
        ]
      },
    ]
  }
];

export const getAllDistricts = (): District[] => {
  return BANGLADESH_DIVISIONS.flatMap(d => d.districts);
};

export const getDistrictById = (id: string): District | undefined => {
  return getAllDistricts().find(d => d.id === id);
};

export const getDivisionById = (id: string): Division | undefined => {
  return BANGLADESH_DIVISIONS.find(d => d.id === id);
};

export const getDistrictsByDivision = (divisionId: string): District[] => {
  const division = getDivisionById(divisionId);
  return division ? division.districts : [];
};

export const getUpazilasByDistrict = (districtId: string): Upazila[] => {
  const district = getDistrictById(districtId);
  return district ? district.upazilas : [];
};
