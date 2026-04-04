

## Cruxway Website Copy Audit — Implementation Plan

This plan covers all copy changes from the audit, organized by file. Only text strings are modified. No layout, animation, CSS, or component logic changes.

---

### 1. `src/pages/Landing.tsx`
- Line 75: `"Investment & Partnership"` → `"Capital & Partnership for Essential Businesses"`

### 2. `src/pages/Home.tsx`
- Line 409: Section label `"Investment Firm"` → `"Long-Term Capital"`
- Line 420: US hero headline → `Supporting the Essential Businesses That Keep American <gold>Industry</gold> Running`
- Line 419: India hero headline → `Partnering with the Industrial Businesses Building <gold>India's Next Decade</gold>`
- Line 427: US hero sub → `"We take majority stakes in power services, financial compliance, and IT infrastructure companies. Our approach was shaped at blue-chip firms and refined into something distinctly our own."`
- Line 464: ScrollReveal heading → drop "help": `"We partner with businesses where the product is proven and the customers are loyal. We professionalize the systems around them and protect what the founder built."`
- Line 477: India market thesis → `"Sixty-three million MSMEs with real revenue and real customers, but almost none have access to the capital and systems that could scale them into something larger."`
- Line 56: US Process Step 04 → `"Real systems from day one. Financial controls, reporting infrastructure, and a growth plan built around what the business actually needs."`
- Line 63: India Process Step 04 → `"We bring the infrastructure: governance, financial reporting, working capital discipline, and a growth roadmap. They bring the business."`
- Line 496: Process section header → `"How a Deal Comes Together"`
- Line 512: US Social Proof text → `"Trained at some of the best firms in the world. Now investing with personal <gold>conviction</gold> in the businesses that run America's <gold>infrastructure.</gold>"`
- Line 537: US CTA headline → `"You've Built Something Worth Protecting"`

### 3. `src/pages/GuidingPrinciples.tsx`
- Line 66: CTA heading → `"Aligned on What Matters"`
- Line 70: CTA body → `"When values are aligned, everything else gets easier. If what you've read here reflects how you think about business and partnership, we'd welcome the conversation."`

### 4. `src/components/CruxwayOriginStory.tsx`
- Line 530: Act 4 closing → `"Tested conviction. Disciplined path."`

### 5. `src/pages/OurFocus.tsx`
- Line 131: US hero sub → `"Our approach was shaped by years at blue-chip institutions and refined over hundreds of deals. Here is what it looks like in practice."`
- Line 130: India hero sub → `"We bring the rigor of global institutions to the relationships that matter most: founder-led businesses across India."`
- Line 24: Hold Period value → `"Permanent and long-term ownership. No predefined exit horizon."`
- Line 31: India Hold Period value → same change
- Line 264: India CTA headline → `"Does This Sound Like Your Business?"`

### 6. `src/pages/OurPlaybook.tsx`
- Line 347: Hero sub → `"We have spent our careers partnering with founders who built exceptional businesses. We know what separates good from great, and we bring that lens to every deal."`
- Line 22: Diligence step → `"Comprehensive financial, legal, and operational analysis with sector-specific specialists. Our goal is to understand the business as well as the owner does before we commit."`
- Line 377: "Our Edge" ScrollReveal → `"Years of evaluating and operating businesses in these sectors have built a pattern recognition we bring to every new opportunity. It does not replace judgment. It sharpens it."`
- CTA button text → `"Reach Out"` (line 427)

### 7. `src/pages/Team.tsx`
- Line 389: Stats label → `"Years Combined"` → `"Years Experience"`
- Line 93: Harin bio → `"Harin has spent more than a decade investing in and operating companies across business and consumer sectors. His approach pairs operating experience with patient capital, always with the founder's legacy in mind. Based in San Diego. Reads history. Finds good food."`
- Line 126: Vaibhav bio → `"Vaibhav has built his career across early-stage investing, venture capital, and company-building in India. He developed a conviction for the lower middle market in manufacturing and industrial services, where operational improvement drives outsized returns. Based in Delhi. Golf, fountain pens, watches, and wherever the next flight goes."`

### 8. `src/pages/Contact.tsx`
- Line 81: US email card → `"For partnership conversations and general inquiries."`
- India hero sub (line 48) → add `" No intermediaries."` at end: `"Confidential, direct conversations with founders and business owners across India. No intermediaries."`

### 9. CTA Button Text Variation (across pages)
- Home: `"Get in Touch"` (keep)
- Our Focus: `"Start a Conversation"` (change from "Get in Touch")
- Our Playbook: `"Reach Out"` (change from "Get in Touch")
- Guiding Principles: `"Let's Talk"` (change from "Get in Touch")
- Contact: no CTA button

---

### Files Modified
`Landing.tsx`, `Home.tsx`, `GuidingPrinciples.tsx`, `CruxwayOriginStory.tsx`, `OurFocus.tsx`, `OurPlaybook.tsx`, `Team.tsx`, `Contact.tsx`

### Constraints
- Text-only changes. No modifications to animations, effects, layout, CSS classes, or component logic.
- Regional parity maintained across US/India variants.

