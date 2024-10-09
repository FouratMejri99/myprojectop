import { ModeToggle } from "@/components/Nav/topbar/ModeToggle";
import PlansLoading from "@/components/loading/PlansLoading";
import Particles from "@/components/magicui/particles";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { auth, db } from "@/config/firebase";
import { Context } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { LogOut } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Plans = () => {
  const { theme } = useTheme();
  const { user } = useContext(Context);

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [periode, setPeriode] = useState(1);
  const [price, setPrice] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const plansCollectionRef = collection(db, "plans");

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const pending = searchParams.get("pending");
  const expired = searchParams.get("expired");
  const { toast } = useToast();
  const location = useLocation();
  const state = location.state;

  const getPlans = async () => {
    try {
      const queryRef = query(
        plansCollectionRef,
        where("showInRegistration", "==", true)
      );
      const data = await getDocs(queryRef);
      const filteredData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (filteredData.length) {
        setPlans(filteredData);
      }
    } catch (error) {
      console.error("Error Fetching Plans : ", error);
    } finally {
      setLoading(false);
    }
    if (pending) {
      toast({
        title: "Votre abonnement est toujours en attente de paiement.",
        className: "bg-primary",
      });
    }
    if (expired) {
      toast({ title: "Votre abonnement est expiré.", className: "bg-primary" });
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  const handlePeriodeChange = (duration) => {
    const parts = duration.split("-");
    setPeriode(parseInt(parts[0], 10));
    setPrice(parseFloat(parts[1]));
  };

  const handlePlanChoice = async (plan) => {
    setIsSubmitting(true);
    setCouponError("");
    let couponDiscount = null;
    let priceValue = parseFloat(price);
    try {
      if (coupon.trim() !== "") {
        const couponRef = doc(db, "coupons", coupon.trim());
        const couponRefData = await getDoc(couponRef);
        if (couponRefData.exists()) {
          const couponData = couponRefData.data();
          if (
            couponData.agencyId !== "" &&
            couponData.agencyId !== null &&
            couponData.agencyId !== user.id
          ) {
            setCouponError("Ce coupon ne vous appartient pas");
            return;
          }
          const date = new Date(couponData.expirationDate.seconds * 1000);
          const now = new Date().getTime();
          if (date < now) {
            setCouponError("Coupon expiré");
            return;
          }
          priceValue = price - price * (couponData.solde / 100);
          couponDiscount = couponData.solde;
        } else {
          setCouponError("Coupon non trouvé ou expiré");
          return;
        }
      }
      const userDoc = doc(db, "agencies", user.uid);
      const subscriptionsCollectionRef = collection(userDoc, "subscriptions");

      await addDoc(subscriptionsCollectionRef, {
        agency: user.uid,
        plan: plan.id,
        name: plan.name,
        maxClients: plan.maxClients,
        maxStaff: plan.maxStaff,
        features: plan.features,
        periode: periode,
        status: "Pending",
        price: priceValue,
        created_at: serverTimestamp(),
        coupon: couponDiscount,
      });

      navigate("/");
    } catch (error) {
      console.log("error Choosing plan : ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen relative font-baloo2">
        <Particles
          className="absolute inset-0"
          quantity={900}
          size={1}
          ease={80}
          color={theme === "dark" ? "#F8D41B" : "#000"}
          refresh
        />
        <div className="absolute top-0 right-0 p-4 z-50">
          <div className="flex items-center gap-3">
            <ModeToggle />
            <Button
              onClick={() => handleLogout()}
              variant="outline"
              className="flex gap-3"
            >
              Log-out <LogOut />
            </Button>
          </div>
        </div>
        <div
          className={`min-h-screen relative ${
            plans.length > 0 ? "grid xl:grid-cols-3" : "flex"
          } items-center justify-center gap-7 p-4`}
        >
          {loading ? (
            <PlansLoading />
          ) : plans.length > 0 ? (
            <>
              {state && (
                <Card className="z-40 rounded-tl-[75px] drop-shadow-xl mx-auto">
                  {/* Existing code for displaying current plan */}
                </Card>
              )}
              {plans.map((plan, index) => (
                <Card
                  className="z-40 rounded-tl-[75px] drop-shadow-xl mx-auto"
                  key={index}
                >
                  <CardHeader>
                    <CardTitle className="text-center">{plan.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h2 className="text-2xl font-bold underline">
                      gestion du personnel
                    </h2>
                    <ul className="list-disc p-4 pt-3 pl-9 text-secondary dark:text-secondary-foreground">
                      <li>Ajouter et supprimer des membres du personnel</li>
                      <li>
                        Profils de base du personnel (nom, coordonnées, rôle)
                      </li>
                      <li>
                        Comptes de personnel limités{" "}
                        <span className="font-semibold">
                          (jusqu'à {plan.maxStaff} users)
                        </span>
                      </li>
                    </ul>
                    <h2 className="text-2xl font-bold underline">
                      Planification et Envoi
                    </h2>
                    <ul className="list-disc p-4 pt-3 pl-9 text-secondary dark:text-secondary-foreground">
                      <li>Planification et affectation de base des tâches</li>
                      <li>Vue du calendrier pour le suivi des tâches</li>
                      <li>Avis d’affectation</li>
                    </ul>
                    <h2 className="text-2xl font-bold underline">
                      Gestion des clients
                    </h2>
                    <ul className="list-disc p-4 pt-3 pl-9 text-secondary dark:text-secondary-foreground">
                      <li>
                        Profils de base des clients (nom, coordonnées,
                        historique des emplois)
                      </li>
                      <li>
                        Comptes clients limités{" "}
                        <span className="font-semibold">
                          (jusqu'à {plan.maxClients} clients)
                        </span>
                      </li>
                    </ul>
                    <h2 className="text-2xl font-bold underline">
                      Rapports et soutien
                    </h2>
                    <ul className="list-disc p-4 pt-3 pl-9 text-secondary dark:text-secondary-foreground">
                      <li>Exporter les rapports au format CSV</li>
                      <li>Support par email</li>
                    </ul>
                    {plan.name === "Premium" && (
                      <>
                        <h2 className="text-2xl font-bold underline">
                          Analytics Features
                        </h2>
                        <ul className="list-disc p-4 pt-3 pl-9 text-secondary dark:text-secondary-foreground">
                          <li>Access to detailed analytics dashboard</li>
                          <li>Real-time data insights</li>
                        </ul>
                      </>
                    )}
                    {/* Existing accordion code */}
                    <div className="text-center mt-5">
                      <Dialog
                        onOpenChange={() => {
                          setPeriode(plan.durations[0].duration);
                          setPrice(plan.durations[0].price);
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button onClick={() => handlePlanChoice(plan)}>
                            Choose Plan
                          </Button>
                        </DialogTrigger>
                        {/* Existing dialog content */}
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <div>No plans available</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Plans;
