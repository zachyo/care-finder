import { useState ,useContext } from 'react';
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
import { UserContext } from '../userContext';


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
    const { currentUser, setIsLoggedIn, setCurrentUser} = useContext(UserContext)
    console.log(currentUser)
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
        // User is signed in
        setCurrentUser(user);
        setIsLoggedIn(true);
      } else {
        // User is signed out
        setIsLoggedIn(false);
        setCurrentUser(null);
        console.log("user has logged out.");
        navigate('/signin')
      }
    });

    const { handleChange, handleSubmit, values, errors } = Formik;
    return (
      <div>
        <div className="top flex justify-between items-center border-b-4 border-darkerGreyB px-8 mb-12 py-3">
          <Link to={"/search-hospital"}>
            <h1 className="logo text-4xl font-bold text-blueB ">CareFinder</h1>
          </Link>
          <div className="pp flex gap-3">
            <img src={pp} alt="" className="h-12" />
            <SignOut />
          </div>
        </div>
        <div className="markdown">
          <h1 className="text-3xl font-bold mb-4">Welcome - Add A Hospital</h1>
          <form onSubmit={Formik.handleSubmit}>
            <MdEditor
              style={{ height: "500px" }}
              value={markdownContent}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
            />
            <button
              style={{ margin: "1rem 0" }}
              type="submit"
              className="font-bold rounded-xl bg-deepBlueB py-3 px-6 text-white border-2 hover:bg-white hover:text-deepBlueB hover:border-2 hover:border-deepBlueB"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
}

export default Profile