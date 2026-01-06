import { ref, onMounted, onUnmounted, nextTick, type Ref } from 'vue';

interface ScrollAnimationOptions {
    parallaxSpeed?: number; // 0-1, where 0.5 is half speed
    fadeDistance?: number; // Distance in pixels to fade elements
    scaleRange?: [number, number]; // [min, max] scale values
    rotateRange?: [number, number]; // [min, max] rotation in degrees
    blurRange?: [number, number]; // [min, max] blur in pixels
    enableParallax?: boolean;
    enableFade?: boolean;
    enableScale?: boolean;
    enableRotate?: boolean;
    enableBlur?: boolean;
}

export function useModernScrollAnimation(
    elementRef: Ref<HTMLElement | null>,
    options: ScrollAnimationOptions = {}
) {
    const {
        parallaxSpeed = 0.5,
        fadeDistance = 300,
        scaleRange = [0.8, 1],
        rotateRange = [-5, 5],
        blurRange = [0, 10],
        enableParallax = true,
        enableFade = true,
        enableScale = false,
        enableRotate = false,
        enableBlur = false,
    } = options;

    const scrollY = ref(0);
    const elementTop = ref(0);
    const elementHeight = ref(0);
    const windowHeight = ref(0);
    const isVisible = ref(false);
    const progress = ref(0); // 0-1 based on element visibility

    let rafId: number | null = null;

    const updateAnimation = () => {
        if (!elementRef.value) return;

        const rect = elementRef.value.getBoundingClientRect();
        const currentScrollY = window.scrollY;
        const currentWindowHeight = window.innerHeight;

        scrollY.value = currentScrollY;
        windowHeight.value = currentWindowHeight;
        elementTop.value = rect.top + currentScrollY;
        elementHeight.value = rect.height;

        // Calculate visibility progress based on element bounds
        const elementBottom = elementTop.value + elementHeight.value;
        const viewportTop = currentScrollY;
        const viewportBottom = currentScrollY + currentWindowHeight;
        
        // Element is visible when any part is in viewport
        const isInViewport = elementBottom > viewportTop && elementTop.value < viewportBottom;
        
        if (isInViewport) {
            // Calculate how much of the element is visible (0 to 1)
            const visibleTop = Math.max(elementTop.value, viewportTop);
            const visibleBottom = Math.min(elementBottom, viewportBottom);
            const visibleHeight = visibleBottom - visibleTop;
            const visibilityRatio = visibleHeight / Math.min(elementHeight.value, currentWindowHeight);
            
            progress.value = Math.max(0, Math.min(1, visibilityRatio));
            isVisible.value = true;
        } else {
            progress.value = 0;
            isVisible.value = false;
        }

        // Apply animations
        const transforms: string[] = [];
        const filters: string[] = [];
        let opacity = 1;

        // Parallax effect based on scroll position relative to element
        if (enableParallax) {
            const scrollProgress = (currentScrollY - elementTop.value) / (currentWindowHeight + elementHeight.value);
            const parallaxOffset = scrollProgress * parallaxSpeed * 100;
            transforms.push(`translateY(${parallaxOffset}px)`);
        }

        // Fade effect based on visibility ratio
        if (enableFade) {
            opacity = progress.value;
        }

        // Scale effect
        if (enableScale) {
            const scale = scaleRange[0] + (scaleRange[1] - scaleRange[0]) * progress.value;
            transforms.push(`scale(${scale})`);
        }

        // Rotate effect
        if (enableRotate) {
            const rotate = rotateRange[0] + (rotateRange[1] - rotateRange[0]) * progress.value;
            transforms.push(`rotate(${rotate}deg)`);
        }

        // Blur effect
        if (enableBlur) {
            const blur = blurRange[1] - (blurRange[1] - blurRange[0]) * progress.value;
            filters.push(`blur(${blur}px)`);
        }

        // Apply styles
        elementRef.value.style.transform = transforms.join(' ');
        elementRef.value.style.filter = filters.join(' ');
        elementRef.value.style.opacity = opacity.toString();
        elementRef.value.style.willChange = 'transform, opacity, filter';

        rafId = null;
    };

    const handleScroll = () => {
        if (rafId) return;
        rafId = requestAnimationFrame(updateAnimation);
    };

    const handleResize = () => {
        updateAnimation();
    };

    onMounted(() => {
        nextTick(() => {
            window.addEventListener('scroll', handleScroll, { passive: true });
            window.addEventListener('resize', handleResize, { passive: true });
            updateAnimation();
        });
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
        // Reset styles
        if (elementRef.value) {
            elementRef.value.style.transform = '';
            elementRef.value.style.filter = '';
            elementRef.value.style.opacity = '';
            elementRef.value.style.willChange = '';
        }
    });

    return {
        scrollY,
        progress,
        isVisible,
        elementTop,
        elementHeight,
        windowHeight,
    };
}