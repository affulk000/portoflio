// src/data/education.ts
export interface Education {
    uuid: string;
    title: string;
    institution: string;
    location: string;
    startDate: string; // Format: YYYY-MM-DD
    endDate: string; // Format: YYYY-MM-DD
    description: string;
    tags?: Array<string>;
}

export const education: readonly Education[] = [
    {
        uuid: "edu-gctu-2020-2022",
        title: "Diploma in Information Technology",
        institution: "Ghana Communication Technology University",
        location: "Tesano, Accra, Ghana",
        startDate: "2020-09-01",
        endDate: "2022-06-30",
        description:
            "Completed 2-year Information Technology Diploma program with focus on software development, networking, and database management. All courses taught in English.",
        tags: [
            "Cryptography",
            "Entrepreneurship",
            "Data Flow",
            "Networking",
            "Database Management",
            "Data Structures",
            "Algorithms",
        ],
    },
    {
        uuid: "edu-bompata-2016-2018",
        title: "General Arts",
        institution: "Bompata Senior High School",
        location: "Bompata, Ashanti Region, Ghana",
        startDate: "2016-09-01",
        endDate: "2018-06-30",
        description:
            "Completed senior high school education with focus on General Arts. Strong performance in core subjects including Mathematics, English, and Social Studies with electives in Economics and Geography.",
        tags: [
            "English",
            "Mathematics",
            "Science",
            "Social Studies",
            "Further Mathematics",
            "Economics",
            "Geography",
            "Government",
        ],
    },
];

export const getEducationById = (uuid: string): Education | undefined =>
    education.find((edu) => edu.uuid === uuid);
