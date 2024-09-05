import React from "react";
import {BsFacebook, BsYoutube, BsInstagram, BsTwitter} from 'react-icons/bs'

function Footer() {
  return (
    <div className="w-full md:flex-col flex justify-center">
      <div className="m-8 p-8">
        <div className="flex items-center gap-8 pb-8">
          <p className="font-bold text-2xl text-slate-600">
            <span className="text-teal-500">E</span>
            shop.
          </p>
          <div className="flex gap-4 text-3xl text-teal-700">
            <BsFacebook/>
            <BsInstagram/>
            <BsYoutube/>
            <BsTwitter/>
          </div>
        </div>
        <div className="md:flex justify-between font-light text-slate-600 ">
          <div className="md:pb-0 pb-8">
            <p className="font-bold text-slate-800">Getting started</p>
            <p>Getting started</p>
            <p>Getting started</p>
            <p>Getting started</p>
            <p>Getting started</p>
          </div>
          <div className="md:pb-0 pb-8">
            <p className="font-bold text-slate-800">Explore</p>
            <p>Prototyping</p>
            <p>Design systems</p>
            <p>Pricing</p>
            <p>Security</p>
          </div>
          <div className="md:pb-0 pb-8">
            <p className="font-bold text-slate-800">Resources</p>
            <p>Best practices</p>
            <p>Support</p>
            <p>Developers</p>
            <p>Learn design</p>
          </div>
          <div className="md:pb-0 pb-8">
            <p className="font-bold text-slate-800">Community</p>
            <p>Discussion Forums</p>
            <p>Code of Conduct</p>
            <p>Contributing</p>
            <p>API Reference</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
