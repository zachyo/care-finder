import React, { useState } from "react";
// import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Hospital } from "../types/hospital";
import useHospitalStore from "../utils/hospitalStore";

interface Props {
  data: Hospital[];
  page : number;
  setPage : React.Dispatch<React.SetStateAction<number>>;
}

const HospitalListComponent: React.FC<Props> = ({ data, page, setPage }) => {
  // useEffect(() => {
  //   setGroupedPhotos(groupedPhotos);
  // }, []);
  // const [page, setPage] = useState(1);

  //paging system
  const PER_PAGE = 10;
  const total = data?.length;
  const pages = Math.ceil(total / PER_PAGE);
  const skip = page * PER_PAGE - PER_PAGE;

  const Hospitals = data?.slice(skip, skip + PER_PAGE).map((hospital, index) => {
    return (
      <tr key={hospital.id}>
        <td className="py-2 px-7 text-[14px]">{hospital.name}</td>
        <td className="py-2 px-7 text-[14px]">{hospital.address}</td>
        <td className="py-2 px-7 text-[14px]">{hospital.location ? hospital.location : '------------'}</td>
      </tr>
    );
  });

  return (
    <div className="container flex flex-wrap justify-center ">
      <table className="w-full text-left mx-5">
        <tbody>
          <tr>
            <th className="p-8 text-[20px] w-3/12">Name</th>
            <th className="p-8 text-[20px]">Address</th>
            <th className="p-8 text-[20px]">Location</th>
          </tr>
          {Hospitals}
        </tbody>
      </table>
      {/* pagination */}
      <>
        <div className="page-btns flex items-center justify-center gap-16 w-full mt-8">
          <button
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="font-bold rounded-xl bg-deepBlueB py-3 px-6 text-white border-2 hover:bg-white hover:text-deepBlueB hover:border-2 hover:border-deepBlueB diabled:cursor-not-allowed"
          >
            Prev
          </button>
          <h3 className="pagination ">
            Pages: {data?.length > 0 ? page : 0} of {pages}
          </h3>
          <button
            disabled={page >= pages}
            onClick={() => setPage((prev) => prev + 1)}
            className="font-bold rounded-xl bg-deepBlueB py-3 px-6 text-white border-2 hover:bg-white hover:text-deepBlueB hover:border-2 hover:border-deepBlueB"
          >
            Next
          </button>
        </div>
      </>
    </div>
  );
};

export default HospitalListComponent;

// {
//   data
//     .filter((_, index) => index < 15)
//     .map((hospital) => (
//       <Link
//         to={`/hospital/${hospital.id}`}
//         key={hospital.id}
//         className="mb-8 mx-2 hover:underline hover:scale-105 transition-all w-1/3 md:w-auto"
//       >
//         <h2 className="text-left mb-2">{hospital.name}</h2>
//         {/* <div>
//         <img
//           src={hospital.icon_mask_base_uri}
//           alt={hospital.name}
//           className="rounded-xl hover:scale-110"
//         />
//       </div> */}
//         <p>{hospital.address ? `Address - ${hospital.address}` : ""}</p>
//       </Link>
//     ));
// }
