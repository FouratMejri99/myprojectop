import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/config/firebase";
import { Context } from "@/context/AuthContext";
import {
  fetchTotalData,
  formatTimeSinceLastCheck,
  handleCacheClear,
  isCacheExpired,
} from "@/utils/firestoreUtils";
import { collection } from "firebase/firestore"; // Make sure to import getDocs
import { BarChart2, Loader2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";

const CACHE_EXPIRATION_TIME = 30 * 24 * 60 * 60 * 1000;

const TotalUsers = () => {
  const { user } = useContext(Context);

  const [totalUsers, setTotalUsers] = useState(0);
  const usersCollectionRef = collection(db, "users");
  const [loading, setLoading] = useState(false);
  const [lastCheck, setLastCheck] = useState("");

  // Effect hook to fetch total number of Users
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);

      if (!user) {
        console.error("User not found");
        setLoading(false);
        return;
      }

      const cachedTotalUsers = localStorage.getItem(user.uid + `usersTotal`);
      if (
        cachedTotalUsers &&
        !isCacheExpired(JSON.parse(cachedTotalUsers), CACHE_EXPIRATION_TIME)
      ) {
        const cachedData = JSON.parse(cachedTotalUsers);
        setTotalUsers(cachedData.data);
        setLastCheck(formatTimeSinceLastCheck(cachedData.timestamp));
        setLoading(false);
        console.log("Using cached data: ", cachedData.data); // Log cached data used
      } else {
        try {
          await fetchTotalData(
            usersCollectionRef,
            setTotalUsers,
            user.uid + "usersTotal"
          );
          setLastCheck(formatTimeSinceLastCheck(Date.now()));
        } catch (error) {
          console.error("Error fetching total users: ", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <Card className="drop-shadow-2xl">
      <CardHeader className="relative">
        <CardTitle className="absolute -top-4 border rounded-xl w-20 h-20 bg-[#3F98EE] flex justify-center items-center">
          <BarChart2 className="text-white" size={32} />
        </CardTitle>
        <CardDescription className="flex flex-col items-end">
          <Button
            variant="link"
            className="text-base text-muted-foreground p-0 h-auto"
            onClick={() =>
              handleCacheClear([user.uid + "usersTotal"], null, setLoading)
            }
          >
            Total Users
          </Button>
          <span className="text-2xl font-bold text-foreground">
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : totalUsers > 0 ? (
              totalUsers
            ) : (
              "No users found"
            )}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-xs p-0 mt-3 text-right">
          last Check: {lastCheck}
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalUsers;
