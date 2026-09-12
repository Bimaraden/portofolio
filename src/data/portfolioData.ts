import { Project, ServiceItem } from '../types';
import heroCharacter from '../assets/images/real.jpg';
import heroCharacterCutout from '../assets/images/animasi.png';
import projectSmartClapLamp from '../assets/images/no.png';
import projectIotGiftBox from '../assets/images/no.png';
import projectDeeptalkWeb from '../assets/images/deeptalk.png';
import projectN8nWorkflows from '../assets/images/no.png';

export const HERO_ASSET = heroCharacterCutout;
export const HERO_CHARACTER_ORIGINAL = heroCharacter;
export const HERO_CHARACTER_CUTOUT = heroCharacterCutout;

export const PROJECTS: Project[] = [
  {
    id: 'smart-clap-lamp',
    title: 'Smart Clap Lamp (Acoustic IoT)',
    subtitle: 'Sistem kendali lampu pintar responsif berbasis sensor suara tepukan tangan & mikrokontroler',
    category: 'IoT & Hardware',
    year: '2024',
    client: 'Proyek Mandiri / IoT Prototype',
    role: 'IoT Developer & Hardware Builder',
    deliverables: [
      'Rangkaian Sensor Suara Akustik Terkalibrasi',
      'Firmware Deteksi Tepukan dengan Debounce Filter',
      'Modul Relay Safe Isolation AC 220V',
      'Enclosure Lampu Meja Ergonomis & Touchless Control'
    ],
    description: 'Proyek perangkat keras IoT yang memungkinkan lampu meja menyala dan mati secara instan hanya dengan tepukan tangan. Mengintegrasikan sensor mikrofon sensitivitas tinggi dengan logika debounce mikrodetik pada mikrokontroler untuk memfilter false-positive dari kebisingan ruangan.',
    concept: 'Menghadirkan interaksi fisik tanpa sentuhan (touchless physical interaction) yang andal dan aman, memanfaatkan modul relay terisolasi untuk switching beban listrik dengan waktu respons di bawah 50ms.',
    palette: ['#173C32', '#E8E4D8', '#111111', '#C8C1B2'],
    coverImage: projectSmartClapLamp,
    galleryImages: [projectSmartClapLamp, projectIotGiftBox, projectDeeptalkWeb],
    featured: true
  },
  {
    id: 'iot-gift-box',
    title: 'Interactive IoT Birthday Gift',
    subtitle: 'Kado personal interaktif berbasis Arduino & display LCD 16x2 dengan animasi custom 8-bit',
    category: 'IoT & Hardware',
    year: '2024',
    client: 'Personal Gift Commission',
    role: 'Embedded Programmer & Physical Computing',
    deliverables: [
      'Custom 8-Bit Pixel Character Generator (CGRAM)',
      'State Machine Animasi Interaktif pada LCD 16x2',
      'Buzzer Melodi Nada Chiptune Ulang Tahun',
      'Integrasi Casing Kayu & Akrilik Portabel'
    ],
    description: 'Hadiah fisik interaktif berbasis Arduino Nano dan LCD 16x2 I2C yang dirancang khusus untuk kado ulang tahun berkesan. Menampilkan serangkaian animasi frame-by-frame 8-bit kustom (kue ulang tahun dengan lilin berkedip, teks berjalan, dan confetti pixel) diiringi melodi nada chiptune 8-bit.',
    concept: 'Menggabungkan sentuhan kerajinan personal dengan physical computing. Karakter matriks kustom (custom glyphs) dibuat langsung di memori CGRAM LCD untuk menciptakan ilusi animasi hidup dalam keterbatasan display alfanumerik.',
    palette: ['#173C32', '#E8E4D8', '#111111', '#C8C1B2'],
    coverImage: projectIotGiftBox,
    galleryImages: [projectIotGiftBox, projectSmartClapLamp, projectDeeptalkWeb],
    featured: true
  },
  {
    id: 'deeptalk-web',
    title: 'DeepTalk — Ambient Chat Space',
    subtitle: 'Aplikasi web perpesanan intim real-time dengan pemutar musik ambient & audio wave terintegrasi',
    category: 'Full Stack Web',
    year: '2024',
    client: 'Independent Web Product',
    role: 'Full Stack Developer & UI Designer',
    deliverables: [
      'Real-Time WebSocket Messaging Engine',
      'Integrated Synchronized Ambient Lo-Fi Player',
      'Responsive Warm Editorial Minimalist UI',
      'Zero-Distraction Layout & Session Privacy'
    ],
    description: 'Platform percakapan web yang dirancang khusus untuk percakapan mendalam dan intim (deep talk). Dilengkapi dengan pemutar musik latar ambient lo-fi / binaural beats tersinkronisasi, antarmuka minimalis bebas distraksi, dan gelembung obrolan yang hangat.',
    concept: 'Mengubah chat dari sekadar bertukar teks biasa menjadi pengalaman emosional yang menenangkan. Musik diputar serempak di kedua sisi percakapan untuk menciptakan atmosfer ruang bersama (shared sonic space) meskipun terpisah jarak fisik.',
    palette: ['#173C32', '#111111', '#E8E4D8', '#C8C1B2'],
    coverImage: projectDeeptalkWeb,
    galleryImages: [projectDeeptalkWeb, projectN8nWorkflows, projectSmartClapLamp],
    featured: true
  },
  {
    id: 'n8n-edu-automation',
    title: 'n8n Academic & UTBK Automation Suite',
    subtitle: 'Orkestrasi alur kerja n8n otomatis untuk agregasi bank soal UTBK/TKA dan generator kerangka esai ilmiah',
    category: 'Otomasi n8n',
    year: '2025',
    client: 'EdTech & Research Productivity',
    role: 'Automation Architect & Workflow Engineer',
    deliverables: [
      'Web Scraper & API Agregator Bank Soal UTBK/TKA',
      'AI Prompt Engineering untuk Kerangka Esai Ilmiah',
      'Automated Google Sheets & Notion Sync Pipeline',
      'Webhook Bot Delivery via Telegram / WhatsApp'
    ],
    description: 'Dua ekosistem otomasi n8n berkinerja tinggi: (1) Workflow penambang & kurasi soal latihan TKA dan UTBK dari berbagai repositori akademik secara berkala lengkap dengan pembahasan, dan (2) Workflow generator kerangka esai ilmiah berstandar akademis yang memetakan rumusan masalah, metodologi, dan telaah literatur secara otomatis.',
    concept: 'Mengeliminasi jam-jam riset manual mahasiswa dan pelajar dengan menyambungkan webhook, node logika kondisi, modul ekstraksi data, dan model bahasa AI ke dalam pipeline n8n yang berjalan 24/7 tanpa henti di server mandiri.',
    palette: ['#173C32', '#E8E4D8', '#111111', '#C8C1B2'],
    coverImage: projectN8nWorkflows,
    galleryImages: [projectN8nWorkflows, projectDeeptalkWeb, projectIotGiftBox],
    featured: true
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    number: '01',
    title: 'Pengembangan Web',
    tagline: 'Membangun aplikasi web modern, responsif, dan fungsional dengan antarmuka yang bersih.',
    description: 'Fokus pada pembangunan antarmuka web interaktif menggunakan React, TypeScript, dan Tailwind CSS, didukung backend Node.js serta integrasi Supabase dan Firebase.',
    deliverables: ['Aplikasi Web Interaktif (React & TS)', 'Integrasi Database Supabase & Firebase', 'Sistem Perpesanan Web (WebSocket)', 'Desain Antarmuka Responsif (Tailwind CSS)'],
    idealFor: 'Aplikasi web mandiri, web personal/portofolio, web chat, dan sistem interaktif.',
    timeline: '1–2 minggu per proyek'
  },
  {
    number: '02',
    title: 'Otomasi Alur Kerja (n8n Workflow)',
    tagline: 'Membangun alur kerja n8n praktis berdasarkan kebutuhan nyata dan pemecahan masalah langsung.',
    description: 'Menyusun alur kerja otomasi n8n yang fokus pada kegunaan nyata: agregasi dan penambangan bank soal UTBK/TKA, serta otomasi generator kerangka esai ilmiah berbantuan AI dan Google Sheets.',
    deliverables: ['Workflow Otomasi n8n Berbasis Kebutuhan', 'Scraping & Agregasi Bank Soal UTBK/TKA', 'Generator Kerangka Esai Ilmiah (AI Prompt)', 'Integrasi Webhook & Google Sheets Sync'],
    idealFor: 'Pelajar, tim edukasi, penelitian mandiri, dan penghematan waktu tugas repetitif.',
    timeline: '3–5 hari kerja'
  },
  {
    number: '03',
    title: 'IoT & Proyek Arduino',
    tagline: 'Eksplorasi physical computing dan mikrokontroler berbasis proyek nyata pemula.',
    description: 'Perakitan perangkat keras menggunakan mikrokontroler Arduino Nano, kalibrasi sensor suara untuk kendali saklar lampu tepuk, sensor suhu, dan pemrograman animasi teks pada display LCD 16x2.',
    deliverables: ['Firmware Arduino Nano (C / C++)', 'Sistem Smart Lamp Sensor Suara Akustik', 'Rangkaian Sensor Suhu & Display LCD 16x2', 'Modul Relay Safe Isolation AC 220V'],
    idealFor: 'Prototipe otomasi rumah sederhana, kado interaktif personal, dan eksperimen sensor fisik.',
    timeline: '1–2 minggu'
  },
  {
    number: '04',
    title: 'Implementasi & Pemecahan Masalah',
    tagline: 'Membangun solusi teknologi berbasis eksperimen nyata dan belajar dari proyek yang berhasil dibuat.',
    description: 'Penyusunan solusi terpadu antara antarmuka web, penyimpanan data cloud (Supabase/Firebase), alur kerja n8n, dan logika mikrokontroler Arduino.',
    deliverables: ['Integrasi Antarmuka ke Database Cloud', 'Konfigurasi Webhook & Alur Data', 'Dokumentasi Rangkaian & Skematik Arduino', 'Pengujian Lapangan Proyek Fisik'],
    idealFor: 'Kebutuhan solusi praktis yang menggabungkan web, otomasi dokumen, dan modul mikrokontroler.',
    timeline: 'Fleksibel sesuai skala'
  }
];

export const CLIENT_ROSTER = [
  'TypeScript',
  'React.js',
  'Tailwind CSS',
  'Node.js',
  'Supabase',
  'Firebase',
  'n8n Workflow',
  'Arduino Nano',
  'Sensor Suara (Clap)',
  'Sensor Suhu',
  'Display LCD 16x2',
  'WebSockets'
];

