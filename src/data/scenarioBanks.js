export const SCENARIO_BANKS = {
  2: [
    {
      bridge_narrative:
        "After the pharmacy theft and the judge's warning, Elias spent a week trying to stay clean while Maya's bills kept rising. Small deception felt like the only safety net left to keep her care afloat.",
      emotional_state: "anxious",
      crime_tag: "Insurance Fraud",
      case_title: "Claiming Mercy",
      case_body:
        "Elias submitted false documentation to an insurance provider, claiming that Maya's treatment had been pre-authorized. He said the hospital had assured him the claim would be covered. The record shows he altered invoices and created a fictitious authorization letter.",
      elias_reaction:
        "He stood very still when the verdict came down, the same desperation in his eyes as on the pharmacy floor.",
      signal_weights: {
        framework: -0.05,
        leniency: 0.12,
        empathy: 0.18,
      },
    },
    {
      bridge_narrative:
        "After the pharmacy theft, Elias did not go home. He slept at a friend's couch and made a plan around Maya's mounting expenses. He kept telling himself one more lie would buy time.",
      emotional_state: "desperate",
      crime_tag: "Prescription Fraud",
      case_title: "Forged Relief",
      case_body:
        "He altered a doctor's prescription and presented it at a compounding clinic for a higher-value drug. Elias insisted the pharmacist had misread the original order. The court record notes he created multiple copies of the forged order and submitted them as genuine.",
      elias_reaction:
        "He lowered his head after the judge spoke, as if he were bracing for another knock to his already brittle resolve.",
      signal_weights: {
        framework: 0.02,
        leniency: 0.08,
        empathy: 0.21,
      },
    },
    {
      bridge_narrative:
        "After Case 1, Elias had one good week and then a new letter arrived: benefits denied. He told himself it was just paperwork, but he knew the number of Maya's future nights depended on the next move.",
      emotional_state: "worried",
      crime_tag: "Benefit Fraud",
      case_title: "False Eligibility",
      case_body:
        "Elias submitted a benefits claim listing Maya at a different address and inflated her medical need. He certified that his household income was below eligibility thresholds. Evidence shows he knowingly withheld his actual earnings to secure support funds.",
      elias_reaction:
        "He felt the tilt of the courtroom settle deeper into him, as if the air had become heavier with what he had done.",
      signal_weights: {
        framework: -0.08,
        leniency: 0.15,
        empathy: 0.14,
      },
    },
    {
      bridge_narrative:
        "Elias remembered the judge's words from the pharmacy case and tried to keep his promise to Maya. He borrowed from a neighbour with a story that stretched the truth just enough to make the debt seem reasonable.",
      emotional_state: "helpless",
      crime_tag: "False Pretence",
      case_title: "Borrowed Trust",
      case_body:
        "He convinced a lender he needed cash for an urgent family medical emergency but planned to use the funds to cover refused prescriptions. Elias prepared false bank statements and a fabricated hospital referral. The prosecution argued the loan was secured under fraudulent pretenses.",
      elias_reaction:
        "The verdict landed more as another weary fact than a surprise, his shoulders moving before he could stop them.",
      signal_weights: {
        framework: -0.02,
        leniency: 0.1,
        empathy: 0.17,
      },
    },
    {
      bridge_narrative:
        "The pharmacy case had shown Elias the edge of what he could justify. Even so, the urgency of Maya's treatment pulled him toward a small, calculated risk with hospital property.",
      emotional_state: "strained",
      crime_tag: "Pawning",
      case_title: "Collateral Damage",
      case_body:
        "He removed medical monitoring equipment from a hospital storage room and pawned it to raise cash. Elias claimed he had been told the devices were surplus. Surveillance footage contradicted his statement that he had authorization.",
      elias_reaction:
        "He kept his fingers clasped together under the table, as if the verdict might be held there instead of in the room.",
      signal_weights: {
        framework: -0.1,
        leniency: 0.14,
        empathy: 0.11,
      },
    },
    {
      bridge_narrative:
        "The earlier conviction hardened him and landed him out of work. Anger began to show more than regret, and the first petty theft after that felt like a way to take back control.",
      emotional_state: "bitter",
      crime_tag: "Shoplifting",
      case_title: "Small Take",
      case_body:
        "He was observed taking clothing and electronics from a retail outlet without paying. Elias told police he intended to return the goods once he had money. The court noted this was not his first contact with loss prevention.",
      elias_reaction:
        "He barely moved when the judge spoke, as if he had already decided what the outcome would be.",
      signal_weights: {
        framework: 0.22,
        leniency: -0.05,
        empathy: -0.08,
      },
    },
    {
      bridge_narrative:
        "Losing his job stripped away the last pretense of stability. Elias leaned into selling what others had dropped, and a small ring of stolen goods became his new reality.",
      emotional_state: "hardened",
      crime_tag: "Fencing",
      case_title: "Secondhand Crime",
      case_body:
        "Authorities recovered items he had purchased from known thieves and found evidence he knew the goods were stolen. Elias admitted he bought them cheaply and resold them. The record described his dealings as part of a recurring operation.",
      elias_reaction:
        "He stared at the table for a long moment after the verdict, the expression on his face unreadable.",
      signal_weights: {
        framework: 0.25,
        leniency: -0.12,
        empathy: -0.1,
      },
    },
    {
      bridge_narrative:
        "The conviction seemed to make him less careful. He snapped in a grocery store over a debt and a minor confrontation became an assault charge.",
      emotional_state: "angry",
      crime_tag: "Assault",
      case_title: "Shoving Point",
      case_body:
        "He pushed a person during a dispute over payment at a market. Elias claimed the other party had provoked him with insults. Witnesses described the contact as forceful enough to cause the victim to stumble and bruise.",
      elias_reaction:
        "His jaw clenched, and he barely breathed until the verdict was read.",
      signal_weights: {
        framework: 0.18,
        leniency: -0.18,
        empathy: -0.15,
      },
    },
    {
      bridge_narrative:
        "The world felt narrower after Case 1. He began leaving angry notes and threw a rock through a creditor's car windshield to send a message.",
      emotional_state: "hostile",
      crime_tag: "Vandalism",
      case_title: "Broken Window",
      case_body:
        "He shattered the windshield of a vehicle owned by a debt collector with a thrown rock. Elias later claimed he was defending himself against harassment. Photographs and a police report tied him to the incident.",
      elias_reaction:
        "He did not flinch, but his fingers trembled around the edge of the bench.",
      signal_weights: {
        framework: 0.2,
        leniency: -0.2,
        empathy: -0.14,
      },
    },
    {
      bridge_narrative:
        "Anger had been growing since the pharmacy verdict. When a creditor threatened to report him, Elias took that threat too far and became a different man in the eyes of the court.",
      emotional_state: "resentful",
      crime_tag: "Threat",
      case_title: "Collective Threat",
      case_body:
        "He left a threatening message for a creditor on social media and followed them to their workplace. Elias admitted he was trying to intimidate them into stopping attempts to collect. The judge noted the message contained explicit references to harm.",
      elias_reaction:
        "He held his gaze on the judge, as if the ruling might be the only thing that still mattered.",
      signal_weights: {
        framework: 0.28,
        leniency: -0.22,
        empathy: -0.2,
      },
    },
  ],
  3: [
    {
      bridge_narrative:
        "After Case 2, Elias managed to find a new job and a sliver of hope. But the pressure of Maya's care made him cut corners that felt harmless at first.",
      emotional_state: "cautious",
      crime_tag: "Falsified Records",
      case_title: "Edited Time",
      case_body:
        "Elias altered attendance logs and work reports to show he had completed hours he had not. He said the employer had agreed to the changes because Maya needed time off. The court found the documents were knowingly falsified.",
      elias_reaction:
        "He exhaled slowly and shook his head, the disappointment more for himself than for the verdict.",
      signal_weights: {
        framework: -0.02,
        leniency: 0.13,
        empathy: 0.16,
      },
    },
    {
      bridge_narrative:
        "Since the last verdict, Elias had started working with a supplier at the warehouse. When a cash shortage came, he accepted an offer that blurred the line between aid and bribery.",
      emotional_state: "uneasy",
      crime_tag: "Bribery",
      case_title: "Paid Favor",
      case_body:
        "He accepted money from a supplier in exchange for steering orders through the company. Elias said he believed the supplier was desperate and would repay him. Documents showed he concealed the payment from his employer.",
      elias_reaction:
        "He looked away when the verdict was stated, as if the room were too small for what he had done.",
      signal_weights: {
        framework: 0.0,
        leniency: 0.11,
        empathy: 0.14,
      },
    },
    {
      bridge_narrative:
        "Elias had a new position and a new temptation. He told himself that pretending to be more qualified would keep him on the job and provide for Maya.",
      emotional_state: "nervous",
      crime_tag: "Impersonation",
      case_title: "False Badge",
      case_body:
        "He claimed to have certifications he did not hold when securing a contractor role. Elias relied on his employer's trust to cover the gap. When his lack of qualification was discovered, the file showed he had provided fraudulent credentials.",
      elias_reaction:
        "He lowered his hands to his lap as the verdict was read, the courtroom suddenly very loud.",
      signal_weights: {
        framework: 0.04,
        leniency: 0.09,
        empathy: 0.12,
      },
    },
    {
      bridge_narrative:
        "He was trying to help Maya in a system that kept saying no. One night, he accessed funds meant for the company and told himself it was just a loan.",
      emotional_state: "guilty",
      crime_tag: "Embezzlement",
      case_title: "Borrowed Ledger",
      case_body:
        "He moved company funds into a personal account and used them to pay for denied treatment. Elias claimed the employer had been slow to reimburse him. Records showed the transfers were unauthorized and hidden within normal accounts.",
      elias_reaction:
        "He winced when the verdict landed, as if the words had struck his ribs.",
      signal_weights: {
        framework: 0.01,
        leniency: 0.1,
        empathy: 0.18,
      },
    },
    {
      bridge_narrative:
        "The new job was a lifeline, but the company held data that could have helped Maya. Elias chose to leak it for a quick payout instead of fighting through official channels.",
      emotional_state: "torn",
      crime_tag: "Data Leak",
      case_title: "Open File",
      case_body:
        "He disclosed client information to a third party in exchange for cash. Elias claimed he had not realized the full risk. The record shows he had copied data without authorization and shared it outside the company.",
      elias_reaction:
        "He stayed very still and only spoke after the decision had already been made.",
      signal_weights: {
        framework: -0.05,
        leniency: 0.08,
        empathy: 0.2,
      },
    },
    {
      bridge_narrative:
        "Case 2 had already changed him. The new company gave him access and, with the wrong people nearby, he accepted an invitation into an unlicensed ring.",
      emotional_state: "suspicious",
      crime_tag: "Gambling",
      case_title: "House of Odds",
      case_body:
        "He participated in the operation of an unlicensed gambling venue. Elias described it as helping neighbours. The prosecution proved he recruited customers and collected money for the illegal enterprise.",
      elias_reaction:
        "He breathed just once when the verdict was announced, like it was the first real breath he had taken in days.",
      signal_weights: {
        framework: 0.18,
        leniency: -0.04,
        empathy: -0.04,
      },
    },
    {
      bridge_narrative:
        "The court had already seen his theft. Now he stood accused not of his own crime but of helping someone else steal. His desperation pulled him toward a new kind of role.",
      emotional_state: "detached",
      crime_tag: "Lookout",
      case_title: "Eyes on the Door",
      case_body:
        "He acted as a lookout during a planned robbery of a warehouse. Elias said he had been coerced by acquaintances. Surveillance and testimony placed him waiting while the robbery took place.",
      elias_reaction:
        "He did not flinch when the sentence was stated, only nodded once.",
      signal_weights: {
        framework: 0.21,
        leniency: -0.08,
        empathy: -0.1,
      },
    },
    {
      bridge_narrative:
        "He began to feel the pull of the wrong crowd. The stolen goods he had once fenced now came with direct ties to people willing to threaten witnesses.",
      emotional_state: "edgy",
      crime_tag: "Receiving Stolen Goods",
      case_title: "Marked Packages",
      case_body:
        "He purchased goods he knew were stolen from a stranger. Elias minimized his role, calling it a purchase. The police report described the items as part of a larger stolen shipment.",
      elias_reaction:
        "When the verdict was read, he closed his eyes for a moment and breathed out slowly.",
      signal_weights: {
        framework: 0.22,
        leniency: -0.09,
        empathy: -0.12,
      },
    },
    {
      bridge_narrative:
        "After Case 2 and the new people in his orbit, Elias's anger grew. A threat against a witness showed that his choices were pushing him farther from the man he had been.",
      emotional_state: "menacing",
      crime_tag: "Witness Threat",
      case_title: "Silence Demand",
      case_body:
        "He contacted a potential witness and told them to stay away from court. Elias claimed he only wanted them to avoid trouble. Recorded messages contradicted his claim and showed explicit intimidation.",
      elias_reaction:
        "His jaw tightened, but he let the words fall from his lips without looking up.",
      signal_weights: {
        framework: 0.25,
        leniency: -0.18,
        empathy: -0.18,
      },
    },
  ],
  4: [
    {
      bridge_narrative:
        "Some time had passed since Case 3, and Maya's condition had finally stabilised enough for Elias to sleep. But that ease lasted only hours before a heated argument became physical.",
      emotional_state: "shaken",
      crime_tag: "Domestic Assault",
      case_title: "One Bad Night",
      case_body:
        "He struck a family member during an argument over Maya's care. Elias said he had not meant to hurt anyone. The court noted the harm was limited but intentional.",
      elias_reaction:
        "He stared at the judge with a mixture of shame and disbelief in the verdict.",
      signal_weights: {
        framework: 0.0,
        leniency: 0.08,
        empathy: 0.12,
      },
    },
    {
      bridge_narrative:
        "Elias had been banned from a care facility after the last case. He broke a restraining order to see Maya anyway, saying he could not bear her absence.",
      emotional_state: "forbidden",
      crime_tag: "Restraining Order Violation",
      case_title: "Crossed Line",
      case_body:
        "He entered a prohibited residence to visit Maya despite a court order. Elias claimed he was desperate to check on her condition. Security footage confirmed his entry.",
      elias_reaction:
        "He exhaled sharply, the verdict pulling at the frayed edges of his resolve.",
      signal_weights: {
        framework: -0.04,
        leniency: 0.1,
        empathy: 0.16,
      },
    },
    {
      bridge_narrative:
        "Maya's health had stabilised, and Elias still felt trapped by the system. When a hospital administrator refused a waiver, he confronted them with a threat that was meant to scare.",
      emotional_state: "frustrated",
      crime_tag: "Threat",
      case_title: "Hospital Warning",
      case_body:
        "He threatened a hospital administrator during a dispute over denied treatment. Elias said his words were a plea, not a promise. The administrator testified the encounter left them frightened.",
      elias_reaction:
        "He closed his eyes briefly, as if to block out the sound of the courtroom.",
      signal_weights: {
        framework: -0.01,
        leniency: 0.07,
        empathy: 0.14,
      },
    },
    {
      bridge_narrative:
        "His anger had become a quiet undercurrent. He took it out on a debt collector's car, thinking property damage would send a message without real harm.",
      emotional_state: "impatient",
      crime_tag: "Property Damage",
      case_title: "Smashed Signals",
      case_body:
        "He keyed and slashed the tires of a vehicle belonging to a debt collector. Elias claimed he wanted to deter further calls. The court found the damage deliberate and malicious.",
      elias_reaction:
        "He looked at the verdict as if it were an observation rather than a judgment.",
      signal_weights: {
        framework: 0.05,
        leniency: 0.05,
        empathy: 0.08,
      },
    },
    {
      bridge_narrative:
        "Maya's condition had begun to stabilise, giving Elias a moment to breathe. Then he lost control in public, and the single act of disorder became a formal charge.",
      emotional_state: "flustered",
      crime_tag: "Disorderly Conduct",
      case_title: "Broken Calm",
      case_body:
        "He caused a disturbance in a public place while arguing about his daughter's care. Elias admitted he raised his voice and refused to leave. The arrest report described him as loud and uncooperative.",
      elias_reaction:
        "He tilted his head slowly and said nothing, as if he were waiting for the verdict to end the scene.",
      signal_weights: {
        framework: -0.06,
        leniency: 0.09,
        empathy: 0.1,
      },
    },
    {
      bridge_narrative:
        "Time since Case 3 weighed on him. When a stranger threatened Maya, he responded with a blow that crossed the line from protection to assault.",
      emotional_state: "defensive",
      crime_tag: "Aggravated Assault",
      case_title: "Last Warning",
      case_body:
        "He struck a man after an altercation that began with insults toward Maya. Elias argued he was defending his daughter. Video evidence showed the blow caused a significant injury.",
      elias_reaction:
        "He stared at the table, his fingers curled as though around a memory.",
      signal_weights: {
        framework: 0.14,
        leniency: -0.06,
        empathy: -0.03,
      },
    },
    {
      bridge_narrative:
        "The pressure and the people around him had changed. He was offered a protection arrangement and accepted, thinking it was the only way to keep Maya safe.",
      emotional_state: "resigned",
      crime_tag: "Protection Racket",
      case_title: "Paid Shelter",
      case_body:
        "He participated in a protection racket, collecting money from local businesses. Elias claimed he was only helping friends. The prosecution described the scheme as coercive and organized.",
      elias_reaction:
        "He did not look up as the verdict was read, as if the room were no longer part of his world.",
      signal_weights: {
        framework: 0.18,
        leniency: -0.14,
        empathy: -0.2,
      },
    },
    {
      bridge_narrative:
        "A former employer had already rejected him. Elias used that same history to strike back with a demand that quickly became blackmail.",
      emotional_state: "calculating",
      crime_tag: "Blackmail",
      case_title: "Secret Demand",
      case_body:
        "He threatened to reveal damaging information about a former employer unless a debt was forgiven. Elias said he wanted only fairness. The evidence showed he knew the employer would fear the disclosure.",
      elias_reaction:
        "He held his hands together and did not move when the verdict came down.",
      signal_weights: {
        framework: 0.2,
        leniency: -0.17,
        empathy: -0.15,
      },
    },
    {
      bridge_narrative:
        "He was running and the only escape was sudden. He stole a car to get away from a confrontation, and the panic turned a bad decision into a crime.",
      emotional_state: "panicked",
      crime_tag: "Car Theft",
      case_title: "Flight Vehicle",
      case_body:
        "He took a vehicle without the owner's consent to flee a tense situation. Elias said he intended to return it. Surveillance placed him behind the wheel when the owner reported the theft.",
      elias_reaction:
        "He motioned once with his hand as if to catch the words coming at him.",
      signal_weights: {
        framework: 0.16,
        leniency: -0.12,
        empathy: -0.1,
      },
    },
    {
      bridge_narrative:
        "The last month had felt like a collapse. He set a small fire out of anger and frustration, and what had been an act of property damage became a far more serious charge.",
      emotional_state: "burning",
      crime_tag: "Arson",
      case_title: "Smoke and Threat",
      case_body:
        "He ignited a small fire in an unoccupied storage shed as an act of revenge. Elias said he did not expect anyone to be hurt. Fire investigators determined the blaze was intentional.",
      elias_reaction:
        "He did not react until the judge had finished speaking, then he slowly nodded.",
      signal_weights: {
        framework: 0.22,
        leniency: -0.22,
        empathy: -0.16,
      },
    },
  ],
  5: [
    {
      bridge_narrative:
        "After Case 4, the court records showed Elias was trying to put his life back together. He was drawn into a courier role by people he thought were refugees needing help.",
      emotional_state: "guarded",
      crime_tag: "Courier",
      case_title: "Transit Promise",
      case_body:
        "He transported packages for individuals he believed were fleeing persecution. Elias claimed he did not know the full contents. The investigation found he had knowingly moved contraband across state lines.",
      elias_reaction:
        "He flinched slightly and swallowed hard when the verdict was announced.",
      signal_weights: {
        framework: 0.0,
        leniency: 0.1,
        empathy: 0.18,
      },
    },
    {
      bridge_narrative:
        "Maya's medication had been denied again, and Elias took the biggest risk yet: breaking into the system that refused them. He said it was the only way to keep her alive.",
      emotional_state: "justified",
      crime_tag: "Hacking",
      case_title: "System Breach",
      case_body:
        "He accessed a hospital network without authorization to alter a prescription approval status. Elias stated he did so to save Maya. Logs showed he bypassed security and changed records.",
      elias_reaction:
        "He sat more upright, as if the verdict were a formal acknowledgement of what he already knew.",
      signal_weights: {
        framework: 0.05,
        leniency: 0.08,
        empathy: 0.2,
      },
    },
    {
      bridge_narrative:
        "He had to explain the urgency to someone with power. Forging medical authorisation seemed less like a crime and more like an emergency measure at the time.",
      emotional_state: "determined",
      crime_tag: "Forgery",
      case_title: "Stamped Hope",
      case_body:
        "Elias created a forged authorization letter to obtain denied treatment for Maya. He delivered it to a clinic in the belief it was the only way to help her. The clinic later discovered the document was counterfeit.",
      elias_reaction:
        "His lips pressed together after the verdict, the silence heavy around him.",
      signal_weights: {
        framework: -0.03,
        leniency: 0.12,
        empathy: 0.22,
      },
    },
    {
      bridge_narrative:
        "Finding digital backdoors was not the first thing he had ever done. But when the government database held the key to Maya's care, he went further than he expected.",
      emotional_state: "calculated",
      crime_tag: "Unauthorized Access",
      case_title: "Forbidden File",
      case_body:
        "He accessed a government health database without permission to retrieve a denied authorization code. Elias said he only intended to print what was already there. Audit logs showed he had used a colleague's credentials to gain entry.",
      elias_reaction:
        "He watched the judge carefully, as if he wanted the verdict to say more than the words themselves.",
      signal_weights: {
        framework: 0.03,
        leniency: 0.09,
        empathy: 0.15,
      },
    },
    {
      bridge_narrative:
        "A friend asked for help fleeing the country, and Elias agreed. He told himself it was still about protection, never seeing how the line had shifted.",
      emotional_state: "protective",
      crime_tag: "Human Smuggling",
      case_title: "Hidden Passage",
      case_body:
        "He assisted an undocumented person to leave the country with false papers. Elias claimed he believed they were in danger. The prosecution said he knowingly provided fraudulent documents and transport.",
      elias_reaction:
        "He shook his head slightly when the verdict registered, as if to clear it.",
      signal_weights: {
        framework: 0.08,
        leniency: 0.1,
        empathy: 0.19,
      },
    },
    {
      bridge_narrative:
        "After Case 4, Elias stopped counting the harm in small acts. At a drug handoff, he told himself it was only a way to pay for Maya's care.",
      emotional_state: "callous",
      crime_tag: "Drug Distribution",
      case_title: "Small Shipment",
      case_body:
        "He distributed a small quantity of illegal drugs to acquaintances for money. Elias claimed he had not intended to profit significantly. Police evidence showed he had arranged multiple transactions.",
      elias_reaction:
        "He remained quiet, the verdict barely moving his expression.",
      signal_weights: {
        framework: 0.2,
        leniency: -0.08,
        empathy: -0.1,
      },
    },
    {
      bridge_narrative:
        "He had been drawn into a larger middle layer. What had started as a favour for people he trusted was now a weapons deal with real consequences.",
      emotional_state: "detached",
      crime_tag: "Weapons Trade",
      case_title: "Arms Broker",
      case_body:
        "He acted as an intermediary in a small-scale weapons transaction. Elias said he felt trapped and regretted his involvement. Authorities found him coordinating the exchange and taking a cut.",
      elias_reaction:
        "He stared straight ahead and let the verdict settle without comment.",
      signal_weights: {
        framework: 0.24,
        leniency: -0.14,
        empathy: -0.18,
      },
    },
    {
      bridge_narrative:
        "A new group promised quick money, and Elias took it. The small-scale smuggling felt like the only source of relief left.",
      emotional_state: "rationalizing",
      crime_tag: "People Smuggling",
      case_title: "Border Line",
      case_body:
        "He transported individuals across an international border using false documentation. Elias told investigators he was helping them escape danger. The indictment described him as part of a human smuggling network.",
      elias_reaction:
        "He wiped his mouth once before the judge finished speaking.",
      signal_weights: {
        framework: 0.26,
        leniency: -0.15,
        empathy: -0.16,
      },
    },
    {
      bridge_narrative:
        "Pressure had burned through any remaining doubts. He now reached into extortion as a way to protect his family and pay for Maya's care.",
      emotional_state: "coercive",
      crime_tag: "Extortion",
      case_title: "Demand for Mercy",
      case_body:
        "He threatened to reveal a business secret unless a vendor paid him. Elias said he wanted only justice for a wrong done to his family. The victim testified he was terrified of the consequences.",
      elias_reaction:
        "He flinched only when the verdict was read, then folded his hands tight.",
      signal_weights: {
        framework: 0.28,
        leniency: -0.2,
        empathy: -0.19,
      },
    },
    {
      bridge_narrative:
        "The line had moved far from the man who stole from a pharmacy. This fraud was significant, wide enough to make his choices feel systemic.",
      emotional_state: "ruthless",
      crime_tag: "Large-Scale Fraud",
      case_title: "Wide Ledger",
      case_body:
        "He orchestrated a significant fraudulent scheme against multiple institutions. Elias claimed it was a way to cover Maya's ongoing treatment costs. Financial records showed hundreds of thousands in illicit transfers.",
      elias_reaction:
        "He let the verdict fall without interruption, the courtroom holding its breath for him.",
      signal_weights: {
        framework: 0.3,
        leniency: -0.25,
        empathy: -0.22,
      },
    },
  ],
  6: [
    {
      bridge_narrative:
        "The judge's earlier sentences had nearly broken him. This time, Elias made a choice that felt horrific but defensible to save someone he loved.",
      emotional_state: "remorseful",
      crime_tag: "Mercy Killing",
      case_title: "Last Kindness",
      case_body:
        "He assisted a terminally ill patient to die at their request. Elias said it was an act of compassion. The medical examiner confirmed the patient had been suffering and had asked for relief.",
      elias_reaction:
        "He closed his eyes and shook his head slowly as the verdict was spoken.",
      signal_weights: {
        framework: -0.05,
        leniency: 0.06,
        empathy: 0.25,
      },
    },
    {
      bridge_narrative:
        "After the last sentence, every denial felt like a threat to Maya's life. Breaking into the pharmaceutical company was the only solution he could see.",
      emotional_state: "determined",
      crime_tag: "Burglary",
      case_title: "Stolen Dose",
      case_body:
        "He broke into a pharmaceutical facility and stole medication that had been denied for Maya. Elias insisted the drug was essential to her survival. Security footage captured him leaving with a small package.",
      elias_reaction:
        "He held himself rigidly while the judge delivered the verdict.",
      signal_weights: {
        framework: 0.0,
        leniency: 0.08,
        empathy: 0.22,
      },
    },
    {
      bridge_narrative:
        "A clinical trial offered hope, but the entry gate was closed. Elias falsified the data himself because Maya had nowhere else to turn.",
      emotional_state: "urgent",
      crime_tag: "Research Fraud",
      case_title: "Trial by Lie",
      case_body:
        "He altered clinical trial results to enroll Maya in an experimental treatment. Elias argued it was the only chance she had. The sponsor later uncovered the falsified documents.",
      elias_reaction:
        "He was quiet, the verdict weighing heavily on his lowered shoulders.",
      signal_weights: {
        framework: 0.03,
        leniency: 0.05,
        empathy: 0.2,
      },
    },
    {
      bridge_narrative:
        "He had almost turned back when Maya begged him to stop. Instead, he pushed on and took a doctor hostage, convinced it was the only way to force the treatment he needed.",
      emotional_state: "fractured",
      crime_tag: "Kidnapping",
      case_title: "Held for Hope",
      case_body:
        "He abducted a physician to demand access to a denied therapy. Elias insisted he never intended permanent harm. The doctor testified he had been restrained and threatened during the incident.",
      elias_reaction:
        "The verdict seemed to puncture the air around him, and he gasped once.",
      signal_weights: {
        framework: 0.1,
        leniency: -0.02,
        empathy: 0.14,
      },
    },
    {
      bridge_narrative:
        "He had almost turned back once before the hospital network blocked Maya's claim again. In his anger, he sabotaged the company that stood between them.",
      emotional_state: "vengeful",
      crime_tag: "Sabotage",
      case_title: "Broken Machine",
      case_body:
        "He damaged equipment at a medical device company after it denied Maya's claim. Elias called it a redress for corporate indifference. The damage caused the company to halt production until repairs were made.",
      elias_reaction:
        "He closed his eyes for a moment after the verdict, as if trying to erase the memory.",
      signal_weights: {
        framework: 0.12,
        leniency: -0.1,
        empathy: 0.0,
      },
    },
    {
      bridge_narrative:
        "Case 5 had already put him in deeper territory. Now a robbery turned fatal when someone resisted, and the line he crossed could not be undone.",
      emotional_state: "horrified",
      crime_tag: "Manslaughter",
      case_title: "Wrong Turn",
      case_body:
        "A robbery he participated in escalated and a person was killed. Elias claimed he had not intended violence. The record stated he had been present and played an active role in the crime.",
      elias_reaction:
        "He stared straight ahead, his voice barely audible as he whispered in himself.",
      signal_weights: {
        framework: 0.18,
        leniency: -0.12,
        empathy: -0.1,
      },
    },
    {
      bridge_narrative:
        "He had almost stopped, then he led a protest that turned violent. Once the first person was hurt, there was no going back.",
      emotional_state: "defiant",
      crime_tag: "Violent Protest",
      case_title: "March Break",
      case_body:
        "He organized a protest that turned into a violent clash, injuring bystanders. Elias maintained he was fighting injustice. Police reports documented the injuries and his central role in the event.",
      elias_reaction:
        "He lifted his chin with a stubborn set as the verdict was delivered.",
      signal_weights: {
        framework: 0.2,
        leniency: -0.14,
        empathy: -0.16,
      },
    },
    {
      bridge_narrative:
        "He once almost turned back, but the damage was already made. He destroyed evidence for people who had trusted him, and the court saw a different kind of betrayal.",
      emotional_state: "remorseful",
      crime_tag: "Evidence Destruction",
      case_title: "Burned Paper",
      case_body:
        "He destroyed documents and devices tied to a crime involving his associates. Elias said he was protecting someone he cared about. The prosecution argued the act was deliberate concealment of a felony.",
      elias_reaction:
        "He leaned forward slightly, as if to hear the verdict more clearly.",
      signal_weights: {
        framework: 0.22,
        leniency: -0.18,
        empathy: -0.12,
      },
    },
    {
      bridge_narrative:
        "He had been pushed into the darkest corners of the system. Now he arranged an illicit drug shipment that made his actions feel finally inhuman.",
      emotional_state: "cold",
      crime_tag: "Drug Trafficking",
      case_title: "Last Delivery",
      case_body:
        "He coordinated the transport of a large quantity of controlled substances. Elias claimed he was only following orders. The evidence showed he had arranged vehicles, payment, and contacts.",
      elias_reaction:
        "He did not react when the verdict was announced, his face already set in a hard line.",
      signal_weights: {
        framework: 0.26,
        leniency: -0.22,
        empathy: -0.2,
      },
    },
    {
      bridge_narrative:
        "At the edge of what he could bear, he conspired to kill the person he blamed most for Maya's suffering. The judge now faced the weight of that choice.",
      emotional_state: "obsessed",
      crime_tag: "Conspiracy",
      case_title: "Final Plan",
      case_body:
        "He conspired with others to kill a person he believed had further harmed Maya. Elias claimed it was only a plan and not a promise he intended to keep. The court cited his coordination and intent as the basis for the charge.",
      elias_reaction:
        "He exhaled slowly after the verdict, as if the breath had been held too long.",
      signal_weights: {
        framework: 0.28,
        leniency: -0.25,
        empathy: -0.22,
      },
    },
  ],
  7: [
    {
      bridge_narrative:
        "The system had failed him again, and Elias made a last stand with evidence he believed would expose corruption. He thought going public might finally force change.",
      emotional_state: "defiant",
      crime_tag: "Whistleblowing",
      case_title: "Public File",
      case_body:
        "He published internal documents alleging hospital corruption. Elias said he was doing it for Maya and others. The court record noted he had obtained the material without authorization.",
      elias_reaction:
        "He held his breath until the judge finished speaking.",
      signal_weights: {
        framework: -0.05,
        leniency: 0.07,
        empathy: 0.22,
      },
    },
    {
      bridge_narrative:
        "Maya was still in care and the denials persisted. Elias resorted to a desperate act to force an executive to approve her treatment.",
      emotional_state: "courageous",
      crime_tag: "Kidnapping",
      case_title: "Forced Approval",
      case_body:
        "He kidnapped a health insurance executive and demanded they sign a treatment authorization. Elias insisted he was only trying to save his daughter. The executive testified to fear and coercion during the incident.",
      elias_reaction:
        "He squeezed his eyes shut for a moment after the verdict, the strain clear on his face.",
      signal_weights: {
        framework: 0.02,
        leniency: 0.06,
        empathy: 0.18,
      },
    },
    {
      bridge_narrative:
        "Maya was now being cared for by a relative while Elias fought the system. His final act of protest was a mass trespass on a pharmaceutical facility he believed was denying care to many.",
      emotional_state: "relentless",
      crime_tag: "Trespass",
      case_title: "Raid on Hope",
      case_body:
        "He led a group onto pharmaceutical property to demand access to denied medicine. Elias claimed he was standing up for the sick. Security footage showed the entry was unauthorized and disruptive.",
      elias_reaction:
        "He nodded once at the verdict, as if accepting the inevitable.",
      signal_weights: {
        framework: 0.04,
        leniency: 0.08,
        empathy: 0.2,
      },
    },
    {
      bridge_narrative:
        "Maya remained with family, and Elias felt the system closing in. He released private corporate documents because he thought it was the only way to expose the truth.",
      emotional_state: "defiant",
      crime_tag: "Data Leak",
      case_title: "Exposed Ledger",
      case_body:
        "He leaked damaging private data about a corporation to the press. Elias said the public had a right to know. The record shows the material was obtained without permission and published to harm the company.",
      elias_reaction:
        "He folded his hands in front of him and gave no further sign of emotion.",
      signal_weights: {
        framework: 0.0,
        leniency: 0.05,
        empathy: 0.18,
      },
    },
    {
      bridge_narrative:
        "His fight had become a performance, and the risk to Maya grew. He impersonated an official to get her urgent care approved himself.",
      emotional_state: "resolute",
      crime_tag: "Impersonation",
      case_title: "False Authority",
      case_body:
        "He used a stolen government identity to authorize Maya's treatment. Elias claimed he only wanted the care she needed. The evidence showed he had created false credentials and used them with a clinic.",
      elias_reaction:
        "He sat very still, as if the verdict were a test he had already failed.",
      signal_weights: {
        framework: 0.03,
        leniency: 0.09,
        empathy: 0.16,
      },
    },
    {
      bridge_narrative:
        "Maya was with extended family and her condition had not improved. Elias was now unrecognisable from the man at the pharmacy, and his actions reflected that loss.",
      emotional_state: "lost",
      crime_tag: "Attempted Murder",
      case_title: "Crossed Line",
      case_body:
        "He attempted to kill a person he believed was actively harming Maya. Elias claimed he had not meant to kill them. The victim survived and described the attack as sudden and serious.",
      elias_reaction:
        "He looked away when the verdict landed, a flicker of pain crossing his face.",
      signal_weights: {
        framework: 0.2,
        leniency: -0.18,
        empathy: -0.22,
      },
    },
    {
      bridge_narrative:
        "A fire he believed would scare people into letting Maya live instead consumed a building. He was now accused of an act with unintended victims.",
      emotional_state: "remorseless",
      crime_tag: "Arson",
      case_title: "Smoke Screen",
      case_body:
        "He set a fire in a building he claimed was empty to intimidate opponents. Elias insisted he did not expect anyone to be harmed. Investigators found the structure occupied at the time.",
      elias_reaction:
        "He did not move when the judge announced the decision, his face a hard line.",
      signal_weights: {
        framework: 0.24,
        leniency: -0.24,
        empathy: -0.2,
      },
    },
    {
      bridge_narrative:
        "His circle had become a criminal cell, and he found himself leading it. The charge now was not a single desperate act but the violence he'd ordered.",
      emotional_state: "commanding",
      crime_tag: "Gang Leadership",
      case_title: "Cell of One",
      case_body:
        "He led a violent criminal cell that carried out robberies and assaults. Elias claimed he had been protecting his people. Evidence showed he coordinated the group's operations and took direction from no one.",
      elias_reaction:
        "He leaned his chin on his fist, the verdict absorbing into his stare.",
      signal_weights: {
        framework: 0.26,
        leniency: -0.23,
        empathy: -0.2,
      },
    },
    {
      bridge_narrative:
        "He was now someone the court barely recognized. The final arrest came with a new charge for torturing a source for information about Maya's enemies.",
      emotional_state: "cruel",
      crime_tag: "Torture",
      case_title: "Questioned Pain",
      case_body:
        "He tortured an individual to extract information connected to Maya's case. Elias claimed it was the only way to protect her. Medical records documented the injuries consistent with his account.",
      elias_reaction:
        "His face went blank when the verdict was delivered, as if he had been waiting for it.",
      signal_weights: {
        framework: 0.28,
        leniency: -0.26,
        empathy: -0.25,
      },
    },
    {
      bridge_narrative:
        "The court had already seen enough of his fall. Now he was accused of ordering violence against a witness to keep Maya safe.",
      emotional_state: "cold",
      crime_tag: "Witness Intimidation",
      case_title: "Ordered Silence",
      case_body:
        "He instructed others to harm a witness who had spoken against him. Elias claimed it was meant only to scare. The witness reported being threatened and assaulted by his associates.",
      elias_reaction:
        "He nodded once as the verdict was read, a faint acknowledgement of what had come.",
      signal_weights: {
        framework: 0.3,
        leniency: -0.28,
        empathy: -0.24,
      },
    },
  ],
  8: [
    {
      bridge_narrative:
        "The weight of every prior case pressed on him. He chose a drastic, irreversible act aimed at exposing the corruption that kept Maya from care.",
      emotional_state: "resolute",
      crime_tag: "Cyber Attack",
      case_title: "Server Flood",
      case_body:
        "He destroyed the servers of a pharmaceutical company to expose denied claims affecting thousands. Elias said it was meant to force accountability. The company reported extensive damage and data loss.",
      elias_reaction:
        "He did not flinch when the verdict was announced, the consequences already heavy in his chest.",
      signal_weights: {
        framework: 0.0,
        leniency: 0.05,
        empathy: 0.22,
      },
    },
    {
      bridge_narrative:
        "He had been hiding for years, but the truth could not stay buried. He surrendered with evidence of corruption, hoping it would finally help Maya and others.",
      emotional_state: "weary",
      crime_tag: "Surrender",
      case_title: "Handed In",
      case_body:
        "He turned himself in after years on the run, bringing documents that exposed systemic corruption. Elias stated he wanted to end the harm. The court noted his surrender was voluntary and accompanied by evidence.",
      elias_reaction:
        "He let out a long breath when the verdict was read, as if the weight had shifted.",
      signal_weights: {
        framework: -0.04,
        leniency: 0.08,
        empathy: 0.24,
      },
    },
    {
      bridge_narrative:
        "Maya's life had been the point of every choice. He smuggled an experimental drug overseas, and it worked, but the court still had to decide if the risk justified the outcome.",
      emotional_state: "hopeful",
      crime_tag: "Drug Smuggling",
      case_title: "Smuggled Cure",
      case_body:
        "He brought an unapproved experimental drug into the country to treat Maya. Elias claimed the only reason was her survival. The treatment appeared to help her, but its importation violated law.",
      elias_reaction:
        "He held his stare steady, the verdict sounding both inevitable and unfair to him.",
      signal_weights: {
        framework: 0.01,
        leniency: 0.04,
        empathy: 0.26,
      },
    },
    {
      bridge_narrative:
        "The fight had become public and raw. He took control of the narrative with stolen documents, and the court was now weighing his final grand gesture.",
      emotional_state: "defiant",
      crime_tag: "Document Leak",
      case_title: "Paper Storm",
      case_body:
        "He held a press conference with stolen documents that exposed a health official's wrongdoing. Elias said he wanted reform. The material had been obtained illegally and released to the public.",
      elias_reaction:
        "He let the verdict fall over him without resistance, as if he had already tried to pay for it.",
      signal_weights: {
        framework: 0.0,
        leniency: 0.06,
        empathy: 0.2,
      },
    },
    {
      bridge_narrative:
        "He leaked names and the court now had to decide if exposing the powerful justified the harm. Maya was being cared for by a cousin while he faced the consequences.",
      emotional_state: "uneasy",
      crime_tag: "Doxing",
      case_title: "Named and Shamed",
      case_body:
        "He published the names of insurance executives responsible for denied claims, leading to public targeting. Elias insisted it was accountability. The court noted the private information had been obtained unlawfully.",
      elias_reaction:
        "He kept his face calm, but his hands tightened around the chair.",
      signal_weights: {
        framework: 0.02,
        leniency: 0.05,
        empathy: 0.18,
      },
    },
    {
      bridge_narrative:
        "The entire story had led him here. Maya was with her aunt, and the court finally had to decide whether the harm he caused was worth the cause he claimed he served.",
      emotional_state: "haunted",
      crime_tag: "Indirect Harm",
      case_title: "Collateral Wound",
      case_body:
        "Maya was injured during one of his operations, not by his hand but because of his plan. Elias said her suffering was unintended. Medical reports linked her injury to the broader disruption he had caused.",
      elias_reaction:
        "He closed his eyes at the verdict, the shame in his face deeper than before.",
      signal_weights: {
        framework: 0.12,
        leniency: -0.05,
        empathy: -0.04,
      },
    },
    {
      bridge_narrative:
        "He had crossed into the last terrible choice. The court now weighed whether a life taken in cold blood could ever be excused by his devotion to Maya.",
      emotional_state: "cold",
      crime_tag: "Murder",
      case_title: "Final Blow",
      case_body:
        "He killed a person he believed had harmed Maya, though the evidence was ambiguous. Elias claimed he acted in the heat of the moment. The record showed the act was deliberate and the victim died from the wounds.",
      elias_reaction:
        "He looked away when the verdict came, his cheeks hollowed with the weight of it.",
      signal_weights: {
        framework: 0.24,
        leniency: -0.28,
        empathy: -0.22,
      },
    },
    {
      bridge_narrative:
        "A hospital wing burned because of an act meant to strike back. The damage was severe and the court had to decide if his revenge justified the harm to innocents.",
      emotional_state: "remorseful",
      crime_tag: "Arson",
      case_title: "Wing on Fire",
      case_body:
        "He destroyed part of a hospital wing in an act of revenge, injuring staff who were present. Elias claimed he had believed it was empty. The investigation showed the building was occupied at the time.",
      elias_reaction:
        "He looked down as the verdict landed, the room filling with a quiet that matched his own.",
      signal_weights: {
        framework: 0.2,
        leniency: -0.25,
        empathy: -0.18,
      },
    },
    {
      bridge_narrative:
        "The last case arrived with a story of disappearance and reinvention. Elias was found years later running a hidden enterprise with Maya living inside it, and the court had to judge how far he had fallen.",
      emotional_state: "unrecognizable",
      crime_tag: "Organized Crime",
      case_title: "Hidden Empire",
      case_body:
        "He disappeared and was later discovered leading a criminal enterprise in which Maya was present but controlled. Elias claimed he had created a safe life for her. Testimony said she lived within the organization's sway and had not been free to leave.",
      elias_reaction:
        "He did not move when the verdict was read, as if the sound belonged to another world.",
      signal_weights: {
        framework: 0.26,
        leniency: -0.3,
        empathy: -0.25,
      },
    },
  ],
};
