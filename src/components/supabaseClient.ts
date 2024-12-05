import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ladyudwrgjzmxteoivfp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhZHl1ZHdyZ2p6bXh0ZW9pdmZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzOTAxOTgsImV4cCI6MjA0ODk2NjE5OH0.TkgbBmJy_yv2xOBYfadzoiKMmL-KfPRpSloTCKUSmjQ"
);
