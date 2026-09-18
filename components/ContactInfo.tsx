import { FaAddressCard, FaPhoneAlt } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function ContactInfo() {
  return (
    <div className="contact-panel contact-info relative mb-0 flex flex-col justify-center p-6 lg:w-1/2 lg:items-center">
      <div className="w-full mb-6">
        <h2 className="contact-panel-title text-3xl text-center relative">
          Contact
        </h2>
      </div>

      <div className="flex flex-col justify-center space-y-6 w-full">
        <div className="flex flex-col lg:flex-row items-start lg:items-center flex-wrap gap-4 group/item relative">
          <span className="contact-detail-label flex items-center gap-2">
            <div className="contact-icon flex items-center justify-center h-8 w-8">
              <MdAttachEmail className="text-lg" />
            </div>
            <span className="font-medium">
              Email:
            </span>
          </span>
          <Link
            href="mailto:contact@muaathrifath.me"
            target="_blank"
            type="email"
            className="contact-detail-link flex items-center gap-2 flex-nowrap"
          >
            contact@muaathrifath.me
            <FaExternalLinkAlt className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center flex-wrap gap-4 group/item relative">
          <span className="contact-detail-label flex items-center gap-2">
            <div className="contact-icon flex items-center justify-center h-8 w-8">
              <FaPhoneAlt className="text-lg" />
            </div>
            <span className="font-medium">
              Phone:
            </span>
          </span>
          <Link
            href="tel:+918883735079"
            target="_blank"
            type="tel"
            className="contact-detail-link flex items-center gap-2 flex-nowrap"
          >
            +91 88837 35079
            <FaExternalLinkAlt className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center flex-wrap gap-4 group/item relative">
          <span className="contact-detail-label flex items-center gap-2">
            <div className="contact-icon flex items-center justify-center h-8 w-8">
              <FaAddressCard className="text-lg" />
            </div>
            <span className="font-medium">
              Address:
            </span>
          </span>
          <Link
            href=""
            target="_blank"
            className="contact-detail-link flex items-center gap-2 flex-nowrap"
          >
            Chennai, India
            <FaExternalLinkAlt className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
