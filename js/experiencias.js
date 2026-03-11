// ============================================
// CONFIGURACIÓN DE EXPERIENCIAS
// ============================================

const experiencias = [
    {
        id: 'vuelo',
        title: 'Vuelo a Maldivas',
        icon: '✈️',
        description: 'El viaje comienza. Prepárate para una experiencia inolvidable.',
        image: 'assets/images/vuelo.jpg',
        page: 'vuelo.html',
        libre: false,
        games: [
            {
                title: 'Bienvenida al vuelo',
                description: 'Comparte tu entusiasmo: ¿Qué es lo que más te emociona de este viaje?',
                type: 'text',
                image: '../assets/images/vuelo.jpg'
            }
        ]
    },
    {
        id: 'hidroavion',
        title: 'Traslado en hidroavión',
        icon: '🛩️',
        description: 'Vista aérea del paraíso. Las aguas cristalinas te esperan.',
        image: 'assets/images/hidroavion.jpg',
        page: 'hidroavion.html',
        libre: false, // Requiere completar anterior
        games: [
            {
                title: 'Vista desde el cielo',
                description: 'Observa las islas desde arriba. ¿Cuántas tonalidades de azul puedes identificar?',
                type: 'choice',
                options: ['2-3', '4-5', '6 o más'],
                image: '../assets/images/hidroavion.jpg'
            }
        ]
    },
    {
        id: 'checkin',
        title: 'Check-in en la villa',
        icon: '🏝️',
        description: 'Tu hogar sobre el agua. Lujo y tranquilidad en perfecta armonía.',
        image: 'assets/images/villa.jpg',
        page: 'villa.html',
        libre: false,
        games: [
            {
                title: 'Exploración de la villa',
                description: 'Recorred cada rincón de vuestro hogar sobre el agua. La terraza, la bañera exterior, la cama con dosel... ¿cuál os roba el aliento primero?',
                type: 'interactive',
                image: '../assets/images/villa.jpg'
            },
            {
                title: 'Look tropical',
                description: 'El armario de la villa os espera. Elegid vuestro primer look en el paraíso.',
                type: 'choice',
                options: ['Bikini + pareo suelto', 'Pareo estilo vestido', 'Bañador minimalista', 'Look de noche elegante'],
                image: '../assets/images/villa.jpg'
            },
            {
                title: 'Brindis en la terraza',
                description: 'El sol deslumbra sobre el océano Índico. Salid a la terraza, respirad el aire salado y alzad la copa. Este momento es de usted.',
                type: 'interactive',
                image: '../assets/images/villa.jpg'
            }
        ]
    },
    {
        id: 'actividades',
        title: 'Playa y actividades',
        icon: '🌊',
        description: 'Aventuras bajo el sol. Snorkel, exploración y diversión.',
        image: 'assets/images/playa.jpg',
        page: 'actividades.html',
        libre: false,
        games: [
            {
                title: 'Snorkel',
                description: 'Explora el arrecife de coral. Imagina que ves peces tropicales de colores brillantes.',
                type: 'interactive',
                image: '../assets/images/playa.jpg'
            },
            {
                title: 'Paseo por la playa',
                description: 'Camina descalzo por la arena. Describe cómo te sientes.',
                type: 'text',
                image: '../assets/images/playa.jpg'
            },
            {
                title: 'Aventura en la isla',
                description: 'Descubre los secretos de la isla. ¿Qué tesoro encontrarías?',
                type: 'text',
                image: '../assets/images/playa.jpg'
            }
        ]
    },
    {
        id: 'spa',
        title: 'Spa',
        icon: '🌺',
        description: 'Momento de relajación total. Masajes y aromaterapia con vista al océano.',
        image: 'assets/images/spa.jpg',
        page: 'spa.html',
        libre: false,
        games: [
            {
                title: 'Respiración profunda',
                description: 'Toma 10 segundos para respirar profundamente. Inhala... exhala...',
                type: 'timer',
                duration: 10,
                image: '../assets/images/spa.jpg'
            },
            {
                title: 'Ritual de aceites tropicales',
                description: 'El spa os entrega una prenda ligera y os invita a reclinaros. Aceites de coco y ylang-ylang calientan la piel al ritmo del oleaje. Dejad que el ritual haga el resto.',
                type: 'interactive',
                image: '../assets/images/spa.jpg'
            }
        ]
    },
    {
        id: 'atardecer',
        title: 'Atardecer',
        icon: '🌅',
        description: 'El momento mágico del día. Colores que pintan el cielo.',
        image: 'assets/images/atardecer.jpg',
        page: 'atardecer.html',
        libre: false,
        games: [
            {
                title: 'Contemplación',
                description: 'Mira el horizonte en silencio durante 5 segundos. Disfruta la paz.',
                type: 'timer',
                duration: 5,
                image: '../assets/images/atardecer.jpg'
            }
        ]
    },
    {
        id: 'cena',
        title: 'Cena en la playa',
        icon: '🍽️',
        description: 'Gastronomía bajo las estrellas. Sabores exquisitos frente al mar.',
        image: 'assets/images/cena.jpg',
        page: 'cena.html',
        libre: false,
        games: [
            {
                title: 'Brindis especial',
                description: 'Cada viajero dice algo positivo sobre el viaje. ¿Qué destacarías tú?',
                type: 'text',
                image: '../assets/images/cena.jpg'
            }
        ]
    },
    {
        id: 'album',
        title: 'Álbum del viaje',
        icon: '📸',
        description: 'Recuerdos capturados. Las mejores fotos de tu aventura.',
        image: 'assets/images/album.jpg',
        page: 'album.html',
        libre: false,
        games: []
    },
    {
        id: 'feedback',
        title: 'Opinión de la experiencia',
        icon: '📝',
        description: 'Tu opinión importa. Comparte tu experiencia VIP.',
        image: 'assets/images/feedback.jpg',
        page: 'feedback.html',
        libre: false, // Solo al final
        games: []
    }
];

// Configuración de fotos para la galería
const memoriasViaje = [
    {
        image: '../assets/memories/llegada.jpg',
        caption: 'Llegada al paraíso'
    },
    {
        image: '../assets/memories/snorkel.jpg',
        caption: 'Exploradores marinos'
    },
    {
        image: '../assets/memories/spa.jpg',
        caption: 'Momento zen'
    },
    {
        image: '../assets/memories/sunset.jpg',
        caption: 'Sunset crew'
    },
    {
        image: '../assets/memories/mision.jpg',
        caption: 'Misión cumplida'
    }
];
