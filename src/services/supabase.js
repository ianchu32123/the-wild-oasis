import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://gzvhvtsdzccusrioutgu.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6dmh2dHNkemNjdXNyaW91dGd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1NDYxOTYsImV4cCI6MjAyODEyMjE5Nn0.BgAUdTYWzTw0VmpOkZAoaxBnPgqR-GnpTgGXzmdrn9I"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase