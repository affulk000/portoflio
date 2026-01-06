// src/data/certification.ts
export interface Certification {
    uuid: string;
    title: string;
    issuer: string;
    date: string;
    description: string;
    skills: Array<string>;
    issuerLogo: string;
    verifyUrl: string;
    credentialId: string;
}

export const certifications: Certification[] = [
    {
        uuid: "018f2a9e-7b6c-7a3c-bc44-9e1c4a6f8d21",
        title: "Google Project Management Professional Certificate",
        issuer: "Google",
        issuerLogo:
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjYyIiB2aWV3Qm94PSIwIDAgMjU2IDI2MiI+PHBhdGggZmlsbD0iIzQyODVmNCIgZD0iTTI1NS44NzggMTMzLjQ1MWMwLTEwLjczNC0uODcxLTE4LjU2Ny0yLjc1Ni0yNi42OUgxMzAuNTV2NDguNDQ4aDcxLjk0N2MtMS40NSAxMi4wNC05LjI4MyAzMC4xNzItMjYuNjkgNDIuMzU2bC0uMjQ0IDEuNjIybDM4Ljc1NSAzMC4wMjNsMi42ODUuMjY4YzI0LjY1OS0yMi43NzQgMzguODc1LTU2LjI4MiAzOC44NzUtOTYuMDI3Ii8+PHBhdGggZmlsbD0iIzM0YTg1MyIgZD0iTTEzMC41NSAyNjEuMWMzNS4yNDggMCA2NC44MzktMTEuNjA1IDg2LjQ1My0zMS42MjJsLTQxLjE5Ni0zMS45MTNjLTExLjAyNCA3LjY4OC0yNS44MiAxMy4wNTUtNDUuMjU3IDEzLjA1NWMtMzQuNTIzIDAtNjMuODI0LTIyLjc3My03NC4yNjktNTQuMjVsLTEuNTMxLjEzbC00MC4yOTggMzEuMTg3bC0uNTI3IDEuNDY1QzM1LjM5MyAyMzEuNzk4IDc5LjQ5IDI2MS4xIDEzMC41NSAyNjEuMSIvPjxwYXRoIGZpbGw9IiNmYmJjMDUiIGQ9Ik01Ni4yODEgMTU2LjM3Yy0yLjc1Ni04LjEyMy00LjM1MS0xNi44MjctNC4zNTEtMjUuODJjMC04Ljk5NCAxLjU5NS0xNy42OTcgNC4yMDYtMjUuODJsLS4wNzMtMS43M0wxNS4yNiA3MS4zMTJsLTEuMzM1LjYzNUM1LjA3NyA4OS42NDQgMCAxMDkuNTE3IDAgMTMwLjU1czUuMDc3IDQwLjkwNSAxMy45MjUgNTguNjAyeiIvPjxwYXRoIGZpbGw9IiNlYjQzMzUiIGQ9Ik0xMzAuNTUgNTAuNDc5YzI0LjUxNCAwIDQxLjA1IDEwLjU4OSA1MC40NzkgMTkuNDM4bDM2Ljg0NC0zNS45NzRDMTk1LjI0NSAxMi45MSAxNjUuNzk4IDAgMTMwLjU1IDBDNzkuNDkgMCAzNS4zOTMgMjkuMzAxIDEzLjkyNSA3MS45NDdsNDIuMjExIDMyLjc4M2MxMC41OS0zMS40NzcgMzkuODkxLTU0LjI1MSA3NC40MTQtNTQuMjUxIi8+PC9zdmc+",
        date: "2025",
        description:
            "Professional certification focused on end-to-end project management, covering agile methodologies, stakeholder communication, risk management, and delivery execution.",
        skills: [
            "Agile Project Management",
            "Scrum",
            "Kanban",
            "Stakeholder Management",
            "Risk Management",
            "Sprint Planning",
            "Resource Allocation",
            "Team Leadership",
        ],
        verifyUrl:
            "https://www.coursera.org/account/accomplishments/verify/4GANP2N30ABL?utm_source=ios&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
        credentialId: "4GANP2N30ABL",
    },
];

export const getCertificationByUuid = (
    uuid: string,
): Certification | undefined => {
    return certifications.find((cert) => cert.uuid === uuid);
};
