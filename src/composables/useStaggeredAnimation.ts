import { ref, onMounted, onUnmounted, nextTick, type Ref } from 'vue';

interface StaggeredAnimationOptions {
    staggerDelay?: number; // Delay between each element in ms
    animationDuration?: number; // Duration of each animation in ms
    threshold?: number; // Intersection observer threshold (0-1)
    rootMargin?: string; // Intersection observer root margin
    animationType?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'rotate';
    easing?: string; // CSS easing function
}

export function useStaggeredAnimation(
    elementsRef: Ref<HTMLElement[]>,
    options: StaggeredAnimationOptions = {}
) {
    const {
        staggerDelay = 100,
        animationDuration = 600,
        threshold = 0.1,
        rootMargin = '0px 0px -50px 0px',
        animationType = 'fadeUp',
        easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    } = options;

    const animatedElements = ref<Set<HTMLElement>>(new Set());
    const isVisible = ref(false);
    let observer: IntersectionObserver | null = null;

    const getInitialStyles = (type: string) => {
        switch (type) {
            case 'fadeUp':
                return {
                    opacity: '0',
                    transform: 'translateY(30px)',
                };
            case 'fadeLeft':
                return {
                    opacity: '0',
                    transform: 'translateX(-30px)',
                };
            case 'fadeRight':
                return {
                    opacity: '0',
                    transform: 'translateX(30px)',
                };
            case 'scale':
                return {
                    opacity: '0',
                    transform: 'scale(0.8)',
                };
            case 'rotate':
                return {
                    opacity: '0',
                    transform: 'rotate(-10deg) scale(0.9)',
                };
            default:
                return {
                    opacity: '0',
                    transform: 'translateY(30px)',
                };
        }
    };

    const getFinalStyles = () => ({
        opacity: '1',
        transform: 'translateY(0) translateX(0) scale(1) rotate(0)',
    });

    const applyInitialStyles = (element: HTMLElement) => {
        const styles = getInitialStyles(animationType);
        Object.assign(element.style, {
            ...styles,
            transition: 'none',
            willChange: 'transform, opacity',
        });
    };

    const animateElement = (element: HTMLElement, delay: number) => {
        const finalStyles = getFinalStyles();
        
        setTimeout(() => {
            Object.assign(element.style, {
                ...finalStyles,
                transition: `all ${animationDuration}ms ${easing}`,
            });
            
            animatedElements.value.add(element);
            
            // Clean up transition after animation
            setTimeout(() => {
                element.style.transition = '';
                element.style.willChange = '';
            }, animationDuration);
        }, delay);
    };

    const startStaggeredAnimation = () => {
        if (!elementsRef.value.length) return;
        
        isVisible.value = true;
        
        elementsRef.value.forEach((element, index) => {
            if (!animatedElements.value.has(element)) {
                animateElement(element, index * staggerDelay);
            }
        });
    };

    const resetAnimation = () => {
        isVisible.value = false;
        animatedElements.value.clear();
        
        elementsRef.value.forEach(element => {
            applyInitialStyles(element);
        });
    };

    const setupIntersectionObserver = () => {
        if (!elementsRef.value.length) return;

        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !isVisible.value) {
                        startStaggeredAnimation();
                    }
                });
            },
            {
                threshold,
                rootMargin,
            }
        );

        // Observe the first element as trigger
        if (elementsRef.value[0]) {
            observer.observe(elementsRef.value[0]);
        }
    };

    onMounted(() => {
        nextTick(() => {
            // Apply initial styles
            elementsRef.value.forEach(applyInitialStyles);
            
            // Setup intersection observer
            setupIntersectionObserver();
        });
    });

    onUnmounted(() => {
        if (observer) {
            observer.disconnect();
        }
        
        // Reset styles
        elementsRef.value.forEach(element => {
            element.style.opacity = '';
            element.style.transform = '';
            element.style.transition = '';
            element.style.willChange = '';
        });
    });

    return {
        isVisible,
        animatedElements,
        startStaggeredAnimation,
        resetAnimation,
    };
}