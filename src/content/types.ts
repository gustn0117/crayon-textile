import type { Bi } from "@/lib/bi";

/* Shapes shared by the guide-branch content modules. Every node carries both
   languages (see lib/bi.ts). */

export type Meta = { title: Bi; description: Bi };
export type Step = { n: string; title: Bi; body: Bi };
export type LinkItem = { label: Bi; href: string };
export type Section = { id: string; title: Bi; lead?: Bi; paragraphs?: Bi[]; bullets?: Bi[] };
