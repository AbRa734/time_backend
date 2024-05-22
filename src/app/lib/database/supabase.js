import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gazzlculvolwfsgnfcgo.supabase.co'
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhenpsY3Vsdm9sd2ZzZ25mY2dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE4MzYxNTYsImV4cCI6MjAwNzQxMjE1Nn0.tgwKTp-NJwYpBiuP-I1dXef8dxqs7F8pSVn_sMuN9N4`
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;