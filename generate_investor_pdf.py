#!/usr/bin/env python3
"""
Generate investor package PDF for 399 Rainier Road, Lake Arrowhead, CA
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import Color, white, black, HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.pdfgen import canvas
from reportlab.lib import colors
import os

# --- Color Palette ---
DARK_BROWN = Color(60/255, 49/255, 29/255)
CREAM = Color(245/255, 244/255, 242/255)
WHITE = Color(1, 1, 1)
GRAY = Color(120/255, 110/255, 95/255)
NEAR_BLACK = Color(27/255, 23/255, 16/255)
LIGHT_BROWN = Color(100/255, 80/255, 50/255)
ACCENT_TAN = Color(180/255, 160/255, 120/255)

OUTPUT_PATH = "/Users/terryrayment/Documents/GitHub/399rainier/public/399-rainier-investor-package.pdf"

PAGE_W, PAGE_H = letter  # 612, 792

MARGIN = 0.5 * inch
CONTENT_W = PAGE_W - 2 * MARGIN


def hex_color(r, g, b):
    return Color(r/255, g/255, b/255)


def draw_footer(c, page_num):
    """Draw footer bar on bottom of page."""
    footer_h = 22
    c.setFillColor(DARK_BROWN)
    c.rect(0, 0, PAGE_W, footer_h, fill=1, stroke=0)
    c.setFillColor(CREAM)
    c.setFont("Helvetica", 7)
    footer_text = "399 Rainier Road, Lake Arrowhead CA 92352  ·  MLS# IG25221884  ·  399rainier.com  ·  Represented by Gary Doss, Compass DRE# 01416748"
    c.drawCentredString(PAGE_W / 2, 7, footer_text)


def draw_page1(c):
    """Draw all content for page 1."""
    # ---- HEADER BAR ----
    header_h = 88
    c.setFillColor(DARK_BROWN)
    c.rect(0, PAGE_H - header_h, PAGE_W, header_h, fill=1, stroke=0)

    # Left: Address
    c.setFillColor(CREAM)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(MARGIN, PAGE_H - 38, "399 RAINIER ROAD")
    c.setFont("Helvetica", 11)
    c.setFillColor(ACCENT_TAN)
    c.drawString(MARGIN, PAGE_H - 56, "Lake Arrowhead, California 92352")
    c.setFont("Helvetica", 9)
    c.setFillColor(CREAM)
    c.drawString(MARGIN, PAGE_H - 73, "3 Bed  ·  3 Bath  ·  2,106 Sqft  ·  Renovated A-Frame (1965 / 2023)")

    # Right: Price
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 26)
    c.drawRightString(PAGE_W - MARGIN, PAGE_H - 38, "$875,000")
    c.setFont("Helvetica", 9)
    c.setFillColor(ACCENT_TAN)
    c.drawRightString(PAGE_W - MARGIN, PAGE_H - 55, "List Price  ·  MLS# IG25221884")

    y = PAGE_H - header_h - 18

    # ---- INVESTMENT SNAPSHOT ----
    c.setFillColor(NEAR_BLACK)
    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(GRAY)
    c.drawString(MARGIN, y, "INVESTMENT SNAPSHOT")
    c.setStrokeColor(DARK_BROWN)
    c.setLineWidth(1.5)
    c.line(MARGIN, y - 3, MARGIN + 120, y - 3)

    y -= 14

    # 4 stat boxes
    box_w = (CONTENT_W - 9) / 4
    box_h = 62
    boxes = [
        ("$42,047", "2025 Gross Revenue"),
        ("4.9 \u2605", "85 Five-Star Reviews"),
        ("Superhost", "Airbnb Certified"),
        ("4.81%", "Gross Yield"),
    ]

    for i, (stat, label) in enumerate(boxes):
        bx = MARGIN + i * (box_w + 3)
        by = y - box_h

        c.setFillColor(CREAM)
        c.rect(bx, by, box_w, box_h, fill=1, stroke=0)

        # Top accent bar
        c.setFillColor(DARK_BROWN)
        c.rect(bx, by + box_h - 4, box_w, 4, fill=1, stroke=0)

        # Stat value
        c.setFillColor(DARK_BROWN)
        c.setFont("Helvetica-Bold", 18)
        c.drawCentredString(bx + box_w / 2, by + box_h - 30, stat)

        # Label
        c.setFillColor(GRAY)
        c.setFont("Helvetica", 8)
        c.drawCentredString(bx + box_w / 2, by + 10, label)

    y -= box_h + 20

    # ---- 2025 MONTHLY REVENUE ----
    c.setFillColor(GRAY)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN, y, "2025 MONTHLY REVENUE")
    c.setStrokeColor(DARK_BROWN)
    c.setLineWidth(1.5)
    c.line(MARGIN, y - 3, MARGIN + 140, y - 3)
    y -= 14

    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    revenues = [2064.74, 2684.87, 3020.78, 3084.92, 3433.60, 3121.02,
                2586.04, 5491.03, 3710.40, 2665.61, 702.67, 9481.21]

    chart_h = 110
    chart_top = y
    chart_bottom = y - chart_h
    max_rev = max(revenues)
    bar_w = CONTENT_W / len(months)
    gap = bar_w * 0.18

    # Draw light horizontal grid lines
    for pct in [0.25, 0.5, 0.75, 1.0]:
        grid_y = chart_bottom + pct * chart_h
        c.setStrokeColor(Color(0.88, 0.87, 0.85))
        c.setLineWidth(0.5)
        c.line(MARGIN, grid_y, MARGIN + CONTENT_W, grid_y)

    for i, (month, rev) in enumerate(zip(months, revenues)):
        bx = MARGIN + i * bar_w + gap / 2
        bw = bar_w - gap
        bar_h = (rev / max_rev) * chart_h * 0.90

        # Highlight peak months
        if rev >= 5000:
            c.setFillColor(DARK_BROWN)
        else:
            c.setFillColor(LIGHT_BROWN)

        c.rect(bx, chart_bottom, bw, bar_h, fill=1, stroke=0)

        # Month label
        c.setFillColor(GRAY)
        c.setFont("Helvetica", 6.5)
        c.drawCentredString(bx + bw / 2, chart_bottom - 10, month)

        # Dollar label on bar
        c.setFillColor(NEAR_BLACK)
        c.setFont("Helvetica-Bold", 5.5)
        label_y = chart_bottom + bar_h + 2
        c.drawCentredString(bx + bw / 2, label_y, f"${rev:,.0f}")

    y -= chart_h + 16

    # Footer note for chart
    c.setFillColor(DARK_BROWN)
    c.setFont("Helvetica-Bold", 7.5)
    note = "2026 YTD (Jan\u2013Feb): $5,384  \u00b7  Upcoming payouts: $2,854  \u00b7  +66% YoY growth (Jan 2026 vs Jan 2025)"
    note_w = c.stringWidth(note, "Helvetica-Bold", 7.5)
    # Cream pill background
    pill_pad_x = 8
    pill_pad_y = 4
    c.setFillColor(CREAM)
    c.roundRect(MARGIN, y - pill_pad_y, CONTENT_W, 14, 3, fill=1, stroke=0)
    c.setFillColor(DARK_BROWN)
    c.drawCentredString(MARGIN + CONTENT_W / 2, y, note)

    y -= 20

    # ---- ANNUAL EXPENSE OVERVIEW ----
    section_y = y
    c.setFillColor(GRAY)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN, section_y, "ANNUAL EXPENSE OVERVIEW")
    c.setStrokeColor(DARK_BROWN)
    c.setLineWidth(1.5)
    c.line(MARGIN, section_y - 3, MARGIN + 150, section_y - 3)
    y -= 14

    expenses = [
        ("Property Taxes", "$7,439", "$620/mo"),
        ("Insurance", "~$3,000", "$250/mo"),
        ("Utilities", "~$4,800", "$400/mo"),
        ("Maintenance", "~$3,600", "$300/mo"),
        ("Supplies", "~$1,800", "$150/mo"),
        ("Cleaning Service *", "~$14,400", "$1,200/mo"),
        ("Other / Misc", "~$1,200", "$100/mo"),
    ]

    col1_w = CONTENT_W * 0.45
    col2_w = CONTENT_W * 0.28
    col3_w = CONTENT_W * 0.27
    row_h = 15

    # Table header
    c.setFillColor(DARK_BROWN)
    c.rect(MARGIN, y - 2, CONTENT_W, row_h, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 7.5)
    c.drawString(MARGIN + 6, y + 3, "EXPENSE")
    c.drawString(MARGIN + col1_w + 6, y + 3, "ANNUAL")
    c.drawString(MARGIN + col1_w + col2_w + 6, y + 3, "MONTHLY")
    y -= row_h

    for idx, (name, annual, monthly) in enumerate(expenses):
        bg = CREAM if idx % 2 == 0 else WHITE
        c.setFillColor(Color(bg.red, bg.green, bg.blue))
        c.rect(MARGIN, y - 2, CONTENT_W, row_h, fill=1, stroke=0)
        c.setFillColor(NEAR_BLACK)
        c.setFont("Helvetica", 7.5)
        c.drawString(MARGIN + 6, y + 3, name)
        c.setFont("Helvetica-Bold", 7.5)
        c.drawString(MARGIN + col1_w + 6, y + 3, annual)
        c.setFont("Helvetica", 7.5)
        c.setFillColor(GRAY)
        c.drawString(MARGIN + col1_w + col2_w + 6, y + 3, monthly)
        y -= row_h

    # Total row
    c.setFillColor(DARK_BROWN)
    c.rect(MARGIN, y - 2, CONTENT_W, row_h + 2, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(MARGIN + 6, y + 3, "Total Annual Operating Expenses")
    c.drawString(MARGIN + col1_w + 6, y + 3, "~$36,240")
    c.setFont("Helvetica", 7.5)
    c.drawString(MARGIN + col1_w + col2_w + 6, y + 3, "~$3,020/mo")
    y -= row_h + 6

    # Footnote
    c.setFillColor(GRAY)
    c.setFont("Helvetica-Oblique", 6.5)
    c.drawString(MARGIN, y, "* Cleaning service costs (~$14,400/yr) are typically offset by cleaning fees collected from guests, making net operating costs substantially lower.")

    draw_footer(c, 1)


def draw_page2(c):
    """Draw all content for page 2."""

    # ---- THIN HEADER BAR (page 2) ----
    header_h = 50
    c.setFillColor(DARK_BROWN)
    c.rect(0, PAGE_H - header_h, PAGE_W, header_h, fill=1, stroke=0)
    c.setFillColor(CREAM)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(MARGIN, PAGE_H - 28, "399 RAINIER ROAD")
    c.setFont("Helvetica", 9)
    c.setFillColor(ACCENT_TAN)
    c.drawString(MARGIN, PAGE_H - 42, "Investment Property Details  ·  Lake Arrowhead, California")
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 13)
    c.drawRightString(PAGE_W - MARGIN, PAGE_H - 32, "$875,000")

    y = PAGE_H - header_h - 18

    # ---- THE PROPERTY HIGHLIGHTS ----
    c.setFillColor(GRAY)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN, y, "THE PROPERTY")
    c.setStrokeColor(DARK_BROWN)
    c.setLineWidth(1.5)
    c.line(MARGIN, y - 3, MARGIN + 95, y - 3)
    y -= 16

    highlights = [
        "Floor-to-ceiling A-frame windows with panoramic forest views",
        "Fully renovated with contemporary finishes (2023)",
        "Two masonry fireplaces (wood + gas capable)",
        "Three expansive decks with string lights",
        "Private hot tub among the pines",
        "Brand new HVAC system (May 2023)",
        "Open-concept great room with soaring ceilings",
        "Modern kitchen with butcher block counters",
        "90 minutes from downtown Los Angeles",
        "No Mello-Roos  ·  No flood zone  ·  STR permit compliant",
        "Existing Airbnb/VRBO accounts, reviews & operating systems transfer with sale",
    ]

    half = (len(highlights) + 1) // 2
    col_w = CONTENT_W / 2 - 8
    row_h = 13

    for i, h in enumerate(highlights):
        col = i // half
        row = i % half
        bx = MARGIN + col * (col_w + 16)
        hy = y - row * row_h

        # Bullet dot
        c.setFillColor(DARK_BROWN)
        c.circle(bx + 4, hy + 3, 2, fill=1, stroke=0)

        c.setFillColor(NEAR_BLACK)
        c.setFont("Helvetica", 7.5)
        c.drawString(bx + 10, hy, h)

    rows_used = half
    y -= rows_used * row_h + 18

    # ---- WHY THIS PROPERTY STANDS OUT ----
    c.setFillColor(GRAY)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN, y, "WHY THIS PROPERTY STANDS OUT")
    c.setStrokeColor(DARK_BROWN)
    c.setLineWidth(1.5)
    c.line(MARGIN, y - 3, MARGIN + 215, y - 3)
    y -= 16

    callouts = [
        (
            "Turnkey Operating Business",
            "Verified 5-star reviews, existing Airbnb/VRBO accounts, active STR permit, professional cleaning service, and all operating systems transfer with the sale."
        ),
        (
            "Regulatory Moat",
            "Lake Arrowhead limits short-term rental permits. This property is among ~1,250 permitted STRs\u2014new permits are not guaranteed, protecting the value of compliant properties."
        ),
        (
            "Featured by VRBO",
            "Selected for VRBO\u2019s official Instagram campaign in December 2025, providing platform credibility and marketing reach beyond typical listings."
        ),
    ]

    box_w = (CONTENT_W - 8) / 3
    box_h = 82

    for i, (title, body) in enumerate(callouts):
        bx = MARGIN + i * (box_w + 4)
        by = y - box_h

        c.setFillColor(CREAM)
        c.rect(bx, by, box_w, box_h, fill=1, stroke=0)

        # Top accent
        c.setFillColor(DARK_BROWN)
        c.rect(bx, by + box_h - 4, box_w, 4, fill=1, stroke=0)

        # Title
        c.setFillColor(DARK_BROWN)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(bx + 8, by + box_h - 18, title)

        # Body text wrapped manually
        c.setFillColor(NEAR_BLACK)
        c.setFont("Helvetica", 7)
        words = body.split()
        lines = []
        current = ""
        max_chars = 42
        for w in words:
            test = (current + " " + w).strip()
            if len(test) <= max_chars:
                current = test
            else:
                if current:
                    lines.append(current)
                current = w
        if current:
            lines.append(current)

        for li, line in enumerate(lines[:6]):
            c.drawString(bx + 8, by + box_h - 30 - li * 9, line)

    y -= box_h + 20

    # ---- LOCATION / DRIVE TIMES ----
    c.setFillColor(GRAY)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN, y, "LOCATION & DRIVE TIMES")
    c.setStrokeColor(DARK_BROWN)
    c.setLineWidth(1.5)
    c.line(MARGIN, y - 3, MARGIN + 155, y - 3)
    y -= 16

    locations = [
        ("Downtown Los Angeles", "90 min"),
        ("Ontario International Airport", "60 min"),
        ("Big Bear Lake", "45 min"),
        ("San Bernardino", "35 min"),
    ]

    loc_col_w = CONTENT_W / 2 - 8
    loc_h = 22

    for i, (place, time) in enumerate(locations):
        col = i % 2
        row = i // 2
        bx = MARGIN + col * (loc_col_w + 16)
        ly = y - row * (loc_h + 4)

        c.setFillColor(CREAM)
        c.rect(bx, ly - loc_h + 4, loc_col_w, loc_h, fill=1, stroke=0)

        # Left accent line
        c.setFillColor(DARK_BROWN)
        c.rect(bx, ly - loc_h + 4, 3, loc_h, fill=1, stroke=0)

        c.setFillColor(NEAR_BLACK)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(bx + 10, ly - 4, place)

        c.setFillColor(DARK_BROWN)
        c.setFont("Helvetica-Bold", 10)
        c.drawRightString(bx + loc_col_w - 8, ly - 4, time)

    rows_used_loc = (len(locations) + 1) // 2
    y -= rows_used_loc * (loc_h + 4) + 20

    # ---- CONTACT & NEXT STEPS ----
    contact_h = 105
    c.setFillColor(DARK_BROWN)
    c.rect(MARGIN, y - contact_h, CONTENT_W, contact_h, fill=1, stroke=0)

    # Section title inside box
    c.setFillColor(ACCENT_TAN)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(MARGIN + 16, y - 16, "CONTACT & NEXT STEPS")

    c.setStrokeColor(ACCENT_TAN)
    c.setLineWidth(0.5)
    c.line(MARGIN + 16, y - 20, MARGIN + CONTENT_W - 16, y - 20)

    # Left column: agent info
    lx = MARGIN + 16
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(lx, y - 36, "Gary Doss")
    c.setFont("Helvetica", 8.5)
    c.setFillColor(CREAM)
    c.drawString(lx, y - 48, "Senior Real Estate Agent  |  Compass")
    c.drawString(lx, y - 60, "DRE# 01416748")
    c.setFillColor(ACCENT_TAN)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(lx, y - 72, "gary.doss@compass.com")

    # Right column: website + note
    rx = MARGIN + CONTENT_W / 2 + 16
    c.setFillColor(CREAM)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(rx, y - 36, "Full Investment Details + Photos:")
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(rx, y - 50, "399rainier.com")

    c.setFillColor(CREAM)
    c.setFont("Helvetica-Oblique", 7.5)
    note_lines = [
        "Request income verification documents,",
        "permit documentation, and operating history.",
    ]
    for li, line in enumerate(note_lines):
        c.drawString(rx, y - 66 - li * 10, line)

    draw_footer(c, 2)


def generate_pdf():
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

    c = canvas.Canvas(OUTPUT_PATH, pagesize=letter)
    c.setTitle("399 Rainier Road - Investment Package")
    c.setAuthor("Gary Doss | Compass")
    c.setSubject("Short-Term Rental Investment Property - Lake Arrowhead, CA")

    # Page 1
    draw_page1(c)
    c.showPage()

    # Page 2
    draw_page2(c)
    c.showPage()

    c.save()
    print(f"PDF saved to: {OUTPUT_PATH}")


if __name__ == "__main__":
    generate_pdf()
