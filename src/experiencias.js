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
        games: [
            {
                title: 'Bienvenida al vuelo',
                description: 'Comparte tu entusiasmo: ¿Qué es lo que más te emociona de este viaje?',
                type: 'text'
            }
        ]
    },
    {
        id: 'hidroavion',
        title: 'Traslado en hidroavión',
        icon: '🛩️',
        description: 'Vista aérea del paraíso. Las aguas cristalinas te esperan.',
        image: 'assets/images/hidroavion.jpg',
        games: [
            {
                title: 'Vista desde el cielo',
                description: 'Observa las islas desde arriba. ¿Cuántas tonalidades de azul puedes identificar?',
                type: 'choice',
                options: ['2-3', '4-5', '6 o más']
            }
        ]
    },
    {
        id: 'checkin',
        title: 'Check-in en la villa',
        icon: '🏝️',
        description: 'Tu hogar sobre el agua. Lujo y tranquilidad en perfecta armonía.',
        image: 'assets/images/villa.jpg',
        games: [
            {
                title: 'Bienvenida a tu villa',
                description: 'Explorar la villa y compartir: ¿Cuál es tu rincón favorito?',
                type: 'text'
            }
        ]
    },
    {
        id: 'actividades',
        title: 'Playa y actividades',
        icon: '🌊',
        description: 'Aventuras bajo el sol. Snorkel, exploración y diversión.',
        image: 'assets/images/playa.jpg',
        games: [
            {
                title: 'Snorkel',
                description: 'Explora el arrecife de coral. Imagina que ves peces tropicales de colores brillantes.',
                type: 'interactive'
            },
            {
                title: 'Paseo por la playa',
                description: 'Camina descalzo por la arena. Describe cómo te sientes.',
                type: 'text'
            },
            {
                title: 'Aventura en la isla',
                description: 'Descubre los secretos de la isla. ¿Qué tesoro encontrarías?',
                type: 'text'
            }
        ]
    },
    {
        id: 'spa',
        title: 'Spa',
        icon: '🌺',
        description: 'Momento de relajación total. Masajes y aromaterapia con vista al océano.',
        image: 'assets/images/spa.jpg',
        games: [
            {
                title: 'Respiración profunda',
                description: 'Toma 10 segundos para respirar profundamente. Inhala... exhala...',
                type: 'timer',
                duration: 10
            }
        ]
    },
    {
        id: 'cena',
        title: 'Cena en la playa',
        icon: '🍽️',
        description: 'Gastronomía bajo las estrellas. Sabores exquisitos frente al mar.',
        image: 'assets/images/cena.jpg',
        games: [
            {
                title: 'Brindis especial',
                description: 'Cada viajero dice algo positivo sobre el viaje. ¿Qué destacarías tú?',
                type: 'text'
            }
        ]
    },
    {
        id: 'atardecer',
        title: 'Atardecer',
        icon: '🌅',
        description: 'El momento mágico del día. Colores que pintan el cielo.',
        image: 'assets/images/atardecer.jpg',
        games: [
            {
                title: 'Contemplación',
                description: 'Mira el horizonte en silencio durante 5 segundos. Disfruta la paz.',
                type: 'timer',
                duration: 5
            }
        ]
    },
    {
        id: 'album',
        title: 'Álbum del viaje',
        icon: '📸',
        description: 'Recuerdos capturados. Las mejores fotos de tu aventura.',
        image: 'assets/images/album.jpg',
        games: []
    },
    {
        id: 'feedback',
        title: 'Opinión de la experiencia',
        icon: '📝',
        description: 'Tu opinión importa. Comparte tu experiencia VIP.',
        image: 'assets/images/feedback.jpg',
        games: []
    }
];

// Configuración de fotos para la galería
const memoriasViaje = [
    {
        image: 'assets/memories/llegada.jpg',
        caption: 'Llegada al paraíso'
    },
    {
        image: 'assets/memories/snorkel.jpg',
        caption: 'Exploradores marinos'
    },
    {
        image: 'assets/memories/spa.jpg',
        caption: 'Momento zen'
    },
    {
        image: 'assets/memories/sunset.jpg',
        caption: 'Sunset crew'
    },
    {
        image: 'assets/memories/mision.jpg',
        caption: 'Misión cumplida'
    }
];
