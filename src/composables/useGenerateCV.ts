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
import { jsPDF } from "jspdf";

export const useGenerateCV = () => {
    const generateCV = () => {
        const doc = new jsPDF();
        let y = 20;

        // Header
        doc.setFontSize(20);
        doc.text("EMMANUEL AFFUL", 20, y);
        y += 10;
        doc.setFontSize(12);
        doc.text("System Software Engineer", 20, y);
        y += 7;
        doc.setFontSize(10);
        doc.text("emmanuel.afful@proton.me | Accra, Ghana", 20, y);
        y += 5;
        doc.text("GitHub: github.com/affulk000 | LinkedIn: linkedin.com/in/emmanuel-afful-74336517b", 20, y);
        y += 10;

        // Professional Summary
        doc.setFontSize(14);
        doc.text("PROFESSIONAL SUMMARY", 20, y);
        y += 7;
        doc.setFontSize(10);
        const summary = doc.splitTextToSize("Backend Engineer specializing in Go, PostgreSQL, and multi-tenant SaaS architecture with 4+ years of experience building scalable, secure systems.", 170);
        doc.text(summary, 20, y);
        y += summary.length * 5 + 5;

        // Experience
        doc.setFontSize(14);
        doc.text("EXPERIENCE", 20, y);
        y += 7;
        doc.setFontSize(10);
        experiences.forEach((exp: Experience) => {
            if (y > 270) { doc.addPage(); y = 20; }
            doc.setFont("helvetica", "bold");
            doc.text(`${exp.title} - ${exp.company}`, 20, y);
            y += 5;
            doc.setFont("helvetica", "normal");
            doc.text(`${exp.date} | ${exp.location}`, 20, y);
            y += 5;
            const desc = doc.splitTextToSize(exp.description, 170);
            doc.text(desc, 20, y);
            y += desc.length * 5 + 3;
        });
        y += 5;

        // Projects
        if (y > 250) { doc.addPage(); y = 20; }
        doc.setFontSize(14);
        doc.text("PROJECTS", 20, y);
        y += 7;
        doc.setFontSize(10);
        projects.slice(0, 3).forEach((proj: Project) => {
            if (y > 270) { doc.addPage(); y = 20; }
            doc.setFont("helvetica", "bold");
            doc.text(proj.title, 20, y);
            y += 5;
            doc.setFont("helvetica", "normal");
            const desc = doc.splitTextToSize(proj.description, 170);
            doc.text(desc, 20, y);
            y += desc.length * 5 + 3;
        });
        y += 5;

        // Skills
        if (y > 250) { doc.addPage(); y = 20; }
        doc.setFontSize(14);
        doc.text("TECHNICAL SKILLS", 20, y);
        y += 7;
        doc.setFontSize(10);
        skillCategories.forEach((cat: SkillCategory) => {
            if (y > 270) { doc.addPage(); y = 20; }
            doc.setFont("helvetica", "bold");
            doc.text(`${cat.name}:`, 20, y);
            doc.setFont("helvetica", "normal");
            doc.text(cat.skills.map(s => s.name).join(", "), 70, y);
            y += 5;
        });
        y += 5;

        // Education
        if (y > 250) { doc.addPage(); y = 20; }
        doc.setFontSize(14);
        doc.text("EDUCATION", 20, y);
        y += 7;
        doc.setFontSize(10);
        education.forEach((edu: Education) => {
            if (y > 270) { doc.addPage(); y = 20; }
            doc.setFont("helvetica", "bold");
            doc.text(`${edu.title} - ${edu.institution}`, 20, y);
            y += 5;
            doc.setFont("helvetica", "normal");
            doc.text(`${edu.startDate} to ${edu.endDate} | ${edu.location}`, 20, y);
            y += 7;
        });

        // Certifications
        if (y > 250) { doc.addPage(); y = 20; }
        doc.setFontSize(14);
        doc.text("CERTIFICATIONS", 20, y);
        y += 7;
        doc.setFontSize(10);
        certifications.forEach((cert: Certification) => {
            if (y > 270) { doc.addPage(); y = 20; }
            doc.text(`• ${cert.title} - ${cert.issuer} (${cert.date})`, 20, y);
            y += 5;
        });

        doc.save("Emmanuel_Afful_CV.pdf");
    };

    return { generateCV };
};
