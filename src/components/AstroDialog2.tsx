"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

// Types

export interface AstroDialogTriggerProps {
  dialogId: string;
  className?: string;
  children: React.ReactNode;
}

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  id?: string; // Added id prop
}

// Add type declaration for window
declare global {
  interface Window {
    openDialog?: (id: string) => void;
    closeDialog?: (id: string) => void;
  }
}

export const AstroDialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  className = "",
  id = "dialog", // Default id
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(isOpen);

  // Handle mounting for SSR
  useEffect(() => {
    setIsMounted(true);

    // Set up global handlers for Astro
    if (!window.openDialog) {
      window.openDialog = (dialogId: string) => {
        if (dialogId === id) {
          setIsDialogOpen(true);
        }
      };
    }

    if (!window.closeDialog) {
      window.closeDialog = (dialogId: string) => {
        if (dialogId === id) {
          setIsDialogOpen(false);
        }
      };
    }

    // Clean up
    return () => {
      // Only clean up if these are our handlers
      if (window.openDialog && window.closeDialog) {
        window.openDialog = undefined;
        window.closeDialog = undefined;
      }
    };
  }, [id]);

  // Sync with isOpen prop
  useEffect(() => {
    setIsDialogOpen(isOpen);
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isDialogOpen) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDialogOpen]);

  // Handle focus trap
  useEffect(() => {
    if (isDialogOpen && dialogRef.current) {
      const focusableElements = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length > 0) {
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        const handleTabKey = (e: KeyboardEvent) => {
          if (e.key === "Tab") {
            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        };

        firstElement.focus();
        dialogRef.current.addEventListener("keydown", handleTabKey);

        return () => {
          if (dialogRef.current) {
            dialogRef.current.removeEventListener("keydown", handleTabKey);
          }
        };
      }
    }
  }, [isDialogOpen]);

  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (isDialogOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isDialogOpen]);

  const handleClose = () => {
    setIsDialogOpen(false);
    if (onClose) onClose();
  };

  if (!isDialogOpen || !isMounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center "
      id={id}
    >
      {/* Overlay with blur */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-md"
        onClick={handleClose}
        aria-hidden="true"
        style={{ animation: "fadeIn 0.2s ease-out forwards" }}
      />

      {/* Dialog content */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "dialog-title" : undefined}
        aria-describedby={description ? "dialog-description" : undefined}
        className={`
    relative z-50 w-full max-w-md sm:max-w-lg 
    rounded-lg border border-gray-200 bg-white p-6 shadow-xl
    
    ${className}
  `}
        style={{ animation: "dialogIn 0.3s ease-out forwards" }}
      >
        {/* Header */}
        {(title || description) && (
          <div className="mb-4">
            {title && (
              <h2 id="dialog-title" className="text-2xl font-semibold">
                {title}
              </h2>
            )}
            {description && (
              <p
                id="dialog-description"
                className="mt-1 text-sm text-gray-500 "
              >
                {description}
              </p>
            )}
          </div>
        )}

        {/* Body — scrollable */}
        <div className="dialog-body max-h-[70vh] overflow-y-auto space-y-4 pr-1">
          {children}
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 "
          aria-label="Close"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>,
    document.body
  );
};

export const AstroDialogTrigger: React.FC<AstroDialogTriggerProps> = ({
  dialogId,
  className = "",
  children,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (window.openDialog) {
      window.openDialog(dialogId);
    }
  };

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const span = button.querySelector(".animated-text");
    const icon = button.querySelector("svg");

    if (!span || !icon) return;

    const text = span.textContent?.trim() ?? "";
    span.innerHTML = "";

    // Evitar espacios duplicados
    const chars = text.split("").map((char, i) => {
      const spanChar = document.createElement("span");
      spanChar.textContent = char;
      spanChar.style.display = "inline-block";
      spanChar.style.willChange = "transform";
      spanChar.style.marginRight = char === " " ? "0.25em" : "0"; // Espaciado controlado
      span.appendChild(spanChar);
      return spanChar;
    });

    const tlText = gsap.timeline({ paused: true });
    tlText.to(chars, {
      yPercent: -150,
      stagger: 0.03,
      duration: 0.3,
      ease: "power2.out",
    });
    tlText.set(chars, { yPercent: 150 });
    tlText.to(
      chars,
      {
        yPercent: 0,
        stagger: 0.03,
        duration: 0.25,
        ease: "power2.out",
      },
      "<0.1" // solapamiento real, arranca 0.1s después de la anterior
    );

    const tlIcon = gsap.timeline({ paused: true });
    tlIcon.to(icon, {
      x: 10,
      duration: 0.25,
      ease: "power2.out",
    });

    const onEnter = () => {
      tlText.play(0);
      tlIcon.play(0);
    };

    const onLeave = () => {
      tlText.reverse();
      tlIcon.reverse();
    };

    button.addEventListener("mouseenter", onEnter);
    button.addEventListener("mouseleave", onLeave);

    return () => {
      button.removeEventListener("mouseenter", onEnter);
      button.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className={`group flex items-center gap-1 px-4 py-2 rounded-lg font-semibold transition overflow-hidden cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <span className="animated-text inline-block">{children}</span>
      <ArrowRight className="transition-transform" size={24} />
    </button>
  );
};
