// src/data/contact.ts
export interface ContactInfo {
    email: string;
    phone?: string;
    location: {
        city: string;
        country: string;
        timezone: string;
    };
    availability: {
        status: 'available' | 'busy' | 'unavailable';
        message: string;
        preferredContactMethod: 'email' | 'phone' | 'linkedin';
    };
}

export interface SocialLink {
    uuid: string;
    platform: string;
    url: string;
    username: string;
    icon: string;
    primary: boolean;
}

export const contactInfo: ContactInfo = {
    email: "emmanuel.afful@proton.me",
    phone: "+233 XX XXX XXXX", // Placeholder for privacy
    location: {
        city: "Accra",
        country: "Ghana",
        timezone: "GMT+0"
    },
    availability: {
        status: "available",
        message: "Open to new opportunities and collaborations",
        preferredContactMethod: "email"
    }
};

export const socialLinks: readonly SocialLink[] = [
    {
        uuid: "social-github",
        platform: "GitHub",
        url: "https://github.com/affulk000",
        username: "affulk000",
        icon: "devicon:github",
        primary: true
    },
    {
        uuid: "social-linkedin",
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/emmanuel-afful-74336517b",
        username: "emmanuel-afful-74336517b",
        icon: "devicon:linkedin",
        primary: true
    },
    {
        uuid: "social-twitter",
        platform: "Twitter",
        url: "https://twitter.com/affulk000",
        username: "@affulk000",
        icon: "devicon:twitter",
        primary: false
    },
    {
        uuid: "social-email",
        platform: "Email",
        url: "mailto:emmanuel.afful@proton.me",
        username: "emmanuel.afful@proton.me",
        icon: "solar:letter-bold",
        primary: true
    }
];

export const getSocialLinkByPlatform = (platform: string): SocialLink | undefined => {
    return socialLinks.find((link) => link.platform.toLowerCase() === platform.toLowerCase());
};

export const getPrimarySocialLinks = (): readonly SocialLink[] => {
    return socialLinks.filter((link) => link.primary);
};
