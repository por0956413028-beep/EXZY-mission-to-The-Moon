# Exzy Living Workplace Impact Wall

## Purpose

This dashboard is a bright office digital-signage display that communicates Exzy's human workplace impact. It is designed to inspire office viewers, visitors, and stakeholders rather than operate as a technical product inventory dashboard.

## Art Direction

- Direction: Living Workplace
- Tone: inspiring enterprise, human, optimistic, premium
- Visual style: soft white and cool gray surfaces with Exzy teal and deep blue accents
- Main visual: generated workplace collaboration image in `assets/living-workplace-hero.png`
- Format: `1080 x 1920` portrait digital signage with optional landscape cast rotation

## Story Structure

1. Header: `EXZY / Impact Wall`
2. Hero: `Every Workday Made Smoother`
3. Primary metric: `8,000+ Solution Installations`
4. Values strip: `Better Workdays`, `Smarter Spaces`, `Future Ready`
5. Impact metrics:
   - `350+ Organizations`
   - `300,000+ Meeting Hours`
   - `500,000+ Secure Access`
   - `2,000+ Locker Spaces`
6. Workplace coverage visual: abstract flow lines and glowing impact points
7. Closing quote: `Every number is a trace of a better workplace experience.`

## Data Approach

- Reads the configured Google Sheet through the Google Visualization feed.
- Refreshes every five minutes.
- Counts installation rows, unique organizations, unique buildings, and recent dated rows.
- Geocodes unique values from the `Building` column with Google Maps and caches coordinates locally.
- Shows an explicit setup/error state when the sheet is private or a Maps API key is missing.

## Interaction

- Public display updates automatically.
- Clicking a map marker shows the building, formatted address, installation count, and organization count.

## Approval Rule

Before future implementation changes:

1. Audit current `index.html` and this spec.
2. Submit a short Markdown plan.
3. Wait for approval.
4. Implement only the approved change.
5. Verify the dashboard still renders and the script parses.
