'use strict';

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('[SUPABASE] SUPABASE_URL or SUPABASE_KEY is not configured. Database operations will be disabled.');
}

const supabaseClient = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

function getSupabaseClient() {
  return supabaseClient;
}

module.exports = { getSupabaseClient };
