import classNames from 'classnames';
import React, { useState } from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  selectedUserId: number | null;
  onUserIdSelector: (userId: number) => void;
  onPosts: (userId: number) => void;
};
export const UserSelector: React.FC<Props> = ({
  users,
  selectedUserId,
  onUserIdSelector,
  onPosts,
}) => {
  const [isOpenSelector, setIsOpenSelector] = useState(false);
  const [nameSelectedUser, setNameSelectedUser] = useState('Choose a user');

  function handlerUserItemClick(userId: number, userName: string) {
    onUserIdSelector(userId);
    setIsOpenSelector(prev => !prev);
    setNameSelectedUser(userName);
    onPosts(userId);
  }

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isOpenSelector,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpenSelector(prev => !prev)}
        >
          <span>{nameSelectedUser}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            return (
              <a
                href={`#user-${user.id}`}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUserId,
                })}
                key={user.id}
                onClick={() => handlerUserItemClick(user.id, user.name)}
              >
                {user.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
