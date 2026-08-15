require('dotenv').config();
const mongoose = require('mongoose');
const Content = require('./models/Content');

const seedData = [
  {
    title: 'Manfaat Sarapan Sehat untuk Produktivitas Harian',
    type: 'artikel',
    category: 'gizi_seimbang',
    body: 'Sarapan sering kali disebut sebagai waktu makan paling penting dalam sehari, dan bukan tanpa alasan. Setelah tidur semalaman, tubuh Anda berada dalam kondisi berpuasa, dan sarapan bertindak sebagai bahan bakar pertama untuk mengembalikan kadar glukosa darah serta metabolisme tubuh agar kembali optimal.\n\nPenelitian di bidang nutrisi klinis menunjukkan bahwa individu yang rutin mengonsumsi sarapan bergizi seimbang memiliki tingkat konsentrasi yang jauh lebih tajam, stabilitas emosi atau mood yang lebih baik, serta peningkatan produktivitas kerja maupun akademik hingga 20 persen dibandingkan mereka yang melewatkan sarapan.\n\nPilihan menu sarapan yang ideal harus memadukan unsur karbohidrat kompleks, protein berkualitas tinggi, serta lemak sehat. Contoh kombinasi terbaik meliputi semangkuk oatmeal hangat dengan taburan chia seeds dan potongan buah segar, telur orak-arik bersama aneka sayuran tumis, yogurt Yunani murni dengan madu alami, atau smoothie hijau bernutrisi tinggi.\n\nSebaliknya, hindari jenis sarapan instan yang tinggi akan kandungan gula rafinasi atau tepung olahan. Makanan manis di pagi hari cenderung memicu lonjakan gula darah yang drastis, yang nantinya akan diikuti oleh penurunan energi secara cepat menjelang siang hari, membuat tubuh terasa lemas dan mengantuk.\n\nJadikan waktu 10 hingga 15 menit di pagi hari sebagai investasi jangka panjang untuk kesehatan fisik dan mental Anda dengan menyiapkan sarapan sehat yang kaya nutrisi.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop'
  },
  {
    title: 'Panduan Yoga Pagi 15 Menit untuk Pemula',
    type: 'video',
    category: 'olahraga',
    body: 'https://www.youtube.com/embed/Y8vJqiePu1I',
    description: 'Yoga pagi adalah salah satu cara paling efektif dan menenangkan untuk membangunkan tubuh dari istirahat malam, meredakan ketegangan otot yang kaku, serta menjernihkan pikiran sebelum memulai kesibukan harian.\n\nDalam sesi video panduan berdurasi 15 menit ini, Anda akan dipandu melalui rangkaian gerakan yang dirancang ramah pemula namun berdampak besar bagi fleksibilitas tubuh. Rangkaian gerakan meliputi:\n1. Child\'s Pose (2 menit) — untuk menenangkan sistem saraf dan meregangkan punggung.\n2. Cat-Cow Stretch (2 menit) — melenturkan tulang belakang dan meredakan nyeri leher.\n3. Downward-Facing Dog (3 menit) — memperkuat otot bahu dan meregangkan otot kaki belakang.\n4. Warrior I & II Sequence (4 menit) — membangun kekuatan kaki dan meningkatkan keseimbangan tubuh.\n5. Savasana Relaksasi (4 menit) — menyatukan kembali ritme pernapasan dan mengembalikan ketenangan batin.\n\nLakukan rutinitas ini secara konsisten setiap pagi selama 21 hari berturut-turut untuk merasakan perubahan nyata: tubuh menjadi lebih fleksibel, postur tubuh membaik, nyeri sendi mereda, dan tingkat stres harian berkurang drastis.\n\nIngatlah bahwa yoga bukanlah tentang seberapa lentur tubuh Anda, melainkan tentang kesadaran menyatukan gerak fisik dengan kedalaman napas.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop'
  },
  {
    title: 'Hidrasi Optimal: Berapa Gelas Air yang Dibutuhkan?',
    type: 'infografis',
    category: 'gizi_seimbang',
    body: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=1000&h=1200&fit=crop',
    description: 'Air adalah komponen esensial yang menyusun sekitar 60% dari total berat tubuh orang dewasa. Setiap sel, jaringan, dan organ vital di dalam tubuh kita sangat bergantung pada kecukupan cairan agar dapat berfungsi dengan baik dan efisien.\n\nBerdasarkan standar anjuran kesehatan umum dari Organisasi Kesehatan Dunia (WHO), rata-rata orang dewasa disarankan untuk mengonsumsi air sekitar 8 gelas (atau setara dengan 2 liter) per hari. Namun, angka ini bersifat fleksibel dan dapat meningkat drastis hingga 3 hingga 4 liter sehari tergantung pada berat badan, tingkat aktivitas fisik, kondisi cuaca, serta status kesehatan individu.\n\nTanda-tanda awal bahwa tubuh Anda mengalami dehidrasi ringan meliputi:\n• Perubahan warna urin menjadi lebih gelap pekat.\n• Bibir kering dan pecah-pecah.\n• Sering merasakan sakit kepala atau migrain ringan.\n• Penurunan tingkat fokus dan kesulitan berkonsentrasi saat bekerja.\n\nTips praktis membangun kebiasaan hidrasi: selalu letakkan botol air minum di meja kerja Anda, mulailah pagi hari dengan minum segelas air putih hangat sesaat setelah bangun tidur, dan manfaatkan aplikasi pengingat minum di ponsel pintar Anda.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&h=600&fit=crop'
  },
  {
    title: 'Tidur Berkualitas: Rahasia Pemulihan Tubuh Optimal',
    type: 'artikel',
    category: 'pencegahan_penyakit',
    body: 'Tidur sering kali dianggap sepele dan dikorbankan demi mengejar produktivitas lembur atau tugas kuliah. Padahal, tidur malam yang berkualitas (antara 7 hingga 8 jam setiap malam) adalah pilar utama penopang kesehatan fisik dan mental jangka panjang.\n\nKetika Anda memasuki fase tidur pulas, tubuh tidak benar-benar pasif. Sebaliknya, saat itulah otak melakukan proses pembersihan racun metabolik, sel-sel otot memperbaiki jaringannya yang rusak, sistem kekebalan tubuh memproduksi antibodi pelindung, dan memori jangka pendek dikonsolidasikan menjadi memori jangka panjang.\n\nKurang tidur kronis terbukti secara medis dapat memicu berbagai gangguan kesehatan serius, mulai dari penurunan sistem imun, peningkatan risiko obesitas akibat gangguan hormon ghrelin dan leptin, resistensi insulin pemicu diabetes tipe 2, hingga gangguan suasana hati seperti kecemasan berlebihan.\n\nUntuk mendapatkan kualitas tidur yang sempurna, terapkan kebiasaan sleep hygiene yang disiplin: matikan layar gawai minimal satu jam sebelum tidur, atur suhu kamar agar terasa sejuk, hindari konsumsi kafein atau makanan berat menjelang malam, dan ciptakan suasana kamar yang gelap gulita.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=800&h=600&fit=crop'
  },
  {
    title: 'HIIT 20 Menit: Bakar Kalori Maksimal di Rumah',
    type: 'video',
    category: 'olahraga',
    body: 'https://www.youtube.com/embed/gFP2_L2E6SA',
    description: 'Bagi Anda yang memiliki jadwal harian sangat padat namun tetap berkeinginan memiliki kebugaran fisik yang prima, High-Intensity Interval Training (HIIT) adalah jawaban paling sempurna tanpa perlu menghabiskan waktu berjam-jam di pusat kebugaran.\n\nSesi latihan HIIT memadukan gerakan kardio dan kekuatan intensitas tinggi dalam interval waktu pendek (misalnya 40 detik gerakan penuh tenaga, diselingi 20 detik istirahat aktif). Rangkaian gerakannya meliputi jumping jacks, burpees, mountain climbers, dan bodyweight squats.\n\nKeunggulan terbesar dari metode HIIT adalah fenomena fisiologis yang disebut EPOC (Excess Post-Exercise Oxygen Consumption) atau efek "afterburn". Fenomena ini membuat tubuh Anda terus menerus membakar kalori ekstra bahkan selama berjam-jam setelah sesi latihan selesai.\n\nPastikan Anda selalu melakukan sesi pemanasan (warm-up) ringan selama 3-5 menit sebelum memulai sesi utama guna mencegah risiko kram atau cedera otot, serta lakukan pendinginan di akhir sesi.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=600&fit=crop'
  },
  {
    title: 'Meditasi Mindfulness: 5 Teknik Mengurangi Stres',
    type: 'artikel',
    category: 'kesehatan_mental',
    body: 'Tekanan hidup modern, beban akademik, serta hiruk-pikuk kesibukan sering kali membuat pikiran kita terjebak dalam lingkaran kecemasan tanpa ujung. Meditasi mindfulness (kesadaran penuh) hadir sebagai teknik melatih pikiran untuk kembali berakar pada saat ini.\n\nMindfulness bukan berarti mengosongkan pikiran dari segala hal, melainkan belajar mengamati setiap pikiran, emosi, dan sensasi fisik yang muncul tanpa memberikan penghakiman atau reaksi berlebihan.\n\n5 Teknik Dasar Praktik Mindfulness Harian:\n1. Pernapasan Perut Sadar: Fokuskan seluruh perhatian pada aliran udara yang masuk dan keluar melalui hidung.\n2. Body Scan: Memindai sensasi fisik dari ujung jari kaki secara perlahan hingga ke puncak kepala.\n3. Mindful Walking: Berjalan kaki secara perlahan sambil merasakan setiap gesekan telapak kaki dengan permukaan lantai.\n4. Melepaskan Pikiran: Membayangkan pikiran negatif berlalu begitu saja bagaikan awan yang dibawa angin.\n5. Gratitude Journaling: Menuliskan tiga hal kecil yang Anda syukuri setiap menjelang tidur malam.\n\nHanya dengan meluangkan waktu 5 hingga 10 menit setiap hari, teknik ini terbukti ampuh menurunkan hormon kortisol pemicu stres.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop'
  },
  {
    title: 'Pola Makan Anti-Inflamasi untuk Kesehatan Jangka Panjang',
    type: 'artikel',
    category: 'gizi_seimbang',
    body: 'Peradangan atau inflamasi kronis tingkat rendah di dalam tubuh sering kali bertindak sebagai "api dalam sekam" yang menjadi akar penyebab berbagai penyakit degeneratif mematikan seperti penyakit jantung koroner, diabetes, gangguan autoimun, hingga penurunan fungsi otak.\n\nMengubah haluan ke pola makan anti-inflamasi merupakan langkah preventif medis paling bijak yang dapat Anda ambil mulai hari ini. Konsep utamanya sederhana: meminimalkan makanan pemicu radang dan memperbanyak asupan makanan alami yang kaya zat antioksidan serta agen penyembuh.\n\nKomponen Utama Pola Makan Anti-Inflamasi:\n• Buah-buahan segar berwarna cerah: terutama golongan buah beri (strawberry, blueberry, raspberry).\n• Sumber lemak sehat: alpukat, minyak zaitun murni extra virgin, serta kacang-kacangan.\n• Ikan berlemak tinggi Omega-3: salmon, sarden, dan makarel.\n• Sayuran hijau kaya serat: bayam, brokoli, kale, serta bumbu dapur seperti kunyit dan bawang putih.\n\nSebaliknya, batasi atau hindari konsumsi gula pasir olahan, tepung terigu putih, daging olahan berpengawet, serta minyak goreng trans yang terbukti memicu respons peradangan sistemik.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=600&fit=crop'
  },
  {
    title: 'Stretching Malam Hari untuk Tidur Lebih Nyenyak',
    type: 'video',
    category: 'pencegahan_penyakit',
    body: 'https://www.youtube.com/embed/GDe8KQ2EVQM',
    description: 'Setelah seharian penuh beraktivitas, duduk berjam-jam di depan layar komputer, atau berdiri melakukan mobilitas tinggi, otot-otot tubuh biasanya berada dalam kondisi tegang, kaku, dan memendek.\n\nKetegangan fisik yang terbawa hingga ke tempat tidur merupakan salah satu penyebab utama mengapa seseorang sulit memasuki fase tidur pulas atau sering terbangun di tengah malam. Rutinitas peregangan (stretching) malam hari selama 10 menit adalah solusi instan untuk merilekskan sistem otot.\n\nVideo panduan ini memuat serangkaian gerakan peregangan lembut dan statis yang dirancang aman serta sangat nyaman dilakukan di atas matras kamar tidur atau langsung di atas kasur Anda.\n\nFokus utama gerakan diarahkan pada pelepasan ketegangan di area otot leher, bahu, punggung bawah, dan pinggul. Gerakan lambat ini juga membantu mengirimkan sinyal ke otak bahwa hari telah usai, sehingga detak jantung menurun dan tubuh siap memasuki fase istirahat lelap.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop'
  }
];

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Terhubung ke MongoDB');

    await Content.deleteMany({});
    console.log('Data konten lama dihapus');

    await Content.insertMany(seedData);
    console.log(`${seedData.length} konten berhasil ditambahkan`);

    process.exit(0);
  } catch (err) {
    console.error('Gagal seed data:', err.message);
    process.exit(1);
  }
};

runSeed();