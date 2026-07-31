"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

export interface HeroDesktopVideo {
  src: string;
  label: string;
  /** Skip intro seconds when the clip starts (desktop hero). */
  startAt?: number;
}

interface HeroDesktopVideoCarouselProps {
  videos: HeroDesktopVideo[];
}

export function HeroDesktopVideoCarousel({ videos }: HeroDesktopVideoCarouselProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const count = videos.length;

  const goToNext = useCallback(() => {
    setIndex((current) => (current + 1) % count);
  }, [count]);

  const playVideo = useCallback((video: HTMLVideoElement, startAt = 0) => {
    const seekToStart = () => {
      if (startAt > 0 && Number.isFinite(video.duration) && startAt < video.duration) {
        video.currentTime = startAt;
      }
    };

    if (video.readyState >= 1) {
      seekToStart();
    } else {
      video.addEventListener("loadedmetadata", seekToStart, { once: true });
    }

    void video.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (count === 0) return;

    videoRefs.current.forEach((video, videoIndex) => {
      if (!video) return;
      if (videoIndex === index) {
        playVideo(video, videos[videoIndex]?.startAt ?? 0);
      } else {
        video.pause();
      }
    });
  }, [count, index, playVideo, videos]);

  useEffect(() => {
    if (count <= 1) return;

    if (reduced) {
      const timer = window.setInterval(goToNext, 8000);
      return () => window.clearInterval(timer);
    }

    const video = videoRefs.current[index];
    if (!video) return;

    const onEnded = () => goToNext();
    video.addEventListener("ended", onEnded);
    return () => video.removeEventListener("ended", onEnded);
  }, [count, goToNext, index, reduced]);

  if (count === 0) return null;

  return (
    <div
      className="relative hidden h-full w-full md:block"
      aria-roledescription="carousel"
      aria-label="Hero videos"
    >
      {videos.map((video, videoIndex) => (
        <video
          key={video.src}
          ref={(element) => {
            videoRefs.current[videoIndex] = element;
          }}
          src={video.src}
          muted
          playsInline
          autoPlay={videoIndex === 0}
          preload={videoIndex === 0 ? "auto" : "metadata"}
          aria-label={video.label}
          aria-hidden={videoIndex !== index}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-in-out",
            videoIndex === index ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        />
      ))}

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-10 z-10 flex justify-center gap-2">
          {videos.map((video, dotIndex) => (
            <button
              key={video.src}
              type="button"
              onClick={() => setIndex(dotIndex)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                dotIndex === index ? "w-8 bg-white" : "w-4 bg-white/40",
              )}
              aria-label={`Show ${video.label}`}
              aria-current={dotIndex === index ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
