import { FieldId } from "@/types";

export const ROLE_CONFIG: Record<
  FieldId,
  {
    columns: { drafting: string; review: string; scheduled: string };
    nudges: string[];
  }
> = {
  freelancer: {
    columns: { drafting: "Pitching", review: "Negotiating", scheduled: "Delivered" },
    nudges: [],
  },
  founder: {
    columns: { drafting: "Ideas", review: "Building", scheduled: "Launched" },
    nudges: [],
  },
  student: {
    columns: { drafting: "To Study", review: "Studying", scheduled: "Submitted" },
    nudges: [],
  },
  hr: {
    columns: { drafting: "Requests", review: "Processing", scheduled: "Resolved" },
    nudges: [],
  },
  marketer: {
    columns: { drafting: "Drafting", review: "In Review", scheduled: "Scheduled" },
    nudges: [],
  },
  developer: {
    columns: { drafting: "Backlog", review: "In Progress", scheduled: "Shipped" },
    nudges: [],
  },
};
