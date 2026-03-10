Create a lightweight interactive travel experience website called **Maldives VIP Experience**.

The project must work as a **static website compatible with GitHub Pages** and be easy to edit using **VSCode with GitHub Copilot**.

Use only:

- HTML
- CSS
- Vanilla JavaScript

No frameworks.

The website language must be **Spanish**.

The code must be clean, modular and easy to expand because new travel experiences and games may be added later.

--------------------------------------------------

PROJECT GOAL

The website simulates a playful luxury trip to the Maldives with a VIP passenger.

The experience unfolds step by step like a travel itinerary.

Each step unlocks the next one and contains playful challenges or mini-games.

Progress must be saved using **localStorage** so if the user closes the page they can continue the journey.

--------------------------------------------------

VISUAL STYLE

Luxury tropical resort aesthetic.

Color palette:

- turquoise
- ocean blue
- sand beige
- white

Use large immersive images.

Design should feel:

- relaxing
- immersive
- playful
- elegant

Add smooth transitions and hover animations.

--------------------------------------------------

PROJECT STRUCTURE

Create this folder structure:

assets/
images/
memories/

Files:

index.html
style.css
script.js
experiencias.js
supabase.js

--------------------------------------------------

HERO SECTION

At the top of the page create a large hero header using a Maldives beach image.

Overlay text:

Maldives VIP Experience

Pasajera VIP: Veronica  
Empleado de confianza: [nombre]

Misión:
Garantizar que la experiencia Maldives sea inolvidable.

Include a button:

"Comenzar viaje"

Optional toggle for ocean ambient sound.

--------------------------------------------------

TRAVEL ITINERARY

Create a horizontal itinerary progress bar with icons.

Steps:

✈ Vuelo a Maldivas  
🛩 Traslado en hidroavión  
🏝 Check-in en la villa  
🌊 Playa y actividades  
🌺 Spa  
🍽 Cena en la playa  
🌅 Atardecer  
📸 Álbum del viaje  
📝 Opinión de la experiencia

Some step titles should remain hidden until unlocked.

Example:

🌊 ---- ----
🌺 ---- ----
🍽 ---- ----

Unlock the next step after completing the current one.

--------------------------------------------------

EXPERIENCE SYSTEM

Experiences must be defined in a configuration file called:

experiencias.js

Each experience should contain:

id  
title  
icon  
description  
image  
games[]

Games should contain:

title  
description  

This structure must allow adding or removing experiences and games easily.

--------------------------------------------------

ACTIVITIES SECTION

For activities create image cards that are clickable.

Examples:

Snorkel  
Paseo por la playa  
Aventura en la isla

Clicking a card opens a modal with the challenge description.

--------------------------------------------------

SPA SECTION

Relaxing section with spa image and calming text.

Challenge example:

10 seconds of deep breathing.

--------------------------------------------------

DINNER SECTION

Dinner on the beach experience.

Challenge example:

Each traveler says something positive about the trip.

--------------------------------------------------

SUNSET SECTION

Sunset moment experience.

Challenge:

Look at the horizon silently for 5 seconds.

--------------------------------------------------

PHOTO ALBUM

Create a gallery grid with 5 travel memory photos.

Add captions such as:

Llegada al paraíso  
Exploradores marinos  
Momento zen  
Sunset crew  
Misión cumplida

--------------------------------------------------

FEEDBACK FORM

Final section where the passenger can rate the experience.

Fields:

Nombre  
Valoración del viaje (1–5 estrellas)  
Actividad favorita  
Nivel de diversión  
¿Repetirías el viaje?  
Comentario

--------------------------------------------------

SUPABASE INTEGRATION

Create a module called:

supabase.js

Use Supabase client to insert feedback into table:

maldives_experience_feedback

Fields:

passenger_name  
experience_rating  
favorite_activity  
fun_level  
would_repeat  
comment  
created_at

--------------------------------------------------

INTERACTIONS

Include:

smooth transitions  
modal popups for games  
hover effects on cards  
progress bar updates  
localStorage progress saving

--------------------------------------------------

MOBILE DESIGN

Design must be mobile-first.

The itinerary should be horizontally scrollable on small screens.

Images should scale responsively.

--------------------------------------------------

CODE QUALITY

Write clear commented code.

Separate responsibilities:

HTML structure  
CSS styling  
JavaScript logic  
Experience configuration  
Supabase integration

The system must be easy to expand with new travel experiences and new mini-games.