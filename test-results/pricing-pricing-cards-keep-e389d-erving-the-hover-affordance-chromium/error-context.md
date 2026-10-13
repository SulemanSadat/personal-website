# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pricing.spec.ts >> pricing cards keep their text crisp while preserving the hover affordance
- Location: tests\browser\pricing.spec.ts:45:5

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 75

  Object {
    "card": "none",
-   "descendants": Array [],
+   "descendants": Array [
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+     "none",
+   ],
  }

Call Log:
- Timeout 15000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - link "Skip to content" [ref=e3]:
      - /url: "#main-content"
    - banner [ref=e4]:
      - generic [ref=e5]:
        - link "Suleman Sadat — Home" [ref=e6]:
          - /url: /#home
          - generic [ref=e7]:
            - text: Suleman Sadat
            - generic [ref=e8]: ENGINEER & MAKER
        - navigation "Main navigation" [ref=e9]:
          - link "Home" [ref=e10]:
            - /url: /#home
          - link "Portfolio" [ref=e11]:
            - /url: /#portfolio
          - link "Pricing" [ref=e12]:
            - /url: /#pricing
          - link "About" [ref=e13]:
            - /url: /#about
          - link "Contact" [ref=e14]:
            - /url: /#contact
          - link "Blog" [ref=e18]:
            - /url: /blog
        - button "Switch to light mode" [ref=e20]
    - main [ref=e24]:
      - generic [ref=e26]:
        - region "Introduction and project journey" [ref=e29]:
          - generic [ref=e34]:
            - generic [ref=e35]: INDEPENDENT SOFTWARE ENGINEER
            - generic [ref=e36]: AVAILABLE FOR SELECT PROJECTS
          - heading "SULEMAN SADAT." [level=1] [ref=e39]:
            - text: SULEMAN
            - generic [ref=e40]: SADAT.
          - generic:
            - img "Suleman Sadat standing with crossed arms in a black suit"
          - generic [ref=e41]:
            - generic:
              - generic: HELLO, I’M SULEMAN.
              - paragraph: Software EngineerFull-Stack Developer
            - generic [ref=e42]:
              - generic [aria-hidden] [ref=e43]: +
              - paragraph [ref=e44]: Building digital products. Bringing startups to life.
              - generic [ref=e45]:
                - button "Hire Me" [ref=e46]
                - link "Explore My Work" [ref=e50]:
                  - /url: /#portfolio
          - generic [ref=e54]:
            - link [ref=e55]:
              - /url: "#portfolio"
            - generic [ref=e60]: A JOURNEY THROUGH IDEAS, CODE & POSSIBILITY
            - generic [ref=e61]: 01 — 07
          - generic [aria-hidden]:
            - generic: 02 / SELECTED WORK
            - paragraph:
              - text: Ideas become
              - emphasis: real things.
          - generic [aria-hidden]:
            - generic: BEYOND THE BUILD
            - paragraph:
              - text: Good work.
              - emphasis: Lasting relationships.
          - button "Use simple view" [ref=e62]
        - generic [ref=e63]:
          - region [ref=e64]:
            - generic [ref=e65]: Good work. Lasting relationships.
            - heading "Testimonials" [level=2] [ref=e66]
            - paragraph [ref=e67]: Hear what professionals and collaborators have to say about working with me.
            - generic [ref=e69]:
              - generic [ref=e71]:
                - generic [ref=e72]:
                  - img "Bilal Kakar" [ref=e73]
                  - generic [ref=e74]:
                    - heading [level=3] [ref=e75]:
                      - text: Bilal Kakar
                      - img "Verified testimonial" [ref=e76]
                    - paragraph [ref=e80]: CEO, MobiMix
                    - generic "5 out of 5 stars" [ref=e81]:
                      - generic [aria-hidden] [ref=e82]: ★★★★★
                - paragraph [ref=e83]: “Sadat Sahib is a hardworking and creative content creator who always delivers professional results. Highly recommended!”
              - generic [ref=e85]:
                - generic [ref=e88]:
                  - heading [level=3] [ref=e89]: Helmand Ahmadzai
                  - paragraph [ref=e94]: Founder, National Oxford
                  - generic [aria-hidden] [ref=e96]: ★★★★★
                - paragraph [ref=e97]: “Suleman is a highly skilled and reliable Full Stack Developer who consistently delivers outstanding results. Highly recommended!”
              - generic [ref=e99]:
                - generic [ref=e102]:
                  - heading [level=3] [ref=e103]: Nematullah Khan
                  - paragraph [ref=e108]: Founder, Azizi Jewellery
                  - generic [aria-hidden] [ref=e110]: ★★★★★
                - paragraph [ref=e111]: “Suleman did an amazing job building our custom Shopify store. He nailed the luxury design we wanted and even helped us optimize our costs to boost our ROI. Highly recommended!”
              - generic [ref=e113]:
                - generic [ref=e116]:
                  - heading [level=3] [ref=e117]: Mahdi Rezaei
                  - paragraph [ref=e122]: Freelancer, UpWork
                  - generic [aria-hidden] [ref=e124]: ★★★★★
                - paragraph [ref=e125]: “Working with Suleman was truly inspiring,his professionalism and creativity make him highly recommended!”
              - generic [ref=e127]:
                - generic [ref=e130]:
                  - heading [level=3] [ref=e131]: M. Aziz Rastegari
                  - paragraph [ref=e136]: Head of Computer Science Department, Avicenna University
                  - generic [aria-hidden] [ref=e138]: ★★★★★
                - paragraph [ref=e139]: “Suleman has great talent and strong skills as a developer, I’m proud to have recognized his hard work and excellence.”
            - generic [ref=e140]:
              - button "Show testimonial from Bilal Kakar" [pressed] [ref=e141]
              - button "Show testimonial from Helmand Ahmadzai" [ref=e142]
              - button "Show testimonial from Nematullah Khan" [ref=e143]
              - button "Show testimonial from Mahdi Rezaei" [ref=e144]
              - button "Show testimonial from M. Aziz Rastegari" [ref=e145]
              - button "Play testimonials" [ref=e146]
          - generic [ref=e150]:
            - region [ref=e151]:
              - generic [ref=e152]:
                - generic [ref=e153]: Clear scope. Thoughtful pricing.
                - heading "Software, automation & AI. Built around your goals." [level=2] [ref=e155]: Software, automation & AI.Built around your goals.
                - paragraph [ref=e156]: Software built for your business, at every stage. Choose your service. Find your fit. Let's make it happen.
                - generic "Included with every project" [ref=e157]:
                  - generic [ref=e158]: Modern technologies
                  - generic [ref=e163]: 100% satisfaction guaranteed
            - region "Service pricing" [ref=e167]:
              - generic [ref=e168]:
                - generic [ref=e169]: What are we building?
                - group "What are we building?" [ref=e170]:
                  - button "Web Apps" [pressed] [ref=e171]
                  - button "Automation" [ref=e174]
                  - button "Mobile App" [ref=e177]
                  - button "Chatbots" [ref=e180]
                  - button "Consultation" [ref=e183]
                - status [ref=e187]: Showing Web Apps pricing packages.
                - region "Web Apps pricing packages" [ref=e188]:
                  - generic [ref=e189]:
                    - generic [ref=e190]:
                      - heading "Web Apps, built for you." [level=2] [ref=e191]
                      - paragraph [ref=e192]: From a standout first impression to a full-scale digital product.
                    - generic [ref=e193]:
                      - article [ref=e194]:
                        - generic [ref=e195]: The essentials
                        - generic [ref=e197]:
                          - heading "Web Presence" [level=3] [ref=e198]
                          - paragraph [ref=e199]: Perfect for freelancers & personal brands.
                        - generic [ref=e200]:
                          - generic [ref=e201]: starting from
                          - generic [ref=e202]: $199
                          - text: USD · Scoped to your project
                        - link "Get started — Web Apps, Web Presence" [ref=e204]:
                          - /url: /?subject=Inquiry%3A+Web+Apps+%E2%80%94+Web+Presence+%28from+%24199%29&message=Hello+Suleman%2C%0A%0AI%E2%80%99m+interested+in+the+Web+Presence+package+for+Web+Apps%2C+starting+from+%24199.+I%E2%80%99d+like+to+discuss+my+project+and+confirm+the+best+next+step.%0A%0ABest%2C#contact
                          - text: Get started
                        - heading "Package comparison" [level=4] [ref=e209]
                        - list "Web Presence feature comparison" [ref=e210]:
                          - listitem [ref=e211]:
                            - generic [ref=e214]:
                              - generic [ref=e215]: "Website scope: Included."
                              - text: 1-page responsive landing
                          - listitem [ref=e216]:
                            - generic [ref=e219]:
                              - generic [ref=e220]: Included.
                              - text: Custom pages & components
                          - listitem [ref=e221]:
                            - generic [ref=e225]:
                              - generic [ref=e226]: Not included.
                              - text: Domain + Hosting
                          - listitem [ref=e227]:
                            - generic [ref=e231]:
                              - generic [ref=e232]: Not included.
                              - text: Mobile App
                          - listitem [ref=e233]:
                            - generic [ref=e237]:
                              - generic [ref=e238]: Not included.
                              - text: Advanced animations / interactions
                          - listitem [ref=e239]:
                            - generic [ref=e243]:
                              - generic [ref=e244]: Not included.
                              - text: 3D Design
                          - listitem [ref=e245]:
                            - generic [ref=e249]:
                              - generic [ref=e250]: Not included.
                              - text: API integrations + auth
                          - listitem [ref=e251]:
                            - generic [ref=e255]:
                              - generic [ref=e256]: Not included.
                              - text: Ecommerce Future
                          - listitem [ref=e257]:
                            - generic [ref=e260]:
                              - generic [ref=e261]: "Revisions: Included."
                              - text: 2 revision round
                        - generic [ref=e262]: "Delivery: 1–3 weeks"
                      - article [ref=e267]:
                        - generic [ref=e268]: Most popular
                        - generic [ref=e270]:
                          - heading "Business Website" [level=3] [ref=e271]
                          - paragraph [ref=e272]: Best for small businesses that want a polished presence.
                        - generic [ref=e273]:
                          - generic [ref=e274]: starting from
                          - generic [ref=e275]:
                            - generic [ref=e276]: $599
                            - generic [ref=e277]: "-45% OFF"
                          - text: USD · Scoped to your project
                        - link "Get started — Web Apps, Business Website" [ref=e278]:
                          - /url: /?subject=Inquiry%3A+Web+Apps+%E2%80%94+Business+Website+%28from+%24599%29&message=Hello+Suleman%2C%0A%0AI%E2%80%99m+interested+in+the+Business+Website+package+for+Web+Apps%2C+starting+from+%24599.+I%E2%80%99d+like+to+discuss+my+project+and+confirm+the+best+next+step.%0A%0ABest%2C#contact
                          - text: Get started
                        - heading "Package comparison" [level=4] [ref=e283]
                        - list "Business Website feature comparison" [ref=e284]:
                          - listitem [ref=e285]:
                            - generic [ref=e288]:
                              - generic [ref=e289]: "Website scope: Included."
                              - text: Up to 5 pages
                          - listitem [ref=e290]:
                            - generic [ref=e293]:
                              - generic [ref=e294]: Included.
                              - text: Custom pages & components
                          - listitem [ref=e295]:
                            - generic [ref=e298]:
                              - generic [ref=e299]: Included.
                              - text: Domain + Hosting
                          - listitem [ref=e300]:
                            - generic [ref=e303]:
                              - generic [ref=e304]: Included.
                              - text: Mobile App
                          - listitem [ref=e305]:
                            - generic [ref=e309]:
                              - generic [ref=e310]: Not included.
                              - text: Advanced animations / interactions
                          - listitem [ref=e311]:
                            - generic [ref=e315]:
                              - generic [ref=e316]: Not included.
                              - text: 3D Design
                          - listitem [ref=e317]:
                            - generic [ref=e321]:
                              - generic [ref=e322]: Not included.
                              - text: API integrations + auth
                          - listitem [ref=e323]:
                            - generic [ref=e327]:
                              - generic [ref=e328]: Not included.
                              - text: Ecommerce Future
                          - listitem [ref=e329]:
                            - generic [ref=e332]:
                              - generic [ref=e333]: "Revisions: Included."
                              - text: 3 revision rounds
                        - generic [ref=e334]: "Delivery: 2–4 weeks"
                      - article [ref=e339]:
                        - generic [ref=e340]: Built around you
                        - generic [ref=e342]:
                          - heading "Web Platform" [level=3] [ref=e343]
                          - paragraph [ref=e344]: For serious projects with custom requirements.
                        - generic [ref=e345]:
                          - generic [ref=e346]: starting from
                          - generic [ref=e347]: $1499
                          - text: USD · Scoped to your project
                        - link "Request Custom Quote — Web Apps, Web Platform" [ref=e349]:
                          - /url: /?subject=Inquiry%3A+Web+Apps+%E2%80%94+Web+Platform+%28from+%241499%29&message=Hello+Suleman%2C%0A%0AI%E2%80%99m+interested+in+the+Web+Platform+package+for+Web+Apps%2C+starting+from+%241499.+I%E2%80%99d+like+to+discuss+my+project+and+confirm+the+best+next+step.%0A%0ABest%2C#contact
                          - text: Request Custom Quote
                        - heading "Package comparison" [level=4] [ref=e354]
                        - list "Web Platform feature comparison" [ref=e355]:
                          - listitem [ref=e356]:
                            - generic [ref=e359]:
                              - generic [ref=e360]: "Website scope: Included."
                              - text: Custom website scope
                          - listitem [ref=e361]:
                            - generic [ref=e364]:
                              - generic [ref=e365]: Included.
                              - text: Custom pages & components
                          - listitem [ref=e366]:
                            - generic [ref=e369]:
                              - generic [ref=e370]: Included.
                              - text: Domain + Hosting
                          - listitem [ref=e371]:
                            - generic [ref=e374]:
                              - generic [ref=e375]: Included.
                              - text: Mobile App
                          - listitem [ref=e376]:
                            - generic [ref=e379]:
                              - generic [ref=e380]: Included.
                              - text: Advanced animations / interactions
                          - listitem [ref=e381]:
                            - generic [ref=e384]:
                              - generic [ref=e385]: Included.
                              - text: 3D Design
                          - listitem [ref=e386]:
                            - generic [ref=e389]:
                              - generic [ref=e390]: Included.
                              - text: API integrations + auth
                          - listitem [ref=e391]:
                            - generic [ref=e394]:
                              - generic [ref=e395]: Included.
                              - text: Ecommerce Future
                          - listitem [ref=e396]:
                            - generic [ref=e399]:
                              - generic [ref=e400]: "Revisions: Included."
                              - text: Support & Revisions
                        - generic [ref=e401]: "Delivery: tailored to your scope"
                    - article [ref=e406]:
                      - generic [ref=e407]:
                        - generic [ref=e408]: Commerce / Built to sell
                        - heading "Shopify Store" [level=3] [ref=e413]
                        - paragraph [ref=e414]: A considered storefront, ready for your first customers.
                        - generic [ref=e415]: $200/ setup
                        - generic [ref=e416]: One-time setup. Scope agreed upfront.
                      - generic [ref=e421]:
                        - heading "Your store, thoughtfully set up" [level=4] [ref=e422]
                        - list [ref=e423]:
                          - listitem [ref=e424]:
                            - generic [ref=e427]: Product listing
                          - listitem [ref=e428]:
                            - generic [ref=e431]: Custom paid theme installation
                          - listitem [ref=e432]:
                            - generic [ref=e435]: Professional homepage setup and design
                          - listitem [ref=e436]:
                            - generic [ref=e439]: Store configuration
                          - listitem [ref=e440]:
                            - generic [ref=e443]: Domain connection
                        - paragraph [ref=e444]: Theme license, Shopify subscription and domain purchase costs are excluded. Product count and delivery schedule are agreed before work begins.
                        - link "Start my Shopify store — Shopify Store" [ref=e446]:
                          - /url: /?subject=Inquiry%3A+Web+Apps+%E2%80%94+Shopify+Store+%28from+%24200%29&message=Hello+Suleman%2C%0A%0AI%E2%80%99m+interested+in+the+Shopify+Store+package+for+Web+Apps%2C+starting+from+%24200.+I%E2%80%99d+like+to+discuss+my+project+and+confirm+the+best+next+step.%0A%0ABest%2C#contact
                          - text: Start my Shopify store
                    - paragraph [ref=e451]: Final pricing depends on scope & business needs.
                - generic [ref=e452]:
                  - generic [ref=e456]:
                    - heading "A different kind of project?" [level=2] [ref=e457]
                    - paragraph [ref=e458]: Tell me what you have in mind. We'll find the right scope together.
                  - link "Let's talk" [ref=e459]:
                    - /url: mailto:sadat.fullstack@gmail.com
          - region [ref=e463]:
            - generic [ref=e464]:
              - generic [ref=e465]:
                - generic [ref=e466]:
                  - generic [ref=e467]: Behind the code / 01
                  - heading "About Suleman Sadat" [level=2] [ref=e468]
                - generic [ref=e469]: ENGINEERING × ENTREPRENEURSHIP
              - generic [ref=e470]:
                - figure "Suleman Sadat Engineer. Builder. Always learning." [ref=e471]:
                  - img "Suleman Sadat, software engineer and product builder" [ref=e472]
                  - generic [ref=e473]:
                    - generic [ref=e474]: Suleman Sadat
                    - generic [ref=e475]: Engineer. Builder. Always learning.
                - generic [ref=e476]:
                  - generic [ref=e477]: about / suleman.md
                  - heading "Thoughtful code. Useful products." [level=2] [ref=e482]: Thoughtful code.Useful products.
                  - paragraph [ref=e483]: Hey! 👋 I’m Suleman Sadat, a software engineer and full-stack developer with 4+ years of experience building production-ready web applications for international clients.
                  - paragraph [ref=e484]: My work spans web platforms, API integrations, AI automation and product engineering. I collaborate remotely across time zones using tools like GitHub, Slack and Notion, and I’m working toward building useful SaaS products as a tech entrepreneur.
                  - generic [ref=e485]:
                    - generic [ref=e490]:
                      - strong [ref=e491]: From idea to implementation
                      - text: Full-stack systems, with a product mindset.
                    - generic [ref=e497]:
                      - strong [ref=e498]: Built for collaboration
                      - text: Remote experience. Shared ambition.
                  - link "Download Resume" [ref=e499]:
                    - /url: /assets/Suleman_Sadat.pdf
              - region [ref=e503]:
                - generic [ref=e505]:
                  - generic [ref=e506]: The toolkit / Always evolving
                  - heading "Expertise & Skills" [level=2] [ref=e507]
                  - paragraph [ref=e508]: A comprehensive toolkit built through years of hands-on experience and continuous learning.
                - generic [ref=e509]:
                  - list "Core development skills" [ref=e513]:
                    - listitem [ref=e514]:
                      - generic [ref=e517]: TypeScript
                    - listitem [ref=e518]:
                      - generic [ref=e521]: Python
                    - listitem [ref=e522]:
                      - generic [ref=e525]: JavaScript (ES6+)
                    - listitem [ref=e526]:
                      - generic [ref=e529]: C++
                    - listitem [ref=e530]:
                      - generic [ref=e533]: PHP
                    - listitem [ref=e534]:
                      - generic [ref=e537]: SQL
                    - listitem [ref=e538]:
                      - generic [ref=e541]: Java
                    - listitem [ref=e542]:
                      - generic [ref=e549]: C#
                    - listitem [ref=e550]:
                      - generic [ref=e553]: React.js
                    - listitem [ref=e554]:
                      - generic [ref=e557]: Next.js
                  - list "Product and application skills" [ref=e561]:
                    - listitem [ref=e562]:
                      - generic [ref=e565]: Figma
                    - listitem [ref=e566]:
                      - generic [ref=e569]: Flutter
                    - listitem [ref=e570]:
                      - generic [ref=e573]: HTML5/CSS3
                    - listitem [ref=e574]:
                      - generic [ref=e577]: Tailwind CSS
                    - listitem [ref=e578]:
                      - generic [ref=e581]: React Native
                    - listitem [ref=e582]:
                      - generic [ref=e585]: Laravel
                    - listitem [ref=e586]:
                      - generic [ref=e589]: Telegram API
                    - listitem [ref=e590]:
                      - generic [ref=e593]: Node.js
                    - listitem [ref=e594]:
                      - generic [ref=e597]: MySQL
                    - listitem [ref=e598]:
                      - generic [ref=e602]: RESTful APIs
                  - list "AI, automation and delivery skills" [ref=e606]:
                    - listitem [ref=e607]:
                      - generic [ref=e610]: Claude Code
                    - listitem [ref=e611]:
                      - generic [ref=e614]: n8n
                    - listitem [ref=e615]:
                      - generic [ref=e619]: OpenAI API
                    - listitem [ref=e620]:
                      - generic [ref=e623]: Cursor AI
                    - listitem [ref=e624]:
                      - generic [ref=e627]: Prompt Engineering
                    - listitem [ref=e628]:
                      - generic [ref=e632]: Codex
                    - listitem [ref=e633]:
                      - generic [ref=e636]: Docker
                    - listitem [ref=e637]:
                      - generic [ref=e640]: Shopify
                    - listitem [ref=e641]:
                      - generic [ref=e644]: Git/GitHub
                    - listitem [ref=e645]:
                      - generic [ref=e648]: CI/CD
                    - listitem [ref=e649]:
                      - generic [ref=e652]: WordPress
          - region [ref=e653]:
            - generic [ref=e654]:
              - generic [ref=e655]:
                - generic [ref=e656]: Let's build something useful
                - heading "Contact Suleman Sadat" [level=2] [ref=e657]
                - paragraph [ref=e658]: Let’s discuss your full-stack web application, AI automation workflow, chatbot, mobile product or technical consulting needs.
              - generic [ref=e659]:
                - generic [ref=e660]:
                  - heading "Contact Information" [level=2] [ref=e661]
                  - paragraph [ref=e662]: Feel free to reach out through any of the following channels.
                  - generic [ref=e668]:
                    - heading "Email" [level=3] [ref=e669]
                    - link "sadat.fullstack@gmail.com" [ref=e670]:
                      - /url: mailto:sadat.fullstack@gmail.com
                  - generic [ref=e671]:
                    - heading "Follow Me" [level=3] [ref=e672]
                    - generic [ref=e673]:
                      - link "GitHub" [ref=e674]:
                        - /url: https://github.com/SulemanSadat
                      - link "LinkedIn" [ref=e677]:
                        - /url: https://www.linkedin.com/in/suleman-sadat/
                      - link "Instagram" [ref=e681]:
                        - /url: https://www.instagram.com/suleman_sadat_
                      - link "Twitter" [ref=e685]:
                        - /url: https://www.x.com/suleman_sadat_
                - generic [ref=e689]:
                  - heading "Send a Message" [level=2] [ref=e690]
                  - generic [ref=e691]:
                    - generic [ref=e692]:
                      - generic [ref=e693]: Name
                      - textbox "Name" [ref=e694]:
                        - /placeholder: Your full name
                    - generic [ref=e695]:
                      - generic [ref=e696]: Email
                      - textbox "Email" [ref=e697]:
                        - /placeholder: your.email@example.com
                    - generic [ref=e698]:
                      - generic [ref=e699]: Subject
                      - textbox "Subject" [ref=e700]:
                        - /placeholder: What's this about?
                    - generic [ref=e701]:
                      - generic [ref=e702]: Message
                      - textbox "Message" [ref=e703]:
                        - /placeholder: Tell me about your project...
                    - button "Send Message" [ref=e704]
    - contentinfo [ref=e708]:
      - generic [ref=e709]:
        - generic [ref=e710]:
          - generic [ref=e712]:
            - heading [level=2] [ref=e713]:
              - link "Suleman Sadat." [ref=e714]:
                - /url: /
            - paragraph [ref=e715]: Software engineer with 4+ years of experience building production-ready web applications for international clients. Capable of managing full-stack systems independently and supporting teams with technical solutions.
          - generic [ref=e716]:
            - heading "Quick Links" [level=3] [ref=e717]
            - navigation "Footer navigation" [ref=e718]:
              - link "Home" [ref=e719]:
                - /url: /
              - link "About" [ref=e720]:
                - /url: /#about
              - link "Projects" [ref=e721]:
                - /url: /#portfolio
              - link "Pricing" [ref=e722]:
                - /url: /#pricing
              - link "Blog" [ref=e723]:
                - /url: /blog
              - link "Contact" [ref=e724]:
                - /url: /#contact
          - generic [ref=e725]:
            - heading "Connect" [level=3] [ref=e726]
            - generic [ref=e727]:
              - link "LinkedIn" [ref=e728]:
                - /url: https://www.linkedin.com/in/suleman-sadat/
              - link "Twitter" [ref=e732]:
                - /url: https://www.x.com/suleman_sadat_
              - link "Instagram" [ref=e736]:
                - /url: https://www.instagram.com/suleman_sadat_
              - link "GitHub" [ref=e740]:
                - /url: https://www.github.com/SulemanSadat
        - generic [ref=e744]:
          - paragraph [ref=e746]: © 2026 Suleman Sadat. All rights reserved.
          - button "Back to top" [ref=e747]: ↑
      - region [ref=e748]:
        - generic [aria-hidden] [ref=e749]:
          - generic [ref=e750]: INDEPENDENT DEVELOPER / PRODUCT BUILDER
          - generic [ref=e751]: © 2026
        - heading "SULEMAN SADAT" [level=2] [ref=e752]
    - paragraph [ref=e753]
    - complementary "Page position" [ref=e754]:
      - generic [aria-hidden] [ref=e755]: "65"
      - scrollbar "Page scroll progress" [ref=e756]
  - alert [ref=e757]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("pricing route, plan switching, Shopify promotion and inquiry links match source behavior", async ({ page }) => {
  4  |   await page.emulateMedia({ reducedMotion: "reduce" });
  5  |   await page.goto("/pricing", { waitUntil: "domcontentloaded" });
  6  |   await expect(page).toHaveURL(/#pricing$/);
  7  |   await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  8  |   await expect(page.locator(".p2__serviceOption")).toHaveCount(5);
  9  |   await expect(page.locator(".p2__serviceIntro h2")).toHaveText("Web Apps, built for you.");
  10 |   await expect(page.locator(".p2__grid .p2__card")).toHaveCount(3);
  11 |   await expect(page.locator(".service-offer--shopify")).toBeVisible();
  12 |   await expect(page.locator(".offer-assurance")).toBeVisible();
  13 |   const inquiryLink = page.getByRole("link", { name: /Get started — Web Apps, Business Website/ });
  14 |   await expect(inquiryLink).toHaveAttribute("href", /subject=Inquiry/);
  15 |   await page.getByRole("button", { name: "Consultation" }).click();
  16 |   await expect(page.locator(".p2__serviceIntro h2")).toHaveText("Consultation, built for you.");
  17 |   await expect(page.locator(".p2__consultationGrid .service-offer")).toHaveCount(2);
  18 |   await expect(page.locator(".p2__trust")).toContainText("Focused, practical guidance");
  19 |   await page.getByRole("button", { name: "Automation" }).click();
  20 |   await expect(page.locator(".p2__serviceIntro h2")).toHaveText("Automation, built for you.");
  21 |   await expect(page.locator(".p2__terms")).toContainText("Third-party subscriptions and usage fees are quoted separately.");
  22 | });
  23 | 
  24 | test("pricing actions preserve the homepage and reliably populate contact", async ({ page }) => {
  25 |   await page.emulateMedia({ reducedMotion: "reduce" });
  26 |   await page.goto("/pricing", { waitUntil: "domcontentloaded" });
  27 |   await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  28 | 
  29 |   const contact = page.locator("#contact");
  30 |   const firstAction = page.getByRole("link", { name: /Get started — Web Apps, Business Website/ });
  31 |   await firstAction.click();
  32 |   await expect(page).toHaveURL(/subject=Inquiry/);
  33 |   await expect(contact.locator("input[name=subject]")).toHaveValue(/Business Website/);
  34 |   await expect(page.locator(".cinema-stage")).toBeAttached();
  35 |   await expect.poll(() => page.evaluate(() => Math.abs((document.getElementById("contact")?.getBoundingClientRect().top || 0)) < 260), { timeout: 30000 }).toBeTruthy();
  36 | 
  37 |   await page.goto("/pricing", { waitUntil: "domcontentloaded" });
  38 |   const secondAction = page.getByRole("link", { name: /Request Custom Quote — Web Apps, Web Platform/ });
  39 |   await secondAction.click();
  40 |   await expect(page).toHaveURL(/subject=Inquiry/);
  41 |   await expect(contact.locator("input[name=subject]")).toHaveValue(/Web Platform/);
  42 |   await expect(page.locator(".cinema-stage")).toBeAttached();
  43 | });
  44 | 
  45 | test("pricing cards keep their text crisp while preserving the hover affordance", async ({ page }) => {
  46 |   await page.goto("/pricing", { waitUntil: "domcontentloaded" });
  47 |   const card = page.locator(".p2__card").first();
  48 |   await card.hover();
> 49 |   await expect.poll(() => card.evaluate(element => ({ card: getComputedStyle(element).filter, descendants: [...element.querySelectorAll("*")].map(node => getComputedStyle(node).filter).filter(Boolean) }))).toEqual({ card: "none", descendants: [] });
     |                                                                                                                                                                                                               ^ Error: expect(received).toEqual(expected) // deep equality
  50 | });
  51 | 
  52 | test("first visit opening is session-scoped and favicon points at the reference asset", async ({ browser }) => {
  53 |   const context = await browser.newContext();
  54 |   const page = await context.newPage();
  55 |   await page.goto("/", { waitUntil: "domcontentloaded" });
  56 |   await expect(page.getByRole("status", { name: "Welcome to the portfolio" })).toBeVisible({ timeout: 30000 });
  57 |   await expect(page.locator("link[rel=icon]").first()).toHaveAttribute("href", /favicon\.jpg/);
  58 |   await expect(page.getByRole("status", { name: "Welcome to the portfolio" })).toBeHidden({ timeout: 10000 });
  59 |   await page.reload({ waitUntil: "domcontentloaded" });
  60 |   await expect(page.getByRole("status", { name: "Welcome to the portfolio" })).toHaveCount(0);
  61 |   await context.close();
  62 | });
  63 | 
```