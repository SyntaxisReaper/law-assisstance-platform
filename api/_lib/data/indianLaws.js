// Comprehensive Indian Laws Database
// Equal importance given to all crime types

const INDIAN_LAWS = {
  // Cybercrime Laws
  cybercrime: {
    primary_act: "Information Technology Act, 2000 (Amended 2008)",
    sections: {
      "IT Act Section 43": {
        title: "Damage to computer, computer system, etc.",
        penalty: "Up to ₹1 crore compensation",
        description: "Unauthorized access, downloading, copying, or extracting data"
      },
      "IT Act Section 43A": {
        title: "Compensation for failure to protect data",
        penalty: "Compensation to affected persons",
        description: "Negligence in implementing reasonable security practices"
      },
      "IT Act Section 65": {
        title: "Tampering with computer source documents",
        penalty: "Up to 3 years imprisonment or ₹2 lakh fine",
        description: "Knowingly concealing, destroying, or altering computer source code"
      },
      "IT Act Section 66": {
        title: "Computer related offences",
        penalty: "Up to 3 years imprisonment or ₹5 lakh fine",
        description: "Dishonestly or fraudulently using computer resources"
      },
      "IT Act Section 66B": {
        title: "Receiving stolen computer resource or communication device",
        penalty: "Up to 3 years imprisonment or ₹1 lakh fine",
        description: "Dishonestly receiving stolen computer resources"
      },
      "IT Act Section 66C": {
        title: "Identity theft",
        penalty: "Up to 3 years imprisonment or ₹1 lakh fine",
        description: "Using electronic signature, password or other unique identification"
      },
      "IT Act Section 66D": {
        title: "Cheating by personation using computer resource",
        penalty: "Up to 3 years imprisonment or ₹1 lakh fine",
        description: "Cheating by personating using communication device"
      },
      "IT Act Section 66E": {
        title: "Violation of privacy",
        penalty: "Up to 3 years imprisonment or ₹2 lakh fine",
        description: "Publishing private images without consent"
      },
      "IT Act Section 66F": {
        title: "Cyber terrorism",
        penalty: "Up to life imprisonment",
        description: "Acts of cyber terrorism"
      },
      "IT Act Section 67": {
        title: "Publishing obscene material",
        penalty: "Up to 3 years imprisonment or ₹5 lakh fine",
        description: "Publishing obscene information in electronic form"
      },
      "IT Act Section 67A": {
        title: "Publishing sexually explicit material",
        penalty: "Up to 5 years imprisonment or ₹10 lakh fine",
        description: "Publishing sexually explicit act in electronic form"
      },
      "IT Act Section 67B": {
        title: "Child pornography",
        penalty: "Up to 5 years imprisonment or ₹10 lakh fine",
        description: "Publishing child abuse material"
      }
    },
    supporting_laws: [
      "IPC Section 420 - Cheating",
      "IPC Section 468 - Forgery for purpose of cheating",
      "IPC Section 471 - Using forged document as genuine"
    ]
  },

  // Theft Laws
  theft: {
    primary_act: "Indian Penal Code, 1860",
    sections: {
      "IPC Section 378": {
        title: "Theft",
        penalty: "Up to 3 years imprisonment or fine",
        description: "Dishonestly taking moveable property without consent"
      },
      "IPC Section 379": {
        title: "Punishment for theft",
        penalty: "Up to 3 years imprisonment or fine or both",
        description: "General punishment for theft"
      },
      "IPC Section 380": {
        title: "Theft in dwelling house",
        penalty: "Up to 7 years imprisonment",
        description: "Theft in dwelling house, tent or vessel"
      },
      "IPC Section 381": {
        title: "Theft by clerk or servant",
        penalty: "Up to 7 years imprisonment",
        description: "Theft by clerk or servant of property in possession of master"
      },
      "IPC Section 382": {
        title: "Theft after preparation for death or hurt",
        penalty: "Up to 10 years imprisonment",
        description: "Theft after preparation made for causing death, hurt or restraint"
      }
    },
    supporting_laws: [
      "IPC Section 411 - Dishonestly receiving stolen property",
      "IPC Section 414 - Assisting in concealment of stolen property"
    ]
  },

  // Fraud Laws
  fraud: {
    primary_act: "Indian Penal Code, 1860",
    sections: {
      "IPC Section 420": {
        title: "Cheating and dishonestly inducing delivery of property",
        penalty: "Up to 7 years imprisonment or fine or both",
        description: "Cheating and dishonestly inducing delivery of property"
      },
      "IPC Section 415": {
        title: "Cheating",
        penalty: "Up to 1 year imprisonment or fine or both",
        description: "Whoever, by deceiving any person, fraudulently or dishonestly induces"
      },
      "IPC Section 417": {
        title: "Punishment for cheating",
        penalty: "Up to 1 year imprisonment or fine or both",
        description: "Whoever cheats shall be punished"
      },
      "IPC Section 418": {
        title: "Cheating with knowledge",
        penalty: "Up to 3 years imprisonment or fine or both",
        description: "Cheating with knowledge that wrongful loss may be caused"
      },
      "IPC Section 419": {
        title: "Punishment for cheating by personation",
        penalty: "Up to 3 years imprisonment or fine or both",
        description: "Whoever cheats by personation"
      }
    },
    supporting_laws: [
      "Consumer Protection Act, 2019",
      "Prevention of Money Laundering Act, 2002",
      "Indian Contract Act, 1872"
    ]
  },

  // Domestic Violence Laws
  domestic_violence: {
    primary_act: "Protection of Women from Domestic Violence Act, 2005",
    sections: {
      "DV Act Section 3": {
        title: "Definition of domestic violence",
        penalty: "Protection orders, residence orders, monetary relief",
        description: "Physical, sexual, verbal, emotional, and economic abuse"
      },
      "IPC Section 498A": {
        title: "Husband or relative subjecting woman to cruelty",
        penalty: "Up to 3 years imprisonment or fine or both",
        description: "Cruelty by husband or his relatives"
      },
      "IPC Section 304B": {
        title: "Dowry death",
        penalty: "Minimum 7 years, may extend to life imprisonment",
        description: "Death of woman within 7 years of marriage under abnormal circumstances"
      },
      "IPC Section 406": {
        title: "Criminal breach of trust",
        penalty: "Up to 3 years imprisonment or fine or both",
        description: "Dishonestly misappropriating property"
      }
    },
    supporting_laws: [
      "Dowry Prohibition Act, 1961",
      "Indian Evidence Act, 1872 - Section 113B (Dowry death presumption)",
      "Cr.P.C. Section 125 - Maintenance of wife"
    ]
  },

  // Assault Laws
  assault: {
    primary_act: "Indian Penal Code, 1860",
    sections: {
      "IPC Section 319": {
        title: "Hurt",
        penalty: "Up to 1 year imprisonment or ₹1000 fine or both",
        description: "Voluntarily causing hurt to any person"
      },
      "IPC Section 320": {
        title: "Grievous hurt",
        penalty: "Up to 7 years imprisonment or fine or both",
        description: "Voluntarily causing grievous hurt"
      },
      "IPC Section 321": {
        title: "Voluntarily causing hurt",
        penalty: "Up to 1 year imprisonment or ₹1000 fine or both",
        description: "Punishment for voluntarily causing hurt"
      },
      "IPC Section 322": {
        title: "Voluntarily causing grievous hurt",
        penalty: "Up to 7 years imprisonment or fine or both",
        description: "Punishment for voluntarily causing grievous hurt"
      },
      "IPC Section 354": {
        title: "Assault or criminal force on woman",
        penalty: "Up to 2 years imprisonment or fine or both",
        description: "Assault on woman with intent to outrage her modesty"
      },
      "IPC Section 354A": {
        title: "Sexual harassment",
        penalty: "Up to 3 years imprisonment or fine or both",
        description: "Sexual harassment and punishment thereof"
      },
      "IPC Section 354B": {
        title: "Assault or use of criminal force with intent to disrobe",
        penalty: "Up to 5 years imprisonment or fine or both",
        description: "Assault with intent to disrobe a woman"
      }
    },
    supporting_laws: [
      "Sexual Harassment of Women at Workplace Act, 2013",
      "Cr.P.C. Section 154 - FIR registration"
    ]
  },

  // Sexual Offences
  rape: {
    primary_act: "Indian Penal Code, 1860 (Amended 2013)",
    sections: {
      "IPC Section 375": {
        title: "Rape",
        penalty: "Minimum 7 years, may extend to 10 years or life imprisonment",
        description: "Sexual intercourse against will or without consent"
      },
      "IPC Section 376": {
        title: "Punishment for rape",
        penalty: "Minimum 7 years imprisonment, may extend to life",
        description: "Punishment for rape"
      },
      "IPC Section 376A": {
        title: "Rape causing death or vegetative state",
        penalty: "Minimum 20 years or life imprisonment or death",
        description: "Sexual intercourse causing death or vegetative state"
      },
      "IPC Section 376AB": {
        title: "Rape of woman under 12 years",
        penalty: "Minimum 20 years or life imprisonment or death",
        description: "Rape of woman under twelve years"
      },
      "IPC Section 376D": {
        title: "Gang rape",
        penalty: "Minimum 20 years or life imprisonment",
        description: "Gang rape and punishment thereof"
      }
    },
    supporting_laws: [
      "Protection of Children from Sexual Offences Act, 2012 (POCSO)",
      "Criminal Law Amendment Act, 2013",
      "Cr.P.C. Section 164A - Medical examination"
    ]
  },

  // Property Crimes
  property: {
    primary_act: "Indian Penal Code, 1860",
    sections: {
      "IPC Section 441": {
        title: "Criminal trespass",
        penalty: "Up to 3 months imprisonment or ₹500 fine or both",
        description: "Entering property with intent to commit offence"
      },
      "IPC Section 447": {
        title: "Punishment for criminal trespass",
        penalty: "Up to 3 months imprisonment or ₹500 fine or both",
        description: "Criminal trespass punishment"
      },
      "IPC Section 448": {
        title: "House-trespass",
        penalty: "Up to 1 year imprisonment or ₹1000 fine or both",
        description: "Criminal trespass into dwelling house"
      },
      "IPC Section 449": {
        title: "House-trespass for hurt, assault or wrongful restraint",
        penalty: "Up to 2 years imprisonment or fine or both",
        description: "House-trespass to commit offence punishable with imprisonment"
      },
      "IPC Section 450": {
        title: "House-trespass for theft",
        penalty: "Up to 7 years imprisonment",
        description: "House-trespass in order to commit theft"
      }
    },
    supporting_laws: [
      "Transfer of Property Act, 1882",
      "Indian Registration Act, 1908",
      "Specific Relief Act, 1963"
    ]
  },

  // Harassment Laws
  harassment: {
    primary_act: "Indian Penal Code, 1860",
    sections: {
      "IPC Section 509": {
        title: "Word, gesture or act intended to insult modesty of woman",
        penalty: "Up to 1 year imprisonment or fine or both",
        description: "Insulting modesty of woman by words, gestures or acts"
      },
      "IPC Section 506": {
        title: "Criminal intimidation",
        penalty: "Up to 2 years imprisonment or fine or both",
        description: "Criminal intimidation"
      },
      "IPC Section 507": {
        title: "Criminal intimidation by anonymous communication",
        penalty: "Up to 2 years imprisonment or fine or both",
        description: "Criminal intimidation by anonymous communication"
      }
    },
    supporting_laws: [
      "Sexual Harassment of Women at Workplace Act, 2013",
      "IT Act Section 66A (Struck down but relevant precedent)"
    ]
  },

  // Discrimination Laws
  discrimination: {
    primary_act: "Constitution of India & Special Acts",
    sections: {
      "Article 14": {
        title: "Right to Equality",
        penalty: "Constitutional remedy, compensation",
        description: "Equality before law and equal protection of laws"
      },
      "Article 15": {
        title: "Prohibition of discrimination",
        penalty: "Constitutional remedy, punitive action",
        description: "Prohibition of discrimination on grounds of religion, race, caste, sex"
      },
      "SC/ST Act Section 3": {
        title: "Atrocities against SC/ST",
        penalty: "6 months to 5 years imprisonment",
        description: "Prevention of atrocities against SC/ST"
      }
    },
    supporting_laws: [
      "Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act, 1989",
      "Rights of Persons with Disabilities Act, 2016",
      "Equal Remuneration Act, 1976"
    ]
  },

  // Financial Crimes
  financial: {
    primary_act: "Prevention of Money Laundering Act, 2002",
    sections: {
      "PMLA Section 3": {
        title: "Offence of money laundering",
        penalty: "3 to 7 years imprisonment and fine",
        description: "Involvement in money laundering"
      },
      "IPC Section 463": {
        title: "Forgery",
        penalty: "Up to 2 years imprisonment or fine or both",
        description: "Making false documents"
      },
      "IPC Section 465": {
        title: "Punishment for forgery",
        penalty: "Up to 2 years imprisonment or fine or both",
        description: "Forgery punishment"
      },
      "IPC Section 467": {
        title: "Forgery of valuable security, will, etc.",
        penalty: "Up to 7 years imprisonment or fine or both",
        description: "Forgery of valuable security"
      }
    },
    supporting_laws: [
      "Foreign Exchange Management Act, 1999 (FEMA)",
      "Banking Regulation Act, 1949",
      "Securities and Exchange Board of India Act, 1992"
    ]
  }
};

// Function to get applicable laws based on crime category and keywords
const getApplicableLaws = (category, description = "", severity = "medium") => {
  const laws = [];
  const text = description.toLowerCase();
  
  // Always give equal importance to all crimes
  const priorityLevel = "HIGH"; // All crimes are high priority for legal references
  
  // Primary category laws
  if (INDIAN_LAWS[category]) {
    const categoryLaws = INDIAN_LAWS[category];
    
    // Add primary act
    laws.push({
      act: categoryLaws.primary_act,
      type: "Primary Act",
      priority: priorityLevel,
      sections: Object.entries(categoryLaws.sections).map(([key, value]) => ({
        section: key,
        title: value.title,
        penalty: value.penalty,
        description: value.description,
        applicable: true
      }))
    });
    
    // Add supporting laws
    if (categoryLaws.supporting_laws) {
      laws.push({
        act: "Supporting Legislation",
        type: "Supporting Acts",
        priority: priorityLevel,
        sections: categoryLaws.supporting_laws.map(law => ({
          section: law,
          applicable: true
        }))
      });
    }
  }
  
  // Cross-reference other applicable laws based on keywords
  if (text.includes('online') || text.includes('internet') || text.includes('cyber')) {
    if (category !== 'cybercrime' && INDIAN_LAWS.cybercrime) {
      laws.push({
        act: INDIAN_LAWS.cybercrime.primary_act,
        type: "Cross-Reference",
        priority: priorityLevel,
        note: "Applicable if online elements are involved"
      });
    }
  }
  
  if (text.includes('woman') || text.includes('wife') || text.includes('female')) {
    laws.push({
      act: "Women-Specific Protections",
      type: "Special Protection",
      priority: priorityLevel,
      sections: [
        { section: "IPC Section 354", title: "Assault on woman with intent to outrage modesty" },
        { section: "IPC Section 509", title: "Insulting modesty of woman" }
      ]
    });
  }
  
  return laws;
};

module.exports = {
  INDIAN_LAWS,
  getApplicableLaws
};