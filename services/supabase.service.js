'use strict';

const { getSupabaseClient } = require('../config/supabase.config');

function isSupabaseReady() {
  return Boolean(getSupabaseClient());
}

async function saveContactSubmission({ name, email, message }) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new Error('Supabase is not initialized.');
  }

  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([{ name, email, message, created_at: new Date().toISOString() }]);

  if (error) {
    throw error;
  }

  return data;
}

module.exports = {
  isSupabaseReady,
  saveContactSubmission,
};
