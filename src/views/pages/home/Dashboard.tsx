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
import Properties from "@/src/components/tables/Properties";
import { getHostAnalytics, getProperties, manageProperty } from "@/services/backend";
import { toast } from "react-toastify";

const DashboardPage = ({ userInfo }: { userInfo: any }) => {
  const [dateRange, setDateRange] = useState<any>({
    startDate: new Date().setMonth(new Date().getMonth() - 1),
    endDate: new Date(),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [properties, setProperties] = useState<Array<any>>([]);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [analytics, setAnalytics] =useState<Array<any>>([])

  useEffect(() => {
    
    (async () => {
    setLoading(true);
      const propertiesResult = await getProperties(userInfo.user_id);
      setProperties(propertiesResult)
      const analyticsResult = await getHostAnalytics(userInfo.user_id)
      setAnalytics([
        {
          title: "Properties",
          count: analyticsResult.properties,
        },
        {
          title: "Guests",
          count: Object.keys(analyticsResult.guests).length,
        },
        {
          title: "Earnings",
          count: analyticsResult.earnings,
        },
      ])
    setLoading(false);
    })();
  }, [refetch]);
  

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
  const deleteProperty=async(propert_id: string)=>{
    const result = await manageProperty(propert_id, "DELETE");
    toast.success(`Your property was REMOVED successfuly!`, {
      hideProgressBar: true,
      closeOnClick: true,
      autoClose: 2000,
    });
    setRefetch(true)
  }
  

  return (
    <div className="flex flex-col gap-5 space-y-2.5">
      <div className="flex flex-row flex-wrap justify-start max-md:justify-start items-center gap-5 py-1.5">
        {analytics.map((item) => (
          <div className="w-1/4 py-1.5 max-sm:w-32" key={item.title}>
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
        <h1 className="text-textColor text-2xl capitalize pb-4">
          My Properties
        </h1>
        <Properties data={properties} loading={loading}  deleteProperty={deleteProperty} />
      </div>
    </div>
  );
};

export default DashboardPage;
