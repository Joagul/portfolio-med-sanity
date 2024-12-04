import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "lyq6mkny",
  dataset: "production",
  apiVersion: "2024-11-01",
  useCdn: false,
});