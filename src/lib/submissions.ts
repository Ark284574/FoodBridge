
import { supabase } from './supabase';
import type { DemoFlow } from '@/data/content';

export async function submitDemoFlow(
  flowId: DemoFlow['id'],
  formData: FormData
): Promise<void> {
  const getText = (name: string) =>
    String(formData.get(name) ?? '').trim();

  let result;

  switch (flowId) {
    case 'donate':
      result = await supabase.from('donations').insert({
        business_name: getText('business'),
        contact_email: getText('contact'),
        collection_window: getText('window') || null,
      });
      break;

    case 'volunteer':
      result = await supabase.from('volunteers').insert({
        name: getText('name'),
        area: getText('area') || null,
        availability: getText('availability') || null,
      });
      break;

    case 'partner': {
      const capacityText = getText('capacity');
      const capacity = capacityText ? Number(capacityText) : null;

      if (capacity !== null && (!Number.isInteger(capacity) || capacity < 0)) {
        throw new Error('Please enter a valid weekly meal capacity.');
     }
      result = await supabase.from('ngos').insert({
        organisation_name: getText('organisation'),
        contact_email: getText('contact'),
        weekly_meal_capacity: capacity,
      });
      break;
    }
  }

  if (result.error) {
    throw result.error;
  }
}
