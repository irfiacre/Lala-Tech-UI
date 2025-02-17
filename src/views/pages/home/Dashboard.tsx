import { getAllStaff } from "@/services/firebase/authentication";
import AnalyticsCard from "@/src/components/cards/AnalyticsCard";
import BaseCard from "@/src/components/cards/BaseCard";
import UsersTable from "@/src/components/tables/UsersTable";
import Chart from "@/src/components/charts/Chart";
import React, { useEffect, useState, useRef } from "react";
import {
  getCollectionEntries,
  subscribeToCollection,
} from "@/services/firebase/helpers";
import { APPLICATIONS_COLLECTION } from "@/constants/collectionNames";
import { Icon } from "@iconify/react/dist/iconify.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ReportTemplate from "@/src/components/report/Template";
import Datepicker from "react-tailwindcss-datepicker";
import { PulseLoader } from "react-spinners";
import Properties from "@/src/components/tables/Properties";
import { RENTAL_PROPERTIES } from "@/constants/fixtures";


const DashboardPage = ({ userInfo }: {userInfo: any}) => {
  const moreStatistics = [
    { title: "Guests", count: 0 },
    { title: "Currently Onboarding", count: 2 },
    { title: "Available courses", count: 1 },
  ];
  const fetchStaff = async () => await getAllStaff();

  const [allStaff, setStaff] = useState([]);
  const [user, setUser] = useState<any>(null);
  const [generating, setGenerating] = useState(false);
  const [dateRange, setDateRange] = useState<any>({
    startDate: new Date().setMonth(new Date().getMonth() - 1),
    endDate: new Date(),
  });
  const [loading, setLoading] = useState(false);

  const initialFindApplications = async () => {
    setLoading(true);
    const result = await getCollectionEntries(APPLICATIONS_COLLECTION);
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const userObj = JSON.parse(userStr);
      if (userObj.role === "admin") {
        fetchStaff().then((result: any) => setStaff(result));
      }
      setUser(userObj);
    }
  }, []);

  const [data, setData] = useState<any>([]);
  const handleOnUpdateData = (newChanges: any) =>
    setData((prevData: any) => [...prevData, newChanges]);

  useEffect(() => {
    initialFindApplications();
    return () =>
      subscribeToCollection(APPLICATIONS_COLLECTION, handleOnUpdateData);
  }, []);

  const analytics = [
    {
      title: "Guests",
      count: data.length,
    },
    {
      title: "Properties",
      count: data.filter((elt: any) => elt.status === "approved").length,
    },
    {
      title: "Earnings",
      count: data.filter((elt: any) => elt.status === "pending").length,
    },
    {
      title: "Rating",
      count: data.filter((elt: any) => elt.status === "rejected").length,
    },
  ];
  const componentRef = useRef<HTMLDivElement>(null);

  const generateReport = () => {
    setGenerating(true);
    const input = componentRef.current;
    if (input) {
      input.style.visibility = "visible";
      html2canvas(input, { scale: 5 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        if (imgHeight > pageHeight) {
          let position = 0;
          for (let i = 0; i <= 3; i++) {
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            position -= pageHeight;
            if (heightLeft > 0) {
              pdf.addPage();
            }
          }
        } else {
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        }
        pdf.save(
          `AnalyticsReport-${dateRange.startDate}-${dateRange.endDate}.pdf`
        );
        input.style.visibility = "hidden";
      });
    }
    setGenerating(false);
  };
  
console.log('---->', userInfo);

  return (
    <div className="flex flex-col gap-5 space-y-2.5">
      <div className="flex flex-row flex-wrap justify-between max-md:justify-start items-center gap-5 py-1.5">
        {analytics.map((item) => (
          <div className="w-60 py-1.5 max-sm:w-32" key={item.title}>
            <AnalyticsCard title={item.title} count={item.count} />
          </div>
        ))}
      </div>
      {/* <div className="flex flex-row justify-between items-center">
        <div className="w-2/5">
          <Datepicker
            value={dateRange}
            onChange={(val) => setDateRange(val)}
            primaryColor={"rose"}
            showShortcuts={true}
            showFooter
            placeholder="Report Date Range"
            maxDate={new Date()}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={() => generateReport()}
            className="h-12 text-white bg-textColor hover:bg-primaryDark focus:outline-none font-medium rounded-lg text-md text-center px-4 flex flex-row items-center justify-center"
          >
            {generating ? (
              <PulseLoader
                color={"#ffffff"}
                loading={generating}
                size={10}
                cssOverride={{ width: "100%" }}
                aria-label="Loading Spinner"
                data-testid="loader"
                speedMultiplier={0.5}
              />
            ) : (
              <span className="pr-2">Generate Report</span>
            )}
            <Icon icon="material-symbols:download" fontSize={24} />
          </button>
        </div>
      </div> */}
      <div>
      <h1 className="text-textColor text-2xl capitalize pb-4">My Properties</h1>
        <Properties data={RENTAL_PROPERTIES}  />
      </div>
    </div>
  );
};

export default DashboardPage;
