<script setup lang="ts">
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";
import { motion } from "motion-v";
import { useModernScrollAnimation } from "@composables/useModernScrollAnimation";
import { projects as projectsData, type Project as DataProject } from "@/data/projects";

interface Project {
    id: string;
    title: string;
    tagline: string;
    description: string;
    role: string;
    duration: string;
    status: "active" | "completed" | "in-progress";
    highlights: string[];
    technologies: string[];
    metrics: {
        label: string;
        value: string;
        icon: string;
    }[];
    githubUrl?: string;
    liveUrl?: string;
    color: "accent" | "primary" | "orange";
}

// Transform data from projects.ts to component format
const projects = computed<Project[]>(() => {
    return projectsData.map((project, index) => {
        const colors = ["accent", "primary", "orange"] as const;
        const roles = {
            "backend": "Backend Developer & Architect",
            "web": "Frontend Developer",
            "fullstack": "Full Stack Developer",
            "mobile": "Mobile Developer",
            "devops": "DevOps Engineer"
        };
        
        const statusMap = {
            "in-progress": "active" as const,
            "completed": "completed" as const,
            "planned": "in-progress" as const
        };
        
        const getDuration = (start: string, end?: string) => {
            const startYear = new Date(start).getFullYear();
            const endYear = end ? new Date(end).getFullYear() : "Present";
            return `${startYear} - ${endYear}`;
        };
        
        const getMetrics = (project: DataProject) => {
            const metrics = [];
            if (project.githubUrl) {
                metrics.push({ label: "GitHub", value: "Available", icon: "solar:code-bold" });
            }
            if (project.status === "completed") {
                metrics.push({ label: "Status", value: "Complete", icon: "solar:check-circle-bold" });
            }
            if (project.featured) {
                metrics.push({ label: "Featured", value: "Yes", icon: "solar:star-bold" });
            }
            return metrics;
        };
        
        return {
            id: project.uuid,
            title: project.title,
            tagline: project.description,
            description: project.longDescription,
            role: roles[project.category] || "Developer",
            duration: getDuration(project.startDate, project.endDate),
            status: statusMap[project.status],
            highlights: project.highlights,
            technologies: project.technologies,
            metrics: getMetrics(project),
            githubUrl: project.githubUrl,
            liveUrl: project.demoUrl,
            color: colors[index % colors.length] as "accent" | "primary" | "orange"
        };
    });
});

const activeProjectIndex = ref(0);
const projectsSectionRef = ref<HTMLElement | null>(null);

// Modern scroll animation with fade out
useModernScrollAnimation(projectsSectionRef, {
    parallaxSpeed: 0.15,
    enableParallax: true,
    enableFade: true,
});

const getColorClasses = (color: string) => {
    const colors = {
        accent: {
            bg: "bg-accent-500/10",
            border: "border-accent-500/20",
            text: "text-accent-400",
            gradient: "from-accent-500 to-primary-600",
        },
        primary: {
            bg: "bg-primary-500/10",
            border: "border-primary-500/20",
            text: "text-primary-400",
            gradient: "from-primary-500 to-accent-600",
        },
        orange: {
            bg: "bg-orange-500/10",
            border: "border-orange-500/20",
            text: "text-orange-400",
            gradient: "from-orange-500 to-primary-600",
        },
    };
    return colors[color as keyof typeof colors] || colors.accent;
};

const getStatusBadge = (status: string) => {
    const badges = {
        active: {
            label: "Active Development",
            color: "bg-green-500/20 text-green-400 border-green-500/30",
        },
        "in-progress": {
            label: "In Progress",
            color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        },
        completed: {
            label: "Completed",
            color: "bg-gray-500/20 text-gray-400 border-gray-500/30",
        },
    };
    return badges[status as keyof typeof badges] || badges.completed;
};

// Get active project safely
const activeProject = (): Project => {
    const project = projects.value[activeProjectIndex.value];
    if (!project) {
        return projects.value[0]!; // projects.value[0] always exists
    }
    return project;
};

// Slider helpers
const goToProject = (index: number) => {
    const clamped = Math.max(0, Math.min(index, projects.value.length - 1));
    activeProjectIndex.value = clamped;
};

const nextProject = () => {
    if (activeProjectIndex.value < projects.value.length - 1) {
        activeProjectIndex.value += 1;
    } else {
        activeProjectIndex.value = 0;
    }
};

const prevProject = () => {
    if (activeProjectIndex.value > 0) {
        activeProjectIndex.value -= 1;
    } else {
        activeProjectIndex.value = projects.value.length - 1;
    }
};
</script>

<template>
    <section
        ref="projectsSectionRef"
        id="project"
        class="relative overflow-hidden py-24 lg:py-32"
    >
        <!-- Background Decoration -->
        <div class="absolute inset-0 opacity-10 pointer-events-none">
            <div
                class="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
                style="
                    background: radial-gradient(
                        circle,
                        var(--color-accent-500),
                        transparent
                    );
                "
            ></div>
        </div>

        <!-- Main Container -->
        <div class="flex items-center">
            <div class="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
                <!-- Section Header -->
                <div class="text-center mb-12 lg:mb-16">
                    <div
                        class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-400 text-sm font-semibold mb-6"
                    >
                        <Icon icon="solar:programming-bold" class="text-lg" />
                        <span>Featured Projects</span>
                    </div>
                    <h2
                        class="text-4xl lg:text-5xl font-bold text-white mb-4 font-display"
                    >
                        Building
                        <span class="gradient-text-primary"
                            >Impactful Solutions</span
                        >
                    </h2>
                    <p class="text-lg text-gray-400 max-w-2xl mx-auto">
                        From multi-tenant SaaS platforms to enterprise project
                        management
                    </p>
                </div>

                <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <!-- Left: Project Navigation -->
                    <div class="space-y-4">
                        <motion.div
                            v-for="(project, index) in projects"
                            :key="project.id"
                            :initial="{ opacity: 0, y: 20 }"
                            :animate="{ opacity: 1, y: 0 }"
                            :transition="{ duration: 0.35, delay: index * 0.05 }"
                            class="group cursor-pointer"
                            @click="goToProject(index)"
                        >
                            <motion.div
                                :layout="true"
                                :transition="{ duration: 0.35 }"
                                :class="[
                                    'p-6 rounded-xl border transition-all duration-500',
                                    activeProjectIndex === index
                                        ? 'glass-morphism border-accent-500/40 scale-105'
                                        : 'bg-dark-400/30 border-white/5 hover:border-white/10',
                                ]"
                            >
                                <div
                                    class="flex items-start justify-between mb-3"
                                >
                                    <div class="flex-1">
                                        <h3
                                            :class="[
                                                'text-xl font-bold mb-1 font-display transition-colors duration-300',
                                                activeProjectIndex === index
                                                    ? 'text-white'
                                                    : 'text-gray-400 group-hover:text-white',
                                            ]"
                                        >
                                            {{ project.title }}
                                        </h3>
                                        <p
                                            :class="[
                                                'text-sm transition-colors duration-300',
                                                activeProjectIndex === index
                                                    ? 'text-accent-400'
                                                    : 'text-gray-500',
                                            ]"
                                        >
                                            {{ project.tagline }}
                                        </p>
                                    </div>
                                    <Icon
                                        icon="solar:arrow-right-bold"
                                        :class="[
                                            'text-2xl transition-all duration-300',
                                            activeProjectIndex === index
                                                ? 'text-accent-400 translate-x-1'
                                                : 'text-gray-600 group-hover:text-gray-400',
                                        ]"
                                    />
                                </div>

                                <!-- Progress Bar -->
                                <div
                                    class="w-full h-1 bg-dark-300 rounded-full overflow-hidden"
                                >
                                    <div
                                        class="h-full transition-all duration-500"
                                        :class="
                                            activeProjectIndex === index
                                                ? 'bg-accent-400'
                                                : 'bg-transparent'
                                        "
                                        :style="{
                                            width:
                                                activeProjectIndex === index
                                                    ? '100%'
                                                    : '0%',
                                        }"
                                    ></div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    <!-- Right: Active Project Details -->
                    <div class="relative min-h-[600px]">
                        <transition name="fade-slide" mode="out-in">
                            <motion.div
                                :key="activeProjectIndex"
                                :initial="{ opacity: 0, y: 16, scale: 0.98 }"
                                :animate="{ opacity: 1, y: 0, scale: 1 }"
                                :transition="{ duration: 0.35, ease: 'easeOut' }"
                                class="glass-morphism p-8 lg:p-10 rounded-2xl border border-white/10 space-y-6"
                            >
                                <!-- Slider Controls (Top Right) -->
                                <div class="flex justify-between items-center mb-2">
                                    <div class="text-xs uppercase tracking-wide text-gray-500">
                                        Project {{ activeProjectIndex + 1 }} /
                                        {{ projects.length }}
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <button
                                            type="button"
                                            class="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-400 transition-colors"
                                            @click="prevProject"
                                            aria-label="Previous project"
                                        >
                                            <Icon icon="solar:alt-arrow-left-bold" class="text-sm" />
                                        </button>
                                        <button
                                            type="button"
                                            class="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-400 transition-colors"
                                            @click="nextProject"
                                            aria-label="Next project"
                                        >
                                            <Icon icon="solar:alt-arrow-right-bold" class="text-sm" />
                                        </button>
                                    </div>
                                </div>

                                <!-- Status & Duration -->
                                <div
                                    class="flex items-center justify-between flex-wrap gap-3"
                                >
                                    <span
                                        :class="[
                                            'px-3 py-1.5 rounded-full text-xs font-bold border inline-flex items-center gap-2',
                                            getStatusBadge(
                                                activeProject().status,
                                            ).color,
                                        ]"
                                    >
                                        <span
                                            class="w-2 h-2 rounded-full bg-current animate-pulse"
                                        ></span>
                                        {{
                                            getStatusBadge(
                                                activeProject().status,
                                            ).label
                                        }}
                                    </span>
                                    <span class="text-sm text-gray-400">{{
                                        activeProject().duration
                                    }}</span>
                                </div>

                                <!-- Title & Role -->
                                <div>
                                    <h3
                                        class="text-3xl font-bold text-white mb-2 font-display"
                                    >
                                        {{ activeProject().title }}
                                    </h3>
                                    <p
                                        :class="[
                                            'text-lg font-semibold mb-3',
                                            getColorClasses(
                                                activeProject().color,
                                            ).text,
                                        ]"
                                    >
                                        {{ activeProject().tagline }}
                                    </p>
                                    <p class="text-sm text-gray-400">
                                        <span class="font-semibold">Role:</span>
                                        {{ activeProject().role }}
                                    </p>
                                </div>

                                <!-- Description -->
                                <p class="text-gray-300 leading-relaxed">
                                    {{ activeProject().description }}
                                </p>

                                <!-- Metrics -->
                                <div class="grid grid-cols-3 gap-4">
                                    <div
                                        v-for="metric in activeProject()
                                            .metrics"
                                        :key="metric.label"
                                        :class="[
                                            'p-4 rounded-xl border text-center transition-all duration-300 hover:scale-105',
                                            getColorClasses(
                                                activeProject().color,
                                            ).bg,
                                            getColorClasses(
                                                activeProject().color,
                                            ).border,
                                        ]"
                                    >
                                        <Icon
                                            :icon="metric.icon"
                                            :class="[
                                                'text-2xl mx-auto mb-2',
                                                getColorClasses(
                                                    activeProject().color,
                                                ).text,
                                            ]"
                                        />
                                        <div
                                            :class="[
                                                'text-xl font-bold mb-1 font-display',
                                                getColorClasses(
                                                    activeProject().color,
                                                ).text,
                                            ]"
                                        >
                                            {{ metric.value }}
                                        </div>
                                        <div class="text-xs text-gray-400">
                                            {{ metric.label }}
                                        </div>
                                    </div>
                                </div>

                                <!-- Key Highlights -->
                                <div>
                                    <h4
                                        class="text-sm font-bold text-white mb-3 flex items-center gap-2"
                                    >
                                        <Icon
                                            icon="solar:star-bold"
                                            class="text-orange-400"
                                        />
                                        Key Highlights
                                    </h4>
                                    <ul class="space-y-2">
                                        <li
                                            v-for="(
                                                highlight, idx
                                            ) in activeProject().highlights.slice(
                                                0,
                                                3,
                                            )"
                                            :key="idx"
                                            class="text-sm text-gray-300 flex items-start gap-2"
                                        >
                                            <Icon
                                                icon="solar:check-circle-bold"
                                                :class="[
                                                    'mt-0.5 flex-shrink-0',
                                                    getColorClasses(
                                                        activeProject().color,
                                                    ).text,
                                                ]"
                                            />
                                            <span>{{ highlight }}</span>
                                        </li>
                                    </ul>
                                </div>

                                <!-- Technologies -->
                                <div>
                                    <h4
                                        class="text-sm font-bold text-white mb-3"
                                    >
                                        Technologies Used
                                    </h4>
                                    <div class="flex flex-wrap gap-2">
                                        <span
                                            v-for="tech in activeProject()
                                                .technologies"
                                            :key="tech"
                                            :class="[
                                                'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-300 hover:scale-105',
                                                getColorClasses(
                                                    activeProject().color,
                                                ).bg,
                                                getColorClasses(
                                                    activeProject().color,
                                                ).border,
                                                getColorClasses(
                                                    activeProject().color,
                                                ).text,
                                            ]"
                                        >
                                            {{ tech }}
                                        </span>
                                    </div>
                                </div>

                                <!-- Action Buttons -->
                                <div class="flex flex-wrap gap-4 pt-4">
                                    <a
                                        v-if="activeProject().githubUrl"
                                        :href="activeProject().githubUrl"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r transition-all duration-300 hover:scale-105 hover:shadow-glow-accent flex items-center gap-2"
                                        :style="`background: linear-gradient(135deg, var(--color-${activeProject().color}-500), var(--color-primary-600))`"
                                    >
                                        <Icon
                                            icon="mdi:github"
                                            class="text-lg"
                                        />
                                        <span>View on GitHub</span>
                                    </a>
                                    <a
                                        v-if="activeProject().liveUrl"
                                        :href="activeProject().liveUrl"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="px-6 py-3 rounded-xl font-semibold text-white border-2 border-white/20 hover:border-accent-400 transition-all duration-300 hover:bg-white/5 flex items-center gap-2"
                                    >
                                        <Icon
                                            icon="solar:link-bold"
                                            class="text-lg"
                                        />
                                        <span>Live Demo</span>
                                    </a>
                                </div>

                                <!-- Dot Indicators -->
                                <div class="flex items-center justify-center gap-2 pt-4">
                                    <button
                                        v-for="(project, index) in projects"
                                        :key="project.id + '-dot'"
                                        type="button"
                                        class="p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400/70"
                                        @click="goToProject(index)"
                                        :aria-label="`Go to ${project.title}`"
                                    >
                                        <span
                                            class="block rounded-full transition-all duration-300"
                                            :class="
                                                activeProjectIndex === index
                                                    ? 'w-4 h-4 bg-accent-400 shadow-glow-accent'
                                                    : 'w-2.5 h-2.5 bg-gray-600 hover:bg-gray-400'
                                            "
                                        ></span>
                                    </button>
                                </div>
                            </motion.div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.4s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}
</style>
