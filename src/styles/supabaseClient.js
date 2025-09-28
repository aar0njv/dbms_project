import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://bakaobhzoakinmwkfniq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJha2FvYmh6b2FraW5td2tmbmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNTc1MDUsImV4cCI6MjA3NDYzMzUwNX0.RFtRbA8HZyX6u8wteZf4u9a8-zIg_LxnAZphQ3VN-7w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);