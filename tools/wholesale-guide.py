#!/usr/bin/env python3
"""Builds public/wholesale/agora-wholesale-guide.pdf (the downloadable Wholesale guide).

Run from the repo root:  python3 tools/wholesale-guide.py
Images come from public/wholesale/*.jpg (generated once; safe to re-run).
"""
from pathlib import Path
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, white
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Paragraph, Frame
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT

ROOT = Path(__file__).resolve().parents[1]
PUB = ROOT / 'public' / 'wholesale'
OUT = PUB / 'agora-wholesale-guide.pdf'

NAVY = HexColor('#0d2238'); INK = HexColor('#081626'); SKY = HexColor('#15AFF7'); SKY2 = HexColor('#0D94D1')
GRAY = HexColor('#5b6b7c'); LIGHT = HexColor('#f4f7fb'); LINE = HexColor('#dde4ec')
W, H = letter
M = 0.85 * inch

body = ParagraphStyle('body', fontName='Helvetica', fontSize=10.5, leading=15.5, textColor=HexColor('#1f2a37'), alignment=TA_LEFT)
body_w = ParagraphStyle('bodyw', parent=body, textColor=HexColor('#d6e6f5'))
h1 = ParagraphStyle('h1', fontName='Helvetica-Bold', fontSize=26, leading=30, textColor=NAVY)
h2 = ParagraphStyle('h2', fontName='Helvetica-Bold', fontSize=14, leading=18, textColor=NAVY, spaceBefore=8, spaceAfter=3)
eyebrow = ParagraphStyle('eb', fontName='Helvetica-Bold', fontSize=8.5, leading=11, textColor=SKY2)
bullet = ParagraphStyle('bul', parent=body, leftIndent=14, bulletIndent=2, spaceAfter=2)
quote = ParagraphStyle('q', fontName='Helvetica-Oblique', fontSize=12.5, leading=18, textColor=NAVY)

page_no = [0]

def footer(c, dark=False):
    page_no[0] += 1
    c.setFont('Helvetica', 8)
    c.setFillColor(HexColor('#9fb3c8') if dark else GRAY)
    c.drawString(M, 0.5 * inch, 'Agora Wholesale  ·  agoraassurancesolutions.com/wholesale')
    c.drawRightString(W - M, 0.5 * inch, f'{page_no[0]:02d}')

def logo(c, x, y, h=0.42 * inch, white_variant=False):
    """The Agora Wholesale lock-up: the same baked image the website uses
    (WHOLESALE under the "ora", level with the g's descender)."""
    img = PUB / ('agora-wholesale-logo-white@2x.png' if white_variant else 'agora-wholesale-logo-dark@2x.png')
    ir = ImageReader(str(img)); iw, ih = ir.getSize()
    w = h * iw / ih
    c.drawImage(ir, x, y, w, h, mask='auto')
    return w

def flow(c, x, y, w, h, items):
    f = Frame(x, y, w, h, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0, showBoundary=0)
    f.addFromList(list(items), c)

def photo(c, name, x, y, w, h, radius=10):
    p = PUB / f'{name}.jpg'
    if not p.exists():
        c.setFillColor(LIGHT); c.roundRect(x, y, w, h, radius, fill=1, stroke=0); return
    ir = ImageReader(str(p)); iw, ih = ir.getSize()
    # cover-fit crop
    scale = max(w / iw, h / ih); cw, ch = iw * scale, ih * scale
    c.saveState()
    path = c.beginPath(); path.roundRect(x, y, w, h, radius); c.clipPath(path, stroke=0)
    c.drawImage(ir, x - (cw - w) / 2, y - (ch - h) / 2, cw, ch)
    c.restoreState()

def section_header(c, eb, title):
    c.setFillColor(LIGHT); c.rect(0, H - 1.55 * inch, W, 1.55 * inch, fill=1, stroke=0)
    c.setFillColor(SKY); c.rect(0, H - 1.55 * inch, W, 3, fill=1, stroke=0)
    logo(c, W - M - 1.05 * inch, H - 0.95 * inch, h=0.3 * inch)
    flow(c, M, H - 1.4 * inch, W - 2 * M - 1.4 * inch, 1.2 * inch, [Paragraph(eb, eyebrow), Paragraph(title, h1)])

def cover(c):
    c.setFillColor(INK); c.rect(0, 0, W, H, fill=1, stroke=0)
    # glow
    for i, a in enumerate([0.05, 0.08, 0.12, 0.18]):
        c.setFillColor(HexColor('#15AFF7'), alpha=a); r = 3.6 * inch - i * 0.6 * inch
        c.circle(W - 1.2 * inch, H - 1.1 * inch, r, fill=1, stroke=0)
    c.setFillColor(HexColor('#ffffff'), alpha=1)
    logo(c, M, H - 1.6 * inch, h=0.55 * inch, white_variant=True)
    c.setFillColor(SKY); c.setFont('Helvetica-Bold', 9)
    c.drawString(M, H - 3.4 * inch, 'T H E   P A R T N E R   G U I D E')
    c.setFillColor(white); c.setFont('Helvetica-Bold', 40)
    c.drawString(M, H - 4.1 * inch, 'Built for agencies')
    c.drawString(M, H - 4.65 * inch, 'that already produce.')
    flow(c, M, H - 6.4 * inch, 5.6 * inch, 1.5 * inch, [Paragraph(
        'What Agora Wholesale is, who it is for, the four verticals every partner can plug into, '
        'how the reporting layer works, and exactly what happens after you apply.', ParagraphStyle('cv', parent=body_w, fontSize=12.5, leading=19))])
    photo(c, 'reporting', M, 1.1 * inch, W - 2 * M, 3.1 * inch, radius=14)
    c.setFillColor(HexColor('#9fb3c8')); c.setFont('Helvetica', 8.5)
    c.drawString(M, 0.75 * inch, 'Agora Assurance Solutions  ·  Wholesale Division  ·  2026 edition')
    page_no[0] += 1

def page_what(c):
    section_header(c, 'CHAPTER 01', 'What Agora Wholesale is')
    flow(c, M, 2.0 * inch, 3.55 * inch, H - 3.9 * inch, [
        Paragraph('Most wholesale channels want you to fly their flag. Agora does not. We are the visibility and resource layer that sits beside the agency you already built: direct-level contracts, your own white-labeled technology, a lead store with prices you can see, and a marketplace of tools, all behind one login and one set of reporting.', body),
        Paragraph('Think of it as the Pentagon, not the Army', h2),
        Paragraph('The Pentagon does not command the Army, the Navy or the Air Force. It sees all of them in one place. That is the job Agora plays for partner agencies: every carrier, every lead dollar, every tool, visible in one reporting layer, while your contracts and your people stay yours.', body),
        Paragraph('We sell the tools. We are not mining for your gold.', quote),
        Paragraph('Agora is agnostic on purpose. You do not have to use our quoting engine, our rate watcher or our CRM. You choose from the marketplace. When you buy through Agora, the partner pricing is yours.', body),
    ])
    photo(c, 'owner', M + 3.85 * inch, 2.0 * inch, W - 2 * M - 3.85 * inch, H - 3.9 * inch)
    footer(c)

def page_who(c):
    section_header(c, 'CHAPTER 02', 'Who it is for')
    photo(c, 'technology', M, H - 4.6 * inch, W - 2 * M, 2.8 * inch)
    flow(c, M, 1.0 * inch, W - 2 * M, H - 5.9 * inch, [
        Paragraph('Wholesale is for real agencies. Not a first team, not an individual producer looking for a higher contract. If you are building from zero, the Agora Advisor program is the right door. Wholesale is for shops that already know how to run an agency and need resources, not pep talks.', body),
        Paragraph('You are a fit if', h2),
        Paragraph('Your producers submit business every week and you have the reporting to prove it.', bullet, bulletText='•'),
        Paragraph('You want your own brand on the door and Agora running the engine behind it.', bullet, bulletText='•'),
        Paragraph('You are capped at the level a national IMO is willing to give an outsider.', bullet, bulletText='•'),
        Paragraph('You want leads, tools and contracts you choose, priced where you can see them.', bullet, bulletText='•'),
        Paragraph('What we are not', h2),
        Paragraph('We are not a training company for wholesale partners. Training content lives in the portal as a resource, not a requirement. We are not a contract hierarchy. Your carrier relationships stay where they are.', body),
    ])
    footer(c)

def page_vertical(c, n, key, title, tagline, paras, bullets):
    section_header(c, f'VERTICAL 0{n}', title)
    photo(c, key, M, H - 4.5 * inch, W - 2 * M, 2.7 * inch)
    items = [Paragraph(tagline, quote)] + [Paragraph(p, body) for p in paras] + [Paragraph("What's inside", h2)] + [Paragraph(b, bullet, bulletText='•') for b in bullets]
    flow(c, M, 1.0 * inch, W - 2 * M, H - 5.8 * inch, items)
    footer(c)

def page_reporting(c):
    section_header(c, 'CHAPTER 03', 'The reporting layer')
    photo(c, 'reporting', M, H - 4.5 * inch, W - 2 * M, 2.7 * inch)
    flow(c, M, 1.0 * inch, W - 2 * M, H - 5.8 * inch, [
        Paragraph('Agora holds direct contracts, so Agora can see the math: production, renewals, and who owes what to whom, across every carrier. Partner agencies plug into that same reporting. No more reconciling five carrier statements by hand to find out what you actually earned.', body),
        Paragraph('What the reporting shows', h2),
        Paragraph('Production by carrier, by agency, by producer, by week.', bullet, bulletText='•'),
        Paragraph('Lead spend and lead outcomes, side by side.', bullet, bulletText='•'),
        Paragraph('Marketplace and partner revenue, including shared-revenue tools.', bullet, bulletText='•'),
        Paragraph('Promotion guidelines and gamification for every manager and agent plugged in.', bullet, bulletText='•'),
        Paragraph('Honest note', h2),
        Paragraph('Carrier API feeds are being connected one carrier at a time. Partners see each feed appear in the portal as it comes online. This guide is updated as that happens.', body),
    ])
    footer(c)

def page_how(c):
    section_header(c, 'CHAPTER 04', 'How it works')
    steps = [
        ('01', 'Apply', 'Five minutes. Agency size, weekly production, current IMO, carriers, and which verticals you want.'),
        ('02', 'Review', 'A person reads every application. If the fit is right, we reach out to schedule a call.'),
        ('03', 'Approval', 'Approved agencies get a portal invitation by email and set a password.'),
        ('04', 'Plug in', 'Contracts, technology, leads and tools are yours to pick from inside the portal.'),
    ]
    y = H - 2.3 * inch
    for num, t, d in steps:
        c.setFillColor(SKY); c.circle(M + 0.22 * inch, y - 0.05 * inch, 0.2 * inch, fill=1, stroke=0)
        c.setFillColor(white); c.setFont('Helvetica-Bold', 9); c.drawCentredString(M + 0.22 * inch, y - 0.1 * inch, num)
        flow(c, M + 0.65 * inch, y - 0.9 * inch, W - 2 * M - 0.65 * inch, 1.0 * inch, [Paragraph(t, h2), Paragraph(d, body)])
        y -= 1.15 * inch
    photo(c, 'studio', M, 1.0 * inch, W - 2 * M, 2.4 * inch)
    footer(c)

def page_faq(c):
    section_header(c, 'CHAPTER 05', 'Straight answers')
    qa = [
        ('Is this a contracting hierarchy?', 'No. Your carrier contracts stay yours. Agora is the visibility and resource layer: reporting, technology, leads and tools in one place.'),
        ('Do you train our agents?', 'Wholesale is for shops that already run an agency. Training content is in the portal as a resource, not a requirement.'),
        ('What does it cost?', 'Contract access has no platform fee. White-labeled technology is a paid build. Leads and marketplace tools are priced per item and shown before you buy.'),
        ('Can I keep my own tools?', 'Yes. Agora is agnostic. Use what works. Add from the marketplace when it saves you money or time.'),
        ('What happens after I apply?', 'We review by hand. If your agency fits, we schedule a call. Once approved, your portal invitation arrives by email.'),
    ]
    items = []
    for q, a in qa:
        items += [Paragraph(q, h2), Paragraph(a, body)]
    flow(c, M, 1.0 * inch, W - 2 * M, H - 2.7 * inch, items)
    footer(c)

def page_back(c):
    c.setFillColor(INK); c.rect(0, 0, W, H, fill=1, stroke=0)
    logo(c, M, H - 1.6 * inch, h=0.5 * inch, white_variant=True)
    c.setFillColor(white); c.setFont('Helvetica-Bold', 30)
    c.drawString(M, H - 3.3 * inch, 'Ready to run your agency')
    c.drawString(M, H - 3.75 * inch, 'on Agora?')
    flow(c, M, H - 5.6 * inch, 5.4 * inch, 1.5 * inch, [
        Paragraph('Apply at <b>agoraassurancesolutions.com/wholesale/apply</b>. Every application is read by a person. Questions: info@agoraassurancesolutions.com', ParagraphStyle('bk', parent=body_w, fontSize=12.5, leading=19))])
    photo(c, 'marketplace', M, 1.1 * inch, W - 2 * M, 3.4 * inch, radius=14)
    footer(c, dark=True)

def build():
    c = canvas.Canvas(str(OUT), pagesize=letter)
    c.setTitle('Agora Wholesale: The Partner Guide'); c.setAuthor('Agora Assurance Solutions')
    cover(c); c.showPage()
    page_what(c); c.showPage()
    page_who(c); c.showPage()
    page_vertical(c, 1, 'contracts', 'Contracts', 'Direct-contract levels without the IMO tax.',
        ['Agora sits on direct carrier contracts. Qualified agencies plug in at levels most wholesale channels cannot offer, because there is no middle layer taking a cut before you.',
         'Levels are never shown in public. Once approved, your contact walks you through the exact grid for the carriers you write.'],
        ['Direct-level contracts across the core life, annuity and final expense carriers.', 'Renewals paid on the same schedule Agora is paid.', 'Contracting support for new carrier appointments.']); c.showPage()
    page_vertical(c, 2, 'technology', 'Technology', 'Your agency, running on our systems.',
        ['Reporting, promotion tracking, gamification and agent onboarding, white-labeled to your brand. You keep your name on the door; we keep the engine running.',
         'White-label builds are scoped and priced per agency. Partners who do not need a build still get the shared portal.'],
        ['Agency dashboard with production, promotions and leaderboards.', 'Onboarding flow for new producers, licensing to first policy.', 'Your logo, your colors, your domain.']); c.showPage()
    page_vertical(c, 3, 'leads', 'Lead Store', 'Priced by Agora. Sold at cost-plus.',
        ['A central lead store with transparent pricing set by Agora, so your producers are never guessing what a lead is worth or where it came from.',
         'Lead outcomes feed back into reporting, so you can see which sources write business, not just which ones were cheap.'],
        ['Transparent per-lead pricing, visible before you buy.', 'Source and vertical tagged on every lead.', 'Outcome reporting tied to production.']); c.showPage()
    page_vertical(c, 4, 'marketplace', 'Tool Marketplace', 'Every tool an agency needs, in one place.',
        ['Rate engines, quoting, estate and tax planning partners, and more, embedded in the portal at partner pricing. Buy through Agora and the discount is yours.',
         'Partners are being onboarded now. Each one appears in the portal as the agreement is signed.'],
        ['Annuity and life quoting tools at partner pricing.', 'Estate planning and tax partners with shared revenue on completed work.', 'One invoice, one login.']); c.showPage()
    page_reporting(c); c.showPage()
    page_how(c); c.showPage()
    page_faq(c); c.showPage()
    page_back(c); c.showPage()
    c.save()
    print('wrote', OUT, OUT.stat().st_size // 1024, 'KB')

if __name__ == '__main__':
    build()
