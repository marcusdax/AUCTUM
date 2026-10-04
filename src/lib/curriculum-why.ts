export type CurriculumStake = { label: string; value: string };

export type CurriculumWhy = {
  id: string;
  title: string;
  point: string;
  take: string;
  leave: string;
  stakes: CurriculumStake[];
};

export const curriculumWhy: CurriculumWhy[] = [
  {
    id: "farmer",
    title: "Farmer",
    point: "So you can read the receipt that sets your share, and dispute a score without putting the floor at risk.",
    take: "Track D. It is in Vietnamese first. Finishing it never holds a payment.",
    leave: "Do not take the cupper track to be believed. A score used against you still has to come from a credentialed panel, and you may ask for the card.",
    stakes: [
      {
        label: "The share",
        value:
          "Under the partnership as written, a cup of 86 and above takes half of what is left after the floor and the costs. 80 to 85 takes 35 percent. 75 to 79 takes 20. 70 to 74 takes 10. Under 70 takes none, and the lot goes to exception. You cannot argue a band you cannot read.",
      },
      {
        label: "The floor",
        value:
          "The floor is paid when the lot clears the first check. A later, poorer sale does not take it back. Confirmed fraud is the exception, not a disappointing cup. The lesson is how to find that line on the receipt and how to see if it was netted against something it should not touch.",
      },
      {
        label: "The dispute",
        value:
          "You may have every scorecard. An independent grader, if you are the farmer and not the collector, is at the company's cost. If the floor is more than five business days late without cause, you may sell the next lot elsewhere. An undisclosed change in fermentation is a Tier 2. A disclosed one is a note.",
      },
    ],
  },
  {
    id: "collector",
    title: "Exporter and collector",
    point: "So the pass-through you sign is the one the farmer can open on the same page.",
    take: "Track D, then enough of Track F to read a record before you forward it. Track E if you are the person uploading the documents.",
    leave: "Do not treat the cupper track as a way to assign the farmer a score. You report the file's score. You do not invent a lower one.",
    stakes: [
      {
        label: "The pass-through",
        value:
          "At least 80 percent of the revenue share on that farmer's coffee goes to them. You keep at most 20 percent of that share. Your aggregation fee is paid beside the floor, not out of it. The attestation is the credential. Without it you may still deliver. You may not claim the farmer was shown the schedule.",
      },
      {
        label: "The clock",
        value:
          "Their floor leaves your hands within three business days of yours arriving. The receipt they receive names the lot, the weight, the cup, the floor, the sale, the costs, and the share. If your copy and theirs disagree, the file wins.",
      },
      {
        label: "The deviation",
        value:
          "A process you did not write down before delivery is not a surprise you get to explain after the cup. Say it when the coffee moves. The lesson is the difference between a disclosed experiment and an undisclosed one.",
      },
    ],
  },
  {
    id: "cupper",
    title: "Cupper",
    point: "A score that moves a price is a procedure. Past a variance of three points, the authority goes.",
    take: "Track A. A Tier 2 credential cups standard checks. It does not close a Tier 2 or Tier 3 exception. That panel wants a Tier 1 grader.",
    leave: "Tier 0 does not taste and does not score. Setting out bowls is not cupping.",
    stakes: [
      {
        label: "The band",
        value:
          "A Tier 1 grader is held to about a point and a half. A Tier 2 cupper is held wider, about two and a half, and only on the work that credential names. Three bowls. The score is reported to the half point. A tenth from one person is a precision they do not have.",
      },
      {
        label: "The panel",
        value:
          "When the cup will reprice, reject, or decide a share, three people score before they speak. One outlier past two points has to justify it or leave the average. The lesson is when you are allowed to be the only nose in the room, and when you are not.",
      },
      {
        label: "The room",
        value:
          "Water near 200°F, a medium city roast, a reference coffee in every session. If the reference leaves its band, you stop and find out whether it is you, the coffee, or the room. Fatigue is a cause. Ten cups is a day.",
      },
    ],
  },
  {
    id: "warehouse",
    title: "Sample custody",
    point: "The retained bag is the only ground truth. A bad pull voids the comparison, and with it the claim.",
    take: "Track B. It issues the custody credential. Without it you do not open the cabinet.",
    leave: "Do not cup what you pull. Custody and scoring are different authorities, on purpose.",
    stakes: [
      {
        label: "The pull",
        value:
          "Middle of the container, a full bag, sealed before it leaves the floor, labeled, photographed, signed by two people. A partial scoop is not a reference. An opened bag is no longer pristine, and the sticker has to say so.",
      },
      {
        label: "The cabinet",
        value:
          "60 to 65°F, 45 to 55 percent humidity, no window, a log every time the door opens. A swing of more than a few hours is written onto the cupping note. A moldy or unsealed bag is not cupped.",
      },
      {
        label: "How long",
        value:
          "Sixty days if nothing went wrong. Ninety after a small exception. Half a year after a Tier 2. A year after a Tier 3, and longer if someone is still arguing. Destruction takes two people. A lost sample stops the cupping path and the supplier is told.",
      },
    ],
  },
  {
    id: "roaster",
    title: "Small roaster",
    point: "So the number you print, and the process you name, are still the ones a guest sees when they scan the bag.",
    take: "Track F. Four lessons. It gates nothing you buy. It stops you publishing a sentence the file will contradict.",
    leave: "Do not take Track A unless you intend to score for your own table. A subscription does not make you a grader, and it does not let you close an exception.",
    stakes: [
      {
        label: "The score",
        value:
          "You learn to read a panel average and a range, and to ignore a tenth of a point from a single cupper. The bag should carry the score the file carries. If the lot is later downgraded, the card moves with it.",
      },
      {
        label: "The sample",
        value:
          "You will not open the cabinet. You need to know the sample is still there, who may open it, and that a complaint six months on is compared to that bag and not to your memory of the cup.",
      },
      {
        label: "The border",
        value:
          "If the coffee is going to Europe, the file wants a polygon of the plot, not a pin on a town. The lesson is which document is the one a buyer will ask you for, and which sentence on the bag is only a sentence.",
      },
    ],
  },
  {
    id: "importer",
    title: "Importer",
    point: "So a claim you stand behind is inside the window, against the sealed sample, with the fault named.",
    take: "Track F, and read Track C as the record you will be shown. You do not need the adjudicator credential to be paid or to object.",
    leave: "Do not cup the dispute yourself and call it the panel. Independent review is a grader neither of you employs.",
    stakes: [
      {
        label: "The clock",
        value:
          "A small variance is 48 hours. Identity risk is five business days and two signatures. A broken chain is ten business days, and you are told within a day. A claim starts within 60 days of finding the gap, 90 if it was hidden. Fraud has a longer memory, and still has to be said within a year.",
      },
      {
        label: "The money",
        value:
          "A downgrade follows the lower grade's price over the original, plus the documented cost of the hold. The cut stops at half the original price, or at the spot for that lower grade, whichever is smaller. A reject claims the purchase plus hold, analysis, and disposal, and stops at 110 percent of the price.",
      },
      {
        label: "The fault",
        value:
          "The party who bears it is the party where the chain broke. In transit, with proof, the carrier. In the warehouse, after a clean handoff, the house. If nobody can show where, it splits. Silence after notice is not a defense you should rely on, and it is not one you should use.",
      },
    ],
  },
  {
    id: "cafe",
    title: "Coffee shop",
    point: "So the person on the bar stops inventing a fermentation the lot did not run.",
    take: "Track F, the short one. The same four lessons for whoever writes the card and whoever says it out loud.",
    leave: "Do not take the exception track or the cupper track. You are not closing claims, and you are not scoring the book.",
    stakes: [
      {
        label: "The card",
        value:
          "What you may write is what the autopsy already shows: the name, the process that was disclosed, the score, the price. A process you add because it sounds like the cup is a sentence the scan will contradict.",
      },
      {
        label: "The guest",
        value:
          "They can open the same page you trained on. If the lesson and the card disagree, the page is the one they will believe. The curriculum is how you get there first.",
      },
      {
        label: "The hold",
        value:
          "If the lot is downgraded or rejected after you have the bags, the card changes. The lesson is how to read that status so last month's description does not stay on the board.",
      },
    ],
  },
  {
    id: "drinker",
    title: "Drinker",
    point: "So you can tell a receipt from a costume. Nothing you can buy is locked behind this.",
    take: "The first three lessons of Track F, if you want them. Optional.",
    leave: "Do not take a credential track. You will not be scored, and you will not be asked to finish a course to see a farm.",
    stakes: [
      {
        label: "The number",
        value:
          "A score is three bowls and a named cupper, not a mood. A single tenth of a point is more precise than a person is. The lesson is what to trust on the bag and what to ignore.",
      },
      {
        label: "The sample",
        value:
          "Someone kept a sealed bag from the middle of the lot. That is why a later complaint can be checked. You will never see the cabinet. You should know it is the reason the number is allowed to be printed.",
      },
      {
        label: "The floor",
        value:
          "The line that says what the grower was paid before the coffee was sold on is the part of the story you can check. The rest of the romance is optional. That line is the point of the lesson.",
      },
    ],
  },
  {
    id: "hospitality",
    title: "Restaurant and hotel",
    point: "Purchasing and the dining room leave the lesson with the same sentences.",
    take: "Track F, once, for the person who signs the order and for the person who speaks about the cup at the table.",
    leave: "Do not send the chef through the cupper track so the menu can sound more certain. Certainty comes from the file, not from a second vocabulary.",
    stakes: [
      {
        label: "The order",
        value:
          "The buyer learns moisture, cup, and the documents a border will ask for, without calling a grader to translate. The order you sign should match the autopsy you were shown.",
      },
      {
        label: "The room",
        value:
          "Service may say the name, the process on the file, and the price. It may not add a fermentation, a village, or a score the page does not carry. One lesson, two jobs.",
      },
      {
        label: "The reprint",
        value:
          "A hold or a reject takes the lot off the list even if the banquet card already went to print. The curriculum is how purchasing sees that status before service repeats it.",
      },
    ],
  },
  {
    id: "intake",
    title: "Document intake",
    point: "Accepting a page writes the ledger in your name. A wrong accept is a false document.",
    take: "Track E. It is the gate on accept. The calibration set is the renewal, not a second enrolment.",
    leave: "Do not skip a red field because the rest of the page looks familiar. Familiar is how a phytosanitary certificate gets filed as a cupping sheet.",
    stakes: [
      {
        label: "The gate",
        value:
          "Critical fields block the accept. Lot, weight, the issuer, the date. If a field is below the line, the page stays a proposal. You do not get to average it in.",
      },
      {
        label: "The rejection",
        value:
          "Sending a page back is not a penalty to the person who sent it. The lesson is how to reject without inventing a dispute, and how to say what was unreadable.",
      },
      {
        label: "The class",
        value:
          "A receipt, a cupping sheet, and a government certificate are not the same object. Issuer class is part of the read. The credential lapses when the calibration does, and the remedy is the set, not a lecture.",
      },
    ],
  },
  {
    id: "adjudicator",
    title: "Exception desk",
    point: "You are about to move someone's price. The lesson is that the floor is not your leverage.",
    take: "Track C. It issues the adjudicator credential. Tier 2 and Tier 3 do not close on a single signature.",
    leave: "Do not use a Tier 1 documentation gap to reopen a floor that was already paid. Quality moves the share. It does not invoice the farmer backward.",
    stakes: [
      {
        label: "Four endings",
        value:
          "Release, downgrade, reject, or split the damaged bags into their own lot. There is not a fifth outcome called a compromise you thought of on the call. If the sample is gone, you do not invent the cup.",
      },
      {
        label: "The asymmetry",
        value:
          "The person who grew it disputes at the company's cost. The collector splits the cost. A floor already sent is not offset for a later variance unless fraud is confirmed. The lesson exists so a desk in a hurry does not 'net' it anyway.",
      },
      {
        label: "The answer",
        value:
          "Notice within a day on a serious exception. A window for counter-evidence. Independent review if you still disagree. Silence is not the same as a signed disposition, and a signed one is what the buyer is allowed to see.",
      },
    ],
  },
];
