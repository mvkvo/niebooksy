'use client';

import './settings.scss';
import { useState } from 'react';
import { Sidebar } from './sidebar';
import { Information } from './information';
import { SettingsProps } from '../models';
import { MyEvents } from './my-events';

const elements = [
  {
    title: 'Informacje',
    id: 'information',
  },
  {
    title: 'Galeria',
    id: 'gallery',
  },
  {
    title: 'Wydarzenia',
    id: 'events',
  },
  {
    title: 'Oferta',
    id: 'offer',
  },
];

export const Settings = ({ user, events }: SettingsProps) => {
  const [activeTab, setActiveTab] = useState(elements[0].id);

  return (
    <div className="settings">
      <Sidebar elements={elements} active={activeTab} onSelect={setActiveTab} />
      <div className="settings__content">
        {activeTab === elements[0].id && <Information user={user} />}
        {activeTab === elements[1].id && <div>{elements[1].title}</div>}
        {activeTab === elements[2].id && <MyEvents events={events} />}
        {activeTab === elements[3].id && <div>{elements[3].title}</div>}
      </div>
    </div>
  );
};
