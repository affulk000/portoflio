import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { education } from "@/data/education";
import { certifications } from "@/data/certification";
import type { Experience } from "@/data/experience";
import type { Project } from "@/data/projects";
import type { SkillCategory } from "@/data/skills";
import type { Education } from "@/data/education";
import type { Certification } from "@/data/certification";

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
${experiences.map((exp: Experience) => `
${exp.title} - ${exp.company}
${exp.date} | ${exp.location}
${exp.description}
${exp.achievements.map((a: string) => `• ${a}`).join('\n')}
`).join('\n')}

PROJECTS
${projects.slice(0, 5).map((proj: Project) => `
${proj.title}
${proj.description}
Technologies: ${proj.technologies.join(', ')}
`).join('\n')}

TECHNICAL SKILLS
${skillCategories.map((cat: SkillCategory) => `
${cat.name}: ${cat.skills.map(i => i.name).join(', ')}
`).join('\n')}

EDUCATION
${education.map((edu: Education) => `
${edu.title} - ${edu.institution}
${edu.startDate} to ${edu.endDate} | ${edu.location}
${edu.description}
`).join('\n')}

CERTIFICATIONS
${certifications.map((cert: Certification) => `• ${cert.title} - ${cert.issuer} (${cert.date})`).join('\n')}
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
