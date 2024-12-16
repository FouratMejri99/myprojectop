import LogoAnimated from "@/components/LogoAnimated";
import { db } from "@/config/firebase";
import { Context } from "@/context/AuthContext";
import { isCacheExpired } from "@/utils/firestoreUtils";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour

export const Protected = ({ children }) => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [lastPlan, setLastPlan] = useState(null);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const agencyDoc = doc(db, "marketplace", user.uid);
  const subscriptionsCollectionRef = collection(agencyDoc, "subscriptions");

  const handlePlanExpiration = async (planDoc, planData) => {
    await updateDoc(planDoc.ref, { status: "Expired" });
    const updatedPlanData = { ...planData, status: "Expired" };
    localStorage.setItem(
      "agencyPlan" + user.uid,
      JSON.stringify({ timestamp: Date.now(), data: updatedPlanData })
    );
    console.log("The plan is expired");
    navigate("/plans?expired=true", {
      state: { lastPlanData: updatedPlanData },
    });
  };

  const fetchLastPlan = async () => {
    try {
      const activePlanQuery = query(
        subscriptionsCollectionRef,
        where("status", "==", "Active"),
        orderBy("created_at", "desc"),
        limit(1)
      );
      const querySnapshot = await getDocs(activePlanQuery);

      if (!querySnapshot.empty) {
        const lastPlanData = querySnapshot.docs[0].data();
        const planEndDate = new Date(
          lastPlanData.endDate.seconds * 1000 +
            lastPlanData.endDate.nanoseconds / 1000000
        );

        if (new Date() > planEndDate) {
          await handlePlanExpiration(querySnapshot.docs[0], lastPlanData);
        } else {
          setLastPlan(lastPlanData);
          localStorage.setItem(
            "agencyPlan" + user.uid,
            JSON.stringify({ timestamp: Date.now(), data: lastPlanData })
          );
          if (location.pathname === "/plans") {
            navigate("/");
          }
        }
        return;
      }

      // If no active, pending, or expired plans exist, redirect the user to the plans page
      await handleNoPlans();
      setLoading(false);
    } catch (error) {
      console.error("Error fetching last plan:", error);
    }
  };

  const handleNoPlans = async () => {
    const planSnapshot = await getDocs(subscriptionsCollectionRef);
    if (planSnapshot.empty) {
      console.log("No plans found for this user.");
      navigate("/plans?new=true"); // Redirect to plans page for new users
    }
  };

  useEffect(() => {
    const checkCachedPlan = async () => {
      const cachedPlan = localStorage.getItem("agencyPlan" + user.uid);
      if (
        cachedPlan &&
        !isCacheExpired(JSON.parse(cachedPlan), CACHE_EXPIRATION_TIME)
      ) {
        const cachedData = JSON.parse(cachedPlan).data;
        const planEndDate = new Date(
          cachedData.endDate.seconds * 1000 +
            cachedData.endDate.nanoseconds / 1000000
        );
        if (new Date() > planEndDate && cachedData.status !== "Expired") {
          const subscriptionDocRef = doc(
            db,
            `marketplace/${user.uid}/subscriptions/${cachedData.id}`
          );
          await handlePlanExpiration(subscriptionDocRef, cachedData);
        } else {
          setLastPlan(cachedData);
          setLoading(false);
        }
      } else {
        await fetchLastPlan();
      }
    };

    checkCachedPlan().catch((error) => {
      console.error("Error checking cached plan:", error);
      setLoading(false); // Ensure loading state is false on error
    });
  }, [user.uid]);

  if (loading) {
    return (
      <div className="relative hidden h-full max-h-screen dark:border-r lg:flex justify-center">
        <LogoAnimated />
      </div>
    );
  }

  return children;
};
