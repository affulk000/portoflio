import { ref, onMounted, onUnmounted, nextTick, type Ref } from 'vue';

interface UsePinnedScrollOptions {
    pinDuration?: number; // Duration in viewport heights to pin the section
    overscrollResistance?: number; // Resistance factor for overscroll (0-1, lower = more resistance)
    zIndex?: number; // Custom z-index for pinned section (default: 10)
}

export function usePinnedScroll(
    elementRef: Ref<HTMLElement | null>,
    options: UsePinnedScrollOptions = {}
) {
    const {
        pinDuration = 1.5, // Default: pin for 1.5 viewport heights
        overscrollResistance = 0.2, // Default: 20% resistance (more elastic)
        zIndex = 10, // Default z-index
    } = options;

    const isPinned = ref(false);
    const scrollProgress = ref(0);
    const overscrollAmount = ref(0);

    let originalTop = 0;
    let pinStart = 0;
    let pinEnd = 0;
    let isPinning = false;
    let rafId: number | null = null;
    let spacerElement: HTMLElement | null = null;
    let initialized = false;

    const unpinElement = () => {
        if (!elementRef.value) return;
        
        isPinning = false;
        isPinned.value = false;
        elementRef.value.style.transition = 'all 0.3s ease-out';
        elementRef.value.style.position = '';
        elementRef.value.style.top = '';
        elementRef.value.style.left = '';
        elementRef.value.style.right = '';
        elementRef.value.style.width = '';
        elementRef.value.style.zIndex = '';
        elementRef.value.style.willChange = '';
        elementRef.value.style.transform = '';
        
        setTimeout(() => {
            if (elementRef.value) {
                elementRef.value.style.transition = '';
            }
        }, 300);
        
        if (spacerElement && spacerElement.parentElement) {
            spacerElement.remove();
            spacerElement = null;
        }
        initialized = false;
    };

    const updateScroll = () => {
        if (!elementRef.value) return;

        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        // Get the original position from the element's offsetTop
        // This is more reliable than getBoundingClientRect when pinned
        if (!initialized) {
            // Use a data attribute to store original position if available
            const storedTop = elementRef.value.dataset.originalTop;
            if (storedTop) {
                originalTop = parseFloat(storedTop);
            } else {
                // Reset position temporarily to get accurate measurement
                const wasFixed = elementRef.value.style.position === 'fixed';
                const oldPosition = elementRef.value.style.position;
                const oldTop = elementRef.value.style.top;
                
                if (wasFixed) {
                    elementRef.value.style.position = '';
                    elementRef.value.style.top = '';
                    // Force reflow
                    elementRef.value.offsetHeight;
                }
                
                originalTop = elementRef.value.offsetTop;
                // Store for future reference
                elementRef.value.dataset.originalTop = originalTop.toString();
                
                // Restore if it was fixed
                if (wasFixed) {
                    elementRef.value.style.position = oldPosition;
                    elementRef.value.style.top = oldTop;
                }
            }
            
            pinStart = originalTop;
            pinEnd = pinStart + windowHeight * pinDuration;
            initialized = true;
        }

        const currentScroll = scrollTop;

        // Ensure pinStart and pinEnd are valid
        if (pinStart <= 0 || pinEnd <= pinStart) {
            initialized = false;
            return;
        }

        // Check if we're in the pinning zone
        if (currentScroll >= pinStart && currentScroll < pinEnd) {
            if (!isPinning) {
                isPinning = true;
                isPinned.value = true;
                
                // Pin the element
                elementRef.value.style.transition = 'transform 0.1s ease-out';
                elementRef.value.style.position = 'fixed';
                elementRef.value.style.top = '0';
                elementRef.value.style.left = '0';
                elementRef.value.style.right = '0';
                elementRef.value.style.width = '100%';
                elementRef.value.style.zIndex = zIndex.toString();
                elementRef.value.style.willChange = 'transform';

                // Create spacer to maintain scroll height
                if (!spacerElement) {
                    // Check if spacer already exists (safety check)
                    const existingSpacer = elementRef.value.nextElementSibling as HTMLElement;
                    if (existingSpacer && existingSpacer.classList.contains('pin-spacer')) {
                        spacerElement = existingSpacer;
                    } else {
                        spacerElement = document.createElement('div');
                        spacerElement.className = 'pin-spacer';
                        spacerElement.setAttribute('data-pin-spacer', 'true');
                        spacerElement.style.height = `${windowHeight * pinDuration}px`;
                        spacerElement.style.pointerEvents = 'none';
                        spacerElement.style.width = '100%';
                        spacerElement.style.display = 'block';
                        // Insert after the element to preserve layout height without pushing it down
                        const parent = elementRef.value.parentElement;
                        if (parent) {
                            parent.insertBefore(spacerElement, elementRef.value.nextSibling);
                        }
                    }
                }
            }

            // Calculate progress through pinning zone (0 to 1)
            const progress = (currentScroll - pinStart) / (pinEnd - pinStart);
            scrollProgress.value = Math.max(0, Math.min(1, progress));

            // Apply smooth transform based on progress
            const translateY = (1 - progress) * 50; // Slight parallax effect
            elementRef.value.style.transform = `translateY(${translateY}px)`;
            overscrollAmount.value = 0;
        } else {
            // Handle overscroll effect with elastic resistance
            if (currentScroll < pinStart) {
                // Overscrolling before section (elastic pull down)
                const overscroll = (pinStart - currentScroll) * overscrollResistance;
                overscrollAmount.value = overscroll;
                if (elementRef.value && !isPinning) {
                    elementRef.value.style.transform = `translateY(${overscroll}px)`;
                }
            } else if (currentScroll >= pinEnd) {
                // Overscrolling after section (elastic pull up)
                const overscroll = (currentScroll - pinEnd) * overscrollResistance;
                overscrollAmount.value = -overscroll;
                if (elementRef.value && isPinning) {
                    // Apply elastic overscroll while pinned
                    const elasticAmount = Math.min(overscroll * 0.5, 100); // Cap at 100px
                    elementRef.value.style.transform = `translateY(${-elasticAmount}px)`;
                } else if (elementRef.value) {
                    elementRef.value.style.transform = `translateY(${-overscroll}px)`;
                }
            } else {
                overscrollAmount.value = 0;
            }

            // Unpin when out of pinning zone
            if (isPinning && currentScroll >= pinEnd) {
                unpinElement();
            } else if (isPinning && currentScroll < pinStart) {
                unpinElement();
            }
        }

        rafId = null;
    };

    const handleScroll = () => {
        if (rafId) return;
        rafId = requestAnimationFrame(updateScroll);
    };

    const handleResize = () => {
        // Reset on resize to recalculate positions
        initialized = false;
        if (elementRef.value) {
            // Clear stored position
            delete elementRef.value.dataset.originalTop;
            // Only recalculate if not currently pinned
            if (!isPinning) {
                const wasFixed = elementRef.value.style.position === 'fixed';
                if (wasFixed) {
                    elementRef.value.style.position = '';
                    elementRef.value.style.top = '';
                    elementRef.value.offsetHeight; // Force reflow
                }
                originalTop = elementRef.value.offsetTop;
                elementRef.value.dataset.originalTop = originalTop.toString();
                if (wasFixed) {
                    elementRef.value.style.position = 'fixed';
                    elementRef.value.style.top = '0';
                }
                pinStart = originalTop;
                pinEnd = pinStart + window.innerHeight * pinDuration;
                initialized = true;
            }
        }
        updateScroll();
    };

    onMounted(() => {
        nextTick(() => {
            window.addEventListener('scroll', handleScroll, { passive: true });
            window.addEventListener('resize', handleResize, { passive: true });
            updateScroll();
        });
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
        // Cleanup - unpin if currently pinned
        if (isPinning && elementRef.value) {
            isPinning = false;
            isPinned.value = false;
            elementRef.value.style.position = '';
            elementRef.value.style.top = '';
            elementRef.value.style.left = '';
            elementRef.value.style.right = '';
            elementRef.value.style.width = '';
            elementRef.value.style.zIndex = '';
            elementRef.value.style.willChange = '';
            elementRef.value.style.transform = '';
            elementRef.value.style.transition = '';
        }
        // Remove all spacers (safety check)
        if (elementRef.value) {
            const parent = elementRef.value.parentElement;
            if (parent) {
                const spacers = parent.querySelectorAll('[data-pin-spacer="true"]');
                spacers.forEach(spacer => spacer.remove());
            }
            // Also check for any spacers before this element
            let prevSibling = elementRef.value.previousElementSibling;
            while (prevSibling) {
                if (prevSibling.classList.contains('pin-spacer')) {
                    prevSibling.remove();
                    break;
                }
                prevSibling = prevSibling.previousElementSibling;
            }
        }
        spacerElement = null;
    });

    return {
        isPinned,
        scrollProgress,
        overscrollAmount,
    };
}

