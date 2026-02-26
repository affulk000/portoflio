import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { education } from "@/data/education";
import { certifications } from "@/data/certification";

export const useGenerateCV = () => {
    const generateCV = () => {
        const content = `
EMMANUEL AFFUL
System Software Engineer
emmanuelafful946@gmail.com | Accra, Ghana
GitHub: github.com/affulk000 | LinkedIn: linkedin.com/in/emmanuel-afful-74336517b

PROFESSIONAL SUMMARY
Backend Engineer specializing in Go, PostgreSQL, and multi-tenant SaaS architecture with 4+ years of experience building scalable, secure systems with clean architecture and modern infrastructure.

EXPERIENCE
${experience.map(exp => `
${exp.title} - ${exp.company}
${exp.period} | ${exp.location}
${exp.description}
${exp.achievements.map(a => `• ${a}`).join('\n')}
`).join('\n')}

PROJECTS
${projects.slice(0, 5).map(proj => `
${proj.title}
${proj.description}
Technologies: ${proj.technologies.join(', ')}
`).join('\n')}

TECHNICAL SKILLS
${skills.map(cat => `
${cat.category}: ${cat.items.map(i => i.name).join(', ')}
`).join('\n')}

EDUCATION
${education.map(edu => `
${edu.degree} - ${edu.institution}
${edu.period} | ${edu.location}
${edu.description}
`).join('\n')}

CERTIFICATIONS
${certifications.map(cert => `• ${cert.name} - ${cert.issuer} (${cert.date})`).join('\n')}
`;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Emmanuel_Afful_CV.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return { generateCV };
};
