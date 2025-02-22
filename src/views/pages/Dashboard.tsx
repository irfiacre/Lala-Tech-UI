import AnalyticsCard from "@/src/components/cards/AnalyticsCard";
import React, { useEffect, useState } from "react";
import Properties from "@/src/components/tables/Properties";
import {
  getHostAnalytics,
  getProperties,
  manageProperty,
} from "@/services/backend";
import { toast } from "react-toastify";
import { formatPrice } from "@/util/helpers";

const DashboardPage = ({ userInfo }: { userInfo: any }) => {
  const [dateRange, setDateRange] = useState<any>({
    startDate: new Date().setMonth(new Date().getMonth() - 1),
    endDate: new Date(),
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [properties, setProperties] = useState<Array<any>>([]);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [analytics, setAnalytics] = useState<Array<any>>([]);

  useEffect(() => {
    if (userInfo) {
      (async () => {
        setLoading(true);
        const propertiesResult = await getProperties(userInfo.user_id);
        setProperties(propertiesResult);
        const analyticsResult = await getHostAnalytics(userInfo.user_id);
        setAnalytics([
          {
            title: "Properties",
            count: analyticsResult?.properties || 0,
          },
          {
            title: "Guests",
            count: analyticsResult
              ? Object.keys(analyticsResult.guests).length
              : 0,
          },
          {
            title: "Earnings",
            count: analyticsResult ? formatPrice(analyticsResult.earnings) : 0,
          },
        ]);
        setLoading(false);
      })();
    }
  }, [refetch, userInfo]);

  const deleteProperty = async (propert_id: string) => {
    const result = await manageProperty(propert_id, "DELETE");
    toast.success(`Your property was REMOVED successfuly!`, {
      hideProgressBar: true,
      closeOnClick: true,
      autoClose: 2000,
    });
    setRefetch(true);
  };

  return (
    <div className="flex flex-col gap-5 space-y-2.5">
      <div className="flex flex-row flex-wrap justify-start max-md:justify-start items-center gap-5 py-1.5">
        {analytics.map((item) => (
          <div className="w-1/4 py-1.5 max-sm:w-32" key={item.title}>
            <AnalyticsCard title={item.title} count={item.count} />
          </div>
        ))}
      </div>
      <div>
        <h1 className="text-textColor text-2xl capitalize pb-4">
          My Properties
        </h1>
        <Properties
          data={properties}
          loading={loading}
          deleteProperty={deleteProperty}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
