import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import lessonCover from "@/assets/aprenda-comigo-thumb.jpg";

export function LessonPreview() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-panel">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src="https://www.youtube-nocookie.com/embed/-sdVG1OtDks?autoplay=1&rel=0"
          title="Aula gratuita com a professora Elisa"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          <img src={lessonCover} alt="Professora Elisa na aula de informática" fetchPriority="high" className="h-full w-full object-cover" />
          <Button
            onClick={() => setPlaying(true)}
            aria-label="Assistir à aula gratuita com a professora Elisa"
            className="absolute inset-0 h-full w-full rounded-none bg-background/10 text-foreground hover:bg-background/20"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg md:h-16 md:w-16">
              <Play className="ml-1 !h-7 !w-7 fill-current" />
            </span>
          </Button>
        </>
      )}
    </div>
  );
}