import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import AccountInfo from '../components/AccountInfo';
import Header from '../components/Header';
import ChangePassword from '../components/ChangePassword';
import ChangeEmail from '../components/ChangeEmail';
import DeleteAccount from '../components/DeleteAccount';

export default function Account() {
  const user = useSelector(selectUser);
  return (
    <main>
      <Header title="My Account" />
      <AccountInfo {...user} />
      <section className="flex flex-col gap-1">
        <ChangePassword />
        <ChangeEmail />
        <DeleteAccount />
        <p className="text-sm font-semibold">
          NOTE: This option was disabled due to numerous problems that due to
          lack of time I do not intend to fix. Thanks for your understanding ♥
        </p>
      </section>
    </main>
  );
}
