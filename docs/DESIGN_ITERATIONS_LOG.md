# Design Iterations Log

## Attempt 1: Elevated Earthy
- **Change:** Applied a complex split-layout (2.5fr / 1fr) to Dashboard and Crop Calendar. Added gradient-backed Welcome banners and high-contrast "Essential Toolkit" list items instead of simple grids.
- **Outcome:** The user rejected this layout direction.

## Attempt 2: Glassmorphism / Tech Base
- **Change:** Overhauled the core design system `styles.css` converting all `card` components to semi-transparent backgrounds with `backdrop-filter: blur(12px)`. The palette shifted from organic soils to neon blue/purple gradients overlaid on an absolute blue back-glow.
- **Outcome:** The user rejected the pivot and requested all modifications be completely undone.

## Final State
- Fully reverted `styles.css` back to the default "Earthy & Natural" tokens configured early in the project.
- Reverted `dashboard.html` and `crop-calendar.html` back to their original, simpler grid/block structures removing the split panes and timelines. 

The site structurally matches the original functional baseline exactly.