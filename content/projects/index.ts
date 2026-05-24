import type { ProjectContent } from "@/types/project";
import { content as creekviewNewCairo } from "./creekview-new-cairo";

const REGISTRY: Record<string, ProjectContent> = {
  [creekviewNewCairo.slug]: creekviewNewCairo,
};

/** Ordered list for shared components (e.g. lead forms on sister-project pages). */
export const ALL_PROJECTS: ProjectContent[] = [creekviewNewCairo];

export function getProjectBySlug(slug: string): ProjectContent | null {
  return REGISTRY[slug] ?? null;
}

export function getAllProjectSlugs(): string[] {
  return Object.keys(REGISTRY);
}
