import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Context } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
  ChartBarDecreasing,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Headset,
  MessageCircleMore,
  Settings,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// List of navigation items with title, icon, active state, and link
const navItems = [
  {
    title: "Analytics",
    icon: <TrendingUp />,
    link: "/analytics",
  },
  {
    title: "Invoices",
    icon: <ChartBarDecreasing />,
    link: "/Invoices",
  },
  {
    title: "Products",
    icon: <ShoppingCart />,
    link: "/Products",
  },
  {
    title: "Orders",
    icon: <MessageCircleMore />,
    link: "/Orders",
  },
];

const Sidebar = ({ className, expanded, setExpanded, ...props }) => {
  const { user } = useContext(Context);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  const [showProductDropdown, setShowProductDropdown] = useState(false); // State for dropdown visibility

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  // Function to handle click on Products to toggle dropdown
  const handleProductClick = () => {
    setShowProductDropdown((prev) => !prev);
  };

  return (
    <Card
      className={cn(
        `${
          expanded ? "w-[250px]" : "w-[150px]"
        } fixed h-full transition-all hidden xl:flex flex-col rounded-none`,
        className
      )}
      {...props}
    >
      <CardHeader className="relative mb-3">
        <CardTitle className="flex justify-center">
          <img
            src={"src/img/tnker.png"}
            className={`overflow-hidden transition-all ${
              expanded ? "w-3/4" : "w-full"
            }`}
            alt="Tnker Logo"
          />
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setExpanded((curr) => !curr)}
          className="absolute rounded-full -right-5 p-1.5 hover:bg-primary/50 transition-all"
        >
          {expanded ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </CardHeader>
      <div className="overflow-auto h-full custom-scrollbar">
        <div className="min-h-full flex flex-col justify-between">
          <CardContent>
            {navItems.map((item, index) => (
              <div key={index}>
                {item.title === "Products" ? (
                  <div>
                    <div
                      onClick={handleProductClick}
                      className={`mb-2 p-3 flex items-center last:mb-0 cursor-pointer rounded-md transition-all ${
                        item.link === activeLink
                          ? "bg-primary/15 hover:bg-primary/50"
                          : "hover:bg-accent"
                      } ${expanded ? "" : "flex-col"}`}
                    >
                      {item.icon}
                      <p
                        className={`${
                          expanded ? "text-lg" : "text-sm"
                        } font-medium leading-none ms-1`}
                      >
                        {item.title}
                      </p>
                      <ChevronDown
                        className={`${
                          showProductDropdown ? "transform rotate-180" : ""
                        } transition-transform`}
                      />
                    </div>
                    {showProductDropdown && (
                      <div className="ml-5">
                        <Link
                          to="/newProducts"
                          className={`mb-2 p-2 flex items-center last:mb-0 cursor-pointer rounded-md transition-all hover:bg-accent`}
                        >
                          <p
                            className={`text-sm font-medium leading-none ms-1`}
                          >
                            Create
                          </p>
                        </Link>
                        <Link
                          to="/editProduct"
                          className={`mb-2 p-2 flex items-center last:mb-0 cursor-pointer rounded-md transition-all hover:bg-accent`}
                        >
                          <p
                            className={`text-sm font-medium leading-none ms-1`}
                          >
                            Edit
                          </p>
                        </Link>
                        <Link
                          to="/productdetails"
                          className={`mb-2 p-2 flex items-center last:mb-0 cursor-pointer rounded-md transition-all hover:bg-accent`}
                        >
                          <p
                            className={`text-sm font-medium leading-none ms-1`}
                          >
                            Detail
                          </p>
                        </Link>
                        <Link
                          to="/products"
                          className={`mb-2 p-2 flex items-center last:mb-0 cursor-pointer rounded-md transition-all hover:bg-accent`}
                        >
                          <p
                            className={`text-sm font-medium leading-none ms-1`}
                          >
                            List
                          </p>
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.link}
                    className={`mb-2 p-3 flex items-center last:mb-0 cursor-pointer rounded-md transition-all ${
                      item.link === activeLink
                        ? "bg-primary/15 hover:bg-primary/50"
                        : "hover:bg-accent"
                    } ${expanded ? "" : "flex-col"}`}
                  >
                    {item.icon}
                    <p
                      className={`${
                        expanded ? "text-lg" : "text-sm"
                      } font-medium leading-none ms-1`}
                    >
                      {item.title}
                    </p>
                  </Link>
                )}
              </div>
            ))}
          </CardContent>

          <CardContent>
            <Link
              to={"/support"}
              className={`mb-2 p-3 flex items-center last:mb-0 cursor-pointer rounded-md transition-all ${
                "/support" === activeLink
                  ? "bg-primary/15 hover:bg-primary/50"
                  : "hover:bg-accent"
              } ${expanded ? "" : "flex-col"}`}
            >
              <Headset />
              <p
                className={`${
                  expanded ? "text-lg" : "text-sm"
                } font-medium leading-none ms-1`}
              >
                Support
              </p>
            </Link>
            <Link
              to={"/settings"}
              className={`mb-2 p-3 flex items-center last:mb-0 cursor-pointer rounded-md transition-all ${
                "/settings" === activeLink
                  ? "bg-primary/15 hover:bg-primary/50"
                  : "hover:bg-accent"
              } ${expanded ? "" : "flex-col"}`}
            >
              <Settings />
              <p
                className={`${
                  expanded ? "text-lg" : "text-sm"
                } font-medium leading-none ms-1`}
              >
                Settings
              </p>
            </Link>
            <div className="flex flex-col items-center mt-3">
              <Avatar className="h-14 w-14 border">
                <AvatarImage src="/images/Logo Tinker f.svg" alt="@shadcn" />
                <AvatarFallback className="text-center">
                  Tnker Admin
                </AvatarFallback>
              </Avatar>
              <div
                className={`flex flex-col items-center overflow-hidden transition-all ${
                  expanded ? "" : "hidden"
                }`}
              >
                <h4 className="font-semibold">
                  {user.displayName ? user.displayName : "Tnker Admin"}
                </h4>
                <span className="text-xs">{user.email}</span>
                <Link to={"/re-new-plan"}>
                  <Button className="mt-3 rounded-xl">Upgrade Plan</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
