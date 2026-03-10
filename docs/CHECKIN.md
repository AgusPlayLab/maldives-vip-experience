Create a page called checkin.html for the Maldives VIP Experience project.

The page simulates a VIP airport check-in validation before starting the Maldives trip.

Design requirements:

- Tropical Maldives inspired UI
- Turquoise and sunset gradient background
- Centered card layout
- Clean modern typography
- Mobile-first responsive design
- Smooth animations for state changes

Page structure:

1. Title at the top:

VIP CHECK-IN VALIDATION

2. Subtitle text:

Passenger verification required

3. Show passenger information card:

Passenger: Veronica  
Destination: Maldives  
Status: Pending validation

4. Add a main button:

Validate Boarding Pass

Behavior:

When the button is clicked:

1. Show a short loading state with animation and text:

"Verifying passenger..."

2. After about 1.5 seconds show success state:

Passenger verified  
Veronica  
VIP Maldives Experience confirmed

3. Show a small resort-style message:

"Resort staff message:  
Your villa is ready.  
Enjoy the Maldives experience."

4. Generate a QR code dynamically using JavaScript.

The QR code must link to:

https://agusplaylab.github.io/maldives-vip-experience/

5. Display the QR code inside a styled card with the text:

Scan this QR to begin your Maldives VIP journey.

6. Add a small fade-in animation when the QR appears.

7. Add a button below the QR:

Restart validation

Technical requirements:

- Use simple HTML, CSS and vanilla JavaScript
- Include a lightweight QR generator library
- Must work directly on GitHub Pages (no build tools)
- Keep code clean and readable
- Keep everything in a single page if possible

The overall feeling should be playful, immersive and elegant, like a luxury airport check-in before a Maldives trip.