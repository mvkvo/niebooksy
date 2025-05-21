'use client';

import './information.scss';
import classNames from 'classnames';
import { DashboardInformationProps } from '../../models';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  updateProfileInformation,
  uploadProfilePicture,
} from '@actions/profile';
import { useActionState, useEffect, useState } from 'react';
import { SignState } from '@/types/signup';
import { User } from '@/types/user';
import Image from 'next/image';
import avatar from '@/assets/avatar.png';
import { Modal } from '@/components/ui/modal';

export const Information = ({ user }: DashboardInformationProps) => {
  const [profilePicture, setProfilePicture] = useState(
    user.profile_picture || avatar.src
  );
  const [profilePictureModalOpen, setProfilePictureModalOpen] = useState(false);
  const [hasChanged, setHasChaged] = useState(false);

  const [form, setForm] = useState<User>({
    name: user.name,
    surname: user.surname,
  });

  const [state, updateInformation, pending] = useActionState<
    SignState,
    FormData
  >(updateProfileInformation, undefined);

  useEffect(() => {
    setHasChaged(
      Object.entries(form).some(
        ([key, value]) => user[key as keyof User] !== value
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePicture(url);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await uploadProfilePicture(formData);
    if (res.success) setProfilePictureModalOpen(false);
  }

  return (
    <div className="information">
      <div
        className={classNames('form', {
          'form--error': state?.success === false,
          'form--success': state?.success,
        })}
      >
        <form action={updateInformation}>
          <div className="profile-information">
            <Input
              id="name"
              label="Imię"
              name="name"
              autocomplete="given-name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.currentTarget.value })
              }
              errorMessage={state?.errors?.name}
            />
            <Input
              id="surname"
              label="Nazwisko"
              name="surname"
              autocomplete="family-name"
              value={form.surname}
              onChange={(e) =>
                setForm({ ...form, surname: e.currentTarget.value })
              }
              errorMessage={state?.errors?.surname}
            />
            <Input
              id="email"
              label="Email"
              name="email"
              autocomplete="email"
              value={user.email}
              isDisabled={true}
            />
            <Button disabled={pending || !hasChanged} type="submit">
              Zapisz
            </Button>
          </div>
        </form>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="profile-picture">
          <div className="picture-box">
            <input
              id="profile_picture"
              type="file"
              accept="image/*"
              name="profile_picture"
              onChange={handleFileChange}
              onClick={() => setProfilePictureModalOpen(true)}
            />
            <Image
              src={profilePicture}
              alt="avatar placeholder"
              width={128}
              height={128}
            />
          </div>
        </div>
        <Modal
          isOpen={profilePictureModalOpen}
          onClose={() => setProfilePictureModalOpen(false)}
        >
          <div className="profile-picture__modal">
            <div className="profile-picture__box">
              <Image
                src={profilePicture}
                alt="avatar preview"
                width={256}
                height={256}
              />
            </div>
            <Button type="submit">Zapisz</Button>
          </div>
        </Modal>
      </form>
    </div>
  );
};
