import UserTableRow from "./children/UserTableRow";
import { useState, useEffect } from "react";
import axios from "axios";

export function AdminInfo({ setEditorClosed, setDeleteClosed, setEditUser }) {
  const [allUsers, setAllUsers] = useState("");

  const getAllUsers = () => {
    axios
      .get("/api/user/all")
      .then((res) => {
        if (res.status == 200) {
          setAllUsers(res.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <section>
      <table>
        <caption>
          {allUsers ? allUsers.length : ""} users are currently registered.
        </caption>
        <thead>
          <tr>
            <td rowSpan="2"></td>
            <th scope="col" rowSpan="2">
              User ID
            </th>
            <th scope="col" rowSpan="2">
              First Name
            </th>
            <th scope="col" rowSpan="2">
              Last Name
            </th>
            <th scope="col" rowSpan="2">
              Email
            </th>
            <th scope="col" rowSpan="2">
              Registered
            </th>
            <th scope="col" rowSpan="2">
              Last Login
            </th>
            <th scope="col" rowSpan="2">
              Admin
            </th>
            <th scope="col" rowSpan="2">
              Online
            </th>
          </tr>
        </thead>
        <tbody>
          {allUsers ? (
            allUsers.map((user) => {
              return (
                <UserTableRow
                  key={user._id}
                  user={user}
                  setEditorClosed={setEditorClosed}
                  setDeleteClosed={setDeleteClosed}
                  setEditUser={setEditUser}
                />
              );
            })
          ) : (
            <tr></tr>
          )}
        </tbody>
      </table>
      <style jsx>{`
        table {
          border-collapse: separate;
          border-spacing: 0.2em;
          margin-left: 2em;
          box-shadow: 0 0 0.1em #666;
          position: relative;
          z-index: 1;
        }

        th,
        td {
          padding: 0.2em 0.5em;
          border-radius: 0.1em;
        }

        thead th {
          background-color: #87cefa;
          color: #1874cd;
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

        caption {
          color: white;
          background: #1874cd;
          font-size: 1.5em;
          box-shadow: 0.1em 0.1em 0.1em 0 hsl(0, 0%, 50%);
          padding: 0.2em 0.2em 0.2em 2em;
          width: auto;
          margin-left: -0.6em;
          position: relative;
        }

        tbody tr:hover {
          background-color: #fffbf0;
        }

        tbody td:hover {
          background-color: #fce4a2;
        }
      `}</style>
    </section>
  );
}
