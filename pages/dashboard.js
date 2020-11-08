import Head from "next/head";
import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../components";
import Router from "next/router";
import { MdEdit, MdLocationOn, MdEmail } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { FaCamera, FaUser } from "react-icons/fa";
import { GoPrimitiveDot } from "react-icons/go";
import { validateImageUpload } from "../validation/user";

function getBase64(file, cb) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result)
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}


export default function Dashboard() {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const inputRef = useRef(null);
  const [profileImage, setProfileImage] = useState({
    image: '',
    imageName: '',
  })
  const [isInEditing, setIsInEditing] = useState(false);
  const [errors, setErrors] = useState({
    image: ''
  })

  const logout = () => {
    axios
      .get("/api/auth/logout")
      .then((res) => {
        if (res.status == 200) {
          setUser({});
          setIsLoggedIn(false);
          Router.push("/");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Check online status and get userdata for dashboard
  // Redirect if user is not logged in (dashboard access only for logged in users)
  const getUser = () => {
    axios
      .get("/api/user")
      .then((res) => {
        if (res.status == 200) {
          setUser(res.data);
          setIsLoggedIn(true);
        } else {
          setUser({});
          setIsLoggedIn(false);
          Router.push("/login");
        }
      })
      .catch((e) => {
        console.log("an error occured: " + e);
        Router.push("/login");
      });
  };

  useEffect(() => {
    getUser();
  }, [isLoggedIn]);


  const _clickImage = () => {
    inputRef.current.click();
  }


  const _profileImageChange = (e) => {
    const image = e.target.files[0];
    console.log(image)
    if (!image)
    {
      return false;
    }
    setErrors({ ...errors, image: '' })
    getBase64(image, (result) => {
      setProfileImage({ ...profileImage, image: result });
      setIsInEditing(true)
    });
  }


  const _saveChanges = (e) => {
    e.preventDefault();
    //check if the image is large in size
    const { isValid, errors } = validateImageUpload(profileImage);
    if (!isValid) {
      setErrors(errors);
      return;
    }
    axios
      .put("/api/user/update-image", {
        id: user._id,
        image: profileImage.image,
      })
      .then((res) => {
        if (res.status) {
          setIsInEditing(false);
          setErrors({});
        }else {
          setErrors({ ...errors, ...res.errors });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <main>
      <Head>
        <title>The Moti: Dashboard</title>
        <meta name="description" content="dashboard overview" />
      </Head>
      {isLoggedIn ? (
        <div className="dashboard-wrapper">
          <div className="overview-wrapper">
            <h1 className="content-title1">Dashboard</h1>
            <section className="content-wrapper2">
              <div>
                <h1 className="content-title2">My Courses</h1>
                <ul>
                  <li className="profile-items">
                    You have no registered courses.
                  </li>
                </ul>
              </div>
            </section>
            <section className="content-wrapper2">
              <div>
                <h1 className="content-title2">Messages</h1>
                <ul>
                  <li className="profile-items">You have no new messages.</li>
                </ul>
              </div>
            </section>
          </div>



          <section className="content-wrapper1">
            <div className="m-6x">

              <input ref={inputRef} onChange={_profileImageChange} type="file" id="file" style={{ display: 'none' }} accept="image/x-png,image/gif,image/jpeg" />

              <div className="top-box">
                <div className="online-label-wrapper d-flex-end">
                  <div className="online-label green">Online</div>
                </div>
                <div className={`image-wrapper ${isInEditing ? 'border-1-green' : ''}`}>
                  <img
                    className="profile-picture"
                    src={
                      profileImage.image ||
                      user.image ||
                      "https://png.pngtree.com/png-clipart/20190924/original/pngtree-businessman-user-avatar-free-vector-png-image_4827807.jpg"
                    }
                    alt="User Image"
                    onClick={_clickImage}
                  />

                  {errors.image ?
                    <div className="error-label">{errors.image}</div> :
                    null
                  }

                  {isInEditing ?
                    <button className="btn-logout btn-small" type="button" onClick={_saveChanges}>
                      Save
                  </button> :
                    null
                  }

                  <div className={`middle ${isInEditing?'middle-editing': ''}`} onClick = {_clickImage}>
                    <div className="text">
                      <FaCamera size="2em" color="#2871fa" />
                    </div>
                  </div>


                </div>
              </div>
              <div className="text-center p-t-1x ">
                <strong>{user.firstName}{" "} {user.lastName}</strong>
              </div>
              <div className="text-center p-t-1x ">
                <MdEdit size="1.2em" color="#000000bb" />
              </div>

              <hr />
              <div className="d-flex-between m-t-4x">
                <div> <MdLocationOn size="1.2em" color="#000000bb" />  From</div>
                <div>Berlin Germany</div>
              </div>


              <div className="d-flex-between m-t-4x">
                <div> <IoMdMail size="1.2em" color="#000000bb" />  Email</div>
                <div>{user.email}</div>
              </div>
              <div className="d-flex-between m-t-4x">
                <div><FaUser size="1.2em" color="#000000bb" />   Member since</div>
                <div> {(new Date()).toDateString().split(' ')[1]} {(new Date()).toDateString().split(' ')[3]}</div>
              </div>


            </div>
            <div className="btn-logout-container">
              <button className="btn-logout" type="button" onClick={logout}>
                Logout
              </button>
            </div>
          </section>




        </div>
      ) : (
          <section className="dashboard-wrapper">
            <div>
              <h1 className="dashboard-title">Not logged ixn.</h1>
            </div>
          </section>
        )}
      <style jsx>{`
        .green {
          color: green;
        }
        .text-center{
          text-align: center;
        }
        .profile-items {
          list-style: none;
          margin: 1rem auto;
        }
        .dashboard-wrapper {
          padding: 10px;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          line-height: 1.5;
          width: auto;
          margin: 0;
        }
        .content-wrapper1,
        .content-wrapper2 {
          padding: 10px;
          box-sizing: border-box;
          line-height: 1.5;
          width: 500px;
          margin: 3rem 3rem;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .content-title1 {
          text-align: center;
          text-transform: uppercase;
          font-size: 1.4rem;
          margin: 0;
          margin-bottom: 1rem;
        }
        .content-title2 {
          text-align: center;
          font-size: 1rem;
          margin: 0;
          margin-bottom: 1rem;
        }
        .dashboard-text {
          text-align: center;
          font-size: 1.2rem;
          margin: 0;
        }
        .btn-logout-container {
          position: relative;
        }
        .btn-logout {
          width: 100%;
          font-size: 1.1rem;
          border: solid thin transparent;
          background-color: #6717ce;
          background-image: linear-gradient(to right, #6717cd, #2871fa);
          text-transform: uppercase;
          color: #fff;
          margin: 10px 0;
          padding: 0.5em;
          border-radius: 5px;
        }
        .btn-logout:hover {
          cursor: pointer;
          background-image: linear-gradient(to left, #6717cd, #2871fa);
        }

        .m-6x{
          margin: 24px;
        }

        .border-1-green{
          border: 1px solid green;
          border-radius:4px;
        }

        .p-t-1x{
          padding-top: 4px;
        }

        .m-t-4x{
          margin-top: 16px;
        }

        .btn-small{
          font-size: 0.9em;
          margin-bottom: 0;
        }

        .btn-outline-secondary{
          width: 100%;
          font-size: 1rem;
          border: 2px solid gray;
          background-color: transparent;
          background-image: transparent;
          color: gray;
          margin: 10px 0;
          padding: 0.5em;
          border-radius: 5px;
        }

        .btn-outline-secondary:hover {
          cursor: pointer;
          color: #fff;
          background-image: linear-gradient(to left, #6717cd, #2871fa);
        }

        .d-flex-end{
          display: flex;
          justify-content: flex-end;
        }

        .d-flex-between{
          display: flex;
          justify-content: space-between;
        }

        .image-wrapper{
         width: 180px;
         margin-left: calc(50% - 90px);
         padding: 5px 40px;
         position: relative;
        }

        .middle {
          transition: .5s ease;
          opacity: 0;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
          text-align: center;
          cursor: pointer;
        }
        .middle-editing {
          top: calc( 50% - 20px);
        }
        
        .image-wrapper:hover .profile-picture {
          opacity: 0.3;
        }
        
        .image-wrapper:hover .middle {
          opacity: 1;
        }

        .profile-picture{
          height: 100px;
          width: 100px;
          object-fit: cover;
          border-radius: 50px;
          margin: auto;
          cursor: pointer;
        }

        .error-label{
          color: orangered;
          font-size: 0.8em;
        }

        .online-label-wrapper{
          padding: 5px;
          padding-top: 10px;
        }

        .online-label{
          padding: 3px 5px;
          border: 1px solid green;
          color: green;
          border-radius: 15px;
          font-size: 0.9em;
        }
        @media (max-width: 870px) {
          .dashboard-wrapper,
          .content-wrapper1,
          .content-wrapper2,
          .overview-wrapper {
            display: block;
            width: auto;
          }
        }



      `}</style>
    </main>
  );
}