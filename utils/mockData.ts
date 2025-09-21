import { TradingTool, Course, CalendarEvent, EconomicCalendarEvent, User } from '../types';

export const MOCK_TOOLS: TradingTool[] = [
    { id: 'pip', name: 'Pip Value Calculator', enabled: true },
    { id: 'position', name: 'Position Size Calculator', enabled: true },
    { id: 'risk', name: 'Risk/Reward Calculator', enabled: true },
    { id: 'margin', name: 'Profit Margin Calculator', enabled: true },
    { id: 'breakeven', name: 'Break-Even Point Calculator', enabled: true },
    { id: 'compound', name: 'Compound Interest Calculator', enabled: true },
];

export const MOCK_ECONOMIC_EVENTS: EconomicCalendarEvent[] = [
  // Today's Date
  { id: 1, date: new Date().toISOString().split('T')[0], time: '08:30', currency: 'USD', event: 'Core PCE Price Index m/m', impact: 'High', actual: '0.3%', forecast: '0.3%', previous: '0.2%' },
  { id: 2, date: new Date().toISOString().split('T')[0], time: '10:00', currency: 'USD', event: 'UoM Consumer Sentiment', impact: 'Medium', actual: '69.5', forecast: '69.1', previous: '77.2' },
  { id: 3, date: new Date().toISOString().split('T')[0], time: '14:00', currency: 'EUR', event: 'ECB President Lagarde Speaks', impact: 'High', actual: null, forecast: '', previous: '' },
  { id: 4, date: new Date().toISOString().split('T')[0], time: '20:30', currency: 'JPY', event: 'Tokyo Core CPI y/y', impact: 'Medium', actual: null, forecast: '2.2%', previous: '1.9%' },
  
  // Yesterday's Date
  { id: 5, date: new Date(Date.now() - 86400000).toISOString().split('T')[0], time: '08:30', currency: 'USD', event: 'GDP Price Index q/q', impact: 'High', actual: '3.1%', forecast: '3.1%', previous: '1.7%' },
  { id: 6, date: new Date(Date.now() - 86400000).toISOString().split('T')[0], time: '08:30', currency: 'CAD', event: 'GDP m/m', impact: 'Medium', actual: '0.1%', forecast: '0.2%', previous: '0.5%' },
  
  // Tomorrow's Date
  { id: 7, date: new Date(Date.now() + 86400000).toISOString().split('T')[0], time: '02:00', currency: 'CNY', event: 'Manufacturing PMI', impact: 'High', actual: null, forecast: '50.5', previous: '50.4' },
  { id: 8, date: new Date(Date.now() + 86400000).toISOString().split('T')[0], time: '09:00', currency: 'EUR', event: 'German Prelim CPI m/m', impact: 'Medium', actual: null, forecast: '0.2%', previous: '0.5%' },
];

export const MOCK_UPCOMING_EVENTS: CalendarEvent[] = [
    { id: 1, title: 'Weekly Market Outlook & Live Analysis', date: '2024-07-29', time: '19:00', description: 'Join our head analyst for a deep dive into next week\'s major pairs.', link: 'https://zoom.us/j/123456789' },
    { id: 2, title: 'Mastering Risk Management', date: '2024-08-05', time: '20:00', description: 'A workshop on practical risk management strategies for traders of all levels.', link: 'https://zoom.us/j/987654321' },
];

export const MOCK_PAST_EVENTS: CalendarEvent[] = [
    { id: 3, title: 'Intro to Cryptocurrency Trading', date: '2024-07-22', time: '19:00', description: 'Understanding the basics of the crypto market.', link: '#' },
];

export const MOCK_MEMBERS: User[] = [
    { id: '1', name: 'Trader Joe', email: 'joe@example.com', role: 'member', joined: '2023-10-26', status: 'Active' },
    { id: 'admin-001', name: 'Admin', email: 'admin@humanminority.pro', role: 'admin', joined: '2023-01-01', status: 'Active' },
    { id: '2', name: 'Jane Doe', email: 'jane.d@example.com', role: 'member', joined: '2023-11-15', status: 'Active' },
    { id: '3', name: 'Alex Smith', email: 'alex.smith@example.com', role: 'member', joined: '2024-01-02', status: 'Banned' },
    { id: '4', name: 'Emily White', email: 'emily.w@example.com', role: 'member', joined: '2024-02-20', status: 'Active' },
];

export const MOCK_COURSES: Course[] = [
    {
        id: 1,
        title: 'Dasar-Dasar Trading Forex',
        category: 'Trading Forex',
        description: 'Pelajari fundamental trading forex, mulai dari terminologi dasar hingga analisa teknikal pertama Anda.',
        status: 'Published',
        modules: [
            {
                id: 101,
                title: 'Modul 1: Pengenalan Forex',
                lessons: [
                    { id: 1, title: 'Apa itu Forex?', content: 'Forex (Foreign Exchange) adalah pasar global untuk memperdagangkan mata uang...\n\nIni adalah pasar keuangan terbesar dan paling likuid di dunia, dengan volume perdagangan harian mencapai triliunan dolar. Tidak seperti pasar saham, pasar forex terdesentralisasi dan buka 24 jam sehari, lima hari seminggu.' },
                    { id: 2, title: 'Terminologi Penting', content: 'Pip, Lot, Leverage, Margin adalah beberapa istilah yang wajib Anda ketahui.\n\n- Pip: Unit terkecil dari perubahan harga.\n- Lot: Ukuran unit standar dari sebuah transaksi.\n- Leverage: Memungkinkan Anda untuk mengontrol posisi yang lebih besar dengan modal yang lebih kecil.\n- Margin: Modal yang dibutuhkan untuk membuka dan mempertahankan posisi.' },
                    { id: 3, title: 'Jenis-jenis Pair Mata Uang', content: 'Major, Minor, dan Exotic pairs. Apa perbedaannya?\n\n- Major Pairs: Mata uang yang paling banyak diperdagangkan, selalu melibatkan USD.\n- Minor Pairs (Crosses): Tidak melibatkan USD, tetapi melibatkan mata uang utama lainnya (EUR, JPY, GBP).\n- Exotic Pairs: Melibatkan satu mata uang utama dan satu mata uang dari negara berkembang.' },
                ],
                quiz: {
                    id: 1,
                    moduleId: 101,
                    title: 'Kuis Modul 1',
                    passingScore: 80,
                    questions: [
                        { id: 1, question: 'Apa kepanjangan dari Forex?', options: ['Foreign Export', 'Foreign Exchange', 'For Expert'], correctAnswer: 'Foreign Exchange' },
                        { id: 2, question: 'Ukuran standar dalam trading forex disebut?', options: ['Pip', 'Lot', 'Point'], correctAnswer: 'Lot' },
                    ]
                }
            },
            {
                id: 102,
                title: 'Modul 2: Analisa Teknikal Dasar',
                lessons: [
                    { id: 4, title: 'Membaca Grafik Candlestick', content: 'Body, shadow, dan apa yang diceritakan oleh sebuah candlestick.' },
                    { id: 5, title: 'Support & Resistance', content: 'Konsep dasar dalam menentukan level-level penting di market.' },
                ],
                quiz: {
                    id: 2,
                    moduleId: 102,
                    title: 'Kuis Modul 2',
                    passingScore: 80,
                    questions: [
                        { id: 1, question: 'Level harga di bawah harga saat ini yang berpotensi menahan penurunan disebut?', options: ['Resistance', 'Pivot', 'Support'], correctAnswer: 'Support' },
                    ]
                }
            }
        ]
    },
    {
        id: 2,
        title: 'Pengenalan Dunia Cryptocurrency',
        category: 'Cryptocurrency',
        description: 'Pahami teknologi blockchain, Bitcoin, dan potensi aset digital di masa depan.',
        status: 'Published',
        modules: [
             {
                id: 201,
                title: 'Modul 1: Apa itu Blockchain?',
                lessons: [
                    { id: 6, title: 'Definisi Blockchain', content: 'Blockchain adalah buku besar digital yang terdesentralisasi dan didistribusikan yang digunakan untuk mencatat transaksi di banyak komputer.' },
                    { id: 7, title: 'Sejarah Bitcoin', content: 'Bitcoin diciptakan pada tahun 2009 oleh seseorang atau sekelompok orang dengan nama samaran Satoshi Nakamoto.' },
                ],
                quiz: {
                    id: 3,
                    moduleId: 201,
                    title: 'Kuis Modul 1 Crypto',
                    passingScore: 80,
                    questions: [
                        { id: 1, question: 'Siapa nama samaran pencipta Bitcoin?', options: ['Vitalik Buterin', 'Satoshi Nakamoto', 'Charles Hoskinson'], correctAnswer: 'Satoshi Nakamoto' },
                    ]
                }
            }
        ]
    },
     {
        id: 3,
        title: 'Membangun Bisnis Online dari Nol',
        category: 'Bisnis',
        description: 'Langkah demi langkah membangun bisnis online yang profitabel.',
        status: 'Draft',
        modules: []
    }
];
