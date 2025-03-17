import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="px-4 bg-[#FAC2E5] py-6 flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col gap-4 justify-between h-full xl:w-1/2">
          <div className="w-80">
            <Link to={"/"} className="">
              <img
                loading="lazy"
                src="/logo.png"
                alt="logo"
                className="w-40 h-40 object-cover"
              />
            </Link>
            <p className="font-bold text-sm">
              Copyright © VeridianGlow by veekee All rights reserved
            </p>
          </div>
          <div className="space-y-2 pb-6 pt-4">
            <h2 className="font-bold">Follow us </h2>
            <p className="">
              Follow us on all social media platforms and get updated on the
              latest updates on amazing offers
            </p>
            <div className="flex items-center gap-4 py-2">
              <Instagram size={30} />
              <Twitter size={30} />
              <Facebook size={30} />
            </div>
          </div>
        </div>
        <div>
          <div className="grid sm:grid-cols-3 grid-cols-2 gap-4">
            <div className="space-y-2">
              <h2 className="font-bold">Company</h2>
              <ul className="text-sm space-y-2 flex flex-col">
                <a href="#">
                  <li>Consult a proffessional</li>
                </a>
                <a href="#">
                  <li>Track your order</li>
                </a>
                <a href="/frequently-asked-questions">
                  <li>FAQs</li>
                </a>
                <a href="/return-policy">
                  <li>Return policy</li>
                </a>
              </ul>
            </div>
            <div className="space-y-2">
              <h2 className="font-bold">Quick Links</h2>
              <ul className="text-sm space-y-2 flex flex-col">
                <a href="/">
                  <li>Home</li>
                </a>
                <a href="/shop">
                  <li>Shop</li>
                </a>
                <a href="#">
                  <li>Search</li>
                </a>
                <a href="/terms-and-conditions">
                  <li>Terms & conditions</li>
                </a>
                <a href="/privacy-policy">
                  <li>Privacy</li>
                </a>
              </ul>
            </div>
            <div className="text-sm">
              <h2 className="font-bold">Have any complaints</h2>
              <p>support@veridianglow.com</p>
              <p>
                <span className="font-semibold">WhatsApp </span>+234 992 889
                8999
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs sm:text-sm px-4 flex flex-wrap sm:justify-between justify-center gap-4 items-center py-4">
        <div className="flex items-center gap-2">
          <p>© VeridianGlow 2025</p>
          <div className="h-6 w-0.5 bg-zinc-600" />
          <p>
             Designed And Built By{" "}
            <a
              href="https://eofoneta.vercel.app/"
              className="font-bold"
              target="_blank"
            >
              LordMaryo
            </a>
          </p>
        </div>
        <div className="w-44">
          <img src="/poweredbypaystack.png" alt="powered by paystack" />
        </div>
      </div>
    </>
  );
};

export default Footer;
