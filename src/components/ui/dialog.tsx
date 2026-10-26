<<<<<<< HEAD
"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"
=======
"use client";

import * as React from "react";
import { XIcon } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
>>>>>>> origin/main

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
<<<<<<< HEAD
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
=======
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
>>>>>>> origin/main
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
<<<<<<< HEAD
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
=======
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
>>>>>>> origin/main
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
<<<<<<< HEAD
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
=======
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
>>>>>>> origin/main
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
<<<<<<< HEAD
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
=======
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
>>>>>>> origin/main
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
<<<<<<< HEAD
        "fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
=======
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
>>>>>>> origin/main
        className
      )}
      {...props}
    />
<<<<<<< HEAD
  )
=======
  );
>>>>>>> origin/main
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
<<<<<<< HEAD
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
=======
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
>>>>>>> origin/main
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
<<<<<<< HEAD
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
=======
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none sm:max-w-lg",
>>>>>>> origin/main
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
<<<<<<< HEAD
          <DialogPrimitive.Close data-slot="dialog-close" asChild>
            <Button
              variant="ghost"
              className="absolute top-2 right-2"
              size="icon-sm"
            >
              <XIcon
              />
              <span className="sr-only">Close</span>
            </Button>
=======
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
>>>>>>> origin/main
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
<<<<<<< HEAD
  )
=======
  );
>>>>>>> origin/main
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
<<<<<<< HEAD
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
=======
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
>>>>>>> origin/main
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
<<<<<<< HEAD
  showCloseButton?: boolean
=======
  showCloseButton?: boolean;
>>>>>>> origin/main
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
<<<<<<< HEAD
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end",
=======
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
>>>>>>> origin/main
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
<<<<<<< HEAD
  )
=======
  );
>>>>>>> origin/main
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
<<<<<<< HEAD
      className={cn(
        "font-heading text-base leading-none font-medium",
        className
      )}
      {...props}
    />
  )
=======
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
>>>>>>> origin/main
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
<<<<<<< HEAD
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
=======
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
>>>>>>> origin/main
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
<<<<<<< HEAD
}
=======
};
>>>>>>> origin/main
