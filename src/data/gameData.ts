export interface UrlItem {
  id: string;
  url: string;
  isReal: boolean;
  explanation: string;
  redFlags?: string[];
}

export interface EmailItem {
  id: string;
  email: string;
  isReal: boolean;
  explanation: string;
  redFlags?: string[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  isRedFlag: boolean;
  explanation?: string;
}

export interface ScamCase {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  checklist: ChecklistItem[];
  whyScam: string[];
  whatToDo: string;
}

export const websiteUrls: UrlItem[] = [
  {
    id: 'url1',
    url: 'https://www.amazon.in',
    isReal: true,
    explanation: 'Official Amazon India website with correct .in domain',
  },
  {
    id: 'url2',
    url: 'https://www.tcs.com',
    isReal: true,
    explanation: 'Official TCS website with correct .com domain',
  },
  {
    id: 'url3',
    url: 'https://www.sbi.co.in',
    isReal: true,
    explanation: 'Official State Bank of India with correct .co.in domain',
  },
  {
    id: 'url4',
    url: 'https://www.navgurukul.org',
    isReal: true,
    explanation: 'Official NavGurukul website with .org for non-profit',
  },
  {
    id: 'url5',
    url: 'https://www.uidai.gov.in',
    isReal: true,
    explanation: 'Official government UIDAI (Aadhaar) website with .gov.in',
  },
  {
    id: 'url6',
    url: 'https://amazon-prime.top',
    isReal: false,
    explanation: 'Fake - Uses suspicious .top domain and adds extra words',
    redFlags: ['.top is a suspicious domain', 'Real Amazon uses amazon.in, not amazon-prime'],
  },
  {
    id: 'url7',
    url: 'https://tcs-careers.online',
    isReal: false,
    explanation: 'Fake - Uses .online domain which legitimate companies avoid',
    redFlags: ['.online is a cheap, suspicious domain', 'Real TCS careers are on tcs.com'],
  },
  {
    id: 'url8',
    url: 'https://sbi-login-secure.xyz',
    isReal: false,
    explanation: 'Fake - Multiple red flags with extra words and .xyz domain',
    redFlags: ['.xyz is a suspicious domain', 'Extra words like "login" and "secure"', 'Banks use .co.in not random domains'],
  },
  {
    id: 'url9',
    url: 'https://navgurukul-admission.in',
    isReal: false,
    explanation: 'Fake - Adds "admission" to trick applicants',
    redFlags: ['Real NavGurukul uses navgurukul.org', 'Extra word "admission" is a red flag'],
  },
  {
    id: 'url10',
    url: 'https://aadhaar-update.online',
    isReal: false,
    explanation: 'Fake - Government never uses .online domains',
    redFlags: ['Real Aadhaar site is uidai.gov.in', '.online domain is suspicious', 'Government sites always end in .gov.in'],
  },
];

export const emailAddresses: EmailItem[] = [
  {
    id: 'email1',
    email: 'customercare@pnb.co.in',
    isReal: true,
    explanation: 'Official PNB domain matches their website pnb.co.in',
  },
  {
    id: 'email2',
    email: 'no-reply@amazon.in',
    isReal: true,
    explanation: 'Official Amazon India domain',
  },
  {
    id: 'email3',
    email: 'care@tcs.com',
    isReal: true,
    explanation: 'Official TCS domain matches their website',
  },
  {
    id: 'email4',
    email: 'customercare.pnb@gmail.com',
    isReal: false,
    explanation: 'Fake - Banks never use Gmail for official communication',
    redFlags: ['Uses @gmail.com instead of official domain', 'Real banks have their own email servers'],
  },
  {
    id: 'email5',
    email: 'no-reply@amaz0n-support.co',
    isReal: false,
    explanation: 'Fake - Uses "0" instead of "o" and suspicious domain',
    redFlags: ['Letter "o" replaced with "0"', 'Extra word "support"', 'Wrong domain .co instead of .in'],
  },
  {
    id: 'email6',
    email: 'care@tcss.com',
    isReal: false,
    explanation: 'Fake - Extra "s" in domain name',
    redFlags: ['Typosquatting with extra "s"', 'Real TCS uses tcs.com'],
  },
  {
    id: 'email7',
    email: 'refunds@amazon.in.secure.com',
    isReal: false,
    explanation: 'Fake - Multiple domains chained together',
    redFlags: ['Domain chaining (amazon.in.secure.com)', 'Real domain is just amazon.in'],
  },
  {
    id: 'email8',
    email: 'pnb-help@support.xyz',
    isReal: false,
    explanation: 'Fake - Bank name used with random .xyz domain',
    redFlags: ['.xyz is a suspicious domain', 'Real PNB uses @pnb.co.in'],
  },
  {
    id: 'email9',
    email: 'offers@amazon-india.com',
    isReal: false,
    explanation: 'Fake - Amazon India uses amazon.in, not amazon-india.com',
    redFlags: ['Wrong domain structure', 'Real Amazon India is @amazon.in'],
  },
  {
    id: 'email10',
    email: 'support@tcs.co.in.help.com',
    isReal: false,
    explanation: 'Fake - Multiple domains chained together',
    redFlags: ['Domain chaining attack', 'Real TCS uses just @tcs.com'],
  },
];

export const scamCases: ScamCase[] = [
  {
    id: 'case1',
    title: 'Suspicious Job Offer',
    description: 'Analyze this job offer email for red flags',
    imagePath: '/src/assets/scam-job-offer.png',
    checklist: [
      { id: 'c1-1', text: 'Generic greeting ("Dear Candidate")', isRedFlag: true, explanation: 'Real employers use your name' },
      { id: 'c1-2', text: 'Personalized greeting with your actual name', isRedFlag: false },
      { id: 'c1-3', text: 'Unknown company - cannot verify online', isRedFlag: true, explanation: 'Always verify company exists' },
      { id: 'c1-4', text: 'No interview mentioned, direct selection', isRedFlag: true, explanation: 'Real jobs require interviews' },
      { id: 'c1-5', text: 'Proper interview process described', isRedFlag: false },
      { id: 'c1-6', text: 'High salary without assessment', isRedFlag: true, explanation: 'Too good to be true' },
      { id: 'c1-7', text: 'Urgency ("by tomorrow", "immediately")', isRedFlag: true, explanation: 'Scammers create fake urgency' },
      { id: 'c1-8', text: 'WhatsApp used for HR communication', isRedFlag: true, explanation: 'Real HR uses official channels' },
      { id: 'c1-9', text: 'Official company email domain', isRedFlag: false },
      { id: 'c1-10', text: 'Attachments to download & sign immediately', isRedFlag: true, explanation: 'May contain malware' },
    ],
    whyScam: [
      'Real companies do not hire without interviews',
      'HR uses official email, not WhatsApp for hiring',
      'Urgency stops you from thinking clearly',
      'Attachments may contain malware',
      'Fake companies use high salaries to lure victims',
    ],
    whatToDo: "Don't download attachments. Don't reply. Search the company on LinkedIn/Google to verify.",
  },
  {
    id: 'case2',
    title: 'Tech Support Scam',
    description: 'Analyze this Windows license email for red flags',
    imagePath: '/src/assets/scam-tech-support.png',
    checklist: [
      { id: 'c2-1', text: 'Wrong domain (outlook-security.com)', isRedFlag: true, explanation: 'Not official Microsoft domain' },
      { id: 'c2-2', text: 'Official Microsoft domain', isRedFlag: false },
      { id: 'c2-3', text: 'Suspicious .xyz ending', isRedFlag: true, explanation: 'Microsoft never uses .xyz' },
      { id: 'c2-4', text: 'Fear tactics ("computer will stop")', isRedFlag: true, explanation: 'Designed to make you panic' },
      { id: 'c2-5', text: 'Urgency ("48 hours")', isRedFlag: true, explanation: 'Creates fake deadline' },
      { id: 'c2-6', text: 'Generic greeting ("Dear Windows User")', isRedFlag: true, explanation: 'No personalization' },
      { id: 'c2-7', text: 'Discount/offer pressure', isRedFlag: true, explanation: 'Urgency tactic' },
      { id: 'c2-8', text: 'WhatsApp for Microsoft support', isRedFlag: true, explanation: 'Microsoft never uses WhatsApp' },
      { id: 'c2-9', text: 'International phone number (+1-555)', isRedFlag: true, explanation: 'US number for Indian user is suspicious' },
      { id: 'c2-10', text: 'Official local support number', isRedFlag: false },
      { id: 'c2-11', text: 'Threat of data loss', isRedFlag: true, explanation: 'Fear-based manipulation' },
      { id: 'c2-12', text: 'Windows license expires like this', isRedFlag: false },
    ],
    whyScam: [
      'Microsoft NEVER uses domains like outlook-security.xyz',
      'Windows licenses do not expire suddenly with 48-hour warnings',
      'Real Microsoft does not use WhatsApp for support',
      'US number for Indian user is suspicious',
      'Creating panic to make you act without thinking',
    ],
    whatToDo: 'Ignore completely. Windows licenses do not work this way. Check your actual Windows settings if concerned.',
  },
  {
    id: 'case3',
    title: 'Banking App Scam',
    description: 'Analyze this bank SMS for red flags',
    imagePath: '/src/assets/scam-banking.png',
    checklist: [
      { id: 'c3-1', text: 'APK file sent via SMS', isRedFlag: true, explanation: 'Banks never send APK files' },
      { id: 'c3-2', text: 'Link to Play Store/App Store', isRedFlag: false },
      { id: 'c3-3', text: 'Account suspension threat', isRedFlag: true, explanation: 'Fear-based manipulation' },
      { id: 'c3-4', text: 'Vague transaction details', isRedFlag: true, explanation: 'Real banks give specific transaction info' },
      { id: 'c3-5', text: 'Specific transaction ID & amount given', isRedFlag: false },
      { id: 'c3-6', text: 'Message from unknown number', isRedFlag: true, explanation: 'Banks use official SMS IDs' },
      { id: 'c3-7', text: 'Message from bank\'s official SMS ID', isRedFlag: false },
      { id: 'c3-8', text: 'No helpline number provided', isRedFlag: true, explanation: 'Real banks always provide helpline' },
      { id: 'c3-9', text: 'Official bank helpline mentioned', isRedFlag: false },
      { id: 'c3-10', text: 'Download app from unknown link', isRedFlag: true, explanation: 'Never download from unknown sources' },
    ],
    whyScam: [
      'Banks NEVER send APK files via SMS',
      'Real apps are only available on Play Store/App Store',
      'Real banks provide specific transaction details (ID, amount, date)',
      'Banks send multiple warnings before account suspension',
      'No official contact information provided',
    ],
    whatToDo: 'Delete immediately. Visit bank branch or call official helpline if concerned. Download apps only from official stores after checking developer name & reviews.',
  },
];

export const domainExtensions = [
  { ext: '.org', desc: 'Non-profit organizations' },
  { ext: '.co.in', desc: 'Businesses registered in India' },
  { ext: '.com', desc: 'International/American companies' },
  { ext: '.in', desc: 'India-specific websites' },
  { ext: '.eu', desc: 'Europe specific' },
  { ext: '.gov.in', desc: 'Government websites in India' },
];

export const redFlagPatterns = [
  {
    title: 'Letters replaced with numbers',
    example: 'amaz0n.in instead of amazon.in',
    trick: 'Your brain reads "amaz0n" as "amazon" but it\'s a fake site stealing your details.',
  },
  {
    title: 'Extra words added',
    example: 'sbi-login-secure.com instead of sbi.co.in',
    trick: 'Real banks never add these words. Scammers use them to look trustworthy.',
  },
  {
    title: 'Suspicious endings',
    example: 'navgurukul-admission.online instead of navgurukul.org',
    trick: 'These endings cost ₹50/year. Real companies use .com, .in, .co.in, .org',
  },
  {
    title: 'Too many dots or hyphens',
    example: 'amazon.in.refund.co or sbi-net-banking.com',
    trick: 'Real websites are simple. Extra dots = fake site trying to confuse you.',
  },
];

export const verificationTools = {
  websites: [
    { name: 'spotthescam.in', desc: 'If score is less than 70%, it can be risky', url: 'https://spotthescam.in' },
    { name: 'virustotal.com', desc: 'Scan URLs for threats and malware', url: 'https://virustotal.com' },
  ],
  emails: [
    { name: 'emailawesome.com', desc: 'Check email authenticity', url: 'https://emailawesome.com' },
  ],
  shortLinks: [
    { name: 'expandurl.net', desc: 'Shows hidden website by expanding the address', url: 'https://expandurl.net' },
    { name: 'virustotal.com/gui/home/url', desc: 'Checks if dangerous', url: 'https://virustotal.com/gui/home/url' },
  ],
};

export const achievementLevels = [
  { min: 90, max: 100, title: 'Link Detective Master', emoji: '🕵️' },
  { min: 75, max: 89, title: 'Scam Buster Expert', emoji: '🛡️' },
  { min: 60, max: 74, title: 'Digital Guardian', emoji: '🔐' },
  { min: 50, max: 59, title: 'Aware User', emoji: '👀' },
  { min: 0, max: 49, title: 'Keep Learning!', emoji: '📚' },
];
