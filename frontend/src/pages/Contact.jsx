import { useState } from "react";
import Layout from "../components/Layout";
import SideBar from "../components/SideBar";
import axios from "axios";
import { BACKEND_URL } from "../services/authService";
import { toast } from "react-toastify";
import { FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

export default function Contact() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const data = {
    subject,
    message,
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/contactus`, data);
      setSubject("");
      setMessage("");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="w-full min-h-screen flex">
      <SideBar />
      <Layout>
        <h3>Contact Us</h3>
        <div className="w-full bg-slate-50 py-10 px-8 rounded-md shadow-md flex flex-row mt-6">
          <form onSubmit={sendEmail} className="w-1/2 flex flex-col gap-4">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="rounded-sm px-2 py-1 border-2"
            />
            <textarea
              name="message"
              placeholder="Message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={10}
              cols={30}
              className=" rounded-sm px-2 py-1 border-2"
            />
            <button className="w-20 bg-blue-600 text-white font-medium text-sm rounded-lg px-2.5 py-2 cursor-pointer hover:bg-blue-500 tracking-wide my-4">
              Send
            </button>
          </form>
          <div className="ml-10">
            <h3>Our Contact Information</h3>
            <div className="flex flex-col mt-8 gap-4">
              <span>
                <FaPhoneAlt size={20} className="inline" /> +514 000 1234
              </span>
              <span>
                <MdEmail size={20} className="inline" /> support@something.com
              </span>
              <span>
                <FaLocationDot size={20} className="inline" /> Montreal, Canada
              </span>
              <span>
                <FaTwitter size={20} className="inline" /> @DannyDev
              </span>
            </div>
          </div>
        </div>
      </Layout>
    </section>
  );
}
