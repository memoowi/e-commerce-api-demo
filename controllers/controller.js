import { supabase } from '../config/supabaseClient.js';

export const getData = async (req, res) => {
  try {
    const { data, error } = await supabase.from('your_table_name').select('*');
    if (error) throw error;
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addData = async (req, res) => {
  const { item } = req.body;
  if (!item) {
    return res.status(400).json({ error: 'Item is required' });
  }

  try {
    const { data, error } = await supabase.from('your_table_name').insert([{ item }]);
    if (error) throw error;
    res.status(201).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
