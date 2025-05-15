"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

// Types
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
      className="fixed inset-0 z-50 flex items-center justify-center"
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
          relative z-50 w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-xl 
          dark:border-gray-700 dark:bg-gray-800 dark:text-white
          ${className}
        `}
        style={{ animation: "dialogIn 0.3s ease-out forwards" }}
      >
        {/* Header */}
        {(title || description) && (
          <div className="">
            {title && (
              <h2 id="dialog-title" className="text-2xl font-semibold">
                {title}
              </h2>
            )}
            {description && (
              <p
                id="dialog-description"
                className="mt-1 text-sm text-gray-500 dark:text-gray-400"
              >
                {description}
              </p>
            )}
          </div>
        )}

        {/* Body */}
        <div className="dialog-body">{children}</div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
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
            ></path>
          </svg>
        </button>
      </div>
    </div>,
    document.body
  );
};

export const AstroDialogTrigger: React.FC<{
  dialogId: string;
  children: React.ReactNode;
  className?: string;
}> = ({ dialogId, children, className = "" }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const handleClick = () => {
    if (window.openDialog) {
      window.openDialog(dialogId);
    }
  };
  useEffect(() => {
    const span = spanRef.current;
    if (!span) return;

    const tl = gsap.timeline({ paused: true });

    tl.to(span, { duration: 0.2, yPercent: -150, ease: "power2.in" });
    tl.set(span, { yPercent: 150 });
    tl.to(span, { duration: 0.2, yPercent: 0 });

    const button = buttonRef.current;
    if (!button) return;

    const onEnter = () => tl.play(0);
    button.addEventListener("mouseenter", onEnter);

    return () => {
      button.removeEventListener("mouseenter", onEnter);
    };
  }, []);
  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`overflow-hidden relative flex items-center gap-2 px-4 py-2 rounded-lg font-semibold cursor-pointer transition ${className}`}
    >
      {/* Contenido animado completo */}
      <span
        ref={spanRef}
        className="flex items-center gap-2 pointer-events-none"
      >
        {children}
      </span>
    </button>
  );
};
