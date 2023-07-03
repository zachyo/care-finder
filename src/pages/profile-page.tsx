import { useState } from 'react';
import pp from '../assets/image/Ellipse 19.png'
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useFormik } from 'formik';
import { auth } from '../firebase.utils';
import { onAuthStateChanged } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import SignOut from '../components/profile/profile';


interface FormValues {
  name: string;
  address: string;
  phone: string;
}

const validate = (values: FormValues) => {
  const errors: Partial<FormValues> = {};
  if (!values.name) {
    errors.name = "Please enter hospital name";
  }
  if (!values.address) {
    errors.address = "Please enter hospital address";
  }
  if (!values.phone) {
    errors.phone = "Please enter hospital phone number";
  }
  return errors;
};

const mdParser = new MarkdownIt();

const Profile = () => {
    const [markdownContent, setMarkdownContent] = useState("");
    const handleEditorChange = ( { text } : {text : string}) => {
      setMarkdownContent(text);
    };
    const navigate = useNavigate()
    const Formik = useFormik({
      initialValues: {
        name: "",
        address: "",
        phone: "",
      },
      validate,
      onSubmit: (values) => {
        const hospitalData = {
          ...values,
          content: markdownContent,
        };
        console.log(hospitalData);
      },
    });

    //monitor user
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // const uid = user.uid;
        // const displayName = user.displayName;
        console.log(user.email + " is logged in.");
        // ...
      } else {
        // User is signed out
        console.log("user has logged out.");
        navigate('/signin')
      }
    });

    const { handleChange, handleSubmit, values, errors } = Formik;
    return (
      <div>
        <div className="top flex justify-between items-center border-b-4 border-darkerGreyB px-8 mb-12">
          <Link to={"/search-hospital"}>
            <h1 className="logo text-4xl font-bold text-blueB ">CareFinder</h1>
          </Link>
          <div className="pp scale-75">
            <img src={pp} alt="" />
            <SignOut />
          </div>
        </div>
        <div className="markdown">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <h1 className="text-3xl font-bold">Add A Hospital</h1>
          <form onSubmit={Formik.handleSubmit}>
            <MdEditor
              style={{ height: "500px" }}
              value={markdownContent}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
            />
            <button style={{ margin: "1rem 0" }} type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
}

export default Profile