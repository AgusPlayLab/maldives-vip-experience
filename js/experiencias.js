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
                title: 'Control de seguridad',
                description: 'Antes de despegar, tomamos el pulso a la pasajera VIP durante 5 segundos. ¿Lo notas acelerado? El viaje ya ha empezado.',
                type: 'timer',
                duration: 5,
                image: '../assets/images/vuelo.jpg'
            },
            {
                title: '¿Qué te emociona más?',
                description: 'Elige lo que más le atrae de este viaje. Sin pensar demasiado.',
                type: 'choice',
                options: ['El océano índico', 'La villa sobre el agua', 'Desconectar del mundo', 'Lo que no está planeado'],
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
                title: 'Tu isla desierta',
                description: 'Mirad por la ventana. Ahí abajo hay cientos de islas. Si tuvieras que elegir una para quedaros solos, ¿qué os llevaríais?',
                type: 'choice',
                options: ['Música y una hamaca', 'Comida y vino', 'Solo lo puesto', 'Al sirviente'],
                image: '../assets/images/hidroavion.jpg'
            },
            {
                title: 'Susurro de cabina',
                description: 'Acércate. Uno le dice al otro al oído una cosa que espera que pase en este viaje. Solo lo escucha quien debe escucharlo.',
                type: 'interactive',
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
                description: 'Estás bajo el agua rodeada de peces de colores, tortugas y corales brillantes... un momento, ¿qué es eso que se acerca? ¡Corre! 😈',
                type: 'interactive',
                image: '../assets/images/playa.jpg'
            },
            {
                title: 'Paseo por la orilla',
                description: 'Descalzos, con los pies en el agua. El sol cae sobre la espalda y el agua está tibia. Caminad hasta donde os lleve la marea.',
                type: 'interactive',
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
