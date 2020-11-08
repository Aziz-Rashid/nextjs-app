const UserTableRow = ({
  user,
  setEditorClosed,
  setDeleteClosed,
  setEditUser,
}) => {
  return (
    <tr>
      <th scope="row">{user.username}</th>
      <td>{user._id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.registerDate}</td>
      <td>{user.lastLogin}</td>
      <td>{user.isAdmin.toString()}</td>
      <td>{user.isOnline.toString()}</td>
      <td>
        <img
          src="/img/user_edit.png"
          height="20"
          width="20"
          onClick={() => {
            setEditorClosed(false);
            setEditUser({ id: user._id, username: user.username });
          }}
        />
      </td>
      <td>
        <img
          src="/img/user_delete.png"
          height="20"
          width="20"
          onClick={() => {
            setDeleteClosed(false);
            setEditUser({ id: user._id, username: user.username });
          }}
        />
      </td>
      <style jsx>{`
        th,
        td {
          padding: 0.2em 0.5em;
          border-radius: 0.1em;
        }

        td {
          font-style: italic;
          text-align: right;
          box-shadow: inset 1px 3px 5px -3px rgba(0, 0, 0, 0.5);
        }

        tbody tr:nth-child(even) {
          background-color: #e4ebf2;
          color: #000;
        }

        td:empty {
          box-shadow: none;
          background-color: none;
        }

        th[scope="row"] {
          color: #1874cd;
          text-align: right;
          background-color: #fff;
        }

        tbody tr:hover {
          background-color: #fffbf0;
        }

        tbody td:hover {
          background-color: #fce4a2;
        }
      `}</style>
    </tr>
  );
};

export default UserTableRow;
