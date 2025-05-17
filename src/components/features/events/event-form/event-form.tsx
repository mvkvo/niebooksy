'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EventFormProps } from './models';
import { Select } from '@/components/ui/select';

export const EventForm = ({ categories }: EventFormProps) => {
  return (
    <form>
      <h3>Dodaj wydarzenie</h3>
      <Input id="title" name="title" placeholder="Nazwa" />
      <Select
        id="categories"
        variant="primary"
        options={categories.map((cat) => ({
          id: cat.id,
          name: cat.category_name,
        }))}
        placeholder="kategoria"
      />
      <Input
        id="content"
        name="content"
        inputType="textarea"
        placeholder="Opis"
      />
      <Button type="submit">Dodaj</Button>
    </form>
  );
};

export default EventForm;
