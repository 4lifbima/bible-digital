// Daily reflections data
export const reflections = [
    {
        id: 1,
        date: '2026-01-04',
        title: 'Percaya dalam Ketidakpastian',
        verse: {
            book: 'Amsal',
            chapter: 3,
            verses: '5-6',
            text: 'Percayalah kepada TUHAN dengan segenap hatimu, dan janganlah bersandar kepada pengertianmu sendiri. Akuilah Dia dalam segala lakumu, maka Ia akan meluruskan jalanmu.'
        },
        content: `Di tengah ketidakpastian hidup, kita sering merasa perlu mengendalikan segalanya. Namun ayat ini mengingatkan kita untuk menyerahkan kendali kepada Tuhan.

Percaya kepada Tuhan bukan berarti pasif, melainkan aktif menyerahkan setiap langkah kita kepada-Nya. Ketika kita mengakui Dia dalam segala laku kita, kita mengundang hikmat-Nya untuk memimpin keputusan kita.

Hari ini, cobalah untuk melepaskan kekhawatiran dan mempercayakan setiap rencana kepada Tuhan. Ia yang tahu jalan terbaik bagi hidupmu.`,
        prayer: 'Ya Tuhan, ajar aku untuk percaya kepada-Mu sepenuhnya. Tolong aku untuk tidak mengandalkan pengertianku sendiri, melainkan selalu mengakui-Mu dalam segala aspek hidupku. Amin.'
    },
    {
        id: 2,
        date: '2026-01-03',
        title: 'Kekuatan dalam Kelemahan',
        verse: {
            book: 'Yesaya',
            chapter: 40,
            verse: 31,
            text: 'Tetapi orang-orang yang menanti-nantikan TUHAN mendapat kekuatan baru: mereka seumpama rajawali yang naik terbang dengan kekuatan sayapnya; mereka berlari dan tidak menjadi lesu, mereka berjalan dan tidak menjadi lelah.'
        },
        content: `Apakah kamu merasa lelah dan kehabisan tenaga? Firman Tuhan hari ini membawa pengharapan.

Menanti-nantikan Tuhan bukan tentang duduk diam tanpa berbuat apa-apa. Ini tentang mengharapkan dan mempercayai janji-Nya sementara kita tetap setia melakukan bagian kita.

Ketika kita menanti Tuhan, kita menerima kekuatan yang bukan berasal dari diri sendiri. Seperti rajawali yang memanfaatkan angin untuk terbang tinggi, kita dapat memanfaatkan kekuatan Roh Kudus untuk melewati tantangan hidup.`,
        prayer: 'Tuhan, aku menanti-nantikan Engkau hari ini. Perbarui kekuatanku dan tolong aku untuk tidak menjadi lesu dalam perjalanan iman ini. Amin.'
    },
    {
        id: 3,
        date: '2026-01-02',
        title: 'Damai di Tengah Badai',
        verse: {
            book: 'Yohanes',
            chapter: 14,
            verse: 27,
            text: 'Damai sejahtera Kutinggalkan bagimu. Damai sejahtera-Ku Kuberikan kepadamu, dan apa yang Kuberikan tidak seperti yang diberikan oleh dunia kepadamu. Janganlah gelisah dan gentar hatimu.'
        },
        content: `Yesus menjanjikan damai yang berbeda dari apa yang dunia tawarkan. Damai dunia bersifat sementara dan tergantung pada keadaan. Damai Kristus bersifat kekal dan tidak bergantung pada situasi.

Di tengah badai kehidupan, kita dapat memiliki hati yang tenang karena kita tahu bahwa Yesus memegang kendali. Damai-Nya hadir bukan karena masalah menghilang, tetapi karena kehadiran-Nya yang menyertai kita.

Hari ini, terimalah damai yang Yesus berikan. Jangan biarkan hatimu gelisah atau gentar.`,
        prayer: 'Tuhan Yesus, terima kasih untuk damai sejahtera-Mu yang melampaui pengertian. Tolong aku untuk menerima dan hidup dalam damai-Mu hari ini. Amin.'
    },
    {
        id: 4,
        date: '2026-01-01',
        title: 'Awal Baru dengan Tuhan',
        verse: {
            book: 'Yeremia',
            chapter: 29,
            verse: 11,
            text: 'Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan.'
        },
        content: `Selamat tahun baru! Di awal tahun ini, mari kita mengingat bahwa Tuhan memiliki rancangan yang indah untuk kita.

Rancangan Tuhan selalu untuk kebaikan kita. Bahkan ketika jalan terasa sulit, kita dapat percaya bahwa Dia sedang mengerjakan sesuatu yang lebih besar.

Tahun baru adalah kesempatan untuk memulai lembaran baru bersama Tuhan. Serahkan setiap rencana, harapan, dan impianmu kepada-Nya. Percayalah bahwa hari depanmu penuh dengan harapan karena Tuhan memegang kendali.`,
        prayer: 'Bapa di sorga, aku menyerahkan tahun baru ini ke dalam tangan-Mu. Pimpin aku dalam setiap langkah dan tolong aku untuk percaya pada rancangan-Mu yang penuh damai sejahtera. Amin.'
    },
    {
        id: 5,
        date: '2025-12-31',
        title: 'Bersyukur di Penghujung Tahun',
        verse: {
            book: 'Mazmur',
            chapter: 103,
            verses: '2-5',
            text: 'Pujilah TUHAN, hai jiwaku, dan janganlah lupakan segala kebaikan-Nya!'
        },
        content: `Di penghujung tahun, mari kita meluangkan waktu untuk mengingat semua kebaikan Tuhan.

Mungkin tahun ini tidak berjalan seperti yang kita rencanakan. Ada sukacita dan ada juga air mata. Namun di setiap momen, kebaikan Tuhan selalu hadir menyertai kita.

Bersyukur bukan hanya untuk hal-hal besar, tetapi juga untuk berkat-berkat kecil sehari-hari: udara yang kita hirup, orang-orang yang mengasihi kita, dan terutama kasih karunia Tuhan yang tidak pernah berkesudahan.`,
        prayer: 'Tuhan, terima kasih untuk semua kebaikan-Mu di sepanjang tahun ini. Ajar aku untuk selalu bersyukur dan tidak melupakan kasih setia-Mu. Amin.'
    }
]

// Get today's reflection
export function getTodayReflection() {
    const today = new Date().toISOString().split('T')[0]
    return reflections.find(r => r.date === today) || reflections[0]
}

// Get reflection by date
export function getReflectionByDate(date) {
    return reflections.find(r => r.date === date)
}

// Get recent reflections
export function getRecentReflections(count = 5) {
    return reflections.slice(0, count)
}
