import React, { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser, AiOutlineShareAlt, AiOutlineHome } from "react-icons/ai";
import { FiFolder, FiUpload } from "react-icons/fi";
import { Link } from "react-router-dom";
import FileUpload from "../componets/FileUpload";
import Upload from "../../../artifacts/contracts/Upload.sol/Upload.json";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";

const DashboardMain = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [files, setFiles] = useState([{ name: "myFile.pdf" }]);

  useEffect(() => {
    const loadProvider = async () => {
      if (window.ethereum) {
        window.ethereum.autoRefreshOnNetworkChange = false;
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        let contractAddress = "0x203f9e8bE4856AB5608C0ab8244CCd466761c33e";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        console.log(contract)
        setContract(contract);
      } else {
        console.error("Metamask is not installed");
      }
    };

    loadProvider();
  }, []);

  const menus = [
    {name: "Home", link: "/", icon: AiOutlineHome },
    {
      name: "Your Account",
      link: "/YourAccount",
      icon: AiOutlineUser,
      margin: true,
    },
    {name: "Upload", link: "/Upload", icon: FiUpload, margin: true },
    // {
    //   name: "File Manager",
    //   link: "/FileManager",
    //   icon: FiFolder,
    //   margin: true,
    // },
    { name: "Shared", link: "/Shared", icon: AiOutlineShareAlt, margin: true },
  ];

  const [open, setOpen] = useState(true);

  return (
    <section className="flex gap-6">
      <div
        className={`bg-black-gradient min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <div className="m-3 text-xl text-gray-900 font-semibold w-full flex-2">
        <span className="text-gradient font-poppins font-semibold ss:text-[72px] text-[40px] text-white ss:leading-[100.8px] leading-[75px]">
          Upload
        </span>{" "}
        <h4 className="text-black text-right -y-10">Hey There!</h4>
        <div>
          <p className="title">Upload File</p>
          <FileUpload files={files} setFiles={setFiles} />
        </div>
      </div>
    </section>
  );
};

export default DashboardMain;