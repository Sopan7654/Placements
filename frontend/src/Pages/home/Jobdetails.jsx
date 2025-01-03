import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEligibleJobs } from "../../redux/jobSlice";
import { FaCheck } from "react-icons/fa6";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const JobDetails = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getEligibleJobs());
  }, [dispatch]);

  const jobDetails = jobs.find((job) => job._id === jobId);

  if (loading) {
    return <p>Loading job details...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!jobDetails) {
    return <p>No job details found.</p>;
  }

  const {
    title,
    description,
    company,
    location,
    type,
    jobDate,
    eligibilityCriteria,
    totalApplications,
    createdAt,
  } = jobDetails;

  return (
    <AnimatePresence>
      {jobDetails && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => window.history.back()}
          />
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-2xl bg-white p-6 shadow-lg rounded-lg"
          >
            <div className="relative h-full">
              <button
                onClick={() => window.history.back()}
                className="absolute right-4 top-4 p-2 text-gray-600 hover:text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="flex items-center gap-10 p-2">
                  <div className="h-32 w-32 bg-gray-100  rounded-full flex items-center object-cover justify-center">
                    <img
                      src={jobDetails.logo || "/placeholder-logo.png"}
                      alt="Company logo"
                      className="h-24 w-24 object-fill"
                    />
                  </div>
                  <div>
                    <h1 className="text-lg text-gray-600 font-bold">
                      {company}
                    </h1>
                    <p className="text-2xl font-bold text-gray-700">{title}</p>
                    <div className="flex pt-2 space-x-6">
                      <p className="text-gray-500 border-2 border-gray-400 rounded-full px-2  ">
                        {location}
                      </p>
                      <p className="text-green-600 font-semibold">
                        {new Date(jobDate).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      <div className="flex space-x-1 pl-4">
                        <p className="text-gray-600 font-semibold">
                          {totalApplications}
                        </p>
                        <span className=" text-gray-500">applicants</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="space-y-8 px-5">
                  <div className=" flex text-nowrap gap-4">
                    <div className="flex items-center justify-center space-x-1 bg-sky-300/50 rounded-sm w-20 py-1 border border-sky-500 shadow-md">
                      <FaCheck className="text-xl" />
                      <p className="text-gray-600 font-semibold">{type}</p>
                    </div>
                    <div className="flex items-center justify-center space-x-1 bg-sky-300/50 rounded-sm w-20 py-1 border border-sky-500 shadow-md">
                      <FaCheck className="text-xl" />
                      <p className="text-gray-600 font-semibold">
                        {eligibilityCriteria.branches.join(", ") || "All"}{" "}
                      </p>
                    </div>
                    <div className="flex items-center justify-center space-x-1 bg-sky-300/50 rounded-sm w-20 py-1 border border-sky-500 shadow-md">
                      <FaCheck className="text-xl" />
                      <p className="text-gray-600 font-semibold">
                        {" "}
                        {eligibilityCriteria.gender || "Both"}
                      </p>
                    </div>
                    <div className="flex items-center justify-center space-x-1 bg-sky-300/50 rounded-sm w-28 py-1 border border-sky-500 shadow-md">
                      <FaCheck className="text-xl" />
                      <p className="text-gray-600 font-semibold">
                        {eligibilityCriteria.session || "2024-2025"}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-6">
                    <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-3xl transform transition-all duration-300 hover:bg-teal-500 hover:-translate-y-1 hover:scale-105 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-blue-700 dark:hover:bg-teal-600 ">
                      Apply Now
                    </button>
                    <button className="px-6 py-3 bg-blue-500 text-white rounded-3xl shadow-md transform transition-all duration-300 hover:bg-teal-500 hover:-translate-y-1 hover:scale-105 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-blue-700 dark:hover:bg-teal-600">
                      Contact
                    </button>
                  </div>
                </div>

                {/* Eligibility Criteria */}
                <div className="space-y-4 pt-6   px-5">
                  <div className="bg-stone-200/50  px-6 py-1">
                    <h3 className="font-semibold text-gray-800 pb-3">
                      Eligibility Criteria:
                    </h3>

                    <div className="grid grid-cols-3  gap-4 pb-6">
                      <div className="flex space-x-1">
                        <p className="text-gray-600 font-semibold">
                          {eligibilityCriteria.cgpa || "NA"}
                        </p>
                        <h4 className="font-normal text-gray-700">Min CGPA</h4>
                      </div>

                      <div className="flex space-x-1">
                        <p className="text-gray-600 font-semibold">
                          {eligibilityCriteria.jeeScore || "NA"}
                        </p>
                        <h4 className="font-normal text-gray-700">Min JEE</h4>
                      </div>

                      <div className="flex space-x-1">
                        <p className="text-gray-600 font-semibold">
                          {eligibilityCriteria.mhtCetScore || "NA"}
                        </p>
                        <h4 className="font-normal text-gray-700">
                          Min MHT-CET
                        </h4>
                      </div>

                      <div className="flex space-x-1">
                        <p className="text-gray-600 font-semibold">
                          {eligibilityCriteria.tenthPercentage || "NA"}%
                        </p>
                        <h4 className="font-normal text-gray-700">Min 10th </h4>
                      </div>

                      <div className="flex space-x-1">
                        <p className="text-gray-600 font-semibold">
                          {eligibilityCriteria.twelfthPercentage || "NA"}%
                        </p>
                        <h4 className="font-normal text-gray-700">Min 12th </h4>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      About the Job
                    </h3>
                    <p className="text-gray-600">{description}</p>
                  </div>
                  <div className="flex space-x-1 justify-items-end pt-5">
                    <h3 className="font-semibold text-gray-800">Posted On:</h3>
                    <p className="text-gray-600">
                      {new Date(createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Footer Section */}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default JobDetails;
