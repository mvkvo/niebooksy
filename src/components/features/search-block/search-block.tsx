'use client';

import './search-block.scss';

import { Input } from '@/components/ui/input';
import { SearchBlockProps } from './models';
import { Select } from '@/components/ui/select';

export const SearchBlock = ({ categories }: SearchBlockProps) => {
  return (
    <div className="search-block">
      <Input
        id="search"
        name="search"
        placeholder="Szukaj..."
        variant="secondary"
      />
      <Select
        id="categories"
        variant="secondary"
        options={categories}
        placeholder="kategoria"
      />
      <Input
        id="localization"
        name="localization"
        placeholder="Lokalizacja"
        variant="secondary"
      />
    </div>
  );
};
