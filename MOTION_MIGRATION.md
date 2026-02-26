# Motion Migration Guide

## Changes needed for each section:

### 1. Remove old imports:
- Remove `useModernScrollAnimation`
- Remove `useStaggeredAnimation`

### 2. Add Motion import:
```typescript
import { motion } from "motion-v";
```

### 3. Wrap section with motion.section:
```vue
<motion.section
  :initial="{ opacity: 0, y: 50 }"
  :whileInView="{ opacity: 1, y: 0 }"
  :transition="{ duration: 0.6 }"
  :viewport="{ once: true, amount: 0.2 }"
>
```

### 4. For staggered items, use motion.div with delay:
```vue
<motion.div
  v-for="(item, index) in items"
  :key="item.id"
  :initial="{ opacity: 0, y: 20 }"
  :whileInView="{ opacity: 1, y: 0 }"
  :transition="{ duration: 0.5, delay: index * 0.1 }"
  :viewport="{ once: true }"
>
```

## Sections to update:
- AboutSection.vue
- SkillsSection.vue  
- CertificationsSection.vue
- BlogSection.vue
- ExperienceSection.vue (partially done)
