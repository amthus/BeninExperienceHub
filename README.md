# Experiences Benin - Digital Luxury Showcase

Experiences Benin is a premium digital platform designed to showcase the cultural heritage and tourism potential of Benin through a sophisticated and immersive user interface. The application follows an editorial design philosophy, blending luxury aesthetics with advanced interactive features.

## Core Features

### Magazine Feed
An editorial-style content delivery system presenting Beninese destinations as high-end magazine articles.
- Parallax Scrolling: The hero section features a subtle parallax effect on the background image to create visual depth.
- Cartographie Sacree: An interactive map integration allowing users to explore key locations. Custom pins provide detailed tooltips with historical context upon interaction.
- Historical Insights: Micro-components embedded in the feed offer quick educational facts about specific sites.

### Cultural Pass (Eclat d'Or)
A centralized digital wallet for museum and site access.
- 3D Interactive Card: A gold-leaf styled VIP pass with a functional QR code and realistic 3D rotation effects.
- Micro-interactions: Benefit items feature animated icons and responsive typography that emphasizes information on hover.

### Ancestors' Voice (Voix des Ancetres)
An immersive audio experience triggered by proximity to historical sites.
- Sophisticated Audio Player: Features a stylized waveform visualization and high-fidelity controls.
- Spatial Content: Audio tracks are curated to complement specific locations, providing a narrative layer to the physical exploration.

### AR Window (Fenetre Temporelle)
A reality augmentation tool that reconstructs historical ruins in their original glory.
- Camera Integration: Real-time environmental scanning to identify historical markers.
- Dynamic Overlays: 3D reconstructions with smooth parallax effects tied to viewer movement.
- Progressive Information: Gradual fade-in animations for educational panels once a site is detected.

### Artisan Concierge
A premium booking interface for tailored cultural experiences.
- Exclusive Booking: Access to private ceremonies and gourmet dining at historical palaces.
- Trust Infrastructure: Verified artisan badges and secure scheduling for high-trust interactions.

## Technical Implementation

### Frontend Stack
- Framework: React with TypeScript.
- Styling: Tailwind CSS for utility-first responsive design.
- Animation: Motion (Framer Motion) for complex transitions, parallax effects, and micro-interactions.
- Icons: Lucide React for consistent, high-quality iconography.

### Design Principles
- Typography: Use of Cormorant Garamond for serif headings and Montserrat for sans-serif utility text.
- Color Palette: A curated selection of Forest Green (#065F46), Benin Gold (#D4AF37), Ivory (#FAF9F6), and Ink (#1A1A1A).
- Precision: Millimeter-accurate layouts with fluid responsiveness across desktop and mobile devices.

## Setup and Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Environment Variables:
   Ensure any necessary API keys (e.g., Gemini API) are configured in the environment if extending AI capabilities.
